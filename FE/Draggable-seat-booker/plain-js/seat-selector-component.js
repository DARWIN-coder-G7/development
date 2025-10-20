export class SeatSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.selectedSeats = new Set();

    const style = document.createElement('style');
    style.textContent = `
      .seat {
        width: 35px;
        height: 35px;
        margin: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #ccc;
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
        font-family: sans-serif;
        font-size: 14px;
        transition: background 0.2s;
      }
      .seat.selected {
        background: #4caf50;
        color: white;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        width: max-content;
        max-width:400px;
      }
      .selection-box {
        position: absolute;
        border: 1px dashed #2196f3;
        background: rgba(33, 150, 243, 0.2);
        pointer-events: none;
      }
    `;

    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.shadowRoot.append(style, this.container);
  }

  connectedCallback() {
    // Parse the seat array from attribute
    const seatArray = JSON.parse(this.getAttribute('data-seats') || '[]');
    this.renderSeats(seatArray);
    this.initSelection();
  }

  // 🔹 Render seats with custom HTML if provided
  renderSeats(seats) {
    const template = this.querySelector('template');
    this.container.innerHTML = ''; // clear

    seats.forEach((seatId) => {
      const seatEl = document.createElement('div');
      seatEl.classList.add('seat');
      seatEl.dataset.id = seatId;

      if (template) {
        // Allow user to define custom inner HTML
        seatEl.innerHTML = template.innerHTML.replace('{{seat}}', seatId);
      } else {
        seatEl.textContent = seatId;
      }

      this.container.appendChild(seatEl);
    });
  }

  // 🔹 Mouse drag selection logic
  initSelection() {
    let isDragging = false;
    let startX, startY;
    let selectionBox;

    const getRect = (el) => el.getBoundingClientRect();

    this.container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      selectionBox = document.createElement('div');
      selectionBox.classList.add('selection-box');
      this.shadowRoot.appendChild(selectionBox);
    });

    this.container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const currentY = e.clientY;

      const x = Math.min(currentX, startX);
      const y = Math.min(currentY, startY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      Object.assign(selectionBox.style, {
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
      });

      const boxRect = selectionBox.getBoundingClientRect();

      this.shadowRoot.querySelectorAll('.seat').forEach((seat) => {
        const seatRect = getRect(seat);
        const overlap = !(
          seatRect.right < boxRect.left ||
          seatRect.left > boxRect.right ||
          seatRect.bottom < boxRect.top ||
          seatRect.top > boxRect.bottom
        );
        if (overlap) {
          seat.classList.add('selected');
          this.selectedSeats.add(seat.dataset.id);
        }
      });
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      selectionBox.remove();

      this.emitSelectionChange();
    });

    // 🔹 Individual click selection toggle
    this.shadowRoot.addEventListener('click', (e) => {
      if (!e.target.classList.contains('seat')) return;
      const id = e.target.dataset.id;
      e.target.classList.toggle('selected');
      if (e.target.classList.contains('selected')) this.selectedSeats.add(id);
      else this.selectedSeats.delete(id);

      this.emitSelectionChange();
    });
  }

  // 🔹 Output event (like @Output)
  emitSelectionChange() {
    this.dispatchEvent(new CustomEvent('selectionChange', {
      detail: Array.from(this.selectedSeats),
    }));
  }

  // 🔹 Public API methods
  getSelected() {
    return Array.from(this.selectedSeats);
  }

  setSelected(ids = []) {
    this.selectedSeats = new Set(ids);
    this.shadowRoot.querySelectorAll('.seat').forEach((seat) => {
      seat.classList.toggle('selected', this.selectedSeats.has(seat.dataset.id));
    });
    this.emitSelectionChange();
  }
}


