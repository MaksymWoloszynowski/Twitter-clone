const ProfileHeader = ({ user }) => {
  return (
    <section>
      <h2>@{user.username}</h2>
      {user.bio && <p>{user.bio}</p>}
    </section>
  );
};

export default ProfileHeader;