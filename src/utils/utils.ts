import { Link } from "react-scroll"



export const AppBarHeight = 75



export function handleScrollTo(e : React.MouseEvent<HTMLLIElement> ,ayahNumber : number){
    let reference = new Link({
      to : `section${ayahNumber}` ,
      smooth : true , 
      spy : true , 
      duration : 500
    })

    return (reference as unknown as {handleClick : (e : React.MouseEvent<HTMLLIElement>) => void}).handleClick(e)
  }


