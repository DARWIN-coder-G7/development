import {MultiSeatSelector} from './class.js';
import {SeatSelector} from './seat-selector-component.js';

const anotherSet = new MultiSeatSelector('seatContainerone', 25);
customElements.define('seat-selector', SeatSelector);

const seatComponent = document.getElementById('mySeats');

seatComponent.addEventListener('selectionChange', (event) => {
  console.log('🎟 Selected seats:', event.detail);
});