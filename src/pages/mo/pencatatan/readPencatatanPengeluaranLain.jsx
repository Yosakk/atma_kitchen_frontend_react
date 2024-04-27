import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { expendituresTableData } from "../../../data/expendituresTableData";

const readPencatatanPengeluaranLain = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Pencatatan Pengeluaran Lain
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
                    Nama User
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Nama Pengeluaran
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Jumlah Pengeluaran
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Harga Satuan
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Total Pengeluaran
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Tanggal Pengeluaran
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {expendituresTableData.map((item) => (
                
                <tr key={item.id}>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-[11px] font-semibold text-blue-gray-600">
                    {item.username}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                    {item.expenditureName}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                    {item.expenditureAmount}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                    {item.unitPrice}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                    {item.total}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                    {item.date}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Delete
                      </Typography>
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

export default readPencatatanPengeluaranLain;
