import React, { useState }  from "react";
import { Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './style.css';





export default function InfosVoiture() {
  const villes = require("../../villes");
  const marques = require("../../carbrands");
  const carburant = require("../../carburant");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };


  return (
    <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} >
          <Autocomplete
            id="automarque"
            freeSolo
            options={marques}
            getOptionLabel={(option) => option.name}
            defaultValue={marques[0]}
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
          />
        </Grid>


        <Grid item xs={12} sm={6} >
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={villes}
            getOptionLabel={(option) => option.ville}
            defaultValue={villes[393]}
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
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="annee"
            variant="outlined"
            fullWidth
            id="annee"
            label="Année"
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            name="km"
            variant="outlined"
            fullWidth
            id="km"
            label="kilométrage"
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
          />
        </Grid>
     
      </Grid>
   
      <div className="app">
      <div>
        <input type="file" id="file" multiple onChange={handleImageChange} />
        <div className="label-holder">
          <label htmlFor="file" className="label">
          <AddPhotoAlternateIcon fontSize="medium " />
          </label>
        </div>
        <div className="result">{renderPhotos(selectedFiles)}</div>
      </div>
    </div>
   

    </React.Fragment>
  );
}