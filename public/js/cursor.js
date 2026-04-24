document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows immediately
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animate() {
        // Ring follows with delay (lerp)
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);

        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .tool-bubble, .skill-badge, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
            gsap.to(ring, { scale: 1.5, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            gsap.to(ring, { scale: 1, duration: 0.3 });
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        gsap.to([dot, ring], { scale: 0.8, duration: 0.1 });
    });

    document.addEventListener('mouseup', () => {
        gsap.to([dot, ring], { scale: 1, duration: 0.1 });
    });
});
