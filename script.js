let mode = "html";

let htmlCode = "";
let cssCode = "";
let jsCode = "";

const codeArea = document.getElementById("codeArea");
const result = document.getElementById("result");
const errorBox = document.getElementById("errorBox");

function setMode(type){

mode = type;

if(type === "html"){
codeArea.value = htmlCode;
}

if(type === "css"){
codeArea.value = cssCode;
}

if(type === "js"){
codeArea.value = jsCode;
}

}

function updatePreview(){

let code = codeArea.value;

if(mode === "html"){
htmlCode = code;
}

if(mode === "css"){
cssCode = code;
}

if(mode === "js"){
jsCode = code;
}

let finalCode = `
<!DOCTYPE html>
<html>
<head>
<style>
${cssCode}
</style>
</head>

<body>

${htmlCode}

<script>
${jsCode}
<\/script>

</body>
</html>
`;

result.srcdoc = finalCode;

}

function newProject(){

if(confirm("Create new project?")){

htmlCode = "";
cssCode = "";
jsCode = "";

codeArea.value = "";
result.srcdoc = "";

}

}

function saveProject(){

localStorage.setItem("htmlCode", htmlCode);
localStorage.setItem("cssCode", cssCode);
localStorage.setItem("jsCode", jsCode);

alert("Project Saved");

}

function exportProject(){

let file = `
<!DOCTYPE html>
<html>
<head>
<style>
${cssCode}
</style>
</head>

<body>

${htmlCode}

<script>
${jsCode}
<\/script>

</body>
</html>
`;

let blob = new Blob([file], {type:"text/html"});

let a = document.createElement("a");

a.href = URL.createObjectURL(blob);
a.download = "myApp.html";
a.click();

}

function dragDrop(){

alert("Drag & Drop Builder Coming Soon");

}

function settings(){

alert("Settings Panel Coming Soon");

}

window.onload = function(){

let savedHTML = localStorage.getItem("htmlCode");
let savedCSS = localStorage.getItem("cssCode");
let savedJS = localStorage.getItem("jsCode");

if(savedHTML){
htmlCode = savedHTML;
cssCode = savedCSS;
jsCode = savedJS;

codeArea.value = htmlCode;

updatePreview();
}

}`

let blob=new Blob([file],{type:"text/html"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="app.html"

a.click()

}

function settings(){

alert("Settings panel coming soon")

}

function dragDrop(){

alert("Drag & Drop Builder Coming Soon")

}
