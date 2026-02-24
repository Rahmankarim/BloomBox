#!/usr/bin/env python3
"""Convert flower JPG images to PNG format"""

import os
from PIL import Image

# Get the path to the flowers directory
flowers_dir = os.path.join(os.path.dirname(__file__), 'public', 'flowers')

# List of flowers to convert
flowers = [
    'lavender',
    'cherry-blossom',
    'sunflower',
    'rose',
    'daisy',
    'peony'
]

print(f"Converting flowers in: {flowers_dir}\n")

for flower in flowers:
    jpg_path = os.path.join(flowers_dir, f"{flower}.jpg")
    png_path = os.path.join(flowers_dir, f"{flower}.png")
    
    if os.path.exists(jpg_path):
        try:
            # Open the JPG image
            img = Image.open(jpg_path)
            
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Save as PNG
            img.save(png_path, 'PNG', optimize=True)
            print(f"✓ Converted: {flower}.jpg → {flower}.png")
        except Exception as e:
            print(f"✗ Error converting {flower}: {e}")
    else:
        print(f"✗ Not found: {flower}.jpg")

print("\nConversion complete!")
