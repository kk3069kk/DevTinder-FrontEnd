import { useEffect } from "react"
import apiClient from "../utils/apiClient"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"
import { Link } from "react-router-dom"

const Connection = () => {

    const dispatch = useDispatch();
    const userConnection = useSelector((state) => state.connection);
    const handleConnection = async () => {
        if (userConnection) return;
        try {

            const response = await apiClient.get("/user/connection")
            console.log(response?.data?.data);
            dispatch(addConnection(response?.data?.data));

        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    useEffect(() => {
        handleConnection();
    }, []);

    if (!userConnection) return null;
    if (userConnection.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="bg-base-300 p-10 rounded-3xl shadow-2xl border border-base-200 backdrop-blur-sm max-w-md">
                <div className="text-6xl mb-6">🤝</div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    Expand Your Network
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    You haven't made any connections yet. Start exploring profiles and build your developer circle today!
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
            <h1 className="text-3xl font-bold mb-8 text-white">Your Connections</h1>
            <div className="w-full max-w-4xl space-y-4">
                {userConnection.map((connection) => {
                    const { _id, firstName, lastName, age, gender, about, skills, photoURL } = connection;
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
                                    <Link to={`/chat/${_id}`}>
                                        <button className="btn btn-primary">Chat</button>
                                    </Link>
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Connection