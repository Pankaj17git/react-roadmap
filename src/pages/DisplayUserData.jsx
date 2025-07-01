import DisplayJsonData from "../components/DisplayJsonData"
import Header from "../components/header"
import useUserStorage from "../hooks/useUserStorage"

const DisplayUsers = () => {
  const {removeUser} = useUserStorage();
  return (
    <>
      <Header />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Username</th>
              <th>Eamil</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <DisplayJsonData removeUser={removeUser}/>
          </tbody>
        </table>

      </div>

    </>
  )
}

export default DisplayUsers