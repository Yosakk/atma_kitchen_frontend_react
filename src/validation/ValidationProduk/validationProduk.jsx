import { z } from "zod";


export const addProduk = z
    .object({
        nama_produk: z
            .string({
                required_error: "Nama Produk wajib diisi!",
            })
            .min(5, {message: "Minimal 2 Karakter"})
            .max(60, { message: "Maximal 60 Karakter" }),
        harga_produk: z
            .string({
                required_error: "Harga Produk wajib diisi!",
            }),
        kategori_produk: z
            .string({
                required_error: "Kategori Produk wajib diisi!",
            })
            .min(1, {
                message: "Kategori Produk harus dipilih"
            }),
        quantitas: z
            .string({
                required_error: "Kuantitas wajib diisi!",
            })
            .min(1, {
                message: "Kuantitas harus dipilih"
            }),
        
        stok_produk: z
            .string({
                required_error: "Stok Produk wajib diisi!"
            }),
        // id_stok_produk: z
        //     .string({
        //         required_error: "Id Stok Produk wajib diisi!",
        //     })
        //     .min(1, {
        //         message: "Id Stok Produk harus dipilih"
        //     }),
        deskripsi_produk: z
            .string({
                required_error: "Deskripsi Produk wajib diisi!",
            })
    })