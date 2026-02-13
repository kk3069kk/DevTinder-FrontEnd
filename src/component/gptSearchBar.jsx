import { useRef, useState } from "react"
import client from "../utils/openAi";
import geminiModel from "../utils/gemini";
import { useDispatch } from "react-redux";
import { addMessage, clearMessage } from "../utils/gptSlice";
import { AI_PROVIDER } from "../utils/constants";

const GptSearchBar = () => {
    const search = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!search.current.value) return;

        setLoading(true);
        dispatch(clearMessage());

        // try {
            const gptQuery = "act as a match maker and suggest me a good lines for my partner "
                + search.current.value +
                " in output only give me the lines not the explanation good pick up lines and ne beautiful short poem or something else which is best for the person to impress other person"

            let resultText = "";

            if (AI_PROVIDER === "gemini") {
                if (!geminiModel) throw new Error("Missing Gemini API Key! Please check your environment variables.");
                const result = await geminiModel.generateContent(gptQuery);
                const response = await result.response;
                resultText = response.text();
            } else {
                if (!client) throw new Error("Missing OpenAI API Key! Please check your environment variables.");
                const gptResults = await client.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: gptQuery },
                    ],
                });
                resultText = gptResults.choices[0]?.message?.content;
            }

            dispatch(addMessage({
                type: "success",
                content: resultText,
                provider: AI_PROVIDER === "gemini" ? "Gemini 1.5 Flash" : "OpenAI GPT-4o-mini"
            }));
        // } catch (error) {
        //     console.error(`${AI_PROVIDER.toUpperCase()} Search Error:`, error);
        //     let errorMessage = "Oops! Something went wrong. Please try again later.";

        //     if (error.status === 429 || error.message?.includes("429")) {
        //         errorMessage = "Quota exceeded! Please check your billing/plan details or try again in a minute.";
        //     } else if (error.message?.includes("API key")) {
        //         errorMessage = "Invalid API Key! Please check your environment variables.";
        //     }

        //     dispatch(addMessage({ type: "error", content: errorMessage }));
        // } finally {
        //     setLoading(false);
        // }
    }
    return (
        <div className="w-full flex justify-center">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:bg-white/15"
            >
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Who is on your mind?"
                        ref={search}
                        disabled={loading}
                        className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 text-lg py-1 px-2 disabled:opacity-50"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                </div>
                <button
                    type="button"
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-cyan-500/30 transition-all active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={handleSearch}
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Searching...
                        </>
                    ) : "Search"}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar