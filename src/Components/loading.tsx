import { CircularProgress } from "@mui/material"




function Loading(){
    return(
        <div style={{width : "100%" , display : "flex" , height : "100vh" , justifyContent : "center" , alignItems : "center"}}>
            <CircularProgress />
        </div>
    )
}

export default Loading