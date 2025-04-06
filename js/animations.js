/**
 * Animation Effects
 * Author: Men0ast
 * Version: 2.0
 */

// Initialize animations when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initRevealAnimations();
    initSkillBars();
    initTypewriterEffect();
    initMatrixEffect();
    initHackerTerminal();
});

// Reveal animations on scroll
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    // Initial check for elements in viewport
    checkReveal();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkReveal);
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
}

// Initialize skill bars animation
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                
                // Reset width to 0 before animation
                skillLevel.style.width = '0%';
                
                // Animate to the target width
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 100);
                
                // Unobserve after animation
                observer.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all skill levels
    skillLevels.forEach(skillLevel => {
        observer.observe(skillLevel);
    });
}

// Typewriter effect for hero section
function initTypewriterEffect() {
    const element = document.querySelector('.hero-section h2');
    
    if (element) {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const speed = 100; // typing speed in milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start the effect when the hero section is in view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500); // delay start for better effect
                observer.unobserve(element);
            }
        }, { threshold: 0.5 });
        
        observer.observe(element);
    }
}

// Matrix effect for background
function initMatrixEffect() {
    // Create canvas for matrix effect in script cards
    document.querySelectorAll('.script-img').forEach(imgContainer => {
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-canvas');
        canvas.width = imgContainer.offsetWidth;
        canvas.height = imgContainer.offsetHeight;
        imgContainer.appendChild(canvas);
        
        // Get context
        const ctx = canvas.getContext('2d');
        
        // Characters to display
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const columns = canvas.width / 10;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height);
        }
        
        // Draw matrix effect
        function drawMatrix() {
            // Semi-transparent black for fading effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set text color
            const scriptCategory = imgContainer.closest('.script-card').getAttribute('data-category');
            
            if (scriptCategory === 'anticheat') {
                ctx.fillStyle = '#FF6B6B';
            } else if (scriptCategory === 'utility') {
                ctx.fillStyle = '#4A45B5';
            } else {
                ctx.fillStyle = '#FFC857';
            }
            
            ctx.font = '10px monospace';
            
            // Loop through drops
            for (let i = 0; i < drops.length; i++) {
                // Get random character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw character
                ctx.fillText(text, i * 10, drops[i] * 10);
                
                // Reset position or move drop
                if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drop
                drops[i]++;
            }
        }
        
        // Start animation only when script card is in view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const matrixInterval = setInterval(drawMatrix, 60);
                
                // Store interval ID on element for cleanup
                imgContainer.dataset.matrixInterval = matrixInterval;
            } else {
                // Clear interval when element is out of view
                clearInterval(imgContainer.dataset.matrixInterval);
            }
        }, { threshold: 0.1 });
        
        observer.observe(imgContainer);
    });
}

// Initialize terminal animation
function initHackerTerminal() {
    const terminal = document.querySelector('.terminal-body');
    
    if (terminal) {
        // Start typing animation when terminal is in view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const lines = terminal.querySelectorAll('.line:not(.blink)');
                let currentLine = 0;
                
                // Hide all lines initially except the first
                lines.forEach((line, index) => {
                    if (index > 0) line.style.display = 'none';
                });
                
                // Show lines one by one with a typing effect
                function showNextLine() {
                    if (currentLine < lines.length) {
                        const line = lines[currentLine];
                        line.style.display = 'block';
                        
                        // Simulate typing for the current line
                        const text = line.textContent;
                        line.textContent = '';
                        let charIndex = 0;
                        
                        function typeLine() {
                            if (charIndex < text.length) {
                                line.textContent += text.charAt(charIndex);
                                charIndex++;
                                setTimeout(typeLine, Math.random() * 50 + 10);
                            } else {
                                currentLine++;
                                // Delay before showing next line
                                setTimeout(showNextLine, 300);
                            }
                        }
                        
                        typeLine();
                    }
                }
                
                showNextLine();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        observer.observe(terminal);
    }
}

// Script card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const scriptCards = document.querySelectorAll('.script-card');
    
    scriptCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation angle based on mouse position
            const xRotation = (y - rect.height / 2) / 10;
            const yRotation = (x - rect.width / 2) / -10;
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(10px)`;
            
            // Add glare effect
            const glare = card.querySelector('.script-img-overlay');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 80%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform and glare effect
            card.style.transform = '';
            const glare = card.querySelector('.script-img-overlay');
            if (glare) {
                const category = card.getAttribute('data-category');
                
                if (category === 'anticheat') {
                    glare.style.background = 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(74, 69, 181, 0.2))';
                } else if (category === 'utility') {
                    glare.style.background = 'linear-gradient(135deg, rgba(74, 69, 181, 0.2), rgba(255, 107, 107, 0.2))';
                } else {
                    glare.style.background = 'linear-gradient(135deg, rgba(255, 200, 87, 0.2), rgba(74, 69, 181, 0.2))';
                }
            }
        });
    });
});