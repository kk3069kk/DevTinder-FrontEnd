import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { setFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./Card";

const Feed = () => {
    const feed = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    const fetchFeed = async () => {
        if (feed) {
            return;
        }
        try {
            const response = await axios.get(API_URL + "/user/feed", {
                withCredentials: true,
            });
            dispatch(setFeed(response.data));
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }
    useEffect(() => {
        fetchFeed();
    }, []);

    if(!feed) return null;
    if(feed.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="bg-base-300 p-10 rounded-3xl shadow-2xl border border-base-200 backdrop-blur-sm max-w-md">
                <div className="text-6xl mb-6">🤝</div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    No more user
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Looks like no one has sent you a connection request yet. Keep exploring and building your network!
                </p>
                <button
                    className="btn btn-primary btn-wide shadow-lg hover:scale-105 transition-transform"
                    onClick={() => window.location.href = "/"}
                >
                    Find Developers
                </button>
            </div>
        </div>
    );
    return (
        
            <div className="flex justify-center my-10">
                <Card user={feed[0]} />
            </div>
        
    )
}

export default Feed;
