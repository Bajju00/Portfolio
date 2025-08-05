// --- Force page to load at the top on refresh ---
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }
        }

// --- Navbar Style on Scroll ---
        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('navbar-scrolled');
            } else {
                nav.classList.remove('navbar-scrolled');
            }
        });

        // --- Mobile Navigation ---
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksList = document.querySelectorAll('.nav-links li a');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });

        // --- Smoke Particle Effect ---
        const smokeContainer = document.getElementById('smoke-container');
        if (smokeContainer) {
            let canCreateParticle = true;
            function createSmokeParticle(x, y) {
                const particle = document.createElement('div');
                particle.className = 'smoke-particle';
                const size = Math.random() * 20 + 10;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${x - size / 2}px`;
                particle.style.top = `${y - size / 2}px`;
                smokeContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }

            if (window.matchMedia('(pointer: fine)').matches) {
                document.addEventListener('mousemove', (e) => {
                    if (navLinks.classList.contains('active')) return;
                    if (canCreateParticle) {
                        createSmokeParticle(e.clientX, e.clientY);
                        canCreateParticle = false;
                        setTimeout(() => {
                            canCreateParticle = true;
                        }, 50);
                    }
                });
            }
        }

        
        // --- MODIFIED particles.js Configuration ---
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js", function(){
            // Existing particles for the #home section
            particlesJS('particles-js',
              {
                "particles": {
                  "number": { "value": 80, "density": { "enable": true, "value_area": 800 }},
                  "color": { "value": "#b1c900" },
                  "shape": { "type": "circle" },
                  "opacity": { "value": 0.5, "random": true },
                  "size": { "value": 4, "random": true },
                  "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                  },
                  "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": { "enable": false, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                  },
                  "modes": {
                    "push": { "particles_nb": 4 }
                  }
                },
                "retina_detect": true
              }
            );

            // NEW global background particles with white dots
            particlesJS('global-particles-js',
              {
                "particles": {
                  "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                  "color": { "value": "#ffffff" },
                  "shape": { "type": "circle" },
                  "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                  "size": { "value": 2, "random": true, "anim": { "enable": false } },
                  "line_linked": { "enable": false }, // No lines between particles
                  "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true },
                },
                "retina_detect": true
              }
            );
        });


// Animation trigger for about section
const aboutSection = document.querySelector('#about');
const aboutTitle = document.querySelector('#about .section-title');
const aboutContent = document.querySelector('.about-content');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutTitle.style.animation = 'fadeInDown 0.8s ease-out forwards';
            aboutContent.classList.add('animate');
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(aboutSection);


/// Education Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.querySelector('#education');
    const educationTitle = document.querySelector('#education .section-title');
    const educationItems = document.querySelectorAll('.education-item');
    
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // First animate the section and title
                educationSection.classList.add('animate');
                educationTitle.classList.add('animate');
                
                // Then animate each education item with a delay
                educationItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                educationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    educationObserver.observe(educationSection);
});