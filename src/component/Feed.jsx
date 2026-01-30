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
    return (
        feed && (
            <div className="flex justify-center my-10">
                <Card user={feed[0]} />
            </div>
        )
    )
}

export default Feed;
