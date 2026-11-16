"""
One-command menu updater for Green Lemon Restaurant.
Run anytime you edit 'data/menu.xlsx' or add new images to 'data/images/'.
Command: python update_menu.py
Or simply double-click: update-menu.bat
"""

import os
import sys

# Call process_menu.py
base_dir = os.path.dirname(os.path.abspath(__file__))
process_script = os.path.join(base_dir, "process_menu.py")

print("==================================================")
print("  🍋 GREEN LEMON RESTAURANT - MENU UPDATE UTILITY")
print("==================================================")
print(f"Reading Excel: data/menu.xlsx")
print(f"Reading Images: data/images/")
print(f"Optimizing to WebP in: public/images/")
print(f"Generating: public/menu.json & public/menu_data.js")
print("--------------------------------------------------")

import subprocess
res = subprocess.run([sys.executable, process_script])
if res.returncode == 0:
    print("\n--------------------------------------------------")
    print("✅ SUCCESS! Menu and images have been updated.")
    print("Open public/index.html in your browser to view your menu.")
    print("==================================================")
else:
    print("\n❌ An error occurred during menu processing.")
    sys.exit(res.returncode)
