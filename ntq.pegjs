start = main

main = e:(kana/ruby)* {return e}

kana = c:char {return [[c],null]}
ruby = "(" m:comma "/" k:comma ")" {return [k,m]}

comma = k:char* {return k.join("").split(",")}

//char = c:("\\("/"\\/"/"\\)"/"\\,"/[^/\(\)]) {return c}
char = c:("\\(") {return "("}
        / c:("\\/") {return "/"}
        / c:("\\)") {return ")"}
        / c:("\\,") {return ","}
        / c:([^/\(\)]) {return c}