/**
 * All user-facing text for the Landing (/), Lessons (/lessons), and
 * Practice (/practice) pages, plus the shared StitchHeader / StitchFooter
 * chrome that renders on them — in English and Gujarati.
 *
 * Scope decisions (documented here so they're visible, not silent):
 * - Numeric chrome (card indices like "01.", the "5 / 5" counter, "95%",
 *   "4,287") stays in Arabic numerals in both languages. This matches real
 *   everyday Gujarati usage — digits in modern Gujarati UI/print are almost
 *   always Arabic numerals, not the ૦-૯ glyphs, which are reserved here for
 *   the actual sign-language target glyphs being taught (those are content,
 *   not UI chrome, and already render correctly via NUMERAL_TARGETS).
 * - Product/brand names ("Ishaaro", "SignCoach", "Instagram", "ISL",
 *   "ISLRTC") are not translated — kept identical in both languages, which
 *   mirrors how these terms actually get used in spoken/written Gujarati.
 * - Alphabet flashcard labels ("Ka", "Kha", "Ga"...) are Roman transliteration
 *   used as a pronunciation aid, not English prose — intentionally identical
 *   in both languages (translating a pronunciation guide doesn't make sense).
 * - Marketing copy that's abstract/jargon-heavy even in English (e.g.
 *   "linguistic kinetic energy", "proprietary kinetic analysis engine") was
 *   simplified into warmer, plainer Gujarati rather than translated
 *   literally, per instructions to prioritize how this reads to families
 *   over strict fidelity. These are marked [ADAPTED] below.
 * - Every translation below got a second self-review pass for unnatural
 *   phrasing, overly literary word choice, and English word-order bleed.
 *   Anything I'm not fully confident about is marked [REVIEW] with a note
 *   on what's uncertain — please have a native speaker sanity-check those.
 */

export interface Strings {
  nav: {
    practice: string
    lessons: string
    teacher: string
    parent: string
    connect: string
    startLearning: string
  }
  footer: {
    ethics: string
    privacy: string
    signArchive: string
    instagram: string
    copyright: string
  }
  languageToggle: {
    en: string
    gu: string
    ariaLabel: string
  }
  landing: {
    heroLine1: string
    barriers: string
    possibilities: string
    subheadline: string
    statVideos: string
    statAccuracy: string
    methodologyTitle: string
    card1Title: string
    card1Body: string
    card2Title: string
    card2Body: string
    card2Link: string
    card3Title: string
    card3Body: string
    card3Link: string
  }
  lessons: {
    heading1: string
    heading2: string
    noteLabel: string
    tabs: {
      alphabet: { label: string; moduleTitle: string; intro: string }
      numbers: { label: string; moduleTitle: string; intro: string }
      math: { label: string; moduleTitle: string; intro: string }
      science: { label: string; moduleTitle: string; intro: string }
    }
    cards: Record<string, { label: string; sublabel?: string }>
    notes: Record<string, string>
  }
  practice: {
    heading1: string
    heading2: string
    subheadline: string
    targetSignLabel: string
    numeralLabel: string
    prev: string
    skip: string
    signCoachLabel: string
    status: {
      idle: string
      checking: string
      mismatch: string
      match: string
    }
    coach: {
      idle: string
      checking: string
      match: string
      mismatchFallback: string
    }
    correctiveTips: Record<number, string>
    numerals: Record<number, string>
    cameraLoading: string
    cameraLoadingAria: string
    cameraRequesting: string
    cameraRequestingAria: string
    cameraDeniedTitle: string
    cameraDeniedBodyDenied: string
    cameraDeniedBodyUnsupported: string
    enableCamera: string
    hud: {
      rec: string
      confidence: string
      trackingActive: string
      noHandDetected: string
    }
    mobileNav: {
      lessons: string
      practice: string
      connect: string
    }
  }
}

const en: Strings = {
  nav: {
    practice: 'Practice',
    lessons: 'Lessons',
    teacher: 'Teacher',
    parent: 'Parent',
    connect: 'Connect',
    startLearning: 'Start Learning',
  },
  footer: {
    ethics: 'Ethics',
    privacy: 'Privacy',
    signArchive: 'Sign Archive',
    instagram: 'Instagram',
    copyright: '© 2024 Ishaaro. Hand-drawn with precision.',
  },
  languageToggle: {
    en: 'EN',
    gu: 'ગુ',
    ariaLabel: 'Switch language',
  },
  landing: {
    heroLine1: 'Bridging the gap between',
    barriers: 'barriers',
    possibilities: 'possibilities.',
    subheadline:
      'Master manual communication through our rigorous, AI-assisted curriculum. A sophisticated approach to linguistic kinetic energy.',
    statVideos: '4,287 ISL sign videos',
    statAccuracy: '95% target accuracy',
    methodologyTitle: 'Curriculum Methodology',
    card1Title: 'Real-time AI Feedback',
    card1Body:
      'Our proprietary kinetic analysis engine compares your hand poses against ISLRTC-verified sign references in real time, entirely on-device, providing instant structural corrections.',
    card2Title: 'ISL Curriculum',
    card2Body:
      'Structured academic progression from foundational linguistics to advanced expressive rhetoric.',
    card2Link: 'Explore Syllabus',
    card3Title: 'Sign Archive',
    card3Body:
      'A growing, teacher-verified library of ISL signs and regional variants, preserving historical and contemporary manual expressions.',
    card3Link: 'Search Archive',
  },
  lessons: {
    heading1: 'Mastering',
    heading2: 'the Hand',
    noteLabel: 'Note.',
    tabs: {
      alphabet: {
        label: 'Alphabet',
        moduleTitle: 'Module 01: Foundations',
        intro:
          'Trace the shapes, understand the origins, and commit the primary forms to memory.',
      },
      numbers: {
        label: 'Numbers',
        moduleTitle: 'Module 02: Counting',
        intro: 'Learn to sign the numbers 1 through 10 with confidence and clarity.',
      },
      math: {
        label: 'Math',
        moduleTitle: 'Module 03: Math Foundations',
        intro: 'Apply your number signs to real arithmetic and everyday measurement.',
      },
      science: {
        label: 'Science',
        moduleTitle: 'Module 04: The World Around Us',
        intro: 'Vocabulary for the body, weather, and everyday science topics.',
      },
    },
    cards: {
      'alphabet-01': { label: 'Ka' },
      'alphabet-02': { label: 'Kha' },
      'alphabet-03': { label: 'Ga' },
      'alphabet-04': { label: 'Gha' },
      'alphabet-05': { label: 'Nga' },
      'alphabet-06': { label: 'Cha' },
      'alphabet-07': { label: 'Chha' },
      'alphabet-08': { label: 'Ja' },
      'numbers-01': { label: 'One' },
      'numbers-02': { label: 'Two' },
      'numbers-03': { label: 'Three' },
      'numbers-04': { label: 'Four' },
      'numbers-05': { label: 'Five' },
      'numbers-06': { label: 'Six' },
      'numbers-07': { label: 'Seven' },
      'numbers-08': { label: 'Eight' },
      'numbers-09': { label: 'Nine' },
      'numbers-10': { label: 'Ten' },
      'math-01': {
        label: 'Counting 1–20',
        sublabel: 'Match Gujarati numerals to their signed counterparts.',
      },
      'math-02': {
        label: 'Addition Basics',
        sublabel: 'Combine quantities using two-handed number signs.',
      },
      'math-03': {
        label: 'Subtraction Basics',
        sublabel: 'Taking away, and signing "how many are left."',
      },
      'math-04': {
        label: 'Shapes & Measurement',
        sublabel: 'Circle, square, triangle — and how big, how many.',
      },
      'math-05': {
        label: 'Time & Calendar',
        sublabel: 'Days of the week and telling time by the clock.',
      },
      'science-01': {
        label: 'Parts of the Body',
        sublabel: 'Head, hands, and everything in between.',
      },
      'science-02': {
        label: 'The Five Senses',
        sublabel: 'Sight, sound, touch, taste, and smell.',
      },
      'science-03': {
        label: 'Weather & Seasons',
        sublabel: 'Sun, rain, and the four seasons of the year.',
      },
      'science-04': {
        label: 'Plants & Animals',
        sublabel: 'Common plants and animals from everyday life.',
      },
    },
    notes: {
      'alphabet-note':
        'Gujarati consonants are grouped in rows of five by place of articulation — start with the velar row, ક through ઙ.',
      'numbers-note':
        'Numbers 1–5 use one hand; 6–10 combine both. Palm orientation changes the meaning, so keep it steady.',
      'math-note':
        'Math signs build directly on the number signs from Module 02 — review those first if this feels unfamiliar.',
      'science-note':
        'Facial expression carries real grammatical weight in ISL — it isn’t optional, especially for sensory vocabulary.',
    },
  },
  practice: {
    heading1: 'Practice',
    heading2: 'Numerals',
    subheadline:
      'Position your hand within the frame. SignCoach will analyze your gesture in real-time.',
    targetSignLabel: 'Target Sign',
    numeralLabel: 'Numeral',
    prev: 'Prev',
    skip: 'Skip',
    signCoachLabel: 'SignCoach',
    status: {
      idle: 'Show me a sign',
      checking: 'Checking...',
      mismatch: 'Not sure, try again',
      match: 'Sign Recognized',
    },
    coach: {
      idle: 'Position your hand within the frame. SignCoach will analyze your gesture in real-time.',
      checking: 'Hold steady — I’m reading your gesture.',
      match: 'Great! That’s a clean, well-formed sign.',
      mismatchFallback: 'Try adjusting your hand and hold it steady in the frame.',
    },
    correctiveTips: {
      1: 'Try tucking your other fingers in — only the index finger should point up.',
      2: 'Spread your index and middle fingers apart for a clearer V shape.',
      3: 'Keep your thumb, index, and middle fingers extended and the rest curled in.',
      4: 'Extend all four fingers and fold your thumb across your palm.',
      5: 'Try spreading your fingers further apart, palm facing forward.',
    },
    numerals: {
      1: 'One (1)',
      2: 'Two (2)',
      3: 'Three (3)',
      4: 'Four (4)',
      5: 'Five (5)',
    },
    cameraLoading: 'Loading hand tracking model...',
    cameraLoadingAria: 'Loading hand tracking model',
    cameraRequesting: 'Requesting camera access...',
    cameraRequestingAria: 'Requesting camera access',
    cameraDeniedTitle: 'Camera access needed',
    cameraDeniedBodyDenied:
      'SignCoach needs your camera to see your hand and check your sign. Video is processed locally in your browser and never uploaded.',
    cameraDeniedBodyUnsupported:
      "Your browser doesn't support camera access. Try a different browser to use live practice.",
    enableCamera: 'Enable Camera',
    hud: {
      rec: 'REC',
      confidence: 'CONFIDENCE:',
      trackingActive: 'TRACKING ACTIVE',
      noHandDetected: 'NO HAND DETECTED',
    },
    mobileNav: {
      lessons: 'Lessons',
      practice: 'Practice',
      connect: 'Connect',
    },
  },
}

const gu: Strings = {
  nav: {
    practice: 'અભ્યાસ',
    // [REVIEW] "પાઠ" (lesson) is the everyday word for a single lesson —
    // used here for the "Lessons" section link.
    lessons: 'પાઠ',
    teacher: 'શિક્ષક',
    // "વાલી" (guardian) is the standard term Indian schools/apps use to
    // address a student's parent — more natural here than a literal
    // "માતાપિતા" (mother-father).
    parent: 'વાલી',
    // [REVIEW] "સંપર્ક" (contact/connection) for the Connect page — judgment
    // call between this and "જોડાણ" (link/connection); both are natural.
    connect: 'સંપર્ક',
    startLearning: 'શીખવાનું શરૂ કરો',
  },
  footer: {
    ethics: 'નૈતિકતા',
    privacy: 'ગોપનીયતા',
    signArchive: 'ઈશારા સંગ્રહ',
    instagram: 'Instagram',
    // [REVIEW] "Hand-drawn with precision" is a stylistic tagline, not a
    // literal claim — adapted to "ચોકસાઈ સાથે હાથથી બનાવેલ" (made by hand,
    // with precision), which keeps the warmth but is a creative rendering,
    // not a literal one.
    copyright: '© 2024 Ishaaro. ચોકસાઈ સાથે હાથથી બનાવેલ.',
  },
  languageToggle: {
    en: 'EN',
    gu: 'ગુ',
    ariaLabel: 'ભાષા બદલો',
  },
  landing: {
    // [REVIEW] The English hero is a 3-part visual pun (lead line, a
    // struck-through word, a flourished word) that doesn't map onto
    // Gujarati's word order the same way. Rather than force an unnatural
    // literal split, I rewrote it as a natural sentence that still fits the
    // same 3 slots: "એક સેતુ, જે જોડે છે" + "અડચણોને" (struck) + "શક્યતાઓ
    // સાથે" (flourished) reads as "A bridge, that connects barriers with
    // possibilities." This is the single translation I'm least certain
    // about tone-wise — worth a native speaker's read for whether the
    // headline register lands right.
    heroLine1: 'એક સેતુ, જે જોડે છે',
    barriers: 'અડચણોને',
    possibilities: 'શક્યતાઓ સાથે',
    // [ADAPTED] "A sophisticated approach to linguistic kinetic energy" is
    // abstract marketing copy even in English. Simplified to something a
    // parent would actually say out loud, rather than translating the
    // jargon literally.
    subheadline:
      'અમારા સંશોધનાત્મક, AI-આધારિત અભ્યાસક્રમથી હાથની ભાષા શીખો — સરળ, રસપ્રદ અને અસરકારક રીતે.',
    statVideos: '4,287 ISL ઈશારા વિડિયો',
    statAccuracy: '95% લક્ષ્ય ચોકસાઈ',
    methodologyTitle: 'અભ્યાસક્રમની પદ્ધતિ',
    card1Title: 'રિયલ-ટાઇમ AI ફીડબેક',
    // [ADAPTED] "proprietary kinetic analysis engine" simplified to "ખાસ
    // ટેકનોલોજી" (special technology) — a literal translation of "kinetic
    // analysis engine" would sound like stiff tech-manual language in
    // Gujarati.
    card1Body:
      'અમારી ખાસ ટેકનોલોજી તમારા હાથની સ્થિતિને ISLRTC દ્વારા પ્રમાણિત ઈશારાઓ સાથે તરત જ સરખાવે છે — સંપૂર્ણપણે તમારા ડિવાઇસ પર જ, અને તરત જ સુધારા સૂચવે છે.',
    card2Title: 'ISL અભ્યાસક્રમ',
    card2Body:
      'પાયાની ભાષા-સમજથી શરૂ કરીને, અસરકારક રીતે વ્યક્ત થવા સુધીનો ક્રમબદ્ધ અભ્યાસક્રમ.',
    card2Link: 'અભ્યાસક્રમ જુઓ',
    card3Title: 'ઈશારા સંગ્રહ',
    card3Body:
      'શિક્ષકો દ્વારા ચકાસાયેલ ISL ઈશારાઓનો સતત વધતો સંગ્રહ — જેમાં પ્રાદેશિક ભિન્નતાઓ તેમજ જૂની અને નવી ઈશારા-ભાષા, બંનેનો સમાવેશ થાય છે.',
    card3Link: 'સંગ્રહ શોધો',
  },
  lessons: {
    // [REVIEW] "Mastering the Hand" reordered for natural Gujarati word
    // order across the two heading lines: "હાથની" (of the hand) / "નિપુણતા"
    // (mastery) reads as "Mastery of the Hand" — same meaning, natural SOV
    // order, but the line-by-line English↔Gujarati mapping isn't 1:1.
    heading1: 'હાથની',
    heading2: 'નિપુણતા',
    noteLabel: 'નોંધ.',
    tabs: {
      alphabet: {
        // "કક્કો" is the warm, everyday word Gujarati speakers actually use
        // for "the alphabet" in a children's-learning context — chosen over
        // the more formal "મૂળાક્ષર".
        label: 'કક્કો',
        moduleTitle: 'મોડ્યુલ 01: પાયો',
        intro: 'આકારો દોરો, તેમની ઉત્પત્તિ સમજો અને મૂળ સ્વરૂપો યાદ રાખો.',
      },
      numbers: {
        label: 'અંકો',
        moduleTitle: 'મોડ્યુલ 02: ગણતરી',
        intro: '1 થી 10 સુધીના અંકોના ઈશારા આત્મવિશ્વાસ અને સ્પષ્ટતાથી શીખો.',
      },
      math: {
        label: 'ગણિત',
        moduleTitle: 'મોડ્યુલ 03: ગણિતનો પાયો',
        intro: 'તમારા અંકોના ઈશારાનો ઉપયોગ ગણિત અને રોજિંદા માપણીમાં કરો.',
      },
      science: {
        label: 'વિજ્ઞાન',
        moduleTitle: 'મોડ્યુલ 04: આપણી આસપાસની દુનિયા',
        intro: 'શરીર, હવામાન અને રોજિંદા વિજ્ઞાનના વિષયો માટેના શબ્દો.',
      },
    },
    cards: {
      // Alphabet labels are the Roman pronunciation guide (how you'd read
      // ક aloud), not English prose — intentionally left identical to the
      // English column, same as "Ka" isn't "translated" in the English
      // version either.
      'alphabet-01': { label: 'Ka' },
      'alphabet-02': { label: 'Kha' },
      'alphabet-03': { label: 'Ga' },
      'alphabet-04': { label: 'Gha' },
      'alphabet-05': { label: 'Nga' },
      'alphabet-06': { label: 'Cha' },
      'alphabet-07': { label: 'Chha' },
      'alphabet-08': { label: 'Ja' },
      'numbers-01': { label: 'એક' },
      'numbers-02': { label: 'બે' },
      'numbers-03': { label: 'ત્રણ' },
      'numbers-04': { label: 'ચાર' },
      'numbers-05': { label: 'પાંચ' },
      'numbers-06': { label: 'છ' },
      'numbers-07': { label: 'સાત' },
      'numbers-08': { label: 'આઠ' },
      'numbers-09': { label: 'નવ' },
      'numbers-10': { label: 'દસ' },
      'math-01': {
        label: '1 થી 20 ગણતરી',
        sublabel: 'ગુજરાતી અંકોને તેમના અનુરૂપ ઈશારા સાથે જોડો.',
      },
      'math-02': {
        label: 'સરવાળાનો પરિચય',
        sublabel: 'બે હાથના અંક-ઈશારા વડે જથ્થા ભેગા કરો.',
      },
      'math-03': {
        label: 'બાદબાકીનો પરિચય',
        sublabel: 'ઓછું કરવું, અને "કેટલા બાકી છે" તે ઈશારાથી બતાવવું.',
      },
      'math-04': {
        label: 'આકાર અને માપ',
        sublabel: 'વર્તુળ, ચોરસ, ત્રિકોણ — અને કેટલું મોટું, કેટલા.',
      },
      'math-05': {
        label: 'સમય અને કેલેન્ડર',
        sublabel: 'અઠવાડિયાના દિવસો અને ઘડિયાળમાં સમય જોવો.',
      },
      'science-01': {
        label: 'શરીરના અંગો',
        sublabel: 'માથું, હાથ, અને વચ્ચેનું બધું જ.',
      },
      'science-02': {
        label: 'પાંચ ઇન્દ્રિયો',
        sublabel: 'દૃષ્ટિ, અવાજ, સ્પર્શ, સ્વાદ અને ગંધ.',
      },
      'science-03': {
        label: 'હવામાન અને ઋતુઓ',
        sublabel: 'સૂરજ, વરસાદ, અને વર્ષની ચાર ઋતુઓ.',
      },
      'science-04': {
        label: 'છોડ અને પ્રાણીઓ',
        sublabel: 'રોજિંદા જીવનમાં જોવા મળતા સામાન્ય છોડ અને પ્રાણીઓ.',
      },
    },
    notes: {
      // [REVIEW] "કંઠ્ય હરોળ" (velar/guttural row) is the correct phonetics
      // term, but it's specialized vocabulary — worth a check from someone
      // who teaches Gujarati phonetics that this is the term parents would
      // actually recognize.
      'alphabet-note':
        'ગુજરાતી વ્યંજનો ઉચ્ચારણની જગ્યા પ્રમાણે પાંચ-પાંચની હરોળમાં ગોઠવાયેલા છે — કંઠ્ય હરોળથી શરૂ કરો, ક થી ઙ સુધી.',
      'numbers-note':
        '1 થી 5 સુધીના અંકો માટે એક હાથનો ઉપયોગ થાય છે; 6 થી 10 માટે બંને હાથ વપરાય છે. હથેળીની દિશા બદલવાથી અર્થ બદલાઈ શકે છે, એટલે તેને સ્થિર રાખો.',
      'math-note':
        'ગણિતના ઈશારા મોડ્યુલ 02ના અંક-ઈશારા પર જ આધારિત છે — જો આ અજાણ્યું લાગે તો પહેલા એ ફરી જુઓ.',
      'science-note':
        'ISLમાં ચહેરાના હાવભાવ વ્યાકરણની દૃષ્ટિએ ખૂબ મહત્વના છે — ખાસ કરીને ઇન્દ્રિય સંબંધિત શબ્દો માટે, તે વૈકલ્પિક નથી.',
    },
  },
  practice: {
    // [REVIEW] Same word-order note as Lessons — "Practice Numerals"
    // reordered to "અંકોનો" (of numerals) / "અભ્યાસ" (practice) so it reads
    // naturally top-to-bottom as "Numerals Practice" in Gujarati SOV order.
    heading1: 'અંકોનો',
    heading2: 'અભ્યાસ',
    subheadline: 'તમારો હાથ ફ્રેમની અંદર રાખો. SignCoach તમારો ઈશારો તરત જ તપાસશે.',
    targetSignLabel: 'લક્ષ્ય ઈશારો',
    numeralLabel: 'અંક',
    prev: 'પાછળ',
    skip: 'આગળ',
    signCoachLabel: 'SignCoach',
    status: {
      idle: 'તમારો ઈશારો બતાવો',
      checking: 'તપાસી રહ્યા છીએ...',
      mismatch: 'ખાતરી નથી, ફરી પ્રયત્ન કરો',
      match: 'ઈશારો ઓળખાયો',
    },
    coach: {
      idle: 'તમારો હાથ ફ્રેમની અંદર રાખો. SignCoach તમારો ઈશારો તરત જ તપાસશે.',
      // [REVIEW] Used passive voice ("તમારો ઈશારો વંચાઈ રહ્યો છે" — "your
      // gesture is being read") instead of a first-person "I", since
      // SignCoach has no established gender in Gujarati and a first-person
      // verb would force one (વાંચી રહ્યો છું vs રહી છું). Worth checking
      // this reads as warm/encouraging rather than clinical.
      checking: 'સ્થિર રહો — તમારો ઈશારો વંચાઈ રહ્યો છે.',
      match: 'સરસ! આ એકદમ સ્પષ્ટ અને સાચો ઈશારો છે.',
      mismatchFallback: 'તમારો હાથ સરખો ગોઠવો અને ફ્રેમમાં સ્થિર રાખો.',
    },
    correctiveTips: {
      1: 'તમારી બીજી આંગળીઓ અંદર વાળો — ફક્ત તર્જની આંગળી જ ઉપર રાખો.',
      2: 'તર્જની અને મધ્યમા આંગળી વચ્ચે થોડું અંતર રાખો, જેથી સ્પષ્ટ V આકાર બને.',
      3: 'તમારો અંગૂઠો, તર્જની અને મધ્યમા આંગળી સીધી રાખો અને બાકીની આંગળીઓ વાળો.',
      4: 'ચારેય આંગળીઓ સીધી રાખો અને અંગૂઠો હથેળી પર વાળો.',
      5: 'આંગળીઓ થોડી વધારે ફેલાવો અને હથેળી સામે રાખો.',
    },
    numerals: {
      1: 'એક (1)',
      2: 'બે (2)',
      3: 'ત્રણ (3)',
      4: 'ચાર (4)',
      5: 'પાંચ (5)',
    },
    // [REVIEW] Simplified from a literal "hand tracking model" translation
    // to something a non-technical parent would understand at a glance —
    // "ઈશારા ઓળખવાની પ્રક્રિયા" (the sign-recognition process) rather than
    // naming the ML model directly.
    cameraLoading: 'ઈશારા ઓળખવાની પ્રક્રિયા શરૂ થઈ રહી છે...',
    cameraLoadingAria: 'ઈશારા ઓળખવાની પ્રક્રિયા શરૂ થઈ રહી છે',
    cameraRequesting: 'કૅમેરાની પરવાનગી માંગી રહ્યા છીએ...',
    cameraRequestingAria: 'કૅમેરાની પરવાનગી માંગી રહ્યા છીએ',
    cameraDeniedTitle: 'કૅમેરાની પરવાનગી જરૂરી છે',
    cameraDeniedBodyDenied:
      'તમારો હાથ જોવા અને ઈશારો ચકાસવા માટે SignCoachને તમારા કૅમેરાની જરૂર છે. વિડિયો ફક્ત તમારા બ્રાઉઝરમાં જ પ્રોસેસ થાય છે અને ક્યારેય અપલોડ થતો નથી.',
    cameraDeniedBodyUnsupported:
      'તમારું બ્રાઉઝર કૅમેરાની સુવિધા સપોર્ટ કરતું નથી. લાઇવ અભ્યાસ માટે બીજું બ્રાઉઝર વાપરો.',
    enableCamera: 'કૅમેરા ચાલુ કરો',
    hud: {
      // [REVIEW] "REC" adapted to "લાઇવ" (live) — this HUD badge means "the
      // camera is live," not literally "recording to a file," so "લાઇવ"
      // reads more accurately than a literal recording-related word.
      rec: 'લાઇવ',
      // [REVIEW] "વિશ્વસનીયતા" (confidence/trustworthiness) is the most
      // standard term for a detection-confidence score, but it leans
      // slightly formal for a HUD label — worth a quick native check
      // against something shorter if one exists in common usage.
      confidence: 'વિશ્વસનીયતા:',
      trackingActive: 'ટ્રેકિંગ ચાલુ',
      noHandDetected: 'હાથ મળ્યો નથી',
    },
    mobileNav: {
      lessons: 'પાઠ',
      practice: 'અભ્યાસ',
      connect: 'સંપર્ક',
    },
  },
}

export const STRINGS: Record<'en' | 'gu', Strings> = { en, gu }
