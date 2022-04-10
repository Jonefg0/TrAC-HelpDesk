import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { AuthContext } from './contexts/Auth';
import { baseConfig } from './baseConfig';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    width: '45rem',
    padding: theme.spacing(2, 4, 2),
  },
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: '20px'
  },
  button: {
    margin: theme.spacing(2),
    marginLeft: 0,
  },
}));

function TicketDetails(props) {
  const classes = useStyles();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const deleteTicket = (event) => {
    console.log('ticket to be updated ', props.details);
    
    fetch(`/ticket/${props.details.TicketID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(() => fetch('/ticket'))
    .then(res => res.json())
    .then(() => {
      props.onClose();
      props.refresh();
    })
    .catch(err => console.log(err))
  };

  const updateTicket = (event) => {
    // {
    //   "status": "closed",
    //   "response": "turn it off",
    //   "responderID": 2
    // }

    const response = {
      ...props.details,
      responderID: '1',
      status: baseConfig.STATUS_SOLVED,

    }
    console.log('ticket to be updated ', response);

    fetch(`/ticket/${props.details.TicketID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    })
      .then(() => {
        props.onClose();
        props.refresh();
      }).catch(err => console.log(err))
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <p className={classes.title}>{baseConfig.TICKET_DETAILS_LABEL}</p>
                <div>
                <TextField
                  label={baseConfig.PROBLEM_STATEMENT_LABEL}
                  multiline
                  rowsMax={6}
                  value={props.details.ProblemStatement}
                  variant="outlined"
                />
                </div>
                <TextField
                  label={baseConfig.CATEGORY_LABEL}
                  multiline
                  rowsMax={6}
                  value={props.details.description}
                  variant="outlined"
                />
                <TextField
                  label={baseConfig.RESPONSE_LABEL}
                  multiline
                  rowsMax={6}
                  placeholder={baseConfig.RESPONSE_PLACEHOLDER}
                  value={props.details.response ? props.details.response : ''}
                  onChange={(e) => props.setDetails({ ...props.details, response: e.target.value })}
                  variant="outlined"
                />
                {/* FELLOW & ADMIN */}
                {/*user.usertypeID <= 2 && */
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={updateTicket}
                  >
                    {baseConfig.SAVE_LABEL}
                  </Button>
                }
                {/* ADMIN ONLY */}
                {/*user.usertypeID === 1 &&*/
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={deleteTicket}
                  >
                    {baseConfig.DELETE_TICKET_LABEL}
                  </Button>
                }
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default TicketDetails