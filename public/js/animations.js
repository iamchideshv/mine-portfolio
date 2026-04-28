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


    // --- 3. SKILLS PINNED SCROLL ---
    const skills = [
        { name: "Web Development", category: "Frontend", desc: "Crafting modern, responsive web applications using the latest frameworks.", percent: 95, icon: "devicon-html5-plain colored", img: "img stack/web dev.webp" },
        { name: "Python", category: "Language", desc: "Advanced scripting, automation, and data processing.", percent: 88, icon: "devicon-python-plain colored" },
        { name: "Java/DSA", category: "Language", desc: "Problem-solving and efficient algorithm design.", percent: 82, icon: "devicon-java-plain colored", img: "img stack/java.jpg" },
        { name: "Machine Learning", category: "AI/ML", desc: "Building predictive models and data-driven insights.", percent: 78, icon: "fa-solid fa-brain text-accent", img: "img stack/machine learing.webp" },
        { name: "Deep Learning", category: "AI/ML", desc: "Neural networks and complex pattern recognition.", percent: 75, icon: "fa-solid fa-microchip text-accent", img: "img stack/deep-learning.avif" },
        { name: "MS-Office", category: "Tool", desc: "Data organization, presentation, and documentation.", percent: 90, icon: "fa-solid fa-file-excel text-accent", img: "img stack/ms office logo_files/Office_logos.jpg" },
        { name: "Power BI", category: "Data Viz", desc: "Creating interactive dashboards and business intelligence reports.", percent: 85, icon: "fa-solid fa-chart-pie text-accent", img: "img stack/power-bi-new.png" },
        { name: "Stock Marketing", category: "Finance", desc: "Technical analysis and market trend prediction.", percent: 72, icon: "fa-solid fa-chart-line text-accent", img: "img stack/stock.webp" },
        { name: "HTML & CSS", category: "Frontend", desc: "Pixel-perfect layouts and responsive design.", percent: 95, icon: "devicon-css3-plain colored", img: "img stack/html and css.png" }
    ];

    // --- 3. SKILLS GRID INJECTION ---
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skills.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = "skill-card bg-white p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col items-center text-center group transition-all duration-300 hover:shadow-lg min-w-[75vw] sm:min-w-0 shrink-0 snap-center";
            
            const visualHtml = skill.img 
                ? `<div class="w-14 h-14 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                     <img src="${skill.img}" class="w-full h-full object-contain">
                   </div>`
                : `<div class="w-14 h-14 rounded-xl bg-accentLight/30 flex items-center justify-center mb-4">
                     <i class="${skill.icon} text-3xl text-accent"></i>
                   </div>`;

            card.innerHTML = `
                ${visualHtml}
                <span class="text-accent font-bold uppercase tracking-[0.2em] text-[8px] mb-2 bg-accentLight px-2 py-0.5 rounded-full">${skill.category}</span>
                <h3 class="text-xl font-bold tracking-tight text-center">${skill.name}</h3>
            `;
            
            skillsGrid.appendChild(card);
            
            // Progress bar animation
            gsap.to(card.querySelector('.skill-bar-fill'), {
                width: skill.percent + "%",
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: "#container-scroll-scene",
                    start: "top center",
                }
            });
        });
    }

    // --- 3b. CONTAINER SCROLL ANIMATION (Aceternity Style) ---
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top bottom",
            end: "top center", // Faster reveal
            scrub: 1,
        }
    });

    // Card 3D Reveal Only
    scrollTl.fromTo("#scroll-card", 
        { rotateX: 20, scale: 1.05, y: 50 },
        { rotateX: 0, scale: 1, y: 0, duration: 1, ease: "power2.out" }
    );

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
});
