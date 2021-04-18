import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goalFinished, goalDeleted } from '../redux/actions';
import { timeConverter } from '../goalfunctionality'

const ListItem = (props) => {
    const dispatch = useDispatch();
    const goal = useSelector(state => state.goals[props.id])
    let [goalInfo,editGoal] = useState(goal)
    let [deleteActive, toggleDelete] = useState(false)
    let endTime = goalInfo.duration*1000+goalInfo.time;
    
    const completeGoal = () => {
        // need to change completed status here manually instead of updating automatically thru redux, change in future
        editGoal({...goalInfo, complete:!goalInfo.complete})
        vscode.postMessage({
            command: 'completeTimedGoal',
            payload: {
                id:props.id
            }
        })
    }
    const deleteGoal = () =>{
        vscode.postMessage({
            command: 'deleteTimedGoal',
            payload: {
                id:props.id
            }
        })
    }
    let remainingTime=timeConverter(endTime - props.currentTime) + " remaining"
    if (remainingTime!="Time's Up!" && (endTime - props.currentTime) < 0) {
        remainingTime="Time's Up!"
        if (endTime + 60000 < props.currentTime) deleteGoal()
    }
    return (
        <div className="list-item" onMouseEnter={()=>{toggleDelete(true)}} onMouseLeave={()=>{toggleDelete(false)}}> 
            <div className="item-check" onClick={completeGoal}>
                {(goalInfo.complete) ? (<img className = "item-check-image" src="https://i.ibb.co/ZfY9hWT/check.png"/>) : ""} 
            </div>
            <div className="item-info">
                <div className="item-name">{goalInfo.name}</div>
                <div className="item-time">{remainingTime}</div>
            </div>
            <div onClick={deleteGoal}>
                {(deleteActive) ? (<img className="item-trash" src="https://i.ibb.co/ySFzhYJ/trash.png" />) : ""}
            </div>
        </div>
    );
};

export default ListItem;