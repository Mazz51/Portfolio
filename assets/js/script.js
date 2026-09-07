document.addEventListener("DOMContentLoaded", function() {

    /* ========================================================
       0. HAPUS CLASS "is-preload" SETELAH HALAMAN SELESAI DIMUAT
          (Tanpa ini, SEMUA animasi & transisi di halaman mati total,
          karena CSS body.is-preload mematikan semuanya secara paksa)
       ======================================================== */
    window.addEventListener("load", function() {
        window.setTimeout(function() {
            document.body.classList.remove("is-preload");
        }, 100);
    });

    function pasangBackground(selector, overlayGradient) {
        document.querySelectorAll(selector).forEach(function(el) {
            const path = el.getAttribute('data-bg');
            if (path) {
                el.style.backgroundImage = overlayGradient + ", url('" + path + "')";
            }
        });
    }

    pasangBackground('#banner', 'linear-gradient(rgba(18, 23, 28, 0.45), rgba(18, 23, 28, 0.55))');
    pasangBackground('#two .spotlight', 'linear-gradient(rgba(15, 20, 25, 0.55), rgba(15, 20, 25, 0.55))');

    /* ========================================================
       1. EFEK HEADER TRANSPARAN KE SOLID SAAT SCROLL
       ======================================================== */
    const header = document.getElementById("header");
    const banner = document.getElementById("banner");

    window.addEventListener("scroll", function() {
        // Jika scroll melewati tinggi banner (layar pertama), header jadi gelap
        if (window.scrollY > (banner.offsetHeight - 50)) {
            header.classList.remove("alt");
            header.classList.add("reveal");
        } else {
            header.classList.add("alt");
            header.classList.remove("reveal");
        }
    });

    /* ========================================================
       3. ANIMASI FADE IN SAAT SCROLL (Intersection Observer)
       ======================================================== */
    const faders = document.querySelectorAll('.fade-up-element');

    const appearOptions = {
        threshold: 0.2, // Elemen mulai muncul saat 20% bagiannya terlihat di layar
        rootMargin: "0px 0px -50px 0px" 
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Jika belum terlihat, jangan lakukan apa-apa
            } else {
                entry.target.classList.add('is-visible'); // Tambahkan class untuk memicu CSS animasi
                appearOnScroll.unobserve(entry.target); // Hentikan observasi agar animasi hanya jalan 1x
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});