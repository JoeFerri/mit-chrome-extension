/*
 * MIT License
 *
 * Copyright (c) 2023 Giuseppe Ferri <jfinfoit@gmail.com>
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
 * Populates the new tab tables with the data received
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
    cell2.textContent = element._value;
    }
    else if (element._class) {
      var row = tableClass.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.textContent = element._class;
      cell2.textContent = element._value;
      }
  });
}

/**
 * Translates the raw data sent by the popup.
 * @param {*} messageRaw {_ids:{string: string},_class:{string: string}}
 * @returns [[{_id: int, _value: string}, ...],[{ _class: string, _value: string}, ...]]
 */
function messageParse(messageRaw) {
  var elements = [];
  
  Object.entries(messageRaw._ids).forEach(entry => {
    const [_id, _value] = entry;
    elements.push({_id: _id, _value: _value});
  });

  Object.entries(messageRaw._class).forEach(entry => {
    const [_class, _values] = entry;
    _values.forEach(function(_value) {
      elements.push({_class: _class, _value: _value});
    });
  });

  return elements;
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "populateNewTab") {
      // populates the new tab table with the data sent by the popup
      var elements = messageParse(JSON.parse(request.message));
      displayElements(elements);
    }
  }
);