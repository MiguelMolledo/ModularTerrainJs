// src/hooks/checkPermission.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { canExecute, extractDataFromHeaders } from '../utils/auth';
import { Role } from '../types/roles';
import { Action } from '../types/roles';
import jwt from 'jsonwebtoken';

export function checkPermission(action: Action) {
    return async function (
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id, role } = extractDataFromHeaders(request) as { id: string, role: string } || { id: '', role: '' };
        if (!role || !canExecute(role as Role, action)) {
            return reply.status(403).send({ message: 'Forbidden' });
        }
    };
}



