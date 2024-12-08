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
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"hal-hayes-electric.md": {
	id: "hal-hayes-electric.md";
  slug: "hal-hayes-electric";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"premiere-electrical.md": {
	id: "premiere-electrical.md";
  slug: "premiere-electrical";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"salt-n-light-electric.md": {
	id: "salt-n-light-electric.md";
  slug: "salt-n-light-electric";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"west-coast-fire.md": {
	id: "west-coast-fire.md";
  slug: "west-coast-fire";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
};
"integrations": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
};
"jobs": {
"all-work-elec-premiere-id-re8291.md": {
	id: "all-work-elec-premiere-id-re8291.md";
  slug: "all-work-elec-premiere-id-re8291";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-bakersfield-id-nf2904.md": {
	id: "apprentice-elec-bakersfield-id-nf2904.md";
  slug: "apprentice-elec-bakersfield-id-nf2904";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-burbank-prime-id-bf1928.md": {
	id: "apprentice-elec-burbank-prime-id-bf1928.md";
  slug: "apprentice-elec-burbank-prime-id-bf1928";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-chulavista-id-fn1298.md": {
	id: "apprentice-elec-chulavista-id-fn1298.md";
  slug: "apprentice-elec-chulavista-id-fn1298";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-d-mmr-burbank-id-fds34242.md": {
	id: "apprentice-elec-d-mmr-burbank-id-fds34242.md";
  slug: "apprentice-elec-d-mmr-burbank-id-fds34242";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-echolake-id-fd2342.md": {
	id: "apprentice-elec-echolake-id-fd2342.md";
  slug: "apprentice-elec-echolake-id-fd2342";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-encore-denver-id-bf8421.md": {
	id: "apprentice-elec-encore-denver-id-bf8421.md";
  slug: "apprentice-elec-encore-denver-id-bf8421";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-howell-lacanada-id-gj132.md": {
	id: "apprentice-elec-howell-lacanada-id-gj132.md";
  slug: "apprentice-elec-howell-lacanada-id-gj132";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-howell-sanfernando-id-mg2398.md": {
	id: "apprentice-elec-howell-sanfernando-id-mg2398.md";
  slug: "apprentice-elec-howell-sanfernando-id-mg2398";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-mmr-atlanta-id-bf7482.md": {
	id: "apprentice-elec-mmr-atlanta-id-bf7482.md";
  slug: "apprentice-elec-mmr-atlanta-id-bf7482";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-mmr-greensboro-id-mnb2377.md": {
	id: "apprentice-elec-mmr-greensboro-id-mnb2377.md";
  slug: "apprentice-elec-mmr-greensboro-id-mnb2377";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-mmr-lawrenceville-id-fb9238.md": {
	id: "apprentice-elec-mmr-lawrenceville-id-fb9238.md";
  slug: "apprentice-elec-mmr-lawrenceville-id-fb9238";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-mmr-losangeles-id-fb1231.md": {
	id: "apprentice-elec-mmr-losangeles-id-fb1231.md";
  slug: "apprentice-elec-mmr-losangeles-id-fb1231";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-northhollywood-id-mdfsa.md": {
	id: "apprentice-elec-northhollywood-id-mdfsa.md";
  slug: "apprentice-elec-northhollywood-id-mdfsa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-pasadena-d-nef01293.md": {
	id: "apprentice-elec-pasadena-d-nef01293.md";
  slug: "apprentice-elec-pasadena-d-nef01293";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-prime-anaheim-id-bf8921.md": {
	id: "apprentice-elec-prime-anaheim-id-bf8921.md";
  slug: "apprentice-elec-prime-anaheim-id-bf8921";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-prime-riverside-id-be9891.md": {
	id: "apprentice-elec-prime-riverside-id-be9891.md";
  slug: "apprentice-elec-prime-riverside-id-be9891";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-prime-san-diego-id-bf0912.md": {
	id: "apprentice-elec-prime-san-diego-id-bf0912.md";
  slug: "apprentice-elec-prime-san-diego-id-bf0912";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-prime-thousandoaks-id-bf2892.md": {
	id: "apprentice-elec-prime-thousandoaks-id-bf2892.md";
  slug: "apprentice-elec-prime-thousandoaks-id-bf2892";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-prime-torrance-id-bf4891.md": {
	id: "apprentice-elec-prime-torrance-id-bf4891.md";
  slug: "apprentice-elec-prime-torrance-id-bf4891";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-cupertino-id-br9328.md": {
	id: "apprentice-elec-rexmoore-cupertino-id-br9328.md";
  slug: "apprentice-elec-rexmoore-cupertino-id-br9328";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-glendal-id-ve9838.md": {
	id: "apprentice-elec-rexmoore-glendal-id-ve9838.md";
  slug: "apprentice-elec-rexmoore-glendal-id-ve9838";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rexmoore-sanclemente-id-rb4293.md": {
	id: "apprentice-elec-rexmoore-sanclemente-id-rb4293.md";
  slug: "apprentice-elec-rexmoore-sanclemente-id-rb4293";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-riverside-ies-id-bf0934.md": {
	id: "apprentice-elec-riverside-ies-id-bf0934.md";
  slug: "apprentice-elec-riverside-ies-id-bf0934";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rogers-augusta-id-me-2109.md": {
	id: "apprentice-elec-rogers-augusta-id-me-2109.md";
  slug: "apprentice-elec-rogers-augusta-id-me-2109";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rogers-charlotte-id-fk0942.md": {
	id: "apprentice-elec-rogers-charlotte-id-fk0942.md";
  slug: "apprentice-elec-rogers-charlotte-id-fk0942";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rogers-greensboro-id-nf9201.md": {
	id: "apprentice-elec-rogers-greensboro-id-nf9201.md";
  slug: "apprentice-elec-rogers-greensboro-id-nf9201";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rogers-marietta-id-jf-2032.md": {
	id: "apprentice-elec-rogers-marietta-id-jf-2032.md";
  slug: "apprentice-elec-rogers-marietta-id-jf-2032";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-rogers-raleigh-id-mm49203.md": {
	id: "apprentice-elec-rogers-raleigh-id-mm49203.md";
  slug: "apprentice-elec-rogers-raleigh-id-mm49203";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-royal-anaheim-idbr3829.md": {
	id: "apprentice-elec-royal-anaheim-idbr3829.md";
  slug: "apprentice-elec-royal-anaheim-idbr3829";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-scottdale-ies-id-br4298.md": {
	id: "apprentice-elec-scottdale-ies-id-br4298.md";
  slug: "apprentice-elec-scottdale-ies-id-br4298";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-scottsdale-ies-id-br7593.md": {
	id: "apprentice-elec-scottsdale-ies-id-br7593.md";
  slug: "apprentice-elec-scottsdale-ies-id-br7593";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-elec-universal-prime-id-hf8291.md": {
	id: "apprentice-elec-universal-prime-id-hf8291.md";
  slug: "apprentice-elec-universal-prime-id-hf8291";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-alpharetta-appr-d24g5b.md": {
	id: "apprentice-electrician-alpharetta-appr-d24g5b.md";
  slug: "apprentice-electrician-alpharetta-appr-d24g5b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-anaheim-appr-1dlu0v.md": {
	id: "apprentice-electrician-anaheim-appr-1dlu0v.md";
  slug: "apprentice-electrician-anaheim-appr-1dlu0v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-atlanta-appr-xttd80.md": {
	id: "apprentice-electrician-atlanta-appr-xttd80.md";
  slug: "apprentice-electrician-atlanta-appr-xttd80";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-berg-morgan-hill-id23121.md": {
	id: "apprentice-electrician-berg-morgan-hill-id23121.md";
  slug: "apprentice-electrician-berg-morgan-hill-id23121";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-berg-sf-id-fg212.md": {
	id: "apprentice-electrician-berg-sf-id-fg212.md";
  slug: "apprentice-electrician-berg-sf-id-fg212";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-berkeley-appr-6uix1q.md": {
	id: "apprentice-electrician-berkeley-appr-6uix1q.md";
  slug: "apprentice-electrician-berkeley-appr-6uix1q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-burbank-appr-kb0qcg.md": {
	id: "apprentice-electrician-burbank-appr-kb0qcg.md";
  slug: "apprentice-electrician-burbank-appr-kb0qcg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-cupertino-appr-qfqtd3.md": {
	id: "apprentice-electrician-cupertino-appr-qfqtd3.md";
  slug: "apprentice-electrician-cupertino-appr-qfqtd3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-fremont-appr-y95isl.md": {
	id: "apprentice-electrician-fremont-appr-y95isl.md";
  slug: "apprentice-electrician-fremont-appr-y95isl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-glendale-appr-tj7w7v.md": {
	id: "apprentice-electrician-glendale-appr-tj7w7v.md";
  slug: "apprentice-electrician-glendale-appr-tj7w7v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-helix-sj-id-fh213.md": {
	id: "apprentice-electrician-helix-sj-id-fh213.md";
  slug: "apprentice-electrician-helix-sj-id-fh213";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-irvine-appr-b7vfp9.md": {
	id: "apprentice-electrician-irvine-appr-b7vfp9.md";
  slug: "apprentice-electrician-irvine-appr-b7vfp9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-irvine-id-wi3092.md": {
	id: "apprentice-electrician-irvine-id-wi3092.md";
  slug: "apprentice-electrician-irvine-id-wi3092";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-la-id-ek23940.md": {
	id: "apprentice-electrician-la-id-ek23940.md";
  slug: "apprentice-electrician-la-id-ek23940";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-long beach-appr-o47arm.md": {
	id: "apprentice-electrician-long beach-appr-o47arm.md";
  slug: "apprentice-electrician-long-beach-appr-o47arm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-los angeles-appr-ys50uh.md": {
	id: "apprentice-electrician-los angeles-appr-ys50uh.md";
  slug: "apprentice-electrician-los-angeles-appr-ys50uh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-marietta-appr-z8ko6q.md": {
	id: "apprentice-electrician-marietta-appr-z8ko6q.md";
  slug: "apprentice-electrician-marietta-appr-z8ko6q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-mountain view-appr-vkhhz3.md": {
	id: "apprentice-electrician-mountain view-appr-vkhhz3.md";
  slug: "apprentice-electrician-mountain-view-appr-vkhhz3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-oakland-appr-f3f24e.md": {
	id: "apprentice-electrician-oakland-appr-f3f24e.md";
  slug: "apprentice-electrician-oakland-appr-f3f24e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-oceanside-id-ms8293.md": {
	id: "apprentice-electrician-oceanside-id-ms8293.md";
  slug: "apprentice-electrician-oceanside-id-ms8293";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-palo alto-appr-je24e5.md": {
	id: "apprentice-electrician-palo alto-appr-je24e5.md";
  slug: "apprentice-electrician-palo-alto-appr-je24e5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-pasadena-appr-wdnti6.md": {
	id: "apprentice-electrician-pasadena-appr-wdnti6.md";
  slug: "apprentice-electrician-pasadena-appr-wdnti6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-phoenix-id-3mw8301.md": {
	id: "apprentice-electrician-phoenix-id-3mw8301.md";
  slug: "apprentice-electrician-phoenix-id-3mw8301";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-roswell-appr-p74ezs.md": {
	id: "apprentice-electrician-roswell-appr-p74ezs.md";
  slug: "apprentice-electrician-roswell-appr-p74ezs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-sacramento-appr-txejdr.md": {
	id: "apprentice-electrician-sacramento-appr-txejdr.md";
  slug: "apprentice-electrician-sacramento-appr-txejdr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-san diego-appr-4xq8cz.md": {
	id: "apprentice-electrician-san diego-appr-4xq8cz.md";
  slug: "apprentice-electrician-san-diego-appr-4xq8cz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-san francisco-appr-ft3m6x.md": {
	id: "apprentice-electrician-san francisco-appr-ft3m6x.md";
  slug: "apprentice-electrician-san-francisco-appr-ft3m6x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-san jose-appr-7r2zc2.md": {
	id: "apprentice-electrician-san jose-appr-7r2zc2.md";
  slug: "apprentice-electrician-san-jose-appr-7r2zc2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-sandy springs-appr-dpocsj.md": {
	id: "apprentice-electrician-sandy springs-appr-dpocsj.md";
  slug: "apprentice-electrician-sandy-springs-appr-dpocsj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-santa clara-appr-1vb31y.md": {
	id: "apprentice-electrician-santa clara-appr-1vb31y.md";
  slug: "apprentice-electrician-santa-clara-appr-1vb31y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-santa monica-appr-4aotfk.md": {
	id: "apprentice-electrician-santa monica-appr-4aotfk.md";
  slug: "apprentice-electrician-santa-monica-appr-4aotfk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"apprentice-electrician-sunnyvale-appr-jlqgqq.md": {
	id: "apprentice-electrician-sunnyvale-appr-jlqgqq.md";
  slug: "apprentice-electrician-sunnyvale-appr-jlqgqq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-encore-aurora-id-bz1188.md": {
	id: "cable-tech-encore-aurora-id-bz1188.md";
  slug: "cable-tech-encore-aurora-id-bz1188";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-encore-boulder-id-by7741.md": {
	id: "cable-tech-encore-boulder-id-by7741.md";
  slug: "cable-tech-encore-boulder-id-by7741";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-la-kane-id-jg3892.md": {
	id: "cable-tech-la-kane-id-jg3892.md";
  slug: "cable-tech-la-kane-id-jg3892";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-mmr-athens-id-bf8923.md": {
	id: "cable-tech-mmr-athens-id-bf8923.md";
  slug: "cable-tech-mmr-athens-id-bf8923";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-mmr-marietta-id-bf7928.md": {
	id: "cable-tech-mmr-marietta-id-bf7928.md";
  slug: "cable-tech-mmr-marietta-id-bf7928";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-mmr-raleigh-id-bf7877.md": {
	id: "cable-tech-mmr-raleigh-id-bf7877.md";
  slug: "cable-tech-mmr-raleigh-id-bf7877";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-sd-kane-id-gj3423.md": {
	id: "cable-tech-sd-kane-id-gj3423.md";
  slug: "cable-tech-sd-kane-id-gj3423";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-tech-sf-kane-id-jf3322.md": {
	id: "cable-tech-sf-kane-id-jf3322.md";
  slug: "cable-tech-sf-kane-id-jf3322";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"cable-technician-columbia-md-id-fds43.md": {
	id: "cable-technician-columbia-md-id-fds43.md";
  slug: "cable-technician-columbia-md-id-fds43";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-alpharetta-comm-lr1rtm.md": {
	id: "commercial-journeyman-electrician-alpharetta-comm-lr1rtm.md";
  slug: "commercial-journeyman-electrician-alpharetta-comm-lr1rtm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-anaheim-comm-7hxhf1.md": {
	id: "commercial-journeyman-electrician-anaheim-comm-7hxhf1.md";
  slug: "commercial-journeyman-electrician-anaheim-comm-7hxhf1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-atlanta-comm-9hg6ru.md": {
	id: "commercial-journeyman-electrician-atlanta-comm-9hg6ru.md";
  slug: "commercial-journeyman-electrician-atlanta-comm-9hg6ru";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-berkeley-comm-e9p1bv.md": {
	id: "commercial-journeyman-electrician-berkeley-comm-e9p1bv.md";
  slug: "commercial-journeyman-electrician-berkeley-comm-e9p1bv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-burbank-comm-duwqk9.md": {
	id: "commercial-journeyman-electrician-burbank-comm-duwqk9.md";
  slug: "commercial-journeyman-electrician-burbank-comm-duwqk9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-cupertino-comm-rx7myn.md": {
	id: "commercial-journeyman-electrician-cupertino-comm-rx7myn.md";
  slug: "commercial-journeyman-electrician-cupertino-comm-rx7myn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-fremont-comm-qycvky.md": {
	id: "commercial-journeyman-electrician-fremont-comm-qycvky.md";
  slug: "commercial-journeyman-electrician-fremont-comm-qycvky";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-glendale-comm-xi1e1k.md": {
	id: "commercial-journeyman-electrician-glendale-comm-xi1e1k.md";
  slug: "commercial-journeyman-electrician-glendale-comm-xi1e1k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-irvine-comm-c46x4f.md": {
	id: "commercial-journeyman-electrician-irvine-comm-c46x4f.md";
  slug: "commercial-journeyman-electrician-irvine-comm-c46x4f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-long beach-comm-i7qr6i.md": {
	id: "commercial-journeyman-electrician-long beach-comm-i7qr6i.md";
  slug: "commercial-journeyman-electrician-long-beach-comm-i7qr6i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-los angeles-comm-02tri4.md": {
	id: "commercial-journeyman-electrician-los angeles-comm-02tri4.md";
  slug: "commercial-journeyman-electrician-los-angeles-comm-02tri4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-marietta-comm-ee453v.md": {
	id: "commercial-journeyman-electrician-marietta-comm-ee453v.md";
  slug: "commercial-journeyman-electrician-marietta-comm-ee453v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-mountain view-comm-nf9wjw.md": {
	id: "commercial-journeyman-electrician-mountain view-comm-nf9wjw.md";
  slug: "commercial-journeyman-electrician-mountain-view-comm-nf9wjw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-oakland-comm-zg2pdk.md": {
	id: "commercial-journeyman-electrician-oakland-comm-zg2pdk.md";
  slug: "commercial-journeyman-electrician-oakland-comm-zg2pdk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-palo alto-comm-owihv0.md": {
	id: "commercial-journeyman-electrician-palo alto-comm-owihv0.md";
  slug: "commercial-journeyman-electrician-palo-alto-comm-owihv0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-pasadena-comm-0zowho.md": {
	id: "commercial-journeyman-electrician-pasadena-comm-0zowho.md";
  slug: "commercial-journeyman-electrician-pasadena-comm-0zowho";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-roswell-comm-helr0n.md": {
	id: "commercial-journeyman-electrician-roswell-comm-helr0n.md";
  slug: "commercial-journeyman-electrician-roswell-comm-helr0n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sacramento-comm-9tfxpk.md": {
	id: "commercial-journeyman-electrician-sacramento-comm-9tfxpk.md";
  slug: "commercial-journeyman-electrician-sacramento-comm-9tfxpk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san diego-comm-q3n6ne.md": {
	id: "commercial-journeyman-electrician-san diego-comm-q3n6ne.md";
  slug: "commercial-journeyman-electrician-san-diego-comm-q3n6ne";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san francisco-comm-ur4rln.md": {
	id: "commercial-journeyman-electrician-san francisco-comm-ur4rln.md";
  slug: "commercial-journeyman-electrician-san-francisco-comm-ur4rln";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san jose-comm-6wge7s.md": {
	id: "commercial-journeyman-electrician-san jose-comm-6wge7s.md";
  slug: "commercial-journeyman-electrician-san-jose-comm-6wge7s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sandy springs-comm-hehasc.md": {
	id: "commercial-journeyman-electrician-sandy springs-comm-hehasc.md";
  slug: "commercial-journeyman-electrician-sandy-springs-comm-hehasc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-santa clara-comm-2iakbj.md": {
	id: "commercial-journeyman-electrician-santa clara-comm-2iakbj.md";
  slug: "commercial-journeyman-electrician-santa-clara-comm-2iakbj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-santa monica-comm-5mfjew.md": {
	id: "commercial-journeyman-electrician-santa monica-comm-5mfjew.md";
  slug: "commercial-journeyman-electrician-santa-monica-comm-5mfjew";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sunnyvale-comm-mqr65w.md": {
	id: "commercial-journeyman-electrician-sunnyvale-comm-mqr65w.md";
  slug: "commercial-journeyman-electrician-sunnyvale-comm-mqr65w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"electrician-premiere-roswell-id-be8942.md": {
	id: "electrician-premiere-roswell-id-be8942.md";
  slug: "electrician-premiere-roswell-id-be8942";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-designer-scottsdale-id-dfs321.md": {
	id: "fire-alarm-designer-scottsdale-id-dfs321.md";
  slug: "fire-alarm-designer-scottsdale-id-dfs321";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-installer-irvine-id-fsdf9.md": {
	id: "fire-alarm-installer-irvine-id-fsdf9.md";
  slug: "fire-alarm-installer-irvine-id-fsdf9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-tech-la-nexaus-id-ms-9302.md": {
	id: "fire-alarm-tech-la-nexaus-id-ms-9302.md";
  slug: "fire-alarm-tech-la-nexaus-id-ms-9302";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-tech-sf-id-mf0921.md": {
	id: "fire-alarm-tech-sf-id-mf0921.md";
  slug: "fire-alarm-tech-sf-id-mf0921";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-tech-sj-id-wk7740.md": {
	id: "fire-alarm-tech-sj-id-wk7740.md";
  slug: "fire-alarm-tech-sj-id-wk7740";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-alarm-technician-scottsdale-id-fds2.md": {
	id: "fire-alarm-technician-scottsdale-id-fds2.md";
  slug: "fire-alarm-technician-scottsdale-id-fds2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-sprinkler-designer-mesa-id-fds23.md": {
	id: "fire-sprinkler-designer-mesa-id-fds23.md";
  slug: "fire-sprinkler-designer-mesa-id-fds23";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-sprinkler-prime-scottsdale-id-bf9441.md": {
	id: "fire-sprinkler-prime-scottsdale-id-bf9441.md";
  slug: "fire-sprinkler-prime-scottsdale-id-bf9441";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"fire-technician-prime-tempe-id-bf9832.md": {
	id: "fire-technician-prime-tempe-id-bf9832.md";
  slug: "fire-technician-prime-tempe-id-bf9832";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-encore-boulder-id-jj3817.md": {
	id: "journeyman-elec-encore-boulder-id-jj3817.md";
  slug: "journeyman-elec-encore-boulder-id-jj3817";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-irvine-rexmoore-id-ne0294.md": {
	id: "journeyman-elec-irvine-rexmoore-id-ne0294.md";
  slug: "journeyman-elec-irvine-rexmoore-id-ne0294";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-la-rexmoore-id-id0288.md": {
	id: "journeyman-elec-la-rexmoore-id-id0288.md";
  slug: "journeyman-elec-la-rexmoore-id-id0288";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-longbeach-royal-id-bf7894.md": {
	id: "journeyman-elec-longbeach-royal-id-bf7894.md";
  slug: "journeyman-elec-longbeach-royal-id-bf7894";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-alpharetta-id-tt8976.md": {
	id: "journeyman-elec-premiere-alpharetta-id-tt8976.md";
  slug: "journeyman-elec-premiere-alpharetta-id-tt8976";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-ashville-id-bf2931.md": {
	id: "journeyman-elec-premiere-ashville-id-bf2931.md";
  slug: "journeyman-elec-premiere-ashville-id-bf2931";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-atlanta-id-bg3982.md": {
	id: "journeyman-elec-premiere-atlanta-id-bg3982.md";
  slug: "journeyman-elec-premiere-atlanta-id-bg3982";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-charleston-id-md2109.md": {
	id: "journeyman-elec-premiere-charleston-id-md2109.md";
  slug: "journeyman-elec-premiere-charleston-id-md2109";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-charlotte-id-ng8923.md": {
	id: "journeyman-elec-premiere-charlotte-id-ng8923.md";
  slug: "journeyman-elec-premiere-charlotte-id-ng8923";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-greensboro-id-ng8492.md": {
	id: "journeyman-elec-premiere-greensboro-id-ng8492.md";
  slug: "journeyman-elec-premiere-greensboro-id-ng8492";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-raleigh-id-mg8992.md": {
	id: "journeyman-elec-premiere-raleigh-id-mg8992.md";
  slug: "journeyman-elec-premiere-raleigh-id-mg8992";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-roswell-id-ba-0930.md": {
	id: "journeyman-elec-premiere-roswell-id-ba-0930.md";
  slug: "journeyman-elec-premiere-roswell-id-ba-0930";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-sandysprings-id-nr2128.md": {
	id: "journeyman-elec-premiere-sandysprings-id-nr2128.md";
  slug: "journeyman-elec-premiere-sandysprings-id-nr2128";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-premiere-spartansburg-id-nr9302.md": {
	id: "journeyman-elec-premiere-spartansburg-id-nr9302.md";
  slug: "journeyman-elec-premiere-spartansburg-id-nr9302";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-sacramento-royal-id-bf8492.md": {
	id: "journeyman-elec-sacramento-royal-id-bf8492.md";
  slug: "journeyman-elec-sacramento-royal-id-bf8492";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-sd-rexmoore-id-po2341.md": {
	id: "journeyman-elec-sd-rexmoore-id-po2341.md";
  slug: "journeyman-elec-sd-rexmoore-id-po2341";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-elec-torrance-royal-id-br0239.md": {
	id: "journeyman-elec-torrance-royal-id-br0239.md";
  slug: "journeyman-elec-torrance-royal-id-br0239";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"journeyman-electrician-resi-fsaf.md": {
	id: "journeyman-electrician-resi-fsaf.md";
  slug: "journeyman-electrician-resi-fsaf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lead-cable-tech-chantilly-id-fds24.md": {
	id: "lead-cable-tech-chantilly-id-fds24.md";
  slug: "lead-cable-tech-chantilly-id-fds24";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-alpharetta-fire-dkje2h.md": {
	id: "prime-fire-alarm-technician-alpharetta-fire-dkje2h.md";
  slug: "prime-fire-alarm-technician-alpharetta-fire-dkje2h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-anaheim-fire-02iats.md": {
	id: "prime-fire-alarm-technician-anaheim-fire-02iats.md";
  slug: "prime-fire-alarm-technician-anaheim-fire-02iats";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-atlanta-fire-n4hvho.md": {
	id: "prime-fire-alarm-technician-atlanta-fire-n4hvho.md";
  slug: "prime-fire-alarm-technician-atlanta-fire-n4hvho";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-berkeley-fire-jaarwc.md": {
	id: "prime-fire-alarm-technician-berkeley-fire-jaarwc.md";
  slug: "prime-fire-alarm-technician-berkeley-fire-jaarwc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-burbank-fire-sp4eba.md": {
	id: "prime-fire-alarm-technician-burbank-fire-sp4eba.md";
  slug: "prime-fire-alarm-technician-burbank-fire-sp4eba";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-cupertino-fire-9lgxnl.md": {
	id: "prime-fire-alarm-technician-cupertino-fire-9lgxnl.md";
  slug: "prime-fire-alarm-technician-cupertino-fire-9lgxnl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-fremont-fire-jfa3ml.md": {
	id: "prime-fire-alarm-technician-fremont-fire-jfa3ml.md";
  slug: "prime-fire-alarm-technician-fremont-fire-jfa3ml";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-glendale-fire-qv88ri.md": {
	id: "prime-fire-alarm-technician-glendale-fire-qv88ri.md";
  slug: "prime-fire-alarm-technician-glendale-fire-qv88ri";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-irvine-fire-gg6oxo.md": {
	id: "prime-fire-alarm-technician-irvine-fire-gg6oxo.md";
  slug: "prime-fire-alarm-technician-irvine-fire-gg6oxo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-long beach-fire-2grrzr.md": {
	id: "prime-fire-alarm-technician-long beach-fire-2grrzr.md";
  slug: "prime-fire-alarm-technician-long-beach-fire-2grrzr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-los angeles-fire-o0llwi.md": {
	id: "prime-fire-alarm-technician-los angeles-fire-o0llwi.md";
  slug: "prime-fire-alarm-technician-los-angeles-fire-o0llwi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-marietta-fire-pvp13v.md": {
	id: "prime-fire-alarm-technician-marietta-fire-pvp13v.md";
  slug: "prime-fire-alarm-technician-marietta-fire-pvp13v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-mountain view-fire-b486ec.md": {
	id: "prime-fire-alarm-technician-mountain view-fire-b486ec.md";
  slug: "prime-fire-alarm-technician-mountain-view-fire-b486ec";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-oakland-fire-ghmkid.md": {
	id: "prime-fire-alarm-technician-oakland-fire-ghmkid.md";
  slug: "prime-fire-alarm-technician-oakland-fire-ghmkid";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-palo alto-fire-dvumfw.md": {
	id: "prime-fire-alarm-technician-palo alto-fire-dvumfw.md";
  slug: "prime-fire-alarm-technician-palo-alto-fire-dvumfw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-pasadena-fire-i29h1b.md": {
	id: "prime-fire-alarm-technician-pasadena-fire-i29h1b.md";
  slug: "prime-fire-alarm-technician-pasadena-fire-i29h1b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-roswell-fire-az1hqy.md": {
	id: "prime-fire-alarm-technician-roswell-fire-az1hqy.md";
  slug: "prime-fire-alarm-technician-roswell-fire-az1hqy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sacramento-fire-7paiit.md": {
	id: "prime-fire-alarm-technician-sacramento-fire-7paiit.md";
  slug: "prime-fire-alarm-technician-sacramento-fire-7paiit";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san diego-fire-e3ab3m.md": {
	id: "prime-fire-alarm-technician-san diego-fire-e3ab3m.md";
  slug: "prime-fire-alarm-technician-san-diego-fire-e3ab3m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san francisco-fire-wra0gw.md": {
	id: "prime-fire-alarm-technician-san francisco-fire-wra0gw.md";
  slug: "prime-fire-alarm-technician-san-francisco-fire-wra0gw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san jose-fire-lap070.md": {
	id: "prime-fire-alarm-technician-san jose-fire-lap070.md";
  slug: "prime-fire-alarm-technician-san-jose-fire-lap070";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sandy springs-fire-rsl73p.md": {
	id: "prime-fire-alarm-technician-sandy springs-fire-rsl73p.md";
  slug: "prime-fire-alarm-technician-sandy-springs-fire-rsl73p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-santa clara-fire-r76nqt.md": {
	id: "prime-fire-alarm-technician-santa clara-fire-r76nqt.md";
  slug: "prime-fire-alarm-technician-santa-clara-fire-r76nqt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-santa monica-fire-hkqgk1.md": {
	id: "prime-fire-alarm-technician-santa monica-fire-hkqgk1.md";
  slug: "prime-fire-alarm-technician-santa-monica-fire-hkqgk1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sunnyvale-fire-qgi6y1.md": {
	id: "prime-fire-alarm-technician-sunnyvale-fire-qgi6y1.md";
  slug: "prime-fire-alarm-technician-sunnyvale-fire-qgi6y1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-anaheim-jour-5hr310.md": {
	id: "prime-journeyman-electrician-anaheim-jour-5hr310.md";
  slug: "prime-journeyman-electrician-anaheim-jour-5hr310";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-avondale-jour-q8w0ic.md": {
	id: "prime-journeyman-electrician-avondale-jour-q8w0ic.md";
  slug: "prime-journeyman-electrician-avondale-jour-q8w0ic";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-bakersfield-jour-r3sj0g.md": {
	id: "prime-journeyman-electrician-bakersfield-jour-r3sj0g.md";
  slug: "prime-journeyman-electrician-bakersfield-jour-r3sj0g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-berkeley-jour-fowddi.md": {
	id: "prime-journeyman-electrician-berkeley-jour-fowddi.md";
  slug: "prime-journeyman-electrician-berkeley-jour-fowddi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-buckeye-jour-47ae4v.md": {
	id: "prime-journeyman-electrician-buckeye-jour-47ae4v.md";
  slug: "prime-journeyman-electrician-buckeye-jour-47ae4v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-burbank-jour-o8rmok.md": {
	id: "prime-journeyman-electrician-burbank-jour-o8rmok.md";
  slug: "prime-journeyman-electrician-burbank-jour-o8rmok";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-casa grande-jour-tr64pf.md": {
	id: "prime-journeyman-electrician-casa grande-jour-tr64pf.md";
  slug: "prime-journeyman-electrician-casa-grande-jour-tr64pf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chandler-jour-al0ztx.md": {
	id: "prime-journeyman-electrician-chandler-jour-al0ztx.md";
  slug: "prime-journeyman-electrician-chandler-jour-al0ztx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chandler-jour-uormtk.md": {
	id: "prime-journeyman-electrician-chandler-jour-uormtk.md";
  slug: "prime-journeyman-electrician-chandler-jour-uormtk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chula vista-jour-idwnpj.md": {
	id: "prime-journeyman-electrician-chula vista-jour-idwnpj.md";
  slug: "prime-journeyman-electrician-chula-vista-jour-idwnpj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-corona-jour-3ha6v9.md": {
	id: "prime-journeyman-electrician-corona-jour-3ha6v9.md";
  slug: "prime-journeyman-electrician-corona-jour-3ha6v9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-cupertino-jour-cvge8h.md": {
	id: "prime-journeyman-electrician-cupertino-jour-cvge8h.md";
  slug: "prime-journeyman-electrician-cupertino-jour-cvge8h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-elk grove-jour-56hpfe.md": {
	id: "prime-journeyman-electrician-elk grove-jour-56hpfe.md";
  slug: "prime-journeyman-electrician-elk-grove-jour-56hpfe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-escondido-jour-4qoumj.md": {
	id: "prime-journeyman-electrician-escondido-jour-4qoumj.md";
  slug: "prime-journeyman-electrician-escondido-jour-4qoumj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-flagstaff-jour-k4y473.md": {
	id: "prime-journeyman-electrician-flagstaff-jour-k4y473.md";
  slug: "prime-journeyman-electrician-flagstaff-jour-k4y473";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fontana-jour-7aj64o.md": {
	id: "prime-journeyman-electrician-fontana-jour-7aj64o.md";
  slug: "prime-journeyman-electrician-fontana-jour-7aj64o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fremont-jour-u1ryee.md": {
	id: "prime-journeyman-electrician-fremont-jour-u1ryee.md";
  slug: "prime-journeyman-electrician-fremont-jour-u1ryee";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fresno-jour-7rms4c.md": {
	id: "prime-journeyman-electrician-fresno-jour-7rms4c.md";
  slug: "prime-journeyman-electrician-fresno-jour-7rms4c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fullerton-jour-6na9iw.md": {
	id: "prime-journeyman-electrician-fullerton-jour-6na9iw.md";
  slug: "prime-journeyman-electrician-fullerton-jour-6na9iw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-garden grove-jour-a8qzot.md": {
	id: "prime-journeyman-electrician-garden grove-jour-a8qzot.md";
  slug: "prime-journeyman-electrician-garden-grove-jour-a8qzot";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-gilbert-jour-3f60om.md": {
	id: "prime-journeyman-electrician-gilbert-jour-3f60om.md";
  slug: "prime-journeyman-electrician-gilbert-jour-3f60om";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-gilbert-jour-y7gxbf.md": {
	id: "prime-journeyman-electrician-gilbert-jour-y7gxbf.md";
  slug: "prime-journeyman-electrician-gilbert-jour-y7gxbf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-4s4qra.md": {
	id: "prime-journeyman-electrician-glendale-jour-4s4qra.md";
  slug: "prime-journeyman-electrician-glendale-jour-4s4qra";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-9tffnl.md": {
	id: "prime-journeyman-electrician-glendale-jour-9tffnl.md";
  slug: "prime-journeyman-electrician-glendale-jour-9tffnl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-s3mw44.md": {
	id: "prime-journeyman-electrician-glendale-jour-s3mw44.md";
  slug: "prime-journeyman-electrician-glendale-jour-s3mw44";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-goodyear-jour-0kbi3w.md": {
	id: "prime-journeyman-electrician-goodyear-jour-0kbi3w.md";
  slug: "prime-journeyman-electrician-goodyear-jour-0kbi3w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-hayward-jour-23hvtr.md": {
	id: "prime-journeyman-electrician-hayward-jour-23hvtr.md";
  slug: "prime-journeyman-electrician-hayward-jour-23hvtr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-huntington beach-jour-60qwig.md": {
	id: "prime-journeyman-electrician-huntington beach-jour-60qwig.md";
  slug: "prime-journeyman-electrician-huntington-beach-jour-60qwig";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-irvine-jour-9o5rpa.md": {
	id: "prime-journeyman-electrician-irvine-jour-9o5rpa.md";
  slug: "prime-journeyman-electrician-irvine-jour-9o5rpa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-lake havasu city-jour-ueyabi.md": {
	id: "prime-journeyman-electrician-lake havasu city-jour-ueyabi.md";
  slug: "prime-journeyman-electrician-lake-havasu-city-jour-ueyabi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-lancaster-jour-9zqaoj.md": {
	id: "prime-journeyman-electrician-lancaster-jour-9zqaoj.md";
  slug: "prime-journeyman-electrician-lancaster-jour-9zqaoj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-long beach-jour-6igal0.md": {
	id: "prime-journeyman-electrician-long beach-jour-6igal0.md";
  slug: "prime-journeyman-electrician-long-beach-jour-6igal0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-los angeles-jour-ur64ta.md": {
	id: "prime-journeyman-electrician-los angeles-jour-ur64ta.md";
  slug: "prime-journeyman-electrician-los-angeles-jour-ur64ta";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-maricopa-jour-mcwfae.md": {
	id: "prime-journeyman-electrician-maricopa-jour-mcwfae.md";
  slug: "prime-journeyman-electrician-maricopa-jour-mcwfae";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mesa-jour-2e3nvw.md": {
	id: "prime-journeyman-electrician-mesa-jour-2e3nvw.md";
  slug: "prime-journeyman-electrician-mesa-jour-2e3nvw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mesa-jour-ggyx8a.md": {
	id: "prime-journeyman-electrician-mesa-jour-ggyx8a.md";
  slug: "prime-journeyman-electrician-mesa-jour-ggyx8a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-modesto-jour-uwjtu7.md": {
	id: "prime-journeyman-electrician-modesto-jour-uwjtu7.md";
  slug: "prime-journeyman-electrician-modesto-jour-uwjtu7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-moreno valley-jour-etakj9.md": {
	id: "prime-journeyman-electrician-moreno valley-jour-etakj9.md";
  slug: "prime-journeyman-electrician-moreno-valley-jour-etakj9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mountain view-jour-98wt4o.md": {
	id: "prime-journeyman-electrician-mountain view-jour-98wt4o.md";
  slug: "prime-journeyman-electrician-mountain-view-jour-98wt4o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oakland-jour-p7cw14.md": {
	id: "prime-journeyman-electrician-oakland-jour-p7cw14.md";
  slug: "prime-journeyman-electrician-oakland-jour-p7cw14";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oceanside-jour-j09ils.md": {
	id: "prime-journeyman-electrician-oceanside-jour-j09ils.md";
  slug: "prime-journeyman-electrician-oceanside-jour-j09ils";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-ontario-jour-pj74bt.md": {
	id: "prime-journeyman-electrician-ontario-jour-pj74bt.md";
  slug: "prime-journeyman-electrician-ontario-jour-pj74bt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oro valley-jour-ri8gwl.md": {
	id: "prime-journeyman-electrician-oro valley-jour-ri8gwl.md";
  slug: "prime-journeyman-electrician-oro-valley-jour-ri8gwl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oxnard-jour-hsan9j.md": {
	id: "prime-journeyman-electrician-oxnard-jour-hsan9j.md";
  slug: "prime-journeyman-electrician-oxnard-jour-hsan9j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-palmdale-jour-el6qsn.md": {
	id: "prime-journeyman-electrician-palmdale-jour-el6qsn.md";
  slug: "prime-journeyman-electrician-palmdale-jour-el6qsn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-palo alto-jour-aeeiih.md": {
	id: "prime-journeyman-electrician-palo alto-jour-aeeiih.md";
  slug: "prime-journeyman-electrician-palo-alto-jour-aeeiih";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-pasadena-jour-wt6p2e.md": {
	id: "prime-journeyman-electrician-pasadena-jour-wt6p2e.md";
  slug: "prime-journeyman-electrician-pasadena-jour-wt6p2e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-peoria-jour-knp3at.md": {
	id: "prime-journeyman-electrician-peoria-jour-knp3at.md";
  slug: "prime-journeyman-electrician-peoria-jour-knp3at";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-peoria-jour-ytj9gr.md": {
	id: "prime-journeyman-electrician-peoria-jour-ytj9gr.md";
  slug: "prime-journeyman-electrician-peoria-jour-ytj9gr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-phoenix-jour-7oq5ye.md": {
	id: "prime-journeyman-electrician-phoenix-jour-7oq5ye.md";
  slug: "prime-journeyman-electrician-phoenix-jour-7oq5ye";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-phoenix-jour-a2796g.md": {
	id: "prime-journeyman-electrician-phoenix-jour-a2796g.md";
  slug: "prime-journeyman-electrician-phoenix-jour-a2796g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-pomona-jour-i66qo1.md": {
	id: "prime-journeyman-electrician-pomona-jour-i66qo1.md";
  slug: "prime-journeyman-electrician-pomona-jour-i66qo1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-rancho cucamonga-jour-ldi3pq.md": {
	id: "prime-journeyman-electrician-rancho cucamonga-jour-ldi3pq.md";
  slug: "prime-journeyman-electrician-rancho-cucamonga-jour-ldi3pq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-riverside-jour-kd2x8c.md": {
	id: "prime-journeyman-electrician-riverside-jour-kd2x8c.md";
  slug: "prime-journeyman-electrician-riverside-jour-kd2x8c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-roseville-jour-vs9gh3.md": {
	id: "prime-journeyman-electrician-roseville-jour-vs9gh3.md";
  slug: "prime-journeyman-electrician-roseville-jour-vs9gh3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sacramento-jour-r5pf14.md": {
	id: "prime-journeyman-electrician-sacramento-jour-r5pf14.md";
  slug: "prime-journeyman-electrician-sacramento-jour-r5pf14";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-salinas-jour-k1ikse.md": {
	id: "prime-journeyman-electrician-salinas-jour-k1ikse.md";
  slug: "prime-journeyman-electrician-salinas-jour-k1ikse";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san bernardino-jour-806602.md": {
	id: "prime-journeyman-electrician-san bernardino-jour-806602.md";
  slug: "prime-journeyman-electrician-san-bernardino-jour-806602";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san diego-jour-wcztkm.md": {
	id: "prime-journeyman-electrician-san diego-jour-wcztkm.md";
  slug: "prime-journeyman-electrician-san-diego-jour-wcztkm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san francisco-jour-cth3jw.md": {
	id: "prime-journeyman-electrician-san francisco-jour-cth3jw.md";
  slug: "prime-journeyman-electrician-san-francisco-jour-cth3jw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san jose-jour-s7venp.md": {
	id: "prime-journeyman-electrician-san jose-jour-s7venp.md";
  slug: "prime-journeyman-electrician-san-jose-jour-s7venp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa ana-jour-g2n6ux.md": {
	id: "prime-journeyman-electrician-santa ana-jour-g2n6ux.md";
  slug: "prime-journeyman-electrician-santa-ana-jour-g2n6ux";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa clara-jour-8o18cz.md": {
	id: "prime-journeyman-electrician-santa clara-jour-8o18cz.md";
  slug: "prime-journeyman-electrician-santa-clara-jour-8o18cz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa monica-jour-v3ig10.md": {
	id: "prime-journeyman-electrician-santa monica-jour-v3ig10.md";
  slug: "prime-journeyman-electrician-santa-monica-jour-v3ig10";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa rosa-jour-ik2anl.md": {
	id: "prime-journeyman-electrician-santa rosa-jour-ik2anl.md";
  slug: "prime-journeyman-electrician-santa-rosa-jour-ik2anl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-scottsdale-jour-2vaysk.md": {
	id: "prime-journeyman-electrician-scottsdale-jour-2vaysk.md";
  slug: "prime-journeyman-electrician-scottsdale-jour-2vaysk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-scottsdale-jour-8mn46l.md": {
	id: "prime-journeyman-electrician-scottsdale-jour-8mn46l.md";
  slug: "prime-journeyman-electrician-scottsdale-jour-8mn46l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sierra vista-jour-nbskg2.md": {
	id: "prime-journeyman-electrician-sierra vista-jour-nbskg2.md";
  slug: "prime-journeyman-electrician-sierra-vista-jour-nbskg2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-stockton-jour-2rp8xu.md": {
	id: "prime-journeyman-electrician-stockton-jour-2rp8xu.md";
  slug: "prime-journeyman-electrician-stockton-jour-2rp8xu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sunnyvale-jour-4wif91.md": {
	id: "prime-journeyman-electrician-sunnyvale-jour-4wif91.md";
  slug: "prime-journeyman-electrician-sunnyvale-jour-4wif91";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sunnyvale-jour-r0bwad.md": {
	id: "prime-journeyman-electrician-sunnyvale-jour-r0bwad.md";
  slug: "prime-journeyman-electrician-sunnyvale-jour-r0bwad";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-surprise-jour-60kwl1.md": {
	id: "prime-journeyman-electrician-surprise-jour-60kwl1.md";
  slug: "prime-journeyman-electrician-surprise-jour-60kwl1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tempe-jour-a8grcl.md": {
	id: "prime-journeyman-electrician-tempe-jour-a8grcl.md";
  slug: "prime-journeyman-electrician-tempe-jour-a8grcl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tempe-jour-t6jl8n.md": {
	id: "prime-journeyman-electrician-tempe-jour-t6jl8n.md";
  slug: "prime-journeyman-electrician-tempe-jour-t6jl8n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-torrance-jour-bh5p59.md": {
	id: "prime-journeyman-electrician-torrance-jour-bh5p59.md";
  slug: "prime-journeyman-electrician-torrance-jour-bh5p59";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tucson-jour-moap35.md": {
	id: "prime-journeyman-electrician-tucson-jour-moap35.md";
  slug: "prime-journeyman-electrician-tucson-jour-moap35";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-visalia-jour-vrc8xz.md": {
	id: "prime-journeyman-electrician-visalia-jour-vrc8xz.md";
  slug: "prime-journeyman-electrician-visalia-jour-vrc8xz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-journeyman-electrician-yuma-jour-r4nbgs.md": {
	id: "prime-journeyman-electrician-yuma-jour-r4nbgs.md";
  slug: "prime-journeyman-electrician-yuma-jour-r4nbgs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-anaheim-voic-5us0c6.md": {
	id: "prime-voice-&-data-technician-anaheim-voic-5us0c6.md";
  slug: "prime-voice--data-technician-anaheim-voic-5us0c6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-avondale-voic-q6ydj8.md": {
	id: "prime-voice-&-data-technician-avondale-voic-q6ydj8.md";
  slug: "prime-voice--data-technician-avondale-voic-q6ydj8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-bakersfield-voic-tidwg0.md": {
	id: "prime-voice-&-data-technician-bakersfield-voic-tidwg0.md";
  slug: "prime-voice--data-technician-bakersfield-voic-tidwg0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-berkeley-voic-lil41e.md": {
	id: "prime-voice-&-data-technician-berkeley-voic-lil41e.md";
  slug: "prime-voice--data-technician-berkeley-voic-lil41e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-buckeye-voic-7uuvq6.md": {
	id: "prime-voice-&-data-technician-buckeye-voic-7uuvq6.md";
  slug: "prime-voice--data-technician-buckeye-voic-7uuvq6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-burbank-voic-ljp9tf.md": {
	id: "prime-voice-&-data-technician-burbank-voic-ljp9tf.md";
  slug: "prime-voice--data-technician-burbank-voic-ljp9tf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-casa grande-voic-mbdy6v.md": {
	id: "prime-voice-&-data-technician-casa grande-voic-mbdy6v.md";
  slug: "prime-voice--data-technician-casa-grande-voic-mbdy6v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chandler-voic-fv6uk5.md": {
	id: "prime-voice-&-data-technician-chandler-voic-fv6uk5.md";
  slug: "prime-voice--data-technician-chandler-voic-fv6uk5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chandler-voic-zyvvow.md": {
	id: "prime-voice-&-data-technician-chandler-voic-zyvvow.md";
  slug: "prime-voice--data-technician-chandler-voic-zyvvow";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chula vista-voic-d1dpuo.md": {
	id: "prime-voice-&-data-technician-chula vista-voic-d1dpuo.md";
  slug: "prime-voice--data-technician-chula-vista-voic-d1dpuo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-corona-voic-nvxe9a.md": {
	id: "prime-voice-&-data-technician-corona-voic-nvxe9a.md";
  slug: "prime-voice--data-technician-corona-voic-nvxe9a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-cupertino-voic-0ok45l.md": {
	id: "prime-voice-&-data-technician-cupertino-voic-0ok45l.md";
  slug: "prime-voice--data-technician-cupertino-voic-0ok45l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-elk grove-voic-4xca36.md": {
	id: "prime-voice-&-data-technician-elk grove-voic-4xca36.md";
  slug: "prime-voice--data-technician-elk-grove-voic-4xca36";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-escondido-voic-72u7xt.md": {
	id: "prime-voice-&-data-technician-escondido-voic-72u7xt.md";
  slug: "prime-voice--data-technician-escondido-voic-72u7xt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-flagstaff-voic-ueyynn.md": {
	id: "prime-voice-&-data-technician-flagstaff-voic-ueyynn.md";
  slug: "prime-voice--data-technician-flagstaff-voic-ueyynn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fontana-voic-capom0.md": {
	id: "prime-voice-&-data-technician-fontana-voic-capom0.md";
  slug: "prime-voice--data-technician-fontana-voic-capom0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fremont-voic-lp8wjj.md": {
	id: "prime-voice-&-data-technician-fremont-voic-lp8wjj.md";
  slug: "prime-voice--data-technician-fremont-voic-lp8wjj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fresno-voic-rgi5p5.md": {
	id: "prime-voice-&-data-technician-fresno-voic-rgi5p5.md";
  slug: "prime-voice--data-technician-fresno-voic-rgi5p5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fullerton-voic-6b7luy.md": {
	id: "prime-voice-&-data-technician-fullerton-voic-6b7luy.md";
  slug: "prime-voice--data-technician-fullerton-voic-6b7luy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-garden grove-voic-wtmjps.md": {
	id: "prime-voice-&-data-technician-garden grove-voic-wtmjps.md";
  slug: "prime-voice--data-technician-garden-grove-voic-wtmjps";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-gilbert-voic-fhzhb3.md": {
	id: "prime-voice-&-data-technician-gilbert-voic-fhzhb3.md";
  slug: "prime-voice--data-technician-gilbert-voic-fhzhb3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-gilbert-voic-wenbtx.md": {
	id: "prime-voice-&-data-technician-gilbert-voic-wenbtx.md";
  slug: "prime-voice--data-technician-gilbert-voic-wenbtx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-3mnef6.md": {
	id: "prime-voice-&-data-technician-glendale-voic-3mnef6.md";
  slug: "prime-voice--data-technician-glendale-voic-3mnef6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-4wvlxo.md": {
	id: "prime-voice-&-data-technician-glendale-voic-4wvlxo.md";
  slug: "prime-voice--data-technician-glendale-voic-4wvlxo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-hhfc5e.md": {
	id: "prime-voice-&-data-technician-glendale-voic-hhfc5e.md";
  slug: "prime-voice--data-technician-glendale-voic-hhfc5e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-goodyear-voic-xarx7n.md": {
	id: "prime-voice-&-data-technician-goodyear-voic-xarx7n.md";
  slug: "prime-voice--data-technician-goodyear-voic-xarx7n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-hayward-voic-sqsjuc.md": {
	id: "prime-voice-&-data-technician-hayward-voic-sqsjuc.md";
  slug: "prime-voice--data-technician-hayward-voic-sqsjuc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-huntington beach-voic-3c3vlb.md": {
	id: "prime-voice-&-data-technician-huntington beach-voic-3c3vlb.md";
  slug: "prime-voice--data-technician-huntington-beach-voic-3c3vlb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-irvine-voic-5jhsbk.md": {
	id: "prime-voice-&-data-technician-irvine-voic-5jhsbk.md";
  slug: "prime-voice--data-technician-irvine-voic-5jhsbk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-lake havasu city-voic-4x63ni.md": {
	id: "prime-voice-&-data-technician-lake havasu city-voic-4x63ni.md";
  slug: "prime-voice--data-technician-lake-havasu-city-voic-4x63ni";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-lancaster-voic-2o5zns.md": {
	id: "prime-voice-&-data-technician-lancaster-voic-2o5zns.md";
  slug: "prime-voice--data-technician-lancaster-voic-2o5zns";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-long beach-voic-dvhy1c.md": {
	id: "prime-voice-&-data-technician-long beach-voic-dvhy1c.md";
  slug: "prime-voice--data-technician-long-beach-voic-dvhy1c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-los angeles-voic-2v24xr.md": {
	id: "prime-voice-&-data-technician-los angeles-voic-2v24xr.md";
  slug: "prime-voice--data-technician-los-angeles-voic-2v24xr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-maricopa-voic-ct81zh.md": {
	id: "prime-voice-&-data-technician-maricopa-voic-ct81zh.md";
  slug: "prime-voice--data-technician-maricopa-voic-ct81zh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mesa-voic-59pdd9.md": {
	id: "prime-voice-&-data-technician-mesa-voic-59pdd9.md";
  slug: "prime-voice--data-technician-mesa-voic-59pdd9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mesa-voic-tf052v.md": {
	id: "prime-voice-&-data-technician-mesa-voic-tf052v.md";
  slug: "prime-voice--data-technician-mesa-voic-tf052v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-modesto-voic-gjt5b7.md": {
	id: "prime-voice-&-data-technician-modesto-voic-gjt5b7.md";
  slug: "prime-voice--data-technician-modesto-voic-gjt5b7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-moreno valley-voic-a6ff5j.md": {
	id: "prime-voice-&-data-technician-moreno valley-voic-a6ff5j.md";
  slug: "prime-voice--data-technician-moreno-valley-voic-a6ff5j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mountain view-voic-yfan72.md": {
	id: "prime-voice-&-data-technician-mountain view-voic-yfan72.md";
  slug: "prime-voice--data-technician-mountain-view-voic-yfan72";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oakland-voic-wlyh8o.md": {
	id: "prime-voice-&-data-technician-oakland-voic-wlyh8o.md";
  slug: "prime-voice--data-technician-oakland-voic-wlyh8o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oceanside-voic-jc5r8b.md": {
	id: "prime-voice-&-data-technician-oceanside-voic-jc5r8b.md";
  slug: "prime-voice--data-technician-oceanside-voic-jc5r8b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-ontario-voic-wmoixr.md": {
	id: "prime-voice-&-data-technician-ontario-voic-wmoixr.md";
  slug: "prime-voice--data-technician-ontario-voic-wmoixr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oro valley-voic-16i6f5.md": {
	id: "prime-voice-&-data-technician-oro valley-voic-16i6f5.md";
  slug: "prime-voice--data-technician-oro-valley-voic-16i6f5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oxnard-voic-s7klx6.md": {
	id: "prime-voice-&-data-technician-oxnard-voic-s7klx6.md";
  slug: "prime-voice--data-technician-oxnard-voic-s7klx6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-palmdale-voic-3r7bxy.md": {
	id: "prime-voice-&-data-technician-palmdale-voic-3r7bxy.md";
  slug: "prime-voice--data-technician-palmdale-voic-3r7bxy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-palo alto-voic-uewvu4.md": {
	id: "prime-voice-&-data-technician-palo alto-voic-uewvu4.md";
  slug: "prime-voice--data-technician-palo-alto-voic-uewvu4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-pasadena-voic-n52kcg.md": {
	id: "prime-voice-&-data-technician-pasadena-voic-n52kcg.md";
  slug: "prime-voice--data-technician-pasadena-voic-n52kcg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-peoria-voic-3981io.md": {
	id: "prime-voice-&-data-technician-peoria-voic-3981io.md";
  slug: "prime-voice--data-technician-peoria-voic-3981io";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-peoria-voic-cnunci.md": {
	id: "prime-voice-&-data-technician-peoria-voic-cnunci.md";
  slug: "prime-voice--data-technician-peoria-voic-cnunci";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-phoenix-voic-j6dk1i.md": {
	id: "prime-voice-&-data-technician-phoenix-voic-j6dk1i.md";
  slug: "prime-voice--data-technician-phoenix-voic-j6dk1i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-phoenix-voic-zxnffn.md": {
	id: "prime-voice-&-data-technician-phoenix-voic-zxnffn.md";
  slug: "prime-voice--data-technician-phoenix-voic-zxnffn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-pomona-voic-1octzk.md": {
	id: "prime-voice-&-data-technician-pomona-voic-1octzk.md";
  slug: "prime-voice--data-technician-pomona-voic-1octzk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-rancho cucamonga-voic-javlok.md": {
	id: "prime-voice-&-data-technician-rancho cucamonga-voic-javlok.md";
  slug: "prime-voice--data-technician-rancho-cucamonga-voic-javlok";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-riverside-voic-5a6a84.md": {
	id: "prime-voice-&-data-technician-riverside-voic-5a6a84.md";
  slug: "prime-voice--data-technician-riverside-voic-5a6a84";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-roseville-voic-w85ett.md": {
	id: "prime-voice-&-data-technician-roseville-voic-w85ett.md";
  slug: "prime-voice--data-technician-roseville-voic-w85ett";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sacramento-voic-grl1ao.md": {
	id: "prime-voice-&-data-technician-sacramento-voic-grl1ao.md";
  slug: "prime-voice--data-technician-sacramento-voic-grl1ao";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-salinas-voic-hh2626.md": {
	id: "prime-voice-&-data-technician-salinas-voic-hh2626.md";
  slug: "prime-voice--data-technician-salinas-voic-hh2626";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san bernardino-voic-w09of5.md": {
	id: "prime-voice-&-data-technician-san bernardino-voic-w09of5.md";
  slug: "prime-voice--data-technician-san-bernardino-voic-w09of5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san diego-voic-rd83zl.md": {
	id: "prime-voice-&-data-technician-san diego-voic-rd83zl.md";
  slug: "prime-voice--data-technician-san-diego-voic-rd83zl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san francisco-voic-r6tk69.md": {
	id: "prime-voice-&-data-technician-san francisco-voic-r6tk69.md";
  slug: "prime-voice--data-technician-san-francisco-voic-r6tk69";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san jose-voic-cp9aa8.md": {
	id: "prime-voice-&-data-technician-san jose-voic-cp9aa8.md";
  slug: "prime-voice--data-technician-san-jose-voic-cp9aa8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa ana-voic-pde6tp.md": {
	id: "prime-voice-&-data-technician-santa ana-voic-pde6tp.md";
  slug: "prime-voice--data-technician-santa-ana-voic-pde6tp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa clara-voic-mxvbva.md": {
	id: "prime-voice-&-data-technician-santa clara-voic-mxvbva.md";
  slug: "prime-voice--data-technician-santa-clara-voic-mxvbva";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa monica-voic-82wfbg.md": {
	id: "prime-voice-&-data-technician-santa monica-voic-82wfbg.md";
  slug: "prime-voice--data-technician-santa-monica-voic-82wfbg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa rosa-voic-7vanfc.md": {
	id: "prime-voice-&-data-technician-santa rosa-voic-7vanfc.md";
  slug: "prime-voice--data-technician-santa-rosa-voic-7vanfc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-scottsdale-voic-2o35b6.md": {
	id: "prime-voice-&-data-technician-scottsdale-voic-2o35b6.md";
  slug: "prime-voice--data-technician-scottsdale-voic-2o35b6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-scottsdale-voic-ivvhps.md": {
	id: "prime-voice-&-data-technician-scottsdale-voic-ivvhps.md";
  slug: "prime-voice--data-technician-scottsdale-voic-ivvhps";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sierra vista-voic-329fbg.md": {
	id: "prime-voice-&-data-technician-sierra vista-voic-329fbg.md";
  slug: "prime-voice--data-technician-sierra-vista-voic-329fbg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-stockton-voic-ya718u.md": {
	id: "prime-voice-&-data-technician-stockton-voic-ya718u.md";
  slug: "prime-voice--data-technician-stockton-voic-ya718u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sunnyvale-voic-kekggk.md": {
	id: "prime-voice-&-data-technician-sunnyvale-voic-kekggk.md";
  slug: "prime-voice--data-technician-sunnyvale-voic-kekggk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sunnyvale-voic-z9e1st.md": {
	id: "prime-voice-&-data-technician-sunnyvale-voic-z9e1st.md";
  slug: "prime-voice--data-technician-sunnyvale-voic-z9e1st";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-surprise-voic-zq4h4w.md": {
	id: "prime-voice-&-data-technician-surprise-voic-zq4h4w.md";
  slug: "prime-voice--data-technician-surprise-voic-zq4h4w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tempe-voic-cdipp7.md": {
	id: "prime-voice-&-data-technician-tempe-voic-cdipp7.md";
  slug: "prime-voice--data-technician-tempe-voic-cdipp7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tempe-voic-or1iai.md": {
	id: "prime-voice-&-data-technician-tempe-voic-or1iai.md";
  slug: "prime-voice--data-technician-tempe-voic-or1iai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-torrance-voic-cyznlr.md": {
	id: "prime-voice-&-data-technician-torrance-voic-cyznlr.md";
  slug: "prime-voice--data-technician-torrance-voic-cyznlr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tucson-voic-a255tp.md": {
	id: "prime-voice-&-data-technician-tucson-voic-a255tp.md";
  slug: "prime-voice--data-technician-tucson-voic-a255tp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-visalia-voic-26nl7w.md": {
	id: "prime-voice-&-data-technician-visalia-voic-26nl7w.md";
  slug: "prime-voice--data-technician-visalia-voic-26nl7w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-yuma-voic-qn6x1x.md": {
	id: "prime-voice-&-data-technician-yuma-voic-qn6x1x.md";
  slug: "prime-voice--data-technician-yuma-voic-qn6x1x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"residential-journeyman-electrician-jrn-elec.md": {
	id: "residential-journeyman-electrician-jrn-elec.md";
  slug: "residential-journeyman-electrician-jrn-elec";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-dc-blackbox-id-bf9823.md": {
	id: "security-tech-dc-blackbox-id-bf9823.md";
  slug: "security-tech-dc-blackbox-id-bf9823";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-encore-denver-id-bw9920.md": {
	id: "security-tech-encore-denver-id-bw9920.md";
  slug: "security-tech-encore-denver-id-bw9920";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-glendale-blackbox-id-br8421.md": {
	id: "security-tech-glendale-blackbox-id-br8421.md";
  slug: "security-tech-glendale-blackbox-id-br8421";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-mmr-atlanta-id-bf8741.md": {
	id: "security-tech-mmr-atlanta-id-bf8741.md";
  slug: "security-tech-mmr-atlanta-id-bf8741";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-paloalto-blackbox-id-br8922.md": {
	id: "security-tech-paloalto-blackbox-id-br8922.md";
  slug: "security-tech-paloalto-blackbox-id-br8922";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-reston-id-df243.md": {
	id: "security-tech-reston-id-df243.md";
  slug: "security-tech-reston-id-df243";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-sd-blackbox-id-nf8229.md": {
	id: "security-tech-sd-blackbox-id-nf8229.md";
  slug: "security-tech-sd-blackbox-id-nf8229";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-sf-blackbox-id-br8429.md": {
	id: "security-tech-sf-blackbox-id-br8429.md";
  slug: "security-tech-sf-blackbox-id-br8429";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-tempe-blackbox-id-bf2422.md": {
	id: "security-tech-tempe-blackbox-id-bf2422.md";
  slug: "security-tech-tempe-blackbox-id-bf2422";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-tech-torrance-blackbox-id-br9842.md": {
	id: "security-tech-torrance-blackbox-id-br9842.md";
  slug: "security-tech-torrance-blackbox-id-br9842";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"security-technician-tempe-id-da2321.md": {
	id: "security-technician-tempe-id-da2321.md";
  slug: "security-technician-tempe-id-da2321";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"service-electrician-irvine-id-23452.md": {
	id: "service-electrician-irvine-id-23452.md";
  slug: "service-electrician-irvine-id-23452";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"voice-data-installer-fairfax-id-ds23.md": {
	id: "voice-data-installer-fairfax-id-ds23.md";
  slug: "voice-data-installer-fairfax-id-ds23";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
};
"posts": {
"Journeyman-Electrician-Job-Description.md": {
	id: "Journeyman-Electrician-Job-Description.md";
  slug: "journeyman-electrician-job-description";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apprentice-electrician-jobs.md": {
	id: "apprentice-electrician-jobs.md";
  slug: "apprentice-electrician-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"best-paying-electrician-jobs.md": {
	id: "best-paying-electrician-jobs.md";
  slug: "best-paying-electrician-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"electrician-job-outlook.md": {
	id: "electrician-job-outlook.md";
  slug: "electrician-job-outlook";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-find-electrician-jobs.md": {
	id: "how-to-find-electrician-jobs.md";
  slug: "how-to-find-electrician-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"journeyman-electrician-jobs.md": {
	id: "journeyman-electrician-jobs.md";
  slug: "journeyman-electrician-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"master-electrician-employment.md": {
	id: "master-electrician-employment.md";
  slug: "master-electrician-employment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"residential-electrician-careers.md": {
	id: "residential-electrician-careers.md";
  slug: "residential-electrician-careers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
