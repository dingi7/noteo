import { Logo } from './logo';
import { Button } from './button';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    
                    <Link to="/privacyPolicy">
                    <Button size="sm" variant="ghost">
                        Privacy Policy
                    </Button>
                    </Link>
                    <Link to="/termsOfService">
                        <Button size="sm" variant="ghost">
                            Terms of Service
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
