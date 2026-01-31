// cart.js TN
let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];

function luuGioHang() {
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
}

function formatVND(tien) {
    return tien.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND"
    });
}

function themVaoGio(id) {
    const slInput = document.getElementById(`sl-${id}`);
    let soLuong = Number(slInput.value);

    if (!soLuong || soLuong < 1) {
        alert("Số lượng không hợp lệ!");
        slInput.value = 1;
        return;
    }

    const doanvat = danhsachdav.find(h => h.id === id);
    const item = gioHang.find(i => i.id === id);

    if (item) {
        item.soLuong += soLuong;
    } else {
        gioHang.push({ ...doanvat, soLuong: soLuong });
    }

    luuGioHang();
    alert("Đã thêm vào giỏ hàng");
}
function hienThiGioHang() {
    const body = document.getElementById("gioHangBody");
    if (!body) return;

    body.innerHTML = ""; 
    let tong = 0;

    gioHang.forEach(item => {
        const tr = document.createElement("tr");

        // 1. Cột Ảnh
        const tdHinh = document.createElement("td");
        const hinh = document.createElement("img");
        hinh.src = item.hinh;
        hinh.width = 50;
        tdHinh.appendChild(hinh);

        // 2. Cột Tên
        const ten = document.createElement("td");
        ten.innerText = item.ten;

        // 3. Cột Đơn giá (MỚI THÊM)
        const giaLe = document.createElement("td");
        giaLe.innerText = formatVND(item.gia); 
        giaLe.style.fontWeight = "bold";

        // 4. Cột Số lượng
        const sl = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.value = item.soLuong;
        input.min = 1;
        input.className = "sl-input"; // Thêm class để dễ chỉnh CSS
        input.onchange = () => {
            if (input.value < 1 || !input.value) input.value = 1;
            item.soLuong = Number(input.value);
            luuGioHang();
            hienThiGioHang();
        };
        sl.appendChild(input);

        // 5. Cột Thành tiền
        const tien = document.createElement("td");
        const thanhTien = item.soLuong * item.gia;
        tien.innerText = formatVND(thanhTien);
        tien.style.color = "#ff6f61";
        tong += thanhTien;

        // 6. Cột Xóa
        const xoa = document.createElement("td");
        const btnXoa = document.createElement("button");
        btnXoa.innerText = "❌";
        btnXoa.className = "btn-xoa";
        btnXoa.onclick = () => {
            gioHang = gioHang.filter(i => i.id !== item.id);
            luuGioHang();
            hienThiGioHang();
        };
        xoa.appendChild(btnXoa);

        // Gắn các cột vào hàng TR (Lưu ý thứ tự phải khớp với THEAD)
        tr.appendChild(tdHinh);
        tr.appendChild(ten);
        tr.appendChild(giaLe); // Đơn giá nằm đây
        tr.appendChild(sl);
        tr.appendChild(tien);
        tr.appendChild(xoa);

        body.appendChild(tr);
    });

    // Hiển thị tổng tiền cuối cùng
    document.getElementById("tongTien").innerText = "Tổng cộng: " + formatVND(tong);
}
// Hàm xóa sạch toàn bộ giỏ hàng
function xoaTatCaGioHang() {
    // Hiển thị hộp thoại xác nhận để tránh người dùng bấm nhầm
    const xacNhan = confirm("Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?");
    
    if (xacNhan) {
        gioHang = []; // Gán mảng giỏ hàng về rỗng
        luuGioHang(); // Lưu lại vào localStorage
        hienThiGioHang(); // Vẽ lại giao diện (sẽ hiện giỏ hàng trống)
        alert("Đã xóa toàn bộ giỏ hàng!");
    }
}