export const environment = {
  production: true,
  apiUrl: '/api',
  stripePublishableKey: process.env['NG_APP_STRIPE_PUBLISHABLE_KEY'] || ''
};