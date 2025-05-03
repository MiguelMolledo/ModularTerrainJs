import request from "supertest";
import { server } from '../app';
import { extractDataFromToken } from "../utils/auth";
import { faker } from '@faker-js/faker';
import mongoose from "mongoose";

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


describe('Admin Routes', () => {

    let adminToken: string;
    let userToken: string;
    beforeAll(async () => {


        await server.ready();
        await mongoose.connection.dropDatabase();

        const response = await request(server.server)
            .post('/auth/register')
            .send({
                name: AdminUser.Name,
                email: AdminUser.Email,
                password: AdminUser.Password,
                role: AdminUser.Role,
            });
        if (response.status !== 201) {
            console.log('Admin register response:', response.body);
        }
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        adminToken = response.body.token;

        // create a user for testing
        const userResponse = await request(server.server)
            .post('/auth/register')
            .send({
                name: DefaultUser.Name,
                email: DefaultUser.Email,
                password: DefaultUser.Password,
                role: DefaultUser.Role
            });
        expect(userResponse.status).toBe(201);
        expect(userResponse.body).toHaveProperty('token');
        userToken = userResponse.body.token;

    })

    afterAll(async () => {
        await server.close();
    });

    it('should return 200 on healthcheck', async () => {
        const response = await request(server.server).get('/healthcheck');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ hello: 'world' });
    });
    it('should get all users', async () => {
        const response = await request(server.server)
            .get('/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.body.length).toBeGreaterThan(0);
    })
    it('remove user', async () => {

        const userData = extractDataFromToken(userToken)


        const response = await request(server.server)
            .delete(`/users/${userData.id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }
    )


})