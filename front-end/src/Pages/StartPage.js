import { useEffect, useState } from "react"
import axios from "../axios/axios"
import Person from "../Components/Person"

const StartPage = () => {
    const [personswithpayment, setPersons] = useState([])
    const [personswithoutpayment, setWithout] = useState([])
    useEffect(()=>{
        async function fetchData() {
            try{
                const response = await axios.get('persons/')
                var witht = []
                var without = []
                response.data.data.map((item)=>{
                    if (item.position.payment>0) {
                        witht.push(item)
                    }
                    else{
                        without.push(item)
                    }
                })
                setPersons(witht)
                setWithout(without)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])


    return (
        <div className="center">
            <div className="display">
                <h2>With Payment</h2>
                {
                    personswithpayment.map((item)=>(
                        <Person person={item}/>
                    ))
                }
                <h2>Without Payment</h2>
                {
                    personswithoutpayment.map((item)=>(
                        <Person person={item}/>
                    ))
                }
            </div>
        </div>
    )
}

export default StartPage