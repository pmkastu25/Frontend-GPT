import "./Sidebar.css"

function Sidebar() {
    return ( 
        <section className="sidebar">
            {/* New Chat button */}
            <button>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* History */}
            <ul className="history">
                <li>thread1</li>
                <li>thread2</li>
                <li>thread3</li>
            </ul>

            {/* Sign */}
            <div className="sign">
                <p>By Prathamesh &hearts;</p>
            </div>
        </section>
     );
}

export default Sidebar;