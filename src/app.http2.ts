import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
},(req, res) => {
console.log(req.url); 

//res.writeHead(200, {'Content-Type': 'text/html'});
//res.write(`<h1>URL ${req.url}</h1>`);
//res.end();

//const data = { name: 'John Doe', age: 30, city: 'New York' };
//res.writeHead(200, {'Content-Type': 'application/json'});
//res.end(JSON.stringify(data));
if(req.url === '/'){
    const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});  
    res.end(htmlFile);
    return;

} 

if(req.url?.endsWith('.js')){
   
    res.writeHead(200, {'Content-Type': 'aooplication/javascript'});
    
}else{
    res.writeHead(200,{ 'Content-Type': 'text/css'});
}

const responseContent = fs.readFileSync(`./public${req.url}`, 'utf8');
res.end(responseContent);



server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
});