import { Link, useNavigate } from 'react-router-dom';
import { AuthInput } from '../../Components/ui/auth-input';
import React, { useEffect, useState } from 'react';
import { Logo } from '../../Components/ui/logo';
import { Button } from '../../Components/ui/button';
import { Navbar } from '../../Components/ui/navbar';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { loginUser } from '../../api/requests';

type Props = {};

export const Login = (props: Props) => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            // errorNotification('You are already logged in');
        }
    }, [isAuth, navigate]);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginUser(userData);
            signIn({
                token: response.accessToken,
                expiresIn: 9999, // change this later
                tokenType: 'Bearer',
                authState: response,
            });
            navigate('/');
        } catch (err: any) {
            // errorNotification(err.message);
        }
    };

    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <Navbar></Navbar>
            <div className=" w-[600px] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between">
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
                            type="password"
                            text="Password"
                            id="password"
                            setUserData={setUserData}
                        />
                        <div className="text-black text-left">
                            Not registered?{' '}
                            <Link to={'/register'} className="font-semibold">
                                Register
                            </Link>
                        </div>
                    </div>
                    <Button
                        className="shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100"
                        type="submit"
                        id="registerButton"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};
