import "./ChatWindow.css"
import Chat from "./Chat";

function ChatWindow() {
    return ( 
    <div className="chatWindow">
        <div className="navBar">
            <span>SigmaGPT <i class="fa-solid fa-chevron-down"></i></span>
            <div className="userIconDiv">
                <span className="userIcon"><i class="fa-solid fa-user"></i></span>
            </div>
        </div>
        <Chat></Chat>
        <div className="chatInput">
            <div className="inputBox">
                <input placeholder="Ask anything"/>
                <div id="submit">
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
            </div>
            <p className="info">
                SigmaGPT can make mistakes. Check important info.  
            </p>
        </div>
    </div> 
    );
}

export default ChatWindow;