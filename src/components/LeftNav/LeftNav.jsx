import React, { useEffect, useState } from 'react'
import './LeftNav.css'
import { axiosGet } from '../../axiosServices'

const LeftNav = ({ employeeId }) => {
  const [empById, setEmpById] = useState([])


  const getEmployeeById = async () => {
    try {
      const res = await axiosGet(`/client/${employeeId}`)
      setEmpById(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getEmployeeById()
  }, [employeeId])

  return (
    <nav className='leftNav'>
      <div className="employeeDetail">
        <h2>Full Detail</h2>
        <img src={empById.image} alt='pic' />
        <h1>{empById.firstname} {empById.lastname}</h1>
        <p>{empById.email}</p>
        <p>{empById.phone}</p>
        <p>{empById.activity}</p>
        <p>{empById.durations}</p>
        <p>{empById.description}</p>
        <p className='date'>{empById.dateofjoining}</p>
      </div>
    </nav>
  )
}

export default LeftNav
