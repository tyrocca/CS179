// File for useful functions and constants

// *********************
// * Weather Functions *
// *********************

export const weatherAPIKey = '03c1db743f26859a850f105f27d1302e';

export function makeId() {
  // always start with a letter (for DOM friendlyness)
  let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
    const ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      // exclude all chars between : (58) and @ (64)
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);
  return (idstr);
}

// Rotates random color choices
const colorChoices = [
  'yellow',
  'orange',
  'green',
  'blue',
  'teal',
];

// Function to pick a random color
export const randColor = () => {
  let rand = Math.random();
  rand *= colorChoices.length;
  rand = Math.floor(rand);
  return colorChoices[rand];
};

export const defaultNote = [{
  id: 'default-note-id-1234',
  color: randColor(),
  text: 'Here is an example note. Click the X to delete it. Click and hold to drag it around',
}];
