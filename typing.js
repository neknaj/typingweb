// depend on https://github.com/neknaj/cDom
class Typing {
    constructor(ques,keyboard) {
        this.ques = ques;
        this.qkana = [];
        this.qkloc = [];
        ques.forEach((x,i)=>{x[0].forEach((y,j)=>{y.split("").forEach((z,k)=>{this.qkana.push(z);this.qkloc.push([i,j,k]);})})},this);
        this.iscorrect = new Array(this.qkana.length).fill(0);
        this.kbd = keyboard;
        this.pending = [];
        this.cursor = 0;
        this.beforfailure = "";
        console.log(ques);
        this.expect = this.lookupKBD();
    }
    lookupKBD() {
        let keys = Object.keys(this.kbd);
        let ks = keys.filter((x)=>{
            let f = true;
            x.split("").forEach((x,i)=>{
                if (this.qkana[this.cursor+i]!=x) {
                    f = false;
                }
                else {
                }
                return f;
            })
            return f;
        })
        console.log(ks)
        let res = [];
        for (let i of ks) {
            res.push([i,this.kbd[i].map((x)=>{return x.split("")})]);
        }
        console.log(res)
        return res;
    }
    qklocIndex(q) {
        for (let e in this.qkloc) {
            let f = true;
            for (let i=0;i<q.length;i++) {
                if (this.qkloc[e][i]!=q[i]) f = false;
            }
            if (f) {return Number(e);}
        }
        return false;
    }
    key(name) { // キー入力を受け付けて処理
        if (this.iscorrect[this.cursor]==0) {
            this.iscorrect[this.cursor] = 1;
        }
        let f = false;
        let confirm = false;
        if (name.length!=1) {return [false,false];}
        this.expect.forEach((x)=>{
            x[1].forEach((exp)=>{
                if (f) {return false;}
                for (let i in this.pending) {
                    if (exp[i]!=this.pending[i]) {
                        return false;
                    }
                }
                if (exp[this.pending.length]==name) {
                    f = true;
                    confirm = exp.length==this.pending.length+1;
                    this.pending.push(name);
                    if (confirm) { // next
                        console.log("confirm")
                        console.log(this.pending)
                        console.log(this.expect,x[0],x[0].length)
                        if (this.iscorrect[this.cursor]==1) {
                            for (let i=0;i<x[0].length;i++) {
                                this.iscorrect[this.cursor+i] = 3;
                            }
                        }
                        if (this.iscorrect[this.cursor]==2) {
                            for (let i=0;i<x[0].length;i++) {
                                this.iscorrect[this.cursor+i] = 4;
                            }
                        }
                        this.cursor+=x[0].length;
                        this.pending = [];
                        this.expect = this.lookupKBD();
                    }
                }
            })
        })
        console.log(f,this.pending,this.expect)
        this.beforfailure = "";
        if (!f) {
            this.iscorrect[this.cursor] = 2;
            this.beforfailure = name;
        }
        return [f,this.cursor==this.qkana.length];
    }
    getQuesView() {
        let queselm = elm("span",{},[]);
        this.ques.forEach((x,i)=>{
            let span;
            if (x[1]!=null) {
                let c = [];
                x[1].forEach((y,j)=>{
                    let ct = [];
                    let rbs = []
                    x[0][j].split("").forEach((z,k)=>{
                        let stat = this.iscorrect[this.qklocIndex([i,j,k])];
                        rbs.push(stat);
                        ct.push(elm("span",{class:`s${stat}`},[textelm(x[0][j][k])]));
                    })
                    let f = 0;
                    if (rbs[0]==0||rbs[rbs.length-1]==1||rbs[rbs.length-1]==2) {f=0;}
                    else if (rbs[rbs.length-1]==0) {f=1;}
                    else {
                        f = 3;
                        for (let i of rbs) {
                            if (i==4) {f=4;}
                        }
                    }
                    c.push(
                        elm("rb",{class:`s${f}`},[textelm(x[1][j])]),
                        elm("rt",{},ct),
                    )
                })
                span = elm("ruby",{},c);
            }
            else {
                let stat = this.iscorrect[this.qklocIndex([i])];
                span = elm("span",{class:`noruby s${stat}`},[textelm(x[0].join(""))]);
            }
            queselm.appendChild(span)
        })
        return queselm;
    }
    getInputView() {
        let queselm = elm("span",{},[]);
        this.ques.forEach((x,i)=>{
            if (x[1]!=null) {
                let c = [];
                x[1].forEach((y,j)=>{
                    let ct = [];
                    let rbs = []
                    x[0][j].split("").forEach((z,k)=>{
                        let stat = this.iscorrect[this.qklocIndex([i,j,k])];
                        rbs.push(stat);
                        if (stat==3||stat==4) {
                            ct.push(elm("span",{class:`input s${stat}`},[textelm(x[0][j][k])]));
                        }
                    })
                    let f = 0;
                    if (rbs[0]==0||rbs[rbs.length-1]==1||rbs[rbs.length-1]==2) {f=0;}
                    else if (rbs[rbs.length-1]==0) {f=1;}
                    else {
                        f = 3;
                        for (let i of rbs) {
                            if (i==4) {f=4;}
                        }
                    }
                    if (f==3||f==4) { // 漢字が決定
                        c.push(elm("span",{class:`input s${f}`},[textelm(x[1][j])]));
                    }
                    else { // 漢字になってない
                        c.push(...ct);
                    }
                })
                for (let i of c) {
                    queselm.appendChild(i)
                }
            }
            else {
                let stat = this.iscorrect[this.qklocIndex([i])];
                if (stat==3||stat==4) {
                    queselm.appendChild(elm("span",{class:`input s${stat}`},[textelm(x[0].join(""))]));
                }
            }
        })
        queselm.appendChild(elm("span",{class:`input s${0}`},[textelm(this.pending.join(""))]));
        queselm.appendChild(elm("span",{class:`input s${4}`},[textelm(this.beforfailure)]));
        return queselm;
    }
}