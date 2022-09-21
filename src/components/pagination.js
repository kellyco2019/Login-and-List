import React from "react";

const Pagination = ({increment ,decrement }) => {
    
    
    return (
        <> 
        
        <button onClick={decrement}>Anterior</button>
        <button onClick={increment}>Siguiente</button>
        </>       
    )
}

export default Pagination 