const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  experimental: {
    newNextLinkBehavior: true,
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
  output: 'standalone',

};
