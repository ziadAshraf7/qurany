import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material"
import { AppBarHeight } from "../utils/utils"
import { useEffect, useState } from "react";
import { Link } from "react-scroll"




function HomeNav(){

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0)
    let [scrollWidth , setScrollWidth] = useState(0)
    let [activeNav , setActiveNav] = useState("surah")

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) { 
          setShow(false); 
        } else {
          setShow(true);  
        }
        setLastScrollY(window.scrollY); 
    }

    useEffect(() =>{
        let onScroll = () =>{
            const ScrollPx = document.documentElement.scrollTop
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollWidth((ScrollPx / winHeightPx) * 100)  
        }
        document.addEventListener("scroll" , onScroll)
        return () =>  document.removeEventListener("scroll" , onScroll)
    },[scrollWidth])


    useEffect(() => {
          window.addEventListener('scroll', controlNavbar);
    
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          }
      }, [lastScrollY]);

    return (
      <nav>
        <AppBar  sx = {{ marginTop : !show ? `-${AppBarHeight -  2}px` : 0 , transition : "ease 0.8s" }}  position="fixed">
        <Toolbar  sx = {{position : "absolute", color : "grey" , width : "100%" , height : `${AppBarHeight}px`  , backgroundColor : "white" , display : "flex" , justifyContent : "space-between"}} variant="dense">    
          
          <Typography  sx = {{fontSize : [20 , 25]  , textDecoration : "none"}}  >
            Qurany
          </Typography>
        
            <Stack width={"100px"} direction="row" justifyContent={"space-between"}>
                <Link smooth to = {"surahs"}><Typography fontSize={[18]} onClick = {() => setActiveNav("surah")} borderBottom={activeNav == "surah" ?"1px solid #00e5ff" : ""} p = {1} sx = {{cursor : "pointer"}}>surah</Typography></Link>
                <Link smooth to ={"juzs"}><Typography fontSize={[18]}  onClick = {() => setActiveNav("juz")} borderBottom={activeNav == "juz" ?"1px solid #00e5ff" : ""} p = {1} sx = {{cursor : "pointer"}}>juz</Typography></Link>
            </Stack>
     

        <Box></Box>
         <Box sx = {{position : "absolute" , bottom : 0 , height : "2px" , left: 0 , width : scrollWidth + "%" , backgroundColor : "#00e5ff"}}></Box>
        </Toolbar>
      </AppBar>
    </nav>
    )
}

export default HomeNav