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
