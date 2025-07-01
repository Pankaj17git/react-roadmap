const URL = import.meta.env.VITE_BASE_URL;


const useUserStorage = () => {
  const addUser = async (newUser, setFormData) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
   
    setFormData(data);
  };


  const removeUser = async (id, setUsers) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          if (res.status === 204) {
            console.log('Deleted successfully, no content returned.');
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            console.log('res data:', data);
          }
        })


      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      return res;
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return {
    addUser,
    removeUser,
  }
}

export default useUserStorage;