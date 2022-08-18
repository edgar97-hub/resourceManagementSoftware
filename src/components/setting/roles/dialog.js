import React, { useState, useEffect } from "react";
import "./roles.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';


export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,permissions,permissionCheckbox}  = data
 const [selectedOptions, setSelectedOptions] = useState([]);

 useEffect(() => {

  const w2 = [];
  permissionCheckbox.some(el => {
    if(el.is){
      w2.push(el.name);
    }
  });
  setPersonName(w2);
  }, [permissionCheckbox]);

 
 
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const { target: { value },} = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    var ee = {"permissionCheckbox":typeof value === 'string' ? value.split(',') : value};

    const w3 = [];
    permissionCheckbox.some(el => {
      if(ee.permissionCheckbox.includes(el.name)){
        w3.push(el.id);
      }
    });
    onChange(w3)
  };
 
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
            <TextField  autoFocus label="rol" variant="filled"  className="textFieldw "id="name" value={name} onChange={e=>onChange(e)} placeholder="rol"     />
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                fullWidth
              >
                {permissionCheckbox.map((element) => (
                  <MenuItem key={element.name} value={element.name}>
                    <Checkbox  checked={personName.indexOf(element.name) > -1}/>
                    <ListItemText primary={element.name} />
                  </MenuItem>
                ))}
                 
                

               

              </Select>

         </form>
         
        </DialogContent>
        <DialogActions>
          <Button className="button" onClick={handleClose}   variant="contained">
            Cancelar
          </Button>
          <Button  className="button"   onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
