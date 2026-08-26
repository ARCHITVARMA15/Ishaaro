import type { HandLandmark } from './fingerCount'

// @mediapipe/tasks-vision's `Connection` type isn't exported from the
// package, but `HandLandmarker.HAND_CONNECTIONS` has this shape.
export interface HandConnection {
  start: number
  end: number
}

export interface CoverMapping {
  /** Native pixel size of the source video frame. */
  videoWidth: number
  videoHeight: number
  /** Rendered size of the canvas the video is displayed with object-fit: cover. */
  canvasWidth: number
  canvasHeight: number
}

const BONE_COLOR = 'rgba(27, 75, 67, 0.9)'
const JOINT_FILL = '#ff8c5a'
const JOINT_STROKE = 'rgba(253, 251, 247, 0.9)'
const TIP_INDICES = new Set([4, 8, 12, 16, 20])

/**
 * Landmarks are normalized [0,1] against the native video frame, but the
 * <video>/<canvas> are displayed with object-fit: cover, which crops and
 * scales that frame to fill a differently-proportioned box. This reproduces
 * that same crop+scale so the overlay lines up with what's on screen.
 */
function projectPoint(point: HandLandmark, mapping: CoverMapping) {
  const { videoWidth, videoHeight, canvasWidth, canvasHeight } = mapping
  const scale = Math.max(canvasWidth / videoWidth, canvasHeight / videoHeight)
  const offsetX = (canvasWidth - videoWidth * scale) / 2
  const offsetY = (canvasHeight - videoHeight * scale) / 2
  return {
    x: offsetX + point.x * videoWidth * scale,
    y: offsetY + point.y * videoHeight * scale,
  }
}

export function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: HandLandmark[],
  connections: HandConnection[],
  mapping: CoverMapping,
) {
  const { canvasWidth, canvasHeight, videoWidth, videoHeight } = mapping
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  if (!videoWidth || !videoHeight) return

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = BONE_COLOR
  ctx.lineWidth = Math.max(1.5, canvasWidth * 0.0035)

  for (const { start, end } of connections) {
    const a = landmarks[start]
    const b = landmarks[end]
    if (!a || !b) continue
    const pa = projectPoint(a, mapping)
    const pb = projectPoint(b, mapping)
    ctx.beginPath()
    ctx.moveTo(pa.x, pa.y)
    ctx.lineTo(pb.x, pb.y)
    ctx.stroke()
  }

  landmarks.forEach((point, index) => {
    const p = projectPoint(point, mapping)
    const radius = TIP_INDICES.has(index)
      ? Math.max(3, canvasWidth * 0.008)
      : Math.max(2, canvasWidth * 0.005)
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = JOINT_FILL
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = JOINT_STROKE
    ctx.stroke()
  })
}
