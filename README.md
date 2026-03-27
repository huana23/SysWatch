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

## 🚀 Công nghệ sử dụng

- Frontend: Next.js (App Router), React, TypeScript  
- UI Components: shadcn/ui, Radix UI  
- Styling: Tailwind CSS, SCSS  
- Icons: Lucide Icons  
- State Management: React Context / Hooks (tùy project) 

---

## 📁 Cấu trúc dự án
```
SysWatch/
frontend/
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
```


---

## 🛠️ Yêu cầu hệ thống

- Node.js >= 16  
- npm >= 8 hoặc yarn  
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


### 💻 Scripts chính

| **Script**         | **Mô tả**                              |
| -----------------  | -------------------------------------  |
| `npm run dev`      | Chạy dev server                        |
| `npm run build`    | Build production                       |
| `npm run start`    | Chạy production build                  |
| `npm run lint`     | Kiểm tra code style                    |
| `npm run format`   | Format code (nếu setup Prettier)       |


👉 Frontend chạy tại: http://localhost:3000

---

🌐 Deployment

Dự án có thể deploy trên:

- Vercel (tích hợp tốt với Next.js)
- Netlify (build: npm run build, publish: out/)
- Docker (tùy chỉnh Dockerfile cho Next.js)


---


### 🧱 Các route chính (App Router)
| **Route**           | **Mô tả**                              |
| -----------------   | -------------------------------------  |
| `/`                 | DashBoard Hệ Thống Giám Sát            |
| `/health`           | Sức Khỏe Hệ Thống                      |
| `/partners`         | Đối Tác                                |
| `/customer-service` | Chăm Sóc Khách Hàng                    |
| `/marketing`        | Tiếp Thị                               |
| `/access-control`   | Kiểm Soát Truy Cập                     |


👉  Các route khác có thể được thêm theo nhu cầu dự án.


## 📝 Ghi chú
- Dự án sử dụng Next.js App Router
- UI components chuẩn từ shadcn/ui
- Responsive và hỗ trợ dark mode
- Lưu ý không trộn npm và yarn trong cùng một dự án  

 
