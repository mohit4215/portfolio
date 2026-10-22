/**
 * MOHIT AGARWAL — CINEMATIC MONOCHROME PORTFOLIO
 * High-Performance GSAP & Canvas Text-Morphing Sequence with Three.js 3D Particle Portrait
 */

(function () {
    'use strict';

    /* ==========================================================================
       1. SYNTHETIC AUDIO ENGINE (Web Audio API)
       Pure programmatic sound synthesis: no external files or latency
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

        toggle() {
            this.enabled = !this.enabled;
            if (this.enabled) this.init();
            return this.enabled;
        }

        // Phase 1: Dead-center white dot pop
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

        // Phase 2: Dot expansion whoosh
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

        // Phase 3: High-speed glitch cypher tick
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

        // Phase 4: Settle impact lock
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
       Organically forms the silhouette of a person looking forward directly behind "PORTFOLIO"
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

            // 1. Head & Facial Silhouette (Looking directly forward)
            // Head center is y ~ 0.9. Chin at y ~ 0.1, crown at y ~ 2.0
            for (let i = 0; i < 14000; i++) {
                const u = (Math.random() - 0.5) * Math.PI * 1.8; // Azimuth around face
                const y = Math.random() * 2.0; // Vertical span

                let radX = 0.82;
                let radZ = 0.95;
                let zOffset = 0;
                let brightness = 0.85;

                // Nose Bridge & Tip (y: 0.45 to 0.88, projecting forward)
                if (y > 0.45 && y < 0.88 && Math.abs(u) < 0.28) {
                    const noseProgress = 1 - Math.abs(y - 0.62) / 0.26;
                    zOffset += 0.38 * Math.pow(Math.max(0, noseProgress), 1.4);
                    brightness = 1.0;
                }

                // Eye Sockets (y: 0.82 to 0.96, u: +/- 0.38)
                const eyeL = Math.hypot(u - 0.38, y - 0.88);
                const eyeR = Math.hypot(u + 0.38, y - 0.88);
                if (eyeL < 0.22 || eyeR < 0.22) {
                    zOffset -= 0.18;
                    brightness = 0.45;
                }

                // Brow Ridge (y: 0.98 to 1.12)
                if (y > 0.98 && y < 1.12 && Math.abs(u) < 0.65) {
                    zOffset += 0.16;
                    brightness = 1.0;
                }

                // Cheekbones (y: 0.55 to 0.75, u: +/- 0.55)
                if (y > 0.55 && y < 0.75 && (Math.abs(u - 0.55) < 0.22 || Math.abs(u + 0.55) < 0.22)) {
                    zOffset += 0.15;
                    brightness = 0.95;
                }

                // Lips (y: 0.22 to 0.38, u: +/- 0.3)
                if (y > 0.22 && y < 0.38 && Math.abs(u) < 0.3) {
                    zOffset += 0.15;
                    brightness = 0.92;
                }

                // Chin (y: 0.0 to 0.18, u: +/- 0.25)
                if (y >= 0.0 && y < 0.18 && Math.abs(u) < 0.25) {
                    zOffset += 0.22;
                    brightness = 0.95;
                }

                // Modern Hair/Crown volume (y: 1.2 to 2.15)
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

            // 2. Neck column (y: -0.85 to 0.0)
            for (let i = 0; i < 4000; i++) {
                const angle = Math.random() * Math.PI * 2;
                const y = -0.05 - Math.random() * 0.75;
                const radius = 0.44 + (Math.abs(y) * 0.06) + (Math.random() - 0.5) * 0.04;

                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius * 0.9;
                const brightness = 0.65 + Math.random() * 0.25;

                addPoint(x, y + 0.05, z, brightness, brightness, brightness);
            }

            // 3. Trapezius & Broad Shoulders (y: -0.8 to -2.4, x: +/- 2.6)
            for (let i = 0; i < 8500; i++) {
                const side = Math.random() > 0.5 ? 1 : -1;
                const progress = Math.random(); // 0 (neck) to 1 (deltoid)

                const x = side * (0.45 + progress * 2.2);
                const y = -0.8 - progress * 1.15 - Math.random() * 0.75;
                const z = (Math.random() - 0.5) * 0.75 + 0.15 * Math.cos(progress * Math.PI * 0.5);

                const brightness = 0.55 + Math.random() * 0.3;
                addPoint(x, y + 0.05, z, brightness, brightness, brightness);
            }

            // 4. Ambient Floating Nodes
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
                opacity: 0.88,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                vertexColors: true
            });

            this.pointsMesh = new THREE.Points(this.geometry, material);
            // Center the bust vertically directly behind the word "PORTFOLIO"
            this.pointsMesh.position.set(0, -0.22, 0);
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

        triggerRepulsionBurst() {
            if (!this.positions) return;
            for (let i = 0; i < this.positions.length; i += 3) {
                this.velocities[i] += (Math.random() - 0.5) * 1.6;
                this.velocities[i + 1] += (Math.random() - 0.5) * 1.6;
                this.velocities[i + 2] += (Math.random() - 0.5) * 1.6;
            }
        }

        resetMesh() {
            if (!this.positions) return;
            for (let i = 0; i < this.positions.length; i++) {
                this.positions[i] = this.initialPositions[i];
                this.velocities[i] = 0;
            }
            if (this.geometry) {
                this.geometry.attributes.position.needsUpdate = true;
            }
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

            // Optimized physics update loop
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
                // Parallax rotation smoothly tracking cursor
                this.pointsMesh.rotation.y += (this.targetRotY - this.pointsMesh.rotation.y) * 0.06;
                this.pointsMesh.rotation.x += (this.targetRotX - this.pointsMesh.rotation.x) * 0.06;

                // Organic breathing motion
                const breathe = Math.sin(elapsed * 1.4) * 0.035;
                this.pointsMesh.position.y = -0.22 + breathe;

                // Interactive physics
                this.updatePhysics();
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    /* ==========================================================================
       3. GSAP & CANVAS TEXT-MORPHING ENGINE
       Exact Loading Sequence:
       Phase 1: Pure black screen, dead-center solid white dot appears & pulses.
       Phase 2: Dot rapidly expands horizontally into "MOHIT AGARWAL" in massive bold sans-serif font.
       Phase 3 (The Morph): "MOHIT AGARWAL" immediately triggers 1.5s rapid scramble & glitch cycling.
       Phase 4 (The Settle): Letters lock into place, settling permanently on "PORTFOLIO".
       Final Hero Layout: Background portrait, subtitle, and top header fade in.
       ========================================================================== */
    const CYPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$[]/*{}~&@!%|<>+=-?^';

    class CanvasTextMorphEngine {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');

            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            // Morph Animation State (Orchestrated by GSAP)
            this.state = {
                phase: 1,              // 1: Center Dot, 2: "MOHIT AGARWAL", 3: Morph Scramble, 4: Settle "PORTFOLIO"
                dotScale: 0,           // 0 to 1
                dotScaleX: 1,          // Expansion factor
                dotScaleY: 1,
                dotOpacity: 0,
                textOpacity: 0,        // Text visibility
                textScale: 0.85,
                scrambleProgress: 0,   // 0 to 1 during Phase 3
                currentChars: [],      // Rendered characters
                settleGlow: 0,         // Post-settle impact flash
                glitchSlice: 0         // Horizontal slice displacement
            };

            this.masterTL = null;
            this.portraitInstance = null;

            this.initCanvas();
            window.addEventListener('resize', this.onResize.bind(this));
            this.renderLoop();
        }

        initCanvas() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.ctx.scale(this.dpr, this.dpr);
        }

        onResize() {
            this.initCanvas();
        }

        getFontSize() {
            // Massive, bold sans-serif font: clamp(3rem, 11vw, 11.5rem)
            const vw = this.width * 0.11;
            const minSize = 48;
            const maxSize = 184;
            return Math.max(minSize, Math.min(vw, maxSize));
        }

        startSequence(portraitInstance) {
            this.portraitInstance = portraitInstance;
            if (this.masterTL) this.masterTL.kill();

            sound.init();
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.body.classList.add('is-loading');

            // Reset UI Elements
            const subtitle = document.getElementById('hero-subtitle');
            const header = document.getElementById('site-header');
            const meta = document.getElementById('hero-meta');
            const scrollPrompt = document.getElementById('scroll-prompt');
            const portraitCanvas = document.getElementById('portrait-canvas');
            const controlDock = document.getElementById('control-dock');

            gsap.set(subtitle, { opacity: 0, y: 25 });
            gsap.set(header, { opacity: 0, y: -20 });
            gsap.set([meta, scrollPrompt], { opacity: 0, y: 15 });
            gsap.set(portraitCanvas, { opacity: 0 });
            gsap.set(controlDock, { opacity: 0 });

            // Reset Canvas State
            this.state.phase = 1;
            this.state.dotScale = 0;
            this.state.dotScaleX = 1;
            this.state.dotScaleY = 1;
            this.state.dotOpacity = 0;
            this.state.textOpacity = 0;
            this.state.textScale = 0.85;
            this.state.scrambleProgress = 0;
            this.state.currentChars = 'MOHIT AGARWAL'.split('');
            this.state.settleGlow = 0;
            this.state.glitchSlice = 0;

            this.masterTL = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove('is-loading');
                }
            });

            // ==========================================================
            // PHASE 1: Screen completely black.
            // A single, solid white dot appears in the exact dead center.
            // ==========================================================
            this.masterTL.add(() => {
                sound.playDotPop();
            }, 0.35);

            this.masterTL.to(this.state, {
                dotScale: 1,
                dotOpacity: 1,
                duration: 0.45,
                ease: 'back.out(2.5)'
            }, 0.35);

            // Dot pulses once in dead center
            this.masterTL.to(this.state, {
                dotScale: 1.4,
                duration: 0.35,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 1
            }, 0.85);

            // ==========================================================
            // PHASE 2: Dot rapidly expands and transforms into
            // "MOHIT AGARWAL" in a massive, bold, sans-serif white font.
            // ==========================================================
            this.masterTL.add(() => {
                sound.playWhoosh();
            }, 1.45);

            // Rapid horizontal expansion across center line
            this.masterTL.to(this.state, {
                dotScaleX: 65,
                dotScaleY: 0.15,
                duration: 0.22,
                ease: 'power4.in'
            }, 1.45);

            // Transforms into "MOHIT AGARWAL"
            this.masterTL.add(() => {
                this.state.phase = 2;
                this.state.currentChars = 'MOHIT AGARWAL'.split('');
            }, 1.65);

            this.masterTL.to(this.state, {
                dotOpacity: 0,
                textOpacity: 1,
                textScale: 1.0,
                duration: 0.28,
                ease: 'power3.out'
            }, 1.65);

            // Holds crisp on "MOHIT AGARWAL" for ~0.35s
            // ==========================================================
            // PHASE 3 (THE MORPH): Immediately triggers rapid scramble/glitch.
            // Individual letters dynamically cycle and flip through random
            // characters for about 1.5 seconds.
            // ==========================================================
            this.masterTL.add(() => {
                this.state.phase = 3;
            }, 2.0);

            // Exactly 1.5 seconds of high-speed cypher scramble (2.0s to 3.5s)
            this.masterTL.to(this.state, {
                scrambleProgress: 1.0,
                duration: 1.5,
                ease: 'linear'
            }, 2.0);

            // ==========================================================
            // PHASE 4 (THE SETTLE): Scrambled letters lock into place,
            // settling permanently on "PORTFOLIO" in massive bold white font.
            // ==========================================================
            this.masterTL.add(() => {
                this.state.phase = 4;
                this.state.currentChars = 'PORTFOLIO'.split('');
                this.state.settleGlow = 1.0;
                sound.playLockImpact();
            }, 3.5);

            this.masterTL.to(this.state, {
                settleGlow: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, 3.5);

            // ==========================================================
            // THE FINAL HERO LAYOUT (Fades in after Phase 4):
            // 1. Background Particle Portrait fades in behind "PORTFOLIO"
            // 2. Subtitle fades in directly below "PORTFOLIO"
            // 3. Minimalist Header fades in at top
            // ==========================================================
            this.masterTL.to(portraitCanvas, {
                opacity: 1,
                duration: 1.4,
                ease: 'power2.out'
            }, 3.6);

            this.masterTL.to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power3.out'
            }, 3.8);

            this.masterTL.to(header, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power3.out'
            }, 3.9);

            this.masterTL.to([meta, scrollPrompt], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            }, 4.1);

            this.masterTL.to(controlDock, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, 4.3);
        }

        renderLoop() {
            requestAnimationFrame(this.renderLoop.bind(this));

            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            // Clear Canvas
            ctx.clearRect(0, 0, w, h);

            const centerX = w / 2;
            const centerY = h / 2;

            // ----------------------------------------------------
            // DRAW PHASE 1 & 2: Center White Dot & Expansion
            // ----------------------------------------------------
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

            // ----------------------------------------------------
            // DRAW PHASE 2, 3, 4: Massive Bold White Text
            // ----------------------------------------------------
            if (this.state.textOpacity > 0.001) {
                const fontSize = this.getFontSize();
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.scale(this.state.textScale, this.state.textScale);

                ctx.font = `900 ${fontSize}px 'Syne', 'Inter', -apple-system, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                let stringToRender = '';

                if (this.state.phase === 2) {
                    stringToRender = 'MOHIT AGARWAL';
                } else if (this.state.phase === 3) {
                    // Phase 3 (The Morph): 1.5s Rapid Scramble/Glitch Animation
                    const target = 'PORTFOLIO';
                    const targetLen = target.length; // 9
                    const sourceLen = 13; // "MOHIT AGARWAL"

                    const p = this.state.scrambleProgress; // 0 to 1

                    // Character count contracts smoothly from 13 down to 9
                    const currentLen = Math.round(sourceLen - p * (sourceLen - targetLen));

                    // Progressive left-to-right locking between progress 0.6 and 1.0
                    const lockStart = 0.55;
                    const lockProgress = Math.max(0, (p - lockStart) / (1 - lockStart));
                    const lockedCount = Math.floor(lockProgress * targetLen);

                    const charArr = [];
                    for (let i = 0; i < currentLen; i++) {
                        if (i < targetLen) {
                            if (i < lockedCount || p >= 1.0) {
                                charArr.push(target[i]);
                            } else {
                                // High-speed dynamic cycling of cypher glyphs
                                const randGlyph = CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                                charArr.push(randGlyph);
                                if (Math.random() < 0.15) sound.playGlitchTick();
                            }
                        } else {
                            // Excess character collapsing
                            const randGlyph = CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                            charArr.push(randGlyph);
                        }
                    }

                    stringToRender = charArr.join('');

                    // Digital Glitch Horizontal Slice Displacement
                    if (Math.random() < 0.28) {
                        this.state.glitchSlice = (Math.random() - 0.5) * 8;
                    } else {
                        this.state.glitchSlice = 0;
                    }
                } else if (this.state.phase === 4) {
                    stringToRender = 'PORTFOLIO';
                }

                // Render Main Text
                ctx.fillStyle = '#ffffff';

                // Lock-in Impact Glow
                if (this.state.settleGlow > 0) {
                    ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                    ctx.shadowBlur = 35 * this.state.settleGlow;
                } else {
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
                    ctx.shadowBlur = 24;
                }

                // Draw Text with micro-glitch slice offset
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
        // 1. Initialize Three.js Particle Portrait (Directly Behind Text)
        const portrait = new ParticlePortrait('portrait-canvas');

        // 2. Initialize & Trigger Exact GSAP & Canvas Text-Morphing Loading Sequence
        const textEngine = new CanvasTextMorphEngine('text-canvas');
        textEngine.startSequence(portrait);

        // 3. Replay Intro Button
        const btnReplay = document.getElementById('btn-replay');
        if (btnReplay) {
            btnReplay.addEventListener('click', () => {
                textEngine.startSequence(portrait);
            });
        }

        // 4. Synthesized Audio Toggle
        const btnSound = document.getElementById('btn-sound');
        const soundLabel = document.getElementById('sound-label');
        const soundIcon = document.getElementById('sound-icon');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                const isEnabled = sound.toggle();
                if (soundLabel) soundLabel.textContent = isEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
                if (soundIcon) soundIcon.textContent = isEnabled ? '◒' : '○';
            });
        }

        // 5. Custom Cursor Movement
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorDot && cursorRing) {
            window.addEventListener('mousemove', (e) => {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
                cursorRing.style.left = `${e.clientX}px`;
                cursorRing.style.top = `${e.clientY}px`;
            });

            const interactives = document.querySelectorAll('a, button, input, textarea, .preset-pill, .control-btn');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
            });
        }

        // 6. Header Scroll Blur & Scrollspy
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

        // 7. Mobile Drawer Navigation
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

        // 8. Components Lab: Live Interactive Text Scrambler
        const demoDisplay = document.getElementById('demo-scramble-display');
        const demoInput = document.getElementById('demo-input');
        const btnRunScramble = document.getElementById('btn-run-scramble');
        const presetPills = document.querySelectorAll('.preset-pill');

        if (demoDisplay) {
            let demoInterval = null;

            const runScrambleDemo = (targetWord) => {
                clearInterval(demoInterval);
                const duration = 1200;
                const startTime = performance.now();
                const targetLen = targetWord.length;

                demoInterval = setInterval(() => {
                    const elapsed = performance.now() - startTime;
                    const p = Math.min(1, elapsed / duration);
                    const lockedCount = Math.floor(p * targetLen);

                    let res = '';
                    for (let i = 0; i < targetLen; i++) {
                        if (i < lockedCount || p >= 1) {
                            res += targetWord[i];
                        } else {
                            res += CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                        }
                    }
                    demoDisplay.textContent = res;
                    sound.playGlitchTick();

                    if (p >= 1) {
                        clearInterval(demoInterval);
                        sound.playLockImpact();
                    }
                }, 35);
            };

            if (btnRunScramble && demoInput) {
                btnRunScramble.addEventListener('click', () => {
                    const val = (demoInput.value || 'CYPHER').toUpperCase().trim();
                    runScrambleDemo(val);
                });
            }

            presetPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    const text = pill.getAttribute('data-text');
                    if (demoInput) demoInput.value = text;
                    runScrambleDemo(text);
                });
            });
        }

        // 9. Components Lab: 3D Particle Controls
        const sliderParticleSize = document.getElementById('slider-particle-size');
        const labelParticleSize = document.getElementById('label-particle-size');
        const sliderParallax = document.getElementById('slider-parallax');
        const labelParallax = document.getElementById('label-parallax');
        const btnBurst = document.getElementById('btn-particle-burst');
        const btnResetMesh = document.getElementById('btn-reset-bust');

        if (portrait) {
            if (sliderParticleSize) {
                sliderParticleSize.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    if (labelParticleSize) labelParticleSize.textContent = val.toFixed(3);
                    if (portrait.pointsMesh) {
                        portrait.pointsMesh.material.size = val;
                    }
                });
            }

            if (sliderParallax) {
                sliderParallax.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    if (labelParallax) labelParallax.textContent = `${val.toFixed(1)}x`;
                    portrait.mouseSensitivity = val;
                });
            }

            if (btnBurst) {
                btnBurst.addEventListener('click', () => {
                    portrait.triggerRepulsionBurst();
                });
            }

            if (btnResetMesh) {
                btnResetMesh.addEventListener('click', () => {
                    portrait.resetMesh();
                });
            }
        }

        // 10. Contact Terminal Form
        const contactForm = document.getElementById('contact-form');
        const formLog = document.getElementById('form-log');

        if (contactForm && formLog) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                formLog.innerHTML = `<span style="color:#ffffff;">> TRANSMITTING PACKET FROM [${email}]...</span>`;
                sound.playWhoosh();

                setTimeout(() => {
                    formLog.innerHTML = `<span style="color:#ffffff;">> ENCRYPTED PACKET RECEIVED. ACKNOWLEDGED FOR [${name.toUpperCase()}]. STATUS: 200 OK</span>`;
                    sound.playLockImpact();
                    contactForm.reset();
                }, 1200);
            });
        }
    });

})();
