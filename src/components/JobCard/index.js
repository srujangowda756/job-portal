import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcase, BsGeoAltFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-card">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details">
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
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="divider" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
