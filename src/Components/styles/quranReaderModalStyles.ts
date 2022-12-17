import { makeStyles } from "@mui/styles"


export const useStyles = makeStyles(() => {
    return  {
     root: {
       flexGrow: 1,
       backgroundColor: "white",
       display: 'flex',
       height: 224,
     },
     tabs: {
       borderRight: `1px solid #eee`,
     } , 
     modal : {
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: "80%",
       backgroundColor: 'white',
       boxShadow: "24",
       height : "70%",
       p: 4,
     }
   } 
   })

   