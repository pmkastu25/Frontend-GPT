import "./Sidebar.css"
import { useContext, useEffect } from "react";
import { MyContext } from "./myContext";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId} = useContext(MyContext);

    const getAllThreads = async() => {
        try{
            const response = await fetch("http://localhost:8080/api/threads");

            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));

            console.log(filteredData);
            setAllThreads(filteredData);
            //ThreadId, title
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllThreads();
    }, [currThreadId])
    return ( 
        <section className="sidebar">
            {/* New Chat button */}
            <button>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* History */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}>{thread.title}</li>
                    ))
                }
            </ul>

            {/* Sign */}
            <div className="sign">
                <p>By Prathamesh &hearts;</p>
            </div>
        </section>
     );
}

export default Sidebar;