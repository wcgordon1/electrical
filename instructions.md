# SEO-Optimized Dynamic Job Pages Implementation

## Component Reference Guide

### Existing Components (Will Not Modify):
- @SearchJobs.astro - Main search functionality
- @JobFilters.astro - Main filter functionality
- @open-positions.astro - Main jobs listing page
- @JobsLayout.astro - Jobs-specific layout

## Implementation Steps

### 1. Create Basic Dynamic Pages First
- [ ] Create folder structure:
  ```bash
  mkdir -p src/pages/jobs/{teams,categories,locations}
  ```

- [ ] Create @pages/jobs/teams/[team].astro
  - Basic page structure
  - Use existing components temporarily but do not update these components
  - Filter jobs by team
  - Examples: /commercial-jobs, /industrial-jobs
  - Test routing and job filtering

- [ ] Create @pages/jobs/categories/[category].astro
  - Basic page structure
  - Use existing components temporarily but do not update these components
  - Filter jobs by category
  - Examples: /apprentice-jobs, /journeyman-jobs
  - Test routing and job filtering

- [ ] Create @pages/jobs/locations/[location].astro
  - Basic page structure
  - Use existing components temporarily but do not update these components
  - Handle "City, State" format
  - Test routing and job filtering

### 2. Add SEO Elements to Dynamic Pages
- [ ] Add proper meta tags
- [ ] Create unique titles and descriptions
- [ ] Add schema markup
- [ ] Set canonical URLs
- [ ] Update sitemap.xml

### 3. Create Dynamic Components
- [ ] Create @components/jobs/dynamic/DynamicSearch.astro
  - Based on working page implementation
  - Optimize for filtered context
  - Maintain existing search UX

- [ ] Create @components/jobs/dynamic/DynamicFilters.astro
  - Based on working page implementation
  - Show only relevant filters
  - Maintain existing filter UX

- [ ] Create @components/jobs/dynamic/DynamicEntries.astro
  - Based on working page implementation
  - Optimize for filtered context
  - Maintain existing styling

### 4. Replace Temporary Components
- [ ] Update team pages with dynamic components
- [ ] Update category pages with dynamic components
- [ ] Update location pages with dynamic components
- [ ] Test all functionality

### 5. Final Testing
- [ ] Test all dynamic routes
- [ ] Verify SEO elements
- [ ] Check mobile responsiveness
- [ ] Validate schema markup
- [ ] Test search and filters
- [ ] Check performance

## Notes
- Build and test pages first
- Add SEO elements early
- Create specialized components last
- Keep existing functionality intact
- Test thoroughly at each step