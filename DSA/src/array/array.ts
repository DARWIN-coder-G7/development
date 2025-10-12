// STATIC ARRAY 

//  A static Array is a fixed length container conatining n elements indexable ranging from 0 to n-1 [0,n-1]

//                   STATIC ARRAY             DYNAMIC ARRAY
// Access               o(1)                      o(1)
// Search               o(n)                      o(n)
// Insertion            N/A                       o(n)
// Appending            N/A                       o(1)
// Deletion             N/A                       o(n)

// Array indexing always Zero Based so the first Element is always of index 0 
//  trying to access an index which is not there in an array leads to array index out of bounds

//   DYNAMIC ARRAY 
// A dynamic array can grow and shrink in size

const studentsDB = ['john', 'eric', 'ken', 'Ben', 'gwen'];

const findStudent = (allStudents: any[], studentName: string) => {
    for (let i = 0; i < allStudents.length; i++) {
        if (allStudents[i] === studentName) {
            console.log(`Found ${studentName}`);
        }
    }
};

// findStudent(studentsDB, 'gwen');

class MyArray {
    length: number;
    data: any;
    constructor() {
        this.length = 0;
        this.data = {};
    }
    push(newEntry: any) {
        this.data[this.length] = newEntry;
        this.length++;
        return this.length;
    }
    get(index: number) {
        if (index > this.length) return `ERROR: Index Out of bounds`;
        return this.data[index];
    }
    pop() {

        delete this.data[this.length - 1];
        this.length--;
        return this.data;

    }
    shift() {

        const firstEntry = this.data[0];
        //re-Indexing
        for (let i = 0; i < (this.length); i++) {
            if (i == (this.length - 1)) {
                this.data[this.length - 1] = firstEntry;
            } else {
                this.data[i] = this.data[i + 1];
            }

        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
    deleteByindex(index: number) {
        if (index > this.length) return `ERROR: Index Out of bounds`;
        this.data[index] = undefined;
        let toggler = false;
        for (let i = 0; i < this.length; i++) {

            if (this.data[i] == undefined) {
                toggler = true;
            }
            if (toggler) {
                this.data[i] = this.data[i + 1];
            }
        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;

    }

    delete(index: number) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
}
const myNewArray = new MyArray();
myNewArray.push(0);
myNewArray.push(3);
myNewArray.push(7);
myNewArray.push(9);
myNewArray.push(56);
myNewArray.push(98);
myNewArray.push(22);

// console.log("MY NEW ARRAY data", myNewArray.data);
// console.log("get method", myNewArray.get(4));
// console.log("Shift method", myNewArray.shift());
// console.log("pop method", myNewArray.pop());
// console.log("Delet By Index method", myNewArray.deleteByindex(4));
// console.log("Delete", myNewArray.deleteByindex(4));

//    REVERSE A STRING   
//reverse Loop 
// const reverse = (str: strin      g) => {
//     let newStr = '';
//     for (let i = str.length-1; i>=0; i--) {
//         newStr += str[i];
//     }
//     return newStr;
// }
//forward Loop
const reverse = (str: string) => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        newStr += str[str.length - (i + 1)];
    }
    return newStr;
}

const simpleReverse = (str: string) => str.split('').reverse().join('');

// console.log(simpleReverse('Ajith Kumar'));

//palindrome or not

function isPalindrome(data: any) {
    let reversedStr = '';
    let currentstr = new String(data);
    for (let i = 0; i < currentstr.length; i++) {
        reversedStr += currentstr[currentstr.length - (i + 1)];
    }
    if (typeof data === "number") {
        let num = parseInt(reversedStr) * Math.sign(data);
        return num == data;
    }
    return reversedStr == data;
}
const ispalindrome = (str: any) => str.toString().split('').reverse().join('') == str;

// console.log(isPalindrome('ajith'));
// console.log(ispalindrome(121));
// console.log(isPalindrome(-121));
// console.log(isPalindrome('mom'));

const reverseInt = (n: number) => (parseInt(n.toString().split('').reverse().join('')) * Math.sign(n)) === n;

// console.log(reverseInt(-120));

//SENTENCE CAPITALIZATION 
// EG:  hello world ====>  Hello World

const capitalize = (sentence: string) => {
    let count = 0;
    const spaces: any[] = [];
    const newStrs: any[] = [];
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === ' ') {
            if ((i == 0) || (i == sentence.length)) {

            } else {
                spaces.push(i);
                count++;
            }
        }
    }
    if (sentence.length > spaces[spaces.length - 1]) {
        spaces.push(sentence.length);
        count++;
    }
    let j = 0;
    for (let i = 0; i < spaces.length; i++) {
        let localstr = '';
        for (j; j < (spaces[i]); j++) {
            localstr += sentence[j];
        }
        j = spaces[i] + 1;
        newStrs.push(localstr);
    }
    console.log(newStrs);
    // +32
    for (let i = 0; i < newStrs.length; i++) {
        const firstOne = newStrs[i][0].charCodeAt();
        const word = newStrs[i];
        let capitalized = '';
        if ((firstOne > 96) || (firstOne < 123)) {
            capitalized += String.fromCharCode(firstOne - 32);
        } else {
            capitalized += word[0];
        }
        for (let j = 1; j < word.length; j++) {
            capitalized += word[j];
        }
        newStrs[i] = capitalized;
    }
    console.log(newStrs);
    let newSentence = '';
    for (let i = 0; i < newStrs.length; i++) {

        if (i == newStrs.length - 1) {
            newSentence += newStrs[i];
        } else {
            newSentence += newStrs[i] + ' ';
        }

    }
    console.log(newSentence);

}

const simpleCapitalize = (sentence: string) => sentence.toLowerCase().split(' ').map((strings: string) => strings[0].toUpperCase() + strings.slice(1)).join(' ').trim();

// console.log(simpleCapitalize('hello world from g7 is this is earth?'));

// FizzBuzz Problem If a number divisible by 3 print fizz divisible by 5 means buzz divisible by both 3 and 5 means FizzBuzz else the number 

const fizzBuzz = (number: number) => {
    for (let i = 1; i <= number; i++) {
        const three = i % 3 === 0;
        const five = i % 5 === 0;
        if (three && five) console.log('FizzBuzz')
        else if (three) console.log('Fizz')
        else if (five) console.log('Buzz')
        else console.log(i)
    }
}

// fizzBuzz(20);

const prices = [7, 1, 5, 3, 6, 4];

const MaxProfit = (prices: number[]) => {
    let maxProfit = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        // update minimum price
        const difference = (prices[i + 1] - prices[i]);
        if (prices[i] > prices[i + 1]) {
            //do nothing
        }
        else if (maxProfit > difference) {

            maxProfit = maxProfit;
        } else {
            maxProfit = difference;
            from = i;
            to = i + 1;
        }

    }
    return `Maximum profit amount of Rs:${maxProfit} will be gained by buying share on ${from + 1}th day and selling it on ${to + 1}th day`;
}

const maxProfit = (prices: number[]) => {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        minPrice = Math.min(minPrice, currentPrice);
        const potentialProfit = currentPrice - minPrice;
        maxProfit = Math.max(maxProfit, potentialProfit);
    }
    return maxProfit;
}


const profit = maxProfit(prices);
// console.log('maximum Profit', profit);

//Chunking An Array  creating An array of array by looking for the input of the user here chunker
//  arrayChunk([0,1,2,3,4,5,5,6,7,8,9,1,2],3)  o/p will be [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 5, 6, 7 ], [ 8, 9, 1 ] ]
// we rae ignoring the last 2 hence it is missing two pair elements
function arrayChunk(arr: any[], chunker: number): any[] {
    let counter = 0;
    const tempArr = [];
    let dummyArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (counter == chunker) {
            tempArr.push(dummyArray);
            dummyArray = [];
            counter = 0;
            dummyArray.push(arr[i]);
            counter++;
        } else {
            dummyArray.push(arr[i]);
            counter++;
        }
    }
    // it s due to we are increasing the counter at the end and finishing the loop no where checking counter == chunker post completion
    if (dummyArray.length == 2) {
        tempArr.push(dummyArray);
    }
    return tempArr;
}

const chunk = (array: any[], size: number) => {
    const chunked: any[] = [];
    let index = 0;
    while (index < array.length) {
        const chunk = array.slice(index, index + size);
        chunked.push(chunk);
        index += size;
    }

    return chunked;
}

// console.log(chunk([0,1,2,3,4,5,5,6,7,8,9,1],2));

const findPairs = (array: number[], target: number): number[] => {
    const pairs: number[] = [];
    let shortest = array.length;
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            if (target == array[i] + array[j]) {
                if(shortest > (i-j)){
                pairs.push(i);
                pairs.push(j);
                }
                break;
            }
        }
        if(pairs.length == 2){
            break;
        }
    }
    return pairs;
}
console.log(findPairs([2,6,5,88,89,7,8,4,5,9,12,6,7,8,5,7,8,0,4],9))