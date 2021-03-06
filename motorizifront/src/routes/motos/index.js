import React from 'react';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Transition from 'components/Transition';
import Content from 'templates/Content';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Select, FormControl, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import PostMoto from './PostMoto'
const useStyles = makeStyles((theme) => ({
  avatarsearch:{
    boxShadow: "6px 6px 8px rgba(30, 30, 30, 0.55)",
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    border:'none',
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: '#89d8d3'
  },
  centerCard: {
    marginleft: '10%',
    width: "80%",
  },
  fabbutton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      background: '#DA0443',
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Motos() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const villes = require("../../villes");
  return (
    <>
    <Transition in component={Grow}>
      <Content className={classes.centerCard} >

      <PostMoto/>
        <br/>
        <PostMoto/>
        <br/>
        <PostMoto/>
        <br/>
        <PostMoto/>

      <Tooltip title="Rechercher annonce" placement="top">  
      <Avatar component="button" className={classes.avatarsearch}  onClick={handleClickOpen}>
          <SearchIcon fontSize='large' > </SearchIcon> 
        </Avatar>
        </Tooltip>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Rechercher voitures"}</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                
                <Grid item xs={12} sm={6} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="mots"
                    label="Mots cl??s"
                    name="mot"

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <FormControl  fullWidth>
                    <InputLabel>
                    Ville
                    </InputLabel>
                 <Select
                 autoWidth
                 >
                   {villes.map((ville)=>{return <option value={ville.ville}>{ville.ville}</option>;})}
                 </Select>
                 </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="prixmin"
                    variant="outlined"
                    fullWidth
                    id="prixmin"
                    label="Prix min"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="prixmax"
                    variant="outlined"
                    fullWidth
                    id="prixmax"
                    label="Prix max"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="anneemin"
                    variant="outlined"
                    fullWidth
                    id="anneemin"
                    label="Ann??e min"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="anneemax"
                    variant="outlined"
                    fullWidth
                    id="anneemax"
                    label="Ann??e max"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="kmmin"
                    variant="outlined"
                    fullWidth
                    id="kmmin"
                    label="Km min"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="kmmax"
                    variant="outlined"
                    fullWidth
                    id="kmmax"
                    label="Km max"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Rechercher
                    </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Content>
    </Transition>
    </>
  );
}
