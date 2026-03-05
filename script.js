// Set current year in footer
const date = document.getElementById('date');
if (date) {
    date.innerHTML = new Date().getFullYear();
}

// ==== Navbar Toggle ====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        // Simple toggle for mobile navigation
        if (navLinks.classList.contains('show-links')) {
            navLinks.style.height = '0';
            navLinks.classList.remove('show-links');
        } else {
            // Calculate height of links dynamically
            const linksHeight = navLinks.scrollHeight;
            navLinks.style.height = `${linksHeight}px`;
            navLinks.classList.add('show-links');
        }
    });
}

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 800) {
            navLinks.style.height = '0';
            navLinks.classList.remove('show-links');
        }
    });
});

// ==== Sticky Navbar & Smooth Scroll ====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    
    // Add fixed-nav class
    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }
});

// Smooth scrolling for Anchor Links
const scrollLinks = document.querySelectorAll('.nav-link, .smooth-scroll');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default
        e.preventDefault();
        // Navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        
        if (element) {
            const navHeight = navbar.getBoundingClientRect().height;
            const fixedNav = navbar.classList.contains('fixed-nav');
            let position = element.offsetTop - navHeight;

            // Offset correction if navbar is not yet fixed
            if (!fixedNav) {
                position = position - navHeight;
            }

            window.scrollTo({
                left: 0,
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

// ==== Menu Filtering ====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.currentTarget.classList.add('active');

        const category = e.currentTarget.dataset.id;
        
        menuItems.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hide');
            } else {
                if (item.dataset.category === category) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
});

// ==== Intersection Observer for Fade-in Animations ====
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
