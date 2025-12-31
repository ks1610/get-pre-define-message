# Bot Trả Lời Nhanh (Sidebar Extension)

Đây là một tiện ích mở rộng (Extension) dành cho trình duyệt, giúp nhân Fontline tìm kiếm và sao chép nhanh các câu trả lời mẫu từ dữ liệu **Google Sheets**.

Tiện ích hoạt động dưới dạng thanh bên (Sidebar), không làm che mất nội dung web đang xem.

## Video Demo:

[![Xem hướng dẫn](https://github.com/ks1610/get-pre-define-message/blob/master/quickans/image.png)](https://monosnap.ai/file/gcNLw9kvkBkvEzfKkzrAiY02rkD1QB)

_Nếu video không chạy, hãy bấm vào [Link dự phòng tại đây](https://github.com/ks1610/recapnote/blob/master/crispsummary.mp4)_

## Tính năng chính

* **Sidebar tiện lợi:** Hiển thị ngay bên phải màn hình, song song với trang web.
* **Dữ liệu động:** Lấy dữ liệu trực tiếp từ Google Sheets (không cần update code khi sửa nội dung).
* **Tìm kiếm tức thì:** Lọc từ khóa theo thời gian thực.
* **Hỗ trợ văn bản dài:** Hiển thị và copy tốt các đoạn văn bản có xuống dòng.
* **Phím tắt:** Mở nhanh bằng tổ hợp phím `Alt + Q`.
* **One-click Copy:** Nhấn vào câu trả lời để copy vào clipboard.

---

## Cấu trúc thư mục

Dự án bao gồm các file sau:

* `manifest.json`: File cấu hình chính (quyền hạn, tên, phiên bản).
* `sidepanel.html`: Giao diện hiển thị của thanh Sidebar.
* `style.css`: File trang trí giao diện (màu sắc, bố cục).
* `script.js`: Logic xử lý (tải dữ liệu từ Google Sheets, tìm kiếm, copy).
* `background.js`: Service worker xử lý sự kiện click vào icon extension.
* `icon.png`: Logo hiển thị của tiện ích.

---

## Hướng dẫn thiết lập dữ liệu (Google Sheets)

Trước khi cài đặt extension, bạn cần có một nguồn dữ liệu.

1.  Tạo một file **Google Sheet** mới.
2.  Nhập dữ liệu theo cấu trúc:
    * **Cột A:** Từ khóa (Keywords) - *VD: giá, bảo hành, địa chỉ*
    * **Cột B:** Câu trả lời (Answers) - *VD: Sản phẩm giá 500k...*
3.  Trên thanh menu, chọn **Tệp (File)** > **Chia sẻ (Share)** > **Công bố lên web (Publish to web)**.
4.  Trong bảng hiện ra:
    * Chọn tab **Liên kết (Link)**.
    * Đổi định dạng từ *Web page* thành **Giá trị được phân cách bằng dấu phẩy (.csv)**.
    * Nhấn **Xuất bản (Publish)**.
5.  Copy đường link `.csv` mà Google cung cấp.
6.  Mở file `script.js` trong thư mục code, dán link vừa copy vào dòng đầu tiên:
    ```javascript
    const SHEET_URL = 'DÁN_LINK_CSV_CỦA_BẠN_VÀO_ĐÂY';
    ```

---

## Hướng dẫn cài đặt vào trình duyệt

Extension này chưa được đăng lên Chrome Web Store, bạn cần cài đặt ở chế độ nhà phát triển (Developer Mode).

1.  Tải hoặc clone thư mục dự án về máy tính.
2.  Mở trình duyệt (Chrome/Edge), nhập địa chỉ:
    * Chrome: `chrome://extensions`
    * Edge: `edge://extensions`
3.  Bật chế độ **Developer mode** (Góc trên bên phải).
4.  Nhấn nút **Load unpacked** (Tải tiện ích đã giải nén).
5.  Chọn thư mục chứa code của dự án.
6.  Extension sẽ xuất hiện trên thanh công cụ.

---

## Hướng dẫn sử dụng

### 1. Mở công cụ
* **Cách 1:** Click chuột trái vào icon của extension trên thanh công cụ.
* **Cách 2:** Sử dụng tổ hợp phím tắt mặc định **`Alt + Q`**.

### 2. Tìm kiếm và Copy
1.  Sau khi mở, con trỏ chuột sẽ tự động nằm ở ô tìm kiếm.
2.  Nhập từ khóa liên quan đến vấn đề khách hỏi (ví dụ: "giá", "đổi trả").
3.  Danh sách các câu trả lời phù hợp sẽ hiện ra bên dưới.
4.  **Click chuột trái** vào ô câu trả lời bất kỳ để COPY.
5.  Dán (Paste) vào khung chat với khách hàng.

### 3. Cập nhật dữ liệu mới
Khi bạn thêm dòng mới vào Google Sheet:
1.  Chỉnh sửa file Sheet như bình thường.
2.  Đợi khoảng 1-2 phút để Google cập nhật.
3.  Tắt Extension đi bật lại (hoặc đóng mở lại Sidebar) để nạp dữ liệu mới. **Không cần cài lại extension.**

---