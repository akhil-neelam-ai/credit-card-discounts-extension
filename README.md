# 💳 Credit Card Discounts Chrome Extension

A smart Chrome extension that automatically displays personalized credit card discounts and offers on Indian shopping websites based on the cards you own.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-orange)

## 🌟 Features

- **Automatic Discount Detection**: Shows relevant credit card offers on supported shopping websites
- **Personalized Offers**: Only displays discounts for cards you own
- **Beautiful Floating Panel**: Non-intrusive side panel with elegant gradient design
- **Privacy First**: No sensitive card data stored - only bank names and card types
- **Easy Card Management**: Simple popup interface to add/remove cards
- **Real-time Updates**: Panel refreshes automatically when you add or remove cards
- **10+ Supported Banks**: HDFC, SBI, ICICI, Axis, AMEX, and more
- **10+ Shopping Sites**: Amazon, Flipkart, MakeMyTrip, Swiggy, Zomato, and more

## 🛍️ Supported Websites

The extension works on the following Indian shopping and service websites:

- **E-Commerce**: Amazon India, Flipkart, Myntra, AJIO
- **Travel**: MakeMyTrip, Cleartrip
- **Food Delivery**: Swiggy, Zomato
- **Groceries**: BigBasket
- **Entertainment**: BookMyShow

## 🏦 Supported Banks

- HDFC Bank
- State Bank of India (SBI)
- ICICI Bank
- Axis Bank
- American Express (AMEX)

## 🚀 Installation

### For Users (Chrome Web Store)

*Coming soon! The extension will be available on the Chrome Web Store.*

### For Developers (Load Unpacked)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akhil-neelam-ai/credit-card-discounts-extension.git
   cd credit-card-discounts-extension
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right corner)

3. **Load the extension**:
   - Click "Load unpacked"
   - Select the `credit-card-discounts-extension` folder
   - The extension icon should appear in your toolbar

4. **Start using**:
   - Click the extension icon to open the popup
   - Add your credit cards
   - Visit any supported shopping website to see offers!

## 📖 Usage Guide

### Adding Your Cards

1. Click the extension icon in Chrome toolbar
2. Select your bank from the dropdown
3. Choose card type (Credit or Debit)
4. Click "Add Card"
5. Repeat for all your cards

### Viewing Offers

1. Visit any supported shopping website
2. The discount panel will automatically appear on the right side
3. Panel shows only offers matching your cards
4. Click the header to expand/collapse the panel

### Removing Cards

1. Click the extension icon
2. Find the card you want to remove
3. Click the "Remove" button next to it
4. The discount panel will refresh automatically

## 📁 Project Structure

```
credit-card-discounts-extension/
├── manifest.json              # Extension configuration (Manifest V3)
├── popup/                     # Extension popup interface
│   ├── popup.html            # Popup HTML structure
│   ├── popup.css             # Popup styling
│   └── popup.js              # Popup logic
├── content/                   # Content scripts injected into websites
│   ├── content.js            # Discount panel logic
│   └── content.css           # Discount panel styling
├── background/                # Background service worker
│   └── background.js         # Background tasks and storage
├── data/                      # Discount database
│   └── discounts.json        # Sample discount offers
├── assets/                    # Static assets
│   └── icons/                # Extension icons
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── README.md                  # This file
└── .gitignore                # Git ignore rules
```

## 🔧 Technical Details

### Technologies Used

- **Manifest V3**: Latest Chrome Extension API
- **Vanilla JavaScript**: ES6+ features
- **Chrome Storage API**: Local storage for user data
- **Chrome Messaging API**: Communication between components
- **Modern CSS**: Gradients, flexbox, animations

### Key Components

1. **Popup Interface** (`popup/`):
   - Card management interface
   - Uses Chrome Storage API to persist data
   - Communicates with content scripts via messaging

2. **Content Script** (`content/`):
   - Injected into supported shopping websites
   - Creates floating discount panel
   - Filters and displays relevant offers
   - Auto-expands after 1 second

3. **Background Service Worker** (`background/`):
   - Handles extension lifecycle events
   - Initializes storage on installation
   - Sets up periodic alarms for future updates

4. **Discounts Database** (`data/discounts.json`):
   - JSON file with discount offers
   - Includes bank, website, discount details
   - Filterable by multiple criteria

### Storage Schema

```javascript
{
  "userCards": [
    { "bank": "HDFC", "cardType": "Credit" },
    { "bank": "SBI", "cardType": "Debit" }
  ]
}
```

### Discount Matching Logic

The extension matches discounts based on:
1. User's bank(s)
2. Current website
3. Valid date (not expired)

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Current)
- ✅ Basic card management
- ✅ Discount display on supported websites
- ✅ 10 sample offers
- ✅ 10 supported websites
- ✅ Beautiful UI with gradients

### 📋 Phase 2: Enhanced Features (Planned)
- 🔄 Real-time discount updates from server
- 🔄 More banks and websites
- 🔄 Browser notifications for new offers
- 🔄 Offer history and tracking
- 🔄 Search and filter capabilities
- 🔄 User preferences and settings

### 🚀 Phase 3: Advanced Features (Future)
- 🔮 AI-powered offer recommendations
- 🔮 Cashback tracking
- 🔮 Multi-device sync
- 🔮 Firefox and Edge support
- 🔮 Mobile app integration
- 🔮 Partnership with banks

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and structure
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed
- Keep commits focused and descriptive

### Ideas for Contributions

- Add more banks and discounts
- Support additional websites
- Improve UI/UX design
- Add new features from roadmap
- Fix bugs and improve performance
- Translate to regional languages

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 Credit Card Discounts Extension

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/akhil-neelam-ai/credit-card-discounts-extension/issues)
- **Email**: support@creditcarddiscounts.com
- **Website**: Coming soon!

## ⚠️ Disclaimer

This extension is for informational purposes only. Always verify offers directly with your bank or the merchant website. We are not responsible for:
- Expired or invalid offers
- Changes in terms and conditions
- Transaction failures or disputes
- Any financial losses

## 🙏 Acknowledgments

- Built with ❤️ for Indian shoppers
- Inspired by the need for better discount discovery
- Thanks to all contributors and users

---

**Happy Shopping! 🛒💰**

*Save more with every swipe!*
