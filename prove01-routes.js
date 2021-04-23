const fs=require('fs');
const querystring = require('querystring');

const routeHandler=(req,res)=>{
    let url=req.url;
    if(url==="/"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(htmlWrap('Prove 1', 
    `<form method="POST" action="/create-user"><input type="text" name="user"><input type="submit" value="Send"></form>`
        ));
        return res.end();
    }

    if(url==="/users"){
        const users=JSON.parse(fs.readFileSync('users.json'));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(htmlWrap('Prove 1', '<ul>'+users.map(u=>`<li>${u}</li>`).join('\n')+'</ul>'));
        return res.end();
    }

    if(url==='/create-user'){
        const body = [];
        req.on('data', (chunk) => {body.push(chunk);});
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newUser = querystring.decode(parsedBody)['user'];
            console.log(newUser);
            const users=JSON.parse(fs.readFileSync('users.json'));
            users.push(newUser);
            fs.writeFileSync('users.json',JSON.stringify(users));
            res.writeHead(302, {'Location': '/users'});
            res.end();
        });
    }
}

function htmlWrap(title, body){
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>${title}</title></head>
        <body>${body}</body>
    </html>`;
}

module.exports = routeHandler;