#!/usr/bin/env python3
"""Remove white backgrounds from flower images"""

import os
from PIL import Image
import numpy as np

# Get the path to the flowers directory
flowers_dir = os.path.join(os.path.dirname(__file__), 'public', 'flowers')

flowers = ['lavender', 'cherry-blossom', 'sunflower', 'rose', 'daisy', 'peony']

print(f"Removing backgrounds in: {flowers_dir}\n")

for flower in flowers:
    png_path = os.path.join(flowers_dir, f"{flower}.png")
    
    if os.path.exists(png_path):
        try:
            # Open the image
            img = Image.open(png_path).convert('RGBA')
            data = np.array(img)
            
            # Get RGB channels
            red, green, blue, alpha = data.T
            
            # Find white/light pixels (adjust threshold as needed)
            white_areas = (red > 240) & (green > 240) & (blue > 240)
            
            # Make white areas transparent
            data[..., 3][white_areas.T] = 0
            
            # Create new image
            img_no_bg = Image.fromarray(data)
            
            # Save
            img_no_bg.save(png_path, 'PNG', optimize=True)
            print(f"✓ Removed background: {flower}.png")
        except Exception as e:
            print(f"✗ Error processing {flower}: {e}")
    else:
        print(f"✗ Not found: {flower}.png")

print("\nBackground removal complete!")
