import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaSquarePhone } from "react-icons/fa6";
import { MdSettingsPhone, MdMarkEmailUnread } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { RiNumbersFill, RiDeleteBinFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { IoPersonAddSharp } from "react-icons/io5";
import { Navbar, Nav } from 'react-bootstrap'
import { IoIosLogOut } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import "./Client.css"

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
    },
    
  }

}


function Client() {

  const [records, setRecords] = useState([])
  const schema = yup.object().shape(
    {
      phone: yup.number().positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10).required('Phone is required'),
      clientName: yup.string().required("ClientName required"),
      phoneNumber: yup.number().positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10).required('phoneNumber is required'),
      address: yup.string().required('address is  required'),
      gst: yup.string().required('gst is  required'),
      email: yup.string().email().required("Email is required"),
      website: yup.string().required("Website is required"),
      contactPerson: yup.string().required("ContactPerson is required"),
    }
  )

  const column = [


    {
      name: "Clint Name",
      selector: row => row.clientName,
      sortable: true
    },

    {
      name: "Phone",
      selector: row => row.phone,
      sortable: true
    },


    {
      name: "Address",
      selector: row => row.address,
      sortable: true
    },


    {
      name: "Gst",
      selector: row => row.gst,
      sortable: true
    },


    {
      name: "Website",
      selector: row => row.website,
      sortable: true
    },


    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },


    {
      name: "Contact Person",
      selector: row => row.contactPerson,
      sortable: true
    },


    {
      name: "phone Number",
      selector: row => row.phoneNumber,
      sortable: true
    },

    {
      name: "Action",
      selector: (row) => (
        <div className='actionBtn' >
          <Button variant="info" className="editBtn" type='submit' onClick={() => handleEdit(row.clientId)}>E</Button>


          <Button variant="warning" className="deleteBtn" type='submit' onClick={() => handleDelete(row.clientId)}>D</Button>
        </div>

      )

    },
  ]

  const [saveBtn, setsaveBtn] = useState('save')
  const [updateBtn, setupdateBtn] = useState(false)
  const [user, setUser] = useState({
    clientName: "",
    phone: "",
    address: "",
    gst: "",
    website: "",
    email: "",
    contactPerson: "",
    phoneNumber: "",
  })

  const [enter, setEnter] = useState({
    createdBy: 1,
    clientId: 0
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
      clientName: user.clientName,
      phone: user.phone,
      address: user.address,
      gst: user.gst,
      website: user.website,
      email: user.email,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      categoryId: 0,
      createdBy: 1,

    }
    console.log(data)
    const result = await axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", data)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your data has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }


  useEffect(() => {
    const fetchdata = () => {
      axios.get("http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails").then(res => {
        setRecords(res.data.clientList)
      })
    }
    fetchdata()

  }, [])

  const clearInput = () => {
    setUser('');
  }

  const handleEdit = (id) => {

    const edit = records.filter(val => val.clientId == id)
    console.log(edit)
    edit.map(res => {
      setUser({
        ...records,
        clientName: res.clientName,
        phone: res.phone,
        address: res.address,
        gst: res.gst,
        website: res.website,
        email: res.email,
        contactPerson: res.contactPerson,
        phoneNumber: res.phoneNumber,

      })
      setEnter({
        ...enter,
        clientId: res.clientId,
      })
    })
    setupdateBtn(true)
    setsaveBtn("Update")
  }

  const handleUpdate = (id) => {
    const update = {
      clientId: enter.clientId,
      clientName: user.clientName,
      phone: user.phone,
      address: user.address,
      gst: user.gst,
      website: user.website,
      email: user.email,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      createdBy: 1,
    }

    const updateResult = axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", update)
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
          clientId: id,
          removedRemarks: "test",
          createdBy: 1
        }
        const deleteResult = axios.post("http://catodotest.elevadosoftwares.com/Client/RemoveClient", deletedata)

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }



  return (
    <div className='clint_body'>

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
          <Form noValidate onSubmit={handleSubmit} >
            <div className='client_container'>
              <div className='nex'>
                <Row>
                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><FaCircleUser />
                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="clientName"
                        name="clientName"
                        placeholder='ClientName'
                        value={user.clientName}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="clientName" />
                  </Col>



                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><FaSquarePhone />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="phone"
                        name="phone"
                        placeholder='Phone'
                        value={user.phone}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="phone" />
                  </Col>


                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><FaAddressCard />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="address"
                        name="address"
                        placeholder='Address'
                        value={user.address}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="address" />
                  </Col>


                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><RiNumbersFill />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="gst"
                        name="gst"
                        placeholder='Gst'
                        value={user.gst}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="gst" />
                  </Col>
                </Row>
              </div>


              <div className='nex'>
                <Row>
                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><CgWebsite />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="website"
                        name="website"
                        placeholder='Website'
                        value={user.website}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="website" />
                  </Col>



                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><MdMarkEmailUnread />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={user.email}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="email" />
                  </Col>


                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><IoPersonAddSharp />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="contactPerson"
                        name="contactPerson"
                        placeholder='ContactPerson'
                        value={user.contactPerson}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="contactPerson" />
                  </Col>


                  <Col md={3}><Form.Label></Form.Label>

                    <InputGroup.Text className='client_label' id="basic-addon1"><MdSettingsPhone />

                      &nbsp;&nbsp;&nbsp;    <Form.Control
                        type='text'
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='PhoneNumber'
                        value={user.phoneNumber}
                        onChange={(e) => {
                          handleInput(e);
                          handleChange(e);
                        }}
                      />
                    </InputGroup.Text>
                    <ErrorMessage name="phoneNumber" />
                  </Col>
                </Row>
              </div>
              <div className='client_Btns'>
                <Button variant='success' className='save' type="submit">
                  {saveBtn}
                </Button>&nbsp;&nbsp;
                <Button variant='danger' type='cancel' className='clearbtn' onClick={clearInput}>clear</Button>
              </div>

            </div>
          </Form>
        )}

      </Formik>
      <div className='table_container'>
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

export default Client
