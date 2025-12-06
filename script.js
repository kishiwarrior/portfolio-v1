// Smooth scroll rotation effect for project cards
const rotateCards = document.querySelectorAll('.rotate-card');

function handleScrollRotation() {
    rotateCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardMiddle = rect.top + rect.height / 2;
        const screenMiddle = windowHeight / 2;
        const distance = cardMiddle - screenMiddle;
        const maxDistance = windowHeight / 2;
        const normalizedDistance = Math.max(-1, Math.min(1, distance / maxDistance));
        const rotation = normalizedDistance * 12;
        const scale = 1 - Math.abs(normalizedDistance) * 0.05;
        
        card.style.transform = `perspective(1000px) rotateY(${rotation}deg) scale(${scale})`;
        card.style.transition = 'transform 0.1s ease-out';
    });
}

// Timeline scroll reveal
const timelineItems = document.querySelectorAll('.timeline-item');

function handleTimelineReveal() {
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.85) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        }
    });
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners
const throttledScrollRotation = throttle(handleScrollRotation, 10);
const throttledTimelineReveal = throttle(handleTimelineReveal, 100);

window.addEventListener('scroll', () => {
    throttledScrollRotation();
    throttledTimelineReveal();
});

// Initial calls
handleScrollRotation();
handleTimelineReveal();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
