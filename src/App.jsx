
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+|}{:~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-xl rounded-lg p-8 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-blue-100' placeholder='password' readOnly ref={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 cursor-pointer' onClick={copyToClipboard}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className="flex items-center gap-3 text-white">
          <input type="range"
            min={5}
            max={30}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-40 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-orange-400 text-xs font-semibold text-center mr-1">
            Length<br />
            <span className="text-white text-base">{length}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-white">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
            <span>Include numbers</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
            <span>Include characters</span>
          </label>
        </div>

      </div>
    </div>
  )
}

export default App
