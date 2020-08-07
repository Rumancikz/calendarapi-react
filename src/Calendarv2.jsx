import React from 'react';
import ItemList from './Components/ItemList';
import FormDialog from './Components/Dialog';
import Login from './Components/Login';

export default class Calendar extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
        events: {
            "c8ba0bb7-8a26-4646-a563-1e3f5363443e":
            {
                attendees: "Hendy, I the piglin slayer",
                end_date_time: "2020-10-28T08:03",
                name: "Minecraft party",
                notes: "fun with the bois",
                start_date_time: "2020-10-28T08:02",
                createdBy: "isaac234",
            },
            "c8653316-4850-4402-ae74-6ace0f6e634e":
            {
                attendees: "zach, aj, Spencer",
                end_date_time: "2020-07-20T08:04",
                name: "Destiny 2 Fun",
                notes: "Raids are cool",
                start_date_time: "2020-07-20T08:03",
                createdBy: "Dad",
            },
            "1000000-4850-4402-ae74-6ace0f6e634e":
            {
                attendees: "the winners",
                end_date_time: "2021-01-01T08:04",
                name: "Did I finally beat the sorting",
                notes: "Did I actually do it?",
                start_date_time: "2021-01-02T08:03",
                createdBy: "Zach",
            },
          }, 
          months: [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          username:"",
          Open:false,
          targetedEvent:"",
          isDetailShown:false,
          isAddShown: false,
          isEditShown: false,
          isFormShown: false,
        currentEvent:{},
        sortedEvents:{},
        attendees: "Zach, Toby, the gang",
        end_date_time: "2021-01-02T08:12",
        name: "The official test of add event",
        notes: "I really hope that this all comes together",
        start_date_time: "2021-01-01T08:06",
        createdBy: "Zach",
        uuid:"101010101010101010101010101",
    }
}
    updateCurrentEvent = (eventProp, eventPropvalue) => {
        this.setState(prevState => {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    [eventProp]: eventPropvalue
                }
            }
        })
    }
    componentDidMount = () => {
        
    }
    handleDetailClick = (id) => {
        this.setState({targetedEvent: id})
        this.setState({currentEvent:this.state.events[id]})
    }
    setIsAddShown = (value) => {
        this.setState({isAddShown:!value})
    }
    setIsFormShown = (value) => {
        this.setState({isFormShown:!value})
    }
    setIsEditShown = (value) => {
        this.setState({isEditShown:!value})
    }
    handleEditSubmit = (newEvent) => {
        let events = {...this.state.events}
        const uuid = newEvent["uuid"]
        events[uuid] = newEvent
        this.setState({events:events})
        this.setState({isEditShown:!this.state.isEditShown})
    }
    handleAddSubmit = (newEvent) => {
        // only if event is an actual object
        if (newEvent && newEvent !== {}) {
            let events = {...this.state.events}
            const uuid = newEvent["uuid"]
            events[uuid] = newEvent
            this.setState({events:events})
            this.setState({isAddShown:false})
            this.setState({isFormShown: false})
        }
    }
    handleClickOpen = (isEdit) => {
        this.setState({Open:true});
        if (this.state.isAddShown === true) {
            if (!isEdit) {
                this.setState({currentEvent:{}})
            }
        }
    };

    handleClose = () => {
        this.setState({Open:false});
        // should also clear current Event
        this.setState({currentEvent: {}})
    };
    handleUsernameSubmit = (username) => {
        console.log(username)
        this.setState({username:username})
    }
    render() {
        return (
        <>
            <Login handleUsernameSubmit={this.handleUsernameSubmit} />
            {this.state.username !== "" &&
            <React.Fragment>
                <FormDialog 
                    username={this.state.username}
                    currentEvent={this.state.currentEvent}
                    updateCurrentEvent={this.updateCurrentEvent}
                    handleAddSubmit={this.handleAddSubmit}
                    Open={this.state.Open}
                    handleClose={this.handleClose}
                    handleClickOpen={this.handleClickOpen}
                    setIsAddShown={this.setIsAddShown}
                    isAddShown={this.state.isAddShown}
                />
                <ItemList 
                    updateCurrentEvent={this.updateCurrentEvent}
                    targetedEvent={this.state.targetedEvent}
                    events={this.state.events}
                    handleDetailClick={this.handleDetailClick}
                    Open={this.state.Open}
                    handleClickOpen={this.handleClickOpen}
                    setIsFormShown={this.setIsFormShown}
                    setIsAddShown={this.setIsAddShown}
                />
            </React.Fragment>
            }
        </>
        )
    }
}