const useTodoStorage = () => {
  const URl = import.meta.env.VITE_TODO_URL;

  const addTodo = async (newTodo, setTodos,) => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const res = await fetch(URl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo)
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      //  Update formData
      setTodos(data);


    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the Todo.");
    }

  }

  const removeTodo = async (id, setTodos) => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const res = await fetch(`${URl}/${id}`, {
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

      setTodos((prevUsers) => prevUsers.filter((todo) => todo.id !== id));
      return res;

    } catch (err) {
      console.error("Error:", err.message);
    }
  }

  const updateTodo = async (id, updateTodo) => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const res = await fetch(`${URl}/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updateTodo)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("An error occurred while updating the todo.");
    }
  }
  return {
    addTodo,
    removeTodo,
    updateTodo,
    URl,
  }
}

export default useTodoStorage;