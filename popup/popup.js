// Storage keys
const STORAGE_KEY = 'userCards';

// DOM elements
let bankSelect, cardTypeSelect, addCardBtn, cardsList;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded');
  
  // Get DOM elements
  bankSelect = document.getElementById('bankSelect');
  cardTypeSelect = document.getElementById('cardTypeSelect');
  addCardBtn = document.getElementById('addCardBtn');
  cardsList = document.getElementById('cardsList');

  // Load and display cards
  await loadCards();

  // Event listeners
  addCardBtn.addEventListener('click', handleAddCard);
});

/**
 * Load cards from storage and display them
 */
async function loadCards() {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const cards = result[STORAGE_KEY] || [];
    
    console.log('Loaded cards:', cards);
    displayCards(cards);
  } catch (error) {
    console.error('Error loading cards:', error);
  }
}

/**
 * Display cards in the UI
 */
function displayCards(cards) {
  if (cards.length === 0) {
    cardsList.innerHTML = '<p class="empty-state">No cards added yet. Add a card to see personalized offers!</p>';
    return;
  }

  cardsList.innerHTML = cards.map((card, index) => `
    <div class="card-item">
      <div class="card-info">
        <span class="card-icon">💳</span>
        <div class="card-details">
          <span class="card-bank">${card.bank}</span>
          <span class="card-type">${card.cardType} Card</span>
        </div>
      </div>
      <button class="btn-remove" data-index="${index}">Remove</button>
    </div>
  `).join('');

  // Add event listeners to remove buttons
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', handleRemoveCard);
  });
}

/**
 * Handle adding a new card
 */
async function handleAddCard() {
  const bank = bankSelect.value;
  const cardType = cardTypeSelect.value;

  // Validation
  if (!bank || !cardType) {
    alert('Please select both bank and card type');
    return;
  }

  try {
    // Get existing cards
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const cards = result[STORAGE_KEY] || [];

    // Check for duplicates
    const isDuplicate = cards.some(card => 
      card.bank === bank && card.cardType === cardType
    );

    if (isDuplicate) {
      alert('This card is already added');
      return;
    }

    // Add new card
    cards.push({ bank, cardType });

    // Save to storage
    await chrome.storage.local.set({ [STORAGE_KEY]: cards });

    console.log('Card added:', { bank, cardType });

    // Reset form
    bankSelect.value = '';
    cardTypeSelect.value = '';

    // Reload cards
    await loadCards();

    // Notify content scripts to refresh discounts
    notifyContentScripts();

  } catch (error) {
    console.error('Error adding card:', error);
    alert('Failed to add card. Please try again.');
  }
}

/**
 * Handle removing a card
 */
async function handleRemoveCard(event) {
  const index = parseInt(event.target.dataset.index);

  try {
    // Get existing cards
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const cards = result[STORAGE_KEY] || [];

    // Remove card
    cards.splice(index, 1);

    // Save to storage
    await chrome.storage.local.set({ [STORAGE_KEY]: cards });

    console.log('Card removed at index:', index);

    // Reload cards
    await loadCards();

    // Notify content scripts to refresh discounts
    notifyContentScripts();

  } catch (error) {
    console.error('Error removing card:', error);
    alert('Failed to remove card. Please try again.');
  }
}

/**
 * Notify content scripts to refresh discounts
 */
function notifyContentScripts() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'refreshDiscounts' })
        .then(() => console.log('Refresh message sent to content script'))
        .catch(err => console.log('No content script to notify:', err));
    }
  });
}
