export const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        title: 'Carter Moyer — Full-Stack Engineer & AI Architect'
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
        title: 'About — Carter Moyer'
    },
    {
        path: 'projects',
        loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Projects — Carter Moyer'
    },
    {
        path: 'services',
        loadComponent: () => import('./services-page/services.component').then(m => m.ServicesComponent),
        title: 'Services & Pricing — Carter Moyer'
    },
    {
        path: 'blog',
        loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
        title: 'Blog — Carter Moyer'
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact — Carter Moyer'
    },
    { path: '**', redirectTo: 'home' }
];
//# sourceMappingURL=app.routes.js.map