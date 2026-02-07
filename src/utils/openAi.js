import OpenAI from "openai";
import { OPENAI_API_KEY } from "./constants";


const client = OPENAI_API_KEY ? new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
}) : null;

export default client;