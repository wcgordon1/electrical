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
"avispl-av-technician-broomfield-av-t-46s0pf.md": {
	id: "avispl-av-technician-broomfield-av-t-46s0pf.md";
  slug: "avispl-av-technician-broomfield-av-t-46s0pf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-technician-chandler-av-t-4j45h3.md": {
	id: "avispl-av-technician-chandler-av-t-4j45h3.md";
  slug: "avispl-av-technician-chandler-av-t-4j45h3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-technician-culver-city-av-t-9cod56.md": {
	id: "avispl-av-technician-culver-city-av-t-9cod56.md";
  slug: "avispl-av-technician-culver-city-av-t-9cod56";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-technician-henderson-av-t-gtgxy5.md": {
	id: "avispl-av-technician-henderson-av-t-gtgxy5.md";
  slug: "avispl-av-technician-henderson-av-t-gtgxy5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-beaverton-cabl-40wo6g.md": {
	id: "avispl-cable-tech-lead-beaverton-cabl-40wo6g.md";
  slug: "avispl-cable-tech-lead-beaverton-cabl-40wo6g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-burlingame-cabl-en283u.md": {
	id: "avispl-cable-tech-lead-burlingame-cabl-en283u.md";
  slug: "avispl-cable-tech-lead-burlingame-cabl-en283u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-del-mar-cabl-cphycc.md": {
	id: "avispl-cable-tech-lead-del-mar-cabl-cphycc.md";
  slug: "avispl-cable-tech-lead-del-mar-cabl-cphycc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-gresham-cabl-zp9p4r.md": {
	id: "avispl-cable-tech-lead-gresham-cabl-zp9p4r.md";
  slug: "avispl-cable-tech-lead-gresham-cabl-zp9p4r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-lake-oswego-cabl-u2kulh.md": {
	id: "avispl-cable-tech-lead-lake-oswego-cabl-u2kulh.md";
  slug: "avispl-cable-tech-lead-lake-oswego-cabl-u2kulh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-mesa-cabl-bribo9.md": {
	id: "avispl-cable-tech-lead-mesa-cabl-bribo9.md";
  slug: "avispl-cable-tech-lead-mesa-cabl-bribo9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-millbrae-cabl-eud0aj.md": {
	id: "avispl-cable-tech-lead-millbrae-cabl-eud0aj.md";
  slug: "avispl-cable-tech-lead-millbrae-cabl-eud0aj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-tempe-cabl-54taog.md": {
	id: "avispl-cable-tech-lead-tempe-cabl-54taog.md";
  slug: "avispl-cable-tech-lead-tempe-cabl-54taog";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-commercial-project-manager-pacifica-comm-vw114m.md": {
	id: "avispl-commercial-project-manager-pacifica-comm-vw114m.md";
  slug: "avispl-commercial-project-manager-pacifica-comm-vw114m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu.md": {
	id: "avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu.md";
  slug: "avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx.md": {
	id: "avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx.md";
  slug: "avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp.md": {
	id: "avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp.md";
  slug: "avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5.md": {
	id: "avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5.md";
  slug: "avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6.md": {
	id: "avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6.md";
  slug: "avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf.md": {
	id: "avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf.md";
  slug: "avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc.md": {
	id: "avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc.md";
  slug: "avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0.md": {
	id: "avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0.md";
  slug: "avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-boulder-low--htifhg.md": {
	id: "avispl-low-voltage-security-installer-boulder-low--htifhg.md";
  slug: "avispl-low-voltage-security-installer-boulder-low--htifhg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-coronado-low--t9v3vx.md": {
	id: "avispl-low-voltage-security-installer-coronado-low--t9v3vx.md";
  slug: "avispl-low-voltage-security-installer-coronado-low--t9v3vx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-fremont-low--h5ljv6.md": {
	id: "avispl-low-voltage-security-installer-fremont-low--h5ljv6.md";
  slug: "avispl-low-voltage-security-installer-fremont-low--h5ljv6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-kirkland-low--fjva79.md": {
	id: "avispl-low-voltage-security-installer-kirkland-low--fjva79.md";
  slug: "avispl-low-voltage-security-installer-kirkland-low--fjva79";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3.md": {
	id: "avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3.md";
  slug: "avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-pasadena-low--n7025p.md": {
	id: "avispl-low-voltage-security-installer-pasadena-low--n7025p.md";
  slug: "avispl-low-voltage-security-installer-pasadena-low--n7025p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-sandy-low--0dmhth.md": {
	id: "avispl-low-voltage-security-installer-sandy-low--0dmhth.md";
  slug: "avispl-low-voltage-security-installer-sandy-low--0dmhth";
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
"greenskies-solar-panel-installer-bakersfield-sola-qd6940.md": {
	id: "greenskies-solar-panel-installer-bakersfield-sola-qd6940.md";
  slug: "greenskies-solar-panel-installer-bakersfield-sola-qd6940";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-blythe-sola-fm2v5u.md": {
	id: "greenskies-solar-panel-installer-blythe-sola-fm2v5u.md";
  slug: "greenskies-solar-panel-installer-blythe-sola-fm2v5u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-boulder-city-sola-liiq7a.md": {
	id: "greenskies-solar-panel-installer-boulder-city-sola-liiq7a.md";
  slug: "greenskies-solar-panel-installer-boulder-city-sola-liiq7a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-casa-grande-sola-k67uvp.md": {
	id: "greenskies-solar-panel-installer-casa-grande-sola-k67uvp.md";
  slug: "greenskies-solar-panel-installer-casa-grande-sola-k67uvp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-deming-sola-muy5t7.md": {
	id: "greenskies-solar-panel-installer-deming-sola-muy5t7.md";
  slug: "greenskies-solar-panel-installer-deming-sola-muy5t7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-desert-center-sola-mzrqcn.md": {
	id: "greenskies-solar-panel-installer-desert-center-sola-mzrqcn.md";
  slug: "greenskies-solar-panel-installer-desert-center-sola-mzrqcn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-el-centro-sola-8ktz51.md": {
	id: "greenskies-solar-panel-installer-el-centro-sola-8ktz51.md";
  slug: "greenskies-solar-panel-installer-el-centro-sola-8ktz51";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-gila-bend-sola-7yrg42.md": {
	id: "greenskies-solar-panel-installer-gila-bend-sola-7yrg42.md";
  slug: "greenskies-solar-panel-installer-gila-bend-sola-7yrg42";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-hatch-sola-emi3sq.md": {
	id: "greenskies-solar-panel-installer-hatch-sola-emi3sq.md";
  slug: "greenskies-solar-panel-installer-hatch-sola-emi3sq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-lancaster-sola-5e0dly.md": {
	id: "greenskies-solar-panel-installer-lancaster-sola-5e0dly.md";
  slug: "greenskies-solar-panel-installer-lancaster-sola-5e0dly";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-las-vegas-sola-s23p2z.md": {
	id: "greenskies-solar-panel-installer-las-vegas-sola-s23p2z.md";
  slug: "greenskies-solar-panel-installer-las-vegas-sola-s23p2z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-palm-springs-sola-t3sge8.md": {
	id: "greenskies-solar-panel-installer-palm-springs-sola-t3sge8.md";
  slug: "greenskies-solar-panel-installer-palm-springs-sola-t3sge8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-phoenix-sola-47qylq.md": {
	id: "greenskies-solar-panel-installer-phoenix-sola-47qylq.md";
  slug: "greenskies-solar-panel-installer-phoenix-sola-47qylq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-pueblo-sola-nn3meq.md": {
	id: "greenskies-solar-panel-installer-pueblo-sola-nn3meq.md";
  slug: "greenskies-solar-panel-installer-pueblo-sola-nn3meq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-rosamond-sola-0sy84w.md": {
	id: "greenskies-solar-panel-installer-rosamond-sola-0sy84w.md";
  slug: "greenskies-solar-panel-installer-rosamond-sola-0sy84w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-san-antonio-sola-hbudm4.md": {
	id: "greenskies-solar-panel-installer-san-antonio-sola-hbudm4.md";
  slug: "greenskies-solar-panel-installer-san-antonio-sola-hbudm4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-tonopah-sola-1hgs05.md": {
	id: "greenskies-solar-panel-installer-tonopah-sola-1hgs05.md";
  slug: "greenskies-solar-panel-installer-tonopah-sola-1hgs05";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-cable-tech-id-nf8492.md": {
	id: "howell-cable-tech-id-nf8492.md";
  slug: "howell-cable-tech-id-nf8492";
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
"mcenroe-voice-&-data-installer-boise-voic-wc3l4q.md": {
	id: "mcenroe-voice-&-data-installer-boise-voic-wc3l4q.md";
  slug: "mcenroe-voice--data-installer-boise-voic-wc3l4q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-boston-voic-xcyye7.md": {
	id: "mcenroe-voice-&-data-installer-boston-voic-xcyye7.md";
  slug: "mcenroe-voice--data-installer-boston-voic-xcyye7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-cheyenne-voic-cp1nuz.md": {
	id: "mcenroe-voice-&-data-installer-cheyenne-voic-cp1nuz.md";
  slug: "mcenroe-voice--data-installer-cheyenne-voic-cp1nuz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-columbus-voic-ljbx8r.md": {
	id: "mcenroe-voice-&-data-installer-columbus-voic-ljbx8r.md";
  slug: "mcenroe-voice--data-installer-columbus-voic-ljbx8r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-indianapolis-voic-p4n8ck.md": {
	id: "mcenroe-voice-&-data-installer-indianapolis-voic-p4n8ck.md";
  slug: "mcenroe-voice--data-installer-indianapolis-voic-p4n8ck";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-jacksonville-voic-caqg2m.md": {
	id: "mcenroe-voice-&-data-installer-jacksonville-voic-caqg2m.md";
  slug: "mcenroe-voice--data-installer-jacksonville-voic-caqg2m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-omaha-voic-ygxet5.md": {
	id: "mcenroe-voice-&-data-installer-omaha-voic-ygxet5.md";
  slug: "mcenroe-voice--data-installer-omaha-voic-ygxet5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-arvada-appr-fnyccq.md": {
	id: "premier-apprentice-electrician-arvada-appr-fnyccq.md";
  slug: "premier-apprentice-electrician-arvada-appr-fnyccq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-aurora-appr-7jzrwb.md": {
	id: "premier-apprentice-electrician-aurora-appr-7jzrwb.md";
  slug: "premier-apprentice-electrician-aurora-appr-7jzrwb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-centennial-appr-pj3rtq.md": {
	id: "premier-apprentice-electrician-centennial-appr-pj3rtq.md";
  slug: "premier-apprentice-electrician-centennial-appr-pj3rtq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-colorado-springs-appr-vvx36l.md": {
	id: "premier-apprentice-electrician-colorado-springs-appr-vvx36l.md";
  slug: "premier-apprentice-electrician-colorado-springs-appr-vvx36l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-denver-appr-okwb35.md": {
	id: "premier-apprentice-electrician-denver-appr-okwb35.md";
  slug: "premier-apprentice-electrician-denver-appr-okwb35";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-duluth-appr-g4nw3f.md": {
	id: "premier-apprentice-electrician-duluth-appr-g4nw3f.md";
  slug: "premier-apprentice-electrician-duluth-appr-g4nw3f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-dunwoody-appr-fxd5u8.md": {
	id: "premier-apprentice-electrician-dunwoody-appr-fxd5u8.md";
  slug: "premier-apprentice-electrician-dunwoody-appr-fxd5u8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-fort-collins-appr-lkprr0.md": {
	id: "premier-apprentice-electrician-fort-collins-appr-lkprr0.md";
  slug: "premier-apprentice-electrician-fort-collins-appr-lkprr0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-johns-creek-appr-eomtf9.md": {
	id: "premier-apprentice-electrician-johns-creek-appr-eomtf9.md";
  slug: "premier-apprentice-electrician-johns-creek-appr-eomtf9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-kennesaw-appr-hobpc1.md": {
	id: "premier-apprentice-electrician-kennesaw-appr-hobpc1.md";
  slug: "premier-apprentice-electrician-kennesaw-appr-hobpc1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-lakewood-appr-e1izyx.md": {
	id: "premier-apprentice-electrician-lakewood-appr-e1izyx.md";
  slug: "premier-apprentice-electrician-lakewood-appr-e1izyx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-pueblo-appr-jtdpdz.md": {
	id: "premier-apprentice-electrician-pueblo-appr-jtdpdz.md";
  slug: "premier-apprentice-electrician-pueblo-appr-jtdpdz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-smyrna-appr-jcv0ky.md": {
	id: "premier-apprentice-electrician-smyrna-appr-jcv0ky.md";
  slug: "premier-apprentice-electrician-smyrna-appr-jcv0ky";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-thornton-appr-5kyj5t.md": {
	id: "premier-apprentice-electrician-thornton-appr-5kyj5t.md";
  slug: "premier-apprentice-electrician-thornton-appr-5kyj5t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-apprentice-electrician-westminster-appr-9u39rn.md": {
	id: "premier-apprentice-electrician-westminster-appr-9u39rn.md";
  slug: "premier-apprentice-electrician-westminster-appr-9u39rn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-alpharetta-cabl-07pmrq.md": {
	id: "premier-cable-installer-alpharetta-cabl-07pmrq.md";
  slug: "premier-cable-installer-alpharetta-cabl-07pmrq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-arvada-cabl-c47flh.md": {
	id: "premier-cable-installer-arvada-cabl-c47flh.md";
  slug: "premier-cable-installer-arvada-cabl-c47flh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-atlanta-cabl-4gi56o.md": {
	id: "premier-cable-installer-atlanta-cabl-4gi56o.md";
  slug: "premier-cable-installer-atlanta-cabl-4gi56o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-aurora-cabl-exfxk4.md": {
	id: "premier-cable-installer-aurora-cabl-exfxk4.md";
  slug: "premier-cable-installer-aurora-cabl-exfxk4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-centennial-cabl-ne0fgu.md": {
	id: "premier-cable-installer-centennial-cabl-ne0fgu.md";
  slug: "premier-cable-installer-centennial-cabl-ne0fgu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-colorado-springs-cabl-qaumg2.md": {
	id: "premier-cable-installer-colorado-springs-cabl-qaumg2.md";
  slug: "premier-cable-installer-colorado-springs-cabl-qaumg2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-denver-cabl-9nztjm.md": {
	id: "premier-cable-installer-denver-cabl-9nztjm.md";
  slug: "premier-cable-installer-denver-cabl-9nztjm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-duluth-cabl-kwajau.md": {
	id: "premier-cable-installer-duluth-cabl-kwajau.md";
  slug: "premier-cable-installer-duluth-cabl-kwajau";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-dunwoody-cabl-yb1as9.md": {
	id: "premier-cable-installer-dunwoody-cabl-yb1as9.md";
  slug: "premier-cable-installer-dunwoody-cabl-yb1as9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-fort-collins-cabl-af1b6y.md": {
	id: "premier-cable-installer-fort-collins-cabl-af1b6y.md";
  slug: "premier-cable-installer-fort-collins-cabl-af1b6y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-johns-creek-cabl-x03ozo.md": {
	id: "premier-cable-installer-johns-creek-cabl-x03ozo.md";
  slug: "premier-cable-installer-johns-creek-cabl-x03ozo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-kennesaw-cabl-7iiadu.md": {
	id: "premier-cable-installer-kennesaw-cabl-7iiadu.md";
  slug: "premier-cable-installer-kennesaw-cabl-7iiadu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-lakewood-cabl-dupm60.md": {
	id: "premier-cable-installer-lakewood-cabl-dupm60.md";
  slug: "premier-cable-installer-lakewood-cabl-dupm60";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-lawrenceville-cabl-z72sc8.md": {
	id: "premier-cable-installer-lawrenceville-cabl-z72sc8.md";
  slug: "premier-cable-installer-lawrenceville-cabl-z72sc8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-pueblo-cabl-no3mfk.md": {
	id: "premier-cable-installer-pueblo-cabl-no3mfk.md";
  slug: "premier-cable-installer-pueblo-cabl-no3mfk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-roswell-cabl-0ypr5n.md": {
	id: "premier-cable-installer-roswell-cabl-0ypr5n.md";
  slug: "premier-cable-installer-roswell-cabl-0ypr5n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-smyrna-cabl-wq49is.md": {
	id: "premier-cable-installer-smyrna-cabl-wq49is.md";
  slug: "premier-cable-installer-smyrna-cabl-wq49is";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-thornton-cabl-jrkmze.md": {
	id: "premier-cable-installer-thornton-cabl-jrkmze.md";
  slug: "premier-cable-installer-thornton-cabl-jrkmze";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-installer-westminster-cabl-yagaag.md": {
	id: "premier-cable-installer-westminster-cabl-yagaag.md";
  slug: "premier-cable-installer-westminster-cabl-yagaag";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-alpharetta-cabl-tv1kyi.md": {
	id: "premier-cable-technician-alpharetta-cabl-tv1kyi.md";
  slug: "premier-cable-technician-alpharetta-cabl-tv1kyi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-arvada-cabl-f03hgu.md": {
	id: "premier-cable-technician-arvada-cabl-f03hgu.md";
  slug: "premier-cable-technician-arvada-cabl-f03hgu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-athens-cabl-216ahj.md": {
	id: "premier-cable-technician-athens-cabl-216ahj.md";
  slug: "premier-cable-technician-athens-cabl-216ahj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-athens-cabl-lj8v18.md": {
	id: "premier-cable-technician-athens-cabl-lj8v18.md";
  slug: "premier-cable-technician-athens-cabl-lj8v18";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-atlanta-cabl-zeoqhb.md": {
	id: "premier-cable-technician-atlanta-cabl-zeoqhb.md";
  slug: "premier-cable-technician-atlanta-cabl-zeoqhb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-aurora-cabl-x03ik1.md": {
	id: "premier-cable-technician-aurora-cabl-x03ik1.md";
  slug: "premier-cable-technician-aurora-cabl-x03ik1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-centennial-cabl-rrfz7j.md": {
	id: "premier-cable-technician-centennial-cabl-rrfz7j.md";
  slug: "premier-cable-technician-centennial-cabl-rrfz7j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-colorado-springs-cabl-rez163.md": {
	id: "premier-cable-technician-colorado-springs-cabl-rez163.md";
  slug: "premier-cable-technician-colorado-springs-cabl-rez163";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-denver-cabl-8mq4mr.md": {
	id: "premier-cable-technician-denver-cabl-8mq4mr.md";
  slug: "premier-cable-technician-denver-cabl-8mq4mr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-duluth-cabl-1h0n34.md": {
	id: "premier-cable-technician-duluth-cabl-1h0n34.md";
  slug: "premier-cable-technician-duluth-cabl-1h0n34";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-dunwoody-cabl-f2gbcs.md": {
	id: "premier-cable-technician-dunwoody-cabl-f2gbcs.md";
  slug: "premier-cable-technician-dunwoody-cabl-f2gbcs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-fort-collins-cabl-kxosig.md": {
	id: "premier-cable-technician-fort-collins-cabl-kxosig.md";
  slug: "premier-cable-technician-fort-collins-cabl-kxosig";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-johns-creek-cabl-myfnpj.md": {
	id: "premier-cable-technician-johns-creek-cabl-myfnpj.md";
  slug: "premier-cable-technician-johns-creek-cabl-myfnpj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-kennesaw-cabl-dtxzxn.md": {
	id: "premier-cable-technician-kennesaw-cabl-dtxzxn.md";
  slug: "premier-cable-technician-kennesaw-cabl-dtxzxn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-lakewood-cabl-lkmuyo.md": {
	id: "premier-cable-technician-lakewood-cabl-lkmuyo.md";
  slug: "premier-cable-technician-lakewood-cabl-lkmuyo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-lawrenceville-cabl-j197wd.md": {
	id: "premier-cable-technician-lawrenceville-cabl-j197wd.md";
  slug: "premier-cable-technician-lawrenceville-cabl-j197wd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-pueblo-cabl-9cdyvy.md": {
	id: "premier-cable-technician-pueblo-cabl-9cdyvy.md";
  slug: "premier-cable-technician-pueblo-cabl-9cdyvy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-roswell-cabl-7nwn1k.md": {
	id: "premier-cable-technician-roswell-cabl-7nwn1k.md";
  slug: "premier-cable-technician-roswell-cabl-7nwn1k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-sandy-springs-cabl-munxim.md": {
	id: "premier-cable-technician-sandy-springs-cabl-munxim.md";
  slug: "premier-cable-technician-sandy-springs-cabl-munxim";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-smyrna-cabl-5cyejx.md": {
	id: "premier-cable-technician-smyrna-cabl-5cyejx.md";
  slug: "premier-cable-technician-smyrna-cabl-5cyejx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-thornton-cabl-qkde1h.md": {
	id: "premier-cable-technician-thornton-cabl-qkde1h.md";
  slug: "premier-cable-technician-thornton-cabl-qkde1h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-cable-technician-westminster-cabl-57p02l.md": {
	id: "premier-cable-technician-westminster-cabl-57p02l.md";
  slug: "premier-cable-technician-westminster-cabl-57p02l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-alpharetta-comm-8f5sk0.md": {
	id: "premier-commercial-electrician-alpharetta-comm-8f5sk0.md";
  slug: "premier-commercial-electrician-alpharetta-comm-8f5sk0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-arvada-comm-b30e3s.md": {
	id: "premier-commercial-electrician-arvada-comm-b30e3s.md";
  slug: "premier-commercial-electrician-arvada-comm-b30e3s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-asheville-comm-lfcvs3.md": {
	id: "premier-commercial-electrician-asheville-comm-lfcvs3.md";
  slug: "premier-commercial-electrician-asheville-comm-lfcvs3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-athens-comm-pi3hgx.md": {
	id: "premier-commercial-electrician-athens-comm-pi3hgx.md";
  slug: "premier-commercial-electrician-athens-comm-pi3hgx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-atlanta-comm-gqr6xa.md": {
	id: "premier-commercial-electrician-atlanta-comm-gqr6xa.md";
  slug: "premier-commercial-electrician-atlanta-comm-gqr6xa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-aurora-comm-d1766e.md": {
	id: "premier-commercial-electrician-aurora-comm-d1766e.md";
  slug: "premier-commercial-electrician-aurora-comm-d1766e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-cary-comm-cqpyg9.md": {
	id: "premier-commercial-electrician-cary-comm-cqpyg9.md";
  slug: "premier-commercial-electrician-cary-comm-cqpyg9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-centennial-comm-3gs7ml.md": {
	id: "premier-commercial-electrician-centennial-comm-3gs7ml.md";
  slug: "premier-commercial-electrician-centennial-comm-3gs7ml";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-chapel hill-comm-uelo40.md": {
	id: "premier-commercial-electrician-chapel hill-comm-uelo40.md";
  slug: "premier-commercial-electrician-chapel-hill-comm-uelo40";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-charleston-comm-8fx91a.md": {
	id: "premier-commercial-electrician-charleston-comm-8fx91a.md";
  slug: "premier-commercial-electrician-charleston-comm-8fx91a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-charlotte-comm-i2rrxx.md": {
	id: "premier-commercial-electrician-charlotte-comm-i2rrxx.md";
  slug: "premier-commercial-electrician-charlotte-comm-i2rrxx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-colorado springs-comm-8si72c.md": {
	id: "premier-commercial-electrician-colorado springs-comm-8si72c.md";
  slug: "premier-commercial-electrician-colorado-springs-comm-8si72c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-columbia-comm-p91lm6.md": {
	id: "premier-commercial-electrician-columbia-comm-p91lm6.md";
  slug: "premier-commercial-electrician-columbia-comm-p91lm6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-denver-comm-q7vn3h.md": {
	id: "premier-commercial-electrician-denver-comm-q7vn3h.md";
  slug: "premier-commercial-electrician-denver-comm-q7vn3h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-duluth-comm-hndrui.md": {
	id: "premier-commercial-electrician-duluth-comm-hndrui.md";
  slug: "premier-commercial-electrician-duluth-comm-hndrui";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-dunwoody-comm-mmf85o.md": {
	id: "premier-commercial-electrician-dunwoody-comm-mmf85o.md";
  slug: "premier-commercial-electrician-dunwoody-comm-mmf85o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-durham-comm-341xgl.md": {
	id: "premier-commercial-electrician-durham-comm-341xgl.md";
  slug: "premier-commercial-electrician-durham-comm-341xgl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-fort collins-comm-db93p1.md": {
	id: "premier-commercial-electrician-fort collins-comm-db93p1.md";
  slug: "premier-commercial-electrician-fort-collins-comm-db93p1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-goose creek-comm-9gjdtg.md": {
	id: "premier-commercial-electrician-goose creek-comm-9gjdtg.md";
  slug: "premier-commercial-electrician-goose-creek-comm-9gjdtg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-greensboro-comm-boymzn.md": {
	id: "premier-commercial-electrician-greensboro-comm-boymzn.md";
  slug: "premier-commercial-electrician-greensboro-comm-boymzn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-greenville-comm-zhbv2t.md": {
	id: "premier-commercial-electrician-greenville-comm-zhbv2t.md";
  slug: "premier-commercial-electrician-greenville-comm-zhbv2t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-hilton head island-comm-7x3o62.md": {
	id: "premier-commercial-electrician-hilton head island-comm-7x3o62.md";
  slug: "premier-commercial-electrician-hilton-head-island-comm-7x3o62";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-johns creek-comm-68crrq.md": {
	id: "premier-commercial-electrician-johns creek-comm-68crrq.md";
  slug: "premier-commercial-electrician-johns-creek-comm-68crrq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-kennesaw-comm-n3a9fd.md": {
	id: "premier-commercial-electrician-kennesaw-comm-n3a9fd.md";
  slug: "premier-commercial-electrician-kennesaw-comm-n3a9fd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-lakewood-comm-nyz52j.md": {
	id: "premier-commercial-electrician-lakewood-comm-nyz52j.md";
  slug: "premier-commercial-electrician-lakewood-comm-nyz52j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-lawrenceville-comm-vgsece.md": {
	id: "premier-commercial-electrician-lawrenceville-comm-vgsece.md";
  slug: "premier-commercial-electrician-lawrenceville-comm-vgsece";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-marietta-comm-6m4zah.md": {
	id: "premier-commercial-electrician-marietta-comm-6m4zah.md";
  slug: "premier-commercial-electrician-marietta-comm-6m4zah";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-mount pleasant-comm-vzce1y.md": {
	id: "premier-commercial-electrician-mount pleasant-comm-vzce1y.md";
  slug: "premier-commercial-electrician-mount-pleasant-comm-vzce1y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-north charleston-comm-3pv9a5.md": {
	id: "premier-commercial-electrician-north charleston-comm-3pv9a5.md";
  slug: "premier-commercial-electrician-north-charleston-comm-3pv9a5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-pueblo-comm-m6i9ir.md": {
	id: "premier-commercial-electrician-pueblo-comm-m6i9ir.md";
  slug: "premier-commercial-electrician-pueblo-comm-m6i9ir";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-raleigh-comm-5ghl5j.md": {
	id: "premier-commercial-electrician-raleigh-comm-5ghl5j.md";
  slug: "premier-commercial-electrician-raleigh-comm-5ghl5j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-rock hill-comm-olp44u.md": {
	id: "premier-commercial-electrician-rock hill-comm-olp44u.md";
  slug: "premier-commercial-electrician-rock-hill-comm-olp44u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-roswell-comm-v8v62k.md": {
	id: "premier-commercial-electrician-roswell-comm-v8v62k.md";
  slug: "premier-commercial-electrician-roswell-comm-v8v62k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-sandy springs-comm-9jeay3.md": {
	id: "premier-commercial-electrician-sandy springs-comm-9jeay3.md";
  slug: "premier-commercial-electrician-sandy-springs-comm-9jeay3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-smyrna-comm-jz7cms.md": {
	id: "premier-commercial-electrician-smyrna-comm-jz7cms.md";
  slug: "premier-commercial-electrician-smyrna-comm-jz7cms";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-summerville-comm-8evp18.md": {
	id: "premier-commercial-electrician-summerville-comm-8evp18.md";
  slug: "premier-commercial-electrician-summerville-comm-8evp18";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-sumter-comm-zhnr7q.md": {
	id: "premier-commercial-electrician-sumter-comm-zhnr7q.md";
  slug: "premier-commercial-electrician-sumter-comm-zhnr7q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-thornton-comm-dcjt9u.md": {
	id: "premier-commercial-electrician-thornton-comm-dcjt9u.md";
  slug: "premier-commercial-electrician-thornton-comm-dcjt9u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-westminster-comm-c7xrls.md": {
	id: "premier-commercial-electrician-westminster-comm-c7xrls.md";
  slug: "premier-commercial-electrician-westminster-comm-c7xrls";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-commercial-electrician-winston-salem-comm-xr79e8.md": {
	id: "premier-commercial-electrician-winston-salem-comm-xr79e8.md";
  slug: "premier-commercial-electrician-winston-salem-comm-xr79e8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-arvada-elec-9lbo76.md": {
	id: "premier-electrician-arvada-elec-9lbo76.md";
  slug: "premier-electrician-arvada-elec-9lbo76";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-aurora-elec-y0smoi.md": {
	id: "premier-electrician-aurora-elec-y0smoi.md";
  slug: "premier-electrician-aurora-elec-y0smoi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-centennial-elec-6wog58.md": {
	id: "premier-electrician-centennial-elec-6wog58.md";
  slug: "premier-electrician-centennial-elec-6wog58";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-colorado-springs-elec-c1ga2t.md": {
	id: "premier-electrician-colorado-springs-elec-c1ga2t.md";
  slug: "premier-electrician-colorado-springs-elec-c1ga2t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-denver-elec-vwwrk0.md": {
	id: "premier-electrician-denver-elec-vwwrk0.md";
  slug: "premier-electrician-denver-elec-vwwrk0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-duluth-elec-28zti8.md": {
	id: "premier-electrician-duluth-elec-28zti8.md";
  slug: "premier-electrician-duluth-elec-28zti8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-dunwoody-elec-47tre8.md": {
	id: "premier-electrician-dunwoody-elec-47tre8.md";
  slug: "premier-electrician-dunwoody-elec-47tre8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-fort-collins-elec-uezlxt.md": {
	id: "premier-electrician-fort-collins-elec-uezlxt.md";
  slug: "premier-electrician-fort-collins-elec-uezlxt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-johns-creek-elec-dmoevs.md": {
	id: "premier-electrician-johns-creek-elec-dmoevs.md";
  slug: "premier-electrician-johns-creek-elec-dmoevs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-kennesaw-elec-7sdrn5.md": {
	id: "premier-electrician-kennesaw-elec-7sdrn5.md";
  slug: "premier-electrician-kennesaw-elec-7sdrn5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-lakewood-elec-1z8m7n.md": {
	id: "premier-electrician-lakewood-elec-1z8m7n.md";
  slug: "premier-electrician-lakewood-elec-1z8m7n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-pueblo-elec-fdv5rr.md": {
	id: "premier-electrician-pueblo-elec-fdv5rr.md";
  slug: "premier-electrician-pueblo-elec-fdv5rr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-smyrna-elec-8lagkw.md": {
	id: "premier-electrician-smyrna-elec-8lagkw.md";
  slug: "premier-electrician-smyrna-elec-8lagkw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-thornton-elec-cugiy5.md": {
	id: "premier-electrician-thornton-elec-cugiy5.md";
  slug: "premier-electrician-thornton-elec-cugiy5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electrician-westminster-elec-uhzx8m.md": {
	id: "premier-electrician-westminster-elec-uhzx8m.md";
  slug: "premier-electrician-westminster-elec-uhzx8m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-alpharetta-indu-mebp07.md": {
	id: "premier-industrial-electrician-alpharetta-indu-mebp07.md";
  slug: "premier-industrial-electrician-alpharetta-indu-mebp07";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-arvada-indu-usg6po.md": {
	id: "premier-industrial-electrician-arvada-indu-usg6po.md";
  slug: "premier-industrial-electrician-arvada-indu-usg6po";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-asheville-indu-5fo7cl.md": {
	id: "premier-industrial-electrician-asheville-indu-5fo7cl.md";
  slug: "premier-industrial-electrician-asheville-indu-5fo7cl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-athens-indu-rka9qs.md": {
	id: "premier-industrial-electrician-athens-indu-rka9qs.md";
  slug: "premier-industrial-electrician-athens-indu-rka9qs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-atlanta-indu-z49fw7.md": {
	id: "premier-industrial-electrician-atlanta-indu-z49fw7.md";
  slug: "premier-industrial-electrician-atlanta-indu-z49fw7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-aurora-indu-5wgptf.md": {
	id: "premier-industrial-electrician-aurora-indu-5wgptf.md";
  slug: "premier-industrial-electrician-aurora-indu-5wgptf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-cary-indu-cqvcpt.md": {
	id: "premier-industrial-electrician-cary-indu-cqvcpt.md";
  slug: "premier-industrial-electrician-cary-indu-cqvcpt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-centennial-indu-9tofd3.md": {
	id: "premier-industrial-electrician-centennial-indu-9tofd3.md";
  slug: "premier-industrial-electrician-centennial-indu-9tofd3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-chapel hill-indu-y2ak6s.md": {
	id: "premier-industrial-electrician-chapel hill-indu-y2ak6s.md";
  slug: "premier-industrial-electrician-chapel-hill-indu-y2ak6s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-charleston-indu-dethso.md": {
	id: "premier-industrial-electrician-charleston-indu-dethso.md";
  slug: "premier-industrial-electrician-charleston-indu-dethso";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-charlotte-indu-524swe.md": {
	id: "premier-industrial-electrician-charlotte-indu-524swe.md";
  slug: "premier-industrial-electrician-charlotte-indu-524swe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-colorado springs-indu-vzi2ml.md": {
	id: "premier-industrial-electrician-colorado springs-indu-vzi2ml.md";
  slug: "premier-industrial-electrician-colorado-springs-indu-vzi2ml";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-columbia-indu-b4xncv.md": {
	id: "premier-industrial-electrician-columbia-indu-b4xncv.md";
  slug: "premier-industrial-electrician-columbia-indu-b4xncv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-denver-indu-pv5yzj.md": {
	id: "premier-industrial-electrician-denver-indu-pv5yzj.md";
  slug: "premier-industrial-electrician-denver-indu-pv5yzj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-duluth-indu-4at4ao.md": {
	id: "premier-industrial-electrician-duluth-indu-4at4ao.md";
  slug: "premier-industrial-electrician-duluth-indu-4at4ao";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-dunwoody-indu-ksj8fo.md": {
	id: "premier-industrial-electrician-dunwoody-indu-ksj8fo.md";
  slug: "premier-industrial-electrician-dunwoody-indu-ksj8fo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-durham-indu-6q6czh.md": {
	id: "premier-industrial-electrician-durham-indu-6q6czh.md";
  slug: "premier-industrial-electrician-durham-indu-6q6czh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-fort collins-indu-2b8o56.md": {
	id: "premier-industrial-electrician-fort collins-indu-2b8o56.md";
  slug: "premier-industrial-electrician-fort-collins-indu-2b8o56";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-goose creek-indu-scauzo.md": {
	id: "premier-industrial-electrician-goose creek-indu-scauzo.md";
  slug: "premier-industrial-electrician-goose-creek-indu-scauzo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-greensboro-indu-5w1jk4.md": {
	id: "premier-industrial-electrician-greensboro-indu-5w1jk4.md";
  slug: "premier-industrial-electrician-greensboro-indu-5w1jk4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-greenville-indu-jk30zm.md": {
	id: "premier-industrial-electrician-greenville-indu-jk30zm.md";
  slug: "premier-industrial-electrician-greenville-indu-jk30zm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-hilton head island-indu-2bwhxu.md": {
	id: "premier-industrial-electrician-hilton head island-indu-2bwhxu.md";
  slug: "premier-industrial-electrician-hilton-head-island-indu-2bwhxu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-johns creek-indu-cky74q.md": {
	id: "premier-industrial-electrician-johns creek-indu-cky74q.md";
  slug: "premier-industrial-electrician-johns-creek-indu-cky74q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-kennesaw-indu-435mgj.md": {
	id: "premier-industrial-electrician-kennesaw-indu-435mgj.md";
  slug: "premier-industrial-electrician-kennesaw-indu-435mgj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-lakewood-indu-8bgl29.md": {
	id: "premier-industrial-electrician-lakewood-indu-8bgl29.md";
  slug: "premier-industrial-electrician-lakewood-indu-8bgl29";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-lawrenceville-indu-gff8bz.md": {
	id: "premier-industrial-electrician-lawrenceville-indu-gff8bz.md";
  slug: "premier-industrial-electrician-lawrenceville-indu-gff8bz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-marietta-indu-kquyyq.md": {
	id: "premier-industrial-electrician-marietta-indu-kquyyq.md";
  slug: "premier-industrial-electrician-marietta-indu-kquyyq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-mount pleasant-indu-kmalpj.md": {
	id: "premier-industrial-electrician-mount pleasant-indu-kmalpj.md";
  slug: "premier-industrial-electrician-mount-pleasant-indu-kmalpj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-north charleston-indu-81ex6z.md": {
	id: "premier-industrial-electrician-north charleston-indu-81ex6z.md";
  slug: "premier-industrial-electrician-north-charleston-indu-81ex6z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-pueblo-indu-9m4iz7.md": {
	id: "premier-industrial-electrician-pueblo-indu-9m4iz7.md";
  slug: "premier-industrial-electrician-pueblo-indu-9m4iz7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-raleigh-indu-nrchj2.md": {
	id: "premier-industrial-electrician-raleigh-indu-nrchj2.md";
  slug: "premier-industrial-electrician-raleigh-indu-nrchj2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-rock hill-indu-eafpms.md": {
	id: "premier-industrial-electrician-rock hill-indu-eafpms.md";
  slug: "premier-industrial-electrician-rock-hill-indu-eafpms";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-roswell-indu-a55e2v.md": {
	id: "premier-industrial-electrician-roswell-indu-a55e2v.md";
  slug: "premier-industrial-electrician-roswell-indu-a55e2v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-sandy springs-indu-i4ze1f.md": {
	id: "premier-industrial-electrician-sandy springs-indu-i4ze1f.md";
  slug: "premier-industrial-electrician-sandy-springs-indu-i4ze1f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-smyrna-indu-nhg7mt.md": {
	id: "premier-industrial-electrician-smyrna-indu-nhg7mt.md";
  slug: "premier-industrial-electrician-smyrna-indu-nhg7mt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-summerville-indu-y4yds5.md": {
	id: "premier-industrial-electrician-summerville-indu-y4yds5.md";
  slug: "premier-industrial-electrician-summerville-indu-y4yds5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-sumter-indu-f6z5cx.md": {
	id: "premier-industrial-electrician-sumter-indu-f6z5cx.md";
  slug: "premier-industrial-electrician-sumter-indu-f6z5cx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-thornton-indu-2a1k0n.md": {
	id: "premier-industrial-electrician-thornton-indu-2a1k0n.md";
  slug: "premier-industrial-electrician-thornton-indu-2a1k0n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-westminster-indu-7a2za1.md": {
	id: "premier-industrial-electrician-westminster-indu-7a2za1.md";
  slug: "premier-industrial-electrician-westminster-indu-7a2za1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-industrial-electrician-winston-salem-indu-l4fhhg.md": {
	id: "premier-industrial-electrician-winston-salem-indu-l4fhhg.md";
  slug: "premier-industrial-electrician-winston-salem-indu-l4fhhg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-alpharetta-low-2mdfdh.md": {
	id: "premier-low-voltage-technician-alpharetta-low-2mdfdh.md";
  slug: "premier-low-voltage-technician-alpharetta-low-2mdfdh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-athens-low--1bsl8k.md": {
	id: "premier-low-voltage-technician-athens-low--1bsl8k.md";
  slug: "premier-low-voltage-technician-athens-low--1bsl8k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-atlanta-low-aj5k5l.md": {
	id: "premier-low-voltage-technician-atlanta-low-aj5k5l.md";
  slug: "premier-low-voltage-technician-atlanta-low-aj5k5l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-lawrenceville-low--307dkz.md": {
	id: "premier-low-voltage-technician-lawrenceville-low--307dkz.md";
  slug: "premier-low-voltage-technician-lawrenceville-low--307dkz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-roswell-low-8bx2bm.md": {
	id: "premier-low-voltage-technician-roswell-low-8bx2bm.md";
  slug: "premier-low-voltage-technician-roswell-low-8bx2bm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-low-voltage-technician-sandy springs-low-tb7vnl.md": {
	id: "premier-low-voltage-technician-sandy springs-low-tb7vnl.md";
  slug: "premier-low-voltage-technician-sandy-springs-low-tb7vnl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-arvada-voic-d4ou4h.md": {
	id: "premier-voice-&-data-installer-arvada-voic-d4ou4h.md";
  slug: "premier-voice--data-installer-arvada-voic-d4ou4h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-aurora-voic-gjje0r.md": {
	id: "premier-voice-&-data-installer-aurora-voic-gjje0r.md";
  slug: "premier-voice--data-installer-aurora-voic-gjje0r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-centennial-voic-9iuopd.md": {
	id: "premier-voice-&-data-installer-centennial-voic-9iuopd.md";
  slug: "premier-voice--data-installer-centennial-voic-9iuopd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-colorado-springs-voic-gv8r3i.md": {
	id: "premier-voice-&-data-installer-colorado-springs-voic-gv8r3i.md";
  slug: "premier-voice--data-installer-colorado-springs-voic-gv8r3i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-denver-voic-n0b63x.md": {
	id: "premier-voice-&-data-installer-denver-voic-n0b63x.md";
  slug: "premier-voice--data-installer-denver-voic-n0b63x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-duluth-voic-20i4yt.md": {
	id: "premier-voice-&-data-installer-duluth-voic-20i4yt.md";
  slug: "premier-voice--data-installer-duluth-voic-20i4yt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-dunwoody-voic-8iq0sn.md": {
	id: "premier-voice-&-data-installer-dunwoody-voic-8iq0sn.md";
  slug: "premier-voice--data-installer-dunwoody-voic-8iq0sn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-fort-collins-voic-7p5urz.md": {
	id: "premier-voice-&-data-installer-fort-collins-voic-7p5urz.md";
  slug: "premier-voice--data-installer-fort-collins-voic-7p5urz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-johns-creek-voic-m990ve.md": {
	id: "premier-voice-&-data-installer-johns-creek-voic-m990ve.md";
  slug: "premier-voice--data-installer-johns-creek-voic-m990ve";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-kennesaw-voic-6j4q5c.md": {
	id: "premier-voice-&-data-installer-kennesaw-voic-6j4q5c.md";
  slug: "premier-voice--data-installer-kennesaw-voic-6j4q5c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-lakewood-voic-m4pp6d.md": {
	id: "premier-voice-&-data-installer-lakewood-voic-m4pp6d.md";
  slug: "premier-voice--data-installer-lakewood-voic-m4pp6d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-pueblo-voic-4gdjn2.md": {
	id: "premier-voice-&-data-installer-pueblo-voic-4gdjn2.md";
  slug: "premier-voice--data-installer-pueblo-voic-4gdjn2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-smyrna-voic-y1jr6t.md": {
	id: "premier-voice-&-data-installer-smyrna-voic-y1jr6t.md";
  slug: "premier-voice--data-installer-smyrna-voic-y1jr6t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-thornton-voic-g3umdv.md": {
	id: "premier-voice-&-data-installer-thornton-voic-g3umdv.md";
  slug: "premier-voice--data-installer-thornton-voic-g3umdv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-westminster-voic-41b9hc.md": {
	id: "premier-voice-&-data-installer-westminster-voic-41b9hc.md";
  slug: "premier-voice--data-installer-westminster-voic-41b9hc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y.md": {
	id: "prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y.md";
  slug: "prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-chandler-comm-7nnezz.md": {
	id: "prime-commercial-journeyman-electrician-chandler-comm-7nnezz.md";
  slug: "prime-commercial-journeyman-electrician-chandler-comm-7nnezz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-glendale-comm-h5chx1.md": {
	id: "prime-commercial-journeyman-electrician-glendale-comm-h5chx1.md";
  slug: "prime-commercial-journeyman-electrician-glendale-comm-h5chx1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-irvine-comm-swb0y0.md": {
	id: "prime-commercial-journeyman-electrician-irvine-comm-swb0y0.md";
  slug: "prime-commercial-journeyman-electrician-irvine-comm-swb0y0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8.md": {
	id: "prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8.md";
  slug: "prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-los-angeles-comm-0y068v.md": {
	id: "prime-commercial-journeyman-electrician-los-angeles-comm-0y068v.md";
  slug: "prime-commercial-journeyman-electrician-los-angeles-comm-0y068v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-mesa-comm-d4gbrt.md": {
	id: "prime-commercial-journeyman-electrician-mesa-comm-d4gbrt.md";
  slug: "prime-commercial-journeyman-electrician-mesa-comm-d4gbrt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-pasadena-comm-rk762a.md": {
	id: "prime-commercial-journeyman-electrician-pasadena-comm-rk762a.md";
  slug: "prime-commercial-journeyman-electrician-pasadena-comm-rk762a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-phoenix-comm-idfapv.md": {
	id: "prime-commercial-journeyman-electrician-phoenix-comm-idfapv.md";
  slug: "prime-commercial-journeyman-electrician-phoenix-comm-idfapv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0.md": {
	id: "prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0.md";
  slug: "prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-diego-comm-00es8o.md": {
	id: "prime-commercial-journeyman-electrician-san-diego-comm-00es8o.md";
  slug: "prime-commercial-journeyman-electrician-san-diego-comm-00es8o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-francisco-comm-n65fom.md": {
	id: "prime-commercial-journeyman-electrician-san-francisco-comm-n65fom.md";
  slug: "prime-commercial-journeyman-electrician-san-francisco-comm-n65fom";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-jose-comm-d622x3.md": {
	id: "prime-commercial-journeyman-electrician-san-jose-comm-d622x3.md";
  slug: "prime-commercial-journeyman-electrician-san-jose-comm-d622x3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt.md": {
	id: "prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt.md";
  slug: "prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-tempe-comm-93v5n6.md": {
	id: "prime-commercial-journeyman-electrician-tempe-comm-93v5n6.md";
  slug: "prime-commercial-journeyman-electrician-tempe-comm-93v5n6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-anaheim-elec-0kd2xp.md": {
	id: "prime-electrician-anaheim-elec-0kd2xp.md";
  slug: "prime-electrician-anaheim-elec-0kd2xp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-chandler-elec-eequr6.md": {
	id: "prime-electrician-chandler-elec-eequr6.md";
  slug: "prime-electrician-chandler-elec-eequr6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-glendale-elec-obcza8.md": {
	id: "prime-electrician-glendale-elec-obcza8.md";
  slug: "prime-electrician-glendale-elec-obcza8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-irvine-elec-8n6i2t.md": {
	id: "prime-electrician-irvine-elec-8n6i2t.md";
  slug: "prime-electrician-irvine-elec-8n6i2t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-long-beach-elec-ys1jti.md": {
	id: "prime-electrician-long-beach-elec-ys1jti.md";
  slug: "prime-electrician-long-beach-elec-ys1jti";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-los-angeles-elec-xo2z6k.md": {
	id: "prime-electrician-los-angeles-elec-xo2z6k.md";
  slug: "prime-electrician-los-angeles-elec-xo2z6k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-mesa-elec-6mu8k3.md": {
	id: "prime-electrician-mesa-elec-6mu8k3.md";
  slug: "prime-electrician-mesa-elec-6mu8k3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-pasadena-elec-a4bn4m.md": {
	id: "prime-electrician-pasadena-elec-a4bn4m.md";
  slug: "prime-electrician-pasadena-elec-a4bn4m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-phoenix-elec-qhttju.md": {
	id: "prime-electrician-phoenix-elec-qhttju.md";
  slug: "prime-electrician-phoenix-elec-qhttju";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-sacramento-elec-qx5bjp.md": {
	id: "prime-electrician-sacramento-elec-qx5bjp.md";
  slug: "prime-electrician-sacramento-elec-qx5bjp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-san-diego-elec-m2088p.md": {
	id: "prime-electrician-san-diego-elec-m2088p.md";
  slug: "prime-electrician-san-diego-elec-m2088p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-san-francisco-elec-dns0ep.md": {
	id: "prime-electrician-san-francisco-elec-dns0ep.md";
  slug: "prime-electrician-san-francisco-elec-dns0ep";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-san-jose-elec-qsfba0.md": {
	id: "prime-electrician-san-jose-elec-qsfba0.md";
  slug: "prime-electrician-san-jose-elec-qsfba0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-scottsdale-elec-a9vql0.md": {
	id: "prime-electrician-scottsdale-elec-a9vql0.md";
  slug: "prime-electrician-scottsdale-elec-a9vql0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-electrician-tempe-elec-x7ugkl.md": {
	id: "prime-electrician-tempe-elec-x7ugkl.md";
  slug: "prime-electrician-tempe-elec-x7ugkl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-anaheim-fire-wl6fkr.md": {
	id: "prime-fire-alarm-installer-anaheim-fire-wl6fkr.md";
  slug: "prime-fire-alarm-installer-anaheim-fire-wl6fkr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-chandler-fire-gyd4fo.md": {
	id: "prime-fire-alarm-installer-chandler-fire-gyd4fo.md";
  slug: "prime-fire-alarm-installer-chandler-fire-gyd4fo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-glendale-fire-urrp9u.md": {
	id: "prime-fire-alarm-installer-glendale-fire-urrp9u.md";
  slug: "prime-fire-alarm-installer-glendale-fire-urrp9u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-irvine-fire-h0p6na.md": {
	id: "prime-fire-alarm-installer-irvine-fire-h0p6na.md";
  slug: "prime-fire-alarm-installer-irvine-fire-h0p6na";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-long-beach-fire-2jkpa1.md": {
	id: "prime-fire-alarm-installer-long-beach-fire-2jkpa1.md";
  slug: "prime-fire-alarm-installer-long-beach-fire-2jkpa1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-los-angeles-fire-jbsabq.md": {
	id: "prime-fire-alarm-installer-los-angeles-fire-jbsabq.md";
  slug: "prime-fire-alarm-installer-los-angeles-fire-jbsabq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-mesa-fire-hzyvcx.md": {
	id: "prime-fire-alarm-installer-mesa-fire-hzyvcx.md";
  slug: "prime-fire-alarm-installer-mesa-fire-hzyvcx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-pasadena-fire-vae7br.md": {
	id: "prime-fire-alarm-installer-pasadena-fire-vae7br.md";
  slug: "prime-fire-alarm-installer-pasadena-fire-vae7br";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-phoenix-fire-h982df.md": {
	id: "prime-fire-alarm-installer-phoenix-fire-h982df.md";
  slug: "prime-fire-alarm-installer-phoenix-fire-h982df";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-sacramento-fire-fd3joi.md": {
	id: "prime-fire-alarm-installer-sacramento-fire-fd3joi.md";
  slug: "prime-fire-alarm-installer-sacramento-fire-fd3joi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-diego-fire-dmifb0.md": {
	id: "prime-fire-alarm-installer-san-diego-fire-dmifb0.md";
  slug: "prime-fire-alarm-installer-san-diego-fire-dmifb0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-francisco-fire-628bbd.md": {
	id: "prime-fire-alarm-installer-san-francisco-fire-628bbd.md";
  slug: "prime-fire-alarm-installer-san-francisco-fire-628bbd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-jose-fire-c9zdch.md": {
	id: "prime-fire-alarm-installer-san-jose-fire-c9zdch.md";
  slug: "prime-fire-alarm-installer-san-jose-fire-c9zdch";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-scottsdale-fire-g9gqfm.md": {
	id: "prime-fire-alarm-installer-scottsdale-fire-g9gqfm.md";
  slug: "prime-fire-alarm-installer-scottsdale-fire-g9gqfm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-tempe-fire-tpsp68.md": {
	id: "prime-fire-alarm-installer-tempe-fire-tpsp68.md";
  slug: "prime-fire-alarm-installer-tempe-fire-tpsp68";
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
"prime-fire-alarm-technician-anaheim-fire-dzfo02.md": {
	id: "prime-fire-alarm-technician-anaheim-fire-dzfo02.md";
  slug: "prime-fire-alarm-technician-anaheim-fire-dzfo02";
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
"prime-fire-alarm-technician-chandler-fire-an6r8g.md": {
	id: "prime-fire-alarm-technician-chandler-fire-an6r8g.md";
  slug: "prime-fire-alarm-technician-chandler-fire-an6r8g";
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
"prime-fire-alarm-technician-glendale-fire-1gbzyj.md": {
	id: "prime-fire-alarm-technician-glendale-fire-1gbzyj.md";
  slug: "prime-fire-alarm-technician-glendale-fire-1gbzyj";
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
"prime-fire-alarm-technician-irvine-fire-lyzhjz.md": {
	id: "prime-fire-alarm-technician-irvine-fire-lyzhjz.md";
  slug: "prime-fire-alarm-technician-irvine-fire-lyzhjz";
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
"prime-fire-alarm-technician-long-beach-fire-15rdex.md": {
	id: "prime-fire-alarm-technician-long-beach-fire-15rdex.md";
  slug: "prime-fire-alarm-technician-long-beach-fire-15rdex";
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
"prime-fire-alarm-technician-los-angeles-fire-nodqdg.md": {
	id: "prime-fire-alarm-technician-los-angeles-fire-nodqdg.md";
  slug: "prime-fire-alarm-technician-los-angeles-fire-nodqdg";
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
"prime-fire-alarm-technician-mesa-fire-1qnooa.md": {
	id: "prime-fire-alarm-technician-mesa-fire-1qnooa.md";
  slug: "prime-fire-alarm-technician-mesa-fire-1qnooa";
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
"prime-fire-alarm-technician-pasadena-fire-a33ee2.md": {
	id: "prime-fire-alarm-technician-pasadena-fire-a33ee2.md";
  slug: "prime-fire-alarm-technician-pasadena-fire-a33ee2";
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
"prime-fire-alarm-technician-phoenix-fire-5nt7qt.md": {
	id: "prime-fire-alarm-technician-phoenix-fire-5nt7qt.md";
  slug: "prime-fire-alarm-technician-phoenix-fire-5nt7qt";
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
"prime-fire-alarm-technician-sacramento-fire-varbyd.md": {
	id: "prime-fire-alarm-technician-sacramento-fire-varbyd.md";
  slug: "prime-fire-alarm-technician-sacramento-fire-varbyd";
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
"prime-fire-alarm-technician-san-diego-fire-k1e79w.md": {
	id: "prime-fire-alarm-technician-san-diego-fire-k1e79w.md";
  slug: "prime-fire-alarm-technician-san-diego-fire-k1e79w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san-francisco-fire-e611u3.md": {
	id: "prime-fire-alarm-technician-san-francisco-fire-e611u3.md";
  slug: "prime-fire-alarm-technician-san-francisco-fire-e611u3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san-jose-fire-fd9hg9.md": {
	id: "prime-fire-alarm-technician-san-jose-fire-fd9hg9.md";
  slug: "prime-fire-alarm-technician-san-jose-fire-fd9hg9";
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
"prime-fire-alarm-technician-scottsdale-fire-4drfg6.md": {
	id: "prime-fire-alarm-technician-scottsdale-fire-4drfg6.md";
  slug: "prime-fire-alarm-technician-scottsdale-fire-4drfg6";
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
"prime-fire-alarm-technician-tempe-fire-ttbge4.md": {
	id: "prime-fire-alarm-technician-tempe-fire-ttbge4.md";
  slug: "prime-fire-alarm-technician-tempe-fire-ttbge4";
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
"prime-security-technician-anaheim-secu-ikfp2q.md": {
	id: "prime-security-technician-anaheim-secu-ikfp2q.md";
  slug: "prime-security-technician-anaheim-secu-ikfp2q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-chandler-secu-ecjyin.md": {
	id: "prime-security-technician-chandler-secu-ecjyin.md";
  slug: "prime-security-technician-chandler-secu-ecjyin";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-glendale-secu-i4esga.md": {
	id: "prime-security-technician-glendale-secu-i4esga.md";
  slug: "prime-security-technician-glendale-secu-i4esga";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-irvine-secu-r8jd9u.md": {
	id: "prime-security-technician-irvine-secu-r8jd9u.md";
  slug: "prime-security-technician-irvine-secu-r8jd9u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-long-beach-secu-tpv74z.md": {
	id: "prime-security-technician-long-beach-secu-tpv74z.md";
  slug: "prime-security-technician-long-beach-secu-tpv74z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-los-angeles-secu-gn7bwi.md": {
	id: "prime-security-technician-los-angeles-secu-gn7bwi.md";
  slug: "prime-security-technician-los-angeles-secu-gn7bwi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-mesa-secu-ndszjx.md": {
	id: "prime-security-technician-mesa-secu-ndszjx.md";
  slug: "prime-security-technician-mesa-secu-ndszjx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-pasadena-secu-s97utv.md": {
	id: "prime-security-technician-pasadena-secu-s97utv.md";
  slug: "prime-security-technician-pasadena-secu-s97utv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-phoenix-secu-2pbpyi.md": {
	id: "prime-security-technician-phoenix-secu-2pbpyi.md";
  slug: "prime-security-technician-phoenix-secu-2pbpyi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-sacramento-secu-os69wo.md": {
	id: "prime-security-technician-sacramento-secu-os69wo.md";
  slug: "prime-security-technician-sacramento-secu-os69wo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-san-diego-secu-pbmu6v.md": {
	id: "prime-security-technician-san-diego-secu-pbmu6v.md";
  slug: "prime-security-technician-san-diego-secu-pbmu6v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-san-francisco-secu-45m8b3.md": {
	id: "prime-security-technician-san-francisco-secu-45m8b3.md";
  slug: "prime-security-technician-san-francisco-secu-45m8b3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-san-jose-secu-7ao6p4.md": {
	id: "prime-security-technician-san-jose-secu-7ao6p4.md";
  slug: "prime-security-technician-san-jose-secu-7ao6p4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-scottsdale-secu-83sbhw.md": {
	id: "prime-security-technician-scottsdale-secu-83sbhw.md";
  slug: "prime-security-technician-scottsdale-secu-83sbhw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-security-technician-tempe-secu-2qkdyv.md": {
	id: "prime-security-technician-tempe-secu-2qkdyv.md";
  slug: "prime-security-technician-tempe-secu-2qkdyv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-structured-cable-technician-suffolk-va-id-mm7388.md": {
	id: "prime-structured-cable-technician-suffolk-va-id-mm7388.md";
  slug: "prime-structured-cable-technician-suffolk-va-id-mm7388";
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
"telco-data-av-tech-brookline-av-t-vq2kt3.md": {
	id: "telco-data-av-tech-brookline-av-t-vq2kt3.md";
  slug: "telco-data-av-tech-brookline-av-t-vq2kt3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-av-tech-cambridge-av-t-077jui.md": {
	id: "telco-data-av-tech-cambridge-av-t-077jui.md";
  slug: "telco-data-av-tech-cambridge-av-t-077jui";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-av-tech-coral-gables-av-t-26p6nm.md": {
	id: "telco-data-av-tech-coral-gables-av-t-26p6nm.md";
  slug: "telco-data-av-tech-coral-gables-av-t-26p6nm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-av-tech-coral-gables-av-t-5j7uda.md": {
	id: "telco-data-av-tech-coral-gables-av-t-5j7uda.md";
  slug: "telco-data-av-tech-coral-gables-av-t-5j7uda";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-av-tech-newton-av-t-xfpifg.md": {
	id: "telco-data-av-tech-newton-av-t-xfpifg.md";
  slug: "telco-data-av-tech-newton-av-t-xfpifg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-av-tech-pompano-beach-av-t-l1m4m5.md": {
	id: "telco-data-av-tech-pompano-beach-av-t-l1m4m5.md";
  slug: "telco-data-av-tech-pompano-beach-av-t-l1m4m5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-arlington-cabl-7aiqho.md": {
	id: "telco-data-cable-tech-team-lead-arlington-cabl-7aiqho.md";
  slug: "telco-data-cable-tech-team-lead-arlington-cabl-7aiqho";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-arlington-cabl-y51kxx.md": {
	id: "telco-data-cable-tech-team-lead-arlington-cabl-y51kxx.md";
  slug: "telco-data-cable-tech-team-lead-arlington-cabl-y51kxx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky.md": {
	id: "telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky.md";
  slug: "telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-bethesda-cabl-g487nk.md": {
	id: "telco-data-cable-tech-team-lead-bethesda-cabl-g487nk.md";
  slug: "telco-data-cable-tech-team-lead-bethesda-cabl-g487nk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6.md": {
	id: "telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6.md";
  slug: "telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z.md": {
	id: "telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z.md";
  slug: "telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-newton-cabl-6gjioa.md": {
	id: "telco-data-cable-tech-team-lead-newton-cabl-6gjioa.md";
  slug: "telco-data-cable-tech-team-lead-newton-cabl-6gjioa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-somerville-cabl-4v18nf.md": {
	id: "telco-data-cable-tech-team-lead-somerville-cabl-4v18nf.md";
  slug: "telco-data-cable-tech-team-lead-somerville-cabl-4v18nf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do.md": {
	id: "telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do.md";
  slug: "telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq.md": {
	id: "telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq.md";
  slug: "telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-alexandria-fire-frxwqg.md": {
	id: "telco-data-fire-alarm-tech-alexandria-fire-frxwqg.md";
  slug: "telco-data-fire-alarm-tech-alexandria-fire-frxwqg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-boca-raton-fire-llbssy.md": {
	id: "telco-data-fire-alarm-tech-boca-raton-fire-llbssy.md";
  slug: "telco-data-fire-alarm-tech-boca-raton-fire-llbssy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-brookline-fire-woo0dd.md": {
	id: "telco-data-fire-alarm-tech-brookline-fire-woo0dd.md";
  slug: "telco-data-fire-alarm-tech-brookline-fire-woo0dd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-cambridge-fire-cwp0oy.md": {
	id: "telco-data-fire-alarm-tech-cambridge-fire-cwp0oy.md";
  slug: "telco-data-fire-alarm-tech-cambridge-fire-cwp0oy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-jersey-city-fire-iquft8.md": {
	id: "telco-data-fire-alarm-tech-jersey-city-fire-iquft8.md";
  slug: "telco-data-fire-alarm-tech-jersey-city-fire-iquft8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-mclean-fire-y02lmu.md": {
	id: "telco-data-fire-alarm-tech-mclean-fire-y02lmu.md";
  slug: "telco-data-fire-alarm-tech-mclean-fire-y02lmu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-quincy-fire-g2c62f.md": {
	id: "telco-data-fire-alarm-tech-quincy-fire-g2c62f.md";
  slug: "telco-data-fire-alarm-tech-quincy-fire-g2c62f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-white-plains-fire-h8wl5l.md": {
	id: "telco-data-fire-alarm-tech-white-plains-fire-h8wl5l.md";
  slug: "telco-data-fire-alarm-tech-white-plains-fire-h8wl5l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-alexandria-secu-xh3jaj.md": {
	id: "telco-data-security-tech-alexandria-secu-xh3jaj.md";
  slug: "telco-data-security-tech-alexandria-secu-xh3jaj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-delray-beach-secu-ng6o9t.md": {
	id: "telco-data-security-tech-delray-beach-secu-ng6o9t.md";
  slug: "telco-data-security-tech-delray-beach-secu-ng6o9t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-fort-lee-secu-256ap3.md": {
	id: "telco-data-security-tech-fort-lee-secu-256ap3.md";
  slug: "telco-data-security-tech-fort-lee-secu-256ap3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-hoboken-secu-ruum3w.md": {
	id: "telco-data-security-tech-hoboken-secu-ruum3w.md";
  slug: "telco-data-security-tech-hoboken-secu-ruum3w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-hollywood-secu-eymuuh.md": {
	id: "telco-data-security-tech-hollywood-secu-eymuuh.md";
  slug: "telco-data-security-tech-hollywood-secu-eymuuh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-jersey-city-secu-8mqjl2.md": {
	id: "telco-data-security-tech-jersey-city-secu-8mqjl2.md";
  slug: "telco-data-security-tech-jersey-city-secu-8mqjl2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"telco-data-security-tech-silver-spring-secu-an0tty.md": {
	id: "telco-data-security-tech-silver-spring-secu-an0tty.md";
  slug: "telco-data-security-tech-silver-spring-secu-an0tty";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-cable-technician-portland-rogers-id-mm8313.md": {
	id: "tr-cable-technician-portland-rogers-id-mm8313.md";
  slug: "tr-cable-technician-portland-rogers-id-mm8313";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-cabletech-arlington-kane-id-gg8200.md": {
	id: "tr-cabletech-arlington-kane-id-gg8200.md";
  slug: "tr-cabletech-arlington-kane-id-gg8200";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-data-installer-fremont-id-hv8477.md": {
	id: "tr-data-installer-fremont-id-hv8477.md";
  slug: "tr-data-installer-fremont-id-hv8477";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-data-installer-seattle-id-bb8834.md": {
	id: "tr-data-installer-seattle-id-bb8834.md";
  slug: "tr-data-installer-seattle-id-bb8834";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-data-installer-virginia-id-tr8001.md": {
	id: "tr-data-installer-virginia-id-tr8001.md";
  slug: "tr-data-installer-virginia-id-tr8001";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-fiber-optic-technician-mcenroe-sb-id-mm4811.md": {
	id: "tr-fiber-optic-technician-mcenroe-sb-id-mm4811.md";
  slug: "tr-fiber-optic-technician-mcenroe-sb-id-mm4811";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-journeyman-electrician-morgan-hill-rogers-id-bb5881.md": {
	id: "tr-journeyman-electrician-morgan-hill-rogers-id-bb5881.md";
  slug: "tr-journeyman-electrician-morgan-hill-rogers-id-bb5881";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-south-africa-johan-assistant-id-br2283.md": {
	id: "tr-south-africa-johan-assistant-id-br2283.md";
  slug: "tr-south-africa-johan-assistant-id-br2283";
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
