const COMPANIES = {
  'TEC Electric': {
    name: 'TEC Electric',
    sameAs: 'https://tec-electric.com/',
    logo: 'https://tec-electric.com/wp-content/themes/tec-electric/imgs/tec-logo.png'
  },
  'Howell Electric': {
    name: 'Howell Electric',
    sameAs: 'https://www.howellelectric.com/',
    logo: 'https://howellelectric.com/live/wp-content/uploads/2019/04/Howell-logo-img.png'
  },
  'Rex Moore Electric': {
    name: 'Rex Moore Electric',
    sameAs: 'https://www.rexmoore.com/',
    logo: 'https://www.rexmoore.com/wp-content/uploads/2022/03/100-years.png'
  },
  'Helix Electric': {
    name: 'Helix Electric',
    sameAs: 'https://www.helixelectric.com/',
    logo: 'https://www.helixelectric.com/wp-content/uploads/2022/07/Helping-Hands-Logo_Blue-e1656694113799.jpg'
  },
  'IES Electric': {
    name: 'IES Electric',
    sameAs: 'https://iesci.net/',
    logo: 'https://iesci.net/wp-content/uploads/2024/08/IES-Electrical-Logo-color.png'
  }
};

const COMPANIES = {
  'T&D Communications': {
    name: 'T&D Communications',
    sameAs: 'https://www.tanddcomm.com/',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHzkB3k7eQoSQ/company-logo_200_200/company-logo_200_200/0/1631320385872?e=2147483647&v=beta&t=nuFy5lrwqoCuQ6_2P8hO_EwhwJlnndzcbM7ZPSfdKlM'
  },
  '3D Communications': {
    name: '3D Communications',
    sameAs: 'https://www.3dtsi.com/',
    logo: 'https://threedtsistage.wpenginepowered.com/wp-content/uploads/2021/01/logo-default.png'
  },
  'WiLine': {
    name: 'WiLine',
    sameAs: 'https://www.wiline.com/',
    logo: 'https://www.wiline.com/img/logo_blue.png'
  },
  'Teleco': {
    name: 'Teleco',
    sameAs: 'https://www.teleco.com/',
    logo: 'https://www.teleco.com/wp-content/uploads/2019/10/telecologo-2023.png'
  },
  'Wisetel': {
    name: 'Wisetel',
    sameAs: 'https://www.wisetel.net/',
    logo: 'https://wisetel.net/wp-content/uploads/2020/02/home-logo.png'
  },
  'HCI Systems': {
    name: 'HCI Systems',
    sameAs: 'https://www.hcisystems.net/',
    logo: 'https://www.hcisystems.net/wp-content/uploads/2019/04/logo.png'
  },
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  },
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  },
  'Vision Technologies': {
    name: 'Vision Technologies',
    sameAs: 'https://www.visiontechnologies.com/',
    logo: 'https://www.visiontechnologies.com/themes/custom/vt/logo.svg'
  },
  'Tech Electronics': {
    name: 'Tech Electronics',
    sameAs: 'https://www.techelectronics.com/',
    logo: 'https://www.techelectronics.com/wp-content/uploads/2020/10/tech-electronics-logo.png'
  },
  'High Point Networks': {
    name: 'High Point Networks',
    sameAs: 'https://www.highpointnetworks.com/',
    logo: 'https://highpointnetworks.com/wp-content/uploads/2023/11/HPN-logo-fullColor-rgb.svg'
  }
};



npm run index-jobs

node scripts/update-dates.js

# Last 7 days
npm run index-recent-jobs -- -days=7

# Since specific date
npm run index-recent-jobs -- -since=2024-04-20

# Most recent 100
npm run index-recent-jobs -- -limit=100

# update dates
npm run update-dates

Sudden mass date changes might look suspicious
Google prefers natural content updates
Daily quota limits (200 URLs/day)
More natural for SEO
Suggested Approach:
Wait 3-5 days
Update dates in groups:
Day 1: 25 jobs
Day 2: Another 25
Day 3: Another 25
etc.
Use slightly different dates for each batch

npm run index-jobs

node scripts/update-dates.js

--------------------------------

# Create 25 Apprentice jobs
npm run create-jobs "Apprentice Electrician"

# Create 25 Commercial Journeyman jobs
npm run create-jobs "Commercial Journeyman Electrician"

# Create 25 Fire Alarm jobs
npm run create-jobs "Fire Alarm Technician"

# Create varied jobs based on amount in const. 
npm run create-varied-jobs



npm run create-electrician-jobs





# Update jobs from last 7 days
npm run update-dates -- --days=7


git reset --hard
git clean -fd

npm run update-recent-dates -- --from="2024-12-13T00:00:00"

npm run update-dates -- --from="2024-12-13" --to="2024-12-15"

npm run create-electrician-jobs

npm run create-cable-jobs

# Most recent 100
npm run index-recent-jobs -- -limit=100


Certs in job description prompt:
- ${requiredCerts[1]} certification



npm run update-team-values
npm run update-category-values

npm run create-glossary


npm run notify-content-updates -- --from="2024-12-18" --to="2024-12-19"
