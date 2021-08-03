import React, { useState } from 'react';
import Content from 'templates/Content';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DialogTitle, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';






const useStyles = makeStyles((theme) => ({
  btnStyle: {
    textTransform: 'none',
    fontWeight: 700,
  },
  fabbutton: {
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
  centerCard: {
    marginleft: '10%',
    width: "80%",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function MesAnnonces() {
  const [open, setOpen] = React.useState(false); //to open dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const villes = require("../../villes");
  const marques = require("../../carbrands");
  const carburant = require("../../carburant");

  const [tel, setTelVoiture] = useState("");
  const [vendeur, setVendeurVoiture] = useState("");
  const [file, setFile] = useState("");
  const [marqueVoiture, setMarqueVoiture] = useState("");
  const [modeleVoiture, setModeleVoiture] = useState("");
  const [villeVoiture, setVilleVoiture] = useState("");
  const [carburantVoiture, setCarburantVoiture] = useState("");
  const [prixVoiture, setPrixVoiture] = useState("");
  const [anneeVoiture, setAnneeVoiture] = useState("");
  const [kmVoiture, setKmVoiture] = useState("");
  const [descriptionVoiture, setDescriptionVoiture] = useState("");



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();


 

  async function add() {

    console.warn(marqueVoiture, modeleVoiture, villeVoiture, carburantVoiture, prixVoiture, anneeVoiture, kmVoiture, descriptionVoiture, file);
    const formData = new FormData();
    formData.append('iduser', JSON.parse(localStorage.getItem("user-info")).id);
    formData.append('marque', marqueVoiture);
    formData.append('modele', modeleVoiture);
    formData.append('ville', villeVoiture);
    formData.append('carburant', carburantVoiture);
    formData.append('prix', prixVoiture);
    formData.append('annee', anneeVoiture);
    formData.append('km', kmVoiture);
    formData.append('description', descriptionVoiture);
    formData.append('file', file);
    formData.append('tel', tel);
    formData.append('vendeur', vendeur);


    let result = await fetch("http://localhost:8000/api/add", {
      method: 'POST',
      body: formData
    });
    alert("Data has been saved")

  }

  

  return (
    <>
      <CssBaseline />

      <Content className={classes.centerCard}>
        <Card  >
          <ButtonGroup elevation={0} fullWidth variant="contained" color="primary" aria-label="contained primary button group">
            <Button className={classes.btnStyle} onClick={handleClickOpen} >Voiture</Button>
            <Button className={classes.btnStyle}>Moto</Button>
            <Button className={classes.btnStyle}>Vélo</Button>
          </ButtonGroup>
        </Card>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>
            Ajouter voiture
          </DialogTitle>
          <DialogContent >
            <div className={classes.form} noValidate>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                  <TextField
                    name="vendeur"
                    variant="outlined"
                    fullWidth
                    id="vendeur"
                    label="Nom du vendeur"
                    onChange={(e) => setVendeurVoiture(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    name="tel"
                    variant="outlined"
                    fullWidth
                    id="tel"
                    label="Tel"
                    onChange={(e) => setTelVoiture(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Autocomplete
                    id="marque"
                    freeSolo
                    options={marques}
                    getOptionLabel={(option) => option.name}
                    defaultValue={marques[0]}
                    onChange={(e, value) =>{ if (value) { setMarqueVoiture(value.name)}}}
                    renderInput={(params) => (
                      <TextField {...params} label="Marque" variant="outlined" />
                    )}

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    name="modele"
                    variant="outlined"
                    fullWidth
                    id="modele"
                    label="Modèle"
                    onChange={(e) => setModeleVoiture(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Autocomplete
                    id="ville"
                    freeSolo
                    options={villes}
                    getOptionLabel={(option) => option.ville}
                    defaultValue={villes[393]}
                    onChange={(e, value) =>{if (value) { setVilleVoiture(value.ville)}}}

                    renderInput={(params) => (
                      <TextField {...params} label="Ville" variant="outlined" />
                    )}
                  />

                </Grid>
                <Grid item xs={12} sm={6} >
                  <Autocomplete
                    id="carburant"
                    freeSolo
                    options={carburant}
                    getOptionLabel={(option) => option.name}
                    defaultValue={carburant[0]}
                    onChange={(e, value) =>{if (value) { setCarburantVoiture(value.name)}}}
                    renderInput={(params) => (
                      <TextField {...params} label="Carburant" variant="outlined" />
                    )}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="prix"
                    variant="outlined"
                    fullWidth
                    id="prix"
                    label="Prix"
                    onChange={(e) => setPrixVoiture(e.target.value)}

                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="annee"
                    variant="outlined"
                    fullWidth
                    id="annee"
                    label="Année"
                    onChange={(e) => setAnneeVoiture(e.target.value)}

                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <TextField
                    name="km"
                    variant="outlined"
                    fullWidth
                    id="km"
                    label="kilométrage"
                    onChange={(e) => setKmVoiture(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setDescriptionVoiture(e.target.value)}

                  />
                </Grid>


              </Grid>

              <div className="form">
                <h2>Ajouter votre image ici !</h2>
                <div className="grid">
                  <div className="form-element">

                    <input type="file" id="file" multiple onChange={(e) => {
                      setFile(e.target.files[0]);
                      let img = e.target.files[0];
                      let url = URL.createObjectURL(img);
                      document.querySelector('.preview').src = url;
                    }} />
                
                      <label htmlFor="file"  id="preview">
                        <img className="preview" src="https://bit.ly/3ubuq5o" alt="https://bit.ly/3ubuq5o" />
                      </label>
               

                  </div>
                </div>
              </div>

            </div>
            <Button
              onClick={add}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter
            </Button>
          </DialogContent>
        </Dialog>
      </Content>
    </>
  );
}