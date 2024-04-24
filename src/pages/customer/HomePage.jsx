import React, { useState } from "react";

const HomePage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fungsi ini akan dipanggil ketika pengguna memilih file video
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Mengambil file yang dipilih
        setSelectedVideo(URL.createObjectURL(file)); // Mengatur URL file yang dipilih sebagai sumber video
    };

    return (
        <div>
            {/* Input untuk memilih file video */}
            <input type="file" accept="video/*" onChange={handleFileChange} />
            
            {/* Tampilkan video yang dipilih */}
            {selectedVideo && (
                <video className="h-full w-full rounded-lg" controls loop>
                    <source src={selectedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}

export default HomePage;
