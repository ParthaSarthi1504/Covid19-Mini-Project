import './index.css'

const NotFound = props => {
  const redirectionToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="bg-div-not-found-view">
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684001781/Group_7484_1_cpvxjf.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          we’re sorry, the page you requested could not be found
        </p>
        <p className="not-found-description">Please go to the homepage</p>
        <button
          type="button"
          className="homepage-redirect-btn"
          onClick={redirectionToHome}
        >
          Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
