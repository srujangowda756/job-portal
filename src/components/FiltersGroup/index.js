import React from 'react';
import './index.css';

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const onSelectEmploymentType = event => {
    changeEmploymentType(event.target.value)
  }

  const onSelectSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onSelectEmploymentType}
            />
            <label htmlFor={each.employmentTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="separator" />
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={onSelectSalaryRange}
            />
            <label htmlFor={each.salaryRangeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
