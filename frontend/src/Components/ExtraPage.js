import { Link } from "react-router-dom"


const ExtraPage = () => {
  return (
    <div className="container my-5">
      <h1>Sorry you are not logged in</h1>
      <Link to="/login"><button className="btn btn-warning text-center">Login</button></Link>

    </div>
  )
}

export default ExtraPage;