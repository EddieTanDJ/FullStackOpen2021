import React from "react";

// Ex 2.19 - 2.20 Improved Error Message
const Notification = ({ error }) => {
    console.log("Notification", error);
    if (error?.message === null || error?.message === undefined) {
        return null;
    }
    
    return (
        <div className={error?.type === "error" ? "error" : "success"}>
            {error?.message}
        </div>
    );
}

export default Notification;
