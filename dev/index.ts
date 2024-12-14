/*
 * @Author: chenzhongsheng
 * @Date: 2024-08-12 17:51:34
 * @Description: Coding something
 */

import {HistoryStack} from '../src/index';

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
