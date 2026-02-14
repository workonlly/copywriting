# 🚨 URGENT: Backend CORS Configuration Needed

## Critical Issue
Your frontend at `https://www.copywriting.work` cannot communicate with backend at `https://api.copywriting.work` due to **CORS policy blocking**.

**Error:** `Access to fetch at 'https://api.copywriting.work/auth/google' from origin 'https://www.copywriting.work' has been blocked by CORS policy`

---

## ✅ Frontend Fixes Applied

### 1. Fixed Image 404 Error
- **Changed:** `/introGraphics.svg` → `/IntroGraphics.svg` (case-sensitive)

### 2. Fixed Google Button Width Warning  
- **Removed:** `width="100%"` prop (invalid format)
- Google button now uses default width

### 3. Fixed COOP Policy for OAuth
- **Changed:** COOP policy for `/login` and `/signup` routes to `unsafe-none`
- Allows Google OAuth popup to communicate with main window

---

## ⚠️ BACKEND FIXES REQUIRED (On EC2)

### Issue: CORS Not Allowing Frontend Domain

Your Express backend needs to allow requests from `https://www.copywriting.work`

### Solution: Update Backend CORS Configuration

**File:** `server.js` or wherever you configure Express

**Current (probably):**
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Update to:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',              // Local development
    'https://www.copywriting.work',       // Production frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
```

---

## 🔧 Additional Backend Checks

### 1. Socket.io CORS (if using Socket.io)

**File:** Where you initialize Socket.io server

```javascript
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://www.copywriting.work'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});
```

### 2. Verify Backend is Running on EC2

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Check if backend is running
pm2 list

# Check backend logs
pm2 logs backend-api

# Restart backend after changes
pm2 restart backend-api
```

### 3. Check EC2 Security Group

Ensure these ports are open:
- **Port 4000** (or your backend port) - Open to 0.0.0.0/0
- **Port 443** (HTTPS) - If using SSL
- **Port 80** (HTTP) - Optional redirect

---

## 🧪 Testing After Backend Update

### 1. Test CORS from Browser Console

Visit `https://www.copywriting.work` and run:

```javascript
fetch('https://api.copywriting.work/auth/google', {
  method: 'OPTIONS'
})
.then(r => console.log('CORS Headers:', r.headers))
.catch(e => console.error('CORS Error:', e));
```

**Expected:** Should see CORS headers with your frontend domain

### 2. Test API Endpoint

```javascript
fetch('https://api.copywriting.work/calls/assignment', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(r => r.json())
.then(d => console.log('Data:', d))
.catch(e => console.error('Error:', e));
```

### 3. Test Socket.io Connection

Open browser console on `https://www.copywriting.work/chats`:

```javascript
// Should see:
✅ Socket connected: [socket-id]
🏠 Room ID: [room-id]
```

**If you see connection errors:** Backend Socket.io CORS needs updating

---

## 📋 Backend Update Checklist

- [ ] Update `cors()` configuration with frontend domain
- [ ] Update Socket.io CORS (if applicable)
- [ ] Restart backend: `pm2 restart backend-api`
- [ ] Verify backend is accessible: `curl https://api.copywriting.work`
- [ ] Check backend logs: `pm2 logs backend-api`
- [ ] Test CORS from frontend browser console
- [ ] Test Google login flow
- [ ] Test API data fetching
- [ ] Test Socket.io chat functionality

---

## 🔍 Debug Commands

### Check if backend is responding
```bash
curl -I https://api.copywriting.work
```

### Test CORS headers
```bash
curl -I -X OPTIONS https://api.copywriting.work/auth/google \
  -H "Origin: https://www.copywriting.work" \
  -H "Access-Control-Request-Method: POST"
```

**Expected response should include:**
```
Access-Control-Allow-Origin: https://www.copywriting.work
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
```

### Check PM2 Status
```bash
pm2 status
pm2 logs backend-api --lines 100
```

---

## 🎯 Quick Fix Summary

**On EC2 Backend:**

1. Edit your Express server file
2. Update CORS to include `https://www.copywriting.work`
3. Save changes
4. Restart: `pm2 restart backend-api`
5. Test from frontend

**Example complete server.js CORS setup:**

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration - MUST BE BEFORE ROUTES
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://www.copywriting.work',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Your routes below...
app.use('/auth', authRoutes);
app.use('/calls', callsRoutes);
// etc...
```

---

## ✨ After Fixing Backend CORS

1. Deploy frontend changes: `git push` (Vercel will auto-deploy)
2. Test Google login
3. Test data loading on homepage
4. Test chat functionality
5. Verify all API calls work

Your frontend is now **production-ready**. Just need backend CORS update! 🚀
