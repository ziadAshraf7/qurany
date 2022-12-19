import { Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Components/quran_page_nav"
import { useQuery, useQueryClient } from "react-query"
import { getAllJuzData, getLimitedJuzData, getTranslatedJuzAyahs, getTranslateIdentifiers } from "../Api/Api"
import Ayah from "../Components/Ayah"
import TafsirModel from "../Components/tafsirModal"
import { AppBarHeight } from "../utils/utils"
import Loading from "../Components/loading"
import { ayah } from "../Types/types"





function Juz(){

    const {quranIdentifier , juzNumber} = useParams()
    let [modalOpen , setModalOpen] = useState(false)
    let queryClient = useQueryClient()
    let [tafsirAyahNumber , setTafsirAyahNumber] = useState<number>()
    let [selectedTransilationIdentifiers , setSelectedTransilationIdentifiers] = useState<string[]>([])
    let [limit , setLimit] = useState(20)
    let [ayahNumber , setAyahNumber] = useState<number>()
    let [ayahItemOrder , setAyahItemOrder] = useState<number>(0)
   
    let {data : limitedAyahsData  , isLoading : isLoading1 , isFetching : isFetching1} = useQuery(["limitedJuzAyahsData" , limit] , () => getLimitedJuzData(juzNumber,quranIdentifier,limit),{
        initialData : () => {
            let lastIndex = queryClient.getQueriesData("limitedJuzAyahsData").length - 1
            let lastCachedData : any[] = queryClient.getQueriesData("limitedJuzAyahsData")
            let prevData : {ayahs : ayah[]} = lastCachedData.length > 0 ? lastCachedData[lastIndex][1] : undefined
            return prevData 
        }
    })
   
    let {data : totalAyahsData , isLoading : isLoading2 } = useQuery("totalJuzAyahsData" , () => getAllJuzData(juzNumber,quranIdentifier))
   
    let {data : translatedAyahs , isFetching : isFetching2 } = useQuery(["translatedJuzAyahs" , selectedTransilationIdentifiers , limit] , () => getTranslatedJuzAyahs(juzNumber , selectedTransilationIdentifiers , limit) , {
        initialData : () : any =>{
            let lastIndex = queryClient.getQueriesData("translatedJuzAyahs").length - 1
            let lastCachedData : any[] = queryClient.getQueriesData("translatedJuzAyahs")
            let prevData : {ayahs : ayah[]} = lastCachedData.length > 0 ? lastCachedData[lastIndex][1] : undefined
            return prevData 
        }
    })
    let {data : translateIdentifiers} = useQuery("translateIdentifiers",getTranslateIdentifiers) 


    useEffect(() =>{
        let onScroll = () =>{
            const ScrollPx = document.documentElement.scrollTop
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if(ScrollPx == winHeightPx && !isLoading1 && limitedAyahsData?.ayahs.length < totalAyahsData?.totalAyahsNumber){
                return setLimit(prev => prev + 20)
            }
        }
        window.addEventListener("scroll" , onScroll)
        return () =>{
            window.removeEventListener("scroll" , onScroll)
        }
    },[limit,isLoading1,limitedAyahsData,totalAyahsData])


    useEffect(()=>{
        if(ayahItemOrder  > limit){
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
        totalAyahsData = {totalAyahsData ? totalAyahsData.transformedData : []}
        setAyahNumber = {setAyahNumber}
        setAyahItemOrder = {setAyahItemOrder}
        translateIdentifiers = {translateIdentifiers}
        selectedTransilationIdentifiers = {selectedTransilationIdentifiers}
        setSelectedTransilationIdentifiers = {setSelectedTransilationIdentifiers}
         />

        <Box sx = {{
            height : `${AppBarHeight}px`,
            padding : "10px"
        }}></Box>

        {limitedAyahsData?.ayahs.map((ayahData : ayah , index : number) =>{
            let surahName = {ar :ayahData.surah.name , en : ayahData.surah.englishName}
            let targetAyah = ayahNumber == ayahData.number 
            let translatedAyah = translatedAyahs ?  translatedAyahs.map((item : any) => item.data.data.ayahs[index]) : []
            let langs = translatedAyahs ? translatedAyahs?.map((item : any) => item.data.data.edition.language) : []
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
         {isFetching1 && <Box p = {5} textAlign={"center"} ><CircularProgress size = {40} /></Box>}
        </>
    )
}

export default Juz
