export const environment = {
  production: true,
  apiUrl: '/api',
  // Variables injected via Vercel Vault and @ngx-env/builder
  frontendUrl: process.env['NG_APP_PROD_FRONTEND_URL'],
  resumeUrl: process.env['NG_APP_RESUME_URL'],
  projectName: process.env['NG_APP_PROJECT_NAME']
};
