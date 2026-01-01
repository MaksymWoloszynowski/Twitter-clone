import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import AdminPage from "./pages/AdminPage";
import PublicLayout from "./layouts/PublicLayout";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PersistLogin from "./pages/PersistLogin";
import Profile from "./pages/Profile";
import AppLayout from "./layouts/AppLayout";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Tweet from "./pages/Tweet";
import Follows from "./pages/Follows"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
          <Route element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="profile/:profileId/tweets/:tweetId" element={<Tweet />} />
            <Route path="profile/:profileId/:followType" element={<Follows />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
