import React from 'react'
const LoaderButton = () => {
    return(
        <div className="loader d-flex justify-content-center text-danger">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default LoaderButton