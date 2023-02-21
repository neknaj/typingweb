class PlayPage {
    constructor(filedata) {
        this.nowpause = false;
        this.keyb = new Keyboard();
        this.keyb.setcparts();
        this.ckeys = this.keyb.ckeys;
        this.ckeyskeys = this.keyb.ckeyskeys;
        this.keylist = this.keyb.keyname();
        this.smax = this.keyb.smax;
        this.bftkey = 0;
        this.keyf = 0;
    }
    read_file() {
        this.ranss = [""];
    }
}

class QAFileData {
    constructor () {
    }
}