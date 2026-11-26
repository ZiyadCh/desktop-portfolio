#!/usr/bin/env python3
"""Rebuild the portfolio's PNG icons from the Tabler Icons PNG library.

Source:  https://tabler.io/icons  (MIT License, (c) Tabler Icons contributors)
Package: https://www.npmjs.com/package/@tabler/icons-png
Pinned:  @tabler/icons-png@3.53.0

The library ships black outlines on transparent backgrounds. Each source is
tinted to the palette below and downscaled to 96px, so a 48 CSS-pixel icon
still renders sharply on a HiDPI screen.

Usage:  python3 icons/build-icons.py
"""

from io import BytesIO
from pathlib import Path
from urllib.request import urlopen

from PIL import Image

VERSION = "3.53.0"
BASE = f"https://cdn.jsdelivr.net/npm/@tabler/icons-png@{VERSION}/icons/outline"
OUT = Path(__file__).resolve().parent
SIZE = 96

# Local file name -> (Tabler source name, tint colour)
ICONS = {
    "file-text": ("file-text", 0x4E8CFF),
    "folder": ("folder", 0xF0B429),
    "folder-code": ("folder-code", 0xF0B429),
    "folder-kanban": ("layout-kanban", 0x2EC4B6),
    "briefcase": ("briefcase", 0x4E8CFF),
    "graduation-cap": ("school", 0x9D7CF4),
    "layout": ("layout", 0xFF7AA2),
    "server": ("server", 0x7F9CF5),
    "workflow": ("hierarchy", 0xC792EA),
    "wrench": ("tools", 0xFF9F43),
    "atom": ("atom", 0x61DAFB),
    "triangle": ("triangle", 0xF0495C),
    "braces": ("braces", 0xF7DF1E),
    "file-code": ("file-code", 0x3178C6),
    "coffee": ("coffee", 0xE76F00),
    "code": ("code", 0x777BB4),
    "flame": ("flame", 0xFF3C28),
    "database": ("database", 0x7B9FFF),
    "table": ("table", 0x4CC9F0),
    "target": ("target", 0xFF7A45),
    "pencil": ("pencil", 0xF24E1E),
    "repeat": ("repeat", 0x2F80ED),
    "columns": ("columns", 0x56CCF2),
    "clipboard-list": ("clipboard-list", 0x2684FF),
    "git-branch": ("git-branch", 0xF05033),
    "layers": ("stack", 0x2496ED),
    "terminal": ("terminal", 0xFCC624),
    "keyboard": ("keyboard", 0x019833),
    "building": ("building", 0x45B7D1),
    "home": ("home", 0x36B37E),
    "mail": ("mail", 0x7AA2F7),
    "play": ("player-play", 0x36B37E),
    "square-code": ("code", 0x22A0EE),
    "database-mysql": ("brand-mysql", 0x00A8B5),
    "github": ("brand-github", 0xE6EDF3),
    "linkedin": ("brand-linkedin", 0x0A66C2),
}


def download(name):
    url = f"{BASE}/{name}.png"
    with urlopen(url, timeout=30) as response:
        return Image.open(BytesIO(response.read())).convert("RGBA")


def tint(image, color):
    """Replace the black artwork with `color`, keeping the source alpha."""
    result = Image.new("RGBA", image.size, (color >> 16, (color >> 8) & 0xFF, color & 0xFF, 255))
    result.putalpha(image.getchannel("A"))
    return result


def main():
    for local, (source, color) in ICONS.items():
        image = tint(download(source), color)
        image = image.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        image.save(OUT / f"{local}.png", optimize=True)
        print(f"{local}.png <- {source}.png #{color:06X}")


if __name__ == "__main__":
    main()
