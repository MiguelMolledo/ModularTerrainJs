import request from 'supertest';
import { server } from '../app';
import { faker } from '@faker-js/faker';
import mongoose from "mongoose";
import { T } from '@faker-js/faker/dist/airline-BUL6NtOJ';


const DefaultUser = {
    Name: faker.person.fullName(),
    Email: faker.internet.email(),
    Password: faker.internet.password(),
    Role: 'user',
};

const AdminUser = {
    Name: 'Admin User',
    Email: 'admintestemail@gmail.com',
    Password: 'admintestpassword',
    Role: 'admin',
};



describe('Authetication Routes', () => {
    let token: string;

    beforeAll(async () => {
        await server.ready();
        await mongoose.connection.dropDatabase();

    });
    afterAll(async () => {
        await server.close();
    });

    it('should return 200 on healthcheck', async () => {
        const response = await request(server.server).get('/healthcheck');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ hello: 'world' });
    });

    it('should register and return a token', async () => {
        const response = await request(server.server)
            .post('/auth/register')
            .send({
                name: DefaultUser.Name,
                email: DefaultUser.Email,
                password: DefaultUser.Password,
                role: DefaultUser.Role,
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should Login with valid credentials and return a token', async () => {
        const response = await request(server.server)
            .post('/auth/login')
            .send({
                email: DefaultUser.Email,
                password: DefaultUser.Password,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;

    })

    it('should register user with admin role', async () => {
        const response = await request(server.server)
            .post('/auth/register')
            .send({
                name: AdminUser.Name,
                email: AdminUser.Email,
                password: AdminUser.Password,
                role: AdminUser.Role,
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login with admin role', async () => {
        const response = await request(server.server)
            .post('/auth/login')
            .send({
                email: AdminUser.Email,
                password: AdminUser.Password,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    })


})