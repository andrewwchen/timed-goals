import React, { useState } from 'react';
import { goalAdded } from '../redux/actions';
import { useDispatch } from 'react-redux';

const AddItem = () =>{
    let [name, changeName] = useState("");
    let [duration, changeDuration] = useState({seconds:0,minutes:0,hours:0})
    const dispatch = useDispatch();
    const addGoal = () =>{
        let totalSeconds = Number(duration.seconds)+Number(duration.minutes)*60+Number(duration.hours)*3600
        if (name!=""&&totalSeconds>0){
            changeName("");
            vscode.postMessage({
                command: 'createTimedGoal',
                payload: {
                    time: Date.now(),
                    name:name,
                    duration: totalSeconds,
                    complete:false
                }
            })
        }
    }
    const handleInput = event =>{
        changeName(event.target.value);
    }
    const handleSecond = event => {changeDuration({...duration,seconds:event.target.value})}
    const handleMinute = event => {changeDuration({...duration,minutes:event.target.value})}
    const handleHour = event => {changeDuration({...duration,hours:event.target.value})}
    return (
        <div className="list-item" id = "additem"> 
            <div className = "item-check" onClick={addGoal}>
                <img id = "additem-add" src ="https://i.ibb.co/2FxBF4X/add.png"/>
            </div>
            <div className="item-info"> 
                <input id="additem-input" onChange={handleInput} value={name} placeholder="Add New Goal" type="text" />
                <div id="additem-time-label">Insert Goal Duration</div>
                <div id="additem-time-sublabel">Hours / Minutes / Seconds</div>
                <div id ="additem-time">
                    <input onChange={handleHour} value={duration.hours} placeholder="Hours" type="number" min="0"></input>
                    <input onChange={handleMinute} value={duration.minutes} placeholder="Minutes" type="number" min="0"></input>
                    <input onChange={handleSecond} value={duration.seconds} placeholder="Seconds" type="number" min="0"></input>
                </div>
            </div>
        </div>
    )
};

export default AddItem;