
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  const history = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    let key = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = key;
    axios({
      method: "POST",
      url: "http://localhost/tripdata/logout.php",
      config: {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
    })
      .then(res => {
        console.log(res.data);
        if (res.data.status !== "") {
          history("/");
          window.location.reload();
          window.localStorage.removeItem("token")


        }

      })
      .catch(err => console.log(err))
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">IIT BHU Trip Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">

            {
              !props.id ?
                <>
                  <Link className="nav-link active" to="/">Login</Link>

                </> :
                <>
                  <Link className="nav-link active" to="/"> Add User</Link>
                  <Link className="nav-link active" to="/allUser">All User</Link>
                  <button className="btn btn-warning" onClick={handlelogout}>Logout</button>
                </>
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;