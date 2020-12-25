
import '../styles/Squares.scss'

/** Squares that are highlighter as the music goes on */
export default function Squares({ rhythm, side, highlight, otherRhy = 2 }) {
  const squares = [];
  for (let i = 0; i < rhythm; i++) {
    squares.push(
      <div
        key={i}
        className={`outer-${rhythm}`}
      >
        <div
          style={{height: `${rhythm * 50 / Math.max(rhythm, otherRhy)}%`}}
          className={
            `inner-${Math.max(rhythm, otherRhy)}
            ${side} square ${i === highlight
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
