document.addEventListener('DOMContentLoaded', () => {
  const relatizer = function() {
    const dt = this.textContent;
    
    // Apply relative date if jQuery plugin is available
    if (typeof $ !== 'undefined' && $.fn.relativeDate) {
      $(this).relativeDate();
    }
    
    const relatized = this.textContent;
    
    // Check if element is inside an anchor or is an anchor itself
    const isInsideAnchor = this.closest('a') !== null;
    const isAnchor = this.tagName.toLowerCase() === 'a';
    
    if (isInsideAnchor || isAnchor) {
      if (typeof $ !== 'undefined' && $.fn.relativeDate) {
        $(this).relativeDate();
      }
      if (!this.getAttribute('title')) {
        this.setAttribute('title', dt);
      }
    } else {
      this.innerHTML = `
        <a href='#' class='toggle_format' title='${dt}'>
          <span class='date_time'>${dt}</span>
          <span class='relatized_time'>${relatized}</span>
        </a>
      `;
    }
  };

  const formatToggler = (e) => {
    e.preventDefault();
    
    // Toggle visibility of all spans in toggle_format links
    document.querySelectorAll('.time a.toggle_format span').forEach(span => {
      span.style.display = span.style.display === 'none' ? '' : 'none';
    });
    
    // Update title with hidden span text
    const hiddenSpan = e.currentTarget.querySelector('span[style*="none"]') || 
                       e.currentTarget.querySelector('span:not([style])');
    if (hiddenSpan) {
      e.currentTarget.setAttribute('title', hiddenSpan.textContent);
    }
  };

  // Initialize relative dates when DOM is ready
  document.querySelectorAll('.time').forEach(relatizer);
  
  // Hide date_time spans initially
  document.querySelectorAll('.time a.toggle_format .date_time').forEach(element => {
    element.style.display = 'none';
  });

  // Add event delegation for click on relative time to show date_time
  document.addEventListener('click', (e) => {
    if (e.target.closest('.time a.toggle_format')) {
      formatToggler(e);
    }
  });
});
