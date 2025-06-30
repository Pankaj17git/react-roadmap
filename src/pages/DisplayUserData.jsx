import DisplayJsonData from "../components/DisplayJsonData"
import Header from "../components/header"

const DisplayUsers = () => {
  return (
    <>
      <Header />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Username</th>
              <th>Eamil</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <DisplayJsonData />
          </tbody>
        </table>

      </div>

    </>
  )
}

export default DisplayUsers