import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { pegawaiTableData } from "../../../data/pegawaiTableData";

const readPegawai = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Gaji dan Bonus Pegawai
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
          <Input
            label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Username", "Nama Pegawai", "Email", "Jenis Kelamin", "Tanggal Lahir", "Nomor Telepon", "Gaji", "Bonus Gaji", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pegawaiTableData.filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              ).map(({ img, username, nama, email, jenisKelamin, tanggalLahir, NoTelepon, gaji, bonus }, key) => {
                const className = `py-3 px-5 ${
                  key === pegawaiTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={username}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {username}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {nama}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {jenisKelamin}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {tanggalLahir}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {NoTelepon}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {gaji}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {bonus}
                      </Typography>
                    </td>
                    <td className={className}>
                    <div className="btn-group text-center">
                      <Link to="/owner/gajiPegawai/edit">
                        <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />Ubah
                        </Button>
                      </Link>
                    </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default readPegawai;

