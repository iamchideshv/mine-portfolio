// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Optimize ScrollTrigger performance
ScrollTrigger.config({ limitCallbacks: true });
ScrollTrigger.normalizeScroll(true);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PAGE LOAD CURTAIN ---
    const tlLoader = gsap.timeline();

    tlLoader.to("#loader-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
        .to("#loader", {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onStart: () => {
                if (window.lenis) {
                    window.lenis.start();
                    ScrollTrigger.refresh();
                }
            },
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
            }
        })
        .from(".hero-line", {
            y: 100,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power4.out"
        }, "-=0.4")
        .from(".profile-image-container", {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1")
        .from(".skill-badge", {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.8");

    // --- 2. HERO TYPEWRITER ---
    const words = ["interfaces", "experiences", "products", "websites"];
    let wordIndex = 0;

    function updateTypewriter() {
        gsap.to("#typewriter", {
            duration: 1,
            text: words[wordIndex],
            ease: "none",
            onComplete: () => {
                setTimeout(() => {
                    wordIndex = (wordIndex + 1) % words.length;
                    updateTypewriter();
                }, 2000);
            }
        });
    }
    updateTypewriter();


    // --- 3. SKILLS BLUR REVEAL ON SCROLL ---
    const skillItems = document.querySelectorAll('.skill-logo-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger by index within its parent row
                const siblings = Array.from(entry.target.parentElement.querySelectorAll('.skill-logo-item'));
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 120);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -60px 0px'
    });

    skillItems.forEach(item => revealObserver.observe(item));

    // --- 4. PROJECTS STACKING ---
    // (Handled by sticky CSS, but we add some entrance animations)
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card.querySelector(".mockup-visual"), {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });


    // --- 6. PROGRESS BARS ---
    gsap.utils.toArray(".progress-bar").forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.fromTo(bar, { width: "0%" }, {
            width: targetWidth,
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // --- 7. DIVIDER LINES ---
    gsap.utils.toArray(".divider-line").forEach(line => {
        gsap.to(line, {
            width: "100%",
            scrollTrigger: {
                trigger: line,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // --- 8. SECTION HEADINGS CLIP REVEAL ---
    gsap.utils.toArray("h2").forEach(heading => {
        gsap.from(heading, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1,
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // --- 9. JOURNEY SECTION — SCROLL ANIMATIONS ---

    // 9a. Header stagger reveal
    const journeyEyebrow = document.getElementById('journey-eyebrow');
    const journeyTitle       = document.getElementById('journey-title');
    const journeyTitleReveal = document.getElementById('journey-title-reveal-wrap');
    const journeySubtitle    = document.getElementById('journey-subtitle');

    if (journeyTitle) {
        const tlJHeader = gsap.timeline({
            scrollTrigger: {
                trigger: '#cv',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        tlJHeader
            .from(journeyEyebrow, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
            .from(journeyTitleReveal, { 
                y: 30, 
                opacity: 0, 
                filter: 'blur(10px)', 
                duration: 1, 
                ease: 'power4.out' 
            }, '-=0.3')
            .from(journeySubtitle, { y: 15, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');

        // 9a-bis. Continuous parallax and shimmer while scrolling
        gsap.to(journeyEyebrow, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '#cv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to(journeyTitle, {
            y: -60,
            scale: 0.98,
            ease: 'none',
            scrollTrigger: {
                trigger: '#cv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to(journeySubtitle, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '#cv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });

        const journeyEm = journeyTitle.querySelector('em');
        if (journeyEm) {
            gsap.to(journeyEm, {
                backgroundPosition: '200% center',
                ease: 'none',
                scrollTrigger: {
                    trigger: '#cv',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }
    }

    // 9b. Glowing spine fill — scrub with section scroll
    const spineFill = document.getElementById('journey-spine-fill');
    if (spineFill) {
        gsap.to(spineFill, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.journey-timeline-wrap',
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: 1.2,
            }
        });
    }

    // 9c. Cards: stagger in from alternating sides
    gsap.utils.toArray('.journey-item').forEach((item, i) => {
        const isLeft = item.classList.contains('journey-item--left');
        const card   = item.querySelector('.journey-card');
        const node   = item.querySelector('.journey-node-core');

        // Card slides in from its side
        gsap.from(card, {
            x: isLeft ? -70 : 70,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Node pops in with a spring
        gsap.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            delay: 0.15,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Fade in the whole item to clear the CSS opacity:0
        gsap.to(item, {
            opacity: 1,
            duration: 0.01,
            scrollTrigger: {
                trigger: item,
                start: 'top 86%',
                toggleActions: 'play none none reverse'
            }
        });

        // Subtle floating parallax while scrolling through
        gsap.to(card, {
            y: -30 + i * 5,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    });

    // 9d. Node hover — scale up on mouseenter (vanilla JS)
    document.querySelectorAll('.journey-node-core').forEach(core => {
        core.addEventListener('mouseenter', () => {
            gsap.to(core, { scale: 1.2, duration: 0.3, ease: 'back.out(2)' });
        });
        core.addEventListener('mouseleave', () => {
            gsap.to(core, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // 9e. Ambient blob slow drift
    gsap.utils.toArray('.journey-blob').forEach((blob, i) => {
        gsap.to(blob, {
            y: i % 2 === 0 ? -60 : 60,
            x: i % 3 === 0 ? 40 : -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '#cv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });
});
