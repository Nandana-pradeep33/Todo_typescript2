import img from './assets/icons8-delete-30.png'
import React, { useEffect, useState, useRef } from 'react';
import './App.css';

type Items ={
  title:string;
  id: string;
}


function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

const [items, setItems]= useState<Items[]>([]);
const [inputVal,setInputVal]= useState<string>('');
const [isLoaded, setIsLoaded] = useState(false); // Track if items have been loaded

useEffect(() => {
  const storedItems = localStorage.getItem('todoItems');
  console.log('Loaded items from local storage:', storedItems);
  if (storedItems) {
    try {
      const parsedItems = JSON.parse(storedItems);
      console.log('Parsed items:', parsedItems);
      if (Array.isArray(parsedItems)) {
        setItems(parsedItems);
      } else {
        console.error('Invalid items format in local storage');
      }
    } catch (error) {
      console.error('Error parsing items from local storage', error);
    }
  }
  setIsLoaded(true); // Set isLoaded to true after items have been loaded
}, []);

useEffect(() => {
  if (isLoaded) { // Only save to local storage if items have been loaded
    try {
      localStorage.setItem('todoItems', JSON.stringify(items));
      console.log('Saved items to local storage:', items);
    } catch (error) {
      console.error('Error saving items to local storage', error);
    }
  }
}, [items, isLoaded]);
const handleSubmit =(event:React.FormEvent) => {
  event.preventDefault()
  if (inputVal.trim() === '') return; 
  setItems((prev) => [...prev, { title: inputVal, id: Date.now().toString() }]);
  setInputVal('');
};

const handleDelete=(id:string) =>{
  setItems((prev) => prev.filter((data)=> data.id !== id));
}
  return (
    <>
      <div className="text-center align-items-center mx-auto h-[750px]" style={{ background: 'linear-gradient(30deg, #a11a7a,#2a0936)', height:'100vh' }}> 
        <p className=' text-white text-3xl text-center p-5 pt-12 mt-15 font-bold'>Todo List</p>
        <div className="mb-16">
          <form  onSubmit={handleSubmit}>
            <input className="w-[550px] mt-7 border-black rounded-lg p-3 mb-5 ml-10" 
             type="text" placeholder=' Enter Todo .. ' value={inputVal} onChange={(event)=> setInputVal(event.target.value)} ref={inputRef}>

             </input>
            <button type='submit' className="rounded-lg ml-3 p-3  text-white w-[70px] font-semi-bold" style={{backgroundColor:'#940f80'}}>Add</button>
          </form>
          
        </div>
        <div>
          {items.map(data=>(
            <div  key={data.id} className="border border-white mx-auto rounded w-[540px]  p-2 mb-7 text-white "><div className="flex justify-between items-center">
            <p className="mr-2 p-2" style={{fontSize:'19px'}}>{data.title}</p>
            <button onClick={()=>handleDelete(data.id)}><img src={img} alt="icon" className="w-6 h-6" /></button>
          </div></div>

          ))}
        
        </div>
        
        </div>
    </>
  )
}

export default App
