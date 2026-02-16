# 📘 Setup Guide

Detailed step-by-step instructions for setting up the **MicroMind Base SAAS Template**.

---

## 📋 Prerequisites

Before you begin, ensure you have:

### Required Software

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **npm** 9.0+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Optional Tools

- **Prisma Studio** (included with Prisma)
- **VS Code** (recommended IDE)
- **Postman** or **Thunder Client** (API testing)

---

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd MicroMind-Base-Template
```

---

### Step 2: Install Dependencies

#### Client (Frontend)

```bash
cd client
npm install
```

**Expected output:**

```
added 159 packages
```

#### Server (Backend)

```bash
cd ../server
npm install
```

**Expected output:**

```
added 149 packages
```

---

### Step 3: PostgreSQL Database Setup

#### Option A: Local PostgreSQL

1. **Create Database:**

   ```bash
   psql -U postgres
   CREATE DATABASE micromind_base;
   \q
   ```

2. **Verify Database:**

   ```bash
   psql -U postgres -d micromind_base
   \dt  # Should show empty (no tables yet)
   \q
   ```

#### Option B: Docker PostgreSQL

```bash
docker run --name micromind-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=micromind_base \
  -p 5432:5432 \
  -d postgres:14
```

---

### Step 4: Configure Environment Variables

#### Server Configuration

```bash
cd server
cp .env.example .env
```

**Edit `.env` file:**

```bash
# Database - UPDATE THIS
DATABASE_URL="postgresql://username:password@localhost:5432/micromind_base"

# JWT - CHANGE IN PRODUCTION
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

**Replace:**

- `username` → your PostgreSQL username (default: `postgres`)
- `password` → your PostgreSQL password
- `micromind_base` → your database name (if different)

#### Client Configuration

```bash
cd ../client
cp .env.example .env
```

**Edit `.env` file:**

```bash
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

---

### Step 5: Initialize Database

```bash
cd server
```

#### Generate Prisma Client

```bash
npx prisma generate
```

**Expected output:**

```
✔ Generated Prisma Client
```

#### Run Database Migrations

```bash
npx prisma migrate dev --name init
```

**Expected output:**

```
✔ Your database is now in sync with your schema
✔ Generated Prisma Client
```

**Verify in Database:**

```bash
psql -U postgres -d micromind_base
\dt  # Should show: users, sessions, dashboards, reports, documents, chat_history
\q
```

#### Seed Demo Data

```bash
npm run prisma:seed
```

**Expected output:**

```
🌱 Starting database seed...
✅ Created admin user: admin@micromind.com
✅ Created demo user: user@micromind.com
✅ Created sample dashboard: System Overview
✅ Created sample document: Getting Started Guide

🎉 Database seeded successfully!

📝 Demo Credentials:
   Admin: admin@micromind.com / admin123
   User:  user@micromind.com / user123
```

---

### Step 6: Verify Database Schema

Open **Prisma Studio**:

```bash
npx prisma studio
```

**Browser opens at:** `http://localhost:5555`

**Verify:**

- ✅ `users` table has 2 records
- ✅ `dashboards` table has 1 record
- ✅ `documents` table has 1 record

---

### Step 7: Start Development Servers

#### Terminal 1: Start Backend

```bash
cd server
npm run dev
```

**Expected output:**

```
🚀 MicroMind Base Template Server
📡 Server running on port 3000
🌍 Environment: development
✅ Health check: http://localhost:3000/api/health
```

**Test Health Check:**

```bash
curl http://localhost:3000/api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-02-01T14:56:00.000Z",
  "service": "MicroMind Base Template API",
  "version": "1.0.0"
}
```

#### Terminal 2: Start Frontend

```bash
cd client
npm run dev
```

**Expected output:**

```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
  ➜  press h + enter to show help
```

---

### Step 8: Access the Application

Open browser: **<http://localhost:5173>**

#### Login with Demo Credentials

**Admin User:**

- Email: `admin@micromind.com`
- Password: `admin123`

**Regular User:**

- Email: `user@micromind.com`
- Password: `user123`

---

## ✅ Verification Checklist

After setup, verify these features work:

### Authentication

- [  ] Login with admin credentials
- [ ] Login with user credentials
- [ ] Logout redirects to login
- [ ] Protected routes require authentication

### Navigation

- [ ] Sidebar navigation works
- [ ] All 7 pages accessible
- [ ] Theme toggle (dark/light) works
- [ ] Language switcher works (5 languages)

### Pages

- [ ] Dashboard loads with KPIs
- [ ] Co-Pilots page accessible
- [ ] Documents Library page loads
- [ ] Dashboards page loads
- [ ] Report Bot page loads
- [ ] Reports Explorer loads
- [ ] Settings page loads

### Features

- [ ] User profile displays correctly
- [ ] Theme persists after refresh
- [ ] Language persists after refresh
- [ ] API health check responds

---

## 🔧 Troubleshooting

### Issue: Database Connection Failed

**Error:**

```
Error: P1001: Can't reach database server
```

**Solutions:**

1. Verify PostgreSQL is running:

   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   
   # Windows
   pg_ctl status
   ```

2. Check DATABASE_URL in `.env`:
   - Correct username/password?
   - Database exists?
   - Port 5432 open?

3. Test connection:

   ```bash
   psql -U postgres -d micromind_base
   ```

---

### Issue: Prisma Client Not Generated

**Error:**

```
Error: @prisma/client did not initialize yet
```

**Solution:**

```bash
cd server
npx prisma generate
```

---

### Issue: Port 3000 Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option A: Kill process**

```bash
# macOS/Linux
lsof -t -i:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option B: Change port**
Edit `server/.env`:

```bash
PORT=3001
```

---

### Issue: Vite Port Already in Use

**Solution:**

```bash
# Press Ctrl+C and restart with different port
npm run dev -- --port 5174
```

---

### Issue: Module Not Found

**Error:**

```
Error: Cannot find module '@sdk'
```

**Solution:**

1. Verify Vite config has alias:

   ```javascript
   // client/vite.config.js
   resolve: {
     alias: {
       '@sdk': path.resolve(__dirname, './src/sdk')
     }
   }
   ```

2. Restart dev server

---

### Issue: Translations Not Loading

**Error:**
Console shows: `missingKey` warnings

**Solution:**

1. Verify translation files exist:

   ```bash
   ls client/src/locales/
   # Should show: en.json, ar.json, fr.json, de.json, sw.json
   ```

2. Check i18n config:

   ```javascript
   // client/src/i18n.js should import all files
   ```

---

## 🎓 Next Steps

After successful setup:

1. **Read [BRANDING.md](./BRANDING.md)** - Customize logos, colors, fonts
2. **Read [DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
3. **Explore the code** - Understand the structure
4. **Add custom features** - Build your application!

---

## 📚 Useful Commands

### Development

```bash
# Client
npm run dev                 # Start dev server
npm run build               # Build for production
npm run preview             # Preview production build

# Server
npm run dev                 # Start with nodemon
npm start                   # Start production server
```

### Database

```bash
npx prisma studio           # Open Prisma Studio
npx prisma generate         # Generate Prisma Client
npx prisma migrate dev      # Run migrations
npx prisma migrate reset    # Reset database (⚠️ deletes data)
npm run prisma:seed         # Seed demo data
```

### Debugging

```bash
# View server logs
cd server
npm run dev

# View Prisma queries
# Add to server/.env:
DEBUG="prisma:query"
```

---

## 🆘 Getting Help

If you encounter issues:

1. Check this guide
2. Review error messages carefully
3. Check [README.md](./README.md)
4. Verify all prerequisites are installed
5. Ensure PostgreSQL is running

---

## ✅ Setup Complete

You're now ready to start building your SAAS application!

**Happy coding! 🚀**
