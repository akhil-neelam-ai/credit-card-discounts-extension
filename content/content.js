// Storage and data keys
const STORAGE_KEY = 'userCards';
const PANEL_ID = 'cc-discount-panel';

// Website mapping
const WEBSITE_MAP = {
  'amazon.in': { name: 'Amazon', key: 'Amazon' },
  'flipkart.com': { name: 'Flipkart', key: 'Flipkart' },
  'myntra.com': { name: 'Myntra', key: 'Myntra' },
  'ajio.com': { name: 'AJIO', key: 'AJIO' },
  'makemytrip.com': { name: 'MakeMyTrip', key: 'MakeMyTrip' },
  'swiggy.com': { name: 'Swiggy', key: 'Swiggy' },
  'zomato.com': { name: 'Zomato', key: 'Zomato' },
  'bigbasket.com': { name: 'BigBasket', key: 'BigBasket' },
  'bookmyshow.com': { name: 'BookMyShow', key: 'BookMyShow' },
  'cleartrip.com': { name: 'Cleartrip', key: 'Cleartrip' }
};

// Initialize content script
console.log('Credit Card Discounts: Content script loaded');

// Check if we're on a supported website
const currentWebsite = getCurrentWebsite();
if (currentWebsite) {
  console.log('Credit Card Discounts: Supported website detected:', currentWebsite.name);
  initializeDiscountPanel();
}

/**
 * Get current website info
 */
function getCurrentWebsite() {
  const hostname = window.location.hostname;
  for (const [domain, info] of Object.entries(WEBSITE_MAP)) {
    if (hostname.includes(domain)) {
      return info;
    }
  }
  return null;
}

/**
 * Initialize discount panel
 */
async function initializeDiscountPanel() {
  // Check if panel already exists
  if (document.getElementById(PANEL_ID)) {
    console.log('Credit Card Discounts: Panel already exists');
    return;
  }

  try {
    // Get user cards
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const userCards = result[STORAGE_KEY] || [];

    // Only show panel if user has cards
    if (userCards.length === 0) {
      console.log('Credit Card Discounts: No cards added, panel not shown');
      return;
    }

    // Get matching discounts
    const discounts = await getMatchingDiscounts(userCards);

    if (discounts.length === 0) {
      console.log('Credit Card Discounts: No matching discounts found');
      return;
    }

    // Create and inject panel
    createDiscountPanel(discounts);

    // Auto-expand after 1 second
    setTimeout(() => {
      const panel = document.getElementById(PANEL_ID);
      if (panel && panel.classList.contains('collapsed')) {
        panel.classList.remove('collapsed');
      }
    }, 1000);

  } catch (error) {
    console.error('Credit Card Discounts: Error initializing panel:', error);
  }
}

/**
 * Get matching discounts for user's cards and current website
 */
async function getMatchingDiscounts(userCards) {
  try {
    // Load discounts data
    const response = await fetch(chrome.runtime.getURL('data/discounts.json'));
    const allDiscounts = await response.json();

    const currentWebsite = getCurrentWebsite();
    if (!currentWebsite) return [];

    // Get user's banks
    const userBanks = [...new Set(userCards.map(card => card.bank))];

    // Filter discounts
    const now = new Date();
    const matchingDiscounts = allDiscounts.filter(discount => {
      // Check if discount matches user's bank
      if (!userBanks.includes(discount.bank)) return false;

      // Check if discount is for current website
      if (discount.website !== currentWebsite.key) return false;

      // Check if discount is still valid
      const validUntil = new Date(discount.validUntil);
      if (validUntil < now) return false;

      return true;
    });

    console.log('Credit Card Discounts: Found matching discounts:', matchingDiscounts.length);
    return matchingDiscounts;

  } catch (error) {
    console.error('Credit Card Discounts: Error loading discounts:', error);
    return [];
  }
}

/**
 * Create discount panel HTML
 */
function createDiscountPanel(discounts) {
  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.className = 'collapsed';

  panel.innerHTML = `
    <div class="cc-panel-header">
      <div class="cc-panel-title">
        <span>💳</span>
        <span>Card Offers</span>
        <span class="cc-panel-count">${discounts.length}</span>
      </div>
      <button class="cc-toggle-btn" aria-label="Toggle panel">▼</button>
    </div>
    <div class="cc-panel-content">
      ${discounts.length > 0 ? renderDiscounts(discounts) : renderEmptyState()}
    </div>
  `;

  // Add event listener for toggle
  const header = panel.querySelector('.cc-panel-header');
  header.addEventListener('click', togglePanel);

  // Inject panel into page
  document.body.appendChild(panel);

  console.log('Credit Card Discounts: Panel created with', discounts.length, 'offers');
}

/**
 * Render discounts HTML
 */
function renderDiscounts(discounts) {
  return discounts.map(discount => `
    <div class="cc-offer-card">
      <div class="cc-offer-header">
        <div class="cc-offer-bank">
          <span class="cc-bank-badge">${discount.bank}</span>
          ${discount.cardTier ? `<span class="cc-meta-badge">${discount.cardTier}</span>` : ''}
        </div>
        <span class="cc-discount-badge">${discount.discount}</span>
      </div>
      <div class="cc-offer-details">${discount.details}</div>
      <div class="cc-offer-meta">
        <span class="cc-meta-badge">📍 ${discount.websiteName}</span>
        ${discount.category ? `<span class="cc-meta-badge">🏷️ ${discount.category}</span>` : ''}
        <span class="cc-meta-badge">📅 Valid until ${formatDate(discount.validUntil)}</span>
      </div>
      ${discount.terms ? `<div class="cc-offer-terms">T&C: ${discount.terms}</div>` : ''}
    </div>
  `).join('');
}

/**
 * Render empty state
 */
function renderEmptyState() {
  return `
    <div class="cc-empty-state">
      <div class="cc-empty-icon">🎉</div>
      <div class="cc-empty-title">No Offers Available</div>
      <div class="cc-empty-text">
        We couldn't find any matching offers for your cards on this website.
        Check back later or add more cards to see more offers!
      </div>
    </div>
  `;
}

/**
 * Toggle panel collapsed state
 */
function togglePanel() {
  const panel = document.getElementById(PANEL_ID);
  if (panel) {
    panel.classList.toggle('collapsed');
  }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Refresh discounts when user adds/removes cards
 */
async function refreshDiscounts() {
  console.log('Credit Card Discounts: Refreshing discounts');

  // Remove existing panel
  const existingPanel = document.getElementById(PANEL_ID);
  if (existingPanel) {
    existingPanel.remove();
  }

  // Reinitialize panel
  await initializeDiscountPanel();
}

/**
 * Listen for messages from popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Credit Card Discounts: Message received:', message);

  if (message.action === 'refreshDiscounts') {
    refreshDiscounts();
    sendResponse({ success: true });
  }

  return true; // Keep message channel open for async response
});
