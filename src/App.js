// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

//need this line to use class based components
import React from 'react'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
   //We don't want to have tasks in Tasks component as we want to 
    //access them from other components, so we can use APIS like context or redux
    //where we would have a store that hovers over our UI to pull different pieces of state from 
    //course doesn't get into that,s o We just want to put in our app.js
    //This will make it a global state and we can pass it down to components as props

    //const[what we want to call this piece of state, function to update state ]
  const[tasks, setTasks] = useState([])

  useEffect(() => {
    
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    //defined above function and now called it within 
    getTasks()
  }, [])
  //above is a dependency array => if you have a value where you want 
  //the above function to run if it changes, then you pass in the value
  //none here, so just passed empty array

  const fetchTasks = async () => {
    //fetch returns a promise from specified server, hence the await
    const res = await fetch('http://localhost:5000/tasks')
    //recieving kson data through res 
    const data = await res.json()

    //don't want to have fetchTasks in-use effect since we 
    //might wnat to use it somewhere else
    //=>not going to call setTasks, so we remove it outside of useEffect as a separate function and return data
    return data
  }

  const fetchTask = async (id) => {
    //fetch returns a promise from specified server, hence the await
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    //recieving kson data through res 
    const data = await res.json()

    //don't want to have fetchTasks in-use effect since we 
    //might wnat to use it somewhere else
    //=>not going to call setTasks, so we remove it outside of useEffect as a separate function and return data
    return data
  }


  const addTask = async (task) => {
    const res = await fetch('http:///localhost:5000/tasks', {
      //after fetching the data, 
      method: 'POST', //post request so specifty that with method
      headers: { //need header because we need to specify the content type
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) //outside of headers,setting body; changing task js object into JSON string
    })

    //storing new tast in variable
    //requires the await as it is a promise for data to be entered eventually
    const data = await res.json()

    //calling setTasks, the whole array, and adding data to the end
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() *
    // 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }
  //delete task
  const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      }) 

      setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, 
    reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder: 
      data.reminder} : task
      )
    )
  }

  //variables can be used, and passed in like usual js 
  const name = 'Brad';
  const x = false; 

  return (
    <Router>
    {/* //here, it's className instead of class like in usual html code
    //same for "for" => htmlFor */}
    <div className="container">
      {/* Don't need to have it be a div, empty angle brackets will work too */}
      {/* cannot have elements outside of this div element => will count as more than one return element */}
      {/* To fix this, you have to include all elements in this div */}
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/>

      
      {/* <h1>Hello from React</h1>
      <h2>Hello</h2> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Route path='/' exact render={(props) => (
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}

        {/* Tasks calls from Tasks.js in componenets, which calls from Task.js from components
        Hence the need to call onDelete in their parameters  */}
        {/* In the Task function, you set the onClick event trigger and link it to the event of 
        deleteTask which is the function highlighted above */}
        {tasks.length > 0 ? (
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleReminder}/> 
        ) : (
          'No Tasks To Show'
        )}
        </>
      )} />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

//class method of implementation

// class App extends React.Component {
//   render() {
//     return <h1> Hello from a class</h1>
//   }
// }
