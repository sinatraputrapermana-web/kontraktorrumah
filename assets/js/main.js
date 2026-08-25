/**
* Template Name: Constructo
* Template URL: https://bootstrapmade.com/constructo-bootstrap-construction-template/
* Updated: Aug 30 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();

/*
  WhatsApp Quote Form Handler
  ---------------------------
  Form ini murni template statis (Bootstrap), sehingga TIDAK dihubungkan
  ke backend/database (forms/get-a-quote.php) yang menyebabkan error
  "405 Method Not Allowed". Sebagai gantinya, saat tombol
  "Kirim Permintaan Penawaran" ditekan, data isian form dirangkai
  menjadi pesan lalu dibuka langsung ke WhatsApp nomor yang ditentukan.
*/

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('quoteForm');
  if (!form) return;

  // Nomor WhatsApp tujuan (format internasional tanpa "+")
  var waNumber = '6288989643555';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameField = form.querySelector('[name="name"]');
    var emailField = form.querySelector('[name="email"]');
    var phoneField = form.querySelector('[name="phone"]');
    var typeField = form.querySelector('[name="type"]');
    var messageField = form.querySelector('[name="message"]');

    var typeText = '';
    if (typeField && typeField.selectedIndex > -1) {
      typeText = typeField.options[typeField.selectedIndex].text;
    }

    var lines = [
      'Halo, saya ingin menanyakan penawaran proyek rumah.',
      '',
      'Nama: ' + (nameField ? nameField.value : '-'),
      'Email: ' + (emailField ? emailField.value : '-'),
      'No. Telepon: ' + (phoneField ? phoneField.value : '-'),
      'Jenis Proyek: ' + (typeText || '-'),
      'Detail Proyek: ' + (messageField ? messageField.value : '-')
    ];

    var text = encodeURIComponent(lines.join('\n'));
    var waUrl = 'https://wa.me/' + waNumber + '?text=' + text;

    // Tampilkan pesan konfirmasi terkirim (elemen ini sudah ada di form)
    var sentMessage = form.querySelector('.sent-message');
    var loading = form.querySelector('.loading');
    var errorMessage = form.querySelector('.error-message');

    if (loading) loading.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    if (sentMessage) sentMessage.style.display = 'block';

    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');

    // Reset form setelah beberapa saat
    setTimeout(function () {
      form.reset();
      if (sentMessage) sentMessage.style.display = 'none';
    }, 3000);
  });
});

/*
  Gallery Page Script
  -------------------
  - Filter galeri berdasarkan kategori (Semua / Rumah Baru / Renovasi / Interior)
  - Inisialisasi GLightbox (vendor library yang sudah ada di template)
    supaya foto galeri bisa dibuka dalam mode lightbox saat diklik.
*/

document.addEventListener('DOMContentLoaded', function () {

  // --- Filter Kategori ---
  var filterButtons = document.querySelectorAll('.gallery-filters [data-filter]');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });
      button.classList.add('active');

      var filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // --- Lightbox Foto ---
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.gallery-lightbox',
      touchNavigation: true,
      loop: true
    });
  }

});

/* ==========================================================
   Photo Lightbox
   Klik elemen dengan class "photo-zoomable" untuk melihat
   foto dalam ukuran lebih besar.
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.createElement('div');
  overlay.className = 'photo-lightbox-overlay';
  overlay.innerHTML = '<button class="photo-lightbox-close" aria-label="Tutup">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);

  var overlayImg = overlay.querySelector('img');
  var closeBtn = overlay.querySelector('.photo-lightbox-close');

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.photo-zoomable').forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(el.getAttribute('src'), el.getAttribute('alt'));
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});

/* ==========================================================
   Photo Lightbox
   Panggil openPhotoLightbox(src, alt) langsung dari atribut
   onclick pada elemen foto untuk memunculkan pop up.
   ========================================================== */
(function () {
  var overlay = null;
  var overlayImg = null;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'photo-lightbox-overlay';
    overlay.innerHTML = '<button type="button" class="photo-lightbox-close" aria-label="Tutup">&times;</button><img src="" alt="">';
    document.body.appendChild(overlay);

    overlayImg = overlay.querySelector('img');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePhotoLightbox();
    });
    overlay.querySelector('.photo-lightbox-close').addEventListener('click', closePhotoLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePhotoLightbox();
    });
  }

  window.openPhotoLightbox = function (src, alt) {
    if (!overlay) buildOverlay();
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closePhotoLightbox = function () {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
})();

/* =======================================================
   CUSTOM ENHANCE — Kontraktor Rumah
   File JS tambahan (terpisah dari main.js) untuk:
   1. Animasi angka statistik (count-up) saat terlihat di layar
   2. Efek reveal halus saat scroll
   3. Efek ripple pada tombol utama
   4. Efek parallax ringan pada gambar hero
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Count-up angka statistik ---------- */
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const countSelectors = [
    '.badge-item .count',
    '.achievement-box h3',
    '.achievements-banner .achievement-item h3'
  ];
  const countEls = document.querySelectorAll(countSelectors.join(','));

  if ('IntersectionObserver' in window && countEls.length) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ---------- 2. Scroll reveal halus ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-item, .cert-card, .team-card, .testimonial-slide, .achievement-box'
  );
  revealTargets.forEach(el => el.classList.add('kr-reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kr-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('kr-visible'));
  }

  /* ---------- 3. Efek ripple pada tombol utama ---------- */
  const rippleButtons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-cta, .cta-container .btn'
  );

  rippleButtons.forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;

      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.45)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform .6s ease, opacity .6s ease';
      ripple.style.opacity = '1';

      btn.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 4. Parallax ringan pada gambar hero ---------- */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.matchMedia('(min-width: 992px)').matches) {
    document.querySelector('.hero.section')?.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      heroImage.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      heroImage.style.transition = 'transform .2s ease-out';
    });
  }

});

/* =======================================================
   CUSTOM ENHANCE — Kontraktor Rumah
   File JS tambahan (terpisah dari main.js) untuk:
   1. Animasi angka statistik (count-up) saat terlihat di layar
   2. Efek reveal halus saat scroll
   3. Efek ripple pada tombol utama
   4. Efek parallax ringan pada gambar hero
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Count-up angka statistik ---------- */
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const countSelectors = [
    '.badge-item .count',
    '.achievement-box h3',
    '.achievements-banner .achievement-item h3'
  ];
  const countEls = document.querySelectorAll(countSelectors.join(','));

  if ('IntersectionObserver' in window && countEls.length) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ---------- 2. Scroll reveal halus ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-item, .cert-card, .team-card, .testimonial-slide, .achievement-box'
  );
  revealTargets.forEach(el => el.classList.add('kr-reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kr-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('kr-visible'));
  }

  /* ---------- 3. Efek ripple pada tombol utama ---------- */
  const rippleButtons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-cta, .cta-container .btn, .cta-simple-btn'
  );

  rippleButtons.forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;

      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.45)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform .6s ease, opacity .6s ease';
      ripple.style.opacity = '1';

      btn.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 4. Parallax ringan pada gambar hero ---------- */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.matchMedia('(min-width: 992px)').matches) {
    document.querySelector('.hero.section')?.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      heroImage.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      heroImage.style.transition = 'transform .2s ease-out';
    });
  }

});

/* =======================================================
   CUSTOM ENHANCE — Kontraktor Rumah
   File JS tambahan (terpisah dari main.js) untuk:
   1. Animasi angka statistik (count-up) saat terlihat di layar
   2. Efek reveal halus saat scroll
   3. Efek ripple pada tombol utama
   4. Efek parallax ringan pada gambar hero
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Count-up angka statistik ---------- */
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const countSelectors = [
    '.badge-item .count',
    '.achievement-box h3',
    '.achievements-banner .achievement-item h3'
  ];
  const countEls = document.querySelectorAll(countSelectors.join(','));

  if ('IntersectionObserver' in window && countEls.length) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ---------- 2. Scroll reveal halus ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-item, .cert-card, .team-card, .testimonial-slide, .achievement-box'
  );
  revealTargets.forEach(el => el.classList.add('kr-reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kr-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('kr-visible'));
  }

  /* ---------- 3. Efek ripple pada tombol utama ---------- */
  const rippleButtons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-cta, .cta-container .btn, .cta-simple-btn'
  );

  rippleButtons.forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;

      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.45)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform .6s ease, opacity .6s ease';
      ripple.style.opacity = '1';

      btn.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 4. Parallax ringan pada gambar hero ---------- */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.matchMedia('(min-width: 992px)').matches) {
    document.querySelector('.hero.section')?.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      heroImage.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      heroImage.style.transition = 'transform .2s ease-out';
    });
  }

});

/* =======================================================
   CUSTOM ENHANCE — Kontraktor Rumah
   File JS tambahan (terpisah dari main.js) untuk:
   1. Animasi angka statistik (count-up) saat terlihat di layar
   2. Efek reveal halus saat scroll
   3. Efek ripple pada tombol utama
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Count-up angka statistik ---------- */
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const countSelectors = [
    '.badge-item .count',
    '.achievement-box h3',
    '.achievements-banner .achievement-item h3'
  ];
  const countEls = document.querySelectorAll(countSelectors.join(','));

  if ('IntersectionObserver' in window && countEls.length) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ---------- 2. Scroll reveal halus ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-item, .cert-card, .team-card, .testimonial-slide, .achievement-box'
  );
  revealTargets.forEach(el => el.classList.add('kr-reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kr-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('kr-visible'));
  }

  /* ---------- 3. Efek ripple pada tombol utama ---------- */
  const rippleButtons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-cta, .cta-container .btn, .cta-simple-btn'
  );

  rippleButtons.forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;

      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.45)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform .6s ease, opacity .6s ease';
      ripple.style.opacity = '1';

      btn.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 650);
    });
  });

});