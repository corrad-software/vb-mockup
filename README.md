# NAS - Vibecode Prototype

A Nuxt 3 application for rapid UI/UX prototyping and frontend development. This is a development sandbox for building and testing interfaces with modern web technologies.

## 🚀 Features

- **🎨 Modern UI Components** - Built with TailwindCSS and custom design system
- **📱 Responsive Design** - Mobile-first approach with modern UX patterns
- **⚡ Hot Reload** - Instant feedback during development
- **🎯 Component Library** - Pre-built components following design system guidelines

## 📋 Prerequisites

- Node.js 18+
- Yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Setup

```bash
# Copy environment template (if needed)
cp .env.example .env
```

### 3. Start Development Server

```bash
yarn dev
```

Your application will be available at `http://localhost:3000`

## 🐳 Docker Development

Run the development server with Docker:

```bash
docker build -t nas-vibecode .
docker run -p 3000:3000 nas-vibecode
```

## ☁️ Deploy to Coolify

1. Push your code to Git repository
2. Connect repository to Coolify
3. Set environment variables in Coolify dashboard (if needed)
4. Coolify will automatically build and deploy using the Dockerfile

## 📁 Project Structure

```
├── assets/          # Static assets (images, styles)
├── components/      # Vue components
├── composables/     # Vue composables
├── layouts/         # Application layouts
├── navigation/      # Navigation configuration
├── pages/           # Application pages and prototypes
├── plugins/         # Nuxt plugins
├── public/          # Public static files
└── stores/          # Pinia stores
```

## 🎨 Design System

This project follows a comprehensive design system documented in [.claude/CLAUDE.md](.claude/CLAUDE.md):

- **Design Tokens** - Colors, spacing, typography scales
- **Component Library** - rs-card, rs-badge, rs-button, FormKit
- **Layout Patterns** - Responsive grids, container system
- **Accessibility** - WCAG 2.2 AA compliance guidelines

### Customization
- `tailwind.config.js` - TailwindCSS configuration
- `app.config.js` - Application-specific settings
- `.claude/CLAUDE.md` - Complete design system reference

## 📖 Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [FormKit Documentation](https://formkit.com/)

---

**Built for rapid prototyping with Nuxt 3, TailwindCSS, and modern web technologies.**
