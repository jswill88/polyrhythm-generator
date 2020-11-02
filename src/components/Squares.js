
export default function Squares({ rhythm, side, rightHighlight, leftHighlight }) {
  const squares = [];
  for (let i = 0; i < rhythm; i++) {
    squares.push(
      <div
        key={i}
      >
        <div
          className={
            `${side} square ${side === 'left'
              ? i === rightHighlight ? `highlight`
                : null
              : i === leftHighlight ? `highlight`
                : null
            }`
          }
          >
        </div>
      </div>
    )
  }
  return squares;
}
