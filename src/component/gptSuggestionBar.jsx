import { useSelector } from "react-redux";

const GptSuggestionBar = () => {

    const gptMessage = useSelector((state) => state.gpt);

    if (!gptMessage) return (
        <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-60">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <p className="text-gray-300 text-xl font-medium">I'm ready when you are! Ask me for some magic...</p>
        </div>
    );

    const { type, content, provider } = gptMessage;

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl relative overflow-hidden group transition-all ${type === 'error' ? 'bg-red-500/10 border-red-500/20' : 'bg-white/10 border-white/20'
                }`}>
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${type === 'error' ? 'from-red-500 to-orange-500' : 'from-cyan-400 to-purple-500'
                    }`}></div>

                <div className="flex justify-between items-start mb-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border transition-all ${type === 'error' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        }`}>
                        {type === 'error' ? 'Error Encountered' : 'Matchmaker Suggestion'}
                    </span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <p className={`text-xl leading-relaxed font-serif whitespace-pre-wrap ${type === 'error' ? 'text-red-200 font-sans' : 'text-white italic'
                        }`}>
                        {type === 'error' ? content : `"${content}"`}
                    </p>
                </div>

                <div className="mt-8 flex items-center justify-between text-gray-400 text-sm italic">
                    <div className="flex items-center gap-4">
                        <span className="w-10 h-[1px] bg-gray-600"></span>
                        <span>{type === 'error' ? 'System Status: Limited' : 'Crafted with ❤️ by DevTinder AI'}</span>
                    </div>
                    {type !== 'error' && provider && (
                        <span className="text-xs bg-white/5 px-2 py-1 rounded-md border border-white/10 not-italic">
                            Model: {provider}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GptSuggestionBar