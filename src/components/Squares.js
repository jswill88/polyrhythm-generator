
import '../styles/Squares.scss'

/** Squares that are highlighter as the music goes on */
export default function Squares({ rhythm, side, highlight }) {
  const squares = [];
  for (let i = 0; i < rhythm; i++) {
    squares.push(
      <div
        key={i}
        className={`outer-${rhythm}`}
      >
        <div
          className={
            `${side} square ${ i === highlight
                ? `highlight`
                : null
            }`
          }
          >
        </div>
      </div>
    )
  }
  return <div className="sideBody">{squares}</div>;
}
