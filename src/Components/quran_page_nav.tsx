import { AppBar, Box, Chip, FormHelperText, InputLabel, Link, ListSubheader, MenuItem, OutlinedInput, Select, SelectChangeEvent, Toolbar, Typography } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import { AppBarHeight, handleScrollTo } from "../utils/utils"
import { useEffect, useState } from "react";
import Input from '@material-ui/core/Input';
import { ayah, NavBarComponentProps } from "../Types/types";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }


function NavBar({
    totalAyahsData ,
    setAyahNumber  , 
    setAyahItemOrder  , 
    translateIdentifiers  , 
    selectedTransilationIdentifiers ,
    setSelectedTransilationIdentifiers ,
}:NavBarComponentProps){

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0)
    let [scrollWidth , setScrollWidth] = useState(0)


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


    function handleAyahNumberChange(e: SelectChangeEvent){
        setAyahNumber(e.target.value as unknown as number)
    }

    function calcAyahOrder(totalAyahsData : any , ayahIndex : number , surahIndex : number){
        if(surahIndex == 0){
            return ayahIndex + 1
        }
       return totalAyahsData?.reduce((ack : number , item : any , index : number) =>{
            if(index > surahIndex){
                return ack
            }
            if(index == surahIndex){
                return ack += ayahIndex + 1
            }
            return ack += item[1].length 
        },0)
    }

    function ayahNumberSelectionItems(header : string , ayahsDataArray : ayah[]  , surahIndex : number){
        let items = ayahsDataArray?.map((item , ayahIndex : number) =>{
          return <MenuItem  onClick = {(e) => {
              setAyahItemOrder(calcAyahOrder(totalAyahsData , ayahIndex , surahIndex)) 
              handleScrollTo((e as unknown as React.MouseEvent<HTMLLIElement>) , item.number)
          }} key = {item.number} value={item.number}>{item.numberInSurah}</MenuItem>
      })
      return [<ListSubheader>{header}</ListSubheader> , items]

    }

    const handleTranslationChange = (event: SelectChangeEvent<typeof selectedTransilationIdentifiers>) => {
        const {
          target: { value },
        } = event;
        setSelectedTransilationIdentifiers((prev : any) =>{
            if(prev.length == 5 && prev.length < value.length){
                return prev
            }
            return typeof value === 'string' ? value.split(',') : value
        })
      }

    function translationSelectionItems(header : string , translationIdentifiersArray : any[] ){
        let items = translationIdentifiersArray.map((item) =>{
            return <MenuItem key = {item.name} value={item.identifier}>{item.name}</MenuItem>
        })        
        return [<ListSubheader>{header}</ListSubheader> , items]
    }


    return (
      <nav>
        <AppBar sx = {{ marginTop : !show ? `-${AppBarHeight -  2}px` : 0 , transition : "ease 0.8s" }}  position="fixed">
        <Toolbar  sx = {{  position : "absolute" , width : "100%" , height : `${AppBarHeight}px`  , backgroundColor : "#212121" , display : "flex" , justifyContent : "space-between"}} variant="dense">    
          <Typography href="../../" component={Link} sx = {{fontSize : [20 , 25] , cursor : "pointer" , textDecoration : "none"}} color="inherit" >
            Qurany
          </Typography>

         <FormControl >
          <InputLabel sx = {{position : "absolute" , top : -12 , fontSize : [10,14]}}>ayah number</InputLabel>
                <Select
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx = {{
                    backgroundColor : "white" ,
                    width : [80,250] , 
                    height : [20,30]
                  }}
                    defaultValue = {""}
                    onChange={handleAyahNumberChange}
                >
                {totalAyahsData?.map((ayahData : any , surahIndex : number) =>{
                    let header = ayahData[0]
                    let ayahsDataArray = ayahData[1]
                    return ayahNumberSelectionItems(header , ayahsDataArray , surahIndex)
                })}
            </Select>
        </FormControl > 
      

        <FormControl sx = {{width : [80 , 250], height : [20,30] , backgroundColor : "white"}} >
          <InputLabel sx = {{position : "absolute" , top : -12 , fontSize : [10,14]}}>translation</InputLabel>
        <Select   
         renderValue={(selected) =>{
             return selected.join(", ")
             }}            
          multiple
          value={selectedTransilationIdentifiers}
          onChange={handleTranslationChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
        {translateIdentifiers?.map((identifierData : any) =>{
            let header = identifierData[0]
            let translationIdentifiersArray = identifierData[1]
            return translationSelectionItems(header , translationIdentifiersArray)
          })}
        </Select>
        <FormHelperText sx = {{color : "#b3b3b3" , margin : 0 , fontSize : ["4px" , "10px"] , whiteSpace : "nowrap"}}>you have maximum 5 translation type to add</FormHelperText>
      </FormControl>
          <Box></Box>
         <Box sx = {{position : "absolute" , bottom : 0 , height : "2px" , left: 0 , width : scrollWidth + "%" , backgroundColor : "#00e5ff"}}></Box>
        </Toolbar>
      </AppBar>
    </nav>
    )
}

export default NavBar





