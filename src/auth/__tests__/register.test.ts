import request from 'supertest';
import app from '../../../src/app';

it('returns 201 on successfull register', async () => {
    jest.setTimeout(60000)
    
    return request(app)
        .post('/register')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201)
});

it('sets the cookie after successfull register', async () => {
    const res = await request(app)
        .post('/register')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201)

        expect(res.get('Set-Cookie')).toBeDefined()
});