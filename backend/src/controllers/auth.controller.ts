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
        reply.code(201).send({ token })



    } catch (err) {
        reply.code(500).send({ error: 'Login failed', details: err })
    }
}


export async function verifyToken(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        reply.code(401).send({ error: 'Token missing' })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey') // rework this with dotenv
        // req.user = decoded
        reply.code(200).send({ message: 'Token is valid', user: decoded })
    } catch (err) {
        reply.code(401).send({ error: 'Invalid token', details: err })
    }
}

export async function verifyTokenAndRole(req: FastifyRequest, reply: FastifyReply, requiredRole: string) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            reply.code(401).send({ error: 'Unauthorized: No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey') as { id: string, role: string };

        // Check if the user has the required role
        if (decoded.role !== requiredRole) {
            reply.code(403).send({ error: 'Forbidden: Insufficient permissions' });
            return;
        }

        // req.user = decoded;
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized: Invalid token' });
    }
}


function signTokenWithUser(user: InstanceType<typeof User>): string {
    if (!user) {
        throw new Error('User is not defined');
    }
    if (!user._id || !user.email || !user.role) {
        throw new Error('User object is missing required properties');
    }

    const token = jwt.sign(
        {
            user: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET || 'defaultSecretKey',// rework this with dotenv
        { expiresIn: '1h' }
    )
    return token
}


export function extractUserIdFromHeaders(req: FastifyRequest): string | null {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    if (!authHeader || typeof authHeader !== 'string') return null

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
    try {
        const decoded = jwt.decode(token) as { id?: string }
        return decoded && decoded.id ? decoded.id : null
    } catch {
        return null
    }
}

export function allowedTokenToExecuteAction(token: string, action: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default') as { id: string, role: string };
        export enum AllowedActions {
            CREATE_USER = 'CREATE_USER',
            DELETE_USER = 'DELETE_USER',
            UPDATE_USER = 'UPDATE_USER',
            VIEW_USER = 'VIEW_USER',
            CREATE_POST = 'CREATE_POST',
            DELETE_POST = 'DELETE_POST',
            UPDATE_POST = 'UPDATE_POST',
            VIEW_POST = 'VIEW_POST',
            // Add more actions as needed
        }


    }}
