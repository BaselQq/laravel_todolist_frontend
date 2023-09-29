import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Todolists() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDExNzFkMzc3NzU4OWY4MDAzNWI2NzNhOWQ3OTczZGVhYmQ4NDg0ODU1ODMxYThjMjZkOTBkZWYzOTUxMGZmODM0ZDkyOWUyODhlMWVlZmYiLCJpYXQiOjE2OTU3NDgyMjQuNzY5ODY3LCJuYmYiOjE2OTU3NDgyMjQuNzY5ODY5LCJleHAiOjE3MjczNzA2MjQuNzU4NTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ghcUzorRilXjpoyVPtoqW25Gsce4lhNDsHXxzouQQYFsyMFivbFs88LYonvChFQiPngnd03lRuX8YuMvJK5xXAZACKM2gaHJme7YQ1JilsG9fB5Tn6wmCo7unq-d2uU6Sa3MIsEljU8jOFJjI6eML2YDTGfCvyqA480NUG-DT99qOVHLl63MDbcc41bNwAnaCcT-JZIdTkpguiS39LwX6LJat7U6sKzqi8evOKQvVBAFMRS8BQ9Mhcrwt_BLTRrlMfIfNzoY9_eyd6TujBxQ0xFNUDT-rfeS9xo7xr5P6ItI-sL9dYKEVRC9065frisSe_fn1JDK_S9oVpQF5WgyaA2hxxvZ6AUj6flsht1ckVtxYwFARCxw0Bbdb4xAmCGNcsX2GJQ6OL_jdu0cNmbSU5lAK-KKbVjLVIV10b1ANepm3HuB52693he-J2A5hpzgUoOcp2njkT65zxaNmpg_4WyGqmWaC8BQklFX-3SP74sbnopT9QiNb-Y61xjtADd48Ke82r7J9FLU9e8rQbPyyyvjzZ-nPkSDysvioC6P3dd8O9obsSbEIowm8dSs2nvrYMb7Kbc_feiCbZDIm2eAdxH4OwyGpV2azVAtPl_bslj8w3sqJO9NHgQCHqiRAy-clSDlNwQIV-rX1GuNQZWlO45MUDwl7zIQO8vLJOhqNr0";

    async function fetchTodos() {
      setLoading(false);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        
        if(data.message === "succesful") {
          setTodos(data.todos);
        } else {
          console.error("Error fetching todos:", data.message);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }   
    }


  useEffect(() => {
    fetchTodos();
  }, []);

  function checkTodo(todoId, value) {
    async function updateTodo() {
        try {
            const patchResponse = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}`, {
              'check': value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTodos();
        } catch (error) {
            console.error('Error Posting data:', error);
        }
    }
    updateTodo();
  }

  // function unCheckTodo(todoId) {
  //   async function updateTodo() {
  //     try {
  //       const postResponse = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}`, {
  //           'check': false
  //         }, {
  //           headers: {
  //             'Authorization' : `Berear ${token}`
  //           }
  //         })
  //     } catch(error) {
  //       console.log('Error from unchecking todo:', error);
  //     }
  //   }
  //   updateTodo();
  // }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.name} ({todo.check ? 
              <input type="checkbox" checked={todo.check} onChange={() => checkTodo(todo.id, false)}/>
              : <input type="checkbox" checked={todo.check} onChange={() => checkTodo(todo.id, true)}/>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolists;
