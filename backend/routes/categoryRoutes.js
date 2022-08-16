// import express from 'express';
// import Category from '../models/categoryModel.js';
// import bcrypt from 'bcryptjs';
// import expressAsyncHandler from 'express-async-handler';
// import { isAuth, isAdmin, generateToken } from '../utils.js';

// const categoryRouter = express.Router();

// categoryRouter.get(
//     '/',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const categories = await Category.find({});
//         res.send(categories)

//     })
// );

// categoryRouter.get(
//     '/:id"',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const category = await Category.findById(req.params.id);
//         if (category) {
//             res.send(category);
//         } else {
//             res.status(404).send({ message: 'Categoria no encontrada' })
//         }
//     })
// );

// categoryRouter.put(
//     '/:id',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const category = await Category.findById(req.params.id);
//         if (category) {
//             category.name = req.body.name || category.name;
//             category.image = req.body.image || category.image;
//             const updateCategory = await category.save();
//             res.send({ message: 'categoria actualizada', category: updateCategory });

//         } else {
//             res.status(404).send({ message: 'la categoria no fue encontrada' });
//         }
//     })
// );

// categoryRouter.delete(
//     '/:id',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const category = await Category.findById(req.params.id);
//         if (category) {
//             await category.remove();
//             res.send({ message: "categoria eliminada" });
//         } else {
//             res.status(404).send({ message: 'categoria no encontrada' })
//         }
//     })
// );

// categoryRouter.post(
//     '/newcategory',
//     expressAsyncHandler(async (req, res) => {
//         const newCategory = new Category({
//             name: req.body.name,
//             image: req.body.image
//         });
//         const category = await newCategory.save();
//         res.send({
//             _id: category._id,
//             name: category.name,
//             image: category.image,
//         });
//     })
// );

// export default categoryRouter;