export type Table = {
    [key: string]: number
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

    test() {
        const r = this.getTableList();
        console.log(r);
    }
}
