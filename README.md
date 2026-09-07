# Anna Setu (अन्न सेतु / அன்ன சேது) — PDS Citizen Support Demo

> **Clear ration support, right when you need it.**
> Offline-first citizen ration ledger supporting the Tamil Nadu Public Distribution System (**TNPDS** / நியாய விலைக் கடைகள்) and National PDS.

---

## 🌾 Overview

**Anna Setu** bridges the gap between public distribution beneficiaries and fair price shops (FPS). Designed with an authentic **"Citizen's Ration Ledger"** design philosophy—replacing generic SaaS chrome with tactile ink stamps, perforated coupon cards, and ledger rules.

### Key Highlights

1. **Multilingual by Design**:
   - **தமிழ் (Tamil)**: Full native terminology for TNPDS Fair Price Shops, commodities, and grievance flows.
   - **हिन्दी (Hindi)**: Devanagari ledger typography and official PDS terminology.
   - **English**: Clear, accessible language.
   - Seamless 3-way language toggle with matching typographic weights via Google Fonts (`IBM Plex Sans Tamil`, `IBM Plex Sans Devanagari`, `IBM Plex Sans`, and `Fraunces`).

2. **Tamil Nadu PDS (TNPDS) Real Dataset**:
   - Real-world Fair Price Shops in **Chennai (Triplicane TUCS, Anna Nagar Co-op)**, **Madurai (Simmakkal)**, **Coimbatore (Singanallur)**, and **Salem**.
   - Commodity tracking: Boiled Rice (புழுங்கல் அரிசி), Raw Rice (பச்சரிசி), Wheat (கோதுமை), Sugar (சர்க்கரை), and Toor Dal (துவரம் பருப்பு).
   - Live operating hours and shop-by-shop radar beacon indicators.

3. **Phone Verification Gate**:
   - Security gate ensuring ration data is accessible only after phone verification.
   - **Simulated Native SMS Push Banner**: Drops in smoothly with spring physics (`VA-TNPDS: 1234 is your OTP`) and a one-tap auto-fill button for testing.
   - **4-Box Split OTP Input**: Individual boxes with auto-focus advance, backspace retreat, glowing active state, and shake-on-error animation.

4. **"Deadly Smooth" Animation System**:
   - **Tactile Rubber Ink Stamp**: Double-ring stamps with physical squash-and-stretch settle (`cubic-bezier(0.17, 1.6, 0.4, 1)`) and ink splatter particles.
   - **Pulsing Live Radar Beacon**: Real-time pulsing emerald beacons on open shops.
   - **Page-Turn Transitions**: Realistic 3D perspective page-turn entrance.
   - **Animated Ledger Line**: Automatically draws itself downward as the history ledger opens.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🧪 Demo Credentials & Test Guide

- **Tamil Nadu Demo Card**: `TN-02-G-849201` (Kalliammal, Royapettah, Chennai)
- **Maharashtra Demo Card**: `MH-12-0418-2675` (Sunita Devi, Anand Nagar, Pune)
- **Demo Verification OTP**: `1234` (Tap the incoming SMS toast notification to auto-fill)

---

## 🌐 Deploy to Vercel

### Option 1: Via GitHub (Recommended)
1. Push this project to your personal GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Anna Setu PDS Helper"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/Anna-Setu-PDS-helper.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `Anna-Setu-PDS-helper` repository and click **Deploy**. Vercel will automatically detect Vite and configure the build command (`npm run build`) and output directory (`dist`).

### Option 2: Via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to deploy directly from your terminal.

---

## 📄 License
MIT License. Created for the Anna Setu PDS Citizen Support initiative.
