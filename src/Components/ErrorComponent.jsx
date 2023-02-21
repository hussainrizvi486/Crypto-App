import React from 'react'

const errorComponent = ({ message }) => {
    return (
        <main className='error-pg-main'>
            <div className="error-box">
                <img src="https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png" alt="" />
                <p>{message}</p>
            </div>
        </main>
    )
}

export default errorComponent