import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateAndTimePickers from './DatePicker';
import {useInput} from '../Hook/useInputHook';
import militaryToStandard from './Helper'

export default function FormDialog(props) {

    // we don't need any of this anymore since we  "lifted" the event state up to the parent component (Calendar)
    // const { setValue:nameSetValue, value:nameValue, bind:nameBind, reset:nameReset } = useInput('');
    // const { setValue:attendeesSetValue, value:attendeesValue, bind:attendeesBind, reset:attendeesReset } = useInput('');
    // const { setValue:startSetValue, value:startValue, bind:startBind, reset:startReset } = useInput('');
    // const { setValue:endSetValue, value:endValue, bind:endBind, reset:endReset } = useInput('');
    // const { setValue:notesSetValue, value:notesValue, bind:notesBind, reset:notesReset } = useInput('');
    // const { value:createdByValue, bind:createdByBind, reset:createdByReset } = useInput('');
    // const { value:uuidValue, bind:uuidBind, reset:uuidReset } = useInput('');
    const handleClickOpen = props.handleClickOpen
    const handleClose = props.handleClose

    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('hellos')
      // we don;t need this stuff anymore
      // const newEvent = {
      //     attendees:attendeesValue,
      //     name:nameValue,
      //     start_date_time:startValue,
      //     end_date_time:endValue,
      //     notes:notesValue,
      //     createdBy: createdByValue,
      //     uuid:uuidValue,
      // }
      // nameReset();
      // attendeesReset();
      // startReset();
      // endReset();
      // notesReset();
      // createdByReset();
      // uuidReset();
  }

  // not needed
  // const setValue = () => {
  //   nameSetValue(props.emptyEvent['name'])
  //   attendeesSetValue(props.emptyEvent['attendees'])
  //   startSetValue(militaryToStandard(props.emptyEvent['start_date_time']))
  //   endSetValue(militaryToStandard(props.emptyEvent['end_date_time']))
  //   notesSetValue(props.emptyEvent['notes'])
  // }

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
        // this is NOT an edit
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
          {/* we don't need this button anymore */}
          {/* <button hidden={props.isAddShown ? true:false} onClick={setValue}>Load Event</button> */}
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
          {/* <DateAndTimePickers 
              currentEvent={props.currentEvent} 
              value={start_date_time}
              onChange={(e) => {props.updateCurrentEvent('start_date_time', e.target.value)}}
              label="Start Date and Time" /><br></br>
          <DateAndTimePickers 
              currentEvent={props.currentEvent} 
              value={end_date_time}
              onChange={(e) => {props.updateCurrentEvent('end_date_time', e.target.value)}}
              label="End Date and Time" /><br></br> */}
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
              value={createdBy}
              onChange={(e) => {props.updateCurrentEvent('createdBy', e.target.value)}}
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
          {/* need to actually add the new/edited event */}
          <input 
            type="submit" 
            form="DialogForm" 
            onClick={()=>{
              // we'll now submit this in a "controlled" way
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
