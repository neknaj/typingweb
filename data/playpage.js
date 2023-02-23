class Play {
    constructor(filedata) {
        this.nowpause = false;
        this.keyb = new Keyboard();
        this.Display = new Display();
        this.Display.update();
        this.start();
    }
    read_file() {
        this.ranss = [""];
    }
    start() {
        this.Display.texts.q_l1 = "Start";
        this.Display.texts.q_l2 = "スペースを押して開始";
        this.Display.update();
    }
}

class QAFileData {
    constructor () {
    }
}

class Display {
    constructor() {
        this.texts = {
            title: "",
            timer: "",
            q_l1: "",
            q_l2: "",
            answer: "",
        }
        this.colors = {
            background: "rgb(250,250,250)",
            title: "rgb(0,0,0)",
        }
        this.cv = document.getElementById("Display");
        this.cv.height = 500;
        this.cv.width = 600;
        this.c = this.cv.getContext("2d");
        this.c.font = '48px serif';
    }
    update() {
        this.c.fillStyle = this.colors.background;
        this.c.fillRect(0,0,this.cv.width,this.cv.height);
        console.log("clear");
        let y = 0;
        for (let text of Object.keys(this.texts)) {
            this.c.fillStyle = this.colors.title;
            let wrap = [];
            let tw = this.c.measureText(this.texts[text]).width;
            if (tw>this.cv.width+ 20) {
                let st = 0;
                for (let i=0;i<this.texts[text].length;i++) {
                    if (this.cv.width<this.c.measureText(this.texts[text].slice(st,i)).width+ 20) {
                        wrap.push(this.texts[text].slice(st,i-1));
                        st = i-1;
                    }
                }
                if (this.texts[text].slice(st).length>0) {
                    wrap.push(this.texts[text].slice(st));
                }
            }
            else {
                wrap.push(this.texts[text]);
            }
            for (let t of wrap) {
                console.log(wrap);
                y += 48;
                this.c.fillText(t, Math.floor(this.cv.width/2-this.c.measureText(t).width/2), y);
            }
            y += 10;
        }
    }
}
class Keyboard {
    constructor(path) {
        this.load();
    }
    async load() {
        let file = await fetch(`/japanese.ntkd`, {
            method: "GET",headers: {"Catch-Control": "max-age=3600"}
        });
        this.fdata = await file.text();
        this.parse();
    }
    parse() {
        let lines = this.fdata.replace(/\r/g,"").split("\n");
        for (let char of lines) {
            if (char[0]=="#") {
                continue;
            }
            let spl = char.split(">");
            let tchar = spl[0];
            let keys = spl[1].split("&");
            console.log(tchar,keys)
        }
    }
}