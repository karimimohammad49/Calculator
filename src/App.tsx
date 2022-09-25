import React, {useCallback, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

import Input from "./component/Input";
import CustomButton from "./component/Button";

import './App.css';


const styles=makeStyles({
    mainDiv:{
        width:400,
        margin:'20px auto',
        padding:10,
        backgroundColor:'greenyellow'
    },
    result:{
        width:370,
        margin:'10px auto',
        '& input':{
            width:'100%',
            height:20,
            // padding:30,
            fontSize:28
        }
    },
    btn:{
        margin:'10px 0',
        display:"flex",
        justifyContent:"space-between",
        '& button':{
            fontSize:20
        }
    }
});

let buffer=0;

let type:string | null=null;

let flag=false;

function App() {
    const classes = styles();

    const [input,setInput]=useState("0");

    const operation=useCallback((value:string)=>{
        switch (value){
            case 'AC':
                setInput("0");
                buffer=0;
                break;

            case 'Back':
                let deletedData=input;
                deletedData=deletedData.slice(0,-1)
                setInput(deletedData || "0");
                break;

            case '+/-':
                const navigate=0-(+input);
                setInput(navigate.toString());
                break;

            case '%':
                if(input === '0')
                {
                    return;
                }
                setInput(prevState => `${+prevState/100}`);
                break;

            case '+':
                if(buffer === 0)
                {
                    buffer = (+input);
                    type="+";
                }
                else
                {
                    buffer += (+input);
                    type=null;
                }
                setInput("");
                flag=false;
                break;

            case '*':
                if(buffer === 0)
                {
                    buffer = (+input);
                    type="*";
                }
                else
                {
                    buffer *= (+input);
                    type=null;
                }
                setInput("");
                flag=false;
                break;

            case '-':
                if(buffer === 0)
                {
                    buffer = (+input);
                    type="-";
                }
                else
                {
                    buffer -= (+input);
                    type=null;
                }
                setInput("");
                flag=false;
                break;

            case '/':
                if(buffer === 0)
                {
                    buffer = (+input);
                    type="/";
                }
                else
                {
                    buffer /= (+input);
                    type=null;
                }
                setInput("");
                flag=false;
                break;

            case '.':
                if(!input.includes('.'))
                    setInput(prevState => `${prevState}.`)
                break;

            case '=':
                if(!flag) {
                    if (type === '+')
                        buffer += (+input);

                    else if (type === '-')
                        buffer -= (+input);

                    else if (type === '*')
                        buffer *= (+input);

                    else if (type === '/')
                        buffer /= (+input);

                    setInput(buffer.toString());
                    buffer = 0;
                    flag=true;
                    break;
                }
                break;
            default:

                if(value){
                    setInput( prev=>{
                        if(prev === "0")
                            return value;
                        else
                            return prev + value;
                    });
                }

        }
    },[input,buffer,type]);

    const clickButton=(event:React.MouseEvent<HTMLButtonElement>)=>{
        const value=event.currentTarget!.getAttribute('data-id');
        if(value)
        operation(value as string);
    }


    return (<Box component="div" className={classes.mainDiv}>
        <Box component="div" className={classes.result}>
            <Input type="text" value={input}/>
        </Box>
        <Box component="div" className={classes.btn}>
            <CustomButton dataId="AC" type="BUTTON" text="AC"  click={clickButton} style={{color:'red'}}/>
            <CustomButton dataId="Back" type="BackspaceSharpIcon" text="" click={clickButton} style={{color:'red'}}/>
            <CustomButton dataId="+/-" type="BUTTON" text="+/-" click={clickButton}  style={{color:'olive'}}/>
            <CustomButton dataId="%" type="BUTTON" text="%"   click={clickButton}  style={{color:'olive'}}/>
        </Box>
        <Box component="div"  className={classes.btn}>
            <CustomButton dataId="7" type="BUTTON" text="7" click={clickButton}/>
            <CustomButton dataId="8" type="BUTTON" text="8" click={clickButton}/>
            <CustomButton dataId="9" type="BUTTON" text="9" click={clickButton}/>
            <CustomButton dataId="+" type="Add" text="" click={clickButton}  style={{color:'black'}}/>
        </Box>
        <Box component="div"  className={classes.btn}>
            <CustomButton dataId="4" type="BUTTON" text="4" click={clickButton}/>
            <CustomButton dataId="5" type="BUTTON" text="5" click={clickButton}/>
            <CustomButton dataId="6" type="BUTTON" text="6" click={clickButton}/>
            <CustomButton dataId="-" type="Sub" text="" click={clickButton}  style={{color:'black'}}/>
        </Box>
        <Box component="div"  className={classes.btn}>
            <CustomButton dataId="1" type="BUTTON" text="1" click={clickButton}/>
            <CustomButton dataId="2" type="BUTTON" text="2" click={clickButton}/>
            <CustomButton dataId="3" type="BUTTON" text="3" click={clickButton}/>
            <CustomButton dataId="*" type="ClearRoundedIcon" text="" click={clickButton}  style={{color:'black'}}/>
        </Box>
        <Box component="div"  className={classes.btn}>
            <CustomButton dataId="0" type="BUTTON" text="0" click={clickButton}/>
            <CustomButton dataId="." type="BUTTON" text="." click={clickButton}/>
            <CustomButton dataId="=" type="BUTTON" text="=" click={clickButton}  style={{color:'black'}}/>
            <CustomButton dataId="/" type="Division" text="" click={clickButton}  style={{color:'black'}}/>
        </Box>
    </Box>);
}

export default App;