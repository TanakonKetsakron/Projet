const http = require('http');
const host = 'localhost';/* localhost */
const port = 8000; /*พอตที่เราใช้ */ 

const requireListener = function (req ,res){
    res.writeHead(200);
    res.end("My first server!");
}

const servere2 = http.createServer(requireListener);
servere2.listen(port,host,() => {
    console.log(`Server is running on http://${host}:${port}`);
});
