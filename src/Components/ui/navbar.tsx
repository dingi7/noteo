import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { useIsAuthenticated } from 'react-auth-kit';
import React from 'react';

export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    return (
        <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center z-10">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    {/* <Link to="/courses">
                        <Button variant={'gray'} size="sm">
                            Courses
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                            Profile
                        </button>
                    </Link>
                    <>
                        <Link to="/login">
                            <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                                Register
                            </button>
                        </Link>
                    </> */}
                    {isAuth() ? (
                        <Button variant={'gray'} size="sm">
                            <Link to="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <>
                            <Button size="sm" variant="outline" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                                <Link to="/register">
                                    Get Noteo for free
                                </Link>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};