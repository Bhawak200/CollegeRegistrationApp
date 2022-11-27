import axios from "axios";
import { useState } from "react";


import RadioButton from './Buttonss/RadioButton';

const AddUser = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState(0);
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const token = localStorage.getItem('token');

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlegender = (gen) => setgender(gen);

  const handleSubmit = (e) => {
    e.preventDefault();


    let formData = new FormData();
    formData.append('name', name)
    formData.append('age', age)
    formData.append('email', email)
    formData.append('gender', gender)
    formData.append('fileName', selectedFile)


    let key = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = key;

    axios({
      method: 'POST',
      url: "http://localhost/tripdata/index.php",
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(res => {
      console.log(res.data);
      if (res.data.status === "valid") alert("user added")
      else {
        localStorage.removeItem("token");
        window.location.reload();
      }
    })
      .catch(res => alert("user not added"));
    setemail("");
    setage(0);
    setgender("");
    setname("");
    setSelectedFile("");


  }

  return (
    <div className="container adduser">
      <h1 className="headings">Add User</h1>
      <form>

        <div className="form-group">
          <label >Name</label>
          <input type="text" className="form-control" value={name} placeholder="Enter Your Name" onChange={(e) => setname(e.target.value)} required="required" />
        </div>

        <div className="form-group">
          <label >Email address</label>
          <input type="email" className="form-control" value={email} placeholder="Enter your email" onChange={(e) => setemail(e.target.value)} required />

        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" value={age} className="form-control" placeholder="Enter your age" onChange={(e) => setage(e.target.value)} required="required" />
        </div>
        <div className="form-group">
          <label>Profile Pic</label>
          <input type="file" className="form-control" placeholder="Upload your profile pic" name="file" onChange={changeHandler} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <RadioButton gender={gender} handlegender={handlegender} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add User</button>
      </form>
    </div>
  )
}
export default AddUser;