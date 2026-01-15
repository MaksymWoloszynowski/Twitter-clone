import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import NotFound from "./pages/not_found/NotFound";
import RequireAuth from "./components/RequireAuth";
import AdminPage from "./pages/AdminPage";
import PublicLayout from "./layouts/PublicLayout";
import UnauthorizedPage from "./pages/unauthorized/UnauthorizedPage";
import PersistLogin from "./pages/PersistLogin";
import Profile from "./pages/profile/Profile";
import AppLayout from "./layouts/AppLayout";
import Notifications from "./pages/notifications/Notifications";
import Tweet from "./pages/tweet/Tweet";
import Follows from "./pages/follows/Follows";
import CurrentChat from "./components/chat/CurrentChat";
import Chat from "./pages/chat/Chat";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Explore from "./pages/explore/Explore";

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
            <Route path="explore" element={<Explore />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="chat" element={<Chat />}>
              <Route path=":id" element={<CurrentChat />} />
            </Route>
            <Route path="profile/:profileId" element={<Profile />} />
            <Route
              path="profile/:profileId/tweets/:tweetId"
              element={<Tweet />}
            />
            <Route
              path="profile/:profileId/:followType"
              element={<Follows />}
            />
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
