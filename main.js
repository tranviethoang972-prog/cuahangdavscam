document.addEventListener("DOMContentLoaded", () => {

    // ===== PHẦN XỬ LÝ TRANG CHỦ (INDEX.HTML) =====
    const containerDS = document.getElementById("dsdoanvat");
    if (containerDS) {
        // Chỉ gọi hiển thị danh sách nếu đang ở trang chủ
        if (typeof hienthidav === "function") {
            hienthidav();
        }
    }

    const btnXemGio = document.getElementById("btnXemGio");
    if (btnXemGio) {
        btnXemGio.onclick = () => {
            window.location.href = "giohang.html";
        };
    }

    // ===== PHẦN XỬ LÝ TRANG GIỎ HÀNG (GIOHANG.HTML) =====
    const khungGioHang = document.getElementById("gioHang");
    if (khungGioHang) {
        // Chỉ hiển thị giỏ hàng nếu đang ở đúng trang giỏ hàng
        if (typeof hienThiGioHang === "function") {
            hienThiGioHang();
        }

        // Xử lý nút Về trang chủ
        const btnVeTrangChu = document.getElementById("btnVeTrangChu");
        if (btnVeTrangChu) {
            btnVeTrangChu.onclick = () => {
                window.location.href = "index.html";
            };
        }

        // Xử lý nút Thanh toán
        const btnThanhToan = document.getElementById("btnThanhToan");
        if (btnThanhToan) {
            btnThanhToan.onclick = () => {
                if (!gioHang || gioHang.length === 0) {
                    alert("Giỏ hàng của bạn đang trống!");
                    return;
                }

                const tong = gioHang.reduce((s, i) => s + i.soLuong * i.gia, 0);
                alert("Thanh toán thành công!\nTổng cộng: " + tong.toLocaleString("vi-VN") + "đ");

                // Xóa giỏ hàng sau khi thanh toán
                localStorage.removeItem("gioHang");
                window.location.href = "index.html";
            };
        }
        // Tìm đoạn: if (khungGioHang) { ... }
    const btnXoaTatCa = document.getElementById("btnXoaTatCa");
    if (btnXoaTatCa) {
    btnXoaTatCa.onclick = () => {
        xoaTatCaGioHang();
    };
}
    }
});