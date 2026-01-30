const Card = ({ user }) => {
    if (!user) return null;

    const { firstName, lastName, photoURL, age, gender, about,skills } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer">
            <figure className="px-4 pt-4">
                <img
                    src={photoURL}
                    alt={`${firstName} ${lastName}`}
                    className="rounded-xl h-64 w-full object-cover"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold">
                    {firstName + " " + lastName}
                </h2>
                <div className="flex gap-2 mb-2">
                    {age && <div className="badge badge-secondary">{age} years</div>}
                    {gender && <div className="badge badge-accent capitalize">{gender}</div>}
                </div>
                <p className="text-gray-400 italic line-clamp-3">
                    {about || "No bio provided."}
                </p>
                <p>{skills &&skills.join(", ")}</p>

                <div className="card-actions justify-center mt-4 w-full">
                    <button className="btn btn-primary flex-1">Ignore</button>
                    <button className="btn btn-secondary flex-1">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
