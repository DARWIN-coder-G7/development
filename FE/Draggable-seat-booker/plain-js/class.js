// Reusable Instance
export class MultiSeatSelector {
    container;
    noOfSeats = 0;
    isSelecting = false;
    startX = 0;
    startY = 0;
    selectedBox = null;
    previouslySelected;


    constructor(elementId, length) {
        this.noOfSeats = length;
        this.container = document.getElementById(elementId);

        // Bind methods to this instance
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.initiateUi();
        this.addEventListeners();
    }

    initiateUi() {
        for (let i = 0; i < this.noOfSeats; i++) {
            this.createSeatElement(i);
        }
    }

    createSeatElement(i) {
        const seat = document.createElement('div');
        seat.innerText = i + 1;
        seat.classList.add('seat');
        this.container.append(seat);
    }

    addEventListeners() {
        this.container.addEventListener('click', this.handleClick);
        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleClick(e) {
        if (this.isSelecting) return;
        if (e.target.classList.contains('seat')) {
            e.target.classList.toggle('selected');
        }
    }

    handleMouseDown(e) {
        if (e.button !== 0) return;
        this.isSelecting = true;

        this.previouslySelected = new Set(
            Array.from(document.querySelectorAll('.seat.selected'))
        );

        const positions = this.container.getBoundingClientRect();

        this.startX = e.clientX - positions.left;
        this.startY = e.clientY - positions.top;

        this.selectedBox = document.createElement('div');
        this.selectedBox.className = 'selection-box';
        this.container.appendChild(this.selectedBox);

    }

    handleMouseMove(e) {
        if (!this.isSelecting) return;
        const rect = this.container.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const boxX = Math.min(x, this.startX);
        const boxY = Math.min(y, this.startY);
        const boxwidth = Math.abs(x - this.startX);
        const boxHeight = Math.abs(y - this.startY);
        Object.assign(this.selectedBox.style, {
            top: `${boxY}px`,
            left: `${boxX}px`,
            width: `${boxwidth}px`,
            height: `${boxHeight}px`,
        });

        const boxRect = this.selectedBox.getBoundingClientRect();

        this.container.querySelectorAll('.seat').forEach((seat) => {
            const seatRect = seat.getBoundingClientRect();

            const overlap = !(
                seatRect.right < boxRect.left ||
                seatRect.left > boxRect.right ||
                seatRect.bottom < boxRect.top ||
                seatRect.top > boxRect.bottom
            );

            if (overlap || this.previouslySelected.has(seat)) {
                seat.classList.add('selected');
            } else {
                seat.classList.remove('selected');
            }
        })

    }

    handleMouseUp() {
        if (!this.isSelecting) return;
        this.isSelecting = false;
        this.selectedBox.remove();
        this.selectedBox = null;
    }

}