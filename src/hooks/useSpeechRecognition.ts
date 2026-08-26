import { useCallback, useEffect, useRef, useState } from 'react'

interface UseSpeechRecognitionOptions {
  onFinalResult?: (text: string) => void
  /** BCP-47 recognition language, e.g. 'en-US' or 'gu-IN'. */
  lang?: string
}

export function useSpeechRecognition({
  onFinalResult,
  lang = 'en-US',
}: UseSpeechRecognitionOptions = {}) {
  const [supported, setSupported] = useState(true)
  const [listening, setListening] = useState(false)
  const [interimText, setInterimText] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const shouldListenRef = useRef(false)
  const onFinalResultRef = useRef(onFinalResult)
  useEffect(() => {
    onFinalResultRef.current = onFinalResult
  }, [onFinalResult])

  useEffect(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!Ctor) {
      setSupported(false)
      return
    }

    const recognition = new Ctor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = lang

    recognition.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0].transcript
        if (result.isFinal) {
          onFinalResultRef.current?.(text)
        } else {
          interim += text
        }
      }
      setInterimText(interim)
    }

    recognition.onend = () => {
      // Chrome's "continuous" mode still stops itself after a silence
      // timeout — restart automatically unless the user actually hit stop.
      // A language switch mid-session (see the effect below) also routes
      // through here, so the restart naturally picks up the new `lang`.
      if (shouldListenRef.current) {
        try {
          recognition.start()
        } catch {
          // already starting — ignore
        }
      } else {
        setListening(false)
      }
    }

    recognition.onerror = () => {
      // no-speech / network hiccups are recoverable; onend still fires
      // afterward and either restarts (continuous demo) or clears state.
    }

    recognitionRef.current = recognition
    return () => {
      shouldListenRef.current = false
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Applying `lang` doesn't need to recreate the whole recognition instance
  // — just update the property, and if a session is actively listening,
  // restart it so the new language takes effect immediately rather than
  // only on the next manual start.
  useEffect(() => {
    const recognition = recognitionRef.current
    if (!recognition) return
    recognition.lang = lang
    if (shouldListenRef.current) {
      recognition.stop()
    }
  }, [lang])

  const start = useCallback(() => {
    if (!recognitionRef.current) return
    shouldListenRef.current = true
    setInterimText('')
    try {
      recognitionRef.current.start()
      setListening(true)
    } catch {
      // already started — ignore
    }
  }, [])

  const stop = useCallback(() => {
    shouldListenRef.current = false
    recognitionRef.current?.stop()
    setListening(false)
    setInterimText('')
  }, [])

  return { supported, listening, interimText, start, stop }
}
