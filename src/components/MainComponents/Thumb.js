export function Thumb (props) {
  return (
    <span {...props}>
      {props['aria-label'] === 'tempo'
        ? props['aria-valuenow']
        : (props['aria-valuenow'] + 55) / 5
      }
    </span>
    )
};