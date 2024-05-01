import urlAxios from ".";

export const Login = async (data) => {
    try {
        console.log(data);
        const response = await urlAxios.post("/login", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Ini AuthApi");

        //data masuk atau tidak
        console.log("Response:", response.data.user);

        //cek apakah token ada atau tidak
        console.log("Token:", response.data.access_token);

        return response.data
    } catch (error) {
        console.error("Error:", error);
        throw error.response.data;
    }
};

export const RegisterUser = async (data) => { //data diisi dengan maping atau object dasar
    try {
        console.log(data);
        const response = await urlAxios.post("/register", data);
        console.log("Response:", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message.email[0];
            throw new Error(errorMessage); // lemparkan pesan kesalahan ke atas
        } else {
            console.error("Error:", error);
            throw new Error("Failed to register user."); // lemparkan pesan kesalahan default jika tidak ada pesan khusus
        }
    }
};

export const ForgotPassword = async (data) => {
    try{
        const response = await urlAxios.post("/forgot-password", data);
        console.log("Response : ", response.data);
        return response.data;
    } catch (error) {
        throw error.response
    }
};