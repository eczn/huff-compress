import { Dictionary } from "./Dictionary";
import { Heap } from "./Heap";

const d = new Dictionary('1223334444777777755555666666'); 

const tl = d.getTableList();


const heap = new Heap(tl, o => o.time);
heap.init();

console.log(heap.list);
console.log('\n\n');

console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);
console.log(heap.min(), heap.list);


