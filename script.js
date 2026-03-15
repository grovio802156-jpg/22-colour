let mode="html"

let htmlCode=""
let cssCode=""
let jsCode=""

function setMode(type){

mode=type

if(type=="html") codeArea.value=htmlCode
if(type=="css") codeArea.value=cssCode
if(type=="js") codeArea.value=jsCode

}

function updatePreview(){

let code=codeArea.value

if(mode=="html") htmlCode=code
if(mode=="css") cssCode=code
if(mode=="js") jsCode=code

let finalCode=`

<html>

<style>${cssCode}</style>

<body>

${htmlCode}

<script>${jsCode}<\/script>

</body>

</html>

`

result.srcdoc=finalCode

checkError()

}

function checkError(){

let text=codeArea.value

let errors=[]

if(text.includes("console.error")){

errors.push("Console error detected")

}

errorBox.innerHTML=errors.join("<br>")

}

function newProject(){

if(confirm("Start new project?")){

htmlCode=""
cssCode=""
jsCode=""
codeArea.value=""
result.srcdoc=""

}

}

function saveProject(){

localStorage.setItem("html",htmlCode)
localStorage.setItem("css",cssCode)
localStorage.setItem("js",jsCode)

alert("Project Saved")

}

function exportProject(){

let file=`

<!DOCTYPE html>
<html>
<style>${cssCode}</style>
<body>

${htmlCode}

<script>${jsCode}<\/script>

</body>
</html>

`

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
