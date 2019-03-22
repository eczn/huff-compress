import { GetPriority } from "./public-type";
import { Heap } from "./Heap";
import { Tree } from "./Tree";

export type How2Build<Elem, Result> = (a: Elem, b: Elem) => Result;

export class HuffTree<T> {
    getPriority: GetPriority<T>;
    h: Heap< Tree<T> >;
    how2build: How2Build<Tree<T>, T>;
    tree: Tree<T> | null = null;
    matcher: Tree<T> | null = null;
    
    constructor(
        list: T[],
        getPriority: GetPriority<T>,
        how2build: How2Build<Tree<T>, T>
    ) {
        this.getPriority = getPriority;
        this.how2build = how2build;

        this.h = new Heap(
            list.map(elem => new Tree(elem, null, null)),
            node => getPriority(node.val)
        );
        
        this.h.init();

        this.tree = this.build();

        console.log('this', this)
    }

    build(): Tree<T> | null {
        if (this.h.list.length === 0) {
            return null;
        } else if (this.h.list.length === 1) {
            return this.h.min();
        } else {
            const a = this.h.min();
            const b = this.h.min();

            const c_val = this.how2build(a, b);
            const c = new Tree(c_val, a, b);

            this.h.insert(c);

            return this.build();
        }
    }

    match(num: number, j: (node: Tree<T>) => any) {
        if (!this.matcher) {
            this.setInit();
            if (!this.matcher) return;
        }
        
        const rs = ('00000000' + num.toString(2)).slice(-8);

        console.log('rs', rs)
        for (let i = 0; i < rs.length; i ++) {
            const r = rs[i];

            if (r === '1') this.matcher = this.matcher.rchild; 
            else this.matcher = this.matcher.lchild;

            if (!this.matcher.lchild && !this.matcher.rchild) {
                j(this.matcher);
                this.setInit();
            }
        } 
    }

    setInit() {
        this.matcher = this.tree;
    }

    log(
        node: Tree<T> | null,
        getInfo: (n: Tree<T>) => string,
        before = '', isR = false
    ) {
        if (!node) {
            return;
        } else {
            const noChild = (!node.lchild && !node.rchild) ? 'LEAF' : '';
            const info = getInfo(node);
            const line = before ? '--' : '';
            
            if (isR) {
                console.log(before.slice(0, -1) + '|' + line + info, noChild);
            } else {
                console.log(before + line + info, noChild);
            }

            const lbefore = before + '    |';
            // const r
            const rbefore = before + '     ';
            this.log(node.lchild, getInfo, lbefore, false);
            this.log(node.rchild, getInfo, rbefore, true);

        }
    }
}