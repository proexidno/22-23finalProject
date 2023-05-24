import Image from "next/image"
import Link from "next/link"

export default function Logo({className}) {
    return (
        <Link href="/" className={`flex justify-center z-40 ${className}`}>
            <Image priority={true} className="w-full" width="100" height="15" alt="logo" src="/Logo.svg" />
        </Link>
    )
} 