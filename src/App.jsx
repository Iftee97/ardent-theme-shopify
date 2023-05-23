import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { State, City } from 'country-state-city'
import zipcodes from 'zipcodes'

export default function App() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPostalCode, setSelectedPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState([])
  const [stateError, setStateError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [newTableData, setNewTableData] = useState([])
  // const [btnDisabled, setBtnDisabled] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [hasNext, setHasNext] = useState(false)

  const states = State.getStatesOfCountry('US')
  const cities = City.getCitiesOfState('US', selectedState)

  const tableHeadCols = ['Dealer Name', 'City/Town', 'Address', 'Phone']

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
    {
      id: 5,
      title: 'Southtown Sporting Goods 123456789',
      imgPath: '../assets/southtown-sporting-goods.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Chino',
      address: '12615 Colony Street Chino, CA 91710',
      phone: '909-590-7425'
    },
    {
      id: 6,
      title: 'Anglers World 123456789',
      imgPath: '../assets/anglers-world.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'El Sobrante',
      address: '3823 San Pablo Dam Road El Sobrante, CA 94803',
      phone: '510-243-1300'
    },
    {
      id: 7,
      title: 'Fisherman’s Warehouse 123456789',
      imgPath: '../assets/fishermans-warehouse.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Huntington Beach',
      address: '16942 D Gothard St. Huntington Beach, CA 92647',
      phone: '714-841-6878'
    },
    {
      id: 8,
      title: 'Anglers Arsenal 123456789',
      imgPath: '../assets/anglers-arsenal.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'La Mesa',
      address: '8183 Center Street, La Mesa, CA 91942',
      phone: '619-466-8355'
    },
    {
      id: 9,
      title: 'Anglers Center 123456789',
      imgPath: '../assets/anglers-center.png',
      googleMapsUrl: 'https://www.google.com',
      city: 'Newport',
      address: '419 N. Old Newport Blvd. Newport, CA 92663',
      phone: '949-642-6662'
    },
  ]

  useEffect(() => {
    let pageQuery = new URLSearchParams(location.search)
    let pageNumber = pageQuery.get("page")
    if (!pageNumber) pageNumber = 1
    getDealerData(pageNumber)
    console.log("pageNumber: >>>>>>>>>", pageNumber)
  }, [location.search])

  async function getDealerData(pageNumber) {
    let number = pageNumber || 1
    const response = await fetch(`http://localhost:4000/proxy_route/dealer?page=${number}`)
    const data = await response.json()
    console.log('fetched dealer data: >>>>>>>>>>', data)
    setNewTableData(data.data)
    setCurrentPage(data.currentPage)
    setTotalPages(data.numberOfPages)
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      let value = +currentPage - 1
      setPage(value)
    } else {
      return
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      let value = +currentPage + 1
      setPage(value)
    } else {
      return
    }
  }

  function setPage(pageNumber) {
    setCurrentPage(pageNumber)
    const newURL = window.location.pathname + `?page=${pageNumber}`
    window.history.pushState({ path: newURL }, '', newURL)
    getDealerData(pageNumber)
  }

  useEffect(() => {
    if (selectedState) {
      setStateError(false)
    }
  }, [selectedState])

  function getPostalCodes(city, state) {
    const locations = zipcodes.lookupByName(city, state)
    return locations.map((location) => location.zip)
  }

  useEffect(() => {
    const postCodes = getPostalCodes(selectedCity, selectedState)
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

  function Pagination() {
    return (
      <div className={styles.paginationContainer}>
        <button className={styles.paginationBtn} onClick={() => handlePreviousPage()}>
          <ArrowLeft />
          <span>Previous</span>
        </button>
        <button className={styles.paginationBtn} onClick={() => handleNextPage()}>
          <span>Next</span>
          <ArrowRight />
        </button>
      </div >
    )
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
      {newTableData?.length > 0 && (
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
                {newTableData.map((data, index) => (
                  <tr key={data.id || index} style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFF' }}>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '610px' }}>
                      <div className={styles.tableBodyDealer}>
                        <img
                          src={data.file}
                          alt={data.name}
                          className={styles.dealerImage}
                        />
                        <div>
                          <p className={styles.dealerTitle}>
                            {data.name}
                          </p>
                          <a
                            href={data.googleMapUrl}
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
                      {data.address}
                    </td>
                    <td className={styles.tableBodyItem} style={{ maxWidth: '200px' }}>
                      <a href={`tel:${data.phone}`}>
                        {data.phone}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <Pagination totalPages={Math.ceil(newTableData.length / 5)} />
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
                {newTableData.map((data, index) => (
                  <div
                    key={data.id || index}
                    className={styles.mobileTableRow}
                    style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFF' }}
                  >
                    <img
                      src={data.file}
                      alt={data.name}
                      className={styles.dealerImage}
                    />
                    <div className={styles.dealerData}>
                      <div style={{ marginBottom: '8px' }}>
                        <h5 className={styles.dealerTitle}>
                          {data.name}
                        </h5>
                        <a
                          href={data.googleMapUrl}
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
              <Pagination totalPages={Math.ceil(newTableData.length / 5)} />
            </div>
          </div>
        </>
      )}
      {newTableData?.length === 0 && (
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

function ArrowLeft() {
  return (
    <svg className={styles.arrow} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8327 9.99996H4.16602M4.16602 9.99996L9.99935 15.8333M4.16602 9.99996L9.99935 4.16663" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className={styles.arrow} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.16602 9.99996H15.8327M15.8327 9.99996L9.99935 4.16663M15.8327 9.99996L9.99935 15.8333" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
