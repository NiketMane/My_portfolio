# Changes Log - Niket Mane Portfolio

Complete record of all features, components, backend services, configurations, and design overhauls implemented for **Niket Mane**.

---

## 📅 Project Summary & History

- **Developer Profile (Current / Resume Aligned)**: Niket Mane — **Python Backend Developer** (~3 Years Experience) & **AWS Certified Solutions Architect (SAA-C03)**.
- **Initial Prototype Profile (Historical)**: Senior Frontend Web Developer transitioning into Full Stack Development.
- **Core Tech Stack**: Python, FastAPI, SQLAlchemy ORM, Oracle PL/SQL, PostgreSQL, AWS (Lambda, EC2, S3, RDS, IAM, VPC), React 18, TypeScript, Vite, Express, Nodemailer, Pure Vanilla CSS layout system.

---

## 🚀 Detailed List of Changes & Implementations

### 1. 🌓 Dark & Light Theme Switcher (`Navbar.tsx` & `index.css`)
- **Theme Mode State**: Added persistent theme toggle state (`dark` vs `light`) stored in `localStorage` (`portfolio_theme_mode_v1`).
- **Sun/Moon Toggle Button**: Interactive icon button in the header navbar.
- **CSS Variables System**: Automatic CSS variable updates (`[data-theme="light"]`) for crisp light mode contrast, readable typography, and smooth 0.3s color transitions!

---

### 2. 🎬 Cinematic Opening Intro Animation (`src/components/OpeningIntro.tsx`)
- **Preloader Reveal**: Fullscreen dark/cyber splash animation on initial website load.
- **Features**:
  - Animated **NM** monogram logo badge.
  - Live progress counter (`0% -> 100%`).
  - Terminal status indicator (`initializing fullstack.system...`).
  - Smooth Framer Motion curtain slide-up reveal into the main website.

---

### 3. 🎯 High-Impact Hero Section (Reference Design Matched - `src/pages/Home.tsx`)
- **Target Reference Design Match**:
  - Top Greeting: `Hello, I'm` (thin light typography).
  - Main Headline: **`Niket Mane`** (Extra bold 5.5rem impact typography).
  - Subtitle: `REACT JS & FULL STACK DEVELOPER` (spaced uppercase tracking).
  - High-Contrast Backdrop Overlay: Background image overlay with subtle dark gradient ensuring 100% text legibility.
- **Interactive IDE Terminal Simulator (`TerminalSimulator.tsx`)**:
  - Code visualizer window with tab switcher (`FrontendArch.tsx`, `FullStackApi.js`, `MailerService.js`).
  - Features 1-click code copying and simulated terminal execution console output.

---

### 4. ⚙️ Master Feature Toggle Engine (`features.ts` & Admin Dashboard)
- **Centralized Configuration (`src/config/features.ts`)**:
  - Feature flags for all pages (`homePage`, `aboutPage`, `workPage`, `adminPage`) and component sections (`contactForm`, `githubApiFeed`, `experienceTimeline`, `academicBackground`, `technicalExpertise`, `quickStats`, `fullStackBadge`).
- **Real-Time Synchronization**: Toggling off any page switch in the Admin panel instantly removes its links from the header navigation, footer, and route guards.

---

### 5. 📄 Dynamic Resume Management (Google Drive vs Direct PDF File Upload)
- **Google Drive Link Mode**: Configured with live Drive URL: `https://drive.google.com/file/d/1eVmtq5CV1kfB6ciq0I9PvwG8xB2GhKaF/view?usp=sharing`. Clicking "RESUME" / "View Resume" opens your Drive link in a new tab.
- **Direct PDF File Upload Mode**: Upload a PDF file directly from your computer in the Admin panel (`Resume Uploader`). Visitors can view/download your PDF directly from the site.
- **Header Link**: Added a dedicated `RESUME` tab in the header navigation bar.

---

### 6. 🔐 Hidden Personal Admin Control & Security Lock (`src/pages/Admin.tsx`)
- **Hidden from Public View**: The Admin link is **hidden from the public Header Navbar and Footer links by default** so public visitors never see an admin link.
- **Discreet Owner Access**: Access the portal via direct URL `/admin` or click the discreet **"Owner Access"** lock link in the footer.
- **Personal PIN Security Lock Screen**: Navigating to `/admin` displays a Cyber Lock Screen requiring your personal PIN (Default PIN: **`1234`**).
- **Submissions Inbox**: View, manage, and reply to received contact messages directly inside the Admin dashboard.

---

### 7. 📬 Contact Form & Database-Less Backend Mailer (`server/server.js` & `ContactForm.tsx`)
- **Form Fields**:
  - `Name`
  - `Email`
  - `Subject` dropdown (`Job Opportunities`, `General Message`, `Collaboration`, `Project Enquiry`)
  - `Message`
  - `Send Message` Button with loading state & success toast.
- **Nodemailer Backend API (`/api/contact`)**: Dispatches email notifications and logs submissions to `server/data/messages.json`. No PostgreSQL database required.
- **Web3Forms Fallback**: Includes automatic Web3Forms client-side fallback for static online hosting (Vercel / GitHub Pages).

---

### 8. 📇 Dedicated Contact Info Box (`src/components/ContactBox.tsx`)
- Glassmorphic card displaying:
  - Email address with a 1-click **"Copy Email"** button (with checkmark feedback).
  - **LinkedIn** link button.
  - **GitHub** link button.
  - Location badge & live hiring status indicator.

---

### 9. 💼 Work Page & Live GitHub Integration (`src/pages/Work.tsx`)
- **Project Showcase Grid**: Filterable by project category (*All*, *Full Stack*, *Frontend UI*, *Node/APIs*).
- **Features**: Search bar, star & fork counters, live demo links, repository source links, and live GitHub REST API fetch option.

---

### 10. 👤 About Me Page (`src/pages/About.tsx`)
- Developer profile section with high-resolution photo avatar.
- **5+ YEO Work Experience Timeline**: Expandable career milestone cards (Senior Frontend Architect → UI/UX Lead → Full Stack Developer).
- **Academic Credentials**: Degree (BS Computer Science) & Professional Full Stack Certification.
- **Technical Expertise Matrix**: Skill chips for Frontend, Backend, and DevOps tools.

---

### 11. 🎨 Design System & Layout Overhaul (`src/index.css`)
- **100% Pure Vanilla CSS**: Replaced all Tailwind utility dependencies with custom CSS Flexbox & CSS Grid systems, custom scrollbars, glassmorphism backdrop blur filters, dark & light theme mode variables, and glowing hover states.

---

### 12. 📄 Official Resume Alignment (Niket Mane — Python Backend Developer)
- **Profile Transformation**: Updated all developer profiles, headlines, subtitles, and bios to reflect **Niket Mane**, **Python Backend Developer** with **~3 years of experience** and **AWS Certified Solutions Architect (SAA-C03)**.
- **Work Experience Timeline**:
  - **Python Backend Developer (Consultant) — Turnberry Solutions** *(Aug 2024 – Present)*
    - Client: **Schreiber Foods — The Hive Backend Modernization Project**.
    - Migrated 100+ Oracle PL/SQL procedures and packages into Python backend services using SQLAlchemy ORM, resolving legacy logic errors and data inconsistencies along the way, cutting execution time by 30%.
    - Designed and built 100+ RESTful APIs with FastAPI, documented via Swagger UI/OpenAPI, reducing downstream integration time by 40%.
    - Diagnosed and optimized slow data-processing workflows using Pandas, identifying performance bottlenecks in large dataset handling and reducing backend execution latency by 25–30%.
    - Used GitHub Copilot to accelerate PL/SQL-to-Python conversion, personally reviewing, debugging, and validating all generated code for correctness before release.
    - Wrote unit and integration tests with Pytest and validated 100+ API endpoints with Postman, catching regressions early and improving release reliability.
    - Deployed and maintained services on AWS (Lambda, S3, EC2, IAM, VPC); collaborated cross-functionally in an Agile/Scrum environment using Git and Jira.
    - *Tech Stack*: Python, FastAPI, SQLAlchemy, Oracle PL/SQL, Pandas, Pytest, Postman, Swagger UI, AWS (Lambda, S3, EC2, IAM, VPC), Git, GitHub Copilot, Jira.
  - **Associate Web Developer — Proiuvo Pvt Ltd** *(Mar 2023 – Dec 2023)*
    - Built modules for a React.js-based LMS & HRMS platform (onboarding, performance evaluation, attendance tracking) with role-based access control, improving HR workflow efficiency by 35%.
    - Integrated RESTful APIs from a Java Spring Boot backend, resolving data sync issues between frontend and backend and cutting sync errors by 25%.
    - Debugged and fixed UI defects identified during QA and post-release, reducing post-release bugs by 40%.
    - *Tech Stack*: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Java Spring Boot, REST APIs.
- **AWS Official Certifications Section (`About.tsx`)**:
  - 🏅 **AWS Certified Solutions Architect – Associate (`SAA-C03`)**
  - 🏅 **AWS Certified Cloud Practitioner (`CLF-C02`)**
- **Academic Background (`About.tsx`)**:
  - 🎓 **Master of Computer Applications (MCA)** — Gogte Institute of Technology, Belagavi (2020 – 2022)
  - 🎓 **Bachelor of Computer Applications (BCA)** — Rani Chennamma University, Belagavi (2017 – 2020)
- **Technical Arsenal & Skills Matrix (`Home.tsx` & `About.tsx`)**:
  - **Programming Languages**: Python, SQL, JavaScript (ES6+)
  - **Backend Frameworks & ORM**: FastAPI, SQLAlchemy ORM, Alembic, REST API Design, Pydantic
  - **Databases & Tuning**: Oracle PL/SQL, PostgreSQL, MySQL, SQL Query Optimization, RDBMS Design, Latency Tuning, Root-Cause Troubleshooting
  - **Cloud Platforms (AWS)**: Lambda, EC2, S3, RDS, IAM, VPC, Amazon Cognito, CloudWatch
  - **Testing & Development Tools**: Pytest, Postman, Swagger UI / OpenAPI, Pandas, Git, Jira, Agile/Scrum, GitHub Copilot
  - **Frontend (Secondary)**: React.js, HTML5, CSS3, Bootstrap
- **Featured Projects Showcase (`Work.tsx`)**:
  1. **Facility Maintenance Request Management System (AWS Full Stack)** (Python backend on AWS EC2, RDS PostgreSQL/MySQL, Cognito RBAC, S3 document uploads, IAM access controls, CloudWatch).
  2. **The Hive: Legacy Oracle PL/SQL to Python Modernization** (Schreiber Foods / Turnberry Solutions — 100+ packages migrated, 30% execution time reduction).
  3. **FastAPI Microservices Suite & OpenAPI Documentation** (100+ endpoints, Swagger UI, Pytest, Postman).
  4. **Pandas High-Volume Batch Latency Optimizer** (ETL pipeline bottlenecks resolved, 25-30% execution latency reduction).
  5. **Enterprise LMS & HRMS Platform Modules** (React.js, RBAC, Java Spring Boot REST APIs).
  6. **AWS Serverless S3 to RDS Pipeline** (Event-driven AWS Lambda, S3 bucket triggers, RDS PostgreSQL connection pools).
- **Direct Contact Box (`ContactBox.tsx`)**:
  - Email: `developer.niket@gmail.com` *(with 1-click Copy button)*
  - Phone: `+91 6361939644` *(with 1-click Copy button and direct Call link)*
  - Location: `Bangalore, India`
  - Certification Badge: `AWS SAA-C03 Certified`
- **IDE Terminal Simulator (`TerminalSimulator.tsx`)**:
  - Tab 1: `fastapi_service.py` (FastAPI REST API with Pydantic & SQLAlchemy dependency injection)
  - Tab 2: `plsql_migration.py` (Oracle PL/SQL procedure migration & Pandas batch vectorization)
  - Tab 3: `aws_lambda_pipeline.py` (Serverless S3 event trigger & RDS PostgreSQL writer)
- **Metadata & SEO (`index.html`)**:
  - Title: `Niket Mane | Python Backend Developer & AWS Certified Solutions Architect`
  - Description: Updated to highlight FastAPI, SQLAlchemy ORM, Oracle PL/SQL modernization, SQL tuning, and AWS cloud architecture.
- **Backend Email Configuration (`server/server.js` & `.env.example`)**:
  - Updated default recipient email address and SMTP configuration to `developer.niket@gmail.com`.

---

### 13. 🛠️ Dev Server & Environment Resolution (`spawn cmd.exe ENOENT` Fix)
- **Root Cause Analysis**: Resolved Windows environment issue where `C:\Windows\System32` was missing from active PATH, causing `concurrently` child-process spawning to fail with `Error: spawn cmd.exe ENOENT`.
- **System Environment Restored**: Restored `C:\Windows\System32`, `C:\Windows`, `C:\Windows\System32\Wbem`, and `C:\Windows\System32\WindowsPowerShell\v1.0\` to the User Environment Registry (`HKCU:\Environment\Path`) so all new terminal instances recognize system executables.
- **Bulletproof Dev Server Runner (`scripts/start.js`)**:
  - Created standalone Node.js development runner that manages both Vite (Frontend) and Express (Backend) concurrently.
  - Automatically ensures `System32` and `ComSpec` are defined in child process environments in-memory.
  - Updated `npm start` in `package.json` to `"node scripts/start.js"`, providing instant, zero-error startups without external shell dependencies.

---

### 14. 🛡️ TypeScript & Production Build Verification
- **Vite Client Types**: Added `"types": ["vite/client"]` to `tsconfig.json` to properly type `import.meta.env`.
- **CSS Style Properties Audit**: Resolved CSS property errors in `src/pages/Admin.tsx` (`justifyContent`, `whiteSpace`).
- **Clean Production Build**: Successfully verified full compilation and bundling with `npm run build` (`tsc && vite build`), generating optimized production assets in `dist/` with 0 errors.

---

### 15. 📬 Dedicated Contact & Connect Routing & Navigation Fix
- **Root Issue Resolved**: Previously, clicking **"Get In Touch"** or **"CONTACT"** in the header redirected to `/about#contact`, causing the browser to load the About page and scroll all the way down past Bio, Certifications, Experience, Academics, and Skills to reach the contact form.
- **Dedicated Route & Page (`src/pages/Contact.tsx`)**:
  - Created a dedicated `/contact` page titled **"Contact & Connect"** that presents the Direct Contact Box (Phone with 1-click call/copy, Email with 1-click copy, AWS badge, Bangalore location) and the Interactive Message Form directly at the top of the page.
  - Added quick highlights for response turnaround, open role preferences, and core tech focus.
- **Header & Mobile Navigation Updated (`src/components/Navbar.tsx`)**:
  - The **"Get In Touch"** button and **"CONTACT"** navigation link now redirect directly to `/contact` instead of scrolling down the About page.
- **Automatic Scroll Reset (`src/components/ScrollToTop.tsx`)**:
  - Added a global `ScrollToTop` listener so switching routes automatically resets the window scroll position to the top cleanly.
- **About Page CTA Cleaned Up (`src/pages/About.tsx`)**:
  - Replaced the duplicate bottom contact form on the About page with an elegant **"Ready to Build or Modernize Your Backend?"** collaboration banner that directs visitors directly to `/contact`.
- **Footer Links Updated (`src/components/Footer.tsx`)**:
  - Added direct link to `Contact & Connect` (`/contact`).

---

### 16. 🌌 Cyber Dataflow & Tech Background Engine (`TechBackground.tsx`, `App.tsx`, `index.css`)
- **Interactive Tech Node & Data Packet Canvas (`src/components/TechBackground.tsx`)**:
  - Hardware-accelerated HTML5 canvas rendered at `z-index: 0` behind application UI.
  - Generates floating distributed backend/cloud nodes with active dynamic connection vectors.
  - Emits and animates traveling glowing data packets across bus lines to simulate real-time API transactions and serverless event flows.
  - Drifting low-opacity micro-tech glyphs (`λ`, `01`, `⚡`, `{ }`, `⬡`, `SQL`, `API`, `AWS`, `RDS`).
  - Interactive mouse proximity tracking that forms radiant cyan connection lines to the cursor with magnetic attraction.
  - Automatically adapts colors to dark mode and light mode via a DOM MutationObserver.
  - Auto-pauses animation on `document.hidden` to conserve CPU, GPU, and battery.
- **Cyber Coordinate Grid & Depth Layer (`src/index.css`)**:
  - Upgraded `body::before` to a blueprint coordinate grid with 1.2px intersection crosshairs and dual 36px/72px line intervals.
  - Added `body::after` radial contrast vignette for content legibility.
- **Hero Section Seamless Integration (`src/pages/Home.tsx`)**:
  - Removed missing legacy image reference and replaced with semi-transparent cybernetic gradient, letting the live tech canvas shine through behind the headline and terminal simulator.

---

### 17. 💻 Enhanced Terminal Simulator Readability & Syntax Highlighting (`TerminalSimulator.tsx`)
- **Minimalist GitHub Dark Syntax Palette**:
  - Replaced rainbow colors with a refined, understated 2-to-3 tone palette: soft indigo keywords (`#818cf8`), cyber-cyan decorators (`#38bdf8`), warm tinted strings (`#fef3c7`), bold crisp white types (`#ffffff`), and muted slate comments (`#64748b`).
- **Line Numbers Column**:
  - Added formatted line numbers (`01`, `02`, `03`...) in an authentic editor gutter with subtle vertical separator.
- **Executive Explanation Banner**:
  - Added a plain-English explanation card directly above the code explaining the goal, business value, and technical outcome of each snippet at a glance.
- **Enhanced Tab Categories**:
  - Added descriptive subtitles to tabs (`REST API & ORM`, `PL/SQL Modernization`, `AWS Serverless Cloud`).
- **Interactive Pytest Execution Drawer**:
  - Upgraded **"Run Pytest"** action to display a realistic terminal test execution trace (`tests/test_fastapi.py PASSED [100%]`).

---

### 18. 🚀 Git Repository Initialization & GitHub Remote Setup
- **Git Repo Initialization**: Initialized empty Git repository (`git init`) and established `main` as the default branch.
- **Repository Ignore Rules (`.gitignore`)**:
  - Excluded `node_modules/`, `dist/`, build caches, local `.env` files, `.kilo/`, and `server/data/messages.json` to prevent sensitive or bulky files from being tracked.
- **Author Identity Setup**:
  - Configured global Git user identity (`user.name: Niket_Mane`, `user.email: niketbmane@gmail.com`).
- **Initial Commit & GitHub Push**:
  - Created initial repository commit and pushed cleanly to remote: `https://github.com/NiketMane/My_portfolio.git`.

---

### 19. ☁️ Vercel Deployment & Serverless Mail Engine (`api/contact.js` & `vercel.json`)
- **Vercel Serverless Function (`api/contact.js`)**:
  - Resolved Vercel deployment limitation where static hosting does not execute continuous background Node/Express processes (`server/server.js`).
  - Created a native Vercel serverless function (`/api/contact`) utilizing `nodemailer` to dispatch contact inquiries directly on form submissions.
  - Added robust credentials sanitization (stripping quotes, whitespace, and formatting anomalies) to prevent SMTP `BadCredentials` errors.
  - Configured CORS headers and preflight `OPTIONS` handling for secure browser-to-serverless transactions.
- **Vercel Routing Rules (`vercel.json`)**:
  - Added rewrite configuration to route `/api/*` requests to the native serverless function while redirecting all client-side SPA routes (`/about`, `/work`, `/contact`, `/admin`) to `/index.html` to prevent 404s on page refresh.

---

### 20. 📬 Contact Form Flow & Web3Forms Zero-Maintenance Integration (`ContactForm.tsx`)
- **Web3Forms Direct Priority**:
  - Configured `ContactForm.tsx` to prioritize `VITE_WEB3FORMS_ACCESS_KEY` for zero-maintenance direct contact dispatching without needing Google App Passwords or SMTP credentials.
  - Implemented seamless fallback to `/api/contact` if Web3Forms is not configured.
- **Accurate Error & Feedback Handling**:
  - Removed mock success banners that masked delivery failures.
  - Updated real-time user notification to: *"Thank you for reaching out! Your message has been sent successfully. I'll get back to you within 24 hours."*
  - Added clear error messaging guiding the user to direct contact information in the event of network or configuration issues.

---

## 📁 Key File Locations

- 🌌 Tech Canvas Background: [`src/components/TechBackground.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/components/TechBackground.tsx)
- ⚙️ Feature & Security Config: [`src/config/features.ts`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/config/features.ts)
- 🔒 Feature Context Provider: [`src/context/FeatureContext.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/context/FeatureContext.tsx)
- 🚀 Express Backend Server: [`server/server.js`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/server/server.js)
- ⚡ Vercel Serverless Function: [`api/contact.js`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/api/contact.js)
- 🌐 Vercel Routing Configuration: [`vercel.json`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/vercel.json)
- 🚫 Git Exclusion Rules: [`.gitignore`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/.gitignore)
- 🛠️ Dev Server Runner: [`scripts/start.js`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/scripts/start.js)
- 🎨 Design System CSS: [`src/index.css`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/index.css)
- 🎬 Opening Intro Animation: [`src/components/OpeningIntro.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/components/OpeningIntro.tsx)
- 💻 IDE Terminal Simulator: [`src/components/TerminalSimulator.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/components/TerminalSimulator.tsx)
- 📬 Contact Form & Box: [`ContactForm.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/components/ContactForm.tsx), [`ContactBox.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/components/ContactBox.tsx)
- 📄 Pages: [`Home.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/pages/Home.tsx), [`About.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/pages/About.tsx), [`Work.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/pages/Work.tsx), [`Contact.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/pages/Contact.tsx), [`Admin.tsx`](file:///e:/NICK/PROFESSIONAL/Mini_projects/My_Portfolio/src/pages/Admin.tsx)

