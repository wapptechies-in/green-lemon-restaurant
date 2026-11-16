/**
 * Green Lemon Restaurant - Client Application Logic
 * Pavoorchatram, Tenkasi District
 * Pure Vanilla JavaScript (Zero Dependencies, Mobile-First & Touch-Optimized)
 */

(function () {
  'use strict';

  // Category Meta: Creative SVG Vector Line-Art Icons & Clean 2-Line Titles
  const CATEGORY_META = {
    'all': {
      title: 'All Dishes',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19h18"/><path d="M5 19a7 7 0 0 1 14 0"/><path d="M12 5v2"/><circle cx="12" cy="4" r="1"/></svg>`
    },
    'mandi-biriyani': {
      title: 'Mandi &<br>Biriyani',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10h12a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><path d="M11 3c.5-.8 1.5-.8 2 0"/></svg>`
    },
    'grills-tandoor': {
      title: 'Charcoal<br>Grills',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3-2 5-1 8 1 1.5 3 2 3 4a4 4 0 0 1-8 0c0-3 3-5 3-7 0-2 1-3 3-5z"/><line x1="4" y1="21" x2="20" y2="21"/><line x1="7" y1="18" x2="17" y2="18"/></svg>`
    },
    'curries-gravies': {
      title: 'Curries &<br>Gravies',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1c0 5-3.5 8-9 8s-9-3-9-8a1 1 0 0 1 1-1z"/><path d="M7 8c1-2 2-2 3 0"/><path d="M14 8c1-2 2-2 3 0"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>`
    },
    'veg-paneer': {
      title: 'Veg &<br>Paneer',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z"/><path d="M12 3v18"/><path d="M12 8a5 5 0 0 1 5 5"/><path d="M12 13a5 5 0 0 0-5 5"/></svg>`
    },
    'breads-tiffin': {
      title: 'Breads &<br>Kothu',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 9c1.5 1.5 3.5 2 6 1"/><path d="M7 14c2.5 1.5 5 1.5 8-1"/><path d="M10 6c1 1 2 1.5 4 1"/></svg>`
    },
    'rice-noodles': {
      title: 'Rice &<br>Noodles',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16c0 4.5-3.5 8-8 8s-8-3.5-8-8z"/><path d="M8 8c0 4 8 4 8 0"/><path d="M7 5c0 3 10 3 10 0"/><line x1="18" y1="2" x2="14" y2="8"/></svg>`
    },
    'starters-bites': {
      title: 'Starters &<br>Bites',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a8 8 0 0 0-8 8c0 4 3.5 7 8 7s8-3 8-7a8 8 0 0 0-8-8z"/><path d="M9 12c1.5 1 4.5 1 6 0"/><path d="M12 4v4"/></svg>`
    },
    'mojitos-coolers': {
      title: 'Mojitos &<br>Coolers',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 15v6"/><path d="M5 4h14l-4 11H9L5 4z"/><line x1="4" y1="4" x2="20" y2="4"/><circle cx="16" cy="7" r="1.5"/></svg>`
    },
    'sodas-limes': {
      title: 'Limes &<br>Sodas',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/><path d="M5.6 5.6l12.8 12.8"/><path d="M5.6 18.4L18.4 5.6"/></svg>`
    },
    'fruit-shakes': {
      title: 'Thick<br>Shakes',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8h10l-1.5 13h-7L7 8z"/><path d="M7 8a4 4 0 0 1 8-2 3.5 3.5 0 0 1 2 2"/><line x1="14" y1="2" x2="12" y2="6"/></svg>`
    },
    'signature-shakes': {
      title: 'Tender<br>Coconut',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 5a3 3 0 0 0-3 3"/><line x1="14" y1="2" x2="11" y2="7"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="12" cy="15" r="1"/></svg>`
    },
    'desserts-lassi': {
      title: 'Desserts &<br>Lassi',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10h12v2a6 6 0 0 1-12 0v-2z"/><path d="M12 16v5"/><path d="M9 21h6"/><circle cx="12" cy="6" r="3"/><path d="M12 3v1"/></svg>`
    }
  };

  // State Management
  const state = {
    config: null,
    menu: null,
    activeCategory: 'all',
    activeDiet: 'all',
    searchQuery: '',
    tray: {},          // { [dishId]: { dish, qty } }
    selectedDish: null,
    feedbacks: [],
    // Games State
    activeGame: 'match',
    matchCards: [],
    flippedCards: [],
    matchedCount: 0,
    movesCount: 0,
    canFlip: true,
    scrambleIndex: 0,
    scrambleUserWord: [],
    isSpinning: false
  };

  // DOM Elements Cache
  const el = {
    // Header & Config
    cfgBrandName: document.getElementById('cfgBrandName'),
    cfgBrandSub: document.getElementById('cfgBrandSub'),
    btnInfo: document.getElementById('btnInfo'),
    btnSearchTrigger: document.getElementById('btnSearchTrigger'),
    btnHeaderTray: document.getElementById('btnHeaderTray'),
    trayBadgeCount: document.getElementById('trayBadgeCount'),
    searchInput: document.getElementById('searchInput'),
    btnClearSearch: document.getElementById('btnClearSearch'),
    
    // Entry Video Splash
    entryVideoSplash: document.getElementById('entryVideoSplash'),
    splashVideo: document.getElementById('splashVideo'),
    splashProgressFill: document.getElementById('splashProgressFill'),
    btnBackToTop: document.getElementById('btnBackToTop'),
    
    // Main Sections
    heroSection: document.getElementById('heroSection'),
    btnHeroOrder: document.getElementById('btnHeroOrder'),
    btnHeroGames: document.getElementById('btnHeroGames'),
    categoryPillList: document.getElementById('categoryPillList'),
    dietFilters: document.getElementById('dietFilters'),
    popularSection: document.getElementById('popularSection'),
    popularCarousel: document.getElementById('popularCarousel'),
    btnViewAllPopular: document.getElementById('btnViewAllPopular'),
    promoSection: document.getElementById('promoSection'),
    btnPromoAction: document.getElementById('btnPromoAction'),
    bannerOpenGames: document.getElementById('bannerOpenGames'),
    btnLaunchGames: document.getElementById('btnLaunchGames'),
    menuFeed: document.getElementById('menuFeed'),
    searchEmptyState: document.getElementById('searchEmptyState'),
    btnResetFilters: document.getElementById('btnResetFilters'),
    
    // Bottom Nav & Floating Bar
    bottomNavBar: document.getElementById('bottomNavBar'),
    bottomTrayBadge: document.getElementById('bottomTrayBadge'),
    floatingTrayBar: document.getElementById('floatingTrayBar'),
    ftbCount: document.getElementById('ftbCount'),
    ftbPrice: document.getElementById('ftbPrice'),
    btnOpenTrayFromFloat: document.getElementById('btnOpenTrayFromFloat'),
    
    // Modals
    dishModalOverlay: document.getElementById('dishModalOverlay'),
    btnCloseDishModal: document.getElementById('btnCloseDishModal'),
    modalDishImg: document.getElementById('modalDishImg'),
    modalDishDiet: document.getElementById('modalDishDiet'),
    modalDishBadge: document.getElementById('modalDishBadge'),
    modalDishTitle: document.getElementById('modalDishTitle'),
    modalDishPrice: document.getElementById('modalDishPrice'),
    modalDishRawName: document.getElementById('modalDishRawName'),
    modalDishDesc: document.getElementById('modalDishDesc'),
    modalDishCategory: document.getElementById('modalDishCategory'),
    modalDishSpice: document.getElementById('modalDishSpice'),
    btnModalQtyMinus: document.getElementById('btnModalQtyMinus'),
    modalQtyVal: document.getElementById('modalQtyVal'),
    btnModalQtyPlus: document.getElementById('btnModalQtyPlus'),
    btnModalAddToTray: document.getElementById('btnModalAddToTray'),
    modalAddBtnPrice: document.getElementById('modalAddBtnPrice'),
    
    // Tray Drawer
    trayDrawerOverlay: document.getElementById('trayDrawerOverlay'),
    btnCloseTrayDrawer: document.getElementById('btnCloseTrayDrawer'),
    trayItemsList: document.getElementById('trayItemsList'),
    trayItemTotalText: document.getElementById('trayItemTotalText'),
    traySubtotal: document.getElementById('traySubtotal'),
    trayGrandTotal: document.getElementById('trayGrandTotal'),
    btnShowWaiter: document.getElementById('btnShowWaiter'),
    btnClearTray: document.getElementById('btnClearTray'),
    
    // Waiter Slip Modal
    waiterModalOverlay: document.getElementById('waiterModalOverlay'),
    btnCloseWaiterModal: document.getElementById('btnCloseWaiterModal'),
    waiterRestaurantName: document.getElementById('waiterRestaurantName'),
    waiterOrderTime: document.getElementById('waiterOrderTime'),
    tableNoInput: document.getElementById('tableNoInput'),
    waiterItemsSlip: document.getElementById('waiterItemsSlip'),
    waiterTotalAmount: document.getElementById('waiterTotalAmount'),
    btnShareWhatsApp: document.getElementById('btnShareWhatsApp'),
    
    // Feedback Modal
    feedbackModalOverlay: document.getElementById('feedbackModalOverlay'),
    btnCloseFeedbackModal: document.getElementById('btnCloseFeedbackModal'),
    feedbackForm: document.getElementById('feedbackForm'),
    feedbackSuccessState: document.getElementById('feedbackSuccessState'),
    btnFeedbackDone: document.getElementById('btnFeedbackDone'),
    btnToggleOwnerFeedback: document.getElementById('btnToggleOwnerFeedback'),
    ownerFeedbackPanel: document.getElementById('ownerFeedbackPanel'),
    feedbackCount: document.getElementById('feedbackCount'),
    btnClearFeedbackLogs: document.getElementById('btnClearFeedbackLogs'),
    feedbackListContainer: document.getElementById('feedbackListContainer'),
    
    // Info Modal
    infoModalOverlay: document.getElementById('infoModalOverlay'),
    btnCloseInfoModal: document.getElementById('btnCloseInfoModal'),
    infoRestName: document.getElementById('infoRestName'),
    infoRestTagline: document.getElementById('infoRestTagline'),
    infoAddress: document.getElementById('infoAddress'),
    infoHours: document.getElementById('infoHours'),
    infoPhone: document.getElementById('infoPhone'),
    linkCall: document.getElementById('linkCall'),
    linkWhatsApp: document.getElementById('linkWhatsApp'),
    linkMaps: document.getElementById('linkMaps'),
    
    // Video Modal
    videoModalOverlay: document.getElementById('videoModalOverlay'),
    btnCloseVideoModal: document.getElementById('btnCloseVideoModal'),
    restaurantVideo: document.getElementById('restaurantVideo'),

    // Table Games Modal
    gamesModalOverlay: document.getElementById('gamesModalOverlay'),
    btnCloseGamesModal: document.getElementById('btnCloseGamesModal'),
    gameTabBtns: document.querySelectorAll('.game-tab-btn'),
    gameViewMatch: document.getElementById('gameViewMatch'),
    gameViewScramble: document.getElementById('gameViewScramble'),
    gameViewSpinner: document.getElementById('gameViewSpinner'),
    memoryGrid: document.getElementById('memoryGrid'),
    matchMovesCount: document.getElementById('matchMovesCount'),
    matchPairsCount: document.getElementById('matchPairsCount'),
    matchWinBanner: document.getElementById('matchWinBanner'),
    matchWinMsg: document.getElementById('matchWinMsg'),
    btnRestartMatch: document.getElementById('btnRestartMatch'),
    btnPlayMatchAgain: document.getElementById('btnPlayMatchAgain'),
    scrambleRoundText: document.getElementById('scrambleRoundText'),
    scrambleClueText: document.getElementById('scrambleClueText'),
    scrambleTilesBox: document.getElementById('scrambleTilesBox'),
    scrambleAnswerBox: document.getElementById('scrambleAnswerBox'),
    btnClearScramble: document.getElementById('btnClearScramble'),
    btnSubmitScramble: document.getElementById('btnSubmitScramble'),
    btnNextScramble: document.getElementById('btnNextScramble'),
    scrambleFeedback: document.getElementById('scrambleFeedback'),
    spinnerWheel: document.getElementById('spinnerWheel'),
    btnSpinWheel: document.getElementById('btnSpinWheel'),
    spinnerResultCard: document.getElementById('spinnerResultCard'),
    spinnerResultImg: document.getElementById('spinnerResultImg'),
    spinnerResultTitle: document.getElementById('spinnerResultTitle'),
    spinnerResultPrice: document.getElementById('spinnerResultPrice'),
    btnSpinnerAddTray: document.getElementById('btnSpinnerAddTray'),

    toastContainer: document.getElementById('toastContainer')
  };

  // ==================== INITIALIZATION ====================
  async function init() {
    initEntryVideoSplash();
    loadConfig();
    await loadMenuData();
    loadTrayFromStorage();
    loadFeedbacksFromStorage();
    setupEventListeners();
    renderCategories();
    renderPopularDishes();
    renderMenuFeed();
    updateTrayUI();
    initGames();
  }

  function loadConfig() {
    state.config = window.RESTAURANT_CONFIG || {
      name: "Green Lemon Restaurant",
      branch: "Pavoorchatram",
      tagline: "Good Food • Good Mood • Great Memories",
      phone: "+91 96333 38944",
      whatsapp: "+919633338944",
      address: "KTC Nagar, Pavoorchatram, Tenkasi, Tamil Nadu - 627808",
      operatingHours: "11:30 AM - 11:30 PM (Mon - Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Green+Lemon+Restaurant+Pavoorchatram+Tenkasi",
      currency: "₹",
      theme: { primaryGreen: "#0d351f", lemonGold: "#f4be18" }
    };

    if (el.cfgBrandName) el.cfgBrandName.textContent = state.config.name.toUpperCase();
    if (el.infoRestName) el.infoRestName.textContent = state.config.name;
    if (el.infoRestTagline) el.infoRestTagline.textContent = state.config.tagline;
    if (el.infoAddress) el.infoAddress.textContent = state.config.address;
    if (el.infoHours) el.infoHours.textContent = state.config.operatingHours;
    if (el.infoPhone) el.infoPhone.textContent = state.config.phone;
    if (el.linkCall) el.linkCall.href = `tel:${state.config.phone.replace(/[^0-9+]/g, '')}`;
    if (el.linkWhatsApp) el.linkWhatsApp.href = `https://wa.me/${state.config.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Green Lemon Restaurant! I would like to inquire about today\'s menu / table availability.')}`;
    if (el.linkMaps) el.linkMaps.href = state.config.googleMapsUrl;
  }

  async function loadMenuData() {
    if (window.MENU_DATA && window.MENU_DATA.items) {
      state.menu = window.MENU_DATA;
      return;
    }
    try {
      const resp = await fetch('menu.json');
      state.menu = await resp.json();
    } catch (e) {
      console.error("Failed to load menu data:", e);
      state.menu = { categories: [], items: [] };
    }
  }

  // ==================== ENTRY VIDEO SPLASH (PLAYS COMPLETELY THEN ENTERS MENU) ====================
  function initEntryVideoSplash() {
    if (!el.entryVideoSplash || !el.splashVideo) return;

    // Permanently muted: guaranteed instant autoplay with zero delay and no audio
    el.splashVideo.muted = true;
    el.splashVideo.defaultMuted = true;
    el.splashVideo.volume = 0;
    el.splashVideo.loop = false;

    let hasCompleted = false;
    const triggerMenuTransition = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      closeSplashVideo();
    };

    el.splashVideo.play().catch(() => {});

    // Update progress bar and detect completion
    el.splashVideo.addEventListener('timeupdate', () => {
      if (el.splashVideo.duration) {
        const pct = (el.splashVideo.currentTime / el.splashVideo.duration) * 100;
        if (el.splashProgressFill) el.splashProgressFill.style.width = pct + '%';

        // When video reaches the end, transition to menu
        if (el.splashVideo.currentTime >= el.splashVideo.duration - 0.2) {
          triggerMenuTransition();
        }
      }
    });

    // Auto close smoothly into the menu when video finishes completely
    el.splashVideo.addEventListener('ended', () => {
      triggerMenuTransition();
    });
  }

  function closeSplashVideo() {
    if (!el.entryVideoSplash) return;
    el.entryVideoSplash.classList.add('hide');
    setTimeout(() => {
      if (el.splashVideo) {
        el.splashVideo.pause();
      }
    }, 550);
  }

  // ==================== RENDERING ====================
  function renderCategories() {
    if (!state.menu || !state.menu.categories) return;

    let html = '';
    state.menu.categories.forEach(cat => {
      const isActive = cat.id === state.activeCategory ? 'active' : '';
      const meta = CATEGORY_META[cat.id] || {
        title: cat.name,
        svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
      };

      html += `
        <div class="category-pill-item ${isActive}" data-cat-id="${cat.id}">
          <div class="category-icon-circle">${meta.svg}</div>
          <span class="category-label">${meta.title}</span>
        </div>
      `;
    });
    el.categoryPillList.innerHTML = html;

    // Attach click listeners to category pills
    el.categoryPillList.querySelectorAll('.category-pill-item').forEach(pill => {
      pill.addEventListener('click', () => {
        const catId = pill.dataset.catId;
        setActiveCategory(catId);
      });
    });
  }

  function setActiveCategory(catId) {
    state.activeCategory = catId;
    el.categoryPillList.querySelectorAll('.category-pill-item').forEach(p => {
      const isCurrent = p.dataset.catId === catId;
      p.classList.toggle('active', isCurrent);
      if (isCurrent && el.categoryPillList) {
        // Smoothly center the active pill inside the horizontal category strip without touching window scroll
        const strip = el.categoryPillList;
        const targetLeft = p.offsetLeft - (strip.clientWidth / 2) + (p.offsetWidth / 2);
        strip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }
    });

    if (catId === 'all') {
      document.querySelectorAll('.category-block').forEach(b => b.style.display = 'block');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetSec = document.getElementById(`cat-block-${catId}`);
      if (targetSec) {
        document.querySelectorAll('.category-block').forEach(b => b.style.display = 'block');
        // Accurate header-offset scroll that eliminates jitter and glitching
        const headerOffset = 165;
        const targetY = targetSec.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }
    }
  }

  function renderPopularDishes() {
    if (!state.menu || !state.menu.items) return;

    const popularDishes = state.menu.items.filter(item => item.isPopular || item.badge).slice(0, 10);
    let html = '';

    popularDishes.forEach(dish => {
      html += `
        <div class="popular-card" data-dish-id="${dish.id}">
          <div class="popular-img-wrap">
            <img src="${dish.image}" alt="${dish.name}" loading="lazy" decoding="async" onerror="this.src='images/default_dish.webp'">
            ${dish.badge ? `<span class="popular-badge-pill">${dish.badge}</span>` : ''}
            <span class="diet-mark-icon ${dish.diet}"></span>
          </div>
          <div class="popular-card-body">
            <h4 class="popular-dish-title">${dish.name}</h4>
            <p class="popular-dish-desc">${dish.description || ''}</p>
            <div class="popular-bottom-row">
              <span class="popular-price">₹${dish.price}</span>
              <button class="add-dish-btn btn-quick-add" data-dish-id="${dish.id}" aria-label="Add to Tray">+</button>
            </div>
          </div>
        </div>
      `;
    });

    el.popularCarousel.innerHTML = html;

    // Attach card click & quick add listeners
    el.popularCarousel.querySelectorAll('.popular-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-quick-add')) return;
        const dishId = card.dataset.dishId;
        openDishModal(dishId);
      });
    });

    el.popularCarousel.querySelectorAll('.btn-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishId = btn.dataset.dishId;
        addToTray(dishId, 1);
      });
    });
  }

  function renderMenuFeed() {
    if (!state.menu || !state.menu.items) return;

    const query = state.searchQuery.trim().toLowerCase();
    const diet = state.activeDiet;

    let filteredItems = state.menu.items.filter(item => {
      if (diet !== 'all') {
        if (diet === 'veg' && item.diet !== 'veg') return false;
        if (diet === 'non-veg' && item.diet !== 'non-veg') return false;
        if (diet === 'egg' && item.diet !== 'egg') return false;
      }
      if (query) {
        const titleMatch = item.name.toLowerCase().includes(query);
        const rawMatch = item.rawName.toLowerCase().includes(query);
        const descMatch = (item.description || '').toLowerCase().includes(query);
        const catMatch = (item.category || '').toLowerCase().includes(query);
        if (!titleMatch && !rawMatch && !descMatch && !catMatch) return false;
      }
      return true;
    });

    if (filteredItems.length === 0) {
      el.menuFeed.innerHTML = '';
      el.searchEmptyState.style.display = 'block';
      el.popularSection.style.display = 'none';
      el.promoSection.style.display = 'none';
      return;
    }

    el.searchEmptyState.style.display = 'none';
    if (query) {
      el.popularSection.style.display = 'none';
      el.promoSection.style.display = 'none';
    } else {
      el.popularSection.style.display = 'block';
      el.promoSection.style.display = 'block';
    }

    const catMap = {};
    state.menu.categories.forEach(c => {
      if (c.id !== 'all') {
        catMap[c.id] = { meta: c, items: [] };
      }
    });

    filteredItems.forEach(item => {
      if (catMap[item.category]) {
        catMap[item.category].items.push(item);
      } else {
        if (!catMap['starters-bites']) {
          catMap['starters-bites'] = { meta: { id: 'starters-bites', name: 'Starters & Quick Bites', icon: '🥟' }, items: [] };
        }
        catMap['starters-bites'].items.push(item);
      }
    });

    let feedHtml = '';
    for (const [catId, group] of Object.entries(catMap)) {
      if (group.items.length === 0) continue;
      const meta = CATEGORY_META[catId] || { title: group.meta.name, svg: '' };

      feedHtml += `
        <div class="category-block" id="cat-block-${catId}">
          <div class="cat-header">
            <div class="cat-header-left">
              <span class="cat-icon-svg" style="display:inline-flex; width:22px; height:22px; color:var(--primary-green); vertical-align:middle;">${meta.svg}</span>
              <h3 class="cat-title-text">${group.meta.name}</h3>
              <span class="cat-item-count">${group.items.length}</span>
            </div>
            ${group.meta.tagline ? `<span class="cat-tagline">${group.meta.tagline}</span>` : ''}
          </div>
          <div class="dish-grid">
      `;

      group.items.forEach(dish => {
        feedHtml += `
          <div class="dish-card" data-dish-id="${dish.id}">
            <div class="dish-media">
              <img src="${dish.image}" alt="${dish.name}" loading="lazy" decoding="async" onerror="this.src='images/default_dish.webp'">
              ${dish.badge ? `<span class="dish-badge-pill">${dish.badge}</span>` : ''}
              <span class="diet-mark-icon ${dish.diet}"></span>
            </div>
            <div class="dish-info">
              <div class="dish-top-row">
                <div>
                  <h4 class="dish-title">${dish.name}</h4>
                  ${dish.rawName && dish.rawName !== dish.name ? `<span class="dish-raw-name">${dish.rawName}</span>` : ''}
                </div>
              </div>
              <p class="dish-desc-snippet">${dish.description || ''}</p>
              <div class="dish-bottom-row">
                <div class="dish-price-wrap">
                  <span class="dish-price">₹${dish.price}</span>
                </div>
                <div class="dish-card-actions">
                  <button class="card-add-btn btn-quick-add" data-dish-id="${dish.id}">
                    <span>+ Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      feedHtml += `
          </div>
        </div>
      `;
    }

    el.menuFeed.innerHTML = feedHtml;

    el.menuFeed.querySelectorAll('.dish-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-quick-add')) return;
        const dishId = card.dataset.dishId;
        openDishModal(dishId);
      });
    });

    el.menuFeed.querySelectorAll('.btn-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishId = btn.dataset.dishId;
        addToTray(dishId, 1);
      });
    });
  }

  // ==================== DISH DETAILS MODAL ====================
  let currentModalQty = 1;

  function openDishModal(dishId) {
    const dish = state.menu.items.find(d => d.id === dishId);
    if (!dish) return;

    state.selectedDish = dish;
    currentModalQty = 1;

    el.modalDishImg.src = dish.image;
    el.modalDishImg.alt = dish.name;
    el.modalDishTitle.textContent = dish.name;
    el.modalDishPrice.textContent = `₹${dish.price}`;
    el.modalDishRawName.textContent = dish.rawName !== dish.name ? `Menu item: ${dish.rawName}` : '';
    el.modalDishDesc.textContent = dish.description || 'Authentic dish prepared fresh to order.';
    
    const cat = state.menu.categories.find(c => c.id === dish.category);
    el.modalDishCategory.textContent = cat ? cat.name : dish.category;
    
    const spiceEmojis = ['Mild 🍃', 'Medium Spiced 🌶️', 'Hot & Spicy 🔥'];
    el.modalDishSpice.textContent = spiceEmojis[(dish.spiceLevel || 1) - 1] || 'Medium 🌶️';

    el.modalDishDiet.className = `modal-diet-tag diet-mark-icon ${dish.diet}`;
    el.modalDishDiet.textContent = dish.diet === 'veg' ? 'Pure Veg' : dish.diet === 'egg' ? 'Contains Egg' : 'Non-Veg';

    if (dish.badge) {
      el.modalDishBadge.style.display = 'block';
      el.modalDishBadge.textContent = dish.badge;
    } else {
      el.modalDishBadge.style.display = 'none';
    }

    updateModalQtyUI();
    el.dishModalOverlay.classList.add('active');
  }

  function closeDishModal() {
    el.dishModalOverlay.classList.remove('active');
    state.selectedDish = null;
  }

  function updateModalQtyUI() {
    el.modalQtyVal.textContent = currentModalQty;
    if (state.selectedDish) {
      el.modalAddBtnPrice.textContent = `₹${state.selectedDish.price * currentModalQty}`;
    }
  }

  // ==================== TRAY / ORDER LOGIC ====================
  function loadTrayFromStorage() {
    try {
      const saved = localStorage.getItem('green_lemon_tray');
      if (saved) state.tray = JSON.parse(saved);
    } catch (e) {
      state.tray = {};
    }
  }

  function saveTrayToStorage() {
    try {
      localStorage.setItem('green_lemon_tray', JSON.stringify(state.tray));
    } catch (e) {}
  }

  function addToTray(dishId, qty = 1) {
    const dish = state.menu.items.find(d => d.id === dishId);
    if (!dish) return;

    if (!state.tray[dishId]) {
      state.tray[dishId] = { dish: dish, qty: 0 };
    }
    state.tray[dishId].qty += qty;
    saveTrayToStorage();
    updateTrayUI();
    showToast(`Added ${dish.name} to Tray`);
  }

  function updateTrayQty(dishId, delta) {
    if (!state.tray[dishId]) return;
    state.tray[dishId].qty += delta;
    if (state.tray[dishId].qty <= 0) {
      delete state.tray[dishId];
    }
    saveTrayToStorage();
    updateTrayUI();
    renderTrayDrawerItems();
  }

  function clearTray() {
    state.tray = {};
    saveTrayToStorage();
    updateTrayUI();
    renderTrayDrawerItems();
    closeTrayDrawer();
    showToast("Tray cleared");
  }

  function updateTrayUI() {
    let totalItems = 0;
    let totalPrice = 0;

    Object.values(state.tray).forEach(item => {
      totalItems += item.qty;
      totalPrice += (item.dish.price * item.qty);
    });

    el.trayBadgeCount.textContent = totalItems;
    el.trayBadgeCount.style.display = totalItems > 0 ? 'flex' : 'none';
    el.bottomTrayBadge.textContent = totalItems;
    el.bottomTrayBadge.style.display = totalItems > 0 ? 'flex' : 'none';

    if (totalItems > 0) {
      el.floatingTrayBar.style.display = 'block';
      el.ftbCount.textContent = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
      el.ftbPrice.textContent = `₹${totalPrice}`;
    } else {
      el.floatingTrayBar.style.display = 'none';
    }

    el.trayItemTotalText.textContent = `${totalItems} items selected`;
    el.traySubtotal.textContent = `₹${totalPrice}`;
    el.trayGrandTotal.textContent = `₹${totalPrice}`;
  }

  function openTrayDrawer() {
    renderTrayDrawerItems();
    el.trayDrawerOverlay.classList.add('active');
  }

  function closeTrayDrawer() {
    el.trayDrawerOverlay.classList.remove('active');
  }

  function renderTrayDrawerItems() {
    const items = Object.values(state.tray);
    if (items.length === 0) {
      el.trayItemsList.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🛍️</div>
          <p>Your table tray is currently empty.</p>
          <p style="font-size: 0.8rem;">Tap "+ Add" on any dish to select your meal.</p>
        </div>
      `;
      el.btnShowWaiter.disabled = true;
      el.btnShowWaiter.style.opacity = '0.5';
      return;
    }

    el.btnShowWaiter.disabled = false;
    el.btnShowWaiter.style.opacity = '1';

    let html = '';
    items.forEach(({ dish, qty }) => {
      html += `
        <div class="tray-item-row" data-dish-id="${dish.id}">
          <img src="${dish.image}" alt="${dish.name}" class="tray-item-thumb" onerror="this.src='images/default_dish.webp'">
          <div class="tray-item-info">
            <h5 class="tray-item-name">${dish.name}</h5>
            <span class="tray-item-price-each">₹${dish.price} each</span>
          </div>
          <div class="tray-item-controls">
            <div class="tray-stepper">
              <button class="btn-tray-minus" data-dish-id="${dish.id}">-</button>
              <span>${qty}</span>
              <button class="btn-tray-plus" data-dish-id="${dish.id}">+</button>
            </div>
            <span class="tray-line-total">₹${dish.price * qty}</span>
          </div>
        </div>
      `;
    });

    el.trayItemsList.innerHTML = html;

    el.trayItemsList.querySelectorAll('.btn-tray-minus').forEach(btn => {
      btn.addEventListener('click', () => updateTrayQty(btn.dataset.dishId, -1));
    });
    el.trayItemsList.querySelectorAll('.btn-tray-plus').forEach(btn => {
      btn.addEventListener('click', () => updateTrayQty(btn.dataset.dishId, 1));
    });
  }

  // ==================== WAITER MODAL ====================
  function openWaiterSlipModal() {
    closeTrayDrawer();
    const items = Object.values(state.tray);
    if (items.length === 0) return;

    el.waiterRestaurantName.textContent = state.config.name;
    const now = new Date();
    el.waiterOrderTime.textContent = now.toLocaleDateString() + ' • ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let slipHtml = '';
    let total = 0;
    items.forEach(({ dish, qty }) => {
      const lineTotal = dish.price * qty;
      total += lineTotal;
      slipHtml += `
        <div class="slip-row">
          <div class="slip-left">
            <span class="slip-qty">${qty}x</span>
            <span class="slip-name">${dish.name}</span>
          </div>
          <span class="slip-price">₹${lineTotal}</span>
        </div>
      `;
    });

    el.waiterItemsSlip.innerHTML = slipHtml;
    el.waiterTotalAmount.textContent = `₹${total}`;
    el.waiterModalOverlay.classList.add('active');
  }

  function closeWaiterSlipModal() {
    el.waiterModalOverlay.classList.remove('active');
  }

  function shareOrderOnWhatsApp() {
    const items = Object.values(state.tray);
    if (items.length === 0) return;

    const tableNo = el.tableNoInput.value.trim() || 'Dine-In Table';
    let msg = `*DINE-IN ORDER - ${state.config.name.toUpperCase()}*\n`;
    msg += `📍 *Branch:* Pavoorchatram, Tenkasi\n`;
    msg += `📍 *Table:* ${tableNo}\n`;
    msg += `🕒 *Time:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    msg += `---------------------------\n`;

    let total = 0;
    items.forEach(({ dish, qty }) => {
      const lineTotal = dish.price * qty;
      total += lineTotal;
      msg += `• *${qty}x* ${dish.name} - ₹${lineTotal}\n`;
    });

    msg += `---------------------------\n`;
    msg += `💰 *Estimated Total:* ₹${total}\n\n`;
    msg += `_Sent from Green Lemon Restaurant Digital Menu_`;

    const waUrl = `https://wa.me/${state.config.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  }

  // ==================== TABLE FUN & PUZZLE GAMES ====================
  const GAME_PAIRS = [
    { emoji: '🍗', name: 'Kuzhimandi' },
    { emoji: '🔥', name: 'Alfaham' },
    { emoji: '🫓', name: 'Porotta' },
    { emoji: '🍋', name: 'Lemon Soda' },
    { emoji: '🍸', name: 'Mint Mojito' },
    { emoji: '🍨', name: 'Falooda' }
  ];

  const SCRAMBLE_DISHES = [
    { word: 'MANDI', clue: 'Arabian slow-pit roasted spiced long-grain rice with chicken' },
    { word: 'ALFAHAM', clue: 'Smoky Arabian charcoal-grilled chicken with exotic spices' },
    { word: 'POROTTA', clue: 'Flaky golden layered Kerala flatbread grilled on hot tawa' },
    { word: 'FALOODA', clue: 'Royal layered dessert with vermicelli, rose milk & ice cream' },
    { word: 'MOJITO', clue: 'Refreshing muddled mint & citrus sparkling cooler' }
  ];

  function initGames() {
    initMemoryGame();
    initScrambleGame();
    initSpinnerGame();
  }

  function openGamesModal(gameName = 'match') {
    switchGameTab(gameName);
    el.gamesModalOverlay.classList.add('active');
  }

  function closeGamesModal() {
    el.gamesModalOverlay.classList.remove('active');
  }

  function switchGameTab(tabName) {
    state.activeGame = tabName;
    el.gameTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.game === tabName);
    });

    el.gameViewMatch.style.display = tabName === 'match' ? 'block' : 'none';
    el.gameViewScramble.style.display = tabName === 'scramble' ? 'block' : 'none';
    el.gameViewSpinner.style.display = tabName === 'spinner' ? 'block' : 'none';

    if (tabName === 'match' && el.memoryGrid.children.length === 0) {
      initMemoryGame();
    } else if (tabName === 'scramble' && el.scrambleTilesBox.children.length === 0) {
      renderScrambleRound();
    }
  }

  // Game 1: Memory Game
  function initMemoryGame() {
    state.movesCount = 0;
    state.matchedCount = 0;
    state.flippedCards = [];
    state.canFlip = true;
    el.matchMovesCount.textContent = '0';
    el.matchPairsCount.textContent = '0 / 6';
    el.matchWinBanner.style.display = 'none';

    // Build 12 cards (6 pairs)
    const deck = [...GAME_PAIRS, ...GAME_PAIRS].map((item, idx) => ({
      id: idx,
      emoji: item.emoji,
      name: item.name
    }));

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    state.matchCards = deck;
    let gridHtml = '';
    deck.forEach((card, idx) => {
      gridHtml += `<div class="memory-card" data-idx="${idx}" data-emoji="${card.emoji}" aria-label="Card ${idx+1}"></div>`;
    });
    el.memoryGrid.innerHTML = gridHtml;

    el.memoryGrid.querySelectorAll('.memory-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => handleCardFlip(cardEl));
    });
  }

  function handleCardFlip(cardEl) {
    if (!state.canFlip) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    const idx = parseInt(cardEl.dataset.idx);
    cardEl.classList.add('flipped');
    state.flippedCards.push({ el: cardEl, data: state.matchCards[idx] });

    if (state.flippedCards.length === 2) {
      state.movesCount++;
      el.matchMovesCount.textContent = state.movesCount;
      state.canFlip = false;

      const [c1, c2] = state.flippedCards;
      if (c1.data.name === c2.data.name) {
        // Matched!
        setTimeout(() => {
          c1.el.classList.add('matched');
          c2.el.classList.add('matched');
          state.matchedCount++;
          el.matchPairsCount.textContent = `${state.matchedCount} / 6`;
          state.flippedCards = [];
          state.canFlip = true;

          if (state.matchedCount === 6) {
            el.matchWinMsg.textContent = `Super memory! You matched all pairs in ${state.movesCount} moves! Your food is cooking fresh with authentic spices.`;
            el.matchWinBanner.style.display = 'block';
            showToast("🎉 Pairs Solved! Chef gives you a 10/10!");
          }
        }, 350);
      } else {
        // Not matched - flip back
        setTimeout(() => {
          c1.el.classList.remove('flipped');
          c2.el.classList.remove('flipped');
          state.flippedCards = [];
          state.canFlip = true;
        }, 900);
      }
    }
  }

  // Game 2: Word Scramble
  function initScrambleGame() {
    state.scrambleIndex = 0;
    renderScrambleRound();
  }

  function renderScrambleRound() {
    const cur = SCRAMBLE_DISHES[state.scrambleIndex];
    state.scrambleUserWord = [];

    el.scrambleRoundText.textContent = `Dish ${state.scrambleIndex + 1} of ${SCRAMBLE_DISHES.length}`;
    el.scrambleClueText.textContent = cur.clue;
    el.scrambleFeedback.textContent = '';
    el.scrambleFeedback.style.color = 'var(--text-main)';
    el.btnNextScramble.style.display = 'none';
    el.btnSubmitScramble.style.display = 'inline-block';

    // Scramble word letters
    const letters = cur.word.split('');
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let tilesHtml = '';
    shuffled.forEach((letter, i) => {
      tilesHtml += `<button class="scramble-tile" data-letter="${letter}" data-tile-id="${i}">${letter}</button>`;
    });
    el.scrambleTilesBox.innerHTML = tilesHtml;
    el.scrambleAnswerBox.innerHTML = `<span style="color:#aaa; font-size:0.75rem; align-self:center;">Tap letters to form the dish name</span>`;

    el.scrambleTilesBox.querySelectorAll('.scramble-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        tile.classList.add('used');
        state.scrambleUserWord.push({ letter: tile.dataset.letter, tileEl: tile });
        renderScrambleAnswer();
      });
    });
  }

  function renderScrambleAnswer() {
    if (state.scrambleUserWord.length === 0) {
      el.scrambleAnswerBox.innerHTML = `<span style="color:#aaa; font-size:0.75rem; align-self:center;">Tap letters to form the dish name</span>`;
      return;
    }

    let ansHtml = '';
    state.scrambleUserWord.forEach((item, idx) => {
      ansHtml += `<div class="answer-tile" data-ans-idx="${idx}">${item.letter}</div>`;
    });
    el.scrambleAnswerBox.innerHTML = ansHtml;

    el.scrambleAnswerBox.querySelectorAll('.answer-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = parseInt(tile.dataset.ansIdx);
        const removed = state.scrambleUserWord.splice(idx, 1)[0];
        if (removed && removed.tileEl) removed.tileEl.classList.remove('used');
        renderScrambleAnswer();
      });
    });
  }

  function clearScrambleWord() {
    state.scrambleUserWord.forEach(item => {
      if (item.tileEl) item.tileEl.classList.remove('used');
    });
    state.scrambleUserWord = [];
    renderScrambleAnswer();
    el.scrambleFeedback.textContent = '';
  }

  function checkScrambleAnswer() {
    const cur = SCRAMBLE_DISHES[state.scrambleIndex];
    const userWord = state.scrambleUserWord.map(i => i.letter).join('');

    if (userWord === cur.word) {
      el.scrambleFeedback.textContent = `🎉 Correct! It's ${cur.word}!`;
      el.scrambleFeedback.style.color = 'var(--color-veg)';
      el.btnSubmitScramble.style.display = 'none';

      if (state.scrambleIndex < SCRAMBLE_DISHES.length - 1) {
        el.btnNextScramble.style.display = 'inline-block';
      } else {
        el.scrambleFeedback.textContent = `🏆 Master Chef! You solved all ${SCRAMBLE_DISHES.length} dish puzzles!`;
        el.btnNextScramble.style.display = 'none';
      }
    } else {
      el.scrambleFeedback.textContent = `❌ Not quite! Tap "Clear" or tap a letter to try again.`;
      el.scrambleFeedback.style.color = 'var(--color-nonveg)';
    }
  }

  // Game 3: Chef's Lucky Spinner
  function initSpinnerGame() {
    el.btnSpinWheel.addEventListener('click', spinLuckyWheel);
  }

  let currentRotation = 0;
  function spinLuckyWheel() {
    if (state.isSpinning) return;
    state.isSpinning = true;
    el.spinnerResultCard.style.display = 'none';

    // Pick random exciting dish from menu
    const candidates = state.menu.items.filter(i => i.isPopular || i.badge);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)] || state.menu.items[0];

    const randomSpins = 5 + Math.floor(Math.random() * 4); // 5 to 8 full rotations
    const randomDeg = Math.floor(Math.random() * 360);
    currentRotation += (randomSpins * 360) + randomDeg;

    el.spinnerWheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      state.isSpinning = false;
      el.spinnerResultImg.src = chosen.image;
      el.spinnerResultTitle.textContent = chosen.name;
      el.spinnerResultPrice.textContent = `₹${chosen.price}`;
      el.btnSpinnerAddTray.onclick = () => {
        addToTray(chosen.id, 1);
        showToast(`Added ${chosen.name} to Tray!`);
      };
      el.spinnerResultCard.style.display = 'flex';
      showToast(`🎯 Chef suggests: ${chosen.name}!`);
    }, 3100);
  }

  // ==================== FEEDBACK SYSTEM ====================
  function loadFeedbacksFromStorage() {
    try {
      const saved = localStorage.getItem('green_lemon_feedbacks');
      state.feedbacks = saved ? JSON.parse(saved) : [];
    } catch (e) {
      state.feedbacks = [];
    }
  }

  function saveFeedbackToStorage(entry) {
    state.feedbacks.unshift(entry);
    try {
      localStorage.setItem('green_lemon_feedbacks', JSON.stringify(state.feedbacks));
    } catch (e) {}
  }

  function openFeedbackModal() {
    el.feedbackForm.reset();
    el.feedbackForm.style.display = 'flex';
    el.feedbackSuccessState.style.display = 'none';
    el.ownerFeedbackPanel.style.display = 'none';
    resetStarRatings();
    el.feedbackModalOverlay.classList.add('active');
  }

  function closeFeedbackModal() {
    el.feedbackModalOverlay.classList.remove('active');
  }

  function resetStarRatings() {
    document.querySelectorAll('.star-rating').forEach(group => {
      group.querySelectorAll('.star-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx < 5);
      });
    });
  }

  function handleStarClick(e) {
    const btn = e.target.closest('.star-btn');
    if (!btn) return;
    const group = btn.closest('.star-rating');
    const val = parseInt(btn.dataset.val);
    group.querySelectorAll('.star-btn').forEach((b, idx) => {
      b.classList.toggle('active', idx < val);
    });
  }

  function getRatingVal(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return 5;
    return group.querySelectorAll('.star-btn.active').length;
  }

  function submitFeedback(e) {
    e.preventDefault();

    const reviewEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      overallRating: getRatingVal('starOverall'),
      foodRating: getRatingVal('starFood'),
      serviceRating: getRatingVal('starService'),
      favoriteDish: document.getElementById('fbFavoriteDish').value.trim(),
      comments: document.getElementById('fbComments').value.trim(),
      customerName: document.getElementById('fbCustomerName').value.trim() || 'Anonymous Guest',
      tableNo: document.getElementById('fbTableNo').value.trim() || 'Walk-in'
    };

    saveFeedbackToStorage(reviewEntry);
    el.feedbackForm.style.display = 'none';
    el.feedbackSuccessState.style.display = 'block';
    showToast("Feedback submitted! Thank you.");
  }

  function renderOwnerFeedbackLogs() {
    el.feedbackCount.textContent = state.feedbacks.length;
    if (state.feedbacks.length === 0) {
      el.feedbackListContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.78rem;">No customer reviews submitted yet.</p>`;
      return;
    }

    let html = '';
    state.feedbacks.forEach(fb => {
      html += `
        <div class="feedback-entry">
          <div class="fb-entry-top">
            <span>${fb.customerName} (${fb.tableNo})</span>
            <span style="color: var(--lemon-gold-hover);">★ ${fb.overallRating}/5</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.7rem; margin-bottom: 4px;">${fb.date}</div>
          ${fb.favoriteDish ? `<div><strong>Fav Dish:</strong> ${fb.favoriteDish}</div>` : ''}
          ${fb.comments ? `<div>"${fb.comments}"</div>` : ''}
        </div>
      `;
    });
    el.feedbackListContainer.innerHTML = html;
  }

  // ==================== INFO & VIDEO MODALS ====================
  function openInfoModal() {
    el.infoModalOverlay.classList.add('active');
  }
  function closeInfoModal() {
    el.infoModalOverlay.classList.remove('active');
  }

  function openVideoModal() {
    el.videoModalOverlay.classList.add('active');
    if (el.restaurantVideo) {
      el.restaurantVideo.currentTime = 0;
      el.restaurantVideo.play().catch(() => {});
    }
  }
  function closeVideoModal() {
    el.videoModalOverlay.classList.remove('active');
    if (el.restaurantVideo) el.restaurantVideo.pause();
  }

  // ==================== TOAST HELPER ====================
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 2600);
  }

  // ==================== EVENT LISTENERS ====================
  function setupEventListeners() {
    // Header triggers
    el.btnInfo.addEventListener('click', openInfoModal);
    el.btnHeaderTray.addEventListener('click', openTrayDrawer);
    el.btnSearchTrigger.addEventListener('click', () => {
      el.searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Search Input with Debounce for ultra-responsive performance
    let searchDebounce = null;
    el.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      const val = e.target.value;
      el.btnClearSearch.style.display = val ? 'block' : 'none';
      searchDebounce = setTimeout(() => {
        state.searchQuery = val;
        renderMenuFeed();
      }, 100);
    });

    el.btnClearSearch.addEventListener('click', () => {
      clearTimeout(searchDebounce);
      el.searchInput.value = '';
      state.searchQuery = '';
      el.btnClearSearch.style.display = 'none';
      renderMenuFeed();
    });

    // Floating Back to Top Arrow on the side
    if (el.btnBackToTop) {
      el.btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      let scrollTick = false;
      window.addEventListener('scroll', () => {
        if (!scrollTick) {
          window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 280) {
              el.btnBackToTop.classList.add('visible');
            } else {
              el.btnBackToTop.classList.remove('visible');
            }
            scrollTick = false;
          });
          scrollTick = true;
        }
      }, { passive: true });
    }

    el.btnResetFilters.addEventListener('click', () => {
      el.searchInput.value = '';
      state.searchQuery = '';
      state.activeDiet = 'all';
      el.dietFilters.querySelectorAll('.diet-chip').forEach(c => c.classList.toggle('active', c.dataset.diet === 'all'));
      renderMenuFeed();
    });

    // Dietary Filter Chips
    el.dietFilters.querySelectorAll('.diet-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        el.dietFilters.querySelectorAll('.diet-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeDiet = chip.dataset.diet;
        renderMenuFeed();
      });
    });

    // Hero buttons
    el.btnHeroOrder.addEventListener('click', () => {
      const target = document.getElementById('popularSection');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    if (el.btnHeroGames) {
      el.btnHeroGames.addEventListener('click', () => openGamesModal('match'));
    }

    // View all popular
    el.btnViewAllPopular.addEventListener('click', () => {
      setActiveCategory('mandi-biriyani');
    });

    // Promo banner action
    el.btnPromoAction.addEventListener('click', () => {
      setActiveCategory('mandi-biriyani');
    });

    // Table Games Banner Triggers
    if (el.bannerOpenGames) {
      el.bannerOpenGames.addEventListener('click', () => openGamesModal('match'));
    }
    if (el.btnLaunchGames) {
      el.btnLaunchGames.addEventListener('click', (e) => {
        e.stopPropagation();
        openGamesModal('match');
      });
    }

    // Games Modal Tabs & Controls
    el.btnCloseGamesModal.addEventListener('click', closeGamesModal);
    el.gameTabBtns.forEach(btn => {
      btn.addEventListener('click', () => switchGameTab(btn.dataset.game));
    });

    el.btnRestartMatch.addEventListener('click', initMemoryGame);
    el.btnPlayMatchAgain.addEventListener('click', initMemoryGame);

    el.btnClearScramble.addEventListener('click', clearScrambleWord);
    el.btnSubmitScramble.addEventListener('click', checkScrambleAnswer);
    el.btnNextScramble.addEventListener('click', () => {
      state.scrambleIndex++;
      renderScrambleRound();
    });

    // Floating Tray Bar
    el.btnOpenTrayFromFloat.addEventListener('click', openTrayDrawer);

    // Modal Qty Stepper
    el.btnModalQtyMinus.addEventListener('click', () => {
      if (currentModalQty > 1) {
        currentModalQty--;
        updateModalQtyUI();
      }
    });
    el.btnModalQtyPlus.addEventListener('click', () => {
      currentModalQty++;
      updateModalQtyUI();
    });

    el.btnModalAddToTray.addEventListener('click', () => {
      if (state.selectedDish) {
        addToTray(state.selectedDish.id, currentModalQty);
        closeDishModal();
      }
    });

    // Tray Drawer Actions
    el.btnCloseTrayDrawer.addEventListener('click', closeTrayDrawer);
    el.btnShowWaiter.addEventListener('click', openWaiterSlipModal);
    el.btnClearTray.addEventListener('click', clearTray);

    // Waiter Slip Actions
    el.btnCloseWaiterModal.addEventListener('click', closeWaiterSlipModal);
    if (el.btnShareWhatsApp) {
      el.btnShareWhatsApp.addEventListener('click', shareOrderOnWhatsApp);
    }

    // Feedback Actions
    el.btnCloseFeedbackModal.addEventListener('click', closeFeedbackModal);
    el.feedbackForm.addEventListener('submit', submitFeedback);
    el.btnFeedbackDone.addEventListener('click', closeFeedbackModal);
    document.querySelectorAll('.star-rating').forEach(g => {
      g.addEventListener('click', handleStarClick);
    });

    el.btnToggleOwnerFeedback.addEventListener('click', () => {
      const isVisible = el.ownerFeedbackPanel.style.display === 'block';
      el.ownerFeedbackPanel.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) renderOwnerFeedbackLogs();
    });

    el.btnClearFeedbackLogs.addEventListener('click', () => {
      if (confirm("Clear all recorded feedback logs?")) {
        state.feedbacks = [];
        localStorage.removeItem('green_lemon_feedbacks');
        renderOwnerFeedbackLogs();
        showToast("Feedback logs cleared.");
      }
    });

    // Info Modal
    el.btnCloseInfoModal.addEventListener('click', closeInfoModal);

    // Video Modal
    el.btnCloseVideoModal.addEventListener('click', closeVideoModal);

    // Dish Modal Close
    el.btnCloseDishModal.addEventListener('click', closeDishModal);

    // Click outside modal card to close
    [el.dishModalOverlay, el.trayDrawerOverlay, el.waiterModalOverlay, el.feedbackModalOverlay, el.infoModalOverlay, el.videoModalOverlay, el.gamesModalOverlay].forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          if (overlay === el.videoModalOverlay && el.restaurantVideo) el.restaurantVideo.pause();
        }
      });
    });

    // Bottom Navigation Bar
    el.bottomNavBar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        el.bottomNavBar.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        if (target === 'menu') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === 'games') {
          openGamesModal('match');
        } else if (target === 'tray') {
          openTrayDrawer();
        } else if (target === 'feedback') {
          openFeedbackModal();
        } else if (target === 'info') {
          openInfoModal();
        }
      });
    });

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDishModal();
        closeTrayDrawer();
        closeWaiterSlipModal();
        closeFeedbackModal();
        closeInfoModal();
        closeVideoModal();
        closeGamesModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
