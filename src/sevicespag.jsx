import { app } from './api';
import Formatationcash from './fomatation';
import React, { createContext,useContext,useEffect,useState } from 'react'
import { FaArrowAltCircleDown } from "react-icons/fa"
import Appcontext from './createcontexxt'
import { MdDelete } from "react-icons/md";
import { GiPreviousButton } from "react-icons/gi";
export  function Servicespage(){

const {createservice,setcreateservice}=useContext(Appcontext)
const {ser,setser,setestado}=useContext(Appcontext)
const {services,setservices}=useContext(Appcontext)

const {nameService,setnameService}=useContext(Appcontext)
const {descriptionService,setdescriptionService}=useContext(Appcontext)
const {priceService,setpriceService}=useContext(Appcontext)
const {imageService,setimageService}=useContext(Appcontext)

const {settitle,title,setdescription,description,setauthor,author,setbudget,budget,
setimage,image,cadastre,setcadastre}=useContext(Appcontext) 
const [boxService,setboxService]=useState([])
const{message,setmessage}=useContext(Appcontext)

 
const load=async()=>{
  try{
  const responseParties = await app.get("/parties") 
  setestado(responseParties.data)
  }catch(error){
  console.log(error)
  }
  }     

const prevpag=()=>{
setcadastre(!cadastre)
setnameService("")
setdescriptionService("")
setpriceService("")
setimageService("")
setmessage("")
setboxService("")
setauthor("")
setdescription("")
settitle("")
setauthor("")
setbudget("")
setimage("")
}
 
const deleteService=async(id)=>{
const findId = await app.delete(`/service/${id}`)
loadservice() 
return findId
}  
 
   
const addParty=async(id)=>{
const ServiceId = await app.get(`/service/${id}`)
const ServiceIdupdate = await app.patch(`/service/${id}`,{
name: ServiceId.data.name,
description:ServiceId.data.description,
price:ServiceId.data.price,
status:!ServiceId.data.status,
image:ServiceId.data.image
}) 
if(ServiceId.data.status==true){
setboxService((allestado)=>[...allestado,ServiceId.data])
loadservice()
}
else {
const filter = boxService.filter((res)=>(
res._id===id?null:res
))
setboxService(filter)
loadservice()
return filter 
} 
}


const concluide=async()=>{
  
  if(title,description,author,budget,image,services){
  const box = boxService.reduce((wallet,service)=>wallet+service.price,0)
  if(budget < box){
   if(boxService.length<2){
   setmessage(`O orçamento da festa está acima do preço do serviço,orçamento da festa:${
  budget},preço do serviço:${(box
  .toLocaleString("pt-br",{style:"currency",currency:"BRL"})
    
    )}`)
   return;  
   }  
   else if(boxService.length>1){
  setmessage(`O orçamento da festa está acima do preço do serviço,orçamento da festa:${budget
  .toLocaleString("pt-br",{style:"currency",currency:"BRL"})
  },preço dos serviços:${box.toLocaleString("pt-br",{
  style:"currency",currency:"BRL"
  })}`)
   message.focus()
   return;
   }   
  } 
  
  const createParty = await app.post("/parties",{
  title:title, 
  description:description,
  author:author,   
  budget:budget,     
  image:image, 
  addCash:true,
  edit:true,
  services:boxService
})
}
settitle("")
setdescription("")
setauthor("")
setbudget("")
setimage()
setmessage("")
setcadastre(!cadastre) 
setser(!ser)
load() 
    
}
  



const loadservice=async()=>{
const response = await app.get("/service")
setservices(response.data)
}


useEffect(()=>{
loadservice()
},[]) 


return (
<div className="">
<div 

style={{display:!cadastre?"none":"flex" && createservice?"none":"flex"
}}
className="maxService">


<button onClick={prevpag}
className='prev'
><GiPreviousButton />
  </button>


<div className="servicepage">

<header className='headerService' >
<h1 
style={{display:services.length<1?"none":"flex"}}className='h1Service' >
<p className='ctx' >Serviços criados<FaArrowAltCircleDown /></p>
<p className='servicepageP' >Adicionados:{boxService.length}</p>
</h1>
</header>

<div className="max-conteudeService">


{services.map((service,posi)=>( 
<div   
style={{
boxShadow:
!service.status?"1px 4px 10px rgba(0,0,0,0.8)":""
}}
key={posi}
className="conteudeService"> 
<div  
style={{opacity:service.status?"1":"0.2"
}}
className="conteudoService-mine"
>
<p>Name:<span className='serviceapi' >{service.name} </span></p> 
<p> Description:<span className='descriptionspan' >{service.description} </span></p>
<p>Price:<span className='serviceapi' >{service.price
.toLocaleString("pt-br",{style:"currency",currency:"BRL"})

}</span></p> 
<p>Status:<span className='serviceapi' >{!service.status?"Inativo":"Ativo"}</span></p> 

<p ><span> <img className='imgService' src={service.image}/></span></p> 
<button 
onClick={()=>deleteService(service._id)}  
className='delbtnService' ><MdDelete />
</button>
<button onClick={()=>addParty(service._id)} className='addParty' >Adicionar a festa</button>
</div>
</div> 
))}
</div>
</div>
<button
className="conclude"  
onClick={concluide}>Concluir cadastro</button>
<a 
style={{display:message!==""?"flex":"none"}}
className='mesage' >{message
.toLocaleString("pt-br",{style:"currency",currency:"BRL"})

}</a>


</div>
</div>
  )
}


