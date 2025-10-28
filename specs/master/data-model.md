# Data Model: Social Meta Tags & Favicon Assets

**Feature**: Social Sharing Meta Tags & Favicon
**Created**: 2025-10-28

---

## Entity 1: HTML Meta Tags

### Page Title & Description

- **Title**: `Manda no WhatsApp com IA | webdev_` (35 chars)
- **Description**: `Receba mensagens, organize demandas e atualize status automaticamente pelo WhatsApp com IA. Sem complicação. Comece agora com webdev_.` (150 chars)

### Open Graph Tags (Facebook, WhatsApp, LinkedIn)

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="webdev_">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="Manda no WhatsApp com IA">
<meta property="og:description" content="Receba mensagens, organize demandas e atualize status automaticamente pelo WhatsApp com IA.">
<meta property="og:url" content="https://[domain]/">
<meta property="og:image" content="https://[domain]/assets/social-preview.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Manda no WhatsApp - Automação com IA">
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Manda no WhatsApp com IA">
<meta name="twitter:description" content="Receba mensagens, organize demandas e atualize status automaticamente pelo WhatsApp com IA.">
<meta name="twitter:image" content="https://[domain]/assets/social-preview.png">
<meta name="twitter:image:alt" content="Manda no WhatsApp - Automação com IA">
```

---

## Entity 2: Favicon Assets

### Required Files

| File | Dimensions | Location | Purpose |
|------|------------|----------|---------|
| `favicon.ico` | 32×32 | `/favicon.ico` | Legacy browsers |
| `favicon.svg` | Scalable | `/favicon.svg` | Modern browsers |
| `favicon-32x32.png` | 32×32 | `/favicon-32x32.png` | Standard |
| `favicon-16x16.png` | 16×16 | `/favicon-16x16.png` | Small |
| `apple-touch-icon.png` | 180×180 | `/apple-touch-icon.png` | iOS |
| `android-chrome-192x192.png` | 192×192 | `/android-chrome-192x192.png` | Android |
| `android-chrome-512x512.png` | 512×512 | `/android-chrome-512x512.png` | Android |

### HTML Links

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## Entity 3: Social Preview Image

- **File**: `assets/social-preview.png`
- **Dimensions**: 1200×630 pixels
- **Format**: PNG
- **Content**: Hero section ("MANDA NO" + WhatsApp logo + subtitle)

---

## Entity 4: Web Manifest

**File**: `site.webmanifest`

```json
{
  "name": "webdev_ - Automação WhatsApp",
  "short_name": "webdev_",
  "icons": [
    {"src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"}
  ],
  "theme_color": "#74d200",
  "background_color": "#000000",
  "display": "standalone"
}
```

---

**Data Model Complete** ✅
