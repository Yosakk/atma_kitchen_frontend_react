import { z } from "zod";

export const HampersSchema = z
    .object({
        namaHampers: z
        .string({
            required_error: "Nama Paket Hampers wajib diisi",
            invalid_type_error:
            "Nama Hampers wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
        })
        .min(3, { message: "Nama Paket Hampers wajib terdiri dari minimal 3 karakter" })
        .max(50, { message: "Nama Paket Hampers maksimal 50 karakter" }),
        hargaHampers: z
        .string({
            required_error: "Harga Paket Hampers wajib diisi",
            invalid_type_error: "Harga Paket Hampers harus berupa angka",
        })
        .refine((value) => {
            const numberValue = parseFloat(value);
            return !isNaN(numberValue) && numberValue > 0;
        }, { message: "Harga Paket Hampers harus lebih besar dari 0" }),
        gambarHampers: z
        .string({
            required_error: "Gambar Hampers wajib diisi",
        }),
        produkList: z
        .array(z.string())
        .min(1, { message: "Harus ada minimal 1 produk" }),
    })
    .refine((data) => data.hargaHampers > 0, {
        message: "Harga Hampers harus lebih besar dari 0",
        path: ["hargaHampers"],
    });
