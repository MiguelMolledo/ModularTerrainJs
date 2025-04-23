import request from 'supertest';
import { app } from '../index';


enum DefaultUser {
    Name = 'Test User',
    Email = 'testemail@gmail.com',
    Password = 'testpassword',
    Role = 'user',
}

describe('Authetication Routes', () => {
    let token: string;

    it('should regisster and return a token', async () => {
        const response = await request(app.server)
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
        const response = await request(app.server)
            .post('/auth/register')
            .send({
                email: DefaultUser.Email,
                password: DefaultUser.Password,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;

    })



})