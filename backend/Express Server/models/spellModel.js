import mongoose from "mongoose";
import { Schema } from "mongoose";

//SCHEMA FOR MODEL
const spell_schema = mongoose.Schema(
	{
		Name:{type:String},
		Source:{type:String},
		Page:{type:Number},
		Level:{type:String},
		CastingTime:{type:String},
		Duration:{type:String},
		SavingThrow:{type:String},
		DamageType:{type:String},
		Condition:{type:String},
		School:{type:String},
		Range:{type:String},
		Size:{type:String},
		Components:{type:String},
		Classes:{type:String},
		OptionalVariantClasses:{type:String},
		Description:{type:String},
		AtHigherLevels:{type:String}	
	},
	{
		timestamps: true
	}
);

const Spell = mongoose.model("Spell", spell_schema);

export { Spell };