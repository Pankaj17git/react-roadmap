import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const DisplayJsonData = ({ removeUser }) => {
  const [users, setUsers] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Fetch users from the API when the component mounts
  useEffect(() => {
    console.log(URL);
    fetch(URL)
      .then(res => res.json()) 
      .then(data => setUsers(data)
      );
  }, [URL]);

  // Function to handle editing a user
  const onEdit = (user) => {
    console.log("user to edit:", user);
    navigate("/json", { state: { userToEdit: user, isEditing: true } });
  };


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
                className="btn btn-sm btn-success"
                onClick={() => onEdit(user)}
              >
                <i className="fa fa-edit"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeUser(user.id, setUsers)}
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