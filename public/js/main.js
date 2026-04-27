document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. INITIALIZE LENIS (Smooth Scroll) ---
    window.lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    })

    // Integrate Lenis with ScrollTrigger
    function raf(time) {
        window.lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    window.lenis.on('scroll', ScrollTrigger.update)

    // Stop Lenis during loading
    window.lenis.stop();

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

    window.lenis.on('scroll', (e) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (e.animatedScroll / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Nav shadow on scroll
        if (e.animatedScroll > 50) {
            nav.classList.add('shadow-lg', 'bg-cream/95');
            nav.classList.remove('bg-cream/80');
        } else {
            nav.classList.remove('shadow-lg', 'bg-cream/95');
            nav.classList.add('bg-cream/80');
        }

        // Back to top button
        if (e.animatedScroll > 500) {
            backToTop.classList.remove('translate-y-24', 'opacity-0');
        } else {
            backToTop.classList.add('translate-y-24', 'opacity-0');
        }
    });

    backToTop.addEventListener('click', () => {
        window.lenis.scrollTo(0);
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
            const target = this.getAttribute('href');
            window.lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        });
    });

});
