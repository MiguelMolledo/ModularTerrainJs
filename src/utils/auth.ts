import { Role, Action } from '../types/roles';
import { permissions } from '../config/permissions';
import { FastifyRequest, FastifyReply } from 'fastify';

import jwt from 'jsonwebtoken';


export function canExecute(role: Role, action: Action): boolean {
    return permissions[role].includes(action);
}

export function extractDataFromHeaders(request: FastifyRequest): { id: string, role: string } {
    const authHeader = request.headers['authorization'] || request.headers['Authorization']
    if (!authHeader || typeof authHeader !== 'string') return { id: '', role: '' }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
    return extractDataFromToken(token)
}


export function extractDataFromToken(token: string): { id: string, role: string } {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey') as { id: string, role: string };
        if (!decoded.id || !decoded.role) {
            throw new Error('Invalid token');
        }
        return { id: decoded.id, role: decoded.role };
    } catch (err) {
        throw new Error('Invalid token');
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


export async function verifyTokenAndRoleOrSelf(
    req: FastifyRequest,
    reply: FastifyReply,
    requiredRole: string = '' // Default to 'user' role
) {
    try {
        const { id: tokenId, role: tokenRole } = extractDataFromHeaders(req) as { id: string, role: string }
        // Allow if admin
        if (requiredRole && requiredRole === tokenRole) {
            return true;
        }


        // Allow if user is acting on their own resource
        const { id: paramId } = req.params as { id: string };
        if (tokenId === paramId) {
            return true;
        }

        reply.code(403).send({ error: 'Forbidden: Insufficient permissions' });
        return false;
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized: Invalid token' });
        return false;
    }
}