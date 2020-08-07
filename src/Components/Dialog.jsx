import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const handleClickOpen = props.handleClickOpen
    const handleClose = props.handleClose

    const handleSubmit = (e) => {
      e.preventDefault();
    }
  const {
    name,
    attendees,
    start_date_time,
    end_date_time,
    notes,
    createdBy,
    uuid
  } = props.currentEvent || {}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => {
        handleClickOpen(false)
        props.setIsAddShown(false)
        }}>
        Add Event
      </Button>
      <Dialog 
      open={props.Open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title">
        <DialogContent>
      <DialogTitle id="form-dialog-title">{props.isAddShown ? 'Add Event':'Edit Event'}</DialogTitle>
          <form onSubmit={handleSubmit} id='DialogForm' >
          <TextField
            value={name}
            onChange={(e) => {props.updateCurrentEvent('name', e.target.value)}}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            value={attendees}
            onChange={(e) => {props.updateCurrentEvent('attendees', e.target.value)}}
            autoFocus
            margin="dense"
            id="attendees"
            label="Attendees"
            type="text"
            fullWidth
          />
          {/* you might need to refactor these time pickers */}
          <TextField
            style={{width: 200}}
            id="datetime-local"
            value={start_date_time}
            onChange={(e) => {props.updateCurrentEvent('start_date_time', e.target.value)}}
            label="Start Date and Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{width: 200}}
            id="datetime-local"
            value={end_date_time}
            onChange={(e) => {props.updateCurrentEvent('end_date_time', e.target.value)}}
            label="End Date and Time" 
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={notes}
            onChange={(e) => {props.updateCurrentEvent('notes', e.target.value)}}
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            type="text"
            fullWidth
          />
          {props.isAddShown && <div>
            <TextField 
              value={props.username}
              autoFocus
              margin="dense"
              id="createdBy"
              label="Created By"
              type="text"
              fullWidth
            />
            <TextField 
              value={uuid}
              onChange={(e) => {props.updateCurrentEvent('uuid', e.target.value)}}
              autoFocus
              margin="dense"
              id="uuid"
              label="uuid"
              type="text"
              fullWidth
            />
                </div>
                }
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <input 
            type="submit" 
            form="DialogForm" 
            onClick={()=>{
              props.handleAddSubmit(props.currentEvent);
              handleClose();
            }} 
            value="Submit" 
            color="primary"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}