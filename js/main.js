// Kylink Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.remove('bg-white/95');
      navbar.classList.add('bg-white', 'shadow-md');
    } else {
      navbar.classList.remove('bg-white', 'shadow-md');
      navbar.classList.add('bg-white/95');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
  }
  
  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  
  // Language switch
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    const spans = langSwitch.querySelectorAll('span');
    langSwitch.addEventListener('click', function() {
      // Toggle active state
      spans[0].classList.toggle('text-slate-900');
      spans[0].classList.toggle('text-gray-400');
      spans[2].classList.toggle('text-slate-900');
      spans[2].classList.toggle('text-gray-400');
      // In a real implementation, this would redirect to the language-specific page
    });
  }
  
});
