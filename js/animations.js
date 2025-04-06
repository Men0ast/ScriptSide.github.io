/**
 * Animation Effects
 * Author: John Doe
 * Version: 1.0
 */

// Initialize animations when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initRevealAnimations();
    initSkillBars();
    initTypewriterEffect();
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

// Smooth parallax effect for sections
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
    
    // Scale effect for project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardPosition < windowHeight * 0.8 && cardPosition > -windowHeight * 0.2) {
            const scale = 1 + ((windowHeight * 0.5 - cardPosition) / windowHeight) * 0.1;
            card.style.transform = `scale(${Math.min(scale, 1.05)})`;
        }
    });
});

// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements if they don't exist
    if (!document.querySelector('.cursor-dot')) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);
        
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        document.body.appendChild(cursorOutline);
        
        // Add CSS for cursor elements
        const style = document.createElement('style');
        style.textContent = `
            .cursor-dot, .cursor-outline {
                pointer-events: none;
                position: fixed;
                top: 0;
                left: 0;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                z-index: 9999;
                transition: transform 0.1s;
            }
            .cursor-dot {
                width: 8px;
                height: 8px;
                background-color: var(--primary-color);
            }
            .cursor-outline {
                width: 40px;
                height: 40px;
                border: 2px solid var(--primary-color);
                transition: transform 0.2s, width 0.3s, height 0.3s, border-color 0.3s;
                opacity: 0.5;
            }
            a:hover ~ .cursor-outline, button:hover ~ .cursor-outline {
                transform: translate(-50%, -50%) scale(1.5);
                border-color: var(--primary-dark);
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
        
        // Move cursor elements with mouse
        document.addEventListener('mousemove', function(e) {
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');
            
            if (cursorDot && cursorOutline) {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
                
                // Add slight delay for outline for smoother effect
                setTimeout(() => {
                    cursorOutline.style.left = e.clientX + 'px';
                    cursorOutline.style.top = e.clientY + 'px';
                }, 100);
            }
        });
        
        // Change cursor effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const cursorOutline = document.querySelector('.cursor-outline');
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.borderColor = 'var(--primary-dark)';
                    cursorOutline.style.opacity = '0.8';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                const cursorOutline = document.querySelector('.cursor-outline');
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.borderColor = 'var(--primary-color)';
                    cursorOutline.style.opacity = '0.5';
                }
            });
        });
    }
});
