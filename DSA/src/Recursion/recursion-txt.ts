// 1. Reference Sharing
// When multiple variables point to the same object or array in memory, they share a reference.
const a = [1, 2];
const b = a; // b shares reference with a
b.push(3);

console.log(a); 
console.log('comparision',a===b);
const c =10;
const d = c+5;

console.log('comaprison c with d', c===d);

const x ={name:'john',age:20};
const y =x;
y.name ='wick';
y.age = 80;
console.log(y)
console.log("comparision x and y", x===y);

let m = 10; // immutable
let wrapper = { value: m }; // now mutable

wrapper.value = 99;
console.log("wrapper",wrapper.value); //99
console.log(m); // 10

function passByValue(obj: { name: string }) {
  obj.name = 'Neo';
}

const user1 = { name: 'Darwin' };
passByValue({ ...user1 }); 
console.log("passByValue",user1.name); 

function passByReference(obj: { name: string }) {
  obj.name = 'Neo';
}

const user = { name: 'Darwin' };
passByReference(user);
console.log("passByReference",user.name); 

//  Heap is bigger and stack is smaller and object which all are in heap but their references will be in stack only\

const data =10 
// Stack:
// ---------
// | data | 10 |
// ---------

 const person = { name: "Darwin" };
//  Stack:
// ---------
// | person | → 0xABC123 |
// ---------

// Heap:
// ---------
// 0xABC123 → { name: "Darwin" }
// ---------
