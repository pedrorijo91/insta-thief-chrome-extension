// tab_url -> [pics_url]
var pics = {}

function receiver(request, sender, sendResponse) {

  if (request.action === ActionEnum.sendPic) {
  	const tabUrl = request.tab_url;
  	const picUrl = request.pic_url;

  	pics[tabUrl] = [picUrl];
  } else if (request.action === ActionEnum.sendMultiPic) {
    const tabUrl = request.tab_url;
    const urls = request.urls;

    pics[tabUrl] = urls;
  } else if (request.action === ActionEnum.showPage) {
  	chrome.pageAction.show(sender.tab.id);
  } else {
  	console.error("Unexpected message: " + request.action)
  }

}


function click(tab) {
  const urls = pics[tab.url];

  urls.forEach(picUrl => {chrome.tabs.create({url: picUrl, active: false});});  
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

// Act upon extension click
chrome.pageAction.onClicked.addListener(click);