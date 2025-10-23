export function draggable(el, container) {
  const element = document.getElementById(el);
  element.style.position = 'absolute';

  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  let lastSafeLeft = 0, lastSafeTop = 0;
  let isAnimating = false;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    element.style.cursor = 'grabbing';
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = element.offsetLeft;
    initialTop = element.offsetTop;
    lastSafeLeft = initialLeft;
    lastSafeTop = initialTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging || isAnimating) return;
    isAnimating = true;

    requestAnimationFrame(() => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newLeft = initialLeft + dx;
      const newTop = initialTop + dy;

      
      const rect = container.getBoundingClientRect();
      const elRect = element.getBoundingClientRect();

      const maxLeft = rect.width - elRect.width;
      const maxTop = rect.height - elRect.height;

      const boundedLeft = Math.min(Math.max(0, newLeft), maxLeft);
      const boundedTop = Math.min(Math.max(0, newTop), maxTop);

      // Temporarily move element to test collision  avoid flickering
      element.style.left = boundedLeft + 'px';
      element.style.top = boundedTop + 'px';

      if (collisionDetector(element, container)) {
        // Collision detected → revert to last safe
        element.style.left = lastSafeLeft + 'px';
        element.style.top = lastSafeTop + 'px';
      } else {
        // No collision → update last safe
        lastSafeLeft = boundedLeft;
        lastSafeTop = boundedTop;
      }

      isAnimating = false;
    });
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    element.style.cursor = 'pointer';
  });
}


export function collisionDetector(el, container) {
    if (!(el instanceof HTMLElement)) {
        return 'Please provide a valid HTML element';
    }

    const allElements = Array.from(document.querySelectorAll('body *'));

    // Remove the dragged element and the container itself
    const remainingEls = allElements.filter(
        (htmlEl) => htmlEl !== el && htmlEl !== container
    );

    // Get rectangle of dragged element
    const rect1 = el.getBoundingClientRect();

    // Check if it overlaps with ANY element
    const isColliding = remainingEls.some((element) => {
        const rect2 = element.getBoundingClientRect();

        // Overlapping logic
        const overlap = !(
            rect1.right < rect2.left || // rect1 is completely to the left of rect2 
            rect1.left > rect2.right || // rect1 is completely to the right of rect2 
            rect1.bottom < rect2.top || // rect1 is completely above rect2 
            rect1.top > rect2.bottom // rect1 is completely below rect2 
        );

        if (overlap) {
            console.log('Collision detected with element:', element);
        }

        return overlap;
    });

    return isColliding;
}

export function findFreePosition(el, container) {
  if (!(el instanceof HTMLElement) || !(container instanceof HTMLElement)) {
    console.error('Please provide valid HTMLElement instances.');
    return { left: '0px', top: '0px' };
  }

  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const elWidth = elRect.width || el.offsetWidth;
  const elHeight = elRect.height || el.offsetHeight;

  const children = Array.from(container.children).filter(child => child !== el);
  const occupied = children.map(child => {
    const r = child.getBoundingClientRect();
    return {
      top: r.top - containerRect.top,
      left: r.left - containerRect.left,
      right: r.right - containerRect.left,
      bottom: r.bottom - containerRect.top
    };
  });

  const step = 10;
  const maxTop = container.clientHeight - elHeight;
  const maxLeft = container.clientWidth - elWidth;

  for (let top = 0; top <= maxTop; top += step) {
    for (let left = 0; left <= maxLeft; left += step) {
      const testRect = {
        top,
        left,
        right: left + elWidth,
        bottom: top + elHeight
      };

      const overlap = occupied.some(rect => !(
        testRect.right < rect.left ||
        testRect.left > rect.right ||
        testRect.bottom < rect.top ||
        testRect.top > rect.bottom
      ));

      if (!overlap) {
        return { left: `${left}px`, top: `${top}px` };
      }
    }
  }

  console.warn('No free place found, stacking below.');
  return { left: '0px', top: `${container.scrollHeight + 20}px` };
}
