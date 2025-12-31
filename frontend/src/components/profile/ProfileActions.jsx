import useAuth from "../../hooks/useAuth";

const ProfileActions = ({ user }) => {
  const { auth } = useAuth();

  if (!auth || auth.username === user.username) {
    return null;
  }

  return (
    <section>
      <button>Follow</button>
    </section>
  );
};

export default ProfileActions;