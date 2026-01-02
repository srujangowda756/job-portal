import {BsStarFill, BsBriefcase, BsGeoAltFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job

  return (
    <li className="similar-job-card">
      <img
        src={companyLogoUrl}
        alt="similar job company logo"
        className="company-logo"
      />
      <h1 className="job-title">{title}</h1>
      <div className="rating-container">
        <BsStarFill className="star-icon" />
        <p>{rating}</p>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="job-meta">
        <div className="meta-item">
          <BsGeoAltFill />
          <p>{location}</p>
        </div>
        <div className="meta-item">
          <BsBriefcase />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
