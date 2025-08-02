# RepoReaper

A tool to bulk-delete GitHub repositories in just a few clicks. Fast, safe, and super simple.

## Features

- OAuth-secured GitHub authentication
- Bulk repository deletion
- Filter repositories by name, private status, and fork status
- Clean and modern UI

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub OAuth App credentials

### Environment Variables

Create `.env` file in the root directory with the following variables:

```
PORT=3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
npm install --prefix client
```

## Running the Application

### Development Mode (Separate Frontend and Backend)

Start the backend server:

```bash
npm run dev
```

Start the frontend development server in a separate terminal:

```bash
npm run dev:client
```

Access the application at http://localhost:5173

### Production Mode (Single Server)

Build the frontend:

```bash
npm run build
```

Start the production server:

```bash
npm run prod
```

Access the application at http://localhost:3000

## Deployment

The application is configured to be deployed as a single server that serves both the API and the frontend. When deploying to a platform like Render, Heroku, or Vercel, make sure to:

1. Set the `NODE_ENV` environment variable to `production`
2. Set all required environment variables in your deployment platform
3. Use the build command: `npm run build`
4. Use the start command: `npm start`

## Troubleshooting

### Authentication Issues

If you're experiencing authentication issues:

1. Make sure your GitHub OAuth App has the correct callback URL: `http://localhost:3000/auth/github/callback` for local development
2. Check that your session cookie is being set correctly (not blocked by browser settings)
3. Verify that your environment variables are set correctly

### Redirect Issues

If redirects are not working correctly:

1. Make sure you're using relative URLs in the frontend code
2. Check that the server is properly configured to serve the React app for all frontend routes
3. Verify that CORS is properly configured if you're running the frontend and backend on different ports

## License

ISC