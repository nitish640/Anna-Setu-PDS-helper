import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import mockData from './mockData.json'
import './tailwind.css'
import './styles.css'
import './overrides.css'

const { card: defaultCard, cards = {}, history: initialHistory, reasons, shops: allShops } = mockData

const text = {
  ta: {
    app: 'அன்ன சேது',
    greeting: 'வணக்கம்',
    tagline: 'சரியான ரேஷன் தகவல், சரியான நேரத்தில்',
    demo: 'டெமோ முறை — எந்த அரசு அமைப்பும் இணைக்கப்படவில்லை',
    home: 'முகப்பு',
    shops: 'நியாய கடைகள்',
    history: 'வரலாறு',
    help: 'உதவி',
    helper: 'மற்றவருக்கு உதவ',
    helperSub: 'குடும்பம் அல்லது பக்கத்து வீட்டார் கார்டை பார்க்க',
    helperCard: 'நீங்கள் உதவும் நபரின் ரேஷன் கார்டு எண்',
    checkPerson: 'விவரம் காண்க',
    ownCard: 'என் கார்டிற்கு திரும்பு',
    cardNo: 'ரேஷன் கார்டு எண்',
    cardSaved: 'ரேஷன் கார்டு',
    continue: 'தொடரவும்',
    loading: 'விவரங்கள் சரிபார்க்கப்படுகின்றன…',
    cardError: 'குறைந்தது 6 எழுத்துக்கள் கொண்ட ரேஷன் எண்ணை உள்ளிடவும்.',
    offline: 'உங்கள் விவரங்கள் போனில் பாதுகாப்பாக உள்ளன. நெட்வொர்க் வந்ததும் புதுப்பிக்கப்படும்.',
    entitlement: 'இந்த மாத ரேஷன் ஒதுக்கீடு',
    denied: 'ரேஷன் நிறுத்தப்பட்டுள்ளது',
    partial: 'பகுதி ரேஷன் கிடைத்தது',
    received: 'முழு ரேஷன் கிடைத்தது',
    issue: 'காரணம் என்ன?',
    nearby: 'அருகிலுள்ள நியாய விலைக் கடைகள் (TNPDS)',
    today: 'இன்றைய இருப்பு நிலை',
    rice: 'அரிசி',
    wheat: 'கோதுமை',
    sugar: 'சர்க்கரை',
    dal: 'துவரம் பருப்பு',
    available: 'இருப்பில் உள்ளது',
    out: 'இன்று இல்லை',
    open: 'திறந்துள்ளது',
    closed: 'தற்போது மூடப்பட்டுள்ளது',
    timeline: 'கடந்த 6 மாதங்கள்',
    pattern: 'கடந்த 3 மாதங்களில் 2 முறை ரேஷன் பெறுவதில் சிக்கல் ஏற்பட்டுள்ளது',
    fast: '3 நாட்கள் முன்னோக்கி நகர்த்து',
    fastSub: 'புகார் தானாக பதிவாவதை காண',
    back: 'பின்செல்ல',
    grievance: 'புகார் தயாராக உள்ளது',
    autoCreated: '3 நாட்களுக்குப் பிறகு தானாக பதிவு செய்யப்பட்டது',
    tracking: 'கண்காணிப்பு எண்',
    expected: 'பதில் எதிர்பார்க்கப்படும் நேரம்: 48 மணிநேரம்',
    link: 'ஆதார் அடையாளம் இணைக்க',
    enterOtp: 'உங்கள் போனுக்கு வந்த 4 இலக்க குறியீட்டை உள்ளிடவும்',
    verify: 'சரிபார்க்கவும்',
    request: 'திருத்தக் கோரிக்கை',
    correctName: 'சரியான பெயர்',
    sendRequest: 'கோரிக்கையை அனுப்பு',
    nameError: 'தயவுசெய்து சரியான பெயரை உள்ளிடவும்.',
    success: 'வெற்றிகரமாக முடிந்தது!',
    successText: 'உங்கள் கோரிக்கை பதிவு செய்யப்பட்டது. தகவல் தெரிவிக்கப்படும்.',
    support: 'உதவி தேவையா?',
    call: 'ஹெல்ப்லைன் எண்ணைக் காட்டவும்',
    callShown: '1967 — இலவச உதவி எண் காட்டப்பட்டது',
    network: 'நெட்வொர்க் நிலை',
    noNetwork: 'நெட்வொர்க் கிடைக்கவில்லை',
    helpCard: 'நாங்கள் உங்களுடன் இருக்கிறோம்',
    helpBody: 'சந்தேகம் இருந்தால் 1967 என்ற எண்ணை அழைக்கவும். இது டெமோ முறை.',
    inactiveTitle: 'கார்டை மீண்டும் செயல்படுத்த',
    inactiveBody: 'உங்கள் கார்டுக்கான மறுஆய்வு கோரிக்கையை நாங்கள் தயார் செய்கிறோம்.',
    activate: 'மறுஆய்வு கோரிக்கை அனுப்ப',
    otpStep1: 'மொபைல் எண்ணை சரிபார்க்கவும்',
    otpStep3: 'அடையாளம் இணைக்கப்பட்டது',
    resolution: 'சிக்கல் தீர்க்கப்பட்டது',
    resolveDemo: 'தீர்வு காணப்பட்ட டெமோவை பார்க்க',
    days: '3 நாட்களாக தீர்வு இல்லை',
    check: 'இந்த கடையைத் தேர்வுசெய்',
    selectedShop: 'இந்த கடையில் இன்று தேவையான தானியங்கள் உள்ளன.',
    august: 'ஆகஸ்ட்',
    quantity: '20 கிலோ',
    demoStatus: 'நிலை மாற்ற',
    demoIssue: 'காரணம் மாற்ற',
    invalidOtp: '4 இலக்கங்களையும் உள்ளிடவும்',
    phoneGate: 'மொபைல் சரிபார்ப்பு',
    phoneGateSub: 'உங்கள் ரேஷன் விவரங்களை நீங்கள் மட்டுமே காண, பதிவு செய்யப்பட்ட மொபைல் எண்ணை சரிபார்க்கவும்.',
    phoneLabel: 'பதிவு செய்யப்பட்ட மொபைல் எண்',
    phoneOtpLabel: 'மொபைலுக்கு அனுப்பப்பட்ட 4 இலக்க OTP',
    phoneOtpHint: 'டெமோ OTP: 1234 (சோதனைக்காக)',
    wrongOtp: 'தவறான குறியீடு. இந்த டெமோவிற்கு 1234 ஐப் பயன்படுத்தவும்.',
    smsSimTitle: 'புதிய செய்தி · VA-TNPDS',
    smsSimBody: 'அன்ன சேது சரிபார்ப்பு குறியீடு: 1234. செல்லுபடியாகும் நேரம்: 10 நிமிடம்.',
    tapToFill: '1234 ஐ நிரப்ப தட்டவும்',
    allShops: 'அனைத்தும்',
    openOnly: 'திறந்தவை',
    riceOnly: 'அரிசி இருப்பு',
    wheatOnly: 'கோதுமை இருப்பு',
    switchCard: 'டெமோ கார்டு',
    tnPreset: 'தமிழ்நாடு (TN)',
    mhPreset: 'மகாராஷ்டிரா (MH)'
  },
  hi: {
    app: 'अन्न सेतु',
    greeting: 'नमस्ते',
    tagline: 'राशन की सही जानकारी, सही समय पर',
    demo: 'डेमो मोड — कोई असली सरकारी सिस्टम नहीं जुड़ा है',
    home: 'घर',
    shops: 'दुकानें',
    history: 'इतिहास',
    help: 'मदद',
    helper: 'किसी और की मदद करें',
    helperSub: 'परिवार या पड़ोसी का कार्ड देखें',
    helperCard: 'जिसकी मदद कर रहे हैं, उनका कार्ड नंबर',
    checkPerson: 'स्थिति देखें',
    ownCard: 'अपने कार्ड पर लौटें',
    cardNo: 'राशन कार्ड नंबर',
    cardSaved: 'राशन कार्ड',
    continue: 'आगे बढ़ें',
    loading: 'स्थिति जाँची जा रही है…',
    cardError: 'कृपया कम से कम 6 अंकों का डेमो कार्ड नंबर डालें।',
    offline: 'आपकी जानकारी फोन में सुरक्षित है। नेटवर्क आते ही अपडेट होगी।',
    entitlement: 'इस महीने का राशन',
    denied: 'राशन रुका है',
    partial: 'कुछ राशन मिला',
    received: 'राशन मिल गया',
    issue: 'क्या हुआ?',
    nearby: 'आपके पास की दुकानें (PDS)',
    today: 'आज का स्टॉक',
    rice: 'चावल',
    wheat: 'गेहूँ',
    sugar: 'चीनी',
    dal: 'दाल',
    available: 'मिल रहा है',
    out: 'आज नहीं है',
    open: 'खुली है',
    closed: 'अभी बंद है',
    timeline: 'पिछले 6 महीने',
    pattern: 'पिछले 3 महीनों में 2 बार राशन में समस्या हुई',
    fast: '3 दिन आगे बढ़ाएँ',
    fastSub: 'शिकायत अपने-आप बनने का डेमो देखें',
    back: 'वापस',
    grievance: 'शिकायत तैयार है',
    autoCreated: '3 दिन बाद अपने-आप दर्ज की गई',
    tracking: 'ट्रैकिंग नंबर',
    expected: 'जवाब मिलने का समय: 48 घंटे',
    link: 'पहचान जोड़ें',
    enterOtp: 'मोबाइल पर आया 4 अंकों का कोड डालें',
    verify: 'सत्यापित करें',
    request: 'सुधार का अनुरोध',
    correctName: 'सही नाम',
    sendRequest: 'अनुरोध भेजें',
    nameError: 'कृपया अपना सही नाम भरें।',
    success: 'हो गया!',
    successText: 'आपका अनुरोध दर्ज हो गया है। हम आपको बताएँगे।',
    support: 'मदद चाहिए?',
    call: 'हेल्पलाइन नंबर देखें',
    callShown: '1967 — हेल्पलाइन नंबर दिखा दिया गया है',
    network: 'नेटवर्क स्थिति',
    noNetwork: 'नेटवर्क नहीं मिला',
    helpCard: 'हम आपके साथ हैं',
    helpBody: 'समझ न आए तो 1967 पर कॉल करें। यह डेमो कॉल नहीं करता।',
    inactiveTitle: 'कार्ड फिर चालू करें',
    inactiveBody: 'हम जाँच के लिए आपका अनुरोध तैयार कर देंगे।',
    activate: 'जाँच का अनुरोध भेजें',
    otpStep1: 'मोबाइल नंबर जाँचें',
    otpStep3: 'पहचान जुड़ गई',
    resolution: 'समाधान पूरा हुआ',
    resolveDemo: 'समाधान होने का डेमो देखें',
    days: '3 दिन से समाधान नहीं हुआ',
    check: 'सही दुकान चुनें',
    selectedShop: 'यह दुकान आज दोनों अनाज दे सकती है।',
    august: 'अगस्त',
    quantity: '20 किलो',
    demoStatus: 'स्थिति बदलें',
    demoIssue: 'कारण बदलें',
    invalidOtp: 'चार अंक डालें',
    phoneGate: 'मोबाइल सत्यापन',
    phoneGateSub: 'आपका राशन विवरण सिर्फ आपको दिखे, इसलिए पहले मोबाइल नंबर जाँचें।',
    phoneLabel: 'मोबाइल नंबर',
    phoneOtpLabel: 'मोबाइल पर आया कोड डालें',
    phoneOtpHint: 'डेमो OTP: 1234 (जाँचने के लिए)',
    wrongOtp: 'गलत कोड। डेमो के लिए 1234 डालें।',
    smsSimTitle: 'नया संदेश · VA-ANNAST',
    smsSimBody: 'अन्न सेतु सत्यापन कोड 1234 है। वैधता: 10 मिनट।',
    tapToFill: '1234 ऑटो-फिल करें',
    allShops: 'सभी दुकानें',
    openOnly: 'खुली दुकानें',
    riceOnly: 'चावल उपलब्ध',
    wheatOnly: 'गेहूँ उपलब्ध',
    switchCard: 'डेमो कार्ड',
    tnPreset: 'तमिलनाडु (TN)',
    mhPreset: 'महाराष्ट्र (MH)'
  },
  en: {
    app: 'Anna Setu',
    greeting: 'Hello',
    tagline: 'Clear ration support, right when you need it',
    demo: 'Demo mode — no real government system is connected',
    home: 'Home',
    shops: 'Shops',
    history: 'History',
    help: 'Help',
    helper: 'Help someone else',
    helperSub: 'Check a family member or neighbour’s card',
    helperCard: 'Ration card number for the person you’re helping',
    checkPerson: 'Check status',
    ownCard: 'Return to my card',
    cardNo: 'Ration card number',
    cardSaved: 'Ration card',
    continue: 'Continue',
    loading: 'Checking your status…',
    cardError: 'Enter at least 6 characters for a demo ration card number.',
    offline: 'Your details are saved on this phone and will update when connected.',
    entitlement: 'This month’s ration',
    denied: 'Ration is paused',
    partial: 'Some ration received',
    received: 'Ration received',
    issue: 'What happened?',
    nearby: 'Fair Price Shops (PDS)',
    today: 'Today’s stock',
    rice: 'Rice',
    wheat: 'Wheat',
    sugar: 'Sugar',
    dal: 'Toor Dal',
    available: 'Available',
    out: 'Not today',
    open: 'Open',
    closed: 'Closed now',
    timeline: 'Last 6 months',
    pattern: 'There were ration issues in 2 of the last 3 months',
    fast: 'Fast-forward 3 days',
    fastSub: 'See the grievance generated automatically',
    back: 'Back',
    grievance: 'Grievance is ready',
    autoCreated: 'Automatically registered after 3 days',
    tracking: 'Tracking number',
    expected: 'Expected response: 48 hours',
    link: 'Link identity',
    enterOtp: 'Enter the 4-digit code sent to your phone',
    verify: 'Verify',
    request: 'Request correction',
    correctName: 'Correct name',
    sendRequest: 'Send request',
    nameError: 'Please enter the correct name.',
    success: 'All set!',
    successText: 'Your request is recorded. We’ll keep you informed.',
    support: 'Need help?',
    call: 'Show helpline number',
    callShown: '1967 — helpline number shown',
    network: 'Network status',
    noNetwork: 'No network found',
    helpCard: 'We are with you',
    helpBody: 'If you are unsure, call 1967. This demo does not place calls.',
    inactiveTitle: 'Reactivate card',
    inactiveBody: 'We will prepare a review request for your card.',
    activate: 'Send review request',
    otpStep1: 'Check mobile number',
    otpStep3: 'Identity linked',
    resolution: 'Resolved',
    resolveDemo: 'See resolved demo',
    days: 'Unresolved for 3 days',
    check: 'Choose this shop',
    selectedShop: 'This shop can provide both grains today.',
    august: 'August',
    quantity: '20 kg',
    demoStatus: 'Change status',
    demoIssue: 'Change reason',
    invalidOtp: 'Enter all four digits',
    phoneGate: 'Phone verification',
    phoneGateSub: 'So only you can see your ration details, please verify your mobile number first.',
    phoneLabel: 'Mobile number',
    phoneOtpLabel: 'Enter the code sent to your phone',
    phoneOtpHint: 'Demo OTP: 1234 (for testing)',
    wrongOtp: 'Incorrect code. Use 1234 for this demo.',
    smsSimTitle: 'New Message · VA-TNPDS',
    smsSimBody: 'Your Anna Setu verification code is 1234. Valid for 10 minutes.',
    tapToFill: 'Tap to auto-fill 1234',
    allShops: 'All Shops',
    openOnly: 'Open Now',
    riceOnly: 'Rice in Stock',
    wheatOnly: 'Wheat in Stock',
    switchCard: 'Demo Card',
    tnPreset: 'Tamil Nadu (TN)',
    mhPreset: 'Maharashtra (MH)'
  }
}

const statusMeta = {
  denied: { glyph: '×', cls: 'red' },
  partial: { glyph: '!', cls: 'amber' },
  received: { glyph: '✓', cls: 'green' }
}

const nextStatus = { denied: 'partial', partial: 'received', received: 'denied' }
const nextReason = { mismatch: 'aadhaar', aadhaar: 'stock', stock: 'inactive', inactive: 'mismatch' }

function Icon({ name, size = 22 }) {
  const c = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true'
  }
  const p = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.6 9a2.6 2.6 0 1 1 4.5 1.8c-.95.9-2.1 1.35-2.1 2.7" />
        <path d="M12 17h.01" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 20h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  }
  return <svg {...c}>{p[name] || p.help}</svg>
}

function Brand({ t, lang, setLang }) {
  const brandMark = lang === 'ta' ? 'அ' : lang === 'hi' ? 'अ' : 'A'
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">{brandMark}</span>
        <span>{t.app}</span>
      </div>
      <div className="language-toggle-group" role="group" aria-label="Change language">
        <button
          className={'lang-btn ' + (lang === 'ta' ? 'active' : '')}
          onClick={() => setLang('ta')}
          aria-label="Tamil"
        >
          த
        </button>
        <button
          className={'lang-btn ' + (lang === 'hi' ? 'active' : '')}
          onClick={() => setLang('hi')}
          aria-label="Hindi"
        >
          हि
        </button>
        <button
          className={'lang-btn ' + (lang === 'en' ? 'active' : '')}
          onClick={() => setLang('en')}
          aria-label="English"
        >
          EN
        </button>
      </div>
    </header>
  )
}

function resolveCard(number) {
  if (!number) return cards.tn || defaultCard
  const normalized = number.trim().toUpperCase()
  if (normalized.startsWith('MH')) {
    return cards.mh || defaultCard
  }
  return cards.tn || defaultCard
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('anna-language') || 'ta')
  const [tab, setTab] = useState('home')
  const [page, setPage] = useState('home')
  const [savedCard, setSavedCard] = useState(() => localStorage.getItem('anna-card-number') || '')
  const [verified, setVerified] = useState(false)
  const [status, setStatus] = useState('denied')
  const [reason, setReason] = useState('mismatch')
  const [isLoading, setIsLoading] = useState(false)
  const [helper, setHelper] = useState(false)
  const [offline, setOffline] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [fastForwarded, setFastForwarded] = useState(false)
  const [records, setRecords] = useState(initialHistory)

  const t = text[lang] || text.en
  const currentCard = resolveCard(savedCard)

  useEffect(() => {
    localStorage.setItem('anna-language', lang)
  }, [lang])

  const lookup = (number) => {
    setIsLoading(true)
    window.setTimeout(() => {
      const v = number.trim().toUpperCase()
      setSavedCard(v)
      localStorage.setItem('anna-card-number', v)
      setIsLoading(false)
    }, 650)
  }

  const navigate = (next) => {
    if (['home', 'shops', 'history', 'help'].includes(next)) setTab(next)
    setPage(next)
    setResolved(false)
  }

  const clearCard = () => {
    localStorage.removeItem('anna-card-number')
    setSavedCard('')
    setHelper(false)
    setFastForwarded(false)
    setVerified(false)
  }

  const goFix = () => (reason === 'stock' ? navigate('shops') : setPage(reason))

  const finishResolution = () => {
    setStatus('received')
    setRecords((rows) =>
      rows.map((row, i) =>
        i === 0
          ? {
              ...row,
              state: 'received',
              note: 'சிக்கல் தீர்க்கப்பட்டது',
              noteHi: 'शिकायत हल हुई',
              noteEn: 'Issue resolved'
            }
          : row
      )
    )
    setResolved(true)
  }

  const backHome = () => {
    setPage('home')
    setTab('home')
    setResolved(false)
  }

  if (!savedCard) {
    return <Lookup t={t} lang={lang} setLang={setLang} isLoading={isLoading} lookup={lookup} />
  }

  if (!verified) {
    return (
      <PhoneVerify
        t={t}
        lang={lang}
        setLang={setLang}
        card={currentCard}
        onVerified={() => setVerified(true)}
      />
    )
  }

  const nav = [
    ['home', 'home', t.home],
    ['shops', 'pin', t.shops],
    ['history', 'clock', t.history],
    ['help', 'help', t.help]
  ]
  const showBack = !['home', 'shops', 'history', 'help'].includes(page)

  return (
    <main className="app-shell min-h-screen antialiased">
      <Brand t={t} lang={lang} setLang={setLang} />
      {showBack && (
        <button className="back-button" onClick={backHome}>
          <Icon name="back" size={18} />
          {t.back}
        </button>
      )}
      {page === 'home' && (
        <HomePage
          t={t}
          lang={lang}
          card={currentCard}
          status={status}
          setStatus={setStatus}
          reason={reason}
          setReason={setReason}
          helper={helper}
          setHelper={setHelper}
          savedCard={savedCard}
          clearCard={clearCard}
          lookup={lookup}
          goFix={goFix}
          navigate={navigate}
          fastForward={() => {
            setFastForwarded(true)
            setPage('grievance')
          }}
          fastForwarded={fastForwarded}
        />
      )}
      {page === 'shops' && <ShopList t={t} lang={lang} shops={allShops} />}
      {page === 'history' && <History t={t} lang={lang} records={records} />}
      {page === 'help' && <Help t={t} offline={offline} setOffline={setOffline} />}
      {page === 'mismatch' && (
        <Correction
          t={t}
          lang={lang}
          card={currentCard}
          finishResolution={finishResolution}
          resolved={resolved}
          goHome={backHome}
        />
      )}
      {page === 'aadhaar' && (
        <OtpFlow
          t={t}
          card={currentCard}
          finishResolution={finishResolution}
          resolved={resolved}
          goHome={backHome}
        />
      )}
      {page === 'inactive' && (
        <InactiveFlow
          t={t}
          card={currentCard}
          finishResolution={finishResolution}
          resolved={resolved}
          goHome={backHome}
        />
      )}
      {page === 'grievance' && (
        <Grievance
          t={t}
          lang={lang}
          reason={reason}
          fastForwarded={fastForwarded}
          finishResolution={finishResolution}
          resolved={resolved}
          goHome={backHome}
        />
      )}
      <nav className="bottom-nav" aria-label="Main navigation">
        {nav.map(([id, icon, label]) => (
          <button
            key={id}
            className={tab === id ? 'selected' : ''}
            onClick={() => navigate(id)}
          >
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}

function Lookup({ t, lang, setLang, isLoading, lookup }) {
  const [number, setNumber] = useState('TN-02-G-849201')
  const [error, setError] = useState('')

  const submit = () => {
    if (number.trim().length < 6) {
      setError(t.cardError)
      return
    }
    setError('')
    lookup(number)
  }

  return (
    <main className="app-shell lookup min-h-screen antialiased">
      <Brand t={t} lang={lang} setLang={setLang} />
      <div className="lookup-hero" aria-hidden="true">
        <span className="grain">✳</span>
      </div>
      <h1>{t.app}</h1>
      <p className="lookup-tagline">{t.tagline}</p>
      <p className="demo-chip">◌ {t.demo}</p>
      <div className="lookup-form">
        <label htmlFor="card-number">{t.cardNo}</label>
        <input
          id="card-number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="TN-02-G-849201"
          aria-invalid={Boolean(error)}
        />
        <div className="card-presets">
          <span className="preset-label">{t.switchCard}:</span>
          <button
            type="button"
            className={'preset-chip ' + (number.startsWith('TN') ? 'active' : '')}
            onClick={() => setNumber('TN-02-G-849201')}
          >
            {t.tnPreset}
          </button>
          <button
            type="button"
            className={'preset-chip ' + (number.startsWith('MH') ? 'active' : '')}
            onClick={() => setNumber('MH-12-0418-2675')}
          >
            {t.mhPreset}
          </button>
        </div>
        {error && (
          <p className="form-error">
            <Icon name="info" size={17} />
            {error}
          </p>
        )}
        <button className="button primary" onClick={submit}>
          {isLoading ? <span className="spinner" /> : t.continue}
          <Icon name="arrow" />
        </button>
      </div>
      <p className="offline-note">
        <Icon name="wifi" size={15} />
        {t.offline}
      </p>
    </main>
  )
}

/* Security gate with interactive SMS push notification toast and 4-box split OTP */
function PhoneVerify({ t, lang, setLang, card, onVerified }) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState(card.phone || '98765 43210')
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [shake, setShake] = useState(false)

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    if (step === 2) {
      const timer = window.setTimeout(() => {
        setShowToast(true)
      }, 500)
      return () => window.clearTimeout(timer)
    }
  }, [step])

  const handleDigitChange = (index, value) => {
    const clean = value.replace(/\D/g, '').slice(-1)
    const nextDigits = [...digits]
    nextDigits[index] = clean
    setDigits(nextDigits)
    setError('')

    if (clean && index < 3) {
      inputRefs[index + 1]?.current?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus()
    }
  }

  const autoFillOtp = () => {
    setDigits(['1', '2', '3', '4'])
    setError('')
    setShowToast(false)
    inputRefs[3]?.current?.focus()
  }

  const proceed = () => {
    if (step === 1) {
      if (phone.replace(/\D/g, '').length < 10) {
        setError(t.cardError)
        return
      }
      setError('')
      setStep(2)
      return
    }

    const otp = digits.join('')
    if (otp.length !== 4) {
      setError(t.invalidOtp)
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }

    if (otp !== '1234') {
      setError(t.wrongOtp)
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }

    setError('')
    setIsVerifying(true)
    window.setTimeout(() => {
      setIsVerifying(false)
      onVerified()
    }, 600)
  }

  return (
    <main className="app-shell min-h-screen antialiased">
      <Brand t={t} lang={lang} setLang={setLang} />

      {/* Simulated native incoming SMS push toast */}
      {step === 2 && showToast && (
        <aside className="sms-toast" role="status">
          <div className="sms-toast-icon">
            <Icon name="message" size={19} />
          </div>
          <div className="sms-toast-content">
            <div className="sms-toast-header">
              <b>{t.smsSimTitle}</b>
              <small>Just now</small>
            </div>
            <p>{t.smsSimBody}</p>
            <button type="button" className="sms-autofill-btn" onClick={autoFillOtp}>
              <Icon name="bolt" size={14} />
              <span>{t.tapToFill}</span>
            </button>
          </div>
        </aside>
      )}

      <section className="flow page-transition" key={step}>
        <span className="flow-symbol">✆</span>
        <h1>{t.phoneGate}</h1>
        <p>{t.phoneGateSub}</p>

        <div className="steps">
          <span className={step >= 1 ? 'filled' : ''}>1</span>
          <i />
          <span className={step >= 2 ? 'filled' : ''}>2</span>
        </div>

        {step === 1 && (
          <div className="form-group">
            <label>{t.phoneLabel}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              placeholder="98765 43210"
              autoFocus
            />
          </div>
        )}

        {step === 2 && (
          <div className="form-group">
            <label>{t.phoneOtpLabel}</label>
            <div className={'otp-box-grid ' + (shake ? 'shake' : '')}>
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  className={'otp-box ' + (digits[i] ? 'has-val' : '')}
                  value={digits[i]}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <p className="demo-chip">◌ {t.phoneOtpHint}</p>
          </div>
        )}

        {error && (
          <p className="form-error">
            <Icon name="info" size={17} />
            {error}
          </p>
        )}

        <button className="button primary" onClick={proceed} disabled={isVerifying}>
          {isVerifying ? (
            <span className="spinner" />
          ) : step === 2 ? (
            t.verify
          ) : (
            t.continue
          )}
          <Icon name="arrow" />
        </button>
      </section>
    </main>
  )
}

function HomePage({
  t,
  lang,
  card,
  status,
  setStatus,
  reason,
  setReason,
  helper,
  setHelper,
  savedCard,
  clearCard,
  lookup,
  goFix,
  navigate,
  fastForward,
  fastForwarded
}) {
  const meta = statusMeta[status]
  const why = reasons[reason] || reasons.mismatch
  const [helperNumber, setHelperNumber] = useState('')
  const [helperError, setHelperError] = useState('')

  const checkHelper = () => {
    if (helperNumber.trim().length < 6) {
      setHelperError(t.cardError)
      return
    }
    lookup(helperNumber)
  }

  const userName = helper
    ? lang === 'ta'
      ? 'ராதா அம்மா'
      : lang === 'hi'
      ? 'राधा जी'
      : 'Radha ji'
    : lang === 'ta'
    ? card.name || 'காளியம்மாள்'
    : lang === 'hi'
    ? card.nameHi || card.name || 'सुनीता देवी'
    : card.nameEn || card.name || 'Kaliammal'

  return (
    <section className="page-transition">
      <div className="welcome-row">
        <div>
          <p>
            {t.greeting}, {userName}
          </p>
          <h1>{t.entitlement}</h1>
          <span className="card-location-tag">
            <Icon name="pin" size={13} /> {card.village || 'Tamil Nadu'}
          </span>
        </div>
        <button className="saved-card" onClick={clearCard} title="Clear saved card">
          <span>{t.cardSaved}</span>
          {savedCard.slice(-4)}
          <Icon name="arrow" size={14} />
        </button>
      </div>

      <button className="helper-toggle" onClick={() => setHelper(!helper)}>
        <Icon name="users" />
        <span>
          <b>{t.helper}</b>
          <small>{t.helperSub}</small>
        </span>
        <i className={helper ? 'on' : ''} />
      </button>

      {helper && (
        <div className="helper-lookup">
          <label>{t.helperCard}</label>
          <input
            value={helperNumber}
            onChange={(e) => setHelperNumber(e.target.value)}
            placeholder="TN-02-G-849201"
          />
          {helperError && (
            <p className="form-error">
              <Icon name="info" size={17} />
              {helperError}
            </p>
          )}
          <button className="button secondary" onClick={checkHelper}>
            {t.checkPerson}
            <Icon name="arrow" />
          </button>
          <button className="text-button" onClick={() => setHelper(false)}>
            {t.ownCard}
          </button>
        </div>
      )}

      <div className={'status-card ' + meta.cls}>
        <div className="status-symbol" key={status + reason}>
          {meta.glyph}
        </div>
        <div>
          <h2>
            {status === 'denied'
              ? t.denied
              : status === 'partial'
              ? t.partial
              : t.received}
          </h2>
          <p>
            {t.august} 2026 · {t.quantity}
          </p>
        </div>
      </div>

      <div className="demo-controls">
        <span>Demo</span>
        <button onClick={() => setStatus(nextStatus[status])}>{t.demoStatus}</button>
        <button onClick={() => setReason(nextReason[reason])}>
          {t.demoIssue}: {why.icon}
        </button>
      </div>

      {status !== 'received' && (
        <article className="reason-card" key={reason}>
          <div className="reason-symbol">{why.icon}</div>
          <div>
            <h2>{why.title[lang] || why.title.en}</h2>
            <p>{why.detail[lang] || why.detail.en}</p>
            <button className="reason-action" onClick={goFix}>
              {why.action[lang] || why.action.en}
              <Icon name="arrow" size={17} />
            </button>
          </div>
        </article>
      )}

      <div className="quick-actions">
        <button onClick={() => navigate('shops')}>
          <Icon name="pin" />
          <span>{t.nearby}</span>
        </button>
        <button onClick={() => navigate('history')}>
          <Icon name="clock" />
          <span>{t.timeline}</span>
        </button>
      </div>

      {status !== 'received' && (
        <button
          className={'escalate-card ' + (fastForwarded ? 'ready' : '')}
          onClick={fastForward}
        >
          <span>
            <b>{fastForwarded ? t.grievance : t.fast}</b>
            <small>{fastForwarded ? t.autoCreated : t.fastSub}</small>
          </span>
          <strong>→</strong>
        </button>
      )}
    </section>
  )
}

function shopDisplayName(shop, lang) {
  if (lang === 'en' && shop.nameEn) return shop.nameEn
  if (lang === 'hi' && shop.nameHi) return shop.nameHi
  return shop.name
}

function ShopList({ t, lang, shops }) {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const filteredShops = shops.filter((shop) => {
    if (filter === 'open') return shop.open
    if (filter === 'rice') return shop.rice
    if (filter === 'wheat') return shop.wheat
    return true
  })

  return (
    <section className="page-transition">
      <div className="page-heading">
        <span className="heading-icon">
          <Icon name="pin" size={30} />
        </span>
        <div>
          <h1>{t.nearby}</h1>
          <p>{t.today}</p>
        </div>
      </div>

      {/* Shop filter bar */}
      <div className="shop-filters" role="tablist">
        <button
          className={'filter-pill ' + (filter === 'all' ? 'active' : '')}
          onClick={() => setFilter('all')}
        >
          {t.allShops} ({shops.length})
        </button>
        <button
          className={'filter-pill ' + (filter === 'open' ? 'active' : '')}
          onClick={() => setFilter('open')}
        >
          {t.openOnly}
        </button>
        <button
          className={'filter-pill ' + (filter === 'rice' ? 'active' : '')}
          onClick={() => setFilter('rice')}
        >
          {t.riceOnly}
        </button>
        <button
          className={'filter-pill ' + (filter === 'wheat' ? 'active' : '')}
          onClick={() => setFilter('wheat')}
        >
          {t.wheatOnly}
        </button>
      </div>

      <div className="shops-container">
        {filteredShops.map((shop, index) => (
          <article className="shop-card" key={shop.code || shop.name}>
            <div className="shop-head">
              <div>
                <div className="shop-title-row">
                  <h2>{shopDisplayName(shop, lang)}</h2>
                  {shop.code && <span className="shop-code-badge">{shop.code}</span>}
                </div>
                <p>
                  <Icon name="pin" size={14} />
                  {shop.distance} · {shop.district ? `${shop.district} · ` : ''}
                  <span className={shop.open ? 'status-open-text' : 'status-closed-text'}>
                    {shop.open ? t.open : t.closed}
                  </span>
                </p>
                {shop.hours && <small className="shop-hours">{shop.hours}</small>}
              </div>
              <i
                className={'open-dot ' + (shop.open ? 'live' : 'closed')}
                title={shop.open ? t.open : t.closed}
              />
            </div>

            <div className="stock-list">
              <span>
                <i className={shop.rice ? 'available' : 'unavailable'}>
                  {shop.rice ? '✓' : '×'}
                </i>
                {t.rice}: {shop.rice ? t.available : t.out}
              </span>
              <span>
                <i className={shop.wheat ? 'available' : 'unavailable'}>
                  {shop.wheat ? '✓' : '×'}
                </i>
                {t.wheat}: {shop.wheat ? t.available : t.out}
              </span>
              {shop.sugar !== undefined && (
                <span>
                  <i className={shop.sugar ? 'available' : 'unavailable'}>
                    {shop.sugar ? '✓' : '×'}
                  </i>
                  {t.sugar}: {shop.sugar ? t.available : t.out}
                </span>
              )}
              {shop.dal !== undefined && (
                <span>
                  <i className={shop.dal ? 'available' : 'unavailable'}>
                    {shop.dal ? '✓' : '×'}
                  </i>
                  {t.dal}: {shop.dal ? t.available : t.out}
                </span>
              )}
            </div>

            <button
              className="button secondary"
              onClick={() => setSelectedId(selectedId === index ? null : index)}
            >
              {t.check}
              <Icon name="arrow" />
            </button>
            {selectedId === index && (
              <p className="selection-note">
                <Icon name="check" size={17} />
                {t.selectedShop}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function History({ t, lang, records }) {
  const getMonthName = (item) => {
    if (lang === 'en' && item.monthEn) return item.monthEn
    if (lang === 'hi' && item.monthHi) return item.monthHi
    return item.month
  }

  const getNote = (item) => {
    if (lang === 'en' && item.noteEn) return item.noteEn
    if (lang === 'hi' && item.noteHi) return item.noteHi
    return item.note
  }

  return (
    <section className="page-transition">
      <div className="page-heading">
        <span className="heading-icon">
          <Icon name="clock" size={30} />
        </span>
        <div>
          <h1>{t.timeline}</h1>
          <p>{t.pattern}</p>
        </div>
      </div>
      <div className="history-list">
        {records.map((item) => {
          const meta = statusMeta[item.state] || statusMeta.received
          return (
            <div className="history-row" key={item.month}>
              <span className={'history-symbol ' + meta.cls}>{meta.glyph}</span>
              <div>
                <b>
                  {getMonthName(item)} 2026
                </b>
                <p>{getNote(item)}</p>
              </div>
              <em className={meta.cls}>
                {item.state === 'received'
                  ? t.received
                  : item.state === 'partial'
                  ? t.partial
                  : t.denied}
              </em>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Help({ t, offline, setOffline }) {
  const [showCall, setShowCall] = useState(false)
  return (
    <section className="page-transition help-page">
      <div className="help-hero">
        <span>♡</span>
        <h1>{t.helpCard}</h1>
        <p>{t.helpBody}</p>
        <button className="button primary centered" onClick={() => setShowCall(true)}>
          <Icon name="phone" />
          {t.call}
        </button>
        {showCall && (
          <p className="call-note">
            <Icon name="check" size={18} />
            {t.callShown}
          </p>
        )}
      </div>
      <button className="network-card" onClick={() => setOffline(!offline)}>
        <Icon name="wifi" />
        <span>
          <b>{offline ? t.noNetwork : t.network}</b>
          <small>{offline ? t.offline : '2G/3G demo · Tap to simulate a problem'}</small>
        </span>
      </button>
    </section>
  )
}

function Correction({ t, lang, card, finishResolution, resolved, goHome }) {
  const [name, setName] = useState(
    lang === 'ta' ? card.name || 'காளியம்மாள்' : lang === 'hi' ? card.nameHi || 'सुनीता देवी' : card.nameEn || 'Kaliammal'
  )
  const [error, setError] = useState('')

  const submit = () => {
    if (!name.trim()) {
      setError(t.nameError)
      return
    }
    finishResolution()
  }

  if (resolved) return <Success t={t} goHome={goHome} />

  const why = reasons.mismatch
  return (
    <section className="flow page-transition">
      <span className="flow-symbol">≠</span>
      <h1>{t.request}</h1>
      <p>{why.detail[lang] || why.detail.en}</p>
      <label>{t.correctName}</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {error && (
        <p className="form-error">
          <Icon name="info" size={17} />
          {error}
        </p>
      )}
      <label>{t.cardNo}</label>
      <input defaultValue={card.number} readOnly />
      <button className="button primary" onClick={submit}>
        {t.sendRequest}
        <Icon name="arrow" />
      </button>
    </section>
  )
}

function OtpFlow({ t, card, finishResolution, resolved, goHome }) {
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  if (resolved) return <Success t={t} goHome={goHome} />

  const proceed = () => {
    if (step === 2 && otp.length !== 4) {
      setError(t.invalidOtp)
      return
    }
    setError('')
    step < 3 ? setStep(step + 1) : finishResolution()
  }

  const title = step === 1 ? t.otpStep1 : step === 2 ? t.enterOtp : t.otpStep3
  return (
    <section className="flow page-transition">
      <span className="flow-symbol">✦</span>
      <h1>{t.link}</h1>
      <div className="steps">
        <span className="filled">1</span>
        <i />
        <span className={step > 1 ? 'filled' : ''}>2</span>
        <i />
        <span className={step > 2 ? 'filled' : ''}>3</span>
      </div>
      <h2>{title}</h2>
      {step === 1 && <input defaultValue={card.phone || '98765 43210'} readOnly />}
      {step === 2 && (
        <input
          className="otp-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
          inputMode="numeric"
          placeholder="• • • •"
          maxLength={4}
        />
      )}
      {error && (
        <p className="form-error">
          <Icon name="info" size={17} />
          {error}
        </p>
      )}
      <button className="button primary" onClick={proceed}>
        {step === 3 ? t.resolution : step === 2 ? t.verify : t.continue}
        <Icon name="arrow" />
      </button>
    </section>
  )
}

function InactiveFlow({ t, card, finishResolution, resolved, goHome }) {
  if (resolved) return <Success t={t} goHome={goHome} />
  return (
    <section className="flow page-transition">
      <span className="flow-symbol">!</span>
      <h1>{t.inactiveTitle}</h1>
      <p>{t.inactiveBody}</p>
      <div className="review-list">
        <span>
          <b>1</b>
          {t.cardNo}: {card.number}
        </span>
        <span>
          <b>2</b>
          {t.expected}
        </span>
      </div>
      <button className="button primary" onClick={finishResolution}>
        {t.activate}
        <Icon name="arrow" />
      </button>
    </section>
  )
}

function Grievance({ t, lang, reason, fastForwarded, finishResolution, resolved, goHome }) {
  if (resolved) return <Success t={t} goHome={goHome} />
  const number =
    'AS-2608-' +
    ({ mismatch: '4182', aadhaar: '5217', stock: '6324', inactive: '7405' }[reason] || '4182')
  const why = reasons[reason] || reasons.mismatch
  return (
    <section className="flow grievance page-transition">
      <span className="flow-symbol">!</span>
      <h1>{t.grievance}</h1>
      <p>
        {fastForwarded ? t.autoCreated : t.days} · {why.title[lang] || why.title.en}
      </p>
      <div className="tracking-card">
        <small>{t.tracking}</small>
        <b>{number}</b>
        <span>{t.expected}</span>
      </div>
      <button className="button primary" onClick={finishResolution}>
        {t.resolveDemo}
        <Icon name="arrow" />
      </button>
    </section>
  )
}

function InkBurst() {
  return (
    <span className="ink-burst" aria-hidden="true">
      {Array.from({length: 8}).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  )
}

function Success({ t, goHome }) {
  return (
    <section className="success-page page-transition">
      <div className="success-icon-wrap">
        <InkBurst />
        <div className="success-icon">
          <Icon name="check" size={52} />
        </div>
      </div>
      <h1>{t.success}</h1>
      <p>{t.successText}</p>
      <button className="button secondary centered" onClick={goHome}>
        <Icon name="home" />
        {t.home}
      </button>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  )
}
