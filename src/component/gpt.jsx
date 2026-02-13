import GptSearchBar from "./gptSearchBar";
import GptSuggestionBar from "./gptSuggestionBar";

const Gpt = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2 mb-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse">
                        DevTinder AI
                    </h1>
                    <p className="text-gray-300 text-lg">Your personal matchmaker assistant</p>
                </div>
                <GptSearchBar />
                <GptSuggestionBar />
            </div>
        </div>
    )
}

export default Gpt