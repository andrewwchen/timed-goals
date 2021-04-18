import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goalFinished, goalDeleted } from '../redux/actions';
import { timeConverter } from '../goalfunctionality'

const ListItem = (props) => {
    const dispatch = useDispatch();
    const goal = useSelector(state => state.goals[props.id])
    let [goalInfo,editGoal] = useState(goal)
    let [hoverActive, toggleHover] = useState(false)
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
    const showTimer = () =>{
        vscode.postMessage({
            command: 'showTimer',
            payload: {
                id:props.id
            }
        })
    }
    let remainingTime=timeConverter(endTime - props.currentTime) + " remaining"
    const timeUpString = "Time's Up!"
    if (remainingTime!=timeUpString && (endTime - props.currentTime) < 0) {
        remainingTime=timeUpString
        if (endTime + 60000 < props.currentTime) deleteGoal()
    }
    return (
        <div className="list-item" onMouseEnter={()=>{toggleHover(true)}} onMouseLeave={()=>{toggleHover(false)}}> 
            <div className="item-check" onClick={completeGoal}>
                {(goalInfo.complete) ? (<img className = "item-check-image" src="https://i.ibb.co/ZfY9hWT/check.png"/>) : ""} 
            </div>
            <div className="item-info" style={{opacity:((goalInfo.complete) ? "0.5" : "1")}}>
                <div className="item-name">{goalInfo.name}</div>
                <div className="item-time">{(!goalInfo.complete) ? remainingTime : ""}</div>
            </div>
            <div >
                {(hoverActive) ? (
                <div style={{display:"inline-flex"}}>
                    {(!goalInfo.complete&&remainingTime!=timeUpString) ? (<img onClick = {showTimer} className="item-timer" src="https://i.ibb.co/S5Mt7j6/stopwatch.png" />) : ""}
                    <img onClick = {deleteGoal} className="item-trash" src="https://i.ibb.co/ySFzhYJ/trash.png" />
                </div>
                ) : ""}
            </div>
        </div>
    );
};

export default ListItem;