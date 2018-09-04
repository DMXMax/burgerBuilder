import React from 'react';
import classes from './BuildControl.css';


const buildControl = (props)=>{
    return (
        <div className={classes.BuildControl}>
            <div className={classes.label}>{props.label}
            <button className={classes.Less} disabled={props.disabled} onClick={props.removed}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
            </div>
        </div>
    )

}

export default buildControl;