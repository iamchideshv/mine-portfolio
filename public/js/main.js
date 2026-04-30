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
    const chatbotRobo = document.getElementById('chatbot-robo-container');

    window.lenis.on('scroll', (e) => {
        if (!nav) return;

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (e.animatedScroll / totalHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = `${progress}%`;

        // Nav shadow on scroll
        if (e.animatedScroll > 50) {
            nav.classList.add('shadow-lg', 'bg-cream/95');
            nav.classList.remove('bg-cream/80');
        } else {
            nav.classList.remove('shadow-lg', 'bg-cream/95');
            nav.classList.add('bg-cream/80');
        }
    });

    if (chatbotRobo) {
        // ... (rest of chatbot logic stays the same) ...
    }

    // --- 4. CONTACT FORM HANDLING (Web3Forms) ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (result.success) {
                    // Success state
                    submitBtn.classList.add('btn-success');
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';

                    // Reset after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                    }, 3000);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Failed. Try again.';
                submitBtn.style.background = '#ef4444';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // --- 5. SMOOTH SCROLLING FOR ALL ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target === '#') return;
            const targetEl = document.querySelector(target);
            if (targetEl) {
                window.lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // --- 6. LANDING PAGE GATEWAY (If on index) ---
    const goPortfolio = document.getElementById('go-portfolio');
    const goServices = document.getElementById('go-services');

    if (goPortfolio) {
        goPortfolio.addEventListener('click', () => {
            location.href = '/portfolio.html';
        });
    }

    if (goServices) {
        goServices.addEventListener('click', () => {
            location.href = '/portfolio.html#services';
        });
    }

});
