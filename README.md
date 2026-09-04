# BIM Onboarding Academy

An interactive, web-based training and assessment platform designed to teach the fundamentals of Building Information Modeling (BIM), modeling workflows, industry standards (ISO 19650, IFC, BCF, COBie), Revit taxonomy, worksharing protocols, and 3D clash coordination.

Includes:
- **Interactive 3D Clash Lab**: Navisworks-style clash detective & BCF issue logging simulator.
- **Central Model Worksharing Simulator**: Real-time multi-user synchronizing, borrowing, and workset relinquishing simulator.
- **BIM Taxonomy & LOD Explorer**: Visual Category > Family > Type > Instance hierarchy and LOD 100–500 detailer.
- **Interactive Flashcards & Glossary**: Comprehensive dictionary of industry terms with interview tips.
- **Verification Dashboard & Readiness Certificate**: Generates a shareable, printable Certificate of Onboarding Readiness.
- **AI BIM Mentor**: Day 1 coaching for junior BIM technicians and coordinators.

---

## 🚀 Quickstart Guide for Ubuntu Linux (Intel ThinkPad)

This guide walks you through uploading the app to GitHub, installing Docker on your Ubuntu ThinkPad, and running the Web GUI locally on `http://localhost:3000`.

---

### Step 1: Upload / Export the Project to GitHub

You can publish this project to GitHub using either of these two methods:

#### Method A: Direct Export from Google AI Studio (Easiest)
1. In the Google AI Studio interface, click the **Settings / More Options** menu (top right or project menu).
2. Select **Export to GitHub** (or **Download as ZIP**).
3. Connect your GitHub account and choose or create a new repository name (e.g. `bim-onboarding-academy`).
4. If you chose ZIP download: extract the ZIP into a folder on your ThinkPad, open a terminal in that folder, and push using:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of BIM Onboarding Academy"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/bim-onboarding-academy.git
   git push -u origin main
   ```

#### Method B: Push directly from your terminal
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit of BIM Onboarding Academy"
git branch -M main

# Link to your newly created GitHub repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/bim-onboarding-academy.git

# Push to GitHub
git push -u origin main
```

---

### Step 2: Install Docker & Docker Compose on Ubuntu (Intel ThinkPad)

Open your terminal on your Ubuntu ThinkPad (`Ctrl + Alt + T`) and run the following commands:

```bash
# 1. Update package index
sudo apt update

# 2. Install Docker and the Docker Compose plugin
sudo apt install -y docker.io docker-compose-v2

# 3. Enable and start the Docker service
sudo systemctl enable --now docker

# 4. (Optional but recommended) Allow running Docker without sudo
sudo usermod -aG docker $USER

# 5. Apply the group change without logging out
newgrp docker

# 6. Verify installation
docker --version
docker compose version
```

---

### Step 3: Clone from GitHub & Run with Docker

Clone your repository to your ThinkPad and start the containerized Web GUI:

```bash
# 1. Clone your repository
git clone https://github.com/<YOUR_GITHUB_USERNAME>/bim-onboarding-academy.git

# 2. Enter the directory
cd bim-onboarding-academy

# 3. (Optional) Configure environment variables
cp .env.example .env
# If you have a Gemini API key for live AI mentor responses, you can add it to .env:
# nano .env

# 4. Build and start the container in the background
docker compose up --build -d
```

---

### Step 4: Open the Web GUI in Your Browser

Once the container starts, open your web browser (Chrome, Firefox, Edge) on your Ubuntu ThinkPad and navigate to:

👉 **[http://localhost:3000](http://localhost:3000)**

You will see the full BIM Onboarding Academy platform running locally.

---

### Step 5: Managing the Docker Application

Use these handy commands in your terminal from inside the project folder:

- **Check container status**:
  ```bash
  docker compose ps
  ```

- **View live server and build logs**:
  ```bash
  docker compose logs -f
  ```

- **Stop the application**:
  ```bash
  docker compose down
  ```

- **Restart the application**:
  ```bash
  docker compose restart
  ```

- **Update after making changes on GitHub**:
  ```bash
  git pull origin main
  docker compose up --build -d
  ```

---

## 🛠️ Alternative: Running Without Docker (Native Node.js on Ubuntu)

If you prefer to run directly on your Ubuntu machine without Docker:

```bash
# 1. Install Node.js (v20 or v22 LTS)
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Verify Node and npm
node -v   # Should be v20.x or v22.x
npm -v

# 3. Install dependencies
cd bim-onboarding-academy
npm install

# 4. Development mode (with live reload)
npm run dev

# 5. OR Production build & run:
npm run build
npm start
```
Then visit `http://localhost:3000` in your browser.

---

## ⚙️ Environment Variables (Optional)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Local port for the web application | `3000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `production` |
| `GEMINI_API_KEY` | (Optional) Google Gemini API key for dynamic AI BIM Mentor replies | Built-in offline domain knowledge base |

---

## 📦 System Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Lucide Icons, Canvas Confetti
- **Backend API**: Express server serving both REST API endpoints and production SPA assets
- **Platform Compatibility**: Linux x86_64 (Intel ThinkPad), ARM64, macOS, Windows Docker Desktop
- **Design Archetype**: Bento Grid Dark Theme (`#0B0E14` / `#101522`)
