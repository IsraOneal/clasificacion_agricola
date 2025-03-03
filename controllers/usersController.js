const { where } = require('sequelize');
const Primera = require('../models/primera');
const Segunda = require('../models/segunda');
const Tercera = require('../models/tercera');

// Función para obtener el modelo correcto según la clasificación
const getModel = (category) => {
    switch (category) {
        case 'primera': return Primera;
        case 'segunda': return Segunda;
        case 'tercera': return Tercera;
        default: throw new Error('Categoría inválida');
    }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
    try {
        const { category, ...data } = req.body;
        if (!category || !data.producto) {
            return res.status(400).json({ success: false, error: 'Datos incompletos' });
        }
        const Model = getModel(category);
        const product = await Model.create(data);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Obtener todos los productos de una categoría
exports.findAll = async (req, res) => {
    try {
        const { category } = req.params;
        const Model = getModel(category);
        const products = await Model.findAll();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Obtener un producto por ID y categoría
exports.findOne = async (req, res) => {
    try {
        const { category, id } = req.params;
        const Model = getModel(category);
        const product = await Model.findByPk(id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Actualizar un producto por ID y categoría
exports.update = async (req, res) => {
    try {
        const { category, id } = req.params;
        const Model = getModel(category);
        const product = await Model.findByPk(id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        await product.update(req.body);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Eliminar un producto por ID y categoría
exports.delete = async (req, res) => {
    try {
        const { category, id } = req.params;
        const Model = getModel(category);
        const deleted = await Model.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
