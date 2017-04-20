var pic = document.getElementById("pImage_0");

chrome.runtime.sendMessage({ "action": ActionEnum.sendPic, "pic_url": pic.src });
chrome.runtime.sendMessage({ "action": ActionEnum.showPage});