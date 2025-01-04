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
"premier-electrical.md": {
	id: "premier-electrical.md";
  slug: "premier-electrical";
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
"glossary": {
"110-block.md": {
	id: "110-block.md";
  slug: "110-block";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"66-block.md": {
	id: "66-block.md";
  slug: "66-block";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ac-disconnect.md": {
	id: "ac-disconnect.md";
  slug: "ac-disconnect";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"access-control-interface.md": {
	id: "access-control-interface.md";
  slug: "access-control-interface";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"access-credentials.md": {
	id: "access-credentials.md";
  slug: "access-credentials";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"addressable-system.md": {
	id: "addressable-system.md";
  slug: "addressable-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"alarm-keypad.md": {
	id: "alarm-keypad.md";
  slug: "alarm-keypad";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"amperage.md": {
	id: "amperage.md";
  slug: "amperage";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"amplifier.md": {
	id: "amplifier.md";
  slug: "amplifier";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"analog-input.md": {
	id: "analog-input.md";
  slug: "analog-input";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"annunciator.md": {
	id: "annunciator.md";
  slug: "annunciator";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"arc-flash.md": {
	id: "arc-flash.md";
  slug: "arc-flash";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"area-of-refuge.md": {
	id: "area-of-refuge.md";
  slug: "area-of-refuge";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"armored-cable.md": {
	id: "armored-cable.md";
  slug: "armored-cable";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"audio-amplifier.md": {
	id: "audio-amplifier.md";
  slug: "audio-amplifier";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"audio-dsp.md": {
	id: "audio-dsp.md";
  slug: "audio-dsp";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"av-bridge.md": {
	id: "av-bridge.md";
  slug: "av-bridge";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"av-rack.md": {
	id: "av-rack.md";
  slug: "av-rack";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"backbone-cabling.md": {
	id: "backbone-cabling.md";
  slug: "backbone-cabling";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"backplane.md": {
	id: "backplane.md";
  slug: "backplane";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"badge-printer.md": {
	id: "badge-printer.md";
  slug: "badge-printer";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"battery-backup.md": {
	id: "battery-backup.md";
  slug: "battery-backup";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"battery-bank.md": {
	id: "battery-bank.md";
  slug: "battery-bank";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"bda-system.md": {
	id: "bda-system.md";
  slug: "bda-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"beam-detector.md": {
	id: "beam-detector.md";
  slug: "beam-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"bonding.md": {
	id: "bonding.md";
  slug: "bonding";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"busbar.md": {
	id: "busbar.md";
  slug: "busbar";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"bypass-diode.md": {
	id: "bypass-diode.md";
  slug: "bypass-diode";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-certification.md": {
	id: "cable-certification.md";
  slug: "cable-certification";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-management.md": {
	id: "cable-management.md";
  slug: "cable-management";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-pulling.md": {
	id: "cable-pulling.md";
  slug: "cable-pulling";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-shield.md": {
	id: "cable-shield.md";
  slug: "cable-shield";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-tester.md": {
	id: "cable-tester.md";
  slug: "cable-tester";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cable-tray.md": {
	id: "cable-tray.md";
  slug: "cable-tray";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"candela-rating.md": {
	id: "candela-rating.md";
  slug: "candela-rating";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"capacitor.md": {
	id: "capacitor.md";
  slug: "capacitor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"card-reader.md": {
	id: "card-reader.md";
  slug: "card-reader";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cat6a-cable.md": {
	id: "cat6a-cable.md";
  slug: "cat6a-cable";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cellular-communicator.md": {
	id: "cellular-communicator.md";
  slug: "cellular-communicator";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"charge-controller.md": {
	id: "charge-controller.md";
  slug: "charge-controller";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"circuit-breaker.md": {
	id: "circuit-breaker.md";
  slug: "circuit-breaker";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"class-a-wiring.md": {
	id: "class-a-wiring.md";
  slug: "class-a-wiring";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"class-b-wiring.md": {
	id: "class-b-wiring.md";
  slug: "class-b-wiring";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"co-detector.md": {
	id: "co-detector.md";
  slug: "co-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cold-aisle.md": {
	id: "cold-aisle.md";
  slug: "cold-aisle";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"combiner-box.md": {
	id: "combiner-box.md";
  slug: "combiner-box";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"conductor.md": {
	id: "conductor.md";
  slug: "conductor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"conduit.md": {
	id: "conduit.md";
  slug: "conduit";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"contactor.md": {
	id: "contactor.md";
  slug: "contactor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"control-interface.md": {
	id: "control-interface.md";
  slug: "control-interface";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"control-module.md": {
	id: "control-module.md";
  slug: "control-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"control-processor.md": {
	id: "control-processor.md";
  slug: "control-processor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"conventional-system.md": {
	id: "conventional-system.md";
  slug: "conventional-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"core-switch.md": {
	id: "core-switch.md";
  slug: "core-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"cpu-module.md": {
	id: "cpu-module.md";
  slug: "cpu-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"crah-unit.md": {
	id: "crah-unit.md";
  slug: "crah-unit";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dact.md": {
	id: "dact.md";
  slug: "dact";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"data-table.md": {
	id: "data-table.md";
  slug: "data-table";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dc-disconnect.md": {
	id: "dc-disconnect.md";
  slug: "dc-disconnect";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dcim.md": {
	id: "dcim.md";
  slug: "dcim";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"digital-input.md": {
	id: "digital-input.md";
  slug: "digital-input";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"digital-mixer.md": {
	id: "digital-mixer.md";
  slug: "digital-mixer";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"disconnect-switch.md": {
	id: "disconnect-switch.md";
  slug: "disconnect-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"display-mount.md": {
	id: "display-mount.md";
  slug: "display-mount";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"door-contact.md": {
	id: "door-contact.md";
  slug: "door-contact";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"door-controller.md": {
	id: "door-controller.md";
  slug: "door-controller";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"duct-detector.md": {
	id: "duct-detector.md";
  slug: "duct-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"duress-button.md": {
	id: "duress-button.md";
  slug: "duress-button";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"electric-strike.md": {
	id: "electric-strike.md";
  slug: "electric-strike";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"elevator-recall.md": {
	id: "elevator-recall.md";
  slug: "elevator-recall";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"emt.md": {
	id: "emt.md";
  slug: "emt";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"energy-storage.md": {
	id: "energy-storage.md";
  slug: "energy-storage";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"environmental-monitoring.md": {
	id: "environmental-monitoring.md";
  slug: "environmental-monitoring";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"eol-resistor.md": {
	id: "eol-resistor.md";
  slug: "eol-resistor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"epo-system.md": {
	id: "epo-system.md";
  slug: "epo-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"equipment-shelf.md": {
	id: "equipment-shelf.md";
  slug: "equipment-shelf";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ethernet-ip.md": {
	id: "ethernet-ip.md";
  slug: "ethernet-ip";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"facp.md": {
	id: "facp.md";
  slug: "facp";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fiber-backbone.md": {
	id: "fiber-backbone.md";
  slug: "fiber-backbone";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fiber-enclosure.md": {
	id: "fiber-enclosure.md";
  slug: "fiber-enclosure";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fiber-optic-cable.md": {
	id: "fiber-optic-cable.md";
  slug: "fiber-optic-cable";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fiber-splice.md": {
	id: "fiber-splice.md";
  slug: "fiber-splice";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fiber-tray.md": {
	id: "fiber-tray.md";
  slug: "fiber-tray";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"finger-safe.md": {
	id: "finger-safe.md";
  slug: "finger-safe";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fire-alarm-log.md": {
	id: "fire-alarm-log.md";
  slug: "fire-alarm-log";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fire-alarm-runner.md": {
	id: "fire-alarm-runner.md";
  slug: "fire-alarm-runner";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fire-command-center.md": {
	id: "fire-command-center.md";
  slug: "fire-command-center";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fire-phone.md": {
	id: "fire-phone.md";
  slug: "fire-phone";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fire-sprinkler-monitor.md": {
	id: "fire-sprinkler-monitor.md";
  slug: "fire-sprinkler-monitor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"fish-tape.md": {
	id: "fish-tape.md";
  slug: "fish-tape";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"function-block.md": {
	id: "function-block.md";
  slug: "function-block";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"generator-backup.md": {
	id: "generator-backup.md";
  slug: "generator-backup";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"gfci.md": {
	id: "gfci.md";
  slug: "gfci";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"glass-break-detector.md": {
	id: "glass-break-detector.md";
  slug: "glass-break-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"graphic-annunciator.md": {
	id: "graphic-annunciator.md";
  slug: "graphic-annunciator";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ground-bar.md": {
	id: "ground-bar.md";
  slug: "ground-bar";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ground-mount.md": {
	id: "ground-mount.md";
  slug: "ground-mount";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ground-wire.md": {
	id: "ground-wire.md";
  slug: "ground-wire";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"grounding-electrode.md": {
	id: "grounding-electrode.md";
  slug: "grounding-electrode";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"grounding-system.md": {
	id: "grounding-system.md";
  slug: "grounding-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"harmonics.md": {
	id: "harmonics.md";
  slug: "harmonics";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"hda.md": {
	id: "hda.md";
  slug: "hda";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"hdbaset.md": {
	id: "hdbaset.md";
  slug: "hdbaset";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"heat-detector.md": {
	id: "heat-detector.md";
  slug: "heat-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"hmi.md": {
	id: "hmi.md";
  slug: "hmi";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"horn-strobe.md": {
	id: "horn-strobe.md";
  slug: "horn-strobe";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"hot-aisle.md": {
	id: "hot-aisle.md";
  slug: "hot-aisle";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"idf.md": {
	id: "idf.md";
  slug: "idf";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"input-module.md": {
	id: "input-module.md";
  slug: "input-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"intercom.md": {
	id: "intercom.md";
  slug: "intercom";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"inverter.md": {
	id: "inverter.md";
  slug: "inverter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ip-camera.md": {
	id: "ip-camera.md";
  slug: "ip-camera";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ir-sensor.md": {
	id: "ir-sensor.md";
  slug: "ir-sensor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"isolation-module.md": {
	id: "isolation-module.md";
  slug: "isolation-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"j-hook.md": {
	id: "j-hook.md";
  slug: "j-hook";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"junction-box.md": {
	id: "junction-box.md";
  slug: "junction-box";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"key-fob.md": {
	id: "key-fob.md";
  slug: "key-fob";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"knockout.md": {
	id: "knockout.md";
  slug: "knockout";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ladder-logic.md": {
	id: "ladder-logic.md";
  slug: "ladder-logic";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"lc-connector.md": {
	id: "lc-connector.md";
  slug: "lc-connector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"load-center.md": {
	id: "load-center.md";
  slug: "load-center";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"lockout-tagout.md": {
	id: "lockout-tagout.md";
  slug: "lockout-tagout";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"loop-card.md": {
	id: "loop-card.md";
  slug: "loop-card";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mag-door-holder.md": {
	id: "mag-door-holder.md";
  slug: "mag-door-holder";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"magnetic-lock.md": {
	id: "magnetic-lock.md";
  slug: "magnetic-lock";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mc4-connector.md": {
	id: "mc4-connector.md";
  slug: "mc4-connector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mda.md": {
	id: "mda.md";
  slug: "mda";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mdf.md": {
	id: "mdf.md";
  slug: "mdf";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mega-meter.md": {
	id: "mega-meter.md";
  slug: "mega-meter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"memory-module.md": {
	id: "memory-module.md";
  slug: "memory-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"microinverter.md": {
	id: "microinverter.md";
  slug: "microinverter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"mini-horn.md": {
	id: "mini-horn.md";
  slug: "mini-horn";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"modbus.md": {
	id: "modbus.md";
  slug: "modbus";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"monitor-module.md": {
	id: "monitor-module.md";
  slug: "monitor-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"monitoring-system.md": {
	id: "monitoring-system.md";
  slug: "monitoring-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"motion-detector.md": {
	id: "motion-detector.md";
  slug: "motion-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"motor-starter.md": {
	id: "motor-starter.md";
  slug: "motor-starter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"multimeter.md": {
	id: "multimeter.md";
  slug: "multimeter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"nac-extender.md": {
	id: "nac-extender.md";
  slug: "nac-extender";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"nac.md": {
	id: "nac.md";
  slug: "nac";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"net-meter.md": {
	id: "net-meter.md";
  slug: "net-meter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"network-camera.md": {
	id: "network-camera.md";
  slug: "network-camera";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"network-card.md": {
	id: "network-card.md";
  slug: "network-card";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"network-rack.md": {
	id: "network-rack.md";
  slug: "network-rack";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"neutral-wire.md": {
	id: "neutral-wire.md";
  slug: "neutral-wire";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"nvr.md": {
	id: "nvr.md";
  slug: "nvr";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"opc-server.md": {
	id: "opc-server.md";
  slug: "opc-server";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"otdr.md": {
	id: "otdr.md";
  slug: "otdr";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"output-module.md": {
	id: "output-module.md";
  slug: "output-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"panel-board.md": {
	id: "panel-board.md";
  slug: "panel-board";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"patch-bay.md": {
	id: "patch-bay.md";
  slug: "patch-bay";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"patch-panel.md": {
	id: "patch-panel.md";
  slug: "patch-panel";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pdu.md": {
	id: "pdu.md";
  slug: "pdu";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"phase.md": {
	id: "phase.md";
  slug: "phase";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pid-control.md": {
	id: "pid-control.md";
  slug: "pid-control";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"plenum-cable.md": {
	id: "plenum-cable.md";
  slug: "plenum-cable";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"poe-switch.md": {
	id: "poe-switch.md";
  slug: "poe-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"poe.md": {
	id: "poe.md";
  slug: "poe";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"power-conditioner.md": {
	id: "power-conditioner.md";
  slug: "power-conditioner";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"power-factor.md": {
	id: "power-factor.md";
  slug: "power-factor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"power-monitoring.md": {
	id: "power-monitoring.md";
  slug: "power-monitoring";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"power-optimizer.md": {
	id: "power-optimizer.md";
  slug: "power-optimizer";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"power-supply.md": {
	id: "power-supply.md";
  slug: "power-supply";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"production-meter.md": {
	id: "production-meter.md";
  slug: "production-meter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"profibus.md": {
	id: "profibus.md";
  slug: "profibus";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"programming-tool.md": {
	id: "programming-tool.md";
  slug: "programming-tool";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"projection-screen.md": {
	id: "projection-screen.md";
  slug: "projection-screen";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"proximity-reader.md": {
	id: "proximity-reader.md";
  slug: "proximity-reader";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ptz-camera.md": {
	id: "ptz-camera.md";
  slug: "ptz-camera";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pull-box.md": {
	id: "pull-box.md";
  slug: "pull-box";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pull-station.md": {
	id: "pull-station.md";
  slug: "pull-station";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"punch-down-tool.md": {
	id: "punch-down-tool.md";
  slug: "punch-down-tool";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"raceway.md": {
	id: "raceway.md";
  slug: "raceway";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"racking-system.md": {
	id: "racking-system.md";
  slug: "racking-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"raised-floor.md": {
	id: "raised-floor.md";
  slug: "raised-floor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"rapid-shutdown.md": {
	id: "rapid-shutdown.md";
  slug: "rapid-shutdown";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"record-of-completion.md": {
	id: "record-of-completion.md";
  slug: "record-of-completion";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"relay-module.md": {
	id: "relay-module.md";
  slug: "relay-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"relay.md": {
	id: "relay.md";
  slug: "relay";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"remote-i-o.md": {
	id: "remote-i-o.md";
  slug: "remote-i-o";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"remote-power-supply.md": {
	id: "remote-power-supply.md";
  slug: "remote-power-supply";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"remote-test-station.md": {
	id: "remote-test-station.md";
  slug: "remote-test-station";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"request-to-exit.md": {
	id: "request-to-exit.md";
  slug: "request-to-exit";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"resistance.md": {
	id: "resistance.md";
  slug: "resistance";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"rj45-connector.md": {
	id: "rj45-connector.md";
  slug: "rj45-connector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"rung.md": {
	id: "rung.md";
  slug: "rung";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"safety-plc.md": {
	id: "safety-plc.md";
  slug: "safety-plc";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"scada.md": {
	id: "scada.md";
  slug: "scada";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"security-panel.md": {
	id: "security-panel.md";
  slug: "security-panel";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"sensor-input.md": {
	id: "sensor-input.md";
  slug: "sensor-input";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"sequence-of-operations.md": {
	id: "sequence-of-operations.md";
  slug: "sequence-of-operations";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"server-rack.md": {
	id: "server-rack.md";
  slug: "server-rack";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"service-entrance.md": {
	id: "service-entrance.md";
  slug: "service-entrance";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"short-circuit.md": {
	id: "short-circuit.md";
  slug: "short-circuit";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"signal-extender.md": {
	id: "signal-extender.md";
  slug: "signal-extender";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"slc.md": {
	id: "slc.md";
  slug: "slc";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"smoke-control-panel.md": {
	id: "smoke-control-panel.md";
  slug: "smoke-control-panel";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"smoke-control.md": {
	id: "smoke-control.md";
  slug: "smoke-control";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"smoke-detector.md": {
	id: "smoke-detector.md";
  slug: "smoke-detector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"solar-controller.md": {
	id: "solar-controller.md";
  slug: "solar-controller";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"solar-optimizer.md": {
	id: "solar-optimizer.md";
  slug: "solar-optimizer";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"solar-panel.md": {
	id: "solar-panel.md";
  slug: "solar-panel";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"speaker-system.md": {
	id: "speaker-system.md";
  slug: "speaker-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"speaker-wire.md": {
	id: "speaker-wire.md";
  slug: "speaker-wire";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"static-transfer-switch.md": {
	id: "static-transfer-switch.md";
  slug: "static-transfer-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"string-inverter.md": {
	id: "string-inverter.md";
  slug: "string-inverter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"structured-text.md": {
	id: "structured-text.md";
  slug: "structured-text";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"surge-protector.md": {
	id: "surge-protector.md";
  slug: "surge-protector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"surge-suppressor.md": {
	id: "surge-suppressor.md";
  slug: "surge-suppressor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"synchronization.md": {
	id: "synchronization.md";
  slug: "synchronization";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"thermography.md": {
	id: "thermography.md";
  slug: "thermography";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"tone-generator.md": {
	id: "tone-generator.md";
  slug: "tone-generator";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"touch-panel.md": {
	id: "touch-panel.md";
  slug: "touch-panel";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"transfer-switch.md": {
	id: "transfer-switch.md";
  slug: "transfer-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"transformer.md": {
	id: "transformer.md";
  slug: "transformer";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"ups-system.md": {
	id: "ups-system.md";
  slug: "ups-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"valve-tamper.md": {
	id: "valve-tamper.md";
  slug: "valve-tamper";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"vesda.md": {
	id: "vesda.md";
  slug: "vesda";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"vfd.md": {
	id: "vfd.md";
  slug: "vfd";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"video-analytics.md": {
	id: "video-analytics.md";
  slug: "video-analytics";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"video-management.md": {
	id: "video-management.md";
  slug: "video-management";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"video-matrix.md": {
	id: "video-matrix.md";
  slug: "video-matrix";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"video-projector.md": {
	id: "video-projector.md";
  slug: "video-projector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"video-scaler.md": {
	id: "video-scaler.md";
  slug: "video-scaler";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"voice-evacuation.md": {
	id: "voice-evacuation.md";
  slug: "voice-evacuation";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"voip-phone.md": {
	id: "voip-phone.md";
  slug: "voip-phone";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"voltage-drop.md": {
	id: "voltage-drop.md";
  slug: "voltage-drop";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"voltage.md": {
	id: "voltage.md";
  slug: "voltage";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wap.md": {
	id: "wap.md";
  slug: "wap";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"water-flow-switch.md": {
	id: "water-flow-switch.md";
  slug: "water-flow-switch";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"weather-station.md": {
	id: "weather-station.md";
  slug: "weather-station";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wire-connector.md": {
	id: "wire-connector.md";
  slug: "wire-connector";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wire-gauge.md": {
	id: "wire-gauge.md";
  slug: "wire-gauge";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wire-loom.md": {
	id: "wire-loom.md";
  slug: "wire-loom";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wire-stripper.md": {
	id: "wire-stripper.md";
  slug: "wire-stripper";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"wireless-mic.md": {
	id: "wireless-mic.md";
  slug: "wireless-mic";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"zone-module.md": {
	id: "zone-module.md";
  slug: "zone-module";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
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
"integrations": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">;
  render(): Render[".md"];
}>;
"jobs": {
"3d-communications-av-systems-tech-cypress-3dcfn02rr.md": {
	id: "3d-communications-av-systems-tech-cypress-3dcfn02rr.md";
  slug: "3d-communications-av-systems-tech-cypress-3dcfn02rr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-av-systems-tech-sunnyvale-3dcp8lvus.md": {
	id: "3d-communications-av-systems-tech-sunnyvale-3dcp8lvus.md";
  slug: "3d-communications-av-systems-tech-sunnyvale-3dcp8lvus";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-tech-west-hollywood-3dcrcrv76.md": {
	id: "3d-communications-cable-tech-west-hollywood-3dcrcrv76.md";
  slug: "3d-communications-cable-tech-west-hollywood-3dcrcrv76";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-culver-city-3dcq1m7j5.md": {
	id: "3d-communications-cable-technician-culver-city-3dcq1m7j5.md";
  slug: "3d-communications-cable-technician-culver-city-3dcq1m7j5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-fort-collins-3dcaollqp.md": {
	id: "3d-communications-cable-technician-fort-collins-3dcaollqp.md";
  slug: "3d-communications-cable-technician-fort-collins-3dcaollqp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-los-angeles-3dcb0bz3t.md": {
	id: "3d-communications-cable-technician-los-angeles-3dcb0bz3t.md";
  slug: "3d-communications-cable-technician-los-angeles-3dcb0bz3t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-norfolk-3dcdoetn2.md": {
	id: "3d-communications-cable-technician-norfolk-3dcdoetn2.md";
  slug: "3d-communications-cable-technician-norfolk-3dcdoetn2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-redding-3dc2zg6sf.md": {
	id: "3d-communications-cable-technician-redding-3dc2zg6sf.md";
  slug: "3d-communications-cable-technician-redding-3dc2zg6sf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-cable-technician-vinton-3dcfvoo8q.md": {
	id: "3d-communications-cable-technician-vinton-3dcfvoo8q.md";
  slug: "3d-communications-cable-technician-vinton-3dcfvoo8q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-data-center-cable-tech-campbell-3dckt80s7.md": {
	id: "3d-communications-data-center-cable-tech-campbell-3dckt80s7.md";
  slug: "3d-communications-data-center-cable-tech-campbell-3dckt80s7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg.md": {
	id: "3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg.md";
  slug: "3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-electrician-davis-3dcl42njl.md": {
	id: "3d-communications-electrician-davis-3dcl42njl.md";
  slug: "3d-communications-electrician-davis-3dcl42njl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-electrician-pleasanton-3dcp5ctcc.md": {
	id: "3d-communications-electrician-pleasanton-3dcp5ctcc.md";
  slug: "3d-communications-electrician-pleasanton-3dcp5ctcc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-electrician-tustin-3dc9e1yrv.md": {
	id: "3d-communications-electrician-tustin-3dc9e1yrv.md";
  slug: "3d-communications-electrician-tustin-3dc9e1yrv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq.md": {
	id: "3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq.md";
  slug: "3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-emeryville-3dcft4thq.md": {
	id: "3d-communications-fire-alarm-tech-emeryville-3dcft4thq.md";
  slug: "3d-communications-fire-alarm-tech-emeryville-3dcft4thq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q.md": {
	id: "3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q.md";
  slug: "3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-industrial-electrician-huntsville-3dcdgcyjy.md": {
	id: "3d-communications-industrial-electrician-huntsville-3dcdgcyjy.md";
  slug: "3d-communications-industrial-electrician-huntsville-3dcdgcyjy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-industrial-electrician-palo-alto-3dc3vhnyq.md": {
	id: "3d-communications-industrial-electrician-palo-alto-3dc3vhnyq.md";
  slug: "3d-communications-industrial-electrician-palo-alto-3dc3vhnyq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-residential-apprentice-riverside-3dc90nih4.md": {
	id: "3d-communications-residential-apprentice-riverside-3dc90nih4.md";
  slug: "3d-communications-residential-apprentice-riverside-3dc90nih4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-security-technician-greensboro-3dcd8zye3.md": {
	id: "3d-communications-security-technician-greensboro-3dcd8zye3.md";
  slug: "3d-communications-security-technician-greensboro-3dcd8zye3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-security-technician-santa-monica-3dc9lj757.md": {
	id: "3d-communications-security-technician-santa-monica-3dc9lj757.md";
  slug: "3d-communications-security-technician-santa-monica-3dc9lj757";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"3d-communications-security-technician-walnut-creek-3dc4zmr80.md": {
	id: "3d-communications-security-technician-walnut-creek-3dc4zmr80.md";
  slug: "3d-communications-security-technician-walnut-creek-3dc4zmr80";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"access-cabling-residential-electrician-livermore-acceckkj81.md": {
	id: "access-cabling-residential-electrician-livermore-acceckkj81.md";
  slug: "access-cabling-residential-electrician-livermore-acceckkj81";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"advanced-alarm-&-fire-commercial-electrician-napa-advaf9zg9w.md": {
	id: "advanced-alarm-&-fire-commercial-electrician-napa-advaf9zg9w.md";
  slug: "advanced-alarm--fire-commercial-electrician-napa-advaf9zg9w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"advanced-alarm-&-fire-commercial-electrician-richmond-advaz0bqvl.md": {
	id: "advanced-alarm-&-fire-commercial-electrician-richmond-advaz0bqvl.md";
  slug: "advanced-alarm--fire-commercial-electrician-richmond-advaz0bqvl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"advanced-alarm-&-fire-electrician-redwood-city-advaan71lj.md": {
	id: "advanced-alarm-&-fire-electrician-redwood-city-advaan71lj.md";
  slug: "advanced-alarm--fire-electrician-redwood-city-advaan71lj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"advantage-electric-industrial-electrician-miami-advaewm2pz.md": {
	id: "advantage-electric-industrial-electrician-miami-advaewm2pz.md";
  slug: "advantage-electric-industrial-electrician-miami-advaewm2pz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"advantage-electric-service-electrician-orlando-adva5rb9br.md": {
	id: "advantage-electric-service-electrician-orlando-adva5rb9br.md";
  slug: "advantage-electric-service-electrician-orlando-adva5rb9br";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"alert-360-fire-alarm-designer-gilbert-aler409rsj.md": {
	id: "alert-360-fire-alarm-designer-gilbert-aler409rsj.md";
  slug: "alert-360-fire-alarm-designer-gilbert-aler409rsj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c.md": {
	id: "alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c.md";
  slug: "alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"alert-360-junior-project-manager-chandler-aler7g6hoc.md": {
	id: "alert-360-junior-project-manager-chandler-aler7g6hoc.md";
  slug: "alert-360-junior-project-manager-chandler-aler7g6hoc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"alert-360-security-project-manager-hillsboro-aler7vv3i5.md": {
	id: "alert-360-security-project-manager-hillsboro-aler7vv3i5.md";
  slug: "alert-360-security-project-manager-hillsboro-aler7vv3i5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
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
"arc-electric-commercial-apprentice-huntsville-arcbt2u5m.md": {
	id: "arc-electric-commercial-apprentice-huntsville-arcbt2u5m.md";
  slug: "arc-electric-commercial-apprentice-huntsville-arcbt2u5m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"arc-electric-commercial-electrician-burlington-arcqk1jlm.md": {
	id: "arc-electric-commercial-electrician-burlington-arcqk1jlm.md";
  slug: "arc-electric-commercial-electrician-burlington-arcqk1jlm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"arc-electric-service-electrician-flagstaff-arce73mzr.md": {
	id: "arc-electric-service-electrician-flagstaff-arce73mzr.md";
  slug: "arc-electric-service-electrician-flagstaff-arce73mzr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-commercial-electrician-mountain-view-aslnvsxni.md": {
	id: "asl-electric-commercial-electrician-mountain-view-aslnvsxni.md";
  slug: "asl-electric-commercial-electrician-mountain-view-aslnvsxni";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-electrician-davis-asltzzy7f.md": {
	id: "asl-electric-electrician-davis-asltzzy7f.md";
  slug: "asl-electric-electrician-davis-asltzzy7f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-electrician-newport-beach-aslx936ob.md": {
	id: "asl-electric-electrician-newport-beach-aslx936ob.md";
  slug: "asl-electric-electrician-newport-beach-aslx936ob";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-industrial-electrician-santa-cruz-aslkp61b0.md": {
	id: "asl-electric-industrial-electrician-santa-cruz-aslkp61b0.md";
  slug: "asl-electric-industrial-electrician-santa-cruz-aslkp61b0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-residential-apprentice-stockton-aslxnt3ir.md": {
	id: "asl-electric-residential-apprentice-stockton-aslxnt3ir.md";
  slug: "asl-electric-residential-apprentice-stockton-aslxnt3ir";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"asl-electric-residential-electrician-temecula-asl3mrwy3.md": {
	id: "asl-electric-residential-electrician-temecula-asl3mrwy3.md";
  slug: "asl-electric-residential-electrician-temecula-asl3mrwy3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-cable-installer-grand-rapids-atekkcyt99.md": {
	id: "atek-communications-cable-installer-grand-rapids-atekkcyt99.md";
  slug: "atek-communications-cable-installer-grand-rapids-atekkcyt99";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-commercial-apprentice-sandy-atek1uxo6n.md": {
	id: "atek-communications-commercial-apprentice-sandy-atek1uxo6n.md";
  slug: "atek-communications-commercial-apprentice-sandy-atek1uxo6n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-commercial-electrician-herndon-ateki88usr.md": {
	id: "atek-communications-commercial-electrician-herndon-ateki88usr.md";
  slug: "atek-communications-commercial-electrician-herndon-ateki88usr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-data-center-cable-tech-birmingham-atek6rcjb5.md": {
	id: "atek-communications-data-center-cable-tech-birmingham-atek6rcjb5.md";
  slug: "atek-communications-data-center-cable-tech-birmingham-atek6rcjb5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-fiber-optic-technician-greensboro-atekzjg9sx.md": {
	id: "atek-communications-fiber-optic-technician-greensboro-atekzjg9sx.md";
  slug: "atek-communications-fiber-optic-technician-greensboro-atekzjg9sx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-fire-alarm-installer-durham-ateklc89d7.md": {
	id: "atek-communications-fire-alarm-installer-durham-ateklc89d7.md";
  slug: "atek-communications-fire-alarm-installer-durham-ateklc89d7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"atek-communications-fire-alarm-installer-tempe-atek1bijmp.md": {
	id: "atek-communications-fire-alarm-installer-tempe-atek1bijmp.md";
  slug: "atek-communications-fire-alarm-installer-tempe-atek1bijmp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-estimator-los-angeles-id-bf849320nd.md": {
	id: "avispl-av-estimator-los-angeles-id-bf849320nd.md";
  slug: "avispl-av-estimator-los-angeles-id-bf849320nd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-project-manager-burbank-bf32903f.md": {
	id: "avispl-av-project-manager-burbank-bf32903f.md";
  slug: "avispl-av-project-manager-burbank-bf32903f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"avispl-av-project-manager-los-angles-id-bf84920nf.md": {
	id: "avispl-av-project-manager-los-angles-id-bf84920nf.md";
  slug: "avispl-av-project-manager-los-angles-id-bf84920nf";
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
"barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2.md": {
	id: "barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2.md";
  slug: "barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"barry-bros-security-junior-project-manager-portland-barr54u8qe.md": {
	id: "barry-bros-security-junior-project-manager-portland-barr54u8qe.md";
  slug: "barry-bros-security-junior-project-manager-portland-barr54u8qe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2.md": {
	id: "barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2.md";
  slug: "barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"barry-bros-security-security-alarm-project-manager-provo-barr2qyat7.md": {
	id: "barry-bros-security-security-alarm-project-manager-provo-barr2qyat7.md";
  slug: "barry-bros-security-security-alarm-project-manager-provo-barr2qyat7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"barry-bros-security-security-project-manager-chula-vista-barrshzf6g.md": {
	id: "barry-bros-security-security-project-manager-chula-vista-barrshzf6g.md";
  slug: "barry-bros-security-security-project-manager-chula-vista-barrshzf6g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-cable-installer-burbank-berke63lhj.md": {
	id: "berks-electrical-cable-installer-burbank-berke63lhj.md";
  slug: "berks-electrical-cable-installer-burbank-berke63lhj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-cable-installer-santa-cruz-berk0rdy5g.md": {
	id: "berks-electrical-cable-installer-santa-cruz-berk0rdy5g.md";
  slug: "berks-electrical-cable-installer-santa-cruz-berk0rdy5g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-commercial-electrician-bakersfield-berknxz38g.md": {
	id: "berks-electrical-commercial-electrician-bakersfield-berknxz38g.md";
  slug: "berks-electrical-commercial-electrician-bakersfield-berknxz38g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-commercial-electrician-riverside-berkba8tby.md": {
	id: "berks-electrical-commercial-electrician-riverside-berkba8tby.md";
  slug: "berks-electrical-commercial-electrician-riverside-berkba8tby";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-electrician-huntsville-berkff69vk.md": {
	id: "berks-electrical-electrician-huntsville-berkff69vk.md";
  slug: "berks-electrical-electrician-huntsville-berkff69vk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-electrician-ontario-berk305nlo.md": {
	id: "berks-electrical-electrician-ontario-berk305nlo.md";
  slug: "berks-electrical-electrician-ontario-berk305nlo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-electrician-san-luis-obispo-berkuz0p9h.md": {
	id: "berks-electrical-electrician-san-luis-obispo-berkuz0p9h.md";
  slug: "berks-electrical-electrician-san-luis-obispo-berkuz0p9h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-residential-electrician-san-marcos-berkfo6shd.md": {
	id: "berks-electrical-residential-electrician-san-marcos-berkfo6shd.md";
  slug: "berks-electrical-residential-electrician-san-marcos-berkfo6shd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-security-technician-elk-grove-berkhhjdqs.md": {
	id: "berks-electrical-security-technician-elk-grove-berkhhjdqs.md";
  slug: "berks-electrical-security-technician-elk-grove-berkhhjdqs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"berks-electrical-service-electrician-charleston-berk8i2sgr.md": {
	id: "berks-electrical-service-electrician-charleston-berk8i2sgr.md";
  slug: "berks-electrical-service-electrician-charleston-berk8i2sgr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-columbus-audi-6ibaj5.md": {
	id: "blackbox-audio-visual-technician-columbus-audi-6ibaj5.md";
  slug: "blackbox-audio-visual-technician-columbus-audi-6ibaj5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-las-vegas-audi-33ml4e.md": {
	id: "blackbox-audio-visual-technician-las-vegas-audi-33ml4e.md";
  slug: "blackbox-audio-visual-technician-las-vegas-audi-33ml4e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-nashville-audi-y8df46.md": {
	id: "blackbox-audio-visual-technician-nashville-audi-y8df46.md";
  slug: "blackbox-audio-visual-technician-nashville-audi-y8df46";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7.md": {
	id: "blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7.md";
  slug: "blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-charlotte-fire-x8aymx.md": {
	id: "blackbox-fire-alarm-installer-charlotte-fire-x8aymx.md";
  slug: "blackbox-fire-alarm-installer-charlotte-fire-x8aymx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-orlando-fire-jmyakz.md": {
	id: "blackbox-fire-alarm-installer-orlando-fire-jmyakz.md";
  slug: "blackbox-fire-alarm-installer-orlando-fire-jmyakz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-phoenix-fire-qx2shh.md": {
	id: "blackbox-fire-alarm-installer-phoenix-fire-qx2shh.md";
  slug: "blackbox-fire-alarm-installer-phoenix-fire-qx2shh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-bellevue-secu-giml18.md": {
	id: "blackbox-security-alarm-installer-bellevue-secu-giml18.md";
  slug: "blackbox-security-alarm-installer-bellevue-secu-giml18";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-frisco-secu-3z03lt.md": {
	id: "blackbox-security-alarm-installer-frisco-secu-3z03lt.md";
  slug: "blackbox-security-alarm-installer-frisco-secu-3z03lt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-miami-secu-jar8e4.md": {
	id: "blackbox-security-alarm-installer-miami-secu-jar8e4.md";
  slug: "blackbox-security-alarm-installer-miami-secu-jar8e4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-nashville-secu-it36sm.md": {
	id: "blackbox-security-alarm-installer-nashville-secu-it36sm.md";
  slug: "blackbox-security-alarm-installer-nashville-secu-it36sm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-austin-voic-k9he4v.md": {
	id: "blackbox-voice-&-data-cable-technician-austin-voic-k9he4v.md";
  slug: "blackbox-voice--data-cable-technician-austin-voic-k9he4v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-boise-voic-g5pqeq.md": {
	id: "blackbox-voice-&-data-cable-technician-boise-voic-g5pqeq.md";
  slug: "blackbox-voice--data-cable-technician-boise-voic-g5pqeq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-denver-voic-g2cjy1.md": {
	id: "blackbox-voice-&-data-cable-technician-denver-voic-g2cjy1.md";
  slug: "blackbox-voice--data-cable-technician-denver-voic-g2cjy1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-raleigh-voic-f7nfqj.md": {
	id: "blackbox-voice-&-data-cable-technician-raleigh-voic-f7nfqj.md";
  slug: "blackbox-voice--data-cable-technician-raleigh-voic-f7nfqj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-commercial-apprentice-boulder-bracqobr90.md": {
	id: "braco-electrical-commercial-apprentice-boulder-bracqobr90.md";
  slug: "braco-electrical-commercial-apprentice-boulder-bracqobr90";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-commercial-electrician-baltimore-bracrmhwh6.md": {
	id: "braco-electrical-commercial-electrician-baltimore-bracrmhwh6.md";
  slug: "braco-electrical-commercial-electrician-baltimore-bracrmhwh6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-commercial-electrician-madison-bracw8ov7k.md": {
	id: "braco-electrical-commercial-electrician-madison-bracw8ov7k.md";
  slug: "braco-electrical-commercial-electrician-madison-bracw8ov7k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-industrial-electrician-nashville-brac4xj4kl.md": {
	id: "braco-electrical-industrial-electrician-nashville-brac4xj4kl.md";
  slug: "braco-electrical-industrial-electrician-nashville-brac4xj4kl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-industrial-electrician-springfield-brac4pwqe3.md": {
	id: "braco-electrical-industrial-electrician-springfield-brac4pwqe3.md";
  slug: "braco-electrical-industrial-electrician-springfield-brac4pwqe3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-residential-apprentice-concord-brac10jout.md": {
	id: "braco-electrical-residential-apprentice-concord-brac10jout.md";
  slug: "braco-electrical-residential-apprentice-concord-brac10jout";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"braco-electrical-residential-apprentice-fargo-bracqbh6qa.md": {
	id: "braco-electrical-residential-apprentice-fargo-bracqbh6qa.md";
  slug: "braco-electrical-residential-apprentice-fargo-bracqbh6qa";
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
"colvin-electric-residential-apprentice-boulder-colvy187yz.md": {
	id: "colvin-electric-residential-apprentice-boulder-colvy187yz.md";
  slug: "colvin-electric-residential-apprentice-boulder-colvy187yz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"colvin-electric-residential-apprentice-duluth-colv3xkk9h.md": {
	id: "colvin-electric-residential-apprentice-duluth-colv3xkk9h.md";
  slug: "colvin-electric-residential-apprentice-duluth-colv3xkk9h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"colvin-electric-residential-electrician-peoria-colvfhqcwp.md": {
	id: "colvin-electric-residential-electrician-peoria-colvfhqcwp.md";
  slug: "colvin-electric-residential-electrician-peoria-colvfhqcwp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"colvin-electric-service-electrician-idaho-falls-colvtxpsw0.md": {
	id: "colvin-electric-service-electrician-idaho-falls-colvtxpsw0.md";
  slug: "colvin-electric-service-electrician-idaho-falls-colvtxpsw0";
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
"convergint-av-systems-tech-dallas-convtvq4t9.md": {
	id: "convergint-av-systems-tech-dallas-convtvq4t9.md";
  slug: "convergint-av-systems-tech-dallas-convtvq4t9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-av-systems-tech-kansas-city-conv8kmegf.md": {
	id: "convergint-av-systems-tech-kansas-city-conv8kmegf.md";
  slug: "convergint-av-systems-tech-kansas-city-conv8kmegf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-chico-conv4c3rmt.md": {
	id: "convergint-cable-technician-chico-conv4c3rmt.md";
  slug: "convergint-cable-technician-chico-conv4c3rmt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-eureka-convp5ci7v.md": {
	id: "convergint-cable-technician-eureka-convp5ci7v.md";
  slug: "convergint-cable-technician-eureka-convp5ci7v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-falls-church-convjkjkxw.md": {
	id: "convergint-cable-technician-falls-church-convjkjkxw.md";
  slug: "convergint-cable-technician-falls-church-convjkjkxw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-gainesville-convwrs76a.md": {
	id: "convergint-cable-technician-gainesville-convwrs76a.md";
  slug: "convergint-cable-technician-gainesville-convwrs76a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-raleigh-conv0owjw7.md": {
	id: "convergint-cable-technician-raleigh-conv0owjw7.md";
  slug: "convergint-cable-technician-raleigh-conv0owjw7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-cable-technician-san-bernardino-convuxgzd6.md": {
	id: "convergint-cable-technician-san-bernardino-convuxgzd6.md";
  slug: "convergint-cable-technician-san-bernardino-convuxgzd6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-data-center-cable-tech-indianapolis-convycmy0b.md": {
	id: "convergint-data-center-cable-tech-indianapolis-convycmy0b.md";
  slug: "convergint-data-center-cable-tech-indianapolis-convycmy0b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-data-center-cable-tech-pleasant-hill-conv2hj16r.md": {
	id: "convergint-data-center-cable-tech-pleasant-hill-conv2hj16r.md";
  slug: "convergint-data-center-cable-tech-pleasant-hill-conv2hj16r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-data-center-technician-lafayette-convc29p3z.md": {
	id: "convergint-data-center-technician-lafayette-convc29p3z.md";
  slug: "convergint-data-center-technician-lafayette-convc29p3z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-electrical-project-manager-san-bernardino-conv3umy5p.md": {
	id: "convergint-electrical-project-manager-san-bernardino-conv3umy5p.md";
  slug: "convergint-electrical-project-manager-san-bernardino-conv3umy5p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-fire-alarm-designer-west-jordan-convjm5udi.md": {
	id: "convergint-fire-alarm-designer-west-jordan-convjm5udi.md";
  slug: "convergint-fire-alarm-designer-west-jordan-convjm5udi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-larkspur-conv39fsbk.md": {
	id: "convergint-fire-alarm-tech-larkspur-conv39fsbk.md";
  slug: "convergint-fire-alarm-tech-larkspur-conv39fsbk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-marina-del-rey-convbvdsmf.md": {
	id: "convergint-fire-alarm-tech-marina-del-rey-convbvdsmf.md";
  slug: "convergint-fire-alarm-tech-marina-del-rey-convbvdsmf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-mission-viejo-conv3jj8qj.md": {
	id: "convergint-fire-alarm-tech-mission-viejo-conv3jj8qj.md";
  slug: "convergint-fire-alarm-tech-mission-viejo-conv3jj8qj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-san-ramon-conv96ivzu.md": {
	id: "convergint-fire-alarm-tech-san-ramon-conv96ivzu.md";
  slug: "convergint-fire-alarm-tech-san-ramon-conv96ivzu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-junior-project-manager-los-angeles-convdvrh97.md": {
	id: "convergint-junior-project-manager-los-angeles-convdvrh97.md";
  slug: "convergint-junior-project-manager-los-angeles-convdvrh97";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-junior-project-manager-phoenix-convx3uvcw.md": {
	id: "convergint-junior-project-manager-phoenix-convx3uvcw.md";
  slug: "convergint-junior-project-manager-phoenix-convx3uvcw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-low-voltage-cable-technician-midlothian-convb0f0u9.md": {
	id: "convergint-low-voltage-cable-technician-midlothian-convb0f0u9.md";
  slug: "convergint-low-voltage-cable-technician-midlothian-convb0f0u9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-fontana-conv59o49i.md": {
	id: "convergint-security-alarm-project-manager-fontana-conv59o49i.md";
  slug: "convergint-security-alarm-project-manager-fontana-conv59o49i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-oakland-convl2d1mo.md": {
	id: "convergint-security-alarm-project-manager-oakland-convl2d1mo.md";
  slug: "convergint-security-alarm-project-manager-oakland-convl2d1mo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-tucson-convrx1fwm.md": {
	id: "convergint-security-alarm-project-manager-tucson-convrx1fwm.md";
  slug: "convergint-security-alarm-project-manager-tucson-convrx1fwm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-project-manager-glendale-convr45orl.md": {
	id: "convergint-security-project-manager-glendale-convr45orl.md";
  slug: "convergint-security-project-manager-glendale-convr45orl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-project-manager-sacramento-convgr3gwz.md": {
	id: "convergint-security-project-manager-sacramento-convgr3gwz.md";
  slug: "convergint-security-project-manager-sacramento-convgr3gwz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-systems-tech-milwaukee-convcipwqw.md": {
	id: "convergint-security-systems-tech-milwaukee-convcipwqw.md";
  slug: "convergint-security-systems-tech-milwaukee-convcipwqw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-technician-berkeley-conv00dmcl.md": {
	id: "convergint-security-technician-berkeley-conv00dmcl.md";
  slug: "convergint-security-technician-berkeley-conv00dmcl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"convergint-security-technician-palm-springs-convey6q50.md": {
	id: "convergint-security-technician-palm-springs-convey6q50.md";
  slug: "convergint-security-technician-palm-springs-convey6q50";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg.md": {
	id: "crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg.md";
  slug: "crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-av-technician-detroit-crosa437g4.md": {
	id: "crosby-electric-av-technician-detroit-crosa437g4.md";
  slug: "crosby-electric-av-technician-detroit-crosa437g4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-cable-installer-macon-crosttn01d.md": {
	id: "crosby-electric-cable-installer-macon-crosttn01d.md";
  slug: "crosby-electric-cable-installer-macon-crosttn01d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-cable-installer-rock-hill-crosf38xyk.md": {
	id: "crosby-electric-cable-installer-rock-hill-crosf38xyk.md";
  slug: "crosby-electric-cable-installer-rock-hill-crosf38xyk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-cable-installer-sioux-falls-cros64ysuw.md": {
	id: "crosby-electric-cable-installer-sioux-falls-cros64ysuw.md";
  slug: "crosby-electric-cable-installer-sioux-falls-cros64ysuw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-cable-technician-philadelphia-crosfym7c9.md": {
	id: "crosby-electric-cable-technician-philadelphia-crosfym7c9.md";
  slug: "crosby-electric-cable-technician-philadelphia-crosfym7c9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-commercial-apprentice-dallas-cros6drdq4.md": {
	id: "crosby-electric-commercial-apprentice-dallas-cros6drdq4.md";
  slug: "crosby-electric-commercial-apprentice-dallas-cros6drdq4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-commercial-apprentice-pittsburgh-cros60lymt.md": {
	id: "crosby-electric-commercial-apprentice-pittsburgh-cros60lymt.md";
  slug: "crosby-electric-commercial-apprentice-pittsburgh-cros60lymt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-houston-cros32g0bf.md": {
	id: "crosby-electric-commercial-electrician-houston-cros32g0bf.md";
  slug: "crosby-electric-commercial-electrician-houston-cros32g0bf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-houston-crosjjzxbi.md": {
	id: "crosby-electric-commercial-electrician-houston-crosjjzxbi.md";
  slug: "crosby-electric-commercial-electrician-houston-crosjjzxbi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-new-york-city-crosmdcm1w.md": {
	id: "crosby-electric-commercial-electrician-new-york-city-crosmdcm1w.md";
  slug: "crosby-electric-commercial-electrician-new-york-city-crosmdcm1w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-glendale-cros6c0pt9.md": {
	id: "crosby-electric-controls-engineer-glendale-cros6c0pt9.md";
  slug: "crosby-electric-controls-engineer-glendale-cros6c0pt9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-sacramento-cros36gpho.md": {
	id: "crosby-electric-controls-engineer-sacramento-cros36gpho.md";
  slug: "crosby-electric-controls-engineer-sacramento-cros36gpho";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-san-antonio-crosg4g7f8.md": {
	id: "crosby-electric-controls-engineer-san-antonio-crosg4g7f8.md";
  slug: "crosby-electric-controls-engineer-san-antonio-crosg4g7f8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-electrical-apprentice-waco-cros5qylwx.md": {
	id: "crosby-electric-electrical-apprentice-waco-cros5qylwx.md";
  slug: "crosby-electric-electrical-apprentice-waco-cros5qylwx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-fire-alarm-technician-buffalo-crosbe59d5.md": {
	id: "crosby-electric-fire-alarm-technician-buffalo-crosbe59d5.md";
  slug: "crosby-electric-fire-alarm-technician-buffalo-crosbe59d5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-industrial-electrician-boston-cros0nsybd.md": {
	id: "crosby-electric-industrial-electrician-boston-cros0nsybd.md";
  slug: "crosby-electric-industrial-electrician-boston-cros0nsybd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z.md": {
	id: "crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z.md";
  slug: "crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-austin-crosgb6k9w.md": {
	id: "crosby-electric-residential-electrician-austin-crosgb6k9w.md";
  slug: "crosby-electric-residential-electrician-austin-crosgb6k9w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-charlotte-crosc8nmib.md": {
	id: "crosby-electric-residential-electrician-charlotte-crosc8nmib.md";
  slug: "crosby-electric-residential-electrician-charlotte-crosc8nmib";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-houston-crosj5k5f4.md": {
	id: "crosby-electric-residential-electrician-houston-crosj5k5f4.md";
  slug: "crosby-electric-residential-electrician-houston-crosj5k5f4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-st.-louis-crospxsxqv.md": {
	id: "crosby-electric-residential-electrician-st.-louis-crospxsxqv.md";
  slug: "crosby-electric-residential-electrician-st-louis-crospxsxqv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-residential-solar-installer-charleston-cros809bvf.md": {
	id: "crosby-electric-residential-solar-installer-charleston-cros809bvf.md";
  slug: "crosby-electric-residential-solar-installer-charleston-cros809bvf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-security-technician-virginia-beach-crosxepplz.md": {
	id: "crosby-electric-security-technician-virginia-beach-crosxepplz.md";
  slug: "crosby-electric-security-technician-virginia-beach-crosxepplz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-service-electrician-albany-crosi9scsf.md": {
	id: "crosby-electric-service-electrician-albany-crosi9scsf.md";
  slug: "crosby-electric-service-electrician-albany-crosi9scsf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-service-electrician-grand-rapids-cros7glf0d.md": {
	id: "crosby-electric-service-electrician-grand-rapids-cros7glf0d.md";
  slug: "crosby-electric-service-electrician-grand-rapids-cros7glf0d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"crosby-electric-service-electrician-springfield-crosau7mvp.md": {
	id: "crosby-electric-service-electrician-springfield-crosau7mvp.md";
  slug: "crosby-electric-service-electrician-springfield-crosau7mvp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-cable-installer-ontario-data6x2jnu.md": {
	id: "data-net-communications-cable-installer-ontario-data6x2jnu.md";
  slug: "data-net-communications-cable-installer-ontario-data6x2jnu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-cable-installer-thousand-oaks-datatjdmlg.md": {
	id: "data-net-communications-cable-installer-thousand-oaks-datatjdmlg.md";
  slug: "data-net-communications-cable-installer-thousand-oaks-datatjdmlg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-commercial-electrician-fairfield-datal1qo6b.md": {
	id: "data-net-communications-commercial-electrician-fairfield-datal1qo6b.md";
  slug: "data-net-communications-commercial-electrician-fairfield-datal1qo6b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-electrician-burbank-data3eoh20.md": {
	id: "data-net-communications-electrician-burbank-data3eoh20.md";
  slug: "data-net-communications-electrician-burbank-data3eoh20";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-electrician-murrieta-datal53uae.md": {
	id: "data-net-communications-electrician-murrieta-datal53uae.md";
  slug: "data-net-communications-electrician-murrieta-datal53uae";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-industrial-electrician-santa-rosa-data83noo2.md": {
	id: "data-net-communications-industrial-electrician-santa-rosa-data83noo2.md";
  slug: "data-net-communications-industrial-electrician-santa-rosa-data83noo2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-industrial-electrician-visalia-data6uzmpl.md": {
	id: "data-net-communications-industrial-electrician-visalia-data6uzmpl.md";
  slug: "data-net-communications-industrial-electrician-visalia-data6uzmpl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-residential-electrician-palm-springs-datacfe5ut.md": {
	id: "data-net-communications-residential-electrician-palm-springs-datacfe5ut.md";
  slug: "data-net-communications-residential-electrician-palm-springs-datacfe5ut";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-security-technician-anaheim-data1ma57g.md": {
	id: "data-net-communications-security-technician-anaheim-data1ma57g.md";
  slug: "data-net-communications-security-technician-anaheim-data1ma57g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-service-electrician-modesto-datakoblxp.md": {
	id: "data-net-communications-service-electrician-modesto-datakoblxp.md";
  slug: "data-net-communications-service-electrician-modesto-datakoblxp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-service-electrician-redding-datab5e3on.md": {
	id: "data-net-communications-service-electrician-redding-datab5e3on.md";
  slug: "data-net-communications-service-electrician-redding-datab5e3on";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"data-net-communications-service-electrician-victorville-data1xc0fz.md": {
	id: "data-net-communications-service-electrician-victorville-data1xc0fz.md";
  slug: "data-net-communications-service-electrician-victorville-data1xc0fz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-commercial-electrician-wyoming-dire785g0p.md": {
	id: "direct-connect-commercial-electrician-wyoming-dire785g0p.md";
  slug: "direct-connect-commercial-electrician-wyoming-dire785g0p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-data-center-cable-tech-mishawaka-direfw4t13.md": {
	id: "direct-connect-data-center-cable-tech-mishawaka-direfw4t13.md";
  slug: "direct-connect-data-center-cable-tech-mishawaka-direfw4t13";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-data-center-technician-college-station-direypkqyj.md": {
	id: "direct-connect-data-center-technician-college-station-direypkqyj.md";
  slug: "direct-connect-data-center-technician-college-station-direypkqyj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-data-center-technician-edison-dirervr2t7.md": {
	id: "direct-connect-data-center-technician-edison-dirervr2t7.md";
  slug: "direct-connect-data-center-technician-edison-dirervr2t7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-data-center-technician-orange-park-direpdbusn.md": {
	id: "direct-connect-data-center-technician-orange-park-direpdbusn.md";
  slug: "direct-connect-data-center-technician-orange-park-direpdbusn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-fiber-optic-technician-bloomington-dire63fndk.md": {
	id: "direct-connect-fiber-optic-technician-bloomington-dire63fndk.md";
  slug: "direct-connect-fiber-optic-technician-bloomington-dire63fndk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"direct-connect-fire-alarm-installer-durham-direix6svh.md": {
	id: "direct-connect-fire-alarm-installer-durham-direix6svh.md";
  slug: "direct-connect-fire-alarm-installer-durham-direix6svh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dodge-electric-cable-installer-wilmington-dodgao0ib1.md": {
	id: "dodge-electric-cable-installer-wilmington-dodgao0ib1.md";
  slug: "dodge-electric-cable-installer-wilmington-dodgao0ib1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dodge-electric-commercial-electrician-chicago-dodgprq3f6.md": {
	id: "dodge-electric-commercial-electrician-chicago-dodgprq3f6.md";
  slug: "dodge-electric-commercial-electrician-chicago-dodgprq3f6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dodge-electric-residential-electrician-biloxi-dodggxjj21.md": {
	id: "dodge-electric-residential-electrician-biloxi-dodggxjj21.md";
  slug: "dodge-electric-residential-electrician-biloxi-dodggxjj21";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dodge-electric-service-electrician-new-haven-dodg4h9hao.md": {
	id: "dodge-electric-service-electrician-new-haven-dodg4h9hao.md";
  slug: "dodge-electric-service-electrician-new-haven-dodg4h9hao";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dp-electric-commercial-apprentice-raleigh-dpeswbmk7.md": {
	id: "dp-electric-commercial-apprentice-raleigh-dpeswbmk7.md";
  slug: "dp-electric-commercial-apprentice-raleigh-dpeswbmk7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"dp-electric-residential-electrician-little-rock-dpewpe4bj.md": {
	id: "dp-electric-residential-electrician-little-rock-dpewpe4bj.md";
  slug: "dp-electric-residential-electrician-little-rock-dpewpe4bj";
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
"enhanced-voice-&-data-cable-installer-plano-enha2umj38.md": {
	id: "enhanced-voice-&-data-cable-installer-plano-enha2umj38.md";
  slug: "enhanced-voice--data-cable-installer-plano-enha2umj38";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-commercial-apprentice-grove-city-enha5zj5k2.md": {
	id: "enhanced-voice-&-data-commercial-apprentice-grove-city-enha5zj5k2.md";
  slug: "enhanced-voice--data-commercial-apprentice-grove-city-enha5zj5k2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-commercial-electrician-amarillo-enhafgt9vn.md": {
	id: "enhanced-voice-&-data-commercial-electrician-amarillo-enhafgt9vn.md";
  slug: "enhanced-voice--data-commercial-electrician-amarillo-enhafgt9vn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-commercial-electrician-lincoln-enha6sg3e2.md": {
	id: "enhanced-voice-&-data-commercial-electrician-lincoln-enha6sg3e2.md";
  slug: "enhanced-voice--data-commercial-electrician-lincoln-enha6sg3e2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-commercial-electrician-minneapolis-enhajr9g7d.md": {
	id: "enhanced-voice-&-data-commercial-electrician-minneapolis-enhajr9g7d.md";
  slug: "enhanced-voice--data-commercial-electrician-minneapolis-enhajr9g7d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-data-center-technician-miami-springs-enhafxlhpt.md": {
	id: "enhanced-voice-&-data-data-center-technician-miami-springs-enhafxlhpt.md";
  slug: "enhanced-voice--data-data-center-technician-miami-springs-enhafxlhpt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-fiber-optic-technician-des-moines-enhauynqwt.md": {
	id: "enhanced-voice-&-data-fiber-optic-technician-des-moines-enhauynqwt.md";
  slug: "enhanced-voice--data-fiber-optic-technician-des-moines-enhauynqwt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-fiber-optic-technician-pearland-enhalx9ley.md": {
	id: "enhanced-voice-&-data-fiber-optic-technician-pearland-enhalx9ley.md";
  slug: "enhanced-voice--data-fiber-optic-technician-pearland-enhalx9ley";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-fire-alarm-installer-apex-enha9s1ffm.md": {
	id: "enhanced-voice-&-data-fire-alarm-installer-apex-enha9s1ffm.md";
  slug: "enhanced-voice--data-fire-alarm-installer-apex-enha9s1ffm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-fire-alarm-installer-honolulu-enha3e5t0l.md": {
	id: "enhanced-voice-&-data-fire-alarm-installer-honolulu-enha3e5t0l.md";
  slug: "enhanced-voice--data-fire-alarm-installer-honolulu-enha3e5t0l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"enhanced-voice-&-data-security-technician-sparks-enhacta3zd.md": {
	id: "enhanced-voice-&-data-security-technician-sparks-enhacta3zd.md";
  slug: "enhanced-voice--data-security-technician-sparks-enhacta3zd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"eskew-electric-electrician-newark-eske99fhjg.md": {
	id: "eskew-electric-electrician-newark-eske99fhjg.md";
  slug: "eskew-electric-electrician-newark-eske99fhjg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"eskew-electric-industrial-electrician-baton-rouge-eske8bjppg.md": {
	id: "eskew-electric-industrial-electrician-baton-rouge-eske8bjppg.md";
  slug: "eskew-electric-industrial-electrician-baton-rouge-eske8bjppg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"eskew-electric-industrial-electrician-st.-louis-eske7ewyrt.md": {
	id: "eskew-electric-industrial-electrician-st.-louis-eske7ewyrt.md";
  slug: "eskew-electric-industrial-electrician-st-louis-eske7ewyrt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"eskew-electric-residential-apprentice-lincoln-eskeska4zb.md": {
	id: "eskew-electric-residential-apprentice-lincoln-eskeska4zb.md";
  slug: "eskew-electric-residential-apprentice-lincoln-eskeska4zb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"eskew-electric-security-technician-jackson-eskeww8maj.md": {
	id: "eskew-electric-security-technician-jackson-eskeww8maj.md";
  slug: "eskew-electric-security-technician-jackson-eskeww8maj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"esp-electrical-commercial-apprentice-indianapolis-esp79byw4.md": {
	id: "esp-electrical-commercial-apprentice-indianapolis-esp79byw4.md";
  slug: "esp-electrical-commercial-apprentice-indianapolis-esp79byw4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"esp-electrical-commercial-apprentice-omaha-esp6it0yd.md": {
	id: "esp-electrical-commercial-apprentice-omaha-esp6it0yd.md";
  slug: "esp-electrical-commercial-apprentice-omaha-esp6it0yd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"esp-electrical-commercial-electrician-atlantic-city-espjnwmip.md": {
	id: "esp-electrical-commercial-electrician-atlantic-city-espjnwmip.md";
  slug: "esp-electrical-commercial-electrician-atlantic-city-espjnwmip";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"esp-electrical-commercial-electrician-kansas-city-espl6j14y.md": {
	id: "esp-electrical-commercial-electrician-kansas-city-espl6j14y.md";
  slug: "esp-electrical-commercial-electrician-kansas-city-espl6j14y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"esp-electrical-electrician-birmingham-esp7w2xc4.md": {
	id: "esp-electrical-electrician-birmingham-esp7w2xc4.md";
  slug: "esp-electrical-electrician-birmingham-esp7w2xc4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"expert-wire-apprentice-electrician-newark-expe920yqo.md": {
	id: "expert-wire-apprentice-electrician-newark-expe920yqo.md";
  slug: "expert-wire-apprentice-electrician-newark-expe920yqo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"expert-wire-commercial-electrician-durham-expe7fsg53.md": {
	id: "expert-wire-commercial-electrician-durham-expe7fsg53.md";
  slug: "expert-wire-commercial-electrician-durham-expe7fsg53";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"expert-wire-commercial-electrician-pflugerville-expeahp9sg.md": {
	id: "expert-wire-commercial-electrician-pflugerville-expeahp9sg.md";
  slug: "expert-wire-commercial-electrician-pflugerville-expeahp9sg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"expert-wire-security-technician-franklin-expeusv2g6.md": {
	id: "expert-wire-security-technician-franklin-expeusv2g6.md";
  slug: "expert-wire-security-technician-franklin-expeusv2g6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-commercial-electrician-tampa-eze3lspni.md": {
	id: "ez-electric-commercial-electrician-tampa-eze3lspni.md";
  slug: "ez-electric-commercial-electrician-tampa-eze3lspni";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-electrician-boise-ezeoxaeyu.md": {
	id: "ez-electric-electrician-boise-ezeoxaeyu.md";
  slug: "ez-electric-electrician-boise-ezeoxaeyu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-electrician-colorado-springs-ezej4p4yu.md": {
	id: "ez-electric-electrician-colorado-springs-ezej4p4yu.md";
  slug: "ez-electric-electrician-colorado-springs-ezej4p4yu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-electrician-columbia-eze81jomc.md": {
	id: "ez-electric-electrician-columbia-eze81jomc.md";
  slug: "ez-electric-electrician-columbia-eze81jomc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-industrial-electrician-bismarck-ezelbso0b.md": {
	id: "ez-electric-industrial-electrician-bismarck-ezelbso0b.md";
  slug: "ez-electric-industrial-electrician-bismarck-ezelbso0b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-industrial-electrician-minneapolis-eze9dhs6z.md": {
	id: "ez-electric-industrial-electrician-minneapolis-eze9dhs6z.md";
  slug: "ez-electric-industrial-electrician-minneapolis-eze9dhs6z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-residential-apprentice-providence-eze2fa96g.md": {
	id: "ez-electric-residential-apprentice-providence-eze2fa96g.md";
  slug: "ez-electric-residential-apprentice-providence-eze2fa96g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ez-electric-residential-electrician-denver-eze1wovxh.md": {
	id: "ez-electric-residential-electrician-denver-eze1wovxh.md";
  slug: "ez-electric-residential-electrician-denver-eze1wovxh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8.md": {
	id: "faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8.md";
  slug: "faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-commercial-master-electrician-newark-faitd0wshz.md": {
	id: "faith-technologies-commercial-master-electrician-newark-faitd0wshz.md";
  slug: "faith-technologies-commercial-master-electrician-newark-faitd0wshz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz.md": {
	id: "faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz.md";
  slug: "faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-healthcare-master-electrician-springfield-faitlufg7y.md": {
	id: "faith-technologies-healthcare-master-electrician-springfield-faitlufg7y.md";
  slug: "faith-technologies-healthcare-master-electrician-springfield-faitlufg7y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3.md": {
	id: "faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3.md";
  slug: "faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6.md": {
	id: "faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6.md";
  slug: "faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv.md": {
	id: "faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv.md";
  slug: "faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9.md": {
	id: "faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9.md";
  slug: "faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-pv-system-master-electrician-buffalo-faitff7hem.md": {
	id: "faith-technologies-pv-system-master-electrician-buffalo-faitff7hem.md";
  slug: "faith-technologies-pv-system-master-electrician-buffalo-faitff7hem";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0.md": {
	id: "faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0.md";
  slug: "faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-repair-controls-electrician-richmond-fait1e89ui.md": {
	id: "faith-technologies-repair-controls-electrician-richmond-fait1e89ui.md";
  slug: "faith-technologies-repair-controls-electrician-richmond-fait1e89ui";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-residential-controls-electrician-binghamton-faitimjecn.md": {
	id: "faith-technologies-residential-controls-electrician-binghamton-faitimjecn.md";
  slug: "faith-technologies-residential-controls-electrician-binghamton-faitimjecn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-service-apprentice-electrician-gary-faitdz6nfh.md": {
	id: "faith-technologies-service-apprentice-electrician-gary-faitdz6nfh.md";
  slug: "faith-technologies-service-apprentice-electrician-gary-faitdz6nfh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs.md": {
	id: "faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs.md";
  slug: "faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs";
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
"granite-state-electric-audio-visual-technician-providence-granf76hpn.md": {
	id: "granite-state-electric-audio-visual-technician-providence-granf76hpn.md";
  slug: "granite-state-electric-audio-visual-technician-providence-granf76hpn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-cable-installer-richmond-gran7pf9nw.md": {
	id: "granite-state-electric-cable-installer-richmond-gran7pf9nw.md";
  slug: "granite-state-electric-cable-installer-richmond-gran7pf9nw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-commercial-apprentice-annapolis-granx40hai.md": {
	id: "granite-state-electric-commercial-apprentice-annapolis-granx40hai.md";
  slug: "granite-state-electric-commercial-apprentice-annapolis-granx40hai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-commercial-apprentice-rapid-city-granzyrs75.md": {
	id: "granite-state-electric-commercial-apprentice-rapid-city-granzyrs75.md";
  slug: "granite-state-electric-commercial-apprentice-rapid-city-granzyrs75";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p.md": {
	id: "granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p.md";
  slug: "granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u.md": {
	id: "granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u.md";
  slug: "granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-residential-solar-installer-tulsa-gran706wot.md": {
	id: "granite-state-electric-residential-solar-installer-tulsa-gran706wot.md";
  slug: "granite-state-electric-residential-solar-installer-tulsa-gran706wot";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-security-technician-asheville-granjv277p.md": {
	id: "granite-state-electric-security-technician-asheville-granjv277p.md";
  slug: "granite-state-electric-security-technician-asheville-granjv277p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-security-technician-dover-gran3946t7.md": {
	id: "granite-state-electric-security-technician-dover-gran3946t7.md";
  slug: "granite-state-electric-security-technician-dover-gran3946t7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-security-technician-pittsburgh-grant0042o.md": {
	id: "granite-state-electric-security-technician-pittsburgh-grant0042o.md";
  slug: "granite-state-electric-security-technician-pittsburgh-grant0042o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"granite-state-electric-voice-data-installer-marietta-granghewzg.md": {
	id: "granite-state-electric-voice-data-installer-marietta-granghewzg.md";
  slug: "granite-state-electric-voice-data-installer-marietta-granghewzg";
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
"h-&-a-electric-apprentice-electrician-mount-pleasant-h&bhja2s.md": {
	id: "h-&-a-electric-apprentice-electrician-mount-pleasant-h&bhja2s.md";
  slug: "h--a-electric-apprentice-electrician-mount-pleasant-hbhja2s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"h-&-a-electric-data-center-technician-johns-creek-h&knxekt.md": {
	id: "h-&-a-electric-data-center-technician-johns-creek-h&knxekt.md";
  slug: "h--a-electric-data-center-technician-johns-creek-hknxekt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"h-&-a-electric-security-technician-round-rock-h&xa17r5.md": {
	id: "h-&-a-electric-security-technician-round-rock-h&xa17r5.md";
  slug: "h--a-electric-security-technician-round-rock-hxa17r5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-av-systems-tech-omaha-hcii5mgbn.md": {
	id: "hci-systems-av-systems-tech-omaha-hcii5mgbn.md";
  slug: "hci-systems-av-systems-tech-omaha-hcii5mgbn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-installer-merced-hcif38khy.md": {
	id: "hci-systems-cable-installer-merced-hcif38khy.md";
  slug: "hci-systems-cable-installer-merced-hcif38khy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-installer-oxnard-hciughme3.md": {
	id: "hci-systems-cable-installer-oxnard-hciughme3.md";
  slug: "hci-systems-cable-installer-oxnard-hciughme3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-tech-anaheim-hciix6rnn.md": {
	id: "hci-systems-cable-tech-anaheim-hciix6rnn.md";
  slug: "hci-systems-cable-tech-anaheim-hciix6rnn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-technician-kennesaw-hcik6cewt.md": {
	id: "hci-systems-cable-technician-kennesaw-hcik6cewt.md";
  slug: "hci-systems-cable-technician-kennesaw-hcik6cewt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-technician-richmond-hcia3kr1u.md": {
	id: "hci-systems-cable-technician-richmond-hcia3kr1u.md";
  slug: "hci-systems-cable-technician-richmond-hcia3kr1u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-cable-technician-riverside-hcizzwtbq.md": {
	id: "hci-systems-cable-technician-riverside-hcizzwtbq.md";
  slug: "hci-systems-cable-technician-riverside-hcizzwtbq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e.md": {
	id: "hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e.md";
  slug: "hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-data-center-technician-fort-collins-hcib08dty.md": {
	id: "hci-systems-data-center-technician-fort-collins-hcib08dty.md";
  slug: "hci-systems-data-center-technician-fort-collins-hcib08dty";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-electrician-san-rafael-hcikcx4nu.md": {
	id: "hci-systems-electrician-san-rafael-hcikcx4nu.md";
  slug: "hci-systems-electrician-san-rafael-hcikcx4nu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-fire-alarm-tech-denver-hcipqjlhi.md": {
	id: "hci-systems-fire-alarm-tech-denver-hcipqjlhi.md";
  slug: "hci-systems-fire-alarm-tech-denver-hcipqjlhi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5.md": {
	id: "hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5.md";
  slug: "hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-residential-apprentice-fresno-hcik2j2ts.md": {
	id: "hci-systems-residential-apprentice-fresno-hcik2j2ts.md";
  slug: "hci-systems-residential-apprentice-fresno-hcik2j2ts";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-residential-electrician-carlsbad-hci81etsz.md": {
	id: "hci-systems-residential-electrician-carlsbad-hci81etsz.md";
  slug: "hci-systems-residential-electrician-carlsbad-hci81etsz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-residential-solar-installer-roanoke-hci9q3ro3.md": {
	id: "hci-systems-residential-solar-installer-roanoke-hci9q3ro3.md";
  slug: "hci-systems-residential-solar-installer-roanoke-hci9q3ro3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-systems-tech-mill-valley-hcimeu8nb.md": {
	id: "hci-systems-security-systems-tech-mill-valley-hcimeu8nb.md";
  slug: "hci-systems-security-systems-tech-mill-valley-hcimeu8nb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-technician-calabasas-hcifg6z5h.md": {
	id: "hci-systems-security-technician-calabasas-hcifg6z5h.md";
  slug: "hci-systems-security-technician-calabasas-hcifg6z5h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-technician-malibu-hciifinvq.md": {
	id: "hci-systems-security-technician-malibu-hciifinvq.md";
  slug: "hci-systems-security-technician-malibu-hciifinvq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-technician-manhattan-beach-hcijz18uj.md": {
	id: "hci-systems-security-technician-manhattan-beach-hcijz18uj.md";
  slug: "hci-systems-security-technician-manhattan-beach-hcijz18uj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-technician-mission-viejo-hciqm1x1m.md": {
	id: "hci-systems-security-technician-mission-viejo-hciqm1x1m.md";
  slug: "hci-systems-security-technician-mission-viejo-hciqm1x1m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-security-technician-san-francisco-hcim8t1fd.md": {
	id: "hci-systems-security-technician-san-francisco-hcim8t1fd.md";
  slug: "hci-systems-security-technician-san-francisco-hcim8t1fd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hci-systems-service-electrician-camarillo-hciihyvoz.md": {
	id: "hci-systems-service-electrician-camarillo-hciihyvoz.md";
  slug: "hci-systems-service-electrician-camarillo-hciihyvoz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat.md": {
	id: "hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat.md";
  slug: "hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe.md": {
	id: "hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe.md";
  slug: "hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1.md": {
	id: "hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1.md";
  slug: "hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57.md": {
	id: "hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57.md";
  slug: "hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-cable-tech-baltimore-hcswxi0t4.md": {
	id: "hcs-electrical-cable-tech-baltimore-hcswxi0t4.md";
  slug: "hcs-electrical-cable-tech-baltimore-hcswxi0t4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-cable-technician-spartanburg-hcsdyt8qj.md": {
	id: "hcs-electrical-cable-technician-spartanburg-hcsdyt8qj.md";
  slug: "hcs-electrical-cable-technician-spartanburg-hcsdyt8qj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-cable-technician-warner-robins-hcs9gpckg.md": {
	id: "hcs-electrical-cable-technician-warner-robins-hcs9gpckg.md";
  slug: "hcs-electrical-cable-technician-warner-robins-hcs9gpckg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-ashburn-hcsp7eota.md": {
	id: "hcs-electrical-commercial-electrician-ashburn-hcsp7eota.md";
  slug: "hcs-electrical-commercial-electrician-ashburn-hcsp7eota";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-dallas-hcsn18t0f.md": {
	id: "hcs-electrical-commercial-electrician-dallas-hcsn18t0f.md";
  slug: "hcs-electrical-commercial-electrician-dallas-hcsn18t0f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p.md": {
	id: "hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p.md";
  slug: "hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-charlotte-hcsc46pxj.md": {
	id: "hcs-electrical-electrician-charlotte-hcsc46pxj.md";
  slug: "hcs-electrical-electrician-charlotte-hcsc46pxj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-chesapeake-hcs2ila19.md": {
	id: "hcs-electrical-electrician-chesapeake-hcs2ila19.md";
  slug: "hcs-electrical-electrician-chesapeake-hcs2ila19";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-dalton-hcswigkbz.md": {
	id: "hcs-electrical-electrician-dalton-hcswigkbz.md";
  slug: "hcs-electrical-electrician-dalton-hcswigkbz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-greensboro-hcsscxxc8.md": {
	id: "hcs-electrical-electrician-greensboro-hcsscxxc8.md";
  slug: "hcs-electrical-electrician-greensboro-hcsscxxc8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-hampstead-hcsp0br4k.md": {
	id: "hcs-electrical-electrician-hampstead-hcsp0br4k.md";
  slug: "hcs-electrical-electrician-hampstead-hcsp0br4k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-electrician-savannah-hcsch6mu8.md": {
	id: "hcs-electrical-electrician-savannah-hcsch6mu8.md";
  slug: "hcs-electrical-electrician-savannah-hcsch6mu8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"hcs-electrical-security-technician-wilmington-hcsb2474u.md": {
	id: "hcs-electrical-security-technician-wilmington-hcsb2474u.md";
  slug: "hcs-electrical-security-technician-wilmington-hcsb2474u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-apprentice-electrician-birmingham-heli20w9cd.md": {
	id: "helix-electric-apprentice-electrician-birmingham-heli20w9cd.md";
  slug: "helix-electric-apprentice-electrician-birmingham-heli20w9cd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-apprentice-electrician-dallas-heli4e9odi.md": {
	id: "helix-electric-apprentice-electrician-dallas-heli4e9odi.md";
  slug: "helix-electric-apprentice-electrician-dallas-heli4e9odi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-audio-visual-technician-norman-helinyo7vv.md": {
	id: "helix-electric-audio-visual-technician-norman-helinyo7vv.md";
  slug: "helix-electric-audio-visual-technician-norman-helinyo7vv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-automation-controls-specialist-st.-louis-helikal1n6.md": {
	id: "helix-electric-automation-controls-specialist-st.-louis-helikal1n6.md";
  slug: "helix-electric-automation-controls-specialist-st-louis-helikal1n6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-av-technician-atlanta-helij3v2xl.md": {
	id: "helix-electric-av-technician-atlanta-helij3v2xl.md";
  slug: "helix-electric-av-technician-atlanta-helij3v2xl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-tech-broomfield-helicz27b2.md": {
	id: "helix-electric-cable-tech-broomfield-helicz27b2.md";
  slug: "helix-electric-cable-tech-broomfield-helicz27b2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-tech-chicago-heliceyg2f.md": {
	id: "helix-electric-cable-tech-chicago-heliceyg2f.md";
  slug: "helix-electric-cable-tech-chicago-heliceyg2f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-tech-greenville-helict3hje.md": {
	id: "helix-electric-cable-tech-greenville-helict3hje.md";
  slug: "helix-electric-cable-tech-greenville-helict3hje";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-tech-louisville-helimr5pgz.md": {
	id: "helix-electric-cable-tech-louisville-helimr5pgz.md";
  slug: "helix-electric-cable-tech-louisville-helimr5pgz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-technician-denver-heliix0qr2.md": {
	id: "helix-electric-cable-technician-denver-heliix0qr2.md";
  slug: "helix-electric-cable-technician-denver-heliix0qr2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-technician-myrtle-beach-helirfev9q.md": {
	id: "helix-electric-cable-technician-myrtle-beach-helirfev9q.md";
  slug: "helix-electric-cable-technician-myrtle-beach-helirfev9q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-technician-raleigh-helir1a1hh.md": {
	id: "helix-electric-cable-technician-raleigh-helir1a1hh.md";
  slug: "helix-electric-cable-technician-raleigh-helir1a1hh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-cable-technician-winston-salem-helihmyuhs.md": {
	id: "helix-electric-cable-technician-winston-salem-helihmyuhs.md";
  slug: "helix-electric-cable-technician-winston-salem-helihmyuhs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-commercial-apprentice-colorado-springs-heliniy1uf.md": {
	id: "helix-electric-commercial-apprentice-colorado-springs-heliniy1uf.md";
  slug: "helix-electric-commercial-apprentice-colorado-springs-heliniy1uf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-commercial-electrician-naperville-heli6shsgd.md": {
	id: "helix-electric-commercial-electrician-naperville-heli6shsgd.md";
  slug: "helix-electric-commercial-electrician-naperville-heli6shsgd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-commercial-electrician-sterling-heli2hmntk.md": {
	id: "helix-electric-commercial-electrician-sterling-heli2hmntk.md";
  slug: "helix-electric-commercial-electrician-sterling-heli2hmntk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-controls-technician-dallas-helim8z98w.md": {
	id: "helix-electric-controls-technician-dallas-helim8z98w.md";
  slug: "helix-electric-controls-technician-dallas-helim8z98w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-boston-heliciwj7c.md": {
	id: "helix-electric-data-center-technician-boston-heliciwj7c.md";
  slug: "helix-electric-data-center-technician-boston-heliciwj7c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-chattanooga-heliu5scud.md": {
	id: "helix-electric-data-center-technician-chattanooga-heliu5scud.md";
  slug: "helix-electric-data-center-technician-chattanooga-heliu5scud";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-provo-heliz139qv.md": {
	id: "helix-electric-data-center-technician-provo-heliz139qv.md";
  slug: "helix-electric-data-center-technician-provo-heliz139qv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-electrician-athens-heliolvrck.md": {
	id: "helix-electric-electrician-athens-heliolvrck.md";
  slug: "helix-electric-electrician-athens-heliolvrck";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-electrician-phoenix-heliwsqb15.md": {
	id: "helix-electric-electrician-phoenix-heliwsqb15.md";
  slug: "helix-electric-electrician-phoenix-heliwsqb15";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-electrician-salisbury-helio96bad.md": {
	id: "helix-electric-electrician-salisbury-helio96bad.md";
  slug: "helix-electric-electrician-salisbury-helio96bad";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-electrician-smyrna-helisdmq9l.md": {
	id: "helix-electric-electrician-smyrna-helisdmq9l.md";
  slug: "helix-electric-electrician-smyrna-helisdmq9l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-electrician-snyder-heliwtxb7x.md": {
	id: "helix-electric-electrician-snyder-heliwtxb7x.md";
  slug: "helix-electric-electrician-snyder-heliwtxb7x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-fiber-optics-installer-franklin-helig342hc.md": {
	id: "helix-electric-fiber-optics-installer-franklin-helig342hc.md";
  slug: "helix-electric-fiber-optics-installer-franklin-helig342hc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-fire-alarm-technician-memphis-helidv8ek4.md": {
	id: "helix-electric-fire-alarm-technician-memphis-helidv8ek4.md";
  slug: "helix-electric-fire-alarm-technician-memphis-helidv8ek4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-industrial-electrician-washington-heli9w9jbs.md": {
	id: "helix-electric-industrial-electrician-washington-heli9w9jbs.md";
  slug: "helix-electric-industrial-electrician-washington-heli9w9jbs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-bakersfield-heliih5w20.md": {
	id: "helix-electric-journeyman-electrician-bakersfield-heliih5w20.md";
  slug: "helix-electric-journeyman-electrician-bakersfield-heliih5w20";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-oxnard-helisi6oyo.md": {
	id: "helix-electric-journeyman-electrician-oxnard-helisi6oyo.md";
  slug: "helix-electric-journeyman-electrician-oxnard-helisi6oyo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-sacramento-heli356f0d.md": {
	id: "helix-electric-journeyman-electrician-sacramento-heli356f0d.md";
  slug: "helix-electric-journeyman-electrician-sacramento-heli356f0d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-san-francisco-helir1e46h.md": {
	id: "helix-electric-journeyman-electrician-san-francisco-helir1e46h.md";
  slug: "helix-electric-journeyman-electrician-san-francisco-helir1e46h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-san-jose-heli2uc6q0.md": {
	id: "helix-electric-journeyman-electrician-san-jose-heli2uc6q0.md";
  slug: "helix-electric-journeyman-electrician-san-jose-heli2uc6q0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-process-controls-technician-atlanta-heli0vlrbl.md": {
	id: "helix-electric-process-controls-technician-atlanta-heli0vlrbl.md";
  slug: "helix-electric-process-controls-technician-atlanta-heli0vlrbl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-residential-electrician-chicago-heliutx0id.md": {
	id: "helix-electric-residential-electrician-chicago-heliutx0id.md";
  slug: "helix-electric-residential-electrician-chicago-heliutx0id";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-residential-solar-installer-aurora-heli1nn6bs.md": {
	id: "helix-electric-residential-solar-installer-aurora-heli1nn6bs.md";
  slug: "helix-electric-residential-solar-installer-aurora-heli1nn6bs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-security-technician-columbus-heli9mbxz5.md": {
	id: "helix-electric-security-technician-columbus-heli9mbxz5.md";
  slug: "helix-electric-security-technician-columbus-heli9mbxz5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-security-technician-denver-helitxj3wi.md": {
	id: "helix-electric-security-technician-denver-helitxj3wi.md";
  slug: "helix-electric-security-technician-denver-helitxj3wi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-security-technician-san-antonio-heliwiname.md": {
	id: "helix-electric-security-technician-san-antonio-heliwiname.md";
  slug: "helix-electric-security-technician-san-antonio-heliwiname";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"helix-electric-voice-data-installer-myrtle-beach-helisy4sc0.md": {
	id: "helix-electric-voice-data-installer-myrtle-beach-helisy4sc0.md";
  slug: "helix-electric-voice-data-installer-myrtle-beach-helisy4sc0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-alexandria-highed12ax.md": {
	id: "high-point-networks-cable-technician-alexandria-highed12ax.md";
  slug: "high-point-networks-cable-technician-alexandria-highed12ax";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-denver-highkdwgl7.md": {
	id: "high-point-networks-cable-technician-denver-highkdwgl7.md";
  slug: "high-point-networks-cable-technician-denver-highkdwgl7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-lakewood-highn4rpmb.md": {
	id: "high-point-networks-cable-technician-lakewood-highn4rpmb.md";
  slug: "high-point-networks-cable-technician-lakewood-highn4rpmb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-rock-springs-highi52b3a.md": {
	id: "high-point-networks-cable-technician-rock-springs-highi52b3a.md";
  slug: "high-point-networks-cable-technician-rock-springs-highi52b3a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-woodstock-highhkqq19.md": {
	id: "high-point-networks-cable-technician-woodstock-highhkqq19.md";
  slug: "high-point-networks-cable-technician-woodstock-highhkqq19";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-data-center-cable-tech-sausalito-highc2vu6f.md": {
	id: "high-point-networks-data-center-cable-tech-sausalito-highc2vu6f.md";
  slug: "high-point-networks-data-center-cable-tech-sausalito-highc2vu6f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd.md": {
	id: "high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd.md";
  slug: "high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-security-systems-tech-phoenix-high8guy75.md": {
	id: "high-point-networks-security-systems-tech-phoenix-high8guy75.md";
  slug: "high-point-networks-security-systems-tech-phoenix-high8guy75";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"high-point-networks-security-systems-tech-tiburon-high73tbci.md": {
	id: "high-point-networks-security-systems-tech-tiburon-high73tbci.md";
  slug: "high-point-networks-security-systems-tech-tiburon-high73tbci";
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
"howell-electric-apprentice-electrician-garden-grove-howe48l9wx.md": {
	id: "howell-electric-apprentice-electrician-garden-grove-howe48l9wx.md";
  slug: "howell-electric-apprentice-electrician-garden-grove-howe48l9wx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-apprentice-electrician-los-angeles-howe4xauen.md": {
	id: "howell-electric-apprentice-electrician-los-angeles-howe4xauen.md";
  slug: "howell-electric-apprentice-electrician-los-angeles-howe4xauen";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-apprentice-electrician-moreno-valley-howek3znta.md": {
	id: "howell-electric-apprentice-electrician-moreno-valley-howek3znta.md";
  slug: "howell-electric-apprentice-electrician-moreno-valley-howek3znta";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-commercial-electrician-berkeley-howesf1eai.md": {
	id: "howell-electric-commercial-electrician-berkeley-howesf1eai.md";
  slug: "howell-electric-commercial-electrician-berkeley-howesf1eai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-electrician-san-diego-howep3goi0.md": {
	id: "howell-electric-electrician-san-diego-howep3goi0.md";
  slug: "howell-electric-electrician-san-diego-howep3goi0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-industrial-electrician-vacaville-howeymyoat.md": {
	id: "howell-electric-industrial-electrician-vacaville-howeymyoat.md";
  slug: "howell-electric-industrial-electrician-vacaville-howeymyoat";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-chula-vista-howenav9au.md": {
	id: "howell-electric-journeyman-electrician-chula-vista-howenav9au.md";
  slug: "howell-electric-journeyman-electrician-chula-vista-howenav9au";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-huntington-beach-howesjpood.md": {
	id: "howell-electric-journeyman-electrician-huntington-beach-howesjpood.md";
  slug: "howell-electric-journeyman-electrician-huntington-beach-howesjpood";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-los-angeles-howee96m47.md": {
	id: "howell-electric-journeyman-electrician-los-angeles-howee96m47.md";
  slug: "howell-electric-journeyman-electrician-los-angeles-howee96m47";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi.md": {
	id: "howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi.md";
  slug: "howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m.md": {
	id: "howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m.md";
  slug: "howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-stockton-howeqclaiq.md": {
	id: "howell-electric-journeyman-electrician-stockton-howeqclaiq.md";
  slug: "howell-electric-journeyman-electrician-stockton-howeqclaiq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"howell-electric-security-technician-chico-howexdmmka.md": {
	id: "howell-electric-security-technician-chico-howexdmmka.md";
  slug: "howell-electric-security-technician-chico-howexdmmka";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-alpharetta-ies8c92am.md": {
	id: "ies-electric-apprentice-electrician-alpharetta-ies8c92am.md";
  slug: "ies-electric-apprentice-electrician-alpharetta-ies8c92am";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-fresno-iesdh0j7l.md": {
	id: "ies-electric-apprentice-electrician-fresno-iesdh0j7l.md";
  slug: "ies-electric-apprentice-electrician-fresno-iesdh0j7l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-irvine-ies8ps4c8.md": {
	id: "ies-electric-apprentice-electrician-irvine-ies8ps4c8.md";
  slug: "ies-electric-apprentice-electrician-irvine-ies8ps4c8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-lancaster-iesxyigr8.md": {
	id: "ies-electric-apprentice-electrician-lancaster-iesxyigr8.md";
  slug: "ies-electric-apprentice-electrician-lancaster-iesxyigr8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-marietta-ies9qom9t.md": {
	id: "ies-electric-apprentice-electrician-marietta-ies9qom9t.md";
  slug: "ies-electric-apprentice-electrician-marietta-ies9qom9t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-roanoke-ies3n523h.md": {
	id: "ies-electric-apprentice-electrician-roanoke-ies3n523h.md";
  slug: "ies-electric-apprentice-electrician-roanoke-ies3n523h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-automation-controls-specialist-charlotte-iesgay6e9.md": {
	id: "ies-electric-automation-controls-specialist-charlotte-iesgay6e9.md";
  slug: "ies-electric-automation-controls-specialist-charlotte-iesgay6e9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-cable-installer-albuquerque-iesstbx86.md": {
	id: "ies-electric-cable-installer-albuquerque-iesstbx86.md";
  slug: "ies-electric-cable-installer-albuquerque-iesstbx86";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-cable-tech-pittsburgh-ies0g5gvd.md": {
	id: "ies-electric-cable-tech-pittsburgh-ies0g5gvd.md";
  slug: "ies-electric-cable-tech-pittsburgh-ies0g5gvd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-cable-technician-north-charleston-iesoqraaz.md": {
	id: "ies-electric-cable-technician-north-charleston-iesoqraaz.md";
  slug: "ies-electric-cable-technician-north-charleston-iesoqraaz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-cable-technician-pinedale-ieshw1io5.md": {
	id: "ies-electric-cable-technician-pinedale-ieshw1io5.md";
  slug: "ies-electric-cable-technician-pinedale-ieshw1io5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-augusta-ies1obzqk.md": {
	id: "ies-electric-commercial-electrician-augusta-ies1obzqk.md";
  slug: "ies-electric-commercial-electrician-augusta-ies1obzqk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-baltimore-iesizv1kp.md": {
	id: "ies-electric-commercial-electrician-baltimore-iesizv1kp.md";
  slug: "ies-electric-commercial-electrician-baltimore-iesizv1kp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-cambridge-iesa7kwv2.md": {
	id: "ies-electric-commercial-electrician-cambridge-iesa7kwv2.md";
  slug: "ies-electric-commercial-electrician-cambridge-iesa7kwv2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-new-york-city-ies2w09zn.md": {
	id: "ies-electric-commercial-electrician-new-york-city-ies2w09zn.md";
  slug: "ies-electric-commercial-electrician-new-york-city-ies2w09zn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-chandler-iesjx2edx.md": {
	id: "ies-electric-commercial-project-manager-chandler-iesjx2edx.md";
  slug: "ies-electric-commercial-project-manager-chandler-iesjx2edx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-hialeah-ies2yzuyl.md": {
	id: "ies-electric-commercial-project-manager-hialeah-ies2yzuyl.md";
  slug: "ies-electric-commercial-project-manager-hialeah-ies2yzuyl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-savannah-iesuajpqp.md": {
	id: "ies-electric-commercial-project-manager-savannah-iesuajpqp.md";
  slug: "ies-electric-commercial-project-manager-savannah-iesuajpqp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-tallahassee-iess3hyyx.md": {
	id: "ies-electric-commercial-project-manager-tallahassee-iess3hyyx.md";
  slug: "ies-electric-commercial-project-manager-tallahassee-iess3hyyx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-controls-engineer-atlanta-iesehkrfz.md": {
	id: "ies-electric-controls-engineer-atlanta-iesehkrfz.md";
  slug: "ies-electric-controls-engineer-atlanta-iesehkrfz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-controls-technician-nashville-ies26xmi8.md": {
	id: "ies-electric-controls-technician-nashville-ies26xmi8.md";
  slug: "ies-electric-controls-technician-nashville-ies26xmi8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-data-center-technician-nashville-ies74vheo.md": {
	id: "ies-electric-data-center-technician-nashville-ies74vheo.md";
  slug: "ies-electric-data-center-technician-nashville-ies74vheo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-blacksburg-iesz7tx9y.md": {
	id: "ies-electric-electrician-blacksburg-iesz7tx9y.md";
  slug: "ies-electric-electrician-blacksburg-iesz7tx9y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-hampton-iesnzo4d9.md": {
	id: "ies-electric-electrician-hampton-iesnzo4d9.md";
  slug: "ies-electric-electrician-hampton-iesnzo4d9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-hermitage-iesw7y27u.md": {
	id: "ies-electric-electrician-hermitage-iesw7y27u.md";
  slug: "ies-electric-electrician-hermitage-iesw7y27u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-indian-trail-iesymoss3.md": {
	id: "ies-electric-electrician-indian-trail-iesymoss3.md";
  slug: "ies-electric-electrician-indian-trail-iesymoss3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-lancaster-iesgf6dqc.md": {
	id: "ies-electric-electrician-lancaster-iesgf6dqc.md";
  slug: "ies-electric-electrician-lancaster-iesgf6dqc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-electrician-sherman-ieszkpfyd.md": {
	id: "ies-electric-electrician-sherman-ieszkpfyd.md";
  slug: "ies-electric-electrician-sherman-ieszkpfyd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-fiber-optics-installer-wichita-iesot3044.md": {
	id: "ies-electric-fiber-optics-installer-wichita-iesot3044.md";
  slug: "ies-electric-fiber-optics-installer-wichita-iesot3044";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-glendale-ies6q5tfb.md": {
	id: "ies-electric-journeyman-electrician-glendale-ies6q5tfb.md";
  slug: "ies-electric-journeyman-electrician-glendale-ies6q5tfb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-san-bernardino-iesz3nsev.md": {
	id: "ies-electric-journeyman-electrician-san-bernardino-iesz3nsev.md";
  slug: "ies-electric-journeyman-electrician-san-bernardino-iesz3nsev";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-san-diego-ies5t6acn.md": {
	id: "ies-electric-journeyman-electrician-san-diego-ies5t6acn.md";
  slug: "ies-electric-journeyman-electrician-san-diego-ies5t6acn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-junior-project-manager-tucson-ieslxbsb5.md": {
	id: "ies-electric-junior-project-manager-tucson-ieslxbsb5.md";
  slug: "ies-electric-junior-project-manager-tucson-ieslxbsb5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-project-manager-mesa-ies18fcpz.md": {
	id: "ies-electric-project-manager-mesa-ies18fcpz.md";
  slug: "ies-electric-project-manager-mesa-ies18fcpz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm.md": {
	id: "ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm.md";
  slug: "ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-security-technician-detroit-ies5mtpod.md": {
	id: "ies-electric-security-technician-detroit-ies5mtpod.md";
  slug: "ies-electric-security-technician-detroit-ies5mtpod";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-security-technician-durham-ies6hzd5i.md": {
	id: "ies-electric-security-technician-durham-ies6hzd5i.md";
  slug: "ies-electric-security-technician-durham-ies6hzd5i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-security-technician-knoxville-iesi9ft8k.md": {
	id: "ies-electric-security-technician-knoxville-iesi9ft8k.md";
  slug: "ies-electric-security-technician-knoxville-iesi9ft8k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-security-technician-memphis-ieshx74pu.md": {
	id: "ies-electric-security-technician-memphis-ieshx74pu.md";
  slug: "ies-electric-security-technician-memphis-ieshx74pu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-service-electrician-aurora-iesygfvmp.md": {
	id: "ies-electric-service-electrician-aurora-iesygfvmp.md";
  slug: "ies-electric-service-electrician-aurora-iesygfvmp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ies-electric-service-electrician-cleveland-iesa4mf5v.md": {
	id: "ies-electric-service-electrician-cleveland-iesa4mf5v.md";
  slug: "ies-electric-service-electrician-cleveland-iesa4mf5v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-commercial-electrician-henderson-inc5rf5s7.md": {
	id: "inc-installs-commercial-electrician-henderson-inc5rf5s7.md";
  slug: "inc-installs-commercial-electrician-henderson-inc5rf5s7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-fiber-optic-technician-naperville-incvi01yx.md": {
	id: "inc-installs-fiber-optic-technician-naperville-incvi01yx.md";
  slug: "inc-installs-fiber-optic-technician-naperville-incvi01yx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-fire-alarm-installer-anchorage-inc656cxo.md": {
	id: "inc-installs-fire-alarm-installer-anchorage-inc656cxo.md";
  slug: "inc-installs-fire-alarm-installer-anchorage-inc656cxo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-rack-stack-installer-columbus-inccmeh1l.md": {
	id: "inc-installs-rack-stack-installer-columbus-inccmeh1l.md";
  slug: "inc-installs-rack-stack-installer-columbus-inccmeh1l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-rack-stack-installer-fort-worth-inc6an3ax.md": {
	id: "inc-installs-rack-stack-installer-fort-worth-inc6an3ax.md";
  slug: "inc-installs-rack-stack-installer-fort-worth-inc6an3ax";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-rack-stack-installer-newton-inca70mq8.md": {
	id: "inc-installs-rack-stack-installer-newton-inca70mq8.md";
  slug: "inc-installs-rack-stack-installer-newton-inca70mq8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inc-installs-rack-stack-installer-st.-paul-incr3w407.md": {
	id: "inc-installs-rack-stack-installer-st.-paul-incr3w407.md";
  slug: "inc-installs-rack-stack-installer-st-paul-incr3w407";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-commercial-apprentice-madison-inscr2sw7m.md": {
	id: "inscope-commercial-apprentice-madison-inscr2sw7m.md";
  slug: "inscope-commercial-apprentice-madison-inscr2sw7m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-commercial-electrician-kissimmee-insceamodp.md": {
	id: "inscope-commercial-electrician-kissimmee-insceamodp.md";
  slug: "inscope-commercial-electrician-kissimmee-insceamodp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-data-center-cable-tech-morrisville-inscde4vqm.md": {
	id: "inscope-data-center-cable-tech-morrisville-inscde4vqm.md";
  slug: "inscope-data-center-cable-tech-morrisville-inscde4vqm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-data-center-cable-tech-union-city-inscotax8d.md": {
	id: "inscope-data-center-cable-tech-union-city-inscotax8d.md";
  slug: "inscope-data-center-cable-tech-union-city-inscotax8d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fiber-optic-technician-roswell-inscujkrpq.md": {
	id: "inscope-fiber-optic-technician-roswell-inscujkrpq.md";
  slug: "inscope-fiber-optic-technician-roswell-inscujkrpq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fiber-optic-technician-smyrna-insch1258j.md": {
	id: "inscope-fiber-optic-technician-smyrna-insch1258j.md";
  slug: "inscope-fiber-optic-technician-smyrna-insch1258j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fire-alarm-installer-beaumont-inscltg23g.md": {
	id: "inscope-fire-alarm-installer-beaumont-inscltg23g.md";
  slug: "inscope-fire-alarm-installer-beaumont-inscltg23g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fire-alarm-installer-el-paso-insctyzhmd.md": {
	id: "inscope-fire-alarm-installer-el-paso-insctyzhmd.md";
  slug: "inscope-fire-alarm-installer-el-paso-insctyzhmd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fire-alarm-installer-schaumburg-inscq2pkdq.md": {
	id: "inscope-fire-alarm-installer-schaumburg-inscq2pkdq.md";
  slug: "inscope-fire-alarm-installer-schaumburg-inscq2pkdq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-fire-alarm-installer-st.-paul-insch0cpzm.md": {
	id: "inscope-fire-alarm-installer-st.-paul-insch0cpzm.md";
  slug: "inscope-fire-alarm-installer-st-paul-insch0cpzm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"inscope-security-technician-la-vista-inschtj7v9.md": {
	id: "inscope-security-technician-la-vista-inschtj7v9.md";
  slug: "inscope-security-technician-la-vista-inschtj7v9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-council-bluffs-inte6arb5t.md": {
	id: "integra-electrical-cable-installer-council-bluffs-inte6arb5t.md";
  slug: "integra-electrical-cable-installer-council-bluffs-inte6arb5t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-dearborn-inteh4qn5q.md": {
	id: "integra-electrical-cable-installer-dearborn-inteh4qn5q.md";
  slug: "integra-electrical-cable-installer-dearborn-inteh4qn5q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-lexington-inteog9g97.md": {
	id: "integra-electrical-cable-installer-lexington-inteog9g97.md";
  slug: "integra-electrical-cable-installer-lexington-inteog9g97";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-round-rock-intexs9zv5.md": {
	id: "integra-electrical-cable-installer-round-rock-intexs9zv5.md";
  slug: "integra-electrical-cable-installer-round-rock-intexs9zv5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-wilmington-intebedw6b.md": {
	id: "integra-electrical-cable-installer-wilmington-intebedw6b.md";
  slug: "integra-electrical-cable-installer-wilmington-intebedw6b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-commercial-apprentice-aurora-inte4jgg2v.md": {
	id: "integra-electrical-commercial-apprentice-aurora-inte4jgg2v.md";
  slug: "integra-electrical-commercial-apprentice-aurora-inte4jgg2v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-commercial-apprentice-hialeah-intecfa77z.md": {
	id: "integra-electrical-commercial-apprentice-hialeah-intecfa77z.md";
  slug: "integra-electrical-commercial-apprentice-hialeah-intecfa77z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-commercial-apprentice-independence-inteajucog.md": {
	id: "integra-electrical-commercial-apprentice-independence-inteajucog.md";
  slug: "integra-electrical-commercial-apprentice-independence-inteajucog";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-commercial-electrician-redmond-intenpxp03.md": {
	id: "integra-electrical-commercial-electrician-redmond-intenpxp03.md";
  slug: "integra-electrical-commercial-electrician-redmond-intenpxp03";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-commercial-electrician-sterling-inteu5myxh.md": {
	id: "integra-electrical-commercial-electrician-sterling-inteu5myxh.md";
  slug: "integra-electrical-commercial-electrician-sterling-inteu5myxh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-data-center-technician-nashville-inteqb18k7.md": {
	id: "integra-electrical-data-center-technician-nashville-inteqb18k7.md";
  slug: "integra-electrical-data-center-technician-nashville-inteqb18k7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-data-center-technician-san-francisco-inteq7atjj.md": {
	id: "integra-electrical-data-center-technician-san-francisco-inteq7atjj.md";
  slug: "integra-electrical-data-center-technician-san-francisco-inteq7atjj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-data-center-technician-sioux-falls-intestphpr.md": {
	id: "integra-electrical-data-center-technician-sioux-falls-intestphpr.md";
  slug: "integra-electrical-data-center-technician-sioux-falls-intestphpr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-electrical-apprentice-clearwater-intejd9t96.md": {
	id: "integra-electrical-electrical-apprentice-clearwater-intejd9t96.md";
  slug: "integra-electrical-electrical-apprentice-clearwater-intejd9t96";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-fiber-optic-technician-albuquerque-inte5r0tik.md": {
	id: "integra-electrical-fiber-optic-technician-albuquerque-inte5r0tik.md";
  slug: "integra-electrical-fiber-optic-technician-albuquerque-inte5r0tik";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-fire-alarm-installer-beaverton-intet13cv4.md": {
	id: "integra-electrical-fire-alarm-installer-beaverton-intet13cv4.md";
  slug: "integra-electrical-fire-alarm-installer-beaverton-intet13cv4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-fire-alarm-installer-layton-inteokgx53.md": {
	id: "integra-electrical-fire-alarm-installer-layton-inteokgx53.md";
  slug: "integra-electrical-fire-alarm-installer-layton-inteokgx53";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-kansas-city-inte5oi7f8.md": {
	id: "integra-electrical-industrial-electrician-kansas-city-inte5oi7f8.md";
  slug: "integra-electrical-industrial-electrician-kansas-city-inte5oi7f8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-san-francisco-intetka4ea.md": {
	id: "integra-electrical-industrial-electrician-san-francisco-intetka4ea.md";
  slug: "integra-electrical-industrial-electrician-san-francisco-intetka4ea";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-seattle-inte4we5xb.md": {
	id: "integra-electrical-industrial-electrician-seattle-inte4we5xb.md";
  slug: "integra-electrical-industrial-electrician-seattle-inte4we5xb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-worcester-integjztz6.md": {
	id: "integra-electrical-industrial-electrician-worcester-integjztz6.md";
  slug: "integra-electrical-industrial-electrician-worcester-integjztz6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-industrial-journeyman-electrician-miami-intebljg43.md": {
	id: "integra-electrical-industrial-journeyman-electrician-miami-intebljg43.md";
  slug: "integra-electrical-industrial-journeyman-electrician-miami-intebljg43";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-rack-stack-installer-gainesville-intecstbgi.md": {
	id: "integra-electrical-rack-stack-installer-gainesville-intecstbgi.md";
  slug: "integra-electrical-rack-stack-installer-gainesville-intecstbgi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-rack-stack-installer-the-woodlands-inte8v1jzz.md": {
	id: "integra-electrical-rack-stack-installer-the-woodlands-inte8v1jzz.md";
  slug: "integra-electrical-rack-stack-installer-the-woodlands-inte8v1jzz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-security-technician-gresham-intejy2uwk.md": {
	id: "integra-electrical-security-technician-gresham-intejy2uwk.md";
  slug: "integra-electrical-security-technician-gresham-intejy2uwk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-security-technician-raleigh-intepvqo5w.md": {
	id: "integra-electrical-security-technician-raleigh-intepvqo5w.md";
  slug: "integra-electrical-security-technician-raleigh-intepvqo5w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-security-technician-youngstown-intetws6nf.md": {
	id: "integra-electrical-security-technician-youngstown-intetws6nf.md";
  slug: "integra-electrical-security-technician-youngstown-intetws6nf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"integra-electrical-voice-data-installer-columbia-inteeyc2bb.md": {
	id: "integra-electrical-voice-data-installer-columbia-inteeyc2bb.md";
  slug: "integra-electrical-voice-data-installer-columbia-inteeyc2bb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-atlanta-jackbut5o4.md": {
	id: "jackson-electric-apprentice-electrician-atlanta-jackbut5o4.md";
  slug: "jackson-electric-apprentice-electrician-atlanta-jackbut5o4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y.md": {
	id: "jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y.md";
  slug: "jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-hickory-jackvtz7n1.md": {
	id: "jackson-electric-apprentice-electrician-hickory-jackvtz7n1.md";
  slug: "jackson-electric-apprentice-electrician-hickory-jackvtz7n1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-rome-jack7eqww0.md": {
	id: "jackson-electric-apprentice-electrician-rome-jack7eqww0.md";
  slug: "jackson-electric-apprentice-electrician-rome-jack7eqww0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-union-jackafop4v.md": {
	id: "jackson-electric-apprentice-electrician-union-jackafop4v.md";
  slug: "jackson-electric-apprentice-electrician-union-jackafop4v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-cable-tech-philadelphia-jack1f9y83.md": {
	id: "jackson-electric-cable-tech-philadelphia-jack1f9y83.md";
  slug: "jackson-electric-cable-tech-philadelphia-jack1f9y83";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-cable-technician-concord-jack3gotjf.md": {
	id: "jackson-electric-cable-technician-concord-jack3gotjf.md";
  slug: "jackson-electric-cable-technician-concord-jack3gotjf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-cable-technician-miami-jackolaub9.md": {
	id: "jackson-electric-cable-technician-miami-jackolaub9.md";
  slug: "jackson-electric-cable-technician-miami-jackolaub9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jackson-electric-commercial-electrician-austin-jackv3tiag.md": {
	id: "jackson-electric-commercial-electrician-austin-jackv3tiag.md";
  slug: "jackson-electric-commercial-electrician-austin-jackv3tiag";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jd-electric-cable-installer-rochester-jde1eygfs.md": {
	id: "jd-electric-cable-installer-rochester-jde1eygfs.md";
  slug: "jd-electric-cable-installer-rochester-jde1eygfs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jd-electric-electrician-jackson-jde6z08uq.md": {
	id: "jd-electric-electrician-jackson-jde6z08uq.md";
  slug: "jd-electric-electrician-jackson-jde6z08uq";
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
"jp-electric-commercial-electrician-cheyenne-jpe5y5v9j.md": {
	id: "jp-electric-commercial-electrician-cheyenne-jpe5y5v9j.md";
  slug: "jp-electric-commercial-electrician-cheyenne-jpe5y5v9j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jp-electric-electrician-buffalo-jpemejloj.md": {
	id: "jp-electric-electrician-buffalo-jpemejloj.md";
  slug: "jp-electric-electrician-buffalo-jpemejloj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"jp-electric-service-electrician-asheville-jpeiba6ez.md": {
	id: "jp-electric-service-electrician-asheville-jpeiba6ez.md";
  slug: "jp-electric-service-electrician-asheville-jpeiba6ez";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-cable-installer-denver-kirbjje9zh.md": {
	id: "kirby-electric-cable-installer-denver-kirbjje9zh.md";
  slug: "kirby-electric-cable-installer-denver-kirbjje9zh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-commercial-electrician-concord-kirb8hrovk.md": {
	id: "kirby-electric-commercial-electrician-concord-kirb8hrovk.md";
  slug: "kirby-electric-commercial-electrician-concord-kirb8hrovk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-electrician-antioch-kirbix581x.md": {
	id: "kirby-electric-electrician-antioch-kirbix581x.md";
  slug: "kirby-electric-electrician-antioch-kirbix581x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-industrial-electrician-roseville-kirb5272pw.md": {
	id: "kirby-electric-industrial-electrician-roseville-kirb5272pw.md";
  slug: "kirby-electric-industrial-electrician-roseville-kirb5272pw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-residential-apprentice-oxnard-kirbqdujl4.md": {
	id: "kirby-electric-residential-apprentice-oxnard-kirbqdujl4.md";
  slug: "kirby-electric-residential-apprentice-oxnard-kirbqdujl4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-residential-electrician-oklahoma-city-kirbstz4cm.md": {
	id: "kirby-electric-residential-electrician-oklahoma-city-kirbstz4cm.md";
  slug: "kirby-electric-residential-electrician-oklahoma-city-kirbstz4cm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-residential-electrician-visalia-kirbj6fjdb.md": {
	id: "kirby-electric-residential-electrician-visalia-kirbj6fjdb.md";
  slug: "kirby-electric-residential-electrician-visalia-kirbj6fjdb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-security-technician-murrieta-kirb6u5ubs.md": {
	id: "kirby-electric-security-technician-murrieta-kirb6u5ubs.md";
  slug: "kirby-electric-security-technician-murrieta-kirb6u5ubs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-security-technician-oceanside-kirbkq7u8a.md": {
	id: "kirby-electric-security-technician-oceanside-kirbkq7u8a.md";
  slug: "kirby-electric-security-technician-oceanside-kirbkq7u8a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-security-technician-vallejo-kirbrttqir.md": {
	id: "kirby-electric-security-technician-vallejo-kirbrttqir.md";
  slug: "kirby-electric-security-technician-vallejo-kirbrttqir";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"kirby-electric-service-electrician-santa-barbara-kirbsrjprg.md": {
	id: "kirby-electric-service-electrician-santa-barbara-kirbsrjprg.md";
  slug: "kirby-electric-service-electrician-santa-barbara-kirbsrjprg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koehler-electric-cable-installer-colorado-springs-koeh12haeo.md": {
	id: "koehler-electric-cable-installer-colorado-springs-koeh12haeo.md";
  slug: "koehler-electric-cable-installer-colorado-springs-koeh12haeo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koehler-electric-commercial-apprentice-tucson-koeh1yf3v0.md": {
	id: "koehler-electric-commercial-apprentice-tucson-koeh1yf3v0.md";
  slug: "koehler-electric-commercial-apprentice-tucson-koeh1yf3v0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koehler-electric-commercial-electrician-morgantown-koehpkhyz5.md": {
	id: "koehler-electric-commercial-electrician-morgantown-koehpkhyz5.md";
  slug: "koehler-electric-commercial-electrician-morgantown-koehpkhyz5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koehler-electric-industrial-electrician-boston-koehv60aob.md": {
	id: "koehler-electric-industrial-electrician-boston-koehv60aob.md";
  slug: "koehler-electric-industrial-electrician-boston-koehv60aob";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koehler-electric-industrial-electrician-cincinnati-koehd7itoa.md": {
	id: "koehler-electric-industrial-electrician-cincinnati-koehd7itoa.md";
  slug: "koehler-electric-industrial-electrician-cincinnati-koehd7itoa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-electrical-project-manager-eugene-koor592adz.md": {
	id: "koorsen-electrical-project-manager-eugene-koor592adz.md";
  slug: "koorsen-electrical-project-manager-eugene-koor592adz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-fire-alarm-designer-tempe-koorikm591.md": {
	id: "koorsen-fire-alarm-designer-tempe-koorikm591.md";
  slug: "koorsen-fire-alarm-designer-tempe-koorikm591";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6.md": {
	id: "koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6.md";
  slug: "koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-junior-project-manager-scottsdale-kooroak38a.md": {
	id: "koorsen-junior-project-manager-scottsdale-kooroak38a.md";
  slug: "koorsen-junior-project-manager-scottsdale-kooroak38a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-security-alarm-project-manager-anaheim-koory45cv0.md": {
	id: "koorsen-security-alarm-project-manager-anaheim-koory45cv0.md";
  slug: "koorsen-security-alarm-project-manager-anaheim-koory45cv0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"koorsen-security-alarm-project-manager-vancouver-koor2inu1k.md": {
	id: "koorsen-security-alarm-project-manager-vancouver-koor2inu1k.md";
  slug: "koorsen-security-alarm-project-manager-vancouver-koor2inu1k";
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
"lyons-electrical-apprentice-electrician-manassas-lyonxbno16.md": {
	id: "lyons-electrical-apprentice-electrician-manassas-lyonxbno16.md";
  slug: "lyons-electrical-apprentice-electrician-manassas-lyonxbno16";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lyons-electrical-apprentice-electrician-miami-lyonlf3oam.md": {
	id: "lyons-electrical-apprentice-electrician-miami-lyonlf3oam.md";
  slug: "lyons-electrical-apprentice-electrician-miami-lyonlf3oam";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lyons-electrical-cable-tech-chattanooga-lyon803wqv.md": {
	id: "lyons-electrical-cable-tech-chattanooga-lyon803wqv.md";
  slug: "lyons-electrical-cable-tech-chattanooga-lyon803wqv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lyons-electrical-security-technician-richmond-lyon851emh.md": {
	id: "lyons-electrical-security-technician-richmond-lyon851emh.md";
  slug: "lyons-electrical-security-technician-richmond-lyon851emh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-commercial-apprentice-decatur-m3t9cywdw.md": {
	id: "m3-technology-commercial-apprentice-decatur-m3t9cywdw.md";
  slug: "m3-technology-commercial-apprentice-decatur-m3t9cywdw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-commercial-apprentice-west-valley-city-m3tk6a1gv.md": {
	id: "m3-technology-commercial-apprentice-west-valley-city-m3tk6a1gv.md";
  slug: "m3-technology-commercial-apprentice-west-valley-city-m3tk6a1gv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-commercial-electrician-concord-m3txpe77u.md": {
	id: "m3-technology-commercial-electrician-concord-m3txpe77u.md";
  slug: "m3-technology-commercial-electrician-concord-m3txpe77u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-data-center-cable-tech-huntsville-m3tukcle5.md": {
	id: "m3-technology-data-center-cable-tech-huntsville-m3tukcle5.md";
  slug: "m3-technology-data-center-cable-tech-huntsville-m3tukcle5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-data-center-technician-corpus-christi-m3to70dka.md": {
	id: "m3-technology-data-center-technician-corpus-christi-m3to70dka.md";
  slug: "m3-technology-data-center-technician-corpus-christi-m3to70dka";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-data-center-technician-oak-park-m3t6abau7.md": {
	id: "m3-technology-data-center-technician-oak-park-m3t6abau7.md";
  slug: "m3-technology-data-center-technician-oak-park-m3t6abau7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-fire-alarm-installer-tyler-m3tr3lrgo.md": {
	id: "m3-technology-fire-alarm-installer-tyler-m3tr3lrgo.md";
  slug: "m3-technology-fire-alarm-installer-tyler-m3tr3lrgo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-rack-stack-installer-farmington-hills-m3tbzge9e.md": {
	id: "m3-technology-rack-stack-installer-farmington-hills-m3tbzge9e.md";
  slug: "m3-technology-rack-stack-installer-farmington-hills-m3tbzge9e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-security-technician-carmel-m3tnu0oln.md": {
	id: "m3-technology-security-technician-carmel-m3tnu0oln.md";
  slug: "m3-technology-security-technician-carmel-m3tnu0oln";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"m3-technology-security-technician-johnston-m3tfiyj7n.md": {
	id: "m3-technology-security-technician-johnston-m3tfiyj7n.md";
  slug: "m3-technology-security-technician-johnston-m3tfiyj7n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"marathon-electrical-cable-installer-salt-lake-city-maraw59d6z.md": {
	id: "marathon-electrical-cable-installer-salt-lake-city-maraw59d6z.md";
  slug: "marathon-electrical-cable-installer-salt-lake-city-maraw59d6z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"marathon-electrical-electrician-fort-wayne-mara9sbasx.md": {
	id: "marathon-electrical-electrician-fort-wayne-mara9sbasx.md";
  slug: "marathon-electrical-electrician-fort-wayne-mara9sbasx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"marathon-electrical-electrician-mobile-mara4pzlil.md": {
	id: "marathon-electrical-electrician-mobile-mara4pzlil.md";
  slug: "marathon-electrical-electrician-mobile-mara4pzlil";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-charlotte-mcca9yp61y.md": {
	id: "mccall-electric-apprentice-electrician-charlotte-mcca9yp61y.md";
  slug: "mccall-electric-apprentice-electrician-charlotte-mcca9yp61y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-houston-mccav58wqj.md": {
	id: "mccall-electric-apprentice-electrician-houston-mccav58wqj.md";
  slug: "mccall-electric-apprentice-electrician-houston-mccav58wqj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-huntsville-mccahquk45.md": {
	id: "mccall-electric-apprentice-electrician-huntsville-mccahquk45.md";
  slug: "mccall-electric-apprentice-electrician-huntsville-mccahquk45";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q.md": {
	id: "mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q.md";
  slug: "mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-commercial-electrician-summerville-mccaoyk1mt.md": {
	id: "mccall-electric-commercial-electrician-summerville-mccaoyk1mt.md";
  slug: "mccall-electric-commercial-electrician-summerville-mccaoyk1mt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-data-center-technician-virginia-beach-mcca67u1b6.md": {
	id: "mccall-electric-data-center-technician-virginia-beach-mcca67u1b6.md";
  slug: "mccall-electric-data-center-technician-virginia-beach-mcca67u1b6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-electrician-lawrenceville-mccan3xp4r.md": {
	id: "mccall-electric-electrician-lawrenceville-mccan3xp4r.md";
  slug: "mccall-electric-electrician-lawrenceville-mccan3xp4r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mccall-electric-electrician-rock-hill-mccal65kex.md": {
	id: "mccall-electric-electrician-rock-hill-mccal65kex.md";
  slug: "mccall-electric-electrician-rock-hill-mccal65kex";
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
"miller-electric-cable-installer-bangor-mills5mfch.md": {
	id: "miller-electric-cable-installer-bangor-mills5mfch.md";
  slug: "miller-electric-cable-installer-bangor-mills5mfch";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"miller-electric-cable-installer-milwaukee-milly3ieuk.md": {
	id: "miller-electric-cable-installer-milwaukee-milly3ieuk.md";
  slug: "miller-electric-cable-installer-milwaukee-milly3ieuk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"miller-electric-electrician-flagstaff-millkzoj6p.md": {
	id: "miller-electric-electrician-flagstaff-millkzoj6p.md";
  slug: "miller-electric-electrician-flagstaff-millkzoj6p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"miller-electric-residential-apprentice-tulsa-mill0uoqf4.md": {
	id: "miller-electric-residential-apprentice-tulsa-mill0uoqf4.md";
  slug: "miller-electric-residential-apprentice-tulsa-mill0uoqf4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-av-systems-tech-yorba-linda-miralec0vu.md": {
	id: "mirapath-av-systems-tech-yorba-linda-miralec0vu.md";
  slug: "mirapath-av-systems-tech-yorba-linda-miralec0vu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-cable-installer-denton-mirag8i3ot.md": {
	id: "mirapath-cable-installer-denton-mirag8i3ot.md";
  slug: "mirapath-cable-installer-denton-mirag8i3ot";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-commercial-apprentice-overland-park-mira10ji8t.md": {
	id: "mirapath-commercial-apprentice-overland-park-mira10ji8t.md";
  slug: "mirapath-commercial-apprentice-overland-park-mira10ji8t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-commercial-apprentice-st.-charles-mirakbwsiv.md": {
	id: "mirapath-commercial-apprentice-st.-charles-mirakbwsiv.md";
  slug: "mirapath-commercial-apprentice-st-charles-mirakbwsiv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-data-center-cable-tech-corte-madera-miratbnwvp.md": {
	id: "mirapath-data-center-cable-tech-corte-madera-miratbnwvp.md";
  slug: "mirapath-data-center-cable-tech-corte-madera-miratbnwvp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-data-center-cable-tech-culver-city-mirapkriai.md": {
	id: "mirapath-data-center-cable-tech-culver-city-mirapkriai.md";
  slug: "mirapath-data-center-cable-tech-culver-city-mirapkriai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-data-center-cable-tech-westerville-mira7dgby4.md": {
	id: "mirapath-data-center-cable-tech-westerville-mira7dgby4.md";
  slug: "mirapath-data-center-cable-tech-westerville-mira7dgby4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-data-center-technician-centreville-miraqrr77n.md": {
	id: "mirapath-data-center-technician-centreville-miraqrr77n.md";
  slug: "mirapath-data-center-technician-centreville-miraqrr77n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-fiber-optic-technician-arlington-mira0pub8g.md": {
	id: "mirapath-fiber-optic-technician-arlington-mira0pub8g.md";
  slug: "mirapath-fiber-optic-technician-arlington-mira0pub8g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-fire-alarm-installer-hollywood-mira5tpqsi.md": {
	id: "mirapath-fire-alarm-installer-hollywood-mira5tpqsi.md";
  slug: "mirapath-fire-alarm-installer-hollywood-mira5tpqsi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-fire-alarm-installer-kirkland-mira791w1a.md": {
	id: "mirapath-fire-alarm-installer-kirkland-mira791w1a.md";
  slug: "mirapath-fire-alarm-installer-kirkland-mira791w1a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-fire-alarm-tech-mountain-view-miralne13s.md": {
	id: "mirapath-fire-alarm-tech-mountain-view-miralne13s.md";
  slug: "mirapath-fire-alarm-tech-mountain-view-miralne13s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-security-systems-tech-marina-del-rey-miraogarq0.md": {
	id: "mirapath-security-systems-tech-marina-del-rey-miraogarq0.md";
  slug: "mirapath-security-systems-tech-marina-del-rey-miraogarq0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mirapath-security-systems-tech-seattle-mirarc0dyp.md": {
	id: "mirapath-security-systems-tech-seattle-mirarc0dyp.md";
  slug: "mirapath-security-systems-tech-seattle-mirarc0dyp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-automation-controls-specialist-portland-mmrryyvo4.md": {
	id: "mmr-group-automation-controls-specialist-portland-mmrryyvo4.md";
  slug: "mmr-group-automation-controls-specialist-portland-mmrryyvo4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-av-systems-tech-minneapolis-mmr4id64s.md": {
	id: "mmr-group-av-systems-tech-minneapolis-mmr4id64s.md";
  slug: "mmr-group-av-systems-tech-minneapolis-mmr4id64s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-av-systems-tech-walnut-creek-mmr7nauyz.md": {
	id: "mmr-group-av-systems-tech-walnut-creek-mmr7nauyz.md";
  slug: "mmr-group-av-systems-tech-walnut-creek-mmr7nauyz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-tech-burbank-mmr1a8vlh.md": {
	id: "mmr-group-cable-tech-burbank-mmr1a8vlh.md";
  slug: "mmr-group-cable-tech-burbank-mmr1a8vlh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-tech-ridgecrest-mmr06y2gv.md": {
	id: "mmr-group-cable-tech-ridgecrest-mmr06y2gv.md";
  slug: "mmr-group-cable-tech-ridgecrest-mmr06y2gv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-tech-san-luis-obispo-mmre0w94v.md": {
	id: "mmr-group-cable-tech-san-luis-obispo-mmre0w94v.md";
  slug: "mmr-group-cable-tech-san-luis-obispo-mmre0w94v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-technician-el-centro-mmr8qgzoo.md": {
	id: "mmr-group-cable-technician-el-centro-mmr8qgzoo.md";
  slug: "mmr-group-cable-technician-el-centro-mmr8qgzoo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-technician-oceanside-mmrt7hx7l.md": {
	id: "mmr-group-cable-technician-oceanside-mmrt7hx7l.md";
  slug: "mmr-group-cable-technician-oceanside-mmrt7hx7l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-cable-technician-santa-ana-mmre1jn2t.md": {
	id: "mmr-group-cable-technician-santa-ana-mmre1jn2t.md";
  slug: "mmr-group-cable-technician-santa-ana-mmre1jn2t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk.md": {
	id: "mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk.md";
  slug: "mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-controls-engineer-los-angeles-mmrt81e9f.md": {
	id: "mmr-group-controls-engineer-los-angeles-mmrt81e9f.md";
  slug: "mmr-group-controls-engineer-los-angeles-mmrt81e9f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r.md": {
	id: "mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r.md";
  slug: "mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj.md": {
	id: "mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj.md";
  slug: "mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-custom-home-master-electrician-gainesville-mmr3njirz.md": {
	id: "mmr-group-custom-home-master-electrician-gainesville-mmr3njirz.md";
  slug: "mmr-group-custom-home-master-electrician-gainesville-mmr3njirz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-custom-home-master-electrician-utica-mmrnowd9m.md": {
	id: "mmr-group-custom-home-master-electrician-utica-mmrnowd9m.md";
  slug: "mmr-group-custom-home-master-electrician-utica-mmrnowd9m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe.md": {
	id: "mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe.md";
  slug: "mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy.md": {
	id: "mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy.md";
  slug: "mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz.md": {
	id: "mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz.md";
  slug: "mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg.md": {
	id: "mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg.md";
  slug: "mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-data-center-technician-pittsburgh-mmro0fykr.md": {
	id: "mmr-group-data-center-technician-pittsburgh-mmro0fykr.md";
  slug: "mmr-group-data-center-technician-pittsburgh-mmro0fykr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-clarksville-mmr0ir4o5.md": {
	id: "mmr-group-electrical-apprentice-clarksville-mmr0ir4o5.md";
  slug: "mmr-group-electrical-apprentice-clarksville-mmr0ir4o5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-ogden-mmrbzptq7.md": {
	id: "mmr-group-electrical-apprentice-ogden-mmrbzptq7.md";
  slug: "mmr-group-electrical-apprentice-ogden-mmrbzptq7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-springfield-mmrjdm9hd.md": {
	id: "mmr-group-electrical-apprentice-springfield-mmrjdm9hd.md";
  slug: "mmr-group-electrical-apprentice-springfield-mmrjdm9hd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-fire-alarm-tech-menlo-park-mmru05lkk.md": {
	id: "mmr-group-fire-alarm-tech-menlo-park-mmru05lkk.md";
  slug: "mmr-group-fire-alarm-tech-menlo-park-mmru05lkk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-fire-alarm-technician-new-york-mmrjrents.md": {
	id: "mmr-group-fire-alarm-technician-new-york-mmrjrents.md";
  slug: "mmr-group-fire-alarm-technician-new-york-mmrjrents";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk.md": {
	id: "mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk.md";
  slug: "mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6.md": {
	id: "mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6.md";
  slug: "mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb.md": {
	id: "mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb.md";
  slug: "mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr.md": {
	id: "mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr.md";
  slug: "mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-industrial-master-electrician-camden-mmrwpt14x.md": {
	id: "mmr-group-industrial-master-electrician-camden-mmrwpt14x.md";
  slug: "mmr-group-industrial-master-electrician-camden-mmrwpt14x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u.md": {
	id: "mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u.md";
  slug: "mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou.md": {
	id: "mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou.md";
  slug: "mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm.md": {
	id: "mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm.md";
  slug: "mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-marietta-mmraf0adk.md": {
	id: "mmr-group-low-voltage-cable-technician-marietta-mmraf0adk.md";
  slug: "mmr-group-low-voltage-cable-technician-marietta-mmraf0adk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-monument-mmrkbns8v.md": {
	id: "mmr-group-low-voltage-cable-technician-monument-mmrkbns8v.md";
  slug: "mmr-group-low-voltage-cable-technician-monument-mmrkbns8v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2.md": {
	id: "mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2.md";
  slug: "mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl.md": {
	id: "mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl.md";
  slug: "mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g.md": {
	id: "mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g.md";
  slug: "mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-multi-family-master-electrician-wheeling-mmr2j62az.md": {
	id: "mmr-group-multi-family-master-electrician-wheeling-mmr2j62az.md";
  slug: "mmr-group-multi-family-master-electrician-wheeling-mmr2j62az";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-plant-apprentice-electrician-durham-mmre2w8pw.md": {
	id: "mmr-group-plant-apprentice-electrician-durham-mmre2w8pw.md";
  slug: "mmr-group-plant-apprentice-electrician-durham-mmre2w8pw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-plant-master-electrician-syracuse-mmrhj7yna.md": {
	id: "mmr-group-plant-master-electrician-syracuse-mmrhj7yna.md";
  slug: "mmr-group-plant-master-electrician-syracuse-mmrhj7yna";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-pv-system-controls-electrician-augusta-mmrubl94v.md": {
	id: "mmr-group-pv-system-controls-electrician-augusta-mmrubl94v.md";
  slug: "mmr-group-pv-system-controls-electrician-augusta-mmrubl94v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt.md": {
	id: "mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt.md";
  slug: "mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb.md": {
	id: "mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb.md";
  slug: "mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-repair-apprentice-electrician-charleston-mmrj20446.md": {
	id: "mmr-group-repair-apprentice-electrician-charleston-mmrj20446.md";
  slug: "mmr-group-repair-apprentice-electrician-charleston-mmrj20446";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-repair-controls-electrician-allentown-mmr8npw9b.md": {
	id: "mmr-group-repair-controls-electrician-allentown-mmr8npw9b.md";
  slug: "mmr-group-repair-controls-electrician-allentown-mmr8npw9b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn.md": {
	id: "mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn.md";
  slug: "mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-augusta-mmr0f5huf.md": {
	id: "mmr-group-residential-master-electrician-augusta-mmr0f5huf.md";
  slug: "mmr-group-residential-master-electrician-augusta-mmr0f5huf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-harrisburg-mmrnny2pv.md": {
	id: "mmr-group-residential-master-electrician-harrisburg-mmrnny2pv.md";
  slug: "mmr-group-residential-master-electrician-harrisburg-mmrnny2pv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-reading-mmr2px39p.md": {
	id: "mmr-group-residential-master-electrician-reading-mmr2px39p.md";
  slug: "mmr-group-residential-master-electrician-reading-mmr2px39p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw.md": {
	id: "mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw.md";
  slug: "mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m.md": {
	id: "mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m.md";
  slug: "mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-systems-tech-placentia-mmr1bgn6r.md": {
	id: "mmr-group-security-systems-tech-placentia-mmr1bgn6r.md";
  slug: "mmr-group-security-systems-tech-placentia-mmr1bgn6r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-technician-jacksonville-mmr0dwcgd.md": {
	id: "mmr-group-security-technician-jacksonville-mmr0dwcgd.md";
  slug: "mmr-group-security-technician-jacksonville-mmr0dwcgd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-technician-miami-mmr1qi5ku.md": {
	id: "mmr-group-security-technician-miami-mmr1qi5ku.md";
  slug: "mmr-group-security-technician-miami-mmr1qi5ku";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-technician-oakland-mmr9hzgqh.md": {
	id: "mmr-group-security-technician-oakland-mmr9hzgqh.md";
  slug: "mmr-group-security-technician-oakland-mmr9hzgqh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-technician-oklahoma-city-mmr8ci56d.md": {
	id: "mmr-group-security-technician-oklahoma-city-mmr8ci56d.md";
  slug: "mmr-group-security-technician-oklahoma-city-mmr8ci56d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-security-technician-santa-rosa-mmrhzd76u.md": {
	id: "mmr-group-security-technician-santa-rosa-mmrhzd76u.md";
  slug: "mmr-group-security-technician-santa-rosa-mmrhzd76u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-senior-controls-technician-anaheim-mmrs8ex22.md": {
	id: "mmr-group-senior-controls-technician-anaheim-mmrs8ex22.md";
  slug: "mmr-group-senior-controls-technician-anaheim-mmrs8ex22";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6.md": {
	id: "mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6.md";
  slug: "mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq.md": {
	id: "mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq.md";
  slug: "mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"mmr-group-solar-master-electrician-akron-mmri284h8.md": {
	id: "mmr-group-solar-master-electrician-akron-mmri284h8.md";
  slug: "mmr-group-solar-master-electrician-akron-mmri284h8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-cable-installer-columbus-myrojc250h.md": {
	id: "myro-electrical-cable-installer-columbus-myrojc250h.md";
  slug: "myro-electrical-cable-installer-columbus-myrojc250h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-cable-installer-newport-myropsi09i.md": {
	id: "myro-electrical-cable-installer-newport-myropsi09i.md";
  slug: "myro-electrical-cable-installer-newport-myropsi09i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-cable-installer-norfolk-myro2ikgav.md": {
	id: "myro-electrical-cable-installer-norfolk-myro2ikgav.md";
  slug: "myro-electrical-cable-installer-norfolk-myro2ikgav";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-cable-installer-santa-clara-myrokcub6m.md": {
	id: "myro-electrical-cable-installer-santa-clara-myrokcub6m.md";
  slug: "myro-electrical-cable-installer-santa-clara-myrokcub6m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-commercial-apprentice-wichita-myrobxrjv3.md": {
	id: "myro-electrical-commercial-apprentice-wichita-myrobxrjv3.md";
  slug: "myro-electrical-commercial-apprentice-wichita-myrobxrjv3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-commercial-electrician-temecula-myro9fdpyb.md": {
	id: "myro-electrical-commercial-electrician-temecula-myro9fdpyb.md";
  slug: "myro-electrical-commercial-electrician-temecula-myro9fdpyb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-residential-electrician-fayetteville-myrodc4cii.md": {
	id: "myro-electrical-residential-electrician-fayetteville-myrodc4cii.md";
  slug: "myro-electrical-residential-electrician-fayetteville-myrodc4cii";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"myro-electrical-service-electrician-modesto-myrohjwwkl.md": {
	id: "myro-electrical-service-electrician-modesto-myrohjwwkl.md";
  slug: "myro-electrical-service-electrician-modesto-myrohjwwkl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-columbia-nipp6o2b65.md": {
	id: "nipper-electric-apprentice-electrician-columbia-nipp6o2b65.md";
  slug: "nipper-electric-apprentice-electrician-columbia-nipp6o2b65";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-gastonia-nippwvqjn6.md": {
	id: "nipper-electric-apprentice-electrician-gastonia-nippwvqjn6.md";
  slug: "nipper-electric-apprentice-electrician-gastonia-nippwvqjn6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-grand-junction-nipp4flk65.md": {
	id: "nipper-electric-apprentice-electrician-grand-junction-nipp4flk65.md";
  slug: "nipper-electric-apprentice-electrician-grand-junction-nipp4flk65";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-raleigh-nippwcoq2z.md": {
	id: "nipper-electric-apprentice-electrician-raleigh-nippwcoq2z.md";
  slug: "nipper-electric-apprentice-electrician-raleigh-nippwcoq2z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-cable-tech-atlanta-nipp8ipm44.md": {
	id: "nipper-electric-cable-tech-atlanta-nipp8ipm44.md";
  slug: "nipper-electric-cable-tech-atlanta-nipp8ipm44";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-cable-tech-colorado-springs-nippl7svqm.md": {
	id: "nipper-electric-cable-tech-colorado-springs-nippl7svqm.md";
  slug: "nipper-electric-cable-tech-colorado-springs-nippl7svqm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-commercial-electrician-indianapolis-nippjubhyr.md": {
	id: "nipper-electric-commercial-electrician-indianapolis-nippjubhyr.md";
  slug: "nipper-electric-commercial-electrician-indianapolis-nippjubhyr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-data-center-technician-columbus-nippxv9jzs.md": {
	id: "nipper-electric-data-center-technician-columbus-nippxv9jzs.md";
  slug: "nipper-electric-data-center-technician-columbus-nippxv9jzs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-data-center-technician-plano-nippfs1ktn.md": {
	id: "nipper-electric-data-center-technician-plano-nippfs1ktn.md";
  slug: "nipper-electric-data-center-technician-plano-nippfs1ktn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-security-technician-dunwoody-nipphgioax.md": {
	id: "nipper-electric-security-technician-dunwoody-nipphgioax.md";
  slug: "nipper-electric-security-technician-dunwoody-nipphgioax";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-security-technician-jacksonville-nippk7o8id.md": {
	id: "nipper-electric-security-technician-jacksonville-nippk7o8id.md";
  slug: "nipper-electric-security-technician-jacksonville-nippk7o8id";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-security-technician-jersey-city-nippwm2rn8.md": {
	id: "nipper-electric-security-technician-jersey-city-nippwm2rn8.md";
  slug: "nipper-electric-security-technician-jersey-city-nippwm2rn8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"nipper-electric-security-technician-peachtree-corners-nippbphz3d.md": {
	id: "nipper-electric-security-technician-peachtree-corners-nippbphz3d.md";
  slug: "nipper-electric-security-technician-peachtree-corners-nippbphz3d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-cable-technician-memphis-oakcnbrsf.md": {
	id: "oak-electrical-cable-technician-memphis-oakcnbrsf.md";
  slug: "oak-electrical-cable-technician-memphis-oakcnbrsf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-commercial-apprentice-phoenix-oak8v1l47.md": {
	id: "oak-electrical-commercial-apprentice-phoenix-oak8v1l47.md";
  slug: "oak-electrical-commercial-apprentice-phoenix-oak8v1l47";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-commercial-electrician-houston-oakx5x48w.md": {
	id: "oak-electrical-commercial-electrician-houston-oakx5x48w.md";
  slug: "oak-electrical-commercial-electrician-houston-oakx5x48w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-electrical-apprentice-new-haven-oak8ou5t1.md": {
	id: "oak-electrical-electrical-apprentice-new-haven-oak8ou5t1.md";
  slug: "oak-electrical-electrical-apprentice-new-haven-oak8ou5t1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-fire-alarm-installer-chesapeake-oaklqi017.md": {
	id: "oak-electrical-fire-alarm-installer-chesapeake-oaklqi017.md";
  slug: "oak-electrical-fire-alarm-installer-chesapeake-oaklqi017";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-cleveland-oakr6gad2.md": {
	id: "oak-electrical-industrial-electrician-cleveland-oakr6gad2.md";
  slug: "oak-electrical-industrial-electrician-cleveland-oakr6gad2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-new-orleans-oakc2hiz1.md": {
	id: "oak-electrical-industrial-electrician-new-orleans-oakc2hiz1.md";
  slug: "oak-electrical-industrial-electrician-new-orleans-oakc2hiz1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-norfolk-oaktcgbnx.md": {
	id: "oak-electrical-industrial-electrician-norfolk-oaktcgbnx.md";
  slug: "oak-electrical-industrial-electrician-norfolk-oaktcgbnx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-san-diego-oakfjqxyh.md": {
	id: "oak-electrical-industrial-electrician-san-diego-oakfjqxyh.md";
  slug: "oak-electrical-industrial-electrician-san-diego-oakfjqxyh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-st.-louis-oakxlqy1r.md": {
	id: "oak-electrical-industrial-electrician-st.-louis-oakxlqy1r.md";
  slug: "oak-electrical-industrial-electrician-st-louis-oakxlqy1r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-process-controls-technician-richmond-oak9agp2e.md": {
	id: "oak-electrical-process-controls-technician-richmond-oak9agp2e.md";
  slug: "oak-electrical-process-controls-technician-richmond-oak9agp2e";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-residential-apprentice-saint-paul-oakz0fcik.md": {
	id: "oak-electrical-residential-apprentice-saint-paul-oakz0fcik.md";
  slug: "oak-electrical-residential-apprentice-saint-paul-oakz0fcik";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-residential-apprentice-virginia-beach-oakslc1h5.md": {
	id: "oak-electrical-residential-apprentice-virginia-beach-oakslc1h5.md";
  slug: "oak-electrical-residential-apprentice-virginia-beach-oakslc1h5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-residential-electrician-charlotte-oakf1p6nf.md": {
	id: "oak-electrical-residential-electrician-charlotte-oakf1p6nf.md";
  slug: "oak-electrical-residential-electrician-charlotte-oakf1p6nf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-security-technician-aurora-oak7bbvwd.md": {
	id: "oak-electrical-security-technician-aurora-oak7bbvwd.md";
  slug: "oak-electrical-security-technician-aurora-oak7bbvwd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-security-technician-charleston-oakg830wa.md": {
	id: "oak-electrical-security-technician-charleston-oakg830wa.md";
  slug: "oak-electrical-security-technician-charleston-oakg830wa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-security-technician-seattle-oakqs8dch.md": {
	id: "oak-electrical-security-technician-seattle-oakqs8dch.md";
  slug: "oak-electrical-security-technician-seattle-oakqs8dch";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-service-electrician-denver-oakvz8udg.md": {
	id: "oak-electrical-service-electrician-denver-oakvz8udg.md";
  slug: "oak-electrical-service-electrician-denver-oakvz8udg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"oak-electrical-voice-data-installer-savannah-oakf4srhf.md": {
	id: "oak-electrical-voice-data-installer-savannah-oakf4srhf.md";
  slug: "oak-electrical-voice-data-installer-savannah-oakf4srhf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-cable-installer-memphis-passhzrlfl.md": {
	id: "passion-electric-cable-installer-memphis-passhzrlfl.md";
  slug: "passion-electric-cable-installer-memphis-passhzrlfl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-commercial-apprentice-mobile-passpee1fw.md": {
	id: "passion-electric-commercial-apprentice-mobile-passpee1fw.md";
  slug: "passion-electric-commercial-apprentice-mobile-passpee1fw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-commercial-apprentice-montpelier-pass9oqgd3.md": {
	id: "passion-electric-commercial-apprentice-montpelier-pass9oqgd3.md";
  slug: "passion-electric-commercial-apprentice-montpelier-pass9oqgd3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-electrician-ann-arbor-passuqsa2s.md": {
	id: "passion-electric-electrician-ann-arbor-passuqsa2s.md";
  slug: "passion-electric-electrician-ann-arbor-passuqsa2s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-industrial-electrician-savannah-passsne7o6.md": {
	id: "passion-electric-industrial-electrician-savannah-passsne7o6.md";
  slug: "passion-electric-industrial-electrician-savannah-passsne7o6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-security-technician-hartford-passz9vuqb.md": {
	id: "passion-electric-security-technician-hartford-passz9vuqb.md";
  slug: "passion-electric-security-technician-hartford-passz9vuqb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-service-electrician-atlanta-passtdnp7s.md": {
	id: "passion-electric-service-electrician-atlanta-passtdnp7s.md";
  slug: "passion-electric-service-electrician-atlanta-passtdnp7s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"passion-electric-service-electrician-birmingham-passb5rwap.md": {
	id: "passion-electric-service-electrician-birmingham-passb5rwap.md";
  slug: "passion-electric-service-electrician-birmingham-passb5rwap";
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
"premier-electric-apprentice-electrician-altamonte-springs-premzul7cn.md": {
	id: "premier-electric-apprentice-electrician-altamonte-springs-premzul7cn.md";
  slug: "premier-electric-apprentice-electrician-altamonte-springs-premzul7cn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-apprentice-electrician-charleston-premmdvxpr.md": {
	id: "premier-electric-apprentice-electrician-charleston-premmdvxpr.md";
  slug: "premier-electric-apprentice-electrician-charleston-premmdvxpr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-apprentice-electrician-hope-mills-premqr5eu1.md": {
	id: "premier-electric-apprentice-electrician-hope-mills-premqr5eu1.md";
  slug: "premier-electric-apprentice-electrician-hope-mills-premqr5eu1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-apprentice-electrician-mesa-premxadra8.md": {
	id: "premier-electric-apprentice-electrician-mesa-premxadra8.md";
  slug: "premier-electric-apprentice-electrician-mesa-premxadra8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-chesapeake-prem1daez8.md": {
	id: "premier-electric-cable-installer-chesapeake-prem1daez8.md";
  slug: "premier-electric-cable-installer-chesapeake-prem1daez8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-coral-springs-premlq95gj.md": {
	id: "premier-electric-cable-installer-coral-springs-premlq95gj.md";
  slug: "premier-electric-cable-installer-coral-springs-premlq95gj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-decatur-premosmqas.md": {
	id: "premier-electric-cable-installer-decatur-premosmqas.md";
  slug: "premier-electric-cable-installer-decatur-premosmqas";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-denver-premlrt3b2.md": {
	id: "premier-electric-cable-installer-denver-premlrt3b2.md";
  slug: "premier-electric-cable-installer-denver-premlrt3b2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-goose-creek-premkrrezz.md": {
	id: "premier-electric-cable-installer-goose-creek-premkrrezz.md";
  slug: "premier-electric-cable-installer-goose-creek-premkrrezz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-greensboro-premjkmud9.md": {
	id: "premier-electric-cable-installer-greensboro-premjkmud9.md";
  slug: "premier-electric-cable-installer-greensboro-premjkmud9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-lakewood-premat8q7z.md": {
	id: "premier-electric-cable-installer-lakewood-premat8q7z.md";
  slug: "premier-electric-cable-installer-lakewood-premat8q7z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-orlando-prem9nr6sa.md": {
	id: "premier-electric-cable-installer-orlando-prem9nr6sa.md";
  slug: "premier-electric-cable-installer-orlando-prem9nr6sa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-plantation-prem0qzsvk.md": {
	id: "premier-electric-cable-installer-plantation-prem0qzsvk.md";
  slug: "premier-electric-cable-installer-plantation-prem0qzsvk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-rock-hill-premvueho4.md": {
	id: "premier-electric-cable-installer-rock-hill-premvueho4.md";
  slug: "premier-electric-cable-installer-rock-hill-premvueho4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-roswell-premkd5qwu.md": {
	id: "premier-electric-cable-installer-roswell-premkd5qwu.md";
  slug: "premier-electric-cable-installer-roswell-premkd5qwu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-virginia-beach-premdfdl73.md": {
	id: "premier-electric-cable-installer-virginia-beach-premdfdl73.md";
  slug: "premier-electric-cable-installer-virginia-beach-premdfdl73";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-cable-installer-washington-prem0usg5h.md": {
	id: "premier-electric-cable-installer-washington-prem0usg5h.md";
  slug: "premier-electric-cable-installer-washington-prem0usg5h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-brandon-premk8zyle.md": {
	id: "premier-electric-commercial-apprentice-brandon-premk8zyle.md";
  slug: "premier-electric-commercial-apprentice-brandon-premk8zyle";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-chester-premybllem.md": {
	id: "premier-electric-commercial-apprentice-chester-premybllem.md";
  slug: "premier-electric-commercial-apprentice-chester-premybllem";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-fort-lauderdale-premfi0l2p.md": {
	id: "premier-electric-commercial-apprentice-fort-lauderdale-premfi0l2p.md";
  slug: "premier-electric-commercial-apprentice-fort-lauderdale-premfi0l2p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-high-point-premuw6yfy.md": {
	id: "premier-electric-commercial-apprentice-high-point-premuw6yfy.md";
  slug: "premier-electric-commercial-apprentice-high-point-premuw6yfy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-kissimmee-premjm9ss3.md": {
	id: "premier-electric-commercial-apprentice-kissimmee-premjm9ss3.md";
  slug: "premier-electric-commercial-apprentice-kissimmee-premjm9ss3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-apprentice-newport-news-prem5m92zt.md": {
	id: "premier-electric-commercial-apprentice-newport-news-prem5m92zt.md";
  slug: "premier-electric-commercial-apprentice-newport-news-prem5m92zt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-anderson-premtrixdn.md": {
	id: "premier-electric-commercial-electrician-anderson-premtrixdn.md";
  slug: "premier-electric-commercial-electrician-anderson-premtrixdn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-chapel-hill-premadox95.md": {
	id: "premier-electric-commercial-electrician-chapel-hill-premadox95.md";
  slug: "premier-electric-commercial-electrician-chapel-hill-premadox95";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-durham-premtsp73f.md": {
	id: "premier-electric-commercial-electrician-durham-premtsp73f.md";
  slug: "premier-electric-commercial-electrician-durham-premtsp73f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-lebanon-premex8ob3.md": {
	id: "premier-electric-commercial-electrician-lebanon-premex8ob3.md";
  slug: "premier-electric-commercial-electrician-lebanon-premex8ob3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-nashville-prem22z1dr.md": {
	id: "premier-electric-commercial-electrician-nashville-prem22z1dr.md";
  slug: "premier-electric-commercial-electrician-nashville-prem22z1dr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-pompano-beach-premkb6kxx.md": {
	id: "premier-electric-commercial-electrician-pompano-beach-premkb6kxx.md";
  slug: "premier-electric-commercial-electrician-pompano-beach-premkb6kxx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-scottsdale-prem8kepy0.md": {
	id: "premier-electric-commercial-electrician-scottsdale-prem8kepy0.md";
  slug: "premier-electric-commercial-electrician-scottsdale-prem8kepy0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-commercial-electrician-st.-petersburg-prem9qqvk3.md": {
	id: "premier-electric-commercial-electrician-st.-petersburg-prem9qqvk3.md";
  slug: "premier-electric-commercial-electrician-st-petersburg-prem9qqvk3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-cable-tech-franklin-premycu10n.md": {
	id: "premier-electric-data-center-cable-tech-franklin-premycu10n.md";
  slug: "premier-electric-data-center-cable-tech-franklin-premycu10n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-cable-tech-largo-prem7o547j.md": {
	id: "premier-electric-data-center-cable-tech-largo-prem7o547j.md";
  slug: "premier-electric-data-center-cable-tech-largo-prem7o547j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-cable-tech-sanford-prem533aza.md": {
	id: "premier-electric-data-center-cable-tech-sanford-prem533aza.md";
  slug: "premier-electric-data-center-cable-tech-sanford-prem533aza";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-cable-tech-wake-forest-premxnflg0.md": {
	id: "premier-electric-data-center-cable-tech-wake-forest-premxnflg0.md";
  slug: "premier-electric-data-center-cable-tech-wake-forest-premxnflg0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-cable-tech-wrightsville-beach-prem5km6v1.md": {
	id: "premier-electric-data-center-cable-tech-wrightsville-beach-prem5km6v1.md";
  slug: "premier-electric-data-center-cable-tech-wrightsville-beach-prem5km6v1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-fayetteville-premvzaasw.md": {
	id: "premier-electric-data-center-technician-fayetteville-premvzaasw.md";
  slug: "premier-electric-data-center-technician-fayetteville-premvzaasw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-gastonia-premxvdg5w.md": {
	id: "premier-electric-data-center-technician-gastonia-premxvdg5w.md";
  slug: "premier-electric-data-center-technician-gastonia-premxvdg5w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-hampton-premskt5b8.md": {
	id: "premier-electric-data-center-technician-hampton-premskt5b8.md";
  slug: "premier-electric-data-center-technician-hampton-premskt5b8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-kernersville-prem0aas8z.md": {
	id: "premier-electric-data-center-technician-kernersville-prem0aas8z.md";
  slug: "premier-electric-data-center-technician-kernersville-prem0aas8z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-marietta-premfsiypq.md": {
	id: "premier-electric-data-center-technician-marietta-premfsiypq.md";
  slug: "premier-electric-data-center-technician-marietta-premfsiypq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-matthews-premcgbdya.md": {
	id: "premier-electric-data-center-technician-matthews-premcgbdya.md";
  slug: "premier-electric-data-center-technician-matthews-premcgbdya";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-midlothian-premoy593x.md": {
	id: "premier-electric-data-center-technician-midlothian-premoy593x.md";
  slug: "premier-electric-data-center-technician-midlothian-premoy593x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-mount-juliet-prem5j6h68.md": {
	id: "premier-electric-data-center-technician-mount-juliet-prem5j6h68.md";
  slug: "premier-electric-data-center-technician-mount-juliet-prem5j6h68";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-richmond-prem2958d5.md": {
	id: "premier-electric-data-center-technician-richmond-prem2958d5.md";
  slug: "premier-electric-data-center-technician-richmond-prem2958d5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-summerville-prem4e4bc1.md": {
	id: "premier-electric-data-center-technician-summerville-prem4e4bc1.md";
  slug: "premier-electric-data-center-technician-summerville-prem4e4bc1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-data-center-technician-winter-park-premcxbdtg.md": {
	id: "premier-electric-data-center-technician-winter-park-premcxbdtg.md";
  slug: "premier-electric-data-center-technician-winter-park-premcxbdtg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-cary-premmy9nbw.md": {
	id: "premier-electric-electrical-staffing-manager-cary-premmy9nbw.md";
  slug: "premier-electric-electrical-staffing-manager-cary-premmy9nbw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-colonial-heights-premokmu2a.md": {
	id: "premier-electric-electrical-staffing-manager-colonial-heights-premokmu2a.md";
  slug: "premier-electric-electrical-staffing-manager-colonial-heights-premokmu2a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-concord-premt7qygr.md": {
	id: "premier-electric-electrical-staffing-manager-concord-premt7qygr.md";
  slug: "premier-electric-electrical-staffing-manager-concord-premt7qygr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-davidson-prem2d7p09.md": {
	id: "premier-electric-electrical-staffing-manager-davidson-prem2d7p09.md";
  slug: "premier-electric-electrical-staffing-manager-davidson-prem2d7p09";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-duluth-premn0sfj2.md": {
	id: "premier-electric-electrical-staffing-manager-duluth-premn0sfj2.md";
  slug: "premier-electric-electrical-staffing-manager-duluth-premn0sfj2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-suwanee-prem00649r.md": {
	id: "premier-electric-electrical-staffing-manager-suwanee-prem00649r.md";
  slug: "premier-electric-electrical-staffing-manager-suwanee-prem00649r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-electrical-staffing-manager-wake-forest-premadvnqr.md": {
	id: "premier-electric-electrical-staffing-manager-wake-forest-premadvnqr.md";
  slug: "premier-electric-electrical-staffing-manager-wake-forest-premadvnqr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-alpharetta-premwu0p5g.md": {
	id: "premier-electric-fiber-optic-technician-alpharetta-premwu0p5g.md";
  slug: "premier-electric-fiber-optic-technician-alpharetta-premwu0p5g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-glendale-premc4l3nq.md": {
	id: "premier-electric-fiber-optic-technician-glendale-premc4l3nq.md";
  slug: "premier-electric-fiber-optic-technician-glendale-premc4l3nq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-greenville-premk9uj76.md": {
	id: "premier-electric-fiber-optic-technician-greenville-premk9uj76.md";
  slug: "premier-electric-fiber-optic-technician-greenville-premk9uj76";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-greer-premm5xfgl.md": {
	id: "premier-electric-fiber-optic-technician-greer-premm5xfgl.md";
  slug: "premier-electric-fiber-optic-technician-greer-premm5xfgl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-johns-creek-premgtzuqe.md": {
	id: "premier-electric-fiber-optic-technician-johns-creek-premgtzuqe.md";
  slug: "premier-electric-fiber-optic-technician-johns-creek-premgtzuqe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-mechanicsville-premfi1wm9.md": {
	id: "premier-electric-fiber-optic-technician-mechanicsville-premfi1wm9.md";
  slug: "premier-electric-fiber-optic-technician-mechanicsville-premfi1wm9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-murfreesboro-premxb0n83.md": {
	id: "premier-electric-fiber-optic-technician-murfreesboro-premxb0n83.md";
  slug: "premier-electric-fiber-optic-technician-murfreesboro-premxb0n83";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-phoenix-prem71awz6.md": {
	id: "premier-electric-fiber-optic-technician-phoenix-prem71awz6.md";
  slug: "premier-electric-fiber-optic-technician-phoenix-prem71awz6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-sandy-springs-premmkui8x.md": {
	id: "premier-electric-fiber-optic-technician-sandy-springs-premmkui8x.md";
  slug: "premier-electric-fiber-optic-technician-sandy-springs-premmkui8x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fiber-optic-technician-winston-salem-premwk79hy.md": {
	id: "premier-electric-fiber-optic-technician-winston-salem-premwk79hy.md";
  slug: "premier-electric-fiber-optic-technician-winston-salem-premwk79hy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fire-alarm-installer-alexandria-prema3imiu.md": {
	id: "premier-electric-fire-alarm-installer-alexandria-prema3imiu.md";
  slug: "premier-electric-fire-alarm-installer-alexandria-prema3imiu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fire-alarm-installer-burlington-premelpx77.md": {
	id: "premier-electric-fire-alarm-installer-burlington-premelpx77.md";
  slug: "premier-electric-fire-alarm-installer-burlington-premelpx77";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fire-alarm-installer-cary-prem4pwrkd.md": {
	id: "premier-electric-fire-alarm-installer-cary-prem4pwrkd.md";
  slug: "premier-electric-fire-alarm-installer-cary-prem4pwrkd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fire-alarm-installer-clearwater-premf3fjyn.md": {
	id: "premier-electric-fire-alarm-installer-clearwater-premf3fjyn.md";
  slug: "premier-electric-fire-alarm-installer-clearwater-premf3fjyn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-fire-alarm-installer-tempe-premniiuwj.md": {
	id: "premier-electric-fire-alarm-installer-tempe-premniiuwj.md";
  slug: "premier-electric-fire-alarm-installer-tempe-premniiuwj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-centennial-premg7cqex.md": {
	id: "premier-electric-journeyman-electrician-centennial-premg7cqex.md";
  slug: "premier-electric-journeyman-electrician-centennial-premg7cqex";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-fort-bragg-premhfsn66.md": {
	id: "premier-electric-journeyman-electrician-fort-bragg-premhfsn66.md";
  slug: "premier-electric-journeyman-electrician-fort-bragg-premhfsn66";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-glen-allen-premws79i9.md": {
	id: "premier-electric-journeyman-electrician-glen-allen-premws79i9.md";
  slug: "premier-electric-journeyman-electrician-glen-allen-premws79i9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-raeford-prem8xkygk.md": {
	id: "premier-electric-journeyman-electrician-raeford-prem8xkygk.md";
  slug: "premier-electric-journeyman-electrician-raeford-prem8xkygk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-spring-lake-premu2y09y.md": {
	id: "premier-electric-journeyman-electrician-spring-lake-premu2y09y.md";
  slug: "premier-electric-journeyman-electrician-spring-lake-premu2y09y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-journeyman-electrician-tampa-premu8dclb.md": {
	id: "premier-electric-journeyman-electrician-tampa-premu8dclb.md";
  slug: "premier-electric-journeyman-electrician-tampa-premu8dclb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-chester-prem4joecp.md": {
	id: "premier-electric-junior-electrical-recruiter-chester-prem4joecp.md";
  slug: "premier-electric-junior-electrical-recruiter-chester-prem4joecp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-davidson-premdjp29h.md": {
	id: "premier-electric-junior-electrical-recruiter-davidson-premdjp29h.md";
  slug: "premier-electric-junior-electrical-recruiter-davidson-premdjp29h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-hopewell-premhhwgn0.md": {
	id: "premier-electric-junior-electrical-recruiter-hopewell-premhhwgn0.md";
  slug: "premier-electric-junior-electrical-recruiter-hopewell-premhhwgn0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-lawrenceville-premckhh3h.md": {
	id: "premier-electric-junior-electrical-recruiter-lawrenceville-premckhh3h.md";
  slug: "premier-electric-junior-electrical-recruiter-lawrenceville-premckhh3h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-petersburg-prem2kevj2.md": {
	id: "premier-electric-junior-electrical-recruiter-petersburg-prem2kevj2.md";
  slug: "premier-electric-junior-electrical-recruiter-petersburg-prem2kevj2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-raleigh-premz1kcpu.md": {
	id: "premier-electric-junior-electrical-recruiter-raleigh-premz1kcpu.md";
  slug: "premier-electric-junior-electrical-recruiter-raleigh-premz1kcpu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-junior-electrical-recruiter-snellville-prem6e6uz0.md": {
	id: "premier-electric-junior-electrical-recruiter-snellville-prem6e6uz0.md";
  slug: "premier-electric-junior-electrical-recruiter-snellville-prem6e6uz0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-aurora-prem6reg9d.md": {
	id: "premier-electric-rack-stack-installer-aurora-prem6reg9d.md";
  slug: "premier-electric-rack-stack-installer-aurora-prem6reg9d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-bethesda-premxm676s.md": {
	id: "premier-electric-rack-stack-installer-bethesda-premxm676s.md";
  slug: "premier-electric-rack-stack-installer-bethesda-premxm676s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-boulder-premj5t4jl.md": {
	id: "premier-electric-rack-stack-installer-boulder-premj5t4jl.md";
  slug: "premier-electric-rack-stack-installer-boulder-premj5t4jl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-carolina-beach-premntt7rs.md": {
	id: "premier-electric-rack-stack-installer-carolina-beach-premntt7rs.md";
  slug: "premier-electric-rack-stack-installer-carolina-beach-premntt7rs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-kennesaw-premwfp356.md": {
	id: "premier-electric-rack-stack-installer-kennesaw-premwfp356.md";
  slug: "premier-electric-rack-stack-installer-kennesaw-premwfp356";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-rack-stack-installer-spartanburg-premjxqnuk.md": {
	id: "premier-electric-rack-stack-installer-spartanburg-premjxqnuk.md";
  slug: "premier-electric-rack-stack-installer-spartanburg-premjxqnuk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-recruiter-nashville-id-bg9301.md": {
	id: "premier-electric-recruiter-nashville-id-bg9301.md";
  slug: "premier-electric-recruiter-nashville-id-bg9301";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-arlington-premk0cvki.md": {
	id: "premier-electric-security-alarm-installer-arlington-premk0cvki.md";
  slug: "premier-electric-security-alarm-installer-arlington-premk0cvki";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-atlanta-prem3epf45.md": {
	id: "premier-electric-security-alarm-installer-atlanta-prem3epf45.md";
  slug: "premier-electric-security-alarm-installer-atlanta-prem3epf45";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-chandler-prem9aou8x.md": {
	id: "premier-electric-security-alarm-installer-chandler-prem9aou8x.md";
  slug: "premier-electric-security-alarm-installer-chandler-prem9aou8x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-concord-prem4h8on1.md": {
	id: "premier-electric-security-alarm-installer-concord-prem4h8on1.md";
  slug: "premier-electric-security-alarm-installer-concord-prem4h8on1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-hampstead-prem7l67kl.md": {
	id: "premier-electric-security-alarm-installer-hampstead-prem7l67kl.md";
  slug: "premier-electric-security-alarm-installer-hampstead-prem7l67kl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-hendersonville-prem1cdoyq.md": {
	id: "premier-electric-security-alarm-installer-hendersonville-prem1cdoyq.md";
  slug: "premier-electric-security-alarm-installer-hendersonville-prem1cdoyq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-leland-premc4sxtk.md": {
	id: "premier-electric-security-alarm-installer-leland-premc4sxtk.md";
  slug: "premier-electric-security-alarm-installer-leland-premc4sxtk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-mount-pleasant-premffxhtd.md": {
	id: "premier-electric-security-alarm-installer-mount-pleasant-premffxhtd.md";
  slug: "premier-electric-security-alarm-installer-mount-pleasant-premffxhtd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-norfolk-premu60th8.md": {
	id: "premier-electric-security-alarm-installer-norfolk-premu60th8.md";
  slug: "premier-electric-security-alarm-installer-norfolk-premu60th8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-alarm-installer-raleigh-premtqztkt.md": {
	id: "premier-electric-security-alarm-installer-raleigh-premtqztkt.md";
  slug: "premier-electric-security-alarm-installer-raleigh-premtqztkt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-charlotte-premrvwmon.md": {
	id: "premier-electric-security-technician-charlotte-premrvwmon.md";
  slug: "premier-electric-security-technician-charlotte-premrvwmon";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-duluth-premb610yy.md": {
	id: "premier-electric-security-technician-duluth-premb610yy.md";
  slug: "premier-electric-security-technician-duluth-premb610yy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-hollywood-premrotpxp.md": {
	id: "premier-electric-security-technician-hollywood-premrotpxp.md";
  slug: "premier-electric-security-technician-hollywood-premrotpxp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-mauldin-premf7bkli.md": {
	id: "premier-electric-security-technician-mauldin-premf7bkli.md";
  slug: "premier-electric-security-technician-mauldin-premf7bkli";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-north-charleston-premmdhl74.md": {
	id: "premier-electric-security-technician-north-charleston-premmdhl74.md";
  slug: "premier-electric-security-technician-north-charleston-premmdhl74";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-silver-spring-premq77plp.md": {
	id: "premier-electric-security-technician-silver-spring-premq77plp.md";
  slug: "premier-electric-security-technician-silver-spring-premq77plp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-security-technician-wilmington-premjuo0nt.md": {
	id: "premier-electric-security-technician-wilmington-premjuo0nt.md";
  slug: "premier-electric-security-technician-wilmington-premjuo0nt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-cornelius-premef0lpg.md": {
	id: "premier-electric-senior-electrical-recruiter-cornelius-premef0lpg.md";
  slug: "premier-electric-senior-electrical-recruiter-cornelius-premef0lpg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-denver-premeze7or.md": {
	id: "premier-electric-senior-electrical-recruiter-denver-premeze7or.md";
  slug: "premier-electric-senior-electrical-recruiter-denver-premeze7or";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-garner-premx6xitl.md": {
	id: "premier-electric-senior-electrical-recruiter-garner-premx6xitl.md";
  slug: "premier-electric-senior-electrical-recruiter-garner-premx6xitl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-harrisburg-premop2rzb.md": {
	id: "premier-electric-senior-electrical-recruiter-harrisburg-premop2rzb.md";
  slug: "premier-electric-senior-electrical-recruiter-harrisburg-premop2rzb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-huntersville-premurxs52.md": {
	id: "premier-electric-senior-electrical-recruiter-huntersville-premurxs52.md";
  slug: "premier-electric-senior-electrical-recruiter-huntersville-premurxs52";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-electric-senior-electrical-recruiter-kannapolis-premon0mtg.md": {
	id: "premier-electric-senior-electrical-recruiter-kannapolis-premon0mtg.md";
  slug: "premier-electric-senior-electrical-recruiter-kannapolis-premon0mtg";
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
"premier-recruiter-heritage-bd983101.md": {
	id: "premier-recruiter-heritage-bd983101.md";
  slug: "premier-recruiter-heritage-bd983101";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-recruiter-phoenix-id-bf899331.md": {
	id: "premier-recruiter-phoenix-id-bf899331.md";
  slug: "premier-recruiter-phoenix-id-bf899331";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"premier-recruiter-richmond-ht930182.md": {
	id: "premier-recruiter-richmond-ht930182.md";
  slug: "premier-recruiter-richmond-ht930182";
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
"prime-partners-av-technician-boston-primvhbn4n.md": {
	id: "prime-partners-av-technician-boston-primvhbn4n.md";
  slug: "prime-partners-av-technician-boston-primvhbn4n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-av-technician-kansas-city-primafj3od.md": {
	id: "prime-partners-av-technician-kansas-city-primafj3od.md";
  slug: "prime-partners-av-technician-kansas-city-primafj3od";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-av-technician-phoenix-primafq4im.md": {
	id: "prime-partners-av-technician-phoenix-primafq4im.md";
  slug: "prime-partners-av-technician-phoenix-primafq4im";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-cable-technician-cleveland-primwdwpwm.md": {
	id: "prime-partners-cable-technician-cleveland-primwdwpwm.md";
  slug: "prime-partners-cable-technician-cleveland-primwdwpwm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-cable-technician-denver-prim4qy0df.md": {
	id: "prime-partners-cable-technician-denver-prim4qy0df.md";
  slug: "prime-partners-cable-technician-denver-prim4qy0df";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-cable-technician-denver-primxli5z4.md": {
	id: "prime-partners-cable-technician-denver-primxli5z4.md";
  slug: "prime-partners-cable-technician-denver-primxli5z4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-commercial-apprentice-boston-primssaco7.md": {
	id: "prime-partners-commercial-apprentice-boston-primssaco7.md";
  slug: "prime-partners-commercial-apprentice-boston-primssaco7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-controls-technician-houston-primz7391m.md": {
	id: "prime-partners-controls-technician-houston-primz7391m.md";
  slug: "prime-partners-controls-technician-houston-primz7391m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-controls-technician-new-york-primadynjl.md": {
	id: "prime-partners-controls-technician-new-york-primadynjl.md";
  slug: "prime-partners-controls-technician-new-york-primadynjl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-electrical-project-manager-bakersfield-primn8w2oy.md": {
	id: "prime-partners-electrical-project-manager-bakersfield-primn8w2oy.md";
  slug: "prime-partners-electrical-project-manager-bakersfield-primn8w2oy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-designer-salem-prim89ujw0.md": {
	id: "prime-partners-fire-alarm-designer-salem-prim89ujw0.md";
  slug: "prime-partners-fire-alarm-designer-salem-prim89ujw0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-designer-seattle-prim0l7ril.md": {
	id: "prime-partners-fire-alarm-designer-seattle-prim0l7ril.md";
  slug: "prime-partners-fire-alarm-designer-seattle-prim0l7ril";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-technician-jacksonville-primvzrjoc.md": {
	id: "prime-partners-fire-alarm-technician-jacksonville-primvzrjoc.md";
  slug: "prime-partners-fire-alarm-technician-jacksonville-primvzrjoc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-technician-miami-primiiydjt.md": {
	id: "prime-partners-fire-alarm-technician-miami-primiiydjt.md";
  slug: "prime-partners-fire-alarm-technician-miami-primiiydjt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-industrial-electrician-los-angeles-prim9u25u7.md": {
	id: "prime-partners-industrial-electrician-los-angeles-prim9u25u7.md";
  slug: "prime-partners-industrial-electrician-los-angeles-prim9u25u7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-junior-project-manager-santa-clarita-primu1n8e3.md": {
	id: "prime-partners-junior-project-manager-santa-clarita-primu1n8e3.md";
  slug: "prime-partners-junior-project-manager-santa-clarita-primu1n8e3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-process-controls-technician-dallas-primvqz142.md": {
	id: "prime-partners-process-controls-technician-dallas-primvqz142.md";
  slug: "prime-partners-process-controls-technician-dallas-primvqz142";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-residential-electrician-boston-primht1ii2.md": {
	id: "prime-partners-residential-electrician-boston-primht1ii2.md";
  slug: "prime-partners-residential-electrician-boston-primht1ii2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-residential-electrician-houston-primr3sjt0.md": {
	id: "prime-partners-residential-electrician-houston-primr3sjt0.md";
  slug: "prime-partners-residential-electrician-houston-primr3sjt0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-san-jose-primxjl8c6.md": {
	id: "prime-partners-security-alarm-project-manager-san-jose-primxjl8c6.md";
  slug: "prime-partners-security-alarm-project-manager-san-jose-primxjl8c6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-sparks-prim6ps72m.md": {
	id: "prime-partners-security-alarm-project-manager-sparks-prim6ps72m.md";
  slug: "prime-partners-security-alarm-project-manager-sparks-prim6ps72m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-tacoma-primph53uf.md": {
	id: "prime-partners-security-alarm-project-manager-tacoma-primph53uf.md";
  slug: "prime-partners-security-alarm-project-manager-tacoma-primph53uf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"prime-partners-senior-controls-technician-san-jose-primcqo2xp.md": {
	id: "prime-partners-senior-controls-technician-san-jose-primcqo2xp.md";
  slug: "prime-partners-senior-controls-technician-san-jose-primcqo2xp";
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
"priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp.md": {
	id: "priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp.md";
  slug: "priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"priority-electrical-services-cable-tech-charlotte-priobp5lb9.md": {
	id: "priority-electrical-services-cable-tech-charlotte-priobp5lb9.md";
  slug: "priority-electrical-services-cable-tech-charlotte-priobp5lb9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"priority-electrical-services-data-center-technician-fort-worth-priors8hs3.md": {
	id: "priority-electrical-services-data-center-technician-fort-worth-priors8hs3.md";
  slug: "priority-electrical-services-data-center-technician-fort-worth-priors8hs3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"priority-electrical-services-security-technician-irving-priohdegn5.md": {
	id: "priority-electrical-services-security-technician-irving-priohdegn5.md";
  slug: "priority-electrical-services-security-technician-irving-priohdegn5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-commercial-apprentice-billings-reliink0ip.md": {
	id: "reliable-electric-commercial-apprentice-billings-reliink0ip.md";
  slug: "reliable-electric-commercial-apprentice-billings-reliink0ip";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-commercial-apprentice-detroit-reliwc6n43.md": {
	id: "reliable-electric-commercial-apprentice-detroit-reliwc6n43.md";
  slug: "reliable-electric-commercial-apprentice-detroit-reliwc6n43";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-commercial-apprentice-missoula-relid5ike7.md": {
	id: "reliable-electric-commercial-apprentice-missoula-relid5ike7.md";
  slug: "reliable-electric-commercial-apprentice-missoula-relid5ike7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-commercial-apprentice-san-antonio-relicieben.md": {
	id: "reliable-electric-commercial-apprentice-san-antonio-relicieben.md";
  slug: "reliable-electric-commercial-apprentice-san-antonio-relicieben";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-controls-engineer-cincinnati-reli39rmk3.md": {
	id: "reliable-electric-controls-engineer-cincinnati-reli39rmk3.md";
  slug: "reliable-electric-controls-engineer-cincinnati-reli39rmk3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-controls-engineer-glendale-relig9bme9.md": {
	id: "reliable-electric-controls-engineer-glendale-relig9bme9.md";
  slug: "reliable-electric-controls-engineer-glendale-relig9bme9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-data-center-technician-st.-petersburg-relin03lw5.md": {
	id: "reliable-electric-data-center-technician-st.-petersburg-relin03lw5.md";
  slug: "reliable-electric-data-center-technician-st-petersburg-relin03lw5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-electrician-lexington-reli4e85pw.md": {
	id: "reliable-electric-electrician-lexington-reli4e85pw.md";
  slug: "reliable-electric-electrician-lexington-reli4e85pw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8.md": {
	id: "reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8.md";
  slug: "reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-fire-alarm-technician-atlanta-reli736v50.md": {
	id: "reliable-electric-fire-alarm-technician-atlanta-reli736v50.md";
  slug: "reliable-electric-fire-alarm-technician-atlanta-reli736v50";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-industrial-electrician-fullerton-relic3h2rd.md": {
	id: "reliable-electric-industrial-electrician-fullerton-relic3h2rd.md";
  slug: "reliable-electric-industrial-electrician-fullerton-relic3h2rd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-industrial-electrician-hartford-relixj0zqs.md": {
	id: "reliable-electric-industrial-electrician-hartford-relixj0zqs.md";
  slug: "reliable-electric-industrial-electrician-hartford-relixj0zqs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-senior-controls-technician-las-vegas-reliy3o66v.md": {
	id: "reliable-electric-senior-controls-technician-las-vegas-reliy3o66v.md";
  slug: "reliable-electric-senior-controls-technician-las-vegas-reliy3o66v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-senior-controls-technician-portland-reliqutyxx.md": {
	id: "reliable-electric-senior-controls-technician-portland-reliqutyxx.md";
  slug: "reliable-electric-senior-controls-technician-portland-reliqutyxx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-service-electrician-green-bay-relidbkt84.md": {
	id: "reliable-electric-service-electrician-green-bay-relidbkt84.md";
  slug: "reliable-electric-service-electrician-green-bay-relidbkt84";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"reliable-electric-service-electrician-tucson-relich2ngt.md": {
	id: "reliable-electric-service-electrician-tucson-relich2ngt.md";
  slug: "reliable-electric-service-electrician-tucson-relich2ngt";
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
"rex-moore-electric-apprentice-electrician-fremont-rexb837xe.md": {
	id: "rex-moore-electric-apprentice-electrician-fremont-rexb837xe.md";
  slug: "rex-moore-electric-apprentice-electrician-fremont-rexb837xe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov.md": {
	id: "rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov.md";
  slug: "rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-apprentice-electrician-riverside-rexr6266x.md": {
	id: "rex-moore-electric-apprentice-electrician-riverside-rexr6266x.md";
  slug: "rex-moore-electric-apprentice-electrician-riverside-rexr6266x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-fontana-rex3pp62q.md": {
	id: "rex-moore-electric-journeyman-electrician-fontana-rex3pp62q.md";
  slug: "rex-moore-electric-journeyman-electrician-fontana-rex3pp62q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d.md": {
	id: "rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d.md";
  slug: "rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6.md": {
	id: "rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6.md";
  slug: "rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0.md": {
	id: "rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0.md";
  slug: "rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5.md": {
	id: "rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5.md";
  slug: "rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-apprentice-electrician-charleston-rogeegyjka.md": {
	id: "rogers-electric-apprentice-electrician-charleston-rogeegyjka.md";
  slug: "rogers-electric-apprentice-electrician-charleston-rogeegyjka";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-apprentice-electrician-orangeburg-roge677rlo.md": {
	id: "rogers-electric-apprentice-electrician-orangeburg-roge677rlo.md";
  slug: "rogers-electric-apprentice-electrician-orangeburg-roge677rlo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-aurora-rogeon2h4b.md": {
	id: "rogers-electric-cable-tech-aurora-rogeon2h4b.md";
  slug: "rogers-electric-cable-tech-aurora-rogeon2h4b";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-cedar-park-rogebpol41.md": {
	id: "rogers-electric-cable-tech-cedar-park-rogebpol41.md";
  slug: "rogers-electric-cable-tech-cedar-park-rogebpol41";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-orlando-roget4y0j6.md": {
	id: "rogers-electric-cable-tech-orlando-roget4y0j6.md";
  slug: "rogers-electric-cable-tech-orlando-roget4y0j6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-cable-technician-greensboro-roge5snfyi.md": {
	id: "rogers-electric-cable-technician-greensboro-roge5snfyi.md";
  slug: "rogers-electric-cable-technician-greensboro-roge5snfyi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw.md": {
	id: "rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw.md";
  slug: "rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-commercial-project-manager-macon-roge2wrx15.md": {
	id: "rogers-electric-commercial-project-manager-macon-roge2wrx15.md";
  slug: "rogers-electric-commercial-project-manager-macon-roge2wrx15";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-electrician-gainesville-rogek28eqq.md": {
	id: "rogers-electric-electrician-gainesville-rogek28eqq.md";
  slug: "rogers-electric-electrician-gainesville-rogek28eqq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-junior-project-manager-tampa-rogecmwojk.md": {
	id: "rogers-electric-junior-project-manager-tampa-rogecmwojk.md";
  slug: "rogers-electric-junior-project-manager-tampa-rogecmwojk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-junior-project-manager-tempe-rogeely7qh.md": {
	id: "rogers-electric-junior-project-manager-tempe-rogeely7qh.md";
  slug: "rogers-electric-junior-project-manager-tempe-rogeely7qh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"rogers-electric-project-manager-colorado-springs-rogek0ha67.md": {
	id: "rogers-electric-project-manager-colorado-springs-rogek0ha67.md";
  slug: "rogers-electric-project-manager-colorado-springs-rogek0ha67";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-electrical-project-manager-orem-safegk0q19.md": {
	id: "safe-and-sound-electrical-project-manager-orem-safegk0q19.md";
  slug: "safe-and-sound-electrical-project-manager-orem-safegk0q19";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-fire-alarm-designer-reno-safe9lrlj4.md": {
	id: "safe-and-sound-fire-alarm-designer-reno-safe9lrlj4.md";
  slug: "safe-and-sound-fire-alarm-designer-reno-safe9lrlj4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh.md": {
	id: "safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh.md";
  slug: "safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-junior-project-manager-stockton-safe9zboef.md": {
	id: "safe-and-sound-junior-project-manager-stockton-safe9zboef.md";
  slug: "safe-and-sound-junior-project-manager-stockton-safe9zboef";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-security-alarm-project-manager-fremont-safels05kj.md": {
	id: "safe-and-sound-security-alarm-project-manager-fremont-safels05kj.md";
  slug: "safe-and-sound-security-alarm-project-manager-fremont-safels05kj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-and-sound-security-project-manager-modesto-safexs193s.md": {
	id: "safe-and-sound-security-project-manager-modesto-safexs193s.md";
  slug: "safe-and-sound-security-project-manager-modesto-safexs193s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-electric-commercial-apprentice-tucson-safetm3p8q.md": {
	id: "safe-electric-commercial-apprentice-tucson-safetm3p8q.md";
  slug: "safe-electric-commercial-apprentice-tucson-safetm3p8q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-electric-residential-apprentice-cedar-rapids-safe72hhzn.md": {
	id: "safe-electric-residential-apprentice-cedar-rapids-safe72hhzn.md";
  slug: "safe-electric-residential-apprentice-cedar-rapids-safe72hhzn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-electric-security-technician-fayetteville-safel7dp5w.md": {
	id: "safe-electric-security-technician-fayetteville-safel7dp5w.md";
  slug: "safe-electric-security-technician-fayetteville-safel7dp5w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"safe-electric-security-technician-phoenix-safe0tfnbl.md": {
	id: "safe-electric-security-technician-phoenix-safe0tfnbl.md";
  slug: "safe-electric-security-technician-phoenix-safe0tfnbl";
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
"shelby-communications-cable-installer-burnsville-shelve7yzc.md": {
	id: "shelby-communications-cable-installer-burnsville-shelve7yzc.md";
  slug: "shelby-communications-cable-installer-burnsville-shelve7yzc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-cable-installer-detroit-shelf7v5ct.md": {
	id: "shelby-communications-cable-installer-detroit-shelf7v5ct.md";
  slug: "shelby-communications-cable-installer-detroit-shelf7v5ct";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-commercial-electrician-fort-wayne-shelofhtyn.md": {
	id: "shelby-communications-commercial-electrician-fort-wayne-shelofhtyn.md";
  slug: "shelby-communications-commercial-electrician-fort-wayne-shelofhtyn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-commercial-electrician-high-point-shelsimjy0.md": {
	id: "shelby-communications-commercial-electrician-high-point-shelsimjy0.md";
  slug: "shelby-communications-commercial-electrician-high-point-shelsimjy0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-fiber-optic-technician-odessa-shel4ezuvx.md": {
	id: "shelby-communications-fiber-optic-technician-odessa-shel4ezuvx.md";
  slug: "shelby-communications-fiber-optic-technician-odessa-shel4ezuvx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-fire-alarm-installer-midland-sheletccb8.md": {
	id: "shelby-communications-fire-alarm-installer-midland-sheletccb8.md";
  slug: "shelby-communications-fire-alarm-installer-midland-sheletccb8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"shelby-communications-rack-stack-installer-columbia-shel51hjcf.md": {
	id: "shelby-communications-rack-stack-installer-columbia-shel51hjcf.md";
  slug: "shelby-communications-rack-stack-installer-columbia-shel51hjcf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"simple-electric-cable-installer-des-moines-simpk63zka.md": {
	id: "simple-electric-cable-installer-des-moines-simpk63zka.md";
  slug: "simple-electric-cable-installer-des-moines-simpk63zka";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"simple-electric-residential-apprentice-cleveland-simpsdllsd.md": {
	id: "simple-electric-residential-apprentice-cleveland-simpsdllsd.md";
  slug: "simple-electric-residential-apprentice-cleveland-simpsdllsd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"simple-electric-residential-electrician-knoxville-simpltiyt9.md": {
	id: "simple-electric-residential-electrician-knoxville-simpltiyt9.md";
  slug: "simple-electric-residential-electrician-knoxville-simpltiyt9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"simple-electric-service-electrician-jersey-city-simppxidua.md": {
	id: "simple-electric-service-electrician-jersey-city-simppxidua.md";
  slug: "simple-electric-service-electrician-jersey-city-simppxidua";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-allen-data-gdfntk.md": {
	id: "staley-data-center-cable-technician-allen-data-gdfntk.md";
  slug: "staley-data-center-cable-technician-allen-data-gdfntk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-ashburn-data-9pg7w9.md": {
	id: "staley-data-center-cable-technician-ashburn-data-9pg7w9.md";
  slug: "staley-data-center-cable-technician-ashburn-data-9pg7w9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-chicago-data-nlbs01.md": {
	id: "staley-data-center-cable-technician-chicago-data-nlbs01.md";
  slug: "staley-data-center-cable-technician-chicago-data-nlbs01";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-elk-grove-village-data-jx5fjy.md": {
	id: "staley-data-center-cable-technician-elk-grove-village-data-jx5fjy.md";
  slug: "staley-data-center-cable-technician-elk-grove-village-data-jx5fjy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-hillsboro-data-ottwhx.md": {
	id: "staley-data-center-cable-technician-hillsboro-data-ottwhx.md";
  slug: "staley-data-center-cable-technician-hillsboro-data-ottwhx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-leesburg-data-xysr35.md": {
	id: "staley-data-center-cable-technician-leesburg-data-xysr35.md";
  slug: "staley-data-center-cable-technician-leesburg-data-xysr35";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-loudoun-county-data-6icyh7.md": {
	id: "staley-data-center-cable-technician-loudoun-county-data-6icyh7.md";
  slug: "staley-data-center-cable-technician-loudoun-county-data-6icyh7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-manassas-data-lqjf48.md": {
	id: "staley-data-center-cable-technician-manassas-data-lqjf48.md";
  slug: "staley-data-center-cable-technician-manassas-data-lqjf48";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-mesa-data-v8gd2x.md": {
	id: "staley-data-center-cable-technician-mesa-data-v8gd2x.md";
  slug: "staley-data-center-cable-technician-mesa-data-v8gd2x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-newark-data-stzeuv.md": {
	id: "staley-data-center-cable-technician-newark-data-stzeuv.md";
  slug: "staley-data-center-cable-technician-newark-data-stzeuv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-plano-data-u75f4p.md": {
	id: "staley-data-center-cable-technician-plano-data-u75f4p.md";
  slug: "staley-data-center-cable-technician-plano-data-u75f4p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-reno-data-e9hx6c.md": {
	id: "staley-data-center-cable-technician-reno-data-e9hx6c.md";
  slug: "staley-data-center-cable-technician-reno-data-e9hx6c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-richardson-data-o9rnan.md": {
	id: "staley-data-center-cable-technician-richardson-data-o9rnan.md";
  slug: "staley-data-center-cable-technician-richardson-data-o9rnan";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-salt-lake-city-data-48dfb0.md": {
	id: "staley-data-center-cable-technician-salt-lake-city-data-48dfb0.md";
  slug: "staley-data-center-cable-technician-salt-lake-city-data-48dfb0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-sterling-data-pbhi8a.md": {
	id: "staley-data-center-cable-technician-sterling-data-pbhi8a.md";
  slug: "staley-data-center-cable-technician-sterling-data-pbhi8a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-austin-data-p9me4v.md": {
	id: "staley-data-center-network-engineer-austin-data-p9me4v.md";
  slug: "staley-data-center-network-engineer-austin-data-p9me4v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-cheyenne-data-7b36bv.md": {
	id: "staley-data-center-network-engineer-cheyenne-data-7b36bv.md";
  slug: "staley-data-center-network-engineer-cheyenne-data-7b36bv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-columbus-data-uwpq1l.md": {
	id: "staley-data-center-network-engineer-columbus-data-uwpq1l.md";
  slug: "staley-data-center-network-engineer-columbus-data-uwpq1l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-council-bluffs-data-8s5hin.md": {
	id: "staley-data-center-network-engineer-council-bluffs-data-8s5hin.md";
  slug: "staley-data-center-network-engineer-council-bluffs-data-8s5hin";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-des-moines-data-7t38kk.md": {
	id: "staley-data-center-network-engineer-des-moines-data-7t38kk.md";
  slug: "staley-data-center-network-engineer-des-moines-data-7t38kk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-maiden-data-p2lq9h.md": {
	id: "staley-data-center-network-engineer-maiden-data-p2lq9h.md";
  slug: "staley-data-center-network-engineer-maiden-data-p2lq9h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-altoona-data-6tvo42.md": {
	id: "staley-data-center-rack-&-stack-technician-altoona-data-6tvo42.md";
  slug: "staley-data-center-rack--stack-technician-altoona-data-6tvo42";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-chandler-data-8nqnl4.md": {
	id: "staley-data-center-rack-&-stack-technician-chandler-data-8nqnl4.md";
  slug: "staley-data-center-rack--stack-technician-chandler-data-8nqnl4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-forest-city-data-wom9xf.md": {
	id: "staley-data-center-rack-&-stack-technician-forest-city-data-wom9xf.md";
  slug: "staley-data-center-rack--stack-technician-forest-city-data-wom9xf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-los-angeles-data-72mfl3.md": {
	id: "staley-data-center-rack-&-stack-technician-los-angeles-data-72mfl3.md";
  slug: "staley-data-center-rack--stack-technician-los-angeles-data-72mfl3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-new-albany-data-894fj4.md": {
	id: "staley-data-center-rack-&-stack-technician-new-albany-data-894fj4.md";
  slug: "staley-data-center-rack--stack-technician-new-albany-data-894fj4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-new-york-data-i2gjte.md": {
	id: "staley-data-center-rack-&-stack-technician-new-york-data-i2gjte.md";
  slug: "staley-data-center-rack--stack-technician-new-york-data-i2gjte";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-phoenix-data-3c1i76.md": {
	id: "staley-data-center-rack-&-stack-technician-phoenix-data-3c1i76.md";
  slug: "staley-data-center-rack--stack-technician-phoenix-data-3c1i76";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-prineville-data-tec9hv.md": {
	id: "staley-data-center-rack-&-stack-technician-prineville-data-tec9hv.md";
  slug: "staley-data-center-rack--stack-technician-prineville-data-tec9hv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-richmond-data-d9lv9y.md": {
	id: "staley-data-center-rack-&-stack-technician-richmond-data-d9lv9y.md";
  slug: "staley-data-center-rack--stack-technician-richmond-data-d9lv9y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-sacramento-data-znolix.md": {
	id: "staley-data-center-rack-&-stack-technician-sacramento-data-znolix.md";
  slug: "staley-data-center-rack--stack-technician-sacramento-data-znolix";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-santa-clara-data-uxrdyx.md": {
	id: "staley-data-center-rack-&-stack-technician-santa-clara-data-uxrdyx.md";
  slug: "staley-data-center-rack--stack-technician-santa-clara-data-uxrdyx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-seattle-data-7s5nyx.md": {
	id: "staley-data-center-rack-&-stack-technician-seattle-data-7s5nyx.md";
  slug: "staley-data-center-rack--stack-technician-seattle-data-7s5nyx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt.md": {
	id: "staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt.md";
  slug: "staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13.md": {
	id: "staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13.md";
  slug: "staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-denver-fibe-9qu44o.md": {
	id: "staley-fiber-optic-splicing-technician-denver-fibe-9qu44o.md";
  slug: "staley-fiber-optic-splicing-technician-denver-fibe-9qu44o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb.md": {
	id: "staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb.md";
  slug: "staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3.md": {
	id: "staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3.md";
  slug: "staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8.md": {
	id: "staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8.md";
  slug: "staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh.md": {
	id: "staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh.md";
  slug: "staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-miami-fibe-hfon3n.md": {
	id: "staley-fiber-optic-splicing-technician-miami-fibe-hfon3n.md";
  slug: "staley-fiber-optic-splicing-technician-miami-fibe-hfon3n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f.md": {
	id: "staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f.md";
  slug: "staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-reston-fibe-r22uo3.md": {
	id: "staley-fiber-optic-splicing-technician-reston-fibe-r22uo3.md";
  slug: "staley-fiber-optic-splicing-technician-reston-fibe-r22uo3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com.md": {
	id: "staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com.md";
  slug: "staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8.md": {
	id: "staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8.md";
  slug: "staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-cable-installer-medford-stalz5aj0m.md": {
	id: "staley-technologies-cable-installer-medford-stalz5aj0m.md";
  slug: "staley-technologies-cable-installer-medford-stalz5aj0m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-commercial-apprentice-concord-stalb8obdk.md": {
	id: "staley-technologies-commercial-apprentice-concord-stalb8obdk.md";
  slug: "staley-technologies-commercial-apprentice-concord-stalb8obdk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-commercial-apprentice-little-rock-stalbv3dqp.md": {
	id: "staley-technologies-commercial-apprentice-little-rock-stalbv3dqp.md";
  slug: "staley-technologies-commercial-apprentice-little-rock-stalbv3dqp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf.md": {
	id: "staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf.md";
  slug: "staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-controls-engineer-louisville-stalfb1r63.md": {
	id: "staley-technologies-controls-engineer-louisville-stalfb1r63.md";
  slug: "staley-technologies-controls-engineer-louisville-stalfb1r63";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-controls-technician-worcester-stalnav4fm.md": {
	id: "staley-technologies-controls-technician-worcester-stalnav4fm.md";
  slug: "staley-technologies-controls-technician-worcester-stalnav4fm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-data-center-cable-tech-boise-stal8vfb51.md": {
	id: "staley-technologies-data-center-cable-tech-boise-stal8vfb51.md";
  slug: "staley-technologies-data-center-cable-tech-boise-stal8vfb51";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-data-center-cable-tech-indianapolis-stal5h18io.md": {
	id: "staley-technologies-data-center-cable-tech-indianapolis-stal5h18io.md";
  slug: "staley-technologies-data-center-cable-tech-indianapolis-stal5h18io";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-data-center-technician-reno-stalowwfp7.md": {
	id: "staley-technologies-data-center-technician-reno-stalowwfp7.md";
  slug: "staley-technologies-data-center-technician-reno-stalowwfp7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-electrical-apprentice-des-moines-stalp3i36h.md": {
	id: "staley-technologies-electrical-apprentice-des-moines-stalp3i36h.md";
  slug: "staley-technologies-electrical-apprentice-des-moines-stalp3i36h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm.md": {
	id: "staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm.md";
  slug: "staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fiber-optic-technician-katy-stalovtb3h.md": {
	id: "staley-technologies-fiber-optic-technician-katy-stalovtb3h.md";
  slug: "staley-technologies-fiber-optic-technician-katy-stalovtb3h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fiber-optic-technician-st.-louis-stal6clpvs.md": {
	id: "staley-technologies-fiber-optic-technician-st.-louis-stal6clpvs.md";
  slug: "staley-technologies-fiber-optic-technician-st-louis-stal6clpvs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-designer-irvine-stal977llc.md": {
	id: "staley-technologies-fire-alarm-designer-irvine-stal977llc.md";
  slug: "staley-technologies-fire-alarm-designer-irvine-stal977llc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-designer-spokane-stalf2muvr.md": {
	id: "staley-technologies-fire-alarm-designer-spokane-stalf2muvr.md";
  slug: "staley-technologies-fire-alarm-designer-spokane-stalf2muvr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-installer-athens-stalxf3vly.md": {
	id: "staley-technologies-fire-alarm-installer-athens-stalxf3vly.md";
  slug: "staley-technologies-fire-alarm-installer-athens-stalxf3vly";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-installer-billings-stalyghw39.md": {
	id: "staley-technologies-fire-alarm-installer-billings-stalyghw39.md";
  slug: "staley-technologies-fire-alarm-installer-billings-stalyghw39";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6.md": {
	id: "staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6.md";
  slug: "staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql.md": {
	id: "staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql.md";
  slug: "staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6.md": {
	id: "staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6.md";
  slug: "staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-industrial-electrician-phoenix-stalr1fra2.md": {
	id: "staley-technologies-industrial-electrician-phoenix-stalr1fra2.md";
  slug: "staley-technologies-industrial-electrician-phoenix-stalr1fra2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-rack-stack-installer-irving-stall8n6qa.md": {
	id: "staley-technologies-rack-stack-installer-irving-stall8n6qa.md";
  slug: "staley-technologies-rack-stack-installer-irving-stall8n6qa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"staley-technologies-service-electrician-baltimore-stala5myko.md": {
	id: "staley-technologies-service-electrician-baltimore-stala5myko.md";
  slug: "staley-technologies-service-electrician-baltimore-stala5myko";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-cable-installer-augusta-star4lb6as.md": {
	id: "star-electric-cable-installer-augusta-star4lb6as.md";
  slug: "star-electric-cable-installer-augusta-star4lb6as";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-commercial-apprentice-jacksonville-star2xe44h.md": {
	id: "star-electric-commercial-apprentice-jacksonville-star2xe44h.md";
  slug: "star-electric-commercial-apprentice-jacksonville-star2xe44h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-commercial-apprentice-portland-staroxu6v3.md": {
	id: "star-electric-commercial-apprentice-portland-staroxu6v3.md";
  slug: "star-electric-commercial-apprentice-portland-staroxu6v3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-electrician-phoenix-starra2pbd.md": {
	id: "star-electric-electrician-phoenix-starra2pbd.md";
  slug: "star-electric-electrician-phoenix-starra2pbd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-industrial-electrician-park-city-staronemsc.md": {
	id: "star-electric-industrial-electrician-park-city-staronemsc.md";
  slug: "star-electric-industrial-electrician-park-city-staronemsc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-residential-electrician-little-rock-starmg9oy4.md": {
	id: "star-electric-residential-electrician-little-rock-starmg9oy4.md";
  slug: "star-electric-residential-electrician-little-rock-starmg9oy4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"star-electric-service-electrician-louisville-stara8qv7x.md": {
	id: "star-electric-service-electrician-louisville-stara8qv7x.md";
  slug: "star-electric-service-electrician-louisville-stara8qv7x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z.md": {
	id: "swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z.md";
  slug: "swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-av-technician-annapolis-swanxv132q.md": {
	id: "swan-electrical-systems-av-technician-annapolis-swanxv132q.md";
  slug: "swan-electrical-systems-av-technician-annapolis-swanxv132q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-cable-technician-columbus-swang9g4dy.md": {
	id: "swan-electrical-systems-cable-technician-columbus-swang9g4dy.md";
  slug: "swan-electrical-systems-cable-technician-columbus-swang9g4dy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56.md": {
	id: "swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56.md";
  slug: "swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t.md": {
	id: "swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t.md";
  slug: "swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr.md": {
	id: "swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr.md";
  slug: "swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz.md": {
	id: "swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz.md";
  slug: "swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"swan-electrical-systems-service-electrician-buffalo-swanxryi47.md": {
	id: "swan-electrical-systems-service-electrician-buffalo-swanxryi47.md";
  slug: "swan-electrical-systems-service-electrician-buffalo-swanxryi47";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-audio-visual-technician-alexandria-t&dcvd80k.md": {
	id: "t&d-communications-audio-visual-technician-alexandria-t&dcvd80k.md";
  slug: "td-communications-audio-visual-technician-alexandria-tdcvd80k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-oklahoma-city-t&d1k6uzf.md": {
	id: "t&d-communications-av-systems-tech-oklahoma-city-t&d1k6uzf.md";
  slug: "td-communications-av-systems-tech-oklahoma-city-td1k6uzf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-torrance-t&d7ujwdj.md": {
	id: "t&d-communications-av-systems-tech-torrance-t&d7ujwdj.md";
  slug: "td-communications-av-systems-tech-torrance-td7ujwdj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-westlake-village-t&d8njfed.md": {
	id: "t&d-communications-av-systems-tech-westlake-village-t&d8njfed.md";
  slug: "td-communications-av-systems-tech-westlake-village-td8njfed";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-installer-greenville-t&d4rqni9.md": {
	id: "t&d-communications-cable-installer-greenville-t&d4rqni9.md";
  slug: "td-communications-cable-installer-greenville-td4rqni9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-installer-scottsdale-t&d59usal.md": {
	id: "t&d-communications-cable-installer-scottsdale-t&d59usal.md";
  slug: "td-communications-cable-installer-scottsdale-td59usal";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-installer-westminster-t&dwt6y3r.md": {
	id: "t&d-communications-cable-installer-westminster-t&dwt6y3r.md";
  slug: "td-communications-cable-installer-westminster-tdwt6y3r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-tech-beverly-hills-t&dv5bdcm.md": {
	id: "t&d-communications-cable-tech-beverly-hills-t&dv5bdcm.md";
  slug: "td-communications-cable-tech-beverly-hills-tdv5bdcm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-tech-irvine-t&df9xmv7.md": {
	id: "t&d-communications-cable-tech-irvine-t&df9xmv7.md";
  slug: "td-communications-cable-tech-irvine-tdf9xmv7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-barstow-t&dp5xtu0.md": {
	id: "t&d-communications-cable-technician-barstow-t&dp5xtu0.md";
  slug: "td-communications-cable-technician-barstow-tdp5xtu0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-marina-del-rey-t&dknxgpk.md": {
	id: "t&d-communications-cable-technician-marina-del-rey-t&dknxgpk.md";
  slug: "td-communications-cable-technician-marina-del-rey-tdknxgpk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-modesto-t&d092y10.md": {
	id: "t&d-communications-cable-technician-modesto-t&d092y10.md";
  slug: "td-communications-cable-technician-modesto-td092y10";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-salem-t&dzphrzv.md": {
	id: "t&d-communications-cable-technician-salem-t&dzphrzv.md";
  slug: "td-communications-cable-technician-salem-tdzphrzv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-visalia-t&d4pew65.md": {
	id: "t&d-communications-cable-technician-visalia-t&d4pew65.md";
  slug: "td-communications-cable-technician-visalia-td4pew65";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-commercial-apprentice-abilene-t&deceyl0.md": {
	id: "t&d-communications-commercial-apprentice-abilene-t&deceyl0.md";
  slug: "td-communications-commercial-apprentice-abilene-tdeceyl0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-commercial-apprentice-cleveland-t&drypoce.md": {
	id: "t&d-communications-commercial-apprentice-cleveland-t&drypoce.md";
  slug: "td-communications-commercial-apprentice-cleveland-tdrypoce";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-commercial-electrician-folsom-t&d64y2pl.md": {
	id: "t&d-communications-commercial-electrician-folsom-t&d64y2pl.md";
  slug: "td-communications-commercial-electrician-folsom-td64y2pl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-commercial-electrician-houston-t&d4izqx5.md": {
	id: "t&d-communications-commercial-electrician-houston-t&d4izqx5.md";
  slug: "td-communications-commercial-electrician-houston-td4izqx5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-data-center-cable-tech-columbus-t&d3xiz6r.md": {
	id: "t&d-communications-data-center-cable-tech-columbus-t&d3xiz6r.md";
  slug: "td-communications-data-center-cable-tech-columbus-td3xiz6r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-data-center-cable-tech-costa-mesa-t&dr60rvb.md": {
	id: "t&d-communications-data-center-cable-tech-costa-mesa-t&dr60rvb.md";
  slug: "td-communications-data-center-cable-tech-costa-mesa-tdr60rvb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-fiber-optic-technician-memphis-t&d5h2ojk.md": {
	id: "t&d-communications-fiber-optic-technician-memphis-t&d5h2ojk.md";
  slug: "td-communications-fiber-optic-technician-memphis-td5h2ojk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-fire-alarm-tech-houston-t&da5s1jn.md": {
	id: "t&d-communications-fire-alarm-tech-houston-t&da5s1jn.md";
  slug: "td-communications-fire-alarm-tech-houston-tda5s1jn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-fire-alarm-tech-st.-louis-t&dm4h7jm.md": {
	id: "t&d-communications-fire-alarm-tech-st.-louis-t&dm4h7jm.md";
  slug: "td-communications-fire-alarm-tech-st-louis-tdm4h7jm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-low-voltage-cable-technician-boulder-t&dl4fl5z.md": {
	id: "t&d-communications-low-voltage-cable-technician-boulder-t&dl4fl5z.md";
  slug: "td-communications-low-voltage-cable-technician-boulder-tdl4fl5z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-rack-stack-installer-wenatchee-t&d8t86gj.md": {
	id: "t&d-communications-rack-stack-installer-wenatchee-t&d8t86gj.md";
  slug: "td-communications-rack-stack-installer-wenatchee-td8t86gj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"t&d-communications-security-technician-mammoth-lakes-t&dv5zs7m.md": {
	id: "t&d-communications-security-technician-mammoth-lakes-t&dv5zs7m.md";
  slug: "td-communications-security-technician-mammoth-lakes-tdv5zs7m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-anaheim-tecbph6pj.md": {
	id: "tec-electric-apprentice-electrician-anaheim-tecbph6pj.md";
  slug: "tec-electric-apprentice-electrician-anaheim-tecbph6pj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-santa-ana-tecqtvfx0.md": {
	id: "tec-electric-apprentice-electrician-santa-ana-tecqtvfx0.md";
  slug: "tec-electric-apprentice-electrician-santa-ana-tecqtvfx0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-santa-rosa-tecyiolq0.md": {
	id: "tec-electric-apprentice-electrician-santa-rosa-tecyiolq0.md";
  slug: "tec-electric-apprentice-electrician-santa-rosa-tecyiolq0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-commercial-project-manager-augusta-tec9fwhjd.md": {
	id: "tec-electric-commercial-project-manager-augusta-tec9fwhjd.md";
  slug: "tec-electric-commercial-project-manager-augusta-tec9fwhjd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-commercial-project-manager-orlando-tec61fz6p.md": {
	id: "tec-electric-commercial-project-manager-orlando-tec61fz6p.md";
  slug: "tec-electric-commercial-project-manager-orlando-tec61fz6p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-custom-home-master-electrician-greensboro-teca8vmb5.md": {
	id: "tec-electric-custom-home-master-electrician-greensboro-teca8vmb5.md";
  slug: "tec-electric-custom-home-master-electrician-greensboro-teca8vmb5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz.md": {
	id: "tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz.md";
  slug: "tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-industrial-controls-electrician-albany-tec3zym42.md": {
	id: "tec-electric-industrial-controls-electrician-albany-tec3zym42.md";
  slug: "tec-electric-industrial-controls-electrician-albany-tec3zym42";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-industrial-controls-electrician-columbus-tecpm9mw0.md": {
	id: "tec-electric-industrial-controls-electrician-columbus-tecpm9mw0.md";
  slug: "tec-electric-industrial-controls-electrician-columbus-tecpm9mw0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-journeyman-electrician-ontario-tecgj71r5.md": {
	id: "tec-electric-journeyman-electrician-ontario-tecgj71r5.md";
  slug: "tec-electric-journeyman-electrician-ontario-tecgj71r5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-atlanta-tecz5hu62.md": {
	id: "tec-electric-junior-project-manager-atlanta-tecz5hu62.md";
  slug: "tec-electric-junior-project-manager-atlanta-tecz5hu62";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-aurora-tec46ce8g.md": {
	id: "tec-electric-junior-project-manager-aurora-tec46ce8g.md";
  slug: "tec-electric-junior-project-manager-aurora-tec46ce8g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-columbus-tecglb3ug.md": {
	id: "tec-electric-junior-project-manager-columbus-tecglb3ug.md";
  slug: "tec-electric-junior-project-manager-columbus-tecglb3ug";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-miami-tecx7l0jn.md": {
	id: "tec-electric-junior-project-manager-miami-tecx7l0jn.md";
  slug: "tec-electric-junior-project-manager-miami-tecx7l0jn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-phoenix-tecu076rk.md": {
	id: "tec-electric-junior-project-manager-phoenix-tecu076rk.md";
  slug: "tec-electric-junior-project-manager-phoenix-tecu076rk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-st.-petersburg-tecly4a0h.md": {
	id: "tec-electric-junior-project-manager-st.-petersburg-tecly4a0h.md";
  slug: "tec-electric-junior-project-manager-st-petersburg-tecly4a0h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-maintenance-controls-electrician-savannah-tec7emt91.md": {
	id: "tec-electric-maintenance-controls-electrician-savannah-tec7emt91.md";
  slug: "tec-electric-maintenance-controls-electrician-savannah-tec7emt91";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t.md": {
	id: "tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t.md";
  slug: "tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-multi-family-master-electrician-montgomery-tec4or1b6.md": {
	id: "tec-electric-multi-family-master-electrician-montgomery-tec4or1b6.md";
  slug: "tec-electric-multi-family-master-electrician-montgomery-tec4or1b6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-project-manager-denver-tec5cpi4n.md": {
	id: "tec-electric-project-manager-denver-tec5cpi4n.md";
  slug: "tec-electric-project-manager-denver-tec5cpi4n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x.md": {
	id: "tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x.md";
  slug: "tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-repair-apprentice-electrician-memphis-teczcccf1.md": {
	id: "tec-electric-repair-apprentice-electrician-memphis-teczcccf1.md";
  slug: "tec-electric-repair-apprentice-electrician-memphis-teczcccf1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-repair-master-electrician-youngstown-tecvvc0nk.md": {
	id: "tec-electric-repair-master-electrician-youngstown-tecvvc0nk.md";
  slug: "tec-electric-repair-master-electrician-youngstown-tecvvc0nk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6.md": {
	id: "tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6.md";
  slug: "tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-service-controls-electrician-dayton-tec3f802j.md": {
	id: "tec-electric-service-controls-electrician-dayton-tec3f802j.md";
  slug: "tec-electric-service-controls-electrician-dayton-tec3f802j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-service-controls-electrician-saginaw-techzmgkk.md": {
	id: "tec-electric-service-controls-electrician-saginaw-techzmgkk.md";
  slug: "tec-electric-service-controls-electrician-saginaw-techzmgkk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tec-electric-solar-apprentice-electrician-jackson-tecglxa6i.md": {
	id: "tec-electric-solar-apprentice-electrician-jackson-tecglxa6i.md";
  slug: "tec-electric-solar-apprentice-electrician-jackson-tecglxa6i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-audio-visual-technician-state-college-tech2dm5c5.md": {
	id: "tech-electronics-audio-visual-technician-state-college-tech2dm5c5.md";
  slug: "tech-electronics-audio-visual-technician-state-college-tech2dm5c5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-av-technician-nashville-tech0akat3.md": {
	id: "tech-electronics-av-technician-nashville-tech0akat3.md";
  slug: "tech-electronics-av-technician-nashville-tech0akat3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-cable-installer-manchester-techudqn9y.md": {
	id: "tech-electronics-cable-installer-manchester-techudqn9y.md";
  slug: "tech-electronics-cable-installer-manchester-techudqn9y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-cable-installer-worcester-tech2mofm2.md": {
	id: "tech-electronics-cable-installer-worcester-tech2mofm2.md";
  slug: "tech-electronics-cable-installer-worcester-tech2mofm2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-cable-technician-atlanta-tech7cf84a.md": {
	id: "tech-electronics-cable-technician-atlanta-tech7cf84a.md";
  slug: "tech-electronics-cable-technician-atlanta-tech7cf84a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-controls-engineer-seattle-techtrcabd.md": {
	id: "tech-electronics-controls-engineer-seattle-techtrcabd.md";
  slug: "tech-electronics-controls-engineer-seattle-techtrcabd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-controls-technician-pittsburgh-tech9ljyem.md": {
	id: "tech-electronics-controls-technician-pittsburgh-tech9ljyem.md";
  slug: "tech-electronics-controls-technician-pittsburgh-tech9ljyem";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-data-center-cable-tech-san-jose-tech16bpdv.md": {
	id: "tech-electronics-data-center-cable-tech-san-jose-tech16bpdv.md";
  slug: "tech-electronics-data-center-cable-tech-san-jose-tech16bpdv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-electrical-apprentice-boulder-techzwrgaq.md": {
	id: "tech-electronics-electrical-apprentice-boulder-techzwrgaq.md";
  slug: "tech-electronics-electrical-apprentice-boulder-techzwrgaq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-installer-hartford-techpnurg9.md": {
	id: "tech-electronics-fire-alarm-installer-hartford-techpnurg9.md";
  slug: "tech-electronics-fire-alarm-installer-hartford-techpnurg9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-installer-lubbock-techucn9xd.md": {
	id: "tech-electronics-fire-alarm-installer-lubbock-techucn9xd.md";
  slug: "tech-electronics-fire-alarm-installer-lubbock-techucn9xd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9.md": {
	id: "tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9.md";
  slug: "tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz.md": {
	id: "tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz.md";
  slug: "tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-technician-los-angeles-techpg6796.md": {
	id: "tech-electronics-fire-alarm-technician-los-angeles-techpg6796.md";
  slug: "tech-electronics-fire-alarm-technician-los-angeles-techpg6796";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-industrial-electrician-kansas-city-techq5m2c7.md": {
	id: "tech-electronics-industrial-electrician-kansas-city-techq5m2c7.md";
  slug: "tech-electronics-industrial-electrician-kansas-city-techq5m2c7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-low-voltage-cable-technician-athens-techddtc24.md": {
	id: "tech-electronics-low-voltage-cable-technician-athens-techddtc24.md";
  slug: "tech-electronics-low-voltage-cable-technician-athens-techddtc24";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1.md": {
	id: "tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1.md";
  slug: "tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-residential-electrician-raleigh-techwruv3x.md": {
	id: "tech-electronics-residential-electrician-raleigh-techwruv3x.md";
  slug: "tech-electronics-residential-electrician-raleigh-techwruv3x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-residential-electrician-tucson-techvmjrut.md": {
	id: "tech-electronics-residential-electrician-tucson-techvmjrut.md";
  slug: "tech-electronics-residential-electrician-tucson-techvmjrut";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-residential-solar-installer-anderson-tech9iwr9q.md": {
	id: "tech-electronics-residential-solar-installer-anderson-tech9iwr9q.md";
  slug: "tech-electronics-residential-solar-installer-anderson-tech9iwr9q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-residential-solar-installer-tampa-techybqfdy.md": {
	id: "tech-electronics-residential-solar-installer-tampa-techybqfdy.md";
  slug: "tech-electronics-residential-solar-installer-tampa-techybqfdy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-security-systems-tech-cleveland-techexgvxu.md": {
	id: "tech-electronics-security-systems-tech-cleveland-techexgvxu.md";
  slug: "tech-electronics-security-systems-tech-cleveland-techexgvxu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-security-systems-tech-milpitas-techdq70ew.md": {
	id: "tech-electronics-security-systems-tech-milpitas-techdq70ew.md";
  slug: "tech-electronics-security-systems-tech-milpitas-techdq70ew";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-security-technician-philadelphia-techfedtr2.md": {
	id: "tech-electronics-security-technician-philadelphia-techfedtr2.md";
  slug: "tech-electronics-security-technician-philadelphia-techfedtr2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tech-electronics-voice-data-installer-winston-salem-techi7m73i.md": {
	id: "tech-electronics-voice-data-installer-winston-salem-techi7m73i.md";
  slug: "tech-electronics-voice-data-installer-winston-salem-techi7m73i";
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
"telco-data-av-tech-gary-av-t-o81i6a.md": {
	id: "telco-data-av-tech-gary-av-t-o81i6a.md";
  slug: "telco-data-av-tech-gary-av-t-o81i6a";
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
"telco-data-security-tech-indianapolis-secu-zz3ge1.md": {
	id: "telco-data-security-tech-indianapolis-secu-zz3ge1.md";
  slug: "telco-data-security-tech-indianapolis-secu-zz3ge1";
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
"teleco-av-systems-tech-culver-city-tele7y7nlb.md": {
	id: "teleco-av-systems-tech-culver-city-tele7y7nlb.md";
  slug: "teleco-av-systems-tech-culver-city-tele7y7nlb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-cable-installer-paradise-tele7fcllz.md": {
	id: "teleco-cable-installer-paradise-tele7fcllz.md";
  slug: "teleco-cable-installer-paradise-tele7fcllz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-cable-technician-aurora-televe7xv3.md": {
	id: "teleco-cable-technician-aurora-televe7xv3.md";
  slug: "teleco-cable-technician-aurora-televe7xv3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-commercial-apprentice-purcellville-tele13muqk.md": {
	id: "teleco-commercial-apprentice-purcellville-tele13muqk.md";
  slug: "teleco-commercial-apprentice-purcellville-tele13muqk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-commercial-electrician-las-cruces-teley72onc.md": {
	id: "teleco-commercial-electrician-las-cruces-teley72onc.md";
  slug: "teleco-commercial-electrician-las-cruces-teley72onc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-data-center-cable-tech-laguna-hills-telerq726k.md": {
	id: "teleco-data-center-cable-tech-laguna-hills-telerq726k.md";
  slug: "teleco-data-center-cable-tech-laguna-hills-telerq726k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-data-center-cable-tech-louisville-tele4paid1.md": {
	id: "teleco-data-center-cable-tech-louisville-tele4paid1.md";
  slug: "teleco-data-center-cable-tech-louisville-tele4paid1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-data-center-cable-tech-sugar-land-teleuysrp2.md": {
	id: "teleco-data-center-cable-tech-sugar-land-teleuysrp2.md";
  slug: "teleco-data-center-cable-tech-sugar-land-teleuysrp2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-fire-alarm-installer-austin-teles1kpzz.md": {
	id: "teleco-fire-alarm-installer-austin-teles1kpzz.md";
  slug: "teleco-fire-alarm-installer-austin-teles1kpzz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-fire-alarm-installer-st.-petersburg-telejnpwnc.md": {
	id: "teleco-fire-alarm-installer-st.-petersburg-telejnpwnc.md";
  slug: "teleco-fire-alarm-installer-st-petersburg-telejnpwnc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-fire-alarm-tech-austin-telerb0gc5.md": {
	id: "teleco-fire-alarm-tech-austin-telerb0gc5.md";
  slug: "teleco-fire-alarm-tech-austin-telerb0gc5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-fire-alarm-tech-la-palma-telea41vih.md": {
	id: "teleco-fire-alarm-tech-la-palma-telea41vih.md";
  slug: "teleco-fire-alarm-tech-la-palma-telea41vih";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-low-voltage-cable-technician-cary-tele4l0mx0.md": {
	id: "teleco-low-voltage-cable-technician-cary-tele4l0mx0.md";
  slug: "teleco-low-voltage-cable-technician-cary-tele4l0mx0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z.md": {
	id: "teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z.md";
  slug: "teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-rack-stack-installer-bellevue-telerxchzk.md": {
	id: "teleco-rack-stack-installer-bellevue-telerxchzk.md";
  slug: "teleco-rack-stack-installer-bellevue-telerxchzk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-security-systems-tech-cincinnati-tele1inm92.md": {
	id: "teleco-security-systems-tech-cincinnati-tele1inm92.md";
  slug: "teleco-security-systems-tech-cincinnati-tele1inm92";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-security-systems-tech-los-alamitos-telem0xzs5.md": {
	id: "teleco-security-systems-tech-los-alamitos-telem0xzs5.md";
  slug: "teleco-security-systems-tech-los-alamitos-telem0xzs5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-security-systems-tech-san-rafael-telerfvucl.md": {
	id: "teleco-security-systems-tech-san-rafael-telerfvucl.md";
  slug: "teleco-security-systems-tech-san-rafael-telerfvucl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"teleco-security-technician-richardson-tele6zltht.md": {
	id: "teleco-security-technician-richardson-tele6zltht.md";
  slug: "teleco-security-technician-richardson-tele6zltht";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-cable-installer-carrollton-texa4qfb3k.md": {
	id: "texas-voice-&-data-cable-installer-carrollton-texa4qfb3k.md";
  slug: "texas-voice--data-cable-installer-carrollton-texa4qfb3k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-data-center-cable-tech-dublin-texa9mhqvd.md": {
	id: "texas-voice-&-data-data-center-cable-tech-dublin-texa9mhqvd.md";
  slug: "texas-voice--data-data-center-cable-tech-dublin-texa9mhqvd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-data-center-technician-cambridge-texacvog7v.md": {
	id: "texas-voice-&-data-data-center-technician-cambridge-texacvog7v.md";
  slug: "texas-voice--data-data-center-technician-cambridge-texacvog7v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-data-center-technician-cincinnati-texak1boeh.md": {
	id: "texas-voice-&-data-data-center-technician-cincinnati-texak1boeh.md";
  slug: "texas-voice--data-data-center-technician-cincinnati-texak1boeh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-fiber-optic-technician-chapel-hill-texahbx96n.md": {
	id: "texas-voice-&-data-fiber-optic-technician-chapel-hill-texahbx96n.md";
  slug: "texas-voice--data-fiber-optic-technician-chapel-hill-texahbx96n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-fiber-optic-technician-charleston-texa055mai.md": {
	id: "texas-voice-&-data-fiber-optic-technician-charleston-texa055mai.md";
  slug: "texas-voice--data-fiber-optic-technician-charleston-texa055mai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"texas-voice-&-data-rack-stack-installer-cary-texa7ad8di.md": {
	id: "texas-voice-&-data-rack-stack-installer-cary-texa7ad8di.md";
  slug: "texas-voice--data-rack-stack-installer-cary-texa7ad8di";
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
"tr-group-audio-visual-technician-boise-trgw8gsuz.md": {
	id: "tr-group-audio-visual-technician-boise-trgw8gsuz.md";
  slug: "tr-group-audio-visual-technician-boise-trgw8gsuz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-audio-visual-technician-nampa-trgbfpwq4.md": {
	id: "tr-group-audio-visual-technician-nampa-trgbfpwq4.md";
  slug: "tr-group-audio-visual-technician-nampa-trgbfpwq4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-cable-installer-milwaukee-trgq0wgv9.md": {
	id: "tr-group-cable-installer-milwaukee-trgq0wgv9.md";
  slug: "tr-group-cable-installer-milwaukee-trgq0wgv9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-cable-technician-charlotte-trgsr0bh2.md": {
	id: "tr-group-cable-technician-charlotte-trgsr0bh2.md";
  slug: "tr-group-cable-technician-charlotte-trgsr0bh2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-commercial-apprentice-philadelphia-trgmklcon.md": {
	id: "tr-group-commercial-apprentice-philadelphia-trgmklcon.md";
  slug: "tr-group-commercial-apprentice-philadelphia-trgmklcon";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-commercial-electrician-nashville-trgz4v93d.md": {
	id: "tr-group-commercial-electrician-nashville-trgz4v93d.md";
  slug: "tr-group-commercial-electrician-nashville-trgz4v93d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-commercial-electrician-west-des-moines-trgujwwx3.md": {
	id: "tr-group-commercial-electrician-west-des-moines-trgujwwx3.md";
  slug: "tr-group-commercial-electrician-west-des-moines-trgujwwx3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-controls-technician-grand-rapids-trgsrnovn.md": {
	id: "tr-group-controls-technician-grand-rapids-trgsrnovn.md";
  slug: "tr-group-controls-technician-grand-rapids-trgsrnovn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-data-center-cable-tech-garland-trgjcd6km.md": {
	id: "tr-group-data-center-cable-tech-garland-trgjcd6km.md";
  slug: "tr-group-data-center-cable-tech-garland-trgjcd6km";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-data-center-technician-augusta-trg42c251.md": {
	id: "tr-group-data-center-technician-augusta-trg42c251.md";
  slug: "tr-group-data-center-technician-augusta-trg42c251";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-data-center-technician-chicago-trgs3ifre.md": {
	id: "tr-group-data-center-technician-chicago-trgs3ifre.md";
  slug: "tr-group-data-center-technician-chicago-trgs3ifre";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-data-center-technician-frisco-trg9nharj.md": {
	id: "tr-group-data-center-technician-frisco-trg9nharj.md";
  slug: "tr-group-data-center-technician-frisco-trg9nharj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fiber-optic-technician-mckinney-trg90se4t.md": {
	id: "tr-group-fiber-optic-technician-mckinney-trg90se4t.md";
  slug: "tr-group-fiber-optic-technician-mckinney-trg90se4t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fiber-optic-technician-winston-salem-trg0cvcmy.md": {
	id: "tr-group-fiber-optic-technician-winston-salem-trg0cvcmy.md";
  slug: "tr-group-fiber-optic-technician-winston-salem-trg0cvcmy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fire-alarm-installer-san-antonio-trgsnf4zd.md": {
	id: "tr-group-fire-alarm-installer-san-antonio-trgsnf4zd.md";
  slug: "tr-group-fire-alarm-installer-san-antonio-trgsnf4zd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fire-alarm-installer-waco-trghgi4mr.md": {
	id: "tr-group-fire-alarm-installer-waco-trghgi4mr.md";
  slug: "tr-group-fire-alarm-installer-waco-trghgi4mr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fire-alarm-technician-chicago-trgnz7359.md": {
	id: "tr-group-fire-alarm-technician-chicago-trgnz7359.md";
  slug: "tr-group-fire-alarm-technician-chicago-trgnz7359";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-fire-alarm-technician-miami-trg41x0dk.md": {
	id: "tr-group-fire-alarm-technician-miami-trg41x0dk.md";
  slug: "tr-group-fire-alarm-technician-miami-trg41x0dk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-industrial-electrician-phoenix-trgitgy25.md": {
	id: "tr-group-industrial-electrician-phoenix-trgitgy25.md";
  slug: "tr-group-industrial-electrician-phoenix-trgitgy25";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-industrial-electrician-san-francisco-trgvff60y.md": {
	id: "tr-group-industrial-electrician-san-francisco-trgvff60y.md";
  slug: "tr-group-industrial-electrician-san-francisco-trgvff60y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-rack-stack-installer-kansas-city-trgex0yx4.md": {
	id: "tr-group-rack-stack-installer-kansas-city-trgex0yx4.md";
  slug: "tr-group-rack-stack-installer-kansas-city-trgex0yx4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-residential-electrician-chicago-trg8mkfch.md": {
	id: "tr-group-residential-electrician-chicago-trg8mkfch.md";
  slug: "tr-group-residential-electrician-chicago-trg8mkfch";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-group-security-technician-omaha-trgwl16wl.md": {
	id: "tr-group-security-technician-omaha-trgwl16wl.md";
  slug: "tr-group-security-technician-omaha-trgwl16wl";
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
"tri-city-electric-cable-technician-greeley-trivg3u36.md": {
	id: "tri-city-electric-cable-technician-greeley-trivg3u36.md";
  slug: "tri-city-electric-cable-technician-greeley-trivg3u36";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-cable-technician-oakboro-trihj7q98.md": {
	id: "tri-city-electric-cable-technician-oakboro-trihj7q98.md";
  slug: "tri-city-electric-cable-technician-oakboro-trihj7q98";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-commercial-electrician-hartford-triivf504.md": {
	id: "tri-city-electric-commercial-electrician-hartford-triivf504.md";
  slug: "tri-city-electric-commercial-electrician-hartford-triivf504";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-data-center-technician-georgetown-trivlryku.md": {
	id: "tri-city-electric-data-center-technician-georgetown-trivlryku.md";
  slug: "tri-city-electric-data-center-technician-georgetown-trivlryku";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-data-center-technician-providence-triywkmjb.md": {
	id: "tri-city-electric-data-center-technician-providence-triywkmjb.md";
  slug: "tri-city-electric-data-center-technician-providence-triywkmjb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-electrician-morganton-tribm4sre.md": {
	id: "tri-city-electric-electrician-morganton-tribm4sre.md";
  slug: "tri-city-electric-electrician-morganton-tribm4sre";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-electrician-richmond-trizmn7ad.md": {
	id: "tri-city-electric-electrician-richmond-trizmn7ad.md";
  slug: "tri-city-electric-electrician-richmond-trizmn7ad";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tri-city-electric-security-technician-tampa-tri3aaqz0.md": {
	id: "tri-city-electric-security-technician-tampa-tri3aaqz0.md";
  slug: "tri-city-electric-security-technician-tampa-tri3aaqz0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tully-electric-security-technician-new-york-tull75ftxe.md": {
	id: "tully-electric-security-technician-new-york-tull75ftxe.md";
  slug: "tully-electric-security-technician-new-york-tull75ftxe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-designer-mesa-vallatma87.md": {
	id: "valley-alarm-fire-alarm-designer-mesa-vallatma87.md";
  slug: "valley-alarm-fire-alarm-designer-mesa-vallatma87";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah.md": {
	id: "valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah.md";
  slug: "valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc.md": {
	id: "valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc.md";
  slug: "valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"valley-alarm-junior-project-manager-peoria-vallzpet0y.md": {
	id: "valley-alarm-junior-project-manager-peoria-vallzpet0y.md";
  slug: "valley-alarm-junior-project-manager-peoria-vallzpet0y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3.md": {
	id: "valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3.md";
  slug: "valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-av-systems-tech-detroit-visi6bj5zg.md": {
	id: "vision-technologies-av-systems-tech-detroit-visi6bj5zg.md";
  slug: "vision-technologies-av-systems-tech-detroit-visi6bj5zg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-av-systems-tech-lake-forest-visiq8s9xz.md": {
	id: "vision-technologies-av-systems-tech-lake-forest-visiq8s9xz.md";
  slug: "vision-technologies-av-systems-tech-lake-forest-visiq8s9xz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm.md": {
	id: "vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm.md";
  slug: "vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-cable-technician-pasadena-visiepelxy.md": {
	id: "vision-technologies-cable-technician-pasadena-visiepelxy.md";
  slug: "vision-technologies-cable-technician-pasadena-visiepelxy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-cable-technician-virginia-beach-visiq9o906.md": {
	id: "vision-technologies-cable-technician-virginia-beach-visiq9o906.md";
  slug: "vision-technologies-cable-technician-virginia-beach-visiq9o906";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-commercial-apprentice-colorado-springs-visihofdkv.md": {
	id: "vision-technologies-commercial-apprentice-colorado-springs-visihofdkv.md";
  slug: "vision-technologies-commercial-apprentice-colorado-springs-visihofdkv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl.md": {
	id: "vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl.md";
  slug: "vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-fire-alarm-installer-pueblo-visipo37dg.md": {
	id: "vision-technologies-fire-alarm-installer-pueblo-visipo37dg.md";
  slug: "vision-technologies-fire-alarm-installer-pueblo-visipo37dg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-industrial-electrician-dallas-visiia1ivn.md": {
	id: "vision-technologies-industrial-electrician-dallas-visiia1ivn.md";
  slug: "vision-technologies-industrial-electrician-dallas-visiia1ivn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy.md": {
	id: "vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy.md";
  slug: "vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe.md": {
	id: "vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe.md";
  slug: "vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-residential-solar-installer-murfreesboro-visiospl4n.md": {
	id: "vision-technologies-residential-solar-installer-murfreesboro-visiospl4n.md";
  slug: "vision-technologies-residential-solar-installer-murfreesboro-visiospl4n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-san-antonio-visi6np52m.md": {
	id: "vision-technologies-security-systems-tech-san-antonio-visi6np52m.md";
  slug: "vision-technologies-security-systems-tech-san-antonio-visi6np52m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-san-carlos-visiyx1eht.md": {
	id: "vision-technologies-security-systems-tech-san-carlos-visiyx1eht.md";
  slug: "vision-technologies-security-systems-tech-san-carlos-visiyx1eht";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-westlake-village-visimqjzgl.md": {
	id: "vision-technologies-security-systems-tech-westlake-village-visimqjzgl.md";
  slug: "vision-technologies-security-systems-tech-westlake-village-visimqjzgl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-security-technician-san-diego-visi7autt0.md": {
	id: "vision-technologies-security-technician-san-diego-visi7autt0.md";
  slug: "vision-technologies-security-technician-san-diego-visi7autt0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-senior-controls-technician-los-angeles-visilv146s.md": {
	id: "vision-technologies-senior-controls-technician-los-angeles-visilv146s.md";
  slug: "vision-technologies-senior-controls-technician-los-angeles-visilv146s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-service-electrician-augusta-visiwtejir.md": {
	id: "vision-technologies-service-electrician-augusta-visiwtejir.md";
  slug: "vision-technologies-service-electrician-augusta-visiwtejir";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"vision-technologies-voice-data-installer-topeka-visiymc1gb.md": {
	id: "vision-technologies-voice-data-installer-topeka-visiymc1gb.md";
  slug: "vision-technologies-voice-data-installer-topeka-visiymc1gb";
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
"west-coast-fire-fire-alarm-designer-glendale-westcap11k.md": {
	id: "west-coast-fire-fire-alarm-designer-glendale-westcap11k.md";
  slug: "west-coast-fire-fire-alarm-designer-glendale-westcap11k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-henderson-westfsnipc.md": {
	id: "west-coast-fire-fire-alarm-designer-henderson-westfsnipc.md";
  slug: "west-coast-fire-fire-alarm-designer-henderson-westfsnipc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-riverside-westacszhm.md": {
	id: "west-coast-fire-fire-alarm-designer-riverside-westacszhm.md";
  slug: "west-coast-fire-fire-alarm-designer-riverside-westacszhm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-san-diego-westkuraqt.md": {
	id: "west-coast-fire-fire-alarm-designer-san-diego-westkuraqt.md";
  slug: "west-coast-fire-fire-alarm-designer-san-diego-westkuraqt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-security-alarm-project-manager-gresham-westbnv218.md": {
	id: "west-coast-fire-security-alarm-project-manager-gresham-westbnv218.md";
  slug: "west-coast-fire-security-alarm-project-manager-gresham-westbnv218";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0.md": {
	id: "west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0.md";
  slug: "west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"west-coast-fire-security-project-manager-fresno-west52bfm6.md": {
	id: "west-coast-fire-security-project-manager-fresno-west52bfm6.md";
  slug: "west-coast-fire-security-project-manager-fresno-west52bfm6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-tech-bakersfield-wili7nmajx.md": {
	id: "wiline-cable-tech-bakersfield-wili7nmajx.md";
  slug: "wiline-cable-tech-bakersfield-wili7nmajx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-tech-sacramento-wiligzix5z.md": {
	id: "wiline-cable-tech-sacramento-wiligzix5z.md";
  slug: "wiline-cable-tech-sacramento-wiligzix5z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-tech-san-jose-wiliqlta1h.md": {
	id: "wiline-cable-tech-san-jose-wiliqlta1h.md";
  slug: "wiline-cable-tech-san-jose-wiliqlta1h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-tech-victorville-wilih0aowo.md": {
	id: "wiline-cable-tech-victorville-wilih0aowo.md";
  slug: "wiline-cable-tech-victorville-wilih0aowo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-technician-arlington-wiliiamcwp.md": {
	id: "wiline-cable-technician-arlington-wiliiamcwp.md";
  slug: "wiline-cable-technician-arlington-wiliiamcwp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-technician-fresno-wili3vjktr.md": {
	id: "wiline-cable-technician-fresno-wili3vjktr.md";
  slug: "wiline-cable-technician-fresno-wili3vjktr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-cable-technician-longmont-wililfzvw9.md": {
	id: "wiline-cable-technician-longmont-wililfzvw9.md";
  slug: "wiline-cable-technician-longmont-wililfzvw9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-commercial-electrician-charlotte-wilip2pejd.md": {
	id: "wiline-commercial-electrician-charlotte-wilip2pejd.md";
  slug: "wiline-commercial-electrician-charlotte-wilip2pejd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-cable-tech-ankeny-wili4c9m1m.md": {
	id: "wiline-data-center-cable-tech-ankeny-wili4c9m1m.md";
  slug: "wiline-data-center-cable-tech-ankeny-wili4c9m1m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-cable-tech-fort-worth-wiliqbgw0w.md": {
	id: "wiline-data-center-cable-tech-fort-worth-wiliqbgw0w.md";
  slug: "wiline-data-center-cable-tech-fort-worth-wiliqbgw0w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-technician-gilbert-wilialexlc.md": {
	id: "wiline-data-center-technician-gilbert-wilialexlc.md";
  slug: "wiline-data-center-technician-gilbert-wilialexlc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-technician-littleton-wilit5g4xo.md": {
	id: "wiline-data-center-technician-littleton-wilit5g4xo.md";
  slug: "wiline-data-center-technician-littleton-wilit5g4xo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-technician-new-haven-wili9jvvpq.md": {
	id: "wiline-data-center-technician-new-haven-wili9jvvpq.md";
  slug: "wiline-data-center-technician-new-haven-wili9jvvpq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-data-center-technician-springfield-wilij5wh81.md": {
	id: "wiline-data-center-technician-springfield-wilij5wh81.md";
  slug: "wiline-data-center-technician-springfield-wilij5wh81";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-fiber-optic-technician-dallas-wili4qbxfp.md": {
	id: "wiline-fiber-optic-technician-dallas-wili4qbxfp.md";
  slug: "wiline-fiber-optic-technician-dallas-wili4qbxfp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-fire-alarm-installer-bellevue-wiliqxb70p.md": {
	id: "wiline-fire-alarm-installer-bellevue-wiliqxb70p.md";
  slug: "wiline-fire-alarm-installer-bellevue-wiliqxb70p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62.md": {
	id: "wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62.md";
  slug: "wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-rack-stack-installer-jersey-city-wilin2h5if.md": {
	id: "wiline-rack-stack-installer-jersey-city-wilin2h5if.md";
  slug: "wiline-rack-stack-installer-jersey-city-wilin2h5if";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-rack-stack-installer-lubbock-wililtpa1k.md": {
	id: "wiline-rack-stack-installer-lubbock-wililtpa1k.md";
  slug: "wiline-rack-stack-installer-lubbock-wililtpa1k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-residential-solar-installer-spokane-wili75qu98.md": {
	id: "wiline-residential-solar-installer-spokane-wili75qu98.md";
  slug: "wiline-residential-solar-installer-spokane-wili75qu98";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-systems-tech-union-city-wili8ah37a.md": {
	id: "wiline-security-systems-tech-union-city-wili8ah37a.md";
  slug: "wiline-security-systems-tech-union-city-wili8ah37a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-technician-columbus-wiliqx53pm.md": {
	id: "wiline-security-technician-columbus-wiliqx53pm.md";
  slug: "wiline-security-technician-columbus-wiliqx53pm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-technician-fayetteville-wilimxw5hy.md": {
	id: "wiline-security-technician-fayetteville-wilimxw5hy.md";
  slug: "wiline-security-technician-fayetteville-wilimxw5hy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-technician-long-beach-wiliopkjk9.md": {
	id: "wiline-security-technician-long-beach-wiliopkjk9.md";
  slug: "wiline-security-technician-long-beach-wiliopkjk9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-av-systems-tech-foster-city-wiser4m45r.md": {
	id: "wisetel-av-systems-tech-foster-city-wiser4m45r.md";
  slug: "wisetel-av-systems-tech-foster-city-wiser4m45r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-av-systems-tech-portland-wise5z9cps.md": {
	id: "wisetel-av-systems-tech-portland-wise5z9cps.md";
  slug: "wisetel-av-systems-tech-portland-wise5z9cps";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-fountain-wisedzslx9.md": {
	id: "wisetel-cable-technician-fountain-wisedzslx9.md";
  slug: "wisetel-cable-technician-fountain-wisedzslx9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-greeley-wisehl7kbv.md": {
	id: "wisetel-cable-technician-greeley-wisehl7kbv.md";
  slug: "wisetel-cable-technician-greeley-wisehl7kbv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-jackson-wisedmgl86.md": {
	id: "wisetel-cable-technician-jackson-wisedmgl86.md";
  slug: "wisetel-cable-technician-jackson-wisedmgl86";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-roanoke-wisebfclzw.md": {
	id: "wisetel-cable-technician-roanoke-wisebfclzw.md";
  slug: "wisetel-cable-technician-roanoke-wisebfclzw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-sandy-springs-wisek0ooo5.md": {
	id: "wisetel-cable-technician-sandy-springs-wisek0ooo5.md";
  slug: "wisetel-cable-technician-sandy-springs-wisek0ooo5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-cable-technician-smyrna-wiserfh0ax.md": {
	id: "wisetel-cable-technician-smyrna-wiserfh0ax.md";
  slug: "wisetel-cable-technician-smyrna-wiserfh0ax";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-el-paso-wise83bbu0.md": {
	id: "wisetel-fire-alarm-tech-el-paso-wise83bbu0.md";
  slug: "wisetel-fire-alarm-tech-el-paso-wise83bbu0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a.md": {
	id: "wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a.md";
  slug: "wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-san-diego-wise9i3zwk.md": {
	id: "wisetel-fire-alarm-tech-san-diego-wise9i3zwk.md";
  slug: "wisetel-fire-alarm-tech-san-diego-wise9i3zwk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-santa-clara-wisebll3gq.md": {
	id: "wisetel-fire-alarm-tech-santa-clara-wisebll3gq.md";
  slug: "wisetel-fire-alarm-tech-santa-clara-wisebll3gq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-tustin-wise1cj2fb.md": {
	id: "wisetel-fire-alarm-tech-tustin-wise1cj2fb.md";
  slug: "wisetel-fire-alarm-tech-tustin-wise1cj2fb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-low-voltage-cable-technician-durham-wisea44vf9.md": {
	id: "wisetel-low-voltage-cable-technician-durham-wisea44vf9.md";
  slug: "wisetel-low-voltage-cable-technician-durham-wisea44vf9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wisetel-security-systems-tech-aliso-viejo-wisevzc6sy.md": {
	id: "wisetel-security-systems-tech-aliso-viejo-wisevzc6sy.md";
  slug: "wisetel-security-systems-tech-aliso-viejo-wisevzc6sy";
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
"audio-visual-technicians-california.md": {
	id: "audio-visual-technicians-california.md";
  slug: "audio-visual-technicians-california";
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
"cable-technician-interview-questions-and-answers.md": {
	id: "cable-technician-interview-questions-and-answers.md";
  slug: "cable-technician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"commercial-electrician-interview-questions-and-answers.md": {
	id: "commercial-electrician-interview-questions-and-answers.md";
  slug: "commercial-electrician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"controls-technicians-california.md": {
	id: "controls-technicians-california.md";
  slug: "controls-technicians-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"data-center-technician-interview-questions-and-answers.md": {
	id: "data-center-technician-interview-questions-and-answers.md";
  slug: "data-center-technician-interview-questions-and-answers";
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
"fire-alarm-technician-interview-questions-and-answers.md": {
	id: "fire-alarm-technician-interview-questions-and-answers.md";
  slug: "fire-alarm-technician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fire-alarm-technicians-california.md": {
	id: "fire-alarm-technicians-california.md";
  slug: "fire-alarm-technicians-california";
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
"industrial-electrician-careers-california.md": {
	id: "industrial-electrician-careers-california.md";
  slug: "industrial-electrician-careers-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"industrial-electrician-interview-questions-and-answers.md": {
	id: "industrial-electrician-interview-questions-and-answers.md";
  slug: "industrial-electrician-interview-questions-and-answers";
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
"los-angeles-audio-visual-technician-staffing.md": {
	id: "los-angeles-audio-visual-technician-staffing.md";
  slug: "los-angeles-audio-visual-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-commercial-electrician-staffing.md": {
	id: "los-angeles-commercial-electrician-staffing.md";
  slug: "los-angeles-commercial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-controls-technician-staffing.md": {
	id: "los-angeles-controls-technician-staffing.md";
  slug: "los-angeles-controls-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-fire-alarm-technician-staffing.md": {
	id: "los-angeles-fire-alarm-technician-staffing.md";
  slug: "los-angeles-fire-alarm-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-industrial-electrician-staffing.md": {
	id: "los-angeles-industrial-electrician-staffing.md";
  slug: "los-angeles-industrial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-residential-electrician-staffing.md": {
	id: "los-angeles-residential-electrician-staffing.md";
  slug: "los-angeles-residential-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-security-technician-staffing.md": {
	id: "los-angeles-security-technician-staffing.md";
  slug: "los-angeles-security-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-solar-installer-staffing.md": {
	id: "los-angeles-solar-installer-staffing.md";
  slug: "los-angeles-solar-installer-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"los-angeles-voice-data-technician-staffing.md": {
	id: "los-angeles-voice-data-technician-staffing.md";
  slug: "los-angeles-voice-data-technician-staffing";
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
"recruiting-voice-data-technicians-california.md": {
	id: "recruiting-voice-data-technicians-california.md";
  slug: "recruiting-voice-data-technicians-california";
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
"residential-electrician-interview-questions-and-answers.md": {
	id: "residential-electrician-interview-questions-and-answers.md";
  slug: "residential-electrician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"residential-electrician-staffing-california.md": {
	id: "residential-electrician-staffing-california.md";
  slug: "residential-electrician-staffing-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"security-technician-interview-questions-and-answers.md": {
	id: "security-technician-interview-questions-and-answers.md";
  slug: "security-technician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"solar-installer-jobs-california.md": {
	id: "solar-installer-jobs-california.md";
  slug: "solar-installer-jobs-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"staffing-commercial-electricians-california.md": {
	id: "staffing-commercial-electricians-california.md";
  slug: "staffing-commercial-electricians-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"staffing-security-technicians-california.md": {
	id: "staffing-security-technicians-california.md";
  slug: "staffing-security-technicians-california";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-audio-visual-technician-staffing.md": {
	id: "texas-audio-visual-technician-staffing.md";
  slug: "texas-audio-visual-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-commercial-electrician-staffing.md": {
	id: "texas-commercial-electrician-staffing.md";
  slug: "texas-commercial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-controls-technician-staffing.md": {
	id: "texas-controls-technician-staffing.md";
  slug: "texas-controls-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-fire-alarm-technician-staffing.md": {
	id: "texas-fire-alarm-technician-staffing.md";
  slug: "texas-fire-alarm-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-industrial-electrician-staffing.md": {
	id: "texas-industrial-electrician-staffing.md";
  slug: "texas-industrial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-residential-electrician-staffing.md": {
	id: "texas-residential-electrician-staffing.md";
  slug: "texas-residential-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-security-technician-staffing.md": {
	id: "texas-security-technician-staffing.md";
  slug: "texas-security-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-solar-installer-staffing.md": {
	id: "texas-solar-installer-staffing.md";
  slug: "texas-solar-installer-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"texas-voice-data-technician-staffing.md": {
	id: "texas-voice-data-technician-staffing.md";
  slug: "texas-voice-data-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};
"recruiting": {
"alabama/birmingham/audio-visual-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/audio-visual-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/audio-visual-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/cable-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/cable-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/cable-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/controls-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/controls-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/controls-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/data-center-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/data-center-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/data-center-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/electrician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/electrician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/electrician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/fire-alarm-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/fire-alarm-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/fire-alarm-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/index.md": {
	id: "alabama/birmingham/index.md";
  slug: "alabama/birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/security-technician-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/security-technician-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/security-technician-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/birmingham/solar-installer-recruiting-agency-in-birmingham.md": {
	id: "alabama/birmingham/solar-installer-recruiting-agency-in-birmingham.md";
  slug: "alabama/birmingham/solar-installer-recruiting-agency-in-birmingham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/audio-visual-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/audio-visual-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/audio-visual-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/cable-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/cable-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/cable-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/controls-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/controls-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/controls-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/data-center-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/data-center-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/data-center-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/electrician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/electrician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/electrician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/fire-alarm-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/fire-alarm-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/fire-alarm-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/index.md": {
	id: "alabama/huntsville/index.md";
  slug: "alabama/huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/security-technician-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/security-technician-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/security-technician-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/huntsville/solar-installer-recruiting-agency-in-huntsville.md": {
	id: "alabama/huntsville/solar-installer-recruiting-agency-in-huntsville.md";
  slug: "alabama/huntsville/solar-installer-recruiting-agency-in-huntsville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"alabama/index.md": {
	id: "alabama/index.md";
  slug: "alabama";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/index.md": {
	id: "arizona/index.md";
  slug: "arizona";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/audio-visual-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/audio-visual-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/audio-visual-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/cable-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/cable-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/cable-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/controls-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/controls-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/controls-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/data-center-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/data-center-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/data-center-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/electrician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/electrician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/electrician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/fire-alarm-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/fire-alarm-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/fire-alarm-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/index.md": {
	id: "arizona/phoenix/index.md";
  slug: "arizona/phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/security-technician-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/security-technician-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/security-technician-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/phoenix/solar-installer-recruiting-agency-in-phoenix.md": {
	id: "arizona/phoenix/solar-installer-recruiting-agency-in-phoenix.md";
  slug: "arizona/phoenix/solar-installer-recruiting-agency-in-phoenix";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/audio-visual-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/audio-visual-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/audio-visual-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/cable-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/cable-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/cable-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/controls-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/controls-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/controls-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/data-center-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/data-center-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/data-center-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/electrician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/electrician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/electrician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/fire-alarm-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/fire-alarm-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/fire-alarm-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/index.md": {
	id: "arizona/tucson/index.md";
  slug: "arizona/tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/security-technician-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/security-technician-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/security-technician-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"arizona/tucson/solar-installer-recruiting-agency-in-tucson.md": {
	id: "arizona/tucson/solar-installer-recruiting-agency-in-tucson.md";
  slug: "arizona/tucson/solar-installer-recruiting-agency-in-tucson";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/audio-visual-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/audio-visual-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/audio-visual-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/cable-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/cable-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/cable-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/controls-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/controls-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/controls-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/data-center-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/data-center-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/data-center-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/electrician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/electrician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/electrician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/fire-alarm-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/fire-alarm-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/fire-alarm-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/index.md": {
	id: "california/bakersfield/index.md";
  slug: "california/bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/security-technician-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/security-technician-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/security-technician-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/bakersfield/solar-installer-recruiting-agency-in-bakersfield.md": {
	id: "california/bakersfield/solar-installer-recruiting-agency-in-bakersfield.md";
  slug: "california/bakersfield/solar-installer-recruiting-agency-in-bakersfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/audio-visual-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/audio-visual-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/audio-visual-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/cable-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/cable-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/cable-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/controls-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/controls-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/controls-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/data-center-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/data-center-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/data-center-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/electrician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/electrician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/electrician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/fire-alarm-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/fire-alarm-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/fire-alarm-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/index.md": {
	id: "california/fresno/index.md";
  slug: "california/fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/security-technician-recruiting-agency-in-fresno.md": {
	id: "california/fresno/security-technician-recruiting-agency-in-fresno.md";
  slug: "california/fresno/security-technician-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/fresno/solar-installer-recruiting-agency-in-fresno.md": {
	id: "california/fresno/solar-installer-recruiting-agency-in-fresno.md";
  slug: "california/fresno/solar-installer-recruiting-agency-in-fresno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/index.md": {
	id: "california/index.md";
  slug: "california";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/audio-visual-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/audio-visual-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/audio-visual-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/cable-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/cable-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/cable-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/controls-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/controls-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/controls-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/data-center-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/data-center-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/data-center-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/electrician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/electrician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/electrician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/fire-alarm-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/fire-alarm-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/fire-alarm-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/index.md": {
	id: "california/irvine/index.md";
  slug: "california/irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/security-technician-recruiting-agency-in-irvine.md": {
	id: "california/irvine/security-technician-recruiting-agency-in-irvine.md";
  slug: "california/irvine/security-technician-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/irvine/solar-installer-recruiting-agency-in-irvine.md": {
	id: "california/irvine/solar-installer-recruiting-agency-in-irvine.md";
  slug: "california/irvine/solar-installer-recruiting-agency-in-irvine";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/audio-visual-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/audio-visual-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/audio-visual-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/cable-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/cable-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/cable-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/controls-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/controls-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/controls-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/data-center-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/data-center-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/data-center-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/electrician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/electrician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/electrician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/fire-alarm-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/fire-alarm-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/fire-alarm-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/index.md": {
	id: "california/los-angeles/index.md";
  slug: "california/los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/security-technician-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/security-technician-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/security-technician-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/los-angeles/solar-installer-recruiting-agency-in-los-angeles.md": {
	id: "california/los-angeles/solar-installer-recruiting-agency-in-los-angeles.md";
  slug: "california/los-angeles/solar-installer-recruiting-agency-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/audio-visual-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/audio-visual-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/audio-visual-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/cable-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/cable-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/cable-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/controls-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/controls-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/controls-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/data-center-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/data-center-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/data-center-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/electrician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/electrician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/electrician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/fire-alarm-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/fire-alarm-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/fire-alarm-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/index.md": {
	id: "california/modesto/index.md";
  slug: "california/modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/security-technician-recruiting-agency-in-modesto.md": {
	id: "california/modesto/security-technician-recruiting-agency-in-modesto.md";
  slug: "california/modesto/security-technician-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/modesto/solar-installer-recruiting-agency-in-modesto.md": {
	id: "california/modesto/solar-installer-recruiting-agency-in-modesto.md";
  slug: "california/modesto/solar-installer-recruiting-agency-in-modesto";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/audio-visual-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/audio-visual-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/audio-visual-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/cable-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/cable-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/cable-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/controls-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/controls-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/controls-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/data-center-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/data-center-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/data-center-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/electrician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/electrician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/electrician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/fire-alarm-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/fire-alarm-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/fire-alarm-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/index.md": {
	id: "california/oxnard/index.md";
  slug: "california/oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/security-technician-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/security-technician-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/security-technician-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/oxnard/solar-installer-recruiting-agency-in-oxnard.md": {
	id: "california/oxnard/solar-installer-recruiting-agency-in-oxnard.md";
  slug: "california/oxnard/solar-installer-recruiting-agency-in-oxnard";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/audio-visual-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/audio-visual-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/audio-visual-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/cable-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/cable-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/cable-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/controls-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/controls-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/controls-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/data-center-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/data-center-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/data-center-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/electrician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/electrician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/electrician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/fire-alarm-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/fire-alarm-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/fire-alarm-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/index.md": {
	id: "california/sacramento/index.md";
  slug: "california/sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/security-technician-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/security-technician-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/security-technician-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/sacramento/solar-installer-recruiting-agency-in-sacramento.md": {
	id: "california/sacramento/solar-installer-recruiting-agency-in-sacramento.md";
  slug: "california/sacramento/solar-installer-recruiting-agency-in-sacramento";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/audio-visual-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/audio-visual-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/audio-visual-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/cable-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/cable-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/cable-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/controls-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/controls-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/controls-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/data-center-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/data-center-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/data-center-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/electrician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/electrician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/electrician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/fire-alarm-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/fire-alarm-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/fire-alarm-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/index.md": {
	id: "california/san-bernardino/index.md";
  slug: "california/san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/security-technician-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/security-technician-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/security-technician-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-bernardino/solar-installer-recruiting-agency-in-san-bernardino.md": {
	id: "california/san-bernardino/solar-installer-recruiting-agency-in-san-bernardino.md";
  slug: "california/san-bernardino/solar-installer-recruiting-agency-in-san-bernardino";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/audio-visual-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/audio-visual-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/audio-visual-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/cable-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/cable-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/cable-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/controls-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/controls-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/controls-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/data-center-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/data-center-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/data-center-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/electrician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/electrician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/electrician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/fire-alarm-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/fire-alarm-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/fire-alarm-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/index.md": {
	id: "california/san-diego/index.md";
  slug: "california/san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/security-technician-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/security-technician-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/security-technician-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-diego/solar-installer-recruiting-agency-in-san-diego.md": {
	id: "california/san-diego/solar-installer-recruiting-agency-in-san-diego.md";
  slug: "california/san-diego/solar-installer-recruiting-agency-in-san-diego";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/audio-visual-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/audio-visual-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/audio-visual-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/cable-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/cable-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/cable-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/controls-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/controls-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/controls-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/data-center-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/data-center-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/data-center-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/electrician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/electrician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/electrician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/fire-alarm-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/fire-alarm-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/fire-alarm-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/index.md": {
	id: "california/san-francisco/index.md";
  slug: "california/san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/security-technician-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/security-technician-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/security-technician-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-francisco/solar-installer-recruiting-agency-in-san-francisco.md": {
	id: "california/san-francisco/solar-installer-recruiting-agency-in-san-francisco.md";
  slug: "california/san-francisco/solar-installer-recruiting-agency-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/audio-visual-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/audio-visual-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/audio-visual-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/cable-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/cable-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/cable-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/controls-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/controls-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/controls-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/data-center-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/data-center-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/data-center-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/electrician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/electrician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/electrician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/fire-alarm-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/fire-alarm-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/fire-alarm-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/index.md": {
	id: "california/san-jose/index.md";
  slug: "california/san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/security-technician-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/security-technician-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/security-technician-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/san-jose/solar-installer-recruiting-agency-in-san-jose.md": {
	id: "california/san-jose/solar-installer-recruiting-agency-in-san-jose.md";
  slug: "california/san-jose/solar-installer-recruiting-agency-in-san-jose";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/audio-visual-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/audio-visual-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/audio-visual-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/cable-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/cable-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/cable-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/controls-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/controls-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/controls-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/data-center-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/data-center-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/data-center-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/electrician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/electrician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/electrician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/fire-alarm-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/fire-alarm-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/fire-alarm-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/index.md": {
	id: "california/stockton/index.md";
  slug: "california/stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/security-technician-recruiting-agency-in-stockton.md": {
	id: "california/stockton/security-technician-recruiting-agency-in-stockton.md";
  slug: "california/stockton/security-technician-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"california/stockton/solar-installer-recruiting-agency-in-stockton.md": {
	id: "california/stockton/solar-installer-recruiting-agency-in-stockton.md";
  slug: "california/stockton/solar-installer-recruiting-agency-in-stockton";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/audio-visual-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/audio-visual-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/audio-visual-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/cable-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/cable-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/cable-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/controls-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/controls-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/controls-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/data-center-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/data-center-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/data-center-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/electrician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/electrician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/electrician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/fire-alarm-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/fire-alarm-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/fire-alarm-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/index.md": {
	id: "colorado/colorado-springs/index.md";
  slug: "colorado/colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/security-technician-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/security-technician-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/security-technician-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/colorado-springs/solar-installer-recruiting-agency-in-colorado-springs.md": {
	id: "colorado/colorado-springs/solar-installer-recruiting-agency-in-colorado-springs.md";
  slug: "colorado/colorado-springs/solar-installer-recruiting-agency-in-colorado-springs";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/audio-visual-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/audio-visual-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/audio-visual-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/cable-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/cable-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/cable-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/controls-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/controls-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/controls-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/data-center-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/data-center-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/data-center-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/electrician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/electrician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/electrician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/fire-alarm-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/fire-alarm-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/fire-alarm-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/index.md": {
	id: "colorado/denver/index.md";
  slug: "colorado/denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/security-technician-recruiting-agency-in-denver.md": {
	id: "colorado/denver/security-technician-recruiting-agency-in-denver.md";
  slug: "colorado/denver/security-technician-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/denver/solar-installer-recruiting-agency-in-denver.md": {
	id: "colorado/denver/solar-installer-recruiting-agency-in-denver.md";
  slug: "colorado/denver/solar-installer-recruiting-agency-in-denver";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"colorado/index.md": {
	id: "colorado/index.md";
  slug: "colorado";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/audio-visual-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/audio-visual-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/audio-visual-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/cable-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/cable-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/cable-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/controls-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/controls-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/controls-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/data-center-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/data-center-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/data-center-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/electrician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/electrician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/electrician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/fire-alarm-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/fire-alarm-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/fire-alarm-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/index.md": {
	id: "florida/cape-coral/index.md";
  slug: "florida/cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/security-technician-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/security-technician-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/security-technician-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/cape-coral/solar-installer-recruiting-agency-in-cape-coral.md": {
	id: "florida/cape-coral/solar-installer-recruiting-agency-in-cape-coral.md";
  slug: "florida/cape-coral/solar-installer-recruiting-agency-in-cape-coral";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/index.md": {
	id: "florida/index.md";
  slug: "florida";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/audio-visual-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/audio-visual-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/audio-visual-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/cable-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/cable-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/cable-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/controls-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/controls-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/controls-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/data-center-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/data-center-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/data-center-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/electrician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/electrician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/electrician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/fire-alarm-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/fire-alarm-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/fire-alarm-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/index.md": {
	id: "florida/jacksonville/index.md";
  slug: "florida/jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/security-technician-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/security-technician-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/security-technician-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/jacksonville/solar-installer-recruiting-agency-in-jacksonville.md": {
	id: "florida/jacksonville/solar-installer-recruiting-agency-in-jacksonville.md";
  slug: "florida/jacksonville/solar-installer-recruiting-agency-in-jacksonville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/audio-visual-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/audio-visual-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/audio-visual-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/cable-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/cable-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/cable-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/controls-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/controls-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/controls-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/data-center-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/data-center-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/data-center-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/electrician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/electrician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/electrician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/fire-alarm-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/fire-alarm-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/fire-alarm-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/index.md": {
	id: "florida/lakeland/index.md";
  slug: "florida/lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/security-technician-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/security-technician-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/security-technician-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/lakeland/solar-installer-recruiting-agency-in-lakeland.md": {
	id: "florida/lakeland/solar-installer-recruiting-agency-in-lakeland.md";
  slug: "florida/lakeland/solar-installer-recruiting-agency-in-lakeland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/audio-visual-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/audio-visual-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/audio-visual-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/cable-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/cable-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/cable-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/controls-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/controls-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/controls-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/data-center-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/data-center-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/data-center-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/electrician-recruiting-agency-in-miami.md": {
	id: "florida/miami/electrician-recruiting-agency-in-miami.md";
  slug: "florida/miami/electrician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/fire-alarm-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/fire-alarm-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/fire-alarm-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/index.md": {
	id: "florida/miami/index.md";
  slug: "florida/miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/security-technician-recruiting-agency-in-miami.md": {
	id: "florida/miami/security-technician-recruiting-agency-in-miami.md";
  slug: "florida/miami/security-technician-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/miami/solar-installer-recruiting-agency-in-miami.md": {
	id: "florida/miami/solar-installer-recruiting-agency-in-miami.md";
  slug: "florida/miami/solar-installer-recruiting-agency-in-miami";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/audio-visual-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/audio-visual-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/audio-visual-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/cable-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/cable-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/cable-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/controls-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/controls-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/controls-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/data-center-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/data-center-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/data-center-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/electrician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/electrician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/electrician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/fire-alarm-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/fire-alarm-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/fire-alarm-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/index.md": {
	id: "florida/orlando/index.md";
  slug: "florida/orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/security-technician-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/security-technician-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/security-technician-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/orlando/solar-installer-recruiting-agency-in-orlando.md": {
	id: "florida/orlando/solar-installer-recruiting-agency-in-orlando.md";
  slug: "florida/orlando/solar-installer-recruiting-agency-in-orlando";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/audio-visual-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/audio-visual-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/audio-visual-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/cable-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/cable-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/cable-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/controls-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/controls-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/controls-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/data-center-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/data-center-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/data-center-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/electrician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/electrician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/electrician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/fire-alarm-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/fire-alarm-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/fire-alarm-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/index.md": {
	id: "florida/sarasota/index.md";
  slug: "florida/sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/security-technician-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/security-technician-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/security-technician-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/sarasota/solar-installer-recruiting-agency-in-sarasota.md": {
	id: "florida/sarasota/solar-installer-recruiting-agency-in-sarasota.md";
  slug: "florida/sarasota/solar-installer-recruiting-agency-in-sarasota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/audio-visual-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/audio-visual-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/audio-visual-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/cable-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/cable-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/cable-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/controls-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/controls-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/controls-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/data-center-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/data-center-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/data-center-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/electrician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/electrician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/electrician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/fire-alarm-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/fire-alarm-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/fire-alarm-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/index.md": {
	id: "florida/tampa/index.md";
  slug: "florida/tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/security-technician-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/security-technician-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/security-technician-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"florida/tampa/solar-installer-recruiting-agency-in-tampa.md": {
	id: "florida/tampa/solar-installer-recruiting-agency-in-tampa.md";
  slug: "florida/tampa/solar-installer-recruiting-agency-in-tampa";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/audio-visual-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/audio-visual-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/audio-visual-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/cable-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/cable-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/cable-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/controls-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/controls-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/controls-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/data-center-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/data-center-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/data-center-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/electrician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/electrician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/electrician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/fire-alarm-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/fire-alarm-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/fire-alarm-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/index.md": {
	id: "georgia/atlanta/index.md";
  slug: "georgia/atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/security-technician-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/security-technician-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/security-technician-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/atlanta/solar-installer-recruiting-agency-in-atlanta.md": {
	id: "georgia/atlanta/solar-installer-recruiting-agency-in-atlanta.md";
  slug: "georgia/atlanta/solar-installer-recruiting-agency-in-atlanta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/audio-visual-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/audio-visual-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/audio-visual-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/cable-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/cable-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/cable-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/controls-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/controls-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/controls-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/data-center-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/data-center-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/data-center-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/electrician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/electrician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/electrician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/fire-alarm-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/fire-alarm-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/fire-alarm-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/index.md": {
	id: "georgia/augusta/index.md";
  slug: "georgia/augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/security-technician-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/security-technician-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/security-technician-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/augusta/solar-installer-recruiting-agency-in-augusta.md": {
	id: "georgia/augusta/solar-installer-recruiting-agency-in-augusta.md";
  slug: "georgia/augusta/solar-installer-recruiting-agency-in-augusta";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/index.md": {
	id: "georgia/index.md";
  slug: "georgia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/audio-visual-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/audio-visual-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/audio-visual-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/cable-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/cable-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/cable-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/controls-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/controls-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/controls-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/data-center-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/data-center-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/data-center-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/electrician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/electrician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/electrician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/fire-alarm-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/fire-alarm-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/fire-alarm-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/index.md": {
	id: "georgia/savannah/index.md";
  slug: "georgia/savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/security-technician-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/security-technician-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/security-technician-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"georgia/savannah/solar-installer-recruiting-agency-in-savannah.md": {
	id: "georgia/savannah/solar-installer-recruiting-agency-in-savannah.md";
  slug: "georgia/savannah/solar-installer-recruiting-agency-in-savannah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/audio-visual-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/audio-visual-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/audio-visual-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/cable-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/cable-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/cable-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/controls-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/controls-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/controls-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/data-center-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/data-center-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/data-center-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/electrician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/electrician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/electrician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/fire-alarm-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/fire-alarm-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/fire-alarm-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/index.md": {
	id: "hawaii/honolulu/index.md";
  slug: "hawaii/honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/security-technician-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/security-technician-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/security-technician-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/honolulu/solar-installer-recruiting-agency-in-honolulu.md": {
	id: "hawaii/honolulu/solar-installer-recruiting-agency-in-honolulu.md";
  slug: "hawaii/honolulu/solar-installer-recruiting-agency-in-honolulu";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"hawaii/index.md": {
	id: "hawaii/index.md";
  slug: "hawaii";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/audio-visual-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/audio-visual-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/audio-visual-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/cable-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/cable-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/cable-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/controls-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/controls-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/controls-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/data-center-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/data-center-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/data-center-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/electrician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/electrician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/electrician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/fire-alarm-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/fire-alarm-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/fire-alarm-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/index.md": {
	id: "idaho/boise/index.md";
  slug: "idaho/boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/security-technician-recruiting-agency-in-boise.md": {
	id: "idaho/boise/security-technician-recruiting-agency-in-boise.md";
  slug: "idaho/boise/security-technician-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/boise/solar-installer-recruiting-agency-in-boise.md": {
	id: "idaho/boise/solar-installer-recruiting-agency-in-boise.md";
  slug: "idaho/boise/solar-installer-recruiting-agency-in-boise";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"idaho/index.md": {
	id: "idaho/index.md";
  slug: "idaho";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/audio-visual-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/audio-visual-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/audio-visual-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/cable-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/cable-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/cable-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/controls-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/controls-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/controls-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/data-center-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/data-center-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/data-center-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/electrician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/electrician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/electrician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/fire-alarm-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/fire-alarm-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/fire-alarm-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/index.md": {
	id: "illinois/chicago/index.md";
  slug: "illinois/chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/security-technician-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/security-technician-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/security-technician-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/chicago/solar-installer-recruiting-agency-in-chicago.md": {
	id: "illinois/chicago/solar-installer-recruiting-agency-in-chicago.md";
  slug: "illinois/chicago/solar-installer-recruiting-agency-in-chicago";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/index.md": {
	id: "illinois/index.md";
  slug: "illinois";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/audio-visual-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/audio-visual-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/audio-visual-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/cable-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/cable-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/cable-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/controls-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/controls-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/controls-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/data-center-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/data-center-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/data-center-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/electrician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/electrician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/electrician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/fire-alarm-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/fire-alarm-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/fire-alarm-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/index.md": {
	id: "illinois/rockford/index.md";
  slug: "illinois/rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/security-technician-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/security-technician-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/security-technician-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"illinois/rockford/solar-installer-recruiting-agency-in-rockford.md": {
	id: "illinois/rockford/solar-installer-recruiting-agency-in-rockford.md";
  slug: "illinois/rockford/solar-installer-recruiting-agency-in-rockford";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/audio-visual-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/audio-visual-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/audio-visual-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/cable-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/cable-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/cable-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/controls-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/controls-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/controls-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/data-center-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/data-center-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/data-center-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/electrician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/electrician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/electrician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/fire-alarm-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/fire-alarm-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/fire-alarm-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/index.md": {
	id: "indiana/fort-wayne/index.md";
  slug: "indiana/fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/security-technician-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/security-technician-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/security-technician-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/fort-wayne/solar-installer-recruiting-agency-in-fort-wayne.md": {
	id: "indiana/fort-wayne/solar-installer-recruiting-agency-in-fort-wayne.md";
  slug: "indiana/fort-wayne/solar-installer-recruiting-agency-in-fort-wayne";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/index.md": {
	id: "indiana/index.md";
  slug: "indiana";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/audio-visual-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/audio-visual-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/audio-visual-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/cable-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/cable-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/cable-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/controls-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/controls-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/controls-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/data-center-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/data-center-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/data-center-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/electrician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/electrician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/electrician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/fire-alarm-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/fire-alarm-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/fire-alarm-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/index.md": {
	id: "indiana/indianapolis/index.md";
  slug: "indiana/indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/security-technician-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/security-technician-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/security-technician-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"indiana/indianapolis/solar-installer-recruiting-agency-in-indianapolis.md": {
	id: "indiana/indianapolis/solar-installer-recruiting-agency-in-indianapolis.md";
  slug: "indiana/indianapolis/solar-installer-recruiting-agency-in-indianapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/index.md": {
	id: "kentucky/index.md";
  slug: "kentucky";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/audio-visual-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/audio-visual-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/audio-visual-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/cable-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/cable-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/cable-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/controls-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/controls-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/controls-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/data-center-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/data-center-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/data-center-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/electrician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/electrician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/electrician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/fire-alarm-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/fire-alarm-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/fire-alarm-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/index.md": {
	id: "kentucky/lexington/index.md";
  slug: "kentucky/lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/security-technician-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/security-technician-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/security-technician-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/lexington/solar-installer-recruiting-agency-in-lexington.md": {
	id: "kentucky/lexington/solar-installer-recruiting-agency-in-lexington.md";
  slug: "kentucky/lexington/solar-installer-recruiting-agency-in-lexington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/audio-visual-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/audio-visual-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/audio-visual-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/cable-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/cable-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/cable-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/controls-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/controls-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/controls-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/data-center-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/data-center-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/data-center-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/electrician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/electrician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/electrician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/fire-alarm-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/fire-alarm-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/fire-alarm-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/index.md": {
	id: "kentucky/louisville/index.md";
  slug: "kentucky/louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/security-technician-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/security-technician-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/security-technician-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"kentucky/louisville/solar-installer-recruiting-agency-in-louisville.md": {
	id: "kentucky/louisville/solar-installer-recruiting-agency-in-louisville.md";
  slug: "kentucky/louisville/solar-installer-recruiting-agency-in-louisville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/audio-visual-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/audio-visual-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/audio-visual-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/cable-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/cable-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/cable-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/controls-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/controls-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/controls-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/data-center-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/data-center-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/data-center-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/electrician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/electrician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/electrician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/fire-alarm-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/fire-alarm-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/fire-alarm-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/index.md": {
	id: "massachusetts/boston/index.md";
  slug: "massachusetts/boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/security-technician-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/security-technician-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/security-technician-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/boston/solar-installer-recruiting-agency-in-boston.md": {
	id: "massachusetts/boston/solar-installer-recruiting-agency-in-boston.md";
  slug: "massachusetts/boston/solar-installer-recruiting-agency-in-boston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/index.md": {
	id: "massachusetts/index.md";
  slug: "massachusetts";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/audio-visual-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/audio-visual-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/audio-visual-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/cable-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/cable-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/cable-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/controls-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/controls-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/controls-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/data-center-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/data-center-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/data-center-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/electrician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/electrician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/electrician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/fire-alarm-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/fire-alarm-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/fire-alarm-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/index.md": {
	id: "massachusetts/springfield/index.md";
  slug: "massachusetts/springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/security-technician-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/security-technician-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/security-technician-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/springfield/solar-installer-recruiting-agency-in-springfield.md": {
	id: "massachusetts/springfield/solar-installer-recruiting-agency-in-springfield.md";
  slug: "massachusetts/springfield/solar-installer-recruiting-agency-in-springfield";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/audio-visual-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/audio-visual-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/audio-visual-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/cable-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/cable-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/cable-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/controls-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/controls-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/controls-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/data-center-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/data-center-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/data-center-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/electrician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/electrician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/electrician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/fire-alarm-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/fire-alarm-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/fire-alarm-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/index.md": {
	id: "massachusetts/worcester/index.md";
  slug: "massachusetts/worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/security-technician-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/security-technician-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/security-technician-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"massachusetts/worcester/solar-installer-recruiting-agency-in-worcester.md": {
	id: "massachusetts/worcester/solar-installer-recruiting-agency-in-worcester.md";
  slug: "massachusetts/worcester/solar-installer-recruiting-agency-in-worcester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/audio-visual-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/audio-visual-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/audio-visual-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/cable-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/cable-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/cable-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/controls-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/controls-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/controls-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/data-center-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/data-center-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/data-center-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/electrician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/electrician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/electrician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/fire-alarm-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/fire-alarm-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/fire-alarm-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/index.md": {
	id: "michigan/detroit/index.md";
  slug: "michigan/detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/security-technician-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/security-technician-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/security-technician-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/detroit/solar-installer-recruiting-agency-in-detroit.md": {
	id: "michigan/detroit/solar-installer-recruiting-agency-in-detroit.md";
  slug: "michigan/detroit/solar-installer-recruiting-agency-in-detroit";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"michigan/index.md": {
	id: "michigan/index.md";
  slug: "michigan";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/index.md": {
	id: "minnesota/index.md";
  slug: "minnesota";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/audio-visual-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/audio-visual-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/audio-visual-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/cable-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/cable-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/cable-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/controls-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/controls-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/controls-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/data-center-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/data-center-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/data-center-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/electrician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/electrician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/electrician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/fire-alarm-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/fire-alarm-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/fire-alarm-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/index.md": {
	id: "minnesota/minneapolis/index.md";
  slug: "minnesota/minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/security-technician-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/security-technician-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/security-technician-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/minneapolis/solar-installer-recruiting-agency-in-minneapolis.md": {
	id: "minnesota/minneapolis/solar-installer-recruiting-agency-in-minneapolis.md";
  slug: "minnesota/minneapolis/solar-installer-recruiting-agency-in-minneapolis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/audio-visual-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/audio-visual-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/audio-visual-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/cable-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/cable-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/cable-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/controls-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/controls-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/controls-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/data-center-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/data-center-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/data-center-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/electrician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/electrician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/electrician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/fire-alarm-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/fire-alarm-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/fire-alarm-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/index.md": {
	id: "minnesota/saint-paul/index.md";
  slug: "minnesota/saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/security-technician-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/security-technician-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/security-technician-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"minnesota/saint-paul/solar-installer-recruiting-agency-in-saint-paul.md": {
	id: "minnesota/saint-paul/solar-installer-recruiting-agency-in-saint-paul.md";
  slug: "minnesota/saint-paul/solar-installer-recruiting-agency-in-saint-paul";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/index.md": {
	id: "missouri/index.md";
  slug: "missouri";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/audio-visual-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/audio-visual-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/audio-visual-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/cable-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/cable-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/cable-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/controls-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/controls-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/controls-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/data-center-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/data-center-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/data-center-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/electrician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/electrician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/electrician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/fire-alarm-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/fire-alarm-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/fire-alarm-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/index.md": {
	id: "missouri/kansas-city/index.md";
  slug: "missouri/kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/security-technician-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/security-technician-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/security-technician-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/kansas-city/solar-installer-recruiting-agency-in-kansas-city.md": {
	id: "missouri/kansas-city/solar-installer-recruiting-agency-in-kansas-city.md";
  slug: "missouri/kansas-city/solar-installer-recruiting-agency-in-kansas-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/audio-visual-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/audio-visual-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/audio-visual-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/cable-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/cable-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/cable-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/controls-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/controls-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/controls-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/data-center-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/data-center-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/data-center-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/electrician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/electrician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/electrician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/fire-alarm-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/fire-alarm-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/fire-alarm-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/index.md": {
	id: "missouri/st.-louis/index.md";
  slug: "missouri/st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/security-technician-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/security-technician-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/security-technician-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"missouri/st.-louis/solar-installer-recruiting-agency-in-st.-louis.md": {
	id: "missouri/st.-louis/solar-installer-recruiting-agency-in-st.-louis.md";
  slug: "missouri/st-louis/solar-installer-recruiting-agency-in-st-louis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/index.md": {
	id: "nevada/index.md";
  slug: "nevada";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/audio-visual-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/audio-visual-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/audio-visual-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/cable-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/cable-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/cable-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/controls-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/controls-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/controls-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/data-center-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/data-center-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/data-center-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/electrician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/electrician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/electrician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/fire-alarm-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/fire-alarm-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/fire-alarm-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/index.md": {
	id: "nevada/las-vegas/index.md";
  slug: "nevada/las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/security-technician-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/security-technician-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/security-technician-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/las-vegas/solar-installer-recruiting-agency-in-las-vegas.md": {
	id: "nevada/las-vegas/solar-installer-recruiting-agency-in-las-vegas.md";
  slug: "nevada/las-vegas/solar-installer-recruiting-agency-in-las-vegas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/audio-visual-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/audio-visual-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/audio-visual-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/cable-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/cable-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/cable-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/controls-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/controls-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/controls-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/data-center-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/data-center-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/data-center-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/electrician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/electrician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/electrician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/fire-alarm-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/fire-alarm-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/fire-alarm-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/index.md": {
	id: "nevada/reno/index.md";
  slug: "nevada/reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/security-technician-recruiting-agency-in-reno.md": {
	id: "nevada/reno/security-technician-recruiting-agency-in-reno.md";
  slug: "nevada/reno/security-technician-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"nevada/reno/solar-installer-recruiting-agency-in-reno.md": {
	id: "nevada/reno/solar-installer-recruiting-agency-in-reno.md";
  slug: "nevada/reno/solar-installer-recruiting-agency-in-reno";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/index.md": {
	id: "new-jersey/index.md";
  slug: "new-jersey";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/audio-visual-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/audio-visual-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/audio-visual-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/cable-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/cable-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/cable-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/controls-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/controls-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/controls-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/data-center-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/data-center-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/data-center-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/electrician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/electrician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/electrician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/fire-alarm-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/fire-alarm-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/fire-alarm-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/index.md": {
	id: "new-jersey/jersey-city/index.md";
  slug: "new-jersey/jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/security-technician-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/security-technician-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/security-technician-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/jersey-city/solar-installer-recruiting-agency-in-jersey-city.md": {
	id: "new-jersey/jersey-city/solar-installer-recruiting-agency-in-jersey-city.md";
  slug: "new-jersey/jersey-city/solar-installer-recruiting-agency-in-jersey-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/audio-visual-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/audio-visual-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/audio-visual-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/cable-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/cable-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/cable-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/controls-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/controls-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/controls-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/data-center-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/data-center-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/data-center-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/electrician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/electrician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/electrician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/fire-alarm-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/fire-alarm-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/fire-alarm-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/index.md": {
	id: "new-jersey/newark/index.md";
  slug: "new-jersey/newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/security-technician-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/security-technician-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/security-technician-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-jersey/newark/solar-installer-recruiting-agency-in-newark.md": {
	id: "new-jersey/newark/solar-installer-recruiting-agency-in-newark.md";
  slug: "new-jersey/newark/solar-installer-recruiting-agency-in-newark";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/audio-visual-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/audio-visual-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/audio-visual-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/cable-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/cable-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/cable-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/controls-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/controls-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/controls-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/data-center-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/data-center-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/data-center-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/electrician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/electrician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/electrician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/fire-alarm-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/fire-alarm-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/fire-alarm-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/index.md": {
	id: "new-york/albany/index.md";
  slug: "new-york/albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/security-technician-recruiting-agency-in-albany.md": {
	id: "new-york/albany/security-technician-recruiting-agency-in-albany.md";
  slug: "new-york/albany/security-technician-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/albany/solar-installer-recruiting-agency-in-albany.md": {
	id: "new-york/albany/solar-installer-recruiting-agency-in-albany.md";
  slug: "new-york/albany/solar-installer-recruiting-agency-in-albany";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/audio-visual-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/audio-visual-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/audio-visual-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/cable-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/cable-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/cable-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/controls-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/controls-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/controls-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/data-center-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/data-center-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/data-center-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/electrician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/electrician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/electrician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/fire-alarm-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/fire-alarm-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/fire-alarm-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/index.md": {
	id: "new-york/buffalo/index.md";
  slug: "new-york/buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/security-technician-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/security-technician-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/security-technician-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/buffalo/solar-installer-recruiting-agency-in-buffalo.md": {
	id: "new-york/buffalo/solar-installer-recruiting-agency-in-buffalo.md";
  slug: "new-york/buffalo/solar-installer-recruiting-agency-in-buffalo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/index.md": {
	id: "new-york/index.md";
  slug: "new-york";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/audio-visual-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/audio-visual-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/audio-visual-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/cable-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/cable-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/cable-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/controls-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/controls-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/controls-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/data-center-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/data-center-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/data-center-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/electrician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/electrician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/electrician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/fire-alarm-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/fire-alarm-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/fire-alarm-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/index.md": {
	id: "new-york/new-york-city/index.md";
  slug: "new-york/new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/security-technician-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/security-technician-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/security-technician-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/new-york-city/solar-installer-recruiting-agency-in-new-york-city.md": {
	id: "new-york/new-york-city/solar-installer-recruiting-agency-in-new-york-city.md";
  slug: "new-york/new-york-city/solar-installer-recruiting-agency-in-new-york-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/audio-visual-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/audio-visual-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/audio-visual-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/cable-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/cable-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/cable-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/controls-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/controls-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/controls-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/data-center-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/data-center-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/data-center-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/electrician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/electrician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/electrician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/fire-alarm-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/fire-alarm-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/fire-alarm-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/index.md": {
	id: "new-york/rochester/index.md";
  slug: "new-york/rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/security-technician-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/security-technician-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/security-technician-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/rochester/solar-installer-recruiting-agency-in-rochester.md": {
	id: "new-york/rochester/solar-installer-recruiting-agency-in-rochester.md";
  slug: "new-york/rochester/solar-installer-recruiting-agency-in-rochester";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/audio-visual-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/audio-visual-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/audio-visual-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/cable-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/cable-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/cable-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/controls-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/controls-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/controls-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/data-center-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/data-center-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/data-center-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/electrician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/electrician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/electrician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/fire-alarm-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/fire-alarm-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/fire-alarm-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/index.md": {
	id: "new-york/syracuse/index.md";
  slug: "new-york/syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/security-technician-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/security-technician-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/security-technician-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"new-york/syracuse/solar-installer-recruiting-agency-in-syracuse.md": {
	id: "new-york/syracuse/solar-installer-recruiting-agency-in-syracuse.md";
  slug: "new-york/syracuse/solar-installer-recruiting-agency-in-syracuse";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/audio-visual-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/audio-visual-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/audio-visual-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/cable-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/cable-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/cable-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/controls-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/controls-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/controls-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/data-center-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/data-center-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/data-center-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/electrician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/electrician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/electrician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/fire-alarm-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/fire-alarm-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/fire-alarm-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/index.md": {
	id: "north-carolina/charlotte/index.md";
  slug: "north-carolina/charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/security-technician-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/security-technician-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/security-technician-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/charlotte/solar-installer-recruiting-agency-in-charlotte.md": {
	id: "north-carolina/charlotte/solar-installer-recruiting-agency-in-charlotte.md";
  slug: "north-carolina/charlotte/solar-installer-recruiting-agency-in-charlotte";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/audio-visual-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/audio-visual-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/audio-visual-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/cable-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/cable-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/cable-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/controls-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/controls-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/controls-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/data-center-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/data-center-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/data-center-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/electrician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/electrician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/electrician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/fire-alarm-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/fire-alarm-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/fire-alarm-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/index.md": {
	id: "north-carolina/durham/index.md";
  slug: "north-carolina/durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/security-technician-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/security-technician-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/security-technician-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/durham/solar-installer-recruiting-agency-in-durham.md": {
	id: "north-carolina/durham/solar-installer-recruiting-agency-in-durham.md";
  slug: "north-carolina/durham/solar-installer-recruiting-agency-in-durham";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/audio-visual-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/audio-visual-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/audio-visual-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/cable-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/cable-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/cable-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/controls-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/controls-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/controls-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/data-center-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/data-center-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/data-center-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/electrician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/electrician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/electrician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/fire-alarm-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/fire-alarm-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/fire-alarm-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/index.md": {
	id: "north-carolina/greensboro/index.md";
  slug: "north-carolina/greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/security-technician-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/security-technician-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/security-technician-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/greensboro/solar-installer-recruiting-agency-in-greensboro.md": {
	id: "north-carolina/greensboro/solar-installer-recruiting-agency-in-greensboro.md";
  slug: "north-carolina/greensboro/solar-installer-recruiting-agency-in-greensboro";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/index.md": {
	id: "north-carolina/index.md";
  slug: "north-carolina";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/audio-visual-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/audio-visual-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/audio-visual-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/cable-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/cable-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/cable-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/controls-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/controls-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/controls-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/data-center-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/data-center-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/data-center-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/electrician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/electrician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/electrician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/fire-alarm-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/fire-alarm-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/fire-alarm-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/index.md": {
	id: "north-carolina/raleigh/index.md";
  slug: "north-carolina/raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/security-technician-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/security-technician-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/security-technician-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/raleigh/solar-installer-recruiting-agency-in-raleigh.md": {
	id: "north-carolina/raleigh/solar-installer-recruiting-agency-in-raleigh.md";
  slug: "north-carolina/raleigh/solar-installer-recruiting-agency-in-raleigh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/audio-visual-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/audio-visual-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/audio-visual-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/cable-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/cable-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/cable-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/controls-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/controls-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/controls-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/data-center-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/data-center-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/data-center-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/electrician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/electrician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/electrician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/fire-alarm-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/fire-alarm-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/fire-alarm-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/index.md": {
	id: "north-carolina/winston-salem/index.md";
  slug: "north-carolina/winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/security-technician-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/security-technician-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/security-technician-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"north-carolina/winston-salem/solar-installer-recruiting-agency-in-winston-salem.md": {
	id: "north-carolina/winston-salem/solar-installer-recruiting-agency-in-winston-salem.md";
  slug: "north-carolina/winston-salem/solar-installer-recruiting-agency-in-winston-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/audio-visual-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/audio-visual-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/audio-visual-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/cable-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/cable-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/cable-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/controls-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/controls-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/controls-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/data-center-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/data-center-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/data-center-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/electrician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/electrician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/electrician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/fire-alarm-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/fire-alarm-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/fire-alarm-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/index.md": {
	id: "ohio/cincinnati/index.md";
  slug: "ohio/cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/security-technician-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/security-technician-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/security-technician-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/cincinnati/solar-installer-recruiting-agency-in-cincinnati.md": {
	id: "ohio/cincinnati/solar-installer-recruiting-agency-in-cincinnati.md";
  slug: "ohio/cincinnati/solar-installer-recruiting-agency-in-cincinnati";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/audio-visual-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/audio-visual-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/audio-visual-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/cable-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/cable-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/cable-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/controls-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/controls-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/controls-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/data-center-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/data-center-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/data-center-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/electrician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/electrician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/electrician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/fire-alarm-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/fire-alarm-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/fire-alarm-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/index.md": {
	id: "ohio/columbus/index.md";
  slug: "ohio/columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/security-technician-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/security-technician-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/security-technician-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/columbus/solar-installer-recruiting-agency-in-columbus.md": {
	id: "ohio/columbus/solar-installer-recruiting-agency-in-columbus.md";
  slug: "ohio/columbus/solar-installer-recruiting-agency-in-columbus";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"ohio/index.md": {
	id: "ohio/index.md";
  slug: "ohio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/index.md": {
	id: "oregon/index.md";
  slug: "oregon";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/audio-visual-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/audio-visual-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/audio-visual-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/cable-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/cable-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/cable-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/controls-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/controls-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/controls-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/data-center-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/data-center-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/data-center-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/electrician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/electrician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/electrician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/fire-alarm-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/fire-alarm-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/fire-alarm-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/index.md": {
	id: "oregon/portland/index.md";
  slug: "oregon/portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/security-technician-recruiting-agency-in-portland.md": {
	id: "oregon/portland/security-technician-recruiting-agency-in-portland.md";
  slug: "oregon/portland/security-technician-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/portland/solar-installer-recruiting-agency-in-portland.md": {
	id: "oregon/portland/solar-installer-recruiting-agency-in-portland.md";
  slug: "oregon/portland/solar-installer-recruiting-agency-in-portland";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/audio-visual-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/audio-visual-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/audio-visual-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/cable-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/cable-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/cable-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/controls-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/controls-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/controls-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/data-center-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/data-center-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/data-center-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/electrician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/electrician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/electrician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/fire-alarm-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/fire-alarm-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/fire-alarm-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/index.md": {
	id: "oregon/salem/index.md";
  slug: "oregon/salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/security-technician-recruiting-agency-in-salem.md": {
	id: "oregon/salem/security-technician-recruiting-agency-in-salem.md";
  slug: "oregon/salem/security-technician-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"oregon/salem/solar-installer-recruiting-agency-in-salem.md": {
	id: "oregon/salem/solar-installer-recruiting-agency-in-salem.md";
  slug: "oregon/salem/solar-installer-recruiting-agency-in-salem";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/index.md": {
	id: "pennsylvania/index.md";
  slug: "pennsylvania";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/audio-visual-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/audio-visual-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/audio-visual-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/cable-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/cable-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/cable-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/controls-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/controls-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/controls-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/data-center-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/data-center-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/data-center-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/electrician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/electrician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/electrician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/fire-alarm-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/fire-alarm-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/fire-alarm-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/index.md": {
	id: "pennsylvania/philadelphia/index.md";
  slug: "pennsylvania/philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/security-technician-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/security-technician-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/security-technician-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/philadelphia/solar-installer-recruiting-agency-in-philadelphia.md": {
	id: "pennsylvania/philadelphia/solar-installer-recruiting-agency-in-philadelphia.md";
  slug: "pennsylvania/philadelphia/solar-installer-recruiting-agency-in-philadelphia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/audio-visual-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/audio-visual-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/audio-visual-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/cable-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/cable-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/cable-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/controls-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/controls-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/controls-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/data-center-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/data-center-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/data-center-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/electrician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/electrician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/electrician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/fire-alarm-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/fire-alarm-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/fire-alarm-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/index.md": {
	id: "pennsylvania/pittsburgh/index.md";
  slug: "pennsylvania/pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/security-technician-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/security-technician-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/security-technician-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"pennsylvania/pittsburgh/solar-installer-recruiting-agency-in-pittsburgh.md": {
	id: "pennsylvania/pittsburgh/solar-installer-recruiting-agency-in-pittsburgh.md";
  slug: "pennsylvania/pittsburgh/solar-installer-recruiting-agency-in-pittsburgh";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/audio-visual-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/audio-visual-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/audio-visual-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/cable-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/cable-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/cable-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/controls-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/controls-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/controls-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/data-center-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/data-center-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/data-center-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/electrician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/electrician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/electrician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/fire-alarm-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/fire-alarm-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/fire-alarm-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/index.md": {
	id: "south-carolina/charleston/index.md";
  slug: "south-carolina/charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/security-technician-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/security-technician-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/security-technician-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/charleston/solar-installer-recruiting-agency-in-charleston.md": {
	id: "south-carolina/charleston/solar-installer-recruiting-agency-in-charleston.md";
  slug: "south-carolina/charleston/solar-installer-recruiting-agency-in-charleston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/audio-visual-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/audio-visual-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/audio-visual-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/cable-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/cable-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/cable-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/controls-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/controls-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/controls-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/data-center-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/data-center-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/data-center-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/electrician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/electrician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/electrician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/fire-alarm-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/fire-alarm-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/fire-alarm-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/index.md": {
	id: "south-carolina/columbia/index.md";
  slug: "south-carolina/columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/security-technician-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/security-technician-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/security-technician-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/columbia/solar-installer-recruiting-agency-in-columbia.md": {
	id: "south-carolina/columbia/solar-installer-recruiting-agency-in-columbia.md";
  slug: "south-carolina/columbia/solar-installer-recruiting-agency-in-columbia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"south-carolina/index.md": {
	id: "south-carolina/index.md";
  slug: "south-carolina";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/index.md": {
	id: "tennessee/index.md";
  slug: "tennessee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/audio-visual-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/audio-visual-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/audio-visual-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/cable-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/cable-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/cable-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/controls-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/controls-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/controls-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/data-center-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/data-center-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/data-center-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/electrician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/electrician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/electrician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/fire-alarm-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/fire-alarm-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/fire-alarm-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/index.md": {
	id: "tennessee/memphis/index.md";
  slug: "tennessee/memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/security-technician-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/security-technician-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/security-technician-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/memphis/solar-installer-recruiting-agency-in-memphis.md": {
	id: "tennessee/memphis/solar-installer-recruiting-agency-in-memphis.md";
  slug: "tennessee/memphis/solar-installer-recruiting-agency-in-memphis";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/audio-visual-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/audio-visual-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/audio-visual-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/cable-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/cable-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/cable-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/controls-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/controls-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/controls-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/data-center-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/data-center-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/data-center-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/electrician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/electrician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/electrician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/fire-alarm-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/fire-alarm-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/fire-alarm-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/index.md": {
	id: "tennessee/nashville/index.md";
  slug: "tennessee/nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/security-technician-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/security-technician-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/security-technician-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"tennessee/nashville/solar-installer-recruiting-agency-in-nashville.md": {
	id: "tennessee/nashville/solar-installer-recruiting-agency-in-nashville.md";
  slug: "tennessee/nashville/solar-installer-recruiting-agency-in-nashville";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/audio-visual-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/audio-visual-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/audio-visual-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/cable-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/cable-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/cable-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/controls-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/controls-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/controls-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/data-center-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/data-center-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/data-center-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/electrician-recruiting-agency-in-austin.md": {
	id: "texas/austin/electrician-recruiting-agency-in-austin.md";
  slug: "texas/austin/electrician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/fire-alarm-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/fire-alarm-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/fire-alarm-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/index.md": {
	id: "texas/austin/index.md";
  slug: "texas/austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/security-technician-recruiting-agency-in-austin.md": {
	id: "texas/austin/security-technician-recruiting-agency-in-austin.md";
  slug: "texas/austin/security-technician-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/austin/solar-installer-recruiting-agency-in-austin.md": {
	id: "texas/austin/solar-installer-recruiting-agency-in-austin.md";
  slug: "texas/austin/solar-installer-recruiting-agency-in-austin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/audio-visual-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/audio-visual-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/audio-visual-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/cable-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/cable-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/cable-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/controls-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/controls-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/controls-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/data-center-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/data-center-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/data-center-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/electrician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/electrician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/electrician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/fire-alarm-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/fire-alarm-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/fire-alarm-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/index.md": {
	id: "texas/dallas-fort-worth/index.md";
  slug: "texas/dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/security-technician-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/security-technician-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/security-technician-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/dallas-fort-worth/solar-installer-recruiting-agency-in-dallas-fort-worth.md": {
	id: "texas/dallas-fort-worth/solar-installer-recruiting-agency-in-dallas-fort-worth.md";
  slug: "texas/dallas-fort-worth/solar-installer-recruiting-agency-in-dallas-fort-worth";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/audio-visual-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/audio-visual-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/audio-visual-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/cable-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/cable-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/cable-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/controls-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/controls-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/controls-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/data-center-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/data-center-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/data-center-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/electrician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/electrician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/electrician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/fire-alarm-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/fire-alarm-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/fire-alarm-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/index.md": {
	id: "texas/el-paso/index.md";
  slug: "texas/el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/security-technician-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/security-technician-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/security-technician-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/el-paso/solar-installer-recruiting-agency-in-el-paso.md": {
	id: "texas/el-paso/solar-installer-recruiting-agency-in-el-paso.md";
  slug: "texas/el-paso/solar-installer-recruiting-agency-in-el-paso";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/audio-visual-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/audio-visual-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/audio-visual-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/cable-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/cable-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/cable-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/controls-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/controls-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/controls-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/data-center-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/data-center-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/data-center-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/electrician-recruiting-agency-in-houston.md": {
	id: "texas/houston/electrician-recruiting-agency-in-houston.md";
  slug: "texas/houston/electrician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/fire-alarm-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/fire-alarm-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/fire-alarm-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/index.md": {
	id: "texas/houston/index.md";
  slug: "texas/houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/security-technician-recruiting-agency-in-houston.md": {
	id: "texas/houston/security-technician-recruiting-agency-in-houston.md";
  slug: "texas/houston/security-technician-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/houston/solar-installer-recruiting-agency-in-houston.md": {
	id: "texas/houston/solar-installer-recruiting-agency-in-houston.md";
  slug: "texas/houston/solar-installer-recruiting-agency-in-houston";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/index.md": {
	id: "texas/index.md";
  slug: "texas";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/audio-visual-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/audio-visual-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/audio-visual-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/cable-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/cable-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/cable-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/controls-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/controls-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/controls-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/data-center-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/data-center-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/data-center-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/electrician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/electrician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/electrician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/fire-alarm-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/fire-alarm-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/fire-alarm-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/index.md": {
	id: "texas/mcallen/index.md";
  slug: "texas/mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/security-technician-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/security-technician-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/security-technician-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/mcallen/solar-installer-recruiting-agency-in-mcallen.md": {
	id: "texas/mcallen/solar-installer-recruiting-agency-in-mcallen.md";
  slug: "texas/mcallen/solar-installer-recruiting-agency-in-mcallen";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/audio-visual-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/audio-visual-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/audio-visual-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/cable-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/cable-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/cable-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/controls-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/controls-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/controls-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/data-center-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/data-center-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/data-center-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/electrician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/electrician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/electrician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/fire-alarm-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/fire-alarm-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/fire-alarm-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/index.md": {
	id: "texas/san-antonio/index.md";
  slug: "texas/san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/security-technician-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/security-technician-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/security-technician-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"texas/san-antonio/solar-installer-recruiting-agency-in-san-antonio.md": {
	id: "texas/san-antonio/solar-installer-recruiting-agency-in-san-antonio.md";
  slug: "texas/san-antonio/solar-installer-recruiting-agency-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/index.md": {
	id: "utah/index.md";
  slug: "utah";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/audio-visual-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/audio-visual-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/audio-visual-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/cable-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/cable-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/cable-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/controls-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/controls-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/controls-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/data-center-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/data-center-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/data-center-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/electrician-recruiting-agency-in-provo.md": {
	id: "utah/provo/electrician-recruiting-agency-in-provo.md";
  slug: "utah/provo/electrician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/fire-alarm-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/fire-alarm-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/fire-alarm-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/index.md": {
	id: "utah/provo/index.md";
  slug: "utah/provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/security-technician-recruiting-agency-in-provo.md": {
	id: "utah/provo/security-technician-recruiting-agency-in-provo.md";
  slug: "utah/provo/security-technician-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/provo/solar-installer-recruiting-agency-in-provo.md": {
	id: "utah/provo/solar-installer-recruiting-agency-in-provo.md";
  slug: "utah/provo/solar-installer-recruiting-agency-in-provo";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/audio-visual-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/audio-visual-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/audio-visual-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/cable-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/cable-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/cable-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/controls-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/controls-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/controls-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/data-center-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/data-center-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/data-center-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/electrician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/electrician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/electrician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/fire-alarm-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/fire-alarm-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/fire-alarm-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/index.md": {
	id: "utah/salt-lake-city/index.md";
  slug: "utah/salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/security-technician-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/security-technician-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/security-technician-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"utah/salt-lake-city/solar-installer-recruiting-agency-in-salt-lake-city.md": {
	id: "utah/salt-lake-city/solar-installer-recruiting-agency-in-salt-lake-city.md";
  slug: "utah/salt-lake-city/solar-installer-recruiting-agency-in-salt-lake-city";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/audio-visual-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/audio-visual-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/audio-visual-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/cable-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/cable-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/cable-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/controls-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/controls-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/controls-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/data-center-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/data-center-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/data-center-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/electrician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/electrician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/electrician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/fire-alarm-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/fire-alarm-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/fire-alarm-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/index.md": {
	id: "virginia/ashburn/index.md";
  slug: "virginia/ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/security-technician-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/security-technician-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/security-technician-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/ashburn/solar-installer-recruiting-agency-in-ashburn.md": {
	id: "virginia/ashburn/solar-installer-recruiting-agency-in-ashburn.md";
  slug: "virginia/ashburn/solar-installer-recruiting-agency-in-ashburn";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/index.md": {
	id: "virginia/index.md";
  slug: "virginia";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/audio-visual-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/audio-visual-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/audio-visual-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/cable-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/cable-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/cable-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/controls-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/controls-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/controls-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/data-center-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/data-center-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/data-center-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/electrician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/electrician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/electrician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/fire-alarm-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/fire-alarm-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/fire-alarm-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/index.md": {
	id: "virginia/richmond/index.md";
  slug: "virginia/richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/security-technician-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/security-technician-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/security-technician-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/richmond/solar-installer-recruiting-agency-in-richmond.md": {
	id: "virginia/richmond/solar-installer-recruiting-agency-in-richmond.md";
  slug: "virginia/richmond/solar-installer-recruiting-agency-in-richmond";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/audio-visual-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/audio-visual-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/audio-visual-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/cable-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/cable-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/cable-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/controls-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/controls-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/controls-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/data-center-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/data-center-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/data-center-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/electrician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/electrician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/electrician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/fire-alarm-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/fire-alarm-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/fire-alarm-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/index.md": {
	id: "virginia/virginia-beach/index.md";
  slug: "virginia/virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/security-technician-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/security-technician-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/security-technician-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"virginia/virginia-beach/solar-installer-recruiting-agency-in-virginia-beach.md": {
	id: "virginia/virginia-beach/solar-installer-recruiting-agency-in-virginia-beach.md";
  slug: "virginia/virginia-beach/solar-installer-recruiting-agency-in-virginia-beach";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/index.md": {
	id: "washington/index.md";
  slug: "washington";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/audio-visual-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/audio-visual-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/audio-visual-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/cable-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/cable-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/cable-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/controls-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/controls-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/controls-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/data-center-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/data-center-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/data-center-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/electrician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/electrician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/electrician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/fire-alarm-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/fire-alarm-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/fire-alarm-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/index.md": {
	id: "washington/seattle/index.md";
  slug: "washington/seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/security-technician-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/security-technician-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/security-technician-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/seattle/solar-installer-recruiting-agency-in-seattle.md": {
	id: "washington/seattle/solar-installer-recruiting-agency-in-seattle.md";
  slug: "washington/seattle/solar-installer-recruiting-agency-in-seattle";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/audio-visual-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/audio-visual-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/audio-visual-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/cable-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/cable-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/cable-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/controls-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/controls-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/controls-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/data-center-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/data-center-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/data-center-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/electrician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/electrician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/electrician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/fire-alarm-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/fire-alarm-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/fire-alarm-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/index.md": {
	id: "washington/spokane/index.md";
  slug: "washington/spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/security-technician-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/security-technician-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/security-technician-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"washington/spokane/solar-installer-recruiting-agency-in-spokane.md": {
	id: "washington/spokane/solar-installer-recruiting-agency-in-spokane.md";
  slug: "washington/spokane/solar-installer-recruiting-agency-in-spokane";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/index.md": {
	id: "wisconsin/index.md";
  slug: "wisconsin";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/audio-visual-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/audio-visual-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/audio-visual-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/cable-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/cable-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/cable-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/controls-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/controls-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/controls-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/data-center-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/data-center-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/data-center-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/electrician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/electrician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/electrician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/fire-alarm-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/fire-alarm-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/fire-alarm-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/index.md": {
	id: "wisconsin/madison/index.md";
  slug: "wisconsin/madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/security-technician-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/security-technician-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/security-technician-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/madison/solar-installer-recruiting-agency-in-madison.md": {
	id: "wisconsin/madison/solar-installer-recruiting-agency-in-madison.md";
  slug: "wisconsin/madison/solar-installer-recruiting-agency-in-madison";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/audio-visual-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/audio-visual-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/audio-visual-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/cable-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/cable-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/cable-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/controls-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/controls-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/controls-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/data-center-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/data-center-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/data-center-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/electrician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/electrician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/electrician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/fire-alarm-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/fire-alarm-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/fire-alarm-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/index.md": {
	id: "wisconsin/milwaukee/index.md";
  slug: "wisconsin/milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/security-technician-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/security-technician-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/security-technician-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
"wisconsin/milwaukee/solar-installer-recruiting-agency-in-milwaukee.md": {
	id: "wisconsin/milwaukee/solar-installer-recruiting-agency-in-milwaukee.md";
  slug: "wisconsin/milwaukee/solar-installer-recruiting-agency-in-milwaukee";
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
