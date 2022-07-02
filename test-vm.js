// import { v4 as uuidv4 } from 'uuid'; 
const { v4 } = require('uuid')
console.log(`🔎🐛 -> file: test-vm.js -> line 3 -> v4`, v4);
const res = v4()
console.log(`🔎🐛 -> file: test-vm.js -> line 2 -> res`, res);