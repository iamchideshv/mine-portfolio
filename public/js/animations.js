// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
        ease: "power4.inOut"
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
        { name: "Power BI", category: "Data Viz", desc: "Creating interactive dashboards and business intelligence reports.", percent: 85, icon: "fa-solid fa-chart-pie text-accent", img: "img stack/power bi.webp" },
        { name: "Stock Marketing", category: "Finance", desc: "Technical analysis and market trend prediction.", percent: 72, icon: "fa-solid fa-chart-line text-accent", img: "img stack/stock.webp" },
        { name: "HTML & CSS", category: "Frontend", desc: "Pixel-perfect layouts and responsive design.", percent: 95, icon: "devicon-css3-plain colored", img: "img stack/html and css.png" }
    ];

    const skillTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills-pin-container",
            start: "top top",
            end: "+=4000",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const index = Math.min(Math.floor(progress * skills.length), skills.length - 1);
                updateSkillContent(index);
            }
        }
    });

    function updateSkillContent(index) {
        const skill = skills[index];
        const nameEl = document.querySelector('.skill-name');
        const catEl = document.querySelector('.skill-category');
        const descEl = document.querySelector('.skill-desc');
        const iconEl = document.getElementById('skill-icon');
        const percentEl = document.getElementById('skill-percent');
        const circle = document.getElementById('skill-progress-circle');

        if (nameEl.innerText !== skill.name) {
            gsap.to(".skill-content", { x: -20, opacity: 0, duration: 0.3, onComplete: () => {
                nameEl.innerText = skill.name;
                catEl.innerText = skill.category;
                descEl.innerText = skill.desc;
                gsap.to(".skill-content", { x: 0, opacity: 1, duration: 0.3 });
            }});

            gsap.to("#skill-icon", { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => {
                const visualCol = document.querySelector('.skill-visual-column .relative');
                let skillImg = visualCol.querySelector('img');
                
                if (skill.img) {
                    iconEl.classList.add('hidden');
                    if (!skillImg) {
                        skillImg = document.createElement('img');
                        skillImg.className = "w-full h-full object-cover rounded-[40px] absolute inset-0";
                        visualCol.appendChild(skillImg);
                    }
                    skillImg.src = skill.img;
                    skillImg.style.display = "block";
                } else {
                    iconEl.classList.remove('hidden');
                    iconEl.className = `${skill.icon} text-[140px] drop-shadow-2xl`;
                    if (skillImg) skillImg.style.display = "none";
                }
                gsap.to("#skill-icon, .skill-visual-column img", { scale: 1, opacity: 1, duration: 0.3 });
            }});

            // Progress Circle
            const offset = 364.4 - (364.4 * skill.percent) / 100;
            gsap.to(circle, { strokeDashoffset: offset, duration: 1 });
            
            // Percentage Counter
            let count = { val: parseInt(percentEl.innerText) || 0 };
            gsap.to(count, {
                val: skill.percent,
                duration: 1,
                onUpdate: () => {
                    percentEl.innerText = Math.floor(count.val) + "%";
                }
            });
        }
    }

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

    // --- 5. TIMELINE DRAWING ---
    const timelinePath = document.getElementById('timeline-line');
    if (timelinePath) {
        const pathLength = timelinePath.getTotalLength();
        gsap.set(timelinePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(timelinePath, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: "#cv",
                start: "top 60%",
                end: "bottom 80%",
                scrub: 0.5
            }
        });
    }

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
