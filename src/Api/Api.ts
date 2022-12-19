import axios from "axios";
import { edition } from "../Types/types";


export async function getSurahsData(){
 return  await axios.get("https://api.alquran.cloud/v1/surah").then(res => res.data.data )
}


export async function getQuranReaders(){
    return await axios.get("https://api.alquran.cloud/v1/edition/format/audio" , {
        transformResponse : (data) =>{
            let Data = JSON.parse(data)
            let dataObject = Data.data.reduce((acc : any , item : edition) =>{
                let headerValue = acc[item.language]
                headerValue ? acc[item.language] = [...headerValue , {
                    name : item.name , 
                    identifier : item.identifier , 
                }] : acc[item.language] = [{
                    name : item.name , 
                    identifier : item.identifier , 
                }]
               return acc
            },{})
            return Object.entries(dataObject)
        }
    }).then(res => res.data)
}


export async function getLimitedAyahs(surahNumber: string | undefined , quranIdentifier: string | undefined , limit: number){
    return await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/${quranIdentifier}?offset=0&limit=${limit}`).then(res => res.data.data)
}


export async function getTotalAyahsData(surahNumber: string | undefined , quranIdentifier: string | undefined ){
    return await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/${quranIdentifier}`).then(res => res.data.data)
}


export async function getTranslateIdentifiers(){
    return await axios.get(`https://api.alquran.cloud/v1/edition?&&type=translation` , {
        transformResponse : (data) =>{
            let Data = JSON.parse(data)
            let dataObject = Data.data.reduce((acc : any , item : edition) =>{
                let headerValue = acc[item.language]
                headerValue ? acc[item.language] = [...headerValue , {
                    name : item.name , 
                    identifier : item.identifier , 
                }] : acc[item.language] = [{
                    name : item.name , 
                    identifier : item.identifier , 
                }]
               return acc
            },{})
            console.log(Data)
            return Object.entries(dataObject)
        }
    }).then(res => res.data)
}


export async function getTranslatedAyahs(surahNumber: string | undefined , translateIdentifiers: string[] , limit: number){
    return translateIdentifiers.length > 0 ? await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${translateIdentifiers.join(",")}?offset=0&limit=${limit}`).then(res => res.data.data) :
    false
}


export async function getTafsirEditions(){
    return await axios.get("https://api.alquran.cloud/v1/edition/type/tafsir").then(res => res.data.data)
}



export async function getTafsirData(tafsirIdentifier : string , ayahNumber : number | undefined){
    return tafsirIdentifier !== "" && ayahNumber ?  await axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/${tafsirIdentifier}`).then(res => res.data.data.text) :
    false
}




export async function getLimitedJuzData(juzNumber: string | undefined , quranIdentifier: string | undefined , limit : number){
    return await axios.get(`https://api.alquran.cloud/v1/juz/${juzNumber}/${quranIdentifier}?offset=0&limit=${limit}`).then(res => res.data.data)
}




export async function getAllJuzData(juzNumber: string | undefined  , quranIdentifier: string | undefined ){
    return await axios.get(`https://api.alquran.cloud/v1/juz/${juzNumber}/${quranIdentifier}`,{
        transformResponse : (data) =>{
            let Data = JSON.parse(data)
            let dataObject = Data.data.ayahs.reduce((acc : any , item : any) =>{
                let headerValue = acc[`${item.surah.name}[${item.surah.englishName}]`]
                headerValue ? acc[`${item.surah.name}[${item.surah.englishName}]`] = [...headerValue , item] : acc[`${item.surah.name}[${item.surah.englishName}]`] = [item]
               return acc
            },{})
            return {transformedData : Object.entries(dataObject) , totalAyahsNumber : Data.data.ayahs.length}
        }
    }).then(res => res.data)
}

export async function getTranslatedJuzAyahs(juzNumber: string | undefined , translateIdentifiers: string[] , limit: number){
    return translateIdentifiers.length > 0 ? await axios.all(translateIdentifiers.map(item => axios.get(`https://api.alquran.cloud/v1/juz/${juzNumber}/${item}?offset=0&limit=${limit}`)))
    .then(res => res) :
    false
}


