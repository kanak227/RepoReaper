# Contributing to RepoReaper & StarSweeper ⚔️✨

Thank you for your interest in contributing to RepoReaper & StarSweeper! We welcome contributions of all kinds, including bug fixes, new features, UI improvements, documentation updates, and test additions.

By contributing to this project, you help improve a tool that enables developers to efficiently manage their GitHub repositories and starred repositories.

---
## 📌 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Project Setup](#project-setup)
- [Creating a Branch](#creating-a-branch)
- [Making Changes](#making-changes)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Pull Request Checklist](#pull-request-checklist)
- [Issue Labels](#issue-labels)
- [Tips for New Contributors](#tips-for-new-contributors)

---

## 🤝 Code of Conduct

Please read our `CODE_OF_CONDUCT.md` before contributing. By participating in this project, you agree to follow its guidelines and maintain a respectful, inclusive environment.

---

## 🌟 Ways to Contribute

You can contribute in several ways:

* 🐛 Fix bugs
* ✨ Add new features
* 🎨 Improve UI/UX
* 📚 Enhance documentation
* 🧪 Write tests

If you are new to open source, start with issues labeled:

* `good first issue`
* `beginner friendly`
* `documentation`

---

## 🛠️ Project Setup

### 1. Fork the Repository

Click the **Fork** button in the top-right corner of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/RepoReaper.git
cd RepoReaper
```

### 3. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Copy the values from `.env.example` and create `.env` files in both the `client` and `server` directories.

#### Server `.env`

```env
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

#### Client `.env`

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
```

### 5. Run the Project

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend (in a new terminal)

```bash
cd client
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 🌱 Creating a Branch

Create a new branch before making any changes:

```bash
git checkout -b feature/your-feature-name
```

### Examples

* `feature/add-loading-skeletons`
* `fix/oauth-callback-error`
* `docs/update-readme`

---

## ✏️ Making Changes

When working on an issue:

1. Read the issue description carefully.
2. Understand the expected outcome.
3. Make focused changes related only to that issue.
4. Follow the existing code style and folder structure.
5. Test your changes thoroughly.
6. Update documentation if necessary.

---

## 📝 Commit Message Guidelines

Use meaningful and descriptive commit messages.

### Examples

```bash
git commit -m "feat: add copy repository URL button"
git commit -m "fix: handle GitHub API rate limit errors"
git commit -m "docs: update contribution guidelines"
```

### Recommended Prefixes

* `feat:` New feature
* `fix:` Bug fix
* `docs:` Documentation changes
* `refactor:` Code cleanup or restructuring
* `test:` Adding or updating tests
* `style:` Formatting or styling changes

---

## 🚀 Submitting a Pull Request

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Open a Pull Request

Create a pull request against the `main` branch.

### 3. Link the Related Issue

Include the issue number in your PR description.

```text
Closes #12
```

### 4. Fill Out the PR Template

Provide all required details and screenshots if applicable.

### 5. Wait for Review

Project maintainers will review your changes and may request improvements.

---

## ✅ Pull Request Checklist

Before submitting your PR, ensure that:

* [ ] The code builds successfully.
* [ ] Changes are tested locally.
* [ ] Documentation is updated if needed.
* [ ] The PR is linked to an issue.
* [ ] No unrelated files are included.
* [ ] Commit messages are clear and meaningful.

---

## 🏷️ Issue Labels

This project uses the following labels:

* `good first issue`
* `help wanted`
* `bug`
* `enhancement`
* `documentation`
* `frontend`
* `backend`
* `testing`
* `gssoc26`

---

## 💡 Tips for New Contributors

* Start with `good first issue`.
* Ask questions if anything is unclear.
* Keep pull requests focused on one issue.
* Write clean, readable code.
* Be open to feedback and suggestions.

---

## 🆘 Need Help?

If you need assistance:

* Open a GitHub issue
* Start a discussion
* Reach out through the GSSoC Discord server

We are happy to help you get started.

---

## 🙌 Thank You

Thank you for taking the time to contribute to RepoReaper & StarSweeper. Your contributions help make this project better for developers everywhere.

Happy Coding! 🚀
