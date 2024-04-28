
let globally_enabled = false;

export class Logger {
    private namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    get enabled() {
        return globally_enabled;
    }

    public enable() {
        globally_enabled = true;
    }

    public disable() {
        globally_enabled = false;
    }

    public toggle() {
        globally_enabled = !globally_enabled;
    }

    method(method: string, ...args: any[]): (...args: any[]) => void {
        if (!globally_enabled) {
            return () => {};
        }
        const processedArgs = args.map(arg => {
            const max = 10;
            if (typeof arg === 'string' && arg.length > max) {
                return arg.substring(0, max) + '...';
            }
            if (!Array.isArray(arg) && arg !== null && typeof arg === 'object') {
                try {
                    return JSON.stringify(arg).substring(0, max) + '...';
                } catch (e) {
                    return arg;
                }
            }
            if (typeof arg === 'function') {
                return 'function';
            }
            return arg;
        });
        const scope = `${this.namespace}.${method}(${processedArgs})`;
        console.log(scope, args);
        const tracer = (...args: any[]) => {
            console.log(scope, ...args);
        }
        return tracer;
    }
}