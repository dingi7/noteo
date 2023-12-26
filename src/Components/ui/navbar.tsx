import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import React from 'react';

export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const signOut = useSignOut();

    return (
        <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center z-10">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    {isAuth() ? (
                        <>
                            <Link to="/dashboard">
                                <Button variant={'gray'} size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant={'outline'}
                                size="sm"
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button size="sm" variant="outline">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                                    Get Noteo for free
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
