import { Link } from "react-router-dom"
import HeroImg from "../assets/home.png"
import DefaultImage from "../assets/image.jpg"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchRecipes } from "../features/recipesSlice"

function Home() {

    const{ recipes, status } = useSelector((state) => state.recipes)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch])

    return (
        <div className="container-lg my-5">
            <div className="row align-items-center align-content-center">
                <div className="col-md-6 mt-5 mt-md-0">
                    <div className="text-center">
                        <img src={HeroImg} alt="" className="img-fluid" height="350px" width="450px" />
                    </div>
                </div>
                <div className="col-md-6 mt-5 mt-md-0 order-md-first">
                    <div>
                        <h1 className="text-primary text-uppercase fs-1 fw-bold">Write Your Own Stories And Share it with Everyone!</h1>
                        <p className="mt-4 text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, tenetur
                            sequi odit ipsam iusto cupiditate totam aut eligendi dolorem vero, repudiandae magni laudantium
                            illum impedit nulla quis et, at omnis?</p>
                        <Link to="/write"><button className="btn btn-primary px-3 my-3 fw-bold">Write a recipe</button></Link>
                    </div>
                </div>
            </div>

            <div className="my-5">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center">
                            <h2 className="fw-bold mb-5">Latest Recipes</h2>
                        </div>
                    </div>
                </div>

                {status === "loading" && (<div className="text-center mt-5">
                    <h3 className="text-secondary fw-bold fs-4">Loading...</h3>
                </div>)}

                {status === "error" && (<div className="text-center mt-5">
                    <h3 className="text-secondary fw-bold fs-4">Oops Something is wrong !</h3>
                </div>)}

                <div className="row">

                    {status === "success" && recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-6 col-lg-4 text-center text-decoration-none">
                            <div className="shadow rounded">
                                <img src={recipe.image ? `http://localhost:5000/${recipe.image}` : DefaultImage} alt={recipe.title} height={300} width={400} />
                            </div>
                            <h2 className="lead fw-bold my-4">{recipe.title}</h2>
                            <Link to={`/recipe/${recipe._id}`}><button className="btn btn-primary text-white lead fw-bold mb-5">Read recipe</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home