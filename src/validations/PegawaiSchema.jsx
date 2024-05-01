import { z } from "zod";

export const PegawaiSchema = z
    .object({
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
        password: z
            .string({
                required_error: "Password wajib diisi",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 6 karakter & maksimal 20 karakter!",
            })
            .min(1, { message: "Password wajib diisi!" }),
        username: z
            .string({
                required_error: "Username wajib diisi",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Username wajib terdiri dari minimal 3 karakter" })
            .max(15, { message: "Username maksimal 15 karakter" }),
        fullName: z
            .string({
                required_error: "Fullname wajib diisi",
                invalid_type_error:
                    "Fullname wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Fullname wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Fullname maksimal 50 karakter" }),
        noTelepon: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" }),
    });
