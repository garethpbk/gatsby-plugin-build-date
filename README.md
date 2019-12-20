# gatsby-plugin-build-date

Add the date a Gatsby site was built to its internal GraphQL API as type `currentBuildDate`. The date is generated at build time, not runtime, so is baked into the site build.

It's common to see text like "Last Updated On 12/20/2019" in website footers - this plugin makes that date, reflecting when the site was built, available in the internal GraphQL API so that it's accessible in any component or page. No need to manually update the date, just build and let the new static date update itself.

This plugin is **not** designed to get "last build/update date/time" of specific files, it is only for when the whole site is compiled and `gatsby-node.js` is run.

Date formatting and localization is handled with the [date-and-time library](https://github.com/knowledgecode/date-and-time). Ideally could use `toLocaleString()` or `toLocaleDateString()` but Node.js does not include anything beyond "en-US" formatting by default.

## Install

`npm install --save gatsby-plugin-build-date` or `yarn add gatsby-plugin-build-date`

## How to Use

Date format defaults to a string in "en-US" format, e.g. "12/20/2019" if built on December 20, 2019. If this is acceptable and no further formatting or localization is needed, can include with no options:

```js
// In your gatsby-config.js

module.exports = {
  plugins: [`gatsby-plugin-build-date`],
}
```

If different formatting or localization is desired, include with options:

```js
// In your gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: 'dddd D MMMM YYYY', // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        },
        locale: 'fr', // string, defaults to null, which date-and-time defaults as "en" - whether to localize the date or not, can use any available date-and-time localization
      },
    },
  ],
}
```

The above configuration would return a date of "vendredi 20 décembre 2019" if built on December 20, 2019.

## Options

The [date-and-time library](https://github.com/knowledgecode/date-and-time)'s `date.format`, `date.utc`, and `date.locale` methods are used to format dates when options are passed.

Available options, in the plugin's `options` object:

`formatAsDateString`: boolean, defaults to `true`. If set to `false`, no date formatting will be done, and the date added to the GraphQL API will be a string generated from `new Date()` at build time. Use this if it is preferred to format the date string on the client side, for example returned string of `2019-12-20T18:16:57.374Z` could be formatted:

`const buildDate = new Date(Date.parse(data.currentBuildDate.currentDate)).toLocaleDateString("de-DE")`

in a component or page to produce "20.12.2019" string.

If `formatAsDateString` is true formatting and locale options can be passed.

`formatting` object contains two properties:

`formatting.format`: string, defaults to "MM/DD/YYYY". Accepts any valid format from `date-and-time`'s API, reference Github page for full list of acceptable formats.

`formatting.utc`: boolean, defaults to `false`. For use with `date-and-time`'s UTC option as documented in its API.

`locale`: string, defaults to null, which produces "en" locale. Accepts any valid `date-and-time` locale as listed here: [https://github.com/knowledgecode/date-and-time/blob/HEAD/LOCALE.md](https://github.com/knowledgecode/date-and-time/blob/HEAD/LOCALE.md)

## How to Query

Date string is added as type `currentBuildDate` to internal GraphQL API and can be queried as such:

```graphql
{
  currentBuildDate {
    currentDate
  }
}
```

Use in a page query:

```js
export const query = graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`
```

or a static query:

```js
const data = useStaticQuery(graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`)
```

Note that if running in development mode with `gatsby develop` node APIs are not re-run during hot reload, so must quit and restart development mode if options are changed.

## Acknowledgements

Date formatting and localization is done with KNOWLEDGECODE `date-and-time` library: [https://github.com/knowledgecode/date-and-time](https://github.com/knowledgecode/date-and-time) - a great solution for formatting dates in Node.js without relying on `full-icu` library.
