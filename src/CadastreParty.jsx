import React, { useContext,useEffect,useState } from 'react'
import Appcontext from './createcontexxt'
import { app } from './api'
function CadastreParty() {

 
const {setestado,cadastre,setcadastre}=useContext(Appcontext)
const {title,settitle,description,setdescription,author,setauthor,
budget,setbudget,image,setimage}=useContext(Appcontext) 
const {createservice,setcreateservice}=useContext(Appcontext)

const {message,setservices}=useContext(Appcontext)
const {nameService,setnameService}=useContext(Appcontext)
const {descriptionService,setdescriptionService}=useContext(Appcontext)
const {priceService,setpriceService}=useContext(Appcontext)
const {imageService,setimageService}=useContext(Appcontext)



const loadservice=async()=>{
  const response = await app.get("/service")
  setservices(response.data)
  }
  



const createService=async(e)=>{
e.preventDefault()
if(nameService,descriptionService,priceService,imageService){
const createService = await app.post("service",{
name:nameService,
description:descriptionService,
price:priceService,
image:imageService,
status:true
})
loadservice()

}


}


const cadastreparty=async(e)=>{
e.preventDefault()
const data = await app.post("/parties",{
title:title, 
description:description,
author:author,   
budget:budget,    
image:image,
services:[]
})  
        
load() 
}    
  
const load=async()=>{
try{
const responseParties = await app.get("/parties") 
setestado(responseParties.data)
}catch(error){
console.log(error)
} 
}     
  
useEffect(()=>{
load()

},[])
  
return (
<div className='cadastreParty'
style={{display:cadastre?"flex":"none" || createservice?"none":"flex"}}>


<div className="divForms">
<form onSubmit={cadastreparty}  className='form formParty'>
<h1 className='createPartyA' >Criar festas</h1>
<input className='name' value={title} onChange={(e)=>settitle(e.target.value)}  placeholder='Adicone o nome da festa' type="text" />
<input className='description' value={description} onChange={(e)=>setdescription(e.target.value)}  placeholder='Adicione a descrição da festa' type="text" />
<input className='author' value={author} onChange={(e)=>setauthor(e.target.value)}   placeholder='Adicione o author da festa' type="text" />
<input className='budget'value={budget
.toLocaleString("pt-bt",{style:"currency",currency:"BRL"})


}onChange={(e)=>setbudget(e.target.value)}      placeholder='  Adicione o orçamento da festa' type="number" />
<input  className='imageParty' value={image} onChange={(e)=>setimage(e.target.value)}   placeholder='Adicione o link da imagem da festa' type="text" />
</form>

<form  className='form createServicepag'>
<a className='createServiceA'  >Criar Serviço(opcional)</a>
<input className='name' value={nameService} onChange={(e)=>setnameService(e.target.value)}  placeholder='Adicione o nome do serviço' type="text" />
<input className='description' value={descriptionService} onChange={(e)=>setdescriptionService(e.target.value)}  placeholder='Adicione a descrição do serviço' type="text" />
<input className='price' value={priceService} onChange={(e)=>setpriceService(e.target.value)}   placeholder='Adicione o preço do serviço' type="number" />
<input  className='imageParty' value={imageService} onChange={(e)=>setimageService(e.target.value)}   placeholder='Link para a imagem do serviço' type="text" />
<div className="createServicediv">
<button 
onClick={createService}
className='createService' >Concluir</button>
</div>
</form>


</div>





</div>

 
 
  )
}

export default CadastreParty












