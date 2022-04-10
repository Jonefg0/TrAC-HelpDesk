import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HomeIcon from '@material-ui/icons/Home';
import {
  InputLabel,
  OutlinedInput,
  FormControl,
  Select,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Paper,
} from "@material-ui/core";
import { AuthContext } from "./contexts/Auth";
import "../style.scss";
import { baseConfig } from "./baseConfig";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
    margin: '10px 0',
  },
  padding30: {
    padding: theme.spacing(3),
  }
}));

const InputForm = () => {
  // apply style classes
  const classes = useStyles();
  // const { user, setUser } = useContext(AuthContext);
  const user = 1;
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  function getCurrentDate(separator=''){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // fetch request to the database asking for all categories
    fetch("/categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log("Get Category Error :", err));
  }, []);

  // custom hook for react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ userId: user });

  
  // if no error on submit button click, post the content
  const onSubmit = (data, e) => {
    data.UserID = user;
    //data.created_at = '2022-02-29 20:04:11-06';
    console.log("line 51", data, e);
      fetch('/ticket/create', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: JSON.stringify(data)
    })
    // .then(res => res.json())
    .then(data => {
      console.log(data);
      handleClickOpen();
    })
    .catch(err => console.log('Submit Form Error :', err))
    reset(data);

  };

  // if the form submit was unsuccessful, invoke this callback
  const onError = (errors, e) => console.log(errors, e);

  // This will watch specified inputs and return their values.
  // It is useful for determining what to render.
  // console.log(watch('example'));
  // Checkbox options. This should be populated with fetch request to category table

  return (
    <div>
      <Link to="/" variant="body2" className={classes.margin}>
        <HomeIcon color="primary" className={classes.margin}/>
      </Link>
      <Container component={Paper} className={classes.padding30}>
        <h1 className={classes.margin}>{baseConfig.INPUT_FORM_HEADER}</h1>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="ProblemStatement">{baseConfig.PROBLEM_STATEMENT_LABEL}</InputLabel>
            <OutlinedInput
              required
              label="Required"
              id="ProblemStatement"
              labelWidth={48}
              {...register("ProblemStatement")}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="description">{baseConfig.CATEGORY_LABEL}</InputLabel>
            <Select
              native
              id="description"
              label="Category"
              {...register("description")}
            >
              <option aria-label="None" value="" />
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.description}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            type="submit"
          >
            {baseConfig.SUBMIT_LABEL}
          </Button>
        </form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{baseConfig.ALERT_DIALOG_TITTLE}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {baseConfig.DIALOG_COMMENTARY}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/" variant="body2" className={classes.margin}>
              <Button onClick={handleClose} color="primary" autoFocus>
                {baseConfig.OK_BUTTON_LABEL}
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default InputForm;
