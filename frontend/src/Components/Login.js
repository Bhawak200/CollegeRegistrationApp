import { useState } from "react";
import axios from "axios"
import { useCookies } from 'react-cookie';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookie] = useCookies(['x-token']);

  const handleSubmit = (e) => {
    //  console.log(email, password);
    e.preventDefault();
    let formData = new FormData();
    formData.append('email', email)
    formData.append('password', password);
    axios({
      method: "POST",
      url: "http://localhost/tripdata/login.php",
      data: formData,
      config: {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
    })
      .then(res => {
        //console.log(res.data.token);
        console.log(res);
        if (res.data.status === "200") {
          // setCookie('token', res.data.token, { path: '/' });
          window.localStorage.setItem("token", res.data.token)
          window.location.reload();
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err => console.log(1, err))
    // console.log(data);
    setEmail("");
    setPassword("");
  }

  return (
    <form className="container my-5">
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" value={email} placeholder="Enter your Email id" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" id="login" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Login;