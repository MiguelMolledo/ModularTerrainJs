import { Schema, model } from 'mongoose';

const materialSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    webLinks: String,
    price: { tpye: Number, Min: 0 },
    dimensions: {
        type: [String], validate: {
            validator: function (value: string) {
                // Validate format like "30cm x 50cm" or "1meter x 2meters"
                return /^[0-9]+(cm|meter|mm|inch|ml|l)? x [0-9]+(cm|meter|mm|inch|ml|l)?$/.test(value);
            },
            message: (props: { value: string }) => `${props.value} is not a valid dimension format!`
        }
    },


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