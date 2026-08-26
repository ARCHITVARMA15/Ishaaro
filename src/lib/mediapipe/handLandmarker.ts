import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'

const WASM_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm'
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

export async function createHandLandmarker(numHands = 1) {
  const vision = await FilesetResolver.forVisionTasks(WASM_BASE)
  const options = {
    baseOptions: { modelAssetPath: MODEL_URL },
    runningMode: 'VIDEO' as const,
    numHands,
  }
  try {
    return await HandLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { ...options.baseOptions, delegate: 'GPU' as const },
    })
  } catch (err) {
    console.warn('GPU delegate unavailable for HandLandmarker, falling back to CPU', err)
    return HandLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { ...options.baseOptions, delegate: 'CPU' as const },
    })
  }
}
