import React from 'react';

import { Footer } from '../../Components/ui/footer';
import { Navbar } from '../../Components/ui/navbar';
import { HomePageDesign } from './HomePage';

const HomePage = () => {
    return (
        <div className="h-screen bg-slate-100">
            <Navbar />
            <main className="h-full pt-40 pb-20 bg-slate-100">
                <HomePageDesign />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
