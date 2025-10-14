import { lookup } from "dns";

type LinkedNode = {
    value: number;
    next: LinkedNode | null;
};

const myCustomLinkedList: LinkedNode = { value: 10, next: { value: 20, next: { value: 30, next: { value: 40, next: { value: 50, next: { value: 60, next: { value: 70, next: null } } } } } } };

//---------------------------------------------- My Brute force Approach ----------------------------------------------------
// Assuming time complexity will be object(n^2) since every time we are looping through the array 
// My idealogy Here First time I am looping through the Array to figure out tail then I am taking the tail out and making it as Head 
// Then I am Picking the last previous One By Index then attaching it next to my New head 
// Then Picking up the previous one of the last previous one with the help of index by reducing the length in a lookup 
//  So every time I have to make a Loop to do so 
function reverseANormalLinkedList(linkedList: any) {
    let tail;
    let list = linkedList;
    let count = 0;
    while (list) {
        if (list.next == null) {
            tail = list;
            break;
        }
        list = list.next;
        count++;
    }
    let newList = tail;
    let temp = newList;

    while (count !== 0) {
        let current = getByindex(count - 1);
        console.log("listData", newList);
        console.log("Current", current);
        if (!current) return;

        current.next = null;   // clear current's next
        temp.next = current;   // attach to the tail
        temp = temp.next;      // move the tail pointer
        count--;
    }

    console.log(newList);


}

function getByindex(index: number) {
    let count = 0;
    let temp = myCustomLinkedList;
    while (temp) {
        if (index === count) {
            return temp;
        }
        if (!temp.next) break;
        temp = temp.next;
        count++;
    }
    return null;
}

// -------------------------EFFICIENT APPROACH FROM INTERNET -------------------------------------------------
// Here the idea is instead of looping through entire list again and again we can do one thing 
//  first we are taking the first element and making it as tail but pointing the next to null
// then second element and making it as first and our previous element which is removed from the list will be the next element of new first element
//  For example 1 2 3 4 5 6 null is our linked list
//  1 null
// then
// 2 1 null
//then 
//  3 2 1 null like wise so in the end we will get 6 5 4 3 2 1 null Efficient one only one looping Time complexity will be o(n)
// You “extract” one node at a time.
//  You “cut” its link to the rest.
//  You “attach” it in front of the reversed part.
//  And the “new head” keeps shifting as we move forward.

function reverse() {
    let reversed = null;
    let current: LinkedNode | null = myCustomLinkedList;

    while (current) {
        // save the rest of the objects

        let next: LinkedNode | null = current.next;
        // console.log('Next', next);
        // Assign the previous reversed one to the rest of the linked list like making head as tail here
        current.next = reversed;
        // console.log("CURRENT NEXT", current.next);
        // then Assiging it to reversed
        reversed = current;
        // console.log('reversed', reversed);
        current = next;

        // Here in the above code current is the pointer he is one who is traversing through the next node of the Linked list
        // so here the value of the current and next will change evry loop 

    }
    return reversed;
}
console.log(reverse());

//POINTERS

let user = { name: { value: "Ajith" } };
// Stack:                        Heap:
// user ───► 0x100 ───────────► { name: 0x200 }
//                                 0x200 ───► { value: 'Ajith' }

// next ───► 0x200 (same as user.name)

let anotherset = user;

function analyser() {
    let next = user.name;
    user.name = { value: 'kumar' }; // will Not Pollute  // Created New Memory Address
    anotherset.name.value = 'doctor'; // polluting globally
    console.log(next); // { value: 'Ajith' }
    console.log(user.name);  // { value: 'doctor' }
    console.log(anotherset); // { name: { value: 'doctor' } }

}

analyser();


let userData = { name: 'Suman' };
// Stack:
// userData  ──►  (address: 0x100)

// Heap:
// 0x100 ──► { name: 'Suman' }

function reference() {
    let next = userData.name;
    //     Stack:
    // userData ──► 0x100
    // next = "Suman"

    // Heap:
    // 0x100 ──► { name: "Suman" }
    userData.name = 'Kimi Maro';
    next = 'Gunner';
    console.log(userData);
    console.log(next);
}

// reference();


// Variables that point to the same object reference in memory will always see the same updates until one of them is reassigned to a new object.

// so whenever I am updating the value of the keys in an object it will pollute globally
//  but when I just change or alter the structure it is not affecting globally by assigning