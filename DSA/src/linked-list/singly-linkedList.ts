class ListNode {
  value: any;
  next: ListNode | null = null;

  constructor(value: any) {
    this.value = value;
  }
}

class SinglePointerLinkedList {
  head: ListNode | null = null;
  length: number = 0;

  push(value: any) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length++;
  }

  print() {
    let current = this.head;
    let output = '';
    while (current) {
      output += `[${current.value}] → `;
      current = current.next;
    }
    console.log(output + 'null');
  }
}

const linkedList = new SinglePointerLinkedList();
linkedList.push(0);
linkedList.push(20);
linkedList.push(30);
linkedList.push(40);
linkedList.push(50);
linkedList.print();
