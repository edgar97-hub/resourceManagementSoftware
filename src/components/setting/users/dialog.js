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



export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,permissions}  = data
 const [selectedOptions, setSelectedOptions] = useState([]);

 useEffect(() => {
  const w = [];
  if(permissions){
    for (const element of permissions) {
      if(element.is === true){
        w.push(element);
      }
    }
    setSelectedOptions(w);
  }else{ 

  }
  }, [permissions]);

 function eventPermissions(value, event) {

   if (event.action === "deselect-option") {
    this.setState(value.filter((o) => o.value !== "*"));
  } else if (value.length === this.options.length - 1) {
    this.setState(this.options);
  } else {
    this.setState(value);
  }
  onChange(value)
}
 

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
            {/* TextField id="permissions" value={permissions} onChange={e=>eventData(e)} placeholder="permissions" label="permissions" variant="outlined" margin="dense" fullWidth />*/}
            <ReactMultiSelectCheckboxes  size={2} className="multiSelectCheckboxes"
                  options={permissions}
                  placeholderButtonLabel="permissions"
                  value={selectedOptions}
                  onChange={eventPermissions}
                  setState={setSelectedOptions}
                  />
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
