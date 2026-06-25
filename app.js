/* 6T4 CUSTOMS PERFORMANCE CENTER - INTERACTIVE CONTROLLER */

document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY NAVBAR ACTION ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION MENU ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close mobile nav when clicking a menu link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // --- FEATURED MACHINES DYNAMIC MODAL TRANSITION ---
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDescHighlight = document.getElementById('modalDescHighlight');
  const modalHeroBg = document.getElementById('modalHeroBg');
  const specHp = document.getElementById('specHp');
  const specTorque = document.getElementById('specTorque');
  const specWeight = document.getElementById('specWeight');
  const modalSummary = document.getElementById('modalSummary');
  const modalModList = document.getElementById('modalModList');

  const machineCards = document.querySelectorAll('.machine-card');

  machineCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const bike = card.getAttribute('data-bike');
      const work = card.getAttribute('data-work');
      const image = card.getAttribute('data-image');
      const hpBefore = card.getAttribute('data-hp-before');
      const hpAfter = card.getAttribute('data-hp-after');
      const torqueBefore = card.getAttribute('data-torque-before');
      const torqueAfter = card.getAttribute('data-torque-after');
      const weight = card.getAttribute('data-weight');
      const summary = card.getAttribute('data-summary');
      const mods = JSON.parse(card.getAttribute('data-mods') || '[]');

      // Populate Modal Fields
      modalTitle.textContent = bike;
      modalSubtitle.textContent = `0${index + 1} / MACHINE PROFILE`;
      modalDescHighlight.textContent = work;
      modalHeroBg.style.backgroundImage = `url('${image}')`;
      
      specHp.textContent = `${hpBefore} → ${hpAfter}`;
      specTorque.textContent = `${torqueBefore} → ${torqueAfter}`;
      specWeight.textContent = weight;
      modalSummary.textContent = summary;

      // Clear & Populate Modifications list
      modalModList.innerHTML = '';
      mods.forEach(mod => {
        const li = document.createElement('li');
        li.textContent = mod;
        modalModList.appendChild(li);
      });

      // Activate Modal & Block Scroll
      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- BOOKING FORM VALIDATION & SIMULATION ---
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show Booking Loading State
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      
      const originalText = btnText.textContent;
      btnText.textContent = 'CHECKING WORKSHOP CAPACITY...';
      btnSpinner.style.display = 'inline-block';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Simulate Database Lock & Booking Slot Validation (1.5 seconds)
      setTimeout(() => {
        // Reset button states
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        btnSpinner.style.display = 'none';

        // Success Feedback
        formStatus.classList.add('success');
        formStatus.textContent = '✓ Booking Request Registered. Arjun Rao will contact you within 2 hours.';
        
        // Reset form inputs
        bookingForm.reset();
      }, 1800);
    });
  }

  // --- TIMELINE INTERACTIVE VISIBILITY SCROLL ---
  // A subtle fade-in effect for elements entering viewport
  const scrollRevealElements = document.querySelectorAll('.timeline-step, .testimonial-card, .service-item');
  
  const revealOnScroll = () => {
    scrollRevealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9);
      
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial styles for reveal items
  scrollRevealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initially

});
