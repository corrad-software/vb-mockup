# VB Mockup - Setup Guide

## Prerequisites

- Node.js v24.1.0 or higher
- Yarn 1.22.22 or higher

## Setup Instructions (After Cloning from Git)

Follow these steps **exactly** to ensure the app works correctly:

### 1. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and update values as needed (especially the secrets for production).

### 2. Install Dependencies

```bash
yarn install
```

This will automatically:
- Install all node_modules
- Run `nuxt prepare` (via postinstall script)
- Generate the `.nuxt` folder with correct paths

### 3. Start Development Server

```bash
yarn dev
```

The app should now be running at `http://localhost:3000/`

## Troubleshooting

If you experience missing styles, themes, or buttons after cloning:

### Solution 1: Clean Rebuild

```bash
# Remove build artifacts
rm -rf .nuxt node_modules

# Reinstall
yarn install

# Start server
yarn dev
```

### Solution 2: Clear Browser Cache

- Hard refresh your browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)

### Solution 3: Check .env File

Make sure `.env` file exists and contains:
- `NUXT_API_BASE_URL` - Backend API URL
- `PORT` - Port number (default: 3000)
- Token secrets for authentication

## What NOT to Commit

These files/folders are gitignored (never commit them):

- `.nuxt/` - Build artifacts with absolute paths
- `node_modules/` - Dependencies
- `.env` - Environment secrets
- `user-content/` - User-generated content

## Why This Matters

The `.nuxt` folder contains TypeScript configs with **absolute paths** to your local directory. If you commit this folder, it will have wrong paths when cloned elsewhere, causing components and styles to fail loading.

The `postinstall` script ensures `.nuxt` is regenerated with correct paths after every `yarn install`.

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn generate     # Generate static site
```

## Support

If issues persist after following these steps, check:
1. Node/Yarn versions match prerequisites
2. No old `.nuxt` or `node_modules` folders exist
3. `.env` file is properly configured
