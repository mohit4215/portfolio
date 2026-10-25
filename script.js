/**
 * MOHIT AGARWAL â€” PERSONAL DEVELOPER PORTFOLIO
 * High-Performance Snappy Particle Assembly & Modern Dark Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================
    // 1. INTRO OVERLAY & SNAPPY ASSEMBLE ANIMATION
    // ==========================================
    const word = "PORTFOLIO";
    const wordContainer = document.getElementById('portfolio-word');
    const introOverlay = document.getElementById('intro-overlay');
    const siteHeader = document.getElementById('site-header');
    const revealItems = document.querySelectorAll('.reveal-item');

    let introFinished = false;

    function finishIntroAndReveal() {
        if (introFinished) return;
        introFinished = true;

        if (introOverlay) {
            introOverlay.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        document.body.classList.remove('is-loading');

        if (siteHeader) {
            siteHeader.style.opacity = '1';
            siteHeader.style.transform = 'translateY(0)';
        }

        revealItems.forEach((item) => {
            item.classList.add('revealed');
        });

        startHeroTypewriter();
    }

    // Check if intro has already run in this session
    let hasSeenIntro = false;
    try {
        hasSeenIntro = sessionStorage.getItem('portfolio_intro_seen') === 'true';
    } catch (e) {
        hasSeenIntro = false;
    }

    if (prefersReducedMotion || hasSeenIntro || !wordContainer || !introOverlay) {
        finishIntroAndReveal();
    } else {
        const letters = [];
        const dummyLetters = [];

        // 1. Generate scattered letters (main word)
        word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = "inline-block snappy-transition";

            const rx = (Math.random() - 0.5) * window.innerWidth * 1.2;
            const ry = (Math.random() - 0.5) * window.innerHeight * 1.2;
            const rz = (Math.random() - 0.5) * 360;

            span.style.transform = `translate(${rx}px, ${ry}px) rotate(${rz}deg) scale(1.5)`;
            span.style.opacity = '0';
            span.style.filter = 'blur(8px)';

            wordContainer.appendChild(span);
            letters.push(span);
        });

        // Scatter a few background characters
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>";
        for (let i = 0; i < 16; i++) {
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

        // 2. Trigger snappy assemble fast (50ms)
        setTimeout(() => {
            letters.forEach((span) => {
                span.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
                span.style.opacity = '1';
                span.style.filter = 'blur(0px)';
            });

            dummyLetters.forEach((span) => {
                span.style.opacity = '0.25';
            });

            setTimeout(() => {
                dummyLetters.forEach((span) => {
                    span.style.opacity = '0';
                    span.style.transform += ' scale(0)';
                });
            }, 350);
        }, 50);

        // 3. Fade out overlay at 600ms (duration 400ms -> total ~1.0s)
        setTimeout(() => {
            introOverlay.style.transition = 'opacity 0.4s ease';
            introOverlay.style.opacity = '0';
        }, 600);

        // 4. Reveal main site at 1000ms (â‰¤ 1.2s total duration)
        setTimeout(() => {
            finishIntroAndReveal();
            try {
                sessionStorage.setItem('portfolio_intro_seen', 'true');
            } catch (e) {}
        }, 1000);

        // Failsafe timer (1200ms maximum safety limit)
        setTimeout(() => {
            if (!introFinished) {
                finishIntroAndReveal();
            }
        }, 1200);
    }

    // ==========================================
    // 1B. HERO ENGINE & SPOTLIGHT
    // ==========================================
    const heroSection = document.getElementById('hero');
    const heroSpotlight = document.getElementById('hero-mouse-spotlight');
    const typewriterEl = document.getElementById('hero-typewriter');
    const heroFloatingIcons = document.querySelectorAll('.hero-floating-icon');

    let typewriterStarted = false;
    function startHeroTypewriter() {
        if (typewriterStarted || !typewriterEl) return;
        typewriterStarted = true;
        const textToType = "MLOps & Full-Stack Engineer";
        let charIndex = 0;
        typewriterEl.textContent = "";

        if (prefersReducedMotion) {
            typewriterEl.textContent = textToType;
            return;
        }

        function typeNextChar() {
            if (charIndex < textToType.length) {
                typewriterEl.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, 50);
            }
        }
        setTimeout(typeNextChar, 250);
    }

    // Dynamic Mouse Spotlight
    if (heroSection && heroSpotlight && !prefersReducedMotion) {
        let targetX = heroSection.offsetWidth / 2;
        let targetY = heroSection.offsetHeight / 2;
        let curX = targetX;
        let curY = targetY;

        window.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        }, { passive: true });

        function renderHeroSpotlight() {
            curX += (targetX - curX) * 0.12;
            curY += (targetY - curY) * 0.12;

            heroSpotlight.style.setProperty('--hero-mouse-x', `${curX.toFixed(1)}px`);
            heroSpotlight.style.setProperty('--hero-mouse-y', `${curY.toFixed(1)}px`);

            requestAnimationFrame(renderHeroSpotlight);
        }
        requestAnimationFrame(renderHeroSpotlight);
    }

    // Floating Tech Stack Parallax
    if (heroFloatingIcons.length > 0 && heroSection && !prefersReducedMotion) {
        let winHalfW = window.innerWidth / 2;
        let winHalfH = window.innerHeight / 2;
        let mouseDeltaX = 0;
        let mouseDeltaY = 0;
        let parallaxX = 0;
        let parallaxY = 0;

        window.addEventListener('resize', () => {
            winHalfW = window.innerWidth / 2;
            winHalfH = window.innerHeight / 2;
        });

        window.addEventListener('mousemove', (e) => {
            mouseDeltaX = e.clientX - winHalfW;
            mouseDeltaY = e.clientY - winHalfH;
        }, { passive: true });

        function renderHeroParallax() {
            parallaxX += (mouseDeltaX - parallaxX) * 0.08;
            parallaxY += (mouseDeltaY - parallaxY) * 0.08;

            heroFloatingIcons.forEach((icon) => {
                const depth = parseFloat(icon.getAttribute('data-depth')) || 0.04;
                const px = parallaxX * depth;
                const py = parallaxY * depth;
                icon.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
            });

            requestAnimationFrame(renderHeroParallax);
        }
        requestAnimationFrame(renderHeroParallax);
    }

    // ==========================================
    // 2. SPACE DUST & FLOATING ORBITS
    // ==========================================
    const aboutSection = document.getElementById('about');
    const spaceCanvas = document.getElementById('space-dust-canvas');
    const orbitItems = document.querySelectorAll('.floating-orbit-item');

    if (spaceCanvas && aboutSection && !prefersReducedMotion) {
        const sCtx = spaceCanvas.getContext('2d');
        let sw = (spaceCanvas.width = aboutSection.offsetWidth);
        let sh = (spaceCanvas.height = aboutSection.offsetHeight);

        const stars = [];
        const starCount = 45;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * sw,
                y: Math.random() * sh,
                size: Math.random() * 1.6 + 0.4,
                alpha: Math.random() * 0.7 + 0.2,
                vx: (Math.random() - 0.5) * 0.16,
                vy: (Math.random() - 0.5) * 0.16,
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

    // Orbit Floating & Magnetic Repel
    if (orbitItems.length > 0 && aboutSection && !prefersReducedMotion) {
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
        }, { passive: true });

        aboutSection.addEventListener('mouseleave', () => {
            mouseX = -9999;
            mouseY = -9999;
        });

        function animateAntiGravity() {
            time += 0.016;

            itemsData.forEach((item) => {
                const floatY = Math.sin(time * item.speed + item.offset) * 12;
                const floatX = Math.cos(time * item.speed * 0.75 + item.offset) * 7;
                const floatRot = Math.sin(time * 0.85 + item.offset) * 4;

                if (window.innerWidth >= 1024) {
                    const rect = item.el.getBoundingClientRect();
                    const aboutRect = aboutSection.getBoundingClientRect();
                    const itemCenterX = rect.left - aboutRect.left + rect.width / 2;
                    const itemCenterY = rect.top - aboutRect.top + rect.height / 2;

                    const dx = itemCenterX - mouseX;
                    const dy = itemCenterY - mouseY;
                    const dist = Math.hypot(dx, dy);
                    const repelRadius = 160;

                    if (dist < repelRadius && dist > 1) {
                        const force = (1 - dist / repelRadius) * 40;
                        item.targetX = (dx / dist) * force;
                        item.targetY = (dy / dist) * force;
                    } else {
                        item.targetX = 0;
                        item.targetY = 0;
                    }

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
    // 3. 3D TILT ENGINE & BENTO CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card[data-tilt]');
    if (!prefersReducedMotion) {
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

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

                const px = ((x / rect.width) * 100).toFixed(1);
                const py = ((y / rect.height) * 100).toFixed(1);
                card.style.setProperty('--mouse-x', `${px}%`);
                card.style.setProperty('--mouse-y', `${py}%`);
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    const projectsSection = document.getElementById('projects');
    const bentoCards = document.querySelectorAll('.bento-card');
    if (projectsSection && bentoCards.length > 0) {
        if (prefersReducedMotion) {
            bentoCards.forEach(c => c.classList.add('bento-revealed'));
        } else {
            const bentoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        bentoCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('bento-revealed');
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

            bentoObserver.observe(projectsSection);

            // Fallback for initial view
            const initialRect = projectsSection.getBoundingClientRect();
            if (initialRect.top < window.innerHeight * 0.9) {
                bentoCards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('bento-revealed'), index * 80);
                });
            }
        }

        bentoCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }, { passive: true });
        });
    }

    // ==========================================
    // 4. CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    if (cursorDot && cursorRing && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        }, { passive: true });

        const interactives = document.querySelectorAll('a, button, input, textarea, .skill-badge, .tool-tag, .tilt-card, .floating-orbit-item, .bento-card, .bento-pill, .bento-btn-action, .magnetic-social-btn, .achieve-3d-card, .carousel-btn, .back-to-top-btn, .gallery-card, .gallery-tab, .lightbox-btn, .lightbox-nav-btn, .timeline-card');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
        });
    }

    // ==========================================
    // 5. EXPERIENCE TIMELINE (FAILURE-SAFE REVEAL)
    // ==========================================
    const expSection = document.getElementById('experience');
    const timelineWrapper = document.getElementById('experience-timeline');
    const timelineFill = document.getElementById('timeline-scroll-fill');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (expSection && timelineWrapper && timelineItems.length > 0) {
        function revealAllExperienceCards() {
            timelineItems.forEach((item) => {
                const node = item.querySelector('.timeline-node');
                const card = item.querySelector('.timeline-card');
                if (node) node.classList.add('node-active');
                if (card) card.classList.add('card-revealed');
                item.classList.add('item-revealed');
            });
            if (timelineFill) timelineFill.style.height = '100%';
        }

        if (prefersReducedMotion) {
            revealAllExperienceCards();
        } else {
            let isTicking = false;

            function updateTimelineScroll() {
                const wrapRect = timelineWrapper.getBoundingClientRect();
                const wrapHeight = timelineWrapper.offsetHeight;
                const triggerPoint = window.innerHeight * 0.78;
                const scrolled = triggerPoint - wrapRect.top;
                const progress = Math.min(Math.max(scrolled / wrapHeight, 0), 1);

                if (timelineFill) {
                    timelineFill.style.height = `${(progress * 100).toFixed(1)}%`;
                }

                const viewportCenter = window.innerHeight * 0.5;
                let closestCard = null;
                let minDistance = Infinity;

                timelineItems.forEach((item) => {
                    const node = item.querySelector('.timeline-node');
                    const card = item.querySelector('.timeline-card');
                    if (node && card) {
                        const nodeRect = node.getBoundingClientRect();
                        if (nodeRect.top <= triggerPoint) {
                            node.classList.add('node-active');
                            card.classList.add('card-revealed');
                            item.classList.add('item-revealed');
                        }

                        if (card.classList.contains('card-revealed')) {
                            const cardRect = card.getBoundingClientRect();
                            const cardCenter = cardRect.top + cardRect.height / 2;
                            const distToCenter = Math.abs(viewportCenter - cardCenter);
                            if (distToCenter < minDistance && distToCenter < window.innerHeight * 0.42) {
                                minDistance = distToCenter;
                                closestCard = card;
                            }
                        }
                    }
                });

                timelineItems.forEach((item) => {
                    const card = item.querySelector('.timeline-card');
                    if (card) {
                        if (card === closestCard) {
                            card.classList.add('card-focused');
                        } else {
                            card.classList.remove('card-focused');
                        }
                    }
                });

                isTicking = false;
            }

            function requestTimelineUpdate() {
                if (!isTicking) {
                    requestAnimationFrame(updateTimelineScroll);
                    isTicking = true;
                }
            }

            window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
            window.addEventListener('resize', requestTimelineUpdate);
            window.addEventListener('load', requestTimelineUpdate);
            window.addEventListener('hashchange', () => {
                if (window.location.hash === '#experience') {
                    revealAllExperienceCards();
                } else {
                    requestTimelineUpdate();
                }
            });

            // Initial check
            requestTimelineUpdate();
        }

        timelineItems.forEach((item) => {
            const card = item.querySelector('.timeline-card');
            const node = item.querySelector('.timeline-node');
            if (card) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }, { passive: true });

                if (node) {
                    card.addEventListener('mouseenter', () => node.classList.add('node-pulse'));
                    card.addEventListener('mouseleave', () => node.classList.remove('node-pulse'));
                }
            }
        });
    }

    // ==========================================
    // 6. ACHIEVEMENTS CAROUSEL (WITH LIVE COUNTER)
    // ==========================================
    const achieveViewport = document.getElementById('achieve-viewport');
    const achieveCards = document.querySelectorAll('.achieve-3d-card');
    const achievePrevBtn = document.getElementById('achieve-prev-btn');
    const achieveNextBtn = document.getElementById('achieve-next-btn');
    const achieveProgressBar = document.getElementById('achieve-progress-bar');
    const achieveCounter = document.getElementById('achieve-counter');

    if (achieveViewport && achieveCards.length > 0) {
        function update3DCarousel() {
            const vpRect = achieveViewport.getBoundingClientRect();
            const vpCenter = vpRect.left + vpRect.width / 2;
            const maxDistance = vpRect.width * 0.45;

            let activeIdx = 0;
            let minDistance = Infinity;

            achieveCards.forEach((card, idx) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const dist = Math.abs(cardCenter - vpCenter);

                if (dist < minDistance) {
                    minDistance = dist;
                    activeIdx = idx;
                }

                if (!prefersReducedMotion) {
                    const ratio = Math.min(dist / maxDistance, 1);
                    const scale = (1 - ratio * 0.1).toFixed(3);
                    const opacity = (1 - ratio * 0.5).toFixed(3);
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = opacity;
                } else {
                    card.style.transform = 'none';
                    card.style.opacity = '1';
                }
            });

            if (achieveCounter) {
                achieveCounter.textContent = `${activeIdx + 1} / ${achieveCards.length}`;
            }

            if (achieveProgressBar) {
                const maxScroll = achieveViewport.scrollWidth - achieveViewport.clientWidth;
                if (maxScroll > 0) {
                    const scrollPct = (achieveViewport.scrollLeft / maxScroll) * 100;
                    achieveProgressBar.style.width = `${Math.max(scrollPct, 12).toFixed(1)}%`;
                }
            }
        }

        achieveViewport.addEventListener('scroll', update3DCarousel, { passive: true });
        window.addEventListener('resize', update3DCarousel);
        update3DCarousel();

        achieveCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }, { passive: true });
        });

        if (achievePrevBtn && achieveNextBtn) {
            achievePrevBtn.addEventListener('click', () => {
                achieveViewport.scrollBy({ left: -360, behavior: 'smooth' });
            });
            achieveNextBtn.addEventListener('click', () => {
                achieveViewport.scrollBy({ left: 360, behavior: 'smooth' });
            });
        }

        // Drag scrolling
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        achieveViewport.addEventListener('mousedown', (e) => {
            isDown = true;
            achieveViewport.classList.add('is-dragging');
            startX = e.pageX - achieveViewport.offsetLeft;
            scrollLeft = achieveViewport.scrollLeft;
        });

        achieveViewport.addEventListener('mouseleave', () => {
            isDown = false;
            achieveViewport.classList.remove('is-dragging');
        });

        achieveViewport.addEventListener('mouseup', () => {
            isDown = false;
            achieveViewport.classList.remove('is-dragging');
        });

        achieveViewport.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - achieveViewport.offsetLeft;
            const walk = (x - startX) * 1.5;
            achieveViewport.scrollLeft = scrollLeft - walk;
        });
    }

    // ==========================================
    // 7. CONTACT STARS & MAGNETIC SOCIALS
    // ==========================================
    const contactSection = document.getElementById('contact');
    const contactCanvas = document.getElementById('contact-stars-canvas');
    const magneticBtns = document.querySelectorAll('.magnetic-social-btn');

    if (contactCanvas && contactSection && !prefersReducedMotion) {
        const ctx = contactCanvas.getContext('2d');
        let cw = (contactCanvas.width = contactSection.offsetWidth);
        let ch = (contactCanvas.height = contactSection.offsetHeight);

        const stars = [];
        const starCount = 35;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * cw,
                y: Math.random() * ch,
                size: Math.random() * 1.4 + 0.4,
                alpha: Math.random() * 0.6 + 0.1,
                vx: (Math.random() - 0.5) * 0.14,
                vy: (Math.random() - 0.5) * 0.14,
                pulse: Math.random() * Math.PI * 2
            });
        }

        window.addEventListener('resize', () => {
            cw = contactCanvas.width = contactSection.offsetWidth;
            ch = contactCanvas.height = contactSection.offsetHeight;
        });

        function renderStars() {
            ctx.clearRect(0, 0, cw, ch);
            stars.forEach((star) => {
                star.x += star.vx;
                star.y += star.vy;
                star.pulse += 0.02;

                if (star.x < 0) star.x = cw;
                if (star.x > cw) star.x = 0;
                if (star.y < 0) star.y = ch;
                if (star.y > ch) star.y = 0;

                const dynamicAlpha = Math.max(0.1, star.alpha + Math.sin(star.pulse) * 0.18);
                ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(renderStars);
        }
        renderStars();
    }

    if (magneticBtns.length > 0 && !prefersReducedMotion) {
        magneticBtns.forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.28;
                const deltaY = (e.clientY - centerY) * 0.28;
                btn.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // ==========================================
    // 8. MOBILE DRAWER NAVIGATION (ACCESSIBLE & FOCUS-SAFE)
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('is-open');
        mobileDrawer.removeAttribute('inert');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        const firstLink = mobileDrawer.querySelector('a, button');
        if (firstLink) firstLink.focus();
    }

    function closeMobileDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('inert', '');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.focus();
        }
        document.body.style.overflow = '';
    }

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('is-open');
            if (isOpen) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileDrawer();
            });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
                closeMobileDrawer();
            }
        });
    }

    // ==========================================
    // 9. GALLERY & ACCESSIBLE LIGHTBOX MODAL
    // ==========================================
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    const lightboxNextBtn = document.getElementById('lightbox-next-btn');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxMeta = document.getElementById('lightbox-meta');
    const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentFilter = 'all';
    let currentFilteredCards = [...galleryCards];
    let currentIndex = 0;
    let lastActiveThumbnail = null;

    if (galleryTabs.length > 0 && galleryCards.length > 0) {
        const allCount = galleryCards.length;
        const certCount = galleryCards.filter(c => c.getAttribute('data-category') === 'certificate').length;
        const compCount = galleryCards.filter(c => c.getAttribute('data-category') === 'competition').length;
        const countMap = { all: allCount, certificate: certCount, competition: compCount };

        galleryTabs.forEach((tab) => {
            const filterKey = tab.getAttribute('data-filter');
            const countEl = tab.querySelector('.gallery-tab-count');
            if (countEl && countMap[filterKey] !== undefined) {
                countEl.textContent = countMap[filterKey];
            }

            tab.addEventListener('click', () => {
                galleryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                currentFilter = tab.getAttribute('data-filter');

                galleryCards.forEach((card) => {
                    const category = card.getAttribute('data-category');
                    if (currentFilter === 'all' || category === currentFilter) {
                        card.classList.remove('is-hidden');
                    } else {
                        card.classList.add('is-hidden');
                    }
                });

                currentFilteredCards = galleryCards.filter(c => !c.classList.contains('is-hidden'));
            });
        });
    }

    function updateLightbox(index) {
        if (!currentFilteredCards[index]) return;
        currentIndex = index;
        const card = currentFilteredCards[index];

        const src = card.getAttribute('data-src');
        const title = card.getAttribute('data-title');
        const org = card.getAttribute('data-org');
        const date = card.getAttribute('data-date');
        const badge = card.getAttribute('data-badge') || 'VERIFIED';
        const certId = card.getAttribute('data-id') ? ` Â· ${card.getAttribute('data-id')}` : '';

        if (lightboxImg) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = src;
                lightboxImg.alt = title;
                lightboxImg.style.opacity = '1';
            }, 80);
        }

        if (lightboxTag) lightboxTag.textContent = badge;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxMeta) lightboxMeta.textContent = `${org} Â· ${date}${certId}`;
        if (lightboxDownloadBtn) lightboxDownloadBtn.href = src;
        if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${currentFilteredCards.length}`;
    }

    function openLightbox(card) {
        currentFilteredCards = galleryCards.filter(c => !c.classList.contains('is-hidden'));
        const index = currentFilteredCards.indexOf(card);
        if (index === -1) return;

        lastActiveThumbnail = card;
        updateLightbox(index);

        if (lightbox) {
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            lightbox.removeAttribute('inert');
            document.body.style.overflow = 'hidden';
            if (lightboxCloseBtn) {
                lightboxCloseBtn.focus();
            }
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            lightbox.setAttribute('inert', '');
            document.body.style.overflow = '';
            if (lastActiveThumbnail && typeof lastActiveThumbnail.focus === 'function') {
                lastActiveThumbnail.focus();
            }
        }
    }

    function nextLightbox() {
        if (currentFilteredCards.length === 0) return;
        const nextIdx = (currentIndex + 1) % currentFilteredCards.length;
        updateLightbox(nextIdx);
    }

    function prevLightbox() {
        if (currentFilteredCards.length === 0) return;
        const prevIdx = (currentIndex - 1 + currentFilteredCards.length) % currentFilteredCards.length;
        updateLightbox(prevIdx);
    }

    if (lightbox) {
        galleryCards.forEach((card) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View document: ${card.getAttribute('data-title') || 'Archive item'}`);

            card.addEventListener('click', () => openLightbox(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(card);
                }
            });
        });

        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
        if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

        window.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        });

        // Focus trap inside lightbox
        lightbox.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const focusables = Array.from(lightbox.querySelectorAll('button:not([disabled]), a:not([disabled]), [tabindex]:not([tabindex="-1"])'))
                .filter(el => el.offsetParent !== null);
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // ==========================================
    // 10. CONTACT FORM (VALIDATION & SAFE SUBMIT)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const btnSubmit = document.getElementById('btn-submit');
            const btnText = document.getElementById('btn-submit-text') || (btnSubmit ? btnSubmit.querySelector('span') : null);

            const nameVal = nameInput ? nameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const messageVal = messageInput ? messageInput.value.trim() : '';

            // Honeypot check
            const honeypot = contactForm.querySelector('input[name="_honey"]');
            if (honeypot && honeypot.value.trim() !== '') {
                // Silently discard spam submission
                formFeedback.innerHTML = `<div class="feedback-success"><span>Message sent! I'll get back to you soon.</span></div>`;
                contactForm.reset();
                return;
            }

            // Inline validation checks
            if (nameVal.length < 2) {
                formFeedback.innerHTML = `<span style="color:#f87171;">Please enter your name (at least 2 characters).</span>`;
                if (nameInput) nameInput.focus();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailVal)) {
                formFeedback.innerHTML = `<span style="color:#f87171;">Please enter a valid email address.</span>`;
                if (emailInput) emailInput.focus();
                return;
            }

            if (messageVal.length < 10) {
                formFeedback.innerHTML = `<span style="color:#f87171;">Please provide a message with at least 10 characters.</span>`;
                if (messageInput) messageInput.focus();
                return;
            }

            const originalText = btnText ? btnText.textContent : 'SEND MESSAGE';
            if (btnText) btnText.textContent = 'TRANSMITTING...';
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.classList.add('btn-loading');
            }
            formFeedback.innerHTML = `<span class="feedback-sending" style="color:#94a3b8;">Transmitting message directly to Mohit...</span>`;

            try {
                const response = await fetch("https://formsubmit.co/ajax/mohitagarwal4215@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameVal,
                        email: emailVal,
                        message: messageVal,
                        _subject: `New Portfolio Inquiry from ${nameVal}`,
                        _template: 'table'
                    })
                });

                const data = await response.json().catch(() => ({}));

                if (response.ok || (data.message && data.message.includes("Activation"))) {
                    formFeedback.innerHTML = `
                        <div class="feedback-success" style="color:#34d399; font-weight:600; padding:0.75rem 0;">
                            <span>Message sent! I'll get back to you soon.</span>
                        </div>
                    `;
                    contactForm.reset();
                } else if (window.location.protocol === 'file:' || (data.message && data.message.includes("web server"))) {
                    const mailtoUrl = `mailto:mohitagarwal4215@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(nameVal)}&body=${encodeURIComponent(messageVal)}`;
                    formFeedback.innerHTML = `
                        <div class="feedback-warning" style="color:#fbbf24; padding:0.5rem 0;">
                            <span>Direct transmission fallback: <a href="${mailtoUrl}" class="underline text-cyan-400">Click here to send via your mail client â†’</a></span>
                        </div>
                    `;
                } else {
                    throw new Error(data.message || 'Transmission failed');
                }
            } catch (err) {
                console.error('Contact Form Transmission Error:', err);
                const mailtoUrl = `mailto:mohitagarwal4215@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(nameVal)}&body=${encodeURIComponent(messageVal)}`;
                formFeedback.innerHTML = `
                    <div class="feedback-error" style="color:#f87171; padding:0.5rem 0;">
                        <span>Unable to send through FormSubmit. Reach out directly via <a href="${mailtoUrl}" class="underline text-cyan-400">mohitagarwal4215@gmail.com</a>.</span>
                    </div>
                `;
            } finally {
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.classList.remove('btn-loading');
                }
                if (btnText) btnText.textContent = originalText;
            }
        });
    }
});
