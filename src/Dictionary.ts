import { HuffTree } from "./HuffTree";

export type Table = {
    [key: string]: number
}

export type PrefixCode = {
    [key: string]: string
}

export type TableList = {
    char: string, 
    time: number
}[]

export class Dictionary {
    originWord: string;

    constructor(originWord: string) {
        this.originWord = originWord;
    }

    getTable(): Table {
        const table: Table = {};
        for (let i = 0; i < this.originWord.length; i ++) {
            const c = this.originWord[i];
            if (table[c]) table[c] ++;
            else table[c] = 1;
        }
        return table;
    }

    getTableList() {
        const table = this.getTable();
        const tableList: TableList = Object.keys(table).map(char => {
            return {
                char, time: table[char]
            }
        });
        
        return tableList;
    }

    getPrefixCode(): PrefixCode {
        const tl = this.getTableList();

        const hufTree = new HuffTree(tl, e => e.time, (a, b) => {
            return {
                char: '', 
                time: a.val.time + b.val.time    
            }
        });

        const map: PrefixCode = {};

        hufTree.tree.leafTravel((node, code) => {
            map[node.val.char] = code;
        });

        return map;
    }

    encode2hex() {
        const pcode = this.getPrefixCode();
        let encoded = '';
        let i;
        for (i = 0; i < this.originWord.length; i++) {
            let ch = this.originWord[i];

            encoded += pcode[ch];
        }
        
        const rs = []
        for (i = encoded.length; i >= 4; i -= 4) {
            const r = encoded.substr(i - 4, 4);
            rs.unshift(parseInt(r, 2).toString(16));
        }
        rs.unshift(
            parseInt(encoded.slice(0, i), 2).toString(16)
        );
        
        

        console.log('origin:', this.originWord);
        console.log('prefixCode:', pcode);
        console.log('encoded (binary):', encoded);
        console.log('encoded (hex):', rs.join(''));
    }

    test() {
        const r = this.getTableList();
        console.log(r);
    }
}
