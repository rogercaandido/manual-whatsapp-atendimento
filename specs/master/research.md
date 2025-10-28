# Research: Social Sharing & Favicon Implementation

**Feature**: Add social sharing meta tags, favicon, and improved page title
**Created**: 2025-10-28
**Status**: Complete

---

## R1: Social Sharing Meta Tags Best Practices ✅

### Open Graph (Facebook, LinkedIn, WhatsApp)

**Required Tags**:
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
```

**Image Requirements**:
- **Minimum size**: 1200×630px (Facebook recommended)
- **Aspect ratio**: 1.91:1 (ideal for all platforms)
- **Format**: JPG or PNG
- **File size**: < 8MB (Facebook), < 5MB (recommended)

**Best Practices**:
- Use absolute URLs for images
- Include `og:site_name` for branding
- Add `og:locale` for internationalization (pt_BR)
- Test with Facebook Sharing Debugger

### Twitter Card

**Required Tags**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

**Image Requirements**:
- **Large card**: 1200×628px recommended
- **Format**: JPG, PNG
- **File size**: < 5MB

### WhatsApp Sharing

**Priority Order**:
1. Open Graph tags (primary)
2. Twitter Card tags (fallback)

**Image Requirements**:
- **Recommended**: 1200×630px
- **Format**: JPG, PNG
- **Note**: WhatsApp caches previews for ~7 days

---

## R2: Favicon Best Practices ✅

### Modern Favicon Setup

**Required Formats**:
```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

**Source**: Use WhatsApp logo (assets/whatsapp-logo.svg) for brand consistency

---

## R3: Page Title Best Practices ✅

### Chosen Title: `Manda no WhatsApp com IA | webdev_`

**Rationale**:
- ✅ Brand consistency (matches hero "MANDA NO")
- ✅ Memorable, confident tone
- ✅ Keywords: "WhatsApp" + "IA"
- ✅ 35 characters (optimal length)
- ✅ Brazilian Portuguese, informal tone

**Meta Description**:
```
Receba mensagens, organize demandas e atualize status automaticamente pelo WhatsApp com IA. Sem complicação. Comece agora com webdev_.
```

---

## R4: Social Preview Image Strategy ✅

**Approach**: Screenshot of hero section
**Dimensions**: 1200×630px
**Content**: "MANDA NO" + WhatsApp logo + subtitle
**File**: `assets/social-preview.png`

---

**Research Complete** ✅
