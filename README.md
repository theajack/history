<!--
 * @Author: theajack
 * @Date: 2023-05-09 22:31:06
 * @Description: Coding something
-->
# [HistoryStack](https://github.com/theajack/history)

## A simple history recording tool library.


### Install

```
npm i history-stack
```

or

```html
<script src='https://cdn.jsdelivr.net/npm/history-stack'></script>
```

### Usage

```js
import HistoryStack from 'history-stack';
const history = new HistoryStack();

history.push('11');
history.push('22');

const h1 = history.back();
if(!history.isEnd(h1)){
    // do something with h1
}

const h2 = history.forward();
if(!history.isEnd(h2)){
    // do something with h2
}
history.step;
history.size;
history.max;
history.index;
history.list;
history.End;

history.setMax(100);
```

More option

```ts
import HistoryStack from 'history-stack';
const history = new HistoryStack<string>({
    max: 1000,
    useStorage: true,
    storageKey: 'history-stack',
    mode: HistoryStack.Mode.Append,
    onStepChange(step){
        console.log(`onStepChange: step=${step}`);
    },
    onHistorySizeChange(size){
        console.log(`onHistorySizeChange: size=${size}`);
    },
    onHistoryOut(data){
        console.log(`onHistoryOut: data=`, data);
    }
});
```

typings

```ts
export declare class HistoryStack<T = any> {
	static Mode: typeof HistoryMode;
	step: number;
	size: number;
	max: number;
	list: T[];
	index: number;
	End: T;
	isActive: boolean;
	private osc?;
	private ohsc?;
	private oho?;
	useStorage: boolean;
	storageKey: string;
	mode: HistoryMode;
	constructor({ max, useStorage, storageKey, mode, onStepChange, onHistorySizeChange, onHistoryOut, }?: {
		max?: number;
		useStorage?: boolean;
		mode?: HistoryMode;
		storageKey?: string;
		onStepChange?: (step: number) => void;
		onHistorySizeChange?: (size: number) => void;
		onHistoryOut?: (data: T) => void;
	});
	useCache(list: T[]): void;
	setMax(max: number): void;
	private setStep;
	private setHistoryIndex;
	back(i?: number): T;
	canBack(i?: number): boolean;
	first(): typeof End | T;
	last(): typeof End | T;
	forward(i?: number): T;
	isEnd(v: T): boolean;
	canForward(i?: number): boolean;
	push(...data: T[]): void;
	clear(): void;
	replace(v: T, i?: number): void;
	get isLatest(): boolean;
	private _onListChange;
	current(): T;
}
```
