document.addEventListener('DOMContentLoaded', function () {

    // ==================== LOGIN PAGE ==================== //
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');

        const validUserId = "1996803";
        const validPassword = "password123";

        if (userId === validUserId && password === validPassword) {
          window.location.href = "dashboard.html";
        } else {
          errorMsg.textContent = "Invalid ID or password.";
        }
      });
    }

    // ==================== RESERVATION FORM ==================== //
    const reservationForm = document.querySelector('form[action="#"]'); // or use specific id if you add one
    if (reservationForm) {
      reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const reservation = {
          name: document.getElementById('name').value,
          nik: document.getElementById('nik').value,
          unitKerja: document.getElementById('unitKerja').value,
          topik: document.getElementById('topik').value,
          tanggal: document.getElementById('tanggal').value,
          lokasi: document.getElementById('lokasi').value,
          submittedAt: new Date().toISOString(),
        };

        let existing = JSON.parse(localStorage.getItem('insightReservations') || '[]');
        existing.push(reservation);
        localStorage.setItem('insightReservations', JSON.stringify(existing));
        alert('Reserved successfully! ✅');

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      });
    }

    // ==================== SIDEBAR TOGGLE ==================== //
    const sidebarToggle = document.getElementById('toggleSidebar');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('collapsed-sidebar');
      });
    }

  });