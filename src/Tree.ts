export type PrefixCodeProcessor<T> = (node: Tree<T>, code: string) => any;

export class Tree<T> {
    val: T;
    lchild: Tree<T> | null;
    rchild: Tree<T> | null;

    constructor(val: T, lchild: Tree<T> | null, rchild: Tree<T> | null) {
        this.val = val;
        this.lchild = lchild;
        this.rchild = rchild;
    }

    leafTravel(cb: PrefixCodeProcessor<T>, code = '') {
        const { lchild, rchild } = this;

        if (!lchild && !rchild) {
            cb(this, code);
        } else {
            lchild && lchild.leafTravel(cb, code + '0');
            rchild && rchild.leafTravel(cb, code + '1');
        }
    }
}

