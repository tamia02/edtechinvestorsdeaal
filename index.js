/* ==========================================================================
   Investors Deaal & Dhurandhar Club - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navigation Bar Scroll Effects
    // ==========================================
    const navbar = document.getElementById('main-nav');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially in case page loaded already scrolled


    // ==========================================
    // 2. Mobile Menu Toggle Action
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu-list');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and Xmark
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
            });
        });
    }


    // ==========================================
    // 3. Curriculum Tab Switching Logic
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active to current button
            btn.classList.add('active');
            
            // Get targets
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });


    // ==========================================
    // 4. Dynamic Income Potential Calculator
    // ==========================================
    const dealsSlider = document.getElementById('deals-slider');
    const referralsSlider = document.getElementById('referrals-slider');
    const affiliatesSlider = document.getElementById('affiliates-slider');
    
    const dealsVal = document.getElementById('deals-val');
    const referralsVal = document.getElementById('referrals-val');
    const affiliatesVal = document.getElementById('affiliates-val');
    
    const basicTotal = document.getElementById('basic-total-val');
    const goldTotal = document.getElementById('gold-total-val');
    const premiumTotal = document.getElementById('premium-total-val');

    // Highlight active tier row in calculator based on selected package
    const packagePrefSelect = document.getElementById('package-pref');
    const tierBasicCalc = document.getElementById('tier-basic-calc');
    const tierGoldCalc = document.getElementById('tier-gold-calc');
    const tierPremiumCalc = document.getElementById('tier-premium-calc');

    const updateCalculatorUI = () => {
        const deals = parseInt(dealsSlider.value, 10);
        const referrals = parseInt(referralsSlider.value, 10);
        const affiliates = parseInt(affiliatesSlider.value, 10);
        
        // Update slider label labels
        dealsVal.textContent = deals === 1 ? '1 Deal' : `${deals} Deals`;
        referralsVal.textContent = referrals === 1 ? '1 Referral' : `${referrals} Referrals`;
        affiliatesVal.textContent = affiliates === 1 ? '1 Referral' : `${affiliates} Referrals`;
        
        /* --- Earning Formulas ---
           1. Basic realtor package:
              - Base salary: ₹15,000
              - Deal commission: ₹20,000 per deal
              - Student Referral reward: ₹3,000 per referral
              - Affiliate income: ₹1,500 per inquiry referral
           2. Gold realtor package:
              - Base salary: ₹25,000
              - Deal commission: ₹30,000 per deal
              - Student Referral reward: ₹3,000 per referral
              - Affiliate income: ₹1,500 per inquiry referral
           3. Premium realtor package:
              - Base salary: ₹35,000
              - Deal commission: ₹50,000 per deal
              - Student Referral reward: ₹3,000 per referral
              - Affiliate income: ₹1,500 per inquiry referral
              - Company Turnover Sharing: ₹15,000 fixed allocation (if closed > 0 deals)
        */
        const basicSum = 15000 + (deals * 20000) + (referrals * 3000) + (affiliates * 1500);
        const goldSum = 25000 + (deals * 30000) + (referrals * 3000) + (affiliates * 1500);
        
        let premiumShare = 0;
        if (deals > 0) {
            premiumShare = 15000; // turnover profit sharing bonus kicks in
        }
        const premiumSum = 35000 + (deals * 50000) + (referrals * 3000) + (affiliates * 1500) + premiumShare;
        
        // Format as Indian Currency strings (e.g. 1,00,000)
        basicTotal.textContent = basicSum.toLocaleString('en-IN');
        goldTotal.textContent = goldSum.toLocaleString('en-IN');
        premiumTotal.textContent = premiumSum.toLocaleString('en-IN');
    };

    if (dealsSlider && referralsSlider && affiliatesSlider) {
        dealsSlider.addEventListener('input', updateCalculatorUI);
        referralsSlider.addEventListener('input', updateCalculatorUI);
        affiliatesSlider.addEventListener('input', updateCalculatorUI);
        
        updateCalculatorUI(); // Run once initially
    }

    // Sync calculator highlight with dropdown package preference selection
    const syncCalculatorHighlight = () => {
        if (!packagePrefSelect) return;
        const prefVal = packagePrefSelect.value;
        
        tierBasicCalc.classList.remove('active');
        tierGoldCalc.classList.remove('active');
        tierPremiumCalc.classList.remove('active');
        
        if (prefVal === 'Basic') {
            tierBasicCalc.classList.add('active');
        } else if (prefVal === 'Gold') {
            tierGoldCalc.classList.add('active');
        } else if (prefVal === 'Premium') {
            tierPremiumCalc.classList.add('active');
        }
    };
    
    if (packagePrefSelect) {
        packagePrefSelect.addEventListener('change', syncCalculatorHighlight);
        syncCalculatorHighlight();
    }


    // ==========================================
    // 5. Package Selection Shortcut Setup
    // ==========================================
    const packageBtns = document.querySelectorAll('.package-btn');
    packageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkgName = btn.getAttribute('data-package');
            if (packagePrefSelect && pkgName) {
                packagePrefSelect.value = pkgName;
                syncCalculatorHighlight();
            }
        });
    });


    // ==========================================
    // 6. Testimonial Carousel Slider Logic
    // ==========================================
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let slideInterval;
        
        // Generate dot elements based on slides list count
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'indicator-dot active' : 'indicator-dot';
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = Array.from(dotsContainer.children);
        
        const updateDots = (index) => {
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };
        
        const goToSlide = (index) => {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots(index);
        };
        
        // Navigation Button clicks
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoPlay();
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoPlay();
            });
        }
        
        // Auto Play configuration
        const startAutoPlay = () => {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 6000); // Transition slides every 6 seconds
        };
        
        const resetAutoPlay = () => {
            clearInterval(slideInterval);
            startAutoPlay();
        };
        
        startAutoPlay();
        
        // Touch Swipe Gesture Support for Mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50) { // Swipe Right -> Prev
                goToSlide(currentIndex - 1);
                resetAutoPlay();
            } else if (swipeDistance < -50) { // Swipe Left -> Next
                goToSlide(currentIndex + 1);
                resetAutoPlay();
            }
        };
    }


    // ==========================================
    // 7. FAQ Accordion Collapse/Expand Logic
    // ==========================================
    const faqTriggers = document.querySelectorAll('.accordion-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parentItem = trigger.parentElement;
            const content = parentItem.querySelector('.accordion-content');
            const isCurrentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close all other items first (optional, creates standard clean toggle look)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            if (isCurrentlyExpanded) {
                parentItem.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                parentItem.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });


    // ==========================================
    // 8. Multi-Step Onboarding Form Logic
    // ==========================================
    const form = document.getElementById('onboarding-form');
    const formSteps = document.querySelectorAll('.form-step');
    const formProgress = document.getElementById('form-progress');
    const markers = [
        document.getElementById('marker-step-1'),
        document.getElementById('marker-step-2'),
        document.getElementById('marker-step-3')
    ];
    
    let currentFormStep = 1;
    
    // Step navigation buttons
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnPrev2 = document.getElementById('btn-prev-2');
    const btnPrev3 = document.getElementById('btn-prev-3');
    
    const showFormStep = (stepNumber) => {
        formSteps.forEach((step, idx) => {
            if (idx + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update Progress Bar %
        const progressPct = ((stepNumber - 1) / (formSteps.length - 1)) * 100;
        formProgress.style.width = `${progressPct}%`;
        
        // Update step indicators
        markers.forEach((marker, idx) => {
            if (idx + 1 < stepNumber) {
                marker.className = 'step-marker completed';
                marker.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (idx + 1 === stepNumber) {
                marker.className = 'step-marker active';
                marker.textContent = idx + 1;
            } else {
                marker.className = 'step-marker';
                marker.textContent = idx + 1;
            }
        });
        
        currentFormStep = stepNumber;
    };
    
    // Step 1 Validation Details
    const validateStep1 = () => {
        const fullname = document.getElementById('fullname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const city = document.getElementById('city');
        
        let isValid = true;
        
        // Reset styles
        fullname.parentElement.classList.remove('invalid');
        phone.parentElement.classList.remove('invalid');
        email.parentElement.classList.remove('invalid');
        city.parentElement.classList.remove('invalid');
        
        // Fullname validate
        if (fullname.value.trim() === '') {
            fullname.parentElement.classList.add('invalid');
            isValid = false;
        }
        
        // Phone validate (10-digit number validation)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phone.parentElement.classList.add('invalid');
            isValid = false;
        }
        
        // Email validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.parentElement.classList.add('invalid');
            isValid = false;
        }
        
        // City validate
        if (city.value.trim() === '') {
            city.parentElement.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    };
    
    if (btnNext1) {
        btnNext1.addEventListener('click', () => {
            if (validateStep1()) {
                showFormStep(2);
            }
        });
    }
    
    if (btnNext2) {
        btnNext2.addEventListener('click', () => {
            // Dropdowns are pre-selected. Direct transition allowed.
            showFormStep(3);
        });
    }
    
    if (btnPrev2) {
        btnPrev2.addEventListener('click', () => {
            showFormStep(1);
        });
    }
    
    if (btnPrev3) {
        btnPrev3.addEventListener('click', () => {
            showFormStep(2);
        });
    }
    
    // Submission handler
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const agreeCheckbox = document.getElementById('agree-terms');
            if (!agreeCheckbox.checked) {
                agreeCheckbox.parentElement.parentElement.classList.add('invalid');
                document.getElementById('err-agree').style.display = 'block';
                return;
            } else {
                document.getElementById('err-agree').style.display = 'none';
            }
            
            // Capture data for display / analytics
            const fullnameVal = document.getElementById('fullname').value.trim();
            const phoneVal = document.getElementById('phone').value.trim();
            const selectedTier = document.getElementById('package-pref').value;
            
            console.log('Onboarding Form Submitted Successfully!', {
                name: fullnameVal,
                phone: phoneVal,
                email: document.getElementById('email').value.trim(),
                city: document.getElementById('city').value.trim(),
                experience: document.getElementById('experience').value,
                tier: selectedTier
            });
            
            // Hide Multi-step Form & display Success Panel
            form.style.display = 'none';
            const successBox = document.getElementById('apply-success-box');
            const successPhone = document.getElementById('success-user-phone');
            
            if (successPhone) {
                successPhone.textContent = `+91 ${phoneVal}`;
            }
            if (successBox) {
                successBox.style.display = 'block';
                successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }


    // ==========================================
    // 9. Live Fluctuation of Seat Counter Widget
    // ==========================================
    const seatsText = document.getElementById('seats-left-text');
    const seatsProgressBar = document.getElementById('seats-progress-bar');
    
    if (seatsText && seatsProgressBar) {
        let currentSeats = 12; // Start with 12 seats left out of 100
        
        const declineSeatCounter = () => {
            // Random decay interval logic to simulate organic applications
            setTimeout(() => {
                if (currentSeats > 6) { // Limit decay down to 6 seats left
                    currentSeats--;
                    seatsText.textContent = `${currentSeats} / 100 left`;
                    // Adjust progress fill width based on percentage filled (100 - currentSeats)
                    const fillPct = 100 - currentSeats;
                    seatsProgressBar.style.width = `${fillPct}%`;
                    
                    // Trigger subsequent seat reduction after random delay
                    declineSeatCounter();
                }
            }, Math.random() * 30000 + 20000); // Decrease every 20-50 seconds
        };
        
        declineSeatCounter();
    }
});
