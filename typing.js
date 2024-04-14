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
        if (name.length!=1) {return false;}
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
                        if (this.iscorrect[this.cursor]==1) {
                            this.iscorrect[this.cursor] = 3;
                        }
                        this.cursor+=x[0].length;
                        this.pending = [];
                        this.expect = this.lookupKBD();
                    }
                }
            })
        })
        console.log(f,this.pending,this.expect)
        if (!f) {
            this.iscorrect[this.cursor] = 2;
        }
        return f;
    }
    getQuesView() {
        let queselm = elm("span",{},[]);
        this.ques.forEach((x,i)=>{
            let span;
            console.log(x)
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
                    console.log(rbs)
                    let f = 0;
                    if (rbs[0]==0||rbs[rbs.length-1]==1) {f=0;}
                    else if (rbs[rbs.length-1]==0) {f=1;}
                    else {
                        f = 3;
                        for (let i of rbs) {
                            if (i==2) {f=2;}
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
                console.log(x[0])
                let stat = this.iscorrect[this.qklocIndex([i])];
                span = elm("span",{class:`noruby s${stat}`},[textelm(x[0])]);
            }
            queselm.appendChild(span)
        })
        console.log(this.cursor)
        return queselm;
    }
}