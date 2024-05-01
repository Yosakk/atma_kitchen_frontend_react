import { z } from "zod";

export const BahanBakuSchema = z
    .object({
        namaBahanBaku: z
        .string({
            required_error: "Nama Bahan Baku wajib diisi",
            invalid_type_error:
            "NamaBahan Baku wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
        })
        .min(3, { message: "Nama Bahan Baku wajib terdiri dari minimal 3 karakter" })
        .max(50, { message: "Nama Bahan Baku maksimal 50 karakter" }),
        jumlahBahan: z
        .string({
            required_error: "Jumlah Bahan Baku wajib diisi",
            invalid_type_error: "Jumlah Bahan Baku harus berupa angka",
        })
        .refine((value) => {
            const numberValue = parseFloat(value);
            return !isNaN(numberValue) && numberValue > 0;
        }, { message: "Jumlah Bahan Baku harus lebih besar dari 0" }),
    })
    .refine((data) => data.JumlahHampers > 0, {
        message: "JumlahBahan Baku harus lebih besar dari 0",
        path: ["JumlahHampers"],
    });