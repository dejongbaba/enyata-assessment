import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});


/*
*  setup authentication - done
*  setup services - done
*  setup store
*  build ui layout for auth section - done
*  build ui layout for home
*  validate forms - done
*
*
*
*
*
* */
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body className={inter.className}>
        <div className='flex h-[100vh]'>
            {/* aside section  */}
            <aside className="lg:h-full  lg:w-[25%] hidden  lg:flex flex-col bg-primary p-8 items-center ">
                <Link href={'/'}>
                    <Image
                        className="flex w-[30%] sm:w-[40%] m-auto flex-shrink-0"
                        width={30}
                        height={20}
                        alt={"sendbox-logo"}
                        src={"/images/svg/star-wars.svg"}
                    />
                </Link>
                <div className='sm:space-y-8 mt-4'>
                    <ul className='list-none'>
                        <li className='flex space-x-2'>
                            <Image
                                className="flex w-5 h-5 m-auto flex-shrink-0"
                                width={30}
                                height={20}
                                alt={"sendbox-logo"}
                                src={"/images/svg/overview.svg"}
                            />
                            <Link href='/starships' className='text-white font-medium text-sm'>Overview</Link>
                        </li>
                    </ul>
                    <ul className='list-none space-y-2'>
                        <li className='flex space-x-2'>
                            <div className='rounded-lg bg-blueBright w-5 h-5'></div>
                            <Link href='/starships' className='text-white font-medium text-sm'>Starships</Link>
                        </li>
                        <li className='flex space-x-2'>
                            <div className='rounded-lg bg-pinkie w-5 h-5'></div>
                            <Link href='/people' className='text-white font-medium text-sm'>People</Link>
                        </li>
                        <li className='flex space-x-2'>
                            <div className='rounded-lg bg-yellowBright w-5 h-5'></div>
                            <Link href='/species' className='text-white font-medium text-sm'>Species</Link>
                        </li>
                    </ul>

                </div>
            </aside>
            {/* main section  */}
            <main className="flex flex-1 flex-col ">
                {/* header*/}
                <div className='hidden sm:flex  sm:p-4 shadow'>
                    <div className='flex-1'></div>
                    <div className='space-x-2'>
                        <div className='flex divide-x'>
                            <Image
                                className="flex w-5 h-5 m-auto flex-shrink-0"
                                width={20}
                                height={20}
                                alt={"notification"}
                                src={"/images/svg/notification.svg"}
                            />
                            <div className='space-x-4 flex'>
                                <Image
                                    className="flex w-5 h-5 m-auto flex-shrink-0"
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
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}