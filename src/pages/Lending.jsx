import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Lending() {

    const dataThParent = [
        "#",
        "Time",
        "name",
        "username",
        "Note",
        "Total Use",
        "Stuff_id",
        "Action"
        
    ]

    const [lendings, setLendings] = useState({});

    useEffect(() => {
        axios.get('http://localhost:2222/lendings', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setLendings(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "date_time": null,
        "name": null,
        "user": "username",
        "notes": null,
        "total_stuff":null,
        "stuff": "name"
        

    }

    const button = [
        "create",
        "delete",
        "detail",

    ]

    const endpoints = {
        "create": "http://localhost:2222/lendings/store",
        "delete": "http://localhost:2222/lendings/delete/{id}",
        "detail": "http://localhost:2222/lendings/{id}"

    }
    const coloumnDetailModalDelete = 'name'
    
    const inputData = {
        "date_time": {
            "type": "datetime-local",
            "options": null,

        },
        
        "name": {
            "type": "text",
            "options": null,
        },

        "notes": {
            "type": "text",
            "options": null,
        },

        "total_stuff": {
            "type": "text",
            "options": null,
        },

        "stuff_id": {
            "type": "text",
            "options": null,
        },
       
    }




    return(
    <>
    <Navbar/>

    <div className="p-10">
                <Table dataTh={dataThParent}
                    dataTd={lendings}
                    coloumDB={coloumDataBase}
                    buttonData={button}
                    endpoints={endpoints}
                    coloumnDetail={coloumnDetailModalDelete}
                    inputData={inputData}
                ></Table>
            </div>
    </>)
}