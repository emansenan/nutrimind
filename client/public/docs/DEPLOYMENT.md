# 🚀 Deployment Guide

Complete guide for deploying the **MicroMind Base SAAS Template** to production.

---

## 📋 Production Checklist

Before deploying, ensure:

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates obtained
- [ ] Domain configured
- [ ] Security settings reviewed
- [ ] Backup strategy in place

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + Database)

**Best for:** Quick deployment, automatic scaling

### Option 2: AWS (Full Stack)

**Best for:** Enterprise, full control

### Option 3: Digital Ocean App Platform

**Best for:** Simplicity, good pricing

### Option 4: Self-Hosted (VPS)

**Best for:** Maximum control, cost-effective

---

## 🔵 Option 1: Vercel + Railway

### A. Deploy Database (Railway)

1. **Create Railway Account:** <https://railway.app>

2. **Create New Project:**
   - Click "New Project"
   - Select "Provision PostgreSQL"
   - Copy connection string

3. **Get Database URL:**

   ```
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   ```

---

### B. Deploy Backend (Railway)

1. **Add Service to Project:**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Choose `server` directory as root

2. **Configure Environment Variables:**

   ```bash
   DATABASE_URL=<from-postgresql-service>
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRES_IN=7d
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://yourdomain.com
   ```

3. **Generate JWT Secret:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Set Start Command:**

   ```json
   // server/package.json
   "scripts": {
     "start": "node src/index.js"
   }
   ```

5. **Run Migrations:**
   - Railway CLI or manual:

   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

6. **Get API URL:**

   ```
   https://your-app.railway.app
   ```

---

### C. Deploy Frontend (Vercel)

1. **Create Vercel Account:** <https://vercel.com>

2. **Import Project:**
   - Click "New Project"
   - Import from GitHub
   - Select `client` directory as root

3. **Configure Build Settings:**

   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:**

   ```bash
   VITE_API_URL=https://your-backend.railway.app
   VITE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

6. **Configure Domain (Optional):**
   - Settings → Domains
   - Add custom domain: `yourdomain.com`

---

### D. Update CORS

**Edit `server/src/index.js`:**

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

**Set in Railway:**

```bash
CORS_ORIGIN=https://yourdomain.vercel.app
```

---

## 🟠 Option 2: AWS Deployment

### A. Database (AWS RDS PostgreSQL)

1. **Create RDS Instance:**
   - Go to RDS Console
   - Create Database → PostgreSQL 14
   - Instance class: db.t3.micro (free tier)
   - Storage: 20 GB
   - Enable public access
   - Create database

2. **Security Group:**
   - Allow inbound: PostgreSQL (5432)
   - Source: Your IP, EC2 security group

3. **Get Connection String:**

   ```
   DATABASE_URL=postgresql://username:password@endpoint:5432/dbname
   ```

---

### B. Backend (AWS EC2 or Elastic Beanstalk)

#### EC2 Approach

1. **Launch EC2 Instance:**
   - AMI: Ubuntu 22.04
   - Instance type: t2.micro
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **SSH into Instance:**

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

4. **Clone & Setup:**

   ```bash
   git clone <your-repo>
   cd MicroMind-Base-Template/server
   npm install
   ```

5. **Configure Environment:**

   ```bash
   nano .env
   # Add production variables
   ```

6. **Run Migrations:**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npm run prisma:seed
   ```

7. **Start with PM2:**

   ```bash
   pm2 start src/index.js --name "micromind-api"
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx Reverse Proxy:**

   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/micromind
   ```

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/micromind /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **SSL with Let's Encrypt:**

   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

---

### C. Frontend (AWS S3 + CloudFront)

1. **Build Frontend:**

   ```bash
   cd client
   npm run build
   ```

2. **Create S3 Bucket:**
   - Name: `yourdomain.com`
   - Uncheck "Block all public access"
   - Enable static website hosting

3. **Upload Files:**

   ```bash
   aws s3 sync dist/ s3://yourdomain.com
   ```

4. **Bucket Policy:**

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::yourdomain.com/*"
     }]
   }
   ```

5. **Create CloudFront Distribution:**
   - Origin: S3 bucket
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Alternate domain name (CNAME): `yourdomain.com`
   - SSL Certificate: Request from ACM

6. **Configure DNS:**
   - Add CNAME: `yourdomain.com` → CloudFront domain

---

## 🟢 Option 3: Digital Ocean

### A. Database (Managed PostgreSQL)

1. **Create Database:**
   - Database → Create → PostgreSQL 14
   - Choose plan and region

2. **Get Connection String**

---

### B. App Platform (Full Stack)

1. **Create App:**
   - Apps → Create App
   - Connect GitHub repository

2. **Configure Components:**

   **Backend:**
   - Type: Service
   - Source: `/server`
   - Build: `npm install && npx prisma generate`
   - Run: `npm start`
   - Environment variables: Add all

   **Frontend:**
   - Type: Static Site
   - Source: `/client`
   - Build: `npm run build`
   - Output: `dist`
   - Environment variables: Add VITE_*

3. **Deploy:**
   - Click "Create Resources"

---

## 🔒 Security Best Practices

### 1. Environment Variables

```bash
# NEVER commit these to Git
JWT_SECRET=<64-char-random-string>
DATABASE_URL=<secure-connection-string>
```

### 2. HTTPS Only

- Always use SSL in production
- Redirect HTTP to HTTPS

### 3. CORS Configuration

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 4. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use('/api', limiter);
```

### 5. Helmet.js

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 6. Database Security

- Use strong passwords
- Restrict IP access
- Enable SSL connections
- Regular backups

---

## 📊 Monitoring

### Application Monitoring

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring

### Server Monitoring

- **PM2 Monitor**
- **AWS CloudWatch**
- **Digital Ocean Monitoring**

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

**`.github/workflows/deploy.yml`:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./client

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        run: |
          # Railway CLI deployment
          railway up
```

---

## 💾 Backup Strategy

### Database Backups

**Automated (Railway/AWS RDS):**

- Enable automatic backups
- Retention: 7-30 days

**Manual:**

```bash
# Export database
pg_dump $DATAB ASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

### File Backups (if using S3)

- Enable versioning
- Configure lifecycle rules
- Cross-region replication

---

## 📈 Scaling Considerations

### Horizontal Scaling

- Load balancer (AWS ALB, Nginx)
- Multiple backend instances
- Session storage in Redis

### Database Scaling

- Read replicas
- Connection pooling (PgBouncer)
- Caching layer (Redis)

### CDN

- CloudFront (AWS)
- Cloudflare
- Vercel Edge Network

---

## ✅ Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Login/logout works
- [ ] API endpoints respond
- [ ] Database accessible
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Error tracking enabled
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] DNS propagated

---

## 🆘 Troubleshooting Production

### Issue: 502 Bad Gateway

**Cause:** Backend not running

**Solution:**

```bash
pm2 status
pm2 restart micromind-api
```

### Issue: Database Connection Timeout

**Cause:** Firewall/security group

**Solution:**

- Check security group rules
- Verify DATABASE_URL
- Enable SSL if required

### Issue: CORS Errors

**Cause:** Incorrect origin

**Solution:**
Update `CORS_ORIGIN` to match frontend domain

---

## 🎉 Deployment Complete

Your MicroMind Base SAAS Template is now live in production!

**Next steps:**

- Monitor logs for errors
- Set up analytics
- Configure monitoring alerts
- Plan regular backups
