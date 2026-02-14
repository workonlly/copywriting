# 🚀 Vercel + AWS EC2 Deployment Checklist

## ✅ Pre-Deployment Status

### Code Quality
- ✅ All API calls use `process.env.NEXT_PUBLIC_API_BASE_URL`
- ✅ Environment variables properly configured
- ✅ CORS headers configured in `next.config.ts`
- ✅ `.gitignore` includes `.env*` files
- ⚠️ Minor Tailwind CSS linting warnings (non-blocking)

---

## 📋 Vercel Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### 3. Configure Environment Variables in Vercel
**CRITICAL: Add these in Vercel Dashboard → Settings → Environment Variables**

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://your-ec2-ip:4000` | Replace with your EC2 URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `37769509250-jabcfh1ctl3d3t4g9grdfioon77qn5c4.apps.googleusercontent.com` | Your Google OAuth Client ID |

⚠️ **Important:** 
- Don't include `http://localhost:4000` in production
- Use your EC2 public IP or domain name
- Port 4000 must be open in EC2 security group

### 4. Deploy
Click "Deploy" and wait for build to complete (~2-3 minutes)

---

## 🖥️ AWS EC2 Backend Setup

### 1. EC2 Security Group Configuration
Open these ports in your EC2 instance:

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 4000 | TCP | 0.0.0.0/0 | Backend API |
| 80 | TCP | 0.0.0.0/0 | HTTP (optional) |
| 443 | TCP | 0.0.0.0/0 | HTTPS (optional) |
| 22 | TCP | Your IP | SSH Access |

### 2. Backend CORS Configuration
Ensure your Express backend has this CORS setup:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',           // Local development
    'https://your-vercel-app.vercel.app', // Vercel production URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. WebSocket Configuration (Socket.io)
Update your backend socket.io to allow Vercel origin:

```javascript
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://your-vercel-app.vercel.app'
    ],
    credentials: true
  },
  transports: ['websocket', 'polling']
});
```

### 4. Keep Backend Running (PM2)
```bash
# Install PM2 globally
npm install -g pm2

# Start your backend
pm2 start server.js --name "backend-api"

# Save PM2 process list
pm2 save

# Auto-restart on server reboot
pm2 startup
```

---

## 🔑 Google OAuth Configuration

### Update Authorized JavaScript Origins
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add these to **Authorized JavaScript origins**:
   - `http://localhost:3000` (for local dev)
   - `https://your-vercel-app.vercel.app` (your Vercel URL)
   - `https://your-custom-domain.com` (if using custom domain)

### Update Authorized Redirect URIs
Add these to **Authorized redirect URIs**:
   - `http://localhost:3000`
   - `https://your-vercel-app.vercel.app`

---

## 🧪 Post-Deployment Testing

### Test Checklist
After deployment, test these critical features:

- [ ] **Homepage loads** - Visit your Vercel URL
- [ ] **College selection** - Change college and verify filtering works
- [ ] **Google Login** - Click Google login button, should authenticate
- [ ] **Create Post** - Post an assignment/rental/note
- [ ] **Chat System** - Start a chat, send messages
  - [ ] Messages appear in real-time
  - [ ] Socket.io connects successfully
  - [ ] Messages persist in database
- [ ] **Bidding System** - Create and accept bids
- [ ] **Profile Pages** - View your profile and posts

### Debug Console Checks
Open browser console and verify:
- ✅ No CORS errors
- ✅ Socket.io connection successful
- ✅ API calls returning data (not 404/500)
- ✅ No authentication failures

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Update backend CORS to include Vercel URL

### Issue: Socket.io Not Connecting
**Solution:** 
1. Check EC2 port 4000 is open
2. Verify `NEXT_PUBLIC_API_BASE_URL` in Vercel env vars
3. Update backend socket CORS origins

### Issue: Google Login Fails
**Solution:**
1. Check Google Console has Vercel URL in authorized origins
2. Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is correct in Vercel

### Issue: API Returns 500 Errors
**Solution:**
1. Check backend logs: `pm2 logs backend-api`
2. Verify database connection on EC2
3. Check environment variables on backend

### Issue: Messages Not Saving
**Solution:**
1. Check BullMQ worker is running
2. Verify PostgreSQL connection
3. Check backend logs for database errors

---

## 📊 Environment Variables Summary

### Frontend (.env for Vercel)
```env
NEXT_PUBLIC_API_BASE_URL=http://your-ec2-ip:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=37769509250-jabcfh1ctl3d3t4g9grdfioon77qn5c4.apps.googleusercontent.com
```

### Backend (.env on EC2)
```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=37769509250-jabcfh1ctl3d3t4g9grdfioon77qn5c4.apps.googleusercontent.com
REDIS_URL=redis://localhost:6379
```

---

## 🎯 Final Steps

1. **Get Vercel URL** after deployment (e.g., `my-app.vercel.app`)
2. **Update EC2 backend CORS** with Vercel URL
3. **Update Google OAuth** authorized origins
4. **Test all features** using checklist above
5. **Monitor logs** in Vercel and EC2

---

## 📝 Your Specific URLs

Update these after deployment:

- **Vercel Frontend:** `https://_____________________.vercel.app`
- **EC2 Backend:** `http://_____________________:4000`
- **Database:** `postgresql://_____________________`

---

## ✨ Ready to Deploy!

Your code is ready for deployment. The only errors are Tailwind CSS suggestions that won't affect production.

**Next Steps:**
1. Push to GitHub
2. Deploy to Vercel
3. Configure environment variables
4. Set up EC2 backend
5. Update Google OAuth settings
6. Test everything!

Good luck! 🚀
