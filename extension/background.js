function receiver(request, sender, sendResponse) {

  if (request.action === ActionEnum.showPage) {
  	chrome.pageAction.show(sender.tab.id);
  } else {
  	console.error("Unexpected message: " + request.action)
  }
}

function click(tab) {
  chrome.tabs.sendMessage(tab.id, {action: ActionEnum.clicked});
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

// Act upon extension click
chrome.pageAction.onClicked.addListener(click);