import http from 'http';
import path from 'path';
import { fileURLToPath as fileURL } from 'url';
import fs from 'fs';
import fsPromises from 'fs/promises'

//directory location
const __dirname = import.meta.dirname;

//server location
const PORT = process.env.PORT || 3000;

//serve file function
const serveFile = async (filePath, contentType, response) =>{
	try{
		const data = await fsPromises.readFile
		(filePath,
		!contentType.includes('image') ? 'utf8': ''
		);
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(data);
	} catch (err){
		console.log(err);
		response.statusCode = 500;
		response.end('Request to host unavailable at this time');
	}
}

//create server with dynamic loading
const server = http.createServer((req, res) => {
	let contentType = '';
	let filePath = '';
	console.log(req.url, req.method);
	
	const extension = path.extname(req.url);
	console.log(extension);

	
	//set content-type by extension
	switch(extension){
		case '.css':
			contentType = 'text/css';
			break;
		case '.csv':
			contentType = 'text/csv';
			break;
		case '.html':
			contentType = 'text/html';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.png':
			contentType = 'image/png';
			break;	
		case '.svg':
			contentType = 'image/svg';
			break;			
		default:
			contentType = 'text.html';	
	}
	console.log(contentType);
	
	//set filePath by request url and content type
	filePath = contentType === 'text/html' && req.url === '/' 
		? path.join(__dirname, '../../frontend/index.html')
		: contentType === 'text/html' && req.url.slice(-1) === '/'
			? path.join(__dirname, '', '../../frontend/index.html')
			: contentType === 'text/html'
				? path.join(__dirname,'../../frontend/', req.url)
				: path.join(__dirname,'../../frontend/', req.url);

	//if html not specified for an html page
	if (!extension && req.url.slice(-1) !== '/'){
		filePath += '.html';
	}
	
	const fileExists = fs.existsSync(filePath);
	
	if(fileExists){
		//serve the file
		serveFile(filePath, contentType, res);
	}
	else{
		console.log('oops...');
	}
	
})

//server listener to indicate status
server.listen(PORT, ()=> {
	console.log(`Server running at http:localhost:${PORT}/`);
})