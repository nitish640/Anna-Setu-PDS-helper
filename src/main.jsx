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
  { code: 'ml', label: 'മലയാളം', enLabel: 'Malayalam', mark: 'അ', speechLang: 'ml-IN' },
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
    listenToEntitlement: 'Listen to Entitlement',
    quota35kg: '35 kg Quota',
    quota20kg: '20 kg Quota',
    voucherSubtext: 'AePDS Authenticated Voucher #TXN-2026',
    statutoryNormDesc: '5 kg / member statutory quota',
    rectificationTitle: 'Ration Ledger Rectification',
    grievanceRegistered: 'Grievance Registered',
    inReviewStatus: 'In Review · TSO Review',
    pendingStatus: 'Pending Review',
    dispatchedStatus: 'Dispatched · Buffer Depot',
    queuedStatus: 'Queued for Dispatch',
    finalStep: 'Final Step',
    offlineSyncSuccess: 'Offline grievances synchronized successfully!',
    entitledShort: 'Entitled',
    receivedShort: 'Received',
    shortfallBadge: 'Shortfall',
    kgUnit: 'kg',
    statusColumn: 'Status',
    arrivalSlotLabel: 'Arrival Time Slot',
    familyModalTitle: 'Registered Family Members & e-KYC',
    familySubtitle: 'NFSA Statutory Norm: 5 kg grain quota per verified member',
    familyMembersChip: 'Family Members',
    ekycVerified: 'Biometric e-KYC Active',
    ekycPending: 'e-KYC Update Required',
    officialBillTitle: 'Statutory Price & Zero-Overcharge Bill',
    subsidySavedSub: 'Official FPS Max Bill: ₹43.50 · ₹861.50 Govt Subsidy Saved',
    totalPayable: 'Maximum Statutory Amount Payable at FPS',
    totalPayableShort: 'Max to Pay',
    zeroGrainGuarantee: '₹0 Rice & Wheat Legal Guarantee',
    overchargeWarning: 'Under NFSA 2013 & PMGKAY, Rice and Wheat are strictly 100% FREE. It is illegal for the dealer to charge any packaging, handling, or transport fees. Never pay more than the official total.',
    reportOverchargeBtn: 'Report Dealer Overcharging',
    marketValue: 'Open Market Value',
    govtSubsidySaved: 'Total Govt Subsidy Saved',
    checkBill: 'Check Official Bill',
    statutoryCommodity: 'Commodity',
    statutoryRate: 'Govt Price',
    marketRate: 'Market Price',
    subsidyRate: 'Govt Subsidy',
    freeGrain: 'FREE (100% Subsidy)',
    headSelf: 'Head of Family (Self)',
    spouse: 'Spouse',
    daughter: 'Daughter',
    son: 'Son',
    ageYears: 'yrs',
    verifiedPill: 'Verified',
    actionRequiredPill: 'Action Required',
    myGrievanceTickets: 'My Grievance Tickets',
    trackLiveTicketsSub: 'Ticket #AS-2026-4182 · In Review by Supply Officer',
    activeStatus: 'Active',
    resolvedStatus: 'Resolved',
    viewStatus: 'Track',
    raiseNewTicket: '+ Raise New Grievance',
    ticketHistory: 'Official Action History',
    slaStatutory: 'Guaranteed 7-day resolution under NFSA Section 19',
    openLiveTracker: 'Open Live Tracker',
    shareTicketWa: 'Share WhatsApp Update',
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
    listenToEntitlement: 'ஒதுக்கீட்டை கேட்கவும்',
    quota35kg: '35 கிலோ ஒதுக்கீடு',
    quota20kg: '20 கிலோ ஒதுக்கீடு',
    voucherSubtext: 'அங்கீகரிக்கப்பட்ட டிஜிட்டல் ரசீது #TXN-2026',
    statutoryNormDesc: '5 கிலோ / உறுப்பினர் சட்டப்பூர்வ ஒதுக்கீடு',
    rectificationTitle: 'ரேஷன் பதிவேடு பெயர் திருத்தம்',
    grievanceRegistered: 'புகார் பதிவு செய்யப்பட்டது',
    inReviewStatus: 'ஆய்வில் உள்ளது · வட்ட வழங்கல் அலுவலர்',
    pendingStatus: 'நிலுவையில் உள்ளது',
    dispatchedStatus: 'அனுப்பப்பட்டது · கூடுதல் இருப்பு மையம்',
    queuedStatus: 'அனுப்ப வரிசையில் உள்ளது',
    finalStep: 'இறுதி தீர்வு நிலை',
    offlineSyncSuccess: 'ஆஃப்லைன் புகார்கள் வெற்றிகரமாக ஒத்திசைக்கப்பட்டன!',
    entitledShort: 'ஒதுக்கீடு',
    receivedShort: 'பெற்றது',
    shortfallBadge: 'பற்றாக்குறை',
    kgUnit: 'கிலோ',
    statusColumn: 'நிலை',
    arrivalSlotLabel: 'வருகை நேரம்',
    familyModalTitle: 'பதிவு செய்யப்பட்ட குடும்ப உறுப்பினர்கள் & இ-கேஒய்சி',
    familySubtitle: 'NFSA சட்ட விதி: சரிபார்க்கப்பட்ட உறுப்பினருக்கு 5 கிலோ தானிய ஒதுக்கீடு',
    familyMembersChip: 'குடும்ப உறுப்பினர்கள்',
    ekycVerified: 'பயோமெட்ரிக் இ-கேஒய்சி சரிபார்க்கப்பட்டது',
    ekycPending: 'இ-கேஒய்சி புதுப்பித்தல் தேவை',
    officialBillTitle: 'சட்டப்பூர்வ விலை & கட்டண சரிபார்ப்பு',
    subsidySavedSub: 'ரேஷன் கடை அதிகபட்ச கட்டணம்: ₹43.50 · ₹861.50 அரசு மானிய சேமிப்பு',
    totalPayable: 'ரேஷன் கடையில் செலுத்த வேண்டிய அதிகபட்ச தொகை',
    totalPayableShort: 'செலுத்த வேண்டியது',
    zeroGrainGuarantee: '₹0 இலவச அரிசி & கோதுமை சட்ட உத்தரவாதம்',
    overchargeWarning: 'NFSA 2013 மற்றும் PMGKAY சட்டப்படி, அரிசி மற்றும் கோதுமை 100% இலவசம். கையாளுதல் அல்லது பேக்கிங் கட்டணம் வசூலிப்பது சட்டப்படி குற்றம். அதிகாரப்பூர்வ தொகையை விட கூடுதலாக செலுத்த வேண்டாம்.',
    reportOverchargeBtn: 'கூடுதல் கட்டணம் வசூலித்தால் புகார் செய்க',
    marketValue: 'வெளிச்சந்தை மதிப்பு',
    govtSubsidySaved: 'அரசு மானிய சேமிப்பு',
    checkBill: 'அதிகாரப்பூர்வ ரசீது காண்க',
    statutoryCommodity: 'பொருள்',
    statutoryRate: 'அரசு விலை',
    marketRate: 'சந்தை விலை',
    subsidyRate: 'அரசு மானியம்',
    freeGrain: 'இலவசம் (100% மானியம்)',
    headSelf: 'குடும்பத் தலைவர்',
    spouse: 'கணவர்/மனைவி',
    daughter: 'மகள்',
    son: 'மகன்',
    ageYears: 'வயது',
    verifiedPill: 'சரிபார்க்கப்பட்டது',
    actionRequiredPill: 'நடவடிக்கை தேவை',
    myGrievanceTickets: 'என் புகார் டிக்கெட்டுகள்',
    trackLiveTicketsSub: 'டிக்கெட் #AS-2026-4182 · வட்ட அலுவலர் ஆய்வு நடக்கிறது',
    activeStatus: 'செயலில்',
    resolvedStatus: 'தீர்க்கப்பட்டது',
    viewStatus: 'கண்காணி',
    raiseNewTicket: '+ புதிய புகார் பதிவு செய்க',
    ticketHistory: 'அலுவலர் ஆய்வுக் குறிப்புகள்',
    slaStatutory: 'NFSA சட்டப்படி 7 நாட்களில் தீர்வு உத்தரவாதம்',
    openLiveTracker: 'நேரலை டிராக்கர்',
    shareTicketWa: 'வாட்ஸ்அப்பில் பகிரவும்',
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
    listenToEntitlement: 'आवंटन सुनें',
    quota35kg: '35 किग्रा कोटा',
    quota20kg: '20 किग्रा कोटा',
    voucherSubtext: 'AePDS प्रमाणित डिजिटल वाउचर #TXN-2026',
    statutoryNormDesc: '5 किग्रा / सदस्य वैधानिक कोटा',
    rectificationTitle: 'राशन कार्ड नाम सुधार',
    grievanceRegistered: 'शिकायत दर्ज की गई',
    inReviewStatus: 'समीक्षाधीन · आपूर्ति अधिकारी',
    pendingStatus: 'लंबित',
    dispatchedStatus: 'भेजा गया · बफर डिपो',
    queuedStatus: 'भेजने के लिए कतारबद्ध',
    finalStep: 'अंतिम समाधान चरण',
    offlineSyncSuccess: 'ऑफ़लाइन शिकायतें सफलतापूर्वक सिंक हो गईं!',
    entitledShort: 'हकदारी',
    receivedShort: 'प्राप्त',
    shortfallBadge: 'कमी',
    kgUnit: 'किग्रा',
    statusColumn: 'स्थिति',
    arrivalSlotLabel: 'आगमन समय स्लॉट',
    familyModalTitle: 'पंजीकृत परिवार के सदस्य एवं ई-केवाईसी',
    familySubtitle: 'NFSA वैधानिक नियम: प्रति सत्यापित सदस्य 5 किग्रा अनाज कोटा',
    familyMembersChip: 'परिवार सदस्य',
    ekycVerified: 'बायोमेट्रिक ई-केवाईसी सक्रिय',
    ekycPending: 'ई-केवाईसी अपडेट आवश्यक',
    officialBillTitle: 'वैधानिक मूल्य एवं शून्य-अतिप्रभार बिल',
    subsidySavedSub: 'राशन दुकान अधिकतम बिल: ₹43.50 · ₹861.50 सरकारी सब्सिडी बचत',
    totalPayable: 'राशन दुकान काउंटर पर देय अधिकतम राशि',
    totalPayableShort: 'देय राशि',
    zeroGrainGuarantee: '₹0 चावल एवं गेहूँ कानूनी गारंटी',
    overchargeWarning: 'NFSA 2013 और PMGKAY के तहत, चावल और गेहूँ 100% मुफ़्त हैं। डीलर द्वारा हैंडलिंग या पैकिंग शुल्क लेना दंडनीय अपराध है। आधिकारिक बिल से अधिक भुगतान न करें।',
    reportOverchargeBtn: 'अवैध वसूली की शिकायत करें',
    marketValue: 'खुले बाजार का मूल्य',
    govtSubsidySaved: 'सरकारी सब्सिडी की कुल बचत',
    checkBill: 'सरकारी बिल देखें',
    statutoryCommodity: 'खाद्यान्न',
    statutoryRate: 'सरकारी मूल्य',
    marketRate: 'बाजार मूल्य',
    subsidyRate: 'सरकारी सब्सिडी',
    freeGrain: 'मुफ़्त (100% सब्सिडी)',
    headSelf: 'परिवार का मुखिया (स्वयं)',
    spouse: 'पति/पत्नी',
    daughter: 'पुत्री',
    son: 'पुत्र',
    ageYears: 'वर्ष',
    verifiedPill: 'सत्यापित',
    actionRequiredPill: 'कार्रवाई आवश्यक',
    myGrievanceTickets: 'मेरी शिकायत टिकट',
    trackLiveTicketsSub: 'टिकट #AS-2026-4182 · आपूर्ति अधिकारी समीक्षा जारी',
    activeStatus: 'सक्रिय',
    resolvedStatus: 'हल किया गया',
    viewStatus: 'ट्रैक करें',
    raiseNewTicket: '+ नई शिकायत दर्ज करें',
    ticketHistory: 'आधिकारिक कार्रवाई इतिहास',
    slaStatutory: 'NFSA धारा 19 के तहत 7 दिनों में समाधान गारंटी',
    openLiveTracker: 'लाइव ट्रैकर खोलें',
    shareTicketWa: 'व्हाट्सएप पर साझा करें',
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
    listenToEntitlement: 'वाटप ऐका',
    quota35kg: '35 किलो कोटा',
    quota20kg: '20 किलो कोटा',
    voucherSubtext: 'AePDS प्रमाणित डिजिटल पावती #TXN-2026',
    statutoryNormDesc: '5 किलो / व्यक्ती वैधानिक कोटा',
    rectificationTitle: 'रेशन कार्ड नाव दुरुस्ती',
    grievanceRegistered: 'तक्रार नोंदवली गेली',
    inReviewStatus: 'तपासणी सुरू · पुरवठा अधिकारी',
    pendingStatus: 'प्रलंबित',
    dispatchedStatus: 'पाठवले · बफर डेपो',
    queuedStatus: 'पाठवण्यासाठी रांगेत',
    finalStep: 'अंतिम टप्पा',
    offlineSyncSuccess: 'ऑफलाइन तक्रारी यशस्वीरित्या सिंक झाल्या!',
    entitledShort: 'पात्रता',
    receivedShort: 'मिळाले',
    shortfallBadge: 'तुटवडा',
    kgUnit: 'किलो',
    statusColumn: 'स्थिती',
    arrivalSlotLabel: 'येण्याची वेळ',
    familyModalTitle: 'नोंदणीकृत कुटुंबातील सदस्य आणि ई-केवायसी',
    familySubtitle: 'NFSA वैधानिक नियम: प्रति पडताळणी सदस्य 5 किलो धान्य कोटा',
    familyMembersChip: 'कुटुंब सदस्य',
    ekycVerified: 'बायोमेट्रिक ई-केवायसी सक्रिय',
    ekycPending: 'ई-केवायसी अपडेट आवश्यक',
    officialBillTitle: 'वैधानिक दर आणि शून्य-अतिप्रभार बिल',
    subsidySavedSub: 'रास्त भाव दुकान कमाल बिल: ₹43.50 · ₹861.50 सरकारी अनुदान बचत',
    totalPayable: 'रास्त भाव दुकानात द्यावयाची कमाल रक्कम',
    totalPayableShort: 'देय रक्कम',
    zeroGrainGuarantee: '₹0 मोफत तांदूळ व गहू कायदेशीर हमी',
    overchargeWarning: 'NFSA 2013 व PMGKAY अंतर्गत तांदूळ आणि गहू 100% मोफत आहेत. हाताळणी किंवा पॅकिंग शुल्क आकारणे हा कायद्याने गुन्हा आहे. अधिकृत रकमेपेक्षा जास्त पैसे देऊ नका.',
    reportOverchargeBtn: 'जादा पैसे आकारल्यास तक्रार करा',
    marketValue: 'खुल्या बाजारातील मूल्य',
    govtSubsidySaved: 'सरकारी अनुदानाची एकूण बचत',
    checkBill: 'शासकीय बिल पहा',
    statutoryCommodity: 'वस्तू',
    statutoryRate: 'शासकीय दर',
    marketRate: 'बाजार भाव',
    subsidyRate: 'सरकारी अनुदान',
    freeGrain: 'मोफत (100% अनुदान)',
    headSelf: 'कुटुंब प्रमुख (स्वतः)',
    spouse: 'पती/पत्नी',
    daughter: 'मुलगी',
    son: 'मुलगा',
    ageYears: 'वर्षे',
    verifiedPill: 'पडताळणी झाली',
    actionRequiredPill: 'कार्रवाई आवश्यक',
    myGrievanceTickets: 'माझ्या तक्रार तिकिटे',
    trackLiveTicketsSub: 'तिकीट #AS-2026-4182 · पुरवठा अधिकारी तपासणी सुरू',
    activeStatus: 'सक्रिय',
    resolvedStatus: 'निवारण झाले',
    viewStatus: 'ट्रॅक करा',
    raiseNewTicket: '+ नवीन तक्रार नोंदवा',
    ticketHistory: 'अधिकृत कारवाई इतिहास',
    slaStatutory: 'NFSA कलम 19 अंतर्गत 7 दिवसांत निवारण हमी',
    openLiveTracker: 'लाइव्ह ट्रॅकर उघडा',
    shareTicketWa: 'व्हॉट्सॲपवर शेअर करा',
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
    listenToEntitlement: 'కోటా వివరాలు వినండి',
    quota35kg: '35 కేజీల కోటా',
    quota20kg: '20 కేజీల కోటా',
    voucherSubtext: 'AePDS ధృవీకరించిన డిజిటల్ రసీదు #TXN-2026',
    statutoryNormDesc: '5 కేజీలు / సభ్యునికి చట్టపరమైన కోటా',
    rectificationTitle: 'రేషన్ కార్డు పేరు సవరణ',
    grievanceRegistered: 'ఫిర్యాదు నమోదైంది',
    inReviewStatus: 'పరిశీలనలో ఉంది · సరఫరా అధికారి',
    pendingStatus: 'పెండింగ్‌లో ఉంది',
    dispatchedStatus: 'పంపిణీ చేయబడింది · బఫర్ డిపో',
    queuedStatus: 'పంపిణీ వరుసలో ఉంది',
    finalStep: 'తుది పరిష్కార దశ',
    offlineSyncSuccess: 'ఆఫ్‌లైన్ ఫిర్యాదులు విజయవంతంగా సమర్పించబడ్డాయి!',
    entitledShort: 'అర్హత',
    receivedShort: 'లభించినది',
    shortfallBadge: 'కొరత',
    kgUnit: 'కేజీలు',
    statusColumn: 'స్థితి',
    arrivalSlotLabel: 'రాక సమయ స్లాట్',
    familyModalTitle: 'నమోదైన కుటుంబ సభ్యులు మరియు ఈ-కేవైసీ',
    familySubtitle: 'NFSA చట్టపరమైన నిబంధన: ధృవీకరించిన ప్రతి సభ్యునికి 5 కేజీల ధాన్యాల కోటా',
    familyMembersChip: 'కుటుంబ సభ్యులు',
    ekycVerified: 'బయోమెట్రిక్ ఈ-కేవైసీ యాక్టివ్',
    ekycPending: 'ఈ-కేవైసీ అప్‌డేట్ అవసరం',
    officialBillTitle: 'చట్టబద్ధ ధర & జీరో-ఓవర్‌ఛార్జ్ బిల్లు',
    subsidySavedSub: 'రేషన్ దుకాణం గరిష్ట బిల్లు: ₹43.50 · ₹861.50 ప్రభుత్వ సబ్సిడీ ఆదా',
    totalPayable: 'రేషన్ దుకాణం కౌంటర్‌లో చెల్లించాల్సిన గరిష్ట మొత్తం',
    totalPayableShort: 'చెల్లించాల్సింది',
    zeroGrainGuarantee: '₹0 ఉచిత బియ్యం & గోధుమలు చట్టపరమైన హామీ',
    overchargeWarning: 'NFSA 2013 మరియు PMGKAY ప్రకారం, బియ్యం మరియు గోధుమలు 100% ఉచితం. డీలర్ హ్యాండ్లింగ్ లేదా ప్యాకింగ్ ఛార్జీలు వసూలు చేయడం చట్టరీత్యా నేరం. అధికారిక బిల్లు కంటే ఎక్కువ చెల్లించవద్దు.',
    reportOverchargeBtn: 'అదనపు వసూళ్లపై ఫిర్యాదు చేయండి',
    marketValue: 'బహిరంగ మార్కెట్ విలువ',
    govtSubsidySaved: 'ప్రభుత్వ సబ్సిడీ మొత్తం ఆదా',
    checkBill: 'అధికారిక బిల్లు చూడండి',
    statutoryCommodity: 'సరుకులు',
    statutoryRate: 'ప్రభుత్వ ధర',
    marketRate: 'మార్కెట్ ధర',
    subsidyRate: 'ప్రభుత్వ సబ్సిడీ',
    freeGrain: 'ఉచితం (100% సబ్సిడీ)',
    headSelf: 'కుటుంబ పెద్ద (స్వయం)',
    spouse: 'జీవిత భాగస్వామి',
    daughter: 'కుమార్తె',
    son: 'కుమారుడు',
    ageYears: 'సంవత్సరాలు',
    verifiedPill: 'ధృవీకరించబడింది',
    actionRequiredPill: 'చర్య అవసరం',
    myGrievanceTickets: 'నా ఫిర్యాదు టిక్కెట్లు',
    trackLiveTicketsSub: 'టికెట్ #AS-2026-4182 · సరఫరా అధికారి పరిశీలన జరుగుతోంది',
    activeStatus: 'యాక్టివ్',
    resolvedStatus: 'పరిష్కరించబడింది',
    viewStatus: 'ట్రాక్ చేయండి',
    raiseNewTicket: '+ కొత్త ఫిర్యాదు చేయండి',
    ticketHistory: 'అధికారిక చర్యల చరిత్ర',
    slaStatutory: 'NFSA సెక్షన్ 19 ప్రకారం 7 రోజుల్లో పరిష్కార హామీ',
    openLiveTracker: 'లైవ్ ట్రాకర్ తెరవండి',
    shareTicketWa: 'వాట్సాప్‌లో పంపండి',
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
    listenToEntitlement: 'ಕೋಟಾ ವಿವರ ಆಲಿಸಿ',
    quota35kg: '35 ಕೆಜಿ ಕೋಟಾ',
    quota20kg: '20 ಕೆಜಿ ಕೋಟಾ',
    voucherSubtext: 'AePDS ದೃಢೀಕರಿಸಿದ ಡಿಜಿಟಲ್ ರಶೀದಿ #TXN-2026',
    statutoryNormDesc: '5 ಕೆಜಿ / ಸದಸ್ಯರಿಗೆ ಶಾಸನಬದ್ಧ ಕೋಟಾ',
    rectificationTitle: 'ಪಡಿತರ ಚೀಟಿ ಹೆಸರು ತಿದ್ದುಪಡಿ',
    grievanceRegistered: 'ದೂರು ದಾಖಲಾಗಿದೆ',
    inReviewStatus: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ · ಸರಬರಾಜು ಅಧಿಕಾರಿ',
    pendingStatus: 'ಬಾಕಿ ಉಳಿದಿದೆ',
    dispatchedStatus: 'ರವಾನಿಸಲಾಗಿದೆ · ಬಫರ್ ಡಿಪೋ',
    queuedStatus: 'ರವಾನೆಗೆ ಸಾಲಿನಲ್ಲಿದೆ',
    finalStep: 'ಅಂತಿಮ ಹಂತ',
    offlineSyncSuccess: 'ಆಫ್‌ಲೈನ್ ದೂರುಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ!',
    entitledShort: 'ಅರ್ಹತೆ',
    receivedShort: 'ಸ್ವೀಕರಿಸಿದ್ದು',
    shortfallBadge: 'ಕೊರತೆ',
    kgUnit: 'ಕೆಜಿ',
    statusColumn: 'ಸ್ಥಿತಿ',
    arrivalSlotLabel: 'ಭೇಟಿ ಸಮಯ ಸ್ಲಾಟ್',
    familyModalTitle: 'ನೋಂದಾಯಿತ ಕುಟುಂಬ ಸದಸ್ಯರು ಮತ್ತು ಇ-ಕೆವೈಸಿ',
    familySubtitle: 'NFSA ಶಾಸನಬದ್ಧ ನಿಯಮ: ಪ್ರತಿ ದೃಢೀಕರಿಸಿದ ಸದಸ್ಯರಿಗೆ 5 ಕೆಜಿ ಧಾನ್ಯ ಕೋಟಾ',
    familyMembersChip: 'ಕುಟುಂಬ ಸದಸ್ಯರು',
    ekycVerified: 'ಬಯೋಮೆಟ್ರಿಕ್ ಇ-ಕೆವೈಸಿ ಸಕ್ರಿಯ',
    ekycPending: 'ಇ-ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಅಗತ್ಯವಿದೆ',
    officialBillTitle: 'ಶಾಸನಬದ್ಧ ಬೆಲೆ ಮತ್ತು ಅಧಿಕೃತ ಬಿಲ್',
    subsidySavedSub: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ ಗರಿಷ್ಠ ಬಿಲ್: ₹43.50 · ₹861.50 ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಉಳಿತಾಯ',
    totalPayable: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ಪಾವತಿಸಬೇಕಾದ ಗರಿಷ್ಠ ಮೊತ್ತ',
    totalPayableShort: 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    zeroGrainGuarantee: '₹0 ಉಚಿತ ಅಕ್ಕಿ ಮತ್ತು ಗೋಧಿ ಕಾನೂನು ಖಾತರಿ',
    overchargeWarning: 'NFSA 2013 ಮತ್ತು PMGKAY ಅಡಿಯಲ್ಲಿ ಅಕ್ಕಿ ಮತ್ತು ಗೋಧಿ 100% ಉಚಿತ. ಡೀಲರ್ ಹ್ಯಾಂಡ್ಲಿಂಗ್ ಅಥವಾ ಪ್ಯಾಕಿಂಗ್ ಶುಲ್ಕ ವಸೂಲಿ ಮಾಡುವುದು ಕಾನೂನುಬಾಹಿರ. ಅಧಿಕೃತ ಮೊತ್ತಕ್ಕಿಂತ ಹೆಚ್ಚು ಪಾವತಿಸಬೇಡಿ.',
    reportOverchargeBtn: 'ಹೆಚ್ಚುವರಿ ವಸೂಲಿ ಬಗ್ಗೆ ದೂರು ನೀಡಿ',
    marketValue: 'ಮುಕ್ತ ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯ',
    govtSubsidySaved: 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಉಳಿತಾಯ',
    checkBill: 'ಅಧಿಕೃತ ಬಿಲ್ ನೋಡಿ',
    statutoryCommodity: 'ದವಸ-ಧಾನ್ಯ',
    statutoryRate: 'ಸರ್ಕಾರಿ ಬೆಲೆ',
    marketRate: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    subsidyRate: 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ',
    freeGrain: 'ಉಚಿತ (100% ಸಬ್ಸಿಡಿ)',
    headSelf: 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥ (ಸ್ವಯಂ)',
    spouse: 'ಪತಿ/ಪತ್ನಿ',
    daughter: 'ಮಗಳು',
    son: 'ಮಗ',
    ageYears: 'ವರ್ಷ',
    verifiedPill: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    actionRequiredPill: 'ಕ್ರಮ ಅಗತ್ಯವಿದೆ',
    myGrievanceTickets: 'ನನ್ನ ದೂರು ಟಿಕೆಟ್‌ಗಳು',
    trackLiveTicketsSub: 'ಟಿಕೆಟ್ #AS-2026-4182 · ಸರಬರಾಜು ಅಧಿಕಾರಿ ಪರಿಶೀಲನೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    activeStatus: 'ಸಕ್ರಿಯ',
    resolvedStatus: 'ಬಗೆಹರಿದಿದೆ',
    viewStatus: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    raiseNewTicket: '+ ಹೊಸ ದೂರು ಸಲ್ಲಿಸಿ',
    ticketHistory: 'ಅಧಿಕೃತ ಕ್ರಮ ಇತಿಹಾಸ',
    slaStatutory: 'NFSA ಕಲಂ 19 ರ ಅಡಿಯಲ್ಲಿ 7 ದಿನಗಳಲ್ಲಿ ಪರಿಹಾರ ಖಾತರಿ',
    openLiveTracker: 'ಲೈವ್ ಟ್ರ್ಯಾಕರ್ ತೆರೆಯಿರಿ',
    shareTicketWa: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
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
    listenToEntitlement: 'വിഹിത വിവരങ്ങൾ കേൾക്കുക',
    quota35kg: '35 കിലോഗ്രാം വിഹിതം',
    quota20kg: '20 കിലോഗ്രാം വിഹിതം',
    voucherSubtext: 'AePDS സാക്ഷ്യപ്പെടുത്തിയ ഡിജിറ്റൽ രസീത് #TXN-2026',
    statutoryNormDesc: '5 കിലോഗ്രാം / അംഗത്തിന് നിയമാനുസൃത വിഹിതം',
    rectificationTitle: 'റേഷൻ കാർഡ് പേര് തിരുത്തൽ',
    grievanceRegistered: 'പരാതി രേഖപ്പെടുത്തി',
    inReviewStatus: 'പരിശോധനയിലാണ് · സപ്ലൈ ഓഫീസർ',
    pendingStatus: 'തീർപ്പുകൽപ്പിച്ചിട്ടില്ല',
    dispatchedStatus: 'അയച്ചു · ബഫർ ഡിപ്പോ',
    queuedStatus: 'അയക്കുന്നതിനുള്ള നിരയിൽ',
    finalStep: 'അവസാന ഘട്ടം',
    offlineSyncSuccess: 'ഓഫ്‌ലൈൻ പരാതികൾ വിജയകരമായി സമർപ്പിച്ചു!',
    entitledShort: 'അർഹത',
    receivedShort: 'ലഭിച്ചത്',
    shortfallBadge: 'കുറവ്',
    kgUnit: 'കിലോഗ്രാം',
    statusColumn: 'നില',
    arrivalSlotLabel: 'സന്ദർശന സമയ സ്ലോട്ട്',
    familyModalTitle: 'രജിസ്റ്റർ ചെയ്ത കുടുംബാംഗങ്ങളും ഇ-കെവൈസിയും',
    familySubtitle: 'NFSA നിയമപരമായ വ്യവസ്ഥ: പരിശോധിച്ച ഓരോ അംഗത്തിനും 5 കിലോഗ്രാം ധാന്യ വിഹിതം',
    familyMembersChip: 'കുടുംബാംഗങ്ങൾ',
    ekycVerified: 'ബയോമെട്രിക് ഇ-കെവൈസി സജീവം',
    ekycPending: 'ഇ-കെവൈസി പുതുക്കൽ ആവശ്യമാണ്',
    officialBillTitle: 'നിയമാനുസൃത വിലയും ഔദ്യോഗിക ബില്ലും',
    subsidySavedSub: 'റേഷൻ കട പരമാവധി ബിൽ: ₹43.50 · ₹861.50 സർക്കാർ സബ്‌സിഡി ലാഭം',
    totalPayable: 'റേഷൻ കടയിൽ അടയ്‌ക്കേണ്ട പരമാവധി തുക',
    totalPayableShort: 'നൽകേണ്ട തുക',
    zeroGrainGuarantee: '₹0 സൗജന്യ അരിയും ഗോതമ്പും നിയമപരമായ ഉറപ്പ്',
    overchargeWarning: 'NFSA 2013, PMGKAY പ്രകാരം അരിയും ഗോതമ്പും 100% സൗജന്യമാണ്. ഡീലർമാർ അധിക ഫീസ് ഈടാക്കുന്നത് ശിക്ഷാർഹമായ കുറ്റമാണ്. ഔദ്യോഗിക തുകയിൽ കൂടുതൽ നൽകരുത്.',
    reportOverchargeBtn: 'അധിക നിരക്ക് ഈടാക്കിയാൽ പരാതിപ്പെടുക',
    marketValue: 'തുറന്ന വിപണി വില',
    govtSubsidySaved: 'സർക്കാർ സബ്‌സിഡി ആകെ ലാഭം',
    checkBill: 'ഔദ്യോഗിക ബിൽ കാണുക',
    statutoryCommodity: 'ധാന്യം',
    statutoryRate: 'സർക്കാർ വില',
    marketRate: 'വിപണി വില',
    subsidyRate: 'സർക്കാർ സബ്‌സിഡി',
    freeGrain: 'സൗജന്യം (100% സബ്‌സിഡി)',
    headSelf: 'കുടുംബനാഥ (സ്വയം)',
    spouse: 'ഭർത്താവ്/ഭാര്യ',
    daughter: 'മകൾ',
    son: 'മകൻ',
    ageYears: 'വയസ്സ്',
    verifiedPill: 'പരിശോധിച്ചു',
    actionRequiredPill: 'നടപടി ആവശ്യമാണ്',
    myGrievanceTickets: 'എന്റെ പരാതി ടിക്കറ്റുകൾ',
    trackLiveTicketsSub: 'ടിക്കറ്റ് #AS-2026-4182 · സപ്ലൈ ഓഫീസർ പരിശോധന പുരോഗമിക്കുന്നു',
    activeStatus: 'സജീവം',
    resolvedStatus: 'പരിഹരിച്ചു',
    viewStatus: 'ട്രാക്ക് ചെയ്യുക',
    raiseNewTicket: '+ പുതിയ പരാതി നൽകുക',
    ticketHistory: 'ഔദ്യോഗിക നടപടിക്രമം',
    slaStatutory: 'NFSA സെക്ഷൻ 19 പ്രകാരം 7 ദിവസത്തിനകം പരിഹാര ഉറപ്പ്',
    openLiveTracker: 'ലൈവ് ട്രാക്കർ തുറക്കുക',
    shareTicketWa: 'വാട്‌സ്ആപ്പിൽ പങ്കിടുക',
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
const monthMap = {
  August: { en: 'August', ta: 'ஆகஸ்ட்', hi: 'अगस्त', mr: 'ऑगस्ट', te: 'ఆగస్టు', kn: 'ಆಗಸ್ಟ್', ml: 'ഓഗസ്റ്റ്' },
  July: { en: 'July', ta: 'ஜூலை', hi: 'जुलाई', mr: 'जुलै', te: 'జూలై', kn: 'ಜುಲೈ', ml: 'ജൂലൈ' },
  June: { en: 'June', ta: 'ஜூன்', hi: 'जून', mr: 'जून', te: 'జూన్', kn: 'ಜೂನ್', ml: 'ജൂൺ' },
  May: { en: 'May', ta: 'மே', hi: 'मई', mr: 'मे', te: 'మే', kn: 'ಮೇ', ml: 'മേയ്' },
  April: { en: 'April', ta: 'ஏப்ரல்', hi: 'अप्रैल', mr: 'एप्रिल', te: 'ఏప్రిల్', kn: 'ಏಪ್ರಿಲ್', ml: 'ഏപ്രിൽ' },
  March: { en: 'March', ta: 'மார்ச்', hi: 'मार्च', mr: 'मार्च', te: 'మార్చి', kn: 'ಮಾರ್ಚ್', ml: 'മാർച്ച്' }
}

const noteMap = {
  mismatch: {
    en: 'Paused due to name mismatch',
    ta: 'பெயர் முரண்பாடு காரணமாக ரேஷன் நிறுத்தப்பட்டது',
    hi: 'नाम में अंतर के कारण रुका',
    mr: 'नावात तफावत असल्याने स्थगित',
    te: 'పేరు వ్యత్యాసం వల్ల రేషన్ నిలిపివేయబడింది',
    kn: 'ಹೆಸರು ಹೊಂದಾಣಿಕೆಯಾಗದ ಕಾರಣ ಸ್ಥಗಿತಗೊಂಡಿದೆ',
    ml: 'പേര് പൊരുത്തക്കേട് കാരണം റേഷൻ തടസ്സപ്പെട്ടു'
  },
  aadhaar: {
    en: 'Identity not linked',
    ta: 'ஆதார் அடையாளம் இணைக்கப்படவில்லை',
    hi: 'आधार लिंक नहीं',
    mr: 'आधार लिंक नाही',
    te: 'ఆధార్ గుర్తింపు లింక్ కాలేదు',
    kn: 'ಆಧಾರ್ ಗುರುತು ಲಿಂಕ್ ಆಗಿಲ್ಲ',
    ml: 'ആധാർ ലിങ്ക് ചെയ്തിട്ടില്ല'
  },
  shortfall: {
    en: 'Wheat unavailable — only rice received',
    ta: 'கோதுமை இருப்பு தீர்ந்ததால் அரிசி மட்டும்',
    hi: 'गेहूं अनुपलब्ध — केवल चावल मिला',
    mr: 'गहू उपलब्ध नाही — फक्त तांदूळ मिळाले',
    te: 'గోధుమల కొరత — బియ్యం మాత్రమే అందింది',
    kn: 'ಗೋಧಿ ಲಭ್ಯವಿಲ್ಲ — ಅಕ್ಕಿ ಮಾತ್ರ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    ml: 'ഗോതമ്പ് ലഭ്യമല്ല — അരി മാത്രം ലഭിച്ചു'
  },
  success: {
    en: 'Full quota disbursed',
    ta: 'முழு ஒதுக்கீடு வழங்கப்பட்டது',
    hi: 'पूरा कोटा वितरित',
    mr: 'पूर्ण कोटा वितरित',
    te: 'పూర్తి కోటా పంపిణీ చేయబడింది',
    kn: 'ಪೂರ್ಣ ಕೋಟಾ ವಿತರಿಸಲಾಗಿದೆ',
    ml: 'പൂർണ്ണ വിഹിതം വിതരണം ചെയ്തു'
  }
}

const stateNames = {
  tn: { en: 'Tamil Nadu', ta: 'தமிழ்நாடு', te: 'తమిళనాడు', kn: 'ತಮಿಳುನಾಡು', ml: 'തമിഴ്നാട്', hi: 'तमिलनाडु', mr: 'तमिळनाडू' },
  mh: { en: 'Maharashtra', ta: 'மகாராஷ்டிரா', te: 'మహారాష్ట్ర', kn: 'ಮಹಾರಾಷ್ಟ್ರ', ml: 'മഹാരാഷ്ട്ര', hi: 'महाराष्ट्र', mr: 'महाराष्ट्र' },
  ap: { en: 'Andhra Pradesh', ta: 'ஆந்திரப் பிரதேசம்', te: 'ఆంధ్రప్రదేశ్', kn: 'ಆಂಧ್ರಪ್ರದೇಶ', ml: 'ആന്ധ്രാಪ್ರദേശ്', hi: 'आंध्र प्रदेश', mr: 'आंध्र प्रदेश' },
  ka: { en: 'Karnataka', ta: 'கர்நாடகா', te: 'కర్ణాటక', kn: 'ಕರ್ನಾಟಕ', ml: 'ಕರ್ನಾಟಕ', hi: 'कर्नाटक', mr: 'कर्नाटक' },
  kl: { en: 'Kerala', ta: 'கேரளா', te: 'కేరళ', kn: 'ಕೇರಳ', ml: 'കേരളം', hi: 'केरल', mr: 'केरळ' },
  ts: { en: 'Telangana', ta: 'தெலுங்கானா', te: 'తెలంగాణ', kn: 'ತೆಲಂಗಾಣ', ml: 'തെലങ്കാന', hi: 'तेलंगाना', mr: 'तेलंगणा' },
  up: { en: 'Uttar Pradesh', ta: 'உத்தரப் பிரதேசம்', te: 'ఉత్తరప్రదేశ్', kn: 'ಉತ್ತರ ಪ್ರದೇಶ', ml: 'ഉത്തർപ്രദേശ്', hi: 'उत्तर प्रदेश', mr: 'उत्तर प्रदेश' }
}

const statePortalNames = {
  mh: {
    en: 'Maharashtra AePDS',
    mr: 'महाराष्ट्र AePDS',
    hi: 'महाराष्ट्र AePDS',
    ta: 'மகாராஷ்டிரா AePDS',
    te: 'మహారాష్ట్ర AePDS',
    kn: 'ಮಹಾರಾಷ್ಟ್ರ AePDS',
    ml: 'മഹാരാഷ്ട്ര AePDS'
  },
  tn: {
    en: 'Tamil Nadu TNPDS',
    ta: 'தமிழ்நாடு TNPDS',
    hi: 'तमिलनाडु TNPDS',
    mr: 'तमिळनाडू TNPDS',
    te: 'తమిళనాడు TNPDS',
    kn: 'ತಮಿಳುನಾಡು TNPDS',
    ml: 'തമിഴ്നാട് TNPDS'
  }
}


const guideQA = {
  welcome: {
    en: 'Hello! I am your Anna Setu app assistant. I can guide you on how to check your quota, book time slots, and track grievance resolutions in this app. How can I help?',
    ta: 'வணக்கம்! நான் அன்ன சேது செயலி உதவி வழிகாட்டி. இந்த செயலியை நீங்கள் எப்படி பயன்படுத்துவது என்று விளக்க முடியும். என்ன தகவல் தேவை?',
    hi: 'नमस्ते! मैं अन्न सेतु ऐप गाइड हूँ। मैं इस ऐप में कोटा देखने, समय स्लॉट बुक करने और शिकायत ट्रैक करने में सहायता कर सकता हूँ।',
    mr: 'नमस्कार! मी अन्न सेतू ॲप मार्गदर्शक आहे. या ॲपमध्ये कोटा तपासणे, वेळ स्लॉट बुक करणे आणि तक्रार निवारण ट्रॅक करण्यात मी मदत करू शकतो.',
    te: 'నమస్కారం! నేను మీ అన్న సేతు సహాయకుడిని. ఈ యాప్‌లో కోటా తనిఖీ, సమయ స్లాట్ బుకింగ్ మరియు సమస్యల పరిష్కారం ట్రాక్ చేయడంలో మీకు సహాయపడగలను.',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅನ್ನ ಸೇತು ಅಪ್ಲಿಕೇಶನ್ ಮಾರ್ಗದರ್ಶಿ. ಈ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ಕೋಟಾ ಪರಿಶೀಲಿಸುವುದು, ಸಮಯ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡುವುದು ಮತ್ತು ದೂರು ಪರಿಹಾರವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.',
    ml: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ അന്ന സേതു ആപ്പ് സഹായിയാണ്. ഈ ആപ്പിൽ റേഷൻ ക്വാട്ട പരിശോധിക്കാനും സമയ സ്ലോട്ട് ബുക്ക് ചെയ്യാനും പരാതികൾ ട്രാക്ക് ചെയ്യാനും സഹായിക്കാം.'
  },
  questions: [
    {
      q: {
        en: 'How to book a time slot token?',
        ta: 'டோக்கன் எப்படி முன்பதிவு செய்வது?',
        hi: 'समय स्लॉट टोकन कैसे बुक करें?',
        mr: 'वेळ स्लॉट टोकन कसे बुक करावे?',
        te: 'సమయ స్లాట్ టోకెన్ ఎలా బుక్ చేసుకోవాలి?',
        kn: 'ಸಮಯ ಸ್ಲಾಟ್ ಟೋಕನ್ ಬುಕ್ ಮಾಡುವುದು ಹೇಗೆ?',
        ml: 'സമയ സ്ലോട്ട് ടോക്കൺ എങ്ങനെ ബുക്ക് ചെയ്യാം?'
      },
      a: {
        en: 'Go to the Shops tab, select your Fair Price Shop, tap "Book Time Slot", pick your arrival hour, and confirm to get a digital priority token pass to skip the counter line.',
        ta: 'நியாய கடைகள் (Shops) பகுதிக்கு சென்று, உங்கள் கடையின் கீழ் உள்ள "நேரம் முன்பதிவு" பட்டனை தட்டி விரும்பிய நேரத்தை தேர்வுசெய்து டோக்கன் பெறலாம்.',
        hi: 'दुकानें (Shops) टैब में जाएं, अपनी राशन दुकान चुनें, "समय स्लॉट बुक करें" दबाएं, और लाइन से बचने के लिए डिजिटल टोकन प्राप्त करें।',
        mr: 'दुकान टॅबवर जा, तुमचे रास्त भाव दुकान निवडा, "वेळ स्लॉट बुक करा" टॅप करा आणि रांग टाळण्यासाठी डिजिटल टोकन मिळवा.',
        te: 'షాప్స్ (Shops) ట్యాబ్‌కి వెళ్లి, మీ చౌకధరల దుకాణాన్ని ఎంచుకోండి, "సమయ స్లాట్ బుక్ చేయండి" నొక్కి, క్యూ నివారించడానికి డిజిటల్ టోకెన్ పొందండి.',
        kn: 'ಅಂಗಡಿಗಳು (Shops) ಟ್ಯಾಬ್‌ಗೆ ಹೋಗಿ, ನಿಮ್ಮ ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಯನ್ನು ಆರಿಸಿ, "ಸಮಯ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ ಡಿಜಿಟಲ್ ಟೋಕನ್ ಪಡೆಯಿರಿ.',
        ml: 'ഷോപ്പുകൾ (Shops) ടാബിൽ പോയി നിങ്ങളുടെ റേഷൻ കട തിരഞ്ഞെടുക്കുക, "സമയം ബുക്ക് ചെയ്യുക" ക്ലിക്ക് ചെയ്ത് ക്യൂ ഒഴിവാക്കാൻ ഡിജിറ്റൽ ടೋക്കൺ നേടുക.'
      }
    },
    {
      q: {
        en: 'What to do if grain is out of stock?',
        ta: 'ரேஷன் கிடைக்கவில்லை என்றால் என்ன செய்வது?',
        hi: 'अनाज उपलब्ध न होने पर क्या करें?',
        mr: 'धान्य उपलब्ध नसल्यास काय करावे?',
        te: 'ధాన్యాల స్టాక్ లేకపోతే ఏమి చేయాలి?',
        kn: 'ಧಾನ್ಯದ ದಾಸ್ತಾನು ಇಲ್ಲದಿದ್ದರೆ ಏನು ಮಾಡಬೇಕು?',
        ml: 'ധാന്യങ്ങൾ സ്റ്റോക്കില്ലെങ്കിൽ എന്ത് ചെയ്യണം?'
      },
      a: {
        en: 'You can raise a grievance from Home or History. Under Section 19 of NFSA 2013, supply officers are legally required to resolve FPS stock deficits within 7 working days.',
        ta: 'முகப்பில் அல்லது வரலாற்றில் "புகார் தயாராக உள்ளது" என்பதை தட்டி புகார் பதிவு செய்யலாம். NFSA சட்டப்படி 7 நாட்களில் அதிகாரிகள் தீர்வு காண்பார்கள்.',
        hi: 'होम या इतिहास से शिकायत दर्ज करें। NFSA 2013 की धारा 19 के तहत आपूर्ति अधिकारी 7 दिनों के भीतर समाधान करने के लिए बाध्य हैं।',
        mr: 'होम किंवा इतिहास पर्यायातून तक्रार नोंदवा. NFSA कायद्यानुसार 7 दिवसांत अधिकारी समस्येचे निवारण करतील.',
        te: 'హోమ్ లేదా హిస్టరీ నుండి ఫిర్యాదు చేయవచ్చు. NFSA చట్టం ప్రకారం 7 పనిదినాల్లో అధికారులు సమస్యను పరిష్కరించాల్సి ఉంటుంది.',
        kn: 'ಮುಖಪುಟ ಅಥವಾ ಇತಿಹಾಸದಿಂದ ದೂರು ಸಲ್ಲಿಸಿ. NFSA ಕಾಯ್ದೆಯಡಿ ಸರಬರಾಜು ಅಧಿಕಾರಿಗಳು 7 ದಿನಗಳಲ್ಲಿ ಪರಿಹರಿಸಲು ಬದ್ಧರಾಗಿದ್ದಾರೆ.',
        ml: 'ഹോം അല്ലെങ്കിൽ ഹിസ്റ്ററിയിൽ നിന്ന് പരാതി നൽകുക. NFSA നിയമപ്രകാരം 7 പ്രവൃത്തിദിനങ്ങൾക്കകം ഉദ്യോഗസ്ഥർ പരിഹാരം കാണും.'
      }
    },
    {
      q: {
        en: 'Does offline mode work?',
        ta: 'இணையம் இல்லாமல் பயன்படுத்த முடியுமா?',
        hi: 'क्या ऑफ़लाइन मोड काम करता है?',
        mr: 'ऑफलाइन मोड काम करतो का?',
        te: 'ఆఫ్‌లైన్ మోడ్ పని చేస్తుందా?',
        kn: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಕೆಲಸ ಮಾಡುತ್ತದೆಯೇ?',
        ml: 'ഓഫ്‌ലൈൻ മോഡ് പ്രവർത്തിക്കുമോ?'
      },
      a: {
        en: 'Yes! Your ration card records and shop data are safely cached on your phone. If you file a grievance offline, it is stored locally and will automatically submit once internet is restored.',
        ta: 'ஆம்! உங்கள் அட்டை விவரங்கள் உங்கள் போனில் பாதுகாப்பாக இருக்கும். இணையம் வந்ததும் தானாக சமர்ப்பிக்கப்படும்.',
        hi: 'हाँ! आपके राशन कार्ड का विवरण आपके फोन में सुरक्षित है। ऑफ़लाइन दर्ज की गई शिकायत इंटरनेट आने पर स्वतः जमा हो जाएगी।',
        mr: 'होय! तुमचे रेशन कार्ड तपशील फोनवर सुरक्षित आहेत. इंटरनेट सुरू झाल्यावर ऑफलाइन तक्रार आपोआप सबमिट होईल.',
        te: 'అవును! మీ రేషన్ కార్డ్ వివరాలు మీ ఫోన్‌లో భద్రంగా ఉంటాయి. ఇంటర్నెట్ రాగానే ఆఫ్‌లైన్ ఫిర్యాదు ఆటోమేటిక్‌గా సమర్పించబడుతుంది.',
        kn: 'ಹೌದು! ನಿಮ್ಮ ರೇಷನ್ ಕಾರ್ಡ್ ವಿವರಗಳು ಫೋನ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿವೆ. ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಬಂದ ತಕ್ಷಣ ಆಫ್‌ಲೈನ್ ದೂರು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಲ್ಲಿಕೆಯಾಗುತ್ತದೆ.',
        ml: 'അതെ! നിങ്ങളുടെ റേഷൻ കാർഡ് വിവരങ്ങൾ ഫോണിൽ സുരക്ഷിതമാണ്. ഇന്റർനെറ്റ് ലഭിക്കുമ്പോൾ ഓഫ്‌ലൈൻ പരാതികൾ സ്വയം സമർപ്പിക്കപ്പെടും.'
      }
    },
    {
      q: {
        en: 'My card was cancelled, can you fix it?',
        ta: 'என் கார்டு ரத்து செய்யப்பட்டுவிட்டது, தீர்வு என்ன?',
        hi: 'मेरा कार्ड रद्द हो गया है, क्या समाधान है?',
        mr: 'माझे कार्ड रद्द झाले आहे, काय करावे?',
        te: 'నా కార్డ్ రద్దు చేయబడింది, దీనికి పరిష్కారం ఏమిటి?',
        kn: 'ನನ್ನ ಕಾರ್ಡ್ ರದ್ದುಗೊಂಡಿದೆ, ಇದಕ್ಕೆ ಪರಿಹಾರವೇನು?',
        ml: 'എന്റെ കാർഡ് റദ്ദാക്കി, എന്താണ് പരിഹാരം?'
      },
      a: {
        en: 'Anna Setu is an informational citizen assistant only and cannot make legal or official administrative rulings. For card cancellations or appeals, please call the National Food Security Helpline at 1967 (Toll-free) or visit your Taluk Supply Office.',
        ta: 'அன்ன சேது ஒரு உதவி செயலி மட்டுமே. அட்டை ரத்து அல்லது சட்ட தகராறுகளுக்கு 1967 என்ற இலவச உதவி எண்ணை அழைக்கவும் அல்லது தாலுகா அலுவலகத்தை அணுகவும்.',
        hi: 'अन्न सेतु केवल एक सहायक ऐप है। कार्ड रद्द होने या कानूनी मामलों के लिए टोल-फ्री 1967 पर कॉल करें या तहसील आपूर्ति कार्यालय जाएं।',
        mr: 'अन्न सेतू हे केवळ माहिती सहाय्यक ॲप आहे. कार्ड रद्द किंवा कायदेशीर बाबींसाठी 1967 या विनामूल्य क्रमांकावर संपर्क साधा.',
        te: 'అన్న సేతు కేవలం సమాచార సహాయ యాప్ మాత్రమే. కార్డ్ రద్దు లేదా వివాదాల కోసం టోల్-ఫ్రీ 1967 నంబర్‌ను సంప్రదించండి లేదా తాలూకా కార్యాలయాన్ని సంప్రదించండి.',
        kn: 'ಅನ್ನ ಸೇತು ಕೇವಲ ಮಾಹಿತಿ ನೀಡುವ ಅಪ್ಲಿಕೇಶನ್ ಆಗಿದೆ. ಕಾರ್ಡ್ ರದ್ದತಿಗಾಗಿ ಟೋಲ್-ಫ್ರೀ 1967 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ತಾಲೂಕು ಸರಬರಾಜು ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.',
        ml: 'അന്ന സേതു ഒരു സഹായ ആപ്പ് മാത്രമാണ്. കാർഡ് റദ്ദാക്കൽ അല്ലെങ്കിൽ നിയമപ്രശ്നങ്ങൾക്കായി ടോൾ-ഫ്രീ 1967 നമ്പറിലോ താലൂക്ക് സപ്ലൈ ഓഫീസിലോ ബന്ധപ്പെടുക.'
      }
    }
  ],
  legalDisclaimer: {
    en: 'Anna Setu cannot provide legal advice or alter official administrative card decisions. For official appeals, please contact the National Food Security Helpline at 1967.',
    ta: 'அன்ன சேது செயலி அட்டை ரத்து அல்லது சட்ட விவகாரங்களை நேரடியாக தீர்க்க முடியாது. அதிகாரப்பூர்வ விசாரணைக்கு தயவுசெய்து 1967 என்ற இலவச உதவி எண்ணை அழைக்கவும்.',
    hi: 'अन्न सेतु कानूनी सलाह या आधिकारिक निर्णय बदलने में असमर्थ है। आधिकारिक अपील के लिए कृपया राष्ट्रीय खाद्य सुरक्षा हेल्पलाइन 1967 पर संपर्क करें।',
    mr: 'अन्न सेतू कायदेशीर सल्ला देऊ शकत नाही. अधिकृत अपीलसाठी कृपया राष्ट्रीय अन्न सुरक्षा हेल्पलाइन 1967 वर संपर्क साधा.',
    te: 'అన్న సేతు చట్టపరమైన సలహాలు ఇవ్వలేదు లేదా అధికారిక నిర్ణయాలను మార్చలేదు. అధికారిక అప్పీల్ కోసం దయచేసి జాతీయ ఆహార భద్రత హెల్ప్‌లైన్ 1967 ను సంప్రదించండి.',
    kn: 'ಅನ್ನ ಸೇತು ಕಾನೂನು ಸಲಹೆ ನೀಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಅಧಿಕೃತ ಮೇಲ್ಮನವಿಗಾಗಿ ದಯವಿಟ್ಟು ರಾಷ್ಟ್ರೀಯ ಆಹಾರ ಭದ್ರತಾ ಸಹಾಯವಾಣಿ 1967 ಗೆ ಸಂಪರ್ಕಿಸಿ.',
    ml: 'അന്ന സേതുവിന് നിയമോപദേശം നൽകാനോ ഭരണപരമായ തീരുമാനങ്ങൾ മാറ്റാനോ കഴിയില്ല. ഔദ്യോഗിക അപ്പീലിനായി ദയവായി ദേശീയ ഭക്ഷ്യ സുരക്ഷാ ഹെൽപ്പ്‌ലൈൻ 1967-ൽ ബന്ധപ്പെടുക.'
  },
  defaultReply: {
    en: 'Anna Setu helps you check daily grain stock, reserve queue-free tokens, and track grievance resolution. For unresolved personal issues, call 1967.',
    ta: 'இந்த செயலியில் நீங்கள் ரேஷன் இருப்பு பார்க்கலாம், டோக்கன் முன்பதிவு செய்யலாம். சந்தேகம் இருந்தால் 1967 எண்ணை அழைக்கலாம்.',
    hi: 'अन्न सेतु आपको राशन स्टॉक देखने, टोकन बुक करने और शिकायत ट्रैक करने में मदद करता है। अधिक सहायता के लिए 1967 पर कॉल करें।',
    mr: 'अन्न सेतू तुम्हाला रेशन स्टॉक तपासणे, टोकन बुक करणे आणि तक्रार ट्रॅक करण्यात मदत करते. अधिक माहितीसाठी 1967 वर कॉल करा.',
    te: 'ఈ యాప్‌లో మీరు రేషన్ స్టాక్ చూడవచ్చు, టోకెన్ బుక్ చేయవచ్చు మరియు సమస్యలను ట్రాక్ చేయవచ్చు. ఇతర సహాయం కోసం 1967 కు కాల్ చేయండి.',
    kn: 'ಈ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ನೀವು ಪಡಿತರ ದಾಸ್ತಾನು ನೋಡಬಹುದು, ಟೋಕನ್ ಬುಕ್ ಮಾಡಬಹುದು ಮತ್ತು ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು. ಹೆಚ್ಚಿನ ಸಹಾಯಕ್ಕಾಗಿ 1967 ಗೆ ಕರೆ ಮಾಡಿ.',
    ml: 'ഈ ആപ്പിൽ നിങ്ങൾക്ക് റേഷൻ സ്റ്റോക്ക് പരിശോധിക്കാം, ടോക്കൺ ബുക്ക് ചെയ്യാം, പരാതികൾ ട്രാക്ക് ചെയ്യാം. കൂടുതൽ സഹായത്തിനായി 1967-ൽ വിളിക്കുക.'
  }
}

const govReceiptNames = {
  mh: {
    en: { state: 'Govt of Maharashtra', dept: 'Dept of Food, Civil Supplies & Consumer Protection' },
    mr: { state: 'महाराष्ट्र शासन', dept: 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग' },
    hi: { state: 'महाराष्ट्र सरकार', dept: 'खाद्य एवं नागरिक आपूर्ति विभाग' },
    ta: { state: 'மகாராஷ்டிரா அரசு', dept: 'உணவு மற்றும் நுகர்வோர் பாதுகாப்புத் துறை' },
    te: { state: 'మహారాష్ట్ర ప్రభుత్వం', dept: 'పౌర సరఫరాలు మరియు వినియోగదారుల రక్షణ శాఖ' },
    kn: { state: 'ಮಹಾರಾಷ್ಟ್ರ ಸರ್ಕಾರ', dept: 'ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ಇಲಾಖೆ' },
    ml: { state: 'മഹാരാഷ്ട്ര സർക്കാർ', dept: 'സിവിൽ സപ്ലൈസ് വകുപ്പ്' }
  },
  tn: {
    en: { state: 'Govt of Tamil Nadu', dept: 'Civil Supplies and Consumer Protection Dept' },
    ta: { state: 'தமிழ்நாடு அரசு', dept: 'உணவு மற்றும் நுகர்வோர் பாதுகாப்புத் துறை' },
    hi: { state: 'तमिलनाडु सरकार', dept: 'खाद्य एवं नागरिक आपूर्ति विभाग' },
    mr: { state: 'तमिळनाडू शासन', dept: 'अन्न व नागरी पुरवठा विभाग' },
    te: { state: 'తమిళనాడు ప్రభుత్వం', dept: 'పౌర సరఫరాలు మరియు వినియోగదారుల రక్షణ శాఖ' },
    kn: { state: 'ತಮಿಳುನಾಡು ಸರ್ಕಾರ', dept: 'ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ಇಲಾಖೆ' },
    ml: { state: 'തമിഴ്നാട് സർക്കാർ', dept: 'സിവിൽ സപ്ലൈസ് വകുപ്പ്' }
  }
}

function getLocalizedName(card, lang) {
  if (!card) return ''
  if (lang === 'en') return card.nameEn || 'Beneficiary'
  if (lang === 'te') return card.nameTe || card.nameEn || 'లబ్ధిదారు'
  if (lang === 'kn') return card.nameKn || card.nameEn || 'ಫಲಾನುಭವಿ'
  if (lang === 'ml') return card.nameMl || card.nameEn || 'ഗുണഭോക്താവ്'
  if (lang === 'hi') return card.nameHi || card.nameEn || 'लाभार्थी'
  if (lang === 'mr') return card.nameMr || card.nameHi || card.nameEn || 'लाभार्थी'
  if (lang === 'ta') return card.nameTa || card.name || card.nameEn
  return card.nameEn || 'Beneficiary'
}

function getLocalizedVillage(card, lang) {
  if (!card) return ''
  if (lang === 'en') return card.villageEn || ''
  if (lang === 'te') return card.villageTe || card.villageEn || ''
  if (lang === 'kn') return card.villageKn || card.villageEn || ''
  if (lang === 'ml') return card.villageMl || card.villageEn || ''
  if (lang === 'hi') return card.villageHi || card.villageEn || ''
  if (lang === 'mr') return card.villageMr || card.villageHi || card.villageEn || ''
  if (lang === 'ta') return card.villageTa || card.village || card.villageEn
  return card.villageEn || ''
}

function getLocalizedCategory(card, lang) {
  if (!card) return ''
  if (lang === 'en') return card.categoryDesc || (card.category === 'AAY' ? 'Antyodaya Anna Yojana (AAY)' : 'Priority Household (PHH)')
  if (lang === 'te') return card.categoryDescTe || (card.category === 'AAY' ? 'అంత్యోదయ అన్న యోజన (AAY)' : 'ప్రాధాన్యతా కుటుంబం (PHH)')
  if (lang === 'kn') return card.categoryDescKn || (card.category === 'AAY' ? 'ಅಂತ್ಯೋದಯ ಅನ್ನ ಯೋಜನೆ (AAY)' : 'ಆದ್ಯತಾ ಕುಟುಂಬ (PHH)')
  if (lang === 'ml') return card.categoryDescMl || (card.category === 'AAY' ? 'അന്ത്യോദയ അന്ന യോജന (AAY)' : 'മുൻഗണനാ കുടുംബം (PHH)')
  if (lang === 'hi') return card.categoryDescHi || (card.category === 'AAY' ? 'अंत्योदय अन्न योजना (AAY)' : 'प्राथमिकता परिवार (PHH)')
  if (lang === 'mr') return card.categoryDescMr || (card.category === 'AAY' ? 'अंत्योदय अन्न योजना (AAY)' : 'प्राधान्य कुटुंब (PHH)')
  if (lang === 'ta') return card.categoryDescTa || card.categoryDesc
  return card.categoryDesc || card.category
}

function getLocalizedMonth(item, lang) {
  if (!item) return ''
  const enKey = item.monthEn || (item.month === 'ஆகஸ்ட்' ? 'August' : item.month === 'ஜூலை' ? 'July' : item.month === 'ஜூன்' ? 'June' : item.month === 'மே' ? 'May' : item.month === 'ஏப்ரல்' ? 'April' : item.month === 'மார்ச்' ? 'March' : item.month)
  if (monthMap[enKey] && monthMap[enKey][lang]) {
    return monthMap[enKey][lang]
  }
  if (lang === 'en') return item.monthEn || 'Month'
  if (lang === 'te') return item.monthTe || item.monthEn || 'నెల'
  if (lang === 'kn') return item.monthKn || item.monthEn || 'ತಿಂಗಳು'
  if (lang === 'ml') return item.monthMl || item.monthEn || 'മാസം'
  if (lang === 'hi') return item.monthHi || item.monthEn || 'माह'
  if (lang === 'mr') return item.monthMr || item.monthHi || item.monthEn || 'महिना'
  if (lang === 'ta') return item.month || item.monthEn
  return item.monthEn || item.month
}

function getLocalizedNote(item, lang) {
  if (!item) return ''
  if (item.state === 'denied') {
    if (item.receiptId?.includes('HOLD-2026-08') || (item.noteEn && item.noteEn.toLowerCase().includes('mismatch'))) {
      return noteMap.mismatch[lang] || item.noteEn || 'Paused'
    }
    return noteMap.aadhaar[lang] || item.noteEn || 'Biometric verification required'
  }
  if (item.state === 'partial') {
    return noteMap.shortfall[lang] || item.noteEn || 'Partial quota'
  }
  if (item.state === 'received') {
    return noteMap.success[lang] || item.noteEn || 'Full quota received'
  }
  if (lang === 'en') return item.noteEn || 'Recorded'
  if (lang === 'te') return item.noteTe || item.noteEn || 'నమోదైంది'
  if (lang === 'kn') return item.noteKn || item.noteEn || 'ದಾಖಲಾಗಿದೆ'
  if (lang === 'ml') return item.noteMl || item.noteEn || 'രേഖപ്പെടുത്തി'
  if (lang === 'hi') return item.noteHi || item.noteEn || 'दर्ज'
  if (lang === 'mr') return item.noteMr || item.noteHi || item.noteEn || 'नोंद झाली'
  if (lang === 'ta') return item.note || item.noteEn
  return item.noteEn || item.note
}

function getShopHeading(shop, lang) {
  if (lang === 'en') {
    return {
      primary: shop.nameEn || shop.name,
      secondary: null
    }
  }
  if (lang === 'ta') {
    return {
      primary: shop.name,
      secondary: shop.nameEn || null
    }
  }
  if (lang === 'mr') {
    return {
      primary: shop.state_id === 'mh' ? shop.name : (shop.nameEn || shop.name),
      secondary: shop.nameEn || null
    }
  }
  if (lang === 'hi') {
    return {
      primary: shop.nameHi || shop.nameEn || shop.name,
      secondary: shop.nameEn || null
    }
  }
  if (lang === 'te') {
    return {
      primary: shop.nameTe || shop.nameEn || 'చౌకధరల దుకాణం',
      secondary: null
    }
  }
  if (lang === 'kn') {
    return {
      primary: shop.nameKn || shop.nameEn || 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ',
      secondary: null
    }
  }
  if (lang === 'ml') {
    return {
      primary: shop.nameMl || shop.nameEn || 'റേഷൻ കട',
      secondary: null
    }
  }
  return {
    primary: shop.nameEn || shop.name,
    secondary: null
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
  const initial = isHelper ? 'R' : (card?.nameEn?.[0] || 'C')

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

function Brand({ t, lang, setLang, selectedState, onChangeState, onOpenAssistant, onCancel }) {
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
        {selectedState && onChangeState && (
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
        {onOpenAssistant && (
          <button
            type="button"
            className="ai-guide-btn"
            onClick={onOpenAssistant}
            title={t.askAssistant}
            aria-label={t.askAssistant}
          >
            <Icon name="sparkles" size={15} />
          </button>
        )}

        {/* Optional Cancel/Close Button */}
        {onCancel && (
          <button className="text-button topbar-cancel-btn" onClick={onCancel} title={t.close || 'Close'}>
            ✕ {t.close || 'Close'}
          </button>
        )}

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
  const [showFamilyModal, setShowFamilyModal] = useState(false)
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [showTicketsModal, setShowTicketsModal] = useState(false)
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
              noteMr: 'तक्रार निवारण झाले',
              noteTe: 'సమస్య పరిష్కరించబడింది',
              noteKn: 'ಸಮಸ್ಯೆ ಬಗೆಹರಿದಿದೆ',
              noteMl: 'പ്രശ്നം പരിഹരിച്ചു',
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
          <span>{t.offlineSyncSuccess}</span>
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
          onOpenFamily={() => setShowFamilyModal(true)}
          onOpenPriceCalc={() => setShowPriceModal(true)}
          onOpenTickets={() => setShowTicketsModal(true)}
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

      {/* Grievance Tickets Tracker Modal (PhonePe Style) */}
      {showTicketsModal && (
        <GrievanceTicketsModal
          t={t}
          lang={lang}
          card={currentCard}
          selectedState={selectedState}
          grievances={initialGrievances.filter((g) => (selectedState === 'mh' || (currentCard?.number && currentCard.number.startsWith('MH')) ? g.state_id === 'mh' : g.state_id === 'tn'))}
          onClose={() => setShowTicketsModal(false)}
          onOpenLiveTracker={(ticket) => {
            setShowTicketsModal(false)
            setReason('mismatch')
            setFastForwarded(true)
            setPage('grievance')
          }}
          onRaiseNew={() => {
            setShowTicketsModal(false)
            setReason('stock')
            setFastForwarded(true)
            setPage('grievance')
          }}
        />
      )}

      {/* Family Members & e-KYC Modal */}
      {showFamilyModal && (
        <FamilyMembersModal
          t={t}
          lang={lang}
          card={currentCard}
          onClose={() => setShowFamilyModal(false)}
        />
      )}

      {/* Official Price & Zero-Overcharge Calculator Modal */}
      {showPriceModal && (
        <PriceCalculatorModal
          t={t}
          lang={lang}
          card={currentCard}
          selectedState={selectedState}
          onClose={() => setShowPriceModal(false)}
          onReportOvercharge={() => {
            setShowPriceModal(false)
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
      <Brand
        t={t}
        lang={lang}
        setLang={setLang}
        selectedState={currentState}
        onChangeState={null}
        onOpenAssistant={null}
        onCancel={onCancel}
      />

      <div className="lookup-hero" aria-hidden="true">
        <span className="grain">🏛️</span>
      </div>

      {/* Quick Visual Language Selector Pills */}
      <div className="state-lang-selector-section">
        <div className="state-lang-pills-row">
          {languages.map((l) => {
            const isSelected = lang === l.code
            return (
              <button
                key={l.code}
                type="button"
                className={'state-lang-pill-chip ' + (isSelected ? 'active' : '')}
                onClick={() => setLang(l.code)}
                title={l.enLabel}
                aria-pressed={isSelected}
              >
                <span className="pill-mark">{l.mark}</span>
                <span className="pill-native">{l.label}</span>
                <span className="pill-en">({l.enLabel})</span>
              </button>
            )
          })}
        </div>
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
            const mainName = stateNames[st.id]?.[lang] || (isEn ? st.nameEn : st.name)
            const subName = isEn ? null : (st.nameEn !== mainName ? st.nameEn : null)
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
            const mainName = stateNames[st.id]?.[lang] || (isEn ? st.nameEn : st.name)
            const subName = isEn ? null : (st.nameEn !== mainName ? st.nameEn : null)
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
  onOpenFamily,
  onOpenPriceCalc,
  onOpenTickets,
  fastForward,
  fastForwarded
}) {
  const meta = statusMeta[status]
  const why = reasons[reason] || reasons.stock

  const isMh = selectedState === 'mh' || (card?.number && card.number.startsWith('MH'))
  const stateTickets = initialGrievances.filter((g) => (isMh ? g.state_id === 'mh' : g.state_id === 'tn'))
  const activeTicket = stateTickets.find((g) => g.status === 'active' || g.status === 'In Review') || stateTickets[0]
  const ticketId = activeTicket?.id || (isMh ? 'AS-2026-5819' : 'AS-2026-4182')
  const ticketPrefix = lang === 'ta' ? 'டிக்கெட்' : lang === 'hi' ? 'टिकट' : lang === 'mr' ? 'तिकीट' : lang === 'te' ? 'టికెట్' : lang === 'kn' ? 'ಟಿಕೆಟ್' : lang === 'ml' ? 'ടിക്കറ്റ്' : 'Ticket'
  const ticketSubtitle = `${ticketPrefix} #${ticketId} · ${t.officerReview || 'In Review by Supply Officer'}`
  const [helperNumber, setHelperNumber] = useState('')
  const [helperError, setHelperError] = useState('')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  const checkHelper = () => {
    if (helperNumber.trim().length < 6) {
      setHelperError(t.cardError)
      return
    }
    lookup(helperNumber, true)
  }

  const helperNames = {
    en: 'Radha Devi (Neighbor)',
    ta: 'ராதா அம்மா (அண்டை வீட்டார்)',
    hi: 'राधा देवी (पड़ोसी)',
    mr: 'राधा देवी (शेजारी)',
    te: 'రాధా దేవి (పొరుగువారు)',
    kn: 'ರಾಧಾ ದೇವಿ (ನೆರೆಹೊರೆಯವರು)',
    ml: 'രാധാ ദേവി (അയൽവാസി)'
  }
  const userName = helper
    ? (helperNames[lang] || helperNames.en)
    : getLocalizedName(card, lang)

  const userLocation = getLocalizedVillage(card, lang)
  const userCategory = getLocalizedCategory(card, lang)
  const isEn = lang === 'en'
  const currentLangObj = languages.find((l) => l.code === lang) || languages[0]

  // Web Speech API Voice synthesis (Intelligent Native & Phonetic Fallback)
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

    const nativeSpeechMap = {
      en: `Hello ${userName}. Status for August 2026: Full quota received. Your entitlement includes ${card.entitledWheat || 20} kilograms wheat, ${card.entitledRice || 15} kilograms rice, 1 kilogram sugar, and 1 kilogram toor dal. Total official price at counter is 43 rupees 50 paise. Grains are 100 percent free. Thank you.`,
      ta: `வணக்கம் ${userName}. ஆகஸ்ட் 2026 ரேஷன் நிலை: முழு ஒதுக்கீடு கிடைத்தது. உங்கள் ஒதுக்கீட்டில் ${card.entitledWheat || 20} கிலோ கோதுமை, ${card.entitledRice || 15} கிலோ அரிசி, 1 கிலோ சர்க்கரை மற்றும் 1 கிலோ துவரம் பருப்பு உள்ளது. ரேஷன் கடையில் செலுத்த வேண்டிய அதிகாரப்பூர்வ தொகை நாற்பத்து மூன்று ரூபாய் ஐம்பது காசுகள் மட்டுமே. அரிசி மற்றும் கோதுமை முற்றிலும் இலவசம். நன்றி.`,
      hi: `नमस्ते ${userName}। अगस्त 2026 का राशन विवरण: पूरा कोटा प्राप्त हुआ। आपके कोटे में ${card.entitledWheat || 20} किग्रा गेहूँ, ${card.entitledRice || 15} किग्रा चावल, 1 किग्रा चीनी और 1 किग्रा दाल है। दुकान पर देय आधिकारिक मूल्य तिरालीस रुपये पचास पैसे है। खाद्यान्न पूरी तरह मुफ़्त है। धन्यवाद।`,
      mr: `नमस्कार ${userName}। ऑगस्ट 2026 रेशन स्थिती: पूर्ण कोटा मिळाला. तुमच्या कोट्यात ${card.entitledWheat || 20} किलो गहू, ${card.entitledRice || 15} किलो तांदूळ, 1 किलो साखर आणि 1 किलो डाळ आहे. दुकानात द्यावयाची अधिकृत रक्कम त्रेचाळीस रुपये पन्नास पैसे आहे. धान्य पूर्णपणे मोफत आहे. धन्यवाद.`,
      te: `నమస్కారం ${userName}. ఆగస్టు 2026 రేషన్ స్థితి: పూర్తి కోటా అందింది. మీ కోటాలో ${card.entitledWheat || 20} కేజీల గోధుమలు, ${card.entitledRice || 15} కేజీల బియ్యం, 1 కేజీ చక్కెర మరియు 1 కేజీ కందిపప్పు ఉన్నాయి. దుకాణంలో చెల్లించాల్సిన అధికారిక ధర నలభై మూడు రూపాయల యాభై పైసలు మాత్రమే. బియ్యం మరియు గోధుమలు పూర్తిగా ఉచితం. ధన్యవాదాలు.`,
      kn: `ನಮಸ್ಕಾರ ${userName}. ಆಗಸ್ಟ್ 2026 ಪಡಿತರ ಸ್ಥಿತಿ: ಪೂರ್ಣ ಕೋಟಾ ಲಭಿಸಿದೆ. ನಿಮ್ಮ ಕೋಟಾದಲ್ಲಿ ${card.entitledWheat || 20} ಕೆಜಿ ಗೋಧಿ, ${card.entitledRice || 15} ಕೆಜಿ ಅಕ್ಕಿ, 1 ಕೆಜಿ ಸಕ್ಕರೆ ಮತ್ತು 1 ಕೆಜಿ ತೊಗರಿ ಬೇಳೆ ಇದೆ. ಅಂಗಡಿಯಲ್ಲಿ ಪಾವತಿಸಬೇಕಾದ ಅಧಿಕೃತ ಮೊತ್ತ ನಲವತ್ಮೂರು ರೂಪಾಯಿ ಐವತ್ತು ಪೈಸೆ ಮಾತ್ರ. ಅಕ್ಕಿ ಮತ್ತು ಗೋಧಿ ಸಂಪೂರ್ಣ ಉಚಿತ. ಧನ್ಯವಾದಗಳು.`,
      ml: `നമസ്കാരം ${userName}. ആഗസ്റ്റ് 2026 റേഷൻ നില: മുഴുവൻ ക്വാട്ടയും ലഭിച്ചു. നിങ്ങളുടെ ക്വാട്ടയിൽ ${card.entitledWheat || 20} കിലോഗ്രാം ഗോതമ്പ്, ${card.entitledRice || 15} കിലോഗ്രാം അരി, 1 കിലോഗ്രാം പഞ്ചസാര, 1 കിലോഗ്രാം തുവരപ്പരിപ്പ് എന്നിവ ലഭിക്കും. റേഷൻ കടയിൽ നൽകേണ്ട തുക 43 രൂപ 50 പൈസ മാത്രമാണ്. അരിയും ഗോതമ്പും പൂർണ്ണമായും സൗജന്യമാണ്. നന്ദി.`
    }

    const phoneticSpeechMap = {
      en: `Hello ${userName}. Status for August 2026: Full quota received. Your entitlement includes ${card.entitledWheat || 20} kilograms wheat, ${card.entitledRice || 15} kilograms rice, 1 kilogram sugar, and 1 kilogram toor dal. Total official price at counter is 43 rupees 50 paise. Grains are 100 percent free. Thank you.`,
      ta: `Vanakkam ${userName}. August 2026 ration nilai: Muzhu othukkeedu kidaithadhu. Ungalukku ${card.entitledWheat || 20} kilograms godhumai, ${card.entitledRice || 15} kilograms arisi, 1 kilogram sarkarai matrum 1 kilogram paruppu ulladhu. Ration kadaiyil selutha vendiya official kattanam naarpai moondru roobai aimbadhu paisa mattume. Arisi matrum godhumai muttrilum ilavasam. Nandri.`,
      hi: `Namaste ${userName}. August 2026 ration sthiti: Poora quota praapt hua. Aapko ${card.entitledWheat || 20} kilogram gehun, ${card.entitledRice || 15} kilogram chaawal, 1 kilogram cheeni aur 1 kilogram dal mila hai. Ration dukaan par official bill tiralees rupaye pachaas paise hai. Anaaj poori tarah muft hai. Dhanyavaad.`,
      mr: `Namaskar ${userName}. August 2026 ration sthiti: Purna quota praapt zhaala. Tumhaala ${card.entitledWheat || 20} kilograms gahu, ${card.entitledRice || 15} kilograms tandul, 1 kilogram saakhar aani 1 kilogram daal praapt zhaali. Dukaanaat official rakkam trechaalis rupaye pannaas paise dyaavi. Gahu aani tandul purnapane mofat aahe. Dhanyavaad.`,
      te: `Namaskaram ${userName}. August 2026 ration status: Poorthi quota andindi. Meeku ${card.entitledWheat || 20} kilograms godhumalu, ${card.entitledRice || 15} kilograms biyyam, 1 kilogram chakkera mariyu 1 kilogram kandipappu andinvi. Ration dukaanamlo official price naalabhai moodu roopaayalu yaabhai paisalu maatrame. Biyyam mariyu godhumalu poorthigaa uchitham. Dhanyavaadalu.`,
      kn: `Namaskara ${userName}. August 2026 ration status: Poorna quota labhiside. Nimage ${card.entitledWheat || 20} kilograms godhi, ${card.entitledRice || 15} kilograms akki, 1 kilogram sakkare matthu 1 kilogram togari bele labhiside. Angadiyalli official price nalavathmooru roopaayi aivatthu paise maathra. Akki matthu godhi sampoorna uchitha. Dhanyavaadagalu.`,
      ml: `Namaskaram ${userName}. August 2026 ration status: Muzhuvan quota labhichu. Ningalkku ${card.entitledWheat || 20} kilograms gothambu, ${card.entitledRice || 15} kilograms ari, 1 kilogram panchasarayum 1 kilogram parippum labhichu. Ration kadayil nalkenda official price nalpathimoonnu roopa ambathu paisa maathramaanu. Ariyum gothambum poornnamaayum soujanyamaanu. Nanni.`
    }

    const voices = window.speechSynthesis.getVoices() || []
    const langCode = lang.toLowerCase()
    const targetSpeechLang = (currentLangObj.speechLang || 'en-IN').toLowerCase()

    // Detect if the browser has a native voice for this language
    const nativeVoice = voices.find((v) => {
      const vLang = (v.lang || '').toLowerCase()
      return vLang.startsWith(langCode) || vLang.replace('_', '-').startsWith(targetSpeechLang)
    })

    // Find Indian English voice or general English voice for phonetic pronunciation
    const indianVoice = voices.find((v) => {
      const vLang = (v.lang || '').toLowerCase()
      const vName = (v.name || '').toLowerCase()
      return vLang === 'en-in' || vLang.startsWith('en-in') || vName.includes('india') || vName.includes('ravi') || vName.includes('heera')
    }) || voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'))

    const utterance = new SpeechSynthesisUtterance()

    if (nativeVoice && lang !== 'en') {
      utterance.voice = nativeVoice
      utterance.lang = nativeVoice.lang
      utterance.text = nativeSpeechMap[lang] || nativeSpeechMap.en
    } else {
      // Fallback for Windows/browsers lacking native Indic TTS packages:
      // Uses natural phonetic Romanized Indic script on Indian English voice so the full announcement is spoken clearly!
      if (indianVoice) utterance.voice = indianVoice
      utterance.lang = 'en-IN'
      utterance.text = phoneticSpeechMap[lang] || nativeSpeechMap.en
    }

    utterance.rate = 0.88
    utterance.pitch = 1.0

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
            <b>{statePortalNames[selectedState]?.[lang] || statePortalNames[selectedState]?.en || (selectedState === 'mh' ? 'Maharashtra AePDS' : 'Tamil Nadu TNPDS')}</b>
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
                <b>{card.category}</b> · {card.category === 'AAY' ? t.quota35kg : t.quota20kg}
              </span>
              <button type="button" className="family-roster-chip" onClick={() => onOpenFamily && onOpenFamily()} title="View Family Members">
                <Icon name="users" size={12} />
                <span>{(card?.familyMembers?.length || 4)} {t.familyMembersChip} · e-KYC</span>
                <Icon name="arrow" size={11} />
              </button>
            </div>
            <p className="citizen-location-text">
              <Icon name="pin" size={12} />
              <span>{userLocation} · FPS: <code>{card.fpsCode || (selectedState === 'mh' ? 'MH-PUN-05' : 'TN-CHE-02A')}</code></span>
            </p>
          </div>
        </div>
      </div>

      {/* PhonePe-Style Grievance Tickets Quick Tracker Bar */}
      <div 
        className="phonepe-ticket-bar page-transition" 
        onClick={() => onOpenTickets && onOpenTickets()} 
        role="button" 
        tabIndex={0} 
        title={t.myGrievanceTickets}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenTickets && onOpenTickets() }}
      >
        <div className="ticket-bar-left">
          <div className="ticket-bar-icon-wrap">
            <span className="phonepe-ticket-icon">🎫</span>
            <span className="pulsing-live-dot" />
          </div>
          <div className="ticket-bar-text">
            <div className="ticket-bar-title-row">
              <b>{t.myGrievanceTickets}</b>
              <span className="active-count-tag">1 {t.activeStatus}</span>
            </div>
            <p>{ticketSubtitle}</p>
          </div>
        </div>
        <div className="ticket-bar-right">
          <span className="track-link-text">{t.viewStatus}</span>
          <Icon name="arrow" size={15} />
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
              <small>{t.voucherSubtext}</small>
            </div>
          </button>
        </div>
      )}

      {/* Statutory Price & Zero-Overcharge Calculator Card */}
      <div className="statutory-bill-card page-transition" onClick={() => onOpenPriceCalc && onOpenPriceCalc()} role="button" tabIndex={0}>
        <div className="bill-card-left">
          <div className="bill-title-row">
            <span className="bill-scale-icon">⚖️</span>
            <b>{t.officialBillTitle}</b>
            <span className="zero-grain-pill">₹0 Grains</span>
          </div>
          <p className="bill-sub">{t.subsidySavedSub}</p>
        </div>
        <div className="bill-card-right">
          <div className="bill-amount-badge">
            <small>{t.totalPayableShort}</small>
            <b>₹43.50</b>
          </div>
          <Icon name="arrow" size={16} />
        </div>
      </div>

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
      date: t.today || 'Today',
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
                <small>{t.receiptShop || 'Fair Price Shop'}</small>
                <b>{tokenPass.shopName}</b>
                {tokenPass.shopNameEn && <span className="token-en-sub">{tokenPass.shopNameEn}</span>}
                <code className="token-fps-code">{tokenPass.shopCode}</code>
              </div>
              <div>
                <small>{t.arrivalSlotLabel || t.selectSlot || 'Arrival Time Slot'}</small>
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
                      {(item.entitledKg !== undefined && item.receivedKg !== undefined && item.entitledKg > item.receivedKg)
                        ? `${item.entitledKg - item.receivedKg} ${t.kgUnit || 'kg'} ${t.shortfallBadge || 'Shortfall'}`
                        : (t.shortfallBadge || 'Shortfall')}
                    </span>
                  )}
                </div>
                <p>{getLocalizedNote(item, lang)}</p>
                {item.entitledKg !== undefined && (
                  <small className="history-kg-sub">
                    {t.entitledShort || 'Entitled'}: {item.entitledKg} {t.kgUnit || 'kg'} · {t.receivedShort || 'Received'}: {item.receivedKg} {t.kgUnit || 'kg'}
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
            <p>{t.statutoryNormDesc}</p>
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
                <th>{t.statusColumn || 'Status'}</th>
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
                    <span className="breakdown-tag red">{t.shortfallBadge || 'Shortfall'}</span>
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
              <p>{getLocalizedNote(item, lang)}</p>
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

  const stateInfo = govReceiptNames[selectedState]?.[lang] || govReceiptNames[selectedState]?.en || govReceiptNames.tn.en
  const deptState = stateInfo.state
  const deptName = stateInfo.dept

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

/* ===================================================================
   Family Members & e-KYC Verification Roster Modal
   =================================================================== */
function FamilyMembersModal({ t, lang, card, onClose }) {
  const members = card.familyMembers || [
    {
      id: 'M1',
      nameEn: card.nameEn || 'Kaliammal',
      name: card.name || 'காளியம்மாள்',
      relationKey: 'headSelf',
      genderKey: 'female',
      age: 48,
      aadhaarLast4: '7812',
      ekycStatus: 'verified',
      quotaKg: 5
    }
  ]

  const getMemberName = (m) => {
    if (lang === 'te') return m.nameTe || m.nameEn
    if (lang === 'kn') return m.nameKn || m.nameEn
    if (lang === 'ml') return m.nameMl || m.nameEn
    if (lang === 'hi') return m.nameHi || m.nameEn
    if (lang === 'mr') return m.nameMr || m.nameEn
    if (lang === 'ta') return m.nameTa || m.name || m.nameEn
    return m.nameEn || m.name
  }

  const getRelation = (key) => t[key] || (key === 'headSelf' ? 'Head of Family' : key === 'spouse' ? 'Spouse' : key === 'daughter' ? 'Daughter' : 'Son')

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="family-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="family-modal-title">
            <Icon name="users" size={22} />
            <div>
              <h2>{t.familyModalTitle}</h2>
              <small>{card.number} · {card.category} {t.cardSaved}</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Statutory Formula Card */}
        <div className="family-formula-banner">
          <Icon name="shield" size={18} />
          <div>
            <b>{members.length} {t.familyMembersChip} × 5 {t.kgUnit || 'kg'} = {members.length * 5} {t.kgUnit || 'kg'} {t.entitlement}</b>
            <p>{t.familySubtitle}</p>
          </div>
        </div>

        {/* Member Roster Grid */}
        <div className="family-roster-list">
          {members.map((m, idx) => {
            const isVerified = m.ekycStatus === 'verified'
            return (
              <div key={m.id || idx} className={"family-member-card " + (isVerified ? 'verified' : 'pending')}>
                <div className="member-avatar">
                  <span>{m.genderKey === 'female' ? '👩' : '👨'}</span>
                </div>
                <div className="member-info">
                  <div className="member-name-row">
                    <b>{getMemberName(m)}</b>
                    <span className={"ekyc-badge " + (isVerified ? 'verified' : 'pending')}>
                      {isVerified ? `✓ ${t.verifiedPill}` : `⚠ ${t.actionRequiredPill}`}
                    </span>
                  </div>
                  <div className="member-meta-tags">
                    <span>{getRelation(m.relationKey)}</span> · 
                    <span>{m.age} {t.ageYears}</span> · 
                    <span>Aadhaar: <code>•••• {m.aadhaarLast4}</code></span>
                  </div>
                  <div className="member-status-sub">
                    <small>{isVerified ? t.ekycVerified : t.ekycPending}</small>
                    <span className="member-quota-pill">{m.quotaKg || 5} {t.kgUnit || 'kg'}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="family-modal-footer">
          <p className="ekyc-notice-text">
            <Icon name="info" size={15} />
            <span>To update biometric fingerprint or add a newborn, visit your nearest e-Seva / Aadhaar CSC center or Taluk Supply Office.</span>
          </p>
          <button className="button primary" onClick={onClose}>
            {t.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Official Statutory Price & Zero-Overcharge Calculator Modal
   =================================================================== */
function PriceCalculatorModal({ t, lang, card, selectedState, onClose, onReportOvercharge }) {
  const isMh = selectedState === 'mh'
  const stateTitle = isMh ? 'Government of Maharashtra' : 'Government of Tamil Nadu'
  const deptTitle = isMh ? 'Dept of Food, Civil Supplies & Consumer Protection' : 'Civil Supplies & Consumer Protection Dept'

  const items = [
    {
      name: t.rice || 'Boiled / Raw Rice',
      qty: card.entitledRice || 15,
      unit: t.kgUnit || 'kg',
      statutoryPrice: 0.0,
      marketRate: 36.0,
      subsidyPct: '100%'
    },
    {
      name: t.wheat || 'Whole Wheat',
      qty: card.entitledWheat || 5,
      unit: t.kgUnit || 'kg',
      statutoryPrice: 0.0,
      marketRate: 32.0,
      subsidyPct: '100%'
    },
    {
      name: t.sugar || 'Refined Sugar',
      qty: card.entitledSugar || 1,
      unit: t.kgUnit || 'kg',
      statutoryPrice: 13.5,
      marketRate: 45.0,
      subsidyPct: '70%'
    },
    {
      name: t.dal || 'Fortified Toor Dal',
      qty: card.entitledDal || 1,
      unit: t.kgUnit || 'kg',
      statutoryPrice: 30.0,
      marketRate: 160.0,
      subsidyPct: '81%'
    }
  ]

  const totalStatutory = items.reduce((acc, it) => acc + it.qty * it.statutoryPrice, 0)
  const totalMarket = items.reduce((acc, it) => acc + it.qty * it.marketRate, 0)
  const totalSubsidy = totalMarket - totalStatutory

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="price-calc-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="price-modal-title">
            <span className="price-gov-icon">🏛️</span>
            <div>
              <h2>{t.officialBillTitle}</h2>
              <small>{stateTitle} · {deptTitle}</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Legal Shield Banner */}
        <div className="zero-grain-shield-banner">
          <Icon name="shield" size={20} />
          <div>
            <b>{t.zeroGrainGuarantee}</b>
            <p>{t.overchargeWarning}</p>
          </div>
        </div>

        {/* Grand Total Hero Display */}
        <div className="price-grand-hero">
          <div className="grand-hero-left">
            <small>{t.totalPayable}</small>
            <h1 className="grand-price-amount">₹{totalStatutory.toFixed(2)}</h1>
            <span className="max-bill-note">Strictly Statutory · Never Pay Extra</span>
          </div>
          <div className="grand-hero-right">
            <div className="subsidy-pill">
              <span>{t.govtSubsidySaved}:</span>
              <b>₹{totalSubsidy.toFixed(2)}</b>
            </div>
            <small className="market-compare">Market Value: ₹{totalMarket.toFixed(2)}</small>
          </div>
        </div>

        {/* Itemized Statutory Price Table */}
        <div className="statutory-table-wrapper">
          <table className="statutory-price-table">
            <thead>
              <tr>
                <th>{t.statutoryCommodity}</th>
                <th>Qty</th>
                <th>{t.statutoryRate}</th>
                <th>{t.marketRate}</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td>
                    <b>{it.name}</b>
                    {it.statutoryPrice === 0 && <span className="free-tag">₹0 {t.freeGrain}</span>}
                  </td>
                  <td>{it.qty} {it.unit}</td>
                  <td>{it.statutoryPrice === 0 ? '₹0.00' : `₹${it.statutoryPrice.toFixed(2)}`}</td>
                  <td><del>₹{it.marketRate.toFixed(2)}</del></td>
                  <td>
                    <b>{it.statutoryPrice === 0 ? '₹0.00' : `₹${(it.qty * it.statutoryPrice).toFixed(2)}`}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Row */}
        <div className="price-modal-actions">
          <button className="button danger overcharge-report-btn" onClick={onReportOvercharge}>
            <Icon name="info" size={17} />
            <span>{t.reportOverchargeBtn}</span>
          </button>
          <button className="button secondary" onClick={() => window.print()}>
            <Icon name="printer" size={16} />
            <span>Print / Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}


/* ===================================================================
   Grievance Tickets Tracker Modal (PhonePe Style)
   =================================================================== */
function GrievanceTicketsModal({ t, lang, card, grievances = [], onClose, onOpenLiveTracker, onRaiseNew }) {
  const [expandedTicketId, setExpandedTicketId] = useState(grievances[0]?.id || null)

  const activeTickets = grievances.filter((item) => item.status === 'active' || item.status === 'In Review')
  const resolvedTickets = grievances.filter((item) => item.status === 'resolved' || item.status === 'Resolved')

  const getCategory = (ticket) => {
    if (lang === 'te') return ticket.categoryTe || ticket.categoryEn
    if (lang === 'kn') return ticket.categoryKn || ticket.categoryEn
    if (lang === 'ml') return ticket.categoryMl || ticket.categoryEn
    if (lang === 'hi') return ticket.categoryHi || ticket.categoryEn
    if (lang === 'mr') return ticket.categoryMr || ticket.categoryEn
    if (lang === 'ta') return ticket.categoryTa || ticket.category || ticket.categoryEn
    return ticket.categoryEn || ticket.category
  }

  const shareTicket = (ticket) => {
    const cardNum = card?.number || 'PDS Citizen'
    const text = encodeURIComponent(
      `Anna Setu Grievance Update: Ticket #${ticket.id} for Ration Card ${cardNum} is ${ticket.status}. Resolution guaranteed under NFSA Section 19 within 7 days.`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="tickets-modal page-transition" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="tickets-modal-title">
            <span className="tickets-modal-icon">🎫</span>
            <div>
              <h2>{t.myGrievanceTickets}</h2>
              <small>{card?.number || ''} · {card?.category || ''} {t.cardSaved}</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Top Summary Bar */}
        <div className="tickets-summary-bar">
          <div className="summary-pill active">
            <span className="pulsing-live-dot" />
            <span>{activeTickets.length} {t.activeStatus}</span>
          </div>
          <div className="summary-pill resolved">
            <span>✓ {resolvedTickets.length} {t.resolvedStatus}</span>
          </div>
          <div className="sla-tag-pill">
            <Icon name="shield" size={12} />
            <span>NFSA 7-Day SLA</span>
          </div>
        </div>

        {/* Tickets List */}
        <div className="tickets-roster-list">
          {grievances.map((item) => {
            const isActive = item.status === 'active' || item.status === 'In Review'
            const isExpanded = expandedTicketId === item.id
            return (
              <div key={item.id} className={"ticket-item-card " + (isActive ? 'active-ticket' : 'resolved-ticket')}>
                <div className="ticket-item-head" onClick={() => setExpandedTicketId(isExpanded ? null : item.id)}>
                  <div className="ticket-head-left">
                    <code className="ticket-code-chip">{item.id}</code>
                    <span className={"ticket-status-pill " + (isActive ? 'active' : 'resolved')}>
                      {isActive ? t.activeStatus : t.resolvedStatus}
                    </span>
                  </div>
                  <span className="ticket-date-label">{item.date}</span>
                </div>

                <div className="ticket-category-line">
                  <b>{getCategory(item)}</b>
                </div>

                {/* Stepper Progress Bar for Active Ticket */}
                {isActive && (
                  <div className="ticket-mini-stepper">
                    <div className="mini-step done">
                      <span className="step-circle">✓</span>
                      <small>{t.grievanceRegistered}</small>
                    </div>
                    <div className="step-connector done" />
                    <div className="mini-step current">
                      <span className="step-circle">2</span>
                      <small>{t.officerReview}</small>
                    </div>
                    <div className="step-connector" />
                    <div className="mini-step">
                      <span className="step-circle">3</span>
                      <small>{t.stockDispatch}</small>
                    </div>
                    <div className="step-connector" />
                    <div className="mini-step">
                      <span className="step-circle">4</span>
                      <small>{t.resolution}</small>
                    </div>
                  </div>
                )}

                {/* Expandable Officer Resolution Logs */}
                {isExpanded && item.logs && item.logs.length > 0 && (
                  <div className="ticket-logs-section">
                    <small className="logs-title">{t.ticketHistory}:</small>
                    <div className="ticket-log-timeline">
                      {item.logs.map((log, lIdx) => (
                        <div key={lIdx} className="ticket-log-entry">
                          <div className="log-marker" />
                          <div className="log-content">
                            <div className="log-head">
                              <b>{log.status}</b>
                              <span>{log.date}</span>
                            </div>
                            <p>{log.note}</p>
                            <small className="log-officer">Officer: {log.officer}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ticket Actions */}
                <div className="ticket-action-buttons">
                  {isActive && (
                    <button className="button primary mini-btn" onClick={() => onOpenLiveTracker(item)}>
                      <Icon name="bolt" size={14} />
                      <span>{t.openLiveTracker}</span>
                    </button>
                  )}
                  <button className="button secondary mini-btn" onClick={() => shareTicket(item)}>
                    <Icon name="share" size={14} />
                    <span>{t.shareTicketWa}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Bottom CTA */}
        <div className="tickets-modal-footer">
          <button className="button primary full-width-btn" onClick={onRaiseNew}>
            <Icon name="message" size={17} />
            <span>{t.raiseNewTicket}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function AppGuideModal({ t, lang, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: guideQA.welcome[lang] || guideQA.welcome.en
    }
  ])
  const [query, setQuery] = useState('')

  const suggestedQuestions = guideQA.questions.map((item) => ({
    q: item.q[lang] || item.q.en,
    a: item.a[lang] || item.a.en
  }))

  const sendQuery = (textToSend) => {
    const qText = textToSend || query
    if (!qText.trim()) return

    const newMsgs = [...messages, { sender: 'user', text: qText }]
    setMessages(newMsgs)
    setQuery('')

    const lower = qText.toLowerCase()
    const isLegalOrPersonal =
      lower.includes('cancel') || lower.includes('dispute') || lower.includes('court') ||
      lower.includes('bribe') || lower.includes('lawyer') || lower.includes('appeal') ||
      lower.includes('ரத்து') || lower.includes('రద్దు') || lower.includes('ರದ್ದು')

    setTimeout(() => {
      let reply = ''
      if (isLegalOrPersonal) {
        reply = guideQA.legalDisclaimer[lang] || guideQA.legalDisclaimer.en
      } else {
        const found = suggestedQuestions.find((s) => s.q.toLowerCase().includes(qText.toLowerCase().slice(0, 8)))
        reply = found ? found.a : (guideQA.defaultReply[lang] || guideQA.defaultReply.en)
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
  const getLegalName = () => {
    if (lang === 'te') return card.aadhaarNameTe || card.aadhaarNameEn || card.nameTe || card.nameEn || 'కాళియమ్మల్'
    if (lang === 'kn') return card.aadhaarNameKn || card.aadhaarNameEn || card.nameKn || card.nameEn || 'ಕಾಳಿಯಮ್ಮಲ್'
    if (lang === 'ml') return card.aadhaarNameMl || card.aadhaarNameEn || card.nameMl || card.nameEn || 'കാളിയമ്മാൾ'
    if (lang === 'hi') return card.aadhaarNameHi || card.aadhaarNameEn || card.nameHi || card.nameEn || 'कालियम्माल'
    if (lang === 'mr') return card.aadhaarNameMr || card.aadhaarNameEn || card.nameMr || card.nameEn || 'कालियाम्मल'
    if (lang === 'ta') return card.aadhaarNameTa || card.aadhaarName || card.name || 'காளியம்மாள்'
    return card.aadhaarNameEn || card.nameEn || 'Kaliammal'
  }

  const getRecordedTypo = () => {
    if (lang === 'te') return card.recordedNameTe || card.recordedNameEn || 'కాళియమల్ కె'
    if (lang === 'kn') return card.recordedNameKn || card.recordedNameEn || 'ಕಾಳಿಯಮಲ್ ಕೆ'
    if (lang === 'ml') return card.recordedNameMl || card.recordedNameEn || 'കാളിയമൽ കെ'
    if (lang === 'hi') return card.recordedNameHi || card.recordedNameEn || 'कालियामल के'
    if (lang === 'mr') return card.recordedNameMr || card.recordedNameEn || 'कालियामल के'
    if (lang === 'ta') return card.recordedNameTa || card.recordedName || 'காளியம்மாள் கே'
    return card.recordedNameEn || 'Kaliamal K'
  }

  const legalName = getLegalName()
  const recordedTypo = getRecordedTypo()

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
          <b>{t.rectificationTitle}</b>
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
    { title: t.grievanceRegistered, time: '10:42 AM · System', done: stage >= 1 },
    { title: t.officerReview, time: stage >= 2 ? t.inReviewStatus : t.pendingStatus, done: stage >= 2, active: stage === 2 },
    { title: t.stockDispatch, time: stage >= 3 ? t.dispatchedStatus : t.queuedStatus, done: stage >= 3, active: stage === 3 },
    { title: t.resolution, time: t.finalStep, done: stage >= 4 }
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('Anna Setu caught error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center', fontFamily: 'sans-serif', color: '#1E2A3C', maxWidth: 460, margin: '60px auto' }}>
          <h2>Anna Setu</h2>
          <p>The session was refreshed. Please tap below to continue.</p>
          <button
            style={{ padding: '10px 20px', background: '#D89A1E', color: '#1E2A3C', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', margin: 6 }}
            onClick={() => window.location.reload()}
          >
            Reload App
          </button>
          <button
            style={{ padding: '10px 20px', background: '#FBF7EC', color: '#1E2A3C', border: '1.5px solid #CDBB94', borderRadius: 8, fontWeight: 700, cursor: 'pointer', margin: 6 }}
            onClick={() => {
              localStorage.clear()
              window.location.reload()
            }}
          >
            Reset Demo
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  )
}
