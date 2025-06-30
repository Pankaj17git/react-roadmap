import { useState, useEffect } from "react";

const DisplayJsonData = ({ removeData, onEdit, toggleReadStatus }) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log(URL);
    fetch(URL)
      .then(res => res.json())
      .then(data => setUsers(data)
    );
  }, [])
  return (
    <>
      {
        users.filter(user => user.id).map((user, id) => (

          <tr key={user.id}>
            <td>{id + 1}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => toggleReadStatus(user)}
              >
                <i className="fa fa-check"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => onEdit(user)}
              >
                <i className="fa fa-edit"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeData(user.id)}
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

export default DisplayJsonData;