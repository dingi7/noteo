import React, { useState } from 'react';
import { LoginUserData, RegisterUserData } from '../../Interfaces/IUserData';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    type: string;
    text: string;
    id: keyof LoginUserData | keyof RegisterUserData;
    // setUserData:
    //     | React.Dispatch<React.SetStateAction<RegisterUserData>>
    //     | React.Dispatch<React.SetStateAction<LoginUserData>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AuthInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordInput = props.type === 'password';
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="mb-4 relative">
            <label
                className="block mb-2 text-md font-medium text-gray-900"
                htmlFor={props.id}
            >
                {props.text}
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg">
                <input
                    className="bg-gray-50 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id={props.id}
                    type={isPasswordInput && showPassword ? 'text' : props.type}
                    placeholder={props.text}
                    onChange={props.onChange}
                />
                {isPasswordInput && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="p-2 rounded-r-lg"
                    >
                        {showPassword ? (
                            <EyeOff size="20" />
                        ) : (
                            <Eye size="20" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
