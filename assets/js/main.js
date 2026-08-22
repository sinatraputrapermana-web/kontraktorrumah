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