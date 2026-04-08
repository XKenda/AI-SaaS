import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFeature from "./pages/NotFeature"

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/not-feature" element={<NotFeature />} />
        </Routes>
      </Router>
  )
}

export default App;