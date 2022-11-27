
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const AllUser = () => {
  const [studentData, setdata] = useState([]);
  const history = useNavigate();
  const id = localStorage.getItem('token');
  let index = 1;
  useEffect(() => {
    let key = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = key;
    axios({
      method: "GET",
      url: "http://localhost/tripdata/fetchData.php"
    })
      .then(res => {
        // console.log(res);
        if (res.status) {
          if (res.status === 200) {
            setdata(res.data);
          } else if (res.status === 202) {

            history("/");
            window.location.reload();
            window.localStorage.removeItem("token")

          }
        }

      })
      .catch(err => console.log(err))

  }, [history]);

  const deleteUser = (id) => {
    console.log(id);
    axios.delete("http://localhost/tripdata/deleteUser.php", { data: { id: id } })
      .then(res => window.location.reload())
      .catch(err => console.log("Error"))

  }

  return (
    <>
      {


        <div className="container alluser-table" >
          <h2 className="headings"> Students Data</h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Profile Pic</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                studentData.map((data, key) => {
                  console.log(data.token);
                  return (

                    <tr key={data.id}>
                      <th scope="row">{index++}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.age}</td>
                      <td>{data.gender}</td>
                      <td>
                        {data.fileName !== "" ?
                          <img src={require(`../upload/${data.FileName.split('/').pop()}`)} className="my-2 mx-3" width="75" height="75" alt="img" />
                          : <img alt="profile pic" />
                        }
                      </td>

                      <td>
                        <Link to={{ pathname: `/editUser/${data.id}` }} >
                          <button type="button" className="btn btn-success">
                            Edit
                          </button>
                        </Link>
                        <button type="button" className="btn btn-danger mx-3" onClick={() => deleteUser(data.id)} >
                          Delete
                        </button>
                      </td> :
                      <td></td>


                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>
      }
    </>
  )
}

export default AllUser;