import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerUser } from "../../api/requests";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Logo } from "../../Components/ui/logo";
import { Button } from "../../Components/ui/button";
import React from "react";
import { AuthInput } from "../../Components/ui/auth-input";

export const Register = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate("/");
            // errorNotification("You are already logged in");
        }
    }, [isAuth, navigate]);
    const [userData, setUserData] = useState({
        firstName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (userData.password !== userData.confirmPassword) {
                throw new Error("Passwords do not match");
            }
            const response = await registerUser(userData);
            signIn({
                token: response.accessToken,
                expiresIn: 9999, // change this later
                tokenType: "Bearer",
                authState: response,
            });
            navigate("/");
        } catch (err: any) {
            // errorNotification(err.message);
        }
    };

    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <div className="w-[600px] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between">
                <div className="mx-auto">
                    <Logo />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AuthInput
                            type="email"
                            text="Email"
                            id="email"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="text"
                            text="First Name"
                            id="firstName"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="text"
                            text="Username"
                            id="username"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="password"
                            text="Password"
                            id="password"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="password"
                            text="Confirm Password"
                            id="confirmPassword"
                            setUserData={setUserData}
                        />
                        <div className="text-black text-left">
                            Already registered?{" "}
                            <Link to="/login" className="font-bold ">
                                Login
                            </Link>
                        </div>
                    </div>

                    <Button
                        className="shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100"
                        type="submit"
                        id="registerButton"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
};
