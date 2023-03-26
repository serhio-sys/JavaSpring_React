import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../axios/axios"

const CreatePersonPage = () => {
    const [positions,setPosition] = useState([])
    const [msg,setMsg] = useState([])
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()
    const [formData,setData] = useState({
        "firstname":"",
        "lastname":"",
        "age":"",
        "email":"",
        "position":"1"
    })

    const inputHandler = (event) =>{
        setData({
          ...formData,
          [event.target.name]:event.target.value
        })
    }

    const sendData = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('persons/',formData)
            if (response.data.msg.body==="success") {
                setSuccess(true)
                setTimeout(()=>{navigate('/')},2000)
            }
            else{
                const msgs = response.data.msg.body.split("|")
                setMsg(msgs)   
            }
        }
        catch(err){
            console.log(err)
        }
        console.log(formData)
    }

    useEffect(()=>{
        async function fetchData() {
            try{
                const response = await axios.get('positions/')
                setPosition(response.data.data)
            }
            catch(err){
                console.log(err)
            }
        }

        fetchData()
    },[])

    return (
        <div className="center">
            <form onSubmit={sendData}>
                {
                    success
                    ?<div className="success">Person Succesfully created!</div>
                    :<div className="messageBox">{msg.map((item)=>(
                        <span>{item}</span>
                    ))}</div>
                }
                <h1>Creation Form</h1>
                <input type={"text"} required name="firstname" onChange={inputHandler} placeholder="Enter firstname"/>
                <input type={"text"} required name="lastname" onChange={inputHandler} placeholder="Enter lastname"/>
                <input type={"text"} required minLength={8} name="email" onChange={inputHandler} placeholder="Enter email"/>
                <input type={"number"} required min={14} max={150} name="age" onChange={inputHandler} placeholder="Enter age"/>
                <select name="position" required onChange={inputHandler} id="cars">
                    {
                        positions.map((item)=>(
                            <option value={String(item.position_id)}>{item.name} - {item.payment}$</option>
                        ))
                    }
                </select>
                <button className="delete-btn create-btn" type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePersonPage
