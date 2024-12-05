npm run index-jobs

node scripts/update-dates.js

# Last 7 days
npm run index-recent -- -days=7

# Since specific date
npm run index-recent -- -since=2024-04-20

# Most recent 100
npm run index-recent -- -limit=100