import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
// import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import QnA from "./pages/QnA/QnA";
import Manual from "./pages/manual/Manual";
import Product from "./pages/product/Product";
import Mypage from "./pages/mypage/Mypage";
import Location from "./pages/trashcanLocation/TrashcanLocation";
import Character from "./pages/character/Character";
import Stat from "./pages/trashResult/TrashResult";
import Past_character from "./pages/pastCharacter/PastCharacter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/QnA" element={<QnA />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/characterlist" element={<Character />} />
          <Route path="/stats" element={<Stat />} />
          <Route path="/past_character" element={<Past_character />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
