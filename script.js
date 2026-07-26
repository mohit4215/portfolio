/* ============================================
   MOHIT AGARWAL — PORTFOLIO INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ CERTIFICATE DATA ============
    const certificateData = [
        {
            src: 'assets/certificates/plum-xiv.jpg',
            title: 'Plum X Invicta — Case Study Competition',
            hasImage: true
        },
        {
            src: '',
            title: 'Nerd AI Quest — AI/ML Competition',
            hasImage: false
        },
        {
            src: '',
            title: 'Tech Nova — Tech Innovation Event',
            hasImage: false
        },
        {
            src: '',
            title: 'NitiGyan — Policy & Strategy',
            hasImage: false
        },
        {
            src: '',
            title: 'Elementary Teaching Certificate',
            hasImage: false
        },
        {
            src: 'assets/gallery/dtu-presentation-1.jpeg',
            title: 'DTU Assets — M&A Offline (MarkSense)',
            hasImage: true
        },
        {
            src: 'assets/gallery/dtu-presentation-2.jpeg',
            title: 'DTU Assets — The Final Boardroom',
            hasImage: true
        },
        {
            src: '',
            title: 'IGDTUW — Prompt Wars by GDSC Offline',
            hasImage: false
        }
    ];

    let currentLightboxIndex = 0;

    // ============ PARTICLE BACKGROUND ============
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 15), 80);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.3,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.3 + 0.05
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.03 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            if (scrollPos >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ============ TYPING EFFECT ============
    const typingElement = document.getElementById('typing-text');
    const skills = [
        'Financial Modeling',
        'Strategy Consulting',
        'Data Analytics',
        'Python & C/C++',
        'AI & Machine Learning',
        'Technical Analysis',
        'M&A Blueprints',
        'Entrepreneurship'
    ];
    let skillIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = skills[skillIdx];
        if (isDeleting) {
            typingElement.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 35 : 80;

        if (!isDeleting && charIdx === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            skillIdx = (skillIdx + 1) % skills.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    if (typingElement) {
        setTimeout(typeEffect, 1200);
    }

    // ============ STAT COUNTER ANIMATION ============
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    function animateCounter(el) {
        const target = parseFloat(el.dataset.count);
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const value = eased * target;

            if (isDecimal) {
                el.textContent = value.toFixed(2);
            } else {
                el.textContent = Math.round(value);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============ SCROLL ANIMATIONS ============
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger stat counters
                const stats = entry.target.querySelectorAll('.stat-number[data-count]');
                stats.forEach(stat => {
                    if (!stat.dataset.animated) {
                        stat.dataset.animated = 'true';
                        animateCounter(stat);
                    }
                });

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // ============ 3D CARD TILT ============
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============ LIGHTBOX ============
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    window.openLightbox = function(index) {
        currentLightboxIndex = index;
        const cert = certificateData[index];
        
        if (cert.hasImage && cert.src) {
            lightboxImg.src = cert.src;
            lightboxImg.style.display = 'block';
        } else {
            // Create a placeholder image for certs without images
            lightboxImg.src = '';
            lightboxImg.style.display = 'none';
        }
        
        lightboxCaption.textContent = cert.title;
        lightboxCounter.textContent = `${index + 1} / ${certificateData.length}`;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        let newIndex = currentLightboxIndex + direction;
        if (newIndex < 0) newIndex = certificateData.length - 1;
        if (newIndex >= certificateData.length) newIndex = 0;
        
        // Skip placeholders without images
        let attempts = 0;
        while (!certificateData[newIndex].hasImage && attempts < certificateData.length) {
            newIndex += direction;
            if (newIndex < 0) newIndex = certificateData.length - 1;
            if (newIndex >= certificateData.length) newIndex = 0;
            attempts++;
        }
        
        window.openLightbox(newIndex);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active') && !document.getElementById('case-modal').classList.contains('active')) return;

        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }

        if (document.getElementById('case-modal').classList.contains('active')) {
            if (e.key === 'Escape') closeCaseModal();
        }
    });

    // ============ CASE STUDY MODAL ============
    const caseModal = document.getElementById('case-modal');
    const caseModalTitle = document.getElementById('case-modal-title');
    const caseModalDesc = document.getElementById('case-modal-desc');
    const caseModalBody = document.getElementById('case-modal-body');

    window.openCaseStudyModal = function(title, desc, filePath) {
        caseModalTitle.textContent = title;
        caseModalDesc.textContent = desc;

        // Try to load the file
        const ext = filePath.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
            caseModalBody.innerHTML = `
                <div class="case-placeholder">
                    <i class="fas fa-file-pdf"></i>
                    <p>Case study document</p>
                    <span>Drop your PDF into <code>${filePath}</code></span>
                </div>
            `;
        } else {
            // Try loading as image
            const img = new Image();
            img.onload = function() {
                caseModalBody.innerHTML = `<img src="${filePath}" alt="${title}" style="width:100%;border-radius:8px;max-height:60vh;object-fit:contain;">`;
            };
            img.onerror = function() {
                caseModalBody.innerHTML = `
                    <div class="case-placeholder">
                        <i class="fas fa-file-alt"></i>
                        <p>Case study file will be available soon.</p>
                        <span>Drop your file into <code>${filePath}</code></span>
                    </div>
                `;
            };
            img.src = filePath;
        }

        caseModal.classList.add('active');
        caseModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    window.closeCaseModal = function() {
        caseModal.classList.remove('active');
        caseModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Sent Successfully!</span>';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ============ SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
