# 🎓 Imperial Commerce Tutorials Platform

A modern, responsive coaching institute management platform and public portal for **Imperial Commerce Tutorials, Nashik**.

Built for seamless operations across 6 key institute roles with real-time cloud data synchronization via Supabase and automated deployment readiness for Netlify.

---

## 🚀 Key Features

- **🌐 Public Portal**: Course catalog (XI & XII Commerce, CA Foundation, CMA, CS Foundation), admissions enquiry workflow, interactive fee calculator, and faculty showcase.
- **💼 Recruitment & Careers Portal**: Comprehensive job application system for teaching and non-academic posts, resume tracking, demo lecture scheduling, and automated WhatsApp/call triggers.
- **📊 Director Dashboard**: Executive analytics, student retention, faculty payout distribution (60/40 revenue share split), financial vouchers, and operational approvals.
- **📁 Admin Portal**: Student admissions, batch allocations, automated fee receipt generation with UPI QR code integration, and expense voucher logging.
- **👩‍🏫 Teacher Portal**: Daily portion tracking, lecture notes sharing, homework publishing, doubt answering, and exam result entries.
- **🎒 Student Portal**: Class schedules, syllabus tracker, homework submissions, test score cards, academic query raising, and digital receipt access.
- **👨‍👩‍👦 Parent Portal**: Attendance tracking, fee payment ledger, downloadable receipts, leave request submission, and teacher feedback.
- **☁️ Supabase Cloud Backend**: Real-time cloud persistence across all modules with fallback local storage and cloud data export.
- **🌓 Dynamic Light/Dark Mode**: High-contrast, tailored visual aesthetics with smooth transitions.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), Vanilla CSS
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Deployment**: [Netlify](https://www.netlify.com/) (`netlify.toml` + SPA routing redirects)

---

## 💻 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/imperialcommerce99/imperial.git
cd imperial
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production output is generated in the `dist/` directory, ready to be served or deployed.

---

## 🌐 Deployment to Netlify

This project is pre-configured with `netlify.toml` and `public/_redirects` for continuous deployment on Netlify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

© Imperial Commerce Tutorials, Nashik. All Rights Reserved.
