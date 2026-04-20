import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFeature from "./pages/NotFeature"

import PageNotFound from "./pages/PageNotFound"
import { useState, useEffect, createContext, useCallback } from "react"
import { getUser } from "../API/userApi"
import { deleteJobAPI, getJobs, updateJobAPI } from "../API/jobApi"
import CreateJob from "./pages/CreateJob"
import EditJob from "./pages/EditJob"

export const UserContext = createContext(null)
export const JobContext = createContext(null)

function App() {
  const [user , setUser] = useState({});
  const [data, setData] = useState({});
  const navigator = useNavigate();


  const getAllJobs = useCallback( async ()=>{
        await getJobs().then((res) => {
          if(res.data.success) setData(res.data.data)
            
        }).catch((err) => {
          console.log(err)
        })
  })

  const deleteJob = useCallback(async(id)=>{
    await deleteJobAPI(id).then((res)=>{
      console.log(res)
      if(res.data.success) setData((prev)=> prev.filter((job)=> job._id !== id))
    }).catch((err)=>{
      console.log(err)
    })
  })

  const updateJob = useCallback(async(id, update)=>{
      setData((prev)=> prev.map((job)=> job._id === id ? update : job))
  })


  useEffect(()=>{
    async function HandleGetUSer() {

        await getUser().then((res)=>{
          if(res.data.success) setUser(res.data.data)

        }).catch((err)=>{
          if(err.status) navigator("/auth/login")
        })

        await getAllJobs()

    }

    HandleGetUSer()
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <JobContext.Provider value={{data, setData, getAllJobs, deleteJob, updateJob}}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/create/job" element={<CreateJob />} />
            <Route path="/not-feature" element={<NotFeature />} />
            <Route path="/edit/job/:id" element={<EditJob />} />
            <Route path="/auth">
              <Route path="register" element={<Register />}  />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Routes>

      </JobContext.Provider>
    </UserContext.Provider>
  )
}

export default App;