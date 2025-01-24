import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export const prerender = true;

export async function GET(context) {
  const jobs = await getCollection('jobs');
  
  return rss({
    title: 'Jake\'s Jobs',
    description: 'Find your next job with Jake\'s Jobs',
    site: context.site,
    items: jobs.map((job) => ({
      title: job.data.position,
      pubDate: new Date(job.data.datePosted),
      description: `
          <div>${marked.parse(job.body)}</div>
      `,
      link: `${context.site}jobs/${job.slug}`,
      customData: `
      <company>
        <name>${job.data.hiringOrganization.name}</name>
        <logo>${job.data.hiringOrganization.logo}</logo>
        <url>${job.data.hiringOrganization.sameAs}</url>
      </company>
        <datePosted>${job.data.datePosted}</datePosted>
        <validThrough>${job.data.validThrough}</validThrough>
        <location>${job.data.location}</location>
        <streetAddress>${job.data.jobLocation.streetAddress}</streetAddress>
        <city>${job.data.jobLocation.addressLocality}</city>
        <state>${job.data.jobLocation.addressRegion}</state>
        <country>${job.data.jobLocation.addressCountry}</country>
        <postalCode>${job.data.jobLocation.postalCode}</postalCode>
        <salary>
          <currency>${job.data.baseSalary.currency}</currency>
          <minimum>${job.data.baseSalary.minValue}</minimum>
          <maximum>${job.data.baseSalary.maxValue}</maximum>
          <monetaryAmount>${job.data.baseSalary.unitText}</monetaryAmount>
        </salary>
        <category>${job.data.occupationalCategory}</category>
        <team>${job.data.team}</team>
        <directApply>true</directApply>
        <setting>
        <remote>false</remote>
        <employmentType>${job.data.employmentType}</employmentType>
      `,
    })),
  });
}