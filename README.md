````md
<div align="center">

# RepoReaper & StarSweeper ⚔️✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![GitHub OAuth](https://img.shields.io/badge/Auth-GitHub%20OAuth-blue.svg)](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://reporeaper-frontend.onrender.com)

> Two powerful tools, one unified platform. Effortlessly clean up your GitHub repositories and starred lists. Fast. Secure. Stateless.

</div>

---

## 🌐 Live Site

🔗 [https://reporeaper-frontend.onrender.com](https://reporeaper-frontend.onrender.com)

![RepoReaper Dashboard](image.png)
![StarSweeper Mode](image-1.png)

---

## 🚀 Features

The platform operates in two dynamic modes, easily switchable via the global toggle in the navbar.

### ⚔️ RepoReaper Mode
- 🗑️ **Bulk Delete Repositories** — Delete multiple repositories in one click.
- 📦 **Bulk Archive** — Archive repositories to make them read-only.
- 🔒 **Bulk Privatize** — Convert public repositories to private.

### ✨ StarSweeper Mode
- ⭐ **Bulk Unstar Repositories** — Clean up your starred repositories efficiently.
- 🎨 **Dynamic Theming** — Unique yellow/orange theme for StarSweeper mode.

### 🛡️ Platform Features
- 🔐 **Secure GitHub OAuth Authentication**
- 🔍 **Smart Search and Filtering**
- 🚫 **Stateless Architecture** — No database and no permanent storage of user data.
- 💎 **Modern Responsive UI**
- ⚡ **Fast Bulk Operations**

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Zustand, Framer Motion
- **Backend:** Node.js, Express.js
- **Authentication:** GitHub OAuth
- **Deployment:** Render

---

## 🧪 Local Setup

### 📦 Prerequisites

- Node.js 14 or higher
- npm or yarn
- GitHub OAuth App credentials

### 🔐 Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
````

Create a `.env` file in the `client` directory:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ Installation

1. Clone the repository

```bash
git clone https://github.com/kanak227/RepoReaper.git
cd RepoReaper
```

2. Install frontend dependencies

```bash
cd client
npm install
```

3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## 👨‍💻 Running the App Locally

### Start the Backend

```bash
cd server
npm run dev
```

### Start the Frontend (in a new terminal)

```bash
cd client
npm run dev
```

Visit: `http://localhost:5173`

---

## 🤝 Contributing

We welcome contributions from developers of all experience levels.

### Ways to Contribute

* 🐛 Report bugs
* ✨ Add new features
* 🎨 Improve UI/UX
* 📚 Enhance documentation
* 🧪 Add tests

### Getting Started

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please read the following documents before contributing:

* 📘 [CONTRIBUTING.md](CONTRIBUTING.md)
* 🤝 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### Good First Issues

If you are new to the project, start with issues labeled:

* `good first issue`
* `beginner friendly`
* `gssoc26`

View all open issues here:
👉 [https://github.com/kanak227/RepoReaper/issues](https://github.com/kanak227/RepoReaper/issues)

---

## 🧯 Troubleshooting

### GitHub OAuth Not Working

* Ensure the callback URL exactly matches your GitHub OAuth App settings.
* Verify that all `.env` variables are correctly configured.
* Restart both frontend and backend after changing environment variables.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support the Project

If you find this project useful, consider giving it a star on GitHub.

---

## 🙌 Acknowledgements

Built with ❤️ using React, Node.js, and the GitHub API.

```
```
