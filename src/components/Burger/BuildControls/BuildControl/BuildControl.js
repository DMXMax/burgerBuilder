import React from 'react';

const buildControl = (props)=>{
    return (
        <div>
            <div>{props.label}
            <button>Less</button>
            <button>More</button>
            </div>
        </div>
    )

}

export default buildControl;