/*
 * @Author: chenzhongsheng
 * @Date: 2024-11-10 10:48:50
 * @Description: Coding something
 *
 */


const End = Symbol('E');

export enum HistoryMode {
    Fork,
    Append,
}

export interface StorageProvider<T = any> {
    read(): T[]|Promise<T[]>;
    write(data: T[]): void|Promise<void>;
}

export class HistoryStack<T = any> {

    static Mode = HistoryMode;
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

    mode: HistoryMode;
    storageProvider: StorageProvider<T>;

    constructor ({
        max = 0,
        useStorage = false,
        storageKey = '_def_history_stack',
        mode = HistoryMode.Fork,
        storageProvider,
        onStepChange,
        onHistorySizeChange,
        onHistoryOut,
    }: {
        max?: number,
        useStorage?: boolean,
        mode?: HistoryMode,
        storageKey?: string,
        storageProvider?: StorageProvider<T>,
        onStepChange?: (step: number) => void
        onHistorySizeChange?: (size: number) => void
        onHistoryOut?: (data: T) => void;
    } = {}) {
        this.max = max;
        this.mode = mode;

        if (useStorage !== false && (storageProvider || storageKey)) {
            useStorage = true;
        }
        if (useStorage) {
            this.storageProvider = storageProvider || {
                read: () => {
                    const data = localStorage.getItem(storageKey);
                    if (!data) {
                        return [];
                    }
                    return JSON.parse(data);
                },
                write: data => {
                    localStorage.setItem(storageKey, JSON.stringify(data));
                },
            } as StorageProvider;
        }

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
            const data = this.storageProvider.read();
            if (data instanceof Promise) {
                data.then(list => {
                    this.useCache(list);
                });
            } else {
                this.useCache(data);
            }
        }

    }

    useCache (list: T[]) {
        if (list.length === 0) return;
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

    pop (n = 1): T[] {
        const len = this.list.length;
        if (len <= n) {
            const result = [...this.list];
            this.clear();
            return result;
        }
        const index = len - n;

        const result = this.list.splice(index);

        const newLen = this.list.length;

        if (newLen < this.index) {
            this.setHistoryIndex(newLen);
            this.setStep(this.step - (this.index - newLen));
        }
        return result;
    }

    push (...data: T[]) {
        const n = this.list.length;

        if (this.index < n) {
            this.step ++;
            this.index ++;
            // 在历史记录中, 则移除旧记录，开辟新记录
            if (this.mode === HistoryMode.Fork) {
                this.list.splice(this.index);
            }
        }

        const size = data.length;

        let deleteCount = 0, pushCount = size;
        if (this.max > 0 && n + size > this.max) {
            deleteCount = n + size - this.max;
            pushCount = size - deleteCount;
        }

        // console.log('receive change', this.list, this.index, data);
        this.list.push(...data);
        if (deleteCount) {
            this.list.splice(0, deleteCount);
        }
        this._onListChange();

        if (pushCount) {
            if (this.mode === HistoryMode.Append) {
                this.setHistoryIndex(this.list.length);
            } else {
                this.setHistoryIndex(this.index + pushCount);
            }
        }

        if (this.mode === HistoryMode.Append) {
            this.setStep(this.list.length);
        } else {
            this.setStep(this.step + pushCount);
        }

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
        this.storageProvider?.write(this.list);
    }

    current () {
        return this.list[this.index];
    }
}

export default HistoryStack;