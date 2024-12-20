/*
 * @Author: chenzhongsheng
 * @Date: 2024-08-12 17:51:34
 * @Description: Coding something
 */

import {HistoryMode, HistoryStack} from '../src/index';

const hh = new HistoryStack<number>({
    onStepChange (size) {
        console.log(`onStepChange: ${size}`);
    },
    onHistorySizeChange (size) {
        console.log(`onHistorySizeChange: ${size}`);
    }
});


window.hh = hh;

hh.push(1);
hh.push(2);
hh.push(3);

console.assert(hh.back() === 3);
console.assert(hh.back() === 2);
console.assert(hh.forward() === 3);
console.assert(hh.forward() === hh.End);
console.assert(hh.back() === 2);
console.assert(hh.back() === 1);
console.assert(hh.back() === hh.End);
console.assert(hh.forward() === 2);

hh.push(4);
console.assert(hh.back() === 4);
console.assert(hh.back() === 2);
hh.push(5);
console.assert(hh.back() === 5);
console.assert(hh.back() === 2);
hh.push(6);
console.assert(hh.back() === 6);
console.assert(hh.back() === 2);

hh.push(7, 8);
console.assert(hh.list.toString() === [1, 2, 7, 8].toString());
console.assert(hh.back() === 8);
console.assert(hh.back(2) === 2);
console.assert(hh.back() === 1);
console.assert(hh.forward(2) === 7);
console.assert(hh.first() === 1);
console.assert(hh.back() === hh.End);
console.assert(hh.forward(2) === 7);
console.assert(hh.last() === 8);
console.assert(hh.forward() === hh.End);
console.assert(hh.back(2) === 2);
console.assert(hh.forward(100) === hh.End);
console.assert(hh.back(2) === 2);
console.assert(hh.forward() === 7);
console.assert(hh.forward() === 8);
console.assert(hh.forward() === hh.End);
console.assert(hh.back() === 7);
console.assert(hh.back() === 2);
console.assert(hh.back(100) === hh.End);
console.assert(hh.forward(2) === 7);

// console.assert(hh.back() === 4);

// console.log('hh back', hh.back());
// console.log('hh back', hh.back());
// console.log('hh back', hh.back());
// console.log('hh back', hh.back());
// console.log('hh forw', hh.forward());
// console.log('hh forw', hh.forward());
// console.log('hh back', hh.back());
// console.log('hh back', hh.back());
// console.log('hh forw', hh.forward());
// console.log('hh forw', hh.forward());
// console.log('hh forw', hh.forward());
// console.log('hh forw', hh.forward());
// console.log('hh forw', hh.forward());
// console.log('hh back', hh.back());


const hh2 = new HistoryStack<number>({
    mode: HistoryMode.Append,
    onStepChange (size) {
        console.log(`onStepChange: ${size}`);
    },
    onHistorySizeChange (size) {
        console.log(`onHistorySizeChange: ${size}`);
    }
});

hh2.push(1);
hh2.push(2);
hh2.push(3);

console.assert(hh2.back() === 3);
console.assert(hh2.back() === 2);
console.assert(hh2.forward() === 3);
console.assert(hh2.forward() === hh2.End);
console.assert(hh2.back() === 2);
console.assert(hh2.back() === 1);
console.assert(hh2.back() === hh2.End);
console.assert(hh2.forward() === 2);