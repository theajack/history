/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-21 11:06:35
 * @Description: Coding something
 */
const {HistoryStack} = require('../npm');

const hh = new HistoryStack({
    onStepChange (size) {
        console.log(`onStepChange: ${size}`);
    },
    onHistorySizeChange (size) {
        console.log(`onHistorySizeChange: ${size}`);
    }
});

hh.push(111);