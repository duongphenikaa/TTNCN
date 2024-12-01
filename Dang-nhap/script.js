document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (username && password && role) {
        alert(`Tên đăng nhập: ${username}\nChức vụ: ${role}`);
        // Xử lý đăng nhập ở đây
        if (role === 'ketoan' && username === 'admin' && password === '123') {
            window.location.href = '../Ke-toan/index.html';
        } else if (role === 'truongphong' && username === 'admin' && password === '123') {
            window.location.href = '../Truong-phong/index.html';
        } else if (role === 'nhanvien' && username === 'admin' && password === '123') {
            window.location.href = '../Nhan-vien/index.html';
        } else {
            alert('Chức vụ không hợp lệ.');
        }
    } else {
        alert('Vui lòng điền đầy đủ thông tin.');
    }
});
