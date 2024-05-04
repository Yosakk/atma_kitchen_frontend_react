import { z } from "zod";

export const userLogin = z
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
                    "Password wajib terdiri dari minimal 8 karakter & maksimal 20 karakter!",
            })
            .min(8, { message: "Minimal 8 karakter!" }),
    });

export const userRegister = z.
    object({
        username: z
            .string({
                required_error: "Username wajib diisi!",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 15 karakter!",
            })
            .max(60, { message: "Maximal 60 karakter!" }),
        nama_user: z
            .string({
                required_error: "Nama lengkap wajib diisi!"
            }),
        password: z
            .string({
                required_error: "Password wajib diisi!",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 8 karakter & maksimal 20 karakter!",
            })
            .min(8, {
                message: "Minimal 8 karakter!"
            }),
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({
                message: "Email tidak valid"
            }),
        nomor_telepon: z
            .string({
                required_error: "Nomor telepon wajib diisi!"
            })
            .regex(/^08[0-9]{9,11}$/, {
                message: "Format Nomor Telepon tidak valid (08xxxxxxxx)"
            }),
        tanggal_lahir: z
            .string({
                required_error: "Tanggal lahir wajib diisi!"
            })
            .regex(/^\d{4}-\d{2}-\d{2}$/, {
                message: "Format Tanggal Lahir tidak valid (YYYY-MM-DD)"
            }),
        gender: z
            .string({
                required_error: "Gender wajib diisi!"
            })
            .min(1, {
                message: "Jenis Kelamin harus dipilih"
            }),
    });

