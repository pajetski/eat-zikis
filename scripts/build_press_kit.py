from pathlib import Path
from io import BytesIO
import shutil
import zipfile

from PIL import Image as PILImage
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads"
OUTPUT_PDF = OUTPUT_DIR / "ZIKIS_Brand_Guide.pdf"
PUBLIC_PDF = PUBLIC_DIR / "zikis-brand-guide.pdf"
PUBLIC_COPY = PUBLIC_DIR / "zikis-approved-copy.md"
PUBLIC_ZIP = PUBLIC_DIR / "zikis-press-kit.zip"

PAGE_W, PAGE_H = letter

INK = HexColor("#14130F")
CREAM = HexColor("#F4EDDC")
PAPER = HexColor("#FBF7ED")
BLUE = HexColor("#0D4596")
SKY = HexColor("#77A7D8")
OLIVE = HexColor("#66713B")
TOMATO = HexColor("#DC4B2C")
WHITE = HexColor("#FFFFFF")
MUTED = Color(20 / 255, 19 / 255, 15 / 255, alpha=0.64)


def paragraph(
    c: canvas.Canvas,
    text: str,
    x: float,
    y_top: float,
    width: float,
    size: float = 10,
    leading: float = 15,
    color=INK,
    font: str = "Helvetica",
    align=TA_LEFT,
):
    style = ParagraphStyle(
        "body",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=align,
        spaceAfter=0,
    )
    item = Paragraph(text, style)
    _, height = item.wrap(width, PAGE_H)
    item.drawOn(c, x, y_top - height)
    return height


def label(c: canvas.Canvas, text: str, x: float, y: float, color=BLUE):
    c.setFillColor(color)
    c.setFont("Courier-Bold", 7.5)
    c.drawString(x, y, text.upper())


def title(c: canvas.Canvas, text: str, x: float, y: float, size: float = 40, color=INK):
    c.setFillColor(color)
    c.setFont("Times-Roman", size)
    c.drawString(x, y, text)


def cover_crop(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float):
    with PILImage.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((720, 720), PILImage.Resampling.LANCZOS)
        iw, ih = image.size
        compressed = BytesIO()
        image.save(compressed, format="JPEG", quality=58, optimize=True)
        compressed.seek(0)
    scale = max(w / iw, h / ih)
    draw_w, draw_h = iw * scale, ih * scale
    draw_x = x + (w - draw_w) / 2
    draw_y = y + (h - draw_h) / 2
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, w, h)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(
        ImageReader(compressed),
        draw_x,
        draw_y,
        draw_w,
        draw_h,
        mask="auto",
    )
    c.restoreState()


def footer(c: canvas.Canvas, page_number: int, dark: bool = False):
    color = CREAM if dark else INK
    c.setStrokeColor(Color(color.red, color.green, color.blue, alpha=0.25))
    c.line(42, 36, PAGE_W - 42, 36)
    c.setFillColor(color)
    c.setFont("Courier", 6.8)
    c.drawString(42, 22, "ZIKI'S GREEK STREET EATS  /  PRESS KIT")
    page_text = f"{page_number:02d}"
    c.drawRightString(PAGE_W - 42, 22, page_text)


def page_one(c: canvas.Canvas):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.rect(PAGE_W * 0.64, 0, PAGE_W * 0.36, PAGE_H, fill=1, stroke=0)

    label(c, "Brand + Press Kit / 2026", 46, 735)
    c.setFillColor(INK)
    c.setFont("Times-Roman", 72)
    c.drawString(46, 610, "ZIKI'S")
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, 582, "G R E E K   S T R E E T   E A T S")
    c.setFillColor(INK)
    c.setFont("Times-Roman", 31)
    c.drawString(48, 510, "Greek food,")
    c.drawString(48, 475, "with sunshine.")
    paragraph(
        c,
        "Modern Greek street food with a sunny San Diego point of view.",
        50,
        430,
        260,
        size=11,
        leading=17,
        color=MUTED,
    )
    cover_crop(c, ROOT / "public" / "zikis-hero.jpg", 332, 150, 245, 420)
    c.setFillColor(TOMATO)
    c.circle(350, 154, 30, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Times-Roman", 26)
    c.drawCentredString(350, 145, "SD")
    footer(c, 1)
    c.showPage()


def page_two(c: canvas.Canvas):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(c, "01 / Brand Core", 46, 735)
    title(c, "Power food, made personal.", 46, 675, 38)

    c.setFillColor(CREAM)
    c.roundRect(46, 430, 208, 190, 4, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.circle(150, 560, 54, fill=1, stroke=0)
    cover_crop(c, ROOT / "public" / "alys-profile.jpg", 104, 514, 92, 92)
    c.setFillColor(INK)
    c.setFont("Times-Roman", 20)
    c.drawCentredString(150, 480, "Alyssa Gosselin")
    c.setFillColor(BLUE)
    c.setFont("Courier-Bold", 7)
    c.drawCentredString(150, 461, "FOUNDER")

    label(c, "Founder story", 286, 609)
    paragraph(
        c,
        "Ziki's was founded by Alyssa Gosselin, whose approach to food is grounded "
        "in movement, meal preparation, and ongoing dietary research. She creates "
        "fresh, nourishing power food with the discipline of an athlete and the "
        "warmth of a host. Her curated pop-ups bring that point of view to local "
        "businesses and gatherings throughout San Diego.",
        286,
        583,
        274,
        size=11,
        leading=17,
    )

    label(c, "Brand position", 46, 375)
    paragraph(
        c,
        "<b>Modern Greek street food with a sunny San Diego point of view.</b> "
        "Generous, fresh, confident, and polished - never fussy or overly traditional.",
        46,
        349,
        510,
        size=14,
        leading=21,
        font="Times-Roman",
    )

    facts = [
        ("SAN DIEGO", "Home base"),
        ("ORGANIC", "Ingredient standard"),
        ("NO SEED OILS", "Kitchen standard"),
        ("POP-UPS + EVENTS", "How Ziki's shows up"),
    ]
    for index, (value, descriptor) in enumerate(facts):
        column = index % 2
        row = index // 2
        x = 46 + column * 264
        rule_y = 185 - row * 68
        c.setStrokeColor(Color(20 / 255, 19 / 255, 15 / 255, alpha=0.18))
        c.line(x, rule_y, x + 230, rule_y)
        c.setFillColor(BLUE)
        c.setFont("Courier-Bold", 7.5)
        c.drawString(x, rule_y - 24, value)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.5)
        c.drawString(x, rule_y - 43, descriptor)

    footer(c, 2)
    c.showPage()


def page_three(c: canvas.Canvas):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(c, "02 / Visual Identity", 46, 735)
    title(c, "Sun-washed, bold, and generous.", 46, 675, 34)

    palette = [
        ("CHARCOAL", "#14130F", INK),
        ("WARM IVORY", "#F4EDDC", CREAM),
        ("PAPER", "#FBF7ED", PAPER),
        ("AEGEAN BLUE", "#0D4596", BLUE),
        ("COASTAL BLUE", "#77A7D8", SKY),
        ("OLIVE", "#66713B", OLIVE),
        ("TOMATO", "#DC4B2C", TOMATO),
    ]
    start_x, start_y = 46, 570
    swatch_w, swatch_h, gap = 68, 82, 6
    for index, (name, hex_value, color) in enumerate(palette):
        x = start_x + index * (swatch_w + gap)
        c.setFillColor(color)
        if hex_value == "#FBF7ED":
            c.setStrokeColor(Color(20 / 255, 19 / 255, 15 / 255, alpha=0.2))
            c.rect(x, start_y, swatch_w, swatch_h, fill=1, stroke=1)
        else:
            c.rect(x, start_y, swatch_w, swatch_h, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Courier-Bold", 6.2)
        c.drawString(x, start_y - 15, name)
        c.setFont("Courier", 6.2)
        c.drawString(x, start_y - 28, hex_value)

    label(c, "Typography", 46, 475)
    c.setFillColor(INK)
    c.setFont("Times-Roman", 34)
    c.drawString(46, 425, "Meet your new favorites.")
    c.setFont("Helvetica", 10)
    c.drawString(48, 392, "Geist / Helvetica - clear, warm, and contemporary.")
    c.setFont("Courier-Bold", 8)
    c.drawString(48, 365, "SAN DIEGO POP-UPS  /  ORGANIC INGREDIENTS  /  NO SEED OILS")

    c.setFillColor(INK)
    c.rect(46, 150, 188, 160, fill=1, stroke=0)
    cover_crop(c, ROOT / "public" / "zikis-logo.jpg", 88, 164, 104, 104)
    label(c, "Logo guidance", 266, 292)
    paragraph(
        c,
        "<b>Use the supplied white-on-black web lockup on quiet backgrounds.</b><br/><br/>"
        "Keep generous clear space. Do not stretch, outline, shadow, recolor, or "
        "place the logo over busy photography.<br/><br/>"
        "<font color='#DC4B2C'><b>Production note:</b></font> the current supplied "
        "logo is web resolution. A vector master is the next recommended brand asset.",
        266,
        268,
        292,
        size=9.5,
        leading=14,
    )
    footer(c, 3)
    c.showPage()


def page_four(c: canvas.Canvas):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(c, "03 / Voice + Messaging", 46, 735)
    title(c, "Warm. Direct. Lightly playful.", 46, 675, 36)
    paragraph(
        c,
        "Copy should be short, sensory, and confident. Lead with flavor and "
        "hospitality. Avoid wellness cliches, guilt-based language, or generic "
        "claims that are not backed by a concrete proof point.",
        46,
        630,
        510,
        size=11,
        leading=17,
    )

    approved = [
        "Greek food, with sunshine.",
        "Good food. Good mood. Kali orexi.",
        "A little Greece, close to home.",
        "Meet your new favorites.",
        "Power food, made personal.",
    ]
    y = 525
    for index, line in enumerate(approved, start=1):
        c.setFillColor(BLUE)
        c.setFont("Courier-Bold", 7)
        c.drawString(46, y - 7, f"0{index}")
        paragraph(
            c,
            line,
            82,
            y,
            245,
            size=17.5,
            leading=20,
            font="Times-Roman",
        )
        y -= 54

    c.setFillColor(BLUE)
    c.rect(350, 255, 206, 250, fill=1, stroke=0)
    label(c, "Approved short boilerplate", 370, 472, color=SKY)
    paragraph(
        c,
        "Ziki's Greek Street Eats brings fresh, generous Greek food to pop-ups, "
        "local businesses, and private gatherings throughout San Diego. Founded "
        "by Alyssa Gosselin, Ziki's pairs craveable classics with organic "
        "ingredients, a no-seed-oils standard, and warm, personal hospitality.",
        370,
        440,
        164,
        size=10,
        leading=16,
        color=WHITE,
    )
    footer(c, 4)
    c.showPage()


def page_five(c: canvas.Canvas):
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(c, "04 / Photography + Assets", 46, 735, color=SKY)
    title(c, "Food first. Sunlight always.", 46, 675, 36, color=CREAM)
    paragraph(
        c,
        "Favor late-afternoon natural light, warm stone or linen, cobalt ceramics, "
        "crisp produce, visible herbs, and lively texture. Food should look real, "
        "abundant, and freshly assembled.",
        46,
        632,
        510,
        size=10.5,
        leading=16,
        color=Color(244 / 255, 237 / 255, 220 / 255, alpha=0.72),
    )

    images = [
        ("CHICKEN GYRO", ROOT / "public" / "menu" / "chicken-gyro.jpg"),
        ("LAMB GYRO", ROOT / "public" / "menu" / "lamb-gyro.jpg"),
        ("TRIO OF DIPS", ROOT / "public" / "menu" / "trio-of-dips.jpg"),
    ]
    for index, (name, path) in enumerate(images):
        x = 46 + index * 174
        cover_crop(c, path, x, 330, 158, 220)
        c.setFillColor(SKY)
        c.setFont("Courier-Bold", 7)
        c.drawString(x, 311, name)

    paragraph(
        c,
        "<b>Placeholder disclosure:</b> the food images in this kit are AI-created "
        "placeholders for mockups and Ziki's-owned digital channels until original "
        "photography is supplied. Confirm replacement requirements before third-party "
        "editorial publication.",
        46,
        260,
        510,
        size=8.5,
        leading=13,
        color=Color(244 / 255, 237 / 255, 220 / 255, alpha=0.68),
    )

    c.setFillColor(BLUE)
    c.rect(46, 92, 510, 96, fill=1, stroke=0)
    label(c, "Press resources", 64, 160, color=SKY)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(64, 132, "eat-zikis.netlify.app/press-kit")
    c.setFont("Helvetica", 9)
    c.drawString(64, 111, "Instagram: @eatzikis  /  Founder: Alyssa Gosselin")
    footer(c, 5, dark=True)
    c.showPage()


def optimized_jpeg_bytes(path: Path, max_pixels: int = 720, quality: int = 48):
    with PILImage.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((max_pixels, max_pixels), PILImage.Resampling.LANCZOS)
        output = BytesIO()
        image.save(output, format="JPEG", quality=quality, optimize=True)
        return output.getvalue()


def build_download_package():
    approved_copy = ROOT / "press-kit" / "APPROVED_COPY.md"
    readme = ROOT / "press-kit" / "README.txt"
    shutil.copy2(approved_copy, PUBLIC_COPY)

    with zipfile.ZipFile(
        PUBLIC_ZIP, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9
    ) as archive:
        archive.write(OUTPUT_PDF, "ZIKIS_Brand_Guide.pdf")
        archive.write(approved_copy, "ZIKIS_Approved_Copy.md")
        archive.write(readme, "README.txt")
        archive.write(ROOT / "public" / "zikis-logo.jpg", "ZIKIS_Logo_Web.jpg")
        archive.write(
            ROOT / "public" / "alys-profile.jpg",
            "Alyssa_Gosselin_Founder_Web.jpg",
        )

        optimized_assets = [
            (
                ROOT / "public" / "og-v2.jpg",
                "ZIKIS_Social_Preview.jpg",
                900,
            ),
            (
                ROOT / "public" / "menu" / "chicken-gyro.jpg",
                "Chicken_Gyro_Placeholder.jpg",
                720,
            ),
            (
                ROOT / "public" / "menu" / "lamb-gyro.jpg",
                "Lamb_Gyro_Placeholder.jpg",
                720,
            ),
            (
                ROOT / "public" / "menu" / "trio-of-dips.jpg",
                "Trio_of_Dips_Placeholder.jpg",
                720,
            ),
        ]
        for source, archive_name, max_pixels in optimized_assets:
            archive.writestr(
                archive_name,
                optimized_jpeg_bytes(source, max_pixels=max_pixels),
            )


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT_PDF), pagesize=letter)
    c.setTitle("Ziki's Greek Street Eats - Brand and Press Kit")
    c.setAuthor("Ziki's Greek Street Eats")
    page_one(c)
    page_two(c)
    page_three(c)
    page_four(c)
    page_five(c)
    c.save()
    shutil.copy2(OUTPUT_PDF, PUBLIC_PDF)
    build_download_package()
    print(OUTPUT_PDF)
    print(PUBLIC_PDF)
    print(PUBLIC_ZIP)


if __name__ == "__main__":
    build_pdf()
