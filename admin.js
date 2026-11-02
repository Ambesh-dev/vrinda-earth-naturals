/**
 * VRINDA EARTH NATURALS - ADMIN DASHBOARD LOGIC
 * Manages Products, Prices, Images, MRP, Orders, and Website Content
 */

// Default Seed Products
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

// Global State
let adminProducts = [];
let adminSettings = {};
let adminOrders = [];
let adminCoupons = {};
let activeTab = "productsTab";

// 1. INITIALIZATION & AUTH
document.addEventListener("DOMContentLoaded", () => {
  loadAllAdminData();
  checkAuthSession();
  setupNavigationTabs();
  renderProductsTable();
  renderOrdersTable();
  populateSettingsForm();
  renderCouponsGrid();
  updateBadgeCounts();
});

function checkAuthSession() {
  const isUnlocked = sessionStorage.getItem("vrinda_admin_unlocked");
  const overlay = document.getElementById("adminAuthOverlay");
  if (isUnlocked === "true") {
    overlay?.classList.add("hidden");
  } else {
    overlay?.classList.remove("hidden");
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const input = document.getElementById("adminPinInput");
  const errorMsg = document.getElementById("authErrorMsg");
  const entered = input.value.trim();

  const correctPin = adminSettings.adminPin || "1234";

  if (entered === correctPin) {
    sessionStorage.setItem("vrinda_admin_unlocked", "true");
    document.getElementById("adminAuthOverlay")?.classList.add("hidden");
    showToast("Welcome to Vrinda Earth Naturals Admin!");
  } else {
    if (errorMsg) errorMsg.textContent = "Incorrect Passcode. Try: 1234";
    input.value = "";
    input.focus();
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem("vrinda_admin_unlocked");
  window.location.reload();
}

// 2. DATA STORAGE HELPERS
function loadAllAdminData() {
  // Products
  try {
    const rawProds = localStorage.getItem("vrinda_products");
    adminProducts = rawProds ? JSON.parse(rawProds) : [...DEFAULT_PRODUCTS];
  } catch (e) {
    adminProducts = [...DEFAULT_PRODUCTS];
  }

  // Settings
  try {
    const rawSettings = localStorage.getItem("vrinda_settings");
    adminSettings = rawSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(rawSettings) } : { ...DEFAULT_SETTINGS };
  } catch (e) {
    adminSettings = { ...DEFAULT_SETTINGS };
  }

  // Orders
  try {
    const rawOrders = localStorage.getItem("vrinda_orders");
    adminOrders = rawOrders ? JSON.parse(rawOrders) : [];
  } catch (e) {
    adminOrders = [];
  }

  // Coupons
  try {
    const rawCoupons = localStorage.getItem("vrinda_coupons");
    adminCoupons = rawCoupons ? JSON.parse(rawCoupons) : {
      "ROYAL10": { type: "percentage", value: 10, label: "10% Royal Discount" },
      "VRINDA15": { type: "percentage", value: 15, label: "15% Special Discount" },
      "WELCOME50": { type: "flat", value: 50, label: "₹50 Flat Welcome Bonus" }
    };
  } catch (e) {
    adminCoupons = {};
  }
}

function saveProductsToStorage() {
  localStorage.setItem("vrinda_products", JSON.stringify(adminProducts));
  updateBadgeCounts();
}

function saveSettingsToStorage() {
  localStorage.setItem("vrinda_settings", JSON.stringify(adminSettings));
}

function saveOrdersToStorage() {
  localStorage.setItem("vrinda_orders", JSON.stringify(adminOrders));
  updateBadgeCounts();
}

function saveCouponsToStorage() {
  localStorage.setItem("vrinda_coupons", JSON.stringify(adminCoupons));
}

function updateBadgeCounts() {
  const prodBadge = document.getElementById("sidebarProductCount");
  const orderBadge = document.getElementById("sidebarOrderCount");
  if (prodBadge) prodBadge.textContent = adminProducts.length;
  if (orderBadge) orderBadge.textContent = adminOrders.length;
}

// 3. TAB NAVIGATION
function setupNavigationTabs() {
  const navItems = document.querySelectorAll(".sidebar-menu .nav-item");
  const tabContents = document.querySelectorAll(".admin-tab-content");
  const titleEl = document.getElementById("currentTabTitle");

  const tabTitles = {
    productsTab: "Products & MRP Management",
    ordersTab: "Customer Orders & Invoices",
    settingsTab: "Website Content & Store Configuration",
    couponsTab: "Promotional Coupons & Discounts",
    backupTab: "Store Data Backup & System Reset"
  };

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-tab");
      navItems.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(tab => tab.classList.remove("active"));

      item.classList.add("active");
      document.getElementById(targetId)?.classList.add("active");
      activeTab = targetId;

      if (titleEl && tabTitles[targetId]) {
        titleEl.textContent = tabTitles[targetId];
      }
    });
  });
}

// 4. PRODUCTS MANAGEMENT
function renderProductsTable(filteredList = null) {
  const tbody = document.getElementById("productsTableBody");
  if (!tbody) return;

  const list = filteredList || adminProducts;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem; color: var(--admin-text-muted);">
          No products found. Click "Add New Product" to create one.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(prod => {
    const discount = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);
    return `
      <tr>
        <td>
          <img src="${prod.image}" alt="${prod.name}" class="table-thumb" onerror="this.src='assets/images/logo.png'">
        </td>
        <td>
          <span class="product-cell-name">${prod.name}</span>
          <span class="product-cell-sub">ID: #${prod.id} • Rating: ${prod.rating || '4.9'}★</span>
        </td>
        <td>
          <span style="text-transform: capitalize; font-weight: 500;">${prod.category}</span>
        </td>
        <td>
          <span class="price-tag">₹${prod.price}</span>
        </td>
        <td>
          <span class="mrp-tag">₹${prod.mrp}</span>
        </td>
        <td>
          <span class="discount-pill">${discount}% OFF</span>
        </td>
        <td>
          ${prod.badge ? `<span class="badge-tag-pill">${prod.badge}</span>` : '<span style="color:#aaa">-</span>'}
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-secondary btn-sm" onclick="openProductEditModal(${prod.id})" title="Edit Product">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${prod.id})" title="Delete Product">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleProductSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderProductsTable();
    return;
  }
  const filtered = adminProducts.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    p.ingredients.toLowerCase().includes(q)
  );
  renderProductsTable(filtered);
}

function filterProductsByCategory(cat) {
  if (cat === "all") {
    renderProductsTable();
  } else {
    const filtered = adminProducts.filter(p => p.category === cat);
    renderProductsTable(filtered);
  }
}

function openProductEditModal(productId = null) {
  const modal = document.getElementById("productEditModal");
  const title = document.getElementById("productModalTitle");
  const form = document.getElementById("productEditForm");

  if (!modal || !form) return;

  if (productId) {
    const prod = adminProducts.find(p => p.id === productId);
    if (!prod) return;

    title.textContent = `Edit Product: ${prod.name}`;
    document.getElementById("editProductId").value = prod.id;
    document.getElementById("editProdName").value = prod.name;
    document.getElementById("editProdCategory").value = prod.category;
    document.getElementById("editProdPrice").value = prod.price;
    document.getElementById("editProdMrp").value = prod.mrp;
    document.getElementById("editProdBadge").value = prod.badge || "";
    document.getElementById("editProdRating").value = prod.rating || 4.9;
    document.getElementById("editProdImage").value = prod.image;
    document.getElementById("editProdShortDesc").value = prod.shortDesc;
    document.getElementById("editProdIngredients").value = prod.ingredients;
    document.getElementById("editProdHowToUse").value = prod.howToUse;
    document.getElementById("editProdBenefits").value = Array.isArray(prod.benefits) ? prod.benefits.join(', ') : prod.benefits;

    updateImagePreview(prod.image);
    calculateDiscountPreview();
  } else {
    title.textContent = "Add New Product";
    form.reset();
    document.getElementById("editProductId").value = "";
    document.getElementById("editProdImage").value = "assets/images/face_wash_powder.jpg";
    updateImagePreview("assets/images/face_wash_powder.jpg");
    calculateDiscountPreview();
  }

  modal.showModal();
}

function closeProductEditModal() {
  document.getElementById("productEditModal")?.close();
}

function calculateDiscountPreview() {
  const price = parseFloat(document.getElementById("editProdPrice").value) || 0;
  const mrp = parseFloat(document.getElementById("editProdMrp").value) || 0;
  const preview = document.getElementById("discountCalcPreview");

  if (!preview) return;

  if (mrp > 0 && price > 0 && mrp >= price) {
    const discount = Math.round(((mrp - price) / mrp) * 100);
    preview.textContent = `${discount}% OFF (Save ₹${mrp - price})`;
  } else {
    preview.textContent = "0% OFF";
  }
}

function updateImagePreview(src) {
  const img = document.getElementById("imagePreviewTarget");
  if (img) img.src = src;
}

function setPresetImage(presetPath) {
  document.getElementById("editProdImage").value = presetPath;
  updateImagePreview(presetPath);
}

function handleLocalImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById("editProdImage").value = dataUrl;
    updateImagePreview(dataUrl);
    showToast("Image loaded from computer!");
  };
  reader.readAsDataURL(file);
}

function handleSaveProduct(event) {
  event.preventDefault();

  const idVal = document.getElementById("editProductId").value;
  const name = document.getElementById("editProdName").value.trim();
  const category = document.getElementById("editProdCategory").value;
  const price = parseFloat(document.getElementById("editProdPrice").value);
  const mrp = parseFloat(document.getElementById("editProdMrp").value);
  const badge = document.getElementById("editProdBadge").value.trim();
  const rating = parseFloat(document.getElementById("editProdRating").value) || 4.9;
  const image = document.getElementById("editProdImage").value.trim();
  const shortDesc = document.getElementById("editProdShortDesc").value.trim();
  const ingredients = document.getElementById("editProdIngredients").value.trim();
  const howToUse = document.getElementById("editProdHowToUse").value.trim();
  const benefitsText = document.getElementById("editProdBenefits").value.trim();

  const benefits = benefitsText ? benefitsText.split(/[\n,]+/).map(b => b.trim()).filter(Boolean) : [];

  if (idVal) {
    // Update existing
    const id = parseInt(idVal);
    const index = adminProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      adminProducts[index] = {
        ...adminProducts[index],
        name, category, price, mrp, badge, rating, image, shortDesc, ingredients, howToUse, benefits
      };
      showToast(`Updated product: "${name}"`);
    }
  } else {
    // Create new
    const newId = adminProducts.length > 0 ? Math.max(...adminProducts.map(p => p.id)) + 1 : 1;
    const newProd = {
      id: newId,
      name, category, price, mrp, badge, rating, image, shortDesc, ingredients, howToUse, benefits,
      reviewCount: 0
    };
    adminProducts.push(newProd);
    showToast(`Added new product: "${name}"`);
  }

  saveProductsToStorage();
  renderProductsTable();
  closeProductEditModal();
}

function deleteProduct(productId) {
  const prod = adminProducts.find(p => p.id === productId);
  if (!prod) return;

  if (confirm(`Are you sure you want to delete "${prod.name}" from the store catalog?`)) {
    adminProducts = adminProducts.filter(p => p.id !== productId);
    saveProductsToStorage();
    renderProductsTable();
    showToast(`Deleted "${prod.name}".`);
  }
}

// 5. CUSTOMER ORDERS MANAGEMENT
function renderOrdersTable(filteredOrders = null) {
  const tbody = document.getElementById("ordersTableBody");
  if (!tbody) return;

  const orders = filteredOrders || adminOrders;

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 3rem; color: var(--admin-text-muted);">
          No customer orders placed yet. Orders placed on the website will automatically appear here!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const itemsSummary = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
    const statusClass = `status-${(order.status || 'pending').toLowerCase()}`;
    return `
      <tr>
        <td><strong>${order.orderId}</strong></td>
        <td>${order.date || 'Today'}</td>
        <td>
          <strong>${order.name}</strong><br>
          <a href="tel:${order.phone}" style="color:var(--admin-primary); font-size:0.8rem;"><i class="fa-solid fa-phone"></i> ${order.phone}</a>
        </td>
        <td style="max-width: 200px; font-size:0.8rem;">
          ${order.address}
        </td>
        <td style="max-width: 220px; font-size:0.8rem;">
          ${itemsSummary}
        </td>
        <td>
          <strong style="color: var(--admin-gold); font-size: 1rem;">₹${order.grandTotal}</strong>
        </td>
        <td>
          <span style="font-size:0.775rem; font-weight:600;">${order.paymentMethod}</span>
        </td>
        <td>
          <select onchange="updateOrderStatus('${order.orderId}', this.value)" class="status-pill ${statusClass}">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-success btn-sm" onclick="chatCustomerWhatsApp('${order.phone}', '${order.name}', '${order.orderId}')" title="Message customer on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i> Chat
            </button>
            <button class="btn btn-secondary btn-sm" onclick="printOrderInvoice('${order.orderId}')" title="Print Invoice">
              <i class="fa-solid fa-print"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleOrderSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderOrdersTable();
    return;
  }
  const filtered = adminOrders.filter(o => 
    o.orderId.toLowerCase().includes(q) || 
    o.name.toLowerCase().includes(q) || 
    o.phone.toLowerCase().includes(q) || 
    o.address.toLowerCase().includes(q)
  );
  renderOrdersTable(filtered);
}

function updateOrderStatus(orderId, newStatus) {
  const order = adminOrders.find(o => o.orderId === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrdersToStorage();
  renderOrdersTable();
  showToast(`Order ${orderId} marked as ${newStatus}!`);
}

function chatCustomerWhatsApp(phone, name, orderId) {
  const cleanPhone = phone.replace(/\D/g, '');
  const target = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const msg = `Namaste ${name} ji! 🙏%0A%0A` +
    `This is regarding your Vrinda Earth Naturals order #${orderId}.%0A` +
    `We are packing your handcrafted Ayurvedic skincare products with utmost care.%0A` +
    `Please let us know if you have any questions or delivery instructions!`;

  window.open(`https://wa.me/${target}?text=${msg}`, '_blank');
}

function printOrderInvoice(orderId) {
  const order = adminOrders.find(o => o.orderId === orderId);
  if (!order) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice - ${order.orderId}</title>
        <style>
          body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #C69443; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; color: #2B1D15; margin: 0; }
          .meta { margin-top: 20px; display: flex; justify-content: space-between; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background: #FAF6F1; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">VRINDA EARTH NATURALS</h1>
          <p>100% Organic Luxury Ayurvedic Skincare • Manufacturer Direct</p>
          <p>Contact: ${adminSettings.contactPhone} | ${adminSettings.contactEmail}</p>
        </div>
        <div class="meta">
          <div>
            <strong>Invoice To:</strong><br>
            ${order.name}<br>
            ${order.address}<br>
            Phone: ${order.phone}
          </div>
          <div>
            <strong>Order ID:</strong> ${order.orderId}<br>
            <strong>Date:</strong> ${order.date || new Date().toLocaleDateString()}<br>
            <strong>Payment Mode:</strong> ${order.paymentMethod}
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Item Description</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${order.items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.price * i.quantity}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="total">
          Grand Total: ₹${order.grandTotal}
        </div>
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #777;">
          Thank you for choosing pure, authentic Ayurvedic skincare! Crafted by Shailja Shukla & Ambesh Shukla.
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}

function clearAllOrders() {
  if (confirm("Are you sure you want to clear all orders history?")) {
    adminOrders = [];
    saveOrdersToStorage();
    renderOrdersTable();
    showToast("Orders list cleared.");
  }
}

function exportOrdersCSV() {
  if (adminOrders.length === 0) {
    alert("No orders to export!");
    return;
  }
  let csv = "Order ID,Date,Customer Name,Phone,Address,Items,Total,Payment Mode,Status\n";
  adminOrders.forEach(o => {
    const items = o.items.map(i => `${i.name} (x${i.quantity})`).join('; ');
    csv += `"${o.orderId}","${o.date}","${o.name}","${o.phone}","${o.address.replace(/"/g, '""')}","${items}","₹${o.grandTotal}","${o.paymentMethod}","${o.status || 'Pending'}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Vrinda_Earth_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// 6. WEBSITE SETTINGS
function populateSettingsForm() {
  document.getElementById("setWhatsApp").value = adminSettings.whatsappNumber || "";
  document.getElementById("setPhone").value = adminSettings.contactPhone || "";
  document.getElementById("setEmail").value = adminSettings.contactEmail || "";
  document.getElementById("setFreeShip").value = adminSettings.freeShippingThreshold || 599;
  document.getElementById("setStandardShip").value = adminSettings.standardShippingFee || 60;
  document.getElementById("setDeliveryDays").value = adminSettings.deliveryDaysText || "";
  document.getElementById("setAnnouncement").value = adminSettings.announcementText || "";
  document.getElementById("setHeroBadge").value = adminSettings.heroBadge || "";
  document.getElementById("setHeroTitle").value = adminSettings.heroTitle || "";
  document.getElementById("setHeroDesc").value = adminSettings.heroDesc || "";
  document.getElementById("setOwnerName").value = adminSettings.ownerName || "";
  document.getElementById("setOwnerRole").value = adminSettings.ownerRole || "";
  document.getElementById("setDirectorName").value = adminSettings.directorName || "";
  document.getElementById("setDirectorRole").value = adminSettings.directorRole || "";
  document.getElementById("setFounderQuote").value = adminSettings.founderQuote || "";
  document.getElementById("setAdminPin").value = adminSettings.adminPin || "1234";
}

function handleSaveSettings(event) {
  event.preventDefault();

  adminSettings = {
    ...adminSettings,
    whatsappNumber: document.getElementById("setWhatsApp").value.trim(),
    contactPhone: document.getElementById("setPhone").value.trim(),
    contactEmail: document.getElementById("setEmail").value.trim(),
    freeShippingThreshold: parseFloat(document.getElementById("setFreeShip").value) || 599,
    standardShippingFee: parseFloat(document.getElementById("setStandardShip").value) || 60,
    deliveryDaysText: document.getElementById("setDeliveryDays").value.trim(),
    announcementText: document.getElementById("setAnnouncement").value.trim(),
    heroBadge: document.getElementById("setHeroBadge").value.trim(),
    heroTitle: document.getElementById("setHeroTitle").value.trim(),
    heroDesc: document.getElementById("setHeroDesc").value.trim(),
    ownerName: document.getElementById("setOwnerName").value.trim(),
    ownerRole: document.getElementById("setOwnerRole").value.trim(),
    directorName: document.getElementById("setDirectorName").value.trim(),
    directorRole: document.getElementById("setDirectorRole").value.trim(),
    founderQuote: document.getElementById("setFounderQuote").value.trim(),
    adminPin: document.getElementById("setAdminPin").value.trim() || "1234"
  };

  saveSettingsToStorage();
  showToast("Website content and settings saved successfully!");
}

// 7. COUPONS MANAGEMENT
function renderCouponsGrid() {
  const container = document.getElementById("couponsGrid");
  if (!container) return;

  const keys = Object.keys(adminCoupons);
  if (keys.length === 0) {
    container.innerHTML = `<p style="color:var(--admin-text-muted);">No coupon codes added yet.</p>`;
    return;
  }

  container.innerHTML = keys.map(code => {
    const c = adminCoupons[code];
    return `
      <div class="settings-card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--admin-primary);">${code}</span>
          <p style="font-size: 0.85rem; color: var(--admin-text-muted);">${c.label} (${c.type === 'percentage' ? c.value + '%' : '₹' + c.value} OFF)</p>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteCoupon('${code}')">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    `;
  }).join('');
}

function openAddCouponModal() {
  document.getElementById("couponModal")?.showModal();
}

function closeCouponModal() {
  document.getElementById("couponModal")?.close();
}

function handleSaveCoupon(event) {
  event.preventDefault();
  const code = document.getElementById("couponCode").value.trim().toUpperCase();
  const type = document.getElementById("couponType").value;
  const value = parseFloat(document.getElementById("couponValue").value);
  const label = document.getElementById("couponLabel").value.trim();

  adminCoupons[code] = { type, value, label };
  saveCouponsToStorage();
  renderCouponsGrid();
  closeCouponModal();
  showToast(`Added coupon code: "${code}"`);
}

function deleteCoupon(code) {
  if (confirm(`Delete coupon code "${code}"?`)) {
    delete adminCoupons[code];
    saveCouponsToStorage();
    renderCouponsGrid();
    showToast(`Deleted coupon: "${code}"`);
  }
}

// 8. BACKUP & RESTORE
function exportDataJSON() {
  const backup = {
    products: adminProducts,
    settings: adminSettings,
    orders: adminOrders,
    coupons: adminCoupons,
    exportedAt: new Date().toISOString()
  };

  const str = JSON.stringify(backup, null, 2);
  const blob = new Blob([str], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Vrinda_Earth_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Store backup JSON downloaded!");
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.products) adminProducts = data.products;
      if (data.settings) adminSettings = data.settings;
      if (data.orders) adminOrders = data.orders;
      if (data.coupons) adminCoupons = data.coupons;

      saveProductsToStorage();
      saveSettingsToStorage();
      saveOrdersToStorage();
      saveCouponsToStorage();

      renderProductsTable();
      renderOrdersTable();
      populateSettingsForm();
      renderCouponsGrid();
      updateBadgeCounts();

      showToast("Store data restored successfully from backup!");
    } catch (err) {
      alert("Invalid backup JSON file.");
    }
  };
  reader.readAsText(file);
}

function confirmResetDefaults() {
  if (confirm("Reset everything to original Vrinda Earth Naturals default sample data? All custom products and edits will be reset.")) {
    adminProducts = [...DEFAULT_PRODUCTS];
    adminSettings = { ...DEFAULT_SETTINGS };
    saveProductsToStorage();
    saveSettingsToStorage();
    renderProductsTable();
    populateSettingsForm();
    showToast("Store reset to factory default data!");
  }
}

function saveAllChangesLive() {
  saveProductsToStorage();
  saveSettingsToStorage();
  saveOrdersToStorage();
  saveCouponsToStorage();
  showToast("✓ All products, prices, and settings synchronized live!");
}

function showToast(msg) {
  const toast = document.getElementById("adminToast");
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
