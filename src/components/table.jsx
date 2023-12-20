import '../styles/tables.css'

export default function Table({table}) {
  return (
    <div className="table">
        <p>{table.title}</p>
    </div>
  )
}