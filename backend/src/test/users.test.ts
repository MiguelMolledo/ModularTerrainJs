import request from "supertest";
import { app } from '../src/index';


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
    beforeAll(async () => {

        adminToken = 'caca';
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


})