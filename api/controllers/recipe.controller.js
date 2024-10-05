
const Recipe = require("../models/Recipe")

const createRecipe = async (req, res) => {
    try {
        const doc = new Recipe({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            author: req.userId
        })

        const recipe = await doc.save()

        return res.status(200).json(recipe)
    } catch (errors) {
        return res.status(500).json({ error: errors.message })
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id

        const recipe = await Recipe.findOneAndUpdate(
            { _id: recipeId },
            { $inc: { views: 1 } },
            { returnDocument: "after" }
        ).populate("author", "-password").exec()

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }

        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                author: req.userId
            },
            { new: true }
        )

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }

        return res.status(200).json(recipe)
    } catch (error) {
       return res.status(500).json({ error: error.message }) 
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id })

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }

        return res.status(200).json({ message: "Recipe deleted", recipe })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 }).populate("author","-password").exec()

        return res.status(200).json(recipes)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipes
}