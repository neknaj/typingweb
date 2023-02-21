qa_paths = "testqa/sample.ntd\ntestqa/sample2.ntd";

qa_list = qa_paths.split("\n");
for (m=0;m<qa_list.length;m++){
    buttonelm = document.createElement("button");
    buttonelm.innerHTML = qa_list[m];
    buttonelm.setAttribute("onclick",`window.top.send("playpage.html?file=${qa_list[m]}")`);
    buttonelm.className = "menu_button";
    lielm = document.createElement("li");
    lielm.appendChild(buttonelm);
    lielm.className = "menu_li";
    document.getElementById("menu").appendChild(lielm);
}