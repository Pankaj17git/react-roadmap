const DisplayData = ({ bookList, isRead, removeData, onEdit,toggleReadStatus }) => {

  return (
    <>
      {
        bookList.filter(book => book.isComplete === (isRead ? 1 : 0)).map((book, i) => (
          <tr key={book.id}>
            <td>{i + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book.isAvailable}</td>
            <td>{book.format}</td>
            <td>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => toggleReadStatus(book)}
              >
                <i className="fa fa-check"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => onEdit(book) }
              >
                <i className="fa fa-edit"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeData(book.id, isRead ? 1 : 0)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))
      }
    </>
  )
}

export default DisplayData;