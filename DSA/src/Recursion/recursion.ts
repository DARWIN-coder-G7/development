// create an array with start and end number
function createArray(startNum: number, endNum: number): number[] {
  console.log(`Entering: startNum=${startNum}, endNum=${endNum}`);
  
  if (startNum > endNum) {
    console.log(`Base case hit: returning []`);
    return [];
  } else {
    let numbers = createArray(startNum, endNum - 1);
    console.log(`Returned from createArray(${startNum}, ${endNum - 1}) → ${JSON.stringify(numbers)}`);
    
    numbers.push(endNum);
    console.log(`After push: ${JSON.stringify(numbers)}`);
    
    return numbers;
  }
}

// Here in the above array reference sharing is the core concept so thats how things are working
//  each and every execution wil different array but still same instance

console.log('FINAL',createArray(0,7));

function reverseString(str: string): string {
  if (str.length === 0) return '';

  const reversed = reverseString(str.slice(1));
  const result = reversed + str[0];

  console.log(`reversed === result:`, reversed === result); // always false
  return result;
}


console.log(reverseString('JOHN WICK'));

function buildArray(start: number, end: number): number[] {
  if (start > end) return [];

  const arr = buildArray(start, end - 1);

  // Create a new reference to compare
  const refCheck = arr;

  console.log(`Before push at end=${end}:`, arr);
  console.log(`arr === refCheck:`, arr === refCheck); // ✅ Always true

  arr.push(end);

  console.log(`After push at end=${end}:`, arr);
  return arr;
}

console.log(buildArray(0,5));