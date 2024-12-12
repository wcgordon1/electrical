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



git reset --hard
git clean -fd
