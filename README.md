# gatsby-plugin-build-date

Add the date a Gatsby site was built to its internal GraphQL API. The date is generated at build time, not runtime, so is baked into the site build.

It's common to see text like "Last Updated On 12/12/2019" in website footers - this plugin makes that date, reflecting when the site was built, available in the internal GraphQL API so that it's accessible in any component or page. No need to manually update the date, just build and let the new static date update itself.

This plugin is **not** designed to get "last build/update date/time" of specific files, it is only for when the whole site is compiled and `gatsby-node.js` is run.
