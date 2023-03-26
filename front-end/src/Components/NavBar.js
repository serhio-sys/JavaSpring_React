import {Link} from 'react-router-dom'

const NavBar = () => {
    return(
        <nav className="navbar">
            <div className="Logo"><Link to={'/'}>Person App</Link></div>
            <div className="search-btn"><Link to={"/search/"}>Search</Link></div>
            <div style={{display:"flex"}}>
                <div><Link className="btn" to={"/create-person/"}>Create Person</Link></div>
                <div><Link className="btn" to={"/create-position/"}>Create Position</Link></div>
            </div>
        </nav>
    )
}

export default NavBar