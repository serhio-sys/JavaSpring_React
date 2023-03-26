import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../axios/axios"

const PersonDetailView = () => {
    const id = useParams().pk
    const [person,setPerson] = useState({})
    const [loading,setLoading] = useState(true)
    const [changed, setChenged] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg,setMsg] = useState([])
    const [nameData,setNameData] = useState({
        "firstname":"",
        "lastname":"",
        "age":"",
        "email":""
    })

    useEffect(()=>{
        async function fetchPerson() {
            try{
                const response = await axios.get(`persons/${id}/`)
                setNameData({firstname:response.data.data.firstname,lastname:response.data.data.lastname,email:response.data.data.email,age:response.data.data.age})
                setPerson(response.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchPerson()
        setLoading(false)
    },[])

    const saveData = async () => {
        var newData = {}
        for (var key in nameData) {
            if (person[key]!=nameData[key]) {
                newData[key] = nameData[key]
            } 
        }
        
        try{
            const response = await axios.patch(`persons/${id}/`,newData)
            if (response.data==="success") {
                setSuccess(true)
                setTimeout(()=>{
                    window.location.reload()
                },1500)   
            }
            else{
                const msgs = response.data.split("|")
                setMsg(msgs)   
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const inputHandler = (e) => {
        setNameData({
            ...nameData,
            [e.target.name]:e.target.value
          })
        if (person[e.target.name]!==e.target.value){
            setChenged(true)
        }
    }

    return(
        !loading
        ?
            person.firstname
            ?
            <div className="center">
                <div className="display">
                    {
                        success
                        ?<div className="success">Succesfully updated!</div>
                        :<div className="messageBox">{msg.map((item)=>(
                            <span>{item}</span>
                        ))}</div>
                    }
                    <div style={{display:"flex",justifyContent:"space-evenly",width:"100%"}}>
                        <div className="block">
                            <div className="flex">Firstname: <div><input className="patchinput" type={'text'} name="firstname" onChange={inputHandler} placeholder="Enter new firstname" value={nameData.firstname}/></div></div>
                            <div className="flex">Lastname: <div><input className="patchinput" type={'text'} name="lastname" onChange={inputHandler} placeholder="Enter new lastname" value={nameData.lastname}/></div></div>
                        </div>
                        <div className="block">
                            <div style={{fontSize:"1.2em",fontWeight:"600"}}>Position</div>
                            <div>{person.position.name}</div>
                            {
                                person.position.payment>0
                                ?<div>Payment: {person.position.payment}</div>
                                :<div>Don`t have payment</div>
                            }
                        </div>
                    </div>
                    <div className="flex" style={{fontSize:"1.2em",fontWeight:"600"}}>Age: <div style={{width:"50px"}}><input style={{display:"block",width:"100%"}} min={14} max={150} className="patchinput email" type={'number'} name="age" onChange={inputHandler} placeholder="Enter new age" value={nameData.age}/></div> Years Old</div>
                    <div>Email: <input className="patchinput email" type={'email'} name="email" onChange={inputHandler} placeholder="Enter new lastname" value={nameData.email}/></div>
                    {
                        changed
                        ?<button style={{marginTop:"1em"}} className="delete-btn" onClick={saveData}>Save</button>
                        :<></>
                    }
                </div>
            </div>
            :<></>
        :
        <h1>:oading...</h1>
    )
}

export default PersonDetailView