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
        dispatch(goalFinished(props.id))
    }
    const deleteGoal = () =>{
        dispatch(goalDeleted(props.id))
    }
    return (
        <div className="list-item" onMouseEnter={()=>{toggleDelete(true)}} onMouseLeave={()=>{toggleDelete(false)}}> 
            <div className="item-check" onClick={completeGoal}>
                {(goalInfo.complete) ? (<img className = "item-check-image" src="https://www.dropbox.com/s/4ewq1dfrjgab2rt/check.png" />) : ""} 
            </div>
            <div className="item-info">
                <div className="item-name">{goalInfo.name}</div>
                <div className="item-time">{timeConverter(endTime - props.currentTime)+" remaining"}</div>
            </div>
            <div onClick={deleteGoal}>
                {(deleteActive) ? (<img className="item-trash" src="https://www.dropbox.com/s/f1auaomb7qltl24/trash.png" />) : ""}
            </div>
        </div>
    );
};

export default ListItem;