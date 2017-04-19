var pic = document.getElementById("pImage_0");

chrome.runtime.sendMessage({ "action": "send_pic_url", "pic_url": pic.src });
chrome.runtime.sendMessage({ "action": "show_page_action"});