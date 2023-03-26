import { useEffect, useState } from "react"
import axios from "../axios/axios"
import Person from "../Components/Person"

const SearchPage = () => {
    const [persons, setPersons] = useState([])
    const [outP,setOutPersons] = useState([])
    const [withPaym,setWithPaym] = useState(false)
    const [withoutPaym,setWithOutPaym] = useState(false)

    useEffect(()=>{
        async function fetchData() {
            try{
                const response = await axios.get('persons/')
                setPersons(response.data.data)
                setOutPersons(response.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])

    const inputHandler = (e) => {
        var list = []
        if (e.target.value==="") {
            setOutPersons(persons)
            return
        }
        const stext = e.target.value
        var text = ""
        text = stext[0].toUpperCase()
        for (let i = 1; i < stext.length; i++) {
            text+=stext[i]       
        }
        persons.forEach(item => {
            if (item.firstname.includes(text)||item.firstname.includes(stext)) {
                list.push(item)
            }
        });
        setOutPersons(list)
    }

    const checkHandler = (e) => {
        var list = []
        if (withoutPaym) {
            document.querySelector("#without").checked = false
            setWithOutPaym(false)
        }
        if (withPaym) {
            setOutPersons(persons)
            setWithPaym(false)
            return
        }
        else{
            persons.forEach(item=>{
                if (item.position.payment>0) {
                    list.push(item)
                }
            })
            setWithPaym(true)
        }
        setOutPersons(list)
    }

    const checkWithoutHandler = (e) => {
        var list = []
        if (withPaym) {
            document.querySelector("#with").checked = false
            setWithPaym(false)
        }
        if (withoutPaym) {
            setOutPersons(persons)
            setWithOutPaym(false)
            return
        }
        else{
            persons.forEach(item=>{
                if (item.position.payment==0) {
                    list.push(item)
                }
            })
            setWithOutPaym(true)
        }
        setOutPersons(list)
    }

    return (
        <div className="center">
            <div className="display">
            <h1>Search</h1>
            <input className="search" type={"text"} required name="name" onChange={inputHandler} placeholder="Enter name"/>
            <div style={{display:"flex",gap:'1em'}}>
                <label className="checkbox">
                    With Payment
                    <input type="checkbox" id="with"  value={withPaym} onChange={checkHandler}/>
                    <span class="checkmark"></span>
                </label>
                <label className="checkbox">
                    Without Payment
                    <input type="checkbox" id="without" value={withoutPaym} onChange={checkWithoutHandler}/>
                    <span class="checkmark"></span>
                </label>
            </div>
                {
                    outP.map((item)=>(
                        <Person person={item}/>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchPage