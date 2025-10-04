import { ReactiveState } from "../Lib-state/state";

type Inputs = Record<string, any>;
type Outputs = Record<string, (event: Event) => void>;
type HostEvents = Record<string, (event: Event) => void>;

export class Component<
    I extends Inputs = {},
    O extends Outputs = {},
    H extends HostEvents = {}
> {
    private template: string;
    private inputs: I;
    private outputs: O;
    private rootTag: string;
    private el: HTMLElement | null = null;
    private bindings: Map<string, Node[]> = new Map();
    private hostClasses: string[] = [];
    private hostEvents: Partial<H> = {} as H;
    private hostEventListeners: Map<string, EventListener> = new Map();
    private mountedChildren: Map<string, Component<any, any, any>> = new Map();

    constructor(params: {
        template: string;
        inputs?: I;
        outputs?: O;
        rootTag?: string;
        hostClasses?: string[];
        hostEvents?: Partial<H>;
    }) {
        this.template = params.template;
        this.inputs = (params.inputs || {}) as I;
        this.outputs = (params.outputs || {}) as O;
        this.rootTag = params.rootTag || "div";
        this.hostClasses = params.hostClasses || [];
        this.hostEvents = params.hostEvents || ({} as H);
    }

    render(container?: HTMLElement): HTMLElement {
        if (!this.el) {
            const wrapper = document.createElement(this.rootTag);
            wrapper.innerHTML = this.template.trim();
            this.el = wrapper as HTMLElement;

            this.updateHostClasses();
            this.attachHostEvents();
            this.scanBindings(this.el);
            this.updateBindings();
            this.attachOutputs(this.el);
            this.mountChildren();

            if (container) container.appendChild(this.el);
        }
        return this.el;
    }

    setInputs(newInputs: Partial<I>): void {
        this.inputs = { ...this.inputs, ...newInputs };
        this.updateBindings();
        this.updateChildren();
    }

    setHostClasses(classes: string[]): void {
        this.hostClasses = classes;
        this.updateHostClasses();
    }

    setHostEvents(events: Partial<H>): void {
        this.hostEvents = { ...this.hostEvents, ...events };
        this.attachHostEvents();
    }

    private updateHostClasses(): void {
        if (!this.el) return;
        this.el.className = this.hostClasses.join(" ");
    }

    private attachHostEvents(): void {
        if (!this.el) return;

        for (const [event, listener] of this.hostEventListeners) {
            this.el.removeEventListener(event, listener);
        }
        this.hostEventListeners.clear();

        for (const [event, handler] of Object.entries(this.hostEvents)) {
            const listener = handler as EventListener;
            this.el.addEventListener(event, listener);
            this.hostEventListeners.set(event, listener);
        }
    }

    private scanBindings(root: HTMLElement | null): void {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
            const match = node.nodeValue?.match(/\{\{(.*?)\}\}/);
            if (match) {
                const key = match[1].trim();
                if (!this.bindings.has(key)) this.bindings.set(key, []);
                this.bindings.get(key)!.push(node);
            }
        }
    }

    private updateBindings(): void {
        for (const [key, nodes] of this.bindings.entries()) {
            const value = this.inputs[key as keyof I] ?? "";
            nodes.forEach((node) => (node.nodeValue = String(value)));
        }
    }

    private attachOutputs(root: HTMLElement): void {
        for (const [key, handler] of Object.entries(this.outputs)) {
            const [event, selector] = key.split(":");
            if (!event) continue;

            if (selector) {
                root.addEventListener(event, (e) => {
                    const target = e.target as HTMLElement;
                    if (target && target.matches(selector)) {
                        handler(e);
                        this.el?.dispatchEvent(new CustomEvent(key, { detail: e }));
                    }
                });
            } else {
                root.addEventListener(event, (e) => {
                    handler(e);
                    this.el?.dispatchEvent(new CustomEvent(key, { detail: e }));
                });
            }
        }
    }

    private mountChildren(): void {
        if (!this.el) return;
        Object.entries(this.inputs).forEach(([key, value]) => {
            if (value instanceof Component) {
                const slotEl = this.el!.querySelector(`[data-child="${key}"]`);
                if (slotEl) {
                    value.render();
                    slotEl.appendChild(value.element!);
                    this.mountedChildren.set(key, value);

                    // Bubble child events
                    value.element!.addEventListener("*", (e: any) => {
                        this.emit(`${key}:${e.type}`, e.detail);
                    });
                }
            }
        });
    }

    private updateChildren(): void {
        for (const [key, child] of this.mountedChildren.entries()) {
            const latest = this.inputs[key];
            if (latest instanceof Component && latest === child) {
                // already mounted — update inputs if changed
                child.setInputs(latest["inputs"] || {});
            }
        }
    }

    emit(eventName: string, detail?: any) {
        if (!this.el) return;
        this.el.dispatchEvent(new CustomEvent(eventName, { detail }));
    }

    on(eventName: string, handler: (e: CustomEvent) => void) {
        if (!this.el) return;
        this.el.addEventListener(eventName, handler as EventListener);
    }

    get element(): HTMLElement | null {
        return this.el;
    }

    bindState<T extends Record<string, any>>(
        state: ReactiveState<T>,
        map: Partial<Record<keyof I, keyof T>>
    ) {
        for (const inputKey in map) {
            const stateKey = map[inputKey as keyof I] as keyof T;
            this.inputs[inputKey as keyof I] = state.proxy[stateKey] as any;
            state.watch(stateKey, (val) => {
                this.setInputs({ [inputKey]: val } as unknown as Partial<I>);
            });
        }
    }
}
