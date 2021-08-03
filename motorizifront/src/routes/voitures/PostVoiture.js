import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';


const useStyles1 = makeStyles ({
  glass: {
    backgroundColor: "rgba(	137, 216, 211,0.1)",
    backdropFilter: "blur(0.5px)",
    boxShadow: "5px 5px 5px rgba(30, 30, 30, 0.1)",
    borderLeft: "solid 1px rgba(	137, 216, 211,0.2)",
    borderTop: "solid 1px rgba(	137, 216, 211,0.2)" ,
    borderBottom: "solid 1px rgba(	137, 216, 211,0.2)" ,
    width:'auto',
    maxWidth:310,
    margin:'auto',
    borderRadius: 25,
  }
});
const useStyles = makeStyles((theme) => ({
  
  media: {
    /* height: 0,
    paddingTop: '56.25%', */ // 16:9
    alignItems:'center',
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function PostVoiture({post}) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [expanded, setExpanded] = React.useState(false);
  const img = {
    width:'100%',
    height: 'auto',
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var mydate = new Date(post.created_at);

  return (
    <Card  className={classes1.glass} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.vendeur.charAt(0)}
          </Avatar>
        }
       
        title={post.marque+" "+post.modele}
        subheader={mydate.toLocaleDateString()}
      />
      <CardMedia
        className={classes.media}
        title={post.marque+" "+post.modele}
      >
      <img src={"http://localhost:8000/"+post.file} style={img}></img>
      </CardMedia>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{post.marque+" "+post.modele}</Typography>
          <Typography>Ville:{" "+post.ville}</Typography>
          <Typography>Carburant:{" "+post.carburant}</Typography>
          <Typography>Km:{" "+post.km}</Typography>
          <Typography>Prix:{" "+post.prix+" DH"}</Typography>
          <Typography>Année:{" "+post.annee}</Typography>
          <Typography paragraph>{post.vendeur}{": "+post.tel}</Typography>
          <Typography>{post.description}</Typography>
          
        </CardContent>
      </Collapse>
      
    </Card>
  );
}