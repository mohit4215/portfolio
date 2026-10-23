/**
 * MOHIT AGARWAL — PERSONAL DEVELOPER PORTFOLIO
 * High-Performance GSAP Canvas Text-Morphing Sequence & Three.js 3D Particle Silhouette
 */

(function () {
    'use strict';

    /* ==========================================================================
       1. SYNTHETIC AUDIO ENGINE (Web Audio API)
       Pure programmatic sound synthesis: no external assets or latency
       ========================================================================== */
    class AudioEngine {
        constructor() {
            this.ctx = null;
            this.enabled = true;
        }

        init() {
            if (!this.ctx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playDotPop() {
            if (!this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.13);
        }

        playWhoosh() {
            if (!this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(90, now);
            osc.frequency.exponentialRampToValueAtTime(340, now + 0.22);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.29);
        }

        playGlitchTick() {
            if (!this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(400 + Math.random() * 1000, now);

            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.025);
        }

        playLockImpact() {
            if (!this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;

            // Sub-bass thud
            const sub = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            sub.type = 'sine';
            sub.frequency.setValueAtTime(140, now);
            sub.frequency.exponentialRampToValueAtTime(32, now + 0.45);

            subGain.gain.setValueAtTime(0.35, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

            sub.connect(subGain);
            subGain.connect(this.ctx.destination);
            sub.start(now);
            sub.stop(now + 0.52);

            // Chime overtone
            const bell = this.ctx.createOscillator();
            const bellGain = this.ctx.createGain();
            bell.type = 'sine';
            bell.frequency.setValueAtTime(1046.5, now); // C6

            bellGain.gain.setValueAtTime(0.08, now);
            bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

            bell.connect(bellGain);
            bellGain.connect(this.ctx.destination);
            bell.start(now);
            bell.stop(now + 0.65);
        }
    }

    const sound = new AudioEngine();

    /* ==========================================================================
       2. THREE.JS INTERACTIVE 3D PARTICLE SILHOUETTE
       ========================================================================== */
    class ParticlePortrait {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas || typeof THREE === 'undefined') return;

            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.pointsMesh = null;
            this.geometry = null;

            this.positions = null;
            this.initialPositions = null;
            this.velocities = null;

            this.mouseX = 0;
            this.mouseY = 0;
            this.targetRotX = 0;
            this.targetRotY = 0;
            this.mouseSensitivity = 1.0;
            this.pointSize = 0.038;

            this.clock = new THREE.Clock();
            this.mouseRayPos = new THREE.Vector3(999, 999, 999);

            this.init();
        }

        init() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
            this.camera.position.set(0, 0, 6.2);

            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            this.buildSilhouetteGeometry();

            window.addEventListener('resize', this.onResize.bind(this));
            window.addEventListener('mousemove', this.onMouseMove.bind(this));

            this.animate();
        }

        createGlowTexture() {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            const center = size / 2;
            const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
            gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(center, center, center, 0, Math.PI * 2);
            ctx.fill();

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        buildSilhouetteGeometry() {
            const totalPoints = 28000;
            this.positions = new Float32Array(totalPoints * 3);
            this.initialPositions = new Float32Array(totalPoints * 3);
            this.velocities = new Float32Array(totalPoints * 3);
            const colors = new Float32Array(totalPoints * 3);

            let idx = 0;

            const addPoint = (x, y, z, r = 1, g = 1, b = 1) => {
                if (idx >= totalPoints * 3) return;
                this.positions[idx] = x;
                this.positions[idx + 1] = y;
                this.positions[idx + 2] = z;

                this.initialPositions[idx] = x;
                this.initialPositions[idx + 1] = y;
                this.initialPositions[idx + 2] = z;

                this.velocities[idx] = 0;
                this.velocities[idx + 1] = 0;
                this.velocities[idx + 2] = 0;

                colors[idx] = r;
                colors[idx + 1] = g;
                colors[idx + 2] = b;

                idx += 3;
            };

            // Head and Face Silhouette looking directly forward
            for (let i = 0; i < 14000; i++) {
                const u = (Math.random() - 0.5) * Math.PI * 1.8;
                const y = Math.random() * 2.0;

                let radX = 0.82;
                let radZ = 0.95;
                let zOffset = 0;
                let brightness = 0.85;

                // Nose Bridge & Tip
                if (y > 0.45 && y < 0.88 && Math.abs(u) < 0.28) {
                    const noseProgress = 1 - Math.abs(y - 0.62) / 0.26;
                    zOffset += 0.38 * Math.pow(Math.max(0, noseProgress), 1.4);
                    brightness = 1.0;
                }

                // Eye Sockets
                const eyeL = Math.hypot(u - 0.38, y - 0.88);
                const eyeR = Math.hypot(u + 0.38, y - 0.88);
                if (eyeL < 0.22 || eyeR < 0.22) {
                    zOffset -= 0.18;
                    brightness = 0.45;
                }

                // Brow Ridge
                if (y > 0.98 && y < 1.12 && Math.abs(u) < 0.65) {
                    zOffset += 0.16;
                    brightness = 1.0;
                }

                // Cheekbones
                if (y > 0.55 && y < 0.75 && (Math.abs(u - 0.55) < 0.22 || Math.abs(u + 0.55) < 0.22)) {
                    zOffset += 0.15;
                    brightness = 0.95;
                }

                // Lips
                if (y > 0.22 && y < 0.38 && Math.abs(u) < 0.3) {
                    zOffset += 0.15;
                    brightness = 0.92;
                }

                // Chin
                if (y >= 0.0 && y < 0.18 && Math.abs(u) < 0.25) {
                    zOffset += 0.22;
                    brightness = 0.95;
                }

                // Hair / Crown
                if (y > 1.2) {
                    radX += (y - 1.2) * 0.16;
                    radZ += (y - 1.2) * 0.14;
                    brightness = 0.72;
                }

                const cosT = Math.cos(u);
                const sinT = Math.sin(u);

                const depthFactor = 0.88 + Math.random() * 0.2;
                const x = sinT * radX * depthFactor + (Math.random() - 0.5) * 0.05;
                const z = (cosT * radZ + zOffset) * depthFactor + (Math.random() - 0.5) * 0.05;

                addPoint(x, y + 0.05, z, brightness, brightness, brightness);
            }

            // Neck column
            for (let i = 0; i < 4000; i++) {
                const angle = Math.random() * Math.PI * 2;
                const y = -0.05 - Math.random() * 0.75;
                const radius = 0.44 + (Math.abs(y) * 0.06) + (Math.random() - 0.5) * 0.04;

                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius * 0.9;
                const brightness = 0.65 + Math.random() * 0.25;

                addPoint(x, y + 0.05, z, brightness, brightness, brightness);
            }

            // Trapezius and Broad Shoulders
            for (let i = 0; i < 8500; i++) {
                const side = Math.random() > 0.5 ? 1 : -1;
                const progress = Math.random();

                const x = side * (0.45 + progress * 2.2);
                const y = -0.8 - progress * 1.15 - Math.random() * 0.75;
                const z = (Math.random() - 0.5) * 0.75 + 0.15 * Math.cos(progress * Math.PI * 0.5);

                const brightness = 0.55 + Math.random() * 0.3;
                addPoint(x, y + 0.05, z, brightness, brightness, brightness);
            }

            // Ambient Floating Nodes
            while (idx < totalPoints * 3) {
                const r = 1.4 + Math.random() * 2.6;
                const theta = Math.random() * Math.PI * 2;
                const phi = (Math.random() - 0.5) * Math.PI;

                const x = r * Math.cos(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) + 0.2;
                const z = r * Math.cos(phi) * Math.sin(theta);

                const b = 0.3 + Math.random() * 0.35;
                addPoint(x, y, z, b, b, b);
            }

            this.geometry = new THREE.BufferGeometry();
            this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
            this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: this.pointSize,
                map: this.createGlowTexture(),
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                vertexColors: true
            });

            this.pointsMesh = new THREE.Points(this.geometry, material);
            this.pointsMesh.position.set(0, -0.15, 0);
            this.scene.add(this.pointsMesh);
        }

        onResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;

            if (width < 768) {
                this.camera.position.z = 8.0;
            } else if (width < 1200) {
                this.camera.position.z = 6.8;
            } else {
                this.camera.position.z = 6.2;
            }

            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        onMouseMove(e) {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            this.targetRotY = this.mouseX * 0.32 * this.mouseSensitivity;
            this.targetRotX = -this.mouseY * 0.22 * this.mouseSensitivity;

            this.mouseRayPos.set(this.mouseX * 2.8, this.mouseY * 2.0, 0.5);
        }

        updatePhysics() {
            if (!this.positions || !this.initialPositions) return;

            const spring = 0.08;
            const damping = 0.88;
            const repelRadiusSq = 1.0;
            const repelStrength = 0.14;

            const mx = this.mouseRayPos.x;
            const my = this.mouseRayPos.y;
            const mz = this.mouseRayPos.z;

            for (let i = 0; i < this.positions.length; i += 3) {
                const px = this.positions[i];
                const py = this.positions[i + 1];
                const pz = this.positions[i + 2];

                const ox = this.initialPositions[i];
                const oy = this.initialPositions[i + 1];
                const oz = this.initialPositions[i + 2];

                let fx = (ox - px) * spring;
                let fy = (oy - py) * spring;
                let fz = (oz - pz) * spring;

                const dx = px - mx;
                const dy = py - my;
                const dz = pz - mz;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < repelRadiusSq && distSq > 0.001) {
                    const factor = (1 - distSq / repelRadiusSq) * repelStrength;
                    fx += (dx / Math.sqrt(distSq)) * factor;
                    fy += (dy / Math.sqrt(distSq)) * factor;
                    fz += (dz / Math.sqrt(distSq)) * factor;
                }

                this.velocities[i] = (this.velocities[i] + fx) * damping;
                this.velocities[i + 1] = (this.velocities[i + 1] + fy) * damping;
                this.velocities[i + 2] = (this.velocities[i + 2] + fz) * damping;

                this.positions[i] += this.velocities[i];
                this.positions[i + 1] += this.velocities[i + 1];
                this.positions[i + 2] += this.velocities[i + 2];
            }

            this.geometry.attributes.position.needsUpdate = true;
        }

        animate() {
            requestAnimationFrame(this.animate.bind(this));

            const elapsed = this.clock.getElapsedTime();

            if (this.pointsMesh) {
                this.pointsMesh.rotation.y += (this.targetRotY - this.pointsMesh.rotation.y) * 0.06;
                this.pointsMesh.rotation.x += (this.targetRotX - this.pointsMesh.rotation.x) * 0.06;

                const breathe = Math.sin(elapsed * 1.4) * 0.035;
                this.pointsMesh.position.y = -0.15 + breathe;

                this.updatePhysics();
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    /* ==========================================================================
       3. GSAP & CANVAS INTRO SEQUENCE & HERO SEAMLESS PLACEMENT
       Phase 1: Center solid white dot appears & pulses.
       Phase 2: Dot rapidly expands horizontally; scattered letters assemble into "PORTFOLIO" first.
       Phase 3: Holds on "PORTFOLIO", then triggers 1.5s rapid scramble & glitch cypher morph into "MOHIT AGARWAL".
       Phase 4: Settle on "MOHIT AGARWAL", "PORTFOLIO" is gone, and the landing page appears with
                "MOHIT AGARWAL" remaining permanently displayed in the exact right position!
       ========================================================================== */
    const CYPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$[]/*{}~&@!%|<>+=-?^';

    class IntroSequenceMaster {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId) || document.getElementById('text-canvas') || document.getElementById('intro-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');

            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            this.state = {
                phase: 1, // 1: Dot, 2: Assemble PORTFOLIO, 3: Hold PORTFOLIO, 4: Morph to MOHIT AGARWAL, 5: Settle & stay on MOHIT AGARWAL
                dotScale: 0,
                dotScaleX: 1,
                dotScaleY: 1,
                dotOpacity: 0,
                textOpacity: 0,
                textScale: 0.85,
                scrambleProgress: 0,
                settleGlow: 0,
                glitchSlice: 0
            };

            this.masterTL = null;
            this.initCanvas();
            window.addEventListener('resize', this.onResize.bind(this));
            this.renderLoop();
        }

        initCanvas() {
            if (!this.canvas) return;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            if (this.ctx.resetTransform) {
                this.ctx.resetTransform();
            } else {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            this.ctx.scale(this.dpr, this.dpr);
        }

        onResize() {
            this.initCanvas();
        }

        getFontSize(textLen = 13) {
            // "PORTFOLIO" (9 chars) vs "MOHIT AGARWAL" (13 chars)
            const baseVw = textLen > 10 ? 0.082 : 0.098;
            const vw = this.width * baseVw;
            const minSize = textLen > 10 ? 28 : 36;
            const maxSize = textLen > 10 ? 128 : 155;
            return Math.max(minSize, Math.min(vw, maxSize));
        }

        startSequence() {
            if (!this.canvas) return;
            if (this.masterTL) this.masterTL.kill();

            sound.init();
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.body.classList.add('is-loading');

            const heroContent = document.getElementById('hero-content') || document.getElementById('hero-container');
            const header = document.getElementById('site-header');
            const scrollIndicator = document.getElementById('scroll-indicator');
            const portraitCanvas = document.getElementById('portrait-canvas');
            const textCanvas = this.canvas;

            // Reset Initial States
            if (heroContent) {
                gsap.set(heroContent, { opacity: 0, y: 15, xPercent: -50, left: '50%' });
            }
            if (header) {
                gsap.set(header, { opacity: 0, y: -20 });
            }
            if (scrollIndicator) {
                gsap.set(scrollIndicator, { opacity: 0 });
            }
            if (portraitCanvas) {
                gsap.set(portraitCanvas, { opacity: 0 });
            }
            if (textCanvas) {
                gsap.set(textCanvas, { opacity: 1 });
            }

            this.state.phase = 1;
            this.state.dotScale = 0;
            this.state.dotScaleX = 1;
            this.state.dotScaleY = 1;
            this.state.dotOpacity = 0;
            this.state.textOpacity = 0;
            this.state.textScale = 0.85;
            this.state.scrambleProgress = 0;
            this.state.settleGlow = 0;
            this.state.glitchSlice = 0;

            this.masterTL = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove('is-loading');
                }
            });

            // PHASE 1: Screen completely black, solid white dot in exact center
            this.masterTL.add(() => {
                sound.playDotPop();
            }, 0.3);

            this.masterTL.to(this.state, {
                dotScale: 1,
                dotOpacity: 1,
                duration: 0.45,
                ease: 'back.out(2.5)'
            }, 0.3);

            // Dot pulse
            this.masterTL.to(this.state, {
                dotScale: 1.4,
                duration: 0.35,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 1
            }, 0.8);

            // PHASE 2: Dot rapidly expands horizontally
            this.masterTL.add(() => {
                sound.playWhoosh();
            }, 1.4);

            this.masterTL.to(this.state, {
                dotScaleX: 65,
                dotScaleY: 0.15,
                duration: 0.22,
                ease: 'power4.in'
            }, 1.4);

            // Scattered letters resolve into "PORTFOLIO" first
            this.masterTL.add(() => {
                this.state.phase = 2;
            }, 1.62);

            this.masterTL.to(this.state, {
                dotOpacity: 0,
                textOpacity: 1,
                textScale: 1.0,
                duration: 0.25,
                ease: 'power3.out'
            }, 1.62);

            // Scattered letters cycling and locking into "PORTFOLIO"
            this.masterTL.to(this.state, {
                scrambleProgress: 1.0,
                duration: 0.7,
                ease: 'power2.out'
            }, 1.62);

            // Hold solid on "PORTFOLIO"
            this.masterTL.add(() => {
                this.state.phase = 3;
                this.state.scrambleProgress = 0;
                sound.playLockImpact();
            }, 2.32);

            // PHASE 3 (THE MORPH): "PORTFOLIO" scrambles into "MOHIT AGARWAL" (1.5s rapid scramble & glitch)
            this.masterTL.add(() => {
                this.state.phase = 4;
            }, 2.92);

            this.masterTL.to(this.state, {
                scrambleProgress: 1.0,
                duration: 1.5,
                ease: 'linear'
            }, 2.92);

            // PHASE 4 (THE SETTLE): Settle on "MOHIT AGARWAL", "PORTFOLIO" disappears
            this.masterTL.add(() => {
                this.state.phase = 5;
                this.state.settleGlow = 1.0;
                sound.playLockImpact();
            }, 4.42);

            this.masterTL.to(this.state, {
                settleGlow: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, 4.42);

            // LANDING PAGE REVEAL:
            // "MOHIT AGARWAL" REMAINS PROMINENTLY ON THE PAGE (textCanvas stays at opacity 1 permanently!)
            // 1. Reveal hero content (subtitle & action buttons) directly below MOHIT AGARWAL
            if (heroContent) {
                this.masterTL.to(heroContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, 4.48);
            }

            // 2. Three.js Background particle portrait fades in directly behind MOHIT AGARWAL
            if (portraitCanvas) {
                this.masterTL.to(portraitCanvas, {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                }, 4.52);
            }

            // 3. Header: "Mohit Agarwal" brand and nav links fade in at the top
            if (header) {
                this.masterTL.to(header, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, 4.6);
            }

            // 4. Scroll prompt fades in at the bottom
            if (scrollIndicator) {
                this.masterTL.to(scrollIndicator, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                }, 4.75);
            }
        }

        renderLoop() {
            requestAnimationFrame(this.renderLoop.bind(this));

            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            ctx.clearRect(0, 0, w, h);

            const centerX = w / 2;
            const centerY = w < 768 ? h * 0.42 : h * 0.44;

            // DRAW PHASE 1: Center Dot
            if (this.state.dotOpacity > 0.001) {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.scale(this.state.dotScaleX, this.state.dotScaleY);

                const baseRadius = 4.5 * this.state.dotScale;
                ctx.fillStyle = `rgba(255, 255, 255, ${this.state.dotOpacity})`;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
                ctx.shadowBlur = 18;

                ctx.beginPath();
                ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }

            // DRAW PHASES 2, 3, 4, 5: Typography
            if (this.state.textOpacity > 0.001) {
                let stringToRender = '';

                if (this.state.phase === 2) {
                    // Phase 2: Scattered letters assemble into "PORTFOLIO"
                    const target = 'PORTFOLIO';
                    const targetLen = target.length;
                    const p = this.state.scrambleProgress;
                    const lockedCount = Math.floor(p * targetLen);

                    const charArr = [];
                    for (let i = 0; i < targetLen; i++) {
                        if (i < lockedCount || p >= 1.0) {
                            charArr.push(target[i]);
                        } else {
                            const randGlyph = CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                            charArr.push(randGlyph);
                            if (Math.random() < 0.12) sound.playGlitchTick();
                        }
                    }
                    stringToRender = charArr.join('');

                    if (Math.random() < 0.25) {
                        this.state.glitchSlice = (Math.random() - 0.5) * 6;
                    } else {
                        this.state.glitchSlice = 0;
                    }
                } else if (this.state.phase === 3) {
                    // Phase 3: Hold "PORTFOLIO"
                    stringToRender = 'PORTFOLIO';
                    this.state.glitchSlice = 0;
                } else if (this.state.phase === 4) {
                    // Phase 4: The Morph — "PORTFOLIO" scrambles into "MOHIT AGARWAL"
                    const source = 'PORTFOLIO';
                    const target = 'MOHIT AGARWAL';
                    const sourceLen = source.length;
                    const targetLen = target.length;

                    const p = this.state.scrambleProgress;
                    const currentLen = Math.round(sourceLen + p * (targetLen - sourceLen));

                    const lockStart = 0.5;
                    const lockProgress = Math.max(0, (p - lockStart) / (1 - lockStart));
                    const lockedCount = Math.floor(lockProgress * targetLen);

                    const charArr = [];
                    for (let i = 0; i < currentLen; i++) {
                        if (i < lockedCount || p >= 1.0) {
                            charArr.push(target[i]);
                        } else {
                            if (target[i] === ' ' && Math.random() > 0.4) {
                                charArr.push(' ');
                            } else {
                                const randGlyph = CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                                charArr.push(randGlyph);
                                if (Math.random() < 0.15) sound.playGlitchTick();
                            }
                        }
                    }
                    stringToRender = charArr.join('');

                    if (Math.random() < 0.3) {
                        this.state.glitchSlice = (Math.random() - 0.5) * 8;
                    } else {
                        this.state.glitchSlice = 0;
                    }
                } else if (this.state.phase === 5) {
                    // Phase 5: "PORTFOLIO" is gone, settled on "MOHIT AGARWAL" permanently
                    stringToRender = 'MOHIT AGARWAL';
                    this.state.glitchSlice = 0;
                }

                const fontSize = this.getFontSize(stringToRender.length);
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.scale(this.state.textScale, this.state.textScale);

                ctx.font = `900 ${fontSize}px 'Syne', 'Inter', -apple-system, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const textWidth = ctx.measureText(stringToRender).width;
                const maxAvailable = w * 0.90;
                if (textWidth > maxAvailable && textWidth > 0) {
                    const fitScale = maxAvailable / textWidth;
                    ctx.scale(fitScale, fitScale);
                }

                ctx.fillStyle = '#ffffff';

                if (this.state.settleGlow > 0) {
                    ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                    ctx.shadowBlur = 35 * this.state.settleGlow;
                } else {
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
                    ctx.shadowBlur = 24;
                }

                if (this.state.glitchSlice !== 0) {
                    ctx.fillText(stringToRender, this.state.glitchSlice, 0);
                } else {
                    ctx.fillText(stringToRender, 0, 0);
                }

                ctx.restore();
            }
        }
    }

    /* ==========================================================================
       4. APPLICATION BOOTSTRAP & INTERACTION HOOKS
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Initialize Three.js Particle Portrait
        const portrait = new ParticlePortrait('portrait-canvas');

        // 2. Initialize & Trigger Exact GSAP Canvas Text-Morphing Sequence
        const introMaster = new IntroSequenceMaster('text-canvas');
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                introMaster.startSequence();
            });
        } else {
            introMaster.startSequence();
        }

        // 3. Custom Cursor Movement
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorDot && cursorRing) {
            window.addEventListener('mousemove', (e) => {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
                cursorRing.style.left = `${e.clientX}px`;
                cursorRing.style.top = `${e.clientY}px`;
            });

            const interactives = document.querySelectorAll('a, button, input, textarea, .chip, .btn-primary, .btn-secondary, .btn-tertiary');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
            });
        }

        // 4. Header Scroll Blur & Scrollspy
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

            sections.forEach(sec => {
                const top = sec.offsetTop - 180;
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // 5. Mobile Drawer Navigation
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (mobileToggle && mobileDrawer) {
            mobileToggle.addEventListener('click', () => {
                mobileDrawer.classList.toggle('is-open');
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileDrawer.classList.remove('is-open');
                });
            });
        }

        // 6. Clean, Human Contact Form Handling
        const contactForm = document.getElementById('contact-form');
        const formFeedback = document.getElementById('form-feedback');

        if (contactForm && formFeedback) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                formFeedback.innerHTML = `<span style="color:#ffffff;">Thank you, ${name}! Your message has been prepared for transmission.</span>`;
                sound.playWhoosh();

                setTimeout(() => {
                    contactForm.reset();
                }, 1500);
            });
        }
    });

})();
