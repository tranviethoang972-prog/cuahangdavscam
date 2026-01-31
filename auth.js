// auth.js

// Chuyển đổi giữa 2 form
function chuyenForm(id) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Xử lý Đăng Ký
function xuLyDangKy() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regConfirm').value;

    if (!user || !pass) return alert("Vui lòng nhập đủ thông tin!");
    if (pass !== confirm) return alert("Mật khẩu xác nhận không khớp!");

    let dsNguoiDung = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra tên đăng nhập đã tồn tại chưa
    if (dsNguoiDung.find(u => u.username === user)) {
        return alert("Tên đăng nhập đã tồn tại!");
    }

    dsNguoiDung.push({ username: user, password: pass });
    localStorage.setItem('users', JSON.stringify(dsNguoiDung));
    
    alert("Đăng ký thành công! Hãy đăng nhập.");
    chuyenForm('loginForm');
}

// Xử lý Đăng Nhập
function xuLyDangNhap() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    let dsNguoiDung = JSON.parse(localStorage.getItem('users')) || [];

    const taiKhoan = dsNguoiDung.find(u => u.username === user && u.password === pass);

    if (taiKhoan) {
        localStorage.setItem('currentUser', JSON.stringify(taiKhoan));
        alert("Chào mừng " + user + " quay trở lại!");
        window.location.href = "index.html"; // Chuyển về trang chủ
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}