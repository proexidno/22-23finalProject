"use client"
import { useRef } from "react";
import { signIn } from 'next-auth/react';
import { useToast } from "components/ui/use-toast";
import { useRouter } from "next/navigation";


export default function SignUp() {

    const loginRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const { toast } = useToast();

    function afterConfirmed(e) {
        if (e.ok && !e.error) {
            signIn()
        } else {
            toast({
                title: e.error,
                description: "Try again"
            })
        }
    }

    async function handleSignUpSubmit(e) {
        e.preventDefault();
        const login = loginRef.current;
        const password = passwordRef.current;
        const email = emailRef.current;
        const confirmPassword = confirmPasswordRef.current;
        if (password == confirmPassword) {
            const response = await fetch("http://localhost:3000/api/signup", {
                "method": 'POST',
                "body": JSON.stringify({ login, password, email }),
                "cache": "no-cache"
            })
            afterConfirmed(await response.json())
        } else {
            toast({
                title: "Passwords doesn't match",
                description: "Try again typing passwords"
            })
        }
    };

    return (
        <div className="grid min-h-screen place-content-center">
            <form
                className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md"
                onSubmit={handleSignUpSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="signup-username"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter a login"
                        onChange={(e) => loginRef.current = e.target.value}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="signup-email"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter an email"
                        onChange={(e) => emailRef.current = e.target.value}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="signup-password"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="signup-password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter a password"
                        onChange={(e) => passwordRef.current = e.target.value}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="signup-confirm-password"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Confirm your password"
                        onChange={(e) => confirmPasswordRef.current = e.target.value}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                    <span className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800">
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="ml-2 text-blue-500 hover:text-blue-800"
                            onClick={signIn}
                        >
                            Sign In
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
};
