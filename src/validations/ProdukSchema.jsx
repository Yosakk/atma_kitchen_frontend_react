import { z } from "zod";

export const ProdukSchema = z
    .object({
        namaProduk: z
            .string({
                required_error: "Nama Produk wajib diisi",
                invalid_type_error:
                    "Nama Produk wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Produk wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Produk maksimal 50 karakter" }),
        hargaProduk: z
            .string({
                required_error: "Harga Produk wajib diisi",
                invalid_type_error: "Harga Produk harus berupa angka",
            })
            .refine((value) => {
                const numberValue = parseFloat(value);
                return !isNaN(numberValue) && numberValue > 0;
            }, { message: "Harga Produk harus lebih besar dari 0" }),
        limitProduk: z
            .string({
                required_error: "Limit Harian Produk wajib diisi",
                invalid_type_error: "Limit Harian Produk harus berupa angka",
            })
            .refine((value) => {
                const numberValue = parseFloat(value);
                return !isNaN(numberValue) && numberValue > 0;
            }, { message: "Limit Harian harus lebih besar dari 0" }),
        stokProduk: z
            .string({
                required_error: "Stok Produk Titipan wajib diisi",
                invalid_type_error: "Stok Produk Titipan harus berupa angka",
            })
            .refine((value) => {
                const numberValue = parseFloat(value);
                return !isNaN(numberValue) && numberValue > 0;
            }, { message: "Stok Produk Titipan harus lebih besar dari 0" }),
        gambarProduk: z
            .string({
                required_error: "Gambar Produk wajib diisi",
            }),
        kategoriProduk: z
            .string({
                required_error: "Kategori Produk wajib diisi",
            }),
        quantitas: z
            .number({
                required_error: "Quantitas wajib diisi",
                invalid_type_error: "Quantitas harus berupa angka",
            }),
        namaPenitip: z
            .string({
                required_error: "Nama Penitip wajib diisi",
            }),
        deskripsiProduk: z
            .string({
                required_error: "Deskripsi Produk wajib diisi",
            }),
    })
    .refine((data) => data.hargaProduk > 0, {
        message: "Harga Produk harus lebih besar dari 0",
        path: ["hargaProduk"],
    })
    .refine((data) => data.quantitas >= 0, {
        message: "Quantitas tidak boleh negatif",
        path: ["quantitas"],
    });
