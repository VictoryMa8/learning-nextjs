'use client'; // tells React to render the component on the client

import { useState } from "react";

export default function LikeButton() {
    const [likes, setLikes] = useState(0);

    function handleClick() {
        console.log("Button was clicked");
        setLikes(likes + 1)
    }

    return <button onClick={handleClick}>Like {likes}</button>

}