function formatVND(tien) {
    return tien.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function hienthidav(loaiChon = "tatca") {
    const container = document.getElementById("dsdoanvat");
    if (!container) return;
    container.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    const danhSachLoc = loaiChon === "tatca" ? danhsachdav : danhsachdav.filter(item => item.loai === loaiChon);

    danhSachLoc.forEach(dav => {
        const card = document.createElement("div");
        card.className = "card";

        // Tạo thẻ Link cho ảnh
        const imgLink = document.createElement("a");
        imgLink.href = `chitiet-sanpham.html?id=${dav.id}`;
        const img = document.createElement("img");
        img.src = dav.hinh;
        img.alt = dav.ten;
        imgLink.appendChild(img);

        // Tạo thẻ Link cho tên
        const tenLink = document.createElement("a");
        tenLink.href = `chitiet-sanpham.html?id=${dav.id}`;
        tenLink.style.textDecoration = "none";
        const ten = document.createElement("h3");
        ten.textContent = dav.ten;
        ten.style.color = "#333";
        tenLink.appendChild(ten);

        const khoiluong = document.createElement("p");
        khoiluong.textContent = "Khối lượng: " + dav.khoiluong;

        const gia = document.createElement("p");
        gia.className = "gia";
        gia.textContent = "Giá: " + formatVND(dav.gia);

        const input = document.createElement("input");
        input.type = "number";
        input.id = `sl-${dav.id}`;
        input.value = 1;
        input.min = 1;

        const btnThem = document.createElement("button");
        btnThem.className = "btn-them";
        btnThem.textContent = "Thêm vào giỏ";
        btnThem.onclick = () => themVaoGio(dav.id);

        card.appendChild(imgLink);
        card.appendChild(tenLink);
        card.appendChild(khoiluong);
        card.appendChild(gia);
        card.appendChild(input);
        card.appendChild(btnThem);
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}