// Kylink Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (!navbar) {
      return;
    }

    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.remove('bg-white/95');
      navbar.classList.add('bg-white', 'shadow-md');
    } else {
      navbar.classList.remove('bg-white', 'shadow-md');
      navbar.classList.add('bg-white/95');
    }
    
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
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const contactStatus = document.getElementById('contactFormStatus');
    const contactSubmit = document.getElementById('contactSubmit');
    const recipient = 'contact@kylink.hk';
    const isChinesePage = document.documentElement.lang.toLowerCase().startsWith('zh');
    const submitDefaultText = contactSubmit ? contactSubmit.textContent.trim() : '';
    const copy = isChinesePage ? {
      subjectPrefix: '官网咨询',
      greeting: '您好，',
      intro: '我想咨询以下事项：',
      nameLabel: '姓名',
      companyLabel: '公司',
      emailLabel: '邮箱',
      phoneLabel: '电话',
      inquiryLabel: '咨询类型',
      messageLabel: '留言内容',
      notProvided: '未填写',
      status: '已为您生成邮件草稿。若邮件客户端未自动打开，请直接发送至 contact@kylink.hk。',
      opening: '正在打开邮件客户端...'
    } : {
      subjectPrefix: 'Website Inquiry',
      greeting: 'Hello,',
      intro: 'I would like to discuss the following:',
      nameLabel: 'Name',
      companyLabel: 'Company',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      inquiryLabel: 'Inquiry Type',
      messageLabel: 'Message',
      notProvided: 'Not provided',
      status: 'Your email draft is ready. If your email client did not open automatically, please send your message to contact@kylink.hk.',
      opening: 'Opening email client...'
    };

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

      const subject = [copy.subjectPrefix, inquiry, company || name].filter(Boolean).join(' | ');
      const body = [
        copy.greeting,
        '',
        copy.intro,
        '',
        copy.nameLabel + ': ' + name,
        copy.companyLabel + ': ' + (company || copy.notProvided),
        copy.emailLabel + ': ' + email,
        copy.phoneLabel + ': ' + (phone || copy.notProvided),
        copy.inquiryLabel + ': ' + inquiry,
        '',
        copy.messageLabel + ':',
        message
      ].join('\n');

      if (contactStatus) {
        contactStatus.className = 'rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700';
        contactStatus.textContent = copy.status;
      }

      if (contactSubmit) {
        contactSubmit.disabled = true;
        contactSubmit.classList.add('opacity-70', 'cursor-not-allowed');
        contactSubmit.textContent = copy.opening;

        window.setTimeout(function() {
          contactSubmit.disabled = false;
          contactSubmit.classList.remove('opacity-70', 'cursor-not-allowed');
          contactSubmit.textContent = submitDefaultText;
        }, 1800);
      }

      window.location.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      contactForm.reset();
    });
  }
  
});
