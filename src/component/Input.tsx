import React from "react";
import {CSSProperties} from "react";
import {TextField} from "@mui/material";


type input={
    type:"text";
    style?:CSSProperties;
    value:string;
}

const Input=(prop:input)=>{
    return (
      <TextField variant="filled" value={prop.value}/>
    );
};

export default Input;