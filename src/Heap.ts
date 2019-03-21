import { GetPriority } from "./public-type";


/**
 * 获取父节点下标
 * @param i 
 */
export const getParentIdx = (i: number) => ~~((i + 1) / 2) - 1;

/**
 * 获取左子节点下标
 * @param i 
 */
export const getChildRightIdx = (i: number) => (i + 1) * 2;

/**
 * 获取右子节点下标
 * @param i 
 */
export const getChildLeftIdx = (i: number) => (i + 1) * 2 - 1;

export class Heap<T> {
    list: T[];
    getPriority: GetPriority<T>;
    constructor(list: T[], getPriority: GetPriority<T>) {
        this.list = list;
        this.getPriority = getPriority; 
    }

    /**
     * 获取第 n 个节点的 "权" 用来比较节点大小用
     * @param n 
     */
    nthPriority(n: number) {
        return this.getPriority(this.list[n]);
    }

    /**
     * 堆元素上浮调整
     * @param i 你要调整的下标
     */
    shiftUp(i: number) {
        if (i === 0) return;

        const parent = getParentIdx(i);

        if (this.nthPriority(parent) > this.nthPriority(i)) {
            this.swap(parent, i);
            // let's go next;
            this.shiftUp( parent );
        } else {
            return;
        }
    }

    nthExist(n: number) {
        return typeof this.list[n] !== 'undefined';
    }

    /**
     * 堆元素下沉调整
     * @param now 你要调整的下标
     */
    shiftDown(now: number) {
        const lchild = getChildLeftIdx(now);
        const rchild = getChildRightIdx(now);
        const nowPrio = this.nthPriority(now);

        const lExist = this.nthExist(lchild);
        const rExist = this.nthExist(rchild);

        // 不存在子节点
        if (!lExist && !rExist) {
            return;
        } else {
            // 存在子节点的话，得挑一个看看要不要换
            let theChild;
            
            if (lExist && rExist) {
                // 都存在的话，选最小的那个来比较
                theChild = this.nthPriority(lchild) < this.nthPriority(rchild) ?
                    lchild : rchild;
            } else {
                // 只存在一个的话
                theChild = lExist ? lchild : rchild;
            }
            if (this.nthPriority(theChild) < nowPrio) {
                this.swap(now, theChild);
                return this.shiftDown(theChild);
            } else {
                return;
            }
        }
    }

    swap(i: number, j: number) {
        const t = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = t;
    }

    init() {
        const [first, ...restList] = this.list;

        // 只留一个
        this.list = [ first ];

        restList.forEach(l => {
            this.list.push(l); 
            this.shiftUp( this.list.length - 1 ); 

            // 上述代码意思是插入 l 到 list 并对它进行 shiftUp 
        });

        return this;
    }

    /**
     * 插入
     * @param elem 
     */
    insert(elem: T) {
        this.list.push(elem);
        this.shiftUp(this.list.length - 1);
    }

    /**
     * 取出最小的
     */
    min(): T {
        if (this.list.length === 0) return null;
        if (this.list.length === 1) return this.list.pop();
        
        const theMin = this.list[0]; 
        const theLastOne = this.list.pop();

        // 取出首元素，并用尾元素写到首元素那边，然后跑 shiftDown(0)
        this.list[0] = theLastOne;
        this.shiftDown(0);

        return theMin;
    }
}
