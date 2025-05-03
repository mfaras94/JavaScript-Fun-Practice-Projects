const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

ctx.strokeStyle = "#bada55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 2;

let isDrawing = false;
let isErase = false;
let isErasing = false;
let multiColor = false;
let isRectangle = false;

let lastX = 0;
let lastY = 0;

let startX = 0;
let startY = 0;

let hue = 0;

const multicolorToggle = document.querySelector(".multicolor");
const lineSize = document.querySelector(".linesize");
const clearButton = document.querySelector(".clear");
const lineP = document.querySelector(".lineP");
const lineN = document.querySelector(".lineN");
const rectangleButton = document.querySelector(".rectangle");

rectangleButton.addEventListener("click", () => {
  isRectangle = !isRectangle;
  if (isRectangle) {
    isErase = false;
    isDrawing = false;
    rectangleButton.textContent = "Rectangle ON";
  } else {
    rectangleButton.textContent = "Rectangle OFF";
  }
});

multicolorToggle.addEventListener("click", () => {
  multiColor = !multiColor;
  if (multiColor) {
    multicolorToggle.textContent = "MultiColor ON";
  } else {
    multicolorToggle.textContent = "MultiColor OFF";
  }
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
});

const eraserButton = document.querySelector(".eraser");
eraserButton.addEventListener("click", () => {
  isErase = !isErase;
  if (isErase) {
    isRectangle = false;
    isDrawing = false;
    eraserButton.textContent = "Eraser ON";
  } else {
    eraserButton.textContent = "Eraser OFF";
  }
});

function erase(e) {
  if (!isErasing) return;
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

lineSize.textContent = "Line Size :" + ctx.lineWidth;

lineP.addEventListener("click", () => {
  if (ctx.lineWidth >= 50) return;
  ctx.lineWidth++;
  lineSize.textContent = "Line Size :" + ctx.lineWidth;
});

lineN.addEventListener("click", () => {
  if (ctx.lineWidth === 1) return;
  ctx.lineWidth--;
  lineSize.textContent = "Line Size :" + ctx.lineWidth;
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke();
}

function rectangle(x, y, width, height) {
  if (!isRectangle) return;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
}

function draw(e) {
  if (!isDrawing) return;
  drawLine(lastX, lastY, e.offsetX, e.offsetY);
  if (multiColor) {
    changeColor();
  }
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function changeColor() {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

canvas.addEventListener("mousedown", (e) => {
  if (!isErase && !isRectangle) {
    isDrawing = true;
  }
  isErasing = isErase;
  [startX, startY] = [e.offsetX, e.offsetY];
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", (e) => {
  if (isErasing) {
    erase(e);
    ctx.globalCompositeOperation = "source-over";
  } else {
    draw(e);
  }
});
canvas.addEventListener("mouseup", (e) => {
  const width = e.offsetX - startX;
  const height = e.offsetY - startY;
  rectangle(startX, startY, width, height);
  ctx.globalCompositeOperation = "source-over";

  isDrawing = false;
  isErasing = false;
});
canvas.addEventListener("mouseout", () => (isDrawing = false));
