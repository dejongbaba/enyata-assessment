'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import MobileMenu from "@/app/(dashboard)/mobile-menu";
import {Bars3BottomRightIcon} from "@heroicons/react/16/solid";


const Menu = () => {

    const pathname = usePathname();
    const menus = [
        {title: 'Overview', href: "/home"},
        {title: 'People', href: "/people"},
        {title: 'Species', href: "/species"},
        {title: 'Starships', href: "/starships"}
    ]

    return (<>
        <Link href={'/'}>
            <Image
                className="flex w-[30%] sm:w-[40%] my-8 m-auto flex-shrink-0"
                width={30}
                height={20}
                alt={"sendbox-logo"}
                src={"/images/svg/star-wars.svg"}
            />
        </Link>
        <div className='w-[70%] mx-auto '>
            <div className='sm:space-y-8 mt-4 flex-1 w-full'>
                {
                    menus?.length && menus.slice(0, 1).map((m, i) => {
                        const isActive =
                            (pathname?.includes(m.href) && m.href !== "/") ||
                            pathname === m.href;

                        if (i == 0) {
                            return (
                                <ul className='list-none'>
                                    <li className={`flex space-x-4 items-center text-white hover:text-primary ${isActive ? 'bg-secondary' : ''}  hover:bg-blue-200 rounded-lg transition px-4 py-2`}>
                                        <Image
                                            className="flex w-5 h-5  flex-shrink-0"
                                            width={30}
                                            height={20}
                                            alt={"sendbox-logo"}
                                            src={"/images/svg/overview.svg"}
                                        />
                                        <Link href={m.href}
                                              className={` text-lg font-medium`}>{m.title}</Link>
                                    </li>
                                </ul>)
                        }

                    })
                }

                <ul className='list-none space-y-2'>

                    {
                        menus?.length && menus.slice(1, menus.length).map((m, i) => {
                            const colors = ['bg-pinkie', 'bg-blueBright', 'bg-yellowBright'];

                            const isActive =
                                (pathname?.includes(m.href) && m.href !== "/") ||
                                pathname === m.href;

                            return (
                                <li key={i}
                                    className={`${isActive ? 'bg-secondary' : ''} flex space-x-4 text-white hover:text-primary items-center text-lg hover:bg-blue-200  rounded-lg transition px-4 py-2`}>
                                    <div className={`rounded-lg ${colors[i]} w-5 h-5`}></div>
                                    <Link href={m.href}
                                          className=' font-medium '>{m.title}</Link>
                                </li>)

                        })
                    }
                </ul>


            </div>
        </div>
    </>)
}
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const openNavigator = () => {
        setOpen(!open);
    }
    const closeNavigator = () => {
        setOpen(false);
    }

    useEffect(() => {
        closeNavigator()
    }, [pathname])

    return (

        <div className='flex lg:h-[100vh]'>
            {/* aside section  */}
            <MobileMenu open={open} onClose={openNavigator}>
                <Menu/>
            </MobileMenu>
            <aside className="lg:h-full z-10 sm:fixed sm:w-[22%] hidden  lg:flex flex-col flex-start bg-primary  ">
                <Menu/>
            </aside>
            {/* main section  */}
            <main className="flex flex-1 sm:ml-[22%] flex-col overflow-y">
                {/* header*/}
                <div className='flex space-between sm:space-around px-2 py-4 sm:p-4 shadow mb-8'>
                    <div className='hidden sm:flex flex-1'></div>
                    <div className='space-x-4 flex-1 sm:flex-initial'>
                        <div className='flex space-x-4 divide-x'>
                            <Image
                                className="flex w-5 h-5 m-auto flex-shrink-0"
                                width={20}
                                height={20}
                                alt={"notification"}
                                src={"/images/svg/notification.svg"}
                            />
                            <div className='space-x-4 flex flex-1 items-between sm:items-around'>
                                <Image
                                    className="flex w-5 h-5 ml-4 m-auto flex-shrink-0"
                                    width={20}
                                    height={20}
                                    alt={"profile"}
                                    src={"/images/svg/account.svg"}
                                />
                                <div className='normal flex-1'>
                                    John Doe
                                </div>
                                <Image
                                    className="flex w-5 h-5 hidden sm:flex m-auto flex-shrink-0"
                                    width={20}
                                    height={20}
                                    alt={"menu"}
                                    src={"/images/svg/menu-dots.svg"}
                                /></div>
                        </div>
                    </div>
                    <div className="flex items-center -m-2 sm:hidden">
                        <button
                            onClick={openNavigator}
                            type="button"
                            className="inline-flex items-center justify-center p-2 text-black bg-white rounded-sm hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            <Bars3BottomRightIcon strokeWidth={2} className="w-6 h-6"/>
                        </button>
                    </div>

                </div>
                <div className='p-4 sm:p-8 mb-8'>

                    {children}
                </div>
            </main>
        </div>

    );
}
