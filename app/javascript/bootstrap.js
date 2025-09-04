document.addEventListener('DOMContentLoaded', () => {
  // Initialize popovers
  document.querySelectorAll('a[rel="popover"]').forEach(element => {
    if (typeof $ !== 'undefined' && $.fn.popover) {
      $(element).popover();
    }
  });

  // Initialize tooltips
  document.querySelectorAll('.tooltip').forEach(element => {
    if (typeof $ !== 'undefined' && $.fn.tooltip) {
      $(element).tooltip();
    }
  });

  document.querySelectorAll('a[rel="tooltip"]').forEach(element => {
    if (typeof $ !== 'undefined' && $.fn.tooltip) {
      $(element).tooltip();
    }
  });
});
