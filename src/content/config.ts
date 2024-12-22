import { defineCollection, z } from "astro:content";
const integrations = defineCollection({
  schema: z.object({
    integration: z.string(),
    description: z.string(),
    email: z.string(),
    permissions: z.array(z.string()),
    details: z.array(z.object({
      title: z.string(),
      value: z.string(),
      url: z.string().optional(),
    })),
    logo: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});
const helpcenter = defineCollection({
  schema: z.object({
    page: z.string(),
    description: z.string(),
    icon: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});
const customers = defineCollection({
  schema: z.object({
    customer: z.string(),
    challengesAndSolutions: z.array(z.object({
      title: z.string(),
      content: z.string(),
    })),
    results: z.array(z.string()),
    about: z.string(),
    details: z.object({}).passthrough(),
    logo: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});
const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date().optional(),
  }),
});
const jobsCollection = defineCollection({
  schema: z.object({
    position: z.string(),
    description: z.string(),
    location: z.string(),
    team: z.string(),
    datePosted: z.string(),
    validThrough: z.string(),
    employmentType: z.string(),
    hiringOrganization: z.object({
      name: z.string(),
      sameAs: z.string(),
      logo: z.string(),
    }),
    jobLocation: z.object({
      streetAddress: z.string(),
      addressLocality: z.string(),
      addressRegion: z.string(),
      postalCode: z.string(),
      addressCountry: z.string(),
    }),
    baseSalary: z.object({
      currency: z.string(),
      value: z.number(),
      minValue: z.number(),
      maxValue: z.number(),
      unitText: z.string(),
    }),
    experienceRequirements: z.string(),
    occupationalCategory: z.string(),
    identifier: z.object({
      name: z.string(),
      value: z.string(),
    }),
    featured: z.boolean().default(false),
    email: z.array(z.string()),
  }),
});
const postsCollection = defineCollection({
  schema: z.object({
    pubDate: z.date(),
    modDate: z.string(),
    author: z.string(),
    title: z.string(),
    description: z.string(),
    avatar: z.object({
      url: z.string(),
      alt: z.string()
    }),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
});
const companyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    description: z.string(),
    location: z.string(),
    website: z.string().url(),
    featured: z.boolean().default(false)
  })
});
const glossaryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    term: z.string(),
    icon: z.string(),
    category: z.string(),
    vertical: z.string(),
    description: z.string(),
    details: z.array(z.object({
      title: z.string(),
      value: z.string(),
      url: z.string().optional()
    }))
  })
});

export const collections = {
  integrations: integrations,
  helpcenter: helpcenter,
  customers: customers,
  infopages: infopages,
  jobs: jobsCollection,
  posts: postsCollection,
  company: companyCollection,
  glossary: glossaryCollection
};
