import { useState } from "react";
import Card from "./Card";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [skills, setSkills] = useState(user.skills?.join(", ") || "");

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 p-8 min-h-screen bg-base-200">
            {/* Edit Form Container */}
            <div className="w-full max-w-lg">
            <div className="card bg-neutral shadow-2xl border border-gray-700/50">
            <div className="card-body gap-6">
            <h2 className="card-title text-center justify-center text-3xl font-extrabold pb-2">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Edit Profile
            </span>
            </h2>

            <div className="divider border-gray-700/50 m-0"></div>

            <div className="space-y-5">
            {/* Uniform Input Rows */}
            {[
                { label: "First Name", value: firstName, setter: setFirstName, type: "text", placeholder: "e.g. John" },
                { label: "Last Name", value: lastName, setter: setLastName, type: "text", placeholder: "e.g. Doe" },
                { label: "Age", value: age, setter: setAge, type: "number", placeholder: "e.g. 25" },
                { label: "Photo URL", value: photoURL, setter: setPhotoURL, type: "text", placeholder: "Image Address" },
                { label: "Skills", value: skills, setter: setSkills, type: "text", placeholder: "React, Node, Java (comma separated)" }
            ].map((field) => (
                <div key={field.label} className="form-control w-full">
                    <label className="label py-1">
                        <span className="label-text text-xs uppercase font-bold tracking-widest text-gray-400">
                            {field.label}
                        </span>
                    </label>
                    <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        className="input input-bordered w-full bg-gray-800/50 text-white border-gray-600 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                        placeholder={field.placeholder}
                    />
                </div>
            ))}

            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text text-xs uppercase font-bold tracking-widest text-gray-400">
                        Gender
                    </span>
                </label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-gray-800/50 text-white border-gray-600 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text text-xs uppercase font-bold tracking-widest text-gray-400">
                        About Me
                    </span>
                </label>
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full bg-gray-800/50 text-white border-gray-600 focus:border-indigo-500 focus:outline-none h-28 transition-all duration-300 resize-none"
                    placeholder="Tell your story..."
                ></textarea>
            </div>
            </div>

            <div className="card-actions mt-4">
            <button className="btn btn-primary w-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 uppercase font-black tracking-widest border-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                Save Profile
            </button>
            </div>
            </div>
            </div>
            </div>

            {/* Live Preview Container */}
            <div className="flex flex-col items-center gap-6 sticky top-8">
            <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em]">
            Live Preview
            </h3>
            <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
        </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <Card
                        user={{
                            firstName,
                            lastName,
                            age,
                            gender,
                            about,
                            photoURL,
                            skills: skills.split(",").map((s) => s.trim()).filter((s) => s !== ""),
                        }}
                    />
                </div>

                <div className="alert alert-info bg-indigo-900/20 border-indigo-500/30 text-indigo-300 shadow-xl max-w-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-xs font-semibold">Changes are reflected in real-time on your profile card.</span>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;