import { Link } from 'react-router-dom'; // Assuming you are using React Router

import { Footer } from '../../Components/ui/footer';
import { Navbar } from '../../Components/ui/navbar';
import { Button } from '../../Components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { user } from '../../Data/hardcoded';

const ProfilePage = () => {

    return (
        <div className="h-screen bg-slate-100">
            <Navbar />
            <main className="h-full pt-40 pb-20 bg-slate-100">
                <div className="h-full flex items-center justify-center flex-col">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className=" h-48 w-48 shadow-md rounded-md mb-2"
                        />
                        <h1 className="text-5xl  text-neutral-800 mb-2">
                            {user.name}
                        </h1>
                        <p className="text-sm text-neutral-400">{user.email}</p>
                    </div>
                    <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
                        {user.bio}
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                        {user.socialMedia.twitter && (
                            <a
                                href={user.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter />
                            </a>
                        )}
                        {user.socialMedia.linkedin && (
                            <a
                                href={user.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin />
                            </a>
                        )}
                        {user.socialMedia.github && (
                            <a
                                href={user.socialMedia.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github></Github>
                            </a>
                        )}
                    </div>

                    {/* Course Progress */}
                    <div className=" mt-10 mb-5">
                        <p className="text-sm text-neutral-400">
                            Course Progress:{' '}
                            {user.courseProgress.completedCourses} out of{' '}
                            {user.courseProgress.totalCourses} completed
                        </p>
                    </div>
                    {/* ... */}

                    {/* Logout button */}
                    <Button size="sm" variant="outline">
                        <Link to="">Logout</Link>
                    </Button>
                </div>
            </main>

            <Footer></Footer>
        </div>
    );
};

export default ProfilePage;
