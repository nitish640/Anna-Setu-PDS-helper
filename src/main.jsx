import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import mockData from './mockData.json'
import './tailwind.css'
import './styles.css'
import './overrides.css'

const {
  card: defaultCard,
  cards = {},
  history: initialHistory = [],
  reasons = {},
  shops: allShops = [],
  states = [],
  grievance_status_log = [],
  grievances: initialGrievances = []
} = mockData

const languages = [
  { code: 'ta', label: 'தமிழ்', enLabel: 'Tamil', mark: 'அ', speechLang: 'ta-IN' },
  { code: 'hi', label: 'हिन्दी', enLabel: 'Hindi', mark: 'अ', speechLang: 'hi-IN' },
  { code: 'en', label: 'English', enLabel: 'English', mark: 'A', speechLang: 'en-IN' },
  { code: 'te', label: 'తెలుగు', enLabel: 'Telugu', mark: 'అ', speechLang: 'te-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', enLabel: 'Kannada', mark: 'ಅ', speechLang: 'kn-IN' },
  { code: 'ml', label: 'മലയാളം', enLabel: 'Malayalam', mark: 'அ', speechLang: 'ml-IN' },
  { code: 'mr', label: 'मराठी', enLabel: 'Marathi', mark: 'अ', speechLang: 'mr-IN' }
]

const text = {
  en: {
    app: 'Anna Setu', greeting: 'Hello', tagline: 'Clear ration support, right when you need it',
    demo: 'Demo mode — no real government system is connected',
    home: 'Home', shops: 'Shops', history: 'History', help: 'Help',
    helper: 'Help someone else', helperSub: 'Check a family member or neighbour’s card',
    helperCard: 'Ration card number for the person you’re helping', checkPerson: 'Check status', ownCard: 'Return to my card',
    cardNo: 'Ration card number', cardSaved: 'Ration card', continue: 'Continue', loading: 'Checking your status…',
    cardError: 'Enter at least 6 characters for a valid ration card number.',
    offline: 'Your details are saved on this phone and will update when connected.',
    entitlement: 'This month’s ration', denied: 'Ration is paused', partial: 'Some ration received', received: 'Full Quota Received', issue: 'What happened?',
    nearby: 'Fair Price Shops', today: 'Today’s stock', rice: 'Rice', wheat: 'Wheat', sugar: 'Sugar', dal: 'Toor Dal',
    available: 'Available', out: 'Not today', open: 'Open', closed: 'Closed now',
    timeline: 'Last 6 months', pattern: 'There were ration issues in 2 of the last 3 months', fast: 'Fast-forward 3 days', fastSub: 'See the grievance generated automatically',
    back: 'Back', grievance: 'Grievance is ready', autoCreated: 'Automatically registered after 3 days', tracking: 'Tracking number', expected: 'Expected response: 48 hours',
    link: 'Link identity', enterOtp: 'Enter the 4-digit code sent to your phone', verify: 'Verify', request: 'Request correction',
    correctName: 'Correct name', sendRequest: 'Send request', nameError: 'Please enter the correct name.', success: 'All set!', successText: 'Your request is recorded. We’ll keep you informed.',
    support: 'Need help?', call: 'Show helpline number', callShown: '1967 — helpline number shown', network: 'Network status', noNetwork: 'No network found',
    helpCard: 'We are with you', helpBody: 'If you are unsure, call 1967. This demo does not place calls.',
    inactiveTitle: 'Reactivate card', inactiveBody: 'We will prepare a review request for your card.',
    activate: 'Send review request', otpStep1: 'Check mobile number', otpStep3: 'Identity linked', resolution: 'Resolved', resolveDemo: 'See resolved demo',
    days: 'Unresolved for 3 days', check: 'Choose this shop', selectedShop: 'This shop can provide both grains today.', august: 'August', quantity: 'quota',
    demoStatus: 'Change status', demoIssue: 'Change reason', invalidOtp: 'Enter all four digits',
    phoneGate: 'Phone verification', phoneGateSub: 'So only you can see your ration details, please verify your mobile number first.',
    phoneLabel: 'Mobile number', phoneOtpLabel: 'Enter the code sent to your phone', phoneOtpHint: 'Demo OTP: 1234 (for testing)', wrongOtp: 'Incorrect code. Use 1234 for this demo.',
    smsSimTitle: 'New Message · PDS OTP', smsSimBody: 'Your Anna Setu verification code is 1234. Valid for 10 minutes.', tapToFill: 'Tap to auto-fill 1234',
    allShops: 'All Shops', openOnly: 'Open Now', riceOnly: 'Rice in Stock', wheatOnly: 'Wheat in Stock',
    switchCard: 'Demo Card', tnPreset: 'Tamil Nadu (TN)', mhPreset: 'Maharashtra (MH)',
    selectLanguage: 'Select Language', bookSlot: 'Book Time Slot', selectSlot: 'Select Arrival Time', confirmBooking: 'Confirm & Get E-Token',
    tokenPassTitle: 'PDS Priority Pass', tokenNote: 'Show this digital token at the FPS counter to skip the queue', viewOnMap: 'Google Maps',
    queueAhead: 'People ahead', estWait: 'Estimated wait', currentCardName: 'Name as on Card (Typo)', correctAadhaarName: 'Correct Legal Name (Aadhaar)',
    docVerifyNote: 'Aadhaar e-KYC match verified for registered mobile', fillFromAadhaar: 'Fill from Aadhaar', liveTracking: 'Live Status Tracker',
    officerReview: 'Taluk Supply Officer Review', stockDispatch: 'FPS Stock Dispatched', advanceProgress: 'Advance Status (Demo)',
    changeCard: 'Change Card', cardEntered: 'Selected Card', clearCard: 'Switch Card',
    selectState: 'Select your State',
    selectStateSub: 'Choose your state Public Distribution System (PDS) portal',
    activeStates: 'Active State Portals',
    comingSoon: 'Coming Soon',
    changeState: 'Change State',
    privacyNote: '🔒 Privacy Assurance: Your ration card number and data remain strictly on your device.',
    listen: 'Listen',
    stopListening: 'Stop',
    pickupRation: 'Pick Up Ration at FPS',
    viewReceipt: 'View Digital Receipt',
    digitalReceipt: 'Digital Ration Receipt',
    receiptTxn: 'Transaction ID',
    receiptShop: 'Fair Price Shop',
    receiptCommodity: 'Commodity',
    receiptEntitled: 'Entitled',
    receiptIssued: 'Issued',
    receiptRate: 'Rate',
    receiptTotal: 'Total',
    freeNfsa: 'Free (NFSA)',
    downloadReceipt: 'Save / Print Voucher',
    close: 'Close',
    entitlementBreakdown: 'Monthly Quota vs Received',
    categoryNorms: 'Card Category Norms',
    shortfallAlert: 'Stock Shortfall Detected',
    raiseMonthGrievance: 'Raise Grievance for this Shortfall',
    grievanceSLA: 'Under NFSA Section 19, grievances must be redressed within 7 working days.',
    confirmGrievance: 'Review & Submit Grievance',
    myGrievances: 'My Grievance Tickets',
    grievanceLogTitle: 'Official Action Log',
    shareTicket: 'Share via WhatsApp',
    offlineQueued: 'Offline mode active. Grievance stored locally and will sync when reconnected.',
    askAssistant: 'App Guide',
    assistantTitle: 'Anna Setu App Guide',
    assistantScopeNotice: 'ℹ️ This assistant helps you navigate this application only. For legal or card entitlement rulings, call 1967.',
    askPlaceholder: 'Ask how to use Anna Setu…',
    waOptInTitle: 'Receive WhatsApp Ration Alerts',
    waOptInSub: 'Get notified when grains arrive at your ration shop',
    waOptInBtn: 'Connect WhatsApp',
    registryDisclaimer: 'Official Government Registry Data: Shop names and allocations are displayed as registered in the state portal.',
    issuedStamp: '✓ ISSUED',
    verifiedBeneficiary: 'NFSA Verified Beneficiary',
    servicesHub: 'PDS Citizen Services',
    shopsService: 'Fair Price Shops',
    shopsServiceSub: 'Check live stock & store hours',
    tokenService: 'Book Priority Pass',
    tokenServiceSub: 'Skip counter line with e-token',
    historyService: 'Quota History',
    historyServiceSub: '6-month ledger & shortfalls',
    grievanceService: 'Grievance Desk',
    grievanceServiceSub: '7-day statutory resolution guarantee',
    nfsaBanner: 'National Food Security Act (NFSA 2013): Subsidized food grain is your statutory right. For queries, dial 1967 (Toll-Free).',
    monthlyQuotaTitle: 'AUGUST 2026 ENTITLEMENT',
    quotaReceivedDesc: 'Full monthly ration disbursed successfully',
    allocatedReceived: 'Allocated & Received',
    listenToEntitlement: 'Listen to Entitlement'
  },
  ta: {
    app: 'அன்ன சேது', greeting: 'வணக்கம்', tagline: 'சரியான ரேஷன் தகவல், சரியான நேரத்தில்',
    demo: 'டெமோ முறை — எந்த அரசு அமைப்பும் இணைக்கப்படவில்லை',
    home: 'முகப்பு', shops: 'நியாய கடைகள்', history: 'வரலாறு', help: 'உதவி',
    helper: 'மற்றவருக்கு உதவ', helperSub: 'குடும்பம் அல்லது பக்கத்து வீட்டார் கார்டை பார்க்க',
    helperCard: 'நீங்கள் உதவும் நபரின் ரேஷன் கார்டு எண்', checkPerson: 'விவரம் காண்க', ownCard: 'என் கார்டிற்கு திரும்பு',
    cardNo: 'ரேஷன் கார்டு எண்', cardSaved: 'ரேஷன் கார்டு', continue: 'தொடரவும்', loading: 'விவரங்கள் சரிபார்க்கப்படுகின்றன…',
    cardError: 'குறைந்தது 6 எழுத்துக்கள் கொண்ட சரியான ரேஷன் எண்ணை உள்ளிடவும்.',
    offline: 'உங்கள் விவரங்கள் போனில் பாதுகாப்பாக உள்ளன. நெட்வொர்க் வந்ததும் புதுப்பிக்கப்படும்.',
    entitlement: 'இந்த மாத ரேஷன் ஒதுக்கீடு', denied: 'ரேஷன் நிறுத்தப்பட்டுள்ளது', partial: 'பகுதி ரேஷன் கிடைத்தது', received: 'முழு ரேஷன் கிடைத்தது', issue: 'காரணம் என்ன?',
    nearby: 'அருகிலுள்ள நியாய விலைக் கடைகள்', today: 'இன்றைய இருப்பு நிலை', rice: 'அரிசி', wheat: 'கோதுமை', sugar: 'சர்க்கரை', dal: 'துவரம் பருப்பு',
    available: 'இருப்பில் உள்ளது', out: 'இன்று இல்லை', open: 'திறந்துள்ளது', closed: 'தற்போது மூடப்பட்டுள்ளது',
    timeline: 'கடந்த 6 மாதங்கள்', pattern: 'கடந்த 3 மாதங்களில் 2 முறை ரேஷன் பெறுவதில் சிக்கல் ஏற்பட்டுள்ளது', fast: '3 நாட்கள் முன்னோக்கி நகர்த்து', fastSub: 'புகார் தானாக பதிவாவதை காண',
    back: 'பின்செல்ல', grievance: 'புகார் தயாராக உள்ளது', autoCreated: '3 நாட்களுக்குப் பிறகு தானாக பதிவு செய்யப்பட்டது', tracking: 'கண்காணிப்பு எண்', expected: 'பதில் எதிர்பார்க்கப்படும் நேரம்: 48 மணிநேரம்',
    link: 'ஆதார் அடையாளம் இணைக்க', enterOtp: 'உங்கள் போனுக்கு வந்த 4 இலக்க குறியீட்டை உள்ளிடவும்', verify: 'சரிபார்க்கவும்', request: 'திருத்தக் கோரிக்கை',
    correctName: 'சரியான பெயர்', sendRequest: 'கோரிக்கையை அனுப்பு', nameError: 'தயவுசெய்து சரியான பெயரை உள்ளிடவும்.', success: 'வெற்றிகரமாக முடிந்தது!', successText: 'உங்கள் கோரிக்கை பதிவு செய்யப்பட்டது. தகவல் தெரிவிக்கப்படும்.',
    support: 'உதவி தேவையா?', call: 'ஹெல்ப்லைன் எண்ணைக் காட்டவும்', callShown: '1967 — இலவச உதவி எண் காட்டப்பட்டது', network: 'நெட்வொர்க் நிலை', noNetwork: 'நெட்வொர்க் கிடைக்கவில்லை',
    helpCard: 'நாங்கள் உங்களுடன் இருக்கிறோம்', helpBody: 'சந்தேகம் இருந்தால் 1967 என்ற எண்ணை அழைக்கவும். இது டெமோ முறை.',
    inactiveTitle: 'கார்டை மீண்டும் செயல்படுத்த', inactiveBody: 'உங்கள் கார்டுக்கான மறுஆய்வு கோரிக்கையை நாங்கள் தயார் செய்கிறோம்.',
    activate: 'மறுஆய்வு கோரிக்கை அனுப்ப', otpStep1: 'மொபைல் எண்ணை சரிபார்க்கவும்', otpStep3: 'அடையாளம் இணைக்கப்பட்டது', resolution: 'சிக்கல் தீர்க்கப்பட்டது', resolveDemo: 'தீர்வு காணப்பட்ட டெமோவை பார்க்க',
    days: '3 நாட்களாக தீர்வு இல்லை', check: 'இந்த கடையைத் தேர்வுசெய்', selectedShop: 'இந்த கடையில் இன்று தேவையான தானியங்கள் உள்ளன.', august: 'ஆகஸ்ட்', quantity: 'ஒதுக்கீடு',
    demoStatus: 'நிலை மாற்ற', demoIssue: 'காரணம் மாற்ற', invalidOtp: '4 இலக்கங்களையும் உள்ளிடவும்',
    phoneGate: 'மொபைல் சரிபார்ப்பு', phoneGateSub: 'உங்கள் ரேஷன் விவரங்களை நீங்கள் மட்டுமே காண, பதிவு செய்யப்பட்ட மொபைல் எண்ணை சரிபார்க்கவும்.',
    phoneLabel: 'பதிவு செய்யப்பட்ட மொபைல் எண்', phoneOtpLabel: 'மொபைலுக்கு அனுப்பப்பட்ட 4 இலக்க OTP', phoneOtpHint: 'டெமோ OTP: 1234 (சோதனைக்காக)', wrongOtp: 'தவறான குறியீடு. இந்த டெமோவிற்கு 1234 ஐப் பயன்படுத்தவும்.',
    smsSimTitle: 'புதிய செய்தி · PDS OTP', smsSimBody: 'அன்ன சேது சரிபார்ப்பு குறியீடு: 1234. செல்லுபடியாகும் நேரம்: 10 நிமிடம்.', tapToFill: '1234 ஐ நிரப்ப தட்டவும்',
    allShops: 'அனைத்தும்', openOnly: 'திறந்தவை', riceOnly: 'அரிசி இருப்பு', wheatOnly: 'கோதுமை இருப்பு',
    switchCard: 'டெமோ கார்டு', tnPreset: 'தமிழ்நாடு (TN)', mhPreset: 'மகாராஷ்டிரா (MH)',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்', bookSlot: 'நேரம் முன்பதிவு', selectSlot: 'வருகை நேரத்தை தேர்வுசெய்க', confirmBooking: 'முன்பதிவை உறுதிசெய்க',
    tokenPassTitle: 'PDS முன்னுரிமை டோக்கன்', tokenNote: 'ரேஷன் கடையில் இந்த டோக்கனை காட்டி வரிசையின்றி பெற்றுக்கொள்ளலாம்', viewOnMap: 'கூகிள் மேப்',
    queueAhead: 'முன் உள்ளவர்கள்', estWait: 'காத்திருப்பு நேரம்', currentCardName: 'அட்டையில் உள்ள தவறான பெயர்', correctAadhaarName: 'ஆதார் படி சரியான பெயர்',
    docVerifyNote: 'ஆதார் e-KYC சரிபார்க்கப்பட்டு பதிவு செய்யப்படும்', fillFromAadhaar: 'ஆதார் பெயர் நிரப்பு', liveTracking: 'நேரலை நிலை கண்காணிப்பு',
    officerReview: 'வட்ட வழங்கல் அலுவலர் ஆய்வு', stockDispatch: 'கடைக்கு கூடுதல் ஒதுக்கீடு', advanceProgress: 'அடுத்த நிலைக்கு நகர்த்து',
    changeCard: 'கார்டை மாற்றுக', cardEntered: 'தேர்ந்தெடுக்கப்பட்ட கார்டு', clearCard: 'கார்டை மாற்று',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    selectStateSub: 'உங்கள் பொது விநியோகத் திட்ட போர்ட்டலை தேர்ந்தெடுக்கவும்',
    activeStates: 'செயல்பாட்டில் உள்ள மாநிலங்கள்',
    comingSoon: 'விரைவில் வருகிறது',
    changeState: 'மாநிலத்தை மாற்ற',
    privacyNote: '🔒 தனியுரிமை உறுதி: உங்கள் ரேஷன் எண் மற்றும் விவரங்கள் இந்த சாதனத்தில் மட்டுமே இருக்கும்.',
    listen: 'கேளுங்கள்',
    stopListening: 'நிறுத்து',
    pickupRation: 'ரேஷன் வாங்கச் செல்க',
    viewReceipt: 'டிஜிட்டல் ரசீது',
    digitalReceipt: 'டிஜிட்டல் ரேஷன் ரசீது',
    receiptTxn: 'பரிவர்த்தனை எண்',
    receiptShop: 'நியாய விலைக் கடை',
    receiptCommodity: 'பொருள்',
    receiptEntitled: 'ஒதுக்கீடு',
    receiptIssued: 'பெற்றது',
    receiptRate: 'விலை',
    receiptTotal: 'மொத்தம்',
    freeNfsa: 'இலவசம் (NFSA)',
    downloadReceipt: 'ரசீதை சேமிக்க / அச்சிடுக',
    close: 'மூடுக',
    entitlementBreakdown: 'மாத ஒதுக்கீடு vs பெற்றது',
    categoryNorms: 'அட்டை பிரிவு வரம்பு',
    shortfallAlert: 'குறைபாடு கண்டறியப்பட்டது',
    raiseMonthGrievance: 'இந்த குறைபாட்டிற்கு புகார் செய்',
    grievanceSLA: 'NFSA பிரிவு 19 படி, புகார்கள் 7 நாட்களுக்குள் தீர்க்கப்பட வேண்டும்.',
    confirmGrievance: 'புகாரை உறுதிசெய்க',
    myGrievances: 'என் புகார்கள்',
    grievanceLogTitle: 'அதிகாரிகளின் நடவடிக்கை வரலாறு',
    shareTicket: 'வாட்ஸ்அப்பில் பகிர்க',
    offlineQueued: 'இணையம் இல்லை. புகார் சாதனத்தில் சேமிக்கப்பட்டது.',
    askAssistant: 'உதவி வழிகாட்டி',
    assistantTitle: 'அன்ன சேது உதவி வழிகாட்டி',
    assistantScopeNotice: 'ℹ️ இந்த உதவி இந்த செயலியை பயன்படுத்த மட்டுமே உதவும். அட்டை மற்றும் சட்டம் சார்ந்த முடிவுகளுக்கு 1967 எண்ணை அழைக்கவும்.',
    askPlaceholder: 'செயலியை எப்படி பயன்படுத்துவது என கேளுங்கள்…',
    waOptInTitle: 'வாட்ஸ்அப் மாதாந்திர தகவல் பெற',
    waOptInSub: 'ரேஷன் கடைக்கு தானியங்கள் வந்தவுடன் தகவல் பெறுக',
    waOptInBtn: 'வாட்ஸ்அப் இணைக்க',
    registryDisclaimer: 'அதிகாரப்பூர்வ அரசு பதிவு தகவல்: கடை பெயர்கள் மற்றும் தானிய இருப்பு பதிவு செய்யப்பட்ட மொழியிலேயே காட்டப்படுகின்றன.',
    issuedStamp: '✓ வழங்கப்பட்டது',
    verifiedBeneficiary: 'NFSA சரிபார்க்கப்பட்ட பயனாளி',
    servicesHub: 'PDS மக்கள் சேவைகள்',
    shopsService: 'நியாய விலைக் கடைகள்',
    shopsServiceSub: 'இருப்பு நிலை மற்றும் நேரம்',
    tokenService: 'முன்னுரிமை டோக்கன்',
    tokenServiceSub: 'வரிசை தவிர்க்க நேரம் ஒதுக்கு',
    historyService: 'ஒதுக்கீடு வரலாறு',
    historyServiceSub: '6 மாத பதிவுகள் மற்றும் குறைபாடுகள்',
    grievanceService: 'புகார் மையம்',
    grievanceServiceSub: '7 நாள் தீர்வு உத்தரவாதம்',
    nfsaBanner: 'தேசிய உணவு பாதுகாப்பு சட்டம் (NFSA 2013): மானிய தானியம் உங்கள் சட்டப்பூர்வ உரிமை. உதவிக்கு 1967 அழைக்கவும்.',
    monthlyQuotaTitle: 'ஆகஸ்ட் 2026 ஒதுக்கீடு',
    quotaReceivedDesc: 'மாத ஒதுக்கீடு வெற்றிகரமாக வழங்கப்பட்டது',
    allocatedReceived: 'ஒதுக்கப்பட்டு பெறப்பட்டது',
    listenToEntitlement: 'ஒதுக்கீட்டை கேட்கவும்'
  },
  hi: {
    app: 'अन्न सेतु', greeting: 'नमस्ते', tagline: 'राशन की सही जानकारी, सही समय पर',
    demo: 'डेमो मोड — कोई असली सरकारी सिस्टम नहीं जुड़ा है',
    home: 'घर', shops: 'दुकानें', history: 'इतिहास', help: 'मदद',
    helper: 'किसी और की मदद करें', helperSub: 'परिवार या पड़ोसी का कार्ड देखें',
    helperCard: 'जिसकी मदद कर रहे हैं, उनका कार्ड नंबर', checkPerson: 'स्थिति देखें', ownCard: 'अपने कार्ड पर लौटें',
    cardNo: 'राशन कार्ड नंबर', cardSaved: 'राशन कार्ड', continue: 'आगे बढ़ें', loading: 'स्थिति जाँची जा रही है…',
    cardError: 'कृपया कम से कम 6 अंकों का सही कार्ड नंबर डालें।',
    offline: 'आपकी जानकारी फोन में सुरक्षित है। नेटवर्क आते ही अपडेट होगी।',
    entitlement: 'इस महीने का राशन', denied: 'राशन रुका है', partial: 'कुछ राशन मिला', received: 'पूर्ण कोटा प्राप्त हुआ', issue: 'क्या हुआ?',
    nearby: 'उचित दर दुकानें', today: 'आज का स्टॉक', rice: 'चावल', wheat: 'गेहूँ', sugar: 'चीनी', dal: 'दाल',
    available: 'मिल रहा है', out: 'आज नहीं है', open: 'खुली है', closed: 'अभी बंद है',
    timeline: 'पिछले 6 महीने', pattern: 'पिछले 3 महीनों में 2 बार राशन में समस्या हुई', fast: '3 दिन आगे बढ़ाएँ', fastSub: 'शिकायत अपने-आप बनने का डेमो देखें',
    back: 'वापस', grievance: 'शिकायत तैयार है', autoCreated: '3 दिन बाद अपने-आप दर्ज की गई', tracking: 'ट्रैकिंग नंबर', expected: 'जवाब मिलने का समय: 48 घंटे',
    link: 'पहचान जोड़ें', enterOtp: 'मोबाइल पर आया 4 अंकों का कोड डालें', verify: 'सत्यापित करें', request: 'सुधार का अनुरोध',
    correctName: 'सही नाम', sendRequest: 'अनुरोध भेजें', nameError: 'कृपया अपना सही नाम भरें।', success: 'हो गया!', successText: 'आपका अनुरोध दर्ज हो गया है। हम आपको बताएँगे।',
    support: 'मदद चाहिए?', call: 'हेल्पलाइन नंबर देखें', callShown: '1967 — हेल्पलाइन नंबर दिखा दिया गया है', network: 'नेटवर्क स्थिति', noNetwork: 'नेटवर्क नहीं मिला',
    helpCard: 'हम आपके साथ हैं', helpBody: 'समझ न आए तो 1967 पर कॉल करें।',
    inactiveTitle: 'कार्ड फिर चालू करें', inactiveBody: 'हम जाँच के लिए आपका अनुरोध तैयार कर देंगे।',
    activate: 'जाँच का अनुरोध भेजें', otpStep1: 'मोबाइल नंबर जाँचें', otpStep3: 'पहचान जुड़ गई', resolution: 'समाधान पूरा हुआ', resolveDemo: 'समाधान होने का डेमो देखें',
    days: '3 दिन से समाधान नहीं हुआ', check: 'सही दुकान चुनें', selectedShop: 'यह दुकान आज दोनों अनाज दे सकती है।', august: 'अगस्त', quantity: 'कोटा',
    demoStatus: 'स्थिति बदलें', demoIssue: 'कारण बदलें', invalidOtp: 'चार अंक डालें',
    phoneGate: 'मोबाइल सत्यापन', phoneGateSub: 'आपका राशन विवरण सिर्फ आपको दिखे, इसलिए पहले मोबाइल नंबर जाँचें।',
    phoneLabel: 'मोबाइल नंबर', phoneOtpLabel: 'मोबाइल पर आया कोड डालें', phoneOtpHint: 'डेमो OTP: 1234', wrongOtp: 'गलत कोड। 1234 डालें।',
    smsSimTitle: 'नया संदेश · PDS OTP', smsSimBody: 'अन्न सेतु सत्यापन कोड 1234 है। वैधता: 10 मिनट।', tapToFill: '1234 ऑटो-फिल करें',
    allShops: 'सभी दुकानें', openOnly: 'खुली दुकानें', riceOnly: 'चावल उपलब्ध', wheatOnly: 'गेहूँ उपलब्ध',
    switchCard: 'डेमो कार्ड', tnPreset: 'तमिलनाडु (TN)', mhPreset: 'महाराष्ट्र (MH)',
    selectLanguage: 'भाषा चुनें', bookSlot: 'समय स्लॉट बुक करें', selectSlot: 'आगमन समय चुनें', confirmBooking: 'बुकिंग की पुष्टि करें',
    tokenPassTitle: 'PDS प्राथमिकता ई-टोकन', tokenNote: 'दुकान पर यह टोकन दिखाकर बिना कतार राशन प्राप्त करें', viewOnMap: 'गूगल मैप्स',
    queueAhead: 'कतार में आगे', estWait: 'अनुमानित समय', currentCardName: 'कार्ड पर दर्ज गलत नाम', correctAadhaarName: 'आधार अनुसार सही नाम',
    docVerifyNote: 'आधार e-KYC सत्यापन स्वतः संलग्न होगा', fillFromAadhaar: 'आधार नाम भरें', liveTracking: 'लाइव स्थिति ट्रैकिंग',
    officerReview: 'आपूर्ति अधिकारी समीक्षा', stockDispatch: 'दुकान आवंटन प्रेषित', advanceProgress: 'अगला चरण देखें',
    changeCard: 'कार्ड बदलें', cardEntered: 'चुना गया कार्ड', clearCard: 'कार्ड बदलें',
    selectState: 'अपना राज्य चुनें',
    selectStateSub: 'अपने सार्वजनिक वितरण प्रणाली (PDS) पोर्टल का चयन करें',
    activeStates: 'सक्रिय राज्य',
    comingSoon: 'शीघ्र उपलब्ध',
    changeState: 'राज्य बदलें',
    privacyNote: '🔒 गोपनीयता गारंटी: आपका राशन विवरण केवल आपके फोन पर सुरक्षित रहता है।',
    listen: 'सुनें',
    stopListening: 'रोकें',
    pickupRation: 'राशन लेने जाएँ',
    viewReceipt: 'डिजिटल रसीद',
    digitalReceipt: 'डिजिटल राशन रसीद',
    receiptTxn: 'लेन-देन संख्या',
    receiptShop: 'राशन दुकान',
    receiptCommodity: 'खाद्यान्न',
    receiptEntitled: 'पात्रता',
    receiptIssued: 'प्राप्त',
    receiptRate: 'दर',
    receiptTotal: 'कुल',
    freeNfsa: 'मुफ्त (NFSA)',
    downloadReceipt: 'रसीद सहेजें / प्रिंट करें',
    close: 'बंद करें',
    entitlementBreakdown: 'मासिक आवंटन बनाम प्राप्त',
    categoryNorms: 'कार्ड श्रेणी कोटा',
    shortfallAlert: 'कमी दर्ज की गई',
    raiseMonthGrievance: 'इस कमी की शिकायत दर्ज करें',
    grievanceSLA: 'NFSA धारा 19 के तहत शिकायतों का निवारण 7 कार्य दिवसों में अनिवार्य है।',
    confirmGrievance: 'शिकायत की पुष्टि करें',
    myGrievances: 'मेरी शिकायतें',
    grievanceLogTitle: 'अधिकारी कार्रवाई विवरण',
    shareTicket: 'व्हाट्सएप पर साझा करें',
    offlineQueued: 'इंटरनेट नहीं है। शिकायत फोन में सहेजी गई है।',
    askAssistant: 'सहायता गाइड',
    assistantTitle: 'अन्न सेतु सहायता सहायक',
    assistantScopeNotice: 'ℹ️ यह सहायक केवल इस ऐप के संचालन में मदद करता है। कानूनी सहायता हेतु 1967 पर कॉल करें।',
    askPlaceholder: 'ऐप के उपयोग संबंधी प्रश्न पूछें…',
    waOptInTitle: 'व्हाट्सएप पर मासिक अलर्ट प्राप्त करें',
    waOptInSub: 'राशन दुकान में खाद्यान्न आते ही सूचना पाएँ',
    waOptInBtn: 'व्हाट्सएप जोड़ें',
    registryDisclaimer: 'आधिकारिक सरकारी रजिस्ट्री डेटा: दुकान का विवरण राज्य पोर्टल के अनुसार प्रदर्शित है।',
    issuedStamp: '✓ जारी किया गया',
    verifiedBeneficiary: 'NFSA सत्यापित लाभार्थी',
    servicesHub: 'नागरिक सेवा केंद्र',
    shopsService: 'उचित दर दुकानें',
    shopsServiceSub: 'स्टॉक व दुकान का समय देखें',
    tokenService: 'प्राथमिकता टोकन',
    tokenServiceSub: 'कतार से बचने हेतु समय चुनें',
    historyService: 'आवंटन इतिहास',
    historyServiceSub: '6 माह का रिकॉर्ड व कमी विवरण',
    grievanceService: 'शिकायत निवारण',
    grievanceServiceSub: '7 दिवसीय वैधानिक समाधान गारंटी',
    nfsaBanner: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA 2013): रियायती अनाज आपका कानूनी अधिकार है। सहायता: 1967 (टोल-फ्री)।',
    monthlyQuotaTitle: 'अगस्त 2026 आवंटन',
    quotaReceivedDesc: 'मासिक राशन सफलतापूर्वक प्राप्त हुआ',
    allocatedReceived: 'आवंटित व प्राप्त',
    listenToEntitlement: 'आवंटन सुनें'
  },
  mr: {
    app: 'अन्न सेतु', greeting: 'नमस्ते', tagline: 'रेशनची अचूक माहिती, योग्य वेळी',
    demo: 'डेमो मोड — कोणतीही सरकारी यंत्रणा जोडलेली नाही',
    home: 'मुख्यपृष्ठ', shops: 'दुकाने', history: 'इतिहास', help: 'मदत',
    helper: 'इतरांना मदत करा', helperSub: 'कुटुंब किंवा शेजाऱ्यांचे कार्ड तपासा',
    helperCard: 'रेशन कार्ड नंबर', checkPerson: 'स्थिती पहा', ownCard: 'माझ्या कार्डवर परत जा',
    cardNo: 'रेशन कार्ड नंबर', cardSaved: 'रेशन कार्ड', continue: 'पुढे जा', loading: 'स्थिती तपासली जात आहे…',
    cardError: 'कृपया किमान 6 अंकी योग्य कार्ड नंबर टाका.',
    offline: 'माहिती फोनमध्ये सुरक्षित आहे.',
    entitlement: 'या महिन्याचे रेशन', denied: 'रेशन थांबवले आहे', partial: 'काही रेशन मिळाले', received: 'पूर्ण कोटा प्राप्त झाला', issue: 'काय झाले?',
    nearby: 'जवळची रास्त भाव दुकाने', today: 'आजचा साठा', rice: 'तांदूळ', wheat: 'गहू', sugar: 'साखर', dal: 'डाळ',
    available: 'उपलब्ध आहे', out: 'आज नाही', open: 'उघडे आहे', closed: 'बंद आहे',
    timeline: 'मागील 6 महिने', pattern: 'मागील 3 महिन्यांत 2 वेळा रेशनमध्ये अडचण आली', fast: '3 दिवस पुढे करा', fastSub: 'तक्रार आपोआप नोंदवली जाणे पहा',
    back: 'मागे', grievance: 'तक्रार तयार आहे', autoCreated: '3 दिवसांनंतर आपोआप नोंदवली गेली', tracking: 'ट्रॅकिंग नंबर', expected: 'अपेक्षित वेळ: 48 तास',
    link: 'ओळख लिंक करा', enterOtp: '4 अंकी कोड टाका', verify: 'पडताळणी करा', request: 'दुरुस्ती विनंती',
    correctName: 'योग्य नाव', sendRequest: 'विनंती पाठवा', nameError: 'कृपया योग्य नाव भरा.', success: 'यशस्वी झाले!', successText: 'आपली विनंती नोंदवली गेली आहे.',
    support: 'मदत हवी आहे?', call: 'हेल्पलाइन नंबर', callShown: '1967 — हेल्पलाइन दाखवली', network: 'नेटवर्क स्थिती', noNetwork: 'नेटवर्क नाही',
    helpCard: 'आम्ही सोबत आहोत', helpBody: 'शंका असल्यास 1967 वर कॉल करा.',
    inactiveTitle: 'कार्ड पुन्हा सुरू करा', inactiveBody: 'आम्ही पुनरावलोकन विनंती तयार करू.',
    activate: 'विनंती पाठवा', otpStep1: 'मोबाईल तपासा', otpStep3: 'ओळख लिंक झाली', resolution: 'निवारण झाले', resolveDemo: 'निवारण डेमो',
    days: '3 दिवसांपासून निवारण नाही', check: 'हे दुकान निवडा', selectedShop: 'या दुकानात साठा उपलब्ध आहे.', august: 'ऑगस्ट', quantity: 'कोटा',
    demoStatus: 'स्थिती बदला', demoIssue: 'कारण बदला', invalidOtp: '4 अंक टाका',
    phoneGate: 'मोबाईल पडताळणी', phoneGateSub: 'आपली माहिती सुरक्षित राहण्यासाठी मोबाईल तपासा.',
    phoneLabel: 'मोबाईल नंबर', phoneOtpLabel: 'OTP कोड टाका', phoneOtpHint: 'डेमो OTP: 1234', wrongOtp: 'चुकीचा कोड. 1234 वापरा.',
    smsSimTitle: 'नवीन संदेश · PDS OTP', smsSimBody: 'अन्न सेतु पडताळणी कोड 1234 आहे.', tapToFill: '1234 भरा',
    allShops: 'सर्व दुकाने', openOnly: 'उघडी दुकाने', riceOnly: 'तांदूळ साठा', wheatOnly: 'गहू साठा',
    switchCard: 'डेमो कार्ड', tnPreset: 'तमिळनाडू (TN)', mhPreset: 'महाराष्ट्र (MH)',
    selectLanguage: 'भाषा निवडा', bookSlot: 'वेळ स्लॉट बुक करा', selectSlot: 'येण्याची वेळ निवडा', confirmBooking: 'पुष्टी करा',
    tokenPassTitle: 'PDS प्राधान्य ई-टोकन', tokenNote: 'रांगेत उभे न राहता रेशन मिळवण्यासाठी हे टोकन दाखवा', viewOnMap: 'गुगल मॅप्स',
    queueAhead: 'रांगेत पुढे लोक', estWait: 'अपेक्षित प्रतीक्षा', currentCardName: 'कार्डवरील चुकीचे नाव', correctAadhaarName: 'आधारनुसार अचूक नाव',
    docVerifyNote: 'आधार e-KYC पडताळणी पूर्ण झाली', fillFromAadhaar: 'आधार नाव भरा', liveTracking: 'थेट ट्रॅकिंग',
    officerReview: 'अधिकारी पुनरावलोकन', stockDispatch: 'साठा वाटप पाठवले', advanceProgress: 'पुढील टप्पा पहा',
    changeCard: 'कार्ड बदला', cardEntered: 'निवडलेले कार्ड', clearCard: 'कार्ड बदला',
    selectState: 'आपले राज्य निवडा',
    selectStateSub: 'आपले सार्वजनिक वितरण प्रणाली (PDS) पोर्टल निवडा',
    activeStates: 'सक्रिय राज्ये',
    comingSoon: 'लवकरच येत आहे',
    changeState: 'राज्य बदला',
    privacyNote: '🔒 गोपनीयता हमी: आपली रेशन माहिती आपल्या फोनवर सुरक्षित आहे.',
    listen: 'ऐका',
    stopListening: 'थांबवा',
    pickupRation: 'रेशन आणण्यासाठी जा',
    viewReceipt: 'डिजिटल पावती',
    digitalReceipt: 'डिजिटल रेशन पावती',
    receiptTxn: 'व्यवहार क्रमांक',
    receiptShop: 'रास्त भाव दुकान',
    receiptCommodity: 'धान्य',
    receiptEntitled: 'पात्रता',
    receiptIssued: 'प्राप्त',
    receiptRate: 'दर',
    receiptTotal: 'एकूण',
    freeNfsa: 'मोफत (NFSA)',
    downloadReceipt: 'पावती सेव्ह करा / प्रिंट करा',
    close: 'बंद करा',
    entitlementBreakdown: 'मासिक वाटप विरुद्ध मिळालेले',
    categoryNorms: 'कार्ड श्रेणी मर्यादा',
    shortfallAlert: 'तुटवडा आढळला',
    raiseMonthGrievance: 'या तुटवड्याची तक्रार नोंदवा',
    grievanceSLA: 'NFSA कलम 19 नुसार 7 दिवसांत तक्रार निवारण आवश्यक आहे.',
    confirmGrievance: 'तक्रार निश्चित करा',
    myGrievances: 'माझ्या तक्रारी',
    grievanceLogTitle: 'अधिकारी कारवाई नोंद',
    shareTicket: 'व्हॉट्सॲपवर पाठवा',
    offlineQueued: 'ऑफलाइन मोड. इंटरनेट आल्यावर तक्रार आपोआप पाठवली जाईल.',
    askAssistant: 'मार्गदर्शक',
    assistantTitle: 'अन्न सेतु ॲप मार्गदर्शक',
    assistantScopeNotice: 'ℹ️ हा सहाय्यक फक्त हे ॲप वापरण्यासाठी मदत करतो. कायदेशीर मार्गदर्शनासाठी 1967 वर कॉल करा.',
    askPlaceholder: 'ॲप वापरण्याबद्दल विचारा…',
    waOptInTitle: 'व्हॉट्सॲपवर रेशन सूचना मिळवा',
    waOptInSub: 'दुकानात धान्य पोहोचताच सूचना मिळवा',
    waOptInBtn: 'व्हॉट्सॲप जोडा',
    registryDisclaimer: 'अधिकृत सरकारी नोंद डेटा: दुकानांची माहिती राज्य पोर्टलनुसार प्रदर्शित केली आहे.',
    issuedStamp: '✓ जारी केले',
    verifiedBeneficiary: 'NFSA सत्यापित लाभार्थी',
    servicesHub: 'नागरिक सेवा केंद्र',
    shopsService: 'रास्त भाव दुकाने',
    shopsServiceSub: 'साठा व दुकानाची वेळ तपासा',
    tokenService: 'प्राधान्य टोकन',
    tokenServiceSub: 'रांगेत उभे न राहता टोकन मिळवा',
    historyService: 'वाटप इतिहास',
    historyServiceSub: '6 महिन्यांचा रेशन नोंदींचा आढावा',
    grievanceService: 'तक्रार निवारण',
    grievanceServiceSub: '7 दिवसांची वैधानिक निराकरण हमी',
    nfsaBanner: 'राष्ट्रीय अन्न सुरक्षा कायदा (NFSA 2013): सवलतीचे धान्य हा आपला कायदेशीर हक्क आहे. मदत: 1967 (टोल-फ्री).',
    monthlyQuotaTitle: 'ऑगस्ट 2026 वाटप',
    quotaReceivedDesc: 'मासिक रेशन यशस्वीरित्या प्राप्त झाले',
    allocatedReceived: 'वाटप व प्राप्त',
    listenToEntitlement: 'वाटप ऐका'
  },
  te: {
    app: 'అన్న సేతు', greeting: 'నమస్కారం', tagline: 'సరైన రేషన్ సమాచారం, సరైన సమయంలో',
    demo: 'డెమో మోడ్ — ఏ ప్రభుత్వ వ్యవస్థ అనుసంధానించబడలేదు',
    home: 'హోమ్', shops: 'షాపులు', history: 'చరిత్ర', help: 'సహాయం',
    helper: 'ఇతరులకు సహాయం', helperSub: 'కుటుంబం లేదా పొరుగువారి కార్డు చూడండి',
    helperCard: 'సహాయం చేసే వ్యక్తి రేషన్ కార్డు నంబర్', checkPerson: 'వివరాలు చూడండి', ownCard: 'నా కార్డుకు తిరిగి వెళ్లండి',
    cardNo: 'రేషన్ కార్డు నంబర్', cardSaved: 'రేషన్ కార్డు', continue: 'కొనసాగించండి', loading: 'వివరాలు తనిఖీ చేయబడుతున్నాయి…',
    cardError: 'కనీసం 6 అక్షరాల సరైన కార్డు నంబర్ నమోదు చేయండి.',
    offline: 'మీ వివరాలు ఫోన్‌లో సురక్షితంగా ఉన్నాయి.',
    entitlement: 'ఈ నెల రేషన్ కోటా', denied: 'రేషన్ నిలిపివేయబడింది', partial: 'కొంత రేషన్ అందింది', received: 'పూర్తి కోటా అందింది', issue: 'ఏమి జరిగింది?',
    nearby: 'సమీప చౌకధరల దుకాణాలు', today: 'నేటి నిల్వ', rice: 'బియ్యం', wheat: 'గోధుమలు', sugar: 'చక్కెర', dal: 'కందిపప్పు',
    available: 'అందుబాటులో ఉంది', out: 'నేడు లేదు', open: 'తెరిచి ఉంది', closed: 'మూసివేయబడింది',
    timeline: 'గత 6 నెలలు', pattern: 'గత 3 నెలల్లో 2 సార్లు రేషన్ సమస్య వచ్చింది', fast: '3 రోజులు ముందుకు జరపండి', fastSub: 'ఫిర్యాదు ఆటోమేటిక్‌గా నమోదు కావడాన్ని చూడండి',
    back: 'వెనుకకు', grievance: 'ఫిర్యాదు సిద్ధంగా ఉంది', autoCreated: '3 రోజుల తర్వాత ఆటోమేటిక్‌గా నమోదైంది', tracking: 'ట్రాకింగ్ నంబర్', expected: 'స్పందన సమయం: 48 గంటలు',
    link: 'గుర్తింపును లింక్ చేయండి', enterOtp: 'మీ ఫోన్‌కు వచ్చిన 4 అంకెల కోడ్‌ను నమోదు చేయండి', verify: 'ధృవీకరించండి', request: 'సవరణ అభ్యర్థన',
    correctName: 'సరైన పేరు', sendRequest: 'అభ్యర్థన పంపండి', nameError: 'దయచేసి సరైన పేరు నమోదు చేయండి.', success: 'విజయవంతమైంది!', successText: 'మీ అభ్యర్థన నమోదైంది.',
    support: 'సహాయం కావాలా?', call: 'హెల్ప్‌లైన్ నంబర్', callShown: '1967 — హెల్ప్‌లైన్ చూపబడింది', network: 'నెట్‌వర్క్ స్థితి', noNetwork: 'నెట్‌వర్క్ లేదు',
    helpCard: 'మేము మీకు తోడుగా ఉన్నాము', helpBody: 'సందేహం ఉంటే 1967కు కాల్ చేయండి.',
    inactiveTitle: 'కార్డు పునరుద్ధరణ', inactiveBody: 'మేము సమీక్ష అభ్యర్థనను సిద్ధం చేస్తాము.',
    activate: 'అభ్యర్థన పంపండి', otpStep1: 'మొబైల్ తనిఖీ', otpStep3: 'గుర్తింపు లింక్ అయింది', resolution: 'పరిష్కరించబడింది', resolveDemo: 'పరిష్కార డెమో',
    days: '3 రోజులుగా పరిష్కారం కాలేదు', check: 'ఈ షాపును ఎంచుకోండి', selectedShop: 'ఈ షాపులో ధాన్యాలు అందుబాటులో ఉన్నాయి.', august: 'ఆగస్టు', quantity: 'కోటా',
    demoStatus: 'స్థితి మార్చు', demoIssue: 'కారణం మార్చు', invalidOtp: '4 అంకెలు నమోదు చేయండి',
    phoneGate: 'మొబైల్ ధృవీకరణ', phoneGateSub: 'మీ రేషన్ వివరాలు మీరు మాత్రమే చూడటానికి మొబైల్ ధృవీకరించండి.',
    phoneLabel: 'మొబైల్ నంబర్', phoneOtpLabel: 'OTP కోడ్ నమోదు చేయండి', phoneOtpHint: 'డెమో OTP: 1234', wrongOtp: 'తప్పు కోడ్. 1234 ఉపయోగించండి.',
    smsSimTitle: 'కొత్త సందేశం · PDS OTP', smsSimBody: 'అన్న సేతు OTP కోడ్: 1234.', tapToFill: '1234 ఆటో-ఫిల్ చేయండి',
    allShops: 'అన్ని షాపులు', openOnly: 'తెరిచినవి', riceOnly: 'బియ్యం నిల్వ', wheatOnly: 'గోధుమలు నిల్వ',
    switchCard: 'డెమో కార్డు', tnPreset: 'తమిళనాడు (TN)', mhPreset: 'మహారాష్ట్ర (MH)',
    selectLanguage: 'భాషను ఎంచుకోండి', bookSlot: 'సమయ స్లాట్ బుక్ చేయండి', selectSlot: 'రాక సమయం ఎంచుకోండి', confirmBooking: 'స్లాట్ నిర్ధారించండి',
    tokenPassTitle: 'PDS ప్రాధాన్యత ఇ-టోకెన్', tokenNote: 'క్యూ లేకుండా రేషన్ పొందడానికి ఈ టోకెన్ చూపించండి', viewOnMap: 'గూగుల్ మ్యాప్స్',
    queueAhead: 'ముందున్న వ్యక్తులు', estWait: 'వేచి ఉండే సమయం', currentCardName: 'కార్డులోని తప్పు పేరు', correctAadhaarName: 'ఆధార్ ప్రకారం సరైన పేరు',
    docVerifyNote: 'ఆధార్ e-KYC ధృవీకరణ పూర్తయింది', fillFromAadhaar: 'ఆధార్ పేరు నింపండి', liveTracking: 'లైవ్ ట్రాకింగ్',
    officerReview: 'అధికారి సమీక్ష', stockDispatch: 'స్టాక్ కేటాయింపు పంపబడింది', advanceProgress: 'తదుపరి దశ చూడండి',
    changeCard: 'కార్డు మార్చండి', cardEntered: 'ఎంచుకున్న కార్డు', clearCard: 'కార్డు మార్చండి',
    selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    selectStateSub: 'మీ ప్రజా పంపిణీ వ్యవస్థ పోర్టల్ ఎంచుకోండి',
    activeStates: 'క్రియాశీల రాష్ట్రాలు',
    comingSoon: 'త్వరలో అందుబాటులోకి',
    changeState: 'రాష్ట్రం మార్చండి',
    privacyNote: '🔒 గోప్యతా భరోసా: మీ కార్డు వివరాలు మీ ఫోన్‌లోనే సురక్షితంగా ఉంటాయి.',
    listen: 'వినండి',
    stopListening: 'ఆపండి',
    pickupRation: 'రేషన్ తీసుకోవడానికి వెళ్లండి',
    viewReceipt: 'డిజిటల్ రసీదు',
    digitalReceipt: 'డిజిటల్ రేషన్ రసీదు',
    receiptTxn: 'లావాదేవీ సంఖ్య',
    receiptShop: 'చౌకధరల దుకాణం',
    receiptCommodity: 'సరుకు',
    receiptEntitled: 'కోటా',
    receiptIssued: 'అందినవి',
    receiptRate: 'ధర',
    receiptTotal: 'మొత్తం',
    freeNfsa: 'ఉచితం (NFSA)',
    downloadReceipt: 'రసీదును భద్రపరచండి',
    close: 'మూసివేయి',
    entitlementBreakdown: 'నెలవారీ కోటా vs అందినవి',
    categoryNorms: 'కార్డు వర్గ పరిమితి',
    shortfallAlert: 'సరుకుల కొరత నమోదైంది',
    raiseMonthGrievance: 'ఈ కొరతపై ఫిర్యాదు చేయండి',
    grievanceSLA: 'NFSA సెక్షన్ 19 ప్రకారం 7 రోజుల్లో ఫిర్యాదు పరిష్కరించాలి.',
    confirmGrievance: 'ఫిర్యాదు నిర్ధారించండి',
    myGrievances: 'నా ఫిర్యాదులు',
    grievanceLogTitle: 'అధికారిక చర్యల వివరాలు',
    shareTicket: 'వాట్సాప్‌లో షేర్ చేయండి',
    offlineQueued: 'ఆఫ్‌లైన్ మోడ్. నెట్‌వర్క్ రాగానే ఫిర్యాదు పంపబడుతుంది.',
    askAssistant: 'యాప్ గైడ్',
    assistantTitle: 'అన్న సేతు యాప్ సహాయకుడు',
    assistantScopeNotice: 'ℹ️ ఈ సహాయకుడు యాప్ వాడకానికి మాత్రమే. చట్టపరమైన ప్రశ్నలకు 1967కు కాల్ చేయండి.',
    askPlaceholder: 'యాప్ వాడకం గురించి అడగండి…',
    waOptInTitle: 'వాట్సాప్ అలర్ట్స్ పొందండి',
    waOptInSub: 'రేషన్ రాగానే సమాచారం తెలుసుకోండి',
    waOptInBtn: 'వాట్సాప్ కనెక్ట్ చేయండి',
    registryDisclaimer: 'అధికారిక ప్రభుత్వ రిజిస్ట్రీ డేటా: దుకాణం పేర్లు అసలు పోర్టల్ ప్రకారం చూపబడ్డాయి.',
    issuedStamp: '✓ జారీ చేయబడింది',
    verifiedBeneficiary: 'NFSA ధృవీకరించబడిన లబ్ధిదారు',
    servicesHub: 'పౌర సేవల కేంద్రం',
    shopsService: 'చౌకధరల దుకాణాలు',
    shopsServiceSub: 'స్టాక్ వివరాలు & వేళలు',
    tokenService: 'ప్రాధాన్యతా టోకెన్',
    tokenServiceSub: 'క్యూ లేకుండా రేషన్ తీసుకోండి',
    historyService: 'కోటా చరిత్ర',
    historyServiceSub: '6 నెలల రికార్డులు & వివరాలు',
    grievanceService: 'ఫిర్యాదుల విభాగం',
    grievanceServiceSub: '7 రోజుల పరిష్కార హామీ',
    nfsaBanner: 'జాతీయ ఆహార భద్రతా చట్టం (NFSA 2013): సబ్సిడీ ధాన్యం మీ చట్టపరమైన హక్కు. సహాయం: 1967 (టోల్-ఫ్రీ).',
    monthlyQuotaTitle: 'ఆగస్టు 2026 కోటా',
    quotaReceivedDesc: 'నెలవారీ కోటా విజయవంతంగా అందింది',
    allocatedReceived: 'కేటాయించి పొందినవి',
    listenToEntitlement: 'కోటా వివరాలు వినండి'
  },
  kn: {
    app: 'ಅನ್ನ ಸೇತು', greeting: 'ನಮಸ್ಕಾರ', tagline: 'ಸರಿಯಾದ ಪಡಿತರ ಮಾಹಿತಿ, ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ',
    demo: 'ಡೆಮೊ ಮೋಡ್ — ಯಾವುದೇ ಸರ್ಕಾರಿ ವ್ಯವಸ್ಥೆ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ',
    home: 'ಮುಖಪುಟ', shops: 'ಅಂಗಡಿಗಳು', history: 'ಇತಿಹಾಸ', help: 'ಸಹಾಯ',
    helper: 'ಇತರರಿಗೆ ಸಹಾಯ', helperSub: 'ಕುಟುಂಬ ಅಥವಾ ನೆರೆಹೊರೆಯವರ ಕಾರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    helperCard: 'ಸಹಾಯ ಪಡೆಯುವವರ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ', checkPerson: 'ವಿವರ ನೋಡಿ', ownCard: 'ನನ್ನ ಕಾರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    cardNo: 'ಪಡಿತರ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ', cardSaved: 'ಪಡಿತರ ಕಾರ್ಡ್', continue: 'ಮುಂದುವರಿಯಿರಿ', loading: 'ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…',
    cardError: 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳ ಸರಿಯಾದ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
    offline: 'ನಿಮ್ಮ ವಿವರಗಳು ಫೋನ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿವೆ.',
    entitlement: 'ಈ ತಿಂಗಳ ಪಡಿತರ ಕೋಟಾ', denied: 'ಪಡಿತರ ಸ್ಥಗಿತಗೊಂಡಿದೆ', partial: 'ಸ್ವಲ್ಪ ಪಡಿತರ ಸಿಕ್ಕಿದೆ', received: 'ಪೂರ್ಣ ಕೋಟಾ ಸಿಕ್ಕಿದೆ', issue: 'ಏನಾಯಿತು?',
    nearby: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಗಳು', today: 'ಇಂದಿನ ದಾಸ್ತಾನು', rice: 'ಅಕ್ಕಿ', wheat: 'ಗೋಧಿ', sugar: 'ಸಕ್ಕರೆ', dal: 'ತೊಗರಿ ಬೇಳೆ',
    available: 'ಲಭ್ಯವಿದೆ', out: 'ಇಂದು ಇಲ್ಲ', open: 'ತೆರೆದಿದೆ', closed: 'ಮುಚ್ಚಲಾಗಿದೆ',
    timeline: 'ಕಳೆದ 6 ತಿಂಗಳು', pattern: 'ಕಳೆದ 3 ತಿಂಗಳಲ್ಲಿ 2 ಬಾರಿ ಸಮಸ್ಯೆ ಕಂಡುಬಂದಿದೆ', fast: '3 ದಿನ ಮುಂದೆ ಸರಿಸಿ', fastSub: 'ದೂರು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದಾಖಲಾಗುವುದನ್ನು ನೋಡಿ',
    back: 'ಹಿಂದೆ', grievance: 'ದೂರು ಸಿದ್ಧವಾಗಿದೆ', autoCreated: '3 ದಿನಗಳ ನಂತರ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದಾಖಲಾಗಿದೆ', tracking: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ', expected: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ: 48 ಗಂಟೆ',
    link: 'ಗುರುತು ಲಿಂಕ್ ಮಾಡಿ', enterOtp: '4 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ', verify: 'ಪರಿಶೀಲಿಸಿ', request: 'ತಿದ್ದುಪಡಿ ವಿನಂತಿ',
    correctName: 'ಸರಿಯಾದ ಹೆಸರು', sendRequest: 'ವಿನಂತಿ ಕಳುಹಿಸಿ', nameError: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.', success: 'ಯಶಸ್ವಿಯಾಗಿದೆ!', successText: 'ನಿಮ್ಮ ವಿನಂತಿ ದಾಖಲಾಗಿದೆ.',
    support: 'ಸಹಾಯ ಬೇಕೇ?', call: 'ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ', callShown: '1967 — ಸಹಾಯವಾಣಿ ತೋರಿಸಲಾಗಿದೆ', network: 'ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ', noNetwork: 'ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲ',
    helpCard: 'ನಾವು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇವೆ', helpBody: 'ಅನುಮಾನವಿದ್ದರೆ 1967 ಗೆ ಕರೆ ಮಾಡಿ.',
    inactiveTitle: 'ಕಾರ್ಡ್ ಮರುಸಕ್ರಿಯಗೊಳಿಸಿ', inactiveBody: 'ನಾವು ಪರಿಶೀಲನಾ ವಿನಂತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತೇವೆ.',
    activate: 'ವಿನಂತಿ ಕಳುಹಿಸಿ', otpStep1: 'ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ', otpStep3: 'ಗುರುತು ಲಿಂಕ್ ಆಗಿದೆ', resolution: 'ಪರಿಹರಿಸಲಾಗಿದೆ', resolveDemo: 'ಪರಿಹಾರದ ಡೆಮೊ',
    days: '3 ದಿನಗಳಿಂದ ಪರಿಹಾರವಾಗಿಲ್ಲ', check: 'ಈ ಅಂಗಡಿ ಆಯ್ಕೆಮಾಡಿ', selectedShop: 'ಈ ಅಂಗಡಿಯಲ್ಲಿ ದಾಸ್ತಾನು ಲಭ್ಯವಿದೆ.', august: 'ಆಗಸ್ಟ್', quantity: 'ಕೋಟಾ',
    demoStatus: 'ಸ್ಥಿತಿ ಬದಲಿಸಿ', demoIssue: 'ಕಾರಣ ಬದಲಿಸಿ', invalidOtp: '4 ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ',
    phoneGate: 'ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ', phoneGateSub: 'ನಿಮ್ಮ ಪಡಿತರ ವಿವರಗಳನ್ನು ನೀವು ಮಾತ್ರ ನೋಡಲು ಮೊಬೈಲ್ ಪರಿಶೀಲಿಸಿ.',
    phoneLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', phoneOtpLabel: 'OTP ಕೋಡ್ ನಮೂದಿಸಿ', phoneOtpHint: 'ಡೆಮೊ OTP: 1234', wrongOtp: 'ತಪ್ಪು ಕೋಡ್. 1234 ಬಳಸಿ.',
    smsSimTitle: 'ಹೊಸ ಸಂದೇಶ · PDS OTP', smsSimBody: 'ಅನ್ನ ಸೇತು OTP: 1234.', tapToFill: '1234 ಆಟೋ-ಫಿಲ್ ಮಾಡಿ',
    allShops: 'ಎಲ್ಲಾ ಅಂಗಡಿಗಳು', openOnly: 'ತೆರೆದಿರುವ ಅಂಗಡಿಗಳು', riceOnly: 'ಅಕ್ಕಿ ದಾಸ್ತಾನು', wheatOnly: 'ಗೋಧಿ ದಾಸ್ತಾನು',
    switchCard: 'ಡೆಮೊ ಕಾರ್ಡ್', tnPreset: 'ತಮಿಳುನಾಡು (TN)', mhPreset: 'ಮಹಾರಾಷ್ಟ್ರ (MH)',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', bookSlot: 'ಸಮಯ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ', selectSlot: 'ಭೇಟಿ ಸಮಯ ಆರಿಸಿ', confirmBooking: 'ದೃಢೀಕರಿಸಿ',
    tokenPassTitle: 'PDS ಆದ್ಯತಾ ಇ-ಟೋಕನ್', tokenNote: 'ಸರತಿ ತಪ್ಪಿಸಲು ಅಂಗಡಿಯಲ್ಲಿ ಈ ಟೋಕನ್ ತೋರಿಸಿ', viewOnMap: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್',
    queueAhead: 'ಮುಂದಿರುವ ಜನರು', estWait: 'ನಿರೀಕ್ಷಿತ ಕಾಯುವಿಕೆ', currentCardName: 'ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ತಪ್ಪು ಹೆಸರು', correctAadhaarName: 'ಆಧಾರ್ ಪ್ರಕಾರ ಸರಿಯಾದ ಹೆಸರು',
    docVerifyNote: 'ಆಧಾರ್ e-KYC ಪರಿಶೀಲಿಸಲಾಗಿದೆ', fillFromAadhaar: 'ಆಧಾರ್ ಹೆಸರು ತುಂಬಿ', liveTracking: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    officerReview: 'ಅಧಿಕಾರಿ ಪರಿಶೀಲನೆ', stockDispatch: 'ದಾಸ್ತಾನು ರವಾನಿಸಲಾಗಿದೆ', advanceProgress: 'ಮುಂದಿನ ಹಂತ ನೋಡಿ',
    changeCard: 'ಕಾರ್ಡ್ ಬದಲಾಯಿಸಿ', cardEntered: 'ಆಯ್ಕೆಮಾಡಿದ ಕಾರ್ಡ್', clearCard: 'ಕಾರ್ಡ್ ಬದಲಾಯಿಸಿ',
    selectState: 'ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectStateSub: 'ನಿಮ್ಮ ಪಡಿತರ ವಿತರಣಾ ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ',
    activeStates: 'ಸಕ್ರಿಯ ರಾಜ್ಯಗಳು',
    comingSoon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',
    changeState: 'ರಾಜ್ಯ ಬದಲಿಸಿ',
    privacyNote: '🔒 ಗೌಪ್ಯತೆ ಭರವಸೆ: ನಿಮ್ಮ ಪಡಿತರ ಮಾಹಿತಿ ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಮಾತ್ರ ಇರುತ್ತದೆ.',
    listen: 'ಕೇಳಿ',
    stopListening: 'ನಿಲ್ಲಿಸಿ',
    pickupRation: 'ಪಡಿತರ ಪಡೆಯಿರಿ',
    viewReceipt: 'ಡಿಜಿಟಲ್ ರಶೀದಿ',
    digitalReceipt: 'ಡಿಜಿಟಲ್ ಪಡಿತರ ರಶೀದಿ',
    receiptTxn: 'ವಹಿವಾಟು ಸಂಖ್ಯೆ',
    receiptShop: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ',
    receiptCommodity: 'ವಸ್ತು',
    receiptEntitled: 'ಕೋಟಾ',
    receiptIssued: 'ಪಡೆದದ್ದು',
    receiptRate: 'ದರ',
    receiptTotal: 'ಒಟ್ಟು',
    freeNfsa: 'ಉಚಿತ (NFSA)',
    downloadReceipt: 'ರಶೀದಿ ಉಳಿಸಿ / ಮುದ್ರಿಸಿ',
    close: 'ಮುಚ್ಚಿ',
    entitlementBreakdown: 'ಮಾಸಿಕ ಕೋಟಾ vs ಪಡೆದದ್ದು',
    categoryNorms: 'ಕಾರ್ಡ್ ವರ್ಗ ಮಿತಿ',
    shortfallAlert: 'ದಾಸ್ತಾನು ಕೊರತೆ ಕಂಡುಬಂದಿದೆ',
    raiseMonthGrievance: 'ಈ ಕೊರತೆಗೆ ದೂರು ಸಲ್ಲಿಸಿ',
    grievanceSLA: 'NFSA ಕಲಂ 19 ರ ಅಡಿಯಲ್ಲಿ 7 ದಿನಗಳಲ್ಲಿ ದೂರು ಪರಿಹರಿಸಬೇಕು.',
    confirmGrievance: 'ದೂರು ದೃಢೀಕರಿಸಿ',
    myGrievances: 'ನನ್ನ ದೂರುಗಳು',
    grievanceLogTitle: 'ಅಧಿಕಾರಿಗಳ ಕ್ರಮದ ವಿವರ',
    shareTicket: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
    offlineQueued: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್. ನೆಟ್‌ವರ್ಕ್ ಬಂದ ನಂತರ ದೂರು ಸಲ್ಲಿಸಲಾಗುವುದು.',
    askAssistant: 'ಆ್ಯಪ್ ಗೈಡ್',
    assistantTitle: 'ಅನ್ನ ಸೇತು ಸಹಾಯ ಸಹಾಯಕ',
    assistantScopeNotice: 'ℹ️ ಈ ಸಹಾಯಕ ಆ್ಯಪ್ ಬಳಕೆಗೆ ಮಾತ್ರ. ಹಕ್ಕಿನ ವಿವರಗಳಿಗೆ 1967 ಗೆ ಕರೆ ಮಾಡಿ.',
    askPlaceholder: 'ಆ್ಯಪ್ ಬಳಕೆಯ ಬಗ್ಗೆ ಪ್ರಶ್ನಿಸಿ…',
    waOptInTitle: 'ವಾಟ್ಸಾಪ್ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ',
    waOptInSub: 'ಪಡಿತರ ಬಂದ ತಕ್ಷಣ ಮಾಹಿತಿ ಪಡೆಯಿರಿ',
    waOptInBtn: 'ವಾಟ್ಸಾಪ್ ಸಂಪರ್ಕಿಸಿ',
    registryDisclaimer: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ದಾಖಲೆ: ಅಂಗಡಿ ವಿವರಗಳು ಪೋರ್ಟಲ್ ಪ್ರಕಾರ ಪ್ರದರ್ಶಿತವಾಗಿದೆ.',
    issuedStamp: '✓ ನೀಡಲಾಗಿದೆ',
    verifiedBeneficiary: 'NFSA ಪರಿಶೀಲಿಸಿದ ಫಲಾನುಭವಿ',
    servicesHub: 'ನಾಗರಿಕ ಸೇವಾ ಕೇಂದ್ರ',
    shopsService: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಗಳು',
    shopsServiceSub: 'ದಾಸ್ತಾನು ಮತ್ತು ಸಮಯ ಪರಿಶೀಲಿಸಿ',
    tokenService: 'ಆದ್ಯತಾ ಟೋಕನ್',
    tokenServiceSub: 'ಸರತಿ ತಪ್ಪಿಸಿ ಸಮಯ ನಿಗದಿಪಡಿಸಿ',
    historyService: 'ಕೋಟಾ ಇತಿಹಾಸ',
    historyServiceSub: '6 ತಿಂಗಳ ವಿವರ ಮತ್ತು ದಾಖಲೆಗಳು',
    grievanceService: 'ದೂರು ಪರಿಹಾರ',
    grievanceServiceSub: '7 ದಿನಗಳ ಶಾಸನಬದ್ಧ ಪರಿಹಾರ ಭರವಸೆ',
    nfsaBanner: 'ರಾಷ್ಟ್ರೀಯ ಆಹಾರ ಭದ್ರತಾ ಕಾಯಿದೆ (NFSA 2013): ರಿಯಾಯಿತಿ ಪಡಿತರ ನಿಮ್ಮ ಹಕ್ಕು. ಸಹಾಯವಾಣಿ: 1967 (ಉಚಿತ).',
    monthlyQuotaTitle: 'ಆಗಸ್ಟ್ 2026 ಕೋಟಾ',
    quotaReceivedDesc: 'ಮಾಸಿಕ ಪಡಿತರ ಯಶಸ್ವಿಯಾಗಿ ಸಿಕ್ಕಿದೆ',
    allocatedReceived: 'ಹಂಚಿಕೆ ಮತ್ತು ಪಡೆಯಲಾಗಿದೆ',
    listenToEntitlement: 'ಕೋಟಾ ವಿವರ ಆಲಿಸಿ'
  },
  ml: {
    app: 'അന്ന സേതു', greeting: 'നമസ്കാരം', tagline: 'കൃത്യമായ റേഷൻ വിവരങ്ങൾ, കൃത്യസമയത്ത്',
    demo: 'ഡെമോ മോഡ് — ഔദ്യോഗിക സംവിധാനങ്ങളുമായി ബന്ധിപ്പിച്ചിട്ടില്ല',
    home: 'ഹോം', shops: 'കടകൾ', history: 'ചരിത്രം', help: 'സഹായം',
    helper: 'മറ്റൊരാളെ സഹായിക്കുക', helperSub: 'കുടുംബാംഗത്തിന്റെ കാർഡ് പരിശോധിക്കുക',
    helperCard: 'സഹായിക്കുന്ന വ്യക്തിയുടെ റേഷൻ കാർഡ് നമ്പർ', checkPerson: 'വിവരം കാണുക', ownCard: 'എന്റെ കാർഡിലേക്ക് മടങ്ങുക',
    cardNo: 'റേഷൻ കാർഡ് നമ്പർ', cardSaved: 'റേഷൻ കാർഡ്', continue: 'തുടരുക', loading: 'വിവരങ്ങൾ പരിശോധിക്കുന്നു…',
    cardError: 'കുറഞ്ഞത് 6 അക്കമുള്ള ശരിയായ കാർഡ് നമ്പർ നൽകുക.',
    offline: 'വിവരങ്ങൾ ഫോണിൽ സുരക്ഷിതമാണ്.',
    entitlement: 'ഈ മാസത്തെ റേഷൻ വിഹിതം', denied: 'റേഷൻ തടസ്സപ്പെട്ടു', partial: 'റേഷൻ ഭാഗികമായി ലഭിച്ചു', received: 'പൂർണ്ണ വിഹിതം ലഭിച്ചു', issue: 'എന്താണ് സംഭവിച്ചത്?',
    nearby: 'റേഷൻ കടകൾ', today: 'ഇന്നത്തെ സ്റ്റോക്ക്', rice: 'അരി', wheat: 'ഗോതമ്പ്', sugar: 'പഞ്ചസാര', dal: 'പരിപ്പ്',
    available: 'ലഭ്യമാണ്', out: 'ഇന്ന് ലഭ്യമല്ല', open: 'തുറന്നിരിക്കുന്നു', closed: 'അടച്ചിരിക്കുന്നു',
    timeline: 'കഴിഞ്ഞ 6 മാസം', pattern: 'കഴിഞ്ഞ 3 മാസത്തിൽ 2 തവണ പ്രശ്നം ഉണ്ടായി', fast: '3 ദിവസം മുന്നോട്ട് നീക്കുക', fastSub: 'പരാതി തനിയെ രജിസ്റ്റർ ആകുന്നത് കാണുക',
    back: 'തിരികെ', grievance: 'പരാതി തയ്യാറാണ്', autoCreated: '3 ദിവസത്തിന് ശേഷം സ്വയമേവ രജിസ്റ്റർ ചെയ്തു', tracking: 'ട്രാക്കിംഗ് നമ്പർ', expected: 'മറുപടി സമയം: 48 മണിക്കൂർ',
    link: 'തിരിച്ചറിയൽ കാർഡ് ലിങ്ക് ചെയ്യുക', enterOtp: '4 അക്ക കോഡ് നൽകുക', verify: 'സ്ഥിരീകരിക്കുക', request: 'തിരുത്തൽ അപേക്ഷ',
    correctName: 'ശരിയായ പേര്', sendRequest: 'അപേക്ഷ അയക്കുക', nameError: 'ശരിയായ പേര് നൽകുക.', success: 'വിജയകരം!', successText: 'അപേക്ഷ രേഖപ്പെടുത്തി.',
    support: 'സഹായം വേണോ?', call: 'ഹെൽപ്പ്‌ലൈൻ നമ്പർ', callShown: '1967 — ഹെൽപ്പ്‌ലൈൻ കാണിച്ചു', network: 'നെറ്റ്‌വർക്ക് അവസ്ഥ', noNetwork: 'നെറ്റ്‌വർക്ക് ഇല്ല',
    helpCard: 'ഞങ്ങൾ നിങ്ങൾക്കൊപ്പമുണ്ട്', helpBody: 'സംശയമുണ്ടെങ്കിൽ 1967 ൽ വിളിക്കുക.',
    inactiveTitle: 'കാർഡ് പുനഃസ്ഥാപിക്കുക', inactiveBody: 'പരിശോധന അപേക്ഷ ഞങ്ങൾ തയ്യാറാക്കാം.',
    activate: 'അപേക്ഷ അയക്കുക', otpStep1: 'മൊബൈൽ പരിശോധിക്കുക', otpStep3: 'തിരിച്ചറിയൽ രേഖ ലിങ്ക് ചെയ്തു', resolution: 'പരിഹരിച്ചു', resolveDemo: 'പരിഹാര ഡെമോ',
    days: '3 ദിവസമായി പരിഹാരമില്ല', check: 'ഈ കട തിരഞ്ഞെടുക്കുക', selectedShop: 'ഈ കടയിൽ സ്റ്റോക്ക് ലഭ്യമാണ്.', august: 'ഓഗസ്റ്റ്', quantity: 'വിഹിതം',
    demoStatus: 'നില മാറ്റുക', demoIssue: 'കാരണം മാറ്റുക', invalidOtp: '4 അക്കങ്ങൾ നൽകുക',
    phoneGate: 'മൊബൈൽ പരിശോധന', phoneGateSub: 'റേഷൻ വിവരങ്ങൾ സുരക്ഷിതമായി കാണാൻ മൊബൈൽ പരിശോധിക്കുക.',
    phoneLabel: 'മൊബൈൽ നമ്പർ', phoneOtpLabel: 'OTP കോഡ് നൽകുക', phoneOtpHint: 'ഡെമോ OTP: 1234', wrongOtp: 'തെറ്റായ കോഡ്. 1234 ഉപയോഗിക്കുക.',
    smsSimTitle: 'പുതിയ സന്ദേശം · PDS OTP', smsSimBody: 'അന്ന സേതു OTP: 1234.', tapToFill: '1234 സ്വയം പൂരിപ്പിക്കുക',
    allShops: 'എല്ലാ കടകളും', openOnly: 'തുറന്നവ', riceOnly: 'അരി സ്റ്റോക്ക്', wheatOnly: 'ഗോതമ്പ് സ്റ്റോക്ക്',
    switchCard: 'ഡെമോ കാർഡ്', tnPreset: 'തമിഴ്നാട് (TN)', mhPreset: 'മഹാരാഷ്ട്ര (MH)',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക', bookSlot: 'സമയം ബുക്ക് ചെയ്യുക', selectSlot: 'സന്ദർശന സമയം തിരഞ്ഞെടുക്കുക', confirmBooking: 'സ്ഥിരീകരിക്കുക',
    tokenPassTitle: 'PDS മുൻഗണനാ ഇ-ടോക്കൺ', tokenNote: 'വരി ഒഴിവാക്കാൻ കടയിൽ ഈ ടോക്കൺ കാണിക്കുക', viewOnMap: 'ഗൂഗിൾ മാപ്സ്',
    queueAhead: 'മുന്നിലുള്ള ആളുകൾ', estWait: 'പ്രതീക്ഷിക്കുന്ന സമയം', currentCardName: 'കാർഡിലെ തെറ്റായ പേര്', correctAadhaarName: 'ആധാർ പ്രകാരമുള്ള ശരിയായ പേര്',
    docVerifyNote: 'ആധാർ e-KYC പരിശോധന പൂർത്തിയായി', fillFromAadhaar: 'ആധാർ പേര് നൽകുക', liveTracking: 'തത്സമയ ട്രാക്കിംഗ്',
    officerReview: 'ഉദ്യോഗസ്ഥ പരിശോധന', stockDispatch: 'സ്റ്റോക്ക് അനുവദിച്ചു', advanceProgress: 'അടുത്ത ഘട്ടം കാണുക',
    changeCard: 'കാർഡ് മാറ്റുക', cardEntered: 'തിരഞ്ഞെടുത്ത കാർഡ്', clearCard: 'കാർഡ് മാറ്റുക',
    selectState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    selectStateSub: 'പൊതുവിതരണ പോർട്ടൽ തിരഞ്ഞെടുക്കുക',
    activeStates: 'പ്രവർത്തനക്ഷമമായ സംസ്ഥാനങ്ങൾ',
    comingSoon: 'ഉടൻ വരുന്നു',
    changeState: 'സംസ്ഥാനം മാറ്റുക',
    privacyNote: '🔒 സ്വകാര്യതാ ഉറപ്പ്: നിങ്ങളുടെ വിവരങ്ങൾ ഫോണിൽ സുരക്ഷിതമാണ്.',
    listen: 'കേൾക്കുക',
    stopListening: 'നിർത്തുക',
    pickupRation: 'റേഷൻ വാങ്ങാൻ പോവുക',
    viewReceipt: 'ഡിജിറ്റൽ രസീത്',
    digitalReceipt: 'ഡിജിറ്റൽ റേഷൻ രസീത്',
    receiptTxn: 'ഇടപാട് നമ്പർ',
    receiptShop: 'റേഷൻ കട',
    receiptCommodity: 'സാധനം',
    receiptEntitled: 'വിഹിതം',
    receiptIssued: 'ലഭിച്ചത്',
    receiptRate: 'വില',
    receiptTotal: 'ആകെ',
    freeNfsa: 'സൗജന്യം (NFSA)',
    downloadReceipt: 'രസീത് സൂക്ഷിക്കുക',
    close: 'അടയ്ക്കുക',
    entitlementBreakdown: 'പ്രതിമാസ വിഹിതവും ലഭിച്ചതും',
    categoryNorms: 'കാർഡ് വിഭാഗ പരിധി',
    shortfallAlert: 'ധാന്യ കുറവ് കണ്ടെത്തി',
    raiseMonthGrievance: 'ഈ കുറവിനെതിരെ പരാതി നൽകുക',
    grievanceSLA: 'NFSA സെക്ഷൻ 19 പ്രകാരം 7 ദിവസത്തിനകം പരാതി പരിഹരിക്കണം.',
    confirmGrievance: 'പരാതി സ്ഥിരീകരിക്കുക',
    myGrievances: 'എന്റെ പരാതികൾ',
    grievanceLogTitle: 'നടപടി ക്രമം',
    shareTicket: 'വാട്ട്‌സ്ആപ്പിൽ പങ്കിടുക',
    offlineQueued: 'ഓഫ്‌ലൈൻ അവസ്ഥ. ഇന്റർനെറ്റ് വരുമ്പോൾ സമർപ്പിക്കും.',
    askAssistant: 'സഹായ സഹായി',
    assistantTitle: 'അന്ന സേതു ആപ്പ് സഹായി',
    assistantScopeNotice: 'ℹ️ ഈ ആപ്പ് ഉപയോഗിക്കാൻ മാത്രമേ സഹായിക്കു. നിയമപരമായ കാര്യങ്ങൾക്ക് 1967 ൽ വിളിക്കുക.',
    askPlaceholder: 'ആപ്പ് ഉപയോഗത്തെക്കുറിച്ച് ചോദിക്കുക…',
    waOptInTitle: 'വാട്ട്‌സ്ആപ്പ് അറിയിപ്പുകൾ നേടുക',
    waOptInSub: 'റേഷൻ എത്തുമ്പോൾ തന്നെ അറിയാം',
    waOptInBtn: 'വാട്ട്‌സ്ആപ്പ് ബന്ധിപ്പിക്കുക',
    registryDisclaimer: 'ഔദ്യോഗിക സർക്കാർ രജിസ്ട്രി വിവരം: കടകളുടെ വിവരങ്ങൾ പോർട്ടൽ ഭാഷയിൽ നൽകിയിരിക്കുന്നു.',
    issuedStamp: '✓ വിതരണം ചെയ്തു',
    verifiedBeneficiary: 'NFSA പരിശോധിച്ച ഗുണഭോക്താവ്',
    servicesHub: 'പൗര സേവന കേന്ദ്രം',
    shopsService: 'റേഷൻ കടകൾ',
    shopsServiceSub: 'സ്റ്റോക്കും സമയവും അറിയുക',
    tokenService: 'മുൻഗണനാ ടോക്കൺ',
    tokenServiceSub: 'വരി ഒഴിവാക്കി സമയം കണ്ടെത്തുക',
    historyService: 'വിഹിത ചരിത്രം',
    historyServiceSub: '6 മാസ വിവരങ്ങൾ പരിശോധിക്കുക',
    grievanceService: 'പരാതി പരിഹാരം',
    grievanceServiceSub: '7 ദിവസത്തെ നിയമപരമായ പരിഹാരം',
    nfsaBanner: 'ദേശീയ ഭക്ഷ്യ സുരക്ഷാ നിയമം (NFSA 2013): റേഷൻ ധാന്യങ്ങൾ നിങ്ങളുടെ അവകാശമാണ്. സഹായത്തിന് 1967 ൽ വിളിക്കുക.',
    monthlyQuotaTitle: 'ഓഗസ്റ്റ് 2026 വിഹിതം',
    quotaReceivedDesc: 'പ്രതിമാസ വിഹിതം വിജയകരമായി ലഭിച്ചു',
    allocatedReceived: 'അനുവദിച്ചതും ലഭിച്ചതും',
    listenToEntitlement: 'വിഹിത വിവരങ്ങൾ കേൾക്കുക'
  }
}

const statusMeta = {
  denied: { glyph: '×', cls: 'red' },
  partial: { glyph: '!', cls: 'amber' },
  received: { glyph: '✓', cls: 'green' }
}

const nextStatus = { denied: 'partial', partial: 'received', received: 'denied' }
const nextReason = { mismatch: 'aadhaar', aadhaar: 'stock', stock: 'inactive', inactive: 'mismatch' }

/* Helper Localization Utilities */
function getLocalizedName(card, lang) {
  if (!card) return ''
  if (lang === 'en') return card.nameEn || card.name
  if (lang === 'hi') return card.nameHi || card.name
  if (lang === 'mr') return card.nameMr || card.nameHi || card.name
  return card.name || card.nameEn
}

function getLocalizedVillage(card, lang) {
  if (!card) return ''
  if (lang === 'en') return card.villageEn || card.village
  return card.village || card.villageEn
}

function getLocalizedCategory(card, lang) {
  if (!card) return ''
  if (lang === 'en') {
    return card.categoryDesc || (card.category === 'AAY' ? 'Antyodaya Anna Yojana (AAY)' : 'Priority Household (PHH)')
  }
  if (lang === 'mr') return card.categoryDescMr || card.categoryDesc
  if (lang === 'hi') return card.categoryDescHi || card.categoryDesc
  if (lang === 'ta') return card.categoryDescTa || card.categoryDesc
  return card.categoryDesc || card.category
}

function getLocalizedMonth(item, lang) {
  if (!item) return ''
  if (lang === 'en') return item.monthEn || item.month
  if (lang === 'hi') return item.monthHi || item.month
  if (lang === 'mr') return item.monthMr || item.monthHi || item.month
  return item.month
}

function getLocalizedNote(item, lang) {
  if (!item) return ''
  if (lang === 'en') return item.noteEn || item.note
  if (lang === 'hi') return item.noteHi || item.note
  if (lang === 'mr') return item.noteMr || item.noteHi || item.note
  return item.note
}

function getShopHeading(shop, lang) {
  if (lang === 'en') {
    return {
      primary: shop.nameEn || shop.name,
      secondary: null
    }
  }
  if (lang === 'hi') {
    return {
      primary: shop.nameHi || shop.name,
      secondary: shop.nameEn || null
    }
  }
  return {
    primary: shop.name,
    secondary: shop.nameEn || null
  }
}

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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
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
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    map: (
      <>
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    ticket: (
      <>
        <path d="M2 9a3 3 0 0 1 0 6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a3 3 0 0 1 0-6V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 11v2" />
        <path d="M13 17v2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
    volumeX: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </>
    ),
    receipt: (
      <>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </>
    ),
    printer: (
      <>
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </>
    ),
    shoppingBag: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    )
  }
  return <svg {...c}>{p[name] || p.help}</svg>
}

/* Beautiful Citizen Profile Avatar */
function CitizenAvatar({ card, isHelper, size = 62 }) {
  const [imgError, setImgError] = useState(false)
  const initial = isHelper ? 'ரா' : card.avatarInitial || 'கா'

  return (
    <div className="citizen-avatar-wrap" style={{ width: size, height: size }} title={card.name}>
      {!imgError ? (
        <div className="citizen-avatar-img-container">
          <img
            src="/assets/citizen_avatar.jpg"
            alt={card.name || 'Citizen'}
            className="citizen-avatar-img"
            onError={() => setImgError(true)}
          />
          <div className="avatar-gold-ring" />
        </div>
      ) : (
        <svg viewBox="0 0 100 100" className="citizen-avatar" aria-hidden="true">
          <circle cx="50" cy="50" r="47" fill="#FBF7EC" stroke="#D89A1E" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="42" fill="#F3ECDC" stroke="#CDBB94" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="50" cy="36" r="17" fill="#C58548" />
          <path d="M20 86 C20 66, 35 60, 50 60 C65 60, 80 66, 80 86 Z" fill="#1E2A3C" />
          <circle cx="76" cy="76" r="11" fill="#1E2A3C" stroke="#D89A1E" strokeWidth="1.5" />
          <text x="76" y="80" fill="#D89A1E" fontSize="9" fontWeight="bold" textAnchor="middle">{initial}</text>
        </svg>
      )}
      <span className="avatar-status-dot" title="Verified Beneficiary" />
    </div>
  )
}

function Brand({ t, lang, setLang, selectedState, onChangeState, onOpenAssistant }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0]
  const currentStateObj = states.find((s) => s.id === selectedState) || states[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">{currentLangObj.mark}</span>
        <span>{t.app}</span>
      </div>

      <div className="topbar-controls">
        {/* State Indicator Pill */}
        {selectedState && (
          <button
            type="button"
            className="state-badge-btn"
            onClick={onChangeState}
            title={t.changeState || 'Change State'}
          >
            <Icon name="building" size={13} />
            <span>{currentStateObj ? currentStateObj.id.toUpperCase() : 'TN'}</span>
            <Icon name="chevronDown" size={11} />
          </button>
        )}

        {/* AI Guide Button */}
        <button
          type="button"
          className="ai-guide-btn"
          onClick={onOpenAssistant}
          title={t.askAssistant}
          aria-label={t.askAssistant}
        >
          <Icon name="sparkles" size={15} />
        </button>

        {/* Scrollable Language Dropdown */}
        <div className="lang-dropdown-wrapper" ref={dropdownRef}>
          <button
            className="lang-dropdown-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select Language"
          >
            <Icon name="globe" size={15} />
            <span>{currentLangObj.label}</span>
            <Icon name="chevronDown" size={12} />
          </button>

          {dropdownOpen && (
            <div className="lang-dropdown-menu" role="listbox">
              <div className="lang-dropdown-header">
                <span>{t.selectLanguage || 'Select Language'}</span>
              </div>
              <div className="lang-dropdown-list">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={'lang-dropdown-item ' + (lang === item.code ? 'active' : '')}
                    onClick={() => {
                      setLang(item.code)
                      setDropdownOpen(false)
                    }}
                    role="option"
                    aria-selected={lang === item.code}
                  >
                    <div className="lang-item-left">
                      <span className="lang-item-mark">{item.mark}</span>
                      <span className="lang-item-native">{item.label}</span>
                      <span className="lang-item-en">{item.enLabel}</span>
                    </div>
                    {lang === item.code && <Icon name="check" size={15} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function resolveCard(number, selectedState) {
  if (!number) {
    return selectedState === 'mh' ? (cards.mh || defaultCard) : (cards.tn || defaultCard)
  }
  const normalized = number.trim().toUpperCase()
  if (normalized.startsWith('MH') || selectedState === 'mh') {
    return cards.mh || defaultCard
  }
  return cards.tn || defaultCard
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('anna-language') || 'en')
  const [selectedState, setSelectedState] = useState(() => localStorage.getItem('anna-state') || '')
  const [isChangingState, setIsChangingState] = useState(false)
  const [tab, setTab] = useState('home')
  const [page, setPage] = useState('home')
  const [verified, setVerified] = useState(() => {
    return localStorage.getItem('anna-verified') === 'true' && Boolean(localStorage.getItem('anna-card-number'))
  })
  const [savedCard, setSavedCard] = useState(() => {
    const isVerified = localStorage.getItem('anna-verified') === 'true'
    return isVerified ? (localStorage.getItem('anna-card-number') || '') : ''
  })
  const [pendingCard, setPendingCard] = useState('')
  const [status, setStatus] = useState('received')
  const [reason, setReason] = useState('stock')
  const [isLoading, setIsLoading] = useState(false)
  const [helper, setHelper] = useState(false)
  const [offline, setOffline] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [fastForwarded, setFastForwarded] = useState(false)
  const [records, setRecords] = useState(initialHistory)
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
  const [showAssistant, setShowAssistant] = useState(false)
  const [offlineQueuedGrievances, setOfflineQueuedGrievances] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('anna_offline_queue') || '[]')
    } catch {
      return []
    }
  })
  const [queuedBanner, setQueuedBanner] = useState(false)

  const t = text[lang] || text.en || text.ta
  const activeCardNumber = savedCard || pendingCard || (selectedState === 'mh' ? 'MH-12-0418-2675' : 'TN-02-G-849201')
  const currentCard = resolveCard(activeCardNumber, selectedState)

  useEffect(() => {
    localStorage.setItem('anna-language', lang)
  }, [lang])

  useEffect(() => {
    if (selectedState) {
      localStorage.setItem('anna-state', selectedState)
    }
  }, [selectedState])

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false)
      const stored = localStorage.getItem('anna_offline_queue')
      if (stored) {
        try {
          const items = JSON.parse(stored)
          if (items.length > 0) {
            setQueuedBanner(true)
            localStorage.removeItem('anna_offline_queue')
            setOfflineQueuedGrievances([])
            setTimeout(() => setQueuedBanner(false), 5000)
          }
        } catch {}
      }
    }
    const handleOffline = () => setOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const selectStateAndProceed = (stateId) => {
    setSelectedState(stateId)
    localStorage.setItem('anna-state', stateId)
    setIsChangingState(false)
    if (savedCard) {
      const isMh = stateId === 'mh'
      const cardIsMh = savedCard.startsWith('MH')
      if (isMh !== cardIsMh) {
        clearCard()
      }
    }
  }

  const lookup = (number, isHelper = false) => {
    setIsLoading(true)
    window.setTimeout(() => {
      const v = number.trim().toUpperCase()
      if (isHelper) {
        setSavedCard(v)
      } else {
        setPendingCard(v)
      }
      setIsLoading(false)
    }, 450)
  }

  const navigate = (next) => {
    if (['home', 'shops', 'history', 'help'].includes(next)) setTab(next)
    setPage(next)
    setResolved(false)
  }

  const clearCard = () => {
    localStorage.removeItem('anna-card-number')
    localStorage.removeItem('anna-verified')
    setSavedCard('')
    setPendingCard('')
    setHelper(false)
    setFastForwarded(false)
    setVerified(false)
    setPage('home')
    setTab('home')
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

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Anna Setu PDS Update', {
          body: 'Your grievance has been successfully resolved by the Taluk Supply Officer.',
          icon: '/assets/citizen_avatar.jpg'
        })
      } catch {}
    }
  }

  const backHome = () => {
    setPage('home')
    setTab('home')
    setResolved(false)
  }

  // 1. Initial Gate: If no state selected yet, or user clicked "Change State", render State Selection
  if (!selectedState || isChangingState) {
    return (
      <StateSelect
        t={t}
        lang={lang}
        setLang={setLang}
        states={states}
        currentState={selectedState}
        onSelect={selectStateAndProceed}
        onCancel={selectedState ? () => setIsChangingState(false) : null}
      />
    )
  }

  // 2. Ration card lookup screen if not verified and no card entered
  if (!verified && !pendingCard) {
    return (
      <Lookup
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={selectedState}
        isLoading={isLoading}
        lookup={lookup}
        initialCard={savedCard || (selectedState === 'mh' ? 'MH-12-0418-2675' : 'TN-02-G-849201')}
        onChangeState={() => setIsChangingState(true)}
      />
    )
  }

  // 3. Second screen: Phone / OTP verification
  if (!verified) {
    return (
      <PhoneVerify
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={selectedState}
        card={currentCard}
        pendingCard={pendingCard || savedCard}
        onBack={() => setPendingCard('')}
        onClear={clearCard}
        onVerified={() => {
          const cardToSave = pendingCard || savedCard || (selectedState === 'mh' ? 'MH-12-0418-2675' : 'TN-02-G-849201')
          setSavedCard(cardToSave)
          setPendingCard('')
          setVerified(true)
          localStorage.setItem('anna-card-number', cardToSave)
          localStorage.setItem('anna-verified', 'true')
        }}
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
      <Brand
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={selectedState}
        onChangeState={() => setIsChangingState(true)}
        onOpenAssistant={() => setShowAssistant(true)}
      />

      {queuedBanner && (
        <div className="offline-synced-banner page-transition">
          <Icon name="check" size={16} />
          <span>{lang === 'en' ? 'Offline grievances synchronized successfully!' : 'புகார்கள் சமர்ப்பிக்கப்பட்டன / Offline grievances synced'}</span>
        </div>
      )}

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
          selectedState={selectedState}
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
          onOpenReceipt={() => setShowReceipt(true)}
          fastForward={() => {
            setFastForwarded(true)
            setPage('grievance')
          }}
          fastForwarded={fastForwarded}
        />
      )}

      {page === 'shops' && (
        <ShopList
          t={t}
          lang={lang}
          shops={allShops}
          card={currentCard}
          selectedState={selectedState}
        />
      )}

      {page === 'history' && (
        <History
          t={t}
          lang={lang}
          records={records}
          card={currentCard}
          onSelectRecord={(item) => setSelectedHistoryItem(item)}
        />
      )}

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
          card={currentCard}
          reason={reason}
          fastForwarded={fastForwarded}
          finishResolution={finishResolution}
          resolved={resolved}
          goHome={backHome}
          offline={offline}
          statusLogs={grievance_status_log}
        />
      )}

      {/* Digital Receipt Voucher Modal */}
      {showReceipt && (
        <ReceiptModal
          t={t}
          lang={lang}
          card={currentCard}
          selectedState={selectedState}
          onClose={() => setShowReceipt(false)}
        />
      )}

      {/* History Shortfall Detail Modal */}
      {selectedHistoryItem && (
        <HistoryDetailModal
          t={t}
          lang={lang}
          item={selectedHistoryItem}
          card={currentCard}
          onClose={() => setSelectedHistoryItem(null)}
          onRaiseGrievance={() => {
            setSelectedHistoryItem(null)
            setReason('stock')
            setFastForwarded(true)
            setPage('grievance')
          }}
        />
      )}

      {/* Scoped AI Guide Assistant Modal */}
      {showAssistant && (
        <AppGuideModal
          t={t}
          lang={lang}
          onClose={() => setShowAssistant(false)}
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

/* ===================================================================
   State Selection Screen (Language Aware)
   =================================================================== */
function StateSelect({ t, lang, setLang, states, currentState, onSelect, onCancel }) {
  const activeStatesList = states.filter((s) => s.active)
  const comingSoonStates = states.filter((s) => !s.active)
  const isEn = lang === 'en'

  return (
    <main className="app-shell lookup min-h-screen antialiased">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">🏛</span>
          <span>{t.app}</span>
        </div>
        {onCancel && (
          <button className="text-button" onClick={onCancel}>
            ✕ {t.close || 'Close'}
          </button>
        )}
      </header>

      <div className="lookup-hero" aria-hidden="true">
        <span className="grain">🏛️</span>
      </div>

      <h1 className="state-select-title">{t.selectState}</h1>
      <p className="lookup-tagline">{t.selectStateSub}</p>

      {/* Active State Options */}
      <div className="state-group-section">
        <h3 className="state-group-heading">
          <span className="active-dot-live" />
          {t.activeStates}
        </h3>
        <div className="state-card-grid">
          {activeStatesList.map((st) => {
            const mainName = isEn ? st.nameEn : st.name
            const subName = isEn ? null : st.nameEn
            return (
              <button
                key={st.id}
                type="button"
                className={'state-select-card active-state-card ' + (currentState === st.id ? 'current-selected' : '')}
                onClick={() => onSelect(st.id)}
              >
                <div className="state-card-top">
                  <span className="state-flag-badge">{st.id.toUpperCase()}</span>
                  <span className="state-status-pill">● Active</span>
                </div>
                <b className="state-native-name">{mainName}</b>
                {subName && <span className="state-en-name">{subName}</span>}
                <small className="state-portal-name">{st.portal}</small>
                <div className="state-card-footer">
                  <span className="state-shop-count">
                    <Icon name="pin" size={13} /> {st.shopCount} Fair Price Shops
                  </span>
                  <Icon name="arrow" size={16} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Coming Soon States */}
      <div className="state-group-section">
        <h3 className="state-group-heading state-muted-heading">
          <span>◌</span>
          {t.comingSoon}
        </h3>
        <div className="state-card-grid coming-soon-grid">
          {comingSoonStates.map((st) => {
            const mainName = isEn ? st.nameEn : st.name
            const subName = isEn ? null : st.nameEn
            return (
              <div key={st.id} className="state-select-card disabled-state-card">
                <div className="state-card-top">
                  <span className="state-flag-badge muted-flag">{st.id.toUpperCase()}</span>
                  <span className="state-status-pill muted-pill">{isEn ? 'Coming Soon' : st.status || 'Soon'}</span>
                </div>
                <b className="state-native-name">{mainName}</b>
                {subName && <span className="state-en-name">{subName}</span>}
                <small className="state-portal-name">{st.portal}</small>
              </div>
            )
          })}
        </div>
      </div>

      <p className="privacy-card-note">
        <Icon name="shield" size={15} />
        {t.privacyNote}
      </p>
    </main>
  )
}

/* ===================================================================
   Scoped Ration Card Lookup Screen
   =================================================================== */
function Lookup({ t, lang, setLang, selectedState, isLoading, lookup, initialCard, onChangeState }) {
  const [number, setNumber] = useState(initialCard)
  const [error, setError] = useState('')

  const stateObj = states.find((s) => s.id === selectedState) || states[0]
  const isEn = lang === 'en'
  const statePortalTitle = isEn ? `${stateObj.nameEn} PDS Portal` : `${stateObj.name} (${stateObj.nameEn})`

  useEffect(() => {
    if (initialCard) setNumber(initialCard)
  }, [initialCard])

  const submit = () => {
    const clean = number.trim().toUpperCase()
    if (clean.length < 6) {
      setError(t.cardError)
      return
    }

    if (selectedState === 'tn' && clean.startsWith('MH')) {
      setError('This is a Maharashtra card. Please switch state to Maharashtra.')
      return
    }
    if (selectedState === 'mh' && clean.startsWith('TN')) {
      setError('This is a Tamil Nadu card. Please switch state to Tamil Nadu.')
      return
    }

    setError('')
    lookup(clean)
  }

  return (
    <main className="app-shell lookup min-h-screen antialiased">
      <Brand
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={selectedState}
        onChangeState={onChangeState}
        onOpenAssistant={() => {}}
      />

      <div className="lookup-hero" aria-hidden="true">
        <span className="grain">✳</span>
      </div>

      <h1>{t.app}</h1>
      <p className="lookup-tagline">{t.tagline}</p>

      {/* State Badge Strip */}
      <div className="state-active-strip">
        <div className="state-strip-info">
          <small>State Portal:</small>
          <b>{statePortalTitle}</b>
        </div>
        <button type="button" className="state-switch-link" onClick={onChangeState}>
          {t.changeState}
        </button>
      </div>

      <p className="demo-chip">◌ {t.demo}</p>

      <div className="lookup-form">
        <label htmlFor="card-number">{t.cardNo}</label>
        <input
          id="card-number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={stateObj.sampleCard || 'TN-02-G-849201'}
          aria-invalid={Boolean(error)}
        />

        {/* State-Scoped Demo Card Preset Buttons */}
        <div className="card-presets">
          <span className="preset-label">{t.switchCard}:</span>
          {selectedState === 'tn' ? (
            <>
              <button
                type="button"
                className={'preset-chip ' + (number === 'TN-02-G-849201' ? 'active' : '')}
                onClick={() => setNumber('TN-02-G-849201')}
              >
                TN Chennai (PHH)
              </button>
              <button
                type="button"
                className={'preset-chip ' + (number === 'TN-04-A-109284' ? 'active' : '')}
                onClick={() => setNumber('TN-04-A-109284')}
              >
                TN Madurai (AAY)
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={'preset-chip ' + (number === 'MH-12-0418-2675' ? 'active' : '')}
                onClick={() => setNumber('MH-12-0418-2675')}
              >
                MH Pune (AAY)
              </button>
              <button
                type="button"
                className={'preset-chip ' + (number === 'MH-01-9218-4410' ? 'active' : '')}
                onClick={() => setNumber('MH-01-9218-4410')}
              >
                MH Mumbai (PHH)
              </button>
            </>
          )}
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

      <p className="privacy-card-note">
        <Icon name="shield" size={15} />
        {t.privacyNote}
      </p>

      <p className="offline-note">
        <Icon name="wifi" size={15} />
        {t.offline}
      </p>
    </main>
  )
}

/* ===================================================================
   Phone / OTP Verification Screen
   =================================================================== */
function PhoneVerify({ t, lang, setLang, selectedState, card, pendingCard, onBack, onClear, onVerified }) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState(card.phone || '98765 43210')
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [shake, setShake] = useState(false)

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    if (card.phone) setPhone(card.phone)
  }, [card])

  useEffect(() => {
    if (step === 2) {
      const timer = window.setTimeout(() => {
        setShowToast(true)
      }, 450)
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
    }, 550)
  }

  return (
    <main className="app-shell min-h-screen antialiased">
      <Brand
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={selectedState}
        onChangeState={onBack}
        onOpenAssistant={() => {}}
      />

      <button type="button" className="back-button" onClick={onBack} title={t.changeCard}>
        <Icon name="back" size={18} />
        <span>{t.changeCard || 'Change Card'}</span>
      </button>

      {/* Selected Card Pill Banner */}
      <div className="verify-card-badge">
        <div className="verify-card-info">
          <small>{t.cardEntered || 'Ration Card'} · {selectedState.toUpperCase()}</small>
          <b>{pendingCard || card.number}</b>
        </div>
        <button type="button" className="verify-change-pill" onClick={onBack} title={t.changeCard}>
          <Icon name="back" size={12} />
          <span>{t.changeCard || 'Change'}</span>
        </button>
      </div>

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
          {isVerifying ? <span className="spinner" /> : step === 2 ? t.verify : t.continue}
          <Icon name="arrow" />
        </button>

        <button type="button" className="change-card-link" onClick={onBack}>
          ← {t.changeCard || 'Change ration card'}
        </button>
      </section>
    </main>
  )
}

/* ===================================================================
   Beautiful Redesigned Citizen Home Landing Screen
   =================================================================== */
function HomePage({
  t,
  lang,
  card,
  selectedState,
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
  onOpenReceipt,
  fastForward,
  fastForwarded
}) {
  const meta = statusMeta[status]
  const why = reasons[reason] || reasons.stock
  const [helperNumber, setHelperNumber] = useState('')
  const [helperError, setHelperError] = useState('')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const checkHelper = () => {
    if (helperNumber.trim().length < 6) {
      setHelperError(t.cardError)
      return
    }
    lookup(helperNumber, true)
  }

  const userName = helper
    ? (lang === 'en' ? 'Radha Devi (Neighbor)' : lang === 'ta' ? 'ராதா அம்மா' : 'राधा जी')
    : getLocalizedName(card, lang)

  const userLocation = getLocalizedVillage(card, lang)
  const userCategory = getLocalizedCategory(card, lang)
  const isEn = lang === 'en'
  const currentLangObj = languages.find((l) => l.code === lang) || languages[0]

  // Web Speech API Voice synthesis
  const speakEntitlement = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.')
      return
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    const speechText =
      lang === 'en'
        ? `Hello ${userName}. Status for August 2026: Full quota received. Your entitlement includes ${card.entitledWheat || 20} kilograms wheat, ${card.entitledRice || 15} kilograms rice, 1 kilogram sugar, and 1 kilogram toor dal.`
        : lang === 'ta'
        ? `வணக்கம் ${userName}. இந்த மாத ரேஷன் நிலை: முழு ரேஷன் கிடைத்தது. ஆகஸ்ட் 2026 ஒதுக்கீடு.`
        : `नमस्ते ${userName}। इस महीने का राशन प्राप्त हुआ। अगस्त 2026 का पूरा कोटा।`

    const utterance = new SpeechSynthesisUtterance(speechText)
    utterance.lang = currentLangObj.speechLang || 'en-IN'
    utterance.rate = 0.9

    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    setIsPlayingAudio(true)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="page-transition home-dashboard">
      {/* 1. Official Citizen Identity Pass Card */}
      <div className="citizen-id-pass">
        <div className="citizen-pass-top-bar">
          <span className="citizen-portal-tag">
            <Icon name="building" size={13} />
            <b>{selectedState === 'mh' ? (isEn ? 'Maharashtra AePDS' : 'महाराष्ट्र AePDS') : (isEn ? 'Tamil Nadu TNPDS' : 'தமிழ்நாடு TNPDS')}</b>
          </span>
          <span className="citizen-verified-badge">
            <Icon name="shield" size={12} />
            {t.verifiedBeneficiary || 'NFSA Verified'}
          </span>
        </div>

        <div className="citizen-pass-main">
          <CitizenAvatar card={card} isHelper={helper} size={64} />
          <div className="citizen-pass-details">
            <span className="citizen-welcome-label">{t.greeting},</span>
            <h2 className="citizen-name-title">{userName}</h2>
            <div className="citizen-meta-pills">
              <span className="meta-card-chip">
                <code>{savedCard || card.number}</code>
                <button type="button" className="mini-switch-btn" onClick={clearCard} title={t.clearCard}>
                  {t.clearCard || 'Switch'}
                </button>
              </span>
              <span className="meta-category-pill">
                <b>{card.category}</b> · {card.category === 'AAY' ? (isEn ? '35 kg Quota' : '35 கிலோ') : (isEn ? '20 kg Quota' : '20 கிலோ')}
              </span>
            </div>
            <p className="citizen-location-text">
              <Icon name="pin" size={12} />
              <span>{userLocation} · FPS: <code>{card.fpsCode || (selectedState === 'mh' ? 'MH-PUN-05' : 'TN-CHE-02A')}</code></span>
            </p>
          </div>
        </div>
      </div>

      {/* Helper Lookup Drawer */}
      <button className="helper-toggle-btn" onClick={() => setHelper(!helper)}>
        <Icon name="users" size={17} />
        <div className="helper-btn-text">
          <b>{t.helper}</b>
          <small>{t.helperSub}</small>
        </div>
        <i className={'helper-switch-indicator ' + (helper ? 'on' : '')} />
      </button>

      {helper && (
        <div className="helper-lookup-drawer page-transition">
          <label>{t.helperCard}</label>
          <input
            value={helperNumber}
            onChange={(e) => setHelperNumber(e.target.value)}
            placeholder={selectedState === 'mh' ? 'MH-12-0418-2675' : 'TN-02-G-849201'}
          />
          {helperError && (
            <p className="form-error">
              <Icon name="info" size={17} />
              {helperError}
            </p>
          )}
          <div className="helper-actions-row">
            <button className="button secondary" onClick={checkHelper}>
              {t.checkPerson}
              <Icon name="arrow" size={15} />
            </button>
            <button className="text-button" onClick={() => setHelper(false)}>
              {t.ownCard}
            </button>
          </div>
        </div>
      )}

      {/* 2. Interactive Entitlement Showcase Ledger */}
      <div className={'entitlement-ledger-card ' + meta.cls}>
        <div className="ledger-card-header">
          <div>
            <span className="ledger-period-label">{t.monthlyQuotaTitle || 'AUGUST 2026 ENTITLEMENT'}</span>
            <h3 className="ledger-status-title">
              {status === 'denied' ? t.denied : status === 'partial' ? t.partial : (t.quotaIssued || 'Full Quota Received')}
            </h3>
          </div>
          <span className="ledger-status-stamp">
            <span className="stamp-icon">{meta.glyph}</span>
          </span>
        </div>

        {/* Audio Listen Bar */}
        <div className="voice-audio-bar">
          <button
            type="button"
            className={'voice-listen-pill ' + (isPlayingAudio ? 'playing' : '')}
            onClick={speakEntitlement}
            aria-label={isPlayingAudio ? t.stopListening : t.listen}
          >
            <Icon name={isPlayingAudio ? 'volumeX' : 'volume'} size={17} />
            <span>{isPlayingAudio ? (t.stopListening || 'Stop Listening') : (t.listenToEntitlement || 'Listen to Entitlement')}</span>
          </button>
          <small className="voice-lang-hint">Audio: {currentLangObj?.enLabel || 'Native'}</small>
        </div>

        {/* 4-Item Commodity Allocation Grid */}
        <div className="home-commodity-grid">
          <div className="commodity-tile">
            <span className="commodity-icon">🌾</span>
            <div className="commodity-info">
              <b>{card.entitledWheat || (selectedState === 'mh' ? 20 : 5)} kg</b>
              <small>{t.wheat}</small>
            </div>
            <span className="commodity-check-dot">✓</span>
          </div>
          <div className="commodity-tile">
            <span className="commodity-icon">🍚</span>
            <div className="commodity-info">
              <b>{card.entitledRice || 15} kg</b>
              <small>{t.rice}</small>
            </div>
            <span className="commodity-check-dot">✓</span>
          </div>
          <div className="commodity-tile">
            <span className="commodity-icon">🧂</span>
            <div className="commodity-info">
              <b>{card.entitledSugar || 1} kg</b>
              <small>{t.sugar}</small>
            </div>
            <span className="commodity-check-dot">✓</span>
          </div>
          <div className="commodity-tile">
            <span className="commodity-icon">🥣</span>
            <div className="commodity-info">
              <b>{card.entitledDal || 1} kg</b>
              <small>{t.dal}</small>
            </div>
            <span className="commodity-check-dot">✓</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Action Buttons */}
      {status === 'received' && (
        <div className="home-primary-actions">
          <button className="button primary cta-pickup-btn" onClick={() => navigate('shops')}>
            <Icon name="shoppingBag" size={19} />
            <div className="cta-btn-text">
              <b>{t.pickupRation || 'Pick Up Ration at FPS'}</b>
              <small>{selectedState === 'mh' ? 'Pune Central Co-op · 0.5 km · Open Now' : 'TUCS Triplicane · 0.4 km · Open Now'}</small>
            </div>
            <Icon name="arrow" size={17} />
          </button>

          <button className="button secondary cta-receipt-btn" onClick={onOpenReceipt}>
            <Icon name="receipt" size={18} />
            <div className="cta-btn-text">
              <b>{t.viewReceipt || 'View Digital Receipt'}</b>
              <small>{isEn ? 'AePDS Authenticated Voucher #TXN-2026' : 'அங்கீகரிக்கப்பட்ட டிஜிட்டல் ரசீது'}</small>
            </div>
          </button>
        </div>
      )}

      {/* Reason Card (if paused or partial) */}
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

      {/* 4. PDS Citizen Services Hub Grid (2x2) */}
      <div className="services-hub-section">
        <h4 className="services-hub-heading">
          <span>❖</span>
          {t.servicesHub || 'PDS Citizen Services'}
        </h4>

        <div className="home-services-grid">
          <button type="button" className="service-tile-card" onClick={() => navigate('shops')}>
            <div className="service-tile-icon gold">
              <Icon name="pin" size={20} />
            </div>
            <b>{t.shopsService || 'Fair Price Shops'}</b>
            <small>{t.shopsServiceSub || 'Check live stock & store hours'}</small>
          </button>

          <button type="button" className="service-tile-card" onClick={() => navigate('shops')}>
            <div className="service-tile-icon amber">
              <Icon name="ticket" size={20} />
            </div>
            <b>{t.tokenService || 'Book Priority Pass'}</b>
            <small>{t.tokenServiceSub || 'Skip counter line with e-token'}</small>
          </button>

          <button type="button" className="service-tile-card" onClick={() => navigate('history')}>
            <div className="service-tile-icon blue">
              <Icon name="clock" size={20} />
            </div>
            <b>{t.historyService || 'Quota History'}</b>
            <small>{t.historyServiceSub || '6-month ledger & shortfalls'}</small>
          </button>

          <button type="button" className="service-tile-card" onClick={() => fastForward()}>
            <div className="service-tile-icon green">
              <Icon name="shield" size={20} />
            </div>
            <b>{t.grievanceService || 'Grievance Desk'}</b>
            <small>{t.grievanceServiceSub || '7-day statutory resolution guarantee'}</small>
          </button>
        </div>
      </div>

      {/* 5. Statutory Guarantee Banner */}
      <div className="home-nfsa-banner">
        <Icon name="shield" size={18} />
        <div>
          <b>NFSA Section 3 Statutory Guarantee</b>
          <p>{t.nfsaBanner || 'Subsidized grain is your legal right under the National Food Security Act, 2013. Helpline: 1967.'}</p>
        </div>
      </div>

      {/* 6. Clean Collapsible Demo Controls (Tucked Away) */}
      <details className="demo-controls-drawer">
        <summary className="demo-controls-summary">
          <span>⚙ Demo Simulator (Change Status / Reasons)</span>
          <Icon name="chevronDown" size={14} />
        </summary>
        <div className="demo-controls-body">
          <div className="demo-chip-row">
            <small>Simulated Status:</small>
            <button className="demo-toggle-chip" onClick={() => setStatus(nextStatus[status])}>
              {t.demoStatus}: {status}
            </button>
          </div>
          <div className="demo-chip-row">
            <small>Simulated Reason:</small>
            <button className="demo-toggle-chip" onClick={() => setReason(nextReason[reason])}>
              {t.demoIssue}: {why.icon} {reason}
            </button>
          </div>
        </div>
      </details>
    </section>
  )
}

/* ===================================================================
   Scoped Fair Price Shops List (English-Friendly Headings)
   =================================================================== */
function ShopList({ t, lang, shops, card, selectedState }) {
  const [filter, setFilter] = useState('all')
  const [bookingShop, setBookingShop] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [tokenPass, setTokenPass] = useState(null)

  const isEn = lang === 'en'
  const stateShops = shops.filter((s) => s.state_id === selectedState)

  const filteredShops = stateShops.filter((shop) => {
    if (filter === 'open') return shop.open
    if (filter === 'rice') return shop.rice
    if (filter === 'wheat') return shop.wheat
    return true
  })

  const currentStateObj = states.find((s) => s.id === selectedState) || states[0]

  const openBooking = (shop) => {
    setBookingShop(shop)
    setSelectedSlot(shop.slots?.[0] || '09:00 AM - 10:00 AM')
  }

  const confirmSlot = () => {
    if (!bookingShop || !selectedSlot) return
    const randomToken = (selectedState === 'mh' ? 'MH-TOK-' : 'TN-TOK-') + Math.floor(100 + Math.random() * 900)
    const headings = getShopHeading(bookingShop, lang)

    setTokenPass({
      id: randomToken,
      shopName: headings.primary,
      shopNameEn: headings.secondary,
      shopCode: bookingShop.code,
      slot: selectedSlot,
      date: isEn ? 'Today' : lang === 'ta' ? 'இன்று' : 'आज',
      queueAhead: Math.floor(2 + Math.random() * 4),
      cardNo: card.number
    })
    setBookingShop(null)
  }

  return (
    <section className="page-transition">
      <div className="page-heading">
        <span className="heading-icon">
          <Icon name="pin" size={30} />
        </span>
        <div>
          <h1>{t.nearby}</h1>
          <p>{t.today} · {isEn ? currentStateObj.nameEn : currentStateObj.name}</p>
        </div>
      </div>

      {/* Honest Registry Disclaimer Banner */}
      <div className="registry-disclaimer-banner">
        <Icon name="shield" size={16} />
        <div>
          <b>{selectedState === 'mh' ? 'MahaFood AePDS Registry' : 'TNPDS Registry'}</b>
          <p>{currentStateObj.registryNote || t.registryDisclaimer}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="shop-filters" role="tablist">
        <button
          className={'filter-pill ' + (filter === 'all' ? 'active' : '')}
          onClick={() => setFilter('all')}
        >
          {t.allShops} ({stateShops.length})
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

      {/* Generated Digital E-Token Pass */}
      {tokenPass && (
        <aside className="token-pass-card page-transition" role="dialog" aria-modal="true">
          <div className="token-head">
            <div className="token-title-row">
              <Icon name="ticket" size={20} />
              <b>{t.tokenPassTitle}</b>
            </div>
            <button className="token-close" onClick={() => setTokenPass(null)}>
              <Icon name="close" size={16} />
            </button>
          </div>
          <div className="token-body">
            <div className="token-id-banner">
              <span>PRIORITY PASS</span>
              <b>#{tokenPass.id}</b>
            </div>
            <div className="token-meta-grid">
              <div>
                <small>{isEn ? 'Fair Price Shop' : 'கடை / दुकान'}</small>
                <b>{tokenPass.shopName}</b>
                {tokenPass.shopNameEn && <span className="token-en-sub">{tokenPass.shopNameEn}</span>}
                <code className="token-fps-code">{tokenPass.shopCode}</code>
              </div>
              <div>
                <small>{isEn ? 'Arrival Time Slot' : 'நேரம் / वेळ'}</small>
                <b className="token-time">{tokenPass.slot}</b>
              </div>
            </div>
            <div className="token-queue-pill">
              <span className="queue-dot" />
              <span>{tokenPass.queueAhead} {t.queueAhead} · ~{tokenPass.queueAhead * 2 + 2}m {t.estWait}</span>
            </div>
            <p className="token-instruction">
              <Icon name="check" size={14} />
              {t.tokenNote}
            </p>
            <div className="token-barcode" aria-hidden="true">
              <div className="barcode-bars" />
              <small>{tokenPass.cardNo}</small>
            </div>
          </div>
        </aside>
      )}

      {/* Shop Cards */}
      <div className="shops-container">
        {filteredShops.map((shop) => {
          const headings = getShopHeading(shop, lang)
          return (
            <article className="shop-card" key={shop.code || shop.name}>
              <div className="shop-head">
                <div>
                  <div className="shop-title-row">
                    {/* Primary title: in English when in English mode! */}
                    <h2>{headings.primary}</h2>
                    {shop.code && <span className="shop-code-badge">{shop.code}</span>}
                  </div>
                  {/* Secondary subtitle in lighter font */}
                  {headings.secondary && <span className="shop-name-en-sub">{headings.secondary}</span>}
                  <p>
                    <Icon name="pin" size={14} />
                    {shop.distance} · {shop.district ? `${shop.district} · ` : ''}
                    <span className={shop.open ? 'status-open-text' : 'status-closed-text'}>
                      {shop.open ? t.open : t.closed}
                    </span>
                  </p>
                  {shop.transit && (
                    <span className="shop-transit-tag">{shop.transit}</span>
                  )}
                  {shop.hours && <small className="shop-hours">{shop.hours}</small>}
                </div>
                <i
                  className={'open-dot ' + (shop.open ? 'live' : 'closed')}
                  title={shop.open ? t.open : t.closed}
                />
              </div>

              {/* Detailed Stock Quantities */}
              <div className="stock-breakdown">
                <div className="stock-row">
                  <span className="stock-name">
                    <i className={shop.rice ? 'available' : 'unavailable'}>{shop.rice ? '✓' : '×'}</i>
                    {t.rice}
                  </span>
                  <b className={shop.rice ? 'stock-qty green' : 'stock-qty red'}>
                    {shop.stockDetails?.rice || (shop.rice ? t.available : t.out)}
                  </b>
                </div>
                <div className="stock-row">
                  <span className="stock-name">
                    <i className={shop.wheat ? 'available' : 'unavailable'}>{shop.wheat ? '✓' : '×'}</i>
                    {t.wheat}
                  </span>
                  <b className={shop.wheat ? 'stock-qty green' : 'stock-qty red'}>
                    {shop.stockDetails?.wheat || (shop.wheat ? t.available : t.out)}
                  </b>
                </div>
                {shop.sugar !== undefined && (
                  <div className="stock-row">
                    <span className="stock-name">
                      <i className={shop.sugar ? 'available' : 'unavailable'}>{shop.sugar ? '✓' : '×'}</i>
                      {t.sugar}
                    </span>
                    <b className={shop.sugar ? 'stock-qty green' : 'stock-qty red'}>
                      {shop.stockDetails?.sugar || (shop.sugar ? t.available : t.out)}
                    </b>
                  </div>
                )}
                {shop.dal !== undefined && (
                  <div className="stock-row">
                    <span className="stock-name">
                      <i className={shop.dal ? 'available' : 'unavailable'}>{shop.dal ? '✓' : '×'}</i>
                      {t.dal}
                    </span>
                    <b className={shop.dal ? 'stock-qty green' : 'stock-qty red'}>
                      {shop.stockDetails?.dal || (shop.dal ? t.available : t.out)}
                    </b>
                  </div>
                )}
              </div>

              {/* Action Bar: Google Maps & Book Slot */}
              <div className="shop-actions">
                <a
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-button"
                  title="Open in Google Maps"
                >
                  <Icon name="map" size={16} />
                  <span>{t.viewOnMap}</span>
                </a>

                {shop.open && (
                  <button
                    type="button"
                    className="book-slot-button"
                    onClick={() => openBooking(shop)}
                  >
                    <Icon name="calendar" size={15} />
                    <span>{t.bookSlot}</span>
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* Time Slot Booking Modal */}
      {bookingShop && (
        <div className="modal-backdrop" onClick={() => setBookingShop(null)}>
          <div className="slot-modal page-transition" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div>
                <h2>{t.bookSlot}</h2>
                <p>{getShopHeading(bookingShop, lang).primary} ({bookingShop.code})</p>
              </div>
              <button className="modal-close-btn" onClick={() => setBookingShop(null)}>
                <Icon name="close" size={18} />
              </button>
            </div>

            <p className="slot-helper-text">{t.selectSlot}</p>
            <div className="slot-picker-grid">
              {(bookingShop.slots || [
                '08:30 AM - 09:30 AM',
                '09:30 AM - 10:30 AM',
                '11:00 AM - 12:00 PM',
                '03:30 PM - 04:30 PM',
                '05:00 PM - 06:00 PM'
              ]).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={'slot-pill ' + (selectedSlot === slot ? 'active' : '')}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <Icon name="clock" size={13} />
                  <span>{slot}</span>
                </button>
              ))}
            </div>

            <div className="modal-bottom-action">
              <button className="button primary" onClick={confirmSlot}>
                <span>{t.confirmBooking}</span>
                <Icon name="ticket" size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ===================================================================
   History Screen with Interactive Entitlement Gap Detail
   =================================================================== */
function History({ t, lang, records, card, onSelectRecord }) {
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
          const hasShortfall = item.shortfall > 0 || item.state === 'partial' || item.state === 'denied'
          return (
            <div
              className="history-row interactive-history-row"
              key={item.month}
              onClick={() => onSelectRecord(item)}
              role="button"
              tabIndex={0}
              title="Click to view entitlement vs received breakdown"
            >
              <span className={'history-symbol ' + meta.cls}>{meta.glyph}</span>
              <div className="history-row-content">
                <div className="history-row-head">
                  <b>{getLocalizedMonth(item, lang)} 2026</b>
                  {hasShortfall && (
                    <span className="shortfall-badge">
                      {item.shortfall ? `${item.shortfall} kg Shortfall` : 'Issue'}
                    </span>
                  )}
                </div>
                <p>{getLocalizedNote(item, lang)}</p>
                {item.entitledKg && (
                  <small className="history-kg-sub">
                    Entitled: {item.entitledKg} kg · Received: {item.receivedKg} kg
                  </small>
                )}
              </div>
              <div className="history-row-end">
                <em className={meta.cls}>
                  {item.state === 'received' ? t.received : item.state === 'partial' ? t.partial : t.denied}
                </em>
                <Icon name="arrow" size={14} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ===================================================================
   History Shortfall Comparison Detail Modal (Clean Localized English)
   =================================================================== */
function HistoryDetailModal({ t, lang, item, card, onClose, onRaiseGrievance }) {
  const meta = statusMeta[item.state] || statusMeta.received
  const hasShortfall = (item.shortfall && item.shortfall > 0) || item.state !== 'received'
  const isEn = lang === 'en'

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="history-detail-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div>
            <h2>{getLocalizedMonth(item, lang)} 2026 · {t.entitlementBreakdown}</h2>
            <p>Ration Card: {card.number} · {card.category}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Category Norms Banner */}
        <div className="category-norm-card">
          <Icon name="shield" size={16} />
          <div>
            <b>{t.categoryNorms}: {card.category}</b>
            <p>{card.entitlementNorm || (isEn ? '5 kg / member statutory quota' : '5 கிலோ / உறுப்பினர் கோட்டா')}</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="breakdown-table-wrapper">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>{t.receiptCommodity}</th>
                <th>{t.receiptEntitled}</th>
                <th>{t.receiptIssued}</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t.rice}</td>
                <td>{item.entitledBreakdown?.rice || card.entitledRice || 15} kg</td>
                <td>{item.receivedBreakdown?.rice ?? 15} kg</td>
                <td><span className="breakdown-tag ok">OK</span></td>
              </tr>
              <tr>
                <td>{t.wheat}</td>
                <td>{item.entitledBreakdown?.wheat || card.entitledWheat || 5} kg</td>
                <td>{item.receivedBreakdown?.wheat ?? 0} kg</td>
                <td>
                  {(item.receivedBreakdown?.wheat ?? 0) < (item.entitledBreakdown?.wheat || card.entitledWheat || 5) ? (
                    <span className="breakdown-tag red">Shortfall</span>
                  ) : (
                    <span className="breakdown-tag ok">OK</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>{t.sugar}</td>
                <td>{item.entitledBreakdown?.sugar || 1} kg</td>
                <td>{item.receivedBreakdown?.sugar ?? 1} kg</td>
                <td><span className="breakdown-tag ok">OK</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shortfall Alert Note */}
        {hasShortfall && (
          <div className="shortfall-alert-box">
            <span className="alert-icon">⚠️</span>
            <div>
              <b>{t.shortfallAlert}</b>
              <p>{getLocalizedNote(item, lang) || (isEn ? 'Grain dispatch delayed at Fair Price Shop' : item.note)}</p>
            </div>
          </div>
        )}

        <div className="modal-bottom-action">
          {hasShortfall ? (
            <button className="button primary" onClick={onRaiseGrievance}>
              <Icon name="message" size={16} />
              <span>{t.raiseMonthGrievance}</span>
            </button>
          ) : (
            <button className="button secondary" onClick={onClose}>
              <span>{t.close}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Digital Ration Receipt Voucher Modal (Clean English / Localized)
   =================================================================== */
function ReceiptModal({ t, lang, card, selectedState, onClose }) {
  const handlePrint = () => {
    window.print()
  }

  const isMh = selectedState === 'mh'
  const isEn = lang === 'en'

  const deptState = isMh
    ? (isEn ? 'Govt of Maharashtra' : 'महाराष्ट्र शासन')
    : (isEn ? 'Govt of Tamil Nadu' : 'தமிழ்நாடு அரசு')

  const deptName = isMh
    ? (isEn ? 'Dept of Food, Civil Supplies & Consumer Protection' : 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग')
    : (isEn ? 'Civil Supplies and Consumer Protection Dept' : 'உணவு மற்றும் நுகர்வோர் பாதுகாப்புத் துறை')

  const stampLabel = isEn ? '✓ ISSUED' : (t.issuedStamp || '✓ ISSUED')
  const beneficiaryName = getLocalizedName(card, lang)
  const categoryLabel = getLocalizedCategory(card, lang)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="receipt-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-modal-header">
          <div className="receipt-gov-seal">
            <span>🏛️</span>
            <div>
              <b>{deptState}</b>
              <small>{deptName}</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Voucher Content */}
        <div className="receipt-voucher-body">
          <div className="receipt-title-strip">
            <h3>{t.digitalReceipt}</h3>
            <span className="receipt-status-stamp">{stampLabel}</span>
          </div>

          <div className="receipt-meta-grid">
            <div>
              <small>{t.receiptTxn}:</small>
              <b>TXN-2026-08-{Math.floor(1000 + Math.random() * 9000)}</b>
            </div>
            <div>
              <small>Date & Time:</small>
              <b>08-Aug-2026 10:42 AM</b>
            </div>
            <div>
              <small>Beneficiary Name:</small>
              <b>{beneficiaryName}</b>
            </div>
            <div>
              <small>Ration Card No:</small>
              <b>{card.number}</b>
            </div>
            <div>
              <small>Category:</small>
              <b>{card.category} ({categoryLabel})</b>
            </div>
            <div>
              <small>{t.receiptShop}:</small>
              <b>{card.fpsCode || (isMh ? 'MH-PUN-05' : 'TN-CHE-02A')}</b>
            </div>
          </div>

          <table className="receipt-item-table">
            <thead>
              <tr>
                <th>{t.receiptCommodity}</th>
                <th>{t.receiptEntitled}</th>
                <th>{t.receiptIssued}</th>
                <th>{t.receiptRate}</th>
                <th>{t.receiptTotal}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t.rice}</td>
                <td>{card.entitledRice || 15} kg</td>
                <td>{card.entitledRice || 15} kg</td>
                <td>₹0.00</td>
                <td>{t.freeNfsa}</td>
              </tr>
              <tr>
                <td>{t.wheat}</td>
                <td>{card.entitledWheat || (isMh ? 20 : 5)} kg</td>
                <td>{card.entitledWheat || (isMh ? 20 : 5)} kg</td>
                <td>₹0.00</td>
                <td>{t.freeNfsa}</td>
              </tr>
              <tr>
                <td>{t.sugar}</td>
                <td>1 kg</td>
                <td>1 kg</td>
                <td>₹25.00</td>
                <td>₹25.00</td>
              </tr>
              <tr>
                <td>{t.dal}</td>
                <td>1 kg</td>
                <td>1 kg</td>
                <td>₹30.00</td>
                <td>₹30.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}><b>Total Paid:</b></td>
                <td><b>₹55.00</b></td>
              </tr>
            </tfoot>
          </table>

          <div className="receipt-voucher-footer">
            <div className="receipt-qr-mock">
              <span className="qr-box">■■■■</span>
              <small>AePDS Authenticated Voucher</small>
            </div>
            <div className="receipt-signatures">
              <small>FPS Dealer Stamp: <b>AUTHORIZED</b></small>
              <small>Bio-Metric e-KYC: <b>MATCHED</b></small>
            </div>
          </div>
        </div>

        <div className="receipt-modal-actions">
          <button className="button primary" onClick={handlePrint}>
            <Icon name="printer" size={17} />
            <span>{t.downloadReceipt}</span>
          </button>
          <button className="button secondary" onClick={onClose}>
            <span>{t.close}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Scoped AI App Guide Assistant Modal
   =================================================================== */
function AppGuideModal({ t, lang, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: lang === 'en'
        ? 'Hello! I am your Anna Setu app assistant. I can guide you on how to check your quota, book time slots, and track grievance resolutions in this app. How can I help?'
        : lang === 'ta'
        ? 'வணக்கம்! நான் அன்ன சேது செயலி உதவி வழிகாட்டி. இந்த செயலியை நீங்கள் எப்படி பயன்படுத்துவது என்று விளக்க முடியும். என்ன தகவல் தேவை?'
        : 'नमस्ते! मैं अन्न सेतु ऐप गाइड हूँ। मैं इस ऐप को उपयोग करने की जानकारी दे सकता हूँ। आप क्या जानना चाहते हैं?'
    }
  ])
  const [query, setQuery] = useState('')

  const suggestedQuestions = [
    {
      q: lang === 'en' ? 'How to book a time slot token?' : 'டோக்கன் எப்படி முன்பதிவு செய்வது?',
      a: lang === 'en'
        ? 'Go to the Shops tab, select your Fair Price Shop, tap "Book Time Slot", pick your arrival hour, and confirm to get a digital priority token pass to skip the counter line.'
        : 'நியாய கடைகள் (Shops) பகுதிக்கு சென்று, உங்கள் கடையின் கீழ் உள்ள "நேரம் முன்பதிவு" பட்டனை தட்டி விரும்பிய நேரத்தை தேர்வுசெய்து டோக்கன் பெறலாம்.'
    },
    {
      q: lang === 'en' ? 'What to do if grain is out of stock?' : 'ரேஷன் கிடைக்கவில்லை என்றால் என்ன செய்வது?',
      a: lang === 'en'
        ? 'You can raise a grievance from Home or History. Under Section 19 of NFSA 2013, supply officers are legally required to resolve FPS stock deficits within 7 working days.'
        : 'முகப்பில் அல்லது வரலாற்றில் "புகார் தயாராக உள்ளது" என்பதை தட்டி புகார் பதிவு செய்யலாம். NFSA சட்டப்படி 7 நாட்களில் அதிகாரிகள் தீர்வு காண்பார்கள்.'
    },
    {
      q: lang === 'en' ? 'Does offline mode work?' : 'இணையம் இல்லாமல் பயன்படுத்த முடியுமா?',
      a: lang === 'en'
        ? 'Yes! Your ration card records and shop data are safely cached on your phone. If you file a grievance offline, it is stored locally and will automatically submit once internet is restored.'
        : 'ஆம்! உங்கள் அட்டை விவரங்கள் உங்கள் போனில் பாதுகாப்பாக இருக்கும். இணையம் வந்ததும் தானாக சமர்ப்பிக்கப்படும்.'
    },
    {
      q: lang === 'en' ? 'My card was cancelled, can you fix it?' : 'என் கார்டு ரத்து செய்யப்பட்டுவிட்டது, தீர்வு என்ன?',
      a: lang === 'en'
        ? 'Anna Setu is an informational citizen assistant only and cannot make legal or official administrative rulings. For card cancellations or appeals, please call the National Food Security Helpline at 1967 (Toll-free) or visit your Taluk Supply Office.'
        : 'அன்ன சேது ஒரு உதவி செயலி மட்டுமே. அட்டை ரத்து அல்லது சட்ட தகராறுகளுக்கு 1967 என்ற இலவச உதவி எண்ணை அழைக்கவும்.'
    }
  ]

  const sendQuery = (textToSend) => {
    const qText = textToSend || query
    if (!qText.trim()) return

    const newMsgs = [...messages, { sender: 'user', text: qText }]
    setMessages(newMsgs)
    setQuery('')

    const lower = qText.toLowerCase()
    const isLegalOrPersonal =
      lower.includes('cancel') || lower.includes('dispute') || lower.includes('court') ||
      lower.includes('bribe') || lower.includes('lawyer') || lower.includes('appeal') || lower.includes('ரத்து')

    setTimeout(() => {
      let reply = ''
      if (isLegalOrPersonal) {
        reply = lang === 'en'
          ? 'Anna Setu cannot provide legal advice or alter official administrative card decisions. For official appeals, please contact the National Food Security Helpline at 1967.'
          : 'அன்ன சேது செயலி அட்டை ரத்து அல்லது சட்ட விவகாரங்களை நேரடியாக தீர்க்க முடியாது. அதிகாரப்பூர்வ விசாரணைக்கு தயவுசெய்து 1967 என்ற இலவச உதவி எண்ணை அழைக்கவும்.'
      } else {
        const found = suggestedQuestions.find((s) => s.q.toLowerCase().includes(qText.toLowerCase().slice(0, 10)))
        reply = found
          ? found.a
          : lang === 'en'
          ? 'Anna Setu helps you check daily grain stock, reserve queue-free tokens, and track grievance resolution. For unresolved personal issues, call 1967.'
          : 'இந்த செயலியில் நீங்கள் ரேஷன் இருப்பு பார்க்கலாம், டோக்கன் முன்பதிவு செய்யலாம். சந்தேகம் இருந்தால் 1967 எண்ணை அழைக்கலாம்.'
      }

      setMessages([...newMsgs, { sender: 'assistant', text: reply }])
    }, 400)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ai-guide-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="ai-guide-title">
            <Icon name="sparkles" size={20} />
            <div>
              <h2>{t.assistantTitle}</h2>
              <small>App navigation & feature guide</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Guardrail Disclaimer */}
        <div className="ai-scope-banner">
          <Icon name="info" size={15} />
          <p>{t.assistantScopeNotice}</p>
        </div>

        {/* Chat Stream */}
        <div className="ai-chat-stream">
          {messages.map((m, idx) => (
            <div key={idx} className={'chat-bubble ' + (m.sender === 'user' ? 'user-bubble' : 'assistant-bubble')}>
              {m.sender === 'assistant' && <span className="bubble-bot-icon">✦</span>}
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        {/* Suggested Quick Questions */}
        <div className="suggested-questions-row">
          {suggestedQuestions.map((sq, i) => (
            <button key={i} className="suggested-q-chip" onClick={() => sendQuery(sq.q)}>
              {sq.q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="ai-input-bar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
            placeholder={t.askPlaceholder}
          />
          <button className="ai-send-btn" onClick={() => sendQuery()}>
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Help Screen with Helpline & Community Helper Illustration
   =================================================================== */
function Help({ t, offline, setOffline }) {
  const [showCall, setShowCall] = useState(false)
  const [helperImgError, setHelperImgError] = useState(false)

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello Anna Setu, please register me for monthly ration arrival alerts.')
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <section className="page-transition help-page">
      <div className="help-hero">
        <div className="community-helper-frame">
          {!helperImgError ? (
            <img
              src="/assets/community_helper.jpg"
              alt="Community PDS Helper"
              className="community-helper-img"
              onError={() => setHelperImgError(true)}
            />
          ) : (
            <span className="helper-fallback-icon">♡</span>
          )}
        </div>
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

      {/* WhatsApp Opt-in Card */}
      <div className="wa-optin-card">
        <div className="wa-optin-text">
          <b>{t.waOptInTitle}</b>
          <p>{t.waOptInSub}</p>
        </div>
        <button type="button" className="wa-optin-btn" onClick={openWhatsApp}>
          <Icon name="share" size={16} />
          <span>{t.waOptInBtn}</span>
        </button>
      </div>

      {/* Network Simulator Card */}
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

/* ===================================================================
   Correction Flow
   =================================================================== */
function Correction({ t, lang, card, finishResolution, resolved, goHome }) {
  const isEn = lang === 'en'
  const legalName = isEn ? (card.aadhaarNameEn || card.nameEn || 'Kaliammal') : (card.aadhaarName || 'காளியம்மாள்')
  const recordedTypo = isEn ? (card.recordedNameEn || 'Kaliamal K') : (card.recordedName || 'காளியம்மாள் கே')

  const [name, setName] = useState(legalName)
  const [error, setError] = useState('')

  const submit = () => {
    if (!name.trim()) {
      setError(t.nameError)
      return
    }
    finishResolution()
  }

  if (resolved) return <Success t={t} goHome={goHome} />

  return (
    <section className="flow page-transition">
      <span className="flow-symbol">≠</span>
      <h1>{t.request}</h1>
      <p>{reasons.mismatch.detail[lang] || reasons.mismatch.detail.en}</p>

      <div className="correction-ledger-card">
        <div className="ledger-header">
          <Icon name="shield" size={17} />
          <b>{isEn ? 'Ration Ledger Rectification' : 'ரேஷன் பதிவேடு பெயர் திருத்தம்'}</b>
        </div>

        <div className="ledger-entry error-entry">
          <span className="entry-tag error-tag">{t.currentCardName}</span>
          <div className="entry-val-row">
            <del>{recordedTypo}</del>
            <span className="error-pill">Typo detected</span>
          </div>
          <small className="entry-sub">Ration Card: {card.number}</small>
        </div>

        <div className="ledger-divider">
          <span>➔</span>
        </div>

        <div className="ledger-entry success-entry">
          <div className="entry-head-row">
            <span className="entry-tag success-tag">{t.correctAadhaarName}</span>
            <button
              type="button"
              className="autofill-btn"
              onClick={() => setName(legalName)}
            >
              <Icon name="bolt" size={12} />
              <span>{t.fillFromAadhaar}</span>
            </button>
          </div>
          <input
            className="correct-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full legal name"
          />
          <small className="entry-sub">{t.docVerifyNote}</small>
        </div>
      </div>

      {error && (
        <p className="form-error">
          <Icon name="info" size={17} />
          {error}
        </p>
      )}

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

/* ===================================================================
   Real-Time Grievance Tracker with Change-Log & SLA Review
   =================================================================== */
function Grievance({ t, lang, card, reason, fastForwarded, finishResolution, resolved, goHome, offline, statusLogs = [] }) {
  const [stage, setStage] = useState(fastForwarded ? 2 : 1)
  const [queuedOffline, setQueuedOffline] = useState(false)
  const isEn = lang === 'en'

  const ticketNumber =
    'AS-2026-' +
    ({ mismatch: '4182', aadhaar: '5217', stock: '6324', inactive: '7405' }[reason] || '4182')
  const why = reasons[reason] || reasons.stock

  const advance = () => {
    if (offline) {
      const existing = JSON.parse(localStorage.getItem('anna_offline_queue') || '[]')
      existing.push({ ticketNumber, reason, date: new Date().toISOString() })
      localStorage.setItem('anna_offline_queue', JSON.stringify(existing))
      setQueuedOffline(true)
      return
    }

    if (stage < 3) {
      setStage(stage + 1)
    } else {
      finishResolution()
    }
  }

  const shareStatusWhatsApp = () => {
    const textToShare = encodeURIComponent(
      `Anna Setu PDS Grievance Update: Ticket #${ticketNumber} for Ration Card ${card.number} is active. Resolution guaranteed under NFSA Section 19 within 7 days.`
    )
    window.open(`https://wa.me/?text=${textToShare}`, '_blank')
  }

  if (resolved) return <Success t={t} goHome={goHome} />

  const stages = [
    { title: isEn ? 'Grievance Registered' : 'புகார் பதிவு செய்யப்பட்டது', time: '10:42 AM · System', done: stage >= 1 },
    { title: t.officerReview || (isEn ? 'Taluk Supply Officer Review' : 'வட்ட வழங்கல் அலுவலர் ஆய்வு'), time: stage >= 2 ? (isEn ? 'In Review · TSO Mylapore' : 'ஆய்வில் உள்ளது') : 'Pending', done: stage >= 2, active: stage === 2 },
    { title: t.stockDispatch || (isEn ? 'FPS Stock Dispatched' : 'கடைக்கு கூடுதல் ஒதுக்கீடு'), time: stage >= 3 ? (isEn ? 'Dispatched · Buffer Depot' : 'அனுப்பப்பட்டது') : 'Queued', done: stage >= 3, active: stage === 3 },
    { title: t.resolution || (isEn ? 'Resolved & Quota Released' : 'தீர்வு காணப்பட்டது'), time: 'Final Step', done: stage >= 4 }
  ]

  return (
    <section className="flow grievance page-transition">
      <span className="flow-symbol">!</span>
      <h1>{t.grievance}</h1>
      <p>
        {fastForwarded ? t.autoCreated : t.days} · {why.title[lang] || why.title.en}
      </p>

      {/* NFSA 7-Day SLA Banner */}
      <div className="nfsa-sla-banner">
        <Icon name="shield" size={16} />
        <div>
          <b>NFSA Section 19 Statutory Guarantee</b>
          <p>{t.grievanceSLA}</p>
        </div>
      </div>

      <div className="tracking-card">
        <small>{t.tracking}</small>
        <b>{ticketNumber}</b>
        <span>{t.expected}</span>
      </div>

      {queuedOffline && (
        <div className="offline-alert-box">
          <Icon name="wifi" size={16} />
          <span>{t.offlineQueued}</span>
        </div>
      )}

      {/* Real-time Stepper */}
      <div className="realtime-tracker">
        <div className="tracker-head">
          <span className="live-badge-dot" />
          <b>{t.liveTracking}</b>
          <small>Stage {stage} of 4</small>
        </div>

        <div className="tracker-steps">
          {stages.map((st, idx) => (
            <div key={idx} className={'tracker-step-row ' + (st.done ? 'done ' : '') + (st.active ? 'active ' : '')}>
              <div className="step-indicator-col">
                <span className="step-bullet">{st.done ? '✓' : idx + 1}</span>
                {idx < stages.length - 1 && <i className="step-connecting-line" />}
              </div>
              <div className="step-detail-col">
                <b>{st.title}</b>
                <small>{st.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Log / Action Timeline */}
      <div className="grievance-log-section">
        <h3 className="log-heading">{t.grievanceLogTitle}</h3>
        <div className="log-items-list">
          {(statusLogs.length > 0 ? statusLogs : [
            { timestamp: '10:42 AM', officer: 'System Gateway', note: 'Discrepancy logged automatically' },
            { timestamp: '11:15 AM', officer: 'TSO Officer R. Narayanan', note: 'Inspecting FPS grain buffer' }
          ]).map((log, idx) => (
            <div className="log-item-row" key={idx}>
              <small>{log.timestamp}</small>
              <b>{log.officer}</b>
              <p>{isEn ? log.noteEn || log.note : log.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Status CTA */}
      <button type="button" className="share-ticket-btn" onClick={shareStatusWhatsApp}>
        <Icon name="share" size={16} />
        <span>{t.shareTicket}</span>
      </button>

      <button className="button primary" onClick={advance}>
        <span>{stage >= 3 ? t.resolveDemo : t.advanceProgress}</span>
        <Icon name="arrow" />
      </button>
    </section>
  )
}

function InkBurst() {
  return (
    <span className="ink-burst" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
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
