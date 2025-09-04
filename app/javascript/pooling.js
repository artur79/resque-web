document.addEventListener('DOMContentLoaded', () => {
  const pollInterval = 2;

  const pollStart = (element) => {
    const href = element.getAttribute('href');
    const parent = element.parentElement;
    if (parent) {
      parent.textContent = 'Starting...';
    }
    
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.classList.add('polling');
    }

    setInterval(() => {
      fetch(href, {
        method: 'GET',
        headers: {
          'Accept': 'text/html'
        }
      })
      .then(response => response.text())
      .then(data => {
        if (mainElement) {
          mainElement.innerHTML = data;
          
          // Update relative dates if the function exists
          const timeElements = mainElement.querySelectorAll('.time');
          timeElements.forEach(timeElement => {
            if (typeof $ !== 'undefined' && $.fn.relativeDate) {
              $(timeElement).relativeDate();
            }
          });
        }
      })
      .catch(error => {
        console.error('Polling error:', error);
      });
    }, pollInterval * 1000);
    
    location.hash = '#poll';
  };

  // Auto start if hash is poll
  if (location.hash === '#poll') {
    const pollElement = document.querySelector('a[rel="poll"]');
    if (pollElement) {
      pollStart(pollElement);
    }
  }

  // Start when click on link
  document.querySelectorAll('a[rel="poll"]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      pollStart(element);
    });
  });
});