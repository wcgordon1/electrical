import { getCollection } from "astro:content";

export async function getRecentJobs(limit = 500) {
  const allJobs = await getCollection("jobs");
  
  // Sort by datePosted in descending order and take the most recent 500
  return allJobs
    .sort((a, b) => new Date(b.data.datePosted).getTime() - new Date(a.data.datePosted).getTime())
    .slice(0, limit);
} 