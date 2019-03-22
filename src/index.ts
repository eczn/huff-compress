import { Dictionary } from "./Dictionary";
import * as fs from "fs";
import * as path from "path"; 

const TEST_FILES_BASE = path.join(__dirname, '../test-files');
const RES_BASE = path.join(__dirname, '../temp');

// fs.readdirSync(TEST_FILES_BASE).map(name => {
//     const pname = path.parse(name);
//     const targetFilePath = path.join(RES_BASE, pname.name);
//     const word = fs.readFileSync(path.join(TEST_FILES_BASE, name), 'utf-8');

//     const d = new Dictionary(word); 

//     const { ta, buf } = d.compress();
//     const res = Dictionary.decompress(ta, buf);

//     fs.writeFileSync(targetFilePath + '.table', JSON.stringify(ta));
//     fs.writeFileSync(targetFilePath + '.bin', buf);

//     console.log(name);
//     console.log('word:', word);
//     console.log('res: ', res);
//     console.log('\n');
// });

// const word = 'A';
const word = `that's the way it is}`;

const d = new Dictionary(word); 

const c = d.compress();

console.log('==============')
Object.keys(c).forEach(key => {
    console.log(key.padEnd(12) + ':', c[key], typeof c[key] === 'string' ? c[key].length : '');
});

// const res = Dictionary.decompress(c.ta, c.buf);

// console.log('word:', word);
// console.log('res: ', res);
// console.log('\n');
