import React from "react";
import {Button} from "@mui/material";
import {CSSProperties} from "react";
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddIcon from '@mui/icons-material/Add';

import Mines from "./Icon/Mines";
import Division from "./Icon/Division";


type customButton={
    type:"BUTTON" | "BackspaceSharpIcon" | 'ClearRoundedIcon' | 'Add' | 'Sub' | 'Division';
    text:string;
    style?:CSSProperties;
    click:(event:React.MouseEvent<HTMLButtonElement>)=>void;
    dataId:string;
}

const CustomButton=(prop:customButton)=>{
    let shape:React.ReactNode | null=null;

          if(prop.type === "BackspaceSharpIcon")
            shape=<BackspaceSharpIcon/>

        else if(prop.type === "ClearRoundedIcon")
             shape=<ClearRoundedIcon/>

        else if(prop.type === "Add")
             shape=<AddIcon/>

        else if(prop.type === "Sub")
             shape=<Mines/>

        else if(prop.type === "Division")
             shape=<Division/>

         return (
             <Button
                 variant="contained"
                 color="primary"
                 sx={{borderRadius:50}}
                 style={{...prop.style}}
                 onClick={prop.click}
                 data-id={prop.dataId}
             >{prop.text}{shape}</Button>
         );
};

export default CustomButton;