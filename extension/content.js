const tabUrl = window.location.href;
const pic = document.getElementById("pImage_0");

chrome.runtime.sendMessage({ "action": ActionEnum.sendPic, "tab_url": tabUrl, "pic_url": pic.src });
chrome.runtime.sendMessage({ "action": ActionEnum.showPage});