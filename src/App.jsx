import { useCallback, useEffect, useRef, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null);
  
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*(){}[]=+-/*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char) 
      
    }
    setPassword(pass)

  }, [length, numberAllowed,charAllowed,setPassword])

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },
  [password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <div className='w-full max-w-md m-auto bg-slate-500 rounded-lg py-2 px-4 text-orange-400'>
     <h1 className='text-white  my-3'>
        <Typewriter loop={true}
          words={["Password Generator", "Create strong password"]}
          typeSpeed={150}
          delaySpeed={3000}
        >Password Generator</Typewriter>
      </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
       type="text" 
       value={password}
       className='outline-none rounded-lg py-1 px-3 w-full'
       placeholder='password'
       readOnly
       ref={passwordRef}

       />
       <button
        onClick={copyPasswordToClip}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
        copy
       </button>
     </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={18}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev )
              }}
          />
          <label >Characters</label>
      </div>
      </div>
    </div>
  )
}

export default App
