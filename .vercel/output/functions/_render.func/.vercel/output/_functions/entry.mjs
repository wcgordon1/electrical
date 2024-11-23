import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BrzOWoql.mjs';
import { manifest } from './manifest_BcMp5L1O.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/apply.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/api/jobdescription.astro.mjs');
const _page6 = () => import('./pages/api/test.astro.mjs');
const _page7 = () => import('./pages/articles.astro.mjs');
const _page8 = () => import('./pages/companies/home.astro.mjs');
const _page9 = () => import('./pages/companies/_---slug_.astro.mjs');
const _page10 = () => import('./pages/company/home.astro.mjs');
const _page11 = () => import('./pages/company/_slug_.astro.mjs');
const _page12 = () => import('./pages/company/_---slug_.astro.mjs');
const _page13 = () => import('./pages/contact.astro.mjs');
const _page14 = () => import('./pages/customers/home.astro.mjs');
const _page15 = () => import('./pages/customers/_---slug_.astro.mjs');
const _page16 = () => import('./pages/forms/contact.astro.mjs');
const _page17 = () => import('./pages/forms/forgot.astro.mjs');
const _page18 = () => import('./pages/forms/login.astro.mjs');
const _page19 = () => import('./pages/forms/signup.astro.mjs');
const _page20 = () => import('./pages/forms/submit.astro.mjs');
const _page21 = () => import('./pages/helpcenter/home.astro.mjs');
const _page22 = () => import('./pages/helpcenter/_---slug_.astro.mjs');
const _page23 = () => import('./pages/infopages/coming-soon.astro.mjs');
const _page24 = () => import('./pages/infopages/cookie-settings.astro.mjs');
const _page25 = () => import('./pages/infopages/_---slug_.astro.mjs');
const _page26 = () => import('./pages/integrations/home.astro.mjs');
const _page27 = () => import('./pages/integrations/_---slug_.astro.mjs');
const _page28 = () => import('./pages/jobs/filters.astro.mjs');
const _page29 = () => import('./pages/jobs/home.astro.mjs');
const _page30 = () => import('./pages/jobs/job-application.astro.mjs');
const _page31 = () => import('./pages/jobs/open-roles.astro.mjs');
const _page32 = () => import('./pages/jobs/_---slug_.astro.mjs');
const _page33 = () => import('./pages/landingpages/landing-three.astro.mjs');
const _page34 = () => import('./pages/landingpages/landing-two.astro.mjs');
const _page35 = () => import('./pages/open-positions.astro.mjs');
const _page36 = () => import('./pages/post-a-job.astro.mjs');
const _page37 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page38 = () => import('./pages/pricing/pricing-three.astro.mjs');
const _page39 = () => import('./pages/pricing/pricing-two.astro.mjs');
const _page40 = () => import('./pages/rss.xml.astro.mjs');
const _page41 = () => import('./pages/rss.xml.astro2.mjs');
const _page42 = () => import('./pages/sections/all-features.astro.mjs');
const _page43 = () => import('./pages/sections/all-pricing.astro.mjs');
const _page44 = () => import('./pages/sections/all-testimonials.astro.mjs');
const _page45 = () => import('./pages/system/overview.astro.mjs');
const _page46 = () => import('./pages/system/styleguide.astro.mjs');
const _page47 = () => import('./pages/tags/_tag_.astro.mjs');
const _page48 = () => import('./pages/tags.astro.mjs');
const _page49 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/apply.js", _page3],
    ["src/pages/api/contact.js", _page4],
    ["src/pages/api/jobdescription.js", _page5],
    ["src/pages/api/test.js", _page6],
    ["src/pages/articles.astro", _page7],
    ["src/pages/companies/home.astro", _page8],
    ["src/pages/companies/[...slug].astro", _page9],
    ["src/pages/company/home.astro", _page10],
    ["src/pages/company/[slug].astro", _page11],
    ["src/pages/company/[...slug].astro", _page12],
    ["src/pages/contact.astro", _page13],
    ["src/pages/customers/home.astro", _page14],
    ["src/pages/customers/[...slug].astro", _page15],
    ["src/pages/forms/contact.astro", _page16],
    ["src/pages/forms/forgot.astro", _page17],
    ["src/pages/forms/login.astro", _page18],
    ["src/pages/forms/signup.astro", _page19],
    ["src/pages/forms/submit.astro", _page20],
    ["src/pages/helpcenter/home.astro", _page21],
    ["src/pages/helpcenter/[...slug].astro", _page22],
    ["src/pages/infopages/coming-soon.astro", _page23],
    ["src/pages/infopages/cookie-settings.astro", _page24],
    ["src/pages/infopages/[...slug].astro", _page25],
    ["src/pages/integrations/home.astro", _page26],
    ["src/pages/integrations/[...slug].astro", _page27],
    ["src/pages/jobs/Filters.astro", _page28],
    ["src/pages/jobs/home.astro", _page29],
    ["src/pages/jobs/job-application.astro", _page30],
    ["src/pages/jobs/open-roles.astro", _page31],
    ["src/pages/jobs/[...slug].astro", _page32],
    ["src/pages/landingpages/landing-three.astro", _page33],
    ["src/pages/landingpages/landing-two.astro", _page34],
    ["src/pages/open-positions.astro", _page35],
    ["src/pages/post-a-job.astro", _page36],
    ["src/pages/posts/[...slug].astro", _page37],
    ["src/pages/pricing/pricing-three.astro", _page38],
    ["src/pages/pricing/pricing-two.astro", _page39],
    ["src/pages/rss.xml.js", _page40],
    ["src/pages/rss.xml.ts", _page41],
    ["src/pages/sections/all-features.astro", _page42],
    ["src/pages/sections/all-pricing.astro", _page43],
    ["src/pages/sections/all-testimonials.astro", _page44],
    ["src/pages/system/overview.astro", _page45],
    ["src/pages/system/styleguide.astro", _page46],
    ["src/pages/tags/[tag].astro", _page47],
    ["src/pages/tags/index.astro", _page48],
    ["src/pages/index.astro", _page49]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0aef328f-ea23-4b28-bf9c-23ee299c25d7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
