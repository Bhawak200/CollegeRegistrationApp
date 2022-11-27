
import './App.css';
import AddUser from "./Components/AddUser"
import AllUser from "./Components/AllUser"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditUser from './Components/EditUser';
import Header from './Components/Header';
import Login from './Components/Login';
import bhu from "./bg.jpg";
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [id, setId] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("token");

    if (key !== "") {
      axios.get("http://localhost/tripdata/validate.php?key=" + key)
        .then(res => {
          if (res.data.status === "200") {
            setId(true);
          }

        })
        .catch(err => console.log(err));
    } else setId(false);

  }, [id]);




  return (
    <BrowserRouter>
      <div className="App">
        <img src={bhu} className="bg" alt="IIT BHU" />
        <Header id={id} />
        <Routes>

          {!id ?

            <Route path="/" element={<Login />} />
            :
            <>
              <Route path="/" element={<AddUser />} />
              <Route path="/allUser/" element={<AllUser />} />
              <Route path="/editUser/:id" element={<EditUser />} />
            </>

          }
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
