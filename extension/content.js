/*
 - Instagram adds multiPic details (pics url) on window._sharedData
 - Content script runs in "isolated world environment" policy (https://developer.chrome.com/extensions/content_scripts#execution-environment)
 - Injected script can't (?) call chrome.* APIs
 - Solution from: http://stackoverflow.com/a/9636008/4398050
 */

var s = document.createElement('script');
// add "instagram.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('instagram.js');
s.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

var sharedDataGlob;

document.addEventListener('RW759_connectExtension', function(e) {
  sharedDataGlob = e.detail;
  chrome.runtime.sendMessage({ "action": ActionEnum.showPage}); 
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {    
    if (msg.action === ActionEnum.clicked) {
        urls = getMediaUrls(document);
        urls.forEach(mediaUrl => download(document, mediaUrl));
    } else {
      console.error('Unexpected message action: ' + message.action);
    }
    
});

function detectMultiPic() {
  const arrowClassName = '_90kqf';
  const breadcrumbClassName = '_lfres';

  return document.getElementsByClassName(arrowClassName).length > 0 || 
  document.getElementsByClassName(breadcrumbClassName) > 0;
}

function detectVideo() {
  return document.getElementsByTagName('video').length > 0;
}

function getMediaUrls(dom) {
  const isMultiPic = detectMultiPic();
  const isVideo = detectVideo();

  if(isVideo) {
    const video = dom.getElementsByTagName('video')[0];
    return [video.src];
  } else if(isMultiPic) {
    try {
     const urls = sharedDataGlob.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.map(el => { return el.node.display_url; });
     return urls;    
    } catch (err) {
     console.error('could not get multipic urls: ' + err);
     return [];
    }
  } else {
    const pic = dom.getElementById("pImage_0");
    return [pic.src];
  }
}

function download(dom, picUrl) {
    var pom = dom.createElement('a');
    pom.setAttribute('href', picUrl);
    pom.setAttribute('download', '');
    pom.click();
}


