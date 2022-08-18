import React, { useState, useEffect } from 'react';
import { customersDataw, customersGrid } from '../../../data/dummy';
import Header  from '../Header';
import "./roles.scss";
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

const initialValue = { name: "", permissions: [],permissionCheckbox:[] };

const Roles = () => {

  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [formDataPermision, setFormDataPermision] = useState([]);
  var permissions = [];

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
    { headerName: "permissions", field: "permissions", },
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
      collection(db, "roles"),
      (snapShot) => {
        const namePermissions = [];
        async function getPermissions(){
            const q = query(collection(db, "permissions"));
            const querySnapshot = await getDocs(collection(db, "permissions"));
              querySnapshot.forEach((doc) => {
              namePermissions.push({id: doc.id, ...doc.data()});
            });
            permissions = namePermissions;
        }
        getPermissions();
        let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
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
    
    if(e.target){
      const { value, id } = e.target
      setFormData({ ...formData, [id]: value })
    }else{
      setFormData({ ...formData, ["permission_identifiers"]: e })
    }
  }

  const onGridReady = (params) => {
    setGridApi(params)
  }
  
  const handleUpdate = (oldData) => {

    for (const [key, value] of Object.entries(oldData.permissions)) {
      permissions.some(el => {
        if(el.id === value){
          el.is = true;
        } 
      });
    }
    oldData.permissionCheckbox = permissions;
    setFormData(oldData);
    handleClickOpen();
  }
  const handleDelete = (id) => {
    async function deleteData(){
      await deleteDoc(doc(db, "roles", id));
    }
    deleteData();
  }

  const handleFormSubmit = () => {
    console.log(formData.permission_identifiers);

    if (formData.id) {
      async function setData(){
        await setDoc(doc(db, "roles", formData.id), {
          name: formData.name,
          permissions: (formData.permission_identifiers)?formData.permission_identifiers:formData.permissions
        });
      }
      setData();
      handleClose()
    } else {
      async function addData(){
        const docRef = await addDoc(collection(db, "roles"), {
          name: formData.name,
          permissions: (formData.permission_identifiers)?formData.permission_identifiers:""
        });
      }
      addData();
      handleClose()
    }
  }

   
 
 
 
   
 
  return (
    <div className="roles" style={{ height: '100%',display: 'flex' }}>
      <Grid align="right" className='grid'>
        <Button variant="contained"   onClick={() => handleClickOpen("insert")}>Add role</Button>
      </Grid>
      <div className="aggridreact ag-theme-alpine " style={{ flexGrow: 1   }}>
        <AgGridReact className="ww"
          rowData={data} 
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          animateRows={true} />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={eventData} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Roles;