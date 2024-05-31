import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, coloumDB, buttonData, endpoints, columDetail, judulModalEdit, inputData,  }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointReplaced, setEndPointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const navigate = useNavigate(); // Add this line to use navigate

    function handleModalDelete(id) {
        const endpoinstDetail = endpoints['detail'];
        const endpointsDelete = endpoints['delete'];

        const detailReplaced = endpoinstDetail.replace('{id}', id);
        const deleteReplaced = endpointsDelete.replace('{id}', id);

        const repiaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        }
        setEndPointReplaced(repiaced);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpoinstDetail = endpoints['detail'];
        const endpoinsUpdate = endpoints['update'];

        const detailReplaced = endpoinstDetail.replace('{id}', id);
        const updateReplaced = endpoinsUpdate.replace('{id}', id);

        const replace = {
            "detail": detailReplaced,
            "update": updateReplaced,
        }
        setEndPointReplaced(replace);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replaced = {
            "store": endpoints['store']
        }
        setEndPointReplaced(replaced)
        setIsOpenModalAdd(true)
    }

    function handleRestore(id) {
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                alert('Data berhasil di-restore');
                navigate('/stuffs'); 
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 py-20 justify-center">
                <div className="flex justify-center mb-2">
                    {
                        buttonData.includes("create") ? (
                            <button onClick={handleModalAdd} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/stuff/trash'} className="ml-3 text-white bg-yellow-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Trash
                            </Link>
                        ) : ''
                    }
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                dataTh.map((data, Index) =>
                                    <th scope="col" className="px-6 py-3" key={Index}>{data}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(dataTd).map(([index, value]) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>

                                    <td className="px-6 py-4 text-right">{parseInt(index) + 1}.</td>
                                    {
                                        Object.entries(coloumDB).map(([i, v]) => (
                                            <td className="px-6 py-4" key={i}>
                                                {
                                                    !v ? value[i] : value[i.replace(/[!@#$%^&]/, '')] ? value[i.replace(/[!@#$%^&]/, '')][v] : '0'
                                                }
                                            </td>
                                        ))
                                    }
                                    <td className="px-6 py-4 text-right">
                                        {
                                            buttonData.includes("edit") ? (
                                                <a onClick={() => handleModalEdit(value.id)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("delete") ? (
                                                <a onClick={() => handleModalDelete(value.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Delete</a>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("restore") ? (
                                                <a href="#" onClick={() => handleRestore(value.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Restore</a>
                                            ) : ""
                                        }
                                        {
                                            buttonData.includes("permanent-delete") ? (
                                                <a onClick={() => handleModalDelete(value.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent-Delete</a>
                                            ) : ''
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columDetail={columDetail}
            ></ModalDelete>
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced}
            ></ModalEdit>
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced}></ModalAdd>
        </>
    )
}
