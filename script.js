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

document.getElementById("reactionQuadra")
.classList.add("hidden");

document.getElementById("reactionGforce")
.classList.add("hidden");

document.getElementById("reactionPipe")
.classList.add("hidden");

if(type==="quadra"){

document.getElementById("reactionQuadra")
.classList.remove("hidden");

}else if(type==="gforce"){

document.getElementById("reactionGforce")
.classList.remove("hidden");

}else{

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

}else if(type==="gforce"){

d =
parseFloat(
document.getElementById("reactionGforceSelect").value
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

if(result <= 200){

document.getElementById("reactionNotice")
.innerText =
"1人保持可能";

}else if(result < 300){

document.getElementById("reactionNotice")
.innerText =
"2人保持推奨";

}else{

document.getElementById("reactionNotice")
.innerText =
"2人以上で保持してください";

}

}

[
"reactionQuadraSelect",
"reactionGforceSelect",
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

document.getElementById("flowQuadra")
.classList.add("hidden");

document.getElementById("flowGforce")
.classList.add("hidden");

document.getElementById("flowPipe")
.classList.add("hidden");

if(type==="quadra"){

document.getElementById("flowQuadra")
.classList.remove("hidden");

}else if(type==="gforce"){

document.getElementById("flowGforce")
.classList.remove("hidden");

}else{

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

}else if(type==="gforce"){

d =
parseFloat(
document.getElementById("flowGforceSelect").value
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
"flowGforceSelect",
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

const mode =

document.getElementById(
"vacuumArea"
).style.display
!== "none"

?

"vacuum"

:

"height";

const p =
parseFloat(
document.getElementById("vacuumInput").value
) || 0;

const pipeType =
document.getElementById("pipeType").value;

let height;

if(mode==="vacuum"){

const rawHeight =
102 * p;

height =
Math.round(rawHeight * 10) / 10;

}else{

height =
parseFloat(
document.getElementById("heightInput").value
) || 0;

}

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

const seriesData = [

{h:0,q:1280},
{h:1,q:1250},
{h:2,q:1200},
{h:3,q:1130},
{h:4,q:1030},
{h:5,q:700},
{h:6,q:280},
{h:7,q:0}

];

const parallelData = [

{h:0,q:2630},
{h:1,q:2620},
{h:2,q:2580},
{h:3,q:2480},
{h:4,q:2350},
{h:5,q:2140},
{h:6,q:1810},
{h:7,q:1330}

];

let selectedData;

if(pipeType === "single"){

selectedData = singleData;

}else if(pipeType === "series"){

selectedData = seriesData;

}else if(pipeType === "parallel"){

selectedData = parallelData;

}

let flow = interpolate(
height,
selectedData
);

document.getElementById("suctionFlowResult")
.innerText =
flow + " L/min";

}

[
"vacuumInput",
"heightInput",
"pipeType"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcSuction
);

});

const vacuumTab =
document.getElementById(
"vacuumTab"
);

const heightTab =
document.getElementById(
"heightTab"
);

vacuumTab.addEventListener(
"click",
()=>{

document.getElementById(
"vacuumArea"
).style.display =
"block";

document.getElementById(
"heightArea"
).style.display =
"none";

vacuumTab.classList.add(
"activeTab"
);

heightTab.classList.remove(
"activeTab"
);

calcSuction();

}
);

heightTab.addEventListener(
"click",
()=>{

document.getElementById(
"vacuumArea"
).style.display =
"none";

document.getElementById(
"heightArea"
).style.display =
"block";

heightTab.classList.add(
"activeTab"
);

vacuumTab.classList.remove(
"activeTab"
);

calcSuction();

}
);

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

/* 消火薬剤運用計算 */

const chemicalTab =
document.getElementById(
"chemicalTab"
);

const cafsTab =
document.getElementById(
"cafsTab"
);

function setFoamMode(mode){

const ratio =
document.getElementById(
"foamRatio"
);

ratio.innerHTML = "";

if(mode==="chemical"){

ratio.innerHTML = `
<option value="0.03">
3%
</option>

<option value="0.06">
6%
</option>
`;

chemicalTab.classList.add(
"activeTab"
);

cafsTab.classList.remove(
"activeTab"
);

}else{

for(
let i=0.3;
i<=1.0;
i+=0.1
){

ratio.innerHTML += `
<option value="${(i/100).toFixed(3)}">
${i.toFixed(1)}%
</option>
`;

}

cafsTab.classList.add(
"activeTab"
);

chemicalTab.classList.remove(
"activeTab"
);

}

calcFoam();

}

chemicalTab.addEventListener(
"click",
()=>setFoamMode(
"chemical"
)
);

cafsTab.addEventListener(
"click",
()=>setFoamMode(
"cafs"
)
);

setFoamMode(
"chemical"
);

function calcFoam(){

const remain =
parseFloat(
document.getElementById(
"foamRemain"
).value
) || 0;

const flow =
parseFloat(
document.getElementById(
"foamFlow"
).value
) || 0;

const ratio =
parseFloat(
document.getElementById(
"foamRatio"
).value
) || 0;

/* 薬剤使用量 */

const use =
flow * ratio;

document.getElementById(
"foamUse"
).innerText =
use.toFixed(2)
+ " L/min";

/* 放射可能時間 */

if(use <= 0){

document.getElementById(
"foamTime"
).innerText =
"0分00秒";

return;

}

const totalSec =
remain / use * 60;

const min =
Math.floor(
totalSec / 60
);

const sec =
Math.floor(
totalSec % 60
);

document.getElementById(
"foamTime"
).innerText =

min + "分"
+ String(sec)
.padStart(2,"0")
+ "秒";

}

[
"foamRemain",
"foamFlow",
"foamRatio"
].forEach(id=>{

document.getElementById(id)
.addEventListener(
"input",
calcFoam
);

document.getElementById(id)
.addEventListener(
"change",
calcFoam
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