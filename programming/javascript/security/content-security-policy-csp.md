# Content Security Policy Reference
[Reference](https://content-security-policy.com/)

- This header allows you to restrict which resources can be loaded, and the URLs that can be loaded from.
- It can be an HTTP response header, or it can be applied via a meta tag.
- So in Next, we have to define:
  - `default-src`, `script-src`, `style-src`, `img-src`, and `connect-src`.

- Some examples:
  - Allow everything, but only form the same origin: `default-src 'self';`
  - Only allow scripts from the same origin: `script-src 'self';`
  - Allow Google Analytics: `script-src 'self' www.google-analytics.com ajax.googleapis.com;`

- Chrome will specify `Refused to load the script 'script-uri' because it violates the following Content Security Policy directive: "your CSP directive".`.

# Content Security Policy - NextJS
[Reference](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
