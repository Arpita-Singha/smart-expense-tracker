import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {

    const today = new Date().toLocaleDateString();

    return (

        <div className="bg-white shadow-md h-20 flex justify-between items-center px-8">

            <div>

                <h1 className="text-3xl font-bold text-blue-600">
                    Welcome Back
                </h1>

                <p className="text-gray-500">
                    Manage your finances efficiently
                </p>

            </div>

            <div className="flex items-center gap-6">

                <span className="text-gray-600">

                    {today}

                </span>

                <FaBell
                    size={22}
                    className="cursor-pointer text-gray-600"
                />

                <FaUserCircle
                    size={35}
                    className="text-blue-600"
                />

            </div>

        </div>

    );

}

export default Navbar;