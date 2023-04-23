import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" className="flex justify-center">
            <Image className="w-full" width="100" height="15" alt="logo" src="/Logo.svg" />
        </Link>
    )
} 