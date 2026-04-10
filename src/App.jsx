import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [setshowfinished, setsetshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
       let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
   
  }, [])
  

  const ls=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const togfin=(e) => {
    setsetshowfinished(!setshowfinished)
  }
  
  

const handleedit = (e,id) =>{
  let t = todos.filter(i=>i.id === id)
  settodo(t[0].todo)

  let newtodos = todos.filter(item =>{
    return item.id!==id
  })
  settodos(newtodos)
  ls()
}
const handledelete =(id)=>{
    
  let newtodos = todos.filter(item =>{
    return item.id!==id
  })
  settodos(newtodos)
  ls()

}
const handleadd=()=>{
  settodos([...todos, {id:uuidv4(),todo,isCompleted:false}])
  settodo("")
  ls()
}
const handlechange=(e)=>{
  settodo(e.target.value)  //kabhi bhi aisa input jo change ho uske liye e.target.value
}
const handlecheckbox=(e)=>{
  let id = e.target.name
  let index = todos.findIndex(item=>{
    return item.id == id;
  })
  let newtodos = [...todos]
  newtodos[index].isCompleted = ! newtodos[index].isCompleted
  settodos(newtodos)
  ls()
}

  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-amber-100 p-5 min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-xl'>i-Tasks manage your todos at one place </h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="font-bold text-xl">Add a Todo</h2>
        <input onChange={handlechange} value = {todo} type="text" className='bg-white w-full rounded-full px-5 py-1 '/>
        <button onClick={handleadd} disabled={todo.length<=3} className='bg-amber-700 text-white p-3 py-1 disabled:bg-amber-700 rounded-md '>Add</button>
      </div>
      <input className='my-4' onChange={togfin} type="checkbox" checked ={setshowfinished} /> Show finished
    <h2 className='font-bold text-xl'>Your Todos</h2>
    <div className="todos">
      {todos.length ===0 && <div>no todos to display</div>}
      
      {todos.map(item =>{

       return (setshowfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2 my-5">
        <div className='flex gap-5'>
        <input type='checkbox' onChange={handlecheckbox} className="checkbox bg-white" checked={item.isCompleted} name={item.id} id=""></input>
        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
         </div>

        <div className="buttons flex h-full">
          <button onClick={(e)=>handleedit(e,item.id)} className='bg-amber-700 text-white p-3 py-1 rounded-md mx-2'><FaEdit /></button>
          <button onClick={()=>{handledelete(item.id)}} className='bg-amber-700 text-white p-3 py-1 rounded-md mx-2'><MdDelete /></button>
        </div>
      </div>

        })}

    </div>
    </div>
    </>
  )
}

export default App
