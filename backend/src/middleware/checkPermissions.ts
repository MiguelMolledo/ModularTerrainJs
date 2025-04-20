// src/hooks/checkPermission.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { canExecute } from '../utils/auth';
import { Role } from '../types/roles';
import { Action } from '../types/roles';
import jwt from 'jsonwebtoken';

export function checkPermission(action: Action) {
    return async function (
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id, role } = extractDataFromHeaders(request) || {};
        if (!role || !canExecute(role as Role, action)) {
            return reply.status(403).send({ message: 'Forbidden' });
        }
    };
}



export function extractDataFromHeaders(request: FastifyRequest): { id: string, role: string } | null {
    const authHeader = request.headers['authorization'] || request.headers['Authorization']
    if (!authHeader || typeof authHeader !== 'string') return null
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
    try {
        const { id, role } = jwt.decode(token) as { id?: string, role?: string }

        if (!id || !role) return null
        return { id, role }
    } catch {
        return null
    }
}

