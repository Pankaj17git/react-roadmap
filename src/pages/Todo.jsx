/* eslint-disable no-debugger */
import { useEffect, useState } from "react";
import useTodoStorage from "../hooks/useTodoStorage";
import Header from "../components/header";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  IconButton
} from "@mui/material";

const Todo = () => {
  const { addTodo, removeTodo, updateTodo, URl } = useTodoStorage();
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null); // Add this line
  const [todoData, setTodoData] = useState({
    title: "",
    description: ""
  })

  useEffect(() => {
    fetch(URl)
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [todos])

  const handleAddOrUpdateTodo = async () => {
    debugger;
    if (editIndex != null && editId) {
      // Update existing todo
      const userToUpdate = {
        ...todoData,
        id: editId
      };
      updateTodo(editId, userToUpdate);
      setEditIndex(null);
      setEditId(null);
    } else {
      // Add new todo
      const newTodo = {
        title: todoData.title,
        description: todoData.description
      };
      addTodo(newTodo, setTodoData);
    }
    setTodoData({
      title: "",
      description: ""
    });
  }

  const handleEdit = (id) => {
    debugger;
    setEditIndex(1);
    setEditId(id); // Set the editId here
    const userToEdit = todos.find(t => t.id === id)
    setTodoData(userToEdit)
  };

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f0f4f8",
          paddingTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>

        {/* Input Section */}
        <Paper elevation={3} style={{ padding: "20px", width: "50%", textAlign: "center" }}>
          <TextField
            style={{ width: "90%", marginBottom: "10px" }}
            label="Title"
            variant="outlined"
            value={todoData.title}
            name="title"
            onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
          />
          <TextField
            style={{ width: "90%", marginBottom: "10px" }}
            label="Description"
            variant="outlined"
            value={todoData.description}
            name="description"
            onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
          />
          <Button
            variant="contained"
            color={editIndex !== null ? "secondary" : "primary"}
            onClick={handleAddOrUpdateTodo}
            style={{ width: "90%", height: "50px" }}
          >
            {editIndex !== null ? "Update Todo" : "Add Todo"}
          </Button>
        </Paper>

        {/* Todo List Section */}
        <Paper elevation={3} style={{ padding: "20px", marginTop: "30px", width: "50%" }}>
          {todos.length === 0 ? (
            <Typography color="textSecondary">No todos yet.</Typography>
          ) : (
            <List>
              {todos.map((item, id) => (
                <ListItem
                  key={id}
                  divider
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={() => handleEdit(item.id)}>
                        <i className="fa fa-edit"></i>
                      </IconButton>
                      <IconButton style={{ marginLeft: "15px" }} edge="end" onClick={() => removeTodo(item.id, setTodos)}>
                        <i className="fa fa-trash"></i>
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`${id + 1} ${item.title} `}
                    secondary={`${item.description}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </div>
    </>
  );
};

export default Todo;
