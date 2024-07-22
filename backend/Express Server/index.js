import mongoose from "mongoose";
import { Schema } from "mongoose";
import express from "express";
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Spell } from "./models/spellModel.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

//initial express set up
const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));
//database connection set up
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jametrow:BNlVZhZ554SrLMkO@jametrow-db-dev.xvtmwfr.mongodb.net/jametrow-db-dev')
.then(() => {
	console.log('Connected to MongoDB');
	//server listener to indicate status
	app.listen(PORT, () => {
	console.log(`Express Server running on port ${PORT}.`);
	});
}).catch((error) => {
	console.log(error);
});


//routes
app.get("/spells", async(req, res) =>{
	try{
		const spells = await Spell.find({});
		res.status(200).json(spells);
	}
	catch(error){
		res.status(500).json({
			statusMessage: error.message,
			fullError: error
		});
	}
})

//quick hello world http get
app.get("/", (req, res) =>{
	res.set('content-type', 'text/html');
	res.sendFile(path.join(__dirname + '/../../frontend/index.html'));
})
