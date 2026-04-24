document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. INITIALIZE LENIS (Smooth Scroll) ---
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // --- 1. INITIALIZE AOS ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // --- 2. MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        // Animate links in
        gsap.from(mobileLinks, {
            x: 50,
            opacity: 0,
            stagger: 0.1,
            delay: 0.3
        });
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // --- 3. SCROLL PROGRESS & NAV BACKGROUND ---
    const nav = document.querySelector('nav');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Nav shadow on scroll
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.remove('translate-y-24', 'opacity-0');
        } else {
            backToTop.classList.add('translate-y-24', 'opacity-0');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.classList.add('btn-success');
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
            }, 3000);
        }, 1500);
    });

    // --- 5. SMOOTH SCROLLING FOR ALL ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });
});
