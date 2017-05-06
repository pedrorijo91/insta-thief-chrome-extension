setTimeout(function() {
	var sharedData = window._sharedData;
  /* Example: Send data from the page to your Chrome extension */
  document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
    detail: sharedData
  }));
}, 0);