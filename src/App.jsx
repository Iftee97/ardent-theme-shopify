import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import { Country, State, City } from 'country-state-city'
import zipcodes from 'zipcodes'

export default function App() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPostalCode, setSelectedPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState([])

  const states = State.getStatesOfCountry('US')
  const cities = City.getCitiesOfState('US', selectedState)

  // useEffect(() => {
  //   console.log('states: >>>>>>>>>>', states)
  //   console.log('cities: >>>>>>>>>>', cities)
  //   console.log('selectedState: >>>>>>>>>>', selectedState)
  //   console.log('selectedCity: >>>>>>>>>>', selectedCity)
  //   console.log('selectedPostalCode: >>>>>>>>>>', selectedPostalCode)
  // }, [states, cities, selectedState, selectedCity, selectedPostalCode])

  function getPostalCodes(city, state) {
    const locations = zipcodes.lookupByName(city, state)
    return locations.map((location) => location.zip)
  }

  useEffect(() => {
    const postCodes = getPostalCodes(selectedCity, selectedState)
    // console.log('postCodes: >>>>>>>>>>', postCodes)
    setPostalCodes(postCodes)
  }, [selectedCity, selectedState])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log({
      selectedState,
      selectedCity,
      selectedPostalCode
    })
  }

  return (
    <div className={styles.container}>
      {/* form */}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span className={styles.label}>
              Select State
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={styles.field}
            >
              <option value=''>
                Select State
              </option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {`${state.name}, ${state.isoCode}`}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={styles.label}>
              Select City (optional)
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={styles.field}
            >
              <option value=''>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={styles.label}>
              Select Postal Code (optional)
            </span>
            <select
              value={selectedPostalCode}
              onChange={(e) => setSelectedPostalCode(e.target.value)}
              className={styles.field}
            >
              <option value=''>
                Select Postal Code
              </option>
              {postalCodes.map((postalCode) => (
                <option key={postalCode} value={postalCode}>
                  {postalCode}
                </option>
              ))}
            </select>
          </label>
          <button type='submit' className={styles.submitBtn}>
            <SearchIcon />
            <span>
              Search
            </span>
          </button>
        </form>
      </div>

      {/* table */}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
