
import Login from "./Components/Auth/Login";
import Posts from "./Components/AllPosts/Posts";
import NewPosts from "./Components/CreatePosts/NewPosts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePost from "./Components/UpdatePost/UpdatePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Posts" Component={Posts} />
          <Route path="/NewPosts" Component={NewPosts} />
          <Route path="/UpdatePost" Component={UpdatePost} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
