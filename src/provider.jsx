import propTypes, { number } from "prop-types"
import React, { useState } from 'react'
import Appcontex from "./createcontexxt"
import axios from "axios"



function Provider({children}){

const [services,setservices]=useState([])
const [estatedetails,setestatedetails]=useState([])  
const [cod,setcod]=useState(false)
const [cadastre,setcadastre]=useState(false)
const [ser,setser]=useState(true)   
const [estado,setestado]=useState([])
const [title,settitle]=useState()
const [description,setdescription]=useState("")
const [author,setauthor]=useState("") 
const [budget,setbudget]=useState("")
const [image,setimage]=useState("") 

const [nameService,setnameService]=useState("")
const [descriptionService,setdescriptionService]=useState("")
const [priceService,setpriceService]=useState("")
const [imageService,setimageService]=useState("")

const [createservice,setcreateservice]=useState(false) 
const [message,setmessage]=useState("")


const app =  axios.create({
baseURL:"http://localhost:3000/api"
})
  
const valores ={
nameService,
setnameService,
descriptionService,
setdescriptionService,
priceService,
setpriceService,
setimageService,
imageService,
message,
setmessage,
services,
setservices,
createservice,
setcreateservice,
estatedetails,
setestatedetails,
cod,
setcod,
cadastre,
setcadastre,
app,
setser,
ser,
setestado,
estado,
title,
settitle,
description,
setdescription,
author,
setauthor,
budget,
setbudget,
image,
setimage,
}  
  
return (
 <div className="">
<Appcontex.Provider value={valores}>
{children}
</Appcontex.Provider>

</div> 


) 
}
export default Provider
Provider.propTypes={
children:propTypes.any
}.isRequired
