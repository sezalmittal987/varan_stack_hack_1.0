import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {withRouter,Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setAdmin} from '../../redux/admin/admin.actions'
import {connect} from 'react-redux'
import GeoCode from 'react-geocode';
import axios from 'axios'
import MapGL, { Marker } from '@urbica/react-map-gl';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import PinDropIcon from '@material-ui/icons/PinDrop';
import 'mapbox-gl/dist/mapbox-gl.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function AddEvent({history}) {
  const classes = useStyles();
    const [eventCredentails,setEventCredentials] = useState({
        name: '',
        description: '',
        image: '',
        location: ''
    })
    const {name,description,image,location} = eventCredentails;
    const handleChange = event => {
        const {name,value} = event.target;
        console.log(name,value);
        setEventCredentials({...eventCredentails,[name]: value})
    }
    const [position, setPosition] = useState({
        longitude: 0,
        latitude: 0
      });
    const handleSubmit = async event =>{
        event.preventDefault();
        axios({
            url: '/event/new',
            method: 'post',
            data: {
                name: name,
                description: description,
                image: image,
                location: location,
                lat: position.latitude,
                lng: position.longitude,
            }
        }).then(response => {
            alert('Request Sent');
            history.push("/");
        })
        .catch(error => {
            console.log('Error: ',error);
            alert(
                'Some problem while adding the event'
            )
        })
        //trigger sagas.
    }
    
      
      const style = {
        padding: '10px',
        color: '#fff',
        cursor: 'pointer',
        background: '#1978c8',
        borderRadius: '6px'
      };
      const onDragEnd = (lngLat) => {
        setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
      };
      const [viewport, setViewport] = useState({
        latitude: 37.78,
        longitude: -122.41,
        zoom: 11
      });
      
    const handleLocation = async (event) => {
        const address = encodeURIComponent(eventCredentails.location);
        axios({
            method: 'get',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hyZXlkMTIzIiwiYSI6ImNrOG9yZHVscTA1MDYzZnRkY2VtcDd5MWYifQ.G5MQ9uSX90EDrzONZWQ8Hg`
        }).then(response => {
            const longAndLat = response.data.features[0].geometry.coordinates
            console.log(longAndLat);
            setPosition({
                longitude: longAndLat[0],
                latitude: longAndLat[1]
            })
            }).catch(error => {
                console.log("error: ",error);
        })
    }
      return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Event Details
        </Typography>
        <form className={classes.form} noValidate onSubmit = {handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id = "eventName"
            value = {name}
            autoComplete="event-name"
            onChange = {handleChange}
            required
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="eventDescription"
            value = {description}
            autoComplete="event-description"
            onChange = {handleChange}
            required
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            label="ImageURL"
            type="text"
            id="eventImage"
            value = {image}
            autoComplete="event-image"
            onChange = {handleChange}
            required
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            type="text"
            id="eventLocation"
            value = {location}
            autoComplete="Event-Location"
            onChange = {handleChange}
            required
          />
          <IconButton type="button" className={classes.iconButton} aria-label="search" onClick = {handleLocation}>
            <SearchIcon />
          </IconButton>
            <MapGL
            style={{ width: '100%', height: '400px' }}
            mapStyle='mapbox://styles/mapbox/light-v9'
            accessToken= "pk.eyJ1Ijoic2hyZXlkMTIzIiwiYSI6ImNrOG9yZHVscTA1MDYzZnRkY2VtcDd5MWYifQ.G5MQ9uSX90EDrzONZWQ8Hg"
            latitude={position.latitude}
            longitude={position.longitude}
            zoom={0}
            onViewportChange={setViewport}
            >
            <Marker
                longitude={position.longitude}
                latitude={position.latitude}
                onDragEnd={onDragEnd}
                draggable
            >
                <PinDropIcon />
            </Marker>
            </MapGL>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Event
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

    }
const mapDispatchToProps = dispatch => ({
    setAdmin: () => dispatch(setAdmin())
})

export default withRouter(connect(null,mapDispatchToProps)(AddEvent));

