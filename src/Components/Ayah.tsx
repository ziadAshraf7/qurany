import { Box, Button, CircularProgress, Divider, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { ayahComponentProps } from "../Types/types";
import {handleScrollTo } from "../utils/utils";



    const Ayah = ({
        ayahNumber ,
        surahName ,
        juzNumber ,
        ayahText ,
        audio ,
        ayahNumberinSurah ,
        translatedAyahData ,
        setTargetAyahNumber,
        targetAyah,
        setModalOpen,
        setTafsirAyahNumber ,
        isFetching2
    }:ayahComponentProps) =>{


        const theme = useTheme();
        const responsiveAudio = useMediaQuery(theme.breakpoints.up('sm'))
        let [audioLoadError , setAudioLoadError] = useState(false)
        const {translatedAyah, langs} = translatedAyahData


        return(
            <>
            <Container sx = {{perspective : "6000px" , display : "flex" , justifyContent : "center" }}>
                <Box 
                onClick={() => setTargetAyahNumber(ayahNumber)}
                id={`section${ayahNumber}`}  
                sx = {{
                padding : ["5px" , "20px"] , 
                width : "100%" , 
                backgroundColor : "#21212180" , 
                marginBottom : "15px" ,
                cursor : !targetAyah ?  "pointer" : "" ,
                color : "white" ,
                transition : "all 0.5s",
                transform : targetAyah ? "translateZ(200px)" : "translateZ(-200px)"
                }}>

                   {!targetAyah && 
                   <Box sx={{direction : "rtl"}}>
                    <Stack direction={"row"} justifyContent = {"space-between"}>
                      <Box sx = {{ position : "relative" , width : ["30px","35px"] , height : "35px" }}>
                         <img style = {{ position : "absolute" ,width : "100%" , height : "100%" , objectFit : "cover"}}  src = {require("../imgs/PngItem_5034905.png")} />
                         <Typography sx = {{ fontSize : [12 , 14] ,position : "absolute" , top : "50%" , transform : "translate(0,-50%)" , width : "100%" , textAlign : "center"}}>{ayahNumberinSurah}</Typography>
                       </Box>
                       <Typography sx = {{ fontSize : [12 , 14] }}>{surahName.en}</Typography>
                    </Stack>
                    </Box>}

                     {targetAyah && <div style={{height : "100%"}}>
                        
                        
                    <Stack mb = {5} spacing={1} direction = {"row"} justifyContent = {"flex-end"}> 
                        <Typography sx = {{
                            fontSize : [16,25] , 
                            width : "100%" ,
                            direction : "rtl"}} 
                             >{ayahText}</Typography>
                            
                             <Box sx = {{ position : "relative" , width : ["30px","35px"] , height : "35px" }}>
                               <img 
                               style = {{width : "100%" , height : "100%" , objectFit : "cover"}}
                               src = {require("../imgs/PngItem_5034905.png")} />
                                 <Typography sx = {{fontSize : [12 , 14] , position : "absolute" , top : "50%" , transform : "translate(0,-50%)" , width : "100%" , textAlign : "center"}}>{ayahNumberinSurah}</Typography>
                             </Box>
                            </Stack>


                          <div style = {{textAlign : "center"}}>
                            <audio 
                            style={{
                                height : responsiveAudio ? "35px" : "25px" , width : responsiveAudio ? 400 : 200 }}
                            autoPlay = {targetAyah} 
                            controls
                            preload="none"
                            onError={() => setAudioLoadError(true)}
                            onPlay={(e) => {
                                setAudioLoadError(false)
                                handleScrollTo((e as unknown as React.MouseEvent<HTMLLIElement>) , ayahNumber)
                            }}
                            onEnded={(e) => {
                                handleScrollTo((e as unknown as React.MouseEvent<HTMLLIElement>) , ayahNumber)
                                setTargetAyahNumber(prev => (prev as number) + 1)
                            }}
                            >
                            <source src={audio} type="audio/ogg"/>
                            </audio>
                            {audioLoadError && <Typography sx = {{fontSize : [12,16]}}>Failed to Load ,refresh the page</Typography>}
                        </div>

                        <Box mt = {3} mb = {3} >
                         <Divider />
                            {translatedAyah.length > 0 && translatedAyah.map((ayah : any , index : number) =>{
                                return (
                                    <Stack mb = {2} key = {index} direction = {"row"}>
                                        <Paper sx = {{height : "fit-content"}} >{langs[index]}</Paper>
                                        <Typography sx = {{fontSize : [7 , 15]}}>{ayah?.text}</Typography>
                                    </Stack>
                                )
                            })}
                            {isFetching2 && <Box><CircularProgress size={20} /></Box>}
                        </Box>

                        <Stack sx = {{width : "100%"}} textAlign = "center" direction = {"row"} justifyContent={"space-between"} alignItems = {"center"}>
                            <Box sx={{width : ["70px" , "200px"] ,padding : "5px"}}>
                                <Typography sx = {{fontSize : [7 , 16]}} component = {"p"}>رقم الجزء:{juzNumber}</Typography>
                                <Typography sx = {{fontSize : [7 , 16]}} component = {"p"}>juz number :{juzNumber}</Typography>
                            </Box>

                                <Button sx = {{fontSize : [8,14]}} onClick = {() => {
                                    setTafsirAyahNumber(ayahNumber)
                                    setModalOpen(true)
                                    }} variant = {"outlined"} >tafsir</Button>

                            <Box sx={{width : ["70px" , "200px"] , padding : "5px"}}>
                                <Typography sx = {{fontSize : [7 , 16]}} component = {"p"}>{surahName.ar}</Typography>
                                <Typography sx = {{fontSize : [7 , 16]}} component = {"p"}>surah name:{surahName.en}</Typography>
                            </Box>
                        </Stack>

                    </div>}

                </Box>
            </Container>
        </>
        )
    }

  


export default Ayah