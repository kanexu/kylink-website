// Kylink Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const pageIsChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
  
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
  
  function getPagePrefix() {
    const path = window.location.pathname;
    const isNestedPage = path.includes('/services/') || path.includes('/products/');
    const isNestedChinesePage = path.includes('/zh/services/') || path.includes('/zh/products/');

    if (pageIsChinese) {
      return isNestedChinesePage ? '../' : './';
    }

    return isNestedPage ? '../' : './';
  }

  function getLanguageHref() {
    const targetLabel = pageIsChinese ? 'EN' : '中';
    const languageLink = Array.from(document.querySelectorAll('nav a, footer a')).find(function(link) {
      return !link.closest('#mobileMenu') && link.textContent.trim() === targetLabel;
    });

    return languageLink ? languageLink.getAttribute('href') : (pageIsChinese ? '../' : './zh/');
  }

  function injectMobileMenuStyles() {
    if (document.getElementById('mobileMenuRuntimeStyles')) {
      return;
    }

    const styles = document.createElement('style');
    styles.id = 'mobileMenuRuntimeStyles';
    styles.textContent = [
      '.mobile-menu{transform:translateX(100%);transition:transform .3s ease-in-out;}',
      '.mobile-menu.active{transform:translateX(0);}',
      '.mobile-menu-overlay{position:fixed;inset:0;z-index:40;background:rgba(15,23,42,.42);opacity:0;pointer-events:none;transition:opacity .2s ease-in-out;}',
      '.mobile-menu-overlay.active{opacity:1;pointer-events:auto;}',
      'body.mobile-menu-open{overflow:hidden;}',
      '@media (prefers-reduced-motion: reduce){.mobile-menu,.mobile-menu-overlay{transition:none;}}'
    ].join('');
    document.head.appendChild(styles);
  }

  function buildMobileMenu() {
    const existingMenu = document.getElementById('mobileMenu');
    if (existingMenu) {
      return existingMenu;
    }

    const prefix = getPagePrefix();
    const menuItems = pageIsChinese ? [
      { label: '首页', href: prefix },
      { label: '企业咨询', href: prefix + 'services/consulting.html' },
      { label: '市场分析', href: prefix + 'services/market-analysis.html' },
      { label: 'AI工具', href: 'https://kylinkai.com', external: true },
      { label: '海外仓WMS', href: prefix + 'products/wms.html' },
      { label: '案例', href: prefix + 'cases.html' },
      { label: '关于我们', href: prefix + 'about.html' },
      { label: '联系我们', href: prefix + 'contact.html', primary: true }
    ] : [
      { label: 'Home', href: prefix },
      { label: 'Enterprise Consulting', href: prefix + 'services/consulting.html' },
      { label: 'Market Analysis', href: prefix + 'services/market-analysis.html' },
      { label: 'AI Tools', href: 'https://kylinkai.com', external: true },
      { label: 'Overseas WMS', href: prefix + 'products/wms.html' },
      { label: 'Case Studies', href: prefix + 'cases.html' },
      { label: 'About Us', href: prefix + 'about.html' },
      { label: 'Contact Us', href: prefix + 'contact.html', primary: true }
    ];

    const menu = document.createElement('div');
    menu.id = 'mobileMenu';
    menu.className = 'mobile-menu fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white md:hidden shadow-xl z-50';
    menu.setAttribute('aria-hidden', 'true');

    const closeLabel = pageIsChinese ? '关闭菜单' : 'Close menu';
    const languageLabel = pageIsChinese ? 'English' : '中文';
    const links = menuItems.map(function(item) {
      const linkClass = item.primary
        ? 'bg-slate-900 text-white px-6 py-2.5 rounded-md font-medium text-center mt-4'
        : 'text-gray-600 hover:text-slate-900 py-2';
      const externalAttrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a href="' + item.href + '" class="' + linkClass + '"' + externalAttrs + '>' + item.label + '</a>';
    }).join('');

    menu.innerHTML = [
      '<div class="p-6">',
      '<button id="closeMobileMenu" type="button" class="text-slate-900 mb-8" aria-label="' + closeLabel + '">',
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
      '</button>',
      '<div class="flex flex-col space-y-4">',
      links,
      '<a href="' + getLanguageHref() + '" class="text-gray-500 hover:text-slate-900 py-2 border-t border-gray-100 pt-5">' + languageLabel + '</a>',
      '</div>',
      '</div>'
    ].join('');

    const nav = document.getElementById('navbar');
    (nav || document.body).appendChild(menu);

    return menu;
  }

  // Mobile menu toggle
  injectMobileMenuStyles();
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = mobileMenuBtn ? buildMobileMenu() : document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  let mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  if (!mobileMenuOverlay && mobileMenuBtn) {
    mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.id = 'mobileMenuOverlay';
    mobileMenuOverlay.className = 'mobile-menu-overlay md:hidden';
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mobileMenuOverlay);
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) {
      return;
    }

    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');

    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('active');
      mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    }

    if (closeMobileMenu) {
      closeMobileMenu.focus();
    }
  }

  function closeMenu() {
    if (!mobileMenu || !mobileMenuBtn) {
      return;
    }

    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');

    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
      mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('type', 'button');
    mobileMenuBtn.setAttribute('aria-controls', 'mobileMenu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', pageIsChinese ? '打开菜单' : 'Open menu');
  }
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      openMobileMenu();
    });
  }
  
  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener('click', function() {
      closeMenu();
    });
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMenu);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu && mobileMenuBtn && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Disable placeholder social links until real profiles are available.
  document.querySelectorAll('a[href="#"]').forEach(function(link) {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
  });

  // Case study filters
  const caseFilterButtons = document.querySelectorAll('[data-case-filter]');
  const caseCards = document.querySelectorAll('[data-case-category]');

  if (caseFilterButtons.length && caseCards.length) {
    caseFilterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const selectedCategory = button.getAttribute('data-case-filter');

        caseFilterButtons.forEach(function(filterButton) {
          const isSelected = filterButton === button;
          filterButton.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
          filterButton.classList.toggle('bg-slate-900', isSelected);
          filterButton.classList.toggle('text-white', isSelected);
          filterButton.classList.toggle('bg-gray-100', !isSelected);
          filterButton.classList.toggle('text-gray-600', !isSelected);
        });

        caseCards.forEach(function(card) {
          const shouldShow = selectedCategory === 'all' || card.getAttribute('data-case-category') === selectedCategory;
          card.classList.toggle('hidden', !shouldShow);
        });
      });
    });
  }
  
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
