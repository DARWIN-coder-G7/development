const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 23, 3, 45, 6, 67, 78, 89];

// O(n) 
const findElementByValue = (arr: any[], element: any) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            console.log(`Found Element By Value ${arr[i]}`);
        }
    }
};
findElementByValue(arr, 45);

// O(1) 
const findElementByIndex = (arr: any[], index: number) => {
    console.log(`Found Element By Index ${arr[index]}`);
};
findElementByIndex(arr, 4);

//O(n^2) time will increase quadratically
const findPairs = (arr: any[]) => {
    let iterationcount = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            iterationcount++;
        }
        iterationcount++;
    }
    console.log('Iteration Count',iterationcount);
}
findPairs([0,1]); //3
findPairs([0,1,2,3]); //10
findPairs([0,1,2,3,4,5,6,7]); //36
findPairs([0,1,2,3,4,5,6,7,8,9]); //55
// As we can see the iteration count when the size of the array doubles the count is not just doubling its near to quad times 

