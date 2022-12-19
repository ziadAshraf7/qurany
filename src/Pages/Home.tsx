import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { getQuranReaders, getSurahsData } from "../Api/Api"
import { useQuery } from "react-query"
import QuranReaderModal from "../Components/quranReadersModal"
import { Link } from "react-scroll"
import { surah } from "../Types/types"
import HomeNav from "../Components/homeNav"


const Home  = () =>{

    let [modalOpen , setModalOpen] = useState(false)
    let [selectedSurahNumber , setSurahNumber] = useState<number>()
    let [selectedJuzNumber , setJuzNumber] = useState<number>()
    let {data : surahsdata , isLoading : isLoading1} = useQuery("surahsdata" , getSurahsData)
    let {data : quranReaders , isLoading : isLoading2} = useQuery("quranReaders" , getQuranReaders)
    
    const juzNumberArray = Array.from(new Array(30) , (_ , i) => i + 1)

    function handleSurahNumber(surahNumber : number){
        setSurahNumber(surahNumber)
        setJuzNumber(undefined)
        setModalOpen(true)
    }

    function handleJuzNumber(juzNumber : number){
        setJuzNumber(juzNumber)
        setSurahNumber(undefined)
        setModalOpen(true)
    }

    return(
        <>
        <QuranReaderModal
            quranReaders = {quranReaders}
            modalOpen = {modalOpen}
            surahNumber = {selectedSurahNumber}
            juzNumber = {selectedJuzNumber}
            setModalOpen = {setModalOpen}
        />

        <HomeNav />



        <div style = {{backgroundColor :"RGBA(255, 255, 255, 0.24)"}}>

             <Stack mb = {20} sx = {{width : "100%"}} justifyContent={"center"} alignItems = {"center"} direction={{xs : "column" , md : "row"}}>
                <Stack sx = {{width : ["100%","50%"]}} justifyContent={"center"} alignItems = {"center"}>
                    <img style = {{objectFit : "cover" , width : "80%" , height : "80%"}} src = {require("../imgs/Quran Open transparent PNG - StickPNG.png")} />
                </Stack>
                <Stack  sx = {{width : ["100%","50%"] , textAlign : "center"}} direction={"column"} justifyContent={"center"} alignItems = {"center"}>
                    <Typography sx = {{fontSize : [16 , 18 , null , 22] }} mb = {2} >Choose a specific Sura or juz and start listning to it </Typography>
                    <Link 
                    smooth = {true}
                    to = {"surahs"} 
                    ><Button sx = {{width : [200,300] , fontSize : [12,16]}} variant = {"contained"}>Check Out</Button></Link>
                 </Stack>
           </Stack >



  <Container >

    <Stack id = {"surahs"} mb = {10} sx = {{textAlign : "center"}}>

    <Typography 
        fontFamily={"Kalam"} 
        textTransform = {"uppercase"}
    color = {"#718096"} 
    letterSpacing={[1,8]} 
    mb = {2} 
    sx = {{fontSize : [18 , 40]}}> surahs collection</Typography>    

     {isLoading1 && 
         <Grid spacing={5} container >
            {Array.from(new Array(114) , (_ , i) =>{
                return (
                    <Grid key = {i} item xs = {12} md = {6} lg = {4}>
                    <Skeleton sx = {{width : "100%" , padding : "10px"}} animation="wave" />
                   </Grid>
                )
            })}
        </Grid>}

        <Grid container  spacing={[2,5]} >
        {surahsdata?.map((surahItem : surah) =>{
            let targetSurahNumber = surahItem.number == selectedSurahNumber
           return (
           <Grid key={surahItem.number} item xs = {12} md = {6} lg = {4} >
            <Box 
               p = {2}
               borderRadius = {3}
               bgcolor = {targetSurahNumber ? "#263238" : "white"}
               color = {targetSurahNumber? "#eee" : "#263238"}
               onClick = {() => handleSurahNumber(surahItem.number)}
               sx = {{
                boxShadow : 2 , 
                cursor : "pointer" ,
                transition : "ease 0.5s",
                "&:hover" : targetSurahNumber ? {} : {backgroundColor : "#fafafa" , boxShadow : 0 , transform : "scale(0.95)" }
            }}
            >
                <Stack 
                    direction = {"row"}
                    justifyContent = {"space-between"}
                >
                    <Stack direction={"row"}>
                        <Box display={"flex"} alignItems = "center" px = {1} borderRight={targetSurahNumber ? `1px solid white` : "1px solid  #263238"}><Typography  sx = {{fontSize : [12,14,18]}}>{surahItem.number}</Typography></Box>
                        <Box pl = {1}><Typography alignSelf={"flex-end"} sx = {{fontSize : [10,12,15]}}>{surahItem.englishName}</Typography></Box>
                    </Stack>
                <Typography alignSelf={"flex-start"}  sx = {{fontSize : [14,18,24]}}>{surahItem.name}</Typography>
                
            </Stack>

            </Box>
            </Grid>)
        })}
        </Grid>
        </Stack>


    <Stack id = {"juzs"} pb = {10} sx = {{textAlign : "center"}}>

    <Typography 
        textTransform = {"uppercase"}
        fontFamily={"Kalam"} 
        color = {"#718096"} 
        letterSpacing={[1,8]} 
        mb = {2} 
        sx = {{fontSize : [18 , 40]}}
    > juz collection </Typography>

      {isLoading2 && 
         <Grid spacing={5} container >
            {Array.from(new Array(30) , (_ , i) =>{
                return (
                    <Grid key = {i} item xs = {12} md = {6} lg = {4}>
                    <Skeleton sx = {{width : "100%" , padding : "10px"}} animation="wave" />
                   </Grid>
                )
            })}
        </Grid>}

        <Grid mb = {10} container spacing={2} >
        {juzNumberArray.map((juzNumber : number) =>{
            let targetJuzNumber = selectedJuzNumber == juzNumber
           return (
           <Grid key = {juzNumber} item xs = {4} sm = {3} md = {2} >
            <Box
               bgcolor = {targetJuzNumber ? "#263238" : "white"}
               color = {targetJuzNumber? "#eee" : "#263238"}            
               onClick = {() => handleJuzNumber(juzNumber)} 
               borderRadius = {3}
               textAlign = "center"
               p={2}
               sx = {{
                boxShadow : 1 , 
                cursor : "pointer" ,
                transition : "ease 0.5s",
                "&:hover" : targetJuzNumber ? {} : {backgroundColor : "#fafafa" , boxShadow : 0 , transform : "scale(0.95)" }
            }}
            >
                <div>{juzNumber}</div>
            </Box>
            </Grid>)
        })}
        </Grid>
        </Stack>

        </Container>

        </div>
        </>
    )
}

export default Home