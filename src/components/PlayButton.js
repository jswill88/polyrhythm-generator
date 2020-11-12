import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function PlayButton({ setTimers }) {
  return (
    <button
      id='button'
      onClick={setTimers}
    >
      <PlayArrowIcon />
    </button>
  )
}