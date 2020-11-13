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
        ? <button onClick={() => setShowInfo(false)} ><CloseIcon alt="close info" /></button>
        : <button onClick={() => setShowInfo(true)}><InfoOutlinedIcon alt="see info"  /></button>
      }
      </div>
    </header>
  )
}