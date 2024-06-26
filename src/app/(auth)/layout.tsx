import type {Metadata} from "next";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";


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

        <div className='flex h-[100vh]'>
            {/* aside section  */}
            <aside className="lg:h-full  lg:w-[40%] hidden  lg:flex bg-primary justify-center items-center ">
                <Link href={'/'}>
                    <Image
                        className="flex w-[60] sm:w-[70%] m-auto flex-shrink-0"
                        width={120}
                        height={20}
                        alt={"sendbox-logo"}
                        src={"/images/svg/star-wars.svg"}
                    />
                </Link>
            </aside>
            {/* main section  */}
            <main className="flex flex-1  sm:m-auto">{children}</main>
        </div>
    );
}
