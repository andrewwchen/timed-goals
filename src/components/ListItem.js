import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { timeConverter } from '../extra';

const ListItem = (props) => {
    const goal = useSelector(state => state.goals[props.id]);
    // all of the goal properties contained here
    let [goalInfo,editGoal] = useState(goal);
    // detecting hover for timer and trash buttons
    let [hoverActive, toggleHover] = useState(false);
    let endTime = goalInfo.duration*1000+goalInfo.time;
    
    const completeGoal = () => {
        // need to change completed status here manually because it otherwise only detects state change when mouse leaves
        // change in future
        editGoal({...goalInfo, complete:!goalInfo.complete});
        // sends message to backend that this goal has been completed
        vscode.postMessage({
            command: 'completeTimedGoal',
            payload: {
                id:props.id
            }
        });
    };
    const deleteGoal = () =>{
        // sends message to backend that this goal has been deleted
        vscode.postMessage({
            command: 'deleteTimedGoal',
            payload: {
                id:props.id
            }
        });
    };
    const showTimer = () =>{
        // sends message to backend that this goal will be displayed as timer
        vscode.postMessage({
            command: 'showTimer',
            payload: {
                id:props.id
            }
        });
    };
    // tracks remaining time, importing timeConverter to make time readable
    let remainingTime=timeConverter(endTime - props.currentTime) + " remaining";
    // might be suboptimal way but remaining time is changed to timeUpString when time has elapsed
    const timeUpString = "Time's Up!";
    if (remainingTime!=timeUpString && (endTime - props.currentTime) < 0) {
        remainingTime=timeUpString;
        // deletes goal a minute after elapsing, in future might want better way to do this
        if (endTime + 60000 < props.currentTime) deleteGoal();
    };
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