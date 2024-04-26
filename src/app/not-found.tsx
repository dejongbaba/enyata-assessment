"use client";

export const metadata = {
    name: "Start Wars App",
    title: "Star Wars | People | Species",
    description: "This is the built-in description on the page and this is how we will keep dealing with it",
};

export default function NotFoundOld({retry}) {
    return (
        <html lang="en">
        <body className="h-screen w-full flex flex-col">
        <p className="flex flex-col justify-center items-center text-center">404 Not found</p>
        <button onClick={() => retry()} className="font-medium bg-black text-white px-2 py-1">
            Retry
        </button>
        </body>
        </html>
    );
}
