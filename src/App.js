import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducers.js';

import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = (props) => {
    let goals = useSelector(state => state.goals)
    //goals = goals.filter((goal) => goal.complete)
    goals = goals.map(
        (goal) => 
        <ListItem title={goal.title} time={goal.time} complete={goal.complete} key={goal.id} id={goal.id} />
    )
    console.log(goals)
    return (
        <div id = "react-container">
            <div id ="goal-list">
                <div id = "goal-title"> Your Goals </div>
                {goals}
                < AddItem />
            </div>
            <img id = "settings" src="https://www.dropbox.com/s/sv2qx0b753sijyz/more.png?raw=1" />
        </div>
    );
};

const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const domContainer = document.getElementById('react-content');
ReactDOM.render(
<Provider store={store}>
    < App />
</Provider>,
domContainer);