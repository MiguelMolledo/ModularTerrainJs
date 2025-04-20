import { Schema, model } from 'mongoose';

const materialSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    webLinks: String,
    price: Number,
    dimensions: String,


}, { timestamps: true });

export interface MaterialDocument extends Document {
    name: string,
    description?: string,
    image?: string,
    webLinks?: string,
    price?: number,
    dimensions?: string
}


export const Material = model<MaterialDocument>('Material', materialSchema);