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
"glossary": {
"110-block.md": {
	id: "110-block.md";
  slug: "110-block";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"66-block.md": {
	id: "66-block.md";
  slug: "66-block";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ac-disconnect.md": {
	id: "ac-disconnect.md";
  slug: "ac-disconnect";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"access-control-interface.md": {
	id: "access-control-interface.md";
  slug: "access-control-interface";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"access-credentials.md": {
	id: "access-credentials.md";
  slug: "access-credentials";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"addressable-system.md": {
	id: "addressable-system.md";
  slug: "addressable-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"alarm-keypad.md": {
	id: "alarm-keypad.md";
  slug: "alarm-keypad";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"amperage.md": {
	id: "amperage.md";
  slug: "amperage";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"amplifier.md": {
	id: "amplifier.md";
  slug: "amplifier";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"analog-input.md": {
	id: "analog-input.md";
  slug: "analog-input";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"annunciator.md": {
	id: "annunciator.md";
  slug: "annunciator";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"arc-flash.md": {
	id: "arc-flash.md";
  slug: "arc-flash";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"area-of-refuge.md": {
	id: "area-of-refuge.md";
  slug: "area-of-refuge";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"armored-cable.md": {
	id: "armored-cable.md";
  slug: "armored-cable";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"audio-amplifier.md": {
	id: "audio-amplifier.md";
  slug: "audio-amplifier";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"audio-dsp.md": {
	id: "audio-dsp.md";
  slug: "audio-dsp";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"av-bridge.md": {
	id: "av-bridge.md";
  slug: "av-bridge";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"av-rack.md": {
	id: "av-rack.md";
  slug: "av-rack";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"backbone-cabling.md": {
	id: "backbone-cabling.md";
  slug: "backbone-cabling";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"backplane.md": {
	id: "backplane.md";
  slug: "backplane";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"badge-printer.md": {
	id: "badge-printer.md";
  slug: "badge-printer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"battery-backup.md": {
	id: "battery-backup.md";
  slug: "battery-backup";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"battery-bank.md": {
	id: "battery-bank.md";
  slug: "battery-bank";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bda-system.md": {
	id: "bda-system.md";
  slug: "bda-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"beam-detector.md": {
	id: "beam-detector.md";
  slug: "beam-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bonding.md": {
	id: "bonding.md";
  slug: "bonding";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"busbar.md": {
	id: "busbar.md";
  slug: "busbar";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bypass-diode.md": {
	id: "bypass-diode.md";
  slug: "bypass-diode";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-certification.md": {
	id: "cable-certification.md";
  slug: "cable-certification";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-management.md": {
	id: "cable-management.md";
  slug: "cable-management";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-pulling.md": {
	id: "cable-pulling.md";
  slug: "cable-pulling";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-shield.md": {
	id: "cable-shield.md";
  slug: "cable-shield";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-tester.md": {
	id: "cable-tester.md";
  slug: "cable-tester";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cable-tray.md": {
	id: "cable-tray.md";
  slug: "cable-tray";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"candela-rating.md": {
	id: "candela-rating.md";
  slug: "candela-rating";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"capacitor.md": {
	id: "capacitor.md";
  slug: "capacitor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"card-reader.md": {
	id: "card-reader.md";
  slug: "card-reader";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cat6a-cable.md": {
	id: "cat6a-cable.md";
  slug: "cat6a-cable";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cellular-communicator.md": {
	id: "cellular-communicator.md";
  slug: "cellular-communicator";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"charge-controller.md": {
	id: "charge-controller.md";
  slug: "charge-controller";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"circuit-breaker.md": {
	id: "circuit-breaker.md";
  slug: "circuit-breaker";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"class-a-wiring.md": {
	id: "class-a-wiring.md";
  slug: "class-a-wiring";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"class-b-wiring.md": {
	id: "class-b-wiring.md";
  slug: "class-b-wiring";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"co-detector.md": {
	id: "co-detector.md";
  slug: "co-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cold-aisle.md": {
	id: "cold-aisle.md";
  slug: "cold-aisle";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"combiner-box.md": {
	id: "combiner-box.md";
  slug: "combiner-box";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"conductor.md": {
	id: "conductor.md";
  slug: "conductor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"conduit.md": {
	id: "conduit.md";
  slug: "conduit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"contactor.md": {
	id: "contactor.md";
  slug: "contactor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"control-interface.md": {
	id: "control-interface.md";
  slug: "control-interface";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"control-module.md": {
	id: "control-module.md";
  slug: "control-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"control-processor.md": {
	id: "control-processor.md";
  slug: "control-processor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"conventional-system.md": {
	id: "conventional-system.md";
  slug: "conventional-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"core-switch.md": {
	id: "core-switch.md";
  slug: "core-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cpu-module.md": {
	id: "cpu-module.md";
  slug: "cpu-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"crah-unit.md": {
	id: "crah-unit.md";
  slug: "crah-unit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"dact.md": {
	id: "dact.md";
  slug: "dact";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"data-table.md": {
	id: "data-table.md";
  slug: "data-table";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"dc-disconnect.md": {
	id: "dc-disconnect.md";
  slug: "dc-disconnect";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"dcim.md": {
	id: "dcim.md";
  slug: "dcim";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"digital-input.md": {
	id: "digital-input.md";
  slug: "digital-input";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"digital-mixer.md": {
	id: "digital-mixer.md";
  slug: "digital-mixer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"disconnect-switch.md": {
	id: "disconnect-switch.md";
  slug: "disconnect-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"display-mount.md": {
	id: "display-mount.md";
  slug: "display-mount";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"door-contact.md": {
	id: "door-contact.md";
  slug: "door-contact";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"door-controller.md": {
	id: "door-controller.md";
  slug: "door-controller";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"duct-detector.md": {
	id: "duct-detector.md";
  slug: "duct-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"duress-button.md": {
	id: "duress-button.md";
  slug: "duress-button";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"electric-strike.md": {
	id: "electric-strike.md";
  slug: "electric-strike";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"elevator-recall.md": {
	id: "elevator-recall.md";
  slug: "elevator-recall";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"emt.md": {
	id: "emt.md";
  slug: "emt";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"energy-storage.md": {
	id: "energy-storage.md";
  slug: "energy-storage";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"environmental-monitoring.md": {
	id: "environmental-monitoring.md";
  slug: "environmental-monitoring";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"eol-resistor.md": {
	id: "eol-resistor.md";
  slug: "eol-resistor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"epo-system.md": {
	id: "epo-system.md";
  slug: "epo-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"equipment-shelf.md": {
	id: "equipment-shelf.md";
  slug: "equipment-shelf";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ethernet-ip.md": {
	id: "ethernet-ip.md";
  slug: "ethernet-ip";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"facp.md": {
	id: "facp.md";
  slug: "facp";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fiber-backbone.md": {
	id: "fiber-backbone.md";
  slug: "fiber-backbone";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fiber-enclosure.md": {
	id: "fiber-enclosure.md";
  slug: "fiber-enclosure";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fiber-optic-cable.md": {
	id: "fiber-optic-cable.md";
  slug: "fiber-optic-cable";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fiber-splice.md": {
	id: "fiber-splice.md";
  slug: "fiber-splice";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fiber-tray.md": {
	id: "fiber-tray.md";
  slug: "fiber-tray";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"finger-safe.md": {
	id: "finger-safe.md";
  slug: "finger-safe";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-log.md": {
	id: "fire-alarm-log.md";
  slug: "fire-alarm-log";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fire-alarm-runner.md": {
	id: "fire-alarm-runner.md";
  slug: "fire-alarm-runner";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fire-command-center.md": {
	id: "fire-command-center.md";
  slug: "fire-command-center";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fire-phone.md": {
	id: "fire-phone.md";
  slug: "fire-phone";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fire-sprinkler-monitor.md": {
	id: "fire-sprinkler-monitor.md";
  slug: "fire-sprinkler-monitor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fish-tape.md": {
	id: "fish-tape.md";
  slug: "fish-tape";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"function-block.md": {
	id: "function-block.md";
  slug: "function-block";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"generator-backup.md": {
	id: "generator-backup.md";
  slug: "generator-backup";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"gfci.md": {
	id: "gfci.md";
  slug: "gfci";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"glass-break-detector.md": {
	id: "glass-break-detector.md";
  slug: "glass-break-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"graphic-annunciator.md": {
	id: "graphic-annunciator.md";
  slug: "graphic-annunciator";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ground-bar.md": {
	id: "ground-bar.md";
  slug: "ground-bar";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ground-mount.md": {
	id: "ground-mount.md";
  slug: "ground-mount";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ground-wire.md": {
	id: "ground-wire.md";
  slug: "ground-wire";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"grounding-electrode.md": {
	id: "grounding-electrode.md";
  slug: "grounding-electrode";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"grounding-system.md": {
	id: "grounding-system.md";
  slug: "grounding-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"harmonics.md": {
	id: "harmonics.md";
  slug: "harmonics";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hda.md": {
	id: "hda.md";
  slug: "hda";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hdbaset.md": {
	id: "hdbaset.md";
  slug: "hdbaset";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"heat-detector.md": {
	id: "heat-detector.md";
  slug: "heat-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hmi.md": {
	id: "hmi.md";
  slug: "hmi";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"horn-strobe.md": {
	id: "horn-strobe.md";
  slug: "horn-strobe";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hot-aisle.md": {
	id: "hot-aisle.md";
  slug: "hot-aisle";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"idf.md": {
	id: "idf.md";
  slug: "idf";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"input-module.md": {
	id: "input-module.md";
  slug: "input-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"intercom.md": {
	id: "intercom.md";
  slug: "intercom";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"inverter.md": {
	id: "inverter.md";
  slug: "inverter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ip-camera.md": {
	id: "ip-camera.md";
  slug: "ip-camera";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ir-sensor.md": {
	id: "ir-sensor.md";
  slug: "ir-sensor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"isolation-module.md": {
	id: "isolation-module.md";
  slug: "isolation-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"j-hook.md": {
	id: "j-hook.md";
  slug: "j-hook";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"junction-box.md": {
	id: "junction-box.md";
  slug: "junction-box";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"key-fob.md": {
	id: "key-fob.md";
  slug: "key-fob";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"knockout.md": {
	id: "knockout.md";
  slug: "knockout";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ladder-logic.md": {
	id: "ladder-logic.md";
  slug: "ladder-logic";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"lc-connector.md": {
	id: "lc-connector.md";
  slug: "lc-connector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"load-center.md": {
	id: "load-center.md";
  slug: "load-center";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"lockout-tagout.md": {
	id: "lockout-tagout.md";
  slug: "lockout-tagout";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"loop-card.md": {
	id: "loop-card.md";
  slug: "loop-card";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mag-door-holder.md": {
	id: "mag-door-holder.md";
  slug: "mag-door-holder";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"magnetic-lock.md": {
	id: "magnetic-lock.md";
  slug: "magnetic-lock";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mc4-connector.md": {
	id: "mc4-connector.md";
  slug: "mc4-connector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mda.md": {
	id: "mda.md";
  slug: "mda";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mdf.md": {
	id: "mdf.md";
  slug: "mdf";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mega-meter.md": {
	id: "mega-meter.md";
  slug: "mega-meter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"memory-module.md": {
	id: "memory-module.md";
  slug: "memory-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"microinverter.md": {
	id: "microinverter.md";
  slug: "microinverter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mini-horn.md": {
	id: "mini-horn.md";
  slug: "mini-horn";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"modbus.md": {
	id: "modbus.md";
  slug: "modbus";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"monitor-module.md": {
	id: "monitor-module.md";
  slug: "monitor-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"monitoring-system.md": {
	id: "monitoring-system.md";
  slug: "monitoring-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"motion-detector.md": {
	id: "motion-detector.md";
  slug: "motion-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"motor-starter.md": {
	id: "motor-starter.md";
  slug: "motor-starter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"multimeter.md": {
	id: "multimeter.md";
  slug: "multimeter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"nac-extender.md": {
	id: "nac-extender.md";
  slug: "nac-extender";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"nac.md": {
	id: "nac.md";
  slug: "nac";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"net-meter.md": {
	id: "net-meter.md";
  slug: "net-meter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"network-camera.md": {
	id: "network-camera.md";
  slug: "network-camera";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"network-card.md": {
	id: "network-card.md";
  slug: "network-card";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"network-rack.md": {
	id: "network-rack.md";
  slug: "network-rack";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"neutral-wire.md": {
	id: "neutral-wire.md";
  slug: "neutral-wire";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"nvr.md": {
	id: "nvr.md";
  slug: "nvr";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"opc-server.md": {
	id: "opc-server.md";
  slug: "opc-server";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"otdr.md": {
	id: "otdr.md";
  slug: "otdr";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"output-module.md": {
	id: "output-module.md";
  slug: "output-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"panel-board.md": {
	id: "panel-board.md";
  slug: "panel-board";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"patch-bay.md": {
	id: "patch-bay.md";
  slug: "patch-bay";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"patch-panel.md": {
	id: "patch-panel.md";
  slug: "patch-panel";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pdu.md": {
	id: "pdu.md";
  slug: "pdu";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"phase.md": {
	id: "phase.md";
  slug: "phase";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pid-control.md": {
	id: "pid-control.md";
  slug: "pid-control";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"plenum-cable.md": {
	id: "plenum-cable.md";
  slug: "plenum-cable";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"poe-switch.md": {
	id: "poe-switch.md";
  slug: "poe-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"poe.md": {
	id: "poe.md";
  slug: "poe";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-conditioner.md": {
	id: "power-conditioner.md";
  slug: "power-conditioner";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-factor.md": {
	id: "power-factor.md";
  slug: "power-factor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-monitoring.md": {
	id: "power-monitoring.md";
  slug: "power-monitoring";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-optimizer.md": {
	id: "power-optimizer.md";
  slug: "power-optimizer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-supply.md": {
	id: "power-supply.md";
  slug: "power-supply";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"production-meter.md": {
	id: "production-meter.md";
  slug: "production-meter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"profibus.md": {
	id: "profibus.md";
  slug: "profibus";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"programming-tool.md": {
	id: "programming-tool.md";
  slug: "programming-tool";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"projection-screen.md": {
	id: "projection-screen.md";
  slug: "projection-screen";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"proximity-reader.md": {
	id: "proximity-reader.md";
  slug: "proximity-reader";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ptz-camera.md": {
	id: "ptz-camera.md";
  slug: "ptz-camera";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pull-box.md": {
	id: "pull-box.md";
  slug: "pull-box";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pull-station.md": {
	id: "pull-station.md";
  slug: "pull-station";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"punch-down-tool.md": {
	id: "punch-down-tool.md";
  slug: "punch-down-tool";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"raceway.md": {
	id: "raceway.md";
  slug: "raceway";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"racking-system.md": {
	id: "racking-system.md";
  slug: "racking-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"raised-floor.md": {
	id: "raised-floor.md";
  slug: "raised-floor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"rapid-shutdown.md": {
	id: "rapid-shutdown.md";
  slug: "rapid-shutdown";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"record-of-completion.md": {
	id: "record-of-completion.md";
  slug: "record-of-completion";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"relay-module.md": {
	id: "relay-module.md";
  slug: "relay-module";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"relay.md": {
	id: "relay.md";
  slug: "relay";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"remote-i-o.md": {
	id: "remote-i-o.md";
  slug: "remote-i-o";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"remote-power-supply.md": {
	id: "remote-power-supply.md";
  slug: "remote-power-supply";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"remote-test-station.md": {
	id: "remote-test-station.md";
  slug: "remote-test-station";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"request-to-exit.md": {
	id: "request-to-exit.md";
  slug: "request-to-exit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"resistance.md": {
	id: "resistance.md";
  slug: "resistance";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"rj45-connector.md": {
	id: "rj45-connector.md";
  slug: "rj45-connector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"rung.md": {
	id: "rung.md";
  slug: "rung";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"safety-plc.md": {
	id: "safety-plc.md";
  slug: "safety-plc";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"scada.md": {
	id: "scada.md";
  slug: "scada";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"security-panel.md": {
	id: "security-panel.md";
  slug: "security-panel";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sensor-input.md": {
	id: "sensor-input.md";
  slug: "sensor-input";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sequence-of-operations.md": {
	id: "sequence-of-operations.md";
  slug: "sequence-of-operations";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"server-rack.md": {
	id: "server-rack.md";
  slug: "server-rack";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"service-entrance.md": {
	id: "service-entrance.md";
  slug: "service-entrance";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"short-circuit.md": {
	id: "short-circuit.md";
  slug: "short-circuit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"signal-extender.md": {
	id: "signal-extender.md";
  slug: "signal-extender";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"slc.md": {
	id: "slc.md";
  slug: "slc";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"smoke-control-panel.md": {
	id: "smoke-control-panel.md";
  slug: "smoke-control-panel";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"smoke-control.md": {
	id: "smoke-control.md";
  slug: "smoke-control";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"smoke-detector.md": {
	id: "smoke-detector.md";
  slug: "smoke-detector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"solar-controller.md": {
	id: "solar-controller.md";
  slug: "solar-controller";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"solar-optimizer.md": {
	id: "solar-optimizer.md";
  slug: "solar-optimizer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"solar-panel.md": {
	id: "solar-panel.md";
  slug: "solar-panel";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"speaker-system.md": {
	id: "speaker-system.md";
  slug: "speaker-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"speaker-wire.md": {
	id: "speaker-wire.md";
  slug: "speaker-wire";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"static-transfer-switch.md": {
	id: "static-transfer-switch.md";
  slug: "static-transfer-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"string-inverter.md": {
	id: "string-inverter.md";
  slug: "string-inverter";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"structured-text.md": {
	id: "structured-text.md";
  slug: "structured-text";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"surge-protector.md": {
	id: "surge-protector.md";
  slug: "surge-protector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"surge-suppressor.md": {
	id: "surge-suppressor.md";
  slug: "surge-suppressor";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"synchronization.md": {
	id: "synchronization.md";
  slug: "synchronization";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"thermography.md": {
	id: "thermography.md";
  slug: "thermography";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"tone-generator.md": {
	id: "tone-generator.md";
  slug: "tone-generator";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"touch-panel.md": {
	id: "touch-panel.md";
  slug: "touch-panel";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"transfer-switch.md": {
	id: "transfer-switch.md";
  slug: "transfer-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"transformer.md": {
	id: "transformer.md";
  slug: "transformer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ups-system.md": {
	id: "ups-system.md";
  slug: "ups-system";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"valve-tamper.md": {
	id: "valve-tamper.md";
  slug: "valve-tamper";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"vesda.md": {
	id: "vesda.md";
  slug: "vesda";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"vfd.md": {
	id: "vfd.md";
  slug: "vfd";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"video-analytics.md": {
	id: "video-analytics.md";
  slug: "video-analytics";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"video-management.md": {
	id: "video-management.md";
  slug: "video-management";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"video-matrix.md": {
	id: "video-matrix.md";
  slug: "video-matrix";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"video-projector.md": {
	id: "video-projector.md";
  slug: "video-projector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"video-scaler.md": {
	id: "video-scaler.md";
  slug: "video-scaler";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"voice-evacuation.md": {
	id: "voice-evacuation.md";
  slug: "voice-evacuation";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"voip-phone.md": {
	id: "voip-phone.md";
  slug: "voip-phone";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"voltage-drop.md": {
	id: "voltage-drop.md";
  slug: "voltage-drop";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"voltage.md": {
	id: "voltage.md";
  slug: "voltage";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wap.md": {
	id: "wap.md";
  slug: "wap";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"water-flow-switch.md": {
	id: "water-flow-switch.md";
  slug: "water-flow-switch";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"weather-station.md": {
	id: "weather-station.md";
  slug: "weather-station";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wire-connector.md": {
	id: "wire-connector.md";
  slug: "wire-connector";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wire-gauge.md": {
	id: "wire-gauge.md";
  slug: "wire-gauge";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wire-loom.md": {
	id: "wire-loom.md";
  slug: "wire-loom";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wire-stripper.md": {
	id: "wire-stripper.md";
  slug: "wire-stripper";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wireless-mic.md": {
	id: "wireless-mic.md";
  slug: "wireless-mic";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"zone-module.md": {
	id: "zone-module.md";
  slug: "zone-module";
  body: string;
  collection: "glossary";
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
"integrations": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "integrations";
  data: any;
  render(): Render[".md"];
}>;
"jobs": {
"albertsons-assistant-inventory-clerk-glendora-albeuqk2k5.md": {
	id: "albertsons-assistant-inventory-clerk-glendora-albeuqk2k5.md";
  slug: "albertsons-assistant-inventory-clerk-glendora-albeuqk2k5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5.md": {
	id: "albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5.md";
  slug: "albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81.md": {
	id: "albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81.md";
  slug: "albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-pallet-jack-operator-norco-albe37istq.md": {
	id: "albertsons-pallet-jack-operator-norco-albe37istq.md";
  slug: "albertsons-pallet-jack-operator-norco-albe37istq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-assembler-irwindale-albe8sfm93.md": {
	id: "albertsons-warehouse-assembler-irwindale-albe8sfm93.md";
  slug: "albertsons-warehouse-assembler-irwindale-albe8sfm93";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-associate-city-of-industry-albef57bmx.md": {
	id: "albertsons-warehouse-associate-city-of-industry-albef57bmx.md";
  slug: "albertsons-warehouse-associate-city-of-industry-albef57bmx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-forklift-operator-covina-albe38yw83.md": {
	id: "albertsons-warehouse-forklift-operator-covina-albe38yw83.md";
  slug: "albertsons-warehouse-forklift-operator-covina-albe38yw83";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-loader-walnut-albe9d10zg.md": {
	id: "albertsons-warehouse-loader-walnut-albe9d10zg.md";
  slug: "albertsons-warehouse-loader-walnut-albe9d10zg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-material-handler-la-puente-albe8239pt.md": {
	id: "albertsons-warehouse-material-handler-la-puente-albe8239pt.md";
  slug: "albertsons-warehouse-material-handler-la-puente-albe8239pt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-picker-&-packer-san-dimas-albe31d1rz.md": {
	id: "albertsons-warehouse-picker-&-packer-san-dimas-albe31d1rz.md";
  slug: "albertsons-warehouse-picker--packer-san-dimas-albe31d1rz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"albertsons-warehouse-unloader-baldwin-park-albeo19bct.md": {
	id: "albertsons-warehouse-unloader-baldwin-park-albeo19bct.md";
  slug: "albertsons-warehouse-unloader-baldwin-park-albeo19bct";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93.md": {
	id: "amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93.md";
  slug: "amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-assistant-receiving-clerk-san-clemente-amazte2vpk.md": {
	id: "amazon-assistant-receiving-clerk-san-clemente-amazte2vpk.md";
  slug: "amazon-assistant-receiving-clerk-san-clemente-amazte2vpk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-assistant-shipping-clerk-lake-forest-amazklvgod.md": {
	id: "amazon-assistant-shipping-clerk-lake-forest-amazklvgod.md";
  slug: "amazon-assistant-shipping-clerk-lake-forest-amazklvgod";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y.md": {
	id: "amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y.md";
  slug: "amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-assembler-placentia-amaz8ckfin.md": {
	id: "amazon-warehouse-assembler-placentia-amaz8ckfin.md";
  slug: "amazon-warehouse-assembler-placentia-amaz8ckfin";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-associate-pomona-amazn2rd5c.md": {
	id: "amazon-warehouse-associate-pomona-amazn2rd5c.md";
  slug: "amazon-warehouse-associate-pomona-amazn2rd5c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk.md": {
	id: "amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk.md";
  slug: "amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-loader-diamond-bar-amazpvoltv.md": {
	id: "amazon-warehouse-loader-diamond-bar-amazpvoltv.md";
  slug: "amazon-warehouse-loader-diamond-bar-amazpvoltv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-material-handler-la-habra-amazovhy9t.md": {
	id: "amazon-warehouse-material-handler-la-habra-amazovhy9t.md";
  slug: "amazon-warehouse-material-handler-la-habra-amazovhy9t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-picker-&-packer-costa-mesa-amaz4qjrhu.md": {
	id: "amazon-warehouse-picker-&-packer-costa-mesa-amaz4qjrhu.md";
  slug: "amazon-warehouse-picker--packer-costa-mesa-amaz4qjrhu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"amazon-warehouse-unloader-brea-amaze6kzpp.md": {
	id: "amazon-warehouse-unloader-brea-amaze6kzpp.md";
  slug: "amazon-warehouse-unloader-brea-amaze6kzpp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj.md": {
	id: "ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj.md";
  slug: "ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-assistant-receiving-clerk-ontario-apexw8hon.md": {
	id: "ap-express-assistant-receiving-clerk-ontario-apexw8hon.md";
  slug: "ap-express-assistant-receiving-clerk-ontario-apexw8hon";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-assistant-shipping-clerk-west-covina-ape1etyfp.md": {
	id: "ap-express-assistant-shipping-clerk-west-covina-ape1etyfp.md";
  slug: "ap-express-assistant-shipping-clerk-west-covina-ape1etyfp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-pallet-jack-operator-chino-apeq11ikg.md": {
	id: "ap-express-pallet-jack-operator-chino-apeq11ikg.md";
  slug: "ap-express-pallet-jack-operator-chino-apeq11ikg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-assembler-tustin-apeyxbq0g.md": {
	id: "ap-express-warehouse-assembler-tustin-apeyxbq0g.md";
  slug: "ap-express-warehouse-assembler-tustin-apeyxbq0g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-associate-anaheim-apeikmd0d.md": {
	id: "ap-express-warehouse-associate-anaheim-apeikmd0d.md";
  slug: "ap-express-warehouse-associate-anaheim-apeikmd0d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd.md": {
	id: "ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd.md";
  slug: "ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-loader-garden-grove-ape27srcy.md": {
	id: "ap-express-warehouse-loader-garden-grove-ape27srcy.md";
  slug: "ap-express-warehouse-loader-garden-grove-ape27srcy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-material-handler-orange-ape9cdgww.md": {
	id: "ap-express-warehouse-material-handler-orange-ape9cdgww.md";
  slug: "ap-express-warehouse-material-handler-orange-ape9cdgww";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-picker-&-packer-irvine-apeeyejng.md": {
	id: "ap-express-warehouse-picker-&-packer-irvine-apeeyejng.md";
  slug: "ap-express-warehouse-picker--packer-irvine-apeeyejng";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ap-express-warehouse-unloader-santa-ana-apeidu561.md": {
	id: "ap-express-warehouse-unloader-santa-ana-apeidu561.md";
  slug: "ap-express-warehouse-unloader-santa-ana-apeidu561";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-assistant-inventory-clerk-redlands-boeiflslbv.md": {
	id: "boeing-assistant-inventory-clerk-redlands-boeiflslbv.md";
  slug: "boeing-assistant-inventory-clerk-redlands-boeiflslbv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28.md": {
	id: "boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28.md";
  slug: "boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri.md": {
	id: "boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri.md";
  slug: "boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-pallet-jack-operator-lynwood-boeiuqbm77.md": {
	id: "boeing-pallet-jack-operator-lynwood-boeiuqbm77.md";
  slug: "boeing-pallet-jack-operator-lynwood-boeiuqbm77";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-assembler-fontana-boeirp5bfo.md": {
	id: "boeing-warehouse-assembler-fontana-boeirp5bfo.md";
  slug: "boeing-warehouse-assembler-fontana-boeirp5bfo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-associate-corona-boeibzscro.md": {
	id: "boeing-warehouse-associate-corona-boeibzscro.md";
  slug: "boeing-warehouse-associate-corona-boeibzscro";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-forklift-operator-colton-boeikrgaax.md": {
	id: "boeing-warehouse-forklift-operator-colton-boeikrgaax.md";
  slug: "boeing-warehouse-forklift-operator-colton-boeikrgaax";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-loader-perris-boeiwskijx.md": {
	id: "boeing-warehouse-loader-perris-boeiwskijx.md";
  slug: "boeing-warehouse-loader-perris-boeiwskijx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-material-handler-riverside-boeia0l4mb.md": {
	id: "boeing-warehouse-material-handler-riverside-boeia0l4mb.md";
  slug: "boeing-warehouse-material-handler-riverside-boeia0l4mb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-picker-&-packer-san-bernardino-boein30u9r.md": {
	id: "boeing-warehouse-picker-&-packer-san-bernardino-boein30u9r.md";
  slug: "boeing-warehouse-picker--packer-san-bernardino-boein30u9r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"boeing-warehouse-unloader-jurupa-valley-boeioko94p.md": {
	id: "boeing-warehouse-unloader-jurupa-valley-boeioko94p.md";
  slug: "boeing-warehouse-unloader-jurupa-valley-boeioko94p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4.md": {
	id: "lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4.md";
  slug: "lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri.md": {
	id: "lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri.md";
  slug: "lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa.md": {
	id: "lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa.md";
  slug: "lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg.md": {
	id: "lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg.md";
  slug: "lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-assembler-artesia-lami7bhv2u.md": {
	id: "lamill-coffee-warehouse-assembler-artesia-lami7bhv2u.md";
  slug: "lamill-coffee-warehouse-assembler-artesia-lami7bhv2u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-associate-cerritos-lamirsq0hp.md": {
	id: "lamill-coffee-warehouse-associate-cerritos-lamirsq0hp.md";
  slug: "lamill-coffee-warehouse-associate-cerritos-lamirsq0hp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj.md": {
	id: "lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj.md";
  slug: "lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz.md": {
	id: "lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz.md";
  slug: "lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-material-handler-bell-lamibnsy0x.md": {
	id: "lamill-coffee-warehouse-material-handler-bell-lamibnsy0x.md";
  slug: "lamill-coffee-warehouse-material-handler-bell-lamibnsy0x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-picker-&-packer-rancho-dominguez-lamizg0tg5.md": {
	id: "lamill-coffee-warehouse-picker-&-packer-rancho-dominguez-lamizg0tg5.md";
  slug: "lamill-coffee-warehouse-picker--packer-rancho-dominguez-lamizg0tg5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-unloader-huntington-park-lami33srt0.md": {
	id: "lamill-coffee-warehouse-unloader-huntington-park-lami33srt0.md";
  slug: "lamill-coffee-warehouse-unloader-huntington-park-lami33srt0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw.md": {
	id: "lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw.md";
  slug: "lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u.md": {
	id: "lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u.md";
  slug: "lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw.md": {
	id: "lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw.md";
  slug: "lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-pallet-jack-operator-compton-linedacsr0.md": {
	id: "lineage-logistics-pallet-jack-operator-compton-linedacsr0.md";
  slug: "lineage-logistics-pallet-jack-operator-compton-linedacsr0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3.md": {
	id: "lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3.md";
  slug: "lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-associate-los-angeles-linedldwx1.md": {
	id: "lineage-logistics-warehouse-associate-los-angeles-linedldwx1.md";
  slug: "lineage-logistics-warehouse-associate-los-angeles-linedldwx1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-forklift-operator-gardena-linery07qy.md": {
	id: "lineage-logistics-warehouse-forklift-operator-gardena-linery07qy.md";
  slug: "lineage-logistics-warehouse-forklift-operator-gardena-linery07qy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-loader-culver-city-linetcyuet.md": {
	id: "lineage-logistics-warehouse-loader-culver-city-linetcyuet.md";
  slug: "lineage-logistics-warehouse-loader-culver-city-linetcyuet";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy.md": {
	id: "lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy.md";
  slug: "lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-picker-&-packer-torrance-linewwab80.md": {
	id: "lineage-logistics-warehouse-picker-&-packer-torrance-linewwab80.md";
  slug: "lineage-logistics-warehouse-picker--packer-torrance-linewwab80";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-unloader-inglewood-line46gi43.md": {
	id: "lineage-logistics-warehouse-unloader-inglewood-line46gi43.md";
  slug: "lineage-logistics-warehouse-unloader-inglewood-line46gi43";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-assistant-inventory-clerk-cypress-stat596rxn.md": {
	id: "states-logistics-assistant-inventory-clerk-cypress-stat596rxn.md";
  slug: "states-logistics-assistant-inventory-clerk-cypress-stat596rxn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-assistant-receiving-clerk-whittier-statd6pm5s.md": {
	id: "states-logistics-assistant-receiving-clerk-whittier-statd6pm5s.md";
  slug: "states-logistics-assistant-receiving-clerk-whittier-statd6pm5s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1.md": {
	id: "states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1.md";
  slug: "states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-pallet-jack-operator-fullerton-statf2gw3m.md": {
	id: "states-logistics-pallet-jack-operator-fullerton-statf2gw3m.md";
  slug: "states-logistics-pallet-jack-operator-fullerton-statf2gw3m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-assembler-lakewood-stathkrfwg.md": {
	id: "states-logistics-warehouse-assembler-lakewood-stathkrfwg.md";
  slug: "states-logistics-warehouse-assembler-lakewood-stathkrfwg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-associate-south-gate-statij1ve4.md": {
	id: "states-logistics-warehouse-associate-south-gate-statij1ve4.md";
  slug: "states-logistics-warehouse-associate-south-gate-statij1ve4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-forklift-operator-buena-park-stat5l083h.md": {
	id: "states-logistics-warehouse-forklift-operator-buena-park-stat5l083h.md";
  slug: "states-logistics-warehouse-forklift-operator-buena-park-stat5l083h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-loader-downey-stato7cil3.md": {
	id: "states-logistics-warehouse-loader-downey-stato7cil3.md";
  slug: "states-logistics-warehouse-loader-downey-stato7cil3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-material-handler-bellflower-statpwywtq.md": {
	id: "states-logistics-warehouse-material-handler-bellflower-statpwywtq.md";
  slug: "states-logistics-warehouse-material-handler-bellflower-statpwywtq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-picker-&-packer-paramount-statydisxr.md": {
	id: "states-logistics-warehouse-picker-&-packer-paramount-statydisxr.md";
  slug: "states-logistics-warehouse-picker--packer-paramount-statydisxr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"states-logistics-warehouse-unloader-norwalk-statxhjuza.md": {
	id: "states-logistics-warehouse-unloader-norwalk-statxhjuza.md";
  slug: "states-logistics-warehouse-unloader-norwalk-statxhjuza";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-assistant-inventory-clerk-montebello-targuwcshm.md": {
	id: "target-assistant-inventory-clerk-montebello-targuwcshm.md";
  slug: "target-assistant-inventory-clerk-montebello-targuwcshm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-assistant-receiving-clerk-maywood-targyajvtt.md": {
	id: "target-assistant-receiving-clerk-maywood-targyajvtt.md";
  slug: "target-assistant-receiving-clerk-maywood-targyajvtt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-assistant-shipping-clerk-bell-gardens-targlhw9mn.md": {
	id: "target-assistant-shipping-clerk-bell-gardens-targlhw9mn.md";
  slug: "target-assistant-shipping-clerk-bell-gardens-targlhw9mn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-pallet-jack-operator-el-monte-targe33fb3.md": {
	id: "target-pallet-jack-operator-el-monte-targe33fb3.md";
  slug: "target-pallet-jack-operator-el-monte-targe33fb3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-assembler-commerce-targcseba3.md": {
	id: "target-warehouse-assembler-commerce-targcseba3.md";
  slug: "target-warehouse-assembler-commerce-targcseba3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-associate-aliso-viejo-targxxhnnj.md": {
	id: "target-warehouse-associate-aliso-viejo-targxxhnnj.md";
  slug: "target-warehouse-associate-aliso-viejo-targxxhnnj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-forklift-operator-east-los-angeles-targzlkjjm.md": {
	id: "target-warehouse-forklift-operator-east-los-angeles-targzlkjjm.md";
  slug: "target-warehouse-forklift-operator-east-los-angeles-targzlkjjm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-loader-rancho-santa-margarita-targs95mlu.md": {
	id: "target-warehouse-loader-rancho-santa-margarita-targs95mlu.md";
  slug: "target-warehouse-loader-rancho-santa-margarita-targs95mlu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-material-handler-vernon-targa5i9kc.md": {
	id: "target-warehouse-material-handler-vernon-targa5i9kc.md";
  slug: "target-warehouse-material-handler-vernon-targa5i9kc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-picker-&-packer-pico-rivera-targ8l6x0u.md": {
	id: "target-warehouse-picker-&-packer-pico-rivera-targ8l6x0u.md";
  slug: "target-warehouse-picker--packer-pico-rivera-targ8l6x0u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"target-warehouse-unloader-ladera-ranch-targo33zww.md": {
	id: "target-warehouse-unloader-ladera-ranch-targo33zww.md";
  slug: "target-warehouse-unloader-ladera-ranch-targo33zww";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s.md": {
	id: "virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s.md";
  slug: "virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d.md": {
	id: "virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d.md";
  slug: "virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7.md": {
	id: "virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7.md";
  slug: "virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj.md": {
	id: "virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj.md";
  slug: "virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-loader-chatsworth-virgvrff4s.md": {
	id: "virgin-galactic-warehouse-loader-chatsworth-virgvrff4s.md";
  slug: "virgin-galactic-warehouse-loader-chatsworth-virgvrff4s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-material-handler-reseda-virgddq05z.md": {
	id: "virgin-galactic-warehouse-material-handler-reseda-virgddq05z.md";
  slug: "virgin-galactic-warehouse-material-handler-reseda-virgddq05z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-picker-&-packer-granada-hills-virgffw59x.md": {
	id: "virgin-galactic-warehouse-picker-&-packer-granada-hills-virgffw59x.md";
  slug: "virgin-galactic-warehouse-picker--packer-granada-hills-virgffw59x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq.md": {
	id: "virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq.md";
  slug: "virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"warehouse-job-description.md": {
	id: "warehouse-job-description.md";
  slug: "warehouse-job-description";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"warehouse-jobs-near-me.md": {
	id: "warehouse-jobs-near-me.md";
  slug: "warehouse-jobs-near-me";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"warehouse-safety-tips.md": {
	id: "warehouse-safety-tips.md";
  slug: "warehouse-safety-tips";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"warehouse-worker-duties.md": {
	id: "warehouse-worker-duties.md";
  slug: "warehouse-worker-duties";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"warehouse-worker-skills.md": {
	id: "warehouse-worker-skills.md";
  slug: "warehouse-worker-skills";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};
"recruiting": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "recruiting";
  data: any;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
