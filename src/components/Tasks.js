//we don't want tasks array to be separte from our component
//we want it to be separate from our state
//this can be done using a hook called use state
import Task from  './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        //can't do tasks.push() to add to the tasks
        //have to do setTasks([...tasks])
        <>
            {tasks.map((task) => (
            <Task 
                key={task.id} 
                task={task} 
                onDelete={onDelete} 
                onToggle={onToggle}>
            </Task>
            ))}
        </>
    )
}

export default Tasks
