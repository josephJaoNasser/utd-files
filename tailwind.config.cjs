const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const postcss = require("postcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx,svg}"],
  important: ".vuefinder",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#f0faff",
          100: "#e0f4fe",
          200: "#b9ebfe",
          300: "#7cddfd",
          400: "#36cdfa",
          500: "#0cb7eb",
          600: "#009ed6",
          700: "#0176a3",
          800: "#066386",
          900: "#0b526f",
          950: "#07344a",
        },
      },
    },
  },
  plugins: [
    /* Preflight but limit to only apply our components */
    // https://github.com/tailwindlabs/tailwindcss/discussions/10332#discussioncomment-4699227
    plugin(({ addBase }) => {
      const preflightStyles = postcss.parse(
        fs.readFileSync(
          require.resolve("./src/assets/css/preflight.css"),
          "utf8"
        )
      );

      // Scope the selectors to specific components
      preflightStyles.walkRules((rule) => {
        rule.selector = rule.selectors
          .map((selector) => ".vuefinder " + selector)
          .join(",");
      });

      addBase(preflightStyles.nodes);
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
