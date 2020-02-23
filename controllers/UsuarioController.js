import models from "../models";
import bcrypt from "bcryptjs"
import token from "../services/token.js";

export default {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({ _id: req.query._id })
                .populate('categoria', { nombre: 1 });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find({ $or: [{ 'name': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] })
                .populate('categoria', { name: 1 })
                .sort({ 'createdAt': -1 })
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    update: async(req, res, next) => {
        try {
            let pas = req.body.password;
            const rg0 = await models.Usuario.findOne({ _id: req.body._id });
            if (pas != rg0.password) {
                pas = bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, {
                rol: req.body.rol,
                name: req.body.name,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direcccion: req.body.direcccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: pas
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'ocurrio un error'
            });
            next(e);
        }
    },
    desactivate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({

                message: 'ocurrio un error: '
            });
            next(e);
        }
    },

    login: async(req, res, next) => {
        try {
            let user = await models.Usuario.findOne({ email: req.body.email, state: 1 });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({ user, tokenReturn });
                }
            } else {
                res.status(404).send({
                    message: 'Este usuario no existe.'
                })
            }
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({

                message: 'Contraseña incorrecta '
            });
            next(e);
        }
    }

}