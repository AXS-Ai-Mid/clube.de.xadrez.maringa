#!/usr/bin/env python3
"""
Gera as variantes responsivas (WebP + JPG) usadas pelo site.

Uso:
    python3 tools/otimizar-imagens.py ORIGINAL.jpg assets/img/gallery/nome-da-foto
    python3 tools/otimizar-imagens.py ORIGINAL.jpg assets/img/gallery/nome-da-foto --larguras 480 800 1200

Resultado (exemplo): assets/img/gallery/nome-da-foto-480.webp, -480.jpg,
-800.webp, -800.jpg, -1200.webp, -1200.jpg — exatamente o padrão esperado
por assets/js/data.js (campo "image" sem extensão + campo "widths").

Requisito: Python 3 com Pillow  →  pip install pillow
"""
import argparse
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:  # pragma: no cover
    sys.exit("Instale o Pillow primeiro:  pip install pillow")


def main():
    ap = argparse.ArgumentParser(description="Gera variantes WebP/JPG responsivas para o site.")
    ap.add_argument("origem", help="arquivo de imagem original (JPG/PNG/HEIC convertido etc.)")
    ap.add_argument("destino", help="caminho base SEM extensão, ex.: assets/img/gallery/minha-foto")
    ap.add_argument("--larguras", nargs="+", type=int, default=[480, 800, 1200], help="larguras a gerar (padrão: 480 800 1200)")
    ap.add_argument("--qualidade", type=int, default=80, help="qualidade WebP/JPG (padrão: 80)")
    args = ap.parse_args()

    img = ImageOps.exif_transpose(Image.open(args.origem)).convert("RGB")
    w0, h0 = img.size
    os.makedirs(os.path.dirname(args.destino) or ".", exist_ok=True)

    geradas = []
    for w in sorted(set(args.larguras)):
        if w > w0:
            print(f"  (pulando {w}px: a imagem original tem só {w0}px de largura)")
            continue
        h = round(h0 * w / w0)
        im = img.resize((w, h), Image.LANCZOS) if w != w0 else img
        im.save(f"{args.destino}-{w}.webp", quality=args.qualidade, method=6)
        im.save(f"{args.destino}-{w}.jpg", quality=args.qualidade, optimize=True, progressive=True)
        geradas.append(w)
        print(f"  ✔ {args.destino}-{w}.webp / .jpg")

    print("\nAgora, em assets/js/data.js, use:")
    print(f'  image: "{args.destino}", widths: {geradas}, width: {w0}, height: {h0}')


if __name__ == "__main__":
    main()
