// Saves options to chrome.storage
function save_options() {
  var action = document.getElementById('action').value;

  chrome.storage.sync.set({
    'action': action
  }, function() {
    var feedback = document.getElementById('feedback');
    feedback.textContent = 'Options saved.';
    setTimeout(function() {
      feedback.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value action = download.
  chrome.storage.sync.get({
    'action': OptionsEnum.download
  }, function(items) {
    document.getElementById('action').value = items.action;
  });
}

function populate_select() {
  document.getElementById('download').value = OptionsEnum.download;
  document.getElementById('same-tab').value = OptionsEnum.sameTab;
  document.getElementById('new-tab').value = OptionsEnum.newTab;

  restore_options();
}

document.addEventListener('DOMContentLoaded', populate_select);

document.getElementById('save').addEventListener('click', save_options);
