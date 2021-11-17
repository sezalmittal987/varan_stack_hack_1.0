import React from 'react';
import {withRouter} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    height : '100%',
    display : 'flex',
    flexDirection : 'column',
  },
  media: {
    height: "200px",
  },
  cardContent: {
    flexGrow: 1
  }
}));
const EventCard = ({event,history}) => {
    const classes = useStyles();
    const {name, image, location, _id} = event;
    return(
      <Card className = {classes.card}>
          <CardActionArea>
              <CardMedia
                image = {image}
                title = {name} 
                className = {classes.media}
                title = {name}
              />
              <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              {name}
              </Typography>
              <Typography>
              {location.name}
              </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" color="primary" onClick = {() => history.push(`/event/${_id}`)}>
                  Learn More
                  </Button>
                  <Button size="small" color="primary" onClick = {() => history.push(`/event/${_id}/register`)}>
                  Register
                  </Button>
              </CardActions>
          </CardActionArea> 
      </Card>
    );
}
    
export default withRouter(EventCard);
