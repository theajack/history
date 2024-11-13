/*
 * @Author: chenzhongsheng
 * @Date: 2024-08-12 17:51:34
 * @Description: Coding something
 */

import {HistoryStack} from '../src/index';

const hh = new HistoryStack<number[]>({
    onStepChange (size) {
        console.log(`onStepChange: ${size}`);
    },
    onHistorySizeChange (size) {
        console.log(`onHistorySizeChange: ${size}`);
    }
});

