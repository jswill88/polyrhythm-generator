import '../styles/header.scss'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Logo from '../images/polyrhythmLogo.png'

export default function Header({ showInfo, setShowInfo }) {
  return (
    <header>
      <div>
        <img src={Logo} alt="Logo" />
        <h1>Polyrhythm Generator</h1>
      </div>
      <div>
      {showInfo
        ? <button><CloseIcon onClick={() => setShowInfo(false)} /></button>
        : <button><InfoOutlinedIcon onClick={() => setShowInfo(true)} /></button>
      }

      </div>
    </header>
  )
}