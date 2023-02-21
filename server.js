// bem130

const http = require("http");

const fs = require('fs');
const url = require('url');
const port1 = 8000;

http.createServer(server_request).listen(port1);

let mime = {
    "txt":"text/plain; charset=UTF-8",
    "html":"text/html; charset=UTF-8",
    "css":"text/css; charset=UTF-8",
    "nml":"text/neknajml; charset=UTF-8",
    "js":"text/javascript",
    "png":"image/png",
    "jpg":"image/jpeg",
    "jpeg":"image/jpeg",
    "gif":"image/gif",
};

function server_request(req, response) {
    let head = {code:200,type:"text/plain; charset=UTF-8",filetype:"txt"};
    let res = "";

    //
    // transfer
    //
        let reqparse = url.parse(req.url);
        let requrl = req.url;
        switch (reqparse.pathname) {
            case "/404":
            case "/404.html":
                head.code = 404;
            break;
            case "/": // top page
                reqparse.pathname = "/index.html";
            break;
        }
    //
    // end
    //

    //
    // get file
    //
    if (fs.existsSync("data"+reqparse.pathname)) {
        res = fs.readFileSync("data"+reqparse.pathname);
    }
    else if (fs.existsSync("data"+reqparse.pathname+".html")) {
        res = fs.readFileSync("data"+reqparse.pathname+".html");
        reqparse.pathname += ".html";
    }
    else {
        res = fs.readFileSync("data/404.html");
        reqparse.pathname += ".html";
        head.code = 404;
    }
//
// end
//

//
// set MIME
//
    let fnsplit = reqparse.pathname.split(".");
    head.filetype = fnsplit[fnsplit.length-1];
    if (mime[head.filetype]!=null) {
        head.type = mime[head.filetype];
    }
//
// end
//

//
// replace dynamic infos
//
    if (head.filetype=="html") {
        res = (new TextDecoder("utf-8")).decode(new Uint8Array(res));
        res = res.replace(/\[\*accesstime\]/g,(new Date()).toLocaleString());
    }
//
// end
//

//
// response
//
    // Access
    response.setHeader('Access-Control-Allow-Origin', '*');
    // data
    response.writeHead(head.code, {"Content-Type": head.type});
    response.end(res);
//
// end
//

//
// push log
//

   // console.log(req.rawHeaders[3])
   let log = `\x1b[33m${(new Date()).toLocaleString()}\x1b[39m  requrl: \x1b[34m${req.url}\x1b[39m path: \x1b[34m${reqparse.path}\x1b[39m response: \x1b[36m${head.code}\x1b[39m res: \x1b[35m${reqparse.pathname}\x1b[39m\nUA: \x1b[34m${req.rawHeaders} \x1b[39m\n`
    console.log(log);
    //fs.appendFile("./serverlog.log", log,()=>{});
//
// end
//
}

console.log(`The server has started: ${port1}`);