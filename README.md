# THDeb

THDeb's static project website: https://thdeb.us.ci

The site contains a home page, friendly links, and project attribution in English and Simplified Chinese. GitHub links point directly to public GitHub pages.

## Files

- `web/`: complete public website, ready for static hosting.
- `LICENSE`: upstream license.

Edit the HTML pages to update project descriptions and friendly links. Edit `web/assets/js/config.js` to change public GitHub links. No build step or dependency installation is required.

## Hosting

GitHub Pages: https://touhoudebian.github.io/thdeb.us.ci/

Pushes to `main` deploy `web/` through `.github/workflows/pages.yml`. The workflow publishes only the static website, excluding Cloudflare-specific configuration. No custom domain is configured for this deployment.

The existing `thdeb.us.ci` domain remains on Cloudflare Pages independently.

Open `web/index.html` locally to preview the site. Removed discussion and account pages return 404 on GitHub Pages.

## Attribution

Derived from [LinusTrevian/Board](https://github.com/LinusTrevian/Board). Original attribution and the background illustration source remain on the About pages. See `LICENSE` for licensing terms.
