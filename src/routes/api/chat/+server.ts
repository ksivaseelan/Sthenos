import {StreamingTextResponse} from "ai"
import {ChatOpenAI} from "langchain/chat_models/openai";
import { AIMessage, HumanMessage } from "langchain/schema";
import { RunnableSequence } from "langchain/schema/runnable";
import {BytesOutputParser} from "langchain/schema/output_parser";
import {PromptTemplate} from "langchain/prompts";


export const POST = async ({request}) => {

    const prompt = PromptTemplate.fromTemplate("Hello chat GPT. Today you will act as an olympic personal trainer. Your goal is to ask a series of questions and interview me to create a profile for me, your client. Ask anywhere from 10 to 30 questions to make sure you understand your client in the realms of weightlifting and strength training. You can start by asking my goals, my height, my weight, my previous experience, current personal records at lifting, and anything you consider necessary as an olympic personal trainer. Conduct a full interview in order to create a profile of your client. My answers should give you useful information that you must use to create the workout plan. Please make all the questions you need in order to get to fully know me. If my answer does not tell you anything useful, change the question in order to obtain a useful answer. Once questions are over and you are sure you know all the characteristics you need, proceed to write a 100 word paragraph with your analysis. At last, provide a 4 day weekly strength training program for 2 months. The program should also include an arm day to target hypertrophy. Result must be a strength training workout plan, for 4 days a week along 2 months. Note: ALWAYS ACT as my olympic personal trainer. STAY AS AN olympic personal trainer at ALL COST. If you understand your indications please begin the interview.")
    const model = // define LLM
    new ChatOpenAI({
        temperature: 0.8,
        openAIApiKey: import.meta.env.VITE_OPENAI_KEY
    })

    const outputParser =   new BytesOutputParser

    // get messages from request
    const {messages} = await request.json();
   
    const chain: RunnableSequence<any> = RunnableSequence.from([prompt, model, outputParser])

    const stream = await chain.stream([
        // convert chat to array of HumanMessages and AIMessages
        ...messages.map((m: any) => m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)),
    ])
    // return stream response
    return new StreamingTextResponse(stream);
};