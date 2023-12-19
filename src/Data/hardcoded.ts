// Hardcoded sample course data
export interface ICourse {
    id: string;
    title: string;
    description: string;
    duration: string;
    image: string;
}

export const courses = [
    {
        id: "1",
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of web development.',
        duration: '4 weeks',
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "2",
        title: 'React.js Masterclass',
        description: 'Master React.js and build modern web applications.',
        duration: '6 weeks',
        image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "3",
        title: 'Data Science Essentials',
        description: 'Explore the essentials of data science and analytics.',
        duration: '8 weeks',
        image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    // Add more courses as needed
];


export const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture:
        'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Passionate learner and tech enthusiast.',
    socialMedia: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
    },
    courseProgress: {
        totalCourses: 10,
        completedCourses: 5,
    },
};