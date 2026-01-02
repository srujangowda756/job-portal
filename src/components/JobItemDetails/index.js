import {Component} from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import {BsStarFill, BsBriefcase, BsGeoAltFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobData: {}, similarJobs: [], status: apiStatus.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      const job = data.job_details
      const formattedJob = {
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        packagePerAnnum: job.package_per_annum,
        title: job.title,
        skills: job.skills,
        lifeAtCompany: job.life_at_company,
      }
      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        companyLogoUrl: each.company_logo_url,
      }))
      this.setState({
        jobData: formattedJob,
        similarJobs,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
        <ThreeDots color="#ffffff" height={50} width={50} />
      </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
      title,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-meta">
            <div className="meta-item">
              <BsGeoAltFill />
              <p>{location}</p>
            </div>
            <div className="meta-item">
              <BsBriefcase />
              <p>{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="divider" />
          <div className="description-header">
            <h1>Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <BsBoxArrowUpRight />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="section-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <li key={each.name} className="skill-item">
                <img src={each.image_url} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="section-heading">Life at Company</h1>
          <div className="life-at-company">
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="section-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJobItem key={each.id} job={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {status} = this.state
    let view
    if (status === apiStatus.loading) view = this.renderLoader()
    else if (status === apiStatus.success) view = this.renderSuccess()
    else if (status === apiStatus.failure) view = this.renderFailure()

    return (
      <>
        <Header />
        {view}
      </>
    )
  }
}

export default JobItemDetails
