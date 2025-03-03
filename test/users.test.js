const request = require('supertest');
const app = require('../app'); // Importa tu aplicación Express
const Product = require('../models/products'); // Asegúrate de importar el modelo correcto

describe('Product Controller - create', () => {
    beforeEach(async () => {
        await Product.destroy({ where: {}, truncate: true }); // Borra todos los registros en la tabla products y reinicia el índice
    });

    it('should create a new product', async () => {
        const mockProduct = { 
            name: 'Laptop', 
            description: 'A high-end gaming laptop', 
            price: 1500.00 
        };

        const response = await request(app)
            .post('/api/products') // Ruta actualizada
            .send(mockProduct);

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.name).toBe(mockProduct.name);
        expect(response.body.data.description).toBe(mockProduct.description);
    });

    it('should return 400 for invalid input', async () => {
        const invalidProduct = { name: '' }; // Falta descripción y precio

        const response = await request(app)
            .post('/api/products')
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('Product Controller - find methods', () => {
    it('should return an array of products', async () => {
        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should return a product by id', async () => {
        await Product.destroy({ where: {}, truncate: true });

        const mockProduct = { 
            name: 'Smartphone', 
            description: 'A flagship smartphone', 
            price: 999.99 
        };

        const product = await request(app)
            .post('/api/products')
            .send(mockProduct);

        const response = await request(app)
            .get(`/api/products/${product.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.id).toBe(product.body.data.id);
    });
});

describe('Product Controller - update', () => {
    it('should update a product by id', async () => {
        await Product.destroy({ where: {}, truncate: true });

        const mockProduct = { 
            name: 'Tablet', 
            description: 'A powerful tablet', 
            price: 599.99 
        };

        const product = await request(app)
            .post('/api/products')
            .send(mockProduct);

        const updatedProduct = {
            name: 'Updated Tablet',
            description: 'A new version of the tablet',
            price: 649.99
        };

        const response = await request(app)
            .put(`/api/products/${product.body.data.id}`)
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.name).toBe(updatedProduct.name);
        expect(response.body.data.description).toBe(updatedProduct.description);
    });
});

describe('Product Controller - delete', () => {
    it('should delete a product by id', async () => {
        await Product.destroy({ where: {}, truncate: true });

        const mockProduct = { 
            name: 'Monitor', 
            description: 'A 4K monitor', 
            price: 299.99 
        };

        const product = await request(app)
            .post('/api/products')
            .send(mockProduct);

        const response = await request(app)
            .delete(`/api/products/${product.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product deleted successfully');
    });
});
