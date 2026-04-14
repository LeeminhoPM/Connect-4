# Connect4 React

## 🚀 Hướng dẫn khởi chạy dự án

Dự án này sử dụng React và Vite.

### ⚙️ Yêu cầu môi trường

- Node.js: phiên bản khuyến nghị **v18.x** hoặc **v20.x**
- npm hoặc yarn

> Kiểm tra phiên bản Node.js:
>
> ```bash
> node --version
> ```

### 📦 Các bước cài đặt

1. Clone repository về máy:

```bash
git clone https://github.com/LeeminhoPM/Connect-4.git
```

2. Chuyển vào thư mục dự án:

```bash
cd connect4
```

3. Cài đặt dependencies:

Với npm:

```bash
npm install
```

Hoặc với yarn:

```bash
yarn install
```

### ▶️ Chạy project

Khởi động dev server:

```bash
npm run dev
```

Hoặc với yarn:

```bash
yarn dev
```

Sau khi chạy, mở trình duyệt và truy cập:

```text
http://localhost:5173
```

### 🏗️ Build project

Tạo bản build cho production:

```bash
npm run build
```

Hoặc với yarn:

```bash
yarn build
```

Thư mục output sau khi build:

- `dist`

### 🔍 Preview build

Để xem trước bản build:

```bash
npm run preview
```

Hoặc với yarn:

```bash
yarn preview
```

Mở trình duyệt ở địa chỉ được hiển thị sau khi chạy lệnh.

### ⚠️ Lưu ý

- Nếu port bị trùng: đóng ứng dụng đang dùng port đó, hoặc chỉ định port khác bằng cách thêm `--port`:

```bash
npm run dev -- --port 5174
```

- Nếu gặp lỗi thiếu `node_modules`:
    - Chạy lại `npm install` hoặc `yarn install`

- Nếu gặp lỗi Node.js version không tương thích:
    - Cập nhật Node.js lên phiên bản khuyến nghị

- Nếu gặp lỗi khi chạy `npm run dev` hoặc build:
    - Kiểm tra thông báo lỗi trong terminal
    - Đảm bảo đã cài đủ dependencies

---

## 📌 Tổng kết

- `npm install` hoặc `yarn install` để cài dependencies
- `npm run dev` hoặc `yarn dev` để chạy dev server
- `npm run build` hoặc `yarn build` để build
- `npm run preview` hoặc `yarn preview` để xem trước build
