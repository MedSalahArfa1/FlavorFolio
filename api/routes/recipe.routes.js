const { Router } = require('express')
const router = Router()

const { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe.controller') 
const protectAuth = require('../middlewares/protectAuth')

router.post('/', protectAuth, createRecipe)
router.get('/', getRecipes)
router.get('/:id', getRecipe)
router.put('/:id', protectAuth, updateRecipe)
router.delete('/:id', protectAuth, deleteRecipe)

module.exports = router