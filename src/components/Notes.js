
/** Note component sets the note to be used on either side */
export default function Notes({ noteArray, note,  callback }) {
  return (
    <>
      <label
      htmlFor="notes"
      >Note: </label>
      <select
        id="notes"
        defaultValue={note}
        onChange={e => callback(e.target.value)}
        >
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