
<div align="center">

# RepoReaper & StarSweeper ⚔️✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![GitHub OAuth](https://img.shields.io/badge/Auth-GitHub%20OAuth-blue.svg)](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://reporeaper-frontend.onrender.com)

> Two powerful tools, one unified platform to manage your GitHub repositories and starred repositories efficiently.

<p>
  <a href="https://reporeaper-frontend.onrender.com"><strong>🌐 Live Demo</strong></a> •
  <a href="https://github.com/kanak227/RepoReaper/issues"><strong>🐛 Report Bug</strong></a> •
  <a href="https://github.com/kanak227/RepoReaper/issues"><strong>✨ Request Feature</strong></a>
</p>

</div>

---

## 📖 Overview

RepoReaper & StarSweeper is a full-stack GitHub productivity platform that helps developers clean up and organize their GitHub accounts.

- ⚔️ **RepoReaper** — Bulk delete, archive, and privatize repositories.
- ✨ **StarSweeper** — Bulk unstar repositories to declutter your starred list.
- 🔐 **Secure GitHub OAuth** — Authenticate safely using your GitHub account.
- 🚫 **Stateless Architecture** — No database and no permanent storage of user data.

---

## 🌐 Live Demo

🔗 https://reporeaper-frontend.onrender.com

---

## 📸 Screenshots

![RepoReaper Dashboard](image.png)
![StarSweeper Mode](image-1.png)

---

## 🚀 Features

### ⚔️ RepoReaper Mode

- 🗑️ Bulk delete repositories
- 📦 Bulk archive repositories
- 🔒 Bulk convert repositories to private

### ✨ StarSweeper Mode

- ⭐ Bulk unstar repositories
- 🎨 Dynamic yellow/orange theme

### 🛡️ Platform Features

- 🔐 Secure GitHub OAuth authentication
- 🔍 Search, sorting, and filtering
- ⚡ Fast bulk operations
- 💎 Modern responsive UI
- 🚫 Stateless backend architecture

---

## ⚙️ Tech Stack

| Layer | Technologies |
|------|------|
| Frontend | React, Vite, Tailwind CSS, Zustand, Framer Motion |
| Backend | Node.js, Express.js |
| Authentication | GitHub OAuth |
| Deployment | Render |

---

## 🧪 Local Setup

### 📦 Prerequisites

- Node.js 14 or higher
- npm or yarn
- GitHub OAuth App credentials

### 🔐 Environment Variables

#### Server (`server/.env`)

```env
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
````

#### Client (`client/.env`)

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/kanak227/RepoReaper.git
cd RepoReaper

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

## ▶️ Running the Application

### Start the Backend

```bash
cd server
npm run dev
```

### Start the Frontend

```bash
cd client
npm run dev
```

Open: `http://localhost:5173`

---

## 🤝 Contributing

Contributions are welcome from developers of all experience levels.

### Ways to Contribute

* 🐛 Report bugs
* ✨ Add new features
* 🎨 Improve UI/UX
* 📚 Enhance documentation
* 🧪 Add tests

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please read:

* 📘 [CONTRIBUTING.md](CONTRIBUTING.md)
* 🤝 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### 🌱 Good First Issues

New contributors can start with issues labeled:

* `good first issue`
* `beginner friendly`
* `gssoc26`

👉 [https://github.com/kanak227/RepoReaper/issues](https://github.com/kanak227/RepoReaper/issues)

---

## 🧯 Troubleshooting

### GitHub OAuth Not Working

* Ensure the callback URL matches your GitHub OAuth App settings exactly.
* Verify all `.env` variables are configured correctly.
* Restart both frontend and backend after updating environment variables.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support

If you find this project useful, please consider starring the repository.

---

## 🙌 Acknowledgements

Built with ❤️ using React, Node.js, Express.js, and the GitHub API.
