export default function Notes({ noteArray, rl, leftNote, rightNote, setLeftNote, setRightNote }) {
  return (
    <>
      <label
      htmlFor="notes"
      >Note: </label>
      <select
        id="notes"
        defaultValue={rl === 'right' ? leftNote : rightNote}
        onChange={
          e => rl === 'right'
            ? setLeftNote(e.target.value)
            : setRightNote(e.target.value)
        }>
        {noteArray.map((note, i) =>
          <option
            value={note}
            key={i}>
            {note.slice(0, note.length - 1)}
          </option>
        )}
      </select>
    </>
  )
}