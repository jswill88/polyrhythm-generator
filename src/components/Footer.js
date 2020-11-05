import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import '../styles/footer.scss'

export default function Footer() {
  return (
    <footer>
      <div>
        <p>&copy; Josh Williams 2020</p>
        <p>
          <a
            href="https://github.com/jswill88/polyrhythm-generator"
            target="blank">
            See Repository</a>
        </p>
        <p>
          <a
            href="https://github.com/jswill88"
            target="blank">
            <GitHubIcon /></a>
          <a
            href="https://www.linkedin.com/in/joshua-s-williams/"
            target="blank">
            <LinkedInIcon color="primary" /></a>
        </p>

      </div>
    </footer>
  )
}