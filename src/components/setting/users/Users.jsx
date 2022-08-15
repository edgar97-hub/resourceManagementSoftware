import React, { useState, useEffect } from 'react';
import { customersDataw, customersGrid } from '../../../data/dummy';
import "./users.scss";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import FormDialog from './dialog';
import {collection,getDocs,deleteDoc,doc,getDoc,onSnapshot,query,setDoc,addDoc} from "firebase/firestore";
import { db } from "../../../firebase";

const initialValue = { name: "", role_id:"" }

const Users = () => {

  const [data, setData] = useState([]);
  const [listRoles, setlistRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [formDataPermision, setFormDataPermision] = useState({})

  const handleClickOpen = (flat) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "rol", field: "role_id", },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) =>
       <div>
        <Button className="button" variant="contained"    /* startIcon={<EditIcon/>}*/ onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button className="button" variant="contained"   onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ]


  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {

          const namePermissions = [];
          async function getdata(){
              const q = query(collection(db, "roles"));
              const querySnapshot = await getDocs(collection(db, "roles"));
                querySnapshot.forEach((doc) => {
                namePermissions.push({id: doc.id, ...doc.data()});
              });

              setlistRoles(namePermissions);
              let list = [];
              let data = {};
              snapShot.docs.forEach((doc) => {
                data = doc.data();
                namePermissions.some(el => {
                  if(el.id === doc.data().role_id){
                    data.role_id = el.name;
                    data.field_extra = el.id;
                  } 
                });
                list.push({ id: doc.id,...data });
              });
              setData(list);
        }
        getdata();


        
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };

  }, [])

  const eventData = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }
 
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleDelete = (id) => {
    async function deleteData(){
      await deleteDoc(doc(db, "users", id));
    }
    deleteData();
  }

  const handleFormSubmit = () => {
    console.log(formData);

    if (formData.id) {
      async function setData(){
        await setDoc(doc(db, "users", formData.id), {
          name: formData.name,
          role_id: ((formData.copy_role_id)?formData.copy_role_id:formData.field_extra)
        });
      }
      setData();
      handleClose()
    } else {
      async function addData(){
        const docRef = await addDoc(collection(db, "users"), {
          name: formData.name,
          role_id: ((formData.copy_role_id)?formData.copy_role_id:"")
        });
      }
      addData();
      handleClose()
    }
  }
 
  return (
    <div className="roles"style={{ height: '100%',display: 'flex' }}>
      <Grid align="right" className='grid'>
        <Button variant="contained"   onClick={() => handleClickOpen("insert")}>Add user</Button>
      </Grid>
      <div className="aggridreact ag-theme-alpine " style={{ flexGrow: 1   }}>
        <AgGridReact className="ww"
          rowData={data} 
          columnDefs={columnDefs}
          animateRows={true} />
      </div>
      <FormDialog open={open} handleClose={handleClose} listRoles={listRoles}
        data={formData} onChange={eventData} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Users;