import '../styles/header.scss'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Logo from '../images/polyrhythmLogo.png'

export default function Header() {
  return (
    <header>
      <div>
        <img src={Logo} alt="Logo" />
        <h1>Polyrhythm Generator</h1>
      </div>
      <a href="/"><InfoOutlinedIcon /></a>
    </header>
  )
}