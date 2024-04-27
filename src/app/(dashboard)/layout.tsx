'use client'
import {Inter} from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ["latin"]});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();


    const menus = [
        {title: 'Overview', href: "/home"},
        {title: 'People', href: "/people"},
        {title: 'Species', href: "/species"},
        {title: 'Starships', href: "/starships"}
    ]


    return (
        <html lang="en">

        <body className={inter.className}>
        <div className='flex lg:h-[100vh]'>
            {/* aside section  */}
            <aside className="lg:h-full z-10 sm:fixed sm:w-[22%] hidden  lg:flex flex-col flex-start bg-primary  ">
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

            </aside>
            {/* main section  */}
            <main className="flex flex-1 sm:ml-[22%] flex-col overflow-y">
                {/* header*/}
                <div className='hidden sm:flex  sm:p-4 shadow mb-8'>
                    <div className='flex-1'></div>
                    <div className='space-x-4'>
                        <div className='flex space-x-4 divide-x'>
                            <Image
                                className="flex w-5 h-5 m-auto flex-shrink-0"
                                width={20}
                                height={20}
                                alt={"notification"}
                                src={"/images/svg/notification.svg"}
                            />
                            <div className='space-x-4 flex'>
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
                                    className="flex w-5 h-5 m-auto flex-shrink-0"
                                    width={20}
                                    height={20}
                                    alt={"menu"}
                                    src={"/images/svg/menu-dots.svg"}
                                /></div>
                        </div>
                    </div>


                </div>
                <div className='p-4 sm:p-8 mb-8'>

                    {children}
                </div>
            </main>
        </div>
        </body>
        </html>
    );
}
