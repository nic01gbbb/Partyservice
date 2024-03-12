import React, {useContext, useEffect} from 'react'
import Appcontex from "./createcontexxt";
import { app } from "./api";

export function Base() {

const {estado,setestado,cod,setcod}=useContext(Appcontex)
const {ser,setser}=useContext(Appcontex)
const {cadastre,setcadastre}=useContext(Appcontex)
const {setestatedetails,setservices}= useContext(Appcontex)


 

const loadservice=async()=>{
const response = await app.get("/service")
setservices(response.data)
}
  

const loadtrue=async()=>{
  const getAll = await app.get("/service")
  const updateAll = await app.patch("/service",{
  name:getAll.data.name,
  description:getAll.data.description,
  price: getAll.data.price, 
  status:true
  })
  loadservice()
  return updateAll  
  }



  
const load=async()=>{
try{
const responseParties = await app.get("/parties") 
setestado(responseParties.data)
}catch(error){
console.log(error)
}  
}    

const details=async(id)=>{
const findParty = await app.get(`/parties/${id}`)
setestatedetails( (allestate)=>[...allestate,findParty.data.find])
setcod(!cod)

}
const cadastrePag=()=>{ 
loadtrue()
setcadastre(!cadastre)
setser(!ser)
}
  
useEffect(()=>{ 
load()

},[])    
 

 
return ( 
  
<div 
style={{display:cod?"none":"flex"}}
className="">
<div className="maxwall" 
style={{display:!cadastre?"flex":"none"
}}> 

<header>
<h1>Party Time</h1>
<div className="header-controller" >
<h4>Minhas festas </h4>
<button onClick={cadastrePag} >Criar festa</button>
</div>
</header>
<h1 
style={{display:cadastre?"none":"flex"}}
className="myParty" >Minhas festas</h1>
<div 
className="wall"> 


<div className="grid">
{estado.map((est,posi)=>(
<div key={posi}className="conteude">
<button className='btnDetails'
onClick={()=>details(est._id)} >Detalhes</button>
<h1 className="pariesdown"  >Festa</h1>
<p><span>Nome:</span>{est.title}</p>
<p><span>Descrição:</span>{est.description}</p> 
<p><span>Author:</span>{est.author}</p>
<p><span>Budget:</span>{est.budget.toLocaleString("pt-br",{style:"currency",currency:"BRL"})}</p> 
<p>Image:<img src={est.image} /></p>
<div 
style={{display:!cod?"none":"flex"}}
className="ServicesAll">
<h1 className="servicesdown" >Services</h1>
{est.services.map((service)=>(
<div  
style={{opacity:!service.hiden?"1":"0"}}
className="conteudeserviceonparty">
<p>Nome:<span>{service.name}</span></p>
<p className="description" >Descrição:<span>{service.description}</span></p>
<p>Preço:<span>{service.price? service.price
.toLocaleString("pt-br",{style:"currency",currency:"BRL"})
:""
}</span></p>
<p>Status:<span>{service.status?"Ativo":"Inativo"}</span></p>
<p><img src={service.image}  /> </p>
</div>


))}

</div>
</div>   

))}
</div>
</div>
 
</div>
</div>
  )
}




