const ProfileStats = ({ user }) => {
  return (
    <section style={{ display: "flex", gap: "1.5rem" }}>
      <span>
        <strong>{user.followingCount}</strong> Following
      </span>
      <span>
        <strong>{user.followersCount}</strong> Followers
      </span>
    </section>
  );
};

export default ProfileStats;