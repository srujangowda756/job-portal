import {Component} from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profile: {},
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    jobsStatus: apiStatus.initial,
    profileStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      const profile = data.profile_details
      this.setState({
        profile: {
          name: profile.name,
          imageUrl: profile.profile_image_url,
          shortBio: profile.short_bio,
        },
        profileStatus: apiStatus.success,
      })
    } else {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsStatus: apiStatus.loading})
    const {
      searchInput,
      selectedEmploymentTypes,
      selectedSalaryRange,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentType = selectedEmploymentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const response = await fetch(apiUrl, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      const jobs = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
        companyLogoUrl: each.company_logo_url,
        jobDescription: each.job_description,
      }))
      this.setState({jobsList: jobs, jobsStatus: apiStatus.success})
    } else {
      this.setState({jobsStatus: apiStatus.failure})
    }
  }

  changeEmploymentType = value => {
    this.setState(
      prev => ({
        selectedEmploymentTypes: prev.selectedEmploymentTypes.includes(value)
          ? prev.selectedEmploymentTypes.filter(each => each !== value)
          : [...prev.selectedEmploymentTypes, value],
      }),
      this.getJobs,
    )
  }

  changeSalaryRange = value => {
    this.setState({selectedSalaryRange: value}, this.getJobs)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderProfile = () => {
    const {profile, profileStatus} = this.state
    if (profileStatus === apiStatus.loading) {
      return (
        <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ffffff" height={50} width={50} />
          </div>
      )
    }
    if (profileStatus === apiStatus.failure) {
      return (
        <div className="profile-failure">
          <button type="button" className="retry-btn" onClick={this.getProfile}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="profile-card">
        <img src={profile.imageUrl} alt="profile" />
        <h1>{profile.name}</h1>
        <p>{profile.shortBio}</p>
      </div>
    )
  }

  renderJobs = () => {
    const {jobsList, jobsStatus} = this.state
    if (jobsStatus === apiStatus.loading) {
      return (
        <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ffffff" height={50} width={50} />
          </div>
      )
    }
    if (jobsStatus === apiStatus.failure) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" className="retry-btn" onClick={this.getJobs}>
            Retry
          </button>
        </div>
      )
    }
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(each => (
          <JobCard key={each.id} job={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="left-section">
            {this.renderProfile()}
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="right-section">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearch}
                className="search-input"
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
