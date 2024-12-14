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

console.log('back', hh.back());
console.log('back', hh.back());
console.log('back', hh.back());
console.log('back', hh.back());
console.log('forw', hh.forward());
console.log('forw', hh.forward());
console.log('back', hh.back());
console.log('back', hh.back());
console.log('forw', hh.forward());
console.log('forw', hh.forward());
console.log('forw', hh.forward());
console.log('forw', hh.forward());
console.log('forw', hh.forward());
console.log('back', hh.back());
