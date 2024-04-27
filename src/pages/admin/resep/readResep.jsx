import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { resepTableData } from "../../../data/resepTableData";

const ReadResep = () => {
  // Mengelompokkan data berdasarkan nama produk
  const groupedData = resepTableData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.namaProduk === curr.namaProduk);
    if (existing) {
      existing.bahanBaku.push({ nama: curr.namaBahanBaku, jumlah: curr.jumlahBahan });
    } else {
      acc.push({
        namaProduk: curr.namaProduk,
        bahanBaku: [{ nama: curr.namaBahanBaku, jumlah: curr.jumlahBahan }],
      });
    }
    return acc;
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Resep
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Nama Produk
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Nama Bahan Baku
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Jumlah Bahan
                  </Typography>
                </th>
                {/* <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Actions
                  </Typography>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {groupedData.map(({ namaProduk, bahanBaku }) => (
                
                <tr key={namaProduk}>
                  <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">{namaProduk}</td>
                  <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
                    {bahanBaku.map(({ nama }, index) => (
                      <div key={index}>{nama}</div>
                    ))}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
                    {bahanBaku.map(({ jumlah }, index) => (
                      <div key={index}>{jumlah}</div>
                    ))}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
                  <div className="btn-group text-center">
                        <Button to="edit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />Edit
                        </Button>
                        <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({ nama, stok, satuan })}>
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />Delete
                        </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReadResep;
