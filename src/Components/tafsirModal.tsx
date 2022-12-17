import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material"
import {  useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useQuery } from "react-query";
import { getTafsirData, getTafsirEditions } from "../Api/Api";
import { Container } from "rsuite";
import { style } from "./styles/tafsirModalStyles";
import { tafsirModalProps } from "../Types/types";



function TafsirModel({
  modalOpen ,
  setModalOpen , 
  tafsirAyahNumber
}:tafsirModalProps){
  const handleClose = () => setModalOpen(false);
  let [tafsirIdentifier , setTafsirIdentifier] = useState("")
  let {data : tafsirEditions} = useQuery("tafsitEdition" , getTafsirEditions)
  let {data : tafsirText , isFetching} = useQuery(["tafsirData" , tafsirIdentifier , tafsirAyahNumber] , () => getTafsirData(tafsirIdentifier , tafsirAyahNumber))

  const handleChange = (event: SelectChangeEvent) => {
    setTafsirIdentifier(event.target.value as string);
  }


  return(
    <Modal
    open={modalOpen}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={modalOpen}>
      <Box sx={style}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">tafsir type</InputLabel>
        <Select
          value = {tafsirIdentifier}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {tafsirEditions?.map((item : any , i : number) => {
            return  <MenuItem key = {i} value={item.identifier}>{item.name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Container>
      {!isFetching && tafsirIdentifier !== "" &&  <Box p = {3} style = {{overflowY : "scroll" , maxHeight : "400px" , direction : "rtl"}}>
          <Typography variant = {"h6"}>{tafsirText}</Typography>
        </Box>}
        {isFetching && <CircularProgress />}
      </Container>
      </Box>
    </Fade>
  </Modal>
  
    )
}


export default TafsirModel