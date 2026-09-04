# Multi-stage Dockerfile for BIM Onboarding Academy
# Optimized for Ubuntu Linux (Intel ThinkPad x86_64 and ARM64)

# -------------------------------------------------------------
# Stage 1: Build Application
# -------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm install

# Copy source code and config files
COPY . .

# Compile frontend static bundle and backend production bundle (dist/)
RUN npm run build

# -------------------------------------------------------------
# Stage 2: Production Runtime
# -------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install curl for healthcheck
RUN apk add --no-cache curl

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy production build outputs from builder stage
COPY --from=builder /app/dist ./dist

# Create secure non-root user
USER node

# Expose Web GUI port
EXPOSE 3000

# Health check to ensure web GUI is responsive
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Launch the compiled Node server serving both API & Web GUI
CMD ["node", "dist/server.cjs"]
