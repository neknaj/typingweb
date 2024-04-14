function resizer_Vcontainer_addEL (container,framesMin,callback=()=>{}) {
    container.querySelector(":scope > .resizer_splitter").addEventListener("pointerdown",(e)=>{
        let resizer = container.querySelector(":scope > .resizer_splitter").getBoundingClientRect();
        let resizerW = resizer.bottom - resizer.top;
        let resize = (e)=>{
            let containerRect = container.getBoundingClientRect();
            let y = ((n,min,max)=>{if (n<min) {n=min}else if (n>max) {n=max};return n;})(e.y-containerRect.y,framesMin,containerRect.height-resizerW-framesMin);
            container.querySelectorAll(":scope > .resizer_content")[0].style.flexBasis = `${y}%`;
            container.querySelectorAll(":scope > .resizer_content")[1].style.flexBasis = `${containerRect.height-resizerW-y}%`;
            callback();
        }
        document.addEventListener("pointermove",resize,false);
        document.addEventListener("pointerup",()=>{document.removeEventListener("pointermove",resize,false);},false);
        e.target.setPointerCapture(e.pointerId);
    });
    let p = container.dataset["proportion"].split(":").map((x)=>{return Number(x);});
    container.querySelectorAll(":scope > .resizer_content")[0].style.flexBasis = `${(p[0]*100/(p[0]+p[1]))}%`;
    container.querySelectorAll(":scope > .resizer_content")[1].style.flexBasis = `${(p[1]*100/(p[0]+p[1]))}%`;
}
function resizer_Hcontainer_addEL (container,framesMin,callback=()=>{}) {
    container.querySelector(":scope > .resizer_splitter").addEventListener("pointerdown",(e)=>{
        let resizer = container.querySelector(":scope > .resizer_splitter").getBoundingClientRect();
        let resizerW = resizer.right - resizer.left;
        let resize = (e)=>{
            let containerRect = container.getBoundingClientRect();
            let x = ((n,min,max)=>{if (n<min) {n=min}else if (n>max) {n=max};return n;})(e.x-containerRect.x,framesMin,containerRect.width-resizerW-framesMin);
            container.querySelectorAll(":scope > .resizer_content")[0].style.flexBasis = `${x}%`;
            container.querySelectorAll(":scope > .resizer_content")[1].style.flexBasis = `${containerRect.width-resizerW-x}%`;
            callback();
        }
        document.addEventListener("pointermove",resize,false);
        document.addEventListener("pointerup",()=>{document.removeEventListener("pointermove",resize,false);},false);
        e.target.setPointerCapture(e.pointerId);
    });
    let p = container.dataset["proportion"].split(":").map((x)=>{return Number(x);});
    container.querySelectorAll(":scope > .resizer_content")[0].style.flexBasis = `${(p[0]*100/(p[0]+p[1]))}%`;
    container.querySelectorAll(":scope > .resizer_content")[1].style.flexBasis = `${(p[1]*100/(p[0]+p[1]))}%`;
}
window.addEventListener("load",()=>{
    document.querySelectorAll(".resizer_Vcontainer").forEach((x)=>{resizer_Vcontainer_addEL(x,100);});
    document.querySelectorAll(".resizer_Hcontainer").forEach((x)=>{resizer_Hcontainer_addEL(x,100);});
})