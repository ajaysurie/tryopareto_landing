// ===================================
// SMOOTH SCROLLING FOR CTA LINKS
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if href is just "#"
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // FAQ ACCORDION FUNCTIONALITY
    // ===================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqQuestion = faqItem.querySelector('.faq-question');
                if (faqQuestion) {
                    faqQuestion.setAttribute('aria-expanded', 'false');
                }
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility for FAQ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ===================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.step-card, .benefit-card, .testimonial-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ===================================
    // NAV SHADOW ON SCROLL
    // ===================================

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add enhanced shadow when scrolled
        if (currentScroll > 10) {
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // ENHANCED BUTTON INTERACTIONS
    // ===================================

    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            // Analytics tracking placeholder
            console.log('CTA clicked:', this.textContent);

            // Track which CTA was clicked
            if (this.classList.contains('cta-button-hero')) {
                console.log('Hero CTA interaction');
            } else if (this.classList.contains('cta-button-large')) {
                console.log('Final CTA interaction');
            }
        });

        // Enhanced focus states
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #fbbf24';
            this.style.outlineOffset = '4px';
        });

        button.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // ===================================
    // SECTION VISIBILITY TRACKING
    // ===================================

    const sections = document.querySelectorAll('section[class]');

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                console.log('Section viewed:', sectionName);
                // This is where you'd send analytics events
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // PREVENT ORPHAN WORDS IN HEADLINES
    // ===================================

    function preventOrphans() {
        const headlines = document.querySelectorAll('.hero-headline, .section-heading, .testimonial-quote, .benefit-title');

        headlines.forEach(headline => {
            const text = headline.innerHTML;
            const words = text.trim().split(' ');

            if (words.length > 2) {
                // Replace the last space with a non-breaking space
                const lastWord = words.pop();
                const secondLastWord = words.pop();
                words.push(secondLastWord + '&nbsp;' + lastWord);
                headline.innerHTML = words.join(' ');
            }
        });
    }

    preventOrphans();

    // ===================================
    // ENHANCED CARD INTERACTIONS
    // ===================================

    const stepCards = document.querySelectorAll('.step-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // Add staggered animation delays
    stepCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    benefitCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ===================================
    // PERFORMANCE: LAZY LOAD OPTIMIZATION
    // ===================================

    // Add loading="lazy" to images if they exist
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // ===================================
    // URGENCY TEXT ANIMATION
    // ===================================

    const urgencyElements = document.querySelectorAll('.urgency-text, .urgency-badge');

    urgencyElements.forEach(element => {
        // Add subtle attention-grabbing effect
        setInterval(() => {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, 5000); // Pulse every 5 seconds
    });

    // ===================================
    // SOCIAL PROOF BADGE ANIMATION
    // ===================================

    const socialProofBadge = document.querySelector('.social-proof-badge');

    if (socialProofBadge) {
        // Add subtle hover effect
        socialProofBadge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.3)';
        });

        socialProofBadge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        });
    }

    // ===================================
    // SCROLL PROGRESS INDICATOR (Optional)
    // ===================================

    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        // Log scroll progress (could be used for analytics)
        if (scrollPercent > 75) {
            console.log('User has scrolled 75% of the page');
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateScrollProgress, 100);
    });

    // ===================================
    // MOBILE MENU (Placeholder for future expansion)
    // ===================================

    // Uncomment and expand if you add a hamburger menu later
    /*
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Update aria attributes
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    */

    // ===================================
    // FORM SUBMISSION TRACKING
    // ===================================

    const formLinks = document.querySelectorAll('a[href*="forms.gle"]');

    formLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Form link clicked - Early access request');
            // Add your analytics tracking here
            // Example: gtag('event', 'form_click', { form_location: 'hero' });
        });
    });

    // ===================================
    // ACCESSIBILITY: SKIP TO CONTENT
    // ===================================

    // Add keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Press 'Esc' to close any open FAQ
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // ===================================
    // PERFORMANCE MONITORING
    // ===================================

    // Log page load performance
    window.addEventListener('load', function() {
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log('Page load time:', loadTime, 'ms');

            if (loadTime > 3000) {
                console.warn('Page load time exceeds 3 seconds');
            }
        }
    });

    // ===================================
    // TESTIMONIAL ROTATION
    // ===================================

    const testimonialFeatured = document.querySelector('.testimonial-featured');
    const testimonialAlternates = document.querySelectorAll('.testimonial-alt');

    if (testimonialFeatured && testimonialAlternates.length > 0) {
        let currentTestimonialIndex = 0;
        const allTestimonials = [
            testimonialFeatured.querySelector('.testimonial-quote-container').cloneNode(true),
            ...Array.from(testimonialAlternates).map(alt => alt.cloneNode(true))
        ];

        function rotateTestimonial() {
            const quoteText = testimonialFeatured.querySelector('.testimonial-quote-text');
            const attribution = testimonialFeatured.querySelector('.testimonial-attribution');

            if (quoteText && attribution) {
                // Fade out
                quoteText.style.animation = 'none';
                attribution.style.animation = 'none';
                quoteText.style.opacity = '0';
                attribution.style.opacity = '0';

                setTimeout(() => {
                    // Move to next testimonial
                    currentTestimonialIndex = (currentTestimonialIndex + 1) % allTestimonials.length;

                    const nextTestimonial = allTestimonials[currentTestimonialIndex];
                    const nextQuoteText = nextTestimonial.querySelector('.testimonial-quote-text');
                    const nextAttribution = nextTestimonial.querySelector('.testimonial-attribution');

                    if (nextQuoteText && nextAttribution) {
                        quoteText.textContent = nextQuoteText.textContent;
                        attribution.textContent = nextAttribution.textContent;

                        // Fade in
                        setTimeout(() => {
                            quoteText.style.animation = 'fadeIn 1s ease-in forwards';
                            attribution.style.animation = 'fadeIn 1s ease-in 0.3s forwards';
                        }, 50);
                    }
                }, 500);
            }
        }

        // Rotate testimonials every 8 seconds
        setInterval(rotateTestimonial, 8000);
    }

    // ===================================
    // CONSOLE MESSAGE
    // ===================================

    console.log('%cOpareto Landing Page', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
    console.log('%cBuilt for trade contractors who want to close more jobs faster.', 'font-size: 14px; color: #6b7280;');
    console.log('%cEnhanced with conversion optimization and accessibility features', 'font-size: 12px; color: #fbbf24;');

    // ===================================
    // SIGNUP MODAL FUNCTIONALITY
    // ===================================

    const modal = document.getElementById('signupModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const signupForm = document.getElementById('signupForm');
    const formMessage = document.getElementById('formMessage');

    // Open modal when CTA buttons are clicked
    const ctaLinks = document.querySelectorAll('a[href="#cta"]');

    ctaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        formMessage.className = 'form-message'; // Reset message
        formMessage.textContent = '';
    }

    // Close modal on X button click
    modalClose.addEventListener('click', closeModal);

    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission handling
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = signupForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            tradeType: document.getElementById('tradeType').value,
            phone: document.getElementById('phone').value
        };

        try {
            // Send to API
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thanks! We\'ll be in touch soon.';
                signupForm.reset();

                // Close modal after 2 seconds
                setTimeout(closeModal, 2000);
            } else {
                // Error
                formMessage.className = 'form-message error';
                formMessage.textContent = result.error || 'Something went wrong. Please try again.';
            }
        } catch (error) {
            // Network error
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Network error. Please check your connection and try again.';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

});
