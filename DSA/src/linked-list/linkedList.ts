//Each node will contain a data and reference of a next node  -- Linked list
// data can be anything an array or number or character

import { get } from "http";

// Create a Node Then we have to create a linked list

//Naming as listnode since already node exists
class ListNode {
    head: any;
    next: any;
    constructor(value: any) {
        this.head = value;
        this.next = null;
    }
}

class LinkedList {
    head: ListNode | null;
    tail: ListNode | null;
    length: number;
    constructor(value: any) {
        this.head = new ListNode(value);
        this.tail = this.head;
        this.length = 1;
    }
    push(value: any) {
        const newOne = new ListNode(value);
        if (!this.head) {
            this.head = newOne;
            this.tail = newOne;
        }
        this.tail!.next = newOne;
        this.tail = newOne;
        this.length++;
    }
    pop() {
        if (!this.head) {
            return;
        }
        let temp = this.head;
        let prev = this.head;
        while (temp.next) {
            prev = temp;
            temp = prev.next;
        }
        //to remove the last item we are ignoring temp intentionaally
        this.tail = prev;
        this.tail.next = null;
        this.length--;
        if (this.length == 0) {
            this.head = null;
            this.tail = null;
        }
    }
    // Add a new Node at the begining of an Linked list 
    unShift(value: any) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        //first assign head to our new node next property
        newNode.next = this.head;
        //make our new node as head
        this.head = newNode;
        this.length++;

        // so linked list is a Thing which will have object of object of object of object
        // An object… that contains another object… that contains another object… and so on.
        // { value: 1, next: { value: 2, next: { value: 3, next: null } } }
    }
    //Shift Remove the first node from an linked list
    shift() {
        if (!this.head) {
            return;
        }
        //get the head's next element which will be the second one
        let tempNode = this.head.next;
        //Assign the second elemet to head hence it will become first one
        this.head = tempNode;
        //reduce the length
        this.length--;

        if (this.length == 0) {
            this.tail = null;
        }
    }
    shiftClean() {
        if (!this.head) {
            return;
        }
        let tempNode = this.head;
        this.head = this.head.next;
        //for memory cleaning since linked list is pointer driven we are clearing down addresses
        tempNode.next = null;
        this.length--;

        if (this.length == 0) {
            this.tail = null;
        }
    }
    getFirst() {
        return this.head?.head;
    }
    getLast() {
        if (!this.head) {
            return null
        }
        let temp = this.head;
        while (temp) {
            if (!temp.next) {
                return temp;
            }
            temp = temp.next;
        }
        // we ca directly return Tail instead of doing above nonsense things 
        // since above one will be working even if we forget to update the tail

        return this.tail?.head;
    }
    getByIndex(index: number): ListNode | null {
        if (!this.head) return null;
        if (index > this.length) return null;
        let temp = this.head;
        //for loop Approach

        // for (let i = 0; i <= this.length; i++) {
        //     if (i == index) {
        //         return temp;
        //     }
        //     temp = temp.next;
        // }

        //While Loop approach

        let counter = 0;
        while (temp) {
            if (counter == index) {
                return temp;
            }
            counter++;
            temp = temp.next;
        }
        return null;
    }
    set(index: number, value: any) {
        let temp = this.head;

        // let count = 0;
        // while (temp) {
        //     if (count == index) {
        //         // we have to just change the value keep that in mind we are not inserting a new thing 
        //         // we are changing the existing value of a node
        //         temp.head = value;
        //         break;
        //     }
        //     count++;
        //     temp = temp.next;
        // }
        //Or Else we can use get By Index

        temp = this.getByIndex(index);
        //Then we can do the value updation like
        temp!.head = value;

    }
    insert(index: number, value: any) {

        //While Inserting we are going to catch the previous object/element of the index where we have to attach
        // Then we have assign the next of that Particular node to next of our New node
        // Then we have to assign our node as a next to that particular(exactly previous node)

        if (index < 0 || index > this.length) return 0;

        if (index === 0) {
            this.unShift(value);
            return 1;
        }
        if (index === this.length) {
            this.push(value);
            return 1;
        }
        let prevNode = this.getByIndex(index - 1);

        // let count = 0;
        // while (count < index - 1) {
        //     prevNode = prevNode?.next;
        //     count++;
        // }

        const newNode = new ListNode(value);
        newNode.next = prevNode!.next; //to avoid undefined we are forced to use non-null assertion
        prevNode!.next = newNode;

        this.length++;
    }
    size() {
        let count = 0;
        let temp = this.head;
        while (temp) {
            temp = temp.next;
            count++;
        }
        return count;
        return this.length;
    }
    clear() {
        //No need for the below two lines if head itself is null means then javascript will ignore the next references
        // if(!this.head) return 0;
        // this.head!.next = null;
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}


//=--------------------- ABOUT OBJECT contexts on Heap________________________
let myGlobalLinkedlist;
if (true == true) {
    const myLocalLinkedList = new LinkedList(2);
    myGlobalLinkedlist = myLocalLinkedList;
    myLocalLinkedList.push(8);
    myLocalLinkedList.push(80);
    myLocalLinkedList.push(88);
    myLocalLinkedList.push(68);
}

// console.log(myGlobalLinkedlist);

let myglobalOBject;
if (true == true) {
    let myLocalObject: any = { name: 'john' };
    myglobalOBject = myLocalObject;
    myLocalObject.name = "william";
    myLocalObject.job = "doing";
}

// console.log(myglobalOBject);

//------------------------------------------------------------------


const myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(34);
myLinkedList.push(21);
myLinkedList.push(91);
myLinkedList.push(23);
myLinkedList.set(2, 99);
// myLinkedList.pop();
// myLinkedList.unShift(100);
// myLinkedList.shift();
// myLinkedList.shiftClean();
myLinkedList.insert(2, 198);
console.log('My-Linked_list', myLinkedList);
// console.log('GET FIRST', myLinkedList.getFirst());
// console.log('GET LAST', myLinkedList.getLast());
console.log('Size', myLinkedList.size());


