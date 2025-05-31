import React, {useState} from 'react';
import "../../app/styles/userprofile/status.scss"
const Status = () => {
    const [isActive,setActive] = useState("first")
    const handleClick = (status)=> {
        setActive(status)
    }
    return (
        <div className="status-container">
            <h2 className="head-text">Статус заказов</h2>
            <hr className="divider" />
            <div className="main-content-status">


            <div className="button-section">
                <button
                    className={`status-button first ${isActive === "first" ? "active" : ""}`}
                    onClick={() => handleClick("first")}
                >
                    В процессе
                </button>
                <button
                    className={`status-button first ${isActive === "second" ? "active" : ""}`}
                    onClick={() => handleClick("second")}
                >
                    Завершенные
                </button>
            </div>

        </div>

        </div>
    );
};

export default Status;