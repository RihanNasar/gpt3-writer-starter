

import Image from 'next/image'
import { useState } from 'react'
export default function Home() {
 
  const [show,setShow] = useState('hidden flex flex-col p-12 justify-center align-center flex-wrap whitespace-preline')
  ;const [userInput,setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setShow('block')
  setIsGenerating(false);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(true);
}
  
  return (
    <main className="min-h-screen flex flex-col min-w-full bg-black  text-center">
      <div className="font-medium text-white mt-16 w-full text-center">
        <p className='p-8'>Write some of the things that you are good at</p>
      </div>
        <div className='flex justify-center align-center m-28 sm:m-10'>
          <div className="w-6/12 h-40  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 sm:min-w-max">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <label for="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" onChange={(e) => setUserInput(e.target.value)} value={userInput} rows="4" className="w-full px-0 text-sm overflow-hidden outline-none resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
              </div>
              <div className="flex  justify-end px-3 py-2 border-t dark:border-gray-400">
                  <button type="submit" onClick={callGenerateEndpoint}className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 outline-none rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                      Post comment
                  </button>
                  
              </div>
          </div>
        </div>
      <div className='  flex flex-col justify-center items-center shrink-0 w-full text-center'>
      {isGenerating ?<>
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
      </>  : <p>Loading...</p>
      }
      </div>
      

      
       

        
      
    </main>
  )
}
