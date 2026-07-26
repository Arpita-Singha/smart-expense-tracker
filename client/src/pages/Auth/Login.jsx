import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {

        try{

            const response = await loginUser(data);

            localStorage.setItem("token", response.token);

            toast.success("Login Successful");

            navigate("/dashboard");

        }
        catch(error){

            toast.error(error.response?.data?.message || "Login Failed");

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    {...register("email")}
                    placeholder="Email"
                    className="border w-full p-3 rounded mb-4"
                />

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="border w-full p-3 rounded mb-4"
                />

                <button
                    className="bg-blue-600 text-white w-full p-3 rounded"
                >
                    Login
                </button>

                <p className="mt-5 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600"
                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;