// import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function App(){

       const [post, setPost] = useState(null);

        useEffect(() => {
          console.log("Effect");
          axios.get("http://localhost:5000/users.json")
          .then((response) => {
            console.log("Downloaded");
            setPost(response.data);
          })
          .catch((err)=>{
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
            } else if (err.request) {
              console.log(err.request);
            } else {
              console.log('Error', err.message);
            }
          });
        }, []);

        if (!post) return <h1>Cant connect to server ...</h1>;
        
        return (
               <div>
                  <ul className="users">
                    {post.map((user) => (
                      <li className="user">
                        <p>
                          <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                          <strong>City:</strong> {user.address.city}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                );
}

export default App;