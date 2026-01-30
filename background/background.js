// Background service worker for Credit Card Discounts Extension

console.log('Credit Card Discounts: Background service worker started');

// Storage key
const STORAGE_KEY = 'userCards';

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Extension installed/updated:', details.reason);

  if (details.reason === 'install') {
    // Initialize storage with empty cards array
    await chrome.storage.local.set({ [STORAGE_KEY]: [] });
    console.log('Storage initialized with empty cards array');

    // Set up periodic alarm for future discount updates (every 24 hours)
    chrome.alarms.create('updateDiscounts', {
      periodInMinutes: 1440 // 24 hours
    });
    console.log('Periodic alarm set for discount updates');
  }
});

/**
 * Handle alarm events
 */
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('Alarm triggered:', alarm.name);

  if (alarm.name === 'updateDiscounts') {
    // Placeholder for future discount update functionality
    console.log('Discount update check triggered (not implemented yet)');
    // In Phase 2, this could fetch latest discounts from a server
  }
});

/**
 * Handle messages from content scripts or popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  // Handle different message types
  if (message.action === 'getDiscounts') {
    // Could be used to fetch discounts from server in future
    sendResponse({ success: true });
  }

  return true; // Keep message channel open for async response
});

/**
 * Log storage changes for debugging
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes[STORAGE_KEY]) {
    console.log('User cards updated:', changes[STORAGE_KEY].newValue);
  }
});

console.log('Credit Card Discounts: Background service worker ready');
