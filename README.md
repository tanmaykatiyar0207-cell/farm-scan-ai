# 🌾 FarmAssist AI

> Empowering India's smallest SMBs — farmers — with AI-powered crop diagnostics, government scheme navigation, and financial access.

---

## 📌 Overview

FarmAssist AI is a mobile-first platform built for Indian farmers who have historically been locked out of government schemes, crop insurance, and modern agri-advisory due to literacy barriers and complex bureaucracy.

We reframe the farmer not as a beneficiary, but as a **small business owner** — one who needs tools, not charity.

---

## 🚀 Features

### 🔍 FarmScan — Crop Disease Detection
- Upload a photo of your crop via mobile camera
- Powered by **Gemini 1.5 Flash Vision** for multimodal image analysis
- Returns disease name, severity, and recommended treatment

### 🤖 FarmBot — AI Chat Assistant
- Conversational assistant for scheme discovery, eligibility checks, and application walkthroughs

### 📋 Scheme Navigator
- Aggregates central and state-level government schemes (PM-KISAN, PMFBY, soil health cards, etc.)
- Eligibility matching based on farmer profile (land size, crop type, state)
- Step-by-step application guidance with document checklist

### 💳 Financial Access
- Integration with **Razorpay** for micro-payment advisory and loan application routing
- Free tier: 20 AI scans/day
- Premium tier: unlimited scans + priority scheme alerts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (via **Lovable**) |
| Backend / DB | **Supabase** (PostgreSQL + Auth + Storage) |
| Automation | **n8n Cloud** (workflow orchestration) |
| AI Vision | **Gemini 1.5 Flash** (Google AI) |
| Infrastructure | **Google Antigravity** |
| Payments | **Razorpay** |
| Deployment | **Vercel** |

---

## 🏗️ Architecture

```
User (Mobile/Web)
      │
      ▼
  React Frontend (Lovable + Vercel)
      │
      ├──► Supabase (Auth, DB, File Storage)
      │
      ├──► n8n Cloud (Workflow Engine)
      │         │
      │         ├──► Gemini 1.5 Flash Vision API  (crop scan)
      │         └──► Government Scheme APIs / scrapers
      │
      └──► Razorpay (payment gateway)
```

---

## 🌍 Target Users

- Small and marginal farmers (< 2 hectares) across rural India
- First-generation smartphone users with low digital literacy
- Farmers underserved by existing agri-tech platforms focused on large landholders

---

## 💡 Problem We Solve

Over **85% of Indian farmers** are small or marginal landholders. Despite hundreds of government schemes designed for them:
- Awareness is near zero at the grassroots level
- Application processes require navigating multiple portals in English
- Crop loss goes uncompensated due to missed insurance deadlines

**FarmAssist AI** collapses this gap into a single WhatsApp-like interface — take a photo, chat in your language, get your answer.

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (free tier works)
- Google AI API key (Gemini 1.5 Flash)
- n8n Cloud account
- Vercel account

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### Install & Run

```bash
git clone https://github.com/your-org/farmassist-ai.git
cd farmassist-ai
npm install
npm run dev
```

### Deploy

```bash
vercel --prod
```

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgements

- Google AI for Gemini 1.5 Flash API access
- Supabase for open-source backend infrastructure
- n8n for no-code workflow automation
- MSRIT IEEE CS Chapter for support and resources
