import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../appModule';
import request from 'supertest';
import express from "express";

let app: any;

beforeEach = async () => {
    const mongo = await MongoMemoryServer.create();
    let mongoUri = await mongo.getUri();
    app = new AppModule(express(), mongoUri, '../../swagger.yaml');
    await app.start()
}

describe('Auth tests', () => {
    describe('Register route', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
        });
    })
})