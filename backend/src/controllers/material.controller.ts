
import { FastifyRequest, FastifyReply } from 'fastify';
import { Material } from '../models/material.model';


export async function getAll(req: FastifyRequest, reply: FastifyReply) {

    try {
        const materials = await Material.find({})
        reply.code(200).send(materials)

    } catch (err) {
        reply.code(500).send({ error: 'Getting all Materials failed', details: err })

    }
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    try {
        const material = await Material.find({ id })
        if (!material) {
            reply.code(404).send({ error: 'Material not found' })
        } else {
            reply.code(200).send(material)
        }

    } catch (err) {
        reply.code(500).send({ error: 'Error fetching material', details: err })
    }
}

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const { name, description = '', image = '', webLink = '', price = 0, dimensions = '' } = req.body as { name: string, description: string, image: string, webLink: string, price: number, dimensions: string }

    try {
        const material = new Material({ name, description, image, webLink, price, dimensions })
        await material.save()
        reply.code(201).send(material)
    } catch (err) {
        reply.code(500).send({ error: 'Creating material failed', details: err })
    }

}

export async function updateById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const { name, description = '', image = '', webLink = '', price = 0, dimensions = '' } = req.body as { name: string, description: string, image: string, webLink: string, price: number, dimensions: string }
    const material = await Material.findByIdAndUpdate(id, { name, description, image, webLink, price, dimensions }, { new: true })
    if (!material) {
        reply.code(404).send({ error: 'Material not found' })
    }
    else {
        reply.code(200).send(material)
    }

}

export async function deleteById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const material = await Material.findByIdAndDelete(id)
    if (!material) {
        reply.code(404).send({ error: 'Material not found' })
    } else {
        reply.code(200).send({ message: 'Material deleted successfully' })
    }

}

export async function getByName(req: FastifyRequest, reply: FastifyReply) {
    const { name } = req.params as { name: string }
    try {
        const material = await Material.find({ name })
        if (!material) {
            reply.code(404).send({ error: 'Material not found' })
        } else {
            reply.code(200).send(material)
        }
    } catch (err) {
        reply.code(500).send({ error: 'Error fetching material', details: err })
    }

}

