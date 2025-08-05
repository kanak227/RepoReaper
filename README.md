<div align="center">

# RepoReaper ⚔️

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![GitHub OAuth](https://img.shields.io/badge/Auth-GitHub%20OAuth-blue.svg)](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://reporeaper-frontend.onrender.com)

> Effortlessly delete multiple GitHub repositories in one go. Fast. Secure. Streamlined.

</div>

---

## 🌐 Live Site

🔗 [https://reporeaper-frontend.onrender.com](https://reporeaper-frontend.onrender.com)


<img width="1919" height="869" alt="Screenshot 2025-08-05 195410" src="https://github.com/user-attachments/assets/531e26b0-847e-4fd7-89d1-86330f29add0" />


## 🚀 Features

- 🔐 **Secure GitHub OAuth Login**  
- 🗑️ **Bulk Delete Repositories** — Select and delete multiple repos in one click  
- 🔍 **Smart Filters** — Filter by name, private/public, or forked status  
- 💎 **Modern UI** — Clean, responsive frontend built for speed and usability

---

## ⚙️ Tech Stack

- **Frontend:** React + Vite + TailwindCSS + Framer
- **Backend:** Node.js + Express  
- **Auth:** GitHub OAuth  
- **Deployment:** Render (Frontend + Backend hosted separately)

---

## 🧪 Local Setup

### 📦 Prerequisites

- Node.js v14 or higher  
- npm or yarn  
- GitHub OAuth App credentials

### 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_REDIRECT_URI = github_redirect_url (backend_url/auth/github/callback)
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the client directory:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=https:http://localhost:3000
```

---

## 🛠️ Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/kanak227/RepoReaper.git
   cd RepoReaper
   ```

2. Install frontend dependencies  
   ```bash
   cd client
   npm install
   ```

2. Install backend dependencies  
   ```bash
   cd server
   npm install
   ```

---

## 👨‍💻 Running the App Locally

### ▶️ Development Mode (Frontend + Backend separately)

Start the backend:
```bash
cd server
npm run dev
```

Start the frontend (in a new terminal):
```bash
cd client
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---


## 🤝 Contributing

RepoReaper is open to contributions! Whether you found a bug, have a feature request, or want to submit a pull request — you're welcome!

### How to contribute:

- 🐛 **Found a bug?**  
  [Open an issue](https://github.com/yourusername/repo-reaper/issues) with a clear description and reproduction steps.

- 🌟 **Want to improve a feature or UI?**  
  Fork the repo, create a new branch, and make a pull request.

- 📚 **Need help setting up?**  
  Open a discussion or issue — we’re happy to assist.

**💡 Tip:** Be sure to follow standard coding practices and write clean, commented code. It makes reviewing much easier!

---

## 🧯 Troubleshooting

### GitHub Auth not working?

- Ensure GitHub OAuth callback is:  
  `http://localhost:3000/auth/github/callback`
- Verify that all `.env` values are correctly set

---
## 📄 License

This project is licensed under a [Non-Commercial License](LICENSE.md).  
For commercial inquiries, please contact 📧 kanakverma325@gmail.com.
