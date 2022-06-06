import React from 'react';
import './other.css'

function Other(props: any) {
    const logOut = () => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('data');
        localStorage.removeItem('configId');
        props.setLoggedIn(false);
    }

    return (
        <div className="header-item header-other">
            <div className="header-text"><div className='ico ico-other'></div> Other</div>
            <div className="other-content">
                <div className="other-buttons">
                    <button onClick={logOut}>Log Out</button>
                    <button onClick={() => props.setNightScheme(!props.nightScheme)}>{props.nightScheme ? "☀️" : "🌑"}</button>
                </div>
            </div>
        </div>
    );
}

export default Other;