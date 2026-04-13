import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFeature from "./pages/NotFeature"

import PageNotFound from "./pages/PageNotFound"
import { useState, useEffect, createContext } from "react"
import { getUser } from "../API/userApi"

export const UserContext = createContext(null)

function App() {
  const [user , setUser] = useState(null)


  useEffect(()=>{
    async function HandleGetUSer() {
      
      
      try {
        await getUser().then((res)=>{
          if(res.data.success) setUser(res.data.data)
          console.log(res.data.data)
          console.log(user)
        }).catch((err)=>{
          console.log(err)
        })
      } catch (e) {
        console.log(e)
      }
    }
    HandleGetUSer()
  }, []);



  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/not-feature" element={<NotFeature />} />
          <Route path="/auth">
            <Route path="register" element={<Register />}  />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App;