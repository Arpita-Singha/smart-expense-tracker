import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

function Register(){

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async(data)=>{

        try{

            await registerUser(data);

            toast.success("Registration Successful");

            navigate("/");

        }

        catch(error){

            toast.error(error.response?.data?.message || "Registration Failed");

        }

    }

    return(

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg p-8 rounded-xl w-96"
            >

                <h1 className="text-3xl font-bold text-center mb-6">

                    Register

                </h1>

                <input
                    {...register("fullName")}
                    placeholder="Full Name"
                    className="border p-3 w-full mb-4 rounded"
                />

                <input
                    {...register("email")}
                    placeholder="Email"
                    className="border p-3 w-full mb-4 rounded"
                />

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="border p-3 w-full mb-4 rounded"
                />

                <button
                    className="bg-green-600 text-white w-full p-3 rounded"
                >

                    Register

                </button>

                <p className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-600"
                    >

                        Login

                    </Link>

                </p>

            </form>

        </div>

    )

}

export default Register;