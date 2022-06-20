const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLORS = "#2c2c2c"
const CANVAS_SIZE = 600;

// canvas.width = 600;
// canvas.height = 600;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLORS;
ctx.fillStyle = INITIAL_COLORS;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //경로를 만든다.
        // console.log("creating path in", x, y);
        ctx.beginPath(); //경로생성
        ctx.moveTo(x, y); //선시작좌표
    } else {//그린다.
        // console.log("creating line in", x  , y);
        ctx.stroke(); //선그리기
        ctx.lineTo(x, y); //선끝좌표
    }
}

function handleColorClick(event){
    //이벤트 대상의 style을 찍어내
    // console.log(event.target.style) 
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // console.log(color);
}

function handleRangeChange(event) {
    const stork = event.target.value 
    ctx.lineWidth = stork;
}

function handleModeChange() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick); 
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeChange);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}