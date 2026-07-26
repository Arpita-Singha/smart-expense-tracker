function SummaryCard({
    title,
    value,
    icon,
    color
}) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            <div>

                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">

                    {title}

                </p>

                <h2 className={`text-4xl font-extrabold mt-2 ${color}`}>

                    ₹{Number(value).toLocaleString("en-IN")}

                </h2>

            </div>

            <div className={`${color} text-5xl bg-gray-100 rounded-full p-5`}>

                {icon}

            </div>

        </div>

    );

}

export default SummaryCard;