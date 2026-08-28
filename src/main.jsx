import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import mockData from './mockData.json'
import './tailwind.css'
import './styles.css'
import './overrides.css'

const { card, history: initialHistory, reasons, shops } = mockData
const text = {
  hi: {
    app:'अन्न सेतु', greeting:'नमस्ते', tagline:'राशन की सही जानकारी, सही समय पर', demo:'डेमो मोड — कोई असली सरकारी सिस्टम नहीं जुड़ा है',
    home:'घर', shops:'दुकानें', history:'इतिहास', help:'मदद', helper:'किसी और की मदद करें', helperSub:'परिवार या पड़ोसी का कार्ड देखें',
    helperCard:'जिसकी मदद कर रहे हैं, उनका कार्ड नंबर', checkPerson:'स्थिति देखें', ownCard:'अपने कार्ड पर लौटें',
    cardNo:'राशन कार्ड नंबर', cardSaved:'राशन कार्ड', continue:'आगे बढ़ें', loading:'स्थिति जाँची जा रही है…',
    cardError:'कृपया कम से कम 6 अंकों का डेमो कार्ड नंबर डालें।', offline:'आपकी जानकारी फोन में सुरक्षित है। नेटवर्क आते ही अपडेट होगी।',
    entitlement:'इस महीने का राशन', denied:'राशन रुका है', partial:'कुछ राशन मिला', received:'राशन मिल गया', issue:'क्या हुआ?',
    nearby:'आपके पास की दुकानें', today:'आज का स्टॉक', rice:'चावल', wheat:'गेहूँ', available:'मिल रहा है', out:'आज नहीं है', open:'खुली है', closed:'अभी बंद है',
    timeline:'पिछले 6 महीने', pattern:'पिछले 3 महीनों में 2 बार राशन में समस्या हुई', fast:'3 दिन आगे बढ़ाएँ', fastSub:'शिकायत अपने-आप बनने का डेमो देखें',
    back:'वापस', grievance:'शिकायत तैयार है', autoCreated:'3 दिन बाद अपने-आप दर्ज की गई', tracking:'ट्रैकिंग नंबर', expected:'जवाब मिलने का समय: 48 घंटे',
    link:'पहचान जोड़ें', enterOtp:'मोबाइल पर आया 4 अंकों का कोड डालें', verify:'सत्यापित करें', request:'सुधार का अनुरोध',
    correctName:'सही नाम', sendRequest:'अनुरोध भेजें', nameError:'कृपया अपना सही नाम भरें।', success:'हो गया!', successText:'आपका अनुरोध दर्ज हो गया है। हम आपको बताएँगे।',
    support:'मदद चाहिए?', call:'हेल्पलाइन नंबर देखें', callShown:'1967 — हेल्पलाइन नंबर दिखा दिया गया है', network:'नेटवर्क स्थिति', noNetwork:'नेटवर्क नहीं मिला',
    helpCard:'हम आपके साथ हैं', helpBody:'समझ न आए तो 1967 पर कॉल करें। यह डेमो कॉल नहीं करता।', inactiveTitle:'कार्ड फिर चालू करें', inactiveBody:'हम जाँच के लिए आपका अनुरोध तैयार कर देंगे।',
    activate:'जाँच का अनुरोध भेजें', otpStep1:'मोबाइल नंबर जाँचें', otpStep3:'पहचान जुड़ गई', resolution:'समाधान पूरा हुआ', resolveDemo:'समाधान होने का डेमो देखें',
    days:'3 दिन से समाधान नहीं हुआ', check:'सही दुकान चुनें', selectedShop:'यह दुकान आज दोनों अनाज दे सकती है।', august:'अगस्त', quantity:'20 किलो',
    demoStatus:'स्थिति बदलें', demoIssue:'कारण बदलें', invalidOtp:'चार अंक डालें'
  },
  en: {
    app:'Anna Setu', greeting:'Hello', tagline:'Clear ration support, right when you need it', demo:'Demo mode — no real government system is connected',
    home:'Home', shops:'Shops', history:'History', help:'Help', helper:'Help someone else', helperSub:'Check a family member or neighbour’s card',
    helperCard:'Ration card number for the person you’re helping', checkPerson:'Check status', ownCard:'Return to my card',
    cardNo:'Ration card number', cardSaved:'Ration card', continue:'Continue', loading:'Checking your status…',
    cardError:'Enter at least 6 characters for a demo ration card number.', offline:'Your details are saved on this phone and will update when connected.',
    entitlement:'This month’s ration', denied:'Ration is paused', partial:'Some ration received', received:'Ration received', issue:'What happened?',
    nearby:'Shops near you', today:'Today’s stock', rice:'Rice', wheat:'Wheat', available:'Available', out:'Not today', open:'Open', closed:'Closed now',
    timeline:'Last 6 months', pattern:'There were ration issues in 2 of the last 3 months', fast:'Fast-forward 3 days', fastSub:'See the grievance generated automatically',
    back:'Back', grievance:'Grievance is ready', autoCreated:'Automatically registered after 3 days', tracking:'Tracking number', expected:'Expected response: 48 hours',
    link:'Link identity', enterOtp:'Enter the 4-digit code sent to your phone', verify:'Verify', request:'Request correction',
    correctName:'Correct name', sendRequest:'Send request', nameError:'Please enter the correct name.', success:'All set!', successText:'Your request is recorded. We’ll keep you informed.',
    support:'Need help?', call:'Show helpline number', callShown:'1967 — helpline number shown', network:'Network status', noNetwork:'No network found',
    helpCard:'We are with you', helpBody:'If you are unsure, call 1967. This demo does not place calls.', inactiveTitle:'Reactivate card', inactiveBody:'We will prepare a review request for your card.',
    activate:'Send review request', otpStep1:'Check mobile number', otpStep3:'Identity linked', resolution:'Resolved', resolveDemo:'See resolved demo',
    days:'Unresolved for 3 days', check:'Choose this shop', selectedShop:'This shop can provide both grains today.', august:'August', quantity:'20 kg',
    demoStatus:'Change status', demoIssue:'Change reason', invalidOtp:'Enter all four digits'
  }
}
const statusMeta={denied:{glyph:'×',cls:'red'},partial:{glyph:'!',cls:'amber'},received:{glyph:'✓',cls:'green'}}
const nextStatus={denied:'partial',partial:'received',received:'denied'}
const nextReason={mismatch:'aadhaar',aadhaar:'stock',stock:'inactive',inactive:'mismatch'}

function Icon({name,size=22}) {
  const c={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'2',strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':'true'}
  const p={
    home:<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-7h6v7"/></>,
    pin:<><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    help:<><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.6 2.6 0 1 1 4.5 1.8c-.95.9-2.1 1.35-2.1 2.7"/><path d="M12 17h.01"/></>,
    users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    arrow:<path d="m9 18 6-6-6-6"/>,back:<path d="m15 18-6-6 6-6"/>,
    phone:<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/></>,
    wifi:<><path d="M5 12.55a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 20h.01"/></>,
    check:<path d="m5 12 4 4L19 6"/>,info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>
  }
  return <svg {...c}>{p[name]||p.help}</svg>
}
function Brand({t,lang,setLang}){return <header className="topbar"><div className="brand"><span className="brand-mark">अ</span><span>{t.app}</span></div><button className="language-toggle" onClick={()=>setLang(lang==='hi'?'en':'hi')} aria-label="Change language"><Icon name="globe" size={17}/>{lang==='hi'?'EN':'हि'}</button></header>}

function App(){
  const [lang,setLang]=useState(()=>localStorage.getItem('anna-language')||'hi')
  const [tab,setTab]=useState('home'),[page,setPage]=useState('home')
  const [savedCard,setSavedCard]=useState(()=>localStorage.getItem('anna-card-number')||'')
  const [status,setStatus]=useState('denied'),[reason,setReason]=useState('mismatch'),[isLoading,setIsLoading]=useState(false)
  const [helper,setHelper]=useState(false),[offline,setOffline]=useState(false),[resolved,setResolved]=useState(false),[fastForwarded,setFastForwarded]=useState(false),[records,setRecords]=useState(initialHistory)
  const t=text[lang]
  useEffect(()=>localStorage.setItem('anna-language',lang),[lang])
  const lookup=(number)=>{setIsLoading(true);window.setTimeout(()=>{const v=number.trim().toUpperCase();setSavedCard(v);localStorage.setItem('anna-card-number',v);setIsLoading(false)},850)}
  const navigate=(next)=>{if(['home','shops','history','help'].includes(next))setTab(next);setPage(next);setResolved(false)}
  const clearCard=()=>{localStorage.removeItem('anna-card-number');setSavedCard('');setHelper(false);setFastForwarded(false)}
  const goFix=()=>reason==='stock'?navigate('shops'):setPage(reason)
  const finishResolution=()=>{setStatus('received');setRecords(rows=>rows.map((row,i)=>i===0?{...row,state:'received',note:'शिकायत हल हुई',noteEn:'Issue resolved'}:row));setResolved(true)}
  const backHome=()=>{setPage('home');setTab('home');setResolved(false)}
  if(!savedCard)return <Lookup t={t} lang={lang} setLang={setLang} isLoading={isLoading} lookup={lookup}/>
  const nav=[['home','home',t.home],['shops','pin',t.shops],['history','clock',t.history],['help','help',t.help]]
  const showBack=!['home','shops','history','help'].includes(page)
  return <main className="app-shell min-h-screen antialiased">
    <Brand t={t} lang={lang} setLang={setLang}/>
    {showBack&&<button className="back-button" onClick={backHome}><Icon name="back" size={18}/>{t.back}</button>}
    {page==='home'&&<HomePage t={t} lang={lang} status={status} setStatus={setStatus} reason={reason} setReason={setReason} helper={helper} setHelper={setHelper} savedCard={savedCard} clearCard={clearCard} lookup={lookup} goFix={goFix} navigate={navigate} fastForward={()=>{setFastForwarded(true);setPage('grievance')}} fastForwarded={fastForwarded}/>}
    {page==='shops'&&<ShopList t={t} lang={lang}/>}
    {page==='history'&&<History t={t} lang={lang} records={records}/>}
    {page==='help'&&<Help t={t} offline={offline} setOffline={setOffline}/>}
    {page==='mismatch'&&<Correction t={t} lang={lang} finishResolution={finishResolution} resolved={resolved} goHome={backHome}/>}
    {page==='aadhaar'&&<OtpFlow t={t} finishResolution={finishResolution} resolved={resolved} goHome={backHome}/>}
    {page==='inactive'&&<InactiveFlow t={t} finishResolution={finishResolution} resolved={resolved} goHome={backHome}/>}
    {page==='grievance'&&<Grievance t={t} lang={lang} reason={reason} fastForwarded={fastForwarded} finishResolution={finishResolution} resolved={resolved} goHome={backHome}/>}
    <nav className="bottom-nav" aria-label="Main navigation">{nav.map(([id,icon,label])=><button key={id} className={tab===id?'selected':''} onClick={()=>navigate(id)}><Icon name={icon}/><span>{label}</span></button>)}</nav>
  </main>
}

function Lookup({t,lang,setLang,isLoading,lookup}){
 const [number,setNumber]=useState(card.number),[error,setError]=useState('')
 const submit=()=>{if(number.trim().length<6){setError(t.cardError);return}setError('');lookup(number)}
 return <main className="app-shell lookup min-h-screen antialiased"><Brand t={t} lang={lang} setLang={setLang}/><div className="lookup-hero" aria-hidden="true"><span className="grain">✳</span></div><h1>{t.app}</h1><p className="lookup-tagline">{t.tagline}</p><p className="demo-chip">◌ {t.demo}</p><div className="lookup-form"><label htmlFor="card-number">{t.cardNo}</label><input id="card-number" value={number} onChange={e=>setNumber(e.target.value)} placeholder="MH-12-0418-2675" aria-invalid={Boolean(error)}/>{error&&<p className="form-error"><Icon name="info" size={17}/>{error}</p>}<button className="button primary" onClick={submit}>{isLoading?<span className="spinner"/>:t.continue}<Icon name="arrow"/></button></div><p className="offline-note"><Icon name="wifi" size={15}/>{t.offline}</p></main>
}

function HomePage({t,lang,status,setStatus,reason,setReason,helper,setHelper,savedCard,clearCard,lookup,goFix,navigate,fastForward,fastForwarded}){
 const meta=statusMeta[status],why=reasons[reason]
 const [helperNumber,setHelperNumber]=useState(''),[helperError,setHelperError]=useState('')
 const checkHelper=()=>{if(helperNumber.trim().length<6){setHelperError(t.cardError);return}lookup(helperNumber)}
 const userName=helper?(lang==='hi'?'राधा जी':'Radha ji'):(lang==='hi'?card.name:'Sunita Devi')
 return <section className="page-transition"><div className="welcome-row"><div><p>{t.greeting}, {userName}</p><h1>{t.entitlement}</h1></div><button className="saved-card" onClick={clearCard}><span>{t.cardSaved}</span>{savedCard.slice(-4)}<Icon name="arrow" size={14}/></button></div>
   <button className="helper-toggle" onClick={()=>setHelper(!helper)}><Icon name="users"/><span><b>{t.helper}</b><small>{t.helperSub}</small></span><i className={helper?'on':''}/></button>
   {helper&&<div className="helper-lookup"><label>{t.helperCard}</label><input value={helperNumber} onChange={e=>setHelperNumber(e.target.value)} placeholder="MH-12-0418-2675"/>{helperError&&<p className="form-error"><Icon name="info" size={17}/>{helperError}</p>}<button className="button secondary" onClick={checkHelper}>{t.checkPerson}<Icon name="arrow"/></button><button className="text-button" onClick={()=>setHelper(false)}>{t.ownCard}</button></div>}
   <div className={'status-card '+meta.cls}><div className="status-symbol">{meta.glyph}</div><div><h2>{status==='denied'?t.denied:status==='partial'?t.partial:t.received}</h2><p>{t.august} 2026 · {t.quantity}</p></div></div>
   <div className="demo-controls"><span>Demo</span><button onClick={()=>setStatus(nextStatus[status])}>{t.demoStatus}</button><button onClick={()=>setReason(nextReason[reason])}>{t.demoIssue}: {why.icon}</button></div>
   {status!=='received'&&<article className="reason-card"><div className="reason-symbol">{why.icon}</div><div><h2>{why.title[lang]}</h2><p>{why.detail[lang]}</p><button className="reason-action" onClick={goFix}>{why.action[lang]}<Icon name="arrow" size={17}/></button></div></article>}
   <div className="quick-actions"><button onClick={()=>navigate('shops')}><Icon name="pin"/><span>{t.nearby}</span></button><button onClick={()=>navigate('history')}><Icon name="clock"/><span>{t.timeline}</span></button></div>
   {status!=='received'&&<button className={'escalate-card '+(fastForwarded?'ready':'')} onClick={fastForward}><span><b>{fastForwarded?t.grievance:t.fast}</b><small>{fastForwarded?t.autoCreated:t.fastSub}</small></span><strong>→</strong></button>}
 </section>
}

function shopName(shop,lang){return lang==='en'&&shop.nameEn?shop.nameEn:shop.name}
function ShopList({t,lang}){
 const [selected,setSelected]=useState(false)
 return <section className="page-transition"><div className="page-heading"><span className="heading-icon"><Icon name="pin" size={30}/></span><div><h1>{t.nearby}</h1><p>{t.today}</p></div></div>{shops.map((shop,index)=><article className="shop-card" key={shop.name}><div className="shop-head"><div><h2>{shopName(shop,lang)}</h2><p><Icon name="pin" size={14}/>{shop.distance} · {shop.open?t.open:t.closed}</p></div><i className={shop.open?'open-dot':'open-dot closed'}/></div><div className="stock-list"><span><i className={shop.rice?'available':'unavailable'}>{shop.rice?'✓':'×'}</i>{t.rice}: {shop.rice?t.available:t.out}</span><span><i className={shop.wheat?'available':'unavailable'}>{shop.wheat?'✓':'×'}</i>{t.wheat}: {shop.wheat?t.available:t.out}</span></div>{index===1&&<><button className="button secondary" onClick={()=>setSelected(true)}>{t.check}<Icon name="arrow"/></button>{selected&&<p className="selection-note"><Icon name="check" size={17}/>{t.selectedShop}</p>}</>}</article>)}</section>
}

function History({t,lang,records}){return <section className="page-transition"><div className="page-heading"><span className="heading-icon"><Icon name="clock" size={30}/></span><div><h1>{t.timeline}</h1><p>{t.pattern}</p></div></div><div className="history-list">{records.map(item=>{const meta=statusMeta[item.state];return <div className="history-row" key={item.month}><span className={'history-symbol '+meta.cls}>{meta.glyph}</span><div><b>{lang==='en'&&item.monthEn?item.monthEn:item.month} 2026</b><p>{lang==='en'&&item.noteEn?item.noteEn:item.note}</p></div><em className={meta.cls}>{item.state==='received'?t.received:item.state==='partial'?t.partial:t.denied}</em></div>})}</div></section>}

function Help({t,offline,setOffline}){const [showCall,setShowCall]=useState(false);return <section className="page-transition help-page"><div className="help-hero"><span>♡</span><h1>{t.helpCard}</h1><p>{t.helpBody}</p><button className="button primary centered" onClick={()=>setShowCall(true)}><Icon name="phone"/>{t.call}</button>{showCall&&<p className="call-note"><Icon name="check" size={18}/>{t.callShown}</p>}</div><button className="network-card" onClick={()=>setOffline(!offline)}><Icon name="wifi"/><span><b>{offline?t.noNetwork:t.network}</b><small>{offline?t.offline:'2G/3G demo · Tap to simulate a problem'}</small></span></button></section>}

function Correction({t,lang,finishResolution,resolved,goHome}){const [name,setName]=useState(lang==='hi'?card.name:'Sunita Devi'),[error,setError]=useState('');const submit=()=>{if(!name.trim()){setError(t.nameError);return}finishResolution()};if(resolved)return <Success t={t} goHome={goHome}/>;return <section className="flow page-transition"><span className="flow-symbol">≠</span><h1>{t.request}</h1><p>{reasons.mismatch.detail[lang]}</p><label>{t.correctName}</label><input value={name} onChange={e=>setName(e.target.value)}/>{error&&<p className="form-error"><Icon name="info" size={17}/>{error}</p>}<label>{t.cardNo}</label><input defaultValue={card.number}/><button className="button primary" onClick={submit}>{t.sendRequest}<Icon name="arrow"/></button></section>}

function OtpFlow({t,finishResolution,resolved,goHome}){const [step,setStep]=useState(1),[otp,setOtp]=useState(''),[error,setError]=useState('');if(resolved)return <Success t={t} goHome={goHome}/>;const proceed=()=>{if(step===2&&otp.length!==4){setError(t.invalidOtp);return}setError('');step<3?setStep(step+1):finishResolution()};const title=step===1?t.otpStep1:step===2?t.enterOtp:t.otpStep3;return <section className="flow page-transition"><span className="flow-symbol">✦</span><h1>{t.link}</h1><div className="steps"><span className="filled">1</span><i/><span className={step>1?'filled':''}>2</span><i/><span className={step>2?'filled':''}>3</span></div><h2>{title}</h2>{step===1&&<input defaultValue={card.phone}/>} {step===2&&<input className="otp-input" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,4))} inputMode="numeric" placeholder="• • • •" maxLength="4"/>}{error&&<p className="form-error"><Icon name="info" size={17}/>{error}</p>}<button className="button primary" onClick={proceed}>{step===3?t.resolution:step===2?t.verify:t.continue}<Icon name="arrow"/></button></section>}

function InactiveFlow({t,finishResolution,resolved,goHome}){if(resolved)return <Success t={t} goHome={goHome}/>;return <section className="flow page-transition"><span className="flow-symbol">!</span><h1>{t.inactiveTitle}</h1><p>{t.inactiveBody}</p><div className="review-list"><span><b>1</b>{t.cardNo}: {card.number}</span><span><b>2</b>{t.expected}</span></div><button className="button primary" onClick={finishResolution}>{t.activate}<Icon name="arrow"/></button></section>}

function Grievance({t,lang,reason,fastForwarded,finishResolution,resolved,goHome}){if(resolved)return <Success t={t} goHome={goHome}/>;const number='AS-2608-'+({mismatch:'4182',aadhaar:'5217',stock:'6324',inactive:'7405'}[reason]);return <section className="flow grievance page-transition"><span className="flow-symbol">!</span><h1>{t.grievance}</h1><p>{fastForwarded?t.autoCreated:t.days} · {reasons[reason].title[lang]}</p><div className="tracking-card"><small>{t.tracking}</small><b>{number}</b><span>{t.expected}</span></div><button className="button primary" onClick={finishResolution}>{t.resolveDemo}<Icon name="arrow"/></button></section>}

function Success({t,goHome}){return <section className="success-page page-transition"><div className="success-icon"><Icon name="check" size={52}/></div><h1>{t.success}</h1><p>{t.successText}</p><button className="button secondary centered" onClick={goHome}><Icon name="home"/>{t.home}</button></section>}

createRoot(document.getElementById('root')).render(<App/>)
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))
