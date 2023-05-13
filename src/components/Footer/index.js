import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <img
        src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683786494/COVID19INDIA_hpjj6o.png"
        className="covid-logo2"
        alt="covidLogo"
      />
      <p className="footer-para">
        We stand with everyone fighting on the front lines
      </p>
      <div className="footer-logos-div">
        <VscGithubAlt className="footer-icons" />
        <FiInstagram className="footer-icons" />
        <FaTwitter className="footer-icons" />
      </div>
    </div>
  )
}
