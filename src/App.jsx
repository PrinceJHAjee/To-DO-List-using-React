import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
 
import './App.css'

function App() {
  
  //todos is a array that hold all the todo
  const [todos, setTodos] = useState([])
  //todo is a string that hold the current
  const [todo, setTodo] = useState("")
  //hide finished todo, by defalut true h toh dikhyga
  const [ShowFinished, setShowFinished] = useState(true)

  //display all todo for ones
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  
  }, [])
  
  

  //functio n to save all todo to local storage when created so eve after refreshing thr page or killing it, the todos remain there
  const saveLocalTodos=(params)=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  //hide finishedtodo
  const toggleFinished=(params) => {
    setShowFinished(!ShowFinished)
  }
  

  //isEditing is a boolean that hold the state of the edit button
  const handleEdit = (e, id) => {
    let t=todos.filter(i=>i.id===id)
     setTodo(t[0].todo)
     saveLocalTodos()

     //run the handle delete, so it will look like it got deleted but after clicking edit button, it mi=oves to input box and when editing is done , click on save and it will come to life again
     let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
   
    setTodos(newTodos)

  }
  
  const handleDelete = (e, id) => {
   
      let newTodos=todos.filter(item=>{
        return item.id!=id;
      });
     
      setTodos(newTodos)
      saveLocalTodos()
    
  }
  const handleAdd =()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveLocalTodos()
    
  }

  const handleChange  =(e)=>{
    setTodo(e.target.value)

  }

  /* one more of doing this
  const handleCheckBox = (e) => {
   
   const id = e.target.name;
    setTodos(todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  }*/
  
  const handleCheckBox= (e)=>{
    let id= e.target.name;
    let index= todos.findIndex(item=>{
      return item.id===id;
      })
      //change index
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos)
      saveLocalTodos()
    } 
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto m-8 rounded-xl p-5 bg-violet-200 min-h-[80vh] max-w-[180vh]"> 
        <div className="addTodo  my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-500 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-5  '>
            Save
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} /> Show Finished
        <h2 className='text-lg font-bold'>My TO-DO</h2> 
        <div className="todos">
          {todos.length===0 && <div className='m5'>No TO-DO to display</div>}
          {/* to show todos dynamically when added using input box */}
          {todos.map(item=>{

         return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo my-2 flex w-1/2 justify-between items-start">
          <div className='flex items-center gap-5 flex-1'>
          {/* adding checkbox to mark todo whether done or not done */}
          <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted}  id="" className="mx-2"/>
            <div className={`flex-1 ${item.isCompleted ? "line-through" : ""} break-words whitespace-normal`}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1  '>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1  '>Delete</button>
            </div>
            
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
