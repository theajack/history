/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-10 10:48:50
 * @Description: Coding something
 */

const End = Symbol('E');

export class HistoryStack<T = any> {

    step = 0;
    size = 0;
    max = 40; // 最多存储40步
    list: T[] = [];
    index = 0;

    End = End as T;

    private osc?: () => void;
    private ohsc?: () => void;
    private oho?: (data: T) => void;

    constructor ({
        max = 0,
        onStepChange,
        onHistorySizeChange,
        onHistoryOut,
    }: {
        max?: number,
        onStepChange?: (step: number) => void
        onHistorySizeChange?: (size: number) => void
        onHistoryOut?: (data: T) => void;
    } = {}) {
        this.max = max;
        if (onStepChange) {
            this.osc = () => onStepChange(this.step);
        }
        if (onHistorySizeChange) {
            this.ohsc = () => onHistorySizeChange(this.size);
        }
        this.oho = onHistoryOut;
        this.osc?.();
        this.ohsc?.();
    }

    setMax (max: number) {
        this.max = max;
    }

    private setStep (step: number) {
        this.step = step;
        this.osc?.();
    }

    private setHistoryIndex (index: number) {
        this.index = index;
        this.size = index;
        this.ohsc?.();
    }

    back (): T {
        if (!this.canBack()) {
            return this.End;
        }
        this.setStep(this.step - 1);
        this.setHistoryIndex(this.index - 1);
        const item = this.list[this.index];
        this.oho?.(item);
        return item;
    }

    canBack () {
        return this.index > 0;
    }

    forward (): T {
        if (!this.canForward()) {
            return this.End;
        }
        this.setStep(this.step + 1);
        const item = this.list[this.index];
        this.setHistoryIndex(this.index + 1);
        this.oho?.(item);
        return item;
    }

    isEnd (v: T) {
        return v === End;
    }

    canForward () {
        return this.index < this.list.length;
    }

    push (data: T) {
        const n = this.list.length;

        if (this.index < n) {
            // 在历史记录中, 则移除旧记录，开辟新记录
            this.list.splice(this.index);
        }

        if (this.max > 0 && this.list.length >= this.max) {
            this.list.shift();
        } else {
            this.setHistoryIndex(this.index + 1);
        }
        // console.log('receive change', this.list, this.index, data);
        this.list.push(data);
        this.setStep(this.step + 1);
    }

    clear () {
        this.list = [];
        this.setHistoryIndex(0);
        this.setStep(0);
    }

}

export default HistoryStack;