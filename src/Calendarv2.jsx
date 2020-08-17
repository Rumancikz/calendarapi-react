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
            "efa32ea0-5ed9-4948-99cf-7e6b233cd027":{
                attendees: "Vickieeeee, Millie",
                createdBy: "Zach",
                end_date_time: "2020-10-28T8:03",
                id: "bc4f17ef-6377-4eff-99e8-e82a52464613",
                name: "Oh I don't know",
                notes: "Breakfast was good",
                start_date_time: "2020-10-28T8:02"
            }
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
        this.createCheckUser(username)
        this.fetchEventState(username).then(events => {
            console.log("this.handleUsernameSubmit()")
            console.log(events)
            // this.setState({events:events})
        })
    }

    fetchEventState = async (createdBy) => {
        let events = {}
        const response = await fetch(
            `http://flask-env.eba-v4hrhhfv.us-east-2.elasticbeanstalk.com/list?username=${createdBy}`,
            {
            method:'GET',
            mode:"cors"
            })
        const data = await response.json()
        Object.keys(data).map(async (id) => {
            const eventDetails = await this.fetchEventDetails(id)
            events[id] = eventDetails
            console.log(events)
        })
        return events
    }
        fetchEventDetails = async (id) => {
            const response = await fetch(
                `http://flask-env.eba-v4hrhhfv.us-east-2.elasticbeanstalk.com/${id}`,
                {
                    method:'GET',
                    mode:"cors"
                })
            const data = await response.json()
            return data
        }   
            //NOT WORKING
        createCheckUser = async (username) => {
            const info = {"username":[username]}
            const response = await fetch(
                `http://flask-env.eba-v4hrhhfv.us-east-2.elasticbeanstalk.com/user/create`,
                {
                    method:'POST',
                    mode:"cors",
                    body:JSON.stringify(info),
                },
                )
            const data = await response
            console.log(data)
            this.setState({username:username})
            return data
        }
        
    render() {
        console.log(this.state.events)
        return (
        <>
            <Login 
            handleUsernameSubmit={this.handleUsernameSubmit}
            fetchEventState={this.fetchEventState}
            />
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
