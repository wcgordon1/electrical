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
"wiline-security-systems-tech-union-city-wili8ah37a.md": {
	id: "wiline-security-systems-tech-union-city-wili8ah37a.md";
  slug: "wiline-security-systems-tech-union-city-wili8ah37a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-tech-fountain-valley-wili5bra4j.md": {
	id: "wiline-security-tech-fountain-valley-wili5bra4j.md";
  slug: "wiline-security-tech-fountain-valley-wili5bra4j";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"wiline-security-tech-hayward-wiliof9kf8.md": {
	id: "wiline-security-tech-hayward-wiliof9kf8.md";
  slug: "wiline-security-tech-hayward-wiliof9kf8";
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
"wiline-security-technician-plano-wili1ys2t8.md": {
	id: "wiline-security-technician-plano-wili1ys2t8.md";
  slug: "wiline-security-technician-plano-wili1ys2t8";
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
"atlanta-audio-visual-technician-staffing.md": {
	id: "atlanta-audio-visual-technician-staffing.md";
  slug: "atlanta-audio-visual-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-commercial-electrician-staffing.md": {
	id: "atlanta-commercial-electrician-staffing.md";
  slug: "atlanta-commercial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-controls-technician-staffing.md": {
	id: "atlanta-controls-technician-staffing.md";
  slug: "atlanta-controls-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-data-center-technician-staffing.md": {
	id: "atlanta-data-center-technician-staffing.md";
  slug: "atlanta-data-center-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-fire-alarm-technician-staffing.md": {
	id: "atlanta-fire-alarm-technician-staffing.md";
  slug: "atlanta-fire-alarm-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-industrial-electrician-staffing.md": {
	id: "atlanta-industrial-electrician-staffing.md";
  slug: "atlanta-industrial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-residential-electrician-staffing.md": {
	id: "atlanta-residential-electrician-staffing.md";
  slug: "atlanta-residential-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-security-technician-staffing.md": {
	id: "atlanta-security-technician-staffing.md";
  slug: "atlanta-security-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-solar-installer-staffing.md": {
	id: "atlanta-solar-installer-staffing.md";
  slug: "atlanta-solar-installer-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atlanta-voice-data-technician-staffing.md": {
	id: "atlanta-voice-data-technician-staffing.md";
  slug: "atlanta-voice-data-technician-staffing";
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
"dallas-audio-visual-technician-staffing.md": {
	id: "dallas-audio-visual-technician-staffing.md";
  slug: "dallas-audio-visual-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-commercial-electrician-staffing.md": {
	id: "dallas-commercial-electrician-staffing.md";
  slug: "dallas-commercial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-controls-technician-staffing.md": {
	id: "dallas-controls-technician-staffing.md";
  slug: "dallas-controls-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-data-center-technician-staffing.md": {
	id: "dallas-data-center-technician-staffing.md";
  slug: "dallas-data-center-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-fire-alarm-technician-staffing.md": {
	id: "dallas-fire-alarm-technician-staffing.md";
  slug: "dallas-fire-alarm-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-industrial-electrician-staffing.md": {
	id: "dallas-industrial-electrician-staffing.md";
  slug: "dallas-industrial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-residential-electrician-staffing.md": {
	id: "dallas-residential-electrician-staffing.md";
  slug: "dallas-residential-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-security-technician-staffing.md": {
	id: "dallas-security-technician-staffing.md";
  slug: "dallas-security-technician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-solar-installer-staffing.md": {
	id: "dallas-solar-installer-staffing.md";
  slug: "dallas-solar-installer-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-voice-data-technician-staffing.md": {
	id: "dallas-voice-data-technician-staffing.md";
  slug: "dallas-voice-data-technician-staffing";
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
