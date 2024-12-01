document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    // Giả sử dữ liệu ban đầu
    let employees = [
        { id: 'E001', name: 'Nguyen Van A', income: 22000000, dependents: 1 },
        { id: 'E002', name: 'Tran Thi B', income: 18000000, dependents: 2 }
    ];

    // Chuyển đổi giữa các phần
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            sections.forEach(section => {
                section.classList.remove('active');
            });
            const activeSection = document.querySelector(`#${this.id}-section`);
            activeSection.classList.add('active');
        });
    });

    // Xử lý form xem thông tin cá nhân
    const personalInfoForm = document.getElementById('personal-info-form');
    personalInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const taxId = document.getElementById('tax-id').value;
        const income = document.getElementById('income').value;
        const dependents = document.getElementById('dependents').value;
        const resultDiv = document.getElementById('personal-info-result');
        resultDiv.innerHTML = `<h3>Thông tin cá nhân đã được cập nhật: <br> Tên: ${name} <br> Mã số thuế: ${taxId} <br> Thu nhập: ${income} VND <br> Số người phụ thuộc: ${dependents}</h3>`;
    });

    // Xử lý form tính thử thuế
    const tryTaxForm = document.getElementById('try-tax-form');
    tryTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income-try').value);
        const personalDeduction = parseFloat(document.getElementById('personal-deduction-try').value);
        const dependentDeduction = parseFloat(document.getElementById('dependent-deduction-try').value);
        const taxableIncome = income - personalDeduction - dependentDeduction;

        let tax = 0;
        if (taxableIncome <= 5000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 10000000) {
            tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.10;
        } else {
            tax = 5000000 * 0.05 + 5000000 * 0.10 + (taxableIncome - 10000000) * 0.15;
        }

        const resultDiv = document.getElementById('try-tax-result');
        resultDiv.innerHTML = `<h3>Thuế thu nhập cá nhân dự tính: ${tax.toLocaleString()} VND</h3>`;
    });

    // Xử lý form xem lương
    const viewSalaryForm = document.getElementById('view-salary-form');
    viewSalaryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-salary').value;
        const employee = employees.find(emp => emp.id === employeeId);
        const resultDiv = document.getElementById('salary-result');
        if (employee) {
            resultDiv.innerHTML = `<h3>Lương của ${employee.name}: ${employee.income.toLocaleString()} VND</h3>`;
        } else {
            resultDiv.innerHTML = `<h3>Không tìm thấy nhân viên với mã ${employeeId}</h3>`;
        }
    });

    // Xử lý form tính thuế 1 tháng
    const monthlyTaxForm = document.getElementById('monthly-tax-form');
    monthlyTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-monthly').value;
        const month = document.getElementById('month').value;
        // Logic tính thuế theo tháng cho nhân viên
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            const taxableIncome = employee.income - 11000000 - (employee.dependents * 4400000);
            let tax = 0;
            if (taxableIncome <= 5000000) {
                tax = taxableIncome * 0.05;
            } else if (taxableIncome <= 10000000) {
                tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.10;
            } else {
                tax = 5000000 * 0.05 + 5000000 * 0.10 + (taxableIncome - 10000000) * 0.15;
            }

            const resultDiv = document.getElementById('monthly-tax-result');
            resultDiv.innerHTML = `<h3>Thuế thu nhập cá nhân phải nộp tháng ${month}: ${tax.toLocaleString()} VND</h3>`;
        } else {
            const resultDiv = document.getElementById('monthly-tax-result');
            resultDiv.innerHTML = `<h3>Không tìm thấy nhân viên với mã ${employeeId}</h3>`;
        }
    });

    // Xử lý form quyết toán thuế 1 năm
    const annualTaxForm = document.getElementById('annual-tax-form');
    annualTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-annual').value;
        const year = document.getElementById('year').value;
        // Logic quyết toán thuế theo năm cho nhân viên
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            const annualIncome = employee.income * 12;
            const personalDeduction = 11000000 * 12;
            const dependentDeduction = employee.dependents * 4400000 * 12;
            const taxableIncome = annualIncome - personalDeduction - dependentDeduction;

            let tax = 0;
            if (taxableIncome <= 60000000) {
                tax = taxableIncome * 0.05;
            } else if (taxableIncome <= 120000000) {
                tax = 60000000 * 0.05 + (taxableIncome - 60000000) * 0.10;
            } else {
                tax = 60000000 * 0.05 + 60000000 * 0.10 + (taxableIncome - 120000000) * 0.15;
            }

            const resultDiv = document.getElementById('annual-tax-result');
            resultDiv.innerHTML = `<h3>Quyết toán thuế năm ${year}: ${tax.toLocaleString()} VND</h3>`;
        } else {
            const resultDiv = document.getElementById('annual-tax-result');
            resultDiv.innerHTML = `<h3>Không tìm thấy nhân viên với mã ${employeeId}</h3>`;
        }
    });

    // Hiển thị danh sách nhân viên
    const employeesList = document.getElementById('employees-list');
    function renderEmployeesList() {
        employeesList.innerHTML = '';
        employees.forEach(employee => {
            const employeeDiv = document.createElement('div');
            employeeDiv.innerHTML = `<p>${employee.name} (Mã: ${employee.id}) - Thu nhập: ${employee.income.toLocaleString()} VND</p>`;
            employeesList.appendChild(employeeDiv);
        });
    }
    renderEmployeesList();

    // Xử lý chức năng đăng xuất
    const logoutLink = document.getElementById('logout');
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Bạn đã đăng xuất!');
        // Logic xử lý đăng xuất, ví dụ: chuyển hướng tới trang đăng nhập
        window.location.href = 'login.html'; // Giả sử có một trang đăng nhập tên là login.html
    });
});
