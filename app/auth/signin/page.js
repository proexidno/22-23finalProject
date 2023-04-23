"use client";
import React, { useRef } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react';

function SignIn() {
    const login = useRef('')
    const password = useRef('')

    async function handleSubmit(event) {
        event.preventDefault()

        let response = await signIn("credentials", {
            login: login.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/",
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="max-w-md w-full px-8 py-6 rounded shadow-lg bg-white">
                <div className="text-gray-800 text-2xl font-medium mb-6">Sign In to Your Account</div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={(e) => login.current = e.target.value}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => password.current = e.target.value}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>

                        <Link href="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
