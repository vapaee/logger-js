## logger-js

A simple logger utility

### Install

```bash
npm i @vapaee/logger
```
or
```bash
yarn add @vapaee/logger
```

### Usage

```javascript
import { Logger } from '@vapaee/logger';

const logger = new Logger('MyClass');
logger.enable();

class MyClass {
    constructor() {
        logger.method('constructor');
    }

    foo(a: string) {
        const trace = logger.method('foo', a);
        new Promise<void>((resolve) => {
            setTimeout(() => {
                trace('a:', a);
                resolve();
            }, 1000);
        });
    }

    lol(param: any) {
        const trace = logger.method('lol', param);
        trace('param type:', typeof param);
    }
}


const a = new MyClass();
a.foo('hello');
a.lol({ say: 'hello'});
```

### Output

```
MyClass.constructor() []
MyClass.foo(hello) ['hello']
MyClass.lol({"say":"he...) [{…}]
MyClass.lol({"say":"he...) param type: object
MyClass.foo(hello) a: hello
```

