import {BrowserRouter, Route, Routes} from "react-router-dom"
import Body from "./component/Body"
import Login from "./component/Login"
import Profile from "./component/Profile"



function App() {

  return (
    
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body/>}>

          <Route path="login" element={<Login/>}/>
          <Route path="Profile" element={<Profile/>}  />
          
        </Route>
      </Routes>
      </BrowserRouter>
    </>
   
  )
}

export default App
