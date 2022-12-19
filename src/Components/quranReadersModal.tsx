import { Box, Grid, Modal, Typography } from "@mui/material"
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@material-ui/core/Tab';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Link } from "react-router-dom";
import { useStyles } from "./styles/quranReaderModalStyles";
import { a11yProps, fabStyle, TabPanel } from "./modalAssets";
import { quranReaderModalProps } from "../Types/types";



function QuranReaderModal({
    quranReaders ,
    modalOpen ,
    surahNumber ,
    juzNumber ,
    setModalOpen
}:quranReaderModalProps){

    const handleClose = () => setModalOpen(false);
    const theme = useTheme();
    const [value, setValue] = useState(0);
    let [quranIdentifier , setQuranIdentifier] = useState<string>("")
    const classes = useStyles();


    function handleQuranReader(quranIdentifier : string){
        setQuranIdentifier(quranIdentifier)
    }


    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
      }

      const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      }
    
    return (

        <Modal
        open={modalOpen}
        onClose={handleClose}
      >
     <Box className={classes.modal}>
     <div className={classes.root}>
     <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
         {quranReaders?.map((item : any , index : number) =>{
                let headerItem = item[0]
                return (
                    <Tab  key = {index} label={headerItem} {...a11yProps(index)} />
                )
            })}
        </Tabs>

      <Box
      sx = {{width : "100%" , overflowY : "scroll" , height : ["300px","400px"]}}
      >
          {quranReaders?.map((item : any , index : number) =>{
            let headerValuesArray = item[1]
          return <TabPanel key = {index} value={value} index={index} dir={theme.direction}>
                  <Grid   spacing={2} container>
                   {headerValuesArray.map((headerValue : any , i : number) =>{
                          let targetIdentifier = quranIdentifier == headerValue.identifier
                     return <Grid key = {i} xs = {6} sm = {3} item>
                            <Box
                            bgcolor = {targetIdentifier ? "#455a64" : "white"}
                            color = {targetIdentifier? "#eee" : "#263238"}            
                            borderRadius = {3}
                            textAlign = "center"
                            p={2}
                            sx = {{
                             boxShadow : 1 , 
                             cursor : "pointer" ,
                             transition : "ease 0.5s",
                             "&:hover" : targetIdentifier ? {} : {backgroundColor : "#fafafa" , boxShadow : 0 , transform : "scale(0.95)" }
                         }}
                            onClick = {() => handleQuranReader(headerValue.identifier)}
                            >
                              <Typography sx = {{fontSize : [8 , 15]}}>{headerValue.name}</Typography>
                            </Box>
                    </Grid>
                })}
                </Grid>
            </TabPanel>    
        })}
      </Box>

        <Zoom
          key={"primary"}
          in={quranIdentifier !== ""}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${quranIdentifier !== "" ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab 
          size = {"medium"}
          component = {Link} 
          to = {surahNumber ? `surah/${quranIdentifier}/${surahNumber}` : `juz/${quranIdentifier}/${juzNumber}`}  
          sx={fabStyle} 
          aria-label={"redirect"} 
          color = {"primary"}
          >
            <DoubleArrowIcon  />
          </Fab>
        </Zoom>
        </div>
        </Box>
      </Modal>
    )
}


export default QuranReaderModal
