//importing required directories
const http=require("http");
const fs=require("fs").promises;
const path=require("path");

//Added async and await for reading requested filesand created server
const app=http.createServer(async(req, res)=>{

    const {url, method} = req;
    let filePath="";
    res.setHeader("Content-Type","text/html");

    /* Loading CSS */

    if(url==="/public/styles.css"){
        //Getting CSS File Path
        const cssPath=path.join(__dirname,"public","styles.css");
        res.setHeader("Content-Type","text/css");

        try{
            const css=await fs.readFile(cssPath, "utf-8");//reading the file through it's path and returning CSS.
            return res.end(css);
        }catch(err){
            res.statusCode=500;
            return res.end("CSS Loading Error");
        }
    }

    //Added page to default path
    
    if(url==="/"){
        filePath=path.join(__dirname,"pages","Common.html");
        res.statusCode=200;
    }

    //Home page
    else if(url.toLowerCase()==="/home"){
        filePath=path.join(__dirname,"pages","Home.html");
        res.statusCode=200;
    }

    //About Page
    else if(url.toLowerCase()==="/about"){
        filePath=path.join(__dirname,"pages","About.html");
        res.statusCode=202;
    }

    //Conact Page
    else if(url.toLowerCase()==="/contact"){
        filePath=path.join(__dirname,"pages","Contact.html");
        res.statusCode=202;
    }

    //Not defined pages
    else{
        filePath=path.join(__dirname,"pages","404.html");
        res.statusCode=404;
    }
    
try {
        const data = await fs.readFile(filePath, "utf-8");
        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.end("<h1>Internal Server Error</h1>");
    }


});

//PORT Number

const PORT=3000;

//Loading PORT

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})