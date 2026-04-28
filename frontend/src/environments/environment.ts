export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  stripePublishableKey: process.env['NG_APP_STRIPE_PUBLISHABLE_KEY'] || ''
};
