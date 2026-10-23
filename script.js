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
    // 2. CUSTOM CURSOR
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

        const interactives = document.querySelectorAll('a, button, input, textarea, .chip');
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
