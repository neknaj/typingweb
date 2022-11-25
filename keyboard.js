class Keyboard {
    keycodes_to_string(keycodes) {
        let dic = this.keyname();
        let rtt = "";
        for (let keycode of keycodes) {
            if (dic[Math.abs(keycode)]!=null) {
                if (keycode>0) {
                    rtt += dic[keycode];
                }
                else {
                    rtt += dic[-keycode].toUpperCase();
                }
            }
        }
        return rtt;
    }
    s_sort(strl) {
        let rtl = [];
        let li = 0;
        for (let tm of strl) {
            if (tm.length>li) {
                li = tm.length;
            }
        }
        this.smax = li;
        let nic = 0;
        while (li>=0) {
            for (let tm of strl) {
                if (tm.length==li) {
                    rtl[nic] = tm;
                    nic++;
                }
            }
            li--;
        }
        return rtl;
    }
    keyname() {
        return {
            44:"a",
            45:"b",
            46:"c",
            47:"d",
            48:"e",
            49:"f",
            50:"g",
            51:"h",
            52:"i",
            53:"j",
            54:"k",
            55:"l",
            56:"m",
            57:"n",
            58:"o",
            59:"p",
            60:"q",
            61:"r",
            62:"s",
            63:"t",
            64:"u",
            65:"v",
            66:"w",
            67:"x",
            68:"y",
            69:"z",
        }
    }
    passim(keycode) {
        let rt = [];
        this.ckeyskeys = Object.keys(this.ckeys)
        for (let i=0;i<this.ckeys.length;i++) {
            let ch = ckeys[this.ckeyskeys[i]];
            for (let ck of ch) {
                for (let cka of ck) {
                    if (rt[Math.abs(cka)]==null) {
                        rt.push(Math.abs(cka));
                    }
                }
            }
        }
    }
    setcparts() {
        this.ckeys = this.cparts();
        this.ckeyskeys = Object.keys(this.ckeys)
        this.ckeyskeys = this.s_sort(this.ckeyskeys)
    }
    cparts(file)
    {
        let rtd = {};

        if (file == null)
        {
            return this._cparts();
        }

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function () {

            console.log(reader.result)

            let filelines = reader.result.replace("\r","").split("\n");

            console.log(filelines)

            for (let p=0;p<filelines.length;p++) {

                let fileline = filelines[p]

                if (fileline.startsWith("[comment]")) //コメント行の場合
                {
                }
                else if (fileline.startsWith("[comments]")) //複数コメント行の場合
                {
                    do
                    {
                        p++
                        fileline = filelines[p]
                    }
                    while (fileline.startsWith("[/comments]") == false && p<filelines.length);
                }
                else //通常行の場合
                {
                    //Debug.Print(fileline);
                    let c_p = fileline.split(':');
                    //Debug.Print(String.Join(",", c_p));
                    let props = c_p[1].split(';');
                    //Debug.Print(String.Join(" ; ", props));
    
                    let il;
                    let ilc = 0;
                    il = new Array(props.length);
                    for (let ifl=0;ifl<props.length;ifl++) {
                        let prop = props[ifl];
                        let spp = prop.split(',');
    
                        let i = new Array(spp.length);
                        let ic = 0;
                            
                        for (let j=0;j<spp.length;j++) {
                            let s = spp[j];
                            i[ic] = Number(s);
                            ic++;
                        }
                        il[ilc] = i;
                        ilc++;
                    }
                    console.log(c_p[0])
                    rtd[c_p[0]] = il;
                }
            }
            console.log(rtd)
            return rtd
        }
    }
    
    _cparts()
    {
        return {
            "a":[44],
            "b":[45],
            "c":[46],
            "d":[47],
            "e":[48],
            "f":[49],
            "g":[50],
            "h":[51],
            "i":[52],
            "j":[53],
            "k":[54],
            "l":[55],
            "m":[56],
            "n":[57],
            "o":[58],
            "p":[59],
            "q":[60],
            "r":[61],
            "s":[62],
            "t":[63],
            "u":[64],
            "v":[65],
            "w":[66],
            "x":[67],
            "y":[68],
            "z":[69],
            "A":[-44],
            "B":[-45],
            "C":[-46],
            "D":[-47],
            "E":[-48],
            "F":[-49],
            "G":[-50],
            "H":[-51],
            "I":[-52],
            "J":[-53],
            "K":[-54],
            "L":[-55],
            "M":[-56],
            "N":[-57],
            "O":[-58],
            "P":[-59],
            "Q":[-60],
            "R":[-61],
            "S":[-62],
            "T":[-63],
            "U":[-64],
            "V":[-65],
            "W":[-66],
            "X":[-67],
            "Y":[-68],
            "Z":[-69],
            ":":[142],
            ".":[144],
            "0":[34],
            "1":[35],
            "2":[36],
            "3":[37],
            "4":[38],
            "5":[39],
            "6":[40],
            "7":[41],
            "8":[42],
            "9":[43],
        }
    }
}