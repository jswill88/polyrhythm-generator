
import '../styles/Squares.scss'
export default function Squares({ rhythm, side, highlight }) {
  const squares = [];
  for (let i = 0; i < rhythm; i++) {
    squares.push(
      <div
        key={i}
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
