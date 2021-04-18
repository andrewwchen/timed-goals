import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { goalFinished } from '../redux/actions';

const ListItem = (props) => {
    const dispatch = useDispatch();
    const completeGoal = () => {
        dispatch(goalFinished(props.id))
    }
    console.log(props.complete)
    return (
        <div className="list-item"> 
            <div className="item-check" onClick={completeGoal}>
                {(props.complete) ? (<img className = "item-check-image" src="static/check.png" />) : ""} 
            </div>
            <div className="item-info">
                <div className="item-title">{props.title}</div>
                <div className="item-time">{props.time}</div>
            </div>
        </div>
    );
};

export default ListItem;