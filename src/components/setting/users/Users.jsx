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

const initialValue = { name: "", permissions: [ ] }

const Users = () => {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [formDataPermision, setFormDataPermision] = useState({})

  const handleClickOpen = (flat) => {

    if(flat === "insert"){
      console.log("insert");
      async function getPermissions(){
        const namePermissions = [];
        const q = query(collection(db, "permissions"));
          const querySnapshot = await getDocs(collection(db, "permissions"));
          querySnapshot.forEach((doc) => {
            namePermissions.push({id: doc.id, ...doc.data()});
          });
          formData.permissions = namePermissions; 
        }
      getPermissions()
    }
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
        <Button className="button" variant="outlined"    /* startIcon={<EditIcon/>}*/ onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button className="button" variant="outlined"   onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ]


  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
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

    if(e.hasOwnProperty('_reactName')){
      const { value, id } = e.target
      setFormData({ ...formData, [id]: value })
    }else{
      const formDataPermision2 = {}
      e.some(el => {
        formDataPermision2[el.id] = el.id;
      })
      setFormDataPermision(formDataPermision2 )
    }
  }
 
  const handleUpdate = (oldData) => {

    const namePermissions = [];

    async function getdata(){
      const q = query(collection(db, "roles"));
        const querySnapshot = await getDocs(collection(db, "roles"));
        querySnapshot.forEach((doc) => {
          namePermissions.push({id: doc.id, ...doc.data()});
        });

        if(oldData.permissions){
          for (const [key, value] of Object.entries(oldData.permissions)) {
            namePermissions.some(el => {
              if(el.id === value){
                  el.is = true;
              }else{
                el.is = false;
              }
              el.label = el.name;
              el.value = el.name;
            });
          }
         }
        oldData.permissions = namePermissions;
        setFormData(oldData)
    }
    getdata();
    handleClickOpen()
  }

  const handleDelete = (id) => {
    async function deleteData(){
      await deleteDoc(doc(db, "users", id));
    }
    deleteData();
  }

  const handleFormSubmit = () => {
    console.log(formDataPermision);

    if (formData.id) {
      async function setData(){
        await setDoc(doc(db, "users", formData.id), {
          name: formData.name,
          permissions: formDataPermision
        });
      }
      setData();
      handleClose()
    } else {
      async function addData(){
        const docRef = await addDoc(collection(db, "users"), {
          name: formData.name,
          permissions: {0:"ww"}
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
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={eventData} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Users;