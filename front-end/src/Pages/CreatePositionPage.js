import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../axios/axios"

const CreatePositionPage = () => {
    const [msg,setMsg] = useState([])
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()
    const [formData,setData] = useState({
        "name":"",
        "payment":0
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
            const response = await axios.post('positions/',formData)
            if (response.data.msg==="success") {
                setSuccess(true)
                setTimeout(()=>{navigate('/')},2000)
            }
            else{
                setMsg("Creating error")   
            }
        }
        catch(err){
            console.log(err)
        }
        console.log(formData)
    }

    return (
        <div className="center">
            <form onSubmit={sendData}>
                {
                    success
                    ?<div className="success">Position Succesfully created!</div>
                    :<div className="messageBox">{msg}</div>
                }
                <h1>Creation Form</h1>
                <input type={"text"} required name="name" onChange={inputHandler} placeholder="Enter name"/>
                <input type="number" required name="payment" onChange={inputHandler} placeholder="Enter payment"/>
                <button className="delete-btn create-btn" type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePositionPage
