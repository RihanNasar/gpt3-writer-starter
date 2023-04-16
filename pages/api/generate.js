import {Configuration,OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey : process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Write more than 6 good careers i can follow with the skills mentioned below.

Skills:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the careers listed below and write a detailed discription on why you think that it would be good for me and also give me good free and paid online resources that will help me excel in that career.make sure to give atleast more than 6 results and also write summaries for the courses.

  Skills: ${req.body.userInput}

  careers: ${basePromptOutput.text}

  Blog Post:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;