// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

const canvas = document.getElementById('user-image');
const ctx = canvas.getContext('2d');
const gen = document.querySelector('[type=submit]');
const clr = document.querySelector('[type=reset]');
const readtxt = document.querySelector('[type=button]');

const imgUpdate = document.getElementById('image-input');
const volume = document.querySelector('input[type="range"]');

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  gen.disabled = false;
  clr.disabled = true;
  readtxt.disabled = false;

  const dimensions = getDimensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, dimensions.startX, dimensions.startY, dimensions.width, dimensions.height);

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

imgUpdate.addEventListener('change', (event) => {
  event.preventDefault();
  img.src = URL.createObjectURL(imgUpdate.files[0]);
  img.alt = imgUpdate.files[0].name;
})

gen.addEventListener('click', (event) => {
  event.preventDefault();
  const textTop = document.getElementById('text-top');
  const textBot = document.getElementById('text-bottom');

  ctx.font = '35px Comic Sans MS';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  ctx.fillText(textTop.value, canvas.width/2, 50);
  ctx.fillText(textBot.value, canvas.width/2, canvas.height-25);
  gen.disabled = true;
  clr.disabled = false;
  readtxt.disabled = false;
})

clr.addEventListener('click', (event) => {
  event.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clr.disabled = true;
  readtxt.disabled = true;
  gen.disabled = false;
})

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
