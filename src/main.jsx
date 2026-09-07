import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import mockData from './mockData.json'
import './tailwind.css'
import './styles.css'
import './overrides.css'

const { card: defaultCard, cards = {}, history: initialHistory, reasons, shops: allShops } = mockData

const languages = [
  { code: 'ta', label: 'தமிழ்', enLabel: 'Tamil', mark: 'அ' },
  { code: 'hi', label: 'हिन्दी', enLabel: 'Hindi', mark: 'अ' },
  { code: 'en', label: 'English', enLabel: 'English', mark: 'A' },
  { code: 'te', label: 'తెలుగు', enLabel: 'Telugu', mark: 'అ' },
  { code: 'kn', label: 'ಕನ್ನಡ', enLabel: 'Kannada', mark: 'ಅ' },
  { code: 'ml', label: 'മലയാളം', enLabel: 'Malayalam', mark: 'അ' },
  { code: 'mr', label: 'मराठी', enLabel: 'Marathi', mark: 'अ' }
]

const text = {
  ta: {
    app: 'அன்ன சேது', greeting: 'வணக்கம்', tagline: 'சரியான ரேஷன் தகவல், சரியான நேரத்தில்', demo: 'டெமோ முறை — எந்த அரசு அமைப்பும் இணைக்கப்படவில்லை',
    home: 'முகப்பு', shops: 'நியாய கடைகள்', history: 'வரலாறு', help: 'உதவி', helper: 'மற்றவருக்கு உதவ', helperSub: 'குடும்பம் அல்லது பக்கத்து வீட்டார் கார்டை பார்க்க',
    helperCard: 'நீங்கள் உதவும் நபரின் ரேஷன் கார்டு எண்', checkPerson: 'விவரம் காண்க', ownCard: 'என் கார்டிற்கு திரும்பு',
    cardNo: 'ரேஷன் கார்டு எண்', cardSaved: 'ரேஷன் கார்டு', continue: 'தொடரவும்', loading: 'விவரங்கள் சரிபார்க்கப்படுகின்றன…',
    cardError: 'குறைந்தது 6 எழுத்துக்கள் கொண்ட ரேஷன் எண்ணை உள்ளிடவும்.', offline: 'உங்கள் விவரங்கள் போனில் பாதுகாப்பாக உள்ளன. நெட்வொர்க் வந்ததும் புதுப்பிக்கப்படும்.',
    entitlement: 'இந்த மாத ரேஷன் ஒதுக்கீடு', denied: 'ரேஷன் நிறுத்தப்பட்டுள்ளது', partial: 'பகுதி ரேஷன் கிடைத்தது', received: 'முழு ரேஷன் கிடைத்தது', issue: 'காரணம் என்ன?',
    nearby: 'அருகிலுள்ள நியாய விலைக் கடைகள் (TNPDS)', today: 'இன்றைய இருப்பு நிலை', rice: 'அரிசி', wheat: 'கோதுமை', sugar: 'சர்க்கரை', dal: 'துவரம் பருப்பு',
    available: 'இருப்பில் உள்ளது', out: 'இன்று இல்லை', open: 'திறந்துள்ளது', closed: 'தற்போது மூடப்பட்டுள்ளது',
    timeline: 'கடந்த 6 மாதங்கள்', pattern: 'கடந்த 3 மாதங்களில் 2 முறை ரேஷன் பெறுவதில் சிக்கல் ஏற்பட்டுள்ளது', fast: '3 நாட்கள் முன்னோக்கி நகர்த்து', fastSub: 'புகார் தானாக பதிவாவதை காண',
    back: 'பின்செல்ல', grievance: 'புகார் தயாராக உள்ளது', autoCreated: '3 நாட்களுக்குப் பிறகு தானாக பதிவு செய்யப்பட்டது', tracking: 'கண்காணிப்பு எண்', expected: 'பதில் எதிர்பார்க்கப்படும் நேரம்: 48 மணிநேரம்',
    link: 'ஆதார் அடையாளம் இணைக்க', enterOtp: 'உங்கள் போனுக்கு வந்த 4 இலக்க குறியீட்டை உள்ளிடவும்', verify: 'சரிபார்க்கவும்', request: 'திருத்தக் கோரிக்கை',
    correctName: 'சரியான பெயர்', sendRequest: 'கோரிக்கையை அனுப்பு', nameError: 'தயவுசெய்து சரியான பெயரை உள்ளிடவும்.', success: 'வெற்றிகரமாக முடிந்தது!', successText: 'உங்கள் கோரிக்கை பதிவு செய்யப்பட்டது. தகவல் தெரிவிக்கப்படும்.',
    support: 'உதவி தேவையா?', call: 'ஹெல்ப்லைன் எண்ணைக் காட்டவும்', callShown: '1967 — இலவச உதவி எண் காட்டப்பட்டது', network: 'நெட்வொர்க் நிலை', noNetwork: 'நெட்வொர்க் கிடைக்கவில்லை',
    helpCard: 'நாங்கள் உங்களுடன் இருக்கிறோம்', helpBody: 'சந்தேகம் இருந்தால் 1967 என்ற எண்ணை அழைக்கவும். இது டெமோ முறை.', inactiveTitle: 'கார்டை மீண்டும் செயல்படுத்த', inactiveBody: 'உங்கள் கார்டுக்கான மறுஆய்வு கோரிக்கையை நாங்கள் தயார் செய்கிறோம்.',
    activate: 'மறுஆய்வு கோரிக்கை அனுப்ப', otpStep1: 'மொபைல் எண்ணை சரிபார்க்கவும்', otpStep3: 'அடையாளம் இணைக்கப்பட்டது', resolution: 'சிக்கல் தீர்க்கப்பட்டது', resolveDemo: 'தீர்வு காணப்பட்ட டெமோவை பார்க்க',
    days: '3 நாட்களாக தீர்வு இல்லை', check: 'இந்த கடையைத் தேர்வுசெய்', selectedShop: 'இந்த கடையில் இன்று தேவையான தானியங்கள் உள்ளன.', august: 'ஆகஸ்ட்', quantity: '20 கிலோ',
    demoStatus: 'நிலை மாற்ற', demoIssue: 'காரணம் மாற்ற', invalidOtp: '4 இலக்கங்களையும் உள்ளிடவும்',
    phoneGate: 'மொபைல் சரிபார்ப்பு', phoneGateSub: 'உங்கள் ரேஷன் விவரங்களை நீங்கள் மட்டுமே காண, பதிவு செய்யப்பட்ட மொபைல் எண்ணை சரிபார்க்கவும்.',
    phoneLabel: 'பதிவு செய்யப்பட்ட மொபைல் எண்', phoneOtpLabel: 'மொபைலுக்கு அனுப்பப்பட்ட 4 இலக்க OTP', phoneOtpHint: 'டெமோ OTP: 1234 (சோதனைக்காக)', wrongOtp: 'தவறான குறியீடு. இந்த டெமோவிற்கு 1234 ஐப் பயன்படுத்தவும்.',
    smsSimTitle: 'புதிய செய்தி · VA-TNPDS', smsSimBody: 'அன்ன சேது சரிபார்ப்பு குறியீடு: 1234. செல்லுபடியாகும் நேரம்: 10 நிமிடம்.', tapToFill: '1234 ஐ நிரப்ப தட்டவும்',
    allShops: 'அனைத்தும்', openOnly: 'திறந்தவை', riceOnly: 'அரிசி இருப்பு', wheatOnly: 'கோதுமை இருப்பு',
    switchCard: 'டெமோ கார்டு', tnPreset: 'தமிழ்நாடு (TN)', mhPreset: 'மகாராஷ்டிரா (MH)',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்', bookSlot: 'நேரம் முன்பதிவு', selectSlot: 'வருகை நேரத்தை தேர்வுசெய்க', confirmBooking: 'முன்பதிவை உறுதிசெய்க',
    tokenPassTitle: 'TNPDS முன்னுரிமை டோக்கன்', tokenNote: 'ரேஷன் கடையில் இந்த டோக்கனை காட்டி வரிசையின்றி பெற்றுக்கொள்ளலாம்', viewOnMap: 'கூகிள் மேப்',
    queueAhead: 'முன் உள்ளவர்கள்', estWait: 'காத்திருப்பு நேரம்', currentCardName: 'அட்டையில் உள்ள தவறான பெயர்', correctAadhaarName: 'ஆதார் படி சரியான பெயர்',
    docVerifyNote: 'ஆதார் e-KYC சரிபார்க்கப்பட்டு பதிவு செய்யப்படும்', fillFromAadhaar: 'ஆதார் பெயர் நிரப்பு', liveTracking: 'நேரலை நிலை கண்காணிப்பு',
    officerReview: 'வட்ட வழங்கல் அலுவலர் ஆய்வு', stockDispatch: 'கடைக்கு கூடுதல் ஒதுக்கீடு', advanceProgress: 'அடுத்த நிலைக்கு நகர்த்து',
    changeCard: 'கார்டை மாற்றுக', cardEntered: 'தேர்ந்தெடுக்கப்பட்ட கார்டு', clearCard: 'கார்டை மாற்று'
  },
  hi: {
    app: 'अन्न सेतु', greeting: 'नमस्ते', tagline: 'राशन की सही जानकारी, सही समय पर', demo: 'डेमो मोड — कोई असली सरकारी सिस्टम नहीं जुड़ा है',
    home: 'घर', shops: 'दुकानें', history: 'इतिहास', help: 'मदद', helper: 'किसी और की मदद करें', helperSub: 'परिवार या पड़ोसी का कार्ड देखें',
    helperCard: 'जिसकी मदद कर रहे हैं, उनका कार्ड नंबर', checkPerson: 'स्थिति देखें', ownCard: 'अपने कार्ड पर लौटें',
    cardNo: 'राशन कार्ड नंबर', cardSaved: 'राशन कार्ड', continue: 'आगे बढ़ें', loading: 'स्थिति जाँची जा रही है…',
    cardError: 'कृपया कम से कम 6 अंकों का डेमो कार्ड नंबर डालें।', offline: 'आपकी जानकारी फोन में सुरक्षित है। नेटवर्क आते ही अपडेट होगी।',
    entitlement: 'इस महीने का राशन', denied: 'राशन रुका है', partial: 'कुछ राशन मिला', received: 'राशन मिल गया', issue: 'क्या हुआ?',
    nearby: 'आपके पास की दुकानें (PDS)', today: 'आज का स्टॉक', rice: 'चावल', wheat: 'गेहूँ', sugar: 'चीनी', dal: 'दाल',
    available: 'मिल रहा है', out: 'आज नहीं है', open: 'खुली है', closed: 'अभी बंद है',
    timeline: 'पिछले 6 महीने', pattern: 'पिछले 3 महीनों में 2 बार राशन में समस्या हुई', fast: '3 दिन आगे बढ़ाएँ', fastSub: 'शिकायत अपने-आप बनने का डेमो देखें',
    back: 'वापस', grievance: 'शिकायत तैयार है', autoCreated: '3 दिन बाद अपने-आप दर्ज की गई', tracking: 'ट्रैकिंग नंबर', expected: 'जवाब मिलने का समय: 48 घंटे',
    link: 'पहचान जोड़ें', enterOtp: 'मोबाइल पर आया 4 अंकों का कोड डालें', verify: 'सत्यापित करें', request: 'सुधार का अनुरोध',
    correctName: 'सही नाम', sendRequest: 'अनुरोध भेजें', nameError: 'कृपया अपना सही नाम भरें।', success: 'हो गया!', successText: 'आपका अनुरोध दर्ज हो गया है। हम आपको बताएँगे।',
    support: 'मदद चाहिए?', call: 'हेल्पलाइन नंबर देखें', callShown: '1967 — हेल्पलाइन नंबर दिखा दिया गया है', network: 'नेटवर्क स्थिति', noNetwork: 'नेटवर्क नहीं मिला',
    helpCard: 'हम आपके साथ हैं', helpBody: 'समझ न आए तो 1967 पर कॉल करें। यह डेमो कॉल नहीं करता।', inactiveTitle: 'कार्ड फिर चालू करें', inactiveBody: 'हम जाँच के लिए आपका अनुरोध तैयार कर देंगे।',
    activate: 'जाँच का अनुरोध भेजें', otpStep1: 'मोबाइल नंबर जाँचें', otpStep3: 'पहचान जुड़ गई', resolution: 'समाधान पूरा हुआ', resolveDemo: 'समाधान होने का डेमो देखें',
    days: '3 दिन से समाधान नहीं हुआ', check: 'सही दुकान चुनें', selectedShop: 'यह दुकान आज दोनों अनाज दे सकती है।', august: 'अगस्त', quantity: '20 किलो',
    demoStatus: 'स्थिति बदलें', demoIssue: 'कारण बदलें', invalidOtp: 'चार अंक डालें',
    phoneGate: 'मोबाइल सत्यापन', phoneGateSub: 'आपका राशन विवरण सिर्फ आपको दिखे, इसलिए पहले मोबाइल नंबर जाँचें।',
    phoneLabel: 'मोबाइल नंबर', phoneOtpLabel: 'मोबाइल पर आया कोड डालें', phoneOtpHint: 'डेमो OTP: 1234 (जाँचने के लिए)', wrongOtp: 'गलत कोड। डेमो के लिए 1234 डालें।',
    smsSimTitle: 'नया संदेश · VA-ANNAST', smsSimBody: 'अन्न सेतु सत्यापन कोड 1234 है। वैधता: 10 मिनट।', tapToFill: '1234 ऑटो-फिल करें',
    allShops: 'सभी दुकानें', openOnly: 'खुली दुकानें', riceOnly: 'चावल उपलब्ध', wheatOnly: 'गेहूँ उपलब्ध',
    switchCard: 'डेमो कार्ड', tnPreset: 'तमिलनाडु (TN)', mhPreset: 'महाराष्ट्र (MH)',
    selectLanguage: 'भाषा चुनें', bookSlot: 'समय स्लॉट बुक करें', selectSlot: 'आगमन समय चुनें', confirmBooking: 'बुकिंग की पुष्टि करें',
    tokenPassTitle: 'PDS प्राथमिकता ई-टोकन', tokenNote: 'दुकान पर यह टोकन दिखाकर बिना कतार राशन प्राप्त करें', viewOnMap: 'गूगल मैप्स',
    queueAhead: 'कतार में आगे', estWait: 'अनुमानित समय', currentCardName: 'कार्ड पर दर्ज गलत नाम', correctAadhaarName: 'आधार अनुसार सही नाम',
    docVerifyNote: 'आधार e-KYC सत्यापन स्वतः संलग्न होगा', fillFromAadhaar: 'आधार नाम भरें', liveTracking: 'लाइव स्थिति ट्रैकिंग',
    officerReview: 'आपूर्ति अधिकारी समीक्षा', stockDispatch: 'दुकान आवंटन प्रेषित', advanceProgress: 'अगला चरण देखें',
    changeCard: 'कार्ड बदलें', cardEntered: 'चुना गया कार्ड', clearCard: 'कार्ड बदलें'
  },
  en: {
    app: 'Anna Setu', greeting: 'Hello', tagline: 'Clear ration support, right when you need it', demo: 'Demo mode — no real government system is connected',
    home: 'Home', shops: 'Shops', history: 'History', help: 'Help', helper: 'Help someone else', helperSub: 'Check a family member or neighbour’s card',
    helperCard: 'Ration card number for the person you’re helping', checkPerson: 'Check status', ownCard: 'Return to my card',
    cardNo: 'Ration card number', cardSaved: 'Ration card', continue: 'Continue', loading: 'Checking your status…',
    cardError: 'Enter at least 6 characters for a demo ration card number.', offline: 'Your details are saved on this phone and will update when connected.',
    entitlement: 'This month’s ration', denied: 'Ration is paused', partial: 'Some ration received', received: 'Ration received', issue: 'What happened?',
    nearby: 'Fair Price Shops (PDS)', today: 'Today’s stock', rice: 'Rice', wheat: 'Wheat', sugar: 'Sugar', dal: 'Toor Dal',
    available: 'Available', out: 'Not today', open: 'Open', closed: 'Closed now',
    timeline: 'Last 6 months', pattern: 'There were ration issues in 2 of the last 3 months', fast: 'Fast-forward 3 days', fastSub: 'See the grievance generated automatically',
    back: 'Back', grievance: 'Grievance is ready', autoCreated: 'Automatically registered after 3 days', tracking: 'Tracking number', expected: 'Expected response: 48 hours',
    link: 'Link identity', enterOtp: 'Enter the 4-digit code sent to your phone', verify: 'Verify', request: 'Request correction',
    correctName: 'Correct name', sendRequest: 'Send request', nameError: 'Please enter the correct name.', success: 'All set!', successText: 'Your request is recorded. We’ll keep you informed.',
    support: 'Need help?', call: 'Show helpline number', callShown: '1967 — helpline number shown', network: 'Network status', noNetwork: 'No network found',
    helpCard: 'We are with you', helpBody: 'If you are unsure, call 1967. This demo does not place calls.', inactiveTitle: 'Reactivate card', inactiveBody: 'We will prepare a review request for your card.',
    activate: 'Send review request', otpStep1: 'Check mobile number', otpStep3: 'Identity linked', resolution: 'Resolved', resolveDemo: 'See resolved demo',
    days: 'Unresolved for 3 days', check: 'Choose this shop', selectedShop: 'This shop can provide both grains today.', august: 'August', quantity: '20 kg',
    demoStatus: 'Change status', demoIssue: 'Change reason', invalidOtp: 'Enter all four digits',
    phoneGate: 'Phone verification', phoneGateSub: 'So only you can see your ration details, please verify your mobile number first.',
    phoneLabel: 'Mobile number', phoneOtpLabel: 'Enter the code sent to your phone', phoneOtpHint: 'Demo OTP: 1234 (for testing)', wrongOtp: 'Incorrect code. Use 1234 for this demo.',
    smsSimTitle: 'New Message · VA-TNPDS', smsSimBody: 'Your Anna Setu verification code is 1234. Valid for 10 minutes.', tapToFill: 'Tap to auto-fill 1234',
    allShops: 'All Shops', openOnly: 'Open Now', riceOnly: 'Rice in Stock', wheatOnly: 'Wheat in Stock',
    switchCard: 'Demo Card', tnPreset: 'Tamil Nadu (TN)', mhPreset: 'Maharashtra (MH)',
    selectLanguage: 'Select Language', bookSlot: 'Book Time Slot', selectSlot: 'Select Arrival Time', confirmBooking: 'Confirm & Get E-Token',
    tokenPassTitle: 'TNPDS Priority Pass', tokenNote: 'Show this digital token at the FPS counter to skip the queue', viewOnMap: 'Google Maps',
    queueAhead: 'People ahead', estWait: 'Estimated wait', currentCardName: 'Name as on Card (Typo)', correctAadhaarName: 'Correct Legal Name (Aadhaar)',
    docVerifyNote: 'Aadhaar e-KYC match verified for registered mobile', fillFromAadhaar: 'Fill from Aadhaar', liveTracking: 'Live Status Tracker',
    officerReview: 'Taluk Supply Officer Review', stockDispatch: 'FPS Stock Dispatched', advanceProgress: 'Advance Status (Demo)',
    changeCard: 'Change Card', cardEntered: 'Selected Card', clearCard: 'Switch Card'
  },
  te: {
    app: 'అన్న సేతు', greeting: 'నమస్కారం', tagline: 'సరైన రేషన్ సమాచారం, సరైన సమయంలో', demo: 'డెమో మోడ్ — ఏ ప్రభుత్వ వ్యవస్థ అనుసంధానించబడలేదు',
    home: 'హోమ్', shops: 'షాపులు', history: 'చరిత్ర', help: 'సహాయం', helper: 'ఇతరులకు సహాయం', helperSub: 'కుటుంబం లేదా పొరుగువారి కార్డు చూడండి',
    helperCard: 'సహాయం చేసే వ్యక్తి రేషన్ కార్డు నంబర్', checkPerson: 'వివరాలు చూడండి', ownCard: 'నా కార్డుకు తిరిగి వెళ్లండి',
    cardNo: 'రేషన్ కార్డు నంబర్', cardSaved: 'రేషన్ కార్డు', continue: 'కొనసాగించండి', loading: 'వివరాలు తనిఖీ చేయబడుతున్నాయి…',
    cardError: 'కనీసం 6 అక్షరాల డెమో కార్డు నంబర్ నమోదు చేయండి.', offline: 'మీ వివరాలు ఫోన్‌లో సురక్షితంగా ఉన్నాయి.',
    entitlement: 'ఈ నెల రేషన్ కోటా', denied: 'రేషన్ నిలిపివేయబడింది', partial: 'కొంత రేషన్ అందింది', received: 'పూర్తి రేషన్ అందింది', issue: 'ఏమి జరిగింది?',
    nearby: 'సమీప చౌకధరల దుకాణాలు (PDS)', today: 'నేటి నిల్వ', rice: 'బియ్యం', wheat: 'గోధుమలు', sugar: 'చక్కెర', dal: 'కందిపప్పు',
    available: 'అందుబాటులో ఉంది', out: 'నేడు లేదు', open: 'తెరిచి ఉంది', closed: 'మూసివేయబడింది',
    timeline: 'గత 6 నెలలు', pattern: 'గత 3 నెలల్లో 2 సార్లు రేషన్ సమస్య వచ్చింది', fast: '3 రోజులు ముందుకు జరపండి', fastSub: 'ఫిర్యాదు ఆటోమేటిక్‌గా నమోదు కావడాన్ని చూడండి',
    back: 'వెనుకకు', grievance: 'ఫిర్యాదు సిద్ధంగా ఉంది', autoCreated: '3 రోజుల తర్వాత ఆటోమేటిక్‌గా నమోదైంది', tracking: 'ట్రాకింగ్ నంబర్', expected: 'స్పందన సమయం: 48 గంటలు',
    link: 'గుర్తింపును లింక్ చేయండి', enterOtp: 'మీ ఫోన్‌కు వచ్చిన 4 అంకెల కోడ్‌ను నమోదు చేయండి', verify: 'ధృవీకరించండి', request: 'సవరణ అభ్యర్థన',
    correctName: 'సరైన పేరు', sendRequest: 'అభ్యర్థన పంపండి', nameError: 'దయచేసి సరైన పేరు నమోదు చేయండి.', success: 'విజయవంతమైంది!', successText: 'మీ అభ్యర్థన నమోదైంది.',
    support: 'సహాయం కావాలా?', call: 'హెల్ప్‌లైన్ నంబర్', callShown: '1967 — హెల్ప్‌లైన్ చూపబడింది', network: 'నెట్‌వర్క్ స్థితి', noNetwork: 'నెట్‌వర్క్ లేదు',
    helpCard: 'మేము మీకు తోడుగా ఉన్నాము', helpBody: 'సందేహం ఉంటే 1967కు కాల్ చేయండి. ఇది డెమో.', inactiveTitle: 'కార్డు పునరుద్ధరణ', inactiveBody: 'మేము సమీక్ష అభ్యర్థనను సిద్ధం చేస్తాము.',
    activate: 'అభ్యర్థన పంపండి', otpStep1: 'మొబైల్ తనిఖీ', otpStep3: 'గుర్తింపు లింక్ అయింది', resolution: 'పరిష్కరించబడింది', resolveDemo: 'పరిష్కార డెమో',
    days: '3 రోజులుగా పరిష్కారం కాలేదు', check: 'ఈ షాపును ఎంచుకోండి', selectedShop: 'ఈ షాపులో ధాన్యాలు అందుబాటులో ఉన్నాయి.', august: 'ఆగస్టు', quantity: '20 కిలోలు',
    demoStatus: 'స్థితి మార్చు', demoIssue: 'కారణం మార్చు', invalidOtp: '4 అంకెలు నమోదు చేయండి',
    phoneGate: 'మొబైల్ ధృవీకరణ', phoneGateSub: 'మీ రేషన్ వివరాలు మీరు మాత్రమే చూడటానికి మొబైల్ ధృవీకరించండి.',
    phoneLabel: 'మొబైల్ నంబర్', phoneOtpLabel: 'OTP కోడ్ నమోదు చేయండి', phoneOtpHint: 'డెమో OTP: 1234', wrongOtp: 'తప్పు కోడ్. 1234 ఉపయోగించండి.',
    smsSimTitle: 'కొత్త సందేశం · VA-TNPDS', smsSimBody: 'అన్న సేతు OTP కోడ్: 1234.', tapToFill: '1234 ఆటో-ఫిల్ చేయండి',
    allShops: 'అన్ని షాపులు', openOnly: 'తెరిచినవి', riceOnly: 'బియ్యం నిల్వ', wheatOnly: 'గోధుమలు నిల్వ',
    switchCard: 'డెమో కార్డు', tnPreset: 'తమిళనాడు (TN)', mhPreset: 'మహారాష్ట్ర (MH)',
    selectLanguage: 'భాషను ఎంచుకోండి', bookSlot: 'సమయ స్లాట్ బుక్ చేయండి', selectSlot: 'రాక సమయం ఎంచుకోండి', confirmBooking: 'స్లాట్ నిర్ధారించండి',
    tokenPassTitle: 'PDS ప్రాధాన్యత ఇ-టోకెన్', tokenNote: 'క్యూ లేకుండా రేషన్ పొందడానికి ఈ టోకెన్ చూపించండి', viewOnMap: 'గూగుల్ మ్యాప్స్',
    queueAhead: 'ముందున్న వ్యక్తులు', estWait: 'వేచి ఉండే సమయం', currentCardName: 'కార్డులోని తప్పు పేరు', correctAadhaarName: 'ఆధార్ ప్రకారం సరైన పేరు',
    docVerifyNote: 'ఆధార్ e-KYC ధృవీకరణ పూర్తయింది', fillFromAadhaar: 'ఆధార్ పేరు నింపండి', liveTracking: 'లైవ్ ట్రాకింగ్',
    officerReview: 'అధికారి సమీక్ష', stockDispatch: 'స్టాక్ కేటాయింపు పంపబడింది', advanceProgress: 'తదుపరి దశ చూడండి',
    changeCard: 'కార్డు మార్చండి', cardEntered: 'ఎంచుకున్న కార్డు', clearCard: 'కార్డు మార్చండి'
  },
  kn: {
    app: 'ಅನ್ನ ಸೇತು', greeting: 'ನಮಸ್ಕಾರ', tagline: 'ಸರಿಯಾದ ಪಡಿತರ ಮಾಹಿತಿ, ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ', demo: 'ಡೆಮೊ ಮೋಡ್ — ಯಾವುದೇ ಸರ್ಕಾರಿ ವ್ಯವಸ್ಥೆ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ',
    home: 'ಮುಖಪುಟ', shops: 'ಅಂಗಡಿಗಳು', history: 'ಇತಿಹಾಸ', help: 'ಸಹಾಯ', helper: 'ಇತರರಿಗೆ ಸಹಾಯ', helperSub: 'ಕುಟುಂಬ ಅಥವಾ ನೆರೆಹೊರೆಯವರ ಕಾರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    helperCard: 'ಸಹಾಯ ಪಡೆಯುವವರ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ', checkPerson: 'ವಿವರ ನೋಡಿ', ownCard: 'ನನ್ನ ಕಾರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    cardNo: 'ಪಡಿತರ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ', cardSaved: 'ಪಡಿತರ ಕಾರ್ಡ್', continue: 'ಮುಂದುವರಿಯಿರಿ', loading: 'ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…',
    cardError: 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳ ಡೆಮೊ ಕಾರ್ಡ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.', offline: 'ನಿಮ್ಮ ವಿವರಗಳು ಫೋನ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿವೆ.',
    entitlement: 'ಈ ತಿಂಗಳ ಪಡಿತರ ಕೋಟಾ', denied: 'ಪಡಿತರ ಸ್ಥಗಿತಗೊಂಡಿದೆ', partial: 'ಸ್ವಲ್ಪ ಪಡಿತರ ಸಿಕ್ಕಿದೆ', received: 'ಪೂರ್ಣ ಪಡಿತರ ಸಿಕ್ಕಿದೆ', issue: 'ಏನಾಯಿತು?',
    nearby: 'ಹತ್ತಿರದ ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಗಳು (PDS)', today: 'ಇಂದಿನ ದಾಸ್ತಾನು', rice: 'ಅಕ್ಕಿ', wheat: 'ಗೋಧಿ', sugar: 'ಸಕ್ಕರೆ', dal: 'ತೊಗರಿ ಬೇಳೆ',
    available: 'ಲಭ್ಯವಿದೆ', out: 'ಇಂದು ಇಲ್ಲ', open: 'ತೆರೆದಿದೆ', closed: 'ಮುಚ್ಚಲಾಗಿದೆ',
    timeline: 'ಕಳೆದ 6 ತಿಂಗಳು', pattern: 'ಕಳೆದ 3 ತಿಂಗಳಲ್ಲಿ 2 ಬಾರಿ ಸಮಸ್ಯೆ ಕಂಡುಬಂದಿದೆ', fast: '3 ದಿನ ಮುಂದೆ ಸರಿಸಿ', fastSub: 'ದೂರು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದಾಖಲಾಗುವುದನ್ನು ನೋಡಿ',
    back: 'ಹಿಂದೆ', grievance: 'ದೂರು ಸಿದ್ಧವಾಗಿದೆ', autoCreated: '3 ದಿನಗಳ ನಂತರ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದಾಖಲಾಗಿದೆ', tracking: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ', expected: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ: 48 ಗಂಟೆ',
    link: 'ಗುರುತು ಲಿಂಕ್ ಮಾಡಿ', enterOtp: '4 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ', verify: 'ಪರಿಶೀಲಿಸಿ', request: 'ತಿದ್ದುಪಡಿ ವಿನಂತಿ',
    correctName: 'ಸರಿಯಾದ ಹೆಸರು', sendRequest: 'ವಿನಂತಿ ಕಳುಹಿಸಿ', nameError: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.', success: 'ಯಶಸ್ವಿಯಾಗಿದೆ!', successText: 'ನಿಮ್ಮ ವಿನಂತಿ ದಾಖಲಾಗಿದೆ.',
    support: 'ಸಹಾಯ ಬೇಕೇ?', call: 'ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ', callShown: '1967 — ಸಹಾಯವಾಣಿ ತೋರಿಸಲಾಗಿದೆ', network: 'ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ', noNetwork: 'ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲ',
    helpCard: 'ನಾವು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇವೆ', helpBody: 'ಅನುಮಾನವಿದ್ದರೆ 1967 ಗೆ ಕರೆ ಮಾಡಿ.', inactiveTitle: 'ಕಾರ್ಡ್ ಮರುಸಕ್ರಿಯಗೊಳಿಸಿ', inactiveBody: 'ನಾವು ಪರಿಶೀಲನಾ ವಿನಂತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತೇವೆ.',
    activate: 'ವಿನಂತಿ ಕಳುಹಿಸಿ', otpStep1: 'ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ', otpStep3: 'ಗುರುತು ಲಿಂಕ್ ಆಗಿದೆ', resolution: 'ಪರಿಹರಿಸಲಾಗಿದೆ', resolveDemo: 'ಪರಿಹಾರದ ಡೆಮೊ',
    days: '3 ದಿನಗಳಿಂದ ಪರಿಹಾರವಾಗಿಲ್ಲ', check: 'ಈ ಅಂಗಡಿ ಆಯ್ಕೆಮಾಡಿ', selectedShop: 'ಈ ಅಂಗಡಿಯಲ್ಲಿ ದಾಸ್ತಾನು ಲಭ್ಯವಿದೆ.', august: 'ಆಗಸ್ಟ್', quantity: '20 ಕೆಜಿ',
    demoStatus: 'ಸ್ಥಿತಿ ಬದಲಿಸಿ', demoIssue: 'ಕಾರಣ ಬದಲಿಸಿ', invalidOtp: '4 ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ',
    phoneGate: 'ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ', phoneGateSub: 'ನಿಮ್ಮ ಪಡಿತರ ವಿವರಗಳನ್ನು ನೀವು ಮಾತ್ರ ನೋಡಲು ಮೊಬೈಲ್ ಪರಿಶೀಲಿಸಿ.',
    phoneLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', phoneOtpLabel: 'OTP ಕೋಡ್ ನಮೂದಿಸಿ', phoneOtpHint: 'ಡೆಮೊ OTP: 1234', wrongOtp: 'ತಪ್ಪು ಕೋಡ್. 1234 ಬಳಸಿ.',
    smsSimTitle: 'ಹೊಸ ಸಂದೇಶ · VA-TNPDS', smsSimBody: 'ಅನ್ನ ಸೇತು OTP: 1234.', tapToFill: '1234 ಆಟೋ-ಫಿಲ್ ಮಾಡಿ',
    allShops: 'ಎಲ್ಲಾ ಅಂಗಡಿಗಳು', openOnly: 'ತೆರೆದಿರುವ ಅಂಗಡಿಗಳು', riceOnly: 'ಅಕ್ಕಿ ದಾಸ್ತಾನು', wheatOnly: 'ಗೋಧಿ ದಾಸ್ತಾನು',
    switchCard: 'ಡೆಮೊ ಕಾರ್ಡ್', tnPreset: 'ತಮಿಳುನಾಡು (TN)', mhPreset: 'ಮಹಾರಾಷ್ಟ್ರ (MH)',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', bookSlot: 'ಸಮಯ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ', selectSlot: 'ಭೇಟಿ ಸಮಯ ಆರಿಸಿ', confirmBooking: 'ದೃಢೀಕರಿಸಿ',
    tokenPassTitle: 'PDS ಆದ್ಯತಾ ಇ-ಟೋಕನ್', tokenNote: 'ಸರತಿ ತಪ್ಪಿಸಲು ಅಂಗಡಿಯಲ್ಲಿ ಈ ಟೋಕನ್ ತೋರಿಸಿ', viewOnMap: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್',
    queueAhead: 'ಮುಂದಿರುವ ಜನರು', estWait: 'ನಿರೀಕ್ಷಿತ ಕಾಯುವಿಕೆ', currentCardName: 'ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ತಪ್ಪು ಹೆಸರು', correctAadhaarName: 'ಆಧಾರ್ ಪ್ರಕಾರ ಸರಿಯಾದ ಹೆಸರು',
    docVerifyNote: 'ಆಧಾರ್ e-KYC ಪರಿಶೀಲಿಸಲಾಗಿದೆ', fillFromAadhaar: 'ಆಧಾರ್ ಹೆಸರು ತುಂಬಿ', liveTracking: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    officerReview: 'ಅಧಿಕಾರಿ ಪರಿಶೀಲನೆ', stockDispatch: 'ದಾಸ್ತಾನು ರವಾನಿಸಲಾಗಿದೆ', advanceProgress: 'ಮುಂದಿನ ಹಂತ ನೋಡಿ',
    changeCard: 'ಕಾರ್ಡ್ ಬದಲಾಯಿಸಿ', cardEntered: 'ಆಯ್ಕೆಮಾಡಿದ ಕಾರ್ಡ್', clearCard: 'ಕಾರ್ಡ್ ಬದಲಾಯಿಸಿ'
  },
  ml: {
    app: 'അന്ന സേതു', greeting: 'നമസ്കാരം', tagline: 'കൃത്യമായ റേഷൻ വിവരങ്ങൾ, കൃത്യസമയത്ത്', demo: 'ഡെമോ മോഡ് — ഔദ്യോഗിക സംവിധാനങ്ങളുമായി ബന്ധിപ്പിച്ചിട്ടില്ല',
    home: 'ഹോം', shops: 'കടകൾ', history: 'ചരിത്രം', help: 'സഹായം', helper: 'മറ്റൊരാളെ സഹായിക്കുക', helperSub: 'കുടുംബാംഗത്തിന്റെ കാർഡ് പരിശോധിക്കുക',
    helperCard: 'സഹായിക്കുന്ന വ്യക്തിയുടെ റേഷൻ കാർഡ് നമ്പർ', checkPerson: 'വിവരം കാണുക', ownCard: 'എന്റെ കാർഡിലേക്ക് മടങ്ങുക',
    cardNo: 'റേഷൻ കാർഡ് നമ്പർ', cardSaved: 'റേഷൻ കാർഡ്', continue: 'തുടരുക', loading: 'വിവരങ്ങൾ പരിശോധിക്കുന്നു…',
    cardError: 'കുറഞ്ഞത് 6 അക്കമുള്ള കാർഡ് നമ്പർ നൽകുക.', offline: 'വിവരങ്ങൾ ഫോണിൽ സുരക്ഷിതമാണ്.',
    entitlement: 'ഈ മാസത്തെ റേഷൻ വിഹിതം', denied: 'റേഷൻ തടസ്സപ്പെട്ടു', partial: 'റേഷൻ ഭാഗികമായി ലഭിച്ചു', received: 'പൂർണ്ണ റേഷൻ ലഭിച്ചു', issue: 'എന്താണ് സംഭവിച്ചത്?',
    nearby: 'സമീപത്തെ റേഷൻ കടകൾ (PDS)', today: 'ഇന്നത്തെ സ്റ്റോക്ക്', rice: 'അരി', wheat: 'ഗോതമ്പ്', sugar: 'പഞ്ചസാര', dal: 'പരിപ്പ്',
    available: 'ലഭ്യമാണ്', out: 'ഇന്ന് ലഭ്യമല്ല', open: 'തുറന്നിരിക്കുന്നു', closed: 'അടച്ചിരിക്കുന്നു',
    timeline: 'കഴിഞ്ഞ 6 മാസം', pattern: 'കഴിഞ്ഞ 3 മാസത്തിൽ 2 തവണ പ്രശ്നം ഉണ്ടായി', fast: '3 ദിവസം മുന്നോട്ട് നീക്കുക', fastSub: 'പരാതി തനിയെ രജിസ്റ്റർ ആകുന്നത് കാണുക',
    back: 'തിരികെ', grievance: 'പരാതി തയ്യാറാണ്', autoCreated: '3 ദിവസത്തിന് ശേഷം സ്വയമേവ രജിസ്റ്റർ ചെയ്തു', tracking: 'ട്രാക്കിംഗ് നമ്പർ', expected: 'മറുപടി സമയം: 48 മണിക്കൂർ',
    link: 'തിരിച്ചറിയൽ കാർഡ് ലിങ്ക് ചെയ്യുക', enterOtp: '4 അക്ക കോഡ് നൽകുക', verify: 'സ്ഥിരീകരിക്കുക', request: 'തിരുത്തൽ അപേക്ഷ',
    correctName: 'ശരിയായ പേര്', sendRequest: 'അപേക്ഷ അയക്കുക', nameError: 'ശരിയായ പേര് നൽകുക.', success: 'വിജയകരം!', successText: 'അപേക്ഷ രേഖപ്പെടുത്തി.',
    support: 'സഹായം വേണോ?', call: 'ഹെൽപ്പ്‌ലൈൻ നമ്പർ', callShown: '1967 — ഹെൽപ്പ്‌ലൈൻ കാണിച്ചു', network: 'നെറ്റ്‌വർക്ക് അവസ്ഥ', noNetwork: 'നെറ്റ്‌വർക്ക് ഇല്ല',
    helpCard: 'ഞങ്ങൾ നിങ്ങൾക്കൊപ്പമുണ്ട്', helpBody: 'സംശയമുണ്ടെങ്കിൽ 1967 ൽ വിളിക്കുക.', inactiveTitle: 'കാർഡ് പുനഃസ്ഥാപിക്കുക', inactiveBody: 'പരിശോധന അപേക്ഷ ഞങ്ങൾ തയ്യാറാക്കാം.',
    activate: 'അപേക്ഷ അയക്കുക', otpStep1: 'മൊബൈൽ പരിശോധിക്കുക', otpStep3: 'തിരിച്ചറിയൽ രേഖ ലിങ്ക് ചെയ്തു', resolution: 'പരിഹരിച്ചു', resolveDemo: 'പരിഹാര ഡെമോ',
    days: '3 ദിവസമായി പരിഹാരമില്ല', check: 'ഈ കട തിരഞ്ഞെടുക്കുക', selectedShop: 'ഈ കടയിൽ സ്റ്റോക്ക് ലഭ്യമാണ്.', august: 'ഓഗസ്റ്റ്', quantity: '20 കിലോ',
    demoStatus: 'നില മാറ്റുക', demoIssue: 'കാരണം മാറ്റുക', invalidOtp: '4 അക്കങ്ങൾ നൽകുക',
    phoneGate: 'മൊബൈൽ പരിശോധന', phoneGateSub: 'റേഷൻ വിവരങ്ങൾ സുരക്ഷിതമായി കാണാൻ മൊബൈൽ പരിശോധിക്കുക.',
    phoneLabel: 'മൊബൈൽ നമ്പർ', phoneOtpLabel: 'OTP കോഡ് നൽകുക', phoneOtpHint: 'ഡെമോ OTP: 1234', wrongOtp: 'തെറ്റായ കോഡ്. 1234 ഉപയോഗിക്കുക.',
    smsSimTitle: 'പുതിയ സന്ദേശം · VA-TNPDS', smsSimBody: 'അന്ന സേതു OTP: 1234.', tapToFill: '1234 സ്വയം പൂരിപ്പിക്കുക',
    allShops: 'എല്ലാ കടകളും', openOnly: 'തുറന്നവ', riceOnly: 'അരി സ്റ്റോക്ക്', wheatOnly: 'ഗോതമ്പ് സ്റ്റോക്ക്',
    switchCard: 'ഡെമോ കാർഡ്', tnPreset: 'തമിഴ്നാട് (TN)', mhPreset: 'മഹാരാഷ്ട്ര (MH)',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക', bookSlot: 'സമയം ബുക്ക് ചെയ്യുക', selectSlot: 'സന്ദർശന സമയം തിരഞ്ഞെടുക്കുക', confirmBooking: 'സ്ഥിരീകരിക്കുക',
    tokenPassTitle: 'PDS മുൻഗണനാ ഇ-ടോക്കൺ', tokenNote: 'വരി ഒഴിവാക്കാൻ കടയിൽ ഈ ടോക്കൺ കാണിക്കുക', viewOnMap: 'ഗൂഗിൾ മാപ്സ്',
    queueAhead: 'മുന്നിലുള്ള ആളുകൾ', estWait: 'പ്രതീക്ഷിക്കുന്ന സമയം', currentCardName: 'കാർഡിലെ തെറ്റായ പേര്', correctAadhaarName: 'ആധാർ പ്രകാരമുള്ള ശരിയായ പേര്',
    docVerifyNote: 'ആധാർ e-KYC പരിശോധന പൂർത്തിയായി', fillFromAadhaar: 'ആധാർ പേര് നൽകുക', liveTracking: 'തത്സമയ ട്രാക്കിംഗ്',
    officerReview: 'ഉദ്യോഗസ്ഥ പരിശോധന', stockDispatch: 'സ്റ്റോക്ക് അനുവദിച്ചു', advanceProgress: 'അടുത്ത ഘട്ടം കാണുക',
    changeCard: 'കാർഡ് മാറ്റുക', cardEntered: 'തിരഞ്ഞെടുത്ത കാർഡ്', clearCard: 'കാർഡ് മാറ്റുക'
  },
  mr: {
    app: 'अन्न सेतु', greeting: 'नमस्ते', tagline: 'रेशनची अचूक माहिती, योग्य वेळी', demo: 'डेमो मोड — कोणतीही सरकारी यंत्रणा जोडलेली नाही',
    home: 'मुख्यपृष्ठ', shops: 'दुकाने', history: 'इतिहास', help: 'मदत', helper: 'इतरांना मदत करा', helperSub: 'कुटुंब किंवा शेजाऱ्यांचे कार्ड तपासा',
    helperCard: 'रेशन कार्ड नंबर', checkPerson: 'स्थिती पहा', ownCard: 'माझ्या कार्डवर परत जा',
    cardNo: 'रेशन कार्ड नंबर', cardSaved: 'रेशन कार्ड', continue: 'पुढे जा', loading: 'स्थिती तपासली जात आहे…',
    cardError: 'किमान 6 अंकी डेमो कार्ड नंबर टाका.', offline: 'माहिती फोनमध्ये सुरक्षित आहे.',
    entitlement: 'या महिन्याचे रेशन', denied: 'रेशन थांबवले आहे', partial: 'काही रेशन मिळाले', received: 'पूर्ण रेशन मिळाले', issue: 'काय झाले?',
    nearby: 'जवळची दुकाने (PDS)', today: 'आजचा साठा', rice: 'तांदूळ', wheat: 'गहू', sugar: 'साखर', dal: 'डाळ',
    available: 'उपलब्ध आहे', out: 'आज नाही', open: 'उघडे आहे', closed: 'बंद आहे',
    timeline: 'मागील 6 महिने', pattern: 'मागील 3 महिन्यांत 2 वेळा रेशनमध्ये अडचण आली', fast: '3 दिवस पुढे करा', fastSub: 'तक्रार आपोआप नोंदवली जाणे पहा',
    back: 'मागे', grievance: 'तक्रार तयार आहे', autoCreated: '3 दिवसांनंतर आपोआप नोंदवली गेली', tracking: 'ट्रॅकिंग नंबर', expected: 'अपेक्षित वेळ: 48 तास',
    link: 'ओळख लिंक करा', enterOtp: '4 अंकी कोड टाका', verify: 'पडताळणी करा', request: 'दुरुस्ती विनंती',
    correctName: 'योग्य नाव', sendRequest: 'विनंती पाठवा', nameError: 'कृपया योग्य नाव भरा.', success: 'यशस्वी झाले!', successText: 'आपली विनंती नोंदवली गेली आहे.',
    support: 'मदत हवी आहे?', call: 'हेल्पलाइन नंबर', callShown: '1967 — हेल्पलाइन दाखवली', network: 'नेटवर्क स्थिती', noNetwork: 'नेटवर्क नाही',
    helpCard: 'आम्ही सोबत आहोत', helpBody: 'शंका असल्यास 1967 वर कॉल करा.', inactiveTitle: 'कार्ड पुन्हा सुरू करा', inactiveBody: 'आम्ही पुनरावलोकन विनंती तयार करू.',
    activate: 'विनंती पाठवा', otpStep1: 'मोबाईल तपासा', otpStep3: 'ओळख लिंक झाली', resolution: 'निवारण झाले', resolveDemo: 'निवारण डेमो',
    days: '3 दिवसांपासून निवारण नाही', check: 'हे दुकान निवडा', selectedShop: 'या दुकानात साठा उपलब्ध आहे.', august: 'ऑगस्ट', quantity: '20 किलो',
    demoStatus: 'स्थिती बदला', demoIssue: 'कारण बदला', invalidOtp: '4 अंक टाका',
    phoneGate: 'मोबाईल पडताळणी', phoneGateSub: 'आपली माहिती सुरक्षित राहण्यासाठी मोबाईल तपासा.',
    phoneLabel: 'मोबाईल नंबर', phoneOtpLabel: 'OTP कोड टाका', phoneOtpHint: 'डेमो OTP: 1234', wrongOtp: 'चुकीचा कोड. 1234 वापरा.',
    smsSimTitle: 'नवीन संदेश · VA-TNPDS', smsSimBody: 'अन्न सेतु पडताळणी कोड 1234 आहे.', tapToFill: '1234 भरा',
    allShops: 'सर्व दुकाने', openOnly: 'उघडी दुकाने', riceOnly: 'तांदूळ साठा', wheatOnly: 'गहू साठा',
    switchCard: 'डेमो कार्ड', tnPreset: 'तमिळनाडू (TN)', mhPreset: 'महाराष्ट्र (MH)',
    selectLanguage: 'भाषा निवडा', bookSlot: 'वेळ स्लॉट बुक करा', selectSlot: 'येण्याची वेळ निवडा', confirmBooking: 'पुष्टी करा',
    tokenPassTitle: 'PDS प्राधान्य ई-टोकन', tokenNote: 'रांगेत उभे न राहता रेशन मिळवण्यासाठी हे टोकन दाखवा', viewOnMap: 'गुगल मॅप्स',
    queueAhead: 'रांगेत पुढे लोक', estWait: 'अपेक्षित प्रतीक्षा', currentCardName: 'कार्डवरील चुकीचे नाव', correctAadhaarName: 'आधारनुसार अचूक नाव',
    docVerifyNote: 'आधार e-KYC पडताळणी पूर्ण झाली', fillFromAadhaar: 'आधार नाव भरा', liveTracking: 'थेट ट्रॅकिंग',
    officerReview: 'अधिकारी पुनरावलोकन', stockDispatch: 'साठा वाटप पाठवले', advanceProgress: 'पुढील टप्पा पहा',
    changeCard: 'कार्ड बदला', cardEntered: 'निवडलेले कार्ड', clearCard: 'कार्ड बदला'
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
    )
  }
  return <svg {...c}>{p[name] || p.help}</svg>
}

/* Beautiful Citizen Profile Avatar with official gold stamp border and online beacon */
function CitizenAvatar({ card, isHelper, size = 52 }) {
  const initial = isHelper ? 'ரா' : card.avatarInitial || 'கா'
  const stateColor = isHelper ? '#1E2A3C' : '#9C6B14'

  return (
    <div className="citizen-avatar-wrap" style={{ width: size, height: size }} title={card.name}>
      <svg viewBox="0 0 100 100" className="citizen-avatar" aria-hidden="true">
        <defs>
          <linearGradient id="avatarSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D49A62" />
            <stop offset="100%" stopColor="#9C6230" />
          </linearGradient>
          <linearGradient id="avatarAttire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stateColor} />
            <stop offset="100%" stopColor="#0E1622" />
          </linearGradient>
          <linearGradient id="avatarGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7E4B8" />
            <stop offset="50%" stopColor="#D89A1E" />
            <stop offset="100%" stopColor="#A9760F" />
          </linearGradient>
        </defs>
        {/* Outer Ledger Ring */}
        <circle cx="50" cy="50" r="47" fill="#FBF7EC" stroke="url(#avatarGold)" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="42" fill="#F3ECDC" stroke="#CDBB94" strokeWidth="1" strokeDasharray="3 2" />
        {/* Torso */}
        <path d="M20 86 C20 66, 35 60, 50 60 C65 60, 80 66, 80 86 Z" fill="url(#avatarAttire)" />
        {/* Traditional Saree Pallu / Collar */}
        <path d="M38 60 L50 78 L62 60" stroke="#D89A1E" strokeWidth="2.5" fill="none" />
        {/* Neck */}
        <rect x="44" y="47" width="12" height="15" rx="3" fill="#A86530" />
        {/* Head */}
        <circle cx="50" cy="36" r="17" fill="url(#avatarSkin)" />
        {/* Hair */}
        <path d="M33 34 C33 19, 43 16, 50 16 C57 16, 67 19, 67 34 C67 30, 63 24, 50 24 C37 24, 33 30, 33 34 Z" fill="#18110D" />
        {/* Traditional Bindi */}
        {!isHelper && <circle cx="50" cy="33" r="2.2" fill="#A6362C" />}
        {/* Holographic Verification Star */}
        <circle cx="76" cy="76" r="11" fill="#1E2A3C" stroke="#D89A1E" strokeWidth="1.5" />
        <text x="76" y="80" fill="#D89A1E" fontSize="9" fontWeight="bold" textAnchor="middle">{initial}</text>
      </svg>
      <span className="avatar-status-dot" title="Verified Beneficiary" />
    </div>
  )
}

function Brand({ t, lang, setLang }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0]

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

      {/* Scrollable Language Dropdown */}
      <div className="lang-dropdown-wrapper" ref={dropdownRef}>
        <button
          className="lang-dropdown-trigger"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
          aria-label="Select Language"
        >
          <Icon name="globe" size={16} />
          <span>{currentLangObj.label}</span>
          <Icon name="chevronDown" size={13} />
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
  const [verified, setVerified] = useState(() => {
    return localStorage.getItem('anna-verified') === 'true' && Boolean(localStorage.getItem('anna-card-number'))
  })
  const [savedCard, setSavedCard] = useState(() => {
    const isVerified = localStorage.getItem('anna-verified') === 'true'
    return isVerified ? (localStorage.getItem('anna-card-number') || '') : ''
  })
  const [pendingCard, setPendingCard] = useState('')
  const [status, setStatus] = useState('denied')
  const [reason, setReason] = useState('mismatch')
  const [isLoading, setIsLoading] = useState(false)
  const [helper, setHelper] = useState(false)
  const [offline, setOffline] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [fastForwarded, setFastForwarded] = useState(false)
  const [records, setRecords] = useState(initialHistory)

  const t = text[lang] || text.en || text.ta
  const activeCardNumber = savedCard || pendingCard || 'TN-02-G-849201'
  const currentCard = resolveCard(activeCardNumber)

  useEffect(() => {
    localStorage.setItem('anna-language', lang)
  }, [lang])

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
  }

  const backHome = () => {
    setPage('home')
    setTab('home')
    setResolved(false)
  }

  // 1. Initial screen: Always enter ration card number first if not verified and no card entered
  if (!verified && !pendingCard) {
    return (
      <Lookup
        t={t}
        lang={lang}
        setLang={setLang}
        isLoading={isLoading}
        lookup={lookup}
        initialCard={savedCard || 'TN-02-G-849201'}
      />
    )
  }

  // 2. Second screen: After entering ration card, verify phone/OTP
  if (!verified) {
    return (
      <PhoneVerify
        t={t}
        lang={lang}
        setLang={setLang}
        card={currentCard}
        pendingCard={pendingCard || savedCard}
        onBack={() => setPendingCard('')}
        onClear={clearCard}
        onVerified={() => {
          const cardToSave = pendingCard || savedCard || 'TN-02-G-849201'
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
      {page === 'shops' && <ShopList t={t} lang={lang} shops={allShops} card={currentCard} />}
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

function Lookup({ t, lang, setLang, isLoading, lookup, initialCard = 'TN-02-G-849201' }) {
  const [number, setNumber] = useState(initialCard)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialCard) setNumber(initialCard)
  }, [initialCard])

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

function PhoneVerify({ t, lang, setLang, card, pendingCard, onBack, onClear, onVerified }) {
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
      <Brand t={t} lang={lang} setLang={setLang} />

      <button type="button" className="back-button" onClick={onBack} title={t.changeCard}>
        <Icon name="back" size={18} />
        <span>{t.changeCard || 'Change Card'}</span>
      </button>

      {/* Selected Card Pill Banner with Clear/Change Button */}
      <div className="verify-card-badge">
        <div className="verify-card-info">
          <small>{t.cardEntered || 'Ration Card'}</small>
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
    lookup(helperNumber, true)
  }

  const userName = helper
    ? lang === 'ta' ? 'ராதா அம்மா' : lang === 'hi' ? 'राधा जी' : 'Radha ji'
    : lang === 'ta'
    ? card.name || 'காளியம்மாள்'
    : lang === 'hi'
    ? card.nameHi || card.name || 'सुनीता देवी'
    : card.nameEn || card.name || 'Kaliammal'

  return (
    <section className="page-transition">
      <div className="welcome-row">
        <div className="welcome-avatar-group">
          <CitizenAvatar card={card} isHelper={helper} size={54} />
          <div>
            <p>{t.greeting}, {userName}</p>
            <h1>{t.entitlement}</h1>
            <span className="card-location-tag">
              <Icon name="pin" size={13} /> {card.village || 'Tamil Nadu'}
            </span>
          </div>
        </div>
        <button className="saved-card" onClick={clearCard} title={t.clearCard || 'Sign out / Change Card'}>
          <span className="saved-card-label">{t.clearCard || 'Switch Card'}</span>
          <b className="saved-card-num">...{savedCard.slice(-6)}</b>
          <Icon name="close" size={12} />
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
            {status === 'denied' ? t.denied : status === 'partial' ? t.partial : t.received}
          </h2>
          <p>{t.august} 2026 · {t.quantity}</p>
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

/* ShopList with detailed stock quantities, Google Maps, and Time Slot Booking */
function ShopList({ t, lang, shops, card }) {
  const [filter, setFilter] = useState('all')
  const [bookingShop, setBookingShop] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [tokenPass, setTokenPass] = useState(null)

  const filteredShops = shops.filter((shop) => {
    if (filter === 'open') return shop.open
    if (filter === 'rice') return shop.rice
    if (filter === 'wheat') return shop.wheat
    return true
  })

  const openBooking = (shop) => {
    setBookingShop(shop)
    setSelectedSlot(shop.slots?.[0] || '09:00 AM - 10:00 AM')
  }

  const confirmSlot = () => {
    if (!bookingShop || !selectedSlot) return
    const randomToken = 'TOK-' + Math.floor(100 + Math.random() * 900)
    setTokenPass({
      id: randomToken,
      shopName: shopDisplayName(bookingShop, lang),
      shopCode: bookingShop.code,
      slot: selectedSlot,
      date: 'Today / இன்று',
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
          <p>{t.today}</p>
        </div>
      </div>

      {/* Filter Tabs */}
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
              <span>TOKEN</span>
              <b>#{tokenPass.id}</b>
            </div>
            <div className="token-meta-grid">
              <div>
                <small>Shop / கடை</small>
                <b>{tokenPass.shopName} ({tokenPass.shopCode})</b>
              </div>
              <div>
                <small>Time Slot / நேரம்</small>
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
        {filteredShops.map((shop) => (
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
        ))}
      </div>

      {/* Time Slot Booking Modal */}
      {bookingShop && (
        <div className="modal-backdrop" onClick={() => setBookingShop(null)}>
          <div className="slot-modal page-transition" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div>
                <h2>{t.bookSlot}</h2>
                <p>{shopDisplayName(bookingShop, lang)} ({bookingShop.code})</p>
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
                <b>{getMonthName(item)} 2026</b>
                <p>{getNote(item)}</p>
              </div>
              <em className={meta.cls}>
                {item.state === 'received' ? t.received : item.state === 'partial' ? t.partial : t.denied}
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

/* Beautiful Redesigned Name Correction Flow */
function Correction({ t, lang, card, finishResolution, resolved, goHome }) {
  const [name, setName] = useState(card.aadhaarName || 'காளியம்மாள் (Kaliammal)')
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

      {/* Official Correction Ledger Comparison Card */}
      <div className="correction-ledger-card">
        <div className="ledger-header">
          <Icon name="shield" size={17} />
          <b>Ration Ledger Rectification / பெயர் திருத்தம்</b>
        </div>

        {/* Current Error Record */}
        <div className="ledger-entry error-entry">
          <span className="entry-tag error-tag">{t.currentCardName}</span>
          <div className="entry-val-row">
            <del>{card.recordedName || 'காளியம்மாள் கே (Kaliamal K)'}</del>
            <span className="error-pill">Typo detected</span>
          </div>
          <small className="entry-sub">Ration Card: {card.number}</small>
        </div>

        <div className="ledger-divider">
          <span>➔</span>
        </div>

        {/* Corrected Field Input */}
        <div className="ledger-entry success-entry">
          <div className="entry-head-row">
            <span className="entry-tag success-tag">{t.correctAadhaarName}</span>
            <button
              type="button"
              className="autofill-btn"
              onClick={() => setName(card.aadhaarName || 'காளியம்மாள் (Kaliammal)')}
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

/* Real-Time Grievance Tracker with Live Stages */
function Grievance({ t, lang, reason, fastForwarded, finishResolution, resolved, goHome }) {
  const [stage, setStage] = useState(fastForwarded ? 2 : 1)
  const number =
    'AS-2608-' +
    ({ mismatch: '4182', aadhaar: '5217', stock: '6324', inactive: '7405' }[reason] || '4182')
  const why = reasons[reason] || reasons.mismatch

  const advance = () => {
    if (stage < 3) {
      setStage(stage + 1)
    } else {
      finishResolution()
    }
  }

  if (resolved) return <Success t={t} goHome={goHome} />

  const stages = [
    { title: lang === 'ta' ? 'புகார் பதிவு செய்யப்பட்டது' : 'Grievance Logged', time: '10:42 AM', done: stage >= 1 },
    { title: t.officerReview || 'Taluk Supply Officer Review', time: stage >= 2 ? 'In Review' : 'Pending', done: stage >= 2, active: stage === 2 },
    { title: t.stockDispatch || 'FPS Stock Dispatched', time: stage >= 3 ? 'Dispatched' : 'Queued', done: stage >= 3, active: stage === 3 },
    { title: t.resolution || 'Resolved & Released', time: 'Final Step', done: stage >= 4 }
  ]

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

