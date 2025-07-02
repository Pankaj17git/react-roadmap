const URL = import.meta.env.VITE_BASE_URL;


const useUserStorage = () => {
  const addUser = async (newUser, setFormData) => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      //  Fetch all existing users
      const existingRes = await fetch(URL);
      const existingUsers = await existingRes.json();

      //  Check for duplicates
      const emailExists = existingUsers.some(
        (u) => u.email === newUser.email
      );
      const usernameExists = existingUsers.some(
        (u) => u.username === newUser.username
      );
      const phoneExists = existingUsers.some(
        (u) => u.phone === newUser.phone
      );

      //  If any duplicate, show error and return
      if (emailExists || usernameExists || phoneExists) {
        let errorMessage = "Please correct the following:\n";
        if (emailExists) errorMessage += "- Email already exists.\n";
        if (usernameExists) errorMessage += "- Username already exists.\n";
        if (phoneExists) errorMessage += "- Phone number already exists.\n";

        alert(errorMessage);
        return; // stop further execution
      }

      if (!newUser.name || !newUser.username || !newUser.email) {
        alert("Please fill in all required fields.");
        return; // stop further execution
      }

      //  If no duplicates, save the new user
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      //  Update formData
      setFormData(data);

    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user.");
    }
    resetFormData(setFormData);
  };

  const resetFormData = (setFormData) => {
    setFormData({
      id: "",
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    });
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

  const updateUser = async (id, updateUserData) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUserData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedUser = await res.json();

      console.log("Updated user:", updatedUser);

    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };


  return {
    addUser,
    removeUser,
    updateUser
  }
}

export default useUserStorage;