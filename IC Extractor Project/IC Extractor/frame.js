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


/**
 * Parses the document of the current frame and
 * creates an array according to the data exchange protocol between
 * background script (popup.js) and content script (frame.js).
 * @returns [[{_id: int, _value: string}, ...],[{ _class: string, _value: string}, ...]]
 */
function analyzePage() {
  var elements = [];
  var pageElements = document.querySelectorAll('*');

  pageElements.forEach(function(element) {
    var _id = element.id;
    var _classList = element.classList;
    var _value = element.textContent.trim();

    if (_id) {
      elements.push({_id: _id, _value: _value || '---'});
    }
    else if (_classList && _classList.length > 0) {
      // classes are separated by new lines
      elements.push({_class: _classList.value.replace(" ","\n"), _value: _value || '---'});
    }
  });

  return elements;
}

// occurs when the refreshButton is clicked
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // the frame has received the message from the popup which is ready to receive data
    if (request.action === "analyzePage") {
      // the frame responds by sending data to popup
      chrome.runtime.sendMessage({
        action: 'frameReadyToAnalyze',
        elements: analyzePage()
      });
    }
  }
);

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    // NO INIT
  } else if (event.target.readyState === "complete") {
      // the frame is fully loaded and sends data to popup
      chrome.runtime.sendMessage({
        action: 'frameReadyToAnalyze',
        elements: analyzePage()
      });
  }
});
