const args = process.argv.slice(2);
const usage = `
Usage: 
  npm run index-recent -- -days=7     (index last 7 days)
  npm run index-recent -- -since=2024-04-20  (index since date)
  npm run index-recent -- -limit=100  (index most recent 100)
`;

// Parse arguments
let filter = {
    days: null,
    since: null,
    limit: null
};

args.forEach(arg => {
    if (arg.startsWith('-days=')) {
        filter.days = parseInt(arg.split('=')[1]);
    }
    if (arg.startsWith('-since=')) {
        filter.since = new Date(arg.split('=')[1]);
    }
    if (arg.startsWith('-limit=')) {
        filter.limit = parseInt(arg.split('=')[1]);
    }
});

// Filter by days
function filterByDays(jobs, days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return jobs.filter(job => job.datePosted > cutoff);
}

// Filter by specific date
function filterBySince(jobs, since) {
    return jobs.filter(job => job.datePosted > since);
}

// Filter by limit (most recent N)
function filterByLimit(jobs, limit) {
    return jobs
        .sort((a, b) => b.datePosted - a.datePosted)
        .slice(0, limit);
} 