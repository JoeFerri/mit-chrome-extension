# I(d) C(lass) Extractor

**Extracts and displays the page elements associated with id and classes in tabular form.**

---

## Description

**IC Extractor** is a utility extension for web developers.

Do you want to analyze a web page by extracting all `id`/`class`, element binding?

Are you getting lost in the tangle of HTML?

**IC Extractor** allows you with a simple click to get a list of `(id,value)` and `(class,value)` pairs in a **popup** with two clear, no-frills tables.

Do you want the tables in a full-size tab? You can do it.

---

## Futures

- export button in **JSON** format
- export button in **CVS** format
- export button in **EXCEL** format

---

## Installation

Download the **IC Extractor** folder to your PC.

Follow the instructions at these links:

[support.google.com - English](https://support.google.com/chrome/a/answer/2714278?hl=it)

[support.google.com - Italian](https://support.google.com/chrome/a/answer/2714278?hl=en)

[freecodecamp.org - English](https://www.freecodecamp.org/news/building-chrome-extension/)

[freecodecamp.org - Italian](https://www.freecodecamp.org/italian/news/come-create-your-extension-of-google-chrome/)

---

## Usage

1. Open **Chrome**.
2. Go to the address of the page you want to analyze.
3. Click on the extension icon
4. Navigate the popup tables to analyze the `id` and `class` of the page elements
5. Click **Open in new Tab** to open the tables in a full-size tab
6. Click on **Refresh** to reload the table data

---

## LOGIC: frame.js <--> popup.js

[![](https://mermaid.ink/img/pako:eNqNU1tv0zAU_ivWeWolJ0qa5jILKiHGAw8DtO0JRZrO4tMuUm7YziCrym_HuY22GxNWHhz7u5yb95DVkkCAph8tVRld5rhTWKYVs6tBZfIsb7AybGtP6fLr1T9uXh43ddM2L4-poJIqc4v3BX2Wb99_LFDrEYLFZMSeY5gjcpzNZtgLpghlpw0ayh6w2k1RfakNsfqR1DNlQt70SPaepbYKZVOQoRRGChWaTjLot46znHywwqJ7om84W1Alj4KywIEgxt_r3uu2_jCSpnwykz_27kcmZ3GKuRbahnjkuFi-Cuds8lR9K7WxpJk_4hVlhqndPS48zuy3CkPOXH95nOFmc9ofwWSumwK7T5PUYlJ3Z-036EP7_lvhbzqnIXD2imZJWttSXONP9u4329_lUvO7bLg7nHVE0nmtgUNJqsRc2sHf96gUzIP1SEHYraQttoXpR-Fgodia-qarMhBGtcShbaTVmt4JiC3aUeFgZxfEHn6B8GPPTTwvWl_EfuKF_opDB8LxQ3cVJX6UBOsojuI4iQ8cnuraSviu7_VrFXpBcBEGwZoDydzU6mp8nMMbHTy-D4TB8_AH6qU_6A?type=png)](https://mermaid.live/edit#pako:eNqNU1tv0zAU_ivWeWolJ0qa5jILKiHGAw8DtO0JRZrO4tMuUm7YziCrym_HuY22GxNWHhz7u5yb95DVkkCAph8tVRld5rhTWKYVs6tBZfIsb7AybGtP6fLr1T9uXh43ddM2L4-poJIqc4v3BX2Wb99_LFDrEYLFZMSeY5gjcpzNZtgLpghlpw0ayh6w2k1RfakNsfqR1DNlQt70SPaepbYKZVOQoRRGChWaTjLot46znHywwqJ7om84W1Alj4KywIEgxt_r3uu2_jCSpnwykz_27kcmZ3GKuRbahnjkuFi-Cuds8lR9K7WxpJk_4hVlhqndPS48zuy3CkPOXH95nOFmc9ofwWSumwK7T5PUYlJ3Z-036EP7_lvhbzqnIXD2imZJWttSXONP9u4329_lUvO7bLg7nHVE0nmtgUNJqsRc2sHf96gUzIP1SEHYraQttoXpR-Fgodia-qarMhBGtcShbaTVmt4JiC3aUeFgZxfEHn6B8GPPTTwvWl_EfuKF_opDB8LxQ3cVJX6UBOsojuI4iQ8cnuraSviu7_VrFXpBcBEGwZoDydzU6mp8nMMbHTy-D4TB8_AH6qU_6A)
