import { XMarkIcon } from "@heroicons/react/24/outline";


export function DemoErrorComponent({ onRetry }) {
    return (
        <div className="w-full py-12 h-[80vh] bg-white flex flex-col justify-center items-center">
            <div className="m-auto space-y-4">
                <div className="w-16 h-16 inline-flex justify-center items-center rounded bg-gray-100 text-gray-400">
                    <XMarkIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                    <p className="text-lg font-bold">Something went wrong!!</p>
                    <p className="text-sm text-gray-400 max-w-sm cursor-pointer" onClick={onRetry}>
                        Click here to try again
                    </p>
                </div>
            </div>
        </div>
    );
}