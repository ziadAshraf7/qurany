import { Box , CircularProgress} from "@mui/material"
import { Stack } from "@mui/system"
import  { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Components/quran_page_nav"
import { getLimitedAyahs, getTotalAyahsData, getTranslatedAyahs, getTranslateIdentifiers } from "../Api/Api"
import { useQuery, useQueryClient } from "react-query"
import Ayah from "../Components/Ayah"
import { AppBarHeight } from "../utils/utils"
import TafsirModel from "../Components/tafsirModal"
import Loading from "../Components/loading"
import { ayah } from "../Types/types"




function Surah(){

    const {quranIdentifier , surahNumber} = useParams()

    let [modalOpen , setModalOpen] = useState(false)
    let queryClient = useQueryClient()
    let [tafsirAyahNumber , setTafsirAyahNumber] = useState<number>()
    let [selectedTransilationIdentifiers , setSelectedTransilationIdentifiers] = useState<string[]>([])
    let [limit , setLimit] = useState(20)
    let [ayahNumber , setAyahNumber] = useState<number>()
    let [ayahItemOrder , setAyahItemOrder] = useState<number>(0)

    let {data : limitedAyahsData , isLoading : isLoading1 , isFetching : isFetching1  } = useQuery(["limitedSurahAyahsData" , limit] , () => getLimitedAyahs(surahNumber,quranIdentifier,limit) , {
        initialData : () => {
            let lastIndex = queryClient.getQueriesData("limitedSurahAyahsData").length - 1
            let lastCachedData : any[] = queryClient.getQueriesData("limitedSurahAyahsData")
            let prevData : {ayahs : ayah[]} = lastCachedData.length > 0 ? lastCachedData[lastIndex][1] : undefined
            return prevData 
        }
    })

    let {data : totalAyahsData , isLoading : isLoading2} = useQuery("totalSurahAyahsData" , () => getTotalAyahsData(surahNumber,quranIdentifier))
    
    let {data : translatedAyahs , isFetching : isFetching2 } = useQuery(["translatedSurahAyahs" , selectedTransilationIdentifiers , limit] , () => getTranslatedAyahs(surahNumber , selectedTransilationIdentifiers , limit),{
        initialData : () =>{
            let lastIndex = queryClient.getQueriesData("translatedSurahAyahs").length - 1
            let lastCachedData : any[] = queryClient.getQueriesData("translatedSurahAyahs")
            let prevData : {ayahs : ayah[]} = lastCachedData.length > 0 ? lastCachedData[lastIndex][1] : undefined
            return prevData 
        }
    })
    
    let {data : translateIdentifiers } = useQuery("translateIdentifiers",getTranslateIdentifiers) 


    useEffect(() =>{
        let onScroll = () =>{
            const ScrollPx = document.documentElement.scrollTop
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if(ScrollPx == winHeightPx && !isLoading1 && limitedAyahsData?.ayahs.length < totalAyahsData?.ayahs.length){
                return setLimit(prev => prev + 20)
            }
        }
        window.addEventListener("scroll" , onScroll)
        return () =>{
            window.removeEventListener("scroll" , onScroll)
        }
    },[limit,isLoading1,limitedAyahsData,totalAyahsData])


    useEffect(()=>{
        if(ayahItemOrder > limit){
            return  setLimit(ayahItemOrder + 20)
          }
    },[ayahItemOrder])


    if(isLoading1 || isLoading2){
        return <Loading />
    }
    return (
        <>
            <img src={require("../imgs/Cover.jpg")} style = {{
                width : "100vw" , 
                height : "100vh" , 
                position : "fixed" , 
                backgroundSize : "cover",
                imageRendering: '-webkit-optimize-contrast'
            }} />

            <TafsirModel
               tafsirAyahNumber = {tafsirAyahNumber}
               modalOpen = {modalOpen}
               setModalOpen = {setModalOpen}
            />


        <Navbar
        totalAyahsData = {[[`${totalAyahsData?.name}[${totalAyahsData?.englishName}] `, totalAyahsData?.ayahs]]}
        setAyahNumber = {setAyahNumber}
        setAyahItemOrder = {setAyahItemOrder}
        translateIdentifiers = {translateIdentifiers}
        selectedTransilationIdentifiers = {selectedTransilationIdentifiers}
        setSelectedTransilationIdentifiers = {setSelectedTransilationIdentifiers}
        ayahNumber = {ayahNumber}
         />

        <Box sx = {{
            height : `${AppBarHeight}px`,
            p : 2
        }}></Box>


        <Stack direction={"column"}>
            
        {limitedAyahsData?.ayahs.map((ayahData : ayah , ayahIndex : number) =>{
            console.log(limitedAyahsData)
            let surahName = {ar :limitedAyahsData.name , en : limitedAyahsData.englishName}
            let targetAyah = ayahNumber == ayahData.number 
            let translatedAyah = translatedAyahs ?  translatedAyahs.map((item : any) => item.ayahs[ayahIndex]) : []
            let langs = translatedAyahs ? translatedAyahs?.map((item : any) => item.edition.language) : []
            return <Ayah 
            key = {ayahData.number}
            ayahNumber = {ayahData.number}
            ayahNumberinSurah = {ayahData.numberInSurah}
            surahName = {surahName}
            juzNumber = {ayahData.juz}
            isFetching2 = {isFetching2}
            ayahText = {ayahData.text}
            translatedAyahData = {{translatedAyah : translatedAyah,langs : langs}}
            audio = {ayahData.audio}
            setModalOpen = {setModalOpen}
            setTafsirAyahNumber = {setTafsirAyahNumber}
            setTargetAyahNumber = {setAyahNumber}
            targetAyah = {targetAyah}
            />
        })}
          {isFetching1 && <Box p = {1} textAlign={"center"} ><CircularProgress /></Box>}
        </Stack>
       
        </>

    )
}

export default Surah