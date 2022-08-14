import React, { useState, useEffect } from 'react';
import { customersDataw, customersGrid } from '../../../data/dummy';
import Header  from '../Header';
import "./roles.scss";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import { Grid } from '@material-ui/core'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';

import FormDialog from './dialog';

import {
  collection,
  getDocs,
  deleteDoc,
  doc,getDoc,
  onSnapshot,query,setDoc,addDoc
} from "firebase/firestore";

import { db } from "../../../firebase";

const initialValue = { name: "", permissions: ""}

const Roles = () => {

  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [formDataPermision, setFormDataPermision] = useState({})

  const handleClickOpen = () => {
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
      collection(db, "roles"),
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

  const defaultColDef = {
    sortable: true,
    //flex: 1, filter: true,
    //floatingFilter: true
  }
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
 

  const onGridReady = (params) => {
    setGridApi(params)
  }
  
  const handleUpdate = (oldData) => {

    const namePermissions = [];

    async function getdata(){
      const q = query(collection(db, "permissions"));
        const querySnapshot = await getDocs(collection(db, "permissions"));
        querySnapshot.forEach((doc) => {
          namePermissions.push({id: doc.id, ...doc.data()});
        });


        if(oldData.permissions){
          for (const [key, value] of Object.entries(oldData.permissions)) {
            //console.log(value);

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


        //for(var i = 0;i < Object.keys(oldData.permissions).length;i++){
          //console.log(oldData.permissions);
          //namePermissions.some(el => {
           // if(el.id === oldData.permissions[i]){
            //    el.is = true;
            //}else{
             // el.is = false;
           // }
            //el.label = el.name;
            //el.value = el.name;
          //});
         // }
          oldData.permissions = namePermissions;
          setFormData(oldData)
    }
    getdata();


    //for (let id in oldData.permissions) {
      //const postSnap =  db.collection("permissions").doc(id).get();
      //namePermissions.push(postSnap.data());

      
      //async function r (){

        //const ref = doc(db, "permissions", "cUOZO2Kkg2mZGSnFpCVt");
        //const docSnap = await getDoc(ref);
        //if (docSnap.exists()) {
         // console.log(docSnap.data());
        //} else {
        //  console.log("No such document!");
        //}


        //const q = query(collection(db, "permissions"));
        //const querySnapshot = await getDocs(collection(db, "permissions"));
        //querySnapshot.forEach((doc) => {

          //console.log(doc.id, " => ", doc.data());
          //namePermissions.push(doc.data());

        //});


        //const postSnap = await db.collection("permissions").doc("cUOZO2Kkg2mZGSnFpCVt").get();
        //namePermissions.push(postSnap.data());
        //const querySnapshot = await getDocs(collection(db, "permissions"));
        //querySnapshot .forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
        //});
        //console.log(namePermissions);
      // };
   // }
    //setFormData(oldData)
    handleClickOpen()
  }
  const handleDelete = (id) => {
    async function deleteData(){
      await deleteDoc(doc(db, "roles", id));
    }
    deleteData();
  }

  const handleFormSubmit = () => {
    console.log(formDataPermision);

    if (formData.id) {
      async function setData(){
        await setDoc(doc(db, "roles", formData.id), {
          name: formData.name,
          permissions: formDataPermision
        });
      }
      setData();
      handleClose()
    } else {
      async function addData(){
        const docRef = await addDoc(collection(db, "roles"), {
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
        <Button variant="contained"   onClick={handleClickOpen}>Add role</Button>
      </Grid>
      <div className="aggridreact ag-theme-alpine " style={{ flexGrow: 1   }}>
        <AgGridReact className="ww"
          //rowData={tableData}
          rowData={data} 
          columnDefs={columnDefs}
          //defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows={true} />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={eventData} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Roles;