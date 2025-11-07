# Development mode for Coolify vibecoding
FROM node:24-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies (including dev dependencies)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Set database URL for SQLite (local file for vibecode prototype)
ENV DATABASE_URL="file:./dev.db"

# Generate Prisma Client only (skip db push to avoid build issues)
RUN npx prisma generate

# Expose port (Coolify default)
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000

# Start development server with hot reload
CMD ["yarn", "dev"]
