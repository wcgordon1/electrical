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
"3d-communications-av-systems-tech-cypress-3dcfn02rr.md": {
	id: "3d-communications-av-systems-tech-cypress-3dcfn02rr.md";
  slug: "3d-communications-av-systems-tech-cypress-3dcfn02rr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-av-systems-tech-sunnyvale-3dcp8lvus.md": {
	id: "3d-communications-av-systems-tech-sunnyvale-3dcp8lvus.md";
  slug: "3d-communications-av-systems-tech-sunnyvale-3dcp8lvus";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-tech-west-hollywood-3dcrcrv76.md": {
	id: "3d-communications-cable-tech-west-hollywood-3dcrcrv76.md";
  slug: "3d-communications-cable-tech-west-hollywood-3dcrcrv76";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-culver-city-3dcq1m7j5.md": {
	id: "3d-communications-cable-technician-culver-city-3dcq1m7j5.md";
  slug: "3d-communications-cable-technician-culver-city-3dcq1m7j5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-fort-collins-3dcaollqp.md": {
	id: "3d-communications-cable-technician-fort-collins-3dcaollqp.md";
  slug: "3d-communications-cable-technician-fort-collins-3dcaollqp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-los-angeles-3dcb0bz3t.md": {
	id: "3d-communications-cable-technician-los-angeles-3dcb0bz3t.md";
  slug: "3d-communications-cable-technician-los-angeles-3dcb0bz3t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-norfolk-3dcdoetn2.md": {
	id: "3d-communications-cable-technician-norfolk-3dcdoetn2.md";
  slug: "3d-communications-cable-technician-norfolk-3dcdoetn2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-redding-3dc2zg6sf.md": {
	id: "3d-communications-cable-technician-redding-3dc2zg6sf.md";
  slug: "3d-communications-cable-technician-redding-3dc2zg6sf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-cable-technician-vinton-3dcfvoo8q.md": {
	id: "3d-communications-cable-technician-vinton-3dcfvoo8q.md";
  slug: "3d-communications-cable-technician-vinton-3dcfvoo8q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-data-center-cable-tech-campbell-3dckt80s7.md": {
	id: "3d-communications-data-center-cable-tech-campbell-3dckt80s7.md";
  slug: "3d-communications-data-center-cable-tech-campbell-3dckt80s7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg.md": {
	id: "3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg.md";
  slug: "3d-communications-electrical-apprentice-new-orleans-3dc3w5qfg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq.md": {
	id: "3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq.md";
  slug: "3d-communications-fire-alarm-tech-el-segundo-3dc7yz1iq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-emeryville-3dcft4thq.md": {
	id: "3d-communications-fire-alarm-tech-emeryville-3dcft4thq.md";
  slug: "3d-communications-fire-alarm-tech-emeryville-3dcft4thq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q.md": {
	id: "3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q.md";
  slug: "3d-communications-fire-alarm-tech-foothill-ranch-3dchamt6q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-industrial-electrician-huntsville-3dcdgcyjy.md": {
	id: "3d-communications-industrial-electrician-huntsville-3dcdgcyjy.md";
  slug: "3d-communications-industrial-electrician-huntsville-3dcdgcyjy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-security-technician-greensboro-3dcd8zye3.md": {
	id: "3d-communications-security-technician-greensboro-3dcd8zye3.md";
  slug: "3d-communications-security-technician-greensboro-3dcd8zye3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"3d-communications-security-technician-santa-monica-3dc9lj757.md": {
	id: "3d-communications-security-technician-santa-monica-3dc9lj757.md";
  slug: "3d-communications-security-technician-santa-monica-3dc9lj757";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"alert-360-fire-alarm-designer-gilbert-aler409rsj.md": {
	id: "alert-360-fire-alarm-designer-gilbert-aler409rsj.md";
  slug: "alert-360-fire-alarm-designer-gilbert-aler409rsj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c.md": {
	id: "alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c.md";
  slug: "alert-360-fire-alarm-project-manager-garden-grove-aler2fm21c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"alert-360-junior-project-manager-chandler-aler7g6hoc.md": {
	id: "alert-360-junior-project-manager-chandler-aler7g6hoc.md";
  slug: "alert-360-junior-project-manager-chandler-aler7g6hoc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"alert-360-security-project-manager-hillsboro-aler7vv3i5.md": {
	id: "alert-360-security-project-manager-hillsboro-aler7vv3i5.md";
  slug: "alert-360-security-project-manager-hillsboro-aler7vv3i5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"all-work-elec-premiere-id-re8291.md": {
	id: "all-work-elec-premiere-id-re8291.md";
  slug: "all-work-elec-premiere-id-re8291";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-bakersfield-id-nf2904.md": {
	id: "apprentice-elec-bakersfield-id-nf2904.md";
  slug: "apprentice-elec-bakersfield-id-nf2904";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-elec-burbank-prime-id-bf1928.md": {
	id: "apprentice-elec-burbank-prime-id-bf1928.md";
  slug: "apprentice-elec-burbank-prime-id-bf1928";
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
"apprentice-elec-d-mmr-burbank-id-fds34242.md": {
	id: "apprentice-elec-d-mmr-burbank-id-fds34242.md";
  slug: "apprentice-elec-d-mmr-burbank-id-fds34242";
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
"apprentice-elec-universal-prime-id-hf8291.md": {
	id: "apprentice-elec-universal-prime-id-hf8291.md";
  slug: "apprentice-elec-universal-prime-id-hf8291";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-alpharetta-appr-d24g5b.md": {
	id: "apprentice-electrician-alpharetta-appr-d24g5b.md";
  slug: "apprentice-electrician-alpharetta-appr-d24g5b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-anaheim-appr-1dlu0v.md": {
	id: "apprentice-electrician-anaheim-appr-1dlu0v.md";
  slug: "apprentice-electrician-anaheim-appr-1dlu0v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-atlanta-appr-xttd80.md": {
	id: "apprentice-electrician-atlanta-appr-xttd80.md";
  slug: "apprentice-electrician-atlanta-appr-xttd80";
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
"apprentice-electrician-berkeley-appr-6uix1q.md": {
	id: "apprentice-electrician-berkeley-appr-6uix1q.md";
  slug: "apprentice-electrician-berkeley-appr-6uix1q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-burbank-appr-kb0qcg.md": {
	id: "apprentice-electrician-burbank-appr-kb0qcg.md";
  slug: "apprentice-electrician-burbank-appr-kb0qcg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-cupertino-appr-qfqtd3.md": {
	id: "apprentice-electrician-cupertino-appr-qfqtd3.md";
  slug: "apprentice-electrician-cupertino-appr-qfqtd3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-fremont-appr-y95isl.md": {
	id: "apprentice-electrician-fremont-appr-y95isl.md";
  slug: "apprentice-electrician-fremont-appr-y95isl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-glendale-appr-tj7w7v.md": {
	id: "apprentice-electrician-glendale-appr-tj7w7v.md";
  slug: "apprentice-electrician-glendale-appr-tj7w7v";
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
"apprentice-electrician-irvine-appr-b7vfp9.md": {
	id: "apprentice-electrician-irvine-appr-b7vfp9.md";
  slug: "apprentice-electrician-irvine-appr-b7vfp9";
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
"apprentice-electrician-long beach-appr-o47arm.md": {
	id: "apprentice-electrician-long beach-appr-o47arm.md";
  slug: "apprentice-electrician-long-beach-appr-o47arm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-los angeles-appr-ys50uh.md": {
	id: "apprentice-electrician-los angeles-appr-ys50uh.md";
  slug: "apprentice-electrician-los-angeles-appr-ys50uh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-marietta-appr-z8ko6q.md": {
	id: "apprentice-electrician-marietta-appr-z8ko6q.md";
  slug: "apprentice-electrician-marietta-appr-z8ko6q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-mountain view-appr-vkhhz3.md": {
	id: "apprentice-electrician-mountain view-appr-vkhhz3.md";
  slug: "apprentice-electrician-mountain-view-appr-vkhhz3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-oakland-appr-f3f24e.md": {
	id: "apprentice-electrician-oakland-appr-f3f24e.md";
  slug: "apprentice-electrician-oakland-appr-f3f24e";
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
"apprentice-electrician-palo alto-appr-je24e5.md": {
	id: "apprentice-electrician-palo alto-appr-je24e5.md";
  slug: "apprentice-electrician-palo-alto-appr-je24e5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-pasadena-appr-wdnti6.md": {
	id: "apprentice-electrician-pasadena-appr-wdnti6.md";
  slug: "apprentice-electrician-pasadena-appr-wdnti6";
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
"apprentice-electrician-roswell-appr-p74ezs.md": {
	id: "apprentice-electrician-roswell-appr-p74ezs.md";
  slug: "apprentice-electrician-roswell-appr-p74ezs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-sacramento-appr-txejdr.md": {
	id: "apprentice-electrician-sacramento-appr-txejdr.md";
  slug: "apprentice-electrician-sacramento-appr-txejdr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-san diego-appr-4xq8cz.md": {
	id: "apprentice-electrician-san diego-appr-4xq8cz.md";
  slug: "apprentice-electrician-san-diego-appr-4xq8cz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-san francisco-appr-ft3m6x.md": {
	id: "apprentice-electrician-san francisco-appr-ft3m6x.md";
  slug: "apprentice-electrician-san-francisco-appr-ft3m6x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-san jose-appr-7r2zc2.md": {
	id: "apprentice-electrician-san jose-appr-7r2zc2.md";
  slug: "apprentice-electrician-san-jose-appr-7r2zc2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-sandy springs-appr-dpocsj.md": {
	id: "apprentice-electrician-sandy springs-appr-dpocsj.md";
  slug: "apprentice-electrician-sandy-springs-appr-dpocsj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-santa clara-appr-1vb31y.md": {
	id: "apprentice-electrician-santa clara-appr-1vb31y.md";
  slug: "apprentice-electrician-santa-clara-appr-1vb31y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-santa monica-appr-4aotfk.md": {
	id: "apprentice-electrician-santa monica-appr-4aotfk.md";
  slug: "apprentice-electrician-santa-monica-appr-4aotfk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"apprentice-electrician-sunnyvale-appr-jlqgqq.md": {
	id: "apprentice-electrician-sunnyvale-appr-jlqgqq.md";
  slug: "apprentice-electrician-sunnyvale-appr-jlqgqq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-estimator-los-angeles-id-bf849320nd.md": {
	id: "avispl-av-estimator-los-angeles-id-bf849320nd.md";
  slug: "avispl-av-estimator-los-angeles-id-bf849320nd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-project-manager-burbank-bf32903f.md": {
	id: "avispl-av-project-manager-burbank-bf32903f.md";
  slug: "avispl-av-project-manager-burbank-bf32903f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-project-manager-los-angles-id-bf84920nf.md": {
	id: "avispl-av-project-manager-los-angles-id-bf84920nf.md";
  slug: "avispl-av-project-manager-los-angles-id-bf84920nf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-technician-broomfield-av-t-46s0pf.md": {
	id: "avispl-av-technician-broomfield-av-t-46s0pf.md";
  slug: "avispl-av-technician-broomfield-av-t-46s0pf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-technician-chandler-av-t-4j45h3.md": {
	id: "avispl-av-technician-chandler-av-t-4j45h3.md";
  slug: "avispl-av-technician-chandler-av-t-4j45h3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-technician-culver-city-av-t-9cod56.md": {
	id: "avispl-av-technician-culver-city-av-t-9cod56.md";
  slug: "avispl-av-technician-culver-city-av-t-9cod56";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-av-technician-henderson-av-t-gtgxy5.md": {
	id: "avispl-av-technician-henderson-av-t-gtgxy5.md";
  slug: "avispl-av-technician-henderson-av-t-gtgxy5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-beaverton-cabl-40wo6g.md": {
	id: "avispl-cable-tech-lead-beaverton-cabl-40wo6g.md";
  slug: "avispl-cable-tech-lead-beaverton-cabl-40wo6g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-burlingame-cabl-en283u.md": {
	id: "avispl-cable-tech-lead-burlingame-cabl-en283u.md";
  slug: "avispl-cable-tech-lead-burlingame-cabl-en283u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-del-mar-cabl-cphycc.md": {
	id: "avispl-cable-tech-lead-del-mar-cabl-cphycc.md";
  slug: "avispl-cable-tech-lead-del-mar-cabl-cphycc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-gresham-cabl-zp9p4r.md": {
	id: "avispl-cable-tech-lead-gresham-cabl-zp9p4r.md";
  slug: "avispl-cable-tech-lead-gresham-cabl-zp9p4r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-lake-oswego-cabl-u2kulh.md": {
	id: "avispl-cable-tech-lead-lake-oswego-cabl-u2kulh.md";
  slug: "avispl-cable-tech-lead-lake-oswego-cabl-u2kulh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-mesa-cabl-bribo9.md": {
	id: "avispl-cable-tech-lead-mesa-cabl-bribo9.md";
  slug: "avispl-cable-tech-lead-mesa-cabl-bribo9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-millbrae-cabl-eud0aj.md": {
	id: "avispl-cable-tech-lead-millbrae-cabl-eud0aj.md";
  slug: "avispl-cable-tech-lead-millbrae-cabl-eud0aj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-cable-tech-lead-tempe-cabl-54taog.md": {
	id: "avispl-cable-tech-lead-tempe-cabl-54taog.md";
  slug: "avispl-cable-tech-lead-tempe-cabl-54taog";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-commercial-project-manager-pacifica-comm-vw114m.md": {
	id: "avispl-commercial-project-manager-pacifica-comm-vw114m.md";
  slug: "avispl-commercial-project-manager-pacifica-comm-vw114m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu.md": {
	id: "avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu.md";
  slug: "avispl-fire-alarm-installer-low-voltage-alameda-fire-1l46wu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx.md": {
	id: "avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx.md";
  slug: "avispl-fire-alarm-installer-low-voltage-arvada-fire-mw7qyx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp.md": {
	id: "avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp.md";
  slug: "avispl-fire-alarm-installer-low-voltage-bellevue-fire-6kjhgp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5.md": {
	id: "avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5.md";
  slug: "avispl-fire-alarm-installer-low-voltage-edmonds-fire-ggstl5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6.md": {
	id: "avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6.md";
  slug: "avispl-fire-alarm-installer-low-voltage-la-jolla-fire-kv3vx6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf.md": {
	id: "avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf.md";
  slug: "avispl-fire-alarm-installer-low-voltage-renton-fire-hcvuqf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc.md": {
	id: "avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc.md";
  slug: "avispl-fire-alarm-installer-low-voltage-sausalito-fire-8rynsc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0.md": {
	id: "avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0.md";
  slug: "avispl-fire-alarm-installer-low-voltage-scottsdale-fire-wywri0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-boulder-low--htifhg.md": {
	id: "avispl-low-voltage-security-installer-boulder-low--htifhg.md";
  slug: "avispl-low-voltage-security-installer-boulder-low--htifhg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-coronado-low--t9v3vx.md": {
	id: "avispl-low-voltage-security-installer-coronado-low--t9v3vx.md";
  slug: "avispl-low-voltage-security-installer-coronado-low--t9v3vx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-fremont-low--h5ljv6.md": {
	id: "avispl-low-voltage-security-installer-fremont-low--h5ljv6.md";
  slug: "avispl-low-voltage-security-installer-fremont-low--h5ljv6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-kirkland-low--fjva79.md": {
	id: "avispl-low-voltage-security-installer-kirkland-low--fjva79.md";
  slug: "avispl-low-voltage-security-installer-kirkland-low--fjva79";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3.md": {
	id: "avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3.md";
  slug: "avispl-low-voltage-security-installer-manhattan-beach-low--sawrh3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-pasadena-low--n7025p.md": {
	id: "avispl-low-voltage-security-installer-pasadena-low--n7025p.md";
  slug: "avispl-low-voltage-security-installer-pasadena-low--n7025p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"avispl-low-voltage-security-installer-sandy-low--0dmhth.md": {
	id: "avispl-low-voltage-security-installer-sandy-low--0dmhth.md";
  slug: "avispl-low-voltage-security-installer-sandy-low--0dmhth";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2.md": {
	id: "barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2.md";
  slug: "barry-bros-security-fire-alarm-project-manager-oxnard-barrk7dhi2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"barry-bros-security-junior-project-manager-portland-barr54u8qe.md": {
	id: "barry-bros-security-junior-project-manager-portland-barr54u8qe.md";
  slug: "barry-bros-security-junior-project-manager-portland-barr54u8qe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2.md": {
	id: "barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2.md";
  slug: "barry-bros-security-security-alarm-project-manager-moreno-valley-barrro6ch2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"barry-bros-security-security-alarm-project-manager-provo-barr2qyat7.md": {
	id: "barry-bros-security-security-alarm-project-manager-provo-barr2qyat7.md";
  slug: "barry-bros-security-security-alarm-project-manager-provo-barr2qyat7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"barry-bros-security-security-project-manager-chula-vista-barrshzf6g.md": {
	id: "barry-bros-security-security-project-manager-chula-vista-barrshzf6g.md";
  slug: "barry-bros-security-security-project-manager-chula-vista-barrshzf6g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-columbus-audi-6ibaj5.md": {
	id: "blackbox-audio-visual-technician-columbus-audi-6ibaj5.md";
  slug: "blackbox-audio-visual-technician-columbus-audi-6ibaj5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-las-vegas-audi-33ml4e.md": {
	id: "blackbox-audio-visual-technician-las-vegas-audi-33ml4e.md";
  slug: "blackbox-audio-visual-technician-las-vegas-audi-33ml4e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-nashville-audi-y8df46.md": {
	id: "blackbox-audio-visual-technician-nashville-audi-y8df46.md";
  slug: "blackbox-audio-visual-technician-nashville-audi-y8df46";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7.md": {
	id: "blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7.md";
  slug: "blackbox-audio-visual-technician-salt-lake-city-audi-39xoe7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-charlotte-fire-x8aymx.md": {
	id: "blackbox-fire-alarm-installer-charlotte-fire-x8aymx.md";
  slug: "blackbox-fire-alarm-installer-charlotte-fire-x8aymx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-orlando-fire-jmyakz.md": {
	id: "blackbox-fire-alarm-installer-orlando-fire-jmyakz.md";
  slug: "blackbox-fire-alarm-installer-orlando-fire-jmyakz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-fire-alarm-installer-phoenix-fire-qx2shh.md": {
	id: "blackbox-fire-alarm-installer-phoenix-fire-qx2shh.md";
  slug: "blackbox-fire-alarm-installer-phoenix-fire-qx2shh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-bellevue-secu-giml18.md": {
	id: "blackbox-security-alarm-installer-bellevue-secu-giml18.md";
  slug: "blackbox-security-alarm-installer-bellevue-secu-giml18";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-frisco-secu-3z03lt.md": {
	id: "blackbox-security-alarm-installer-frisco-secu-3z03lt.md";
  slug: "blackbox-security-alarm-installer-frisco-secu-3z03lt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-miami-secu-jar8e4.md": {
	id: "blackbox-security-alarm-installer-miami-secu-jar8e4.md";
  slug: "blackbox-security-alarm-installer-miami-secu-jar8e4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-security-alarm-installer-nashville-secu-it36sm.md": {
	id: "blackbox-security-alarm-installer-nashville-secu-it36sm.md";
  slug: "blackbox-security-alarm-installer-nashville-secu-it36sm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-austin-voic-k9he4v.md": {
	id: "blackbox-voice-&-data-cable-technician-austin-voic-k9he4v.md";
  slug: "blackbox-voice--data-cable-technician-austin-voic-k9he4v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-boise-voic-g5pqeq.md": {
	id: "blackbox-voice-&-data-cable-technician-boise-voic-g5pqeq.md";
  slug: "blackbox-voice--data-cable-technician-boise-voic-g5pqeq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-denver-voic-g2cjy1.md": {
	id: "blackbox-voice-&-data-cable-technician-denver-voic-g2cjy1.md";
  slug: "blackbox-voice--data-cable-technician-denver-voic-g2cjy1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"blackbox-voice-&-data-cable-technician-raleigh-voic-f7nfqj.md": {
	id: "blackbox-voice-&-data-cable-technician-raleigh-voic-f7nfqj.md";
  slug: "blackbox-voice--data-cable-technician-raleigh-voic-f7nfqj";
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
"commercial-journeyman-electrician-alpharetta-comm-lr1rtm.md": {
	id: "commercial-journeyman-electrician-alpharetta-comm-lr1rtm.md";
  slug: "commercial-journeyman-electrician-alpharetta-comm-lr1rtm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-anaheim-comm-7hxhf1.md": {
	id: "commercial-journeyman-electrician-anaheim-comm-7hxhf1.md";
  slug: "commercial-journeyman-electrician-anaheim-comm-7hxhf1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-atlanta-comm-9hg6ru.md": {
	id: "commercial-journeyman-electrician-atlanta-comm-9hg6ru.md";
  slug: "commercial-journeyman-electrician-atlanta-comm-9hg6ru";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-berkeley-comm-e9p1bv.md": {
	id: "commercial-journeyman-electrician-berkeley-comm-e9p1bv.md";
  slug: "commercial-journeyman-electrician-berkeley-comm-e9p1bv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-burbank-comm-duwqk9.md": {
	id: "commercial-journeyman-electrician-burbank-comm-duwqk9.md";
  slug: "commercial-journeyman-electrician-burbank-comm-duwqk9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-cupertino-comm-rx7myn.md": {
	id: "commercial-journeyman-electrician-cupertino-comm-rx7myn.md";
  slug: "commercial-journeyman-electrician-cupertino-comm-rx7myn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-fremont-comm-qycvky.md": {
	id: "commercial-journeyman-electrician-fremont-comm-qycvky.md";
  slug: "commercial-journeyman-electrician-fremont-comm-qycvky";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-glendale-comm-xi1e1k.md": {
	id: "commercial-journeyman-electrician-glendale-comm-xi1e1k.md";
  slug: "commercial-journeyman-electrician-glendale-comm-xi1e1k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-irvine-comm-c46x4f.md": {
	id: "commercial-journeyman-electrician-irvine-comm-c46x4f.md";
  slug: "commercial-journeyman-electrician-irvine-comm-c46x4f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-long beach-comm-i7qr6i.md": {
	id: "commercial-journeyman-electrician-long beach-comm-i7qr6i.md";
  slug: "commercial-journeyman-electrician-long-beach-comm-i7qr6i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-los angeles-comm-02tri4.md": {
	id: "commercial-journeyman-electrician-los angeles-comm-02tri4.md";
  slug: "commercial-journeyman-electrician-los-angeles-comm-02tri4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-marietta-comm-ee453v.md": {
	id: "commercial-journeyman-electrician-marietta-comm-ee453v.md";
  slug: "commercial-journeyman-electrician-marietta-comm-ee453v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-mountain view-comm-nf9wjw.md": {
	id: "commercial-journeyman-electrician-mountain view-comm-nf9wjw.md";
  slug: "commercial-journeyman-electrician-mountain-view-comm-nf9wjw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-oakland-comm-zg2pdk.md": {
	id: "commercial-journeyman-electrician-oakland-comm-zg2pdk.md";
  slug: "commercial-journeyman-electrician-oakland-comm-zg2pdk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-palo alto-comm-owihv0.md": {
	id: "commercial-journeyman-electrician-palo alto-comm-owihv0.md";
  slug: "commercial-journeyman-electrician-palo-alto-comm-owihv0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-pasadena-comm-0zowho.md": {
	id: "commercial-journeyman-electrician-pasadena-comm-0zowho.md";
  slug: "commercial-journeyman-electrician-pasadena-comm-0zowho";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-roswell-comm-helr0n.md": {
	id: "commercial-journeyman-electrician-roswell-comm-helr0n.md";
  slug: "commercial-journeyman-electrician-roswell-comm-helr0n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sacramento-comm-9tfxpk.md": {
	id: "commercial-journeyman-electrician-sacramento-comm-9tfxpk.md";
  slug: "commercial-journeyman-electrician-sacramento-comm-9tfxpk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san diego-comm-q3n6ne.md": {
	id: "commercial-journeyman-electrician-san diego-comm-q3n6ne.md";
  slug: "commercial-journeyman-electrician-san-diego-comm-q3n6ne";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san francisco-comm-ur4rln.md": {
	id: "commercial-journeyman-electrician-san francisco-comm-ur4rln.md";
  slug: "commercial-journeyman-electrician-san-francisco-comm-ur4rln";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-san jose-comm-6wge7s.md": {
	id: "commercial-journeyman-electrician-san jose-comm-6wge7s.md";
  slug: "commercial-journeyman-electrician-san-jose-comm-6wge7s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sandy springs-comm-hehasc.md": {
	id: "commercial-journeyman-electrician-sandy springs-comm-hehasc.md";
  slug: "commercial-journeyman-electrician-sandy-springs-comm-hehasc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-santa clara-comm-2iakbj.md": {
	id: "commercial-journeyman-electrician-santa clara-comm-2iakbj.md";
  slug: "commercial-journeyman-electrician-santa-clara-comm-2iakbj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-santa monica-comm-5mfjew.md": {
	id: "commercial-journeyman-electrician-santa monica-comm-5mfjew.md";
  slug: "commercial-journeyman-electrician-santa-monica-comm-5mfjew";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"commercial-journeyman-electrician-sunnyvale-comm-mqr65w.md": {
	id: "commercial-journeyman-electrician-sunnyvale-comm-mqr65w.md";
  slug: "commercial-journeyman-electrician-sunnyvale-comm-mqr65w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-av-systems-tech-dallas-convtvq4t9.md": {
	id: "convergint-av-systems-tech-dallas-convtvq4t9.md";
  slug: "convergint-av-systems-tech-dallas-convtvq4t9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-av-systems-tech-kansas-city-conv8kmegf.md": {
	id: "convergint-av-systems-tech-kansas-city-conv8kmegf.md";
  slug: "convergint-av-systems-tech-kansas-city-conv8kmegf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-chico-conv4c3rmt.md": {
	id: "convergint-cable-technician-chico-conv4c3rmt.md";
  slug: "convergint-cable-technician-chico-conv4c3rmt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-eureka-convp5ci7v.md": {
	id: "convergint-cable-technician-eureka-convp5ci7v.md";
  slug: "convergint-cable-technician-eureka-convp5ci7v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-falls-church-convjkjkxw.md": {
	id: "convergint-cable-technician-falls-church-convjkjkxw.md";
  slug: "convergint-cable-technician-falls-church-convjkjkxw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-gainesville-convwrs76a.md": {
	id: "convergint-cable-technician-gainesville-convwrs76a.md";
  slug: "convergint-cable-technician-gainesville-convwrs76a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-raleigh-conv0owjw7.md": {
	id: "convergint-cable-technician-raleigh-conv0owjw7.md";
  slug: "convergint-cable-technician-raleigh-conv0owjw7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-cable-technician-san-bernardino-convuxgzd6.md": {
	id: "convergint-cable-technician-san-bernardino-convuxgzd6.md";
  slug: "convergint-cable-technician-san-bernardino-convuxgzd6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-data-center-cable-tech-indianapolis-convycmy0b.md": {
	id: "convergint-data-center-cable-tech-indianapolis-convycmy0b.md";
  slug: "convergint-data-center-cable-tech-indianapolis-convycmy0b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-data-center-cable-tech-pleasant-hill-conv2hj16r.md": {
	id: "convergint-data-center-cable-tech-pleasant-hill-conv2hj16r.md";
  slug: "convergint-data-center-cable-tech-pleasant-hill-conv2hj16r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-data-center-technician-lafayette-convc29p3z.md": {
	id: "convergint-data-center-technician-lafayette-convc29p3z.md";
  slug: "convergint-data-center-technician-lafayette-convc29p3z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-electrical-project-manager-san-bernardino-conv3umy5p.md": {
	id: "convergint-electrical-project-manager-san-bernardino-conv3umy5p.md";
  slug: "convergint-electrical-project-manager-san-bernardino-conv3umy5p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-fire-alarm-designer-west-jordan-convjm5udi.md": {
	id: "convergint-fire-alarm-designer-west-jordan-convjm5udi.md";
  slug: "convergint-fire-alarm-designer-west-jordan-convjm5udi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-larkspur-conv39fsbk.md": {
	id: "convergint-fire-alarm-tech-larkspur-conv39fsbk.md";
  slug: "convergint-fire-alarm-tech-larkspur-conv39fsbk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-marina-del-rey-convbvdsmf.md": {
	id: "convergint-fire-alarm-tech-marina-del-rey-convbvdsmf.md";
  slug: "convergint-fire-alarm-tech-marina-del-rey-convbvdsmf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-mission-viejo-conv3jj8qj.md": {
	id: "convergint-fire-alarm-tech-mission-viejo-conv3jj8qj.md";
  slug: "convergint-fire-alarm-tech-mission-viejo-conv3jj8qj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-fire-alarm-tech-san-ramon-conv96ivzu.md": {
	id: "convergint-fire-alarm-tech-san-ramon-conv96ivzu.md";
  slug: "convergint-fire-alarm-tech-san-ramon-conv96ivzu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-junior-project-manager-los-angeles-convdvrh97.md": {
	id: "convergint-junior-project-manager-los-angeles-convdvrh97.md";
  slug: "convergint-junior-project-manager-los-angeles-convdvrh97";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-junior-project-manager-phoenix-convx3uvcw.md": {
	id: "convergint-junior-project-manager-phoenix-convx3uvcw.md";
  slug: "convergint-junior-project-manager-phoenix-convx3uvcw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-low-voltage-cable-technician-midlothian-convb0f0u9.md": {
	id: "convergint-low-voltage-cable-technician-midlothian-convb0f0u9.md";
  slug: "convergint-low-voltage-cable-technician-midlothian-convb0f0u9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-fontana-conv59o49i.md": {
	id: "convergint-security-alarm-project-manager-fontana-conv59o49i.md";
  slug: "convergint-security-alarm-project-manager-fontana-conv59o49i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-oakland-convl2d1mo.md": {
	id: "convergint-security-alarm-project-manager-oakland-convl2d1mo.md";
  slug: "convergint-security-alarm-project-manager-oakland-convl2d1mo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-alarm-project-manager-tucson-convrx1fwm.md": {
	id: "convergint-security-alarm-project-manager-tucson-convrx1fwm.md";
  slug: "convergint-security-alarm-project-manager-tucson-convrx1fwm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-project-manager-glendale-convr45orl.md": {
	id: "convergint-security-project-manager-glendale-convr45orl.md";
  slug: "convergint-security-project-manager-glendale-convr45orl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-project-manager-sacramento-convgr3gwz.md": {
	id: "convergint-security-project-manager-sacramento-convgr3gwz.md";
  slug: "convergint-security-project-manager-sacramento-convgr3gwz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-systems-tech-milwaukee-convcipwqw.md": {
	id: "convergint-security-systems-tech-milwaukee-convcipwqw.md";
  slug: "convergint-security-systems-tech-milwaukee-convcipwqw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-technician-berkeley-conv00dmcl.md": {
	id: "convergint-security-technician-berkeley-conv00dmcl.md";
  slug: "convergint-security-technician-berkeley-conv00dmcl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"convergint-security-technician-palm-springs-convey6q50.md": {
	id: "convergint-security-technician-palm-springs-convey6q50.md";
  slug: "convergint-security-technician-palm-springs-convey6q50";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg.md": {
	id: "crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg.md";
  slug: "crosby-electric-audio-visual-technician-twin-falls-cros0m0eeg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-av-technician-detroit-crosa437g4.md": {
	id: "crosby-electric-av-technician-detroit-crosa437g4.md";
  slug: "crosby-electric-av-technician-detroit-crosa437g4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-cable-installer-macon-crosttn01d.md": {
	id: "crosby-electric-cable-installer-macon-crosttn01d.md";
  slug: "crosby-electric-cable-installer-macon-crosttn01d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-cable-installer-rock-hill-crosf38xyk.md": {
	id: "crosby-electric-cable-installer-rock-hill-crosf38xyk.md";
  slug: "crosby-electric-cable-installer-rock-hill-crosf38xyk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-cable-technician-philadelphia-crosfym7c9.md": {
	id: "crosby-electric-cable-technician-philadelphia-crosfym7c9.md";
  slug: "crosby-electric-cable-technician-philadelphia-crosfym7c9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-houston-cros32g0bf.md": {
	id: "crosby-electric-commercial-electrician-houston-cros32g0bf.md";
  slug: "crosby-electric-commercial-electrician-houston-cros32g0bf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-houston-crosjjzxbi.md": {
	id: "crosby-electric-commercial-electrician-houston-crosjjzxbi.md";
  slug: "crosby-electric-commercial-electrician-houston-crosjjzxbi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-commercial-electrician-new-york-city-crosmdcm1w.md": {
	id: "crosby-electric-commercial-electrician-new-york-city-crosmdcm1w.md";
  slug: "crosby-electric-commercial-electrician-new-york-city-crosmdcm1w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-glendale-cros6c0pt9.md": {
	id: "crosby-electric-controls-engineer-glendale-cros6c0pt9.md";
  slug: "crosby-electric-controls-engineer-glendale-cros6c0pt9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-sacramento-cros36gpho.md": {
	id: "crosby-electric-controls-engineer-sacramento-cros36gpho.md";
  slug: "crosby-electric-controls-engineer-sacramento-cros36gpho";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-controls-engineer-san-antonio-crosg4g7f8.md": {
	id: "crosby-electric-controls-engineer-san-antonio-crosg4g7f8.md";
  slug: "crosby-electric-controls-engineer-san-antonio-crosg4g7f8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-electrical-apprentice-waco-cros5qylwx.md": {
	id: "crosby-electric-electrical-apprentice-waco-cros5qylwx.md";
  slug: "crosby-electric-electrical-apprentice-waco-cros5qylwx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-fire-alarm-technician-buffalo-crosbe59d5.md": {
	id: "crosby-electric-fire-alarm-technician-buffalo-crosbe59d5.md";
  slug: "crosby-electric-fire-alarm-technician-buffalo-crosbe59d5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-industrial-electrician-boston-cros0nsybd.md": {
	id: "crosby-electric-industrial-electrician-boston-cros0nsybd.md";
  slug: "crosby-electric-industrial-electrician-boston-cros0nsybd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z.md": {
	id: "crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z.md";
  slug: "crosby-electric-industrial-journeyman-electrician-annapolis-crosrl4z6z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-charlotte-crosc8nmib.md": {
	id: "crosby-electric-residential-electrician-charlotte-crosc8nmib.md";
  slug: "crosby-electric-residential-electrician-charlotte-crosc8nmib";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-residential-electrician-st.-louis-crospxsxqv.md": {
	id: "crosby-electric-residential-electrician-st.-louis-crospxsxqv.md";
  slug: "crosby-electric-residential-electrician-st-louis-crospxsxqv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-residential-solar-installer-charleston-cros809bvf.md": {
	id: "crosby-electric-residential-solar-installer-charleston-cros809bvf.md";
  slug: "crosby-electric-residential-solar-installer-charleston-cros809bvf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"crosby-electric-security-technician-virginia-beach-crosxepplz.md": {
	id: "crosby-electric-security-technician-virginia-beach-crosxepplz.md";
  slug: "crosby-electric-security-technician-virginia-beach-crosxepplz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"electrician-premiere-roswell-id-be8942.md": {
	id: "electrician-premiere-roswell-id-be8942.md";
  slug: "electrician-premiere-roswell-id-be8942";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"expert-wire-apprentice-electrician-newark-expe920yqo.md": {
	id: "expert-wire-apprentice-electrician-newark-expe920yqo.md";
  slug: "expert-wire-apprentice-electrician-newark-expe920yqo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"expert-wire-commercial-electrician-durham-expe7fsg53.md": {
	id: "expert-wire-commercial-electrician-durham-expe7fsg53.md";
  slug: "expert-wire-commercial-electrician-durham-expe7fsg53";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"expert-wire-commercial-electrician-pflugerville-expeahp9sg.md": {
	id: "expert-wire-commercial-electrician-pflugerville-expeahp9sg.md";
  slug: "expert-wire-commercial-electrician-pflugerville-expeahp9sg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"expert-wire-security-technician-franklin-expeusv2g6.md": {
	id: "expert-wire-security-technician-franklin-expeusv2g6.md";
  slug: "expert-wire-security-technician-franklin-expeusv2g6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8.md": {
	id: "faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8.md";
  slug: "faith-technologies-apprentice-electrician-fayetteville-fait8ccnw8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-commercial-master-electrician-newark-faitd0wshz.md": {
	id: "faith-technologies-commercial-master-electrician-newark-faitd0wshz.md";
  slug: "faith-technologies-commercial-master-electrician-newark-faitd0wshz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz.md": {
	id: "faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz.md";
  slug: "faith-technologies-healthcare-journeyman-electrician-charleston-fait8sjzhz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-healthcare-master-electrician-springfield-faitlufg7y.md": {
	id: "faith-technologies-healthcare-master-electrician-springfield-faitlufg7y.md";
  slug: "faith-technologies-healthcare-master-electrician-springfield-faitlufg7y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-flint-faitq2nr8e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-huntsville-fait20l4um";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g.md": {
	id: "faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g.md";
  slug: "faith-technologies-maintenance-apprentice-electrician-mobile-fait6mye0g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-columbia-faito4bj6c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-greenville-faituk0mow";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk.md": {
	id: "faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk.md";
  slug: "faith-technologies-manufacturing-apprentice-electrician-wilmington-faiteg6yuk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3.md": {
	id: "faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3.md";
  slug: "faith-technologies-manufacturing-journeyman-electrician-virginia-beach-faitnxgpk3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6.md": {
	id: "faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6.md";
  slug: "faith-technologies-multi-family-controls-electrician-rochester-faito8lgf6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv.md": {
	id: "faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv.md";
  slug: "faith-technologies-multi-family-master-electrician-chattanooga-faitlwhitv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9.md": {
	id: "faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9.md";
  slug: "faith-technologies-pv-system-controls-electrician-lynchburg-faitd41sf9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-pv-system-master-electrician-buffalo-faitff7hem.md": {
	id: "faith-technologies-pv-system-master-electrician-buffalo-faitff7hem.md";
  slug: "faith-technologies-pv-system-master-electrician-buffalo-faitff7hem";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0.md": {
	id: "faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0.md";
  slug: "faith-technologies-renewable-energy-journeyman-electrician-bridgeport-faitbbavn0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-repair-controls-electrician-richmond-fait1e89ui.md": {
	id: "faith-technologies-repair-controls-electrician-richmond-fait1e89ui.md";
  slug: "faith-technologies-repair-controls-electrician-richmond-fait1e89ui";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-residential-controls-electrician-binghamton-faitimjecn.md": {
	id: "faith-technologies-residential-controls-electrician-binghamton-faitimjecn.md";
  slug: "faith-technologies-residential-controls-electrician-binghamton-faitimjecn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-service-apprentice-electrician-gary-faitdz6nfh.md": {
	id: "faith-technologies-service-apprentice-electrician-gary-faitdz6nfh.md";
  slug: "faith-technologies-service-apprentice-electrician-gary-faitdz6nfh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs.md": {
	id: "faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs.md";
  slug: "faith-technologies-service-apprentice-electrician-roanoke-faithqfjcs";
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
"granite-state-electric-audio-visual-technician-providence-granf76hpn.md": {
	id: "granite-state-electric-audio-visual-technician-providence-granf76hpn.md";
  slug: "granite-state-electric-audio-visual-technician-providence-granf76hpn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p.md": {
	id: "granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p.md";
  slug: "granite-state-electric-fire-alarm-technician-kansas-city-gran8u8t5p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u.md": {
	id: "granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u.md";
  slug: "granite-state-electric-industrial-journeyman-electrician-cleveland-gran9tiq4u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-residential-solar-installer-tulsa-gran706wot.md": {
	id: "granite-state-electric-residential-solar-installer-tulsa-gran706wot.md";
  slug: "granite-state-electric-residential-solar-installer-tulsa-gran706wot";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-security-technician-asheville-granjv277p.md": {
	id: "granite-state-electric-security-technician-asheville-granjv277p.md";
  slug: "granite-state-electric-security-technician-asheville-granjv277p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-security-technician-pittsburgh-grant0042o.md": {
	id: "granite-state-electric-security-technician-pittsburgh-grant0042o.md";
  slug: "granite-state-electric-security-technician-pittsburgh-grant0042o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"granite-state-electric-voice-data-installer-marietta-granghewzg.md": {
	id: "granite-state-electric-voice-data-installer-marietta-granghewzg.md";
  slug: "granite-state-electric-voice-data-installer-marietta-granghewzg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-bakersfield-sola-qd6940.md": {
	id: "greenskies-solar-panel-installer-bakersfield-sola-qd6940.md";
  slug: "greenskies-solar-panel-installer-bakersfield-sola-qd6940";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-blythe-sola-fm2v5u.md": {
	id: "greenskies-solar-panel-installer-blythe-sola-fm2v5u.md";
  slug: "greenskies-solar-panel-installer-blythe-sola-fm2v5u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-boulder-city-sola-liiq7a.md": {
	id: "greenskies-solar-panel-installer-boulder-city-sola-liiq7a.md";
  slug: "greenskies-solar-panel-installer-boulder-city-sola-liiq7a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-casa-grande-sola-k67uvp.md": {
	id: "greenskies-solar-panel-installer-casa-grande-sola-k67uvp.md";
  slug: "greenskies-solar-panel-installer-casa-grande-sola-k67uvp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-deming-sola-muy5t7.md": {
	id: "greenskies-solar-panel-installer-deming-sola-muy5t7.md";
  slug: "greenskies-solar-panel-installer-deming-sola-muy5t7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-desert-center-sola-mzrqcn.md": {
	id: "greenskies-solar-panel-installer-desert-center-sola-mzrqcn.md";
  slug: "greenskies-solar-panel-installer-desert-center-sola-mzrqcn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-el-centro-sola-8ktz51.md": {
	id: "greenskies-solar-panel-installer-el-centro-sola-8ktz51.md";
  slug: "greenskies-solar-panel-installer-el-centro-sola-8ktz51";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-gila-bend-sola-7yrg42.md": {
	id: "greenskies-solar-panel-installer-gila-bend-sola-7yrg42.md";
  slug: "greenskies-solar-panel-installer-gila-bend-sola-7yrg42";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-hatch-sola-emi3sq.md": {
	id: "greenskies-solar-panel-installer-hatch-sola-emi3sq.md";
  slug: "greenskies-solar-panel-installer-hatch-sola-emi3sq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-lancaster-sola-5e0dly.md": {
	id: "greenskies-solar-panel-installer-lancaster-sola-5e0dly.md";
  slug: "greenskies-solar-panel-installer-lancaster-sola-5e0dly";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-las-vegas-sola-s23p2z.md": {
	id: "greenskies-solar-panel-installer-las-vegas-sola-s23p2z.md";
  slug: "greenskies-solar-panel-installer-las-vegas-sola-s23p2z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-palm-springs-sola-t3sge8.md": {
	id: "greenskies-solar-panel-installer-palm-springs-sola-t3sge8.md";
  slug: "greenskies-solar-panel-installer-palm-springs-sola-t3sge8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-phoenix-sola-47qylq.md": {
	id: "greenskies-solar-panel-installer-phoenix-sola-47qylq.md";
  slug: "greenskies-solar-panel-installer-phoenix-sola-47qylq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-pueblo-sola-nn3meq.md": {
	id: "greenskies-solar-panel-installer-pueblo-sola-nn3meq.md";
  slug: "greenskies-solar-panel-installer-pueblo-sola-nn3meq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-rosamond-sola-0sy84w.md": {
	id: "greenskies-solar-panel-installer-rosamond-sola-0sy84w.md";
  slug: "greenskies-solar-panel-installer-rosamond-sola-0sy84w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-san-antonio-sola-hbudm4.md": {
	id: "greenskies-solar-panel-installer-san-antonio-sola-hbudm4.md";
  slug: "greenskies-solar-panel-installer-san-antonio-sola-hbudm4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"greenskies-solar-panel-installer-tonopah-sola-1hgs05.md": {
	id: "greenskies-solar-panel-installer-tonopah-sola-1hgs05.md";
  slug: "greenskies-solar-panel-installer-tonopah-sola-1hgs05";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"h-&-a-electric-apprentice-electrician-mount-pleasant-h&bhja2s.md": {
	id: "h-&-a-electric-apprentice-electrician-mount-pleasant-h&bhja2s.md";
  slug: "h--a-electric-apprentice-electrician-mount-pleasant-hbhja2s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"h-&-a-electric-data-center-technician-johns-creek-h&knxekt.md": {
	id: "h-&-a-electric-data-center-technician-johns-creek-h&knxekt.md";
  slug: "h--a-electric-data-center-technician-johns-creek-hknxekt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"h-&-a-electric-security-technician-round-rock-h&xa17r5.md": {
	id: "h-&-a-electric-security-technician-round-rock-h&xa17r5.md";
  slug: "h--a-electric-security-technician-round-rock-hxa17r5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-av-systems-tech-omaha-hcii5mgbn.md": {
	id: "hci-systems-av-systems-tech-omaha-hcii5mgbn.md";
  slug: "hci-systems-av-systems-tech-omaha-hcii5mgbn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-cable-tech-anaheim-hciix6rnn.md": {
	id: "hci-systems-cable-tech-anaheim-hciix6rnn.md";
  slug: "hci-systems-cable-tech-anaheim-hciix6rnn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-cable-technician-kennesaw-hcik6cewt.md": {
	id: "hci-systems-cable-technician-kennesaw-hcik6cewt.md";
  slug: "hci-systems-cable-technician-kennesaw-hcik6cewt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-cable-technician-richmond-hcia3kr1u.md": {
	id: "hci-systems-cable-technician-richmond-hcia3kr1u.md";
  slug: "hci-systems-cable-technician-richmond-hcia3kr1u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-cable-technician-riverside-hcizzwtbq.md": {
	id: "hci-systems-cable-technician-riverside-hcizzwtbq.md";
  slug: "hci-systems-cable-technician-riverside-hcizzwtbq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e.md": {
	id: "hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e.md";
  slug: "hci-systems-data-center-cable-tech-fountain-valley-hcipbhl6e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-data-center-technician-fort-collins-hcib08dty.md": {
	id: "hci-systems-data-center-technician-fort-collins-hcib08dty.md";
  slug: "hci-systems-data-center-technician-fort-collins-hcib08dty";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-fire-alarm-tech-denver-hcipqjlhi.md": {
	id: "hci-systems-fire-alarm-tech-denver-hcipqjlhi.md";
  slug: "hci-systems-fire-alarm-tech-denver-hcipqjlhi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5.md": {
	id: "hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5.md";
  slug: "hci-systems-low-voltage-cable-technician-glen-allen-hciu8vsp5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-residential-solar-installer-roanoke-hci9q3ro3.md": {
	id: "hci-systems-residential-solar-installer-roanoke-hci9q3ro3.md";
  slug: "hci-systems-residential-solar-installer-roanoke-hci9q3ro3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-security-systems-tech-mill-valley-hcimeu8nb.md": {
	id: "hci-systems-security-systems-tech-mill-valley-hcimeu8nb.md";
  slug: "hci-systems-security-systems-tech-mill-valley-hcimeu8nb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-security-technician-calabasas-hcifg6z5h.md": {
	id: "hci-systems-security-technician-calabasas-hcifg6z5h.md";
  slug: "hci-systems-security-technician-calabasas-hcifg6z5h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-security-technician-malibu-hciifinvq.md": {
	id: "hci-systems-security-technician-malibu-hciifinvq.md";
  slug: "hci-systems-security-technician-malibu-hciifinvq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-security-technician-manhattan-beach-hcijz18uj.md": {
	id: "hci-systems-security-technician-manhattan-beach-hcijz18uj.md";
  slug: "hci-systems-security-technician-manhattan-beach-hcijz18uj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hci-systems-security-technician-san-francisco-hcim8t1fd.md": {
	id: "hci-systems-security-technician-san-francisco-hcim8t1fd.md";
  slug: "hci-systems-security-technician-san-francisco-hcim8t1fd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat.md": {
	id: "hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat.md";
  slug: "hcs-electrical-apprentice-electrician-brentwood-hcs5c2lat";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe.md": {
	id: "hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe.md";
  slug: "hcs-electrical-apprentice-electrician-mooresboro-hcs82tspe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1.md": {
	id: "hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1.md";
  slug: "hcs-electrical-apprentice-electrician-mooresville-hcsupr7b1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57.md": {
	id: "hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57.md";
  slug: "hcs-electrical-apprentice-electrician-murfreesboro-hcsccfa57";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-cable-tech-baltimore-hcswxi0t4.md": {
	id: "hcs-electrical-cable-tech-baltimore-hcswxi0t4.md";
  slug: "hcs-electrical-cable-tech-baltimore-hcswxi0t4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-cable-technician-spartanburg-hcsdyt8qj.md": {
	id: "hcs-electrical-cable-technician-spartanburg-hcsdyt8qj.md";
  slug: "hcs-electrical-cable-technician-spartanburg-hcsdyt8qj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-cable-technician-warner-robins-hcs9gpckg.md": {
	id: "hcs-electrical-cable-technician-warner-robins-hcs9gpckg.md";
  slug: "hcs-electrical-cable-technician-warner-robins-hcs9gpckg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-ashburn-hcsp7eota.md": {
	id: "hcs-electrical-commercial-electrician-ashburn-hcsp7eota.md";
  slug: "hcs-electrical-commercial-electrician-ashburn-hcsp7eota";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-dallas-hcsn18t0f.md": {
	id: "hcs-electrical-commercial-electrician-dallas-hcsn18t0f.md";
  slug: "hcs-electrical-commercial-electrician-dallas-hcsn18t0f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p.md": {
	id: "hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p.md";
  slug: "hcs-electrical-commercial-electrician-sandy-springs-hcsjbrz8p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-charlotte-hcsc46pxj.md": {
	id: "hcs-electrical-electrician-charlotte-hcsc46pxj.md";
  slug: "hcs-electrical-electrician-charlotte-hcsc46pxj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-chesapeake-hcs2ila19.md": {
	id: "hcs-electrical-electrician-chesapeake-hcs2ila19.md";
  slug: "hcs-electrical-electrician-chesapeake-hcs2ila19";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-dalton-hcswigkbz.md": {
	id: "hcs-electrical-electrician-dalton-hcswigkbz.md";
  slug: "hcs-electrical-electrician-dalton-hcswigkbz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-greensboro-hcsscxxc8.md": {
	id: "hcs-electrical-electrician-greensboro-hcsscxxc8.md";
  slug: "hcs-electrical-electrician-greensboro-hcsscxxc8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-hampstead-hcsp0br4k.md": {
	id: "hcs-electrical-electrician-hampstead-hcsp0br4k.md";
  slug: "hcs-electrical-electrician-hampstead-hcsp0br4k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-electrician-savannah-hcsch6mu8.md": {
	id: "hcs-electrical-electrician-savannah-hcsch6mu8.md";
  slug: "hcs-electrical-electrician-savannah-hcsch6mu8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"hcs-electrical-security-technician-wilmington-hcsb2474u.md": {
	id: "hcs-electrical-security-technician-wilmington-hcsb2474u.md";
  slug: "hcs-electrical-security-technician-wilmington-hcsb2474u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-apprentice-electrician-birmingham-heli20w9cd.md": {
	id: "helix-electric-apprentice-electrician-birmingham-heli20w9cd.md";
  slug: "helix-electric-apprentice-electrician-birmingham-heli20w9cd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-apprentice-electrician-dallas-heli4e9odi.md": {
	id: "helix-electric-apprentice-electrician-dallas-heli4e9odi.md";
  slug: "helix-electric-apprentice-electrician-dallas-heli4e9odi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-audio-visual-technician-norman-helinyo7vv.md": {
	id: "helix-electric-audio-visual-technician-norman-helinyo7vv.md";
  slug: "helix-electric-audio-visual-technician-norman-helinyo7vv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-automation-controls-specialist-st.-louis-helikal1n6.md": {
	id: "helix-electric-automation-controls-specialist-st.-louis-helikal1n6.md";
  slug: "helix-electric-automation-controls-specialist-st-louis-helikal1n6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-av-technician-atlanta-helij3v2xl.md": {
	id: "helix-electric-av-technician-atlanta-helij3v2xl.md";
  slug: "helix-electric-av-technician-atlanta-helij3v2xl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-tech-broomfield-helicz27b2.md": {
	id: "helix-electric-cable-tech-broomfield-helicz27b2.md";
  slug: "helix-electric-cable-tech-broomfield-helicz27b2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-tech-chicago-heliceyg2f.md": {
	id: "helix-electric-cable-tech-chicago-heliceyg2f.md";
  slug: "helix-electric-cable-tech-chicago-heliceyg2f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-tech-greenville-helict3hje.md": {
	id: "helix-electric-cable-tech-greenville-helict3hje.md";
  slug: "helix-electric-cable-tech-greenville-helict3hje";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-tech-louisville-helimr5pgz.md": {
	id: "helix-electric-cable-tech-louisville-helimr5pgz.md";
  slug: "helix-electric-cable-tech-louisville-helimr5pgz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-technician-denver-heliix0qr2.md": {
	id: "helix-electric-cable-technician-denver-heliix0qr2.md";
  slug: "helix-electric-cable-technician-denver-heliix0qr2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-technician-myrtle-beach-helirfev9q.md": {
	id: "helix-electric-cable-technician-myrtle-beach-helirfev9q.md";
  slug: "helix-electric-cable-technician-myrtle-beach-helirfev9q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-technician-raleigh-helir1a1hh.md": {
	id: "helix-electric-cable-technician-raleigh-helir1a1hh.md";
  slug: "helix-electric-cable-technician-raleigh-helir1a1hh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-cable-technician-winston-salem-helihmyuhs.md": {
	id: "helix-electric-cable-technician-winston-salem-helihmyuhs.md";
  slug: "helix-electric-cable-technician-winston-salem-helihmyuhs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-commercial-apprentice-colorado-springs-heliniy1uf.md": {
	id: "helix-electric-commercial-apprentice-colorado-springs-heliniy1uf.md";
  slug: "helix-electric-commercial-apprentice-colorado-springs-heliniy1uf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-commercial-electrician-naperville-heli6shsgd.md": {
	id: "helix-electric-commercial-electrician-naperville-heli6shsgd.md";
  slug: "helix-electric-commercial-electrician-naperville-heli6shsgd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-commercial-electrician-sterling-heli2hmntk.md": {
	id: "helix-electric-commercial-electrician-sterling-heli2hmntk.md";
  slug: "helix-electric-commercial-electrician-sterling-heli2hmntk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-controls-technician-dallas-helim8z98w.md": {
	id: "helix-electric-controls-technician-dallas-helim8z98w.md";
  slug: "helix-electric-controls-technician-dallas-helim8z98w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-boston-heliciwj7c.md": {
	id: "helix-electric-data-center-technician-boston-heliciwj7c.md";
  slug: "helix-electric-data-center-technician-boston-heliciwj7c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-chattanooga-heliu5scud.md": {
	id: "helix-electric-data-center-technician-chattanooga-heliu5scud.md";
  slug: "helix-electric-data-center-technician-chattanooga-heliu5scud";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-data-center-technician-provo-heliz139qv.md": {
	id: "helix-electric-data-center-technician-provo-heliz139qv.md";
  slug: "helix-electric-data-center-technician-provo-heliz139qv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-electrician-athens-heliolvrck.md": {
	id: "helix-electric-electrician-athens-heliolvrck.md";
  slug: "helix-electric-electrician-athens-heliolvrck";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-electrician-phoenix-heliwsqb15.md": {
	id: "helix-electric-electrician-phoenix-heliwsqb15.md";
  slug: "helix-electric-electrician-phoenix-heliwsqb15";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-electrician-salisbury-helio96bad.md": {
	id: "helix-electric-electrician-salisbury-helio96bad.md";
  slug: "helix-electric-electrician-salisbury-helio96bad";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-electrician-smyrna-helisdmq9l.md": {
	id: "helix-electric-electrician-smyrna-helisdmq9l.md";
  slug: "helix-electric-electrician-smyrna-helisdmq9l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-electrician-snyder-heliwtxb7x.md": {
	id: "helix-electric-electrician-snyder-heliwtxb7x.md";
  slug: "helix-electric-electrician-snyder-heliwtxb7x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-fiber-optics-installer-franklin-helig342hc.md": {
	id: "helix-electric-fiber-optics-installer-franklin-helig342hc.md";
  slug: "helix-electric-fiber-optics-installer-franklin-helig342hc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-fire-alarm-technician-memphis-helidv8ek4.md": {
	id: "helix-electric-fire-alarm-technician-memphis-helidv8ek4.md";
  slug: "helix-electric-fire-alarm-technician-memphis-helidv8ek4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-industrial-electrician-washington-heli9w9jbs.md": {
	id: "helix-electric-industrial-electrician-washington-heli9w9jbs.md";
  slug: "helix-electric-industrial-electrician-washington-heli9w9jbs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-bakersfield-heliih5w20.md": {
	id: "helix-electric-journeyman-electrician-bakersfield-heliih5w20.md";
  slug: "helix-electric-journeyman-electrician-bakersfield-heliih5w20";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-oxnard-helisi6oyo.md": {
	id: "helix-electric-journeyman-electrician-oxnard-helisi6oyo.md";
  slug: "helix-electric-journeyman-electrician-oxnard-helisi6oyo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-sacramento-heli356f0d.md": {
	id: "helix-electric-journeyman-electrician-sacramento-heli356f0d.md";
  slug: "helix-electric-journeyman-electrician-sacramento-heli356f0d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-san-francisco-helir1e46h.md": {
	id: "helix-electric-journeyman-electrician-san-francisco-helir1e46h.md";
  slug: "helix-electric-journeyman-electrician-san-francisco-helir1e46h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-journeyman-electrician-san-jose-heli2uc6q0.md": {
	id: "helix-electric-journeyman-electrician-san-jose-heli2uc6q0.md";
  slug: "helix-electric-journeyman-electrician-san-jose-heli2uc6q0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-process-controls-technician-atlanta-heli0vlrbl.md": {
	id: "helix-electric-process-controls-technician-atlanta-heli0vlrbl.md";
  slug: "helix-electric-process-controls-technician-atlanta-heli0vlrbl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-residential-electrician-chicago-heliutx0id.md": {
	id: "helix-electric-residential-electrician-chicago-heliutx0id.md";
  slug: "helix-electric-residential-electrician-chicago-heliutx0id";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-residential-solar-installer-aurora-heli1nn6bs.md": {
	id: "helix-electric-residential-solar-installer-aurora-heli1nn6bs.md";
  slug: "helix-electric-residential-solar-installer-aurora-heli1nn6bs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-security-technician-columbus-heli9mbxz5.md": {
	id: "helix-electric-security-technician-columbus-heli9mbxz5.md";
  slug: "helix-electric-security-technician-columbus-heli9mbxz5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-security-technician-denver-helitxj3wi.md": {
	id: "helix-electric-security-technician-denver-helitxj3wi.md";
  slug: "helix-electric-security-technician-denver-helitxj3wi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-security-technician-san-antonio-heliwiname.md": {
	id: "helix-electric-security-technician-san-antonio-heliwiname.md";
  slug: "helix-electric-security-technician-san-antonio-heliwiname";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"helix-electric-voice-data-installer-myrtle-beach-helisy4sc0.md": {
	id: "helix-electric-voice-data-installer-myrtle-beach-helisy4sc0.md";
  slug: "helix-electric-voice-data-installer-myrtle-beach-helisy4sc0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-alexandria-highed12ax.md": {
	id: "high-point-networks-cable-technician-alexandria-highed12ax.md";
  slug: "high-point-networks-cable-technician-alexandria-highed12ax";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-denver-highkdwgl7.md": {
	id: "high-point-networks-cable-technician-denver-highkdwgl7.md";
  slug: "high-point-networks-cable-technician-denver-highkdwgl7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-lakewood-highn4rpmb.md": {
	id: "high-point-networks-cable-technician-lakewood-highn4rpmb.md";
  slug: "high-point-networks-cable-technician-lakewood-highn4rpmb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-rock-springs-highi52b3a.md": {
	id: "high-point-networks-cable-technician-rock-springs-highi52b3a.md";
  slug: "high-point-networks-cable-technician-rock-springs-highi52b3a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-cable-technician-woodstock-highhkqq19.md": {
	id: "high-point-networks-cable-technician-woodstock-highhkqq19.md";
  slug: "high-point-networks-cable-technician-woodstock-highhkqq19";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-data-center-cable-tech-sausalito-highc2vu6f.md": {
	id: "high-point-networks-data-center-cable-tech-sausalito-highc2vu6f.md";
  slug: "high-point-networks-data-center-cable-tech-sausalito-highc2vu6f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd.md": {
	id: "high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd.md";
  slug: "high-point-networks-fire-alarm-tech-marina-del-rey-highlhp8fd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-security-systems-tech-phoenix-high8guy75.md": {
	id: "high-point-networks-security-systems-tech-phoenix-high8guy75.md";
  slug: "high-point-networks-security-systems-tech-phoenix-high8guy75";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"high-point-networks-security-systems-tech-tiburon-high73tbci.md": {
	id: "high-point-networks-security-systems-tech-tiburon-high73tbci.md";
  slug: "high-point-networks-security-systems-tech-tiburon-high73tbci";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-cable-tech-id-nf8492.md": {
	id: "howell-cable-tech-id-nf8492.md";
  slug: "howell-cable-tech-id-nf8492";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-apprentice-electrician-garden-grove-howe48l9wx.md": {
	id: "howell-electric-apprentice-electrician-garden-grove-howe48l9wx.md";
  slug: "howell-electric-apprentice-electrician-garden-grove-howe48l9wx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-apprentice-electrician-los-angeles-howe4xauen.md": {
	id: "howell-electric-apprentice-electrician-los-angeles-howe4xauen.md";
  slug: "howell-electric-apprentice-electrician-los-angeles-howe4xauen";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-apprentice-electrician-moreno-valley-howek3znta.md": {
	id: "howell-electric-apprentice-electrician-moreno-valley-howek3znta.md";
  slug: "howell-electric-apprentice-electrician-moreno-valley-howek3znta";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-chula-vista-howenav9au.md": {
	id: "howell-electric-journeyman-electrician-chula-vista-howenav9au.md";
  slug: "howell-electric-journeyman-electrician-chula-vista-howenav9au";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-huntington-beach-howesjpood.md": {
	id: "howell-electric-journeyman-electrician-huntington-beach-howesjpood.md";
  slug: "howell-electric-journeyman-electrician-huntington-beach-howesjpood";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-los-angeles-howee96m47.md": {
	id: "howell-electric-journeyman-electrician-los-angeles-howee96m47.md";
  slug: "howell-electric-journeyman-electrician-los-angeles-howee96m47";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi.md": {
	id: "howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi.md";
  slug: "howell-electric-journeyman-electrician-rancho-cucamonga-howebu6xzi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m.md": {
	id: "howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m.md";
  slug: "howell-electric-journeyman-electrician-santa-clarita-howe5fwc8m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"howell-electric-journeyman-electrician-stockton-howeqclaiq.md": {
	id: "howell-electric-journeyman-electrician-stockton-howeqclaiq.md";
  slug: "howell-electric-journeyman-electrician-stockton-howeqclaiq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-alpharetta-ies8c92am.md": {
	id: "ies-electric-apprentice-electrician-alpharetta-ies8c92am.md";
  slug: "ies-electric-apprentice-electrician-alpharetta-ies8c92am";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-fresno-iesdh0j7l.md": {
	id: "ies-electric-apprentice-electrician-fresno-iesdh0j7l.md";
  slug: "ies-electric-apprentice-electrician-fresno-iesdh0j7l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-irvine-ies8ps4c8.md": {
	id: "ies-electric-apprentice-electrician-irvine-ies8ps4c8.md";
  slug: "ies-electric-apprentice-electrician-irvine-ies8ps4c8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-lancaster-iesxyigr8.md": {
	id: "ies-electric-apprentice-electrician-lancaster-iesxyigr8.md";
  slug: "ies-electric-apprentice-electrician-lancaster-iesxyigr8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-marietta-ies9qom9t.md": {
	id: "ies-electric-apprentice-electrician-marietta-ies9qom9t.md";
  slug: "ies-electric-apprentice-electrician-marietta-ies9qom9t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-apprentice-electrician-roanoke-ies3n523h.md": {
	id: "ies-electric-apprentice-electrician-roanoke-ies3n523h.md";
  slug: "ies-electric-apprentice-electrician-roanoke-ies3n523h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-automation-controls-specialist-charlotte-iesgay6e9.md": {
	id: "ies-electric-automation-controls-specialist-charlotte-iesgay6e9.md";
  slug: "ies-electric-automation-controls-specialist-charlotte-iesgay6e9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-cable-installer-albuquerque-iesstbx86.md": {
	id: "ies-electric-cable-installer-albuquerque-iesstbx86.md";
  slug: "ies-electric-cable-installer-albuquerque-iesstbx86";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-cable-tech-pittsburgh-ies0g5gvd.md": {
	id: "ies-electric-cable-tech-pittsburgh-ies0g5gvd.md";
  slug: "ies-electric-cable-tech-pittsburgh-ies0g5gvd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-cable-technician-north-charleston-iesoqraaz.md": {
	id: "ies-electric-cable-technician-north-charleston-iesoqraaz.md";
  slug: "ies-electric-cable-technician-north-charleston-iesoqraaz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-cable-technician-pinedale-ieshw1io5.md": {
	id: "ies-electric-cable-technician-pinedale-ieshw1io5.md";
  slug: "ies-electric-cable-technician-pinedale-ieshw1io5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-augusta-ies1obzqk.md": {
	id: "ies-electric-commercial-electrician-augusta-ies1obzqk.md";
  slug: "ies-electric-commercial-electrician-augusta-ies1obzqk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-baltimore-iesizv1kp.md": {
	id: "ies-electric-commercial-electrician-baltimore-iesizv1kp.md";
  slug: "ies-electric-commercial-electrician-baltimore-iesizv1kp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-cambridge-iesa7kwv2.md": {
	id: "ies-electric-commercial-electrician-cambridge-iesa7kwv2.md";
  slug: "ies-electric-commercial-electrician-cambridge-iesa7kwv2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-electrician-new-york-city-ies2w09zn.md": {
	id: "ies-electric-commercial-electrician-new-york-city-ies2w09zn.md";
  slug: "ies-electric-commercial-electrician-new-york-city-ies2w09zn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-chandler-iesjx2edx.md": {
	id: "ies-electric-commercial-project-manager-chandler-iesjx2edx.md";
  slug: "ies-electric-commercial-project-manager-chandler-iesjx2edx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-hialeah-ies2yzuyl.md": {
	id: "ies-electric-commercial-project-manager-hialeah-ies2yzuyl.md";
  slug: "ies-electric-commercial-project-manager-hialeah-ies2yzuyl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-savannah-iesuajpqp.md": {
	id: "ies-electric-commercial-project-manager-savannah-iesuajpqp.md";
  slug: "ies-electric-commercial-project-manager-savannah-iesuajpqp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-commercial-project-manager-tallahassee-iess3hyyx.md": {
	id: "ies-electric-commercial-project-manager-tallahassee-iess3hyyx.md";
  slug: "ies-electric-commercial-project-manager-tallahassee-iess3hyyx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-controls-engineer-atlanta-iesehkrfz.md": {
	id: "ies-electric-controls-engineer-atlanta-iesehkrfz.md";
  slug: "ies-electric-controls-engineer-atlanta-iesehkrfz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-controls-technician-nashville-ies26xmi8.md": {
	id: "ies-electric-controls-technician-nashville-ies26xmi8.md";
  slug: "ies-electric-controls-technician-nashville-ies26xmi8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-data-center-technician-nashville-ies74vheo.md": {
	id: "ies-electric-data-center-technician-nashville-ies74vheo.md";
  slug: "ies-electric-data-center-technician-nashville-ies74vheo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-blacksburg-iesz7tx9y.md": {
	id: "ies-electric-electrician-blacksburg-iesz7tx9y.md";
  slug: "ies-electric-electrician-blacksburg-iesz7tx9y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-hampton-iesnzo4d9.md": {
	id: "ies-electric-electrician-hampton-iesnzo4d9.md";
  slug: "ies-electric-electrician-hampton-iesnzo4d9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-hermitage-iesw7y27u.md": {
	id: "ies-electric-electrician-hermitage-iesw7y27u.md";
  slug: "ies-electric-electrician-hermitage-iesw7y27u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-indian-trail-iesymoss3.md": {
	id: "ies-electric-electrician-indian-trail-iesymoss3.md";
  slug: "ies-electric-electrician-indian-trail-iesymoss3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-lancaster-iesgf6dqc.md": {
	id: "ies-electric-electrician-lancaster-iesgf6dqc.md";
  slug: "ies-electric-electrician-lancaster-iesgf6dqc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-electrician-sherman-ieszkpfyd.md": {
	id: "ies-electric-electrician-sherman-ieszkpfyd.md";
  slug: "ies-electric-electrician-sherman-ieszkpfyd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-fiber-optics-installer-wichita-iesot3044.md": {
	id: "ies-electric-fiber-optics-installer-wichita-iesot3044.md";
  slug: "ies-electric-fiber-optics-installer-wichita-iesot3044";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-glendale-ies6q5tfb.md": {
	id: "ies-electric-journeyman-electrician-glendale-ies6q5tfb.md";
  slug: "ies-electric-journeyman-electrician-glendale-ies6q5tfb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-san-bernardino-iesz3nsev.md": {
	id: "ies-electric-journeyman-electrician-san-bernardino-iesz3nsev.md";
  slug: "ies-electric-journeyman-electrician-san-bernardino-iesz3nsev";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-journeyman-electrician-san-diego-ies5t6acn.md": {
	id: "ies-electric-journeyman-electrician-san-diego-ies5t6acn.md";
  slug: "ies-electric-journeyman-electrician-san-diego-ies5t6acn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-junior-project-manager-tucson-ieslxbsb5.md": {
	id: "ies-electric-junior-project-manager-tucson-ieslxbsb5.md";
  slug: "ies-electric-junior-project-manager-tucson-ieslxbsb5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-project-manager-mesa-ies18fcpz.md": {
	id: "ies-electric-project-manager-mesa-ies18fcpz.md";
  slug: "ies-electric-project-manager-mesa-ies18fcpz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm.md": {
	id: "ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm.md";
  slug: "ies-electric-residential-solar-installer-salt-lake-city-ies2f97rm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-security-technician-detroit-ies5mtpod.md": {
	id: "ies-electric-security-technician-detroit-ies5mtpod.md";
  slug: "ies-electric-security-technician-detroit-ies5mtpod";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-security-technician-durham-ies6hzd5i.md": {
	id: "ies-electric-security-technician-durham-ies6hzd5i.md";
  slug: "ies-electric-security-technician-durham-ies6hzd5i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-security-technician-knoxville-iesi9ft8k.md": {
	id: "ies-electric-security-technician-knoxville-iesi9ft8k.md";
  slug: "ies-electric-security-technician-knoxville-iesi9ft8k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-security-technician-memphis-ieshx74pu.md": {
	id: "ies-electric-security-technician-memphis-ieshx74pu.md";
  slug: "ies-electric-security-technician-memphis-ieshx74pu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-service-electrician-aurora-iesygfvmp.md": {
	id: "ies-electric-service-electrician-aurora-iesygfvmp.md";
  slug: "ies-electric-service-electrician-aurora-iesygfvmp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"ies-electric-service-electrician-cleveland-iesa4mf5v.md": {
	id: "ies-electric-service-electrician-cleveland-iesa4mf5v.md";
  slug: "ies-electric-service-electrician-cleveland-iesa4mf5v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-cable-installer-wilmington-intebedw6b.md": {
	id: "integra-electrical-cable-installer-wilmington-intebedw6b.md";
  slug: "integra-electrical-cable-installer-wilmington-intebedw6b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-data-center-technician-san-francisco-inteq7atjj.md": {
	id: "integra-electrical-data-center-technician-san-francisco-inteq7atjj.md";
  slug: "integra-electrical-data-center-technician-san-francisco-inteq7atjj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-electrical-apprentice-clearwater-intejd9t96.md": {
	id: "integra-electrical-electrical-apprentice-clearwater-intejd9t96.md";
  slug: "integra-electrical-electrical-apprentice-clearwater-intejd9t96";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-kansas-city-inte5oi7f8.md": {
	id: "integra-electrical-industrial-electrician-kansas-city-inte5oi7f8.md";
  slug: "integra-electrical-industrial-electrician-kansas-city-inte5oi7f8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-san-francisco-intetka4ea.md": {
	id: "integra-electrical-industrial-electrician-san-francisco-intetka4ea.md";
  slug: "integra-electrical-industrial-electrician-san-francisco-intetka4ea";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-seattle-inte4we5xb.md": {
	id: "integra-electrical-industrial-electrician-seattle-inte4we5xb.md";
  slug: "integra-electrical-industrial-electrician-seattle-inte4we5xb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-industrial-electrician-worcester-integjztz6.md": {
	id: "integra-electrical-industrial-electrician-worcester-integjztz6.md";
  slug: "integra-electrical-industrial-electrician-worcester-integjztz6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-industrial-journeyman-electrician-miami-intebljg43.md": {
	id: "integra-electrical-industrial-journeyman-electrician-miami-intebljg43.md";
  slug: "integra-electrical-industrial-journeyman-electrician-miami-intebljg43";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-security-technician-youngstown-intetws6nf.md": {
	id: "integra-electrical-security-technician-youngstown-intetws6nf.md";
  slug: "integra-electrical-security-technician-youngstown-intetws6nf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"integra-electrical-voice-data-installer-columbia-inteeyc2bb.md": {
	id: "integra-electrical-voice-data-installer-columbia-inteeyc2bb.md";
  slug: "integra-electrical-voice-data-installer-columbia-inteeyc2bb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-atlanta-jackbut5o4.md": {
	id: "jackson-electric-apprentice-electrician-atlanta-jackbut5o4.md";
  slug: "jackson-electric-apprentice-electrician-atlanta-jackbut5o4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y.md": {
	id: "jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y.md";
  slug: "jackson-electric-apprentice-electrician-fayetteville-jackt0xe9y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-hickory-jackvtz7n1.md": {
	id: "jackson-electric-apprentice-electrician-hickory-jackvtz7n1.md";
  slug: "jackson-electric-apprentice-electrician-hickory-jackvtz7n1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-rome-jack7eqww0.md": {
	id: "jackson-electric-apprentice-electrician-rome-jack7eqww0.md";
  slug: "jackson-electric-apprentice-electrician-rome-jack7eqww0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-apprentice-electrician-union-jackafop4v.md": {
	id: "jackson-electric-apprentice-electrician-union-jackafop4v.md";
  slug: "jackson-electric-apprentice-electrician-union-jackafop4v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-cable-tech-philadelphia-jack1f9y83.md": {
	id: "jackson-electric-cable-tech-philadelphia-jack1f9y83.md";
  slug: "jackson-electric-cable-tech-philadelphia-jack1f9y83";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-cable-technician-concord-jack3gotjf.md": {
	id: "jackson-electric-cable-technician-concord-jack3gotjf.md";
  slug: "jackson-electric-cable-technician-concord-jack3gotjf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-cable-technician-miami-jackolaub9.md": {
	id: "jackson-electric-cable-technician-miami-jackolaub9.md";
  slug: "jackson-electric-cable-technician-miami-jackolaub9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jackson-electric-commercial-electrician-austin-jackv3tiag.md": {
	id: "jackson-electric-commercial-electrician-austin-jackv3tiag.md";
  slug: "jackson-electric-commercial-electrician-austin-jackv3tiag";
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
"koorsen-electrical-project-manager-eugene-koor592adz.md": {
	id: "koorsen-electrical-project-manager-eugene-koor592adz.md";
  slug: "koorsen-electrical-project-manager-eugene-koor592adz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"koorsen-fire-alarm-designer-tempe-koorikm591.md": {
	id: "koorsen-fire-alarm-designer-tempe-koorikm591.md";
  slug: "koorsen-fire-alarm-designer-tempe-koorikm591";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6.md": {
	id: "koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6.md";
  slug: "koorsen-fire-alarm-project-manager-los-angeles-koorqoemw6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"koorsen-junior-project-manager-scottsdale-kooroak38a.md": {
	id: "koorsen-junior-project-manager-scottsdale-kooroak38a.md";
  slug: "koorsen-junior-project-manager-scottsdale-kooroak38a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"koorsen-security-alarm-project-manager-anaheim-koory45cv0.md": {
	id: "koorsen-security-alarm-project-manager-anaheim-koory45cv0.md";
  slug: "koorsen-security-alarm-project-manager-anaheim-koory45cv0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"koorsen-security-alarm-project-manager-vancouver-koor2inu1k.md": {
	id: "koorsen-security-alarm-project-manager-vancouver-koor2inu1k.md";
  slug: "koorsen-security-alarm-project-manager-vancouver-koor2inu1k";
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
"lyons-electrical-apprentice-electrician-manassas-lyonxbno16.md": {
	id: "lyons-electrical-apprentice-electrician-manassas-lyonxbno16.md";
  slug: "lyons-electrical-apprentice-electrician-manassas-lyonxbno16";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lyons-electrical-apprentice-electrician-miami-lyonlf3oam.md": {
	id: "lyons-electrical-apprentice-electrician-miami-lyonlf3oam.md";
  slug: "lyons-electrical-apprentice-electrician-miami-lyonlf3oam";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lyons-electrical-cable-tech-chattanooga-lyon803wqv.md": {
	id: "lyons-electrical-cable-tech-chattanooga-lyon803wqv.md";
  slug: "lyons-electrical-cable-tech-chattanooga-lyon803wqv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lyons-electrical-security-technician-richmond-lyon851emh.md": {
	id: "lyons-electrical-security-technician-richmond-lyon851emh.md";
  slug: "lyons-electrical-security-technician-richmond-lyon851emh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-charlotte-mcca9yp61y.md": {
	id: "mccall-electric-apprentice-electrician-charlotte-mcca9yp61y.md";
  slug: "mccall-electric-apprentice-electrician-charlotte-mcca9yp61y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-houston-mccav58wqj.md": {
	id: "mccall-electric-apprentice-electrician-houston-mccav58wqj.md";
  slug: "mccall-electric-apprentice-electrician-houston-mccav58wqj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-huntsville-mccahquk45.md": {
	id: "mccall-electric-apprentice-electrician-huntsville-mccahquk45.md";
  slug: "mccall-electric-apprentice-electrician-huntsville-mccahquk45";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q.md": {
	id: "mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q.md";
  slug: "mccall-electric-apprentice-electrician-raleigh-mcca0r5t5q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-commercial-electrician-summerville-mccaoyk1mt.md": {
	id: "mccall-electric-commercial-electrician-summerville-mccaoyk1mt.md";
  slug: "mccall-electric-commercial-electrician-summerville-mccaoyk1mt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-data-center-technician-virginia-beach-mcca67u1b6.md": {
	id: "mccall-electric-data-center-technician-virginia-beach-mcca67u1b6.md";
  slug: "mccall-electric-data-center-technician-virginia-beach-mcca67u1b6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-electrician-lawrenceville-mccan3xp4r.md": {
	id: "mccall-electric-electrician-lawrenceville-mccan3xp4r.md";
  slug: "mccall-electric-electrician-lawrenceville-mccan3xp4r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mccall-electric-electrician-rock-hill-mccal65kex.md": {
	id: "mccall-electric-electrician-rock-hill-mccal65kex.md";
  slug: "mccall-electric-electrician-rock-hill-mccal65kex";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-boise-voic-wc3l4q.md": {
	id: "mcenroe-voice-&-data-installer-boise-voic-wc3l4q.md";
  slug: "mcenroe-voice--data-installer-boise-voic-wc3l4q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-boston-voic-xcyye7.md": {
	id: "mcenroe-voice-&-data-installer-boston-voic-xcyye7.md";
  slug: "mcenroe-voice--data-installer-boston-voic-xcyye7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-cheyenne-voic-cp1nuz.md": {
	id: "mcenroe-voice-&-data-installer-cheyenne-voic-cp1nuz.md";
  slug: "mcenroe-voice--data-installer-cheyenne-voic-cp1nuz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-columbus-voic-ljbx8r.md": {
	id: "mcenroe-voice-&-data-installer-columbus-voic-ljbx8r.md";
  slug: "mcenroe-voice--data-installer-columbus-voic-ljbx8r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-indianapolis-voic-p4n8ck.md": {
	id: "mcenroe-voice-&-data-installer-indianapolis-voic-p4n8ck.md";
  slug: "mcenroe-voice--data-installer-indianapolis-voic-p4n8ck";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-jacksonville-voic-caqg2m.md": {
	id: "mcenroe-voice-&-data-installer-jacksonville-voic-caqg2m.md";
  slug: "mcenroe-voice--data-installer-jacksonville-voic-caqg2m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mcenroe-voice-&-data-installer-omaha-voic-ygxet5.md": {
	id: "mcenroe-voice-&-data-installer-omaha-voic-ygxet5.md";
  slug: "mcenroe-voice--data-installer-omaha-voic-ygxet5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-av-systems-tech-yorba-linda-miralec0vu.md": {
	id: "mirapath-av-systems-tech-yorba-linda-miralec0vu.md";
  slug: "mirapath-av-systems-tech-yorba-linda-miralec0vu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-data-center-cable-tech-corte-madera-miratbnwvp.md": {
	id: "mirapath-data-center-cable-tech-corte-madera-miratbnwvp.md";
  slug: "mirapath-data-center-cable-tech-corte-madera-miratbnwvp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-data-center-cable-tech-culver-city-mirapkriai.md": {
	id: "mirapath-data-center-cable-tech-culver-city-mirapkriai.md";
  slug: "mirapath-data-center-cable-tech-culver-city-mirapkriai";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-fire-alarm-tech-mountain-view-miralne13s.md": {
	id: "mirapath-fire-alarm-tech-mountain-view-miralne13s.md";
  slug: "mirapath-fire-alarm-tech-mountain-view-miralne13s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-security-systems-tech-marina-del-rey-miraogarq0.md": {
	id: "mirapath-security-systems-tech-marina-del-rey-miraogarq0.md";
  slug: "mirapath-security-systems-tech-marina-del-rey-miraogarq0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mirapath-security-systems-tech-seattle-mirarc0dyp.md": {
	id: "mirapath-security-systems-tech-seattle-mirarc0dyp.md";
  slug: "mirapath-security-systems-tech-seattle-mirarc0dyp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-automation-controls-specialist-portland-mmrryyvo4.md": {
	id: "mmr-group-automation-controls-specialist-portland-mmrryyvo4.md";
  slug: "mmr-group-automation-controls-specialist-portland-mmrryyvo4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-av-systems-tech-minneapolis-mmr4id64s.md": {
	id: "mmr-group-av-systems-tech-minneapolis-mmr4id64s.md";
  slug: "mmr-group-av-systems-tech-minneapolis-mmr4id64s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-av-systems-tech-walnut-creek-mmr7nauyz.md": {
	id: "mmr-group-av-systems-tech-walnut-creek-mmr7nauyz.md";
  slug: "mmr-group-av-systems-tech-walnut-creek-mmr7nauyz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-tech-burbank-mmr1a8vlh.md": {
	id: "mmr-group-cable-tech-burbank-mmr1a8vlh.md";
  slug: "mmr-group-cable-tech-burbank-mmr1a8vlh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-tech-ridgecrest-mmr06y2gv.md": {
	id: "mmr-group-cable-tech-ridgecrest-mmr06y2gv.md";
  slug: "mmr-group-cable-tech-ridgecrest-mmr06y2gv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-tech-san-luis-obispo-mmre0w94v.md": {
	id: "mmr-group-cable-tech-san-luis-obispo-mmre0w94v.md";
  slug: "mmr-group-cable-tech-san-luis-obispo-mmre0w94v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-technician-el-centro-mmr8qgzoo.md": {
	id: "mmr-group-cable-technician-el-centro-mmr8qgzoo.md";
  slug: "mmr-group-cable-technician-el-centro-mmr8qgzoo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-technician-oceanside-mmrt7hx7l.md": {
	id: "mmr-group-cable-technician-oceanside-mmrt7hx7l.md";
  slug: "mmr-group-cable-technician-oceanside-mmrt7hx7l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-cable-technician-santa-ana-mmre1jn2t.md": {
	id: "mmr-group-cable-technician-santa-ana-mmre1jn2t.md";
  slug: "mmr-group-cable-technician-santa-ana-mmre1jn2t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk.md": {
	id: "mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk.md";
  slug: "mmr-group-commercial-controls-electrician-knoxville-mmr2dc0rk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-controls-engineer-los-angeles-mmrt81e9f.md": {
	id: "mmr-group-controls-engineer-los-angeles-mmrt81e9f.md";
  slug: "mmr-group-controls-engineer-los-angeles-mmrt81e9f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r.md": {
	id: "mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r.md";
  slug: "mmr-group-custom-home-apprentice-electrician-cleveland-mmrbn8e5r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj.md": {
	id: "mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj.md";
  slug: "mmr-group-custom-home-controls-electrician-pensacola-mmrjin9hj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-custom-home-master-electrician-gainesville-mmr3njirz.md": {
	id: "mmr-group-custom-home-master-electrician-gainesville-mmr3njirz.md";
  slug: "mmr-group-custom-home-master-electrician-gainesville-mmr3njirz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-custom-home-master-electrician-utica-mmrnowd9m.md": {
	id: "mmr-group-custom-home-master-electrician-utica-mmrnowd9m.md";
  slug: "mmr-group-custom-home-master-electrician-utica-mmrnowd9m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe.md": {
	id: "mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe.md";
  slug: "mmr-group-data-center-cable-tech-cupertino-mmrxj0rqe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy.md": {
	id: "mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy.md";
  slug: "mmr-group-data-center-cable-tech-el-segundo-mmr49ekiy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz.md": {
	id: "mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz.md";
  slug: "mmr-group-data-center-cable-tech-las-vegas-mmrgl9zdz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg.md": {
	id: "mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg.md";
  slug: "mmr-group-data-center-cable-tech-marina-del-rey-mmr8h4vgg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-data-center-technician-pittsburgh-mmro0fykr.md": {
	id: "mmr-group-data-center-technician-pittsburgh-mmro0fykr.md";
  slug: "mmr-group-data-center-technician-pittsburgh-mmro0fykr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-clarksville-mmr0ir4o5.md": {
	id: "mmr-group-electrical-apprentice-clarksville-mmr0ir4o5.md";
  slug: "mmr-group-electrical-apprentice-clarksville-mmr0ir4o5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-ogden-mmrbzptq7.md": {
	id: "mmr-group-electrical-apprentice-ogden-mmrbzptq7.md";
  slug: "mmr-group-electrical-apprentice-ogden-mmrbzptq7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-electrical-apprentice-springfield-mmrjdm9hd.md": {
	id: "mmr-group-electrical-apprentice-springfield-mmrjdm9hd.md";
  slug: "mmr-group-electrical-apprentice-springfield-mmrjdm9hd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-fire-alarm-tech-menlo-park-mmru05lkk.md": {
	id: "mmr-group-fire-alarm-tech-menlo-park-mmru05lkk.md";
  slug: "mmr-group-fire-alarm-tech-menlo-park-mmru05lkk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-fire-alarm-technician-new-york-mmrjrents.md": {
	id: "mmr-group-fire-alarm-technician-new-york-mmrjrents.md";
  slug: "mmr-group-fire-alarm-technician-new-york-mmrjrents";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk.md": {
	id: "mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk.md";
  slug: "mmr-group-healthcare-journeyman-electrician-macon-mmrp1v7jk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6.md": {
	id: "mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6.md";
  slug: "mmr-group-industrial-apprentice-electrician-wilmington-mmrxiafz6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb.md": {
	id: "mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb.md";
  slug: "mmr-group-industrial-journeyman-electrician-columbus-mmr23dicb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr.md": {
	id: "mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr.md";
  slug: "mmr-group-industrial-journeyman-electrician-los-angeles-mmr244qkr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-industrial-master-electrician-camden-mmrwpt14x.md": {
	id: "mmr-group-industrial-master-electrician-camden-mmrwpt14x.md";
  slug: "mmr-group-industrial-master-electrician-camden-mmrwpt14x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u.md": {
	id: "mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u.md";
  slug: "mmr-group-low-voltage-cable-technician-colorado-springs-mmrmje72u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou.md": {
	id: "mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou.md";
  slug: "mmr-group-low-voltage-cable-technician-flowery-branch-mmrzv2nou";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm.md": {
	id: "mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm.md";
  slug: "mmr-group-low-voltage-cable-technician-loveland-mmrz3ykmm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-marietta-mmraf0adk.md": {
	id: "mmr-group-low-voltage-cable-technician-marietta-mmraf0adk.md";
  slug: "mmr-group-low-voltage-cable-technician-marietta-mmraf0adk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-monument-mmrkbns8v.md": {
	id: "mmr-group-low-voltage-cable-technician-monument-mmrkbns8v.md";
  slug: "mmr-group-low-voltage-cable-technician-monument-mmrkbns8v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2.md": {
	id: "mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2.md";
  slug: "mmr-group-low-voltage-cable-technician-oakwood-mmr2i13e2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl.md": {
	id: "mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl.md";
  slug: "mmr-group-low-voltage-cable-technician-watkinsville-mmrruskpl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g.md": {
	id: "mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g.md";
  slug: "mmr-group-multi-family-journeyman-electrician-detroit-mmrmr0b2g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-multi-family-master-electrician-wheeling-mmr2j62az.md": {
	id: "mmr-group-multi-family-master-electrician-wheeling-mmr2j62az.md";
  slug: "mmr-group-multi-family-master-electrician-wheeling-mmr2j62az";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-plant-apprentice-electrician-durham-mmre2w8pw.md": {
	id: "mmr-group-plant-apprentice-electrician-durham-mmre2w8pw.md";
  slug: "mmr-group-plant-apprentice-electrician-durham-mmre2w8pw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-plant-master-electrician-syracuse-mmrhj7yna.md": {
	id: "mmr-group-plant-master-electrician-syracuse-mmrhj7yna.md";
  slug: "mmr-group-plant-master-electrician-syracuse-mmrhj7yna";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-pv-system-controls-electrician-augusta-mmrubl94v.md": {
	id: "mmr-group-pv-system-controls-electrician-augusta-mmrubl94v.md";
  slug: "mmr-group-pv-system-controls-electrician-augusta-mmrubl94v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt.md": {
	id: "mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt.md";
  slug: "mmr-group-pv-system-journeyman-electrician-jacksonville-mmrt0x4xt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb.md": {
	id: "mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb.md";
  slug: "mmr-group-pv-system-master-electrician-tallahassee-mmr8jdtkb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-repair-apprentice-electrician-charleston-mmrj20446.md": {
	id: "mmr-group-repair-apprentice-electrician-charleston-mmrj20446.md";
  slug: "mmr-group-repair-apprentice-electrician-charleston-mmrj20446";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-repair-controls-electrician-allentown-mmr8npw9b.md": {
	id: "mmr-group-repair-controls-electrician-allentown-mmr8npw9b.md";
  slug: "mmr-group-repair-controls-electrician-allentown-mmr8npw9b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn.md": {
	id: "mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn.md";
  slug: "mmr-group-residential-journeyman-electrician-norfolk-mmr3v76sn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-augusta-mmr0f5huf.md": {
	id: "mmr-group-residential-master-electrician-augusta-mmr0f5huf.md";
  slug: "mmr-group-residential-master-electrician-augusta-mmr0f5huf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-harrisburg-mmrnny2pv.md": {
	id: "mmr-group-residential-master-electrician-harrisburg-mmrnny2pv.md";
  slug: "mmr-group-residential-master-electrician-harrisburg-mmrnny2pv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-residential-master-electrician-reading-mmr2px39p.md": {
	id: "mmr-group-residential-master-electrician-reading-mmr2px39p.md";
  slug: "mmr-group-residential-master-electrician-reading-mmr2px39p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw.md": {
	id: "mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw.md";
  slug: "mmr-group-retail-apprentice-electrician-birmingham-mmr0ct2mw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m.md": {
	id: "mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m.md";
  slug: "mmr-group-retail-controls-electrician-winston-salem-mmr9yo92m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-systems-tech-placentia-mmr1bgn6r.md": {
	id: "mmr-group-security-systems-tech-placentia-mmr1bgn6r.md";
  slug: "mmr-group-security-systems-tech-placentia-mmr1bgn6r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-technician-jacksonville-mmr0dwcgd.md": {
	id: "mmr-group-security-technician-jacksonville-mmr0dwcgd.md";
  slug: "mmr-group-security-technician-jacksonville-mmr0dwcgd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-technician-miami-mmr1qi5ku.md": {
	id: "mmr-group-security-technician-miami-mmr1qi5ku.md";
  slug: "mmr-group-security-technician-miami-mmr1qi5ku";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-technician-oakland-mmr9hzgqh.md": {
	id: "mmr-group-security-technician-oakland-mmr9hzgqh.md";
  slug: "mmr-group-security-technician-oakland-mmr9hzgqh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-technician-oklahoma-city-mmr8ci56d.md": {
	id: "mmr-group-security-technician-oklahoma-city-mmr8ci56d.md";
  slug: "mmr-group-security-technician-oklahoma-city-mmr8ci56d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-security-technician-santa-rosa-mmrhzd76u.md": {
	id: "mmr-group-security-technician-santa-rosa-mmrhzd76u.md";
  slug: "mmr-group-security-technician-santa-rosa-mmrhzd76u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-senior-controls-technician-anaheim-mmrs8ex22.md": {
	id: "mmr-group-senior-controls-technician-anaheim-mmrs8ex22.md";
  slug: "mmr-group-senior-controls-technician-anaheim-mmrs8ex22";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6.md": {
	id: "mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6.md";
  slug: "mmr-group-service-apprentice-electrician-scranton-mmrk0zdk6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq.md": {
	id: "mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq.md";
  slug: "mmr-group-solar-journeyman-electrician-canton-mmrtrq7lq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"mmr-group-solar-master-electrician-akron-mmri284h8.md": {
	id: "mmr-group-solar-master-electrician-akron-mmri284h8.md";
  slug: "mmr-group-solar-master-electrician-akron-mmri284h8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-columbia-nipp6o2b65.md": {
	id: "nipper-electric-apprentice-electrician-columbia-nipp6o2b65.md";
  slug: "nipper-electric-apprentice-electrician-columbia-nipp6o2b65";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-gastonia-nippwvqjn6.md": {
	id: "nipper-electric-apprentice-electrician-gastonia-nippwvqjn6.md";
  slug: "nipper-electric-apprentice-electrician-gastonia-nippwvqjn6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-grand-junction-nipp4flk65.md": {
	id: "nipper-electric-apprentice-electrician-grand-junction-nipp4flk65.md";
  slug: "nipper-electric-apprentice-electrician-grand-junction-nipp4flk65";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-apprentice-electrician-raleigh-nippwcoq2z.md": {
	id: "nipper-electric-apprentice-electrician-raleigh-nippwcoq2z.md";
  slug: "nipper-electric-apprentice-electrician-raleigh-nippwcoq2z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-cable-tech-atlanta-nipp8ipm44.md": {
	id: "nipper-electric-cable-tech-atlanta-nipp8ipm44.md";
  slug: "nipper-electric-cable-tech-atlanta-nipp8ipm44";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-cable-tech-colorado-springs-nippl7svqm.md": {
	id: "nipper-electric-cable-tech-colorado-springs-nippl7svqm.md";
  slug: "nipper-electric-cable-tech-colorado-springs-nippl7svqm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-commercial-electrician-indianapolis-nippjubhyr.md": {
	id: "nipper-electric-commercial-electrician-indianapolis-nippjubhyr.md";
  slug: "nipper-electric-commercial-electrician-indianapolis-nippjubhyr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-data-center-technician-columbus-nippxv9jzs.md": {
	id: "nipper-electric-data-center-technician-columbus-nippxv9jzs.md";
  slug: "nipper-electric-data-center-technician-columbus-nippxv9jzs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-data-center-technician-plano-nippfs1ktn.md": {
	id: "nipper-electric-data-center-technician-plano-nippfs1ktn.md";
  slug: "nipper-electric-data-center-technician-plano-nippfs1ktn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-security-technician-dunwoody-nipphgioax.md": {
	id: "nipper-electric-security-technician-dunwoody-nipphgioax.md";
  slug: "nipper-electric-security-technician-dunwoody-nipphgioax";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-security-technician-jacksonville-nippk7o8id.md": {
	id: "nipper-electric-security-technician-jacksonville-nippk7o8id.md";
  slug: "nipper-electric-security-technician-jacksonville-nippk7o8id";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-security-technician-jersey-city-nippwm2rn8.md": {
	id: "nipper-electric-security-technician-jersey-city-nippwm2rn8.md";
  slug: "nipper-electric-security-technician-jersey-city-nippwm2rn8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"nipper-electric-security-technician-peachtree-corners-nippbphz3d.md": {
	id: "nipper-electric-security-technician-peachtree-corners-nippbphz3d.md";
  slug: "nipper-electric-security-technician-peachtree-corners-nippbphz3d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-cable-technician-memphis-oakcnbrsf.md": {
	id: "oak-electrical-cable-technician-memphis-oakcnbrsf.md";
  slug: "oak-electrical-cable-technician-memphis-oakcnbrsf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-commercial-apprentice-phoenix-oak8v1l47.md": {
	id: "oak-electrical-commercial-apprentice-phoenix-oak8v1l47.md";
  slug: "oak-electrical-commercial-apprentice-phoenix-oak8v1l47";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-commercial-electrician-houston-oakx5x48w.md": {
	id: "oak-electrical-commercial-electrician-houston-oakx5x48w.md";
  slug: "oak-electrical-commercial-electrician-houston-oakx5x48w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-electrical-apprentice-new-haven-oak8ou5t1.md": {
	id: "oak-electrical-electrical-apprentice-new-haven-oak8ou5t1.md";
  slug: "oak-electrical-electrical-apprentice-new-haven-oak8ou5t1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-fire-alarm-installer-chesapeake-oaklqi017.md": {
	id: "oak-electrical-fire-alarm-installer-chesapeake-oaklqi017.md";
  slug: "oak-electrical-fire-alarm-installer-chesapeake-oaklqi017";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-cleveland-oakr6gad2.md": {
	id: "oak-electrical-industrial-electrician-cleveland-oakr6gad2.md";
  slug: "oak-electrical-industrial-electrician-cleveland-oakr6gad2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-norfolk-oaktcgbnx.md": {
	id: "oak-electrical-industrial-electrician-norfolk-oaktcgbnx.md";
  slug: "oak-electrical-industrial-electrician-norfolk-oaktcgbnx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-san-diego-oakfjqxyh.md": {
	id: "oak-electrical-industrial-electrician-san-diego-oakfjqxyh.md";
  slug: "oak-electrical-industrial-electrician-san-diego-oakfjqxyh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-industrial-electrician-st.-louis-oakxlqy1r.md": {
	id: "oak-electrical-industrial-electrician-st.-louis-oakxlqy1r.md";
  slug: "oak-electrical-industrial-electrician-st-louis-oakxlqy1r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-process-controls-technician-richmond-oak9agp2e.md": {
	id: "oak-electrical-process-controls-technician-richmond-oak9agp2e.md";
  slug: "oak-electrical-process-controls-technician-richmond-oak9agp2e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-security-technician-aurora-oak7bbvwd.md": {
	id: "oak-electrical-security-technician-aurora-oak7bbvwd.md";
  slug: "oak-electrical-security-technician-aurora-oak7bbvwd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-security-technician-seattle-oakqs8dch.md": {
	id: "oak-electrical-security-technician-seattle-oakqs8dch.md";
  slug: "oak-electrical-security-technician-seattle-oakqs8dch";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-service-electrician-denver-oakvz8udg.md": {
	id: "oak-electrical-service-electrician-denver-oakvz8udg.md";
  slug: "oak-electrical-service-electrician-denver-oakvz8udg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"oak-electrical-voice-data-installer-savannah-oakf4srhf.md": {
	id: "oak-electrical-voice-data-installer-savannah-oakf4srhf.md";
  slug: "oak-electrical-voice-data-installer-savannah-oakf4srhf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-arvada-appr-fnyccq.md": {
	id: "premier-apprentice-electrician-arvada-appr-fnyccq.md";
  slug: "premier-apprentice-electrician-arvada-appr-fnyccq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-aurora-appr-7jzrwb.md": {
	id: "premier-apprentice-electrician-aurora-appr-7jzrwb.md";
  slug: "premier-apprentice-electrician-aurora-appr-7jzrwb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-centennial-appr-pj3rtq.md": {
	id: "premier-apprentice-electrician-centennial-appr-pj3rtq.md";
  slug: "premier-apprentice-electrician-centennial-appr-pj3rtq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-colorado-springs-appr-vvx36l.md": {
	id: "premier-apprentice-electrician-colorado-springs-appr-vvx36l.md";
  slug: "premier-apprentice-electrician-colorado-springs-appr-vvx36l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-denver-appr-okwb35.md": {
	id: "premier-apprentice-electrician-denver-appr-okwb35.md";
  slug: "premier-apprentice-electrician-denver-appr-okwb35";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-duluth-appr-g4nw3f.md": {
	id: "premier-apprentice-electrician-duluth-appr-g4nw3f.md";
  slug: "premier-apprentice-electrician-duluth-appr-g4nw3f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-dunwoody-appr-fxd5u8.md": {
	id: "premier-apprentice-electrician-dunwoody-appr-fxd5u8.md";
  slug: "premier-apprentice-electrician-dunwoody-appr-fxd5u8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-fort-collins-appr-lkprr0.md": {
	id: "premier-apprentice-electrician-fort-collins-appr-lkprr0.md";
  slug: "premier-apprentice-electrician-fort-collins-appr-lkprr0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-johns-creek-appr-eomtf9.md": {
	id: "premier-apprentice-electrician-johns-creek-appr-eomtf9.md";
  slug: "premier-apprentice-electrician-johns-creek-appr-eomtf9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-kennesaw-appr-hobpc1.md": {
	id: "premier-apprentice-electrician-kennesaw-appr-hobpc1.md";
  slug: "premier-apprentice-electrician-kennesaw-appr-hobpc1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-lakewood-appr-e1izyx.md": {
	id: "premier-apprentice-electrician-lakewood-appr-e1izyx.md";
  slug: "premier-apprentice-electrician-lakewood-appr-e1izyx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-pueblo-appr-jtdpdz.md": {
	id: "premier-apprentice-electrician-pueblo-appr-jtdpdz.md";
  slug: "premier-apprentice-electrician-pueblo-appr-jtdpdz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-smyrna-appr-jcv0ky.md": {
	id: "premier-apprentice-electrician-smyrna-appr-jcv0ky.md";
  slug: "premier-apprentice-electrician-smyrna-appr-jcv0ky";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-thornton-appr-5kyj5t.md": {
	id: "premier-apprentice-electrician-thornton-appr-5kyj5t.md";
  slug: "premier-apprentice-electrician-thornton-appr-5kyj5t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-apprentice-electrician-westminster-appr-9u39rn.md": {
	id: "premier-apprentice-electrician-westminster-appr-9u39rn.md";
  slug: "premier-apprentice-electrician-westminster-appr-9u39rn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-alpharetta-cabl-07pmrq.md": {
	id: "premier-cable-installer-alpharetta-cabl-07pmrq.md";
  slug: "premier-cable-installer-alpharetta-cabl-07pmrq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-arvada-cabl-c47flh.md": {
	id: "premier-cable-installer-arvada-cabl-c47flh.md";
  slug: "premier-cable-installer-arvada-cabl-c47flh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-atlanta-cabl-4gi56o.md": {
	id: "premier-cable-installer-atlanta-cabl-4gi56o.md";
  slug: "premier-cable-installer-atlanta-cabl-4gi56o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-aurora-cabl-exfxk4.md": {
	id: "premier-cable-installer-aurora-cabl-exfxk4.md";
  slug: "premier-cable-installer-aurora-cabl-exfxk4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-centennial-cabl-ne0fgu.md": {
	id: "premier-cable-installer-centennial-cabl-ne0fgu.md";
  slug: "premier-cable-installer-centennial-cabl-ne0fgu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-colorado-springs-cabl-qaumg2.md": {
	id: "premier-cable-installer-colorado-springs-cabl-qaumg2.md";
  slug: "premier-cable-installer-colorado-springs-cabl-qaumg2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-denver-cabl-9nztjm.md": {
	id: "premier-cable-installer-denver-cabl-9nztjm.md";
  slug: "premier-cable-installer-denver-cabl-9nztjm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-duluth-cabl-kwajau.md": {
	id: "premier-cable-installer-duluth-cabl-kwajau.md";
  slug: "premier-cable-installer-duluth-cabl-kwajau";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-dunwoody-cabl-yb1as9.md": {
	id: "premier-cable-installer-dunwoody-cabl-yb1as9.md";
  slug: "premier-cable-installer-dunwoody-cabl-yb1as9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-fort-collins-cabl-af1b6y.md": {
	id: "premier-cable-installer-fort-collins-cabl-af1b6y.md";
  slug: "premier-cable-installer-fort-collins-cabl-af1b6y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-johns-creek-cabl-x03ozo.md": {
	id: "premier-cable-installer-johns-creek-cabl-x03ozo.md";
  slug: "premier-cable-installer-johns-creek-cabl-x03ozo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-kennesaw-cabl-7iiadu.md": {
	id: "premier-cable-installer-kennesaw-cabl-7iiadu.md";
  slug: "premier-cable-installer-kennesaw-cabl-7iiadu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-lakewood-cabl-dupm60.md": {
	id: "premier-cable-installer-lakewood-cabl-dupm60.md";
  slug: "premier-cable-installer-lakewood-cabl-dupm60";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-lawrenceville-cabl-z72sc8.md": {
	id: "premier-cable-installer-lawrenceville-cabl-z72sc8.md";
  slug: "premier-cable-installer-lawrenceville-cabl-z72sc8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-pueblo-cabl-no3mfk.md": {
	id: "premier-cable-installer-pueblo-cabl-no3mfk.md";
  slug: "premier-cable-installer-pueblo-cabl-no3mfk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-roswell-cabl-0ypr5n.md": {
	id: "premier-cable-installer-roswell-cabl-0ypr5n.md";
  slug: "premier-cable-installer-roswell-cabl-0ypr5n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-smyrna-cabl-wq49is.md": {
	id: "premier-cable-installer-smyrna-cabl-wq49is.md";
  slug: "premier-cable-installer-smyrna-cabl-wq49is";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-thornton-cabl-jrkmze.md": {
	id: "premier-cable-installer-thornton-cabl-jrkmze.md";
  slug: "premier-cable-installer-thornton-cabl-jrkmze";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-installer-westminster-cabl-yagaag.md": {
	id: "premier-cable-installer-westminster-cabl-yagaag.md";
  slug: "premier-cable-installer-westminster-cabl-yagaag";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-alpharetta-cabl-tv1kyi.md": {
	id: "premier-cable-technician-alpharetta-cabl-tv1kyi.md";
  slug: "premier-cable-technician-alpharetta-cabl-tv1kyi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-arvada-cabl-f03hgu.md": {
	id: "premier-cable-technician-arvada-cabl-f03hgu.md";
  slug: "premier-cable-technician-arvada-cabl-f03hgu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-athens-cabl-216ahj.md": {
	id: "premier-cable-technician-athens-cabl-216ahj.md";
  slug: "premier-cable-technician-athens-cabl-216ahj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-athens-cabl-lj8v18.md": {
	id: "premier-cable-technician-athens-cabl-lj8v18.md";
  slug: "premier-cable-technician-athens-cabl-lj8v18";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-atlanta-cabl-zeoqhb.md": {
	id: "premier-cable-technician-atlanta-cabl-zeoqhb.md";
  slug: "premier-cable-technician-atlanta-cabl-zeoqhb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-aurora-cabl-x03ik1.md": {
	id: "premier-cable-technician-aurora-cabl-x03ik1.md";
  slug: "premier-cable-technician-aurora-cabl-x03ik1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-centennial-cabl-rrfz7j.md": {
	id: "premier-cable-technician-centennial-cabl-rrfz7j.md";
  slug: "premier-cable-technician-centennial-cabl-rrfz7j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-colorado-springs-cabl-rez163.md": {
	id: "premier-cable-technician-colorado-springs-cabl-rez163.md";
  slug: "premier-cable-technician-colorado-springs-cabl-rez163";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-denver-cabl-8mq4mr.md": {
	id: "premier-cable-technician-denver-cabl-8mq4mr.md";
  slug: "premier-cable-technician-denver-cabl-8mq4mr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-duluth-cabl-1h0n34.md": {
	id: "premier-cable-technician-duluth-cabl-1h0n34.md";
  slug: "premier-cable-technician-duluth-cabl-1h0n34";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-dunwoody-cabl-f2gbcs.md": {
	id: "premier-cable-technician-dunwoody-cabl-f2gbcs.md";
  slug: "premier-cable-technician-dunwoody-cabl-f2gbcs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-fort-collins-cabl-kxosig.md": {
	id: "premier-cable-technician-fort-collins-cabl-kxosig.md";
  slug: "premier-cable-technician-fort-collins-cabl-kxosig";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-johns-creek-cabl-myfnpj.md": {
	id: "premier-cable-technician-johns-creek-cabl-myfnpj.md";
  slug: "premier-cable-technician-johns-creek-cabl-myfnpj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-kennesaw-cabl-dtxzxn.md": {
	id: "premier-cable-technician-kennesaw-cabl-dtxzxn.md";
  slug: "premier-cable-technician-kennesaw-cabl-dtxzxn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-lakewood-cabl-lkmuyo.md": {
	id: "premier-cable-technician-lakewood-cabl-lkmuyo.md";
  slug: "premier-cable-technician-lakewood-cabl-lkmuyo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-lawrenceville-cabl-j197wd.md": {
	id: "premier-cable-technician-lawrenceville-cabl-j197wd.md";
  slug: "premier-cable-technician-lawrenceville-cabl-j197wd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-pueblo-cabl-9cdyvy.md": {
	id: "premier-cable-technician-pueblo-cabl-9cdyvy.md";
  slug: "premier-cable-technician-pueblo-cabl-9cdyvy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-roswell-cabl-7nwn1k.md": {
	id: "premier-cable-technician-roswell-cabl-7nwn1k.md";
  slug: "premier-cable-technician-roswell-cabl-7nwn1k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-sandy-springs-cabl-munxim.md": {
	id: "premier-cable-technician-sandy-springs-cabl-munxim.md";
  slug: "premier-cable-technician-sandy-springs-cabl-munxim";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-smyrna-cabl-5cyejx.md": {
	id: "premier-cable-technician-smyrna-cabl-5cyejx.md";
  slug: "premier-cable-technician-smyrna-cabl-5cyejx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-thornton-cabl-qkde1h.md": {
	id: "premier-cable-technician-thornton-cabl-qkde1h.md";
  slug: "premier-cable-technician-thornton-cabl-qkde1h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-cable-technician-westminster-cabl-57p02l.md": {
	id: "premier-cable-technician-westminster-cabl-57p02l.md";
  slug: "premier-cable-technician-westminster-cabl-57p02l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-alpharetta-comm-8f5sk0.md": {
	id: "premier-commercial-electrician-alpharetta-comm-8f5sk0.md";
  slug: "premier-commercial-electrician-alpharetta-comm-8f5sk0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-arvada-comm-b30e3s.md": {
	id: "premier-commercial-electrician-arvada-comm-b30e3s.md";
  slug: "premier-commercial-electrician-arvada-comm-b30e3s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-asheville-comm-lfcvs3.md": {
	id: "premier-commercial-electrician-asheville-comm-lfcvs3.md";
  slug: "premier-commercial-electrician-asheville-comm-lfcvs3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-athens-comm-pi3hgx.md": {
	id: "premier-commercial-electrician-athens-comm-pi3hgx.md";
  slug: "premier-commercial-electrician-athens-comm-pi3hgx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-atlanta-comm-gqr6xa.md": {
	id: "premier-commercial-electrician-atlanta-comm-gqr6xa.md";
  slug: "premier-commercial-electrician-atlanta-comm-gqr6xa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-aurora-comm-d1766e.md": {
	id: "premier-commercial-electrician-aurora-comm-d1766e.md";
  slug: "premier-commercial-electrician-aurora-comm-d1766e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-cary-comm-cqpyg9.md": {
	id: "premier-commercial-electrician-cary-comm-cqpyg9.md";
  slug: "premier-commercial-electrician-cary-comm-cqpyg9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-centennial-comm-3gs7ml.md": {
	id: "premier-commercial-electrician-centennial-comm-3gs7ml.md";
  slug: "premier-commercial-electrician-centennial-comm-3gs7ml";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-chapel hill-comm-uelo40.md": {
	id: "premier-commercial-electrician-chapel hill-comm-uelo40.md";
  slug: "premier-commercial-electrician-chapel-hill-comm-uelo40";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-charleston-comm-8fx91a.md": {
	id: "premier-commercial-electrician-charleston-comm-8fx91a.md";
  slug: "premier-commercial-electrician-charleston-comm-8fx91a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-charlotte-comm-i2rrxx.md": {
	id: "premier-commercial-electrician-charlotte-comm-i2rrxx.md";
  slug: "premier-commercial-electrician-charlotte-comm-i2rrxx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-colorado springs-comm-8si72c.md": {
	id: "premier-commercial-electrician-colorado springs-comm-8si72c.md";
  slug: "premier-commercial-electrician-colorado-springs-comm-8si72c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-columbia-comm-p91lm6.md": {
	id: "premier-commercial-electrician-columbia-comm-p91lm6.md";
  slug: "premier-commercial-electrician-columbia-comm-p91lm6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-denver-comm-q7vn3h.md": {
	id: "premier-commercial-electrician-denver-comm-q7vn3h.md";
  slug: "premier-commercial-electrician-denver-comm-q7vn3h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-duluth-comm-hndrui.md": {
	id: "premier-commercial-electrician-duluth-comm-hndrui.md";
  slug: "premier-commercial-electrician-duluth-comm-hndrui";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-dunwoody-comm-mmf85o.md": {
	id: "premier-commercial-electrician-dunwoody-comm-mmf85o.md";
  slug: "premier-commercial-electrician-dunwoody-comm-mmf85o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-durham-comm-341xgl.md": {
	id: "premier-commercial-electrician-durham-comm-341xgl.md";
  slug: "premier-commercial-electrician-durham-comm-341xgl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-fort collins-comm-db93p1.md": {
	id: "premier-commercial-electrician-fort collins-comm-db93p1.md";
  slug: "premier-commercial-electrician-fort-collins-comm-db93p1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-goose creek-comm-9gjdtg.md": {
	id: "premier-commercial-electrician-goose creek-comm-9gjdtg.md";
  slug: "premier-commercial-electrician-goose-creek-comm-9gjdtg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-greensboro-comm-boymzn.md": {
	id: "premier-commercial-electrician-greensboro-comm-boymzn.md";
  slug: "premier-commercial-electrician-greensboro-comm-boymzn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-greenville-comm-zhbv2t.md": {
	id: "premier-commercial-electrician-greenville-comm-zhbv2t.md";
  slug: "premier-commercial-electrician-greenville-comm-zhbv2t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-hilton head island-comm-7x3o62.md": {
	id: "premier-commercial-electrician-hilton head island-comm-7x3o62.md";
  slug: "premier-commercial-electrician-hilton-head-island-comm-7x3o62";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-johns creek-comm-68crrq.md": {
	id: "premier-commercial-electrician-johns creek-comm-68crrq.md";
  slug: "premier-commercial-electrician-johns-creek-comm-68crrq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-kennesaw-comm-n3a9fd.md": {
	id: "premier-commercial-electrician-kennesaw-comm-n3a9fd.md";
  slug: "premier-commercial-electrician-kennesaw-comm-n3a9fd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-lakewood-comm-nyz52j.md": {
	id: "premier-commercial-electrician-lakewood-comm-nyz52j.md";
  slug: "premier-commercial-electrician-lakewood-comm-nyz52j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-lawrenceville-comm-vgsece.md": {
	id: "premier-commercial-electrician-lawrenceville-comm-vgsece.md";
  slug: "premier-commercial-electrician-lawrenceville-comm-vgsece";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-marietta-comm-6m4zah.md": {
	id: "premier-commercial-electrician-marietta-comm-6m4zah.md";
  slug: "premier-commercial-electrician-marietta-comm-6m4zah";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-mount pleasant-comm-vzce1y.md": {
	id: "premier-commercial-electrician-mount pleasant-comm-vzce1y.md";
  slug: "premier-commercial-electrician-mount-pleasant-comm-vzce1y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-north charleston-comm-3pv9a5.md": {
	id: "premier-commercial-electrician-north charleston-comm-3pv9a5.md";
  slug: "premier-commercial-electrician-north-charleston-comm-3pv9a5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-pueblo-comm-m6i9ir.md": {
	id: "premier-commercial-electrician-pueblo-comm-m6i9ir.md";
  slug: "premier-commercial-electrician-pueblo-comm-m6i9ir";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-raleigh-comm-5ghl5j.md": {
	id: "premier-commercial-electrician-raleigh-comm-5ghl5j.md";
  slug: "premier-commercial-electrician-raleigh-comm-5ghl5j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-rock hill-comm-olp44u.md": {
	id: "premier-commercial-electrician-rock hill-comm-olp44u.md";
  slug: "premier-commercial-electrician-rock-hill-comm-olp44u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-roswell-comm-v8v62k.md": {
	id: "premier-commercial-electrician-roswell-comm-v8v62k.md";
  slug: "premier-commercial-electrician-roswell-comm-v8v62k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-sandy springs-comm-9jeay3.md": {
	id: "premier-commercial-electrician-sandy springs-comm-9jeay3.md";
  slug: "premier-commercial-electrician-sandy-springs-comm-9jeay3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-smyrna-comm-jz7cms.md": {
	id: "premier-commercial-electrician-smyrna-comm-jz7cms.md";
  slug: "premier-commercial-electrician-smyrna-comm-jz7cms";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-summerville-comm-8evp18.md": {
	id: "premier-commercial-electrician-summerville-comm-8evp18.md";
  slug: "premier-commercial-electrician-summerville-comm-8evp18";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-sumter-comm-zhnr7q.md": {
	id: "premier-commercial-electrician-sumter-comm-zhnr7q.md";
  slug: "premier-commercial-electrician-sumter-comm-zhnr7q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-thornton-comm-dcjt9u.md": {
	id: "premier-commercial-electrician-thornton-comm-dcjt9u.md";
  slug: "premier-commercial-electrician-thornton-comm-dcjt9u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-westminster-comm-c7xrls.md": {
	id: "premier-commercial-electrician-westminster-comm-c7xrls.md";
  slug: "premier-commercial-electrician-westminster-comm-c7xrls";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-commercial-electrician-winston-salem-comm-xr79e8.md": {
	id: "premier-commercial-electrician-winston-salem-comm-xr79e8.md";
  slug: "premier-commercial-electrician-winston-salem-comm-xr79e8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-arvada-elec-9lbo76.md": {
	id: "premier-electrician-arvada-elec-9lbo76.md";
  slug: "premier-electrician-arvada-elec-9lbo76";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-aurora-elec-y0smoi.md": {
	id: "premier-electrician-aurora-elec-y0smoi.md";
  slug: "premier-electrician-aurora-elec-y0smoi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-centennial-elec-6wog58.md": {
	id: "premier-electrician-centennial-elec-6wog58.md";
  slug: "premier-electrician-centennial-elec-6wog58";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-colorado-springs-elec-c1ga2t.md": {
	id: "premier-electrician-colorado-springs-elec-c1ga2t.md";
  slug: "premier-electrician-colorado-springs-elec-c1ga2t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-denver-elec-vwwrk0.md": {
	id: "premier-electrician-denver-elec-vwwrk0.md";
  slug: "premier-electrician-denver-elec-vwwrk0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-duluth-elec-28zti8.md": {
	id: "premier-electrician-duluth-elec-28zti8.md";
  slug: "premier-electrician-duluth-elec-28zti8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-dunwoody-elec-47tre8.md": {
	id: "premier-electrician-dunwoody-elec-47tre8.md";
  slug: "premier-electrician-dunwoody-elec-47tre8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-fort-collins-elec-uezlxt.md": {
	id: "premier-electrician-fort-collins-elec-uezlxt.md";
  slug: "premier-electrician-fort-collins-elec-uezlxt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-johns-creek-elec-dmoevs.md": {
	id: "premier-electrician-johns-creek-elec-dmoevs.md";
  slug: "premier-electrician-johns-creek-elec-dmoevs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-kennesaw-elec-7sdrn5.md": {
	id: "premier-electrician-kennesaw-elec-7sdrn5.md";
  slug: "premier-electrician-kennesaw-elec-7sdrn5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-lakewood-elec-1z8m7n.md": {
	id: "premier-electrician-lakewood-elec-1z8m7n.md";
  slug: "premier-electrician-lakewood-elec-1z8m7n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-pueblo-elec-fdv5rr.md": {
	id: "premier-electrician-pueblo-elec-fdv5rr.md";
  slug: "premier-electrician-pueblo-elec-fdv5rr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-smyrna-elec-8lagkw.md": {
	id: "premier-electrician-smyrna-elec-8lagkw.md";
  slug: "premier-electrician-smyrna-elec-8lagkw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-thornton-elec-cugiy5.md": {
	id: "premier-electrician-thornton-elec-cugiy5.md";
  slug: "premier-electrician-thornton-elec-cugiy5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-electrician-westminster-elec-uhzx8m.md": {
	id: "premier-electrician-westminster-elec-uhzx8m.md";
  slug: "premier-electrician-westminster-elec-uhzx8m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-alpharetta-indu-mebp07.md": {
	id: "premier-industrial-electrician-alpharetta-indu-mebp07.md";
  slug: "premier-industrial-electrician-alpharetta-indu-mebp07";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-arvada-indu-usg6po.md": {
	id: "premier-industrial-electrician-arvada-indu-usg6po.md";
  slug: "premier-industrial-electrician-arvada-indu-usg6po";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-asheville-indu-5fo7cl.md": {
	id: "premier-industrial-electrician-asheville-indu-5fo7cl.md";
  slug: "premier-industrial-electrician-asheville-indu-5fo7cl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-athens-indu-rka9qs.md": {
	id: "premier-industrial-electrician-athens-indu-rka9qs.md";
  slug: "premier-industrial-electrician-athens-indu-rka9qs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-atlanta-indu-z49fw7.md": {
	id: "premier-industrial-electrician-atlanta-indu-z49fw7.md";
  slug: "premier-industrial-electrician-atlanta-indu-z49fw7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-aurora-indu-5wgptf.md": {
	id: "premier-industrial-electrician-aurora-indu-5wgptf.md";
  slug: "premier-industrial-electrician-aurora-indu-5wgptf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-cary-indu-cqvcpt.md": {
	id: "premier-industrial-electrician-cary-indu-cqvcpt.md";
  slug: "premier-industrial-electrician-cary-indu-cqvcpt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-centennial-indu-9tofd3.md": {
	id: "premier-industrial-electrician-centennial-indu-9tofd3.md";
  slug: "premier-industrial-electrician-centennial-indu-9tofd3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-chapel hill-indu-y2ak6s.md": {
	id: "premier-industrial-electrician-chapel hill-indu-y2ak6s.md";
  slug: "premier-industrial-electrician-chapel-hill-indu-y2ak6s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-charleston-indu-dethso.md": {
	id: "premier-industrial-electrician-charleston-indu-dethso.md";
  slug: "premier-industrial-electrician-charleston-indu-dethso";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-charlotte-indu-524swe.md": {
	id: "premier-industrial-electrician-charlotte-indu-524swe.md";
  slug: "premier-industrial-electrician-charlotte-indu-524swe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-colorado springs-indu-vzi2ml.md": {
	id: "premier-industrial-electrician-colorado springs-indu-vzi2ml.md";
  slug: "premier-industrial-electrician-colorado-springs-indu-vzi2ml";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-columbia-indu-b4xncv.md": {
	id: "premier-industrial-electrician-columbia-indu-b4xncv.md";
  slug: "premier-industrial-electrician-columbia-indu-b4xncv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-denver-indu-pv5yzj.md": {
	id: "premier-industrial-electrician-denver-indu-pv5yzj.md";
  slug: "premier-industrial-electrician-denver-indu-pv5yzj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-duluth-indu-4at4ao.md": {
	id: "premier-industrial-electrician-duluth-indu-4at4ao.md";
  slug: "premier-industrial-electrician-duluth-indu-4at4ao";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-dunwoody-indu-ksj8fo.md": {
	id: "premier-industrial-electrician-dunwoody-indu-ksj8fo.md";
  slug: "premier-industrial-electrician-dunwoody-indu-ksj8fo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-durham-indu-6q6czh.md": {
	id: "premier-industrial-electrician-durham-indu-6q6czh.md";
  slug: "premier-industrial-electrician-durham-indu-6q6czh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-fort collins-indu-2b8o56.md": {
	id: "premier-industrial-electrician-fort collins-indu-2b8o56.md";
  slug: "premier-industrial-electrician-fort-collins-indu-2b8o56";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-goose creek-indu-scauzo.md": {
	id: "premier-industrial-electrician-goose creek-indu-scauzo.md";
  slug: "premier-industrial-electrician-goose-creek-indu-scauzo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-greensboro-indu-5w1jk4.md": {
	id: "premier-industrial-electrician-greensboro-indu-5w1jk4.md";
  slug: "premier-industrial-electrician-greensboro-indu-5w1jk4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-greenville-indu-jk30zm.md": {
	id: "premier-industrial-electrician-greenville-indu-jk30zm.md";
  slug: "premier-industrial-electrician-greenville-indu-jk30zm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-hilton head island-indu-2bwhxu.md": {
	id: "premier-industrial-electrician-hilton head island-indu-2bwhxu.md";
  slug: "premier-industrial-electrician-hilton-head-island-indu-2bwhxu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-johns creek-indu-cky74q.md": {
	id: "premier-industrial-electrician-johns creek-indu-cky74q.md";
  slug: "premier-industrial-electrician-johns-creek-indu-cky74q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-kennesaw-indu-435mgj.md": {
	id: "premier-industrial-electrician-kennesaw-indu-435mgj.md";
  slug: "premier-industrial-electrician-kennesaw-indu-435mgj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-lakewood-indu-8bgl29.md": {
	id: "premier-industrial-electrician-lakewood-indu-8bgl29.md";
  slug: "premier-industrial-electrician-lakewood-indu-8bgl29";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-lawrenceville-indu-gff8bz.md": {
	id: "premier-industrial-electrician-lawrenceville-indu-gff8bz.md";
  slug: "premier-industrial-electrician-lawrenceville-indu-gff8bz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-marietta-indu-kquyyq.md": {
	id: "premier-industrial-electrician-marietta-indu-kquyyq.md";
  slug: "premier-industrial-electrician-marietta-indu-kquyyq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-mount pleasant-indu-kmalpj.md": {
	id: "premier-industrial-electrician-mount pleasant-indu-kmalpj.md";
  slug: "premier-industrial-electrician-mount-pleasant-indu-kmalpj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-north charleston-indu-81ex6z.md": {
	id: "premier-industrial-electrician-north charleston-indu-81ex6z.md";
  slug: "premier-industrial-electrician-north-charleston-indu-81ex6z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-pueblo-indu-9m4iz7.md": {
	id: "premier-industrial-electrician-pueblo-indu-9m4iz7.md";
  slug: "premier-industrial-electrician-pueblo-indu-9m4iz7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-raleigh-indu-nrchj2.md": {
	id: "premier-industrial-electrician-raleigh-indu-nrchj2.md";
  slug: "premier-industrial-electrician-raleigh-indu-nrchj2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-rock hill-indu-eafpms.md": {
	id: "premier-industrial-electrician-rock hill-indu-eafpms.md";
  slug: "premier-industrial-electrician-rock-hill-indu-eafpms";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-roswell-indu-a55e2v.md": {
	id: "premier-industrial-electrician-roswell-indu-a55e2v.md";
  slug: "premier-industrial-electrician-roswell-indu-a55e2v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-sandy springs-indu-i4ze1f.md": {
	id: "premier-industrial-electrician-sandy springs-indu-i4ze1f.md";
  slug: "premier-industrial-electrician-sandy-springs-indu-i4ze1f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-smyrna-indu-nhg7mt.md": {
	id: "premier-industrial-electrician-smyrna-indu-nhg7mt.md";
  slug: "premier-industrial-electrician-smyrna-indu-nhg7mt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-summerville-indu-y4yds5.md": {
	id: "premier-industrial-electrician-summerville-indu-y4yds5.md";
  slug: "premier-industrial-electrician-summerville-indu-y4yds5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-sumter-indu-f6z5cx.md": {
	id: "premier-industrial-electrician-sumter-indu-f6z5cx.md";
  slug: "premier-industrial-electrician-sumter-indu-f6z5cx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-thornton-indu-2a1k0n.md": {
	id: "premier-industrial-electrician-thornton-indu-2a1k0n.md";
  slug: "premier-industrial-electrician-thornton-indu-2a1k0n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-westminster-indu-7a2za1.md": {
	id: "premier-industrial-electrician-westminster-indu-7a2za1.md";
  slug: "premier-industrial-electrician-westminster-indu-7a2za1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-industrial-electrician-winston-salem-indu-l4fhhg.md": {
	id: "premier-industrial-electrician-winston-salem-indu-l4fhhg.md";
  slug: "premier-industrial-electrician-winston-salem-indu-l4fhhg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-alpharetta-low-2mdfdh.md": {
	id: "premier-low-voltage-technician-alpharetta-low-2mdfdh.md";
  slug: "premier-low-voltage-technician-alpharetta-low-2mdfdh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-athens-low--1bsl8k.md": {
	id: "premier-low-voltage-technician-athens-low--1bsl8k.md";
  slug: "premier-low-voltage-technician-athens-low--1bsl8k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-atlanta-low-aj5k5l.md": {
	id: "premier-low-voltage-technician-atlanta-low-aj5k5l.md";
  slug: "premier-low-voltage-technician-atlanta-low-aj5k5l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-lawrenceville-low--307dkz.md": {
	id: "premier-low-voltage-technician-lawrenceville-low--307dkz.md";
  slug: "premier-low-voltage-technician-lawrenceville-low--307dkz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-roswell-low-8bx2bm.md": {
	id: "premier-low-voltage-technician-roswell-low-8bx2bm.md";
  slug: "premier-low-voltage-technician-roswell-low-8bx2bm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-low-voltage-technician-sandy springs-low-tb7vnl.md": {
	id: "premier-low-voltage-technician-sandy springs-low-tb7vnl.md";
  slug: "premier-low-voltage-technician-sandy-springs-low-tb7vnl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-recruiter-heritage-bd983101.md": {
	id: "premier-recruiter-heritage-bd983101.md";
  slug: "premier-recruiter-heritage-bd983101";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-recruiter-phoenix-id-bf899331.md": {
	id: "premier-recruiter-phoenix-id-bf899331.md";
  slug: "premier-recruiter-phoenix-id-bf899331";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-recruiter-richmond-ht930182.md": {
	id: "premier-recruiter-richmond-ht930182.md";
  slug: "premier-recruiter-richmond-ht930182";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-arvada-voic-d4ou4h.md": {
	id: "premier-voice-&-data-installer-arvada-voic-d4ou4h.md";
  slug: "premier-voice--data-installer-arvada-voic-d4ou4h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-aurora-voic-gjje0r.md": {
	id: "premier-voice-&-data-installer-aurora-voic-gjje0r.md";
  slug: "premier-voice--data-installer-aurora-voic-gjje0r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-centennial-voic-9iuopd.md": {
	id: "premier-voice-&-data-installer-centennial-voic-9iuopd.md";
  slug: "premier-voice--data-installer-centennial-voic-9iuopd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-colorado-springs-voic-gv8r3i.md": {
	id: "premier-voice-&-data-installer-colorado-springs-voic-gv8r3i.md";
  slug: "premier-voice--data-installer-colorado-springs-voic-gv8r3i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-denver-voic-n0b63x.md": {
	id: "premier-voice-&-data-installer-denver-voic-n0b63x.md";
  slug: "premier-voice--data-installer-denver-voic-n0b63x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-duluth-voic-20i4yt.md": {
	id: "premier-voice-&-data-installer-duluth-voic-20i4yt.md";
  slug: "premier-voice--data-installer-duluth-voic-20i4yt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-dunwoody-voic-8iq0sn.md": {
	id: "premier-voice-&-data-installer-dunwoody-voic-8iq0sn.md";
  slug: "premier-voice--data-installer-dunwoody-voic-8iq0sn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-fort-collins-voic-7p5urz.md": {
	id: "premier-voice-&-data-installer-fort-collins-voic-7p5urz.md";
  slug: "premier-voice--data-installer-fort-collins-voic-7p5urz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-johns-creek-voic-m990ve.md": {
	id: "premier-voice-&-data-installer-johns-creek-voic-m990ve.md";
  slug: "premier-voice--data-installer-johns-creek-voic-m990ve";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-kennesaw-voic-6j4q5c.md": {
	id: "premier-voice-&-data-installer-kennesaw-voic-6j4q5c.md";
  slug: "premier-voice--data-installer-kennesaw-voic-6j4q5c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-lakewood-voic-m4pp6d.md": {
	id: "premier-voice-&-data-installer-lakewood-voic-m4pp6d.md";
  slug: "premier-voice--data-installer-lakewood-voic-m4pp6d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-pueblo-voic-4gdjn2.md": {
	id: "premier-voice-&-data-installer-pueblo-voic-4gdjn2.md";
  slug: "premier-voice--data-installer-pueblo-voic-4gdjn2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-smyrna-voic-y1jr6t.md": {
	id: "premier-voice-&-data-installer-smyrna-voic-y1jr6t.md";
  slug: "premier-voice--data-installer-smyrna-voic-y1jr6t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-thornton-voic-g3umdv.md": {
	id: "premier-voice-&-data-installer-thornton-voic-g3umdv.md";
  slug: "premier-voice--data-installer-thornton-voic-g3umdv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"premier-voice-&-data-installer-westminster-voic-41b9hc.md": {
	id: "premier-voice-&-data-installer-westminster-voic-41b9hc.md";
  slug: "premier-voice--data-installer-westminster-voic-41b9hc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y.md": {
	id: "prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y.md";
  slug: "prime-commercial-journeyman-electrician-anaheim-comm-ck8s0y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-chandler-comm-7nnezz.md": {
	id: "prime-commercial-journeyman-electrician-chandler-comm-7nnezz.md";
  slug: "prime-commercial-journeyman-electrician-chandler-comm-7nnezz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-glendale-comm-h5chx1.md": {
	id: "prime-commercial-journeyman-electrician-glendale-comm-h5chx1.md";
  slug: "prime-commercial-journeyman-electrician-glendale-comm-h5chx1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-irvine-comm-swb0y0.md": {
	id: "prime-commercial-journeyman-electrician-irvine-comm-swb0y0.md";
  slug: "prime-commercial-journeyman-electrician-irvine-comm-swb0y0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8.md": {
	id: "prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8.md";
  slug: "prime-commercial-journeyman-electrician-long-beach-comm-9kp6h8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-los-angeles-comm-0y068v.md": {
	id: "prime-commercial-journeyman-electrician-los-angeles-comm-0y068v.md";
  slug: "prime-commercial-journeyman-electrician-los-angeles-comm-0y068v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-mesa-comm-d4gbrt.md": {
	id: "prime-commercial-journeyman-electrician-mesa-comm-d4gbrt.md";
  slug: "prime-commercial-journeyman-electrician-mesa-comm-d4gbrt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-pasadena-comm-rk762a.md": {
	id: "prime-commercial-journeyman-electrician-pasadena-comm-rk762a.md";
  slug: "prime-commercial-journeyman-electrician-pasadena-comm-rk762a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-phoenix-comm-idfapv.md": {
	id: "prime-commercial-journeyman-electrician-phoenix-comm-idfapv.md";
  slug: "prime-commercial-journeyman-electrician-phoenix-comm-idfapv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0.md": {
	id: "prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0.md";
  slug: "prime-commercial-journeyman-electrician-sacramento-comm-6gzvh0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-diego-comm-00es8o.md": {
	id: "prime-commercial-journeyman-electrician-san-diego-comm-00es8o.md";
  slug: "prime-commercial-journeyman-electrician-san-diego-comm-00es8o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-francisco-comm-n65fom.md": {
	id: "prime-commercial-journeyman-electrician-san-francisco-comm-n65fom.md";
  slug: "prime-commercial-journeyman-electrician-san-francisco-comm-n65fom";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-san-jose-comm-d622x3.md": {
	id: "prime-commercial-journeyman-electrician-san-jose-comm-d622x3.md";
  slug: "prime-commercial-journeyman-electrician-san-jose-comm-d622x3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt.md": {
	id: "prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt.md";
  slug: "prime-commercial-journeyman-electrician-scottsdale-comm-ig5lzt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-commercial-journeyman-electrician-tempe-comm-93v5n6.md": {
	id: "prime-commercial-journeyman-electrician-tempe-comm-93v5n6.md";
  slug: "prime-commercial-journeyman-electrician-tempe-comm-93v5n6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-anaheim-elec-0kd2xp.md": {
	id: "prime-electrician-anaheim-elec-0kd2xp.md";
  slug: "prime-electrician-anaheim-elec-0kd2xp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-chandler-elec-eequr6.md": {
	id: "prime-electrician-chandler-elec-eequr6.md";
  slug: "prime-electrician-chandler-elec-eequr6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-glendale-elec-obcza8.md": {
	id: "prime-electrician-glendale-elec-obcza8.md";
  slug: "prime-electrician-glendale-elec-obcza8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-irvine-elec-8n6i2t.md": {
	id: "prime-electrician-irvine-elec-8n6i2t.md";
  slug: "prime-electrician-irvine-elec-8n6i2t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-long-beach-elec-ys1jti.md": {
	id: "prime-electrician-long-beach-elec-ys1jti.md";
  slug: "prime-electrician-long-beach-elec-ys1jti";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-los-angeles-elec-xo2z6k.md": {
	id: "prime-electrician-los-angeles-elec-xo2z6k.md";
  slug: "prime-electrician-los-angeles-elec-xo2z6k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-mesa-elec-6mu8k3.md": {
	id: "prime-electrician-mesa-elec-6mu8k3.md";
  slug: "prime-electrician-mesa-elec-6mu8k3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-pasadena-elec-a4bn4m.md": {
	id: "prime-electrician-pasadena-elec-a4bn4m.md";
  slug: "prime-electrician-pasadena-elec-a4bn4m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-phoenix-elec-qhttju.md": {
	id: "prime-electrician-phoenix-elec-qhttju.md";
  slug: "prime-electrician-phoenix-elec-qhttju";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-sacramento-elec-qx5bjp.md": {
	id: "prime-electrician-sacramento-elec-qx5bjp.md";
  slug: "prime-electrician-sacramento-elec-qx5bjp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-san-diego-elec-m2088p.md": {
	id: "prime-electrician-san-diego-elec-m2088p.md";
  slug: "prime-electrician-san-diego-elec-m2088p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-san-francisco-elec-dns0ep.md": {
	id: "prime-electrician-san-francisco-elec-dns0ep.md";
  slug: "prime-electrician-san-francisco-elec-dns0ep";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-san-jose-elec-qsfba0.md": {
	id: "prime-electrician-san-jose-elec-qsfba0.md";
  slug: "prime-electrician-san-jose-elec-qsfba0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-scottsdale-elec-a9vql0.md": {
	id: "prime-electrician-scottsdale-elec-a9vql0.md";
  slug: "prime-electrician-scottsdale-elec-a9vql0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-electrician-tempe-elec-x7ugkl.md": {
	id: "prime-electrician-tempe-elec-x7ugkl.md";
  slug: "prime-electrician-tempe-elec-x7ugkl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-anaheim-fire-wl6fkr.md": {
	id: "prime-fire-alarm-installer-anaheim-fire-wl6fkr.md";
  slug: "prime-fire-alarm-installer-anaheim-fire-wl6fkr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-chandler-fire-gyd4fo.md": {
	id: "prime-fire-alarm-installer-chandler-fire-gyd4fo.md";
  slug: "prime-fire-alarm-installer-chandler-fire-gyd4fo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-glendale-fire-urrp9u.md": {
	id: "prime-fire-alarm-installer-glendale-fire-urrp9u.md";
  slug: "prime-fire-alarm-installer-glendale-fire-urrp9u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-irvine-fire-h0p6na.md": {
	id: "prime-fire-alarm-installer-irvine-fire-h0p6na.md";
  slug: "prime-fire-alarm-installer-irvine-fire-h0p6na";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-long-beach-fire-2jkpa1.md": {
	id: "prime-fire-alarm-installer-long-beach-fire-2jkpa1.md";
  slug: "prime-fire-alarm-installer-long-beach-fire-2jkpa1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-los-angeles-fire-jbsabq.md": {
	id: "prime-fire-alarm-installer-los-angeles-fire-jbsabq.md";
  slug: "prime-fire-alarm-installer-los-angeles-fire-jbsabq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-mesa-fire-hzyvcx.md": {
	id: "prime-fire-alarm-installer-mesa-fire-hzyvcx.md";
  slug: "prime-fire-alarm-installer-mesa-fire-hzyvcx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-pasadena-fire-vae7br.md": {
	id: "prime-fire-alarm-installer-pasadena-fire-vae7br.md";
  slug: "prime-fire-alarm-installer-pasadena-fire-vae7br";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-phoenix-fire-h982df.md": {
	id: "prime-fire-alarm-installer-phoenix-fire-h982df.md";
  slug: "prime-fire-alarm-installer-phoenix-fire-h982df";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-sacramento-fire-fd3joi.md": {
	id: "prime-fire-alarm-installer-sacramento-fire-fd3joi.md";
  slug: "prime-fire-alarm-installer-sacramento-fire-fd3joi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-diego-fire-dmifb0.md": {
	id: "prime-fire-alarm-installer-san-diego-fire-dmifb0.md";
  slug: "prime-fire-alarm-installer-san-diego-fire-dmifb0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-francisco-fire-628bbd.md": {
	id: "prime-fire-alarm-installer-san-francisco-fire-628bbd.md";
  slug: "prime-fire-alarm-installer-san-francisco-fire-628bbd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-san-jose-fire-c9zdch.md": {
	id: "prime-fire-alarm-installer-san-jose-fire-c9zdch.md";
  slug: "prime-fire-alarm-installer-san-jose-fire-c9zdch";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-scottsdale-fire-g9gqfm.md": {
	id: "prime-fire-alarm-installer-scottsdale-fire-g9gqfm.md";
  slug: "prime-fire-alarm-installer-scottsdale-fire-g9gqfm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-installer-tempe-fire-tpsp68.md": {
	id: "prime-fire-alarm-installer-tempe-fire-tpsp68.md";
  slug: "prime-fire-alarm-installer-tempe-fire-tpsp68";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-alpharetta-fire-dkje2h.md": {
	id: "prime-fire-alarm-technician-alpharetta-fire-dkje2h.md";
  slug: "prime-fire-alarm-technician-alpharetta-fire-dkje2h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-anaheim-fire-02iats.md": {
	id: "prime-fire-alarm-technician-anaheim-fire-02iats.md";
  slug: "prime-fire-alarm-technician-anaheim-fire-02iats";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-anaheim-fire-dzfo02.md": {
	id: "prime-fire-alarm-technician-anaheim-fire-dzfo02.md";
  slug: "prime-fire-alarm-technician-anaheim-fire-dzfo02";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-atlanta-fire-n4hvho.md": {
	id: "prime-fire-alarm-technician-atlanta-fire-n4hvho.md";
  slug: "prime-fire-alarm-technician-atlanta-fire-n4hvho";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-berkeley-fire-jaarwc.md": {
	id: "prime-fire-alarm-technician-berkeley-fire-jaarwc.md";
  slug: "prime-fire-alarm-technician-berkeley-fire-jaarwc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-burbank-fire-sp4eba.md": {
	id: "prime-fire-alarm-technician-burbank-fire-sp4eba.md";
  slug: "prime-fire-alarm-technician-burbank-fire-sp4eba";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-chandler-fire-an6r8g.md": {
	id: "prime-fire-alarm-technician-chandler-fire-an6r8g.md";
  slug: "prime-fire-alarm-technician-chandler-fire-an6r8g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-cupertino-fire-9lgxnl.md": {
	id: "prime-fire-alarm-technician-cupertino-fire-9lgxnl.md";
  slug: "prime-fire-alarm-technician-cupertino-fire-9lgxnl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-fremont-fire-jfa3ml.md": {
	id: "prime-fire-alarm-technician-fremont-fire-jfa3ml.md";
  slug: "prime-fire-alarm-technician-fremont-fire-jfa3ml";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-glendale-fire-1gbzyj.md": {
	id: "prime-fire-alarm-technician-glendale-fire-1gbzyj.md";
  slug: "prime-fire-alarm-technician-glendale-fire-1gbzyj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-glendale-fire-qv88ri.md": {
	id: "prime-fire-alarm-technician-glendale-fire-qv88ri.md";
  slug: "prime-fire-alarm-technician-glendale-fire-qv88ri";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-irvine-fire-gg6oxo.md": {
	id: "prime-fire-alarm-technician-irvine-fire-gg6oxo.md";
  slug: "prime-fire-alarm-technician-irvine-fire-gg6oxo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-irvine-fire-lyzhjz.md": {
	id: "prime-fire-alarm-technician-irvine-fire-lyzhjz.md";
  slug: "prime-fire-alarm-technician-irvine-fire-lyzhjz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-long beach-fire-2grrzr.md": {
	id: "prime-fire-alarm-technician-long beach-fire-2grrzr.md";
  slug: "prime-fire-alarm-technician-long-beach-fire-2grrzr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-long-beach-fire-15rdex.md": {
	id: "prime-fire-alarm-technician-long-beach-fire-15rdex.md";
  slug: "prime-fire-alarm-technician-long-beach-fire-15rdex";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-los angeles-fire-o0llwi.md": {
	id: "prime-fire-alarm-technician-los angeles-fire-o0llwi.md";
  slug: "prime-fire-alarm-technician-los-angeles-fire-o0llwi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-los-angeles-fire-nodqdg.md": {
	id: "prime-fire-alarm-technician-los-angeles-fire-nodqdg.md";
  slug: "prime-fire-alarm-technician-los-angeles-fire-nodqdg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-marietta-fire-pvp13v.md": {
	id: "prime-fire-alarm-technician-marietta-fire-pvp13v.md";
  slug: "prime-fire-alarm-technician-marietta-fire-pvp13v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-mesa-fire-1qnooa.md": {
	id: "prime-fire-alarm-technician-mesa-fire-1qnooa.md";
  slug: "prime-fire-alarm-technician-mesa-fire-1qnooa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-mountain view-fire-b486ec.md": {
	id: "prime-fire-alarm-technician-mountain view-fire-b486ec.md";
  slug: "prime-fire-alarm-technician-mountain-view-fire-b486ec";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-oakland-fire-ghmkid.md": {
	id: "prime-fire-alarm-technician-oakland-fire-ghmkid.md";
  slug: "prime-fire-alarm-technician-oakland-fire-ghmkid";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-palo alto-fire-dvumfw.md": {
	id: "prime-fire-alarm-technician-palo alto-fire-dvumfw.md";
  slug: "prime-fire-alarm-technician-palo-alto-fire-dvumfw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-pasadena-fire-a33ee2.md": {
	id: "prime-fire-alarm-technician-pasadena-fire-a33ee2.md";
  slug: "prime-fire-alarm-technician-pasadena-fire-a33ee2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-pasadena-fire-i29h1b.md": {
	id: "prime-fire-alarm-technician-pasadena-fire-i29h1b.md";
  slug: "prime-fire-alarm-technician-pasadena-fire-i29h1b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-phoenix-fire-5nt7qt.md": {
	id: "prime-fire-alarm-technician-phoenix-fire-5nt7qt.md";
  slug: "prime-fire-alarm-technician-phoenix-fire-5nt7qt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-roswell-fire-az1hqy.md": {
	id: "prime-fire-alarm-technician-roswell-fire-az1hqy.md";
  slug: "prime-fire-alarm-technician-roswell-fire-az1hqy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sacramento-fire-7paiit.md": {
	id: "prime-fire-alarm-technician-sacramento-fire-7paiit.md";
  slug: "prime-fire-alarm-technician-sacramento-fire-7paiit";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sacramento-fire-varbyd.md": {
	id: "prime-fire-alarm-technician-sacramento-fire-varbyd.md";
  slug: "prime-fire-alarm-technician-sacramento-fire-varbyd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san diego-fire-e3ab3m.md": {
	id: "prime-fire-alarm-technician-san diego-fire-e3ab3m.md";
  slug: "prime-fire-alarm-technician-san-diego-fire-e3ab3m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san francisco-fire-wra0gw.md": {
	id: "prime-fire-alarm-technician-san francisco-fire-wra0gw.md";
  slug: "prime-fire-alarm-technician-san-francisco-fire-wra0gw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san jose-fire-lap070.md": {
	id: "prime-fire-alarm-technician-san jose-fire-lap070.md";
  slug: "prime-fire-alarm-technician-san-jose-fire-lap070";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san-diego-fire-k1e79w.md": {
	id: "prime-fire-alarm-technician-san-diego-fire-k1e79w.md";
  slug: "prime-fire-alarm-technician-san-diego-fire-k1e79w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san-francisco-fire-e611u3.md": {
	id: "prime-fire-alarm-technician-san-francisco-fire-e611u3.md";
  slug: "prime-fire-alarm-technician-san-francisco-fire-e611u3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-san-jose-fire-fd9hg9.md": {
	id: "prime-fire-alarm-technician-san-jose-fire-fd9hg9.md";
  slug: "prime-fire-alarm-technician-san-jose-fire-fd9hg9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sandy springs-fire-rsl73p.md": {
	id: "prime-fire-alarm-technician-sandy springs-fire-rsl73p.md";
  slug: "prime-fire-alarm-technician-sandy-springs-fire-rsl73p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-santa clara-fire-r76nqt.md": {
	id: "prime-fire-alarm-technician-santa clara-fire-r76nqt.md";
  slug: "prime-fire-alarm-technician-santa-clara-fire-r76nqt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-santa monica-fire-hkqgk1.md": {
	id: "prime-fire-alarm-technician-santa monica-fire-hkqgk1.md";
  slug: "prime-fire-alarm-technician-santa-monica-fire-hkqgk1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-scottsdale-fire-4drfg6.md": {
	id: "prime-fire-alarm-technician-scottsdale-fire-4drfg6.md";
  slug: "prime-fire-alarm-technician-scottsdale-fire-4drfg6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-sunnyvale-fire-qgi6y1.md": {
	id: "prime-fire-alarm-technician-sunnyvale-fire-qgi6y1.md";
  slug: "prime-fire-alarm-technician-sunnyvale-fire-qgi6y1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-fire-alarm-technician-tempe-fire-ttbge4.md": {
	id: "prime-fire-alarm-technician-tempe-fire-ttbge4.md";
  slug: "prime-fire-alarm-technician-tempe-fire-ttbge4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-anaheim-jour-5hr310.md": {
	id: "prime-journeyman-electrician-anaheim-jour-5hr310.md";
  slug: "prime-journeyman-electrician-anaheim-jour-5hr310";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-avondale-jour-q8w0ic.md": {
	id: "prime-journeyman-electrician-avondale-jour-q8w0ic.md";
  slug: "prime-journeyman-electrician-avondale-jour-q8w0ic";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-bakersfield-jour-r3sj0g.md": {
	id: "prime-journeyman-electrician-bakersfield-jour-r3sj0g.md";
  slug: "prime-journeyman-electrician-bakersfield-jour-r3sj0g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-berkeley-jour-fowddi.md": {
	id: "prime-journeyman-electrician-berkeley-jour-fowddi.md";
  slug: "prime-journeyman-electrician-berkeley-jour-fowddi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-buckeye-jour-47ae4v.md": {
	id: "prime-journeyman-electrician-buckeye-jour-47ae4v.md";
  slug: "prime-journeyman-electrician-buckeye-jour-47ae4v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-burbank-jour-o8rmok.md": {
	id: "prime-journeyman-electrician-burbank-jour-o8rmok.md";
  slug: "prime-journeyman-electrician-burbank-jour-o8rmok";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-casa grande-jour-tr64pf.md": {
	id: "prime-journeyman-electrician-casa grande-jour-tr64pf.md";
  slug: "prime-journeyman-electrician-casa-grande-jour-tr64pf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chandler-jour-al0ztx.md": {
	id: "prime-journeyman-electrician-chandler-jour-al0ztx.md";
  slug: "prime-journeyman-electrician-chandler-jour-al0ztx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chandler-jour-uormtk.md": {
	id: "prime-journeyman-electrician-chandler-jour-uormtk.md";
  slug: "prime-journeyman-electrician-chandler-jour-uormtk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-chula vista-jour-idwnpj.md": {
	id: "prime-journeyman-electrician-chula vista-jour-idwnpj.md";
  slug: "prime-journeyman-electrician-chula-vista-jour-idwnpj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-corona-jour-3ha6v9.md": {
	id: "prime-journeyman-electrician-corona-jour-3ha6v9.md";
  slug: "prime-journeyman-electrician-corona-jour-3ha6v9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-cupertino-jour-cvge8h.md": {
	id: "prime-journeyman-electrician-cupertino-jour-cvge8h.md";
  slug: "prime-journeyman-electrician-cupertino-jour-cvge8h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-elk grove-jour-56hpfe.md": {
	id: "prime-journeyman-electrician-elk grove-jour-56hpfe.md";
  slug: "prime-journeyman-electrician-elk-grove-jour-56hpfe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-escondido-jour-4qoumj.md": {
	id: "prime-journeyman-electrician-escondido-jour-4qoumj.md";
  slug: "prime-journeyman-electrician-escondido-jour-4qoumj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-flagstaff-jour-k4y473.md": {
	id: "prime-journeyman-electrician-flagstaff-jour-k4y473.md";
  slug: "prime-journeyman-electrician-flagstaff-jour-k4y473";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fontana-jour-7aj64o.md": {
	id: "prime-journeyman-electrician-fontana-jour-7aj64o.md";
  slug: "prime-journeyman-electrician-fontana-jour-7aj64o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fremont-jour-u1ryee.md": {
	id: "prime-journeyman-electrician-fremont-jour-u1ryee.md";
  slug: "prime-journeyman-electrician-fremont-jour-u1ryee";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fresno-jour-7rms4c.md": {
	id: "prime-journeyman-electrician-fresno-jour-7rms4c.md";
  slug: "prime-journeyman-electrician-fresno-jour-7rms4c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-fullerton-jour-6na9iw.md": {
	id: "prime-journeyman-electrician-fullerton-jour-6na9iw.md";
  slug: "prime-journeyman-electrician-fullerton-jour-6na9iw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-garden grove-jour-a8qzot.md": {
	id: "prime-journeyman-electrician-garden grove-jour-a8qzot.md";
  slug: "prime-journeyman-electrician-garden-grove-jour-a8qzot";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-gilbert-jour-3f60om.md": {
	id: "prime-journeyman-electrician-gilbert-jour-3f60om.md";
  slug: "prime-journeyman-electrician-gilbert-jour-3f60om";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-gilbert-jour-y7gxbf.md": {
	id: "prime-journeyman-electrician-gilbert-jour-y7gxbf.md";
  slug: "prime-journeyman-electrician-gilbert-jour-y7gxbf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-4s4qra.md": {
	id: "prime-journeyman-electrician-glendale-jour-4s4qra.md";
  slug: "prime-journeyman-electrician-glendale-jour-4s4qra";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-9tffnl.md": {
	id: "prime-journeyman-electrician-glendale-jour-9tffnl.md";
  slug: "prime-journeyman-electrician-glendale-jour-9tffnl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-glendale-jour-s3mw44.md": {
	id: "prime-journeyman-electrician-glendale-jour-s3mw44.md";
  slug: "prime-journeyman-electrician-glendale-jour-s3mw44";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-goodyear-jour-0kbi3w.md": {
	id: "prime-journeyman-electrician-goodyear-jour-0kbi3w.md";
  slug: "prime-journeyman-electrician-goodyear-jour-0kbi3w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-hayward-jour-23hvtr.md": {
	id: "prime-journeyman-electrician-hayward-jour-23hvtr.md";
  slug: "prime-journeyman-electrician-hayward-jour-23hvtr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-huntington beach-jour-60qwig.md": {
	id: "prime-journeyman-electrician-huntington beach-jour-60qwig.md";
  slug: "prime-journeyman-electrician-huntington-beach-jour-60qwig";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-irvine-jour-9o5rpa.md": {
	id: "prime-journeyman-electrician-irvine-jour-9o5rpa.md";
  slug: "prime-journeyman-electrician-irvine-jour-9o5rpa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-lake havasu city-jour-ueyabi.md": {
	id: "prime-journeyman-electrician-lake havasu city-jour-ueyabi.md";
  slug: "prime-journeyman-electrician-lake-havasu-city-jour-ueyabi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-lancaster-jour-9zqaoj.md": {
	id: "prime-journeyman-electrician-lancaster-jour-9zqaoj.md";
  slug: "prime-journeyman-electrician-lancaster-jour-9zqaoj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-long beach-jour-6igal0.md": {
	id: "prime-journeyman-electrician-long beach-jour-6igal0.md";
  slug: "prime-journeyman-electrician-long-beach-jour-6igal0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-los angeles-jour-ur64ta.md": {
	id: "prime-journeyman-electrician-los angeles-jour-ur64ta.md";
  slug: "prime-journeyman-electrician-los-angeles-jour-ur64ta";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-maricopa-jour-mcwfae.md": {
	id: "prime-journeyman-electrician-maricopa-jour-mcwfae.md";
  slug: "prime-journeyman-electrician-maricopa-jour-mcwfae";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mesa-jour-2e3nvw.md": {
	id: "prime-journeyman-electrician-mesa-jour-2e3nvw.md";
  slug: "prime-journeyman-electrician-mesa-jour-2e3nvw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mesa-jour-ggyx8a.md": {
	id: "prime-journeyman-electrician-mesa-jour-ggyx8a.md";
  slug: "prime-journeyman-electrician-mesa-jour-ggyx8a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-modesto-jour-uwjtu7.md": {
	id: "prime-journeyman-electrician-modesto-jour-uwjtu7.md";
  slug: "prime-journeyman-electrician-modesto-jour-uwjtu7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-moreno valley-jour-etakj9.md": {
	id: "prime-journeyman-electrician-moreno valley-jour-etakj9.md";
  slug: "prime-journeyman-electrician-moreno-valley-jour-etakj9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-mountain view-jour-98wt4o.md": {
	id: "prime-journeyman-electrician-mountain view-jour-98wt4o.md";
  slug: "prime-journeyman-electrician-mountain-view-jour-98wt4o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oakland-jour-p7cw14.md": {
	id: "prime-journeyman-electrician-oakland-jour-p7cw14.md";
  slug: "prime-journeyman-electrician-oakland-jour-p7cw14";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oceanside-jour-j09ils.md": {
	id: "prime-journeyman-electrician-oceanside-jour-j09ils.md";
  slug: "prime-journeyman-electrician-oceanside-jour-j09ils";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-ontario-jour-pj74bt.md": {
	id: "prime-journeyman-electrician-ontario-jour-pj74bt.md";
  slug: "prime-journeyman-electrician-ontario-jour-pj74bt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oro valley-jour-ri8gwl.md": {
	id: "prime-journeyman-electrician-oro valley-jour-ri8gwl.md";
  slug: "prime-journeyman-electrician-oro-valley-jour-ri8gwl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-oxnard-jour-hsan9j.md": {
	id: "prime-journeyman-electrician-oxnard-jour-hsan9j.md";
  slug: "prime-journeyman-electrician-oxnard-jour-hsan9j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-palmdale-jour-el6qsn.md": {
	id: "prime-journeyman-electrician-palmdale-jour-el6qsn.md";
  slug: "prime-journeyman-electrician-palmdale-jour-el6qsn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-palo alto-jour-aeeiih.md": {
	id: "prime-journeyman-electrician-palo alto-jour-aeeiih.md";
  slug: "prime-journeyman-electrician-palo-alto-jour-aeeiih";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-pasadena-jour-wt6p2e.md": {
	id: "prime-journeyman-electrician-pasadena-jour-wt6p2e.md";
  slug: "prime-journeyman-electrician-pasadena-jour-wt6p2e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-peoria-jour-knp3at.md": {
	id: "prime-journeyman-electrician-peoria-jour-knp3at.md";
  slug: "prime-journeyman-electrician-peoria-jour-knp3at";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-peoria-jour-ytj9gr.md": {
	id: "prime-journeyman-electrician-peoria-jour-ytj9gr.md";
  slug: "prime-journeyman-electrician-peoria-jour-ytj9gr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-phoenix-jour-7oq5ye.md": {
	id: "prime-journeyman-electrician-phoenix-jour-7oq5ye.md";
  slug: "prime-journeyman-electrician-phoenix-jour-7oq5ye";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-phoenix-jour-a2796g.md": {
	id: "prime-journeyman-electrician-phoenix-jour-a2796g.md";
  slug: "prime-journeyman-electrician-phoenix-jour-a2796g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-pomona-jour-i66qo1.md": {
	id: "prime-journeyman-electrician-pomona-jour-i66qo1.md";
  slug: "prime-journeyman-electrician-pomona-jour-i66qo1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-rancho cucamonga-jour-ldi3pq.md": {
	id: "prime-journeyman-electrician-rancho cucamonga-jour-ldi3pq.md";
  slug: "prime-journeyman-electrician-rancho-cucamonga-jour-ldi3pq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-riverside-jour-kd2x8c.md": {
	id: "prime-journeyman-electrician-riverside-jour-kd2x8c.md";
  slug: "prime-journeyman-electrician-riverside-jour-kd2x8c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-roseville-jour-vs9gh3.md": {
	id: "prime-journeyman-electrician-roseville-jour-vs9gh3.md";
  slug: "prime-journeyman-electrician-roseville-jour-vs9gh3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sacramento-jour-r5pf14.md": {
	id: "prime-journeyman-electrician-sacramento-jour-r5pf14.md";
  slug: "prime-journeyman-electrician-sacramento-jour-r5pf14";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-salinas-jour-k1ikse.md": {
	id: "prime-journeyman-electrician-salinas-jour-k1ikse.md";
  slug: "prime-journeyman-electrician-salinas-jour-k1ikse";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san bernardino-jour-806602.md": {
	id: "prime-journeyman-electrician-san bernardino-jour-806602.md";
  slug: "prime-journeyman-electrician-san-bernardino-jour-806602";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san diego-jour-wcztkm.md": {
	id: "prime-journeyman-electrician-san diego-jour-wcztkm.md";
  slug: "prime-journeyman-electrician-san-diego-jour-wcztkm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san francisco-jour-cth3jw.md": {
	id: "prime-journeyman-electrician-san francisco-jour-cth3jw.md";
  slug: "prime-journeyman-electrician-san-francisco-jour-cth3jw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-san jose-jour-s7venp.md": {
	id: "prime-journeyman-electrician-san jose-jour-s7venp.md";
  slug: "prime-journeyman-electrician-san-jose-jour-s7venp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa ana-jour-g2n6ux.md": {
	id: "prime-journeyman-electrician-santa ana-jour-g2n6ux.md";
  slug: "prime-journeyman-electrician-santa-ana-jour-g2n6ux";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa clara-jour-8o18cz.md": {
	id: "prime-journeyman-electrician-santa clara-jour-8o18cz.md";
  slug: "prime-journeyman-electrician-santa-clara-jour-8o18cz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa monica-jour-v3ig10.md": {
	id: "prime-journeyman-electrician-santa monica-jour-v3ig10.md";
  slug: "prime-journeyman-electrician-santa-monica-jour-v3ig10";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-santa rosa-jour-ik2anl.md": {
	id: "prime-journeyman-electrician-santa rosa-jour-ik2anl.md";
  slug: "prime-journeyman-electrician-santa-rosa-jour-ik2anl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-scottsdale-jour-2vaysk.md": {
	id: "prime-journeyman-electrician-scottsdale-jour-2vaysk.md";
  slug: "prime-journeyman-electrician-scottsdale-jour-2vaysk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-scottsdale-jour-8mn46l.md": {
	id: "prime-journeyman-electrician-scottsdale-jour-8mn46l.md";
  slug: "prime-journeyman-electrician-scottsdale-jour-8mn46l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sierra vista-jour-nbskg2.md": {
	id: "prime-journeyman-electrician-sierra vista-jour-nbskg2.md";
  slug: "prime-journeyman-electrician-sierra-vista-jour-nbskg2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-stockton-jour-2rp8xu.md": {
	id: "prime-journeyman-electrician-stockton-jour-2rp8xu.md";
  slug: "prime-journeyman-electrician-stockton-jour-2rp8xu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sunnyvale-jour-4wif91.md": {
	id: "prime-journeyman-electrician-sunnyvale-jour-4wif91.md";
  slug: "prime-journeyman-electrician-sunnyvale-jour-4wif91";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-sunnyvale-jour-r0bwad.md": {
	id: "prime-journeyman-electrician-sunnyvale-jour-r0bwad.md";
  slug: "prime-journeyman-electrician-sunnyvale-jour-r0bwad";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-surprise-jour-60kwl1.md": {
	id: "prime-journeyman-electrician-surprise-jour-60kwl1.md";
  slug: "prime-journeyman-electrician-surprise-jour-60kwl1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tempe-jour-a8grcl.md": {
	id: "prime-journeyman-electrician-tempe-jour-a8grcl.md";
  slug: "prime-journeyman-electrician-tempe-jour-a8grcl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tempe-jour-t6jl8n.md": {
	id: "prime-journeyman-electrician-tempe-jour-t6jl8n.md";
  slug: "prime-journeyman-electrician-tempe-jour-t6jl8n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-torrance-jour-bh5p59.md": {
	id: "prime-journeyman-electrician-torrance-jour-bh5p59.md";
  slug: "prime-journeyman-electrician-torrance-jour-bh5p59";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-tucson-jour-moap35.md": {
	id: "prime-journeyman-electrician-tucson-jour-moap35.md";
  slug: "prime-journeyman-electrician-tucson-jour-moap35";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-visalia-jour-vrc8xz.md": {
	id: "prime-journeyman-electrician-visalia-jour-vrc8xz.md";
  slug: "prime-journeyman-electrician-visalia-jour-vrc8xz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-journeyman-electrician-yuma-jour-r4nbgs.md": {
	id: "prime-journeyman-electrician-yuma-jour-r4nbgs.md";
  slug: "prime-journeyman-electrician-yuma-jour-r4nbgs";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-av-technician-boston-primvhbn4n.md": {
	id: "prime-partners-av-technician-boston-primvhbn4n.md";
  slug: "prime-partners-av-technician-boston-primvhbn4n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-av-technician-kansas-city-primafj3od.md": {
	id: "prime-partners-av-technician-kansas-city-primafj3od.md";
  slug: "prime-partners-av-technician-kansas-city-primafj3od";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-av-technician-phoenix-primafq4im.md": {
	id: "prime-partners-av-technician-phoenix-primafq4im.md";
  slug: "prime-partners-av-technician-phoenix-primafq4im";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-cable-technician-cleveland-primwdwpwm.md": {
	id: "prime-partners-cable-technician-cleveland-primwdwpwm.md";
  slug: "prime-partners-cable-technician-cleveland-primwdwpwm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-cable-technician-denver-prim4qy0df.md": {
	id: "prime-partners-cable-technician-denver-prim4qy0df.md";
  slug: "prime-partners-cable-technician-denver-prim4qy0df";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-cable-technician-denver-primxli5z4.md": {
	id: "prime-partners-cable-technician-denver-primxli5z4.md";
  slug: "prime-partners-cable-technician-denver-primxli5z4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-commercial-apprentice-boston-primssaco7.md": {
	id: "prime-partners-commercial-apprentice-boston-primssaco7.md";
  slug: "prime-partners-commercial-apprentice-boston-primssaco7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-controls-technician-houston-primz7391m.md": {
	id: "prime-partners-controls-technician-houston-primz7391m.md";
  slug: "prime-partners-controls-technician-houston-primz7391m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-controls-technician-new-york-primadynjl.md": {
	id: "prime-partners-controls-technician-new-york-primadynjl.md";
  slug: "prime-partners-controls-technician-new-york-primadynjl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-electrical-project-manager-bakersfield-primn8w2oy.md": {
	id: "prime-partners-electrical-project-manager-bakersfield-primn8w2oy.md";
  slug: "prime-partners-electrical-project-manager-bakersfield-primn8w2oy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-designer-salem-prim89ujw0.md": {
	id: "prime-partners-fire-alarm-designer-salem-prim89ujw0.md";
  slug: "prime-partners-fire-alarm-designer-salem-prim89ujw0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-designer-seattle-prim0l7ril.md": {
	id: "prime-partners-fire-alarm-designer-seattle-prim0l7ril.md";
  slug: "prime-partners-fire-alarm-designer-seattle-prim0l7ril";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-technician-jacksonville-primvzrjoc.md": {
	id: "prime-partners-fire-alarm-technician-jacksonville-primvzrjoc.md";
  slug: "prime-partners-fire-alarm-technician-jacksonville-primvzrjoc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-fire-alarm-technician-miami-primiiydjt.md": {
	id: "prime-partners-fire-alarm-technician-miami-primiiydjt.md";
  slug: "prime-partners-fire-alarm-technician-miami-primiiydjt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-industrial-electrician-los-angeles-prim9u25u7.md": {
	id: "prime-partners-industrial-electrician-los-angeles-prim9u25u7.md";
  slug: "prime-partners-industrial-electrician-los-angeles-prim9u25u7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-junior-project-manager-santa-clarita-primu1n8e3.md": {
	id: "prime-partners-junior-project-manager-santa-clarita-primu1n8e3.md";
  slug: "prime-partners-junior-project-manager-santa-clarita-primu1n8e3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-process-controls-technician-dallas-primvqz142.md": {
	id: "prime-partners-process-controls-technician-dallas-primvqz142.md";
  slug: "prime-partners-process-controls-technician-dallas-primvqz142";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-residential-electrician-boston-primht1ii2.md": {
	id: "prime-partners-residential-electrician-boston-primht1ii2.md";
  slug: "prime-partners-residential-electrician-boston-primht1ii2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-residential-electrician-houston-primr3sjt0.md": {
	id: "prime-partners-residential-electrician-houston-primr3sjt0.md";
  slug: "prime-partners-residential-electrician-houston-primr3sjt0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-san-jose-primxjl8c6.md": {
	id: "prime-partners-security-alarm-project-manager-san-jose-primxjl8c6.md";
  slug: "prime-partners-security-alarm-project-manager-san-jose-primxjl8c6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-sparks-prim6ps72m.md": {
	id: "prime-partners-security-alarm-project-manager-sparks-prim6ps72m.md";
  slug: "prime-partners-security-alarm-project-manager-sparks-prim6ps72m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-security-alarm-project-manager-tacoma-primph53uf.md": {
	id: "prime-partners-security-alarm-project-manager-tacoma-primph53uf.md";
  slug: "prime-partners-security-alarm-project-manager-tacoma-primph53uf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-partners-senior-controls-technician-san-jose-primcqo2xp.md": {
	id: "prime-partners-senior-controls-technician-san-jose-primcqo2xp.md";
  slug: "prime-partners-senior-controls-technician-san-jose-primcqo2xp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-anaheim-secu-ikfp2q.md": {
	id: "prime-security-technician-anaheim-secu-ikfp2q.md";
  slug: "prime-security-technician-anaheim-secu-ikfp2q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-chandler-secu-ecjyin.md": {
	id: "prime-security-technician-chandler-secu-ecjyin.md";
  slug: "prime-security-technician-chandler-secu-ecjyin";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-glendale-secu-i4esga.md": {
	id: "prime-security-technician-glendale-secu-i4esga.md";
  slug: "prime-security-technician-glendale-secu-i4esga";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-irvine-secu-r8jd9u.md": {
	id: "prime-security-technician-irvine-secu-r8jd9u.md";
  slug: "prime-security-technician-irvine-secu-r8jd9u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-long-beach-secu-tpv74z.md": {
	id: "prime-security-technician-long-beach-secu-tpv74z.md";
  slug: "prime-security-technician-long-beach-secu-tpv74z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-los-angeles-secu-gn7bwi.md": {
	id: "prime-security-technician-los-angeles-secu-gn7bwi.md";
  slug: "prime-security-technician-los-angeles-secu-gn7bwi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-mesa-secu-ndszjx.md": {
	id: "prime-security-technician-mesa-secu-ndszjx.md";
  slug: "prime-security-technician-mesa-secu-ndszjx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-pasadena-secu-s97utv.md": {
	id: "prime-security-technician-pasadena-secu-s97utv.md";
  slug: "prime-security-technician-pasadena-secu-s97utv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-phoenix-secu-2pbpyi.md": {
	id: "prime-security-technician-phoenix-secu-2pbpyi.md";
  slug: "prime-security-technician-phoenix-secu-2pbpyi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-sacramento-secu-os69wo.md": {
	id: "prime-security-technician-sacramento-secu-os69wo.md";
  slug: "prime-security-technician-sacramento-secu-os69wo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-san-diego-secu-pbmu6v.md": {
	id: "prime-security-technician-san-diego-secu-pbmu6v.md";
  slug: "prime-security-technician-san-diego-secu-pbmu6v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-san-francisco-secu-45m8b3.md": {
	id: "prime-security-technician-san-francisco-secu-45m8b3.md";
  slug: "prime-security-technician-san-francisco-secu-45m8b3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-san-jose-secu-7ao6p4.md": {
	id: "prime-security-technician-san-jose-secu-7ao6p4.md";
  slug: "prime-security-technician-san-jose-secu-7ao6p4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-scottsdale-secu-83sbhw.md": {
	id: "prime-security-technician-scottsdale-secu-83sbhw.md";
  slug: "prime-security-technician-scottsdale-secu-83sbhw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-security-technician-tempe-secu-2qkdyv.md": {
	id: "prime-security-technician-tempe-secu-2qkdyv.md";
  slug: "prime-security-technician-tempe-secu-2qkdyv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-structured-cable-technician-suffolk-va-id-mm7388.md": {
	id: "prime-structured-cable-technician-suffolk-va-id-mm7388.md";
  slug: "prime-structured-cable-technician-suffolk-va-id-mm7388";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-anaheim-voic-5us0c6.md": {
	id: "prime-voice-&-data-technician-anaheim-voic-5us0c6.md";
  slug: "prime-voice--data-technician-anaheim-voic-5us0c6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-avondale-voic-q6ydj8.md": {
	id: "prime-voice-&-data-technician-avondale-voic-q6ydj8.md";
  slug: "prime-voice--data-technician-avondale-voic-q6ydj8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-bakersfield-voic-tidwg0.md": {
	id: "prime-voice-&-data-technician-bakersfield-voic-tidwg0.md";
  slug: "prime-voice--data-technician-bakersfield-voic-tidwg0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-berkeley-voic-lil41e.md": {
	id: "prime-voice-&-data-technician-berkeley-voic-lil41e.md";
  slug: "prime-voice--data-technician-berkeley-voic-lil41e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-buckeye-voic-7uuvq6.md": {
	id: "prime-voice-&-data-technician-buckeye-voic-7uuvq6.md";
  slug: "prime-voice--data-technician-buckeye-voic-7uuvq6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-burbank-voic-ljp9tf.md": {
	id: "prime-voice-&-data-technician-burbank-voic-ljp9tf.md";
  slug: "prime-voice--data-technician-burbank-voic-ljp9tf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-casa grande-voic-mbdy6v.md": {
	id: "prime-voice-&-data-technician-casa grande-voic-mbdy6v.md";
  slug: "prime-voice--data-technician-casa-grande-voic-mbdy6v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chandler-voic-fv6uk5.md": {
	id: "prime-voice-&-data-technician-chandler-voic-fv6uk5.md";
  slug: "prime-voice--data-technician-chandler-voic-fv6uk5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chandler-voic-zyvvow.md": {
	id: "prime-voice-&-data-technician-chandler-voic-zyvvow.md";
  slug: "prime-voice--data-technician-chandler-voic-zyvvow";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-chula vista-voic-d1dpuo.md": {
	id: "prime-voice-&-data-technician-chula vista-voic-d1dpuo.md";
  slug: "prime-voice--data-technician-chula-vista-voic-d1dpuo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-corona-voic-nvxe9a.md": {
	id: "prime-voice-&-data-technician-corona-voic-nvxe9a.md";
  slug: "prime-voice--data-technician-corona-voic-nvxe9a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-cupertino-voic-0ok45l.md": {
	id: "prime-voice-&-data-technician-cupertino-voic-0ok45l.md";
  slug: "prime-voice--data-technician-cupertino-voic-0ok45l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-elk grove-voic-4xca36.md": {
	id: "prime-voice-&-data-technician-elk grove-voic-4xca36.md";
  slug: "prime-voice--data-technician-elk-grove-voic-4xca36";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-escondido-voic-72u7xt.md": {
	id: "prime-voice-&-data-technician-escondido-voic-72u7xt.md";
  slug: "prime-voice--data-technician-escondido-voic-72u7xt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-flagstaff-voic-ueyynn.md": {
	id: "prime-voice-&-data-technician-flagstaff-voic-ueyynn.md";
  slug: "prime-voice--data-technician-flagstaff-voic-ueyynn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fontana-voic-capom0.md": {
	id: "prime-voice-&-data-technician-fontana-voic-capom0.md";
  slug: "prime-voice--data-technician-fontana-voic-capom0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fremont-voic-lp8wjj.md": {
	id: "prime-voice-&-data-technician-fremont-voic-lp8wjj.md";
  slug: "prime-voice--data-technician-fremont-voic-lp8wjj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fresno-voic-rgi5p5.md": {
	id: "prime-voice-&-data-technician-fresno-voic-rgi5p5.md";
  slug: "prime-voice--data-technician-fresno-voic-rgi5p5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-fullerton-voic-6b7luy.md": {
	id: "prime-voice-&-data-technician-fullerton-voic-6b7luy.md";
  slug: "prime-voice--data-technician-fullerton-voic-6b7luy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-garden grove-voic-wtmjps.md": {
	id: "prime-voice-&-data-technician-garden grove-voic-wtmjps.md";
  slug: "prime-voice--data-technician-garden-grove-voic-wtmjps";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-gilbert-voic-fhzhb3.md": {
	id: "prime-voice-&-data-technician-gilbert-voic-fhzhb3.md";
  slug: "prime-voice--data-technician-gilbert-voic-fhzhb3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-gilbert-voic-wenbtx.md": {
	id: "prime-voice-&-data-technician-gilbert-voic-wenbtx.md";
  slug: "prime-voice--data-technician-gilbert-voic-wenbtx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-3mnef6.md": {
	id: "prime-voice-&-data-technician-glendale-voic-3mnef6.md";
  slug: "prime-voice--data-technician-glendale-voic-3mnef6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-4wvlxo.md": {
	id: "prime-voice-&-data-technician-glendale-voic-4wvlxo.md";
  slug: "prime-voice--data-technician-glendale-voic-4wvlxo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-glendale-voic-hhfc5e.md": {
	id: "prime-voice-&-data-technician-glendale-voic-hhfc5e.md";
  slug: "prime-voice--data-technician-glendale-voic-hhfc5e";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-goodyear-voic-xarx7n.md": {
	id: "prime-voice-&-data-technician-goodyear-voic-xarx7n.md";
  slug: "prime-voice--data-technician-goodyear-voic-xarx7n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-hayward-voic-sqsjuc.md": {
	id: "prime-voice-&-data-technician-hayward-voic-sqsjuc.md";
  slug: "prime-voice--data-technician-hayward-voic-sqsjuc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-huntington beach-voic-3c3vlb.md": {
	id: "prime-voice-&-data-technician-huntington beach-voic-3c3vlb.md";
  slug: "prime-voice--data-technician-huntington-beach-voic-3c3vlb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-irvine-voic-5jhsbk.md": {
	id: "prime-voice-&-data-technician-irvine-voic-5jhsbk.md";
  slug: "prime-voice--data-technician-irvine-voic-5jhsbk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-lake havasu city-voic-4x63ni.md": {
	id: "prime-voice-&-data-technician-lake havasu city-voic-4x63ni.md";
  slug: "prime-voice--data-technician-lake-havasu-city-voic-4x63ni";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-lancaster-voic-2o5zns.md": {
	id: "prime-voice-&-data-technician-lancaster-voic-2o5zns.md";
  slug: "prime-voice--data-technician-lancaster-voic-2o5zns";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-long beach-voic-dvhy1c.md": {
	id: "prime-voice-&-data-technician-long beach-voic-dvhy1c.md";
  slug: "prime-voice--data-technician-long-beach-voic-dvhy1c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-los angeles-voic-2v24xr.md": {
	id: "prime-voice-&-data-technician-los angeles-voic-2v24xr.md";
  slug: "prime-voice--data-technician-los-angeles-voic-2v24xr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-maricopa-voic-ct81zh.md": {
	id: "prime-voice-&-data-technician-maricopa-voic-ct81zh.md";
  slug: "prime-voice--data-technician-maricopa-voic-ct81zh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mesa-voic-59pdd9.md": {
	id: "prime-voice-&-data-technician-mesa-voic-59pdd9.md";
  slug: "prime-voice--data-technician-mesa-voic-59pdd9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mesa-voic-tf052v.md": {
	id: "prime-voice-&-data-technician-mesa-voic-tf052v.md";
  slug: "prime-voice--data-technician-mesa-voic-tf052v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-modesto-voic-gjt5b7.md": {
	id: "prime-voice-&-data-technician-modesto-voic-gjt5b7.md";
  slug: "prime-voice--data-technician-modesto-voic-gjt5b7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-moreno valley-voic-a6ff5j.md": {
	id: "prime-voice-&-data-technician-moreno valley-voic-a6ff5j.md";
  slug: "prime-voice--data-technician-moreno-valley-voic-a6ff5j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-mountain view-voic-yfan72.md": {
	id: "prime-voice-&-data-technician-mountain view-voic-yfan72.md";
  slug: "prime-voice--data-technician-mountain-view-voic-yfan72";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oakland-voic-wlyh8o.md": {
	id: "prime-voice-&-data-technician-oakland-voic-wlyh8o.md";
  slug: "prime-voice--data-technician-oakland-voic-wlyh8o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oceanside-voic-jc5r8b.md": {
	id: "prime-voice-&-data-technician-oceanside-voic-jc5r8b.md";
  slug: "prime-voice--data-technician-oceanside-voic-jc5r8b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-ontario-voic-wmoixr.md": {
	id: "prime-voice-&-data-technician-ontario-voic-wmoixr.md";
  slug: "prime-voice--data-technician-ontario-voic-wmoixr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oro valley-voic-16i6f5.md": {
	id: "prime-voice-&-data-technician-oro valley-voic-16i6f5.md";
  slug: "prime-voice--data-technician-oro-valley-voic-16i6f5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-oxnard-voic-s7klx6.md": {
	id: "prime-voice-&-data-technician-oxnard-voic-s7klx6.md";
  slug: "prime-voice--data-technician-oxnard-voic-s7klx6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-palmdale-voic-3r7bxy.md": {
	id: "prime-voice-&-data-technician-palmdale-voic-3r7bxy.md";
  slug: "prime-voice--data-technician-palmdale-voic-3r7bxy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-palo alto-voic-uewvu4.md": {
	id: "prime-voice-&-data-technician-palo alto-voic-uewvu4.md";
  slug: "prime-voice--data-technician-palo-alto-voic-uewvu4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-pasadena-voic-n52kcg.md": {
	id: "prime-voice-&-data-technician-pasadena-voic-n52kcg.md";
  slug: "prime-voice--data-technician-pasadena-voic-n52kcg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-peoria-voic-3981io.md": {
	id: "prime-voice-&-data-technician-peoria-voic-3981io.md";
  slug: "prime-voice--data-technician-peoria-voic-3981io";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-peoria-voic-cnunci.md": {
	id: "prime-voice-&-data-technician-peoria-voic-cnunci.md";
  slug: "prime-voice--data-technician-peoria-voic-cnunci";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-phoenix-voic-j6dk1i.md": {
	id: "prime-voice-&-data-technician-phoenix-voic-j6dk1i.md";
  slug: "prime-voice--data-technician-phoenix-voic-j6dk1i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-phoenix-voic-zxnffn.md": {
	id: "prime-voice-&-data-technician-phoenix-voic-zxnffn.md";
  slug: "prime-voice--data-technician-phoenix-voic-zxnffn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-pomona-voic-1octzk.md": {
	id: "prime-voice-&-data-technician-pomona-voic-1octzk.md";
  slug: "prime-voice--data-technician-pomona-voic-1octzk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-rancho cucamonga-voic-javlok.md": {
	id: "prime-voice-&-data-technician-rancho cucamonga-voic-javlok.md";
  slug: "prime-voice--data-technician-rancho-cucamonga-voic-javlok";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-riverside-voic-5a6a84.md": {
	id: "prime-voice-&-data-technician-riverside-voic-5a6a84.md";
  slug: "prime-voice--data-technician-riverside-voic-5a6a84";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-roseville-voic-w85ett.md": {
	id: "prime-voice-&-data-technician-roseville-voic-w85ett.md";
  slug: "prime-voice--data-technician-roseville-voic-w85ett";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sacramento-voic-grl1ao.md": {
	id: "prime-voice-&-data-technician-sacramento-voic-grl1ao.md";
  slug: "prime-voice--data-technician-sacramento-voic-grl1ao";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-salinas-voic-hh2626.md": {
	id: "prime-voice-&-data-technician-salinas-voic-hh2626.md";
  slug: "prime-voice--data-technician-salinas-voic-hh2626";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san bernardino-voic-w09of5.md": {
	id: "prime-voice-&-data-technician-san bernardino-voic-w09of5.md";
  slug: "prime-voice--data-technician-san-bernardino-voic-w09of5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san diego-voic-rd83zl.md": {
	id: "prime-voice-&-data-technician-san diego-voic-rd83zl.md";
  slug: "prime-voice--data-technician-san-diego-voic-rd83zl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san francisco-voic-r6tk69.md": {
	id: "prime-voice-&-data-technician-san francisco-voic-r6tk69.md";
  slug: "prime-voice--data-technician-san-francisco-voic-r6tk69";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-san jose-voic-cp9aa8.md": {
	id: "prime-voice-&-data-technician-san jose-voic-cp9aa8.md";
  slug: "prime-voice--data-technician-san-jose-voic-cp9aa8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa ana-voic-pde6tp.md": {
	id: "prime-voice-&-data-technician-santa ana-voic-pde6tp.md";
  slug: "prime-voice--data-technician-santa-ana-voic-pde6tp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa clara-voic-mxvbva.md": {
	id: "prime-voice-&-data-technician-santa clara-voic-mxvbva.md";
  slug: "prime-voice--data-technician-santa-clara-voic-mxvbva";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa monica-voic-82wfbg.md": {
	id: "prime-voice-&-data-technician-santa monica-voic-82wfbg.md";
  slug: "prime-voice--data-technician-santa-monica-voic-82wfbg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-santa rosa-voic-7vanfc.md": {
	id: "prime-voice-&-data-technician-santa rosa-voic-7vanfc.md";
  slug: "prime-voice--data-technician-santa-rosa-voic-7vanfc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-scottsdale-voic-2o35b6.md": {
	id: "prime-voice-&-data-technician-scottsdale-voic-2o35b6.md";
  slug: "prime-voice--data-technician-scottsdale-voic-2o35b6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-scottsdale-voic-ivvhps.md": {
	id: "prime-voice-&-data-technician-scottsdale-voic-ivvhps.md";
  slug: "prime-voice--data-technician-scottsdale-voic-ivvhps";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sierra vista-voic-329fbg.md": {
	id: "prime-voice-&-data-technician-sierra vista-voic-329fbg.md";
  slug: "prime-voice--data-technician-sierra-vista-voic-329fbg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-stockton-voic-ya718u.md": {
	id: "prime-voice-&-data-technician-stockton-voic-ya718u.md";
  slug: "prime-voice--data-technician-stockton-voic-ya718u";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sunnyvale-voic-kekggk.md": {
	id: "prime-voice-&-data-technician-sunnyvale-voic-kekggk.md";
  slug: "prime-voice--data-technician-sunnyvale-voic-kekggk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-sunnyvale-voic-z9e1st.md": {
	id: "prime-voice-&-data-technician-sunnyvale-voic-z9e1st.md";
  slug: "prime-voice--data-technician-sunnyvale-voic-z9e1st";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-surprise-voic-zq4h4w.md": {
	id: "prime-voice-&-data-technician-surprise-voic-zq4h4w.md";
  slug: "prime-voice--data-technician-surprise-voic-zq4h4w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tempe-voic-cdipp7.md": {
	id: "prime-voice-&-data-technician-tempe-voic-cdipp7.md";
  slug: "prime-voice--data-technician-tempe-voic-cdipp7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tempe-voic-or1iai.md": {
	id: "prime-voice-&-data-technician-tempe-voic-or1iai.md";
  slug: "prime-voice--data-technician-tempe-voic-or1iai";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-torrance-voic-cyznlr.md": {
	id: "prime-voice-&-data-technician-torrance-voic-cyznlr.md";
  slug: "prime-voice--data-technician-torrance-voic-cyznlr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-tucson-voic-a255tp.md": {
	id: "prime-voice-&-data-technician-tucson-voic-a255tp.md";
  slug: "prime-voice--data-technician-tucson-voic-a255tp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-visalia-voic-26nl7w.md": {
	id: "prime-voice-&-data-technician-visalia-voic-26nl7w.md";
  slug: "prime-voice--data-technician-visalia-voic-26nl7w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"prime-voice-&-data-technician-yuma-voic-qn6x1x.md": {
	id: "prime-voice-&-data-technician-yuma-voic-qn6x1x.md";
  slug: "prime-voice--data-technician-yuma-voic-qn6x1x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp.md": {
	id: "priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp.md";
  slug: "priority-electrical-services-apprentice-electrician-knoxville-prio1p0ebp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"priority-electrical-services-cable-tech-charlotte-priobp5lb9.md": {
	id: "priority-electrical-services-cable-tech-charlotte-priobp5lb9.md";
  slug: "priority-electrical-services-cable-tech-charlotte-priobp5lb9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"priority-electrical-services-data-center-technician-fort-worth-priors8hs3.md": {
	id: "priority-electrical-services-data-center-technician-fort-worth-priors8hs3.md";
  slug: "priority-electrical-services-data-center-technician-fort-worth-priors8hs3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"priority-electrical-services-security-technician-irving-priohdegn5.md": {
	id: "priority-electrical-services-security-technician-irving-priohdegn5.md";
  slug: "priority-electrical-services-security-technician-irving-priohdegn5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-controls-engineer-cincinnati-reli39rmk3.md": {
	id: "reliable-electric-controls-engineer-cincinnati-reli39rmk3.md";
  slug: "reliable-electric-controls-engineer-cincinnati-reli39rmk3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-controls-engineer-glendale-relig9bme9.md": {
	id: "reliable-electric-controls-engineer-glendale-relig9bme9.md";
  slug: "reliable-electric-controls-engineer-glendale-relig9bme9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-data-center-technician-st.-petersburg-relin03lw5.md": {
	id: "reliable-electric-data-center-technician-st.-petersburg-relin03lw5.md";
  slug: "reliable-electric-data-center-technician-st-petersburg-relin03lw5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8.md": {
	id: "reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8.md";
  slug: "reliable-electric-fire-alarm-installer-baton-rouge-relihna0b8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-fire-alarm-technician-atlanta-reli736v50.md": {
	id: "reliable-electric-fire-alarm-technician-atlanta-reli736v50.md";
  slug: "reliable-electric-fire-alarm-technician-atlanta-reli736v50";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-industrial-electrician-fullerton-relic3h2rd.md": {
	id: "reliable-electric-industrial-electrician-fullerton-relic3h2rd.md";
  slug: "reliable-electric-industrial-electrician-fullerton-relic3h2rd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-senior-controls-technician-las-vegas-reliy3o66v.md": {
	id: "reliable-electric-senior-controls-technician-las-vegas-reliy3o66v.md";
  slug: "reliable-electric-senior-controls-technician-las-vegas-reliy3o66v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-senior-controls-technician-portland-reliqutyxx.md": {
	id: "reliable-electric-senior-controls-technician-portland-reliqutyxx.md";
  slug: "reliable-electric-senior-controls-technician-portland-reliqutyxx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"reliable-electric-service-electrician-tucson-relich2ngt.md": {
	id: "reliable-electric-service-electrician-tucson-relich2ngt.md";
  slug: "reliable-electric-service-electrician-tucson-relich2ngt";
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
"rex-moore-electric-apprentice-electrician-fremont-rexb837xe.md": {
	id: "rex-moore-electric-apprentice-electrician-fremont-rexb837xe.md";
  slug: "rex-moore-electric-apprentice-electrician-fremont-rexb837xe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov.md": {
	id: "rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov.md";
  slug: "rex-moore-electric-apprentice-electrician-oceanside-rex2xhkov";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-apprentice-electrician-riverside-rexr6266x.md": {
	id: "rex-moore-electric-apprentice-electrician-riverside-rexr6266x.md";
  slug: "rex-moore-electric-apprentice-electrician-riverside-rexr6266x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-fontana-rex3pp62q.md": {
	id: "rex-moore-electric-journeyman-electrician-fontana-rex3pp62q.md";
  slug: "rex-moore-electric-journeyman-electrician-fontana-rex3pp62q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d.md": {
	id: "rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d.md";
  slug: "rex-moore-electric-journeyman-electrician-long-beach-rexs70u1d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6.md": {
	id: "rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6.md";
  slug: "rex-moore-electric-journeyman-electrician-modesto-rexo8lgz6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0.md": {
	id: "rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0.md";
  slug: "rex-moore-electric-journeyman-electrician-oakland-rexzsyvn0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5.md": {
	id: "rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5.md";
  slug: "rex-moore-electric-journeyman-electrician-san-diego-rexe4bkl5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-apprentice-electrician-charleston-rogeegyjka.md": {
	id: "rogers-electric-apprentice-electrician-charleston-rogeegyjka.md";
  slug: "rogers-electric-apprentice-electrician-charleston-rogeegyjka";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-apprentice-electrician-orangeburg-roge677rlo.md": {
	id: "rogers-electric-apprentice-electrician-orangeburg-roge677rlo.md";
  slug: "rogers-electric-apprentice-electrician-orangeburg-roge677rlo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-aurora-rogeon2h4b.md": {
	id: "rogers-electric-cable-tech-aurora-rogeon2h4b.md";
  slug: "rogers-electric-cable-tech-aurora-rogeon2h4b";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-cedar-park-rogebpol41.md": {
	id: "rogers-electric-cable-tech-cedar-park-rogebpol41.md";
  slug: "rogers-electric-cable-tech-cedar-park-rogebpol41";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-cable-tech-orlando-roget4y0j6.md": {
	id: "rogers-electric-cable-tech-orlando-roget4y0j6.md";
  slug: "rogers-electric-cable-tech-orlando-roget4y0j6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-cable-technician-greensboro-roge5snfyi.md": {
	id: "rogers-electric-cable-technician-greensboro-roge5snfyi.md";
  slug: "rogers-electric-cable-technician-greensboro-roge5snfyi";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw.md": {
	id: "rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw.md";
  slug: "rogers-electric-commercial-project-manager-jacksonville-roge9z9gkw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-commercial-project-manager-macon-roge2wrx15.md": {
	id: "rogers-electric-commercial-project-manager-macon-roge2wrx15.md";
  slug: "rogers-electric-commercial-project-manager-macon-roge2wrx15";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-electrician-gainesville-rogek28eqq.md": {
	id: "rogers-electric-electrician-gainesville-rogek28eqq.md";
  slug: "rogers-electric-electrician-gainesville-rogek28eqq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-junior-project-manager-tampa-rogecmwojk.md": {
	id: "rogers-electric-junior-project-manager-tampa-rogecmwojk.md";
  slug: "rogers-electric-junior-project-manager-tampa-rogecmwojk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-junior-project-manager-tempe-rogeely7qh.md": {
	id: "rogers-electric-junior-project-manager-tempe-rogeely7qh.md";
  slug: "rogers-electric-junior-project-manager-tempe-rogeely7qh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"rogers-electric-project-manager-colorado-springs-rogek0ha67.md": {
	id: "rogers-electric-project-manager-colorado-springs-rogek0ha67.md";
  slug: "rogers-electric-project-manager-colorado-springs-rogek0ha67";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-electrical-project-manager-orem-safegk0q19.md": {
	id: "safe-and-sound-electrical-project-manager-orem-safegk0q19.md";
  slug: "safe-and-sound-electrical-project-manager-orem-safegk0q19";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-fire-alarm-designer-reno-safe9lrlj4.md": {
	id: "safe-and-sound-fire-alarm-designer-reno-safe9lrlj4.md";
  slug: "safe-and-sound-fire-alarm-designer-reno-safe9lrlj4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh.md": {
	id: "safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh.md";
  slug: "safe-and-sound-fire-alarm-designer-west-valley-city-safehzb7yh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-junior-project-manager-stockton-safe9zboef.md": {
	id: "safe-and-sound-junior-project-manager-stockton-safe9zboef.md";
  slug: "safe-and-sound-junior-project-manager-stockton-safe9zboef";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-security-alarm-project-manager-fremont-safels05kj.md": {
	id: "safe-and-sound-security-alarm-project-manager-fremont-safels05kj.md";
  slug: "safe-and-sound-security-alarm-project-manager-fremont-safels05kj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"safe-and-sound-security-project-manager-modesto-safexs193s.md": {
	id: "safe-and-sound-security-project-manager-modesto-safexs193s.md";
  slug: "safe-and-sound-security-project-manager-modesto-safexs193s";
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
"staley-data-center-cable-technician-allen-data-gdfntk.md": {
	id: "staley-data-center-cable-technician-allen-data-gdfntk.md";
  slug: "staley-data-center-cable-technician-allen-data-gdfntk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-ashburn-data-9pg7w9.md": {
	id: "staley-data-center-cable-technician-ashburn-data-9pg7w9.md";
  slug: "staley-data-center-cable-technician-ashburn-data-9pg7w9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-chicago-data-nlbs01.md": {
	id: "staley-data-center-cable-technician-chicago-data-nlbs01.md";
  slug: "staley-data-center-cable-technician-chicago-data-nlbs01";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-elk-grove-village-data-jx5fjy.md": {
	id: "staley-data-center-cable-technician-elk-grove-village-data-jx5fjy.md";
  slug: "staley-data-center-cable-technician-elk-grove-village-data-jx5fjy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-hillsboro-data-ottwhx.md": {
	id: "staley-data-center-cable-technician-hillsboro-data-ottwhx.md";
  slug: "staley-data-center-cable-technician-hillsboro-data-ottwhx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-leesburg-data-xysr35.md": {
	id: "staley-data-center-cable-technician-leesburg-data-xysr35.md";
  slug: "staley-data-center-cable-technician-leesburg-data-xysr35";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-loudoun-county-data-6icyh7.md": {
	id: "staley-data-center-cable-technician-loudoun-county-data-6icyh7.md";
  slug: "staley-data-center-cable-technician-loudoun-county-data-6icyh7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-manassas-data-lqjf48.md": {
	id: "staley-data-center-cable-technician-manassas-data-lqjf48.md";
  slug: "staley-data-center-cable-technician-manassas-data-lqjf48";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-mesa-data-v8gd2x.md": {
	id: "staley-data-center-cable-technician-mesa-data-v8gd2x.md";
  slug: "staley-data-center-cable-technician-mesa-data-v8gd2x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-newark-data-stzeuv.md": {
	id: "staley-data-center-cable-technician-newark-data-stzeuv.md";
  slug: "staley-data-center-cable-technician-newark-data-stzeuv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-plano-data-u75f4p.md": {
	id: "staley-data-center-cable-technician-plano-data-u75f4p.md";
  slug: "staley-data-center-cable-technician-plano-data-u75f4p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-reno-data-e9hx6c.md": {
	id: "staley-data-center-cable-technician-reno-data-e9hx6c.md";
  slug: "staley-data-center-cable-technician-reno-data-e9hx6c";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-richardson-data-o9rnan.md": {
	id: "staley-data-center-cable-technician-richardson-data-o9rnan.md";
  slug: "staley-data-center-cable-technician-richardson-data-o9rnan";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-salt-lake-city-data-48dfb0.md": {
	id: "staley-data-center-cable-technician-salt-lake-city-data-48dfb0.md";
  slug: "staley-data-center-cable-technician-salt-lake-city-data-48dfb0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-cable-technician-sterling-data-pbhi8a.md": {
	id: "staley-data-center-cable-technician-sterling-data-pbhi8a.md";
  slug: "staley-data-center-cable-technician-sterling-data-pbhi8a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-austin-data-p9me4v.md": {
	id: "staley-data-center-network-engineer-austin-data-p9me4v.md";
  slug: "staley-data-center-network-engineer-austin-data-p9me4v";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-cheyenne-data-7b36bv.md": {
	id: "staley-data-center-network-engineer-cheyenne-data-7b36bv.md";
  slug: "staley-data-center-network-engineer-cheyenne-data-7b36bv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-columbus-data-uwpq1l.md": {
	id: "staley-data-center-network-engineer-columbus-data-uwpq1l.md";
  slug: "staley-data-center-network-engineer-columbus-data-uwpq1l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-council-bluffs-data-8s5hin.md": {
	id: "staley-data-center-network-engineer-council-bluffs-data-8s5hin.md";
  slug: "staley-data-center-network-engineer-council-bluffs-data-8s5hin";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-des-moines-data-7t38kk.md": {
	id: "staley-data-center-network-engineer-des-moines-data-7t38kk.md";
  slug: "staley-data-center-network-engineer-des-moines-data-7t38kk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-network-engineer-maiden-data-p2lq9h.md": {
	id: "staley-data-center-network-engineer-maiden-data-p2lq9h.md";
  slug: "staley-data-center-network-engineer-maiden-data-p2lq9h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-altoona-data-6tvo42.md": {
	id: "staley-data-center-rack-&-stack-technician-altoona-data-6tvo42.md";
  slug: "staley-data-center-rack--stack-technician-altoona-data-6tvo42";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-chandler-data-8nqnl4.md": {
	id: "staley-data-center-rack-&-stack-technician-chandler-data-8nqnl4.md";
  slug: "staley-data-center-rack--stack-technician-chandler-data-8nqnl4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-forest-city-data-wom9xf.md": {
	id: "staley-data-center-rack-&-stack-technician-forest-city-data-wom9xf.md";
  slug: "staley-data-center-rack--stack-technician-forest-city-data-wom9xf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-los-angeles-data-72mfl3.md": {
	id: "staley-data-center-rack-&-stack-technician-los-angeles-data-72mfl3.md";
  slug: "staley-data-center-rack--stack-technician-los-angeles-data-72mfl3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-new-albany-data-894fj4.md": {
	id: "staley-data-center-rack-&-stack-technician-new-albany-data-894fj4.md";
  slug: "staley-data-center-rack--stack-technician-new-albany-data-894fj4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-new-york-data-i2gjte.md": {
	id: "staley-data-center-rack-&-stack-technician-new-york-data-i2gjte.md";
  slug: "staley-data-center-rack--stack-technician-new-york-data-i2gjte";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-phoenix-data-3c1i76.md": {
	id: "staley-data-center-rack-&-stack-technician-phoenix-data-3c1i76.md";
  slug: "staley-data-center-rack--stack-technician-phoenix-data-3c1i76";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-prineville-data-tec9hv.md": {
	id: "staley-data-center-rack-&-stack-technician-prineville-data-tec9hv.md";
  slug: "staley-data-center-rack--stack-technician-prineville-data-tec9hv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-richmond-data-d9lv9y.md": {
	id: "staley-data-center-rack-&-stack-technician-richmond-data-d9lv9y.md";
  slug: "staley-data-center-rack--stack-technician-richmond-data-d9lv9y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-sacramento-data-znolix.md": {
	id: "staley-data-center-rack-&-stack-technician-sacramento-data-znolix.md";
  slug: "staley-data-center-rack--stack-technician-sacramento-data-znolix";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-santa-clara-data-uxrdyx.md": {
	id: "staley-data-center-rack-&-stack-technician-santa-clara-data-uxrdyx.md";
  slug: "staley-data-center-rack--stack-technician-santa-clara-data-uxrdyx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-data-center-rack-&-stack-technician-seattle-data-7s5nyx.md": {
	id: "staley-data-center-rack-&-stack-technician-seattle-data-7s5nyx.md";
  slug: "staley-data-center-rack--stack-technician-seattle-data-7s5nyx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt.md": {
	id: "staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt.md";
  slug: "staley-fiber-optic-splicing-technician-atlanta-fibe-1kqrpt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13.md": {
	id: "staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13.md";
  slug: "staley-fiber-optic-splicing-technician-dallas-fibe-3f6d13";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-denver-fibe-9qu44o.md": {
	id: "staley-fiber-optic-splicing-technician-denver-fibe-9qu44o.md";
  slug: "staley-fiber-optic-splicing-technician-denver-fibe-9qu44o";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb.md": {
	id: "staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb.md";
  slug: "staley-fiber-optic-splicing-technician-fort-worth-fibe-w4tovb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3.md": {
	id: "staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3.md";
  slug: "staley-fiber-optic-splicing-technician-houston-fibe-lr5pq3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8.md": {
	id: "staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8.md";
  slug: "staley-fiber-optic-splicing-technician-kansas-city-fibe-y7r8c8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh.md": {
	id: "staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh.md";
  slug: "staley-fiber-optic-splicing-technician-las-vegas-fibe-p9r2bh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-miami-fibe-hfon3n.md": {
	id: "staley-fiber-optic-splicing-technician-miami-fibe-hfon3n.md";
  slug: "staley-fiber-optic-splicing-technician-miami-fibe-hfon3n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f.md": {
	id: "staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f.md";
  slug: "staley-fiber-optic-splicing-technician-quincy-fibe-psbq0f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-reston-fibe-r22uo3.md": {
	id: "staley-fiber-optic-splicing-technician-reston-fibe-r22uo3.md";
  slug: "staley-fiber-optic-splicing-technician-reston-fibe-r22uo3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com.md": {
	id: "staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com.md";
  slug: "staley-fiber-optic-splicing-technician-san-antonio-fibe-bg9com";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8.md": {
	id: "staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8.md";
  slug: "staley-fiber-optic-splicing-technician-san-jose-fibe-dddwj8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf.md": {
	id: "staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf.md";
  slug: "staley-technologies-commercial-apprentice-san-francisco-stalqqcbtf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-controls-engineer-louisville-stalfb1r63.md": {
	id: "staley-technologies-controls-engineer-louisville-stalfb1r63.md";
  slug: "staley-technologies-controls-engineer-louisville-stalfb1r63";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-controls-technician-worcester-stalnav4fm.md": {
	id: "staley-technologies-controls-technician-worcester-stalnav4fm.md";
  slug: "staley-technologies-controls-technician-worcester-stalnav4fm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-electrical-apprentice-des-moines-stalp3i36h.md": {
	id: "staley-technologies-electrical-apprentice-des-moines-stalp3i36h.md";
  slug: "staley-technologies-electrical-apprentice-des-moines-stalp3i36h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm.md": {
	id: "staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm.md";
  slug: "staley-technologies-electrical-project-manager-salt-lake-city-stalho4fvm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-designer-irvine-stal977llc.md": {
	id: "staley-technologies-fire-alarm-designer-irvine-stal977llc.md";
  slug: "staley-technologies-fire-alarm-designer-irvine-stal977llc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-designer-spokane-stalf2muvr.md": {
	id: "staley-technologies-fire-alarm-designer-spokane-stalf2muvr.md";
  slug: "staley-technologies-fire-alarm-designer-spokane-stalf2muvr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-installer-athens-stalxf3vly.md": {
	id: "staley-technologies-fire-alarm-installer-athens-stalxf3vly.md";
  slug: "staley-technologies-fire-alarm-installer-athens-stalxf3vly";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6.md": {
	id: "staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6.md";
  slug: "staley-technologies-fire-alarm-project-manager-bellevue-stalgaieb6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql.md": {
	id: "staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql.md";
  slug: "staley-technologies-fire-alarm-project-manager-huntington-beach-stalpl77ql";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6.md": {
	id: "staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6.md";
  slug: "staley-technologies-fire-alarm-project-manager-san-francisco-stalro7pm6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-industrial-electrician-phoenix-stalr1fra2.md": {
	id: "staley-technologies-industrial-electrician-phoenix-stalr1fra2.md";
  slug: "staley-technologies-industrial-electrician-phoenix-stalr1fra2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"staley-technologies-service-electrician-baltimore-stala5myko.md": {
	id: "staley-technologies-service-electrician-baltimore-stala5myko.md";
  slug: "staley-technologies-service-electrician-baltimore-stala5myko";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z.md": {
	id: "swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z.md";
  slug: "swan-electrical-systems-automation-controls-specialist-irving-swanjwnl4z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-av-technician-annapolis-swanxv132q.md": {
	id: "swan-electrical-systems-av-technician-annapolis-swanxv132q.md";
  slug: "swan-electrical-systems-av-technician-annapolis-swanxv132q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-cable-technician-columbus-swang9g4dy.md": {
	id: "swan-electrical-systems-cable-technician-columbus-swang9g4dy.md";
  slug: "swan-electrical-systems-cable-technician-columbus-swang9g4dy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56.md": {
	id: "swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56.md";
  slug: "swan-electrical-systems-industrial-electrician-grand-rapids-swanj1al56";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t.md": {
	id: "swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t.md";
  slug: "swan-electrical-systems-industrial-journeyman-electrician-los-angeles-swanoiez9t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr.md": {
	id: "swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr.md";
  slug: "swan-electrical-systems-industrial-journeyman-electrician-seattle-swanpublpr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz.md": {
	id: "swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz.md";
  slug: "swan-electrical-systems-residential-solar-installer-mcallen-swankh5nhz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"swan-electrical-systems-service-electrician-buffalo-swanxryi47.md": {
	id: "swan-electrical-systems-service-electrician-buffalo-swanxryi47.md";
  slug: "swan-electrical-systems-service-electrician-buffalo-swanxryi47";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-audio-visual-technician-alexandria-t&dcvd80k.md": {
	id: "t&d-communications-audio-visual-technician-alexandria-t&dcvd80k.md";
  slug: "td-communications-audio-visual-technician-alexandria-tdcvd80k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-oklahoma-city-t&d1k6uzf.md": {
	id: "t&d-communications-av-systems-tech-oklahoma-city-t&d1k6uzf.md";
  slug: "td-communications-av-systems-tech-oklahoma-city-td1k6uzf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-torrance-t&d7ujwdj.md": {
	id: "t&d-communications-av-systems-tech-torrance-t&d7ujwdj.md";
  slug: "td-communications-av-systems-tech-torrance-td7ujwdj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-av-systems-tech-westlake-village-t&d8njfed.md": {
	id: "t&d-communications-av-systems-tech-westlake-village-t&d8njfed.md";
  slug: "td-communications-av-systems-tech-westlake-village-td8njfed";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-installer-greenville-t&d4rqni9.md": {
	id: "t&d-communications-cable-installer-greenville-t&d4rqni9.md";
  slug: "td-communications-cable-installer-greenville-td4rqni9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-tech-beverly-hills-t&dv5bdcm.md": {
	id: "t&d-communications-cable-tech-beverly-hills-t&dv5bdcm.md";
  slug: "td-communications-cable-tech-beverly-hills-tdv5bdcm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-tech-irvine-t&df9xmv7.md": {
	id: "t&d-communications-cable-tech-irvine-t&df9xmv7.md";
  slug: "td-communications-cable-tech-irvine-tdf9xmv7";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-barstow-t&dp5xtu0.md": {
	id: "t&d-communications-cable-technician-barstow-t&dp5xtu0.md";
  slug: "td-communications-cable-technician-barstow-tdp5xtu0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-marina-del-rey-t&dknxgpk.md": {
	id: "t&d-communications-cable-technician-marina-del-rey-t&dknxgpk.md";
  slug: "td-communications-cable-technician-marina-del-rey-tdknxgpk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-modesto-t&d092y10.md": {
	id: "t&d-communications-cable-technician-modesto-t&d092y10.md";
  slug: "td-communications-cable-technician-modesto-td092y10";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-salem-t&dzphrzv.md": {
	id: "t&d-communications-cable-technician-salem-t&dzphrzv.md";
  slug: "td-communications-cable-technician-salem-tdzphrzv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-cable-technician-visalia-t&d4pew65.md": {
	id: "t&d-communications-cable-technician-visalia-t&d4pew65.md";
  slug: "td-communications-cable-technician-visalia-td4pew65";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-data-center-cable-tech-columbus-t&d3xiz6r.md": {
	id: "t&d-communications-data-center-cable-tech-columbus-t&d3xiz6r.md";
  slug: "td-communications-data-center-cable-tech-columbus-td3xiz6r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-data-center-cable-tech-costa-mesa-t&dr60rvb.md": {
	id: "t&d-communications-data-center-cable-tech-costa-mesa-t&dr60rvb.md";
  slug: "td-communications-data-center-cable-tech-costa-mesa-tdr60rvb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-fire-alarm-tech-houston-t&da5s1jn.md": {
	id: "t&d-communications-fire-alarm-tech-houston-t&da5s1jn.md";
  slug: "td-communications-fire-alarm-tech-houston-tda5s1jn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-fire-alarm-tech-st.-louis-t&dm4h7jm.md": {
	id: "t&d-communications-fire-alarm-tech-st.-louis-t&dm4h7jm.md";
  slug: "td-communications-fire-alarm-tech-st-louis-tdm4h7jm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-low-voltage-cable-technician-boulder-t&dl4fl5z.md": {
	id: "t&d-communications-low-voltage-cable-technician-boulder-t&dl4fl5z.md";
  slug: "td-communications-low-voltage-cable-technician-boulder-tdl4fl5z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"t&d-communications-security-technician-mammoth-lakes-t&dv5zs7m.md": {
	id: "t&d-communications-security-technician-mammoth-lakes-t&dv5zs7m.md";
  slug: "td-communications-security-technician-mammoth-lakes-tdv5zs7m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-anaheim-tecbph6pj.md": {
	id: "tec-electric-apprentice-electrician-anaheim-tecbph6pj.md";
  slug: "tec-electric-apprentice-electrician-anaheim-tecbph6pj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-santa-ana-tecqtvfx0.md": {
	id: "tec-electric-apprentice-electrician-santa-ana-tecqtvfx0.md";
  slug: "tec-electric-apprentice-electrician-santa-ana-tecqtvfx0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-apprentice-electrician-santa-rosa-tecyiolq0.md": {
	id: "tec-electric-apprentice-electrician-santa-rosa-tecyiolq0.md";
  slug: "tec-electric-apprentice-electrician-santa-rosa-tecyiolq0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-commercial-project-manager-augusta-tec9fwhjd.md": {
	id: "tec-electric-commercial-project-manager-augusta-tec9fwhjd.md";
  slug: "tec-electric-commercial-project-manager-augusta-tec9fwhjd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-commercial-project-manager-orlando-tec61fz6p.md": {
	id: "tec-electric-commercial-project-manager-orlando-tec61fz6p.md";
  slug: "tec-electric-commercial-project-manager-orlando-tec61fz6p";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-custom-home-master-electrician-greensboro-teca8vmb5.md": {
	id: "tec-electric-custom-home-master-electrician-greensboro-teca8vmb5.md";
  slug: "tec-electric-custom-home-master-electrician-greensboro-teca8vmb5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz.md": {
	id: "tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz.md";
  slug: "tec-electric-heavy-industrial-journeyman-electrician-erie-tecrqh2xz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-industrial-controls-electrician-albany-tec3zym42.md": {
	id: "tec-electric-industrial-controls-electrician-albany-tec3zym42.md";
  slug: "tec-electric-industrial-controls-electrician-albany-tec3zym42";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-industrial-controls-electrician-columbus-tecpm9mw0.md": {
	id: "tec-electric-industrial-controls-electrician-columbus-tecpm9mw0.md";
  slug: "tec-electric-industrial-controls-electrician-columbus-tecpm9mw0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-journeyman-electrician-ontario-tecgj71r5.md": {
	id: "tec-electric-journeyman-electrician-ontario-tecgj71r5.md";
  slug: "tec-electric-journeyman-electrician-ontario-tecgj71r5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-atlanta-tecz5hu62.md": {
	id: "tec-electric-junior-project-manager-atlanta-tecz5hu62.md";
  slug: "tec-electric-junior-project-manager-atlanta-tecz5hu62";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-aurora-tec46ce8g.md": {
	id: "tec-electric-junior-project-manager-aurora-tec46ce8g.md";
  slug: "tec-electric-junior-project-manager-aurora-tec46ce8g";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-columbus-tecglb3ug.md": {
	id: "tec-electric-junior-project-manager-columbus-tecglb3ug.md";
  slug: "tec-electric-junior-project-manager-columbus-tecglb3ug";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-miami-tecx7l0jn.md": {
	id: "tec-electric-junior-project-manager-miami-tecx7l0jn.md";
  slug: "tec-electric-junior-project-manager-miami-tecx7l0jn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-phoenix-tecu076rk.md": {
	id: "tec-electric-junior-project-manager-phoenix-tecu076rk.md";
  slug: "tec-electric-junior-project-manager-phoenix-tecu076rk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-junior-project-manager-st.-petersburg-tecly4a0h.md": {
	id: "tec-electric-junior-project-manager-st.-petersburg-tecly4a0h.md";
  slug: "tec-electric-junior-project-manager-st-petersburg-tecly4a0h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-maintenance-controls-electrician-savannah-tec7emt91.md": {
	id: "tec-electric-maintenance-controls-electrician-savannah-tec7emt91.md";
  slug: "tec-electric-maintenance-controls-electrician-savannah-tec7emt91";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t.md": {
	id: "tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t.md";
  slug: "tec-electric-manufacturing-journeyman-electrician-toledo-tecmqvt5t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-multi-family-master-electrician-montgomery-tec4or1b6.md": {
	id: "tec-electric-multi-family-master-electrician-montgomery-tec4or1b6.md";
  slug: "tec-electric-multi-family-master-electrician-montgomery-tec4or1b6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-project-manager-denver-tec5cpi4n.md": {
	id: "tec-electric-project-manager-denver-tec5cpi4n.md";
  slug: "tec-electric-project-manager-denver-tec5cpi4n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x.md": {
	id: "tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x.md";
  slug: "tec-electric-renewable-energy-master-electrician-baltimore-tecdzzb4x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-repair-apprentice-electrician-memphis-teczcccf1.md": {
	id: "tec-electric-repair-apprentice-electrician-memphis-teczcccf1.md";
  slug: "tec-electric-repair-apprentice-electrician-memphis-teczcccf1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-repair-master-electrician-youngstown-tecvvc0nk.md": {
	id: "tec-electric-repair-master-electrician-youngstown-tecvvc0nk.md";
  slug: "tec-electric-repair-master-electrician-youngstown-tecvvc0nk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6.md": {
	id: "tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6.md";
  slug: "tec-electric-residential-journeyman-electrician-myrtle-beach-tecashry6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-service-controls-electrician-dayton-tec3f802j.md": {
	id: "tec-electric-service-controls-electrician-dayton-tec3f802j.md";
  slug: "tec-electric-service-controls-electrician-dayton-tec3f802j";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-service-controls-electrician-saginaw-techzmgkk.md": {
	id: "tec-electric-service-controls-electrician-saginaw-techzmgkk.md";
  slug: "tec-electric-service-controls-electrician-saginaw-techzmgkk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tec-electric-solar-apprentice-electrician-jackson-tecglxa6i.md": {
	id: "tec-electric-solar-apprentice-electrician-jackson-tecglxa6i.md";
  slug: "tec-electric-solar-apprentice-electrician-jackson-tecglxa6i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-audio-visual-technician-state-college-tech2dm5c5.md": {
	id: "tech-electronics-audio-visual-technician-state-college-tech2dm5c5.md";
  slug: "tech-electronics-audio-visual-technician-state-college-tech2dm5c5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-av-technician-nashville-tech0akat3.md": {
	id: "tech-electronics-av-technician-nashville-tech0akat3.md";
  slug: "tech-electronics-av-technician-nashville-tech0akat3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-cable-technician-atlanta-tech7cf84a.md": {
	id: "tech-electronics-cable-technician-atlanta-tech7cf84a.md";
  slug: "tech-electronics-cable-technician-atlanta-tech7cf84a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-controls-engineer-seattle-techtrcabd.md": {
	id: "tech-electronics-controls-engineer-seattle-techtrcabd.md";
  slug: "tech-electronics-controls-engineer-seattle-techtrcabd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-controls-technician-pittsburgh-tech9ljyem.md": {
	id: "tech-electronics-controls-technician-pittsburgh-tech9ljyem.md";
  slug: "tech-electronics-controls-technician-pittsburgh-tech9ljyem";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-data-center-cable-tech-san-jose-tech16bpdv.md": {
	id: "tech-electronics-data-center-cable-tech-san-jose-tech16bpdv.md";
  slug: "tech-electronics-data-center-cable-tech-san-jose-tech16bpdv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-electrical-apprentice-boulder-techzwrgaq.md": {
	id: "tech-electronics-electrical-apprentice-boulder-techzwrgaq.md";
  slug: "tech-electronics-electrical-apprentice-boulder-techzwrgaq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-installer-hartford-techpnurg9.md": {
	id: "tech-electronics-fire-alarm-installer-hartford-techpnurg9.md";
  slug: "tech-electronics-fire-alarm-installer-hartford-techpnurg9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-installer-lubbock-techucn9xd.md": {
	id: "tech-electronics-fire-alarm-installer-lubbock-techucn9xd.md";
  slug: "tech-electronics-fire-alarm-installer-lubbock-techucn9xd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9.md": {
	id: "tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9.md";
  slug: "tech-electronics-fire-alarm-tech-los-angeles-tech6lyyq9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz.md": {
	id: "tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz.md";
  slug: "tech-electronics-fire-alarm-tech-westlake-village-tech8k94sz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-fire-alarm-technician-los-angeles-techpg6796.md": {
	id: "tech-electronics-fire-alarm-technician-los-angeles-techpg6796.md";
  slug: "tech-electronics-fire-alarm-technician-los-angeles-techpg6796";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-low-voltage-cable-technician-athens-techddtc24.md": {
	id: "tech-electronics-low-voltage-cable-technician-athens-techddtc24.md";
  slug: "tech-electronics-low-voltage-cable-technician-athens-techddtc24";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1.md": {
	id: "tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1.md";
  slug: "tech-electronics-low-voltage-cable-technician-pinedale-techkk6ne1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-residential-electrician-raleigh-techwruv3x.md": {
	id: "tech-electronics-residential-electrician-raleigh-techwruv3x.md";
  slug: "tech-electronics-residential-electrician-raleigh-techwruv3x";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-residential-electrician-tucson-techvmjrut.md": {
	id: "tech-electronics-residential-electrician-tucson-techvmjrut.md";
  slug: "tech-electronics-residential-electrician-tucson-techvmjrut";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-residential-solar-installer-anderson-tech9iwr9q.md": {
	id: "tech-electronics-residential-solar-installer-anderson-tech9iwr9q.md";
  slug: "tech-electronics-residential-solar-installer-anderson-tech9iwr9q";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-residential-solar-installer-tampa-techybqfdy.md": {
	id: "tech-electronics-residential-solar-installer-tampa-techybqfdy.md";
  slug: "tech-electronics-residential-solar-installer-tampa-techybqfdy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-security-systems-tech-cleveland-techexgvxu.md": {
	id: "tech-electronics-security-systems-tech-cleveland-techexgvxu.md";
  slug: "tech-electronics-security-systems-tech-cleveland-techexgvxu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-security-systems-tech-milpitas-techdq70ew.md": {
	id: "tech-electronics-security-systems-tech-milpitas-techdq70ew.md";
  slug: "tech-electronics-security-systems-tech-milpitas-techdq70ew";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tech-electronics-voice-data-installer-winston-salem-techi7m73i.md": {
	id: "tech-electronics-voice-data-installer-winston-salem-techi7m73i.md";
  slug: "tech-electronics-voice-data-installer-winston-salem-techi7m73i";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-brookline-av-t-vq2kt3.md": {
	id: "telco-data-av-tech-brookline-av-t-vq2kt3.md";
  slug: "telco-data-av-tech-brookline-av-t-vq2kt3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-cambridge-av-t-077jui.md": {
	id: "telco-data-av-tech-cambridge-av-t-077jui.md";
  slug: "telco-data-av-tech-cambridge-av-t-077jui";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-coral-gables-av-t-26p6nm.md": {
	id: "telco-data-av-tech-coral-gables-av-t-26p6nm.md";
  slug: "telco-data-av-tech-coral-gables-av-t-26p6nm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-coral-gables-av-t-5j7uda.md": {
	id: "telco-data-av-tech-coral-gables-av-t-5j7uda.md";
  slug: "telco-data-av-tech-coral-gables-av-t-5j7uda";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-gary-av-t-o81i6a.md": {
	id: "telco-data-av-tech-gary-av-t-o81i6a.md";
  slug: "telco-data-av-tech-gary-av-t-o81i6a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-newton-av-t-xfpifg.md": {
	id: "telco-data-av-tech-newton-av-t-xfpifg.md";
  slug: "telco-data-av-tech-newton-av-t-xfpifg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-av-tech-pompano-beach-av-t-l1m4m5.md": {
	id: "telco-data-av-tech-pompano-beach-av-t-l1m4m5.md";
  slug: "telco-data-av-tech-pompano-beach-av-t-l1m4m5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-arlington-cabl-7aiqho.md": {
	id: "telco-data-cable-tech-team-lead-arlington-cabl-7aiqho.md";
  slug: "telco-data-cable-tech-team-lead-arlington-cabl-7aiqho";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-arlington-cabl-y51kxx.md": {
	id: "telco-data-cable-tech-team-lead-arlington-cabl-y51kxx.md";
  slug: "telco-data-cable-tech-team-lead-arlington-cabl-y51kxx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky.md": {
	id: "telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky.md";
  slug: "telco-data-cable-tech-team-lead-bethesda-cabl-ac5hky";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-bethesda-cabl-g487nk.md": {
	id: "telco-data-cable-tech-team-lead-bethesda-cabl-g487nk.md";
  slug: "telco-data-cable-tech-team-lead-bethesda-cabl-g487nk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6.md": {
	id: "telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6.md";
  slug: "telco-data-cable-tech-team-lead-hoboken-cabl-wlqfw6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z.md": {
	id: "telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z.md";
  slug: "telco-data-cable-tech-team-lead-hollywood-cabl-qd1p3z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-newton-cabl-6gjioa.md": {
	id: "telco-data-cable-tech-team-lead-newton-cabl-6gjioa.md";
  slug: "telco-data-cable-tech-team-lead-newton-cabl-6gjioa";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-somerville-cabl-4v18nf.md": {
	id: "telco-data-cable-tech-team-lead-somerville-cabl-4v18nf.md";
  slug: "telco-data-cable-tech-team-lead-somerville-cabl-4v18nf";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do.md": {
	id: "telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do.md";
  slug: "telco-data-cable-tech-team-lead-yonkers-cabl-6qc9do";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq.md": {
	id: "telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq.md";
  slug: "telco-data-cable-tech-team-lead-yonkers-cabl-6qdhrq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-alexandria-fire-frxwqg.md": {
	id: "telco-data-fire-alarm-tech-alexandria-fire-frxwqg.md";
  slug: "telco-data-fire-alarm-tech-alexandria-fire-frxwqg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-boca-raton-fire-llbssy.md": {
	id: "telco-data-fire-alarm-tech-boca-raton-fire-llbssy.md";
  slug: "telco-data-fire-alarm-tech-boca-raton-fire-llbssy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-brookline-fire-woo0dd.md": {
	id: "telco-data-fire-alarm-tech-brookline-fire-woo0dd.md";
  slug: "telco-data-fire-alarm-tech-brookline-fire-woo0dd";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-cambridge-fire-cwp0oy.md": {
	id: "telco-data-fire-alarm-tech-cambridge-fire-cwp0oy.md";
  slug: "telco-data-fire-alarm-tech-cambridge-fire-cwp0oy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-jersey-city-fire-iquft8.md": {
	id: "telco-data-fire-alarm-tech-jersey-city-fire-iquft8.md";
  slug: "telco-data-fire-alarm-tech-jersey-city-fire-iquft8";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-mclean-fire-y02lmu.md": {
	id: "telco-data-fire-alarm-tech-mclean-fire-y02lmu.md";
  slug: "telco-data-fire-alarm-tech-mclean-fire-y02lmu";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-quincy-fire-g2c62f.md": {
	id: "telco-data-fire-alarm-tech-quincy-fire-g2c62f.md";
  slug: "telco-data-fire-alarm-tech-quincy-fire-g2c62f";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-fire-alarm-tech-white-plains-fire-h8wl5l.md": {
	id: "telco-data-fire-alarm-tech-white-plains-fire-h8wl5l.md";
  slug: "telco-data-fire-alarm-tech-white-plains-fire-h8wl5l";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-alexandria-secu-xh3jaj.md": {
	id: "telco-data-security-tech-alexandria-secu-xh3jaj.md";
  slug: "telco-data-security-tech-alexandria-secu-xh3jaj";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-delray-beach-secu-ng6o9t.md": {
	id: "telco-data-security-tech-delray-beach-secu-ng6o9t.md";
  slug: "telco-data-security-tech-delray-beach-secu-ng6o9t";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-fort-lee-secu-256ap3.md": {
	id: "telco-data-security-tech-fort-lee-secu-256ap3.md";
  slug: "telco-data-security-tech-fort-lee-secu-256ap3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-hoboken-secu-ruum3w.md": {
	id: "telco-data-security-tech-hoboken-secu-ruum3w.md";
  slug: "telco-data-security-tech-hoboken-secu-ruum3w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-hollywood-secu-eymuuh.md": {
	id: "telco-data-security-tech-hollywood-secu-eymuuh.md";
  slug: "telco-data-security-tech-hollywood-secu-eymuuh";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-indianapolis-secu-zz3ge1.md": {
	id: "telco-data-security-tech-indianapolis-secu-zz3ge1.md";
  slug: "telco-data-security-tech-indianapolis-secu-zz3ge1";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-jersey-city-secu-8mqjl2.md": {
	id: "telco-data-security-tech-jersey-city-secu-8mqjl2.md";
  slug: "telco-data-security-tech-jersey-city-secu-8mqjl2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"telco-data-security-tech-silver-spring-secu-an0tty.md": {
	id: "telco-data-security-tech-silver-spring-secu-an0tty.md";
  slug: "telco-data-security-tech-silver-spring-secu-an0tty";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-av-systems-tech-culver-city-tele7y7nlb.md": {
	id: "teleco-av-systems-tech-culver-city-tele7y7nlb.md";
  slug: "teleco-av-systems-tech-culver-city-tele7y7nlb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-cable-technician-aurora-televe7xv3.md": {
	id: "teleco-cable-technician-aurora-televe7xv3.md";
  slug: "teleco-cable-technician-aurora-televe7xv3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-data-center-cable-tech-laguna-hills-telerq726k.md": {
	id: "teleco-data-center-cable-tech-laguna-hills-telerq726k.md";
  slug: "teleco-data-center-cable-tech-laguna-hills-telerq726k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-fire-alarm-tech-austin-telerb0gc5.md": {
	id: "teleco-fire-alarm-tech-austin-telerb0gc5.md";
  slug: "teleco-fire-alarm-tech-austin-telerb0gc5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-fire-alarm-tech-la-palma-telea41vih.md": {
	id: "teleco-fire-alarm-tech-la-palma-telea41vih.md";
  slug: "teleco-fire-alarm-tech-la-palma-telea41vih";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-low-voltage-cable-technician-cary-tele4l0mx0.md": {
	id: "teleco-low-voltage-cable-technician-cary-tele4l0mx0.md";
  slug: "teleco-low-voltage-cable-technician-cary-tele4l0mx0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z.md": {
	id: "teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z.md";
  slug: "teleco-low-voltage-cable-technician-chesapeake-tele3u4a6z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-security-systems-tech-cincinnati-tele1inm92.md": {
	id: "teleco-security-systems-tech-cincinnati-tele1inm92.md";
  slug: "teleco-security-systems-tech-cincinnati-tele1inm92";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-security-systems-tech-los-alamitos-telem0xzs5.md": {
	id: "teleco-security-systems-tech-los-alamitos-telem0xzs5.md";
  slug: "teleco-security-systems-tech-los-alamitos-telem0xzs5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"teleco-security-systems-tech-san-rafael-telerfvucl.md": {
	id: "teleco-security-systems-tech-san-rafael-telerfvucl.md";
  slug: "teleco-security-systems-tech-san-rafael-telerfvucl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-cable-technician-portland-rogers-id-mm8313.md": {
	id: "tr-cable-technician-portland-rogers-id-mm8313.md";
  slug: "tr-cable-technician-portland-rogers-id-mm8313";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-cabletech-arlington-kane-id-gg8200.md": {
	id: "tr-cabletech-arlington-kane-id-gg8200.md";
  slug: "tr-cabletech-arlington-kane-id-gg8200";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-data-installer-fremont-id-hv8477.md": {
	id: "tr-data-installer-fremont-id-hv8477.md";
  slug: "tr-data-installer-fremont-id-hv8477";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-data-installer-seattle-id-bb8834.md": {
	id: "tr-data-installer-seattle-id-bb8834.md";
  slug: "tr-data-installer-seattle-id-bb8834";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-data-installer-virginia-id-tr8001.md": {
	id: "tr-data-installer-virginia-id-tr8001.md";
  slug: "tr-data-installer-virginia-id-tr8001";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-fiber-optic-technician-mcenroe-sb-id-mm4811.md": {
	id: "tr-fiber-optic-technician-mcenroe-sb-id-mm4811.md";
  slug: "tr-fiber-optic-technician-mcenroe-sb-id-mm4811";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-audio-visual-technician-boise-trgw8gsuz.md": {
	id: "tr-group-audio-visual-technician-boise-trgw8gsuz.md";
  slug: "tr-group-audio-visual-technician-boise-trgw8gsuz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-audio-visual-technician-nampa-trgbfpwq4.md": {
	id: "tr-group-audio-visual-technician-nampa-trgbfpwq4.md";
  slug: "tr-group-audio-visual-technician-nampa-trgbfpwq4";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-cable-technician-charlotte-trgsr0bh2.md": {
	id: "tr-group-cable-technician-charlotte-trgsr0bh2.md";
  slug: "tr-group-cable-technician-charlotte-trgsr0bh2";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-commercial-apprentice-philadelphia-trgmklcon.md": {
	id: "tr-group-commercial-apprentice-philadelphia-trgmklcon.md";
  slug: "tr-group-commercial-apprentice-philadelphia-trgmklcon";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-commercial-electrician-nashville-trgz4v93d.md": {
	id: "tr-group-commercial-electrician-nashville-trgz4v93d.md";
  slug: "tr-group-commercial-electrician-nashville-trgz4v93d";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-controls-technician-grand-rapids-trgsrnovn.md": {
	id: "tr-group-controls-technician-grand-rapids-trgsrnovn.md";
  slug: "tr-group-controls-technician-grand-rapids-trgsrnovn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-data-center-technician-chicago-trgs3ifre.md": {
	id: "tr-group-data-center-technician-chicago-trgs3ifre.md";
  slug: "tr-group-data-center-technician-chicago-trgs3ifre";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-fire-alarm-technician-chicago-trgnz7359.md": {
	id: "tr-group-fire-alarm-technician-chicago-trgnz7359.md";
  slug: "tr-group-fire-alarm-technician-chicago-trgnz7359";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-fire-alarm-technician-miami-trg41x0dk.md": {
	id: "tr-group-fire-alarm-technician-miami-trg41x0dk.md";
  slug: "tr-group-fire-alarm-technician-miami-trg41x0dk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-industrial-electrician-phoenix-trgitgy25.md": {
	id: "tr-group-industrial-electrician-phoenix-trgitgy25.md";
  slug: "tr-group-industrial-electrician-phoenix-trgitgy25";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-industrial-electrician-san-francisco-trgvff60y.md": {
	id: "tr-group-industrial-electrician-san-francisco-trgvff60y.md";
  slug: "tr-group-industrial-electrician-san-francisco-trgvff60y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-group-residential-electrician-chicago-trg8mkfch.md": {
	id: "tr-group-residential-electrician-chicago-trg8mkfch.md";
  slug: "tr-group-residential-electrician-chicago-trg8mkfch";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-journeyman-electrician-morgan-hill-rogers-id-bb5881.md": {
	id: "tr-journeyman-electrician-morgan-hill-rogers-id-bb5881.md";
  slug: "tr-journeyman-electrician-morgan-hill-rogers-id-bb5881";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-south-africa-johan-assistant-id-br2283.md": {
	id: "tr-south-africa-johan-assistant-id-br2283.md";
  slug: "tr-south-africa-johan-assistant-id-br2283";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-cable-technician-greeley-trivg3u36.md": {
	id: "tri-city-electric-cable-technician-greeley-trivg3u36.md";
  slug: "tri-city-electric-cable-technician-greeley-trivg3u36";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-cable-technician-oakboro-trihj7q98.md": {
	id: "tri-city-electric-cable-technician-oakboro-trihj7q98.md";
  slug: "tri-city-electric-cable-technician-oakboro-trihj7q98";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-commercial-electrician-hartford-triivf504.md": {
	id: "tri-city-electric-commercial-electrician-hartford-triivf504.md";
  slug: "tri-city-electric-commercial-electrician-hartford-triivf504";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-data-center-technician-georgetown-trivlryku.md": {
	id: "tri-city-electric-data-center-technician-georgetown-trivlryku.md";
  slug: "tri-city-electric-data-center-technician-georgetown-trivlryku";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-data-center-technician-providence-triywkmjb.md": {
	id: "tri-city-electric-data-center-technician-providence-triywkmjb.md";
  slug: "tri-city-electric-data-center-technician-providence-triywkmjb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-electrician-morganton-tribm4sre.md": {
	id: "tri-city-electric-electrician-morganton-tribm4sre.md";
  slug: "tri-city-electric-electrician-morganton-tribm4sre";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-electrician-richmond-trizmn7ad.md": {
	id: "tri-city-electric-electrician-richmond-trizmn7ad.md";
  slug: "tri-city-electric-electrician-richmond-trizmn7ad";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tri-city-electric-security-technician-tampa-tri3aaqz0.md": {
	id: "tri-city-electric-security-technician-tampa-tri3aaqz0.md";
  slug: "tri-city-electric-security-technician-tampa-tri3aaqz0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-designer-mesa-vallatma87.md": {
	id: "valley-alarm-fire-alarm-designer-mesa-vallatma87.md";
  slug: "valley-alarm-fire-alarm-designer-mesa-vallatma87";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah.md": {
	id: "valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah.md";
  slug: "valley-alarm-fire-alarm-designer-north-las-vegas-vall4vg1ah";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc.md": {
	id: "valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc.md";
  slug: "valley-alarm-fire-alarm-project-manager-long-beach-vallo2nemc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"valley-alarm-junior-project-manager-peoria-vallzpet0y.md": {
	id: "valley-alarm-junior-project-manager-peoria-vallzpet0y.md";
  slug: "valley-alarm-junior-project-manager-peoria-vallzpet0y";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3.md": {
	id: "valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3.md";
  slug: "valley-alarm-security-alarm-project-manager-santa-ana-vall659ub3";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-av-systems-tech-detroit-visi6bj5zg.md": {
	id: "vision-technologies-av-systems-tech-detroit-visi6bj5zg.md";
  slug: "vision-technologies-av-systems-tech-detroit-visi6bj5zg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-av-systems-tech-lake-forest-visiq8s9xz.md": {
	id: "vision-technologies-av-systems-tech-lake-forest-visiq8s9xz.md";
  slug: "vision-technologies-av-systems-tech-lake-forest-visiq8s9xz";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm.md": {
	id: "vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm.md";
  slug: "vision-technologies-cable-tech-south-lake-tahoe-visigcu2vm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-cable-technician-pasadena-visiepelxy.md": {
	id: "vision-technologies-cable-technician-pasadena-visiepelxy.md";
  slug: "vision-technologies-cable-technician-pasadena-visiepelxy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-cable-technician-virginia-beach-visiq9o906.md": {
	id: "vision-technologies-cable-technician-virginia-beach-visiq9o906.md";
  slug: "vision-technologies-cable-technician-virginia-beach-visiq9o906";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-commercial-apprentice-colorado-springs-visihofdkv.md": {
	id: "vision-technologies-commercial-apprentice-colorado-springs-visihofdkv.md";
  slug: "vision-technologies-commercial-apprentice-colorado-springs-visihofdkv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl.md": {
	id: "vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl.md";
  slug: "vision-technologies-fire-alarm-installer-grand-junction-visi4z0lkl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-fire-alarm-installer-pueblo-visipo37dg.md": {
	id: "vision-technologies-fire-alarm-installer-pueblo-visipo37dg.md";
  slug: "vision-technologies-fire-alarm-installer-pueblo-visipo37dg";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-industrial-electrician-dallas-visiia1ivn.md": {
	id: "vision-technologies-industrial-electrician-dallas-visiia1ivn.md";
  slug: "vision-technologies-industrial-electrician-dallas-visiia1ivn";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy.md": {
	id: "vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy.md";
  slug: "vision-technologies-low-voltage-cable-technician-commerce-visi3fcoqy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe.md": {
	id: "vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe.md";
  slug: "vision-technologies-low-voltage-cable-technician-louisville-visi1wdepe";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-residential-solar-installer-murfreesboro-visiospl4n.md": {
	id: "vision-technologies-residential-solar-installer-murfreesboro-visiospl4n.md";
  slug: "vision-technologies-residential-solar-installer-murfreesboro-visiospl4n";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-san-antonio-visi6np52m.md": {
	id: "vision-technologies-security-systems-tech-san-antonio-visi6np52m.md";
  slug: "vision-technologies-security-systems-tech-san-antonio-visi6np52m";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-san-carlos-visiyx1eht.md": {
	id: "vision-technologies-security-systems-tech-san-carlos-visiyx1eht.md";
  slug: "vision-technologies-security-systems-tech-san-carlos-visiyx1eht";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-security-systems-tech-westlake-village-visimqjzgl.md": {
	id: "vision-technologies-security-systems-tech-westlake-village-visimqjzgl.md";
  slug: "vision-technologies-security-systems-tech-westlake-village-visimqjzgl";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-security-technician-san-diego-visi7autt0.md": {
	id: "vision-technologies-security-technician-san-diego-visi7autt0.md";
  slug: "vision-technologies-security-technician-san-diego-visi7autt0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-senior-controls-technician-los-angeles-visilv146s.md": {
	id: "vision-technologies-senior-controls-technician-los-angeles-visilv146s.md";
  slug: "vision-technologies-senior-controls-technician-los-angeles-visilv146s";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-service-electrician-augusta-visiwtejir.md": {
	id: "vision-technologies-service-electrician-augusta-visiwtejir.md";
  slug: "vision-technologies-service-electrician-augusta-visiwtejir";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"vision-technologies-voice-data-installer-topeka-visiymc1gb.md": {
	id: "vision-technologies-voice-data-installer-topeka-visiymc1gb.md";
  slug: "vision-technologies-voice-data-installer-topeka-visiymc1gb";
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
"west-coast-fire-fire-alarm-designer-glendale-westcap11k.md": {
	id: "west-coast-fire-fire-alarm-designer-glendale-westcap11k.md";
  slug: "west-coast-fire-fire-alarm-designer-glendale-westcap11k";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-henderson-westfsnipc.md": {
	id: "west-coast-fire-fire-alarm-designer-henderson-westfsnipc.md";
  slug: "west-coast-fire-fire-alarm-designer-henderson-westfsnipc";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-riverside-westacszhm.md": {
	id: "west-coast-fire-fire-alarm-designer-riverside-westacszhm.md";
  slug: "west-coast-fire-fire-alarm-designer-riverside-westacszhm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-fire-alarm-designer-san-diego-westkuraqt.md": {
	id: "west-coast-fire-fire-alarm-designer-san-diego-westkuraqt.md";
  slug: "west-coast-fire-fire-alarm-designer-san-diego-westkuraqt";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-security-alarm-project-manager-gresham-westbnv218.md": {
	id: "west-coast-fire-security-alarm-project-manager-gresham-westbnv218.md";
  slug: "west-coast-fire-security-alarm-project-manager-gresham-westbnv218";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0.md": {
	id: "west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0.md";
  slug: "west-coast-fire-security-alarm-project-manager-las-vegas-westveiye0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"west-coast-fire-security-project-manager-fresno-west52bfm6.md": {
	id: "west-coast-fire-security-project-manager-fresno-west52bfm6.md";
  slug: "west-coast-fire-security-project-manager-fresno-west52bfm6";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-tech-bakersfield-wili7nmajx.md": {
	id: "wiline-cable-tech-bakersfield-wili7nmajx.md";
  slug: "wiline-cable-tech-bakersfield-wili7nmajx";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-tech-sacramento-wiligzix5z.md": {
	id: "wiline-cable-tech-sacramento-wiligzix5z.md";
  slug: "wiline-cable-tech-sacramento-wiligzix5z";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-tech-san-jose-wiliqlta1h.md": {
	id: "wiline-cable-tech-san-jose-wiliqlta1h.md";
  slug: "wiline-cable-tech-san-jose-wiliqlta1h";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-tech-victorville-wilih0aowo.md": {
	id: "wiline-cable-tech-victorville-wilih0aowo.md";
  slug: "wiline-cable-tech-victorville-wilih0aowo";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-technician-arlington-wiliiamcwp.md": {
	id: "wiline-cable-technician-arlington-wiliiamcwp.md";
  slug: "wiline-cable-technician-arlington-wiliiamcwp";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-technician-fresno-wili3vjktr.md": {
	id: "wiline-cable-technician-fresno-wili3vjktr.md";
  slug: "wiline-cable-technician-fresno-wili3vjktr";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-cable-technician-longmont-wililfzvw9.md": {
	id: "wiline-cable-technician-longmont-wililfzvw9.md";
  slug: "wiline-cable-technician-longmont-wililfzvw9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-data-center-cable-tech-fort-worth-wiliqbgw0w.md": {
	id: "wiline-data-center-cable-tech-fort-worth-wiliqbgw0w.md";
  slug: "wiline-data-center-cable-tech-fort-worth-wiliqbgw0w";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62.md": {
	id: "wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62.md";
  slug: "wiline-fire-alarm-tech-rancho-santa-margarita-wilijq2q62";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-residential-solar-installer-spokane-wili75qu98.md": {
	id: "wiline-residential-solar-installer-spokane-wili75qu98.md";
  slug: "wiline-residential-solar-installer-spokane-wili75qu98";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-security-systems-tech-union-city-wili8ah37a.md": {
	id: "wiline-security-systems-tech-union-city-wili8ah37a.md";
  slug: "wiline-security-systems-tech-union-city-wili8ah37a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-security-technician-columbus-wiliqx53pm.md": {
	id: "wiline-security-technician-columbus-wiliqx53pm.md";
  slug: "wiline-security-technician-columbus-wiliqx53pm";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-security-technician-fayetteville-wilimxw5hy.md": {
	id: "wiline-security-technician-fayetteville-wilimxw5hy.md";
  slug: "wiline-security-technician-fayetteville-wilimxw5hy";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wiline-security-technician-long-beach-wiliopkjk9.md": {
	id: "wiline-security-technician-long-beach-wiliopkjk9.md";
  slug: "wiline-security-technician-long-beach-wiliopkjk9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-av-systems-tech-foster-city-wiser4m45r.md": {
	id: "wisetel-av-systems-tech-foster-city-wiser4m45r.md";
  slug: "wisetel-av-systems-tech-foster-city-wiser4m45r";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-av-systems-tech-portland-wise5z9cps.md": {
	id: "wisetel-av-systems-tech-portland-wise5z9cps.md";
  slug: "wisetel-av-systems-tech-portland-wise5z9cps";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-fountain-wisedzslx9.md": {
	id: "wisetel-cable-technician-fountain-wisedzslx9.md";
  slug: "wisetel-cable-technician-fountain-wisedzslx9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-greeley-wisehl7kbv.md": {
	id: "wisetel-cable-technician-greeley-wisehl7kbv.md";
  slug: "wisetel-cable-technician-greeley-wisehl7kbv";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-jackson-wisedmgl86.md": {
	id: "wisetel-cable-technician-jackson-wisedmgl86.md";
  slug: "wisetel-cable-technician-jackson-wisedmgl86";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-roanoke-wisebfclzw.md": {
	id: "wisetel-cable-technician-roanoke-wisebfclzw.md";
  slug: "wisetel-cable-technician-roanoke-wisebfclzw";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-sandy-springs-wisek0ooo5.md": {
	id: "wisetel-cable-technician-sandy-springs-wisek0ooo5.md";
  slug: "wisetel-cable-technician-sandy-springs-wisek0ooo5";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-cable-technician-smyrna-wiserfh0ax.md": {
	id: "wisetel-cable-technician-smyrna-wiserfh0ax.md";
  slug: "wisetel-cable-technician-smyrna-wiserfh0ax";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-el-paso-wise83bbu0.md": {
	id: "wisetel-fire-alarm-tech-el-paso-wise83bbu0.md";
  slug: "wisetel-fire-alarm-tech-el-paso-wise83bbu0";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a.md": {
	id: "wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a.md";
  slug: "wisetel-fire-alarm-tech-ladera-ranch-wise00wj0a";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-san-diego-wise9i3zwk.md": {
	id: "wisetel-fire-alarm-tech-san-diego-wise9i3zwk.md";
  slug: "wisetel-fire-alarm-tech-san-diego-wise9i3zwk";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-santa-clara-wisebll3gq.md": {
	id: "wisetel-fire-alarm-tech-santa-clara-wisebll3gq.md";
  slug: "wisetel-fire-alarm-tech-santa-clara-wisebll3gq";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-fire-alarm-tech-tustin-wise1cj2fb.md": {
	id: "wisetel-fire-alarm-tech-tustin-wise1cj2fb.md";
  slug: "wisetel-fire-alarm-tech-tustin-wise1cj2fb";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-low-voltage-cable-technician-durham-wisea44vf9.md": {
	id: "wisetel-low-voltage-cable-technician-durham-wisea44vf9.md";
  slug: "wisetel-low-voltage-cable-technician-durham-wisea44vf9";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"wisetel-security-systems-tech-aliso-viejo-wisevzc6sy.md": {
	id: "wisetel-security-systems-tech-aliso-viejo-wisevzc6sy.md";
  slug: "wisetel-security-systems-tech-aliso-viejo-wisevzc6sy";
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
"apprentice-electrician-jobs.md": {
	id: "apprentice-electrician-jobs.md";
  slug: "apprentice-electrician-jobs";
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
"commercial-electrician-interview-questions-and-answers.md": {
	id: "commercial-electrician-interview-questions-and-answers.md";
  slug: "commercial-electrician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"data-center-technician-interview-questions-and-answers.md": {
	id: "data-center-technician-interview-questions-and-answers.md";
  slug: "data-center-technician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"electrician-job-outlook.md": {
	id: "electrician-job-outlook.md";
  slug: "electrician-job-outlook";
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
"industrial-electrician-interview-questions-and-answers.md": {
	id: "industrial-electrician-interview-questions-and-answers.md";
  slug: "industrial-electrician-interview-questions-and-answers";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"journeyman-electrician-jobs.md": {
	id: "journeyman-electrician-jobs.md";
  slug: "journeyman-electrician-jobs";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"master-electrician-employment.md": {
	id: "master-electrician-employment.md";
  slug: "master-electrician-employment";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"residential-electrician-careers.md": {
	id: "residential-electrician-careers.md";
  slug: "residential-electrician-careers";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"residential-electrician-interview-questions-and-answers.md": {
	id: "residential-electrician-interview-questions-and-answers.md";
  slug: "residential-electrician-interview-questions-and-answers";
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
