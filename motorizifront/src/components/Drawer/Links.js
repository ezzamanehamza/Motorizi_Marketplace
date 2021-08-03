import React, {useState} from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@mdi/react';
import {
  mdiPostOutline,
  mdiMotorbike,
  mdiCar,
  mdiMailboxUpOutline,
  mdiBike,
} from '@mdi/js';
import { RouterLink } from 'components/Link';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CollectionsIcon from '@material-ui/icons/Collections';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    textAlign: 'center',
  },
}));

export const getCurrentPath = currentPath => (currentPath === '' ? 'voitures' : currentPath);

export const getLinks = (listItems, toggleDrawer) =>
  listItems.map(
    ({ name, href, iconPath, transform, component = RouterLink, target }) => {
      const path = name.toLowerCase();
      const to = `/${path}/`;
      const currentPath = getCurrentPath(window.location.pathname.split('/')[1]);
      const selected = currentPath === path;

      return (
        <ListItem
          button
          key={name}
          component={component}
          to={to}
          href={href}
          onClick={toggleDrawer}
          selected={selected}
          target={target}
        >
          <ListItemIcon>
            <Icon path={iconPath} size={1} color="currentColor" transform={transform} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      );
    },
  );

export default function Links({ toggleDrawer }) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory();
  async function login() {
    console.warn(email, password)
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))
    history.push("/voitures")
    handleClose();
    toggleDrawer();


  }

  async function signUp() {

    let item = { name, password, email }
    console.warn(item)
    let result = await fetch("http://localhost:8000/api/register", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result))
    history.push("/add")
  }


  const [openn, setOpenn] = React.useState(false);
  const [openn2, setOpenn2] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpenn(true);
  };

  const handleClose = () => {
    setOpenn(false);
  };

  const handleClickOpen2 = () => {
    setOpenn2(true);
  };

  const handleClose2 = () => {
    setOpenn2(false);
  };
  function logOut() {
    localStorage.clear();
    history.push('/voitures');
    toggleDrawer();
    handleClose();
  }
  const classes = useStyles();
  return (
    <>
      <Divider />
      <List>
        {getLinks(
          [
            { name: 'Voitures', iconPath: mdiCar },
            {
              name: 'Motos',
              iconPath: mdiMotorbike,
            },
            { name: 'Velos', iconPath: mdiBike, transform: 'translate(2, 2)' },
            { name: 'Blog', iconPath: mdiPostOutline },
          ],
          toggleDrawer,
        )}
        <Divider />
        {getLinks([{ name: 'Contact', iconPath: mdiMailboxUpOutline }], toggleDrawer)}
        <Hidden smUp>
          <Divider />
          {
              localStorage.getItem('user-info') ? 
                <>
                <ListItem>
              <Button startIcon={<AddAPhotoIcon />} variant='outlined'  to={'/MesAnnonces/'} component={RouterLink} onClick={toggleDrawer}>
                <Typography variant="button">
                  Ajouter
                    </Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Button startIcon={<CollectionsIcon />} variant='outlined'>
                <Typography variant="button">
                  collection
                    </Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Button Button startIcon={<ExitToAppIcon />} variant='outlined' onClick={logOut}>
                <Typography variant="button">
                 déconnexion
                    </Typography>
              </Button>
            </ListItem>
                </>
                :
                <>
                  <ListItem >
                  <Button Button startIcon={<FaceIcon />} variant='outlined' onClick={handleClickOpen}>
                <Typography variant="button">
                Se connecter
                    </Typography>
              </Button>
              
            </ListItem>
            <ListItem >      
            <Button Button startIcon={<HowToRegIcon />} variant='outlined' onClick={handleClickOpen2}>
                <Typography variant="button">
                  S'inscrire
                    </Typography>
              </Button>
            </ListItem>
                </>
            }
        </Hidden>
        <Dialog
            fullScreen={fullScreen}
            open={openn2}
            onClose={handleClose2}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title"><Typography className={classes.paper} component="h1" variant="h5">
              S'inscrire
        </Typography></DialogTitle>
            <DialogContent>
              <div className={classes.form} noValidate>
                <Grid container spacing={2}>
                  {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" />
                <br /> */}
                  <Grid item xs={12} sm={6} >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nom"
                      label="Nom d'utilisateur"
                      name="nom"
                      value={name} onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
                <br /> */}
                  <Grid item xs={12} sm={6} >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="password"
                      label="password"
                      type="password"
                      name="Password"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  {/* <input type="text" value={email} onChange={(e) => setEamil(e.target.value)} className="form-control" placeholder="email" />
                <br /> */}
                  <Grid item xs={12} sm={6} >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Recevoire des annonces et des nouveautés."

                    />
                  </Grid>
                  <Button
                    onClick={signUp}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
          </Button>
                </Grid>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            fullScreen={fullScreen}
            open={openn}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title"><Typography className={classes.paper} component="h1" variant="h5">
              Se Connecter
        </Typography></DialogTitle>
            <DialogContent>
              <div className={classes.form} noValidate>
                <Grid container spacing={2}>


                  <Grid item xs={12} sm={6} >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nom"
                      label="Nom d'utilisateur"
                      name="nom"
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      id="password"
                      label="Mot de passe"
                      autoFocus
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>

                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={login}
                  className={classes.submit}
                >
                  Connexion
                    </Button>
              </div>
            </DialogContent>
          </Dialog>
      </List>
    </>
  );
}

Links.propTypes = {
  toggleDrawer: PropTypes.func,
};

Links.defaultProps = {
  toggleDrawer: noop,
};
