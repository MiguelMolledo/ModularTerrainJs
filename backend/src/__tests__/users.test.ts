import request from "supertest";
import { app } from '../index';

import { extractDataFromToken } from "../utils/auth";

enum DefaultUser {
    Name = 'Test User',
    Email = 'testemail@gmail.com',
    Password = 'testpassword',
    Role = 'user',
}

enum AdminUser {
    Name = 'Admin User',
    Email = 'admintestemail@gmail.com',
    Password = 'admintestpassword',
    Role = 'admin',
}


describe('Admin Routes', () => {

    let adminToken: string;
    let userToken: string;
    beforeAll(async () => {

        const response = await request(app.server)
            .post('/auth/register')
            .send({
                name: AdminUser.Name,
                email: AdminUser.Email,
                password: AdminUser.Password,
                role: AdminUser.Role,
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        adminToken = response.body.token;

        // create a user for testing
        const userResponse = await request(app.server)
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

    it('should get all users', async () => {
        const response = await request(app.server)
            .get('/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.body.length).toBeGreaterThan(0);
    })
    it('remove user', async () => {

        const userData = extractDataFromToken(userToken)


        const response = await request(app.server)
            .delete(`/users/${userData.id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }
    )


})