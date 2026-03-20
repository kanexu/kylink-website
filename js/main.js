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
    if (mobileMenu && mobileMenuBtn && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetSelector = this.getAttribute('href');
      if (!targetSelector || targetSelector === '#') {
        return;
      }

      e.preventDefault();
      const target = document.querySelector(targetSelector);
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

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const contactStatus = document.getElementById('contactFormStatus');
    const contactSubmit = document.getElementById('contactSubmit');
    const recipient = 'contact@kylink.hk';

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const company = (formData.get('company') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const inquiry = (formData.get('inquiry') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const subject = ['官网咨询', inquiry, company || name].filter(Boolean).join(' | ');
      const body = [
        '您好，',
        '',
        '我想咨询以下事项：',
        '',
        '姓名：' + name,
        '公司：' + (company || '未填写'),
        '邮箱：' + email,
        '电话：' + (phone || '未填写'),
        '咨询类型：' + inquiry,
        '',
        '留言内容：',
        message
      ].join('\n');

      if (contactStatus) {
        contactStatus.className = 'rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700';
        contactStatus.textContent = '已为您生成邮件草稿。若邮件客户端未自动打开，请直接发送至 contact@kylink.hk。';
      }

      if (contactSubmit) {
        contactSubmit.disabled = true;
        contactSubmit.classList.add('opacity-70', 'cursor-not-allowed');
        contactSubmit.textContent = '正在打开邮件客户端...';

        window.setTimeout(function() {
          contactSubmit.disabled = false;
          contactSubmit.classList.remove('opacity-70', 'cursor-not-allowed');
          contactSubmit.textContent = '发送消息';
        }, 1800);
      }

      window.location.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      contactForm.reset();
    });
  }
  
});
