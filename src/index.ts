/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-10 10:48:50
 * @Description: Coding something
 *

[1,2,3,4,5,6]
[1,2,3,4,5,6]


 */


const End = Symbol('E');

export enum HistoryMode {
    Fork,
    Append,
}

export class HistoryStack<T = any> {

    step = 0; // 当前步数
    size = 0;
    max = 40; // 最多存储40步
    list: T[] = [];
    index = 0;

    End = End as T;

    isActive = false;

    private osc?: () => void;
    private ohsc?: () => void;
    private oho?: (data: T) => void;

    useStorage = false;
    storageKey = '';
    mode: HistoryMode;

    constructor ({
        max = 0,
        useStorage = false,
        storageKey = '_def_history_stack',
        mode = HistoryMode.Fork,
        onStepChange,
        onHistorySizeChange,
        onHistoryOut,
    }: {
        max?: number,
        useStorage?: boolean,
        mode?: HistoryMode,
        storageKey?: string,
        onStepChange?: (step: number) => void
        onHistorySizeChange?: (size: number) => void
        onHistoryOut?: (data: T) => void;
    } = {}) {
        this.max = max;
        this.mode = mode;
        if (onStepChange) {
            this.osc = () => onStepChange(this.step);
        }
        if (onHistorySizeChange) {
            this.ohsc = () => onHistorySizeChange(this.size);
        }
        this.oho = onHistoryOut;
        this.osc?.();
        this.ohsc?.();

        if (useStorage) {
            this.useStorage = useStorage;
            this.storageKey = storageKey;
            const data = localStorage.getItem(storageKey);
            if (data) {
                this.useCache(JSON.parse(data));
            }
        }

    }

    useCache (list: T[]) {
        this.push(...list);
    }

    setMax (max: number) {
        this.max = max;
    }

    private setStep (step: number) {
        this.step = step;
        this.osc?.();
    }

    private setHistoryIndex (index: number) {
        if (!this.isActive) {
            this.isActive = true;
        }
        this.index = index;
        this.size = index;
        this.ohsc?.();
    }

    back (i = 1): T {
        if (!this.canBack(i)) {
            if (i > 1) {
                this.setStep(this.step - this.index);
                this.setHistoryIndex(0);
            }
            return this.End;
        }
        this.setStep(this.step - i);
        this.setHistoryIndex(this.index - i);
        const item = this.list[this.index];
        this.oho?.(item);
        return item;
    }

    canBack (i = 1) {
        return this.index - i >= 0;
    }

    first () {
        if (this.list.length === 0) return End;
        this.setStep(this.step - this.index);
        this.setHistoryIndex(0);
        return this.list[0];
    }
    last () {
        if (this.list.length === 0) return End;
        this.setStep(this.step + this.list.length - this.index);
        this.setHistoryIndex(this.list.length - 1);
        return this.list[this.list.length - 1];
    }

    forward (i = 1): T {
        if (!this.canForward(i)) {
            if (i > 1) {
                this.setStep(this.step + this.list.length - this.index);
                this.setHistoryIndex(this.list.length - 1);
            }
            return this.End;
        }
        this.setStep(this.step + i);
        this.setHistoryIndex(this.index + i);
        const item = this.list[this.index];
        this.oho?.(item);
        return item;
    }

    isEnd (v: T) {
        return v === End;
    }

    canForward (i = 1) {
        return this.index + i < this.list.length;
    }

    push (...data: T[]) {
        const n = this.list.length;

        if (this.index < n) {
            this.step ++;
            this.index ++;
            // 在历史记录中, 则移除旧记录，开辟新记录
            this.list.splice(this.index);
        }

        const size = data.length;

        let deleteCount = 0, pushCount = size;
        if (this.max > 0 && n + size > this.max) {
            deleteCount = n + size - this.max;
            pushCount = size - deleteCount;
        }

        if (deleteCount) {
            this.list.splice(0, deleteCount);
        }
        if (pushCount) {
            this.setHistoryIndex(this.index + pushCount);
        }

        // console.log('receive change', this.list, this.index, data);
        this.list.push(...data);
        this.setStep(this.step + pushCount);

        if (this.isActive) {
            this.isActive = false;
        }
    }

    clear () {
        this.list = [];
        this._onListChange();
        this.setHistoryIndex(0);
        this.setStep(0);
        this.isActive = false;
    }

    replace (v: T, i = this.index) {
        if (typeof this.list[i] === 'undefined') return;
        this.list[i] = v;
        this._onListChange();
    }

    get isLatest () {
        return this.index === this.list.length - 1;
    }

    private _onListChange () {
        if (this.useStorage) {
            localStorage.setItem(this.storageKey, JSON.stringify(this.list));
        }
    }

}

export default HistoryStack;