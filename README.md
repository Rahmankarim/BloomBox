# BloomBox 🌸

A beautiful and interactive web application for creating and sharing personalized digital flower bouquets. Send heartfelt messages with stunning virtual flower arrangements for any occasion.

![BloomBox](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🌺 **6 Beautiful Flowers**: Choose from Purple Bloom, Plumeria, Sunflower, Orange Dahlia, Cosmos, and Zinnia
- 🎨 **Custom Arrangements**: Drag and drop flowers to create your perfect bouquet
- 💌 **Personalized Messages**: Add heartfelt notes with AI-powered suggestions for every occasion
- 🎉 **Multiple Occasions**: Birthday, Love, Anniversary, Thank You, Get Well, and more
- 🎭 **Beautiful Backgrounds**: Select from 5 elegant background themes
- 🔗 **Easy Sharing**: Generate shareable links to send your bouquet to anyone
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✨ **Smooth Animations**: Delightful animations including falling petals and bloom effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rahmankarim/BloomBox.git
cd BloomBox
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Playfair Display (serif) & Poppins (sans-serif)

## 📁 Project Structure

```
BloomBox/
├── app/                    # Next.js app directory
│   ├── bouquet/[data]/    # Dynamic bouquet view page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── bouquet/           # Bouquet-specific components
│   │   ├── builder.tsx    # Main bouquet builder
│   │   ├── bouquet-preview.tsx
│   │   ├── flower-picker.tsx
│   │   └── ...
│   └── ui/                # Reusable UI components
├── lib/
│   ├── bouquet-data.ts    # Flower data and configuration
│   └── utils.ts           # Utility functions
├── public/
│   └── flowers/           # Flower images (PNG format)
└── styles/                # Global styles
```

## 🎨 Customization

### Adding New Flowers

1. Add flower image (PNG with transparent background) to `public/flowers/`
2. Update the `FLOWERS` array in `lib/bouquet-data.ts`:

```typescript
{
  id: 'your-flower',
  name: 'Your Flower Name',
  emoji: '🌷',
  color: '#FF00FF',
  description: 'Flower description',
  image: '/flowers/your-flower.png',
}
```

### Customizing Occasions

Edit the `OCCASIONS` array in `lib/bouquet-data.ts` to add or modify occasions.

### Changing Backgrounds

Modify the `BACKGROUNDS` array in `lib/bouquet-data.ts` to customize background colors.

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy BloomBox is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahmankarim/BloomBox)

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rahman Karim**

- GitHub: [@Rahmankarim](https://github.com/Rahmankarim)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

## 💖 Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

*Crafted with love by Rahman Karim. Send flowers, spread joy.* 🌸
