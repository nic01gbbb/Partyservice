import { app } from './api'
import { CiEdit } from "react-icons/ci";
import React, { useContext, useEffect, useState } from 'react'
import Appcontext from './createcontexxt'
import { GiPreviousButton } from "react-icons/gi";
import { MdDelete } from "react-icons/md";



function Details() {
const {setestado}=useContext(Appcontext)
const {cod,setcod}=useContext(Appcontext)
const {estatedetails,setestatedetails}= useContext(Appcontext)
const [title2,settitle2]=useState("")
const [description2,setdescription2]=useState("")
const [author2,setauthor2]=useState("")
const [budget2,setbudget2]=useState("")
const [image2,setimage2]=useState("")
const [budget3,setbudget3]=useState("")

const [lookservices,setlookservices]=useState(false)



const load=async()=>{
  try{
  const responseParties = await app.get("/parties") 
  setestado(responseParties.data)
  }catch(error){
  console.log(error)
  }  
  }     
  
 

const prevpage=()=>{
setcod(!cod)
setestatedetails([])
} 


const addCash=async(id)=>{
const findId = await app.get(`/parties/${id}`)
const findIdupdate = await app.patch(`/parties/${id}`,{
title:!title2?findId.data.find.title:title2,
description:!description2?findId.data.find.description:description2, 
author:!author2?findId.data.find.author:author2,
budget:!budget3?findId.data.find.budget:Math.round(findId.data.find.budget)+Math.round(budget3),
image:!image2?findId.data.find.image:image2, 
addCash:!findId.data.find.addCash,
services:findId.data.find.services 
})   
const remake = await app.get(`/parties/${id}`)
load()
if(findIdupdate){ 
setestatedetails([remake.data.find])
setbudget3("")  
}
}  

 const onsubmitfun=async(id)=>{
  
  const findIdget = await app.get(`/parties/${id}`)
  const findIdUpdate = await app.patch(`/parties/${id}`,{
  title: findIdget.data.find.title,
  description: findIdget.data.find.description,
  author: findIdget.data.find.author,
  budget: findIdget.data.find.budget, 
  image: findIdget.data.find.image,  
  edit:!findIdget.data.find.edit,
  services:findIdget.data.find.services 
  })      
  const remake = await app.get(`/parties/${id}`)
if(findIdUpdate){
  load()  
  setestatedetails([remake.data.find])
  console.log(findIdget.data.find.edit)
}         
}
const submitfun=(e)=>{ 
  e.preventDefault() 
  }
  const editParty=async(id)=>{
  
  const findId = await app.get(`/parties/${id}`)
  const findIdupdate = await app.patch(`/parties/${id}`,{
  title:!title2?findId.data.find.title:title2,
  description:!description2?findId.data.find.description:description2, 
  author:!author2?findId.data.find.author:author2,
  budget:!budget2?findId.data.find.budget:budget2, 
  edit:!findId.data.find.edit, 
  image:!image2?findId.data.find.image:image2, 
  services:findId.data.find.services 
  })  
  const remake = await app.get(`/parties/${id}`)
  load()
  if(findIdupdate){ 
  setestatedetails([remake.data.find])
  settitle2("")  
  setdescription2("")
  setauthor2("") 
  setbudget2("") 
  setimage2("")  
  }
} 
    
const deleteparty=async(id)=>{
const deleteId = await app.delete(`/parties/${id}`)
if(deleteId){
setestatedetails([])
load()
setcod(!cod)
}

} 
const addCashSub=(e)=>{
e.preventDefault()
}
     
const lookServices=()=>{
setlookservices(!lookservices)
}

return (
  <div 
style={{display:!cod?"none":"flex"}}
className='details' >
<button
className='btn-details'
onClick={prevpage}>
<GiPreviousButton />
</button>
{estatedetails.map((estatedetail)=>(
<div className="details-conteude">
<h1>Festa</h1>
<p><span>Nome:</span>{estatedetail?estatedetail.title:""}</p>
<p><span>Descrição:</span>{estatedetail?estatedetail.description:""}</p> 
<p><span>Author:</span>{estatedetail?estatedetail.author:""}</p>
<p><span>Budget:</span>{estatedetail.budget.toLocaleString("pt-br",{style:"currency",currency:"BRL"})
}  
</p> 
<p><img src={estatedetail?estatedetail.image:""}/></p>

<form onSubmit={addCashSub} className="addCash">
<button onClick={()=>addCash(estatedetail._id)} >Injetar dinheiro</button>
<input 
style={{display:!estatedetail.addCash?"none":"flex"}}
placeholder="Adicione mais dinheiro"
value={budget3} onChange={(e)=>setbudget3(e.target.value)} type="number" />
</form> 


<button  
className="editParty"
onClick={()=>onsubmitfun(estatedetail._id)}><CiEdit/></button>

<form  
className="formEdit" 
style={{display:estatedetail.edit?"none":"flex"
}}
onSubmit={submitfun}>  
<input value={title2}onChange={(e)=>settitle2(e.target.value)}  placeholder="Digite seu nome atual"  type="text" />
<input value={description2}onChange={(e)=>setdescription2(e.target.value)}   placeholder="Digite sua descrição atual"  type= "text" />
<input value={author2} onChange={(e)=>setauthor2(e.target.value)}   placeholder="Digite seu author atual"  type="text" />
<input value={budget2
} onChange={(e)=>setbudget2(e.target.value)}   placeholder="Digite seu orçamento atual"  type="number" />
<input value={image2} onChange={(e)=>setimage2(e.target.value)}   placeholder="Coloque o link da sua imagem atual" type="text" />
<button onClick={()=>editParty(estatedetail._id)}  className="editParty" >
Editar
</button>
</form>



<button
className="btndelete"
onClick={()=>deleteparty(estatedetail._id)} >
<MdDelete />
</button>
<button
className='showservices'
onClick={lookServices}
>
{estatedetail.services==""?"Sem serviços":
!lookservices?"Mostrar serviços da festa"
: "Ocultar serviços da festa"}
</button>


{estatedetail.services.map((services)=>(
<div 
style={{display:!lookservices?"none":"flex"}}  
className="details-conteude">
<h1>Serviço</h1>
<p>Name:<span className='serviceapi' >{services.name} </span></p> 
<p>Description:<span className='descriptionspan' >{services.description} </span></p> 
<p>Price:<span className='serviceapi' >{services.price
.toLocaleString("pt-br",{style:"currency",currency:"BRL"})

}</span></p> 
<p>Status:<span className='serviceapi' >{!services.status?"Inativo":"Ativo"}</span></p> 

<p ><span> <img className='imgService' src={services.image}/></span></p> 
</div>


))}

</div>


))}


</div>
  )
}

export default Details
