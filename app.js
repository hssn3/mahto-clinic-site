// فیلتر کردن کارت‌های خدمات
const filterBtns = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    serviceCards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// انتخاب سریع خدمت از روی کارت و پر کردن فرم نوبت‌دهی
const serviceSelect = document.getElementById('serviceSelect');
document.querySelectorAll('.select-service').forEach((link) => {
  link.addEventListener('click', () => {
    const selected = link.dataset.service;
    if (serviceSelect && selected) {
      serviceSelect.value = selected;
    }
  });
});

// منوی موبایل
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// اعتبارسنجی و ثبت فرم نوبت‌دهی
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = serviceSelect.value;
    const preferredTime = document.getElementById('preferredTime').value;

    const normalizedPhone = phone
      .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      .replace(/\s+/g, '');

    if (!/^09\d{9}$/.test(normalizedPhone)) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'لطفاً شماره موبایل معتبر ۱۱ رقمی (شروع با ۰۹) وارد کنید.';
      return;
    }

    formMessage.className = 'form-message success';
    formMessage.textContent = `درخواست نوبت ${fullName} برای «${service}» در بازه ${preferredTime} با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.`;
    bookingForm.reset();
  });
}
