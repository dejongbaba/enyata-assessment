import Form from "./form";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    return (
        <main
            className="flex bg-gray-200 sm:bg-white sm:w-[70%] space-y-8 sm:space-y-0 m-auto flex-col items-center justify-between p-6 sm:p-24">
            <Link href={'/'}>
                <Image
                    className="flex w-[60%] sm:hidden sm:w-[70%] sm:m-auto flex-shrink-0"
                    width={120}
                    height={20}
                    alt={"sendbox-logo"}
                    src={"/images/svg/star-wars.svg"}
                />
            </Link>
            <Form/>
        </main>
    );
}
