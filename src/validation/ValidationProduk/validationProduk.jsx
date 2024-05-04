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
            .number({
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
        // gambar_produk: z
        //     .object({
        //         mimetype: z.string().regex(/^image\/(jpeg|jpg|png|gif)$/i, {
        //             message: "Hanya file gambar yang diperbolehkan (jpeg, jpg, png, gif)",
        //         }),
        //         size: z.number().max(2048, {
        //             message: "Ukuran gambar tidak boleh lebih dari 2MB",
        //         }),
        //     })
        //     .nullable(),
        stok_produk: z
            .number({
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