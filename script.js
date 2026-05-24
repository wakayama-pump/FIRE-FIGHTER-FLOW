/* script.js */

document.addEventListener(
"DOMContentLoaded",
()=>{

/* モード切替 */

const genbaBtn =
document.getElementById("genbaBtn");

const studyBtn =
document.getElementById("studyBtn");

const studyOnly =
document.querySelectorAll(".studyOnly");

function setGenba(){

studyOnly.forEach(el=>{
el.style.display="none";
});

genbaBtn.classList.add("active");
studyBtn.classList.remove("active");

genbaBtn.classList.remove("normal");
studyBtn.classList.add("normal");

}

function setStudy(){

studyOnly.forEach(el=>{
el.style.display="block";
});

studyBtn.classList.add("active");
genbaBtn.classList.remove("active");

studyBtn.classList.remove("normal");
genbaBtn.classList.add("normal");

}

genbaBtn.addEventListener(
"click",
setGenba
);

studyBtn.addEventListener(
"click",
setStudy
);

setGenba();

/* ページ切替 */

const menuPage =
document.getElementById("menuPage");

const pages =
document.querySelectorAll(".page");

document
.querySelectorAll(".menuCard")
.forEach(card=>{

card.addEventListener(
"click",
()=>{

const pageId =
card.dataset.page;

menuPage.style.display =
"none";

pages.forEach(page=>{
page.style.display =
"none";
});

document.getElementById(pageId)
.style.display =
"block";

});

});

document
.querySelectorAll(".backBtn")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

pages.forEach(page=>{
page.style.display =
"none";
});

menuPage.style.display =
"block";

/* 入力リセット */

document
.querySelectorAll("input")
.forEach(input=>{

input.value = "";

});

/* 摩擦損失 */

document.getElementById("hose65Result")
.innerText =
"0.000 MPa";

document.getElementById("hose50Result")
.innerText =
"0.000 MPa";

document.getElementById("hose40Result")
.innerText =
"0.000 MPa";

document.getElementById("totalLoss")
.innerText =
"0.000 MPa";

/* 放水反動力 */

document.getElementById("reactionResult")
.innerText =
"0 N";

document.getElementById("reactionNotice")
.innerText =
"1人保持可能";

/* 放水量 */

document.getElementById("flowResult")
.innerText =
"0.000 ㎥/min";

/* 吸水高さ */

document.getElementById("heightResult")
.innerText =
"0.0 m";

document.getElementById("suctionFlowResult")
.innerText =
"0 L/min";

/* 消火栓能力 */

document.getElementById("hydrantResult")
.innerText =
"0 L/min";

document.getElementById("hydrantNotice")
.innerText =
"入力待機中";

/* セレクト初期化 */

document.getElementById("reactionType")
.value = "quadra";

document.getElementById("flowType")
.value = "quadra";

document.getElementById("pipeType")
.value = "single";

/* 表示更新 */

toggleReaction();

toggleFlow();

});

});

/* 摩擦損失 */

function calcLoss(){

const hoseData = [

{
count:"hose65Count",
flow:"hose65Flow",
result:"hose65Result",
k:0.137
},

{
count:"hose50Count",
flow:"hose50Flow",
result:"hose50Result",
k:0.365
},

{
count:"hose40Count",
flow:"hose40Flow",
result:"hose40Result",
k:1.569
}

];

let total = 0;

hoseData.forEach(data=>{

const n =
parseFloat(
document.getElementById(data.count).value
) || 0;

const q =
parseFloat(
document.getElementById(data.flow).value
) || 0;

const result =
data.k * n * q * q;

document.getElementById(data.result)
.innerText =
result.toFixed(3)+" MPa";

total += result;

});

document.getElementById("totalLoss")
.innerText =
total.toFixed(3)+" MPa";

}

[
"hose65Count",
"hose65Flow",
"hose50Count",
"hose50Flow",
"hose40Count",
"hose40Flow"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcLoss
);

});

/* 放水反動力 */

function toggleReaction(){

const type =
document.getElementById("reactionType").value;

if(type==="quadra"){

document.getElementById("reactionQuadra")
.classList.remove("hidden");

document.getElementById("reactionPipe")
.classList.add("hidden");

}else{

document.getElementById("reactionQuadra")
.classList.add("hidden");

document.getElementById("reactionPipe")
.classList.remove("hidden");

}

}

document.getElementById("reactionType")
.addEventListener(
"change",
toggleReaction
);

toggleReaction();

function calcReaction(){

let d = 0;

const type =
document.getElementById("reactionType").value;

if(type==="quadra"){

d =
parseFloat(
document.getElementById("reactionQuadraSelect").value
) || 0;

}else{

d =
parseFloat(
document.getElementById("reactionPipeDiameter").value
) || 0;

}

const p =
parseFloat(
document.getElementById("reactionPressure").value
) || 0;

const result =
150 * d * d * p;

document.getElementById("reactionResult")
.innerText =
result.toFixed(0)+" N";

if(result >= 200){

document.getElementById("reactionNotice")
.innerText =
"可能であれば2人保持してください";

}else{

document.getElementById("reactionNotice")
.innerText =
"1人保持可能";

}

}

[
"reactionQuadraSelect",
"reactionPipeDiameter",
"reactionPressure"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcReaction
);

});

/* 放水量 */

function toggleFlow(){

const type =
document.getElementById("flowType").value;

if(type==="quadra"){

document.getElementById("flowQuadra")
.classList.remove("hidden");

document.getElementById("flowPipe")
.classList.add("hidden");

}else{

document.getElementById("flowQuadra")
.classList.add("hidden");

document.getElementById("flowPipe")
.classList.remove("hidden");

}

}

document.getElementById("flowType")
.addEventListener(
"change",
toggleFlow
);

toggleFlow();

function calcFlow(){

let d = 0;

const type =
document.getElementById("flowType").value;

if(type==="quadra"){

d =
parseFloat(
document.getElementById("flowQuadraSelect").value
) || 0;

}else{

d =
parseFloat(
document.getElementById("flowPipeDiameter").value
) || 0;

}

const p =
parseFloat(
document.getElementById("flowPressure").value
) || 0;

const result =
0.2085 * d * d * Math.sqrt(p);

document.getElementById("flowResult")
.innerText =
result.toFixed(3)+" ㎥/min";

}

[
"flowQuadraSelect",
"flowPipeDiameter",
"flowPressure"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcFlow
);

});

/* 吸水高さ */

function interpolate(height, points){

for(let i=0;i<points.length-1;i++){

const p1 = points[i];
const p2 = points[i+1];

if(height >= p1.h && height <= p2.h){

const ratio =
(height - p1.h) /
(p2.h - p1.h);

return Math.round(
p1.q +
(p2.q - p1.q) * ratio
);

}

}

return 0;

}

function calcSuction(){

const p =
parseFloat(
document.getElementById("vacuumInput").value
) || 0;

const pipeType =
document.getElementById("pipeType").value;

const rawHeight =
102 * p;

const height =
Math.round(rawHeight * 10) / 10;

document.getElementById("heightResult")
.innerText =
height.toFixed(1)+" m";

if(height > 7){

document.getElementById("suctionFlowResult")
.innerText =
"0 L/min";

return;

}

const singleData = [

{h:0,q:1620},
{h:1,q:1580},
{h:2,q:1480},
{h:3,q:1380},
{h:4,q:1250},
{h:5,q:1110},
{h:6,q:800},
{h:7,q:300}

];

let flow = interpolate(
height,
singleData
);

document.getElementById("suctionFlowResult")
.innerText =
flow + " L/min";

}

[
"vacuumInput",
"pipeType"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcSuction
);

});

/* 消火栓能力 */

function calcHydrant(){

const p =
parseFloat(
document.getElementById("staticPressure").value
) || 0;

const p1 =
parseFloat(
document.getElementById("dynamicPressure").value
) || 0;

const c =
parseFloat(
document.getElementById("baseFlow").value
) || 0;

if(p1 >= p){

document.getElementById("hydrantResult")
.innerText =
"---";

document.getElementById("hydrantNotice")
.innerText =
"正しく入力してください";

return;

}

const q =
c *
Math.pow(
p / (p - p1),
0.54
);

document.getElementById("hydrantResult")
.innerText =
Math.round(q) + " L/min";

document.getElementById("hydrantNotice")
.innerText =
"計算完了";

}

[
"staticPressure",
"dynamicPressure",
"baseFlow"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcHydrant
);

});

});

/*
if("serviceWorker" in navigator){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker.register(
"./service-worker.js"
);

}
);

}
*/