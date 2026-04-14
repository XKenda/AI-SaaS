import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFeature from "./pages/NotFeature"

import PageNotFound from "./pages/PageNotFound"
import { useState, useEffect, createContext } from "react"
import { getUser } from "../API/userApi"
import { getJobs } from "../API/jobApi"

export const UserContext = createContext(null)
export const JobContext = createContext(null)

function App() {
  const [user , setUser] = useState({})
  const [jobs, setJobs] = useState({});


  useEffect(()=>{
    async function HandleGetUSer() {

        await getUser().then((res)=>{
          if(res.data.success) setUser(res.data.data)

        }).catch((err)=>{
          console.log(err)
        })

        await getJobs().then((res) => {
          if(res.data.success) setJobs(res.data.data)

        }).catch((err) => {
          console.log(err)
        })

    }

    HandleGetUSer()
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <JobContext.Provider value={{jobs, setJobs}}>
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
      </JobContext.Provider>
    </UserContext.Provider>
  )
}

export default App;