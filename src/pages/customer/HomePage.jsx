import React, { useState } from "react";

const HomePage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);


    return (
        <div>
            <h1>Hello</h1>
            <img src="http://127.0.0.1:8000/storage/hampers/t5gAuXdLQWsIokrXbfhrcygwWTBzEg6JcaEq1oHa.png" alt="Gambar" />
        </div>
    );
}

export default HomePage;
