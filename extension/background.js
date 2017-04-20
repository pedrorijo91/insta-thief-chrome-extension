var pic_url = "";

function receiver(request, sender, sendResponse) {
  
  if (request.action === ActionEnum.sendPic) {
  	pic_url = request.pic_url;
  } else if (request.action === ActionEnum.showPage) {
  	chrome.pageAction.show(sender.tab.id);
  } else {
  	console.error("Unexpected message: " + request.action)
  }

}


function click(tab) {  
  chrome.tabs.create({url: pic_url, active: false});
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

// Act upon extension click
chrome.pageAction.onClicked.addListener(click);