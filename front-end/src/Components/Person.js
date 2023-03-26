import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "../axios/axios"

const Person = (props) => {

    const [deleted,setDeleted] = useState(false)

    const DeleteClick = async () => {
        try{
            const response = await axios.delete(`persons/${props.person.id}/`)
            setDeleted(true)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        deleted
        ?
        <></>
        :
        <div className="person">
            <span className="person-name">
                <div>{props.person.firstname}</div>
                <div>{props.person.lastname}</div>
            </span>
            <span className="person-email">
                <div>Email</div>
                <div>{props.person.email}</div>
            </span>
            <span className="person-email">
                <div>Age</div>
                {
                    props.person.age>30
                    ?<div style={{color:"brown"}}>{props.person.age}</div>
                    :<div style={{color:"green"}}>{props.person.age}</div>
                }
            </span>
            <span className="person-email">
                <div>Position</div>
                <div>{props.person.position.name}</div>
            </span>
            {
                props.person.position.payment>0
                ?
                <span className="person-email">
                    <div>Payment</div>
                    <div style={{color:"yellowgreen"}}>{props.person.position.payment}$</div>
                </span>
                :<></>
            }
            <div>    
                <button className="btn"><Link to={`/persons/${props.person.id}/`}>View Detail</Link></button>
                <button className="delete-btn" onClick={DeleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default Person