import RadioButton from "./Buttonss/RadioButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const EditUser = (props) => {
  const [name, setname] = useState("");
  const [age, setage] = useState(0);
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const token = localStorage.getItem('token');
  const [selectedFile, setSelectedFile] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  const handlegender = (gen) => setgender(gen);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    loadUser(id);
  }, [id])


  const loadUser = (id) => {
    axios.get("http://localhost/tripdata/fetchDataByid.php?id=" + id)
      .then(res => {
        setage(res.data.age);
        setemail(res.data.email);
        setname(res.data.name);
        setgender(res.data.gender);
        if (res.data.FileName !== "") setSelectedFile(res.data.FileName.split('/').pop());

      })
      .catch(err => console.log(err));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name)
    formData.append('age', age)
    formData.append('email', email)
    formData.append('gender', gender)
    formData.append('fileName', selectedFile)
    let key = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = key;
    // console.log(selectedFile);
    console.log(age);
    axios({
      method: 'POST',
      url: "http://localhost/tripdata/update.php",
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(res => {
      //console.log(res.data);
      history("/allUser");

    }).catch(err => console.log(err));
  }
  return (
    <>

      <div className="container">
        <h1 className="headings">Edit Details</h1>
        <form>
          <div className="form-group">
            <label >Name</label>
            <input type="text" className="form-control" value={name} placeholder={name} onChange={(e) => setname(e.target.value)} required="required" />
          </div>

          <div className="form-group">
            <label >Email address</label>
            <input type="email" className="form-control" value={email} placeholder={email} onChange={(e) => setemail(e.target.value)} required />

          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" value={age} className="form-control" placeholder={age} onChange={(e) => setage(e.target.value)} required="required" />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <RadioButton gender={gender} handlegender={handlegender} />
          </div>

          <div className="form-group">
            <label>Profile Pic</label>
            <input type="file" className="form-control" name="file" onChange={changeHandler} />
          </div>

          <button type="submit" className="btn btn-warning" data-bs-dismiss="modal" onClick={handleSubmit}>Update changes</button>
        </form>

      </div>

    </>
  )
}

export default EditUser;