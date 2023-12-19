import React from 'react';
import { Navbar } from '../../Components/ui/navbar';
import { Footer } from '../../Components/ui/footer';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="container mx-auto px-4 py-10 my-10">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-neutral-800 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-neutral-600 mb-4">
                        This is a sample terms of service. 
                    </p>
                    <p className="text-neutral-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus auctor odio eget tortor commodo, ut blandit nunc
                        varius.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfServicePage;
