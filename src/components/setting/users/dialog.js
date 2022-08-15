import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import "./users.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function FormDialog({open,handleClose,data,onChange,listRoles, handleFormSubmit}) {
  const {id,name,role_id}  = data
  const [dataRow, setDataRow] = useState('');
    
  const handleChange = (event) => {
    setDataRow(event.target.value);
    listRoles.some(el => {
      if(el.name === event.target.value){
        data.copy_role_id = el.id;
      } 
    });
  };

  const handleSubmit = () => {
    setDataRow("");
    handleFormSubmit()
  };
  const handleClosew = () => {
    setDataRow("");
    handleClose()
  };

 useEffect(() => {
  //setCopylistRoles(listRoles)   
  }, []);

  return (
    <div>
      <Dialog className='dialog'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update role":"Create role"}</DialogTitle>
        <DialogContent className='dialog-content'>
         <form className='form-dialog-content'>
            <TextField  autoFocus label="rol" variant="filled"  className="textFieldw "id="name" value={name} onChange={e=>onChange(e)} placeholder="rol"      margin="dense"/>
 
            <Select
             labelId="demo-simple-select-helper-label"
             id="demo-simple-select-helper"
             value={dataRow}
             fullWidth
             displayEmpty
             onChange={handleChange}
              >
             {listRoles.map((element) => (
                ((element.id === role_id)?<MenuItem key={element.id} value="">{element.name}</MenuItem> : <MenuItem  key={element.id} value={element.name}>{element.name}</MenuItem>)
              ))}
            </Select>

         </form>
         
        </DialogContent>
        <DialogActions>
          <Button className="button" onClick={handleClosew}   variant="contained">
            Cancelar
          </Button>
          <Button  className="button"   onClick={()=>handleSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
