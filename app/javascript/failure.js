document.addEventListener('DOMContentLoaded', () => {
  // Handle backtrace click events
  document.querySelectorAll('.backtrace').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const nextElement = element.nextElementSibling;
      if (nextElement) {
        nextElement.style.display = nextElement.style.display === 'none' ? '' : 'none';
      }
    });
  });

  // Handle hover effects for failed items
  document.querySelectorAll('ul.failed li').forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('hover');
    });
  });
});
