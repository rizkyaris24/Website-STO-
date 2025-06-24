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
  const reservationForm = document.querySelector('form[action="#"]');
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

  // ==================== CALENDAR + TABLE ==================== //
  const reservations = JSON.parse(localStorage.getItem('insightReservations') || '[]');
  const reservationDates = reservations.reduce((acc, r) => {
    acc[r.tanggal] = true;
    return acc;
  }, {});

  let currentDate = new Date();
  const calendarGrid = document.getElementById('calendarGrid');
  const agendaTableBody = document.getElementById('agendaTableBody'); // Ensure you have this tbody id

  function drawCalendar(date) {
    let html = `
      <div class="calendar-day fw-bold">Sun</div>
      <div class="calendar-day fw-bold">Mon</div>
      <div class="calendar-day fw-bold">Tue</div>
      <div class="calendar-day fw-bold">Wed</div>
      <div class="calendar-day fw-bold">Thu</div>
      <div class="calendar-day fw-bold">Fri</div>
      <div class="calendar-day fw-bold">Sat</div>
    `;

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day"></div>';
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const circleClass = reservationDates[thisDate] ? 'circle' : '';
      html += `<div class="calendar-day"><span class="${circleClass}">${d}</span></div>`;
    }

    calendarGrid.innerHTML = html;
    document.getElementById('calendarTitle').textContent =
      `${date.toLocaleString('default', {month: 'long'})} ${year}`;

    // ✅ Fill table
    fillAgendaTable(year, month + 1); // pass 1-based month to match date strings
  }

  document.getElementById('prevMonth')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); drawCalendar(currentDate);
  });

  document.getElementById('nextMonth')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); drawCalendar(currentDate);
  });

  drawCalendar(currentDate);

  // ==================== Fill Table ==================== //
  function fillAgendaTable(year, month) {
    if (!agendaTableBody) return;
    agendaTableBody.innerHTML = '';
    const currentMonthStr = `${year}-${String(month).padStart(2, '0')}`;

    reservations
      .filter(r => r.tanggal.startsWith(currentMonthStr))
      .forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.tanggal}</td><td>${r.topik}</td>`;
        agendaTableBody.appendChild(tr);
      });

    if (agendaTableBody.children.length === 0) {
      agendaTableBody.innerHTML = `<tr><td colspan="2">No agenda this month.</td></tr>`;
    }
  }

});
