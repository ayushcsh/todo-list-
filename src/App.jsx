import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")  
  const [todos, settodos] = useState([])
  const[showfinished, setshowfinished] = useState(false);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring !== null) {
      let todos = JSON.parse(todostring);
      settodos(todos);
    }
  }, []);

  const savetols = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addtodo = () => {
    const newTodos = [...todos, { id: uuidv4(), todo: todo, iscompleted: false }];
    settodos(newTodos);
    settodo("");
    savetols(newTodos);
  }

  const edittodo = (e) => {
    let id = e.target.name;
    let t = todos.find(item => item.id === id);
    settodo(t.todo);
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos.splice(index, 1);
    settodos(newtodos);
    savetols(newtodos);
  }

  const deletetodo = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos.splice(index, 1);
    settodos(newtodos);
    savetols(newtodos);
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos);
    savetols(newtodos);
  }

  const togglefinished = () =>{
    setshowfinished(!showfinished);
  }

  const displayTodos = showfinished ? todos.filter(item => item.iscompleted) : todos;

  return (
    <>
      <Navbar />
      <div className="main-container text-white bg-pink-300 mx-auto md:w-[50%] h-[90vh] m-2 rounded-[20px] w-[90vw] mt-[17px]">
        <div className="heading   text-center text-[25px]  font-bold pt-[20px]">
          <h1>Planny-Manage your task at one place</h1>
        </div>
        <div className="ml-[20px] addtodo md:ml-[49px] mt-[20px]">
          <h2 className='font-bold text-pink-600 text-[20px] ml-[7px] '>Add a Todo</h2>
          <input onChange={handlechange} value={todo} className="bg-white rounded-[20px] w-[64vw] md:w-[39vw] h-[35px] text-pink-600 px-4 border-white focus:border-white" type="text" />
          <button onClick={addtodo} disabled = {todo.length <= 3} className='bg-pink-600 rounded-[20px] m-[10px] w-[53px] h-[30px] hover:bg-pink-900'>Save</button>
        </div>
        <input type="checkbox" checked={showfinished} className=' ml-[20px] md:ml-[55px] mt-[20px] text-[20px]' onChange={togglefinished} /> Show finished todos
        <div className='h-[1px] bg-pink-700 w-[43vw] mx-[48px] mt-[20px]'></div>
        <h1 className='font-bold text-pink-600 text-[20px] ml-[20px] md:ml-[55px] mt-[20px]'>Your Todos</h1>
        <div className="todos w-[82vw]  ml-[20px] md:ml-[55px]">
          {displayTodos.length === 0 && <div className=' flex justify-center items-center m-[100px] ml-[20px] text-[20px]'>No todos to display</div>}
          {displayTodos.map((items) => {
            return <div key={items.id} className="todo flex   max-w-[663px] justify-between ">
              <div className="work flex">
                <input name={items.id} onChange={handlecheckbox} type='checkbox' checked={items.iscompleted} />
                <p className={`${items.iscompleted ? "line-through" : ""} ml-[9px] mt-[7px] text-pink-600`}>{items.todo}</p>
              </div>
              <div className="buttons  flex">
                <button name={items.id} onClick={edittodo} className='bg-pink-600 rounded-[20px] m-[5px] w-[40px] h-[30px]   hover:bg-pink-900'><FaEdit  className='justify-center items-center ml-[13px]'/>
</button>
                <button name={items.id} onClick={deletetodo} className='bg-pink-600 rounded-[20px] m-[5px] w-[40px] h-[30px] hover:bg-pink-900'><MdDelete  className='justify-center items-center  ml-[10px]' />
</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
