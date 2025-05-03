import { FastifyRequest, FastifyReply, FastifyTypeProvider } from 'fastify'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'


// ex

export async function getCurrent(req: FastifyRequest, reply: FastifyReply) {
    console.log(req.headers)
    console.log('TESTINGasdasd')
    reply.code(200).send()

}

// USER ROUTES 

export async function getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await User.find({})
        reply.code(200).send(users)
    } catch (err) {
        reply.code(500).send({ error: 'Getting all Users failed', details: err })
    }
}



export async function getById(req: FastifyRequest, reply: FastifyReply) {

    const { id } = req.params as { id: string }
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        reply.code(400).send({ error: 'ID is required' })
        return
    }



    try {
        const user = await User.findById(id)
        if (!user) {
            reply.code(404).send({ error: 'User not found' })
        } else {
            reply.code(200).send(user)
        }
    } catch (err) {
        reply.code(500).send({ error: 'Getting User failed', details: err })
    }
}

export async function updateById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        reply.code(400).send({ error: 'ID is required' })
        return
    }
    const { name, email, password } = req.body as { name: string, email: string, password: string }

    if (!name && !email && !password) {
        reply.code(400).send({ error: 'Name, email or password are required' })
        return
    }
    try {
        const user = await User.findOneAndUpdate({ '_id': id }, { 'name': name, 'email': email, 'password': password }, { new: true })
        if (!user) {
            reply.code(404).send({ error: 'User not found' })
            return
        } else {
            reply.code(200).send(user)

        }


    } catch (err) {
        reply.code(500).send({ error: 'Error updating user', details: err })
    }

}

export async function deleteById(req: FastifyRequest, reply: FastifyReply) {

    const { id } = req.params as { id: string }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        reply.code(400).send({ error: 'ID is required' })
        return
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            reply.code(404).send({ error: 'User not found' });
        } else {
            reply.code(200).send({ message: 'User deleted successfully' });
        }
    } catch (err) {
        reply.code(500).send({ error: 'Error deleting user', details: err });
    }
}