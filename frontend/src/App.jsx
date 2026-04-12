import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFeature from "./pages/NotFeature"
import SideBar from "./pages/SideBar"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
      <Router>
        <SideBar />
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
  )
}

export default App;