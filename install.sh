#!/usr/bin/env bash
set -e

echo "========================================================"
echo "🏗️  BIM Onboarding Academy - Automated Docker Installer"
echo "Target: Ubuntu Linux (Intel ThinkPad x86_64) | Port: 1339"
echo "========================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "📦 Docker not found. Installing Docker & Docker Compose via apt..."
  sudo apt-get update -qq
  sudo apt-get install -y docker.io docker-compose-v2
  sudo systemctl enable --now docker
  echo "✅ Docker installed and service started."
fi

# Determine whether sudo is needed for docker commands
DOCKER_CMD="docker"
if ! docker info &> /dev/null; then
  if sudo docker info &> /dev/null; then
    echo "ℹ️  Configuring docker execution with sudo..."
    DOCKER_CMD="sudo docker"
  else
    echo "⚠️ Starting docker service..."
    sudo systemctl start docker
    DOCKER_CMD="sudo docker"
  fi
fi

# Determine docker compose syntax (docker compose vs docker-compose)
if $DOCKER_CMD compose version &> /dev/null; then
  COMPOSE_CMD="$DOCKER_CMD compose"
elif command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="sudo docker-compose"
else
  echo "📦 Installing docker-compose-v2..."
  sudo apt-get update -qq && sudo apt-get install -y docker-compose-v2
  COMPOSE_CMD="$DOCKER_CMD compose"
fi

echo "🚀 Building and starting BIM Onboarding Academy container on port 1339..."
$COMPOSE_CMD up --build -d

echo ""
echo "========================================================"
echo "🎉 SUCCESS! BIM Onboarding Academy is running!"
echo ""
echo "👉 Open your browser to: http://localhost:1339"
echo "========================================================"
