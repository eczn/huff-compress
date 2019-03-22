import { HuffTree } from "./HuffTree";
import { Buffer } from "buffer";


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

    static getTalbeListFromTable(ta: Table) {
        return Object.keys(ta).map(char => {
            return {
                char, time: ta[char]
            }
        });
    }

    getTableList() {
        const ta = this.getTable();
        const tl = Dictionary.getTalbeListFromTable(ta);
        return { tl, ta };
    }

    static getPrefixCode(tl: TableList) {
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

        // hufTree.log(hufTree.tree, n => {
        //     return `(${ n.val.char }/${ n.val.time })`
        // });

        return {
            pcode: map, hufTree
        };
    }

    static binary2hex(binaryStr: string) {
        let rs = '';
        let i;

        for (i = binaryStr.length; i >= 4; i -= 4) {
            const r = binaryStr.substr(i - 4, 4);
            const hex = parseInt(r, 2).toString(16);
            rs = hex + rs;
        }
        const r = binaryStr.slice(0, i);
        if (r) {
            const hex = parseInt(r, 2).toString(16);
            rs = hex + rs;
        }
        return rs;
    }

    static hex2buffer(hex: string) {
        if (hex.length % 2 === 1) {
            hex = '0' + hex;
        }

        return Buffer.from(hex, 'hex');
    }

    encoded2binary(pcode: PrefixCode) {
        let encoded = '';
        let i;
        for (i = 0; i < this.originWord.length; i++) {
            let ch = this.originWord[i];

            encoded += pcode[ch];
        }
        return encoded;
    }

    compress() {
        const { ta, tl } = this.getTableList();
        const { pcode } = Dictionary.getPrefixCode(tl);
        const encoded = this.encoded2binary(pcode);
        const hex = Dictionary.binary2hex(encoded);
        const buf = Dictionary.hex2buffer(hex);

        return {
            ta, tl, pcode, encoded, hex, buf, originWord: this.originWord
        }
    }
    

    static decompress(ta: Table, buf: Buffer) {
        const tl = Dictionary.getTalbeListFromTable(ta);
        const { hufTree, pcode } = Dictionary.getPrefixCode(tl);

        let theRes = '';

        for (let i = 0; i < buf.length; i ++) {
            const data = buf.readUInt8(i);

            hufTree.match(data, n => {
                theRes += n.val.char;
            });
            // console.log(data);
        }
        
        return theRes;
    }

    test() {
        const r = this.getTableList();
        console.log(r);
    }
}
