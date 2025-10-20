const container = document.getElementById('seatContainer');

for (let i = 0; i < 100; i++) {
    const seat = document.createElement('div');
    seat.innerText = i + 1;
    seat.classList.add('seat');
    container.appendChild(seat);
}

let isSelecting = false;
let startX, startY, selectionBox;
let previouslySelected = new Set();

function handleClick(e) {
    if (isSelecting) return;
    if (e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected');
    }
}
//will get called only once
function handleMouseDown(e) {
    //This ckeck is mandatory because e.button will let us know know which button on mouse is clicked
    // 0 left button
    // 1 middle button scroller wheel
    // 2 right button
    if (e.button !== 0) return;

    isSelecting = true;
    // fetching starting and Ending positions of the container 
    const rect = container.getBoundingClientRect();
    // e.clientX and e.clientY will give us exact positions of the cursor currently on the screen from the viewport
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    previouslySelected = new Set(
        Array.from(document.querySelectorAll('.seat.selected'))
    );
    // creating An absolute Div which can help us to figure out where user wants to select
    selectionBox = document.createElement('div');
    selectionBox.className = 'selection-box';
    container.appendChild(selectionBox);
}
// will get called until user drags the cursor
function handleMouseMove(e) {
    if (!isSelecting) return;
    // calculating current position of cursor
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // calculating and assigning width and height of the user scrolled area
    const left = Math.min(x, startX);
    const top = Math.min(y, startY);
    const width = Math.abs(x - startX);
    const height = Math.abs(y - startY);

    Object.assign(selectionBox.style, {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
    });

    // Getting positions of the user dragged (selected) position within our container
    const boxRect = selectionBox.getBoundingClientRect();

    document.querySelectorAll('.seat').forEach((seat) => {
        // Getting the positions of the individual seats 
        const seatRect = seat.getBoundingClientRect();
        // Just checking whether the user selected position overlaps with the 
        // current seats position or Not 
        const overlap = !(
            seatRect.right < boxRect.left ||
            seatRect.left > boxRect.right ||
            seatRect.bottom < boxRect.top ||
            seatRect.top > boxRect.bottom
        );

        if (overlap || previouslySelected.has(seat)) {
            seat.classList.add('selected');
        } else {
            seat.classList.remove('selected');
        }
    });
}

function handleMouseUp() {
    if (isSelecting) {
        isSelecting = false;
        selectionBox?.remove();
    }
}

const listeners = [
    { target: container, event: 'click', handler: handleClick },
    { target: container, event: 'mousedown', handler: handleMouseDown },
    { target: container, event: 'mousemove', handler: handleMouseMove },
    { target: window, event: 'mouseup', handler: handleMouseUp },
];

listeners.forEach(({ target, event, handler }) =>
    target.addEventListener(event, handler)
);