import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const Request = () => {
    const dispatch = useDispatch();
    const userRequest = useSelector((state) => state.request);

    const handleStatus = async (status , id) => {
        try {
            const response = await axios.post(API_URL + "/request/review/" + status + "/" + id,{}, {
                withCredentials: true,
            })
            dispatch(removeRequest(id));
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    const handleRequest = async () => {
        try {
            const response = await axios.get(API_URL + "/user/request/received", {
                withCredentials: true,
            })
            console.log(response?.data?.getRequest);
            dispatch(addRequest(response?.data?.getRequest));
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    useEffect(() => {
        handleRequest();
    }, []);

    if (!userRequest) return null;
    if (userRequest.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="bg-base-300 p-10 rounded-3xl shadow-2xl border border-base-200 backdrop-blur-sm max-w-md">
                <div className="text-6xl mb-6">🤝</div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    No Requests Yet
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
        <div className="flex flex-col items-center p-6 bg-base-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">Your Requests</h1>
            <div className="w-full max-w-4xl space-y-4">
                {userRequest.map((request) => {
                    const { _id, firstName, lastName, age, gender, about, skills, photoURL } = request.fromUserId;
                    return (
                        <div key={_id} className="card card-side bg-base-300 shadow-xl hover:bg-base-200 transition-all duration-300 border border-base-200">
                            <figure className="p-4">
                                <img
                                    src={photoURL || "https://via.placeholder.com/150"}
                                    alt={`${firstName} ${lastName}`}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-primary"
                                />
                            </figure>
                            <div className="card-body p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h2 className="card-title text-xl sm:text-2xl font-bold">
                                        {firstName} {lastName}
                                    </h2>
                                    <div className="flex gap-2">
                                        {age && <div className="badge badge-secondary badge-outline">{age} yrs</div>}
                                        {gender && <div className="badge badge-accent badge-outline capitalize">{gender}</div>}
                                    </div>
                                </div>

                                {about && (
                                    <p className="text-sm sm:text-base text-gray-400 line-clamp-2 mt-2 italic">
                                        "{about}"
                                    </p>
                                )}

                                {skills && skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {skills.map((skill, index) => (
                                            <span key={index} className="badge badge-ghost badge-sm sm:badge-md">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-primary"
                                onClick={() => handleStatus("accepted" , _id)}
                                >Accept</button>
                                <button className="btn btn-error"
                                onClick={() => handleStatus("rejected" , _id)}
                                >Reject</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Request