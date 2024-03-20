import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import "./Category.css"

import { Form, Button } from 'react-bootstrap'
import * as yup from 'yup'
import { ErrorMessage, Formik } from "formik"
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'


const customStyles = {
    headRow: {
        style: { background: "#0c0d2c" }
    },
    headCells: {
        style: { color: "white", fontSize: "20px" }
    },
    cells: {
        style: {
            color: "black",
            background: "linear-gradient(0deg, rgba(185,113,51,1) 3%, rgba(217,165,120,1) 4%);",
        }
    }

}


function Category() {
    const [records, setRecords] = useState([])
    const schema = yup.object().shape(
        {
            category: yup.string().required("it is must"),
            description: yup.string().required("it is mandatory")
        }
    )
    const column = [


        {
            name: "Category",
            selector: row => row.category,
            sortable: true
        },

        {
            name: "Description",
            selector: row => row.description,
            sortable: true
        },

        {
            name: "categoryId",
            selector: row => row.categoryId,
            sortable: true
        },

        {
            name: "createdBy",
            selector: row => row.createdBy,
            sortable: true
        },
        {
            name: "Action",
            selector: (row) => (
                <div className='actionBtn' >
                    <Button variant="info" className="editBtn" type='submit' onClick={() => handleEdit(row.categoryId)}>Edit</Button>


                    <Button variant="warning" className="deleteBtn" type='submit' onClick={() => handleDelete(row.categoryId)}>Delete</Button>
                </div>

            )

        },


    ]

    const [enter, setEnter] = useState({
        createdBy: 1,
        categoryId: 0
    })

    const [saveBtn, setsaveBtn] = useState('Save')
    const [updateBtn, setupdateBtn] = useState(false)
    const [user, setUser] = useState({
        category: "",
        description: "",
        categoryId: "",
        createdBy: "",


    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (updateBtn) {

            handleUpdate();
        }
        else {
            handleSave();
        }




    }
    const handleSave = async () => {
        const data = {
            category: user.category,
            description: user.description,
            categoryId: 0,
            createdBy: 1,
        }
        console.log(data)
        const result = await axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your data has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const clearInput = () => {
        setUser('');
    }


    useEffect(() => {
        const fetchdata = () => {
            axios.get("http://catodotest.elevadosoftwares.com/Category/GetAllCategories").then(res => {
                setRecords(res.data.categoryList)
            })
        }
        fetchdata()

    }, [])

    const handleEdit = (id) => {

        const edit = records.filter(val => val.categoryId == id)
        console.log(edit)
        edit.map(res => {
            setUser({
                ...records,
                category: res.category,
                description: res.description
            })
            setEnter({
                ...enter,
                categoryId: res.categoryId,
            })
        })
        setupdateBtn(true)
        setsaveBtn("Update")
    }

    const handleUpdate = (id) => {
        const update = {
            category: user.category,
            description: user.description,
            categoryId: enter.categoryId,
            createdBy: 1,
        }

        const updateResult = axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", update)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your data has been updated",
            showConfirmButton: false,
            timer: 1500
        });

        console.log(updateResult);
    }



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const deletedata = {
                    categoryId: id,
                    removedRemarks: "test",
                    createdBy: 1
                }
                const deleteResult = axios.post("http://catodotest.elevadosoftwares.com/Category/RemoveCategory", deletedata)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    const navigate = useNavigate('')

    return (
        <div className='category_body'>

            <nav class="navbar">
                <ul class="nav-list">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/category">Category</a></li>
                    <li><a href="/client">Client</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </nav>
            <Formik
                initialValues={user}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange }) => (
                    <Form nonValidate onSubmit={{handleSubmit}}>
                        <div className=' form_container'>
                            <Form.Group className="mb-2" controlId="category">
                                <Form.Label className='label2'>
                                <i class="bi bi-bookmark-star-fill"></i>
                                    <Form.Control className='input' type="text" placeholder=" Enter category" name="category" value={user.category} onChange={(e) => { handleChange(e); handleInput(e) }} />
                                  
                                    <ErrorMessage
                                        name="category"
                                        className='text-danger' />
                                </Form.Label>


                            </Form.Group>

                            <Form.Group className="mb-2" controlId="description">
                                <Form.Label className='label2'> 
                                <i class="bi bi-card-heading"></i>
                                 <Form.Control className='input' type="textarea" row={3} placeholder=" Enter description" name="description" value={user.description} onChange={(e) => { handleChange(e); handleInput(e) }} />
                                    
                                    <ErrorMessage
                                        name="description"
                                        className='text-danger' />
                                </Form.Label>
                            </Form.Group>

                            <div className='Btns'>

                                <Button variant="success" className="save" type='submit' onClick={handleSubmit}>{saveBtn}</Button>

                                <Button variant="danger" className="clearbtn" type='submit' onClick={clearInput}>Clear</Button>

                            </div>

                        </div>
                    </Form>
                )}

            </Formik>
            <div className='container3'>
                <DataTable
                    columns={column}
                    data={records}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    fixedHeader
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover

                />
            </div>

         

        </div>
    )
}


export default Category
