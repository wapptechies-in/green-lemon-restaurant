"""
Green Lemon Restaurant - Menu Data & Image Processing Pipeline
Reads Excel menu, matches images, compresses images to 800px WebP,
and generates menu.json & menu_data.js for instant mobile loading.
"""

import os
import re
import json
import openpyxl
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXCEL_PATH = os.path.join(BASE_DIR, 'data', 'menu.xlsx')
RAW_IMG_DIR = os.path.join(BASE_DIR, 'data', 'images')
OUT_IMG_DIR = os.path.join(BASE_DIR, 'public', 'images')
OUT_JSON_PATH = os.path.join(BASE_DIR, 'public', 'menu.json')
OUT_JS_PATH = os.path.join(BASE_DIR, 'public', 'menu_data.js')

os.makedirs(OUT_IMG_DIR, exist_ok=True)

def normalize(s):
    s = s.upper()
    s = re.sub(r'\[.*?\]', '', s)
    s = re.sub(r'\(.*?\)', '', s)
    s = re.sub(r'[^A-Z0-9]', '', s)
    return s

def clean_title(s):
    # Format to clean title case for presentation while keeping exact name in rawName
    s = re.sub(r'\s+', ' ', s).strip()
    words = s.split(' ')
    fixed = []
    corrections = {
        'BORNLESS': 'Boneless',
        'CHICHEN': 'Chicken',
        'KUZHIMAMDI': 'Kuzhimandi',
        'PINAPILE': 'Pineapple',
        'APPILE': 'Apple',
        'MUSK': 'Musk',
        'MILAN': 'Melon',
        'WATERMILON': 'Watermelon',
        'SHESWAN': 'Schezwan',
        'SCHESWAN': 'Schezwan',
        'THANDOOR': 'Tandoor',
        'ROTTY': 'Roti',
        'CHLLI': 'Chilli',
        'PERY': 'Peri',
        'PARI': 'Peri',
        'ICECREM': 'Ice Cream',
        'ICECREAM': 'Ice Cream',
        'SARBATH': 'Sharbat',
        'PEACE': 'Piece',
        'QTR': 'Quarter',
        'BDF': 'B.D.F',
    }
    for w in words:
        clean_w = re.sub(r'[^A-Za-z0-9]', '', w.upper())
        if clean_w in corrections:
            fixed.append(corrections[clean_w])
        else:
            fixed.append(w.capitalize())
    res = ' '.join(fixed)
    res = re.sub(r'\(\s*', '(', res)
    res = re.sub(r'\s*\)', ')', res)
    res = re.sub(r'\[\s*', '[', res)
    res = re.sub(r'\s*\]', ']', res)
    return res

# Curated categories
CATEGORIES = [
    {"id": "all", "name": "All Items", "icon": "🍽️", "tagline": "Full Restaurant Menu"},
    {"id": "mandi-biriyani", "name": "Mandi & Biriyani", "icon": "🍗", "tagline": "Authentic Arabian Kuzhimandi & Dum Biriyani"},
    {"id": "grills-tandoor", "name": "Charcoal Grills & Tandoor", "icon": "🔥", "tagline": "Smoky Alfaham, Juicy Shawai & Tandoor Kebabs"},
    {"id": "curries-gravies", "name": "Curries & Gravies", "icon": "🥘", "tagline": "Rich Chicken & Beef Gravies with Authentic Spices"},
    {"id": "veg-paneer", "name": "Vegetarian & Paneer", "icon": "🌱", "tagline": "Pure Veg Specialties, Paneer & Gobi Delights"},
    {"id": "breads-tiffin", "name": "Breads & Kothu", "icon": "🫓", "tagline": "Flaky Porotta, Fresh Naans, Rotis & Spicy Kothu"},
    {"id": "rice-noodles", "name": "Fried Rice & Noodles", "icon": "🍜", "tagline": "Wok-Tossed Fried Rice & Schezwan Noodles"},
    {"id": "starters-bites", "name": "Starters & Quick Bites", "icon": "🥟", "tagline": "Crispy Snacks, Popcorn, Rolls & Hot Momos"},
    {"id": "mojitos-coolers", "name": "Mojitos & Coolers", "icon": "🍸", "tagline": "Refreshing Muddled Mint Mojitos & Sparkling Chillers"},
    {"id": "sodas-limes", "name": "Fresh Limes & Sodas", "icon": "🍋", "tagline": "Zesty Kulukki, Lemon Sodas & Fruit Lime Juices"},
    {"id": "fruit-shakes", "name": "Fruit & Ice Cream Shakes", "icon": "🥤", "tagline": "Thick Shakes Blended with Real Fruits & Ice Cream"},
    {"id": "signature-shakes", "name": "Signature Shakes & Avil", "icon": "🥥", "tagline": "Famous Tender Coconut Specials & Malabar Avil Milk"},
    {"id": "desserts-lassi", "name": "Desserts, Falooda & Lassi", "icon": "🍨", "tagline": "Royal Faloodas, Sizzling Brownie & Sweet Lassi"}
]

ALIASES = {
    'MINTLIME': 'MINT LEMON SODA.png',
    'PEPPERLIME': 'PEPPER CHILLI LEMON SODA.png',
    'TENDERWITHSTRAWBERRYSPECIALMILKSHAKE': 'STRAWBERRY MILK SHAKE.png',
    'PINAPILELEMONSODA': 'LEMON SODA.png',
}

def determine_category_and_type(row_num, name):
    uname = name.upper()
    cat = "starters-bites"
    diet = "non-veg"
    spice = 1
    badge = ""

    # Diet detection
    if any(k in uname for k in ['VEG', 'PANEER', 'GOBI', 'MUSHROOM', 'FRENCH FRIES', 'SMILEY']):
        diet = "veg"
    elif 'EGG' in uname:
        diet = "egg"
    elif any(k in uname for k in ['CHICKEN', 'BEEF', 'FISH', 'CRAB', 'ALFAHAM', 'SHAWAI', 'MANDI', 'BIRIYANI']):
        diet = "non-veg"

    # Category classification based on row clusters & names
    if 4 <= row_num <= 15:
        cat = "breads-tiffin"
        if 'EGG' in uname:
            diet = 'egg'
        elif 'CHICKEN' in uname:
            diet = 'non-veg'
        else:
            diet = 'veg'
        if 'BUTTER NAAN' in uname or 'CHICKEN KOTHU' in uname:
            badge = "Bestseller"
    elif 16 <= row_num <= 29:
        cat = "curries-gravies"
        diet = "non-veg"
        if any(k in uname for k in ['65', 'ROAST', 'BUTTER', 'TIKKA MASALA']):
            badge = "Chef Special"
        if any(k in uname for k in ['CHILLI', 'PEPPER', 'KONDATTOM']):
            spice = 3
    elif 30 <= row_num <= 38:
        cat = "curries-gravies"
        diet = "non-veg"
        if 'B D F' in uname or 'BDF' in uname or 'FRY' in uname:
            badge = "Must Try"
        if any(k in uname for k in ['CHILLI', 'PEPPER', 'KONDATTOM']):
            spice = 3
    elif 39 <= row_num <= 44:
        cat = "veg-paneer"
        diet = "veg"
        if 'BUTTER' in uname or 'KADAI' in uname:
            badge = "Popular"
    elif 45 <= row_num <= 64:
        cat = "rice-noodles"
        if 'SCHESWAN' in uname or 'SHESWAN' in uname:
            spice = 2
            badge = "Popular"
        if 'VEG' in uname or 'PANEER' in uname:
            diet = "veg"
        elif 'EGG' in uname:
            diet = "egg"
        else:
            diet = "non-veg"
    elif (65 <= row_num <= 88):
        cat = "mandi-biriyani"
        if 'EGG' in uname:
            diet = 'egg'
        elif 'EMPY' in uname or 'EMPTY' in uname or 'KUSKA' in uname:
            diet = 'veg'
        else:
            diet = 'non-veg'
        if 'KUZHIMANDI' in uname or 'CHICKEN BIRIYANI' in uname:
            badge = "Bestseller"
    elif 89 <= row_num <= 109:
        cat = "grills-tandoor"
        diet = "non-veg"
        if 'ALFAHAM' in uname or 'SHAWAI' in uname:
            badge = "Signature"
        if 'PERI' in uname or 'KANTHARI' in uname:
            spice = 3
    elif 110 <= row_num <= 126 or 225 <= row_num <= 241:
        cat = "starters-bites"
        if any(k in uname for k in ['VEG', 'PANEER', 'FRENCH', 'SMILEY']):
            diet = "veg"
        else:
            diet = "non-veg"
        if 'LOLIPOP' in uname or 'POPCORN' in uname:
            badge = "Kids Favorite"
    elif 128 <= row_num <= 139:
        cat = "mojitos-coolers"
        diet = "veg"
        if 'BLUE' in uname or 'MINT' in uname:
            badge = "Refreshing"
    elif 140 <= row_num <= 154 or 218 <= row_num <= 224:
        cat = "sodas-limes"
        diet = "veg"
        if 'KULUKKI' in uname or 'PEPPER' in uname:
            badge = "Local Hit"
            spice = 2
    elif 155 <= row_num <= 178:
        cat = "fruit-shakes"
        diet = "veg"
        if 'SHARJAH' in uname or 'OREO' in uname or 'MANGO' in uname:
            badge = "Thick Shake"
    elif 179 <= row_num <= 202:
        cat = "signature-shakes"
        diet = "veg"
        if 'TENDER' in uname or 'AVIL' in uname:
            badge = "Specialty"
    elif 203 <= row_num <= 217 or 243 <= row_num <= 251:
        cat = "desserts-lassi"
        diet = "veg"
        if 'FALOODA' in uname or 'BROWNIE' in uname:
            badge = "Sweet Delight"

    return cat, diet, spice, badge

def generate_description(name, cat, diet):
    uname = name.upper()
    if 'KUZHIMANDI' in uname:
        return "Slow-cooked authentic Arabian rice infused with smoked aromatic spices, served with fresh tomato salsa & garlic mayo."
    if 'ALFAHAM' in uname:
        return "Tender chicken marinated in Arabian herbs and spices, slow-grilled over fiery charcoal for a distinct smoky flavor."
    if 'SHAWAI' in uname:
        return "Rotisserie-roasted spiced chicken, succulent and juicy inside with a crisp, golden-charred skin."
    if 'BIRIYANI' in uname:
        return "Fragrant kaima/jeerakasala rice dum-cooked with tender meat and caramelized onions in Malabar royal spices."
    if 'POROTTA' in uname:
        return "Traditional flaky multi-layered Kerala flatbread grilled golden on hot tawa."
    if 'NAAN' in uname:
        return "Clay-oven baked fluffy Indian bread glazed with butter, garlic, or baked plain."
    if 'KOTHU' in uname:
        return "Shredded layered porotta tossed on a roaring tawa with aromatic spices, egg, chicken, and rich gravy."
    if 'TIKKA' in uname:
        return "Boneless chunks marinated in tandoori yogurt spice blend, skewered and roasted to perfection in clay oven."
    if 'B D F' in uname or 'BDF' in uname:
        return "Crispy battered beef strips deep-fried with curry leaves and fiery green chilies."
    if 'CURRY' in uname or 'MASALA' in uname or 'KADAYI' in uname or 'ROAST' in uname:
        return "Simmered in a rich, slow-cooked onion-tomato gravy infused with freshly roasted spices and curry leaves."
    if 'MOMOS' in uname:
        return "Steamed Himalayan dumplings packed with savory seasoned filling, served with spicy red dipping chutney."
    if 'FRIES' in uname or 'POPCORN' in uname or 'NUGGETS' in uname or 'FINGER' in uname:
        return "Crispy golden fried bite-sized snack served hot with delicious house dips."
    if 'MOJITO' in uname:
        return "Icy bubbly cooler muddled with fresh mint leaves, zesty lemon wedges, and rich fruit syrups."
    if 'LIME' in uname or 'SODA' in uname or 'SARBATH' in uname:
        return "Zesty citrus cooler crafted with fresh squeezed lime, sugar, rock salt, and sparkling soda."
    if 'TENDER' in uname:
        return "Luxurious creamy shake blended with real sweet tender coconut pulp and rich chilled cream."
    if 'AVIL MILK' in uname:
        return "Traditional Malabar thirst quencher with roasted beaten rice flakes, fresh bananas, nuts, and chilled milk."
    if 'SHAKE' in uname:
        return "Thick and luscious shake blended with rich whole milk, premium ice cream, and real fruits."
    if 'FALOODA' in uname:
        return "Royal layered dessert with vermicelli, basil seeds, rich rose milk, dried fruits, and ice cream."
    if 'BROWNIE' in uname:
        return "Warm rich Belgian chocolate brownie paired with a scoop of velvety vanilla ice cream."
    if 'LASSI' in uname:
        return "Traditional churned thick sweet yogurt drink, chilled and refreshing."
    if 'FRIED RICE' in uname or 'NOODLES' in uname:
        return "Wok-tossed long-grain rice or noodles with crisp garden vegetables, egg, or meat in savory sauces."
    if 'PANEER' in uname or 'GOBI' in uname or 'MUSHROOM' in uname:
        return "Fresh cottage cheese or garden produce tossed in a luscious, aromatic spiced gravy or wok glaze."
    return "Prepared fresh to order using premium quality ingredients and authentic house recipe."

def main():
    print("=" * 60)
    print("Green Lemon Restaurant - Data & Image Processing")
    print("=" * 60)

    # 1. Load Excel
    if not os.path.exists(EXCEL_PATH):
        raise FileNotFoundError(f"Excel file not found at {EXCEL_PATH}")

    wb = openpyxl.load_workbook(EXCEL_PATH)
    sheet = wb.active
    print(f"Loaded sheet: '{sheet.title}' ({sheet.max_row} rows, {sheet.max_column} columns)")

    # 2. Extract items
    raw_items = []
    for r in range(2, sheet.max_row + 1):
        m = sheet.cell(r, 1).value
        p = sheet.cell(r, 2).value
        if m is not None and str(m).strip() != '' and str(m).strip() != 'MENU':
            raw_items.append({'row': r, 'name': str(m).strip(), 'price': p})

    print(f"Total valid dish entries found in Excel: {len(raw_items)}")

    # 3. Read raw images
    raw_images = [f for f in os.listdir(RAW_IMG_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    print(f"Total source dish images found: {len(raw_images)}")

    img_norm_map = {}
    for f in raw_images:
        base = os.path.splitext(f)[0]
        n = normalize(base)
        img_norm_map[n] = f

    # 4. Map dishes to images
    dishes_no_image = []
    dishes_no_price = []
    matched_image_sources = {}  # clean_filename -> raw_filename

    processed_dishes = []
    for item in raw_items:
        r = item['row']
        name = item['name']
        price = item['price']

        # Price check
        num_price = None
        try:
            num_price = int(float(str(price).strip()))
        except:
            dishes_no_price.append(name)
            num_price = 0

        # Image matching
        n = normalize(name)
        found_file = None
        if n in ALIASES and ALIASES[n] in raw_images:
            found_file = ALIASES[n]
        elif n in img_norm_map:
            found_file = img_norm_map[n]
        else:
            # substring matching
            for inorm, ifile in img_norm_map.items():
                if len(inorm) >= 5 and (inorm in n or n in inorm):
                    found_file = ifile
                    break

        if not found_file:
            dishes_no_image.append(name)
            # Default placeholder image
            clean_img_rel = "images/default_dish.webp"
        else:
            # generate safe filename
            safe_base = re.sub(r'[^a-z0-9]+', '-', os.path.splitext(found_file)[0].lower()).strip('-')
            clean_filename = f"{safe_base}.webp"
            clean_img_rel = f"images/{clean_filename}"
            matched_image_sources[clean_filename] = found_file

        cat_id, diet, spice, badge = determine_category_and_type(r, name)
        desc = generate_description(name, cat_id, diet)
        display_title = clean_title(name)

        processed_dishes.append({
            "id": f"dish-{r}",
            "row": r,
            "rawName": name,
            "name": display_title,
            "category": cat_id,
            "diet": diet,
            "price": num_price,
            "description": desc,
            "image": clean_img_rel,
            "spiceLevel": spice,
            "badge": badge,
            "isPopular": bool(badge)
        })

    # 5. Compress and resize images to WebP (max 800px width, 82% quality)
    print("\nResizing and compressing images to max 800px WebP...")
    converted_count = 0
    total_saved_bytes = 0

    for clean_name, raw_name in matched_image_sources.items():
        src_path = os.path.join(RAW_IMG_DIR, raw_name)
        dst_path = os.path.join(OUT_IMG_DIR, clean_name)

        orig_size = os.path.getsize(src_path)
        try:
            with Image.open(src_path) as img:
                # Convert RGBA / P to RGB if needed, or keep RGBA for webp
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGB')

                # Resize maintaining aspect ratio if width > 800
                w, h = img.size
                if w > 800:
                    new_h = int((800 / float(w)) * h)
                    img = img.resize((800, new_h), Image.Resampling.LANCZOS)

                img.save(dst_path, 'WEBP', quality=82, method=6)
                new_size = os.path.getsize(dst_path)
                total_saved_bytes += (orig_size - new_size)
                converted_count += 1
        except Exception as e:
            print(f"Error converting {raw_name}: {e}")

    # Generate a fallback default dish image
    default_img_dst = os.path.join(OUT_IMG_DIR, "default_dish.webp")
    if not os.path.exists(default_img_dst):
        sample_first = list(matched_image_sources.keys())[0]
        with Image.open(os.path.join(OUT_IMG_DIR, sample_first)) as s_img:
            s_img.save(default_img_dst, 'WEBP', quality=82)

    # 6. Save menu.json and menu_data.js
    menu_payload = {
        "restaurant": {
            "name": "Green Lemon Restaurant",
            "branch": "Pavoorchatram",
            "tagline": "Good Food • Good Mood • Great Memories",
            "currency": "₹",
            "currencyCode": "INR",
            "phone": "+91 96333 38944",
            "whatsapp": "+919633338944",
            "address": "KTC Nagar, Pavoorchatram, Tenkasi, Tamil Nadu - 627808",
            "hours": "11:30 AM - 11:30 PM (Mon - Sun)",
            "googleMapsUrl": "https://maps.google.com/?q=Green+Lemon+Restaurant+Pavoorchatram+Tenkasi",
            "heroVideo": "video/intro.mp4",
            "announcement": "🎉 Welcome to Green Lemon Restaurant, Pavoorchatram! Authentic Arabian Kuzhimandi, Grills & Coolers."
        },
        "categories": CATEGORIES,
        "items": processed_dishes
    }

    with open(OUT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(menu_payload, f, indent=2, ensure_ascii=False)

    with open(OUT_JS_PATH, 'w', encoding='utf-8') as f:
        f.write("window.MENU_DATA = " + json.dumps(menu_payload, indent=2, ensure_ascii=False) + ";\n")

    print("\n" + "=" * 60)
    print("SUMMARY OF STEP 1")
    print("=" * 60)
    print(f"✓ Total dishes in Excel: {len(processed_dishes)}")
    print(f"✓ Dishes with prices: {len(processed_dishes) - len(dishes_no_price)}")
    print(f"✓ Dishes with missing prices: {len(dishes_no_price)}")
    if dishes_no_price:
        for d in dishes_no_price:
            print(f"   - {d}")
    print(f"✓ Dishes with matching images: {len(processed_dishes) - len(dishes_no_image)}")
    print(f"✓ Dishes with missing images: {len(dishes_no_image)}")
    if dishes_no_image:
        for d in dishes_no_image:
            print(f"   - {d}")
    print(f"✓ Optimized WebP images generated: {converted_count}")
    print(f"✓ Total disk space saved: {total_saved_bytes / (1024*1024):.2f} MB")
    print(f"✓ Saved menu data to: {OUT_JSON_PATH} and {OUT_JS_PATH}")
    print("=" * 60)

if __name__ == '__main__':
    main()
