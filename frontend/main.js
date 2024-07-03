const SPELL_LEVEL = {
	"Cantrip": "sif",
	"1st": "ein",
	"2nd": "ka",
	"3rd": "san",
	"4th": "qua",
	"5th": "wu",
	"6th": "yug",
	"7th": "ven",
	"8th": "oclo",
	"9th": "eiwa"
}

const SPELL_VOCATION = {
    "ABJURATION": "abu",
    "CONJURATION": "coju",
    "DIVINATION": "divi",
    "ENCHANTMENT": "enka",
    "EVOCATION": "evos",
    "ILLUSION": "ilun",
    "NECROMANCY": "neci",
    "TRANSMUTATION": "tramu",
	"ABJURATION (RITUAL)": "abu-ri",
    "CONJURATION (RITUAL)": "coju-ri",
    "DIVINATION (RITUAL)": "divi-ri",
    "ENCHANTMENT (RITUAL)": "enka-ri",
    "EVOCATION (RITUAL)": "evos-ri",
    "ILLUSION (RITUAL)": "ilun-ri",
    "NECROMANCY (RITUAL)": "neci-ri",
    "TRANSMUTATION (RITUAL)": "tramu-ri"
}

const SPELL_EFFECT = {
    "SLASHING": "nox",
    "BLUDGEONING": "nox",
    "PIERCING": "nox",
    "ACID": "aso",
    "COLD": "bliza",
    "FIRE": "fira",
    "FORCE": "oos",
	"HEAL": "cura",
    "LIGHTNING": "zay",
    "NECROTIC": "nekra",
    "POISON": "bleg",
    "PSYCHIC": "mino",
    "RADIANT": "radi",
    "THUNDER": "boomu",
	"MULTIPLE": "mahs",
	"NULL": "nul"
}


// class Spell {
  // constructor(name, level, school, attackType) {
    // this.name = name;
    // this.level = level;
    // this.school = school;
    // this.attackType = attackType;
  // }
  // toString() {
    // return `${this.name} is a ${this.level} level ${this.school} ${this.attackType} spell`;
  // }
  // spellVerbal(){
    // let chant = "";
    // chant = `${SPELL_LEVEL[this.level]} - ${SPELL_VOCATION[this.school]} - ${typeOfAttack(this.attackType)}` 

    // return `Verbal Chant: ${chant}`;
// }

// }
// const readFromFile = JSON.parse(JSON.stringify(
    // {
        // "name": "Firebolt",
        // "level": 0,
        // "school": "EVOCATION",
        // "attackType": "range"
    // }));
const wrapperPanel = document.querySelector(".wrapper");
wrapperPanel.classList.toggle("side-panel-open");

const sidePanel = document.querySelector(".side-panel");

const sidePanelToggle = document.querySelector(".side-panel-toggle");
sidePanelToggle.addEventListener("click", () =>{
	//console.log("clicked");
	wrapperPanel.classList.toggle("side-panel-open");
});


let spellList = [];
const spellCardTemplate = document.querySelector("[data-spell-template]");
const spellCardContainer = document.querySelector("[data-spell-card-container]");
const spellSearch = document.querySelector("[data-search]");


spellSearch.addEventListener("input", (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
	for(let i = 0; i < spellList.length; i++){
		//console.log(spellList[i]);
		const isVisible = spellList[i].name.toLowerCase().startsWith(value)|| spellList[i].school.toLowerCase().startsWith(value);;
		spellList[i].element.classList.toggle("hide", !isVisible);
	}
})


fetch("https://dnd-spell-tool.vercel.app/spells")
.then(response => response.json())
.then(data =>{
	// spellList = JSON.parse(JSON.stringify(CSVstring_to_Array(spellString))).map(spell =>{
		//console.log(CSVstring_to_Array(data));
		//resp = JSON.parse(csvToJson(data));
		//spellList = CSVstring_to_Array(data).map(spell =>{
			spellList = data.map(spell =>{
	// })
// }
// fetch("https://raw.githubusercontent.com/vorpalhex/srd_spells/master/spells.json")
// .then(response => response.json())
// .then(data => {
	// spellList = data.map(spell =>{
		const spellCard = spellCardTemplate.content.cloneNode(true).children[0];
		const spellName = spellCard.querySelector("[data-name]");
		const spellShortDesc = spellCard.querySelector("[data-desc]");
		const spellInfo = spellCard.querySelector("[data-info]");
		const spellComponents = spellCard.querySelector("[data-components]");
		const spellRange = spellCard.querySelector("[data-cast-range]");
		const spellTime = spellCard.querySelector("[data-cast-time]");
		const spellDuration = spellCard.querySelector("[data-duration]");
		const spellDamage = spellCard.querySelector("[data-damage]");
		const spellSaving = spellCard.querySelector("[data-saving-throw]");
		
		let spellFullDesc = "";
		let spellChant = "";
		
		spellFullDesc = spell.Description; //spell.description;
		//partialDesc = parseDescription(spellFullDesc);//(spell.description);
		spellCard.addEventListener("click", () => {
			spellFullDesc = spellFullDesc.replaceAll('|', ',');
			//sidePanel.innerHTML = spellFullDesc;
			document.getElementById("sp-title").innerHTML = spell.Name;	
			document.getElementById("sp-desc").innerHTML = spellFullDesc;
			if (!wrapperPanel.classList.contains("side-panel-open")){
				wrapperPanel.classList.toggle("side-panel-open");
			}
		})
		
		spellName.textContent = spell.Name;		
		spellInfo.textContent = spell.Level == 'Cantrip' ? `${spell.School} ${spell.Level}`:`${spell.Level}-level ${spell.School}` ;
		//spellSchool.textContent = `School: ${spell.School}`;
		let damage = spell.DamageType != null ? spell.DamageType : 'null';
		spellDamage.textContent =  damage.toUpperCase();
		//spellLevel.textContent = `Level: ${spell.Level}`;
		spellTime.textContent = spell.CastingTime;
		let savingThrow = spell.SavingThrow != null ? spell.SavingThrow : 'null';
		spellSaving.textContent = savingThrow.toUpperCase();
		spellRange.textContent = spell.Range;
		let components = spell.Components;
		components = components.replaceAll("|", ",");
		spellComponents.textContent = components.includes("(") ? components.slice(0, components.indexOf('(')): components;
		spellDuration.textContent = spell.Duration;
		
		if(spellComponents.textContent.includes('V')){
			spellChant = (`${SPELL_LEVEL[spell.Level]}-${SPELL_EFFECT[damage.toUpperCase()]}-${SPELL_VOCATION[spell.School.toUpperCase()]}`
			)
		}
		else {
			spellChant = 'Verbal Not Needed';
		}
		
		spellName.addEventListener("mouseover", () =>{
			spellName.textContent = spellChant;
		})
		spellName.addEventListener("mouseout", () =>{
			spellName.textContent = spell.Name;
		})		
		
		spellCardContainer.append(spellCard);
		return {
			name: spell.Name, 
			school: spell.School,
			level: spell.Level,
			castingTime: spell.CastingTime, 
			range: spell.Range,
			components: spell.Components,
			damage: spellDamage.textContent, 
			saving: spellSaving.textContent,
			element: spellCard
			};	
	
	})
})


function parseDescription(desc){
	return result = desc.replaceAll("|", ",");
	
	//return result;
}


//convert CSV to Array
function CSVstring_to_Array(data, delimiter = ',') {

	/* This variable will collect all the titles
	from the data variable 
	["Name", "Roll Number"] */
	
	const titles = data.slice(0, data
		.indexOf('\n')).split(delimiter);

	/* This variable will store the values
	from the data
	[ 'Rohan,01', 'Aryan,02' ] */
	const titleValues = data.slice(data
		.indexOf('\n') + 1).split('\n');

	/* Map function will iterate over all 
	values of title values array and 
	append each object at the end of 
	the array */
	const ansArray = titleValues.map(function (v) {

		/* Values variable will store individual 
		title values		 
		[ 'Rohan', '01' ] */
		const values = v.split(delimiter);

		/* storeKeyValue variable will store 
		object containing each title
		with their respective values i.e 
		{ Name: 'Rohan', 'Roll Number': '01' } */
		const storeKeyValue = titles.reduce(
			function (obj, title, index) {
				obj[title] = values[index];
				return obj;
			}, {});

		return storeKeyValue;
	});

	return ansArray;
};


function csvToJson(csvString) {
    const rows = csvString
        .split("\n");

    const headers = rows[0]
        .split(",");

    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {

        const values = rows[i]
            .split(",");

        const obj = {};

        for (let j = 0; j < headers.length; j++) {

            const key = headers[j]
                .trim();
            const value = values[j]
                .trim();

            obj[key] = value;
        }

        jsonData.push(obj);
    }
    return JSON.stringify(jsonData);
}
 

