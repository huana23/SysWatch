# 📊 SysWatch 

Dashboard giám sát & quản lý hệ thống thương mại điện tử. Là bảng điều khiển giám sát hệ thống thời gian thực, giúp bạn theo dõi hiệu suất, sức khỏe máy chủ và hạ tầng mạng một cách trực quan và dễ hiểu.

---

## ⚡ Tính năng nổi bật

- ⚡ Realtime monitoring: CPU, RAM, Disk, Network
- 🚨 Smart alerts khi vượt ngưỡng
- 📈 Dashboard trực quan với charts & analytics
- 🕓 Lưu trữ & xem lại lịch sử dữ liệu
- 🔐 RBAC (Role-Based Access Control)
- 🎨 UI hiện đại, hỗ trợ Dark Mode
- 🧩 Modular & dễ mở rộng

---


## 📋 Mô tả dự án

SysWatch là một ứng dụng web được xây dựng để quản lý và giám sát hệ thống thương mại điện tử:

- 📊 Theo dõi sức khỏe hệ thống (System Health)
- 👥 Quản lý người dùng & đối tác  
- 💬 Quản lý chăm sóc khách hàng  
- 📈 Theo dõi hiệu suất marketing  
- 🔐 Kiểm soát truy cập & phân quyền (RBAC)  

---

## 🏗️ Kiến trúc & Công nghệ

### Frontend
- Next.js 13 (App Router) + React + TypeScript
- Tailwind CSS, SCSS, shadcn/ui, Radix UI
- Lucide Icons
- React Context / Hooks cho state management

### Backend
- Next.js API routes + Socket.IO (Realtime)
- PostgreSQL + Prisma ORM
- JWT + Bcrypt (auth + RBAC)
- Redis + BullMQ (tùy chọn cho alerts & jobs)

---

## 📁 Cấu trúc dự án
```
SysWatch/
├── backend/              # Backend Next.js
│   ├── src/app/api/
│   │   ├── auth/         # Login / Register / RBAC
│   │   ├── metrics/      # Metrics CRUD
│   │   ├── alerts/       # Alerts / notifications
│   │   └── users/        # User management
│   ├── src/lib/          # DB, auth utils, socket
│   ├── package.json
│   └── tsconfig.json
|
├── frontend/
├── app/                # Next.js App Router pages
│   ├── dashboard/      # Dashboard pages
│   ├── settings/       # Settings pages
│   ├── layout.tsx      # App layout (Navbar, Sidebar)
│   └── page.tsx        # Home / landing page
├── components/         # Reusable UI components (shadcn/ui)
├── public/             # Static assets (images, icons)
├── styles/             # Global styles & Tailwind overrides
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation
│ 
├── README.md
└── .gitignore
```


---

## 🛠️ Yêu cầu hệ thống

- Node.js >= 18
- npm >= 8 hoặc yarn
- PostgreSQL >= 14
- Redis (tùy chọn nếu dùng BullMQ)
- Trình duyệt hiện đại (Chrome, Edge, Firefox)


---

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd frontend
```

---


### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn

```

---

### 3. Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev


```

---


### 3. Thiết lập environment variables

Tạo file .env cho backend:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/syswatch"
JWT_SECRET="your_jwt_secret"
REDIS_URL="redis://localhost:6379"   # nếu dùng BullMQ
```


Tạo file .env.local cho frontend (nếu cần):
```bash
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
``` 

### 💻 Scripts chính

| **Script**         | **Mô tả**                              |
| -----------------  | -------------------------------------  |
| `npm run dev`      | Chạy dev server                        |
| `npm run build`    | Build production                       |
| `npm run start`    | Chạy production build                  |
| `npm run lint`     | Kiểm tra code style                    |
| `npm run format`   | Format code (nếu setup Prettier)       |

👉 Backend chạy tại : http://localhost:3000
👉 Frontend chạy tại: http://localhost:3001

---

🌐 Deployment

Dự án có thể deploy trên:

- Vercel (tích hợp tốt với Next.js)
- Netlify (build: npm run build, publish: out/)
- Docker (tùy chỉnh Dockerfile cho Next.js)


---
    

### 🧱 Các route chính (App Router)
👉 Backend API

| Route                | Method   | Mô tả                  |
| -------------------- | -------- | ---------------------- |
| `/api/auth/login`    | POST     | Login + JWT            |
| `/api/auth/register` | POST     | Register user          |
| `/api/users`         | GET/POST | User management        |
| `/api/metrics`       | GET/POST | Metrics CRUD           |
| `/api/alerts`        | GET/POST | Alerts / notifications |



👉 Frontend routes
| Route               | Mô tả                     |
| ------------------- | ------------------------- |
| `/`                 | Dashboard hệ thống        |
| `/health`           | System Health             |
| `/partners`         | Quản lý đối tác           |
| `/customer-service` | Chăm sóc khách hàng       |
| `/marketing`        | Marketing analytics       |
| `/access-control`   | Kiểm soát truy cập (RBAC) |



👉  Các route khác có thể được thêm theo nhu cầu dự án.


## 📝 Ghi chú
- Dự án sử dụng Next.js App Router
- UI components chuẩn từ shadcn/ui
- Responsive và hỗ trợ dark mode
- Lưu ý không trộn npm và yarn trong cùng một dự án  

 
