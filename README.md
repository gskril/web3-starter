## Opinionated Web3 Project Starter Template

This is a starter template for building web3 projects using my preferred stack:

- Next.js
- Styled Components
- Styled JSX (with Sass support)
- Ethers
- Wagmi
- RainbowKit
- Plausible Analytics

It also includes hooks that I tend to use often and my eslint/prettier configuration to keep things consistent.

For easy coloring with built-in light/dark mode via CSS custom properties, I've included [Radix's color system](https://www.radix-ui.com/colors). It's commented out by default to reduce bundle size (~10kb compressed), but you can uncomment it in [`src/styles/style.scss`](src/styles/style.scss) if you want to use it.

Inspired by [@carlosdp/starter-web3](https://github.com/carlosdp/starter-web3)
