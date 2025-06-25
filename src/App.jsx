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
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1500);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="w-full max-w-md mx-auto p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Password Generator
          </span>
        </h1>
        <div className="flex mb-6 rounded-lg overflow-hidden border border-white/20 bg-white/5">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 text-white bg-transparent focus:outline-none placeholder:text-white/50"
            placeholder="Your secure password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="copy-btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-white/80 font-medium">Length: {length}</label>
              <span className="text-white font-semibold">{length}</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="numberInput" className="ml-2 text-white/80">
                Include Numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="charInput" className="ml-2 text-white/80">
                Include Special Characters
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-white/80 text-sm">Password Strength:</span>
            <span className={`text-sm font-medium ${length > 12 && (numberAllowed || charAllowed) ? 'text-green-400' :
              length > 8 ? 'text-yellow-400' : 'text-red-400'
              }`}>
              {length > 12 && (numberAllowed || charAllowed) ? 'Strong' :
                length > 8 ? 'Medium' : 'Weak'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${length > 12 && (numberAllowed || charAllowed) ? 'bg-green-500 w-full' :
                length > 8 ? 'bg-yellow-500 w-2/3' : 'bg-red-500 w-1/3'
                }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App