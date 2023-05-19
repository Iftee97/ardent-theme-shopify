import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import { State, City } from 'country-state-city'
import zipcodes from 'zipcodes'

export default function App() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPostalCode, setSelectedPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState([])
  const [stateError, setStateError] = useState(false)

  const states = State.getStatesOfCountry('US')
  const cities = City.getCitiesOfState('US', selectedState)

  const smapleTableData = [
    {
      "_id": "6466137e7253b9f0b45bad81",
      "company": "Doofenshmirtz Evil inc.",
      "firstName": "Robert",
      "lastName": "Chuy",
      "address1": "10707 Robincreek Lane",
      "address2": "unknown",
      "state": "Texas",
      "city": "Frisco",
      "zipcode": "75035",
      "phone": "(972)795-0636",
      "email": "rob@gulfatl.net",
      "territory": "area 51",
      "__v": 0
    },
    {
      "_id": "64662b22cf5e7efd8553987e",
      "company": "Gulf Atlantic Marketing, Inc.",
      "firstName": "Robert",
      "lastName": "Chuy",
      "address1": "10707 Robincreek Lane",
      "address2": "",
      "state": "Texas",
      "city": "Frisco",
      "zipcode": "75035",
      "phone": "(972)795-0636",
      "email": "rob@gulfatl.net",
      "territory": "",
      "__v": 0
    }
  ]

  const tableData = [
    {
      id: 0,
      title: 'Southtown Sporting Goods',
      imgPath: '../assets/southtown-sporting-goods.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Chino',
      address: '12615 Colony Street Chino, CA 91710',
      phone: '909-590-7425'
    },
    {
      id: 1,
      title: 'Anglers World',
      imgPath: '../assets/anglers-world.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'El Sobrante',
      address: '3823 San Pablo Dam Road El Sobrante, CA 94803',
      phone: '510-243-1300'
    },
    {
      id: 2,
      title: 'Fisherman’s Warehouse',
      imgPath: '../assets/fishermans-warehouse.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Huntington Beach',
      address: '16942 D Gothard St. Huntington Beach, CA 92647',
      phone: '714-841-6878'
    },
    {
      id: 3,
      title: 'Anglers Arsenal',
      imgPath: '../assets/anglers-arsenal.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'La Mesa',
      address: '8183 Center Street, La Mesa, CA 91942',
      phone: '619-466-8355'
    },
    {
      id: 4,
      title: 'Anglers Center',
      imgPath: '../assets/anglers-center.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Newport',
      address: '419 N. Old Newport Blvd. Newport, CA 92663',
      phone: '949-642-6662'
    },
  ]

  const tableHeadCols = ['Dealer Name', 'City/Town', 'Address', 'Phone']

  useEffect(() => {
    if (selectedState) {
      setStateError(false)
    }
  }, [selectedState])

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

    if (!selectedState) {
      setStateError(true)
      return
    }

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
            {stateError ? (
              <span className={styles.error}>
                Please select a state
              </span>
            ) : (
              <span className={styles.label}>
                Select State
              </span>
            )}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={styles.field}
              style={{ outline: stateError && '3px solid #EA0029' }}
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
      {tableData?.length > 0 && (
        <>
          <div className={styles.tableContainer}>
            <div className={styles.tableHeadTop}>
              <p>Search Result</p>
              <span>100 Dealers</span>
            </div>
            <table className={styles.table} style={{ borderCollapse: 'collapse' }}>
              <thead className={styles.tableHead}>
                <tr>
                  {tableHeadCols.map((data, index) => (
                    <th key={index} className={styles.tableHeadItem}>
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {tableData.map((data, index) => (
                  <tr key={data.id || index} style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFF' }}>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '610px' }}>
                      <div className={styles.tableBodyDealer}>
                        <img
                          src={data.imgPath}
                          alt={data.imgPath.split('/')[2]}
                          className={styles.dealerImage}
                        />
                        <div>
                          <p className={styles.dealerTitle}>
                            {data.title}
                          </p>
                          <a
                            href={data.googleMapsUrl}
                            target='_blank'
                            className={styles.dealerMapUrl}
                          >
                            Google Map
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '200px' }}>
                      {data.city}
                    </td>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '200px' }}>
                      {data.address.split(',')[0]} <br />
                      {data.address.split(',')[1]}
                    </td>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '200px' }}>
                      <a href={`tel:${data.phone}`}>
                        {data.phone}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.mobileTableContainer}>
            <div className={styles.mobileTable}>
              <div className={styles.tableHead}>
                <div className={styles.tableHeadItem}>
                  Dealer Name
                </div>
              </div>
              <div className={styles.tableBody}>
                {tableData.map((data, index) => (
                  <div
                    key={data.id || index}
                    className={styles.mobileTableRow}
                    style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFF' }}
                  >
                    <img
                      src={data.imgPath}
                      alt={data.imgPath.split('/')[2]}
                      className={styles.dealerImage}
                    />
                    <div className={styles.dealerData}>
                      <div style={{ marginBottom: '8px' }}>
                        <h5 className={styles.dealerTitle}>
                          {data.title}
                        </h5>
                        <a
                          href={data.googleMapsUrl}
                          target='_blank'
                          className={styles.dealerMapUrl}
                        >
                          Google Map
                        </a>
                      </div>
                      <div>
                        <div style={{ marginBottom: '4px', display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '6px' }}>
                          <span style={{ color: '#151901', fontWeight: 500, fontSize: '12px' }}>
                            City/Town {' '}
                          </span>
                          <span style={{ color: '#666', fontWeight: 400, fontSize: '12px' }}>
                            {data.city}
                          </span>
                        </div>
                        <div style={{ marginBottom: '4px', display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '6px' }}>
                          <span style={{ color: '#151901', fontWeight: 500, fontSize: '12px' }}>
                            Address {' '}
                          </span>
                          <span style={{ color: '#666', fontWeight: 400, fontSize: '12px' }}>
                            {data.address}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '6px' }}>
                          <span style={{ color: '#151901', fontWeight: 500, fontSize: '12px' }}>
                            Phone {' '}
                          </span>
                          <span style={{ color: '#DF421E', fontWeight: 400, fontSize: '12px' }}>
                            <a href={`tel:${data.phone}`} style={{ textDecoration: 'none' }}>
                              {data.phone}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {tableData?.length === 0 && (
        <div className={styles.noData}>
          No data found
        </div>
      )}
    </div >
  )
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
