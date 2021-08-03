import React, { useState, useEffect } from 'react';
import Content from 'templates/Content';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Transition from 'components/Transition';
import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Masonry from 'react-masonry-css'
import PostVoiture from './PostVoiture'



const useStyles = makeStyles((theme) => ({
  fabbutton: {
    /* borderRadius:"30em", */
    /*  borderColor: "black" , */
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: 'black',
    backgroundColor: 'none',
  },
  avatarsearch: {
    boxShadow: "6px 6px 8px rgba(30, 30, 30, 0.55)",
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    border: 'none',
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: '#89d8d3'
  },
  /* centerCard: {
    marginleft: '10%',
    width: "80%", 
  },*/
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    /*  height: 0,
     paddingTop: '56.25%',  */
    height: '100%',
    width: 300,
    objectFit: 'cover',

  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));



export default function Voitures() {
  const [data, setData] = useState([]);
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [ville, setVille] = useState("");
  const [carburants, setCarburants] = useState("");
  const [prixmin, setPrixmin] = useState("");
  const [prixmax, setPrixmax] = useState("");
  const [anneemin, setAnneemin] = useState("");
  const [anneemax, setAnneemax] = useState("");
  const [kmmin, setKmmin] = useState("");
  const [kmmax, setKmmax] = useState("");

  function search(data) {
    var result = data;
    if (marque.toLowerCase() != "tout" && marque.toLowerCase() != "") {
      result = data.filter((item) => item.marque.toLowerCase() == marque.toLowerCase())
    }
    if (modele.toLowerCase() != "") {
      result = data.filter((item) => item.modele.toLowerCase() == modele.toLowerCase())
    }
    if (ville.toLowerCase() != "tout" && ville.toLowerCase() != "") {
      result = data.filter((item) => item.ville.toLowerCase() == ville.toLowerCase())
    }
    if (carburants.toLowerCase() != "tout" && carburants.toLowerCase() != "") {
      result = data.filter((item) => item.carburant.toLowerCase() == carburants.toLowerCase())
    }
    if(prixmin.toLowerCase() != ""){
      result = data.filter((item) => Number(item.prix.replace(/\s+/g,'')) >= Number(prixmin.replace(/\s+/g,'')))
    }
    if(prixmax.toLowerCase() != ""){
      result = data.filter((item) => Number(item.prix.replace(/\s+/g,'')) <= Number(prixmax.replace(/\s+/g,'')))
    }
    if(anneemin.toLowerCase() != ""){
      result = data.filter((item) => Number(item.annee.replace(/\s+/g,'')) <= Number(anneemin.replace(/\s+/g,'')))
    }
    if(anneemax.toLowerCase() != ""){
      result = data.filter((item) => Number(item.annee.replace(/\s+/g,'')) <= Number(anneemax.replace(/\s+/g,'')))
    }
    if(kmmin.toLowerCase() != ""){
      result = data.filter((item) => Number(item.km.replace(/\s+/g,'')) <= Number(kmmin.replace(/\s+/g,'')))
    }
    if(kmmax.toLowerCase() != ""){
      result = data.filter((item) => Number(item.km.replace(/\s+/g,'')) <= Number(kmmax.replace(/\s+/g,'')))
    }
    return result
  }

  useEffect(() => {
    async function fetchdata() {
      let result = await fetch("http://localhost:8000/api/list");
      result = await result.json();
      setData(result);
    }
    fetchdata()
    return () => {
      setData([]);
    };
  }, []);
  console.warn("result", data);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  const villes = require("../../villes");
  const marques = require("../../carbrands");
  const carburant = require("../../carburant");
  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    960: 2,
    600: 1
  };

  const img = {
    width: '100%',
    height: 'auto',
  };


  return (

    <Transition in component={Grow}>
      <Content className={classes.centerCard}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            search(data).map((item) =>
              <>
              
                <PostVoiture key={item.id} post={item}>

                </PostVoiture>
         
              </>
            )
          }
        </Masonry>

        {/* <Button className={classes.fabbutton} color="primary" onClick={handleClickOpen}> */}
        <Tooltip title="Rechercher annonce" placement="top">
          <Avatar component="button" className={classes.avatarsearch} onClick={handleClickOpen}>
            <SearchIcon fontSize='large' > </SearchIcon>
          </Avatar>
        </Tooltip>

        {/* </Button> */}
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
                  <Autocomplete
                    id="automarque"
                    freeSolo
                    options={marques/* .map((option) => option.name) */}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => { if (value) { setMarque(value.name) } }}
                    defaultValue={marques[0]}
                    renderInput={(params) => (
                      <TextField {...params} label="Marque" variant="outlined" />
                    )}

                  />
                </Grid>

                <Grid item xs={12} sm={6} >
                  {/*  <Autocomplete
                  id="automodele"
                  freeSolo
                  options={model.map((option) => option)}
                  renderInput={(params) => (
                    <TextField {...params} label="Modèle" variant="outlined" />
                  )}
                />
 */}
                  <TextField
                    name="modele"
                    variant="outlined"
                    fullWidth
                    id="modele"
                    label="Modèle"
                    onChange={(e) => setModele(e.target.value)}
                  />
                </Grid>


                <Grid item xs={12} sm={6} >
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={villes}
                    getOptionLabel={(option) => option.ville}
                    defaultValue={villes[393]}
                    onChange={(e, value) => { if (value) { setVille(value.ville) } }}
                    renderInput={(params) => (
                      <TextField {...params} label="Ville" variant="outlined" />
                    )}
                  />

                </Grid>

                <Grid item xs={12} sm={6} >
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={carburant}
                    getOptionLabel={(option) => option.name}
                    defaultValue={carburant[0]}
                    onChange={(e, value) => { if (value) { setCarburants(value.name) } }}
                    renderInput={(params) => (
                      <TextField {...params} label="Carburant" variant="outlined" />
                    )}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="prixmin"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPrixmin(e.target.value)}
                    id="prixmin"
                    label="Prix min"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="prixmax"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPrixmax(e.target.value)}
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
                    label="Année min"
                    onChange={(e) => setAnneemin(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="anneemax"
                    variant="outlined"
                    fullWidth
                    id="anneemax"
                    label="Année max"
                    onChange={(e) => setAnneemax(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="kmmin"
                    variant="outlined"
                    fullWidth
                    id="kmmin"
                    label="Km min"
                    onChange={(e) => setKmmin(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="kmmax"
                    variant="outlined"
                    fullWidth
                    id="kmmax"
                    label="Km max"
                    onChange={(e) => setKmmax(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                OK
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Content>
    </Transition>
  );
}
