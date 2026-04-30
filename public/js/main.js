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
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatOptions = document.getElementById('chat-options');
        const chatInput = document.getElementById('chat-input');
        const sendChat = document.getElementById('send-chat');

        let isChatOpen = false;

        const toggleChat = () => {
            isChatOpen = !isChatOpen;
            chatWindow.classList.toggle('open');
            if (isChatOpen && chatMessages.children.length === 0) {
                setTimeout(sendGreeting, 500);
            }
        };

        chatbotRobo.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        function addMessage(text, type = 'bot') {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${type}`;
            bubble.innerHTML = text;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            gsap.from(bubble, {
                y: 10,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }

        function clearOptions() {
            chatOptions.innerHTML = '';
        }

        function addOption(text, callback) {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = text;
            btn.onclick = callback;
            chatOptions.appendChild(btn);
        }

        function sendGreeting() {
            addMessage("Hi! I'm Kira, Chidesh's AI assistant. 👋");
            addMessage("How can I help you today?");
            showMainOptions();
        }

        function showMainOptions() {
            clearOptions();
            addOption("Resume", handleResume);
            addOption("CV", handleCV);
            addOption("Contact my boss", handleContact);
        }

        function handleResume() {
            addMessage("Resume", 'user');
            setTimeout(() => {
                addMessage("Do you want to download my resume?");
                clearOptions();
                addOption("Yes, download", () => {
                    addMessage("Yes, download", 'user');
                    window.open('/CHIDESH-RESUME-CRNT.PDF', '_blank');
                    setTimeout(() => {
                        addMessage("Download started! Anything else?");
                        showMainOptions();
                    }, 500);
                });
                addOption("No, thanks", () => {
                    addMessage("No, thanks", 'user');
                    setTimeout(() => {
                        addMessage("No problem! What else can I do for you?");
                        showMainOptions();
                    }, 500);
                });
            }, 500);
        }

        function handleCV() {
            addMessage("CV", 'user');
            setTimeout(() => {
                addMessage("Sure! Let's take a look at my journey.");
                window.lenis.scrollTo('#cv', {
                    offset: -80,
                    duration: 1.5
                });
                setTimeout(showMainOptions, 1000);
            }, 500);
        }

        function handleContact() {
            addMessage("Contact my boss", 'user');
            setTimeout(() => {
                addMessage("Here are the ways you can reach Chidesh:");
                const contactCard = `
                    <div class="chat-contact-card">
                        <a href="mailto:chideshv@gmail.com" class="chat-contact-item">
                            <i class="fa-solid fa-envelope text-accent"></i> chideshv@gmail.com
                        </a>
                        <a href="tel:+919944847680" class="chat-contact-item">
                            <i class="fa-solid fa-phone text-accent"></i> +91 99448 47680
                        </a>
                        <a href="https://wa.me/919944847680" target="_blank" class="chat-contact-item">
                            <i class="fa-brands fa-whatsapp text-accent"></i> WhatsApp
                        </a>
                        <a href="https://github.com/iamchideshv" target="_blank" class="chat-contact-item">
                            <i class="fa-brands fa-github text-accent"></i> GitHub
                        </a>
                        <a href="https://www.instagram.com/iamchidesh" target="_blank" class="chat-contact-item">
                            <i class="fa-brands fa-instagram text-accent"></i> Instagram
                        </a>
                    </div>
                `;
                addMessage(contactCard);
                setTimeout(showMainOptions, 1000);
            }, 500);
        }

        function handleUserInput() {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';

            setTimeout(() => {
                if (text.toLowerCase().includes('hi') || text.toLowerCase().includes('hello')) {
                    addMessage("Hello there! How can I assist you?");
                } else {
                    addMessage("I'm still learning! Please use the quick options or contact Chidesh directly for more info.");
                }
                showMainOptions();
            }, 700);
        }

        sendChat.addEventListener('click', handleUserInput);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });
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
