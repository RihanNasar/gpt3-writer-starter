

import Image from 'next/image'
import { Select, Option } from "@material-tailwind/react";
import { useState } from 'react'
export default function Home() {
 
  const [show,setShow] = useState('hidden flex flex-col p-12 justify-center align-center flex-wrap whitespace-preline');
  const [userInput,setUserInput] = useState('');
  const [stage,setStage] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const handleChange = (e) => {
  setStage(e.target.value)
  console.log(e.target.value)
}
const callGenerateEndpoint = async (e) => {
  e.preventDefault()
  setShow('block flex flex-col justify-center items-center shrink-0 w-full text-center mb-12')
  setIsGenerating(false);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput,stage}),
  });
  
  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(true);
}
  
  return (
    <main className="min-h-screen flex flex-col min-w-full bg-black  text-center">
      <form onSubmit={callGenerateEndpoint}>
          <div className="font-medium text-white mt-16 w-full text-center">

          <p className='p-4 mb-12 text-2xl'>Get some Career tips from the ikegai gpt</p>

          </div>
          <div className='w-full m- h-fit flex flex-col justify-center items-center'>
          <label for="what stage of life are you at right now ?" className="block mb-8 text-sm left-0 relative font-medium text-gray-900 dark:text-white">What stage of life are you at right now ?</label>
                  <select required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-3/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-8/12">
                    <option className='rounded-lg' value='who have just graduated highschool'>I have just graduated highschool</option>
                    <option className='rounded-lg ' value='who have just graduated from university'>I have graduated university/college</option>
                    <option className='rounded-lg' value='who is exploring new and different things'>exploring different things</option>
                    
                  </select>
          </div>
          <div className='flex justify-center align-center m-28 sm:m-10'>
                
            <div className="w-4/12 h-30  mb-4 border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-600 sm:min-w-max">
                <div className="px-4 py-2 rounded-t-lg dark:bg-gray-800">
                <label for="what are some of the things that you are good at ?" className="block mb-8 text-xs left-0 relative font-small break-normal text-gray-900 dark:text-white ">Write some of the things that you are good at</label>
                    <textarea id="comment" onChange={(e) => setUserInput(e.target.value)} value={userInput} rows="4" className="w-full px-0 text-sm overflow-hidden outline-none resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="eg: coding, marketing, writing, sports etc ..." required></textarea>
                </div>
                <div className="flex  justify-end px-3 py-2 border-t dark:border-gray-400">
                    <button type="submit" onSubmit={callGenerateEndpoint}className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 outline-none rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                    
                </div>
            </div>
          </div>
          <div className={show}>
            
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
          </>  : <p className='text-white'>Loading...</p>
          }
      </div>







    </form>
            
    </main>
  )
}
