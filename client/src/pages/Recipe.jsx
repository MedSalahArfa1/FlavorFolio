import { useDispatch, useSelector } from 'react-redux'
import { FaEye } from "react-icons/fa"
import DefaultImage from "../assets/image.jpg"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../Axios" 
import { deleteRecipe } from '../features/recipesSlice'


function Recipe() {

    const user = useSelector((state) => state.auth.data)

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this recipe?")) {
            dispatch(deleteRecipe(id))
            navigate("/")
        }
    }

    useEffect(() => {
        axios.get(`/api/recipes/${id}`)
            .then(res => {
                console.log(res.data)
                setRecipe(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        }   
    , [id])

    console.log(recipe)

    return (
        <div className="container-lg my-5">
                {loading ? (<div className="text-center mt-5">
                    <h3 className="text-secondary fw-bold fs-4">Wait a sec...</h3>
                </div>) :
            (<div className="row text-center justify-content-center">
                <div className="rounded">
                <img src={recipe.image ? `http://localhost:5000/${recipe.image}` : DefaultImage} alt={recipe.title} height={300} width={400} />
                </div>
                <h2 className="lead fw-bold mt-5">{recipe.title}</h2>

                {user && recipe?.author && user._id === recipe.author._id ? (
                    <div className="mt-3">
                        <div className="d-flex flex-row justify-content-center text-center">
                            <div>
                                <Link to={`/update/${recipe._id}`}><button className="btn btn-primary me-2">Edit</button></Link>  
                            </div>
                            <div>
                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(recipe._id)}>Delete</button>
                            </div>
                        </div>
                    </div>) : null}

                <h4 className="text-primary lead fw-bold mt-5">Published by {recipe.author.username}</h4>
                <p className="text-secondary lead fw-bold mt-2"><FaEye className="me-2" />{recipe.views}</p>
                <p className="lead mt-2">{recipe.content}</p>
            </div>)
        }
        </div>
    )
}

export default Recipe