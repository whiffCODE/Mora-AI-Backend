# 🧠 Mora AI – Context-Aware Corporate Knowledge Brain
---

## 🚀 Overview

**Mora AI** is a production-grade **RAG (Retrieval Augmented Generation) system** that transforms corporate SOP PDFs into an intelligent, searchable knowledge assistant.
<p align="center">
  <img src="./assets/mora-ai.png"/>
</p>

> Ask questions. Get accurate answers. With exact source citations.

---

## ✨ Core Features

- 📄 **PDF Upload & Parsing**
- 🧠 **Semantic Search (MongoDB Vector Search)**
- 🤖 **Multi-LLM Support**
  - *Gemini 2.5 Flash*
    <p align="center">
	    <img src="./assets/gemini.png"/>
    </p>
  - *Groq (LLaMA 3.1)*
    <p align="center">
      <img src="./assets/llama.webp"/>
    </p>
- 🎯 **Source Citation + Highlight System**
- 💬 **Chat Memory Persistence**
- 📊 **User & Admin Analytics**
- 👑 **Role-Based Access Control**
- ⚡ **Streaming Responses (SSE Ready)**

---

## 🧠 Architecture

```text
PDF → Chunk → Embedding → MongoDB Vector Search
          ↓
      Query → Retrieve Context → LLM → Answer + Sources
```

---


**🛠️ Tech Stack**
| **Layer**           | **Technology**                             |
| ------------------- | ------------------------------------------ |
|     Backend         | Node.js + Express                          |
|     Database        | MongoDB Atlas (Vector Search)              |
|     Embeddings      | Xenova Transformers                        |
|     LLM             | Gemini 2.5 Flash & Groq (LLaMA 3.1)        |
|     Auth            | JWT + OTP (Nodemailer)                     |
|     File Upload     | Multer                                     |
|     PDF Parsing     | pdfjs-dist                                 |


---

**📂 Folder Structure**
```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
```

---

**⚙️ Installation**
```text
git clone https://github.com/your-username/mora-ai-backend.git
cd mora-ai-backend
npm install
```

---

**🔐 Environment Variables**
**Create .env:*
```bash
PORT=5000

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key

SUPER_ADMIN_EMAIL=careerforgepro5@gmail.com
```

---

**▶️ Run Server**
```bash
npm run dev
```

---

**📡 API Endpoints**

**🔐 Auth*
```bash
POST /api/auth/signup
POST /api/auth/verify-otp
POST /api/auth/login
GET  /api/auth/me
```

**📄 PDF*
```bash
POST /api/pdf/upload
DELETE /api/pdf/:id (Admin)
GET /api/pdf/highlight/:chunkId
```

**🤖 Query*
```bash
POST /api/query/ask
POST /api/query/ask-stream
```

**💬 Chat*
```bash
GET /api/chat/history
```

**📊 Dashboard*
```bash
GET /api/user/dashboard
GET /api/admin/analytics
```

**🎯 Highlight System*
Clicking a source returns:
```text
{
  "page": 3,
  "text": "Refund policy...",
  "startIndex": 1000
}
```
👉 Used to render exact highlight in PDF viewer.


---

**🧪 Testing Flow**
- Signup & Login
- Upload PDF
- Ask question
- Get answer + sources
- Click source → highlight

---


**📦 Deployment**
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

---

**🔥 Future Improvements**
- Real-time token streaming
- PDF text coordinate highlighting (x,y)
- Subscription system (Stripe)
- Multi-tenant enterprise support

---

**👨‍💻 Author**

Subhadip Samanta

---

**📜 License**

MIT License
```
================================================================================
[ NODE_TYPE: PROPRIETARY_SOURCE ]          [ STATUS: NON_DISTRIBUTABLE ]
================================================================================

Copyright (c) 2026 Mora AI Systems. All Rights Reserved.

RESTRICTION_LOG:
1. ACCESS_ONLY: Permission is granted strictly for the viewing and 
   personal evaluation of this software ("Mora AI").
   
2. NO_MODIFICATION: Any modification, merging, or alteration of the 
   source code is strictly prohibited.
   
3. NO_DISTRIBUTION: Sublicensing, selling, or distributing copies of 
   this software (in part or whole) is a violation of the access protocol.

4. NO_COMMERCIAL_USE: This software may not be used for commercial 
   gain without explicit, written authorization from the Origin Node.

================================================================================
[ TRACE_ID: MORA_SECURED_026 ]             [ ENCRYPTION: ACTIVE ]
================================================================================
```

