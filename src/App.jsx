import {BrowserRouter, Route, Routes} from "react-router-dom"
import Body from "./component/Body"
import Login from "./component/Login"
import Profile from "./component/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./component/Feed"  
import Connection from "./component/Connection"
import Request from "./component/Request"
import SignUp from "./component/SignUp"
import Chat from "./component/Chat"

function App() {

  return (
    
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}  />
          <Route path="/connection" element={<Connection/>}  />
          <Route path="/request" element={<Request/>}  />
          <Route path="/signup" element={<SignUp/>}  />
          <Route path="/chat/:chatId" element={<Chat/>}  />
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
   
  )
}

export default App
