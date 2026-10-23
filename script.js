/**
 * MOHIT AGARWAL — PERSONAL DEVELOPER PORTFOLIO
 * High-Performance Snappy Particle Assembly & Modern Dark Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. INTRO OVERLAY & SNAPPY ASSEMBLE ANIMATION
    // ==========================================
    const word = "PORTFOLIO";
    const wordContainer = document.getElementById('portfolio-word');
    const introOverlay = document.getElementById('intro-overlay');
    const siteHeader = document.getElementById('site-header');

    if (wordContainer && introOverlay) {
        const letters = [];
        const dummyLetters = [];

        // 1. GENERATE SCATTERED LETTERS (The real word)
        word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = "inline-block snappy-transition";

            // Random starting positions far away from center
            const rx = (Math.random() - 0.5) * window.innerWidth * 1.5;
            const ry = (Math.random() - 0.5) * window.innerHeight * 1.5;
            const rz = (Math.random() - 0.5) * 720; // Random rotation up to 720deg

            span.style.transform = `translate(${rx}px, ${ry}px) rotate(${rz}deg) scale(2)`;
            span.style.opacity = '0';
            span.style.filter = 'blur(10px)';

            wordContainer.appendChild(span);
            letters.push(span);
        });

        // Add extra random letters floating around to add to the chaos
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>";
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
            span.className = "absolute text-2xl text-gray-600 snappy-transition pointer-events-none select-none";

            const rx = (Math.random() - 0.5) * window.innerWidth;
            const ry = (Math.random() - 0.5) * window.innerHeight;
            const rz = (Math.random() - 0.5) * 360;

            span.style.transform = `translate(${rx}px, ${ry}px) rotate(${rz}deg)`;
            span.style.opacity = '0';

            introOverlay.appendChild(span);
            dummyLetters.push(span);
        }

        // 2. TRIGGER ASSEMBLE ANIMATION
        setTimeout(() => {
            // Assemble the main word
            letters.forEach((span) => {
                span.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
                span.style.opacity = '1';
                span.style.filter = 'blur(0px)';
            });

            // Show dummy letters scattered
            dummyLetters.forEach((span) => {
                span.style.opacity = '0.3';
            });

            // Make dummy letters fade out quickly while main word assembles
            setTimeout(() => {
                dummyLetters.forEach((span) => {
                    span.style.opacity = '0';
                    span.style.transform = span.style.transform + ' scale(0)';
                });
            }, 600);
        }, 300); // Small delay after load

        // 3. FADE OUT "PORTFOLIO" OVERLAY
        // Let the word hold for 1.5 seconds after assembling, then fade out
        setTimeout(() => {
            introOverlay.style.opacity = '0';
        }, 2500);

        // 4. REVEAL MAIN LANDING PAGE
        setTimeout(() => {
            introOverlay.style.display = 'none'; // Remove from flow
            document.body.style.overflow = 'auto'; // Restore scrolling
            document.body.classList.remove('is-loading');

            if (siteHeader) {
                siteHeader.style.opacity = '1';
                siteHeader.style.transform = 'translateY(0)';
            }

            // Trigger staggered reveal for UI elements
            const revealItems = document.querySelectorAll('.reveal-item');
            setTimeout(() => {
                revealItems.forEach((item) => {
                    item.classList.add('revealed');
                });
            }, 50);
        }, 3500); // 2500ms + 1000ms transition
    } else {
        // Fallback if overlay not present
        document.body.style.overflow = 'auto';
        document.body.classList.remove('is-loading');
        document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
        if (siteHeader) {
            siteHeader.style.opacity = '1';
            siteHeader.style.transform = 'translateY(0)';
        }
    }

    // ==========================================
    // 2. ANTI-GRAVITY SPACE DUST & FLOATING ORBIT ENGINE
    // ==========================================
    const aboutSection = document.getElementById('about');
    const spaceCanvas = document.getElementById('space-dust-canvas');
    const orbitItems = document.querySelectorAll('.floating-orbit-item');

    // 2A. Space Dust Canvas
    if (spaceCanvas && aboutSection) {
        const sCtx = spaceCanvas.getContext('2d');
        let sw = (spaceCanvas.width = aboutSection.offsetWidth);
        let sh = (spaceCanvas.height = aboutSection.offsetHeight);

        const stars = [];
        const starCount = 55;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * sw,
                y: Math.random() * sh,
                size: Math.random() * 1.8 + 0.4,
                alpha: Math.random() * 0.7 + 0.2,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                pulse: Math.random() * Math.PI * 2
            });
        }

        window.addEventListener('resize', () => {
            sw = spaceCanvas.width = aboutSection.offsetWidth;
            sh = spaceCanvas.height = aboutSection.offsetHeight;
        });

        function renderSpaceDust() {
            sCtx.clearRect(0, 0, sw, sh);
            stars.forEach((star) => {
                star.x += star.vx;
                star.y += star.vy;
                star.pulse += 0.02;

                if (star.x < 0) star.x = sw;
                if (star.x > sw) star.x = 0;
                if (star.y < 0) star.y = sh;
                if (star.y > sh) star.y = 0;

                const dynamicAlpha = Math.max(0.1, star.alpha + Math.sin(star.pulse) * 0.2);
                sCtx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
                sCtx.beginPath();
                sCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                sCtx.fill();
            });
            requestAnimationFrame(renderSpaceDust);
        }
        renderSpaceDust();
    }

    // 2B. Physics-Based Zero-Gravity Floating & Magnetic Repel Effect
    if (orbitItems.length > 0 && aboutSection) {
        let mouseX = -9999;
        let mouseY = -9999;
        let time = 0;

        const itemsData = Array.from(orbitItems).map((el) => {
            const speed = parseFloat(el.getAttribute('data-float-speed')) || 1.0;
            const offset = parseFloat(el.getAttribute('data-float-offset')) || 0;
            return {
                el,
                speed,
                offset,
                currX: 0,
                currY: 0,
                targetX: 0,
                targetY: 0
            };
        });

        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        aboutSection.addEventListener('mouseleave', () => {
            mouseX = -9999;
            mouseY = -9999;
        });

        function animateAntiGravity() {
            time += 0.018;

            itemsData.forEach((item) => {
                // 1. Natural Zero-Gravity Floating Motion
                const floatY = Math.sin(time * item.speed + item.offset) * 14;
                const floatX = Math.cos(time * item.speed * 0.75 + item.offset) * 8;
                const floatRot = Math.sin(time * 0.85 + item.offset) * 5;

                // 2. Magnetic Repel from Mouse
                if (window.innerWidth >= 1024) {
                    const rect = item.el.getBoundingClientRect();
                    const aboutRect = aboutSection.getBoundingClientRect();
                    const itemCenterX = rect.left - aboutRect.left + rect.width / 2;
                    const itemCenterY = rect.top - aboutRect.top + rect.height / 2;

                    const dx = itemCenterX - mouseX;
                    const dy = itemCenterY - mouseY;
                    const dist = Math.hypot(dx, dy);
                    const repelRadius = 180;

                    if (dist < repelRadius && dist > 1) {
                        const force = (1 - dist / repelRadius) * 45;
                        item.targetX = (dx / dist) * force;
                        item.targetY = (dy / dist) * force;
                    } else {
                        item.targetX = 0;
                        item.targetY = 0;
                    }

                    // Smooth spring dampening (lerp)
                    item.currX += (item.targetX - item.currX) * 0.08;
                    item.currY += (item.targetY - item.currY) * 0.08;

                    item.el.style.transform = `translate3d(${item.currX + floatX}px, ${item.currY + floatY}px, 0px) rotate(${floatRot}deg)`;
                } else {
                    item.el.style.transform = `translate3d(${floatX}px, ${floatY}px, 0px) rotate(${floatRot}deg)`;
                }
            });

            requestAnimationFrame(animateAntiGravity);
        }
        animateAntiGravity();
    }

    // ==========================================
    // 3. 3D MAGNETIC GLASSMORPHIC TILT ENGINE
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card[data-tilt]');
    tiltCards.forEach((card) => {
        let isHovered = false;

        card.addEventListener('mouseenter', () => {
            isHovered = true;
            card.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Maximum tilt angle of 10 degrees
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

            // Track neon cursor spotlight inside the glass card
            const px = ((x / rect.width) * 100).toFixed(1);
            const py = ((y / rect.height) * 100).toFixed(1);
            card.style.setProperty('--mouse-x', `${px}%`);
            card.style.setProperty('--mouse-y', `${py}%`);
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ==========================================
    // 4. CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        });

        const interactives = document.querySelectorAll('a, button, input, textarea, .skill-badge, .tool-tag, .tilt-card, .floating-orbit-item, .btn-resume');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
        });
    }

    // ==========================================
    // 3. HEADER SCROLL EFFECT & SCROLLSPY
    // ==========================================
    const header = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (header) {
            if (scrollPos > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        sections.forEach((sec) => {
            const top = sec.offsetTop - 180;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ==========================================
    // 4. MOBILE DRAWER NAVIGATION
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('is-open');
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('is-open');
            });
        });
    }

    // ==========================================
    // 5. CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            formFeedback.innerHTML = `<span style="color:#ffffff;">Thank you, ${name}! Your message has been received.</span>`;

            setTimeout(() => {
                contactForm.reset();
            }, 1500);
        });
    }
});
