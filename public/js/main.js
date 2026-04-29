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
    });

    if (chatbotRobo) {
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatOptions = document.getElementById('chat-options');

        function addMessage(text, type = 'bot') {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${type}`;
            bubble.textContent = text;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function addOptions(options) {
            chatOptions.innerHTML = '';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.textContent = opt.text;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    opt.action();
                };
                chatOptions.appendChild(btn);
            });
        }

        const mainMenu = () => {
            addMessage("What can I help you with today?");
            addOptions([
                {
                    text: "Resume", action: () => showResumeOptions()
                },
                {
                    text: "Project", action: () => {
                        addMessage("Project", "user");
                        window.lenis.start();
                        window.lenis.scrollTo('#projects');
                        toggleChat();
                    }
                },
                {
                    text: "CV", action: () => {
                        addMessage("CV", "user");
                        window.lenis.start();
                        window.lenis.scrollTo('#cv');
                        toggleChat();
                    }
                },
                {
                    text: "Contact my Boss", action: () => showContactOptions()
                }
            ]);
        };

        const showResumeOptions = () => {
            addMessage("Resume", "user");
            addMessage("Would you like to download my boss's resume?");
            addOptions([
                {
                    text: "Yes", action: () => {
                        addMessage("Yes", "user");
                        const link = document.createElement('a');
                        link.href = '/CHIDESH-RESUME-CRNT.PDF';
                        link.download = 'CHIDESH-Resume.pdf';
                        link.click();
                        addMessage("Starting download...");
                        setTimeout(mainMenu, 1500);
                    }
                },
                {
                    text: "No", action: () => {
                        addMessage("No", "user");
                        mainMenu();
                    }
                }
            ]);
        };

        const showContactOptions = () => {
            addMessage("Contact my Boss", "user");
            addMessage("Here are the ways to reach him:");
            const contactLinks = `
                <div class="flex flex-col gap-2 mt-2">
                    <a href="mailto:chideshv@gmail.com" class="text-accent font-bold hover:underline">Email</a>
                    <a href="tel:+919944847680" class="text-accent font-bold hover:underline">Phone</a>
                    <a href="https://wa.me/919944847680" target="_blank" class="text-accent font-bold hover:underline">WhatsApp</a>
                    <a href="https://github.com/iamchideshv" target="_blank" class="text-accent font-bold hover:underline">GitHub</a>
                    <a href="https://www.instagram.com/iamchidesh" target="_blank" class="text-accent font-bold hover:underline">Instagram</a>
                </div>
            `;
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble bot';
            bubble.innerHTML = contactLinks;
            chatMessages.appendChild(bubble);
            // Don't auto-reset menu immediately so user can click links
            addOptions([{ text: "Back to Menu", action: mainMenu }]);
        };

        function toggleChat() {
            chatWindow.classList.toggle('open');
            if (chatWindow.classList.contains('open') && chatMessages.children.length === 0) {
                startChat();
            }
        }

        function startChat() {
            addMessage("Say Hi to begin");
            addOptions([
                {
                    text: "Hi", action: () => {
                        addMessage("Hi", "user");
                        mainMenu();
                    }
                }
            ]);
        }

        chatbotRobo.addEventListener('click', (e) => {
            e.stopPropagation();
            // Little bounce animation on click
            gsap.to(chatbotRobo, {
                y: -15,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
            });
            toggleChat();
        });

        if (closeChat) {
            closeChat.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleChat();
            });
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (chatWindow.classList.contains('open') && !chatWindow.contains(e.target) && !chatbotRobo.contains(e.target)) {
                toggleChat();
            }
        });

        // Fix scroll hijacking: Stop Lenis when cursor is inside chat
        chatWindow.addEventListener('mouseenter', () => {
            window.lenis.stop();
        });

        chatWindow.addEventListener('mouseleave', () => {
            window.lenis.start();
        });

        // Prevent wheel event from bubbling to Lenis
        chatWindow.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

    // --- 4. CONTACT FORM HANDLING (Web3Forms) ---
    const contactForm = document.getElementById('contact-form');

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
