/**
 * VRINDA EARTH NATURALS - E-COMMERCE JAVASCRIPT APPLICATION
 * Author: Vrinda Earth Naturals Dev Team
 * Features: Product filtering, Cart Drawer, WhatsApp Ordering, Direct Checkout,
 *           Coupon discounts, Quick View modal, and Indian UPI/COD payment support.
 *           Dynamically connected with Admin Panel via localStorage!
 */

// 1. DEFAULT SEED PRODUCTS
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Herbal Face Wash Powder",
    category: "cleanser",
    badge: "Hero Product",
    rating: 4.9,
    reviewCount: 148,
    price: 349,
    mrp: 499,
    image: "assets/images/face_wash_powder.jpg",
    shortDesc: "100% Organic powder cleanser made with pure Multani Mitti, Sandalwood, Neem, and Damask Rose. Cleanses deep without stripping natural moisture.",
    ingredients: "Multani Mitti (Fuller's Earth), Sandalwood Powder (Chandan), Rose Petal Powder (Desi Gulab), Neem Leaves, Wild Turmeric (Kasturi Manjal), Lodhra bark.",
    howToUse: "Take 1/2 tsp powder in palm, activate with Magic Rose Water or water to make a smooth paste. Massage gently on face for 60 seconds and rinse.",
    benefits: ["Controls excessive facial oil & acne", "Gently exfoliates dead skin cells", "Tightens pores & clarifies complexion", "Zero sulphates & zero foaming chemicals"]
  },
  {
    id: 2,
    name: "Magic Rose Water (Floral Mist)",
    category: "floral",
    badge: "Pure Steam Distilled",
    rating: 5.0,
    reviewCount: 96,
    price: 279,
    mrp: 399,
    image: "assets/images/rose_water.jpg",
    shortDesc: "Pure steam-distilled essence of freshly harvested Indian pink roses. Naturally balances skin pH, provides instant dewy hydration, and tightens pores.",
    ingredients: "100% Steam-distilled Rosa Damascena (Wild Indian Damask Rose) Hydrosol. Alcohol & preservative-free.",
    howToUse: "Spray generously onto face after cleansing, or use to activate your Herbal Face Wash Powder. Can also be spritzed anytime during the day for a refreshing dewy glow.",
    benefits: ["Instant hydration & cooling sensation", "Minimizes open skin pores", "Balances natural sebum & pH", "Sets makeup and refreshes tired skin"]
  },
  {
    id: 3,
    name: "Magic Activator Elixir",
    category: "activator",
    badge: "Radiance Catalyst",
    rating: 4.8,
    reviewCount: 82,
    price: 399,
    mrp: 549,
    image: "assets/images/magic_activator.jpg",
    shortDesc: "A potent herbal activator and renewal catalyst enriched with saffron threads, aloe vera, and natural antioxidants to supercharge the herbal face wash.",
    ingredients: "Cold-pressed Kumkumadi extracts, Pure Kashmir Saffron (Kesar), Aloe Barbadensis Leaf Juice, Licorice root, Frankincense oil.",
    howToUse: "Add 3-4 drops directly into the Face Wash Powder along with Rose Water for deep pigmentation correction and instant radiance.",
    benefits: ["Accelerates herbal absorption", "Fades dark spots and sun tan", "Promotes collagen and elasticity", "Gives healthy glass-skin radiance"]
  },
  {
    id: 4,
    name: "The Royal Trio Glow Combo (Hero Kit)",
    category: "combo",
    badge: "Best Seller • Save 38%",
    rating: 5.0,
    reviewCount: 312,
    price: 899,
    mrp: 1447,
    image: "assets/images/products_showcase.jpg",
    shortDesc: "Complete 3-in-1 Ayurvedic Skincare System. Includes Face Wash Powder (100g) + Magic Rose Water (100ml) + Magic Activator (50ml) + Luxury Wooden Spoon.",
    ingredients: "Complete blend of all 3 authentic formulations packaged together in a festive, royal gift box.",
    howToUse: "Follow the 3-step ritual daily morning and night for unmatched clarity, tone, and timeless herbal radiance.",
    benefits: ["Complete all-in-one daily regimen", "Synergistic botanical results", "Best value manufacturer price", "Free shipping across India included"]
  },
  {
    id: 5,
    name: "Face Wash Powder (Duo Value Pack)",
    category: "cleanser",
    badge: "Value Pack",
    rating: 4.9,
    reviewCount: 74,
    price: 649,
    mrp: 998,
    image: "assets/images/face_wash_powder.jpg",
    shortDesc: "Set of 2 Glass Jars of Herbal Face Wash Powder (100g x 2). Ideal for uninterrupted daily cleansing rituals with maximum savings.",
    ingredients: "Pure Multani Mitti, Sandalwood, Neem, Rose Petal Powder, Wild Turmeric.",
    howToUse: "Use twice daily. Blend with rose water or raw milk according to skin type.",
    benefits: ["Great family savings pack", "Up to 3-4 months of daily herbal care", "Airtight glass jars preserve potency"]
  },
  {
    id: 6,
    name: "Magic Rose Water (Twin Floral Mist)",
    category: "floral",
    badge: "Twin Pack",
    rating: 4.9,
    reviewCount: 65,
    price: 499,
    mrp: 798,
    image: "assets/images/rose_water.jpg",
    shortDesc: "Twin pack of Steam Distilled Rose Water (100ml x 2). Keep one at your home vanity and one in your travel purse.",
    ingredients: "100% Steam-distilled Damask Rose floral water.",
    howToUse: "Mist on face anytime during the day or use as herbal toner.",
    benefits: ["Double hydration", "Calms skin redness & heat", "100% chemical-free formula"]
  }
];

// Default Settings
const DEFAULT_SETTINGS = {
  adminPin: "1234",
  whatsappNumber: "919876543210",
  contactPhone: "+91 98765 43210",
  contactEmail: "contact@vrindaearthnaturals.com",
  freeShippingThreshold: 599,
  standardShippingFee: 60,
  deliveryDaysText: "3-5 Business Days across India",
  announcementText: "100% Pure Organic Ayurvedic Formulations • Handcrafted in Small Batches",
  heroBadge: "Royal Ayurvedic Skincare",
  heroTitle: "Experience the Power of <em>Pure, Authentic</em> Skincare",
  heroDesc: "Directly from the manufacturer to your vanity. Formulated with authentic botanical herbs, natural multani mitti, pure wild rose extracts, and active herbal catalysts for a healthy, timeless glow.",
  ownerName: "Shailja Shukla",
  ownerRole: "Owner & Master Formulator",
  directorName: "Ambesh Shukla",
  directorRole: "Management Director",
  founderQuote: "Our journey started with a simple belief: Skincare should heal, nourish, and respect your body. No synthetic foams, no empty fillers—just the untamed power of Mother Earth."
};

// 2. APPLICATION STATE
let PRODUCTS = [...DEFAULT_PRODUCTS];
let SITE_SETTINGS = { ...DEFAULT_SETTINGS };
let VALID_COUPONS = {
  "ROYAL10": { type: "percentage", value: 10, label: "10% Royal Discount" },
  "VRINDA15": { type: "percentage", value: 15, label: "15% Special Discount" },
  "WELCOME50": { type: "flat", value: 50, label: "₹50 Flat Welcome Bonus" }
};

let cart = [];
let appliedCoupon = null;
let selectedPaymentMethod = "COD";
let currentFilter = "all";

// 3. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  loadStoreData();
  applyDynamicSiteSettings();
  renderProducts("all");
  loadCartFromStorage();
  updateCartUI();
  setupEventListeners();

  // Listen for Admin live updates across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "vrinda_products" || e.key === "vrinda_settings" || e.key === "vrinda_coupons") {
      loadStoreData();
      applyDynamicSiteSettings();
      renderProducts(currentFilter);
      updateCartUI();
    }
  });
});

function loadStoreData() {
  try {
    const rawProds = localStorage.getItem("vrinda_products");
    if (rawProds) {
      PRODUCTS = JSON.parse(rawProds);
    } else {
      PRODUCTS = [...DEFAULT_PRODUCTS];
      localStorage.setItem("vrinda_products", JSON.stringify(PRODUCTS));
    }
  } catch (e) {
    PRODUCTS = [...DEFAULT_PRODUCTS];
  }

  try {
    const rawSettings = localStorage.getItem("vrinda_settings");
    if (rawSettings) {
      SITE_SETTINGS = { ...DEFAULT_SETTINGS, ...JSON.parse(rawSettings) };
    } else {
      SITE_SETTINGS = { ...DEFAULT_SETTINGS };
      localStorage.setItem("vrinda_settings", JSON.stringify(SITE_SETTINGS));
    }
  } catch (e) {
    SITE_SETTINGS = { ...DEFAULT_SETTINGS };
  }

  try {
    const rawCoupons = localStorage.getItem("vrinda_coupons");
    if (rawCoupons) {
      VALID_COUPONS = JSON.parse(rawCoupons);
    }
  } catch (e) {
    // keep defaults
  }
}

function applyDynamicSiteSettings() {
  // Announcement text
  const annItem = document.querySelector(".announcement-item span");
  if (annItem && SITE_SETTINGS.announcementText) {
    annItem.textContent = SITE_SETTINGS.announcementText;
  }

  // Hero Section
  const heroBadge = document.querySelector(".hero-badge span");
  if (heroBadge && SITE_SETTINGS.heroBadge) {
    heroBadge.textContent = SITE_SETTINGS.heroBadge;
  }

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && SITE_SETTINGS.heroTitle) {
    heroTitle.innerHTML = SITE_SETTINGS.heroTitle;
  }

  const heroDesc = document.querySelector(".hero-description");
  if (heroDesc && SITE_SETTINGS.heroDesc) {
    heroDesc.textContent = SITE_SETTINGS.heroDesc;
  }

  // Contact Info & WhatsApp links
  const waLinks = document.querySelectorAll("a[href*='wa.me']");
  waLinks.forEach(link => {
    const originalHref = link.getAttribute("href");
    const textParam = originalHref.includes("text=") ? originalHref.split("text=")[1] : "";
    link.href = `https://wa.me/${SITE_SETTINGS.whatsappNumber}${textParam ? '?text=' + textParam : ''}`;
  });

  // Announcement WhatsApp Display
  const annWa = document.querySelector(".announcement-content .fa-whatsapp")?.parentElement;
  if (annWa) {
    annWa.innerHTML = `<i class="fa-brands fa-whatsapp"></i> <span>Direct WhatsApp Ordering: <strong>+${SITE_SETTINGS.whatsappNumber}</strong></span>`;
  }

  // Leadership section
  const ownerNameEl = document.querySelector(".leader-card:nth-child(1) .leader-name");
  const ownerRoleEl = document.querySelector(".leader-card:nth-child(1) .leader-role");
  if (ownerNameEl && SITE_SETTINGS.ownerName) ownerNameEl.textContent = SITE_SETTINGS.ownerName;
  if (ownerRoleEl && SITE_SETTINGS.ownerRole) ownerRoleEl.textContent = SITE_SETTINGS.ownerRole;

  const dirNameEl = document.querySelector(".leader-card:nth-child(2) .leader-name");
  const dirRoleEl = document.querySelector(".leader-card:nth-child(2) .leader-role");
  if (dirNameEl && SITE_SETTINGS.directorName) dirNameEl.textContent = SITE_SETTINGS.directorName;
  if (dirRoleEl && SITE_SETTINGS.directorRole) dirRoleEl.textContent = SITE_SETTINGS.directorRole;

  const quoteEl = document.querySelector(".founders-quote");
  if (quoteEl && SITE_SETTINGS.founderQuote) {
    quoteEl.textContent = `"${SITE_SETTINGS.founderQuote}"`;
  }
}

// 4. SETUP EVENT LISTENERS
function setupEventListeners() {
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const navCloseBtn = document.getElementById("navCloseBtn");

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => mainNav.classList.add("open"));
  }
  if (navCloseBtn && mainNav) {
    navCloseBtn.addEventListener("click", () => mainNav.classList.remove("open"));
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav?.classList.remove("open");
    });
  });

  // Filter tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      currentFilter = filter;
      renderProducts(filter);
    });
  });

  // Cart Drawer triggers
  const cartTrigger = document.getElementById("cartTriggerBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartCloseBtn = document.getElementById("cartCloseBtn");

  cartTrigger?.addEventListener("click", openCartDrawer);
  cartOverlay?.addEventListener("click", closeCartDrawer);
  cartCloseBtn?.addEventListener("click", closeCartDrawer);

  // Close modals on Escape or outside click
  const checkoutModal = document.getElementById("checkoutModal");
  checkoutModal?.addEventListener("click", (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  const quickViewModal = document.getElementById("quickViewModal");
  quickViewModal?.addEventListener("click", (e) => {
    if (e.target === quickViewModal) closeQuickViewModal();
  });
}

// 5. RENDER PRODUCTS GRID
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = filter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
        No products found in this category.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const isCombo = prod.category === "combo" || prod.id === 4;
    const discountPct = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);
    const ingredientsArr = typeof prod.ingredients === 'string' ? prod.ingredients.split(',') : (prod.ingredients || []);

    return `
      <article class="product-card" id="prod-${prod.id}">
        ${prod.badge ? `<span class="product-badge-flag ${isCombo ? 'bestseller' : ''}">${prod.badge}</span>` : ''}
        
        <div class="product-image-wrap" onclick="openQuickView(${prod.id})">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='assets/images/logo.png'">
          <button class="quick-view-overlay-btn" type="button" onclick="event.stopPropagation(); openQuickView(${prod.id})">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
        </div>

        <div class="product-body">
          <div class="product-rating">
            <span class="stars">
              ${generateStarsHTML(prod.rating || 4.9)}
            </span>
            <span class="count">(${prod.reviewCount || 100} reviews)</span>
          </div>

          <h3 class="product-card-title">${prod.name}</h3>
          <p class="product-short-desc">${prod.shortDesc || ''}</p>

          <div class="product-key-ingredients">
            ${ingredientsArr.slice(0, 3).map(i => `<span class="ingredient-pill">${i.trim()}</span>`).join('')}
          </div>

          <div class="product-pricing-wrap">
            <span class="current-price">₹${prod.price}</span>
            <span class="original-mrp">₹${prod.mrp}</span>
            <span class="discount-badge">${discountPct}% OFF</span>
          </div>

          <div class="product-card-actions">
            <button class="btn-card-cart" onclick="addToCart(${prod.id})">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
            <button class="btn-card-whatsapp" onclick="directWhatsAppOrder(${prod.id})" title="Order directly on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function generateStarsHTML(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fa-solid fa-star"></i>';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      stars += '<i class="fa-regular fa-star"></i>';
    }
  }
  return stars;
}

// 6. CART MANAGEMENT
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${product.name}" to your shopping bag!`);
  openCartDrawer();
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToStorage();
    updateCartUI();
  }
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
  if (item) {
    showToast(`Removed "${item.name}" from shopping bag.`);
  }
}

function getCartCalculations() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;

  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === "flat") {
      discount = appliedCoupon.value;
    }
  }

  const freeThreshold = SITE_SETTINGS.freeShippingThreshold || 599;
  const standardFee = SITE_SETTINGS.standardShippingFee || 60;
  const shipping = (subtotal === 0 || subtotal >= freeThreshold) ? 0 : standardFee;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, grandTotal };
}

function updateCartUI() {
  const badge = document.getElementById("cartCountBadge");
  const drawerCount = document.getElementById("cartDrawerCount");
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const discountLine = document.getElementById("discountLine");
  const shippingEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");
  const shippingProgressText = document.getElementById("shippingProgressText");
  const shippingProgressFill = document.getElementById("shippingProgressFill");
  const cartFooter = document.getElementById("cartFooter");

  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
  if (badge) badge.textContent = totalQty;
  if (drawerCount) drawerCount.textContent = `(${totalQty} ${totalQty === 1 ? 'item' : 'items'})`;

  const { subtotal, discount, shipping, grandTotal } = getCartCalculations();
  const freeThreshold = SITE_SETTINGS.freeShippingThreshold || 599;

  // Shipping Progress
  if (subtotal >= freeThreshold) {
    if (shippingProgressText) shippingProgressText.innerHTML = `🎉 <strong>Congratulations!</strong> You get FREE Shipping!`;
    if (shippingProgressFill) shippingProgressFill.style.width = `100%`;
  } else {
    const diff = freeThreshold - subtotal;
    const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
    if (shippingProgressText) shippingProgressText.innerHTML = `Add ₹${diff} more for <strong>FREE Shipping</strong>!`;
    if (shippingProgressFill) shippingProgressFill.style.width = `${pct}%`;
  }

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-leaf"></i>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Discover our pure Ayurvedic skincare essentials to experience true natural beauty.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); window.location.href='#products'">
          Explore Essentials
        </button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = "none";
  } else {
    if (cartFooter) cartFooter.style.display = "block";
    container.innerHTML = cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/logo.png'">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;

  if (discount > 0) {
    if (discountLine) discountLine.style.display = "flex";
    if (discountEl) discountEl.textContent = `-₹${discount}`;
  } else {
    if (discountLine) discountLine.style.display = "none";
  }
}

// 7. COUPON APPLICATION
function applyCoupon() {
  const input = document.getElementById("couponInput");
  const msg = document.getElementById("couponMsg");
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msg.textContent = "Please enter a valid coupon code.";
    msg.className = "coupon-msg error";
    return;
  }

  if (VALID_COUPONS[code]) {
    appliedCoupon = VALID_COUPONS[code];
    msg.textContent = `Applied! ${appliedCoupon.label}`;
    msg.className = "coupon-msg success";
    showToast(`Coupon ${code} applied successfully!`);
    updateCartUI();
  } else {
    msg.textContent = "Invalid coupon code. Try 'ROYAL10'";
    msg.className = "coupon-msg error";
  }
}

// 8. DRAWER & MODAL CONTROLS
function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  drawer?.classList.add("open");
  overlay?.classList.add("open");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  drawer?.classList.remove("open");
  overlay?.classList.remove("open");
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const content = document.getElementById("quickViewContent");
  if (!modal || !content) return;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  content.innerHTML = `
    <div class="qv-image-box">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/logo.png'">
    </div>
    <div class="qv-details">
      <span class="qv-badge">${product.badge || '100% Ayurvedic'}</span>
      <h3 class="qv-title">${product.name}</h3>
      
      <div class="product-rating" style="margin-bottom: 0.75rem;">
        <span class="stars">${generateStarsHTML(product.rating || 4.9)}</span>
        <span class="count">(${product.reviewCount || 100} customer reviews)</span>
      </div>

      <div class="qv-price-row">
        <span class="qv-price">₹${product.price}</span>
        <span class="qv-mrp">₹${product.mrp}</span>
        <span class="discount-badge">${discount}% OFF</span>
      </div>

      <p class="qv-desc">${product.shortDesc || ''}</p>

      <div class="qv-ingredients-box">
        <strong><i class="fa-solid fa-leaf"></i> Pure Botanical Ingredients:</strong>
        <p>${product.ingredients || 'Natural herbs & extracts'}</p>
      </div>

      <div class="qv-ingredients-box" style="background:#F2F6F3; border: 1px solid #C8DEC9;">
        <strong><i class="fa-solid fa-sparkles text-success"></i> How to Mix & Use:</strong>
        <p>${product.howToUse || 'Apply as directed on container.'}</p>
      </div>

      <div class="qv-actions">
        <button class="btn btn-primary" onclick="addToCart(${product.id}); closeQuickViewModal();">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag
        </button>
        <button class="btn btn-whatsapp" onclick="directWhatsAppOrder(${product.id})">
          <i class="fa-brands fa-whatsapp"></i> Buy on WhatsApp
        </button>
      </div>
    </div>
  `;

  modal.showModal();
}

function closeQuickViewModal() {
  document.getElementById("quickViewModal")?.close();
}

// 9. CHECKOUT MODAL CONTROLS
function proceedToCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your shopping bag is empty!");
    return;
  }
  closeCartDrawer();
  renderCheckoutSummary();
  const modal = document.getElementById("checkoutModal");
  modal?.showModal();
}

function openOrderModal(productId) {
  addToCart(productId, 1);
  proceedToCheckoutModal();
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal")?.close();
}

function renderCheckoutSummary() {
  const listEl = document.getElementById("checkoutItemsList");
  const subtotalEl = document.getElementById("coSubtotal");
  const discountRow = document.getElementById("coDiscountRow");
  const discountEl = document.getElementById("coDiscount");
  const shippingEl = document.getElementById("coShipping");
  const totalEl = document.getElementById("coTotal");

  if (!listEl) return;

  const { subtotal, discount, shipping, grandTotal } = getCartCalculations();

  listEl.innerHTML = cart.map(item => `
    <div class="co-item">
      <span class="co-item-name">${item.name} × ${item.quantity}</span>
      <span class="co-item-price">₹${item.price * item.quantity}</span>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;

  if (discount > 0) {
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.textContent = `-₹${discount}`;
  } else {
    if (discountRow) discountRow.style.display = "none";
  }
}

function selectPaymentMethod(method, element) {
  selectedPaymentMethod = method;
  document.querySelectorAll(".payment-option").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");

  const upiBox = document.getElementById("upiBox");
  if (upiBox) {
    upiBox.style.display = method === "UPI" ? "block" : "none";
  }

  const btn = document.getElementById("btnPlaceOrder");
  if (btn) {
    if (method === "WHATSAPP") {
      btn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Send Order to WhatsApp Directly`;
      btn.className = "btn btn-whatsapp btn-large btn-block";
    } else {
      btn.innerHTML = `<i class="fa-solid fa-check-circle"></i> Confirm & Place Order (${method})`;
      btn.className = "btn btn-primary btn-large btn-block";
    }
  }
}

// 10. ORDER PLACEMENT HANDLER (Saves to Admin Orders!)
function handlePlaceOrder(event) {
  event.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail")?.value.trim() || "N/A";
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const state = document.getElementById("custState").value.trim();
  const pincode = document.getElementById("custPincode").value.trim();

  const { subtotal, discount, shipping, grandTotal } = getCartCalculations();
  const orderId = "VEN-" + Math.floor(100000 + Math.random() * 900000);

  const orderDetails = {
    orderId,
    name,
    phone,
    email,
    address: `${address}, ${city}, ${state} - ${pincode}`,
    items: [...cart],
    subtotal,
    discount,
    shipping,
    grandTotal,
    paymentMethod: selectedPaymentMethod,
    status: "Pending",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  // SAVE ORDER TO ADMIN ORDERS LOG
  try {
    const rawOrders = localStorage.getItem("vrinda_orders");
    const existingOrders = rawOrders ? JSON.parse(rawOrders) : [];
    existingOrders.unshift(orderDetails);
    localStorage.setItem("vrinda_orders", JSON.stringify(existingOrders));
  } catch (e) {
    console.error("Order save error", e);
  }

  // If user selected WhatsApp payment/order option:
  if (selectedPaymentMethod === "WHATSAPP") {
    sendOrderViaWhatsApp(orderDetails);
  }

  // Show Order Confirmation Screen
  showOrderSuccessScreen(orderDetails);

  // Clear cart
  cart = [];
  appliedCoupon = null;
  saveCartToStorage();
  updateCartUI();
  closeCheckoutModal();
}

function showOrderSuccessScreen(order) {
  const modal = document.getElementById("successModal");
  if (!modal) return;

  document.getElementById("successOrderId").textContent = order.orderId;
  document.getElementById("successCustName").textContent = order.name;
  document.getElementById("successTotal").textContent = `₹${order.grandTotal}`;
  document.getElementById("successPaymentType").textContent = 
    order.paymentMethod === 'COD' ? 'Cash On Delivery' : 
    order.paymentMethod === 'UPI' ? 'UPI Payment' : 'Direct WhatsApp Order';
  document.getElementById("successAddress").textContent = order.address;

  const btnShare = document.getElementById("btnShareWhatsApp");
  if (btnShare) {
    btnShare.onclick = () => sendOrderViaWhatsApp(order);
  }

  modal.showModal();
}

function closeSuccessModal() {
  document.getElementById("successModal")?.close();
}

// 11. DIRECT WHATSAPP ORDERING UTILITIES
function directWhatsAppOrder(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const text = `🌿 *NEW ORDER INQUIRY - VRINDA EARTH NATURALS* 🌿%0A%0A` +
    `Hello ${SITE_SETTINGS.ownerName || 'Shailja Shukla'} Ji / ${SITE_SETTINGS.directorName || 'Ambesh Shukla'} Ji,%0A` +
    `I want to order the following product directly from the manufacturer:%0A%0A` +
    `*Product:* ${product.name}%0A` +
    `*Quantity:* 1%0A` +
    `*Price:* ₹${product.price} (MRP: ₹${product.mrp})%0A%0A` +
    `Please share details on how to send my delivery address and payment!`;

  const waNum = SITE_SETTINGS.whatsappNumber || "919876543210";
  window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
}

function checkoutViaWhatsAppDirect() {
  if (cart.length === 0) {
    showToast("Please add items to your cart first.");
    return;
  }

  const { subtotal, discount, shipping, grandTotal } = getCartCalculations();
  let itemsListText = "";
  cart.forEach((item, index) => {
    itemsListText += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}%0A`;
  });

  const text = `🌿 *ORDER FROM VRINDA EARTH NATURALS WEBSITE* 🌿%0A%0A` +
    `Hello ${SITE_SETTINGS.ownerName || 'Shailja'} Ji / ${SITE_SETTINGS.directorName || 'Ambesh'} Ji,%0A` +
    `I would like to place an order for the following items:%0A%0A` +
    itemsListText + `%0A` +
    `*Subtotal:* ₹${subtotal}%0A` +
    (discount > 0 ? `*Discount Applied:* -₹${discount}%0A` : '') +
    `*Delivery:* ${shipping === 0 ? 'FREE' : '₹' + shipping}%0A` +
    `*Total Payable:* ₹${grandTotal}%0A%0A` +
    `Kindly confirm my order and courier tracking!`;

  const waNum = SITE_SETTINGS.whatsappNumber || "919876543210";
  window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
}

function sendOrderViaWhatsApp(order) {
  let itemsSummary = "";
  order.items.forEach((item, idx) => {
    itemsSummary += `${idx + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}%0A`;
  });

  const text = `🌿 *CONFIRMED ORDER: ${order.orderId}* 🌿%0A%0A` +
    `*Customer Name:* ${order.name}%0A` +
    `*Phone:* ${order.phone}%0A` +
    `*Delivery Address:* ${order.address}%0A%0A` +
    `*Ordered Items:*%0A${itemsSummary}%0A` +
    `*Total Amount:* ₹${order.grandTotal}%0A` +
    `*Payment Mode:* ${order.paymentMethod}%0A%0A` +
    `Please process my order at the earliest. Thank you!`;

  const waNum = SITE_SETTINGS.whatsappNumber || "919876543210";
  window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
}

// 12. TOAST NOTIFICATIONS
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// 13. LOCAL STORAGE PERSISTENCE FOR CART
function saveCartToStorage() {
  try {
    localStorage.setItem("vrinda_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Storage save failed", e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("vrinda_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
}
