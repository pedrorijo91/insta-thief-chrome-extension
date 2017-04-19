var pic_url = ""

function receiver(request, sender, sendResponse) {
  
  if (request.action === "send_pic_url") {
  	pic_url = request.pic_url;
  } else if (request.action === "show_page_action") {
  	chrome.pageAction.show(sender.tab.id);
  }

}


function click(tab) {  
  chrome.tabs.create({url: pic_url, active: false});
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

// Act upon extension click
chrome.pageAction.onClicked.addListener(click);