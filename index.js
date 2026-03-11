 let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function changeSlide(dir) {
        showSlide(currentSlide + dir);
    }

    function goToSlide(index) {
        showSlide(index);
    }

    // Auto-play every 5 seconds
    setInterval(() => changeSlide(1), 5000);

    // Wishlist toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            this.style.color = this.textContent === '♥' ? '#e05c5c' : '';
            this.style.borderColor = this.textContent === '♥' ? '#e05c5c' : '';
        });
    });

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-bar');
        if (window.scrollY > 10) {
            nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });