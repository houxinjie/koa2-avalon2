import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import fs from 'fs.promised';
import serve from 'koa-static';
import avalon from 'avalon2';
import serverRender from 'avalon2/src/server/serverRender';
import viewmodel from './components/list/index';


const publicPath = path.join(__dirname, 'public');

const app = new Koa();

app.use(serve(publicPath));

app.use(async (ctx, next) => {

    /*
    if(!ctx.request.body.name || !ctx.request.body.file){
        return ctx.body = {error: 'params error'};
    }
    */

    const template = await fs.readFile(path.join(__dirname, 'components', 'list', 'index.html'), 'utf-8');
    console.log(template);

    const obj = serverRender(viewmodel, template);
    console.log(obj);


    /*
    try{
        await fs.writeFile(path.join(publicPath, ctx.request.body.name), new Buffer(ctx.request.body.file, 'base64'));
        ctx.body = {url: `${ctx.protocol}://${ctx.host}/${ctx.request.body.name}`};
        await next();
    }catch(error){
        ctx.body = {error};
    }
    */

    ctx.body = `<!DOCTYPE html><html><head><title>koa2-avalon2测试</title><link rel="icon" href="data:;base64,="> </head><body>${obj.html}</body></html>`;
    await next();


});


app.on('error', (error, ctx) => {
});

app.listen(8890);
