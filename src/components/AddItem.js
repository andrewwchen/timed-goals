import React, { useState } from 'react';
import { goalAdded } from '../redux/actions';
import { useDispatch } from 'react-redux';

const AddItem = () =>{
    let [title, changeTitle] = useState("");
    const dispatch = useDispatch();
    const addGoal = () =>{
        changeTitle("");
        dispatch(goalAdded(title,20));
    }
    const handleInput = event =>{
        changeTitle(event.target.value);
    }
    return (
        <div className="list-item" id = "additem"> 
            <div className = "item-check" onClick={addGoal}>
                <img id = "additem-add" src = "https://www.dropbox.com/s/hmh16o5mtj73r52/check.png?dl=0"/>
            </div>
            <div className="item-info"> 
                <input id="additem-input" onChange={handleInput} value={title} placeholder="Add New Goal" type="text" />
            </div>
        </div>
    )
};

export default AddItem;