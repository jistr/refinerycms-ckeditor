function initializeCkeditorRefineryHooks() {
  href = window.location.href;

  if (href.match(/\/images\/insert/) && href.match(/ckeditor/i)) {
    initializeImageCkeditorRefineryHooks();
  }

  // TODO: hooks for file browser and link browser
}

function initializeImageCkeditorRefineryHooks() {
  alert('This page is gonna get hooked');
}

$(document).ready(initializeCkeditorRefineryHooks);
