'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


function TopBar() {

    const pathname = usePathname()


    return (
        <nav className="flex w-full h-16 justify-center bg-background-900/90 shadow fixed top-0 left-0 z-50 backdrop-blur-sm">
            <div className="flex flex-row justify-between items-center h-full w-[75%]">
                <span className="text-3xl"><strong>Lingonaut</strong></span>
                <div className="flex flex-row h-full items-center text-lg">
                    <Link
                        href="/"
                        className={`px-4 py-2 h-full flex items-center ${pathname === "/" ? "text-text-600 hover:text-text-300" : "hover:text-text-300"
                            }`}
                    >
                        <strong>Home</strong>
                    </Link>
                    <Link
                        href="/create"
                        className={`px-4 py-2 h-full flex items-center ${pathname === "/create" ? "text-text-600 hover:text-text-300" : "hover:text-text-300"
                            }`}
                    >
                        <strong>Create</strong>
                    </Link>
                    <Link
                        href="/practice"
                        className={`px-4 py-2 h-full flex items-center ${pathname === "/practice" ? "text-text-600 hover:text-text-300" : "hover:text-text-300"
                            }`}
                    >
                        <strong>Practice</strong>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default TopBar;