# 🍋 Green Lemon Restaurant - Digital Menu Website & QR System

A fast, mobile-friendly digital menu website and table QR-code ordering system built specifically for **Green Lemon Restaurant**.

---

## 📁 Project Structure

```text
web page/
├── data/
│   ├── menu.xlsx                  # Your original Excel menu file
│   └── images/                    # All 211 original high-resolution dish photos
├── public/                        # The complete website (Ready to deploy)
│   ├── index.html                 # Main website page
│   ├── styles.css                 # Fresh green & lemon-yellow theme
│   ├── app.js                     # Menu rendering, search, tray & feedback logic
│   ├── restaurant.config.js       # Single config file (Name, Phone, Address, Colors)
│   ├── menu.json                  # Clean JSON menu data (232 dishes)
│   ├── menu_data.js               # JavaScript menu data (Works offline / file://)
│   ├── images/                    # 211 compressed & resized WebP dish photos (max 800px)
│   ├── video/
│   │   └── intro.mp4              # Restaurant ambience video
│   └── qr/                        # High-resolution QR codes & Table-Stand PDFs
│       ├── green_lemon_qr.png     # High-resolution PNG QR code (Verified scan)
│       ├── green_lemon_qr.svg     # Vector SVG QR code
│       ├── green_lemon_table_stand_a5.pdf   # Print-ready A5 table acrylic stand PDF
│       ├── green_lemon_table_stand_a4.pdf   # Print-ready A4 poster PDF
│       └── table_stand.html       # Browser-printable table stand (Ctrl + P)
├── restaurant.config.json         # Master config file in root
├── process_menu.py                # Pipeline script to read Excel & optimize images
├── update_menu.py                 # 1-command updater script
├── update-menu.bat                # 1-click Windows updater (Double-click to run)
├── start-local-preview.bat        # 1-click Windows preview server (Double-click to view)
├── generate_qr_and_stand.py       # QR code & printable PDF generator
└── package.json                   # Optional NPM scripts configuration
```

---

## 🚀 How to Preview the Website on Your Computer

1. Simply **double-click** `start-local-preview.bat`.
2. Your web browser will automatically open: **`http://localhost:8080`**.
3. You can test searching, browsing categories, adding dishes to your table tray, watching the video, and submitting guest feedback!

---

## 🔄 How to Update the Menu in 1 Step (When Prices or Dishes Change)

Whenever you edit `data/menu.xlsx` or add new dish photos in `data/images/`:

👉 Simply **double-click** `update-menu.bat` (or run `python update_menu.py`).

It will automatically:
- Read your new items and prices from Excel.
- Match any new photos by dish name.
- Automatically compress and resize photos to fast-loading WebP format.
- Update `menu.json` and refresh your website.

---

## 🌐 How to Put Your Menu Website Online (Free Public URL)

You can host this website 100% free with SSL (https://) using **Netlify Drop** (easiest for non-programmers with zero coding required):

### Step 1: Open Netlify Drop
1. Open your browser and go to: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. If you don't have an account, sign in with your email or Google account (it's completely free).

### Step 2: Drag and Drop the Folder
1. Open your Windows File Explorer and navigate to:  
   `E:\dish image list\web page\`
2. Grab the **`public`** folder and drag it directly onto the Netlify Drop page in your browser.
3. Within 5 seconds, Netlify will upload your website and give you an instant live URL (for example: `https://green-lemon-restaurant.netlify.app`).

### Step 3: (Optional) Set Your Custom Name or Domain
1. In your Netlify site settings, click **Change site name** and type `green-lemon-restaurant` (or any name you prefer).
2. Update your live URL in `restaurant.config.json` and run `python generate_qr_and_stand.py` to regenerate the QR code pointing to your new live link.

---

## 📱 High-Resolution QR Codes & Table Stands

All files are located in `public/qr/`:
- **`green_lemon_table_stand_a5.pdf`**: Print this on glossy paper or cardstock for standard A5 acrylic table stands.
- **`green_lemon_table_stand_a4.pdf`**: Print this for entrance display boards, counters, or posters.
- **`table_stand.html`**: Open this in Google Chrome or Microsoft Edge and press `Ctrl + P` to print directly to any printer.
- **`green_lemon_qr.png`**: High-resolution image of the QR code to use in brochures, social media, or menus.
