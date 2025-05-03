import { FastifyRequest, FastifyReply, FastifyTypeProvider } from 'fastify'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// AUTH ROUTES 

export async function register(req: FastifyRequest, reply: FastifyReply) {

    const { name, email, password, role = 'user' } = req.body as {
        name: string,
        email: string,
        password: string,
        role?: string,
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            reply.code(400).send({ error: 'User already exists' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name: name, email: email, role: role, password: hashedPassword }) as InstanceType<typeof User>;

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'defaultSecretKey', // Ensure a fallback value for JWT_SECRET
            { expiresIn: '1h' }
        )
        reply.code(201).send({ token })
    }
    catch (err) {
        reply.code(500).send({ error: 'User creation failed', details: err })
    }
}
// JWT Token
export async function login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string, password: string }
    try {
        const user = await User.findOne({ 'email': email }) as InstanceType<typeof User>;

        if (!user) {
            reply.code(401).send({ error: 'Invalid credentials' })
            return
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            reply.code(401).send({ error: 'Invalid credentials' })
            return
        }


        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'defaultSecretKey',// rework this with dotenv
            { expiresIn: '1h' }
        )
        reply.code(200).send({ token })



    } catch (err) {
        reply.code(500).send({ error: 'Login failed', details: err })
    }
}
