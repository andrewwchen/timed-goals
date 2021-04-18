import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch} from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducers.js';
import { goalsLoaded, goalFinished, goalDeleted, goalAdded } from './redux/actions';

import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

// class based component at the top to make date tracking easier thru setInterval
class App extends React.Component{
    constructor (props) {
        super(props);
        this.state={currentTime:Date.now()};
    }
    // updates time to be used for List countdowns
    componentDidMount() {
        setInterval(()=>{
            this.setState({currentTime:Date.now()});
        },1000);
    }
    render() {
        return (
            <div id = "react-container">
                < List currentTime={this.state.currentTime}/>
                {/* settings link that we didn't implement: <img id = "settings" src="https://i.ibb.co/RB57Dty/more.png" />*/}
            </div>
        );
    }
    
};

//component for list of goals
const List = (props) =>{
    // accessing redux store
    const goals = useSelector(state => state.goals);
    const dispatch = useDispatch();
    useEffect(()=>{
        // at initialization, fetch goals from vscode
        vscode.postMessage({
            command: 'getTimedGoals'
        });
        // all event listeners are here for communication with vs code
        window.addEventListener('message',event =>{
            const message = event.data;
            // sends redux action based on message from backend
            switch (message.command) {
                case "getTimedGoals":
                    dispatch(goalsLoaded(message.payload.goals));
                    break;
                case "createTimedGoal":
                    dispatch(goalAdded(message.payload.name,message.payload.duration,message.payload.time,message.payload.id,message.payload.complete));
                    break;
                case "deleteTimedGoal":
                    dispatch(goalDeleted(message.payload.id));
                    break;
                case "completeTimedGoal":
                    dispatch(goalFinished(message.payload.id));
                    break;
            }
        })
    },[])
    // turns object with IDs as attributes to array of ListItems
    let newGoals = Object.keys(goals).sort((a,b)=>b-a);
    newGoals = newGoals.map((goalID)=>(<ListItem key={goalID} id = {goalID} currentTime={props.currentTime}/>));
    return (
        <div id ="goal-list">
                <div id = "goal-title"> Your Goals </div>
                {newGoals}
                < AddItem />
            </div>
    );
}

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