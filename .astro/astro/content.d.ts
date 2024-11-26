declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"company": {
"convergint.md": {
	id: "convergint.md";
  slug: "convergint";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
"hal-hayes-electric.md": {
	id: "hal-hayes-electric.md";
  slug: "hal-hayes-electric";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
"premiere-electrical.md": {
	id: "premiere-electrical.md";
  slug: "premiere-electrical";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
"salt-n-light-electric.md": {
	id: "salt-n-light-electric.md";
  slug: "salt-n-light-electric";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire.md": {
	id: "west-coast-fire.md";
  slug: "west-coast-fire";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
};
"integrations": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
};
"jobs": {
"apprentice-elec-bakersfield-id-nf2904.md": {
	id: "apprentice-elec-bakersfield-id-nf2904.md";
  slug: "apprentice-elec-bakersfield-id-nf2904";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-chulavista-id-fn1298.md": {
	id: "apprentice-elec-chulavista-id-fn1298.md";
  slug: "apprentice-elec-chulavista-id-fn1298";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-echolake-id-fd2342.md": {
	id: "apprentice-elec-echolake-id-fd2342.md";
  slug: "apprentice-elec-echolake-id-fd2342";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-encore-denver-id-bf8421.md": {
	id: "apprentice-elec-encore-denver-id-bf8421.md";
  slug: "apprentice-elec-encore-denver-id-bf8421";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-howell-lacanada-id-gj132.md": {
	id: "apprentice-elec-howell-lacanada-id-gj132.md";
  slug: "apprentice-elec-howell-lacanada-id-gj132";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-howell-sanfernando-id-mg2398.md": {
	id: "apprentice-elec-howell-sanfernando-id-mg2398.md";
  slug: "apprentice-elec-howell-sanfernando-id-mg2398";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-mmr-atlanta-id-bf7482.md": {
	id: "apprentice-elec-mmr-atlanta-id-bf7482.md";
  slug: "apprentice-elec-mmr-atlanta-id-bf7482";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-mmr-greensboro-id-mnb2377.md": {
	id: "apprentice-elec-mmr-greensboro-id-mnb2377.md";
  slug: "apprentice-elec-mmr-greensboro-id-mnb2377";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-mmr-lawrenceville-id-fb9238.md": {
	id: "apprentice-elec-mmr-lawrenceville-id-fb9238.md";
  slug: "apprentice-elec-mmr-lawrenceville-id-fb9238";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-mmr-losangeles-id-fb1231.md": {
	id: "apprentice-elec-mmr-losangeles-id-fb1231.md";
  slug: "apprentice-elec-mmr-losangeles-id-fb1231";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-northhollywood-id-mdfsa.md": {
	id: "apprentice-elec-northhollywood-id-mdfsa.md";
  slug: "apprentice-elec-northhollywood-id-mdfsa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-pasadena-d-nef01293.md": {
	id: "apprentice-elec-pasadena-d-nef01293.md";
  slug: "apprentice-elec-pasadena-d-nef01293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-prime-anaheim-id-bf8921.md": {
	id: "apprentice-elec-prime-anaheim-id-bf8921.md";
  slug: "apprentice-elec-prime-anaheim-id-bf8921";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-prime-riverside-id-be9891.md": {
	id: "apprentice-elec-prime-riverside-id-be9891.md";
  slug: "apprentice-elec-prime-riverside-id-be9891";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-prime-san-diego-id-bf0912.md": {
	id: "apprentice-elec-prime-san-diego-id-bf0912.md";
  slug: "apprentice-elec-prime-san-diego-id-bf0912";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-prime-thousandoaks-id-bf2892.md": {
	id: "apprentice-elec-prime-thousandoaks-id-bf2892.md";
  slug: "apprentice-elec-prime-thousandoaks-id-bf2892";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-prime-torrance-id-bf4891.md": {
	id: "apprentice-elec-prime-torrance-id-bf4891.md";
  slug: "apprentice-elec-prime-torrance-id-bf4891";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-cupertino-id-br9328.md": {
	id: "apprentice-elec-rexmoore-cupertino-id-br9328.md";
  slug: "apprentice-elec-rexmoore-cupertino-id-br9328";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-glendal-id-ve9838.md": {
	id: "apprentice-elec-rexmoore-glendal-id-ve9838.md";
  slug: "apprentice-elec-rexmoore-glendal-id-ve9838";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-sanclemente-id-rb4293.md": {
	id: "apprentice-elec-rexmoore-sanclemente-id-rb4293.md";
  slug: "apprentice-elec-rexmoore-sanclemente-id-rb4293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-riverside-ies-id-bf0934.md": {
	id: "apprentice-elec-riverside-ies-id-bf0934.md";
  slug: "apprentice-elec-riverside-ies-id-bf0934";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rogers-augusta-id-me-2109.md": {
	id: "apprentice-elec-rogers-augusta-id-me-2109.md";
  slug: "apprentice-elec-rogers-augusta-id-me-2109";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rogers-charlotte-id-fk0942.md": {
	id: "apprentice-elec-rogers-charlotte-id-fk0942.md";
  slug: "apprentice-elec-rogers-charlotte-id-fk0942";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rogers-greensboro-id-nf9201.md": {
	id: "apprentice-elec-rogers-greensboro-id-nf9201.md";
  slug: "apprentice-elec-rogers-greensboro-id-nf9201";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rogers-marietta-id-jf-2032.md": {
	id: "apprentice-elec-rogers-marietta-id-jf-2032.md";
  slug: "apprentice-elec-rogers-marietta-id-jf-2032";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-rogers-raleigh-id-mm49203.md": {
	id: "apprentice-elec-rogers-raleigh-id-mm49203.md";
  slug: "apprentice-elec-rogers-raleigh-id-mm49203";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-royal-anaheim-idbr3829.md": {
	id: "apprentice-elec-royal-anaheim-idbr3829.md";
  slug: "apprentice-elec-royal-anaheim-idbr3829";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-scottdale-ies-id-br4298.md": {
	id: "apprentice-elec-scottdale-ies-id-br4298.md";
  slug: "apprentice-elec-scottdale-ies-id-br4298";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-scottsdale-ies-id-br7593.md": {
	id: "apprentice-elec-scottsdale-ies-id-br7593.md";
  slug: "apprentice-elec-scottsdale-ies-id-br7593";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-berg-morgan-hill-id23121.md": {
	id: "apprentice-electrician-berg-morgan-hill-id23121.md";
  slug: "apprentice-electrician-berg-morgan-hill-id23121";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-berg-sf-id-fg212.md": {
	id: "apprentice-electrician-berg-sf-id-fg212.md";
  slug: "apprentice-electrician-berg-sf-id-fg212";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-helix-sj-id-fh213.md": {
	id: "apprentice-electrician-helix-sj-id-fh213.md";
  slug: "apprentice-electrician-helix-sj-id-fh213";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-irvine-id-wi3092.md": {
	id: "apprentice-electrician-irvine-id-wi3092.md";
  slug: "apprentice-electrician-irvine-id-wi3092";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-la-id-ek23940.md": {
	id: "apprentice-electrician-la-id-ek23940.md";
  slug: "apprentice-electrician-la-id-ek23940";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-oceanside-id-ms8293.md": {
	id: "apprentice-electrician-oceanside-id-ms8293.md";
  slug: "apprentice-electrician-oceanside-id-ms8293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-phoenix-id-3mw8301.md": {
	id: "apprentice-electrician-phoenix-id-3mw8301.md";
  slug: "apprentice-electrician-phoenix-id-3mw8301";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-encore-aurora-id-bz1188.md": {
	id: "cable-tech-encore-aurora-id-bz1188.md";
  slug: "cable-tech-encore-aurora-id-bz1188";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-encore-boulder-id-by7741.md": {
	id: "cable-tech-encore-boulder-id-by7741.md";
  slug: "cable-tech-encore-boulder-id-by7741";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-la-kane-id-jg3892.md": {
	id: "cable-tech-la-kane-id-jg3892.md";
  slug: "cable-tech-la-kane-id-jg3892";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-mmr-athens-id-bf8923.md": {
	id: "cable-tech-mmr-athens-id-bf8923.md";
  slug: "cable-tech-mmr-athens-id-bf8923";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-mmr-marietta-id-bf7928.md": {
	id: "cable-tech-mmr-marietta-id-bf7928.md";
  slug: "cable-tech-mmr-marietta-id-bf7928";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-mmr-raleigh-id-bf7877.md": {
	id: "cable-tech-mmr-raleigh-id-bf7877.md";
  slug: "cable-tech-mmr-raleigh-id-bf7877";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-sd-kane-id-gj3423.md": {
	id: "cable-tech-sd-kane-id-gj3423.md";
  slug: "cable-tech-sd-kane-id-gj3423";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-tech-sf-kane-id-jf3322.md": {
	id: "cable-tech-sf-kane-id-jf3322.md";
  slug: "cable-tech-sf-kane-id-jf3322";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"cable-technician-columbia-md-id-fds43.md": {
	id: "cable-technician-columbia-md-id-fds43.md";
  slug: "cable-technician-columbia-md-id-fds43";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-designer-scottsdale-id-dfs321.md": {
	id: "fire-alarm-designer-scottsdale-id-dfs321.md";
  slug: "fire-alarm-designer-scottsdale-id-dfs321";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-installer-irvine-id-fsdf9.md": {
	id: "fire-alarm-installer-irvine-id-fsdf9.md";
  slug: "fire-alarm-installer-irvine-id-fsdf9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-tech-la-nexaus-id-ms-9302.md": {
	id: "fire-alarm-tech-la-nexaus-id-ms-9302.md";
  slug: "fire-alarm-tech-la-nexaus-id-ms-9302";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-tech-sf-id-mf0921.md": {
	id: "fire-alarm-tech-sf-id-mf0921.md";
  slug: "fire-alarm-tech-sf-id-mf0921";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-tech-sj-id-wk7740.md": {
	id: "fire-alarm-tech-sj-id-wk7740.md";
  slug: "fire-alarm-tech-sj-id-wk7740";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-technician-scottsdale-id-fds2.md": {
	id: "fire-alarm-technician-scottsdale-id-fds2.md";
  slug: "fire-alarm-technician-scottsdale-id-fds2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-sprinkler-designer-mesa-id-fds23.md": {
	id: "fire-sprinkler-designer-mesa-id-fds23.md";
  slug: "fire-sprinkler-designer-mesa-id-fds23";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-sprinkler-prime-scottsdale-id-bf9441.md": {
	id: "fire-sprinkler-prime-scottsdale-id-bf9441.md";
  slug: "fire-sprinkler-prime-scottsdale-id-bf9441";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"fire-technician-prime-tempe-id-bf9832.md": {
	id: "fire-technician-prime-tempe-id-bf9832.md";
  slug: "fire-technician-prime-tempe-id-bf9832";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-encore-boulder-id-jj3817.md": {
	id: "journeyman-elec-encore-boulder-id-jj3817.md";
  slug: "journeyman-elec-encore-boulder-id-jj3817";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-irvine-rexmoore-id-ne0294.md": {
	id: "journeyman-elec-irvine-rexmoore-id-ne0294.md";
  slug: "journeyman-elec-irvine-rexmoore-id-ne0294";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-la-rexmoore-id-id0288.md": {
	id: "journeyman-elec-la-rexmoore-id-id0288.md";
  slug: "journeyman-elec-la-rexmoore-id-id0288";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-longbeach-royal-id-bf7894.md": {
	id: "journeyman-elec-longbeach-royal-id-bf7894.md";
  slug: "journeyman-elec-longbeach-royal-id-bf7894";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-alpharetta-id-tt8976.md": {
	id: "journeyman-elec-premiere-alpharetta-id-tt8976.md";
  slug: "journeyman-elec-premiere-alpharetta-id-tt8976";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-ashville-id-bf2931.md": {
	id: "journeyman-elec-premiere-ashville-id-bf2931.md";
  slug: "journeyman-elec-premiere-ashville-id-bf2931";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-atlanta-id-bg3982.md": {
	id: "journeyman-elec-premiere-atlanta-id-bg3982.md";
  slug: "journeyman-elec-premiere-atlanta-id-bg3982";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-charleston-id-md2109.md": {
	id: "journeyman-elec-premiere-charleston-id-md2109.md";
  slug: "journeyman-elec-premiere-charleston-id-md2109";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-charlotte-id-ng8923.md": {
	id: "journeyman-elec-premiere-charlotte-id-ng8923.md";
  slug: "journeyman-elec-premiere-charlotte-id-ng8923";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-greensboro-id-ng8492.md": {
	id: "journeyman-elec-premiere-greensboro-id-ng8492.md";
  slug: "journeyman-elec-premiere-greensboro-id-ng8492";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-raleigh-id-mg8992.md": {
	id: "journeyman-elec-premiere-raleigh-id-mg8992.md";
  slug: "journeyman-elec-premiere-raleigh-id-mg8992";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-roswell-id-ba-0930.md": {
	id: "journeyman-elec-premiere-roswell-id-ba-0930.md";
  slug: "journeyman-elec-premiere-roswell-id-ba-0930";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-sandysprings-id-nr2128.md": {
	id: "journeyman-elec-premiere-sandysprings-id-nr2128.md";
  slug: "journeyman-elec-premiere-sandysprings-id-nr2128";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-premiere-spartansburg-id-nr9302.md": {
	id: "journeyman-elec-premiere-spartansburg-id-nr9302.md";
  slug: "journeyman-elec-premiere-spartansburg-id-nr9302";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-sacramento-royal-id-bf8492.md": {
	id: "journeyman-elec-sacramento-royal-id-bf8492.md";
  slug: "journeyman-elec-sacramento-royal-id-bf8492";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-sd-rexmoore-id-po2341.md": {
	id: "journeyman-elec-sd-rexmoore-id-po2341.md";
  slug: "journeyman-elec-sd-rexmoore-id-po2341";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-elec-torrance-royal-id-br0239.md": {
	id: "journeyman-elec-torrance-royal-id-br0239.md";
  slug: "journeyman-elec-torrance-royal-id-br0239";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"journeyman-electrician-resi-fsaf.md": {
	id: "journeyman-electrician-resi-fsaf.md";
  slug: "journeyman-electrician-resi-fsaf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lead-cable-tech-chantilly-id-fds24.md": {
	id: "lead-cable-tech-chantilly-id-fds24.md";
  slug: "lead-cable-tech-chantilly-id-fds24";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"residential-journeyman-electrician-jrn-elec.md": {
	id: "residential-journeyman-electrician-jrn-elec.md";
  slug: "residential-journeyman-electrician-jrn-elec";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-dc-blackbox-id-bf9823.md": {
	id: "security-tech-dc-blackbox-id-bf9823.md";
  slug: "security-tech-dc-blackbox-id-bf9823";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-encore-denver-id-bw9920.md": {
	id: "security-tech-encore-denver-id-bw9920.md";
  slug: "security-tech-encore-denver-id-bw9920";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-glendale-blackbox-id-br8421.md": {
	id: "security-tech-glendale-blackbox-id-br8421.md";
  slug: "security-tech-glendale-blackbox-id-br8421";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-mmr-atlanta-id-bf8741.md": {
	id: "security-tech-mmr-atlanta-id-bf8741.md";
  slug: "security-tech-mmr-atlanta-id-bf8741";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-paloalto-blackbox-id-br8922.md": {
	id: "security-tech-paloalto-blackbox-id-br8922.md";
  slug: "security-tech-paloalto-blackbox-id-br8922";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-reston-id-df243.md": {
	id: "security-tech-reston-id-df243.md";
  slug: "security-tech-reston-id-df243";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-sd-blackbox-id-nf8229.md": {
	id: "security-tech-sd-blackbox-id-nf8229.md";
  slug: "security-tech-sd-blackbox-id-nf8229";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-sf-blackbox-id-br8429.md": {
	id: "security-tech-sf-blackbox-id-br8429.md";
  slug: "security-tech-sf-blackbox-id-br8429";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-tempe-blackbox-id-bf2422.md": {
	id: "security-tech-tempe-blackbox-id-bf2422.md";
  slug: "security-tech-tempe-blackbox-id-bf2422";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-tech-torrance-blackbox-id-br9842.md": {
	id: "security-tech-torrance-blackbox-id-br9842.md";
  slug: "security-tech-torrance-blackbox-id-br9842";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"security-technician-tempe-id-da2321.md": {
	id: "security-technician-tempe-id-da2321.md";
  slug: "security-technician-tempe-id-da2321";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"service-electrician-irvine-id-23452.md": {
	id: "service-electrician-irvine-id-23452.md";
  slug: "service-electrician-irvine-id-23452";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"voice-data-installer-fairfax-id-ds23.md": {
	id: "voice-data-installer-fairfax-id-ds23.md";
  slug: "voice-data-installer-fairfax-id-ds23";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"Journeyman-Electrician-Job-Description.md": {
	id: "Journeyman-Electrician-Job-Description.md";
  slug: "journeyman-electrician-job-description";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"best-paying-electrician-jobs.md": {
	id: "best-paying-electrician-jobs.md";
  slug: "best-paying-electrician-jobs";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-find-electrician-jobs.md": {
	id: "how-to-find-electrician-jobs.md";
  slug: "how-to-find-electrician-jobs";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
