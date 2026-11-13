# THDeb

THDeb's static project website: https://thdeb.us.ci

The site contains a home page, friendly links, and project attribution in English and Simplified Chinese. GitHub links point directly to public GitHub pages.

## Files

- `web/`: complete public website, ready for static hosting.
- `LICENSE`: upstream license.

Edit the HTML pages to update project descriptions and friendly links. Edit `web/assets/js/config.js` to change public GitHub links. No build step or dependency installation is required.

## Hosting

For the existing Cloudflare Pages project, use `web` as the output directory and leave the build command empty. Upload only the contents of `web/` when deploying manually.

Open `web/index.html` locally to preview the site. Legacy discussion and account URLs redirect to the home page.

## Attribution

Derived from [LinusTrevian/Board](https://github.com/LinusTrevian/Board). Original attribution and the background illustration source remain on the About pages. See `LICENSE` for licensing terms.
