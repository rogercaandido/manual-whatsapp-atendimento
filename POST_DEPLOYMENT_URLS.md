# Post-Deployment URL Updates Required

## Overview

The social sharing meta tags in `index.html` contain placeholder URLs that **MUST** be replaced with your actual domain after deployment.

## Files to Update

### index.html (lines 17-18, 27)

**Current Placeholder URLs:**

```html
<!-- Line 17: Open Graph URL -->
<meta property="og:url" content="https://[REPLACE-WITH-YOUR-DOMAIN]/">

<!-- Line 18: Open Graph Image -->
<meta property="og:image" content="https://[REPLACE-WITH-YOUR-DOMAIN]/assets/social-preview.png">

<!-- Line 27: Twitter Card Image -->
<meta name="twitter:image" content="https://[REPLACE-WITH-YOUR-DOMAIN]/assets/social-preview.png">
```

## Instructions

### Step 1: After Deployment

Once your site is deployed to a live domain (e.g., `https://yourdomain.com`), follow these steps:

### Step 2: Replace Placeholders

Open `index.html` and replace **ALL THREE** occurrences of `[REPLACE-WITH-YOUR-DOMAIN]` with your actual domain:

**Example:**
```html
<!-- Before -->
<meta property="og:url" content="https://[REPLACE-WITH-YOUR-DOMAIN]/">
<meta property="og:image" content="https://[REPLACE-WITH-YOUR-DOMAIN]/assets/social-preview.png">
<meta name="twitter:image" content="https://[REPLACE-WITH-YOUR-DOMAIN]/assets/social-preview.png">

<!-- After (example with yourdomain.com) -->
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/assets/social-preview.png">
<meta name="twitter:image" content="https://yourdomain.com/assets/social-preview.png">
```

### Step 3: Commit and Redeploy

```bash
git add index.html
git commit -m "fix: atualiza URLs absolutos nas meta tags para domínio real"
git push
```

### Step 4: Test Social Sharing

After the URLs are updated, test your social sharing:

1. **Facebook Sharing Debugger**
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Debug"
   - Click "Scrape Again" to force refresh

2. **Twitter Card Validator**
   - Go to: https://cards-dev.twitter.com/validator
   - Enter your URL
   - Preview the card

3. **WhatsApp**
   - Share your URL in WhatsApp (message to yourself)
   - Verify preview shows:
     - Image (social-preview.png)
     - Title: "Manda no WhatsApp com IA"
     - Description

## Verification Checklist

- [ ] Replaced `[REPLACE-WITH-YOUR-DOMAIN]` in `og:url` (line 17)
- [ ] Replaced `[REPLACE-WITH-YOUR-DOMAIN]` in `og:image` (line 18)
- [ ] Replaced `[REPLACE-WITH-YOUR-DOMAIN]` in `twitter:image` (line 27)
- [ ] Committed changes to git
- [ ] Redeployed site
- [ ] Tested with Facebook Sharing Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Tested WhatsApp preview

## Important Notes

- **Absolute URLs Required**: Social platforms require full `https://` URLs, not relative paths
- **Image Accessibility**: Ensure `assets/social-preview.png` is publicly accessible at the URL you specify
- **Cache Issues**: Facebook/WhatsApp cache previews for ~7 days. Use debugger tools to force refresh.
- **SSL Certificate**: Ensure your domain has a valid SSL certificate (https://)

---

**Created**: 2025-10-28
**Related**: [index.html](../index.html), [tasks.md](./specs/master/tasks.md)
