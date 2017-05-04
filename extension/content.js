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

function detectMultiPic() {
	return document.getElementsByClassName('_90kqf').length > 0 || 
		document.getElementsByClassName('_lfres') > 0;
}

const tabUrl = window.location.href;

document.addEventListener('RW759_connectExtension', function(e) {
    const sharedData = e.detail;

    const isMultiPic = detectMultiPic();

	if(isMultiPic) {
		const urls = sharedData.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.map(el => { return el.node.display_url; });
		chrome.runtime.sendMessage({ "action": ActionEnum.sendMultiPic, "tab_url": tabUrl, "urls": urls});
	} else {
		const pic = document.getElementById("pImage_0");
		chrome.runtime.sendMessage({ "action": ActionEnum.sendPic, "tab_url": tabUrl, "pic_url": pic.src });
	}

	chrome.runtime.sendMessage({ "action": ActionEnum.showPage});

});




