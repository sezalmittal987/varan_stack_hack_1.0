import React,{useEffect, useState} from 'react';
import axios from 'axios'
import {Container, CssBaseline,Avatar,TextField,Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    previewText: {
        textAlign: "center",
        width: "300px"
    },
    paper: {
        marginTop: "80px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      avatar: {
        margin: "8px",
        backgroundColor: "#f48fb1",
        width: "100px",
        height: "100px",
      },
      fieldName: {
          textAlign: 'left'
      },
}))
const UserProfile = ({match}) => {
    console.log(match.params.id)
    const [userCredentials,setUserCredentials] = useState({})
    useEffect(() => {
        axios({
            method: 'get',
            url: `/userapi/${match.params.id}`
        }).then(response => {
            console.log(response.data);
            alert('fetched');
            setUserCredentials(response.data);
        }).catch(error => {
            alert("Some error");
            console.log(error);
        })
    },[])
    const classes = useStyles();
    const {name,email,image_url,registration_type,tickets,mobile_no} = userCredentials;
    return(
                                <Container component = "main" maxWidth = "xs">
                                    <CssBaseline />

                                    <div className = {classes.paper}>
                                        <Avatar alt = {name} src = {image_url} alt = {name} className = {classes.avatar}/>
                                        
                                        <TextField
                                        variant="standard"
                                        value = {name}
                                        margin="normal"
                                        className = {classes.previewText}
                                        
                                        name="name"
                                        
                                        type="Text"
                                        id = "user_name_preview"
                                        
                                        autoComplete="user-name"
                                        
                                        disabled
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        
                                        disabled
                                        name="email"
                                        
                                        type="email"
                                        id = "user_email_preview"
                                        
                                        autoComplete="user-email"
                                        value = {email}
                                        className = {classes.previewText}
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        
                                        disabled
                                        name="registration_type"
                                        
                                        type="text"
                                        id = "registration_type_preview"
                                        
                                        autoComplete="registration-type"
                                        value = {registration_type}
                                        className = {classes.previewText}
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        
                                        disabled
                                        name="tickets"
                                        
                                        type="text"
                                        id = "tickets_preview"
                                        
                                        autoComplete="registration-type"
                                        value = {tickets}
                                        className = {classes.previewText}
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        
                                        disabled
                                        name="mobile_no"
                                        
                                        type="text"
                                        id = "mobile_no__preview"
                                        
                                        autoComplete="mobile-no"
                                        value = {mobile_no}
                                        className = {classes.previewText}
                                        />
                                    </div>
                                 </Container>
    )
}
export default UserProfile;