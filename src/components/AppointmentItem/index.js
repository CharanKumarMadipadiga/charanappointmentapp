import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="appointment-card">
        <p className="title">{title}</p>
        <button className="star-btn" type="button" onClick={onClickStar}>
          <img src={imgUrl} className="unfilled-star-img" alt="star-img" />
        </button>
      </div>
      <p className="date-content">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
