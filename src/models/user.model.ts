import { Schema, model } from 'mongoose'
import { Document } from 'mongoose'

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

}, { timestamps: true })

export interface UserDocument extends Document {
    name?: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}

export const User = model<UserDocument>('User', userSchema)

