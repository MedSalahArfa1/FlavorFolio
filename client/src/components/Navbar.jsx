import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaBars, FaHome, FaSignInAlt, FaUserPlus, FaUserAlt, FaSignOutAlt } from "react-icons/fa"
import { logout, account } from '../features/authSlice'
import { useEffect } from 'react'

function Navbar() {
    const user = useSelector((state) => state.auth.data)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && window.localStorage.getItem("token")) {
            dispatch(account());
        }
    }, [user, dispatch]);


    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout())
            window.localStorage.removeItem("token")
            navigate("/")
        }
    }

    return (
        <nav className="navbar navbar-light bg-light shadow-sm">
            <div className="container-lg">
                <Link to="/" className="text-decoration-none">
                    <div className="navbar-brand text-primary fw-bold fst-italic fs-3">
                        FlavorFolio
                    </div>
                </Link>
                <div className="d-md-block d-none">
                    {user ?
                    (<div className='d-flex align-items-center justify-content-center'>
                        <div className="text-primary text-decoration-none d-flex align-text-center align-content-center">
                            <FaUserAlt className="me-2 mt-2 fs-5" />
                            <h4 className="mt-2 me-5 fs-5 fw-bold">{user.username}</h4>
                        </div>
                        <div className="px-4 rounded-pill">
                            <button className="btn btn-primary text-white lead fw-bold" onClick={handleLogout}>
                                <FaSignOutAlt className="me-2" />Sign Out
                            </button>
                        </div>    
                    </div>)
                    :
                    (<div className="d-flex gap-3 align-items-center">
                        <Link to="/login" className="px-4 rounded-pill">
                            <button className="btn btn-primary text-white lead fw-bold"><FaSignInAlt className="me-2" />Login</button>
                        </Link>
                        <Link to="/register" className="px-4 rounded-pill">
                            <button className="btn btn-primary text-white lead fw-bold"><FaUserPlus className="me-2" />Register</button>
                        </Link>
                    </div>)
                    }
                </div>
                <div className="d-block d-md-none">
                    <div className="dropdown">
                        <button className="btn btn-primary px-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaBars className="mb-1" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <Link to="/" className="text-decoration-none">
                                <li className="dropdown-item text-secondary fw-bold fs-6"><FaHome className="me-2" />Home</li>
                            </Link>
                            { user ?
                            <div>
                            <div className="text-primary text-decoration-none">
                                <li className="dropdown-item text-secondary fw-bold fs-6">
                                    <FaUserAlt className="me-2" />{user.username}
                                </li>
                            </div>
                            <li className="dropdown-item text-secondary fw-bold fs-6" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" />Sign Out
                            </li>
                            </div>
                            :
                            <div>
                            <Link to="/login" className="text-decoration-none">
                                <li className="dropdown-item text-secondary fw-bold fs-6"><FaSignInAlt className="me-2" />Log In</li>
                            </Link>
                            <Link to="/register" className="text-decoration-none">
                                <li className="dropdown-item text-secondary fw-bold fs-6"><FaUserPlus className="me-2" />Register</li>
                            </Link>
                            </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar