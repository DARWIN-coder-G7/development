class ListNode {
    value: any;
    prev: ListNode | null = null;
    next: ListNode | null = null;

    constructor(value: any) {
        this.value = value;
    }
}

class DoublyLinkedList {
    head: ListNode | null = null;
    tail: ListNode | null = null;
    length: number = 0;

    constructor(value: any) {
        const newNode = new ListNode(value);
        this.head = newNode;
        this.tail = newNode;
        this.length++;
    }

    push(value: any) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Reference Vs Reassignment
            // Here first we are changing the reference of tail so it will refelect on head too 
            // And Then we are reassigning tail with a new object hence it wont affect head 
            // That’s the difference between changing the contents vs changing the pointer. 
            newNode.prev = this.tail; // Assignment
            this.tail!.next = newNode; // Reference --- Changing The Content
            this.tail = newNode; // Reassignment  --- Changing The Pointer
        }

        this.length++;
        // this.trace();
    }
    unShift(value: any) {
        const newOne = new ListNode(value);
        if (!this.head) {
            this.head = newOne;
            this.tail = newOne;
        } else {
            newOne.next = this.head;
            this.head.prev = newOne;
            this.head = newOne;
        }
        this.length++;
    }
    shift() {
        if (!this.head) return;
        if (!this.head.next || this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        }
        let firstOne = this.head;
        let secondOne = this.head.next;
        firstOne.next = null;
        secondOne.prev = null;
        this.head = secondOne;
        this.length--;
    }
    pop() {
        if (!this.head) return;
        if (!this.head.next || this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        }
        // let lastOne = this.head;
        // let lastPrevOne: ListNode | null = this.head;

        // while (lastPrevOne.next) {
        //     lastOne = lastPrevOne;
        //     lastPrevOne = lastPrevOne.next;
        // }
        // lastOne.next = null;
        // this.tail = lastOne;
        // this.length--;

        // Or instead Of Doing Above All we can write it down very Simpler As below
        let lastPrevOne: ListNode | null = this.head;
        // hence we are using a Doubly Linked list No need to iterate through 
        if (!this.tail) return;
        // getting Last Two
        let LastOne = this.tail;
        lastPrevOne = this.tail.prev;
        // moving the tail pointer to prev node
        lastPrevOne!.next = null;
        this.tail = lastPrevOne;
        //GarBage Collection
        LastOne.prev = null;
        this.length--;

        // while (lastPrevOne.next && lastPrevOne.next.next) {
        //     lastPrevOne = lastPrevOne.next;
        // }

        // lastPrevOne.next = null;
        // this.tail = lastPrevOne;
        // this.length--;

        // The Above One will work
        // but here is pitfall we are just unlinking the next from the last previous one but still the last node 
        // we had never touched will have link to the prev one so it wont be garbage collected
        // Hence we need our code like this

        // let LastElement = lastPrevOne.next!;
        // LastElement.prev = null;
        // lastPrevOne.next = null;
        // this.tail = lastPrevOne;
        // this.length--;

    }
    trace() {
        console.log(`\n List after push (length: ${this.length}):`);
        let current = this.head;
        let index = 0;
        while (current) {
            const prevVal = current.prev ? current.prev.value : null;
            const nextVal = current.next ? current.next.value : null;
            console.log(
                `  [${index}] value: ${current.value}, prev: ${prevVal}, next: ${nextVal}`
            );
            current = current.next;
            index++;
        }
    }
}

const doublyLinkedList = new DoublyLinkedList(2);

doublyLinkedList.push(20);
doublyLinkedList.push(30);
doublyLinkedList.push(40);
doublyLinkedList.push(50);
doublyLinkedList.unShift(700);
doublyLinkedList.pop();
doublyLinkedList.shift();
// console.log(doublyLinkedList);



// -------------------
//Linked List
// --------------------
// {
//   value: 'A',
//   next: {
//     value: 'B',
//     next: {
//       value: 'C',
//       next: null
//     }
//   }
// }
// ----------------
// Doubly linked List
// ------------------
// {
//   value: 'A',
//   prev: null,
//   next: {
//     value: 'B',
//     prev: { value: 'A', ... },
//     next: {
//       value: 'C',
//       prev: { value: 'B', ... },
//       next: null
//     }
//   }
// }
