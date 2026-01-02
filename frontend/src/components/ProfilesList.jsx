import ProfileCard from "./profile/ProfileCard";

const ProfilesList = ({ profiles }) => {
  
  return (
    <div>
      {profiles.map((profile) => {
        return <ProfileCard key={profile.id} profile={profile} />;
      })}
    </div>
  );
};

export default ProfilesList;
