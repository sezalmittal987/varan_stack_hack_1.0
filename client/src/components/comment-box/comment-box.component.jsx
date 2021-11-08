import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Icon from '@material-ui/core/Icon';
import axios from 'axios'
import {Typography, TextField, Button,Card,CardContent} from '@material-ui/core'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})
const useStyles = makeStyles((theme) => ({
  commentBox: {
    marginTop: "30px",  
    width: "400px"
  },
  heading: {
    paddingTop: "30px",  
    letterSpacing: '.2rem',
    color: '#000000'
  },
  button: {
      marginTop: "30px",
      textAlign: "center",
      
     
  },
  card: {
      display: 'inline-block',
      marginRight: "30px",
      
      marginTop: "30px"
  },
  comments: {
    marginTop: "30px",  
    width: "400px",
    maxHeight: "400px",
    overflow: "scroll",

  }
}));

export default function CommentBox({eventId,comments}) {
  const classes = useStyles();
    const [commentCredentials,setCommentCredentials] = useState({
        name: '',
        comment: '',
    })
  const handleChange = event => {
      const {name,value} = event.target;
      console.log(name,value);
      setCommentCredentials({...commentCredentials, [name]: value});
      console.log(commentCredentials);
  }
  const handleSubmit = event => {
    console.log(commentCredentials);
    console.log(eventId);  
    event.preventDefault();
      axios({
          method: 'post',
          url: 'user/commentEvent',  
          data: {
              eventId : eventId,
              userId : commentCredentials.name, ///TODO : USERID
              content : commentCredentials.comment  
          }
      }).then(response => {
          alert("Comment successful")
          setCommentCredentials({
              name: '',
              comment: ''
          })
          window.location.reload(false);
      }).catch(error => {
          alert("Comment error")
          console.log(error);
          
      })
  }
    return (
    <div>
        
        <Card className = {classes.card}>
            <CardContent>
            <Typography variant = 'h5' color = 'primary' align = 'center' className = {classes.heading}>Comment</Typography>
        
        <form onSubmit = {handleSubmit}>
        <TextField id="standard-basic"
         label="Name" 
         className = {classes.commentBox} 
         name = 'name'
         onChange = {handleChange} 
         required
         value = {commentCredentials.name}
          />
         <TextField
             id="outlined-multiline-static"
             label="Comment"
             multiline
             className = {classes.commentBox}
             rowsMax = {4}
             name = 'comment'
             onChange = {handleChange}
             required
             value = {commentCredentials.comment}
             />
         <div style = {{textAlign: 'center'}}>
         <Button
         variant="contained"
         
         className={classes.button}
         endIcon={<AddCommentIcon />}
         type = "submit"
         
       >
         Comment
       </Button>
        </div>
       </form>
        {
            
            comments? 
            (
                <div className = {classes.comments}>
                {comments.map(comment => (
                 <div className = {classes.commentBox}>
                    <Typography variant = 'caption'>{comment.userId.name}</Typography>
                    <Typography variant = 'body1'>{comment.content}</Typography>
                    <hr />
                    </div> ))}
                </div>
            )
                :
           (null)
            
        }    
            </CardContent>
        </Card>
       

       
       
      
    </div>
        
    
    
  );
}