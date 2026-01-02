import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {name, imageUrl, shortBio} = profileDetails

  return (
    <div className="profile-container">
      <img src={imageUrl} alt="profile" className="profile-img" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default Profile
