import { GetPriority } from "./public-type";
import { Heap } from "./Heap";
import { Tree } from "./Tree";

export type How2Build<Elem, Result> = (a: Elem, b: Elem) => Result;

export class HuffTree<T> {
    getPriority: GetPriority<T>;
    h: Heap< Tree<T> >;
    how2build: How2Build<Tree<T>, T>;
    tree: Tree<T> | null = null;
    
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

    log(
        node: Tree<T> | null,
        getInfo: (n: Tree<T>) => string,
        deep = 0, 
        lr = 0
    ) {

        if (!node) {
            return;
        } else {
            const info = getInfo(node);
            
            console.log(deep, info);
            this.log(node.lchild, getInfo, deep + 1, lr - 1);
            
            this.log(node.rchild, getInfo, deep + 1, lr + 1);

            
        }
    }
}