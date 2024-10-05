import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Write from './pages/Write'
import Recipe from './pages/Recipe'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from './Axios'
import { account } from './features/authSlice'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: `/`,
        element: <Home />
      },
      {
        path: `/register`,
        element: <Register />
      },
      {
        path: `/login`,
        element: <Login />
      },
      {
        path: `/recipe/:id`,
        element: <Recipe />
      },
      {
        path: `/write`,
        element: <Write />
      },
      {
        path: `/update/:id`,
        element: <Write />
      }
    ]
  }
])

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      dispatch(account())
    }
  }, [dispatch])


  return (
    <RouterProvider router={router} />
  )
}

export default App