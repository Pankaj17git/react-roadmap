const URL = import.meta.env.VITE_BASE_URL;


const useUserStorage = () => {
  const addUser = async (newUser, setFormData) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    setFormData(data);
  };

  const removeUser = async (id) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json"}
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 204) {
        console.log('Deleted successfully, no content returned.');
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Response data:', data);
      }
    })
    .catch(err => {
      console.log('Error:', err.message);
    });
    return res;
  };

  return {
    addUser,
    removeUser
  }
}

export default useUserStorage;