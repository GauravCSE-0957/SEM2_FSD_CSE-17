
import React , { useState} from 'react';

function Usestate() {
    const[color,setcolor]=useState('red');
    const increment=()=>{
        setcolor('blue');
    }
    const decrement=()=>{
        setcolor('red');
    }
  return (
    <>
    <div>Usestate</div>
    <h1>Usestate Hooks</h1>
    <p>The useState hook is a fundamental feature in React that allows you to add state to your functional components. This hook is essential for managing data that changes over time within a component, such as user inputs, form data, or dynamic content.</p>
    <p>When you call the useState hook, it returns an array with two elements: the current state value and a function to update that state. You can use array destructuring to assign these values to variables. For example:</p>
    <pre>
      <code>  
      </code>
    </pre>
    <p>In this example, count is the current state value initialized to 0, and setCount is the function that allows you to update the count state. Whenever you call setCount with a new value, React will re-render the component with the updated state.</p>
    <button onClick={increment}>Change Color</button>
    <h1 style={{color:color}}>Color is {color}</h1>

  </>
  )
}

export default Usestate