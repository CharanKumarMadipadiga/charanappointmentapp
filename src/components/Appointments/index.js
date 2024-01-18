import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    dateInput: '',
    isFilterActive: false,
  }

  onReadTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onReadDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  filterStarredItems = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filteredClass = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <div className="title-container">
                <label htmlFor="input" className="label-El">
                  TITLE
                </label>
                <input
                  type="text"
                  id="input"
                  className="input-El"
                  placeholder="Title"
                  onChange={this.onReadTitleInput}
                  value={title}
                />
              </div>
              <div className="title-container">
                <label htmlFor="input-date" className="label-El">
                  DATE
                </label>
                <input
                  type="date"
                  id="input-date"
                  className="input-El"
                  onChange={this.onReadDateInput}
                  value={date}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div className="appointments-img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="appointment-starred-con">
            <h1 className="heading">Appointments</h1>
            <button
              className={`starred-btn ${filteredClass}`}
              type="button"
              onClick={this.filterStarredItems}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
