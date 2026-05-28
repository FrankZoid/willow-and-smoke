/**
 * script.js - Willow & Smoke Kitchen Interactive Website Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal');
    
    // PDF Modal Selectors
    const pdfModal = document.getElementById('pdfModal');
    const openPdfBtns = document.querySelectorAll('.js-open-pdf');
    const closePdfBtn = document.querySelector('.pdf-modal-close');

    // --- Sticky Header Scroll Transition ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load in case page starts scrolled

    // --- Mobile Menu Toggle ---
    const toggleMobileMenu = () => {
        const isOpen = navContainer.classList.toggle('open');
        navToggle.classList.toggle('open');
        
        // Prevent body scrolling when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // --- ScrollSpy: Highlight Active Navigation Item ---
    const scrollSpy = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) - 20;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    // --- Reveal Elements on Scroll (Intersection Observer) ---
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- PDF Modal Handlers ---
    const openPdfModal = (e) => {
        e.preventDefault();
        pdfModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closePdfModal = () => {
        pdfModal.style.display = 'none';
        document.body.style.overflow = '';
    };

    openPdfBtns.forEach(btn => {
        btn.addEventListener('click', openPdfModal);
    });

    if (closePdfBtn) {
        closePdfBtn.addEventListener('click', closePdfModal);
    }

    // Close modal when clicking outside content area
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
            closePdfModal();
        }
    });
});
