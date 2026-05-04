import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('Contacts API', () => {
  it('GET /contacts returns list', async () => {
    const res = await request(app).get('/contacts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /contacts creates a contact', async () => {
    const res = await request(app).post('/contacts').send({
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-9999'
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /contacts/:id returns a contact', async () => {
    const res = await request(app).get('/contacts/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBeDefined();
  });

  it('PUT /contacts/:id updates a contact', async () => {
    const res = await request(app).put('/contacts/1').send({
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '555-0000'
    });
    expect(res.status).toBe(200);
    expect(res.body.updated).toBe(true);
  });

  it('DELETE /contacts/:id deletes a contact', async () => {
    const res = await request(app).delete('/contacts/1');
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });
});
