import { SelectChangeEvent } from "@mui/material"


export type surah = {
    englishName: string ,
englishNameTranslation: string ,
name: string,
number: number,
numberOfAyahs: number
}

export type quranReader = {
    identifier : string , name : string
}

export type quranReaderModalProps ={
    quranReaders : any ,
    modalOpen : boolean
    surahNumber : number | undefined
    juzNumber : number | undefined , 
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  }


  export type tafsirModalProps = {
    modalOpen : boolean ,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    tafsirAyahNumber : number | undefined
  }

  export type ayah = {
    audio : string ,
    hizbQuarter : string ,
    manzil : number ,
    number : number ,
    numberInSurah : number ,
    page : number ,
    ruku : number ,
    sajda : boolean ,
    text : string ,
    juz : number ,
    surah : surah
  }


  export type ayahComponentProps = {
    ayahNumber : number ,
    surahName : {ar :string , en : string}
    juzNumber : number ,
    ayahText : string ,
    audio : string ,
    translatedAyahData : any
    ayahNumberinSurah : number ,
    setTargetAyahNumber : React.Dispatch<React.SetStateAction<number | undefined>>,
    targetAyah : boolean,
    setModalOpen :React.Dispatch<React.SetStateAction<boolean>> ,
    setTafsirAyahNumber: React.Dispatch<React.SetStateAction<number | undefined>> ,
    isFetching2 : boolean
}


export type edition = {
    direction : string ,
    englishName : string ,
    format : string ,
    identifier : string ,
    language : string ,
    name : string ,
    type : string
}

export type NavBarComponentProps = {
  totalAyahsData : [string, ayah[]][] 
  setAyahNumber: React.Dispatch<React.SetStateAction<number | undefined>> ,
  setAyahItemOrder :React.Dispatch<React.SetStateAction<number>> , 
  translateIdentifiers : any , 
  selectedTransilationIdentifiers :string[] ,
  setSelectedTransilationIdentifiers :React.Dispatch<React.SetStateAction<string[]>> ,
  ayahNumber? : number | undefined
}