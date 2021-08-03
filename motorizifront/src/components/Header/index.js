import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Icon from '@mdi/react';
import { mdiMenu, mdiBackburger, mdiBrightness4 } from '@mdi/js';
import Transition from 'components/Transition';
import HeaderTitle from 'components/Header/HeaderTitle';
import HeaderText from 'components/Header/HeaderText';
import { Typography } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { RouterLink } from 'components/Link';


const useStyles1 = makeStyles({
  glass: {
    backgroundColor: "rgba(255,255,255,0.1)",
    backgroundImage: "linear-gradient(to bottom right, rgba(255,255,255,0.2),rgba(255,255,255,0)",
    backdropFilter: "blur(3px)",
    boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
  }

});
const useStyles = makeStyles((theme) => ({
  stylebtn: {
    minWidth: 'unset'
  },
  userAvatar: {
    marginLeft: ".5em",
    width: theme.spacing(5),
    height: theme.spacing(5),
    border: 'none',
  },
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

export const getPath = (open) => (open ? mdiBackburger : mdiMenu);

export default function Header({ open, toggleDrawer, togglePrefersColorScheme }) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory();



  const [openn3, setOpenn3] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenn3((prevOpen) => !prevOpen);
  };

  const handleClose3 = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenn3(false);
  };


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenn3(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
/*   const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
 */

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
  const classes = useStyles();
  const classes1 = useStyles1();
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
    history.push("/voitures")
    handleClose2()

  }
  function logOut() {
    localStorage.clear();
    history.push('/voitures');
  }
  return (
    <>
      <Transition in component={Fade} delay={337} timeout={775}>
        <AppBar position="sticky" color="primary" elevation={1}>
          <Toolbar >
            <Hidden lgUp>
              <IconButton edge="start" aria-label="open navigation drawer" onClick={toggleDrawer}>
                <Hidden smUp>
                  <Icon path={getPath(open)} size={1} color="currentColor" />
                </Hidden>
                <Hidden xsDown>
                  <Icon path={getPath(open)} size={1.125} color="currentColor" />
                </Hidden>
              </IconButton>
            </Hidden>
            <Hidden smUp>
              <HeaderTitle variant="h6" color="textPrimary">
                <HeaderText />
              </HeaderTitle>
            </Hidden>
            <Hidden xsDown>
              <HeaderTitle variant="h5" color="textPrimary">
                <HeaderText />
              </HeaderTitle>
            </Hidden>
            <Hidden xsDown>

              {
                localStorage.getItem('user-info') ?
                  <>
                    <Tooltip title="Ajouter annonce" placement="bottom">
                      <Button className={classes.stylebtn}
                      to={'/MesAnnonces/'} component={RouterLink}
                      >
                        <AddPhotoAlternateIcon fontSize="medium " />
                      </Button>
                    </Tooltip>
                   
                    <Tooltip title="Profil" placement="bottom">
                      <Button
                        className={classes.stylebtn}
                        ref={anchorRef}
                        aria-controls={openn3 ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <AccountBoxIcon fontSize='medium' > </AccountBoxIcon>
                      </Button>


                    </Tooltip>
                    <Popper open={openn3} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose3}>
                              <MenuList autoFocusItem={openn3} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose3}>Ma collection</MenuItem>
                                <MenuItem onClick={(event) => { handleClose3(event); logOut(); }}>Se déconnecter</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>
                  :
                  <>
                    <Tooltip title="Connexion" placement="bottom">
                      <Button endIcon={<ExitToAppIcon />} variant='outlined' onClick={handleClickOpen}>
                        Connexion
               </Button>
                    </Tooltip>
                    <Tooltip title="S'inscrire" placement="bottom">
                      <Button onClick={handleClickOpen2}  /* component={Link} to={'/register'} */>
                        S'inscrire
              </Button>
                    </Tooltip>
                  </>
              }

            </Hidden>


            <Hidden smUp>
              <Tooltip title="Changer mode " placement="bottom">
                <IconButton edge="end" onClick={togglePrefersColorScheme}>
                  <Icon path={mdiBrightness4} size={1} color="currentColor" />
                </IconButton>
              </Tooltip>
            </Hidden>
            <Hidden xsDown>
              <Tooltip title="Changer mode" placement="bottom">
                <IconButton onClick={togglePrefersColorScheme}>
                  <Icon path={mdiBrightness4} size={1} color="currentColor" />
                </IconButton>
              </Tooltip>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Transition>
      <Dialog
        fullScreen={fullScreen}
        open={openn2}
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
        className={classes1.glass}
      >
        <DialogTitle id="responsive-dialog-title"><Typography className={classes.paper} component="h1" variant="h5">
          S'inscrire
        </Typography></DialogTitle>
        <DialogContent >
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
        className={classes1.glass}
      >
        <DialogTitle id="responsive-dialog-title"><Typography className={classes.paper} component="h1" variant="h5">
          Se Connecter
        </Typography></DialogTitle>
        <DialogContent >
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>


              <Grid item xs={12} sm={6} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Connexion
                    </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>

  );
}

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  togglePrefersColorScheme: PropTypes.func.isRequired,
};
