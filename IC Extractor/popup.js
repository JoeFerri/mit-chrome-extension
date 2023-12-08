/*
 * MIT License
 *
 * Copyright (c) 2023 Giuseppe Ferri joeferrilib@libero.it
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "frameReadyToAnalyze") {
      // a frame has been fully loaded and has sent the data of its elements
      displayElements(request.elements);
    }
  }
);

// used to communicate with the new open tab
// {_ids:{string: string},_class:{string: string}}
var messageRaw = {_ids:{},_class:{}};

/**
 * Populates the popup tables with the data received
 * @param {*} elements [[{_id: int, _value: string}, ...],[{ _class: string, _value: string}, ...]]
 */
function displayElements(elements) {
  var tableId = document.getElementById('elementTableId');
  var tableClass = document.getElementById('elementTableClass');

  elements.forEach(function (element) {
    if (element._id) {
    var row = tableId.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.textContent = element._id;
    cell2.textContent = typeof element._value === 'string' ? element._value : 'altro';
    messageRaw._ids[cell1.textContent] = cell2.textContent;
    }
    else if (element._class) {
      var row = tableClass.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.textContent = element._class;
      cell2.textContent = typeof element._value === 'string' ? element._value : 'altro';
      if (!messageRaw._class[cell1.textContent])
      messageRaw._class[cell1.textContent] = [];
      messageRaw._class[cell1.textContent].push(cell2.textContent);
      }
  });
}

/**
 * Create a new tab in Chrome.
 * @param {*} active the new table gets the focus
 * @param {*} url address of the html file for the new table
 * @returns {Promise<Tab>}
 * @see https://stackoverflow.com/a/44864966
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs#type-Tab
 */
function createTab (active,url) {
  return new Promise(resolve => {
      chrome.tabs.create({active: active, url:url}, async tab => {
          chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
              if (info.status === 'complete' && tabId === tab.id) {
                  chrome.tabs.onUpdated.removeListener(listener);
                  resolve(tab);
              }
          });
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // button setting
  var refreshButton = document.getElementById('refresh_button');
  var newTabButton = document.getElementById('new_tab_button');

  // button for reloading data
  refreshButton.addEventListener('click', async function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // deletes all rows of tables
      Array.prototype.slice.call(document.getElementsByTagName('tr')).forEach(function(item) { 
        if (!item.classList.contains("labels-row"))
          item.parentNode.removeChild(item); 
      } );
      // resets the communication data between tabs
      messageRaw = {_ids:{},_class:{}};
      // alerts all frames to send data back to the popup
      chrome.tabs.sendMessage(tabs[0].id, {action: 'analyzePage'});
    });
  });

  // button for creating a new tab
  newTabButton.addEventListener('click', async function () {
    let tab = await createTab(false,'new_tab.html');
    chrome.tabs.sendMessage(tab['id'], {
      action: 'populateNewTab',
      message: JSON.stringify(messageRaw)
    });
  });
  
  chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
    // alerts all frames to send data to the popup
    chrome.tabs.sendMessage(tabs[0].id, {action: 'analyzePage'});
  });
});