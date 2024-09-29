const request = require('supertest');
const express = require('express');
const routes = require('../routes/index.js'); // Corrigir o caminho para o módulo

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('GET /api/cart', () => {
  it('should return cart items', (done) => {
	request(app)
	  .get('/api/cart')
	  .expect('Content-Type', /json/)
	  .expect(200, done);
  });
});

describe('POST /api/contact', () => {
  it('should return success message', (done) => {
	request(app)
	  .post('/api/contact')
	  .send({ email: 'teste@exemplo.com', message: 'Esta é uma mensagem de teste.' })
	  .expect('Content-Type', /json/)
	  .expect(200, done);
  });
});