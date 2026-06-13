import React,{useState} from 'react'

function Useeffect() {
    const[timer,settimer]=useState(0);
     setTimeout(()=>{
        settimer(timer+1);
     },1000)

const[data,setdata]=useState([]);
fetch('https://jsonplaceholder.typicode.com/posts')
.then((response)=>response.json())
.then((json)=>setdata(json));
  return (
    <div>
        <h2>{timer}</h2>
        <h2>Data </h2>
    </div>
  )
}

export default Useeffect