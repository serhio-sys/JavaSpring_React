import NavBar from "./NavBar"


const CustomRouter = (props) => {
    return(
        <>
            <NavBar/>
            {props.children}
        </>
    )
}

export default CustomRouter