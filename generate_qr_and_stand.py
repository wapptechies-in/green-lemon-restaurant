"""
Green Lemon Restaurant - High-Resolution QR Code & Table Stand Generator
Generates:
1. High-Resolution QR Code (PNG & SVG)
2. Print-Ready A5 & A4 Table-Stand PDFs with Branding
3. Browser-Printable HTML Table-Stand Template
"""

import os
import json
import qrcode
from qrcode.image.svg import SvgPathImage
from PIL import Image, ImageDraw, ImageFont

# ReportLab imports
from reportlab.lib.pagesizes import A4, A5
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, inch
from reportlab.pdfgen import canvas

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(BASE_DIR, 'public', 'qr')
CONFIG_PATH = os.path.join(BASE_DIR, 'restaurant.config.json')

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Read config for target URL & restaurant info
target_url = "https://greenlemonrestaurant.netlify.app"
rest_name = "Green Lemon Restaurant"
rest_phone = "+91 96333 38944"
rest_address = "KTC Nagar, Pavoorchatram, Tenkasi, Tamil Nadu - 627808"

if os.path.exists(CONFIG_PATH):
    try:
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            cfg = json.load(f)
            target_url = cfg.get('websiteUrl', target_url)
            rest_name = cfg.get('name', rest_name)
            rest_phone = cfg.get('phone', rest_phone)
            rest_address = cfg.get('address', rest_address)
    except Exception as e:
        print("Config read notice:", e)

def generate_qr_codes(url):
    print(f"Generating QR Codes pointing to: {url}")
    
    # 1. High-res PNG (1200x1200px)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # 30% error correction for robust camera scan
        box_size=20,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Styling colors: Dark Forest Green (#0D351F)
    qr_img = qr.make_image(fill_color="#0D351F", back_color="#FFFFFF").convert('RGB')
    
    # Optional center badge: Lemon emoji or icon
    w, h = qr_img.size
    logo_size = int(w * 0.2)
    logo_bg = Image.new('RGBA', (logo_size, logo_size), (255, 255, 255, 255))
    draw = ImageDraw.Draw(logo_bg)
    draw.rounded_rectangle([2, 2, logo_size-2, logo_size-2], radius=16, fill="#FFFFFF", outline="#EAB308", width=4)
    
    # Paste logo in center
    pos = ((w - logo_size) // 2, (h - logo_size) // 2)
    qr_img.paste(logo_bg, pos)

    png_path = os.path.join(OUT_DIR, 'green_lemon_qr.png')
    qr_img.save(png_path, quality=95)
    print(f"✓ Saved High-Res PNG QR Code: {png_path} ({qr_img.size[0]}x{qr_img.size[1]}px)")

    # 2. Vector SVG QR
    svg_factory = SvgPathImage
    svg_qr = qrcode.make(url, image_factory=svg_factory, box_size=20, border=2)
    svg_path = os.path.join(OUT_DIR, 'green_lemon_qr.svg')
    svg_qr.save(svg_path)
    print(f"✓ Saved Vector SVG QR Code: {svg_path}")

    return png_path, svg_path

def generate_pdf_table_stand(page_size, filename, label):
    pdf_path = os.path.join(OUT_DIR, filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=page_size,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=15*mm,
        bottomMargin=15*mm
    )

    qr_png = os.path.join(OUT_DIR, 'green_lemon_qr.png')

    styles = getSampleStyleSheet()
    
    # Custom Brand Palette
    green_c = colors.HexColor('#0D351F')
    lemon_c = colors.HexColor('#D97706')
    dark_c = colors.HexColor('#111827')
    muted_c = colors.HexColor('#4B5563')

    # Brand Title Style
    title_style = ParagraphStyle(
        'BrandTitle',
        fontName='Helvetica-Bold',
        fontSize=24 if page_size == A4 else 18,
        leading=28 if page_size == A4 else 22,
        alignment=1, # Center
        textColor=green_c,
        spaceAfter=4*mm
    )

    sub_style = ParagraphStyle(
        'BrandSub',
        fontName='Helvetica-Bold',
        fontSize=11 if page_size == A4 else 9,
        leading=14 if page_size == A4 else 11,
        alignment=1,
        textColor=lemon_c,
        spaceAfter=6*mm
    )

    callout_style = ParagraphStyle(
        'Callout',
        fontName='Helvetica-Bold',
        fontSize=16 if page_size == A4 else 13,
        leading=20 if page_size == A4 else 16,
        alignment=1,
        textColor=dark_c,
        spaceAfter=4*mm
    )

    desc_style = ParagraphStyle(
        'Desc',
        fontName='Helvetica',
        fontSize=10 if page_size == A4 else 8.5,
        leading=13 if page_size == A4 else 11,
        alignment=1,
        textColor=muted_c,
        spaceAfter=8*mm
    )

    footer_style = ParagraphStyle(
        'Footer',
        fontName='Helvetica',
        fontSize=9 if page_size == A4 else 7.5,
        leading=12 if page_size == A4 else 10,
        alignment=1,
        textColor=muted_c,
        spaceBefore=6*mm
    )

    story = []

    # Lemon Badge / Header
    story.append(Paragraph("🍋 GREEN LEMON RESTAURANT 🍋", title_style))
    story.append(Paragraph("AUTHENTIC ARABIAN • KERALA DELICACIES • CHARCOAL GRILLS", sub_style))
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph("SCAN TO VIEW OUR DIGITAL MENU", callout_style))
    story.append(Paragraph("Open your phone camera & point at the QR code below<br/>No app install or login required", desc_style))

    # QR Code Image
    qr_display_size = 110*mm if page_size == A4 else 78*mm
    story.append(RLImage(qr_png, width=qr_display_size, height=qr_display_size))
    story.append(Spacer(1, 4*mm))

    # Features list
    features_style = ParagraphStyle(
        'Features',
        fontName='Helvetica-Bold',
        fontSize=10 if page_size == A4 else 8,
        leading=13 if page_size == A4 else 10,
        alignment=1,
        textColor=green_c
    )
    story.append(Paragraph("✓ Live Dish Photos & Prices &nbsp;•&nbsp; ✓ Table Tray Builder &nbsp;•&nbsp; ✓ Guest Feedback", features_style))
    story.append(Spacer(1, 4*mm))

    # Table Stand Info box
    info_text = f"<b>Branch:</b> Pavoorchatram, Tenkasi &nbsp;•&nbsp; <b>Orders / Service:</b> {rest_phone}<br/>{rest_address}<br/>{target_url}"
    story.append(Paragraph(info_text, footer_style))

    doc.build(story)
    print(f"✓ Generated Print-Ready {label} Table-Stand PDF: {pdf_path}")

def generate_html_table_stand():
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Green Lemon Restaurant - Printable Table Stand</title>
  <style>
    @page {{
      size: A5 portrait;
      margin: 10mm;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }}
    body {{
      background: #f0f3f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }}
    .stand-card {{
      background: #ffffff;
      width: 148mm;
      min-height: 210mm;
      padding: 16mm 14mm;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      border: 3px solid #0D351F;
      position: relative;
    }}
    .stand-header {{
      margin-bottom: 8px;
    }}
    .brand-icon {{
      font-size: 32px;
      margin-bottom: 6px;
    }}
    .brand-title {{
      font-size: 22px;
      font-weight: 800;
      color: #0D351F;
      letter-spacing: 1px;
    }}
    .brand-sub {{
      font-size: 10px;
      font-weight: 700;
      color: #D97706;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }}
    .cta-banner {{
      background: #0D351F;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: 30px;
      margin: 12px 0 8px;
    }}
    .cta-title {{
      font-size: 14px;
      font-weight: 800;
      color: #F4BE18;
      letter-spacing: 0.5px;
    }}
    .cta-hint {{
      font-size: 9.5px;
      color: #ffffff;
      opacity: 0.9;
    }}
    .qr-container {{
      background: #ffffff;
      padding: 10px;
      border-radius: 16px;
      border: 2px solid #E5EAE5;
      box-shadow: 0 4px 14px rgba(13,53,31,0.08);
      margin: 10px 0;
    }}
    .qr-container img {{
      width: 78mm;
      height: 78mm;
      display: block;
    }}
    .features-pill {{
      font-size: 9px;
      font-weight: 700;
      color: #0D351F;
      background: #F1F4F1;
      padding: 5px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
    }}
    .stand-footer {{
      border-top: 1px dashed #D1D5DB;
      padding-top: 8px;
      width: 100%;
      font-size: 8.5px;
      color: #4B5563;
      line-height: 1.4;
    }}
    .print-bar {{
      position: fixed;
      top: 15px;
      right: 15px;
      background: #0D351F;
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }}
    @media print {{
      body {{
        background: transparent;
        padding: 0;
      }}
      .print-bar {{
        display: none;
      }}
      .stand-card {{
        box-shadow: none;
        width: 100%;
        height: 100%;
        border-radius: 0;
        page-break-inside: avoid;
      }}
    }}
  </style>
</head>
<body>

  <button class="print-bar" onclick="window.print()">🖨️ Print Table Stand (Ctrl + P)</button>

  <div class="stand-card">
    <div class="stand-header">
      <div class="brand-icon">🍋</div>
      <h1 class="brand-title">{rest_name.upper()}</h1>
      <div class="brand-sub">Authentic Arabian • Charcoal Grills • Kerala Specials</div>
    </div>

    <div class="cta-banner">
      <div class="cta-title">SCAN TO VIEW OUR MENU</div>
      <div class="cta-hint">Point your phone camera here • No app needed</div>
    </div>

    <div class="qr-container">
      <img src="green_lemon_qr.png" alt="Scan QR Code for Menu">
    </div>

    <div class="features-pill">
      ✨ 232 Delicious Dishes &nbsp;•&nbsp; 📸 Live Photos &nbsp;•&nbsp; 🛍️ Table Order Builder
    </div>

    <div class="stand-footer">
      <strong>Branch:</strong> Pavoorchatram, Tenkasi &nbsp;•&nbsp; <strong>Service & Orders:</strong> {rest_phone}<br/>
      {rest_address}<br/>
      <span style="color: #9CA3AF; font-size: 7.5px;">{target_url}</span>
    </div>
  </div>

</body>
</html>
"""
    html_path = os.path.join(OUT_DIR, 'table_stand.html')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"✓ Saved Browser-Printable HTML Table-Stand: {html_path}")

def main():
    print("=" * 60)
    print("Green Lemon Restaurant - QR Code & Table Stand Generator")
    print("=" * 60)
    
    png_p, svg_p = generate_qr_codes(target_url)
    
    try:
        generate_pdf_table_stand(A5, 'green_lemon_table_stand_a5.pdf', 'A5 (Table Acrylic Stand)')
        generate_pdf_table_stand(A4, 'green_lemon_table_stand_a4.pdf', 'A4 (Wall / Entrance Poster)')
    except Exception as e:
        print("ReportLab PDF generation notice:", e)

    generate_html_table_stand()

    print("=" * 60)
    print("STEP 5 COMPLETE: High-res QR codes & Printable PDF/HTML stands are ready!")
    print("=" * 60)

if __name__ == '__main__':
    main()
