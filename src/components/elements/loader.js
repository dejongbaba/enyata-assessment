import React from "react";
import {Oval} from "react-loader-spinner";

Loader.propTypes = {};

function Loader() {
    return (
        <div className="flex items-center justify-center h-screen space-x-2">
            <Oval
                ariaLabel="loading-indicator"
                height={40}
                width={40}
                strokeWidth={5}
                color="#0A74DC"
                secondaryColor="#F4F4F4"
            />
        </div>
    );
}

export default Loader;
