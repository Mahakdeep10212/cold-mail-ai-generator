# 🌌 ColdMail.ai — AI-Powered Cold Outreach Campaign Generator

[![Frontend Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-cold-mail-generator-client.vercel.app/)
[![Backend Status](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://ai-cold-mail-generator-907c.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![AI Engine](https://img.shields.io/badge/AI_Engine-Groq_Llama--3.3-orange?style=for-the-badge&logo=meta)](https://groq.com)

**ColdMail.ai** is a professional, full-stack monorepo application designed to generate high-converting, hyper-personalized multi-channel cold outreach campaigns in seconds. Using a single natural-language description, the platform leverages the high-speed **Groq LPU Inference Engine** running **Llama-3.3-70b-versatile** to craft a comprehensive outreach sequence consisting of a **Cold Email (Subject + Body)**, a **LinkedIn Connection DM**, and a polite **Follow-Up Email**.

---

## ⚡ Try It Live!

🚀 **Experience the live application here:** **[https://ai-cold-mail-generator-client.vercel.app/](https://ai-cold-mail-generator-client.vercel.app/)**

*Backend API Server is hosted on Render at:* `https://ai-cold-mail-generator-907c.onrender.com`

---

## 🌟 Core Features

- 🎯 **Multi-Channel Sequences**: Generate a cohesive cold email (with clickable subject line & templates), a direct LinkedIn DM connect note (under 300 characters), and a sequence follow-up email from a single prompt.
- ⚙️ **Flexible Outreach Customization**: Fine-tune campaigns by choosing specific target audiences (Hiring Managers, Engineering Leads, Potential Clients, Executives) and distinct tone profiles (Professional, Persuasive, Casual, Bold, Creative).
- ✉️ **Resilient Account Verification**: Secure OTP registration with dual-mode support:
  - **SMTP Relay**: Gmail App Passwords, custom SMTP providers, or standard ports (465/587).
  - **Resend HTTP API**: Bypasses cloud SMTP port blocks by sending mails over HTTPS (Port 443).
  - **Mock Mode**: Logs OTPs directly to the console for sandboxed testing.
- 🗂️ **Outreach Archive & History**: Search, filter, and expand detailed histories of your previous campaigns in a clean visual archive.
- 🛡️ **Fail-Safe Fallback System**: Automatic localized copy-generator backup that produces context-matching outreach sequences if your AI API keys are missing or hit rate limits.
- 🎨 **Premium Cosmic-Dark UI**: Designed with glassmorphic panels, neon borders, custom glowing indicators, Outfit & Inter typography, and fluid micro-animations.

---

## 🛠️ Technology Stack

### Backend Server (`server/`)
- **Runtime**: Node.js & Express.js (following MVC pattern)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Session JWT (JSON Web Tokens) & Password hashing with `bcryptjs`
- **AI Inference**: Groq SDK (`llama-3.3-70b-versatile` with JSON schema enforcement)
- **Mailer**: Nodemailer SMTP relay & Resend HTTPS mail client

### Frontend Client (`client/`)
- **Framework**: React.js (Vite configuration)
- **Styling**: Tailwind CSS v4 & PostCSS (custom glowing cosmic dark theme)
- **Routing**: React Router DOM (protected workspace route walls)
- **API Client**: Axios (configured with request interceptors to auto-inject session JWT tokens and dynamically route API paths)
- **Icons**: Lucide React

---

## ⚙️ Environment Configuration

To run this application locally or in production, configure the following environment variables.

Create a `.env` file in the root directory based on `.env.example`:

| Environment Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| **`PORT`** | Port number for the backend Express server | `5000` |
| **`MONGODB_URI`** | MongoDB connection string (local instance or Atlas Cloud URI) | `mongodb://127.0.0.1:27017/cold-mail-generator` |
| **`JWT_SECRET`** | Secret key used to sign and verify JWT authentication tokens | `your-super-secure-jwt-secret-string` |
| **`USE_MOCK_EMAIL`** | Bypasses actual mail delivery and logs OTPs directly to console | `false` (set to `true` to test signup without SMTP) |
| **`RESEND_API_KEY`** | **[Recommended for Render]** API key for Resend HTTP mailer | `re_xxxxxxxxxxxxxxxxxxxxxxxx` |
| **`SMTP_HOST`** / **`EMAIL_HOST`** | SMTP server host address (Gmail, Brevo, Hostinger, etc.) | `smtp.gmail.com` |
| **`SMTP_PORT`** / **`EMAIL_PORT`** | SMTP port (465 for TLS, 587 for STARTTLS) | `587` |
| **`SMTP_USER`** / **`EMAIL_USER`** | Username/email address for the mail sender | `your-email@gmail.com` |
| **`SMTP_PASS`** / **`EMAIL_PASS`** | Password or API/App password for the mail sender | `your-gmail-app-password` |
| **`GROQ_API_KEY`** | API key to access Groq AI models | `gsk_your-groq-api-key-here` |

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (running locally or a cloud-hosted Atlas database)

### 🔧 Installation
1. Clone the project to your local directory.
2. Build and install dependencies for the root, client, and server workspaces:
   ```bash
   npm run install-all
   ```

### 💻 Running the Application Locally

#### Start Concurrently (Backend + Frontend)
To run both the backend Express server (port `5000`) and the Vite React client (port `3000`) in parallel:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to start generating cold emails!

#### Run Individually
* **Backend Server only**: `npm run server` (runs server with hot-reloading via `nodemon`)
* **Frontend Client only**: `npm run client` (runs Vite dev server)

---

## ☁️ Production Deployment

### Backend / Server (Render.com)
1. Deploy the `server/` workspace as a Web Service.
2. In the Render environment dashboard, add the required variables (`MONGODB_URI`, `JWT_SECRET`, `GROQ_API_KEY`, etc.).
3. If hosting on a free/standard Render server, use the **`RESEND_API_KEY`** to bypass Render's default outbound SMTP port blocks.
4. **IP Whitelisting**: Ensure your MongoDB Atlas is set to allow connections from anywhere (`0.0.0.0/0`) because Render routes traffic dynamically.

### Frontend Client (Vercel)
1. Import the root repository to Vercel.
2. Set the **Root Directory** to `client`.
3. Configure the environment variable:
   * **Key**: `VITE_API_URL`
   * **Value**: `https://your-backend-service.onrender.com` (pointing to your deployed Render URL)
4. Deploy the service. Vercel will automatically compile the static assets using Vite.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ✍️ Author
- **Full-Stack Development & Architecture**: **Sanyogita Singh**
