import React, { useState } from 'react'
import { render } from 'react-dom';
import EditButton from './EditButton';

    const ItemList = (props) => {
        const renderListItems = (stime, idDict, id) => {
            return (
                <React.Fragment>
                {id.map(ids => {
                    if (idDict[ids]['start_date_time'] === stime){
                        const [waste, stime] = idDict[ids]['start_date_time'].split('T')
                        const name = idDict[ids]['name']
                        const attendees = idDict[ids]['attendees']
                        const notes = idDict[ids]['notes']
                        const start_date_time = idDict[ids]['start_date_time']
                        const end_date_time = idDict[ids]['end_date_time']
                        let idd = ids
                        return(
                            <li 
                            key={idd}
                            onClick={()=> {props.handleDetailClick(idd)
                            }}>
                                {name} - {stime}
                                {props.targetedEvent === idd && 
                                <div>
                                <p>Attendees: {attendees}</p>
                                <p>Notes: {notes}</p>
                                <p>Start date and time: {start_date_time}</p>
                                <p>End date and time: {end_date_time}</p>
                                <EditButton
                                    currentEvent={props.currentEvent}
                                    setIsEditShown={props.setIsEditShown}
                                    handleEditSubmit={props.handleEditSubmit}
                                    isEditShown={props.isEditShown}
                                    targetedEvent={props.targetedEvent}
                                    isFormShown={props.isFormShown}
                                    setIsFormShown={props.setIsFormShown}
                                    setIsAddShown={props.setIsAddShown}
                                    Open={props.Open}
                                    handleClickOpen={props.handleClickOpen}
                                    handleClose={props.handleClose}
                                    handleAddSubmit={props.handleAddSubmit}
                                    setIsAddShown={props.setIsAddShown}
                                    isAddShown={props.isAddShown}
                                /> 
                                <button 
                                onClick={()=> {
                                    idd = null
                                    props.handleDetailClick(idd)}}>Close</button>

                                </div>}
                            </li>
                            
                        )
                    }
                })}
                </React.Fragment>
            )
        }
        const renderDay = (distSTimeArr, day, id, idDict) => {
            return(
                <React.Fragment>
                    <h3>{day}</h3>
                    <ul>
                    {
                        distSTimeArr.map(stime => {
                            return(
                                renderListItems(stime, idDict, id)
                            )
                        })
                    }
                    </ul>
                </React.Fragment>
                                                )
        }
        const renderMonth = (month, dayDict, day) => {
            return(
                <React.Fragment>
                <h2>{month}</h2>
                {
                    day.map(day => {
                        const idDict = dayDict[day]
                        const id = Object.keys(idDict)
                        let stimeArr = []
                        id.map(iddd => {
                            stimeArr.push(idDict[iddd]['start_date_time'])
                        })
                        stimeArr.sort()
                        const distSTimeArr = [...new Set(stimeArr)]
                        return(
                            renderDay(distSTimeArr, day, id, idDict)
                        )
                    })
                }
                </React.Fragment>
            )
        }
        const renderYear = (year, months, monthsDict) => {
            return(
                <React.Fragment>
                    <h1>{year}</h1>
                    {
                        months.map(month => {
                            const dayDict = monthsDict[month]
                            const day = Object.keys(dayDict).sort()
                            return(
                               renderMonth(month, dayDict, day)
                            )
                        })
                    }
                </React.Fragment>
            )
        }
        const sortEvents = props.events
        let totalSeperateArray = []
        console.log(sortEvents);
        Object.keys(sortEvents).map(uuid => {
            console.log(uuid)
            console.log(sortEvents)
            console.log(sortEvents[uuid])
            let tempArray = splitDate(sortEvents, uuid)
            let objEvent = props.events[uuid]
            objEvent['uuid'] = uuid
            tempArray.push(objEvent)
            totalSeperateArray.push(tempArray)
        })
        let totalDict = {}  
        totalSeperateArray.forEach(event => {
            const year = event[0]
            const month = event[1]
            const day = event[2]
            const objEvent = event[8]
            const uuid = objEvent['uuid']
            const eventObj = event[8]
            if (!totalDict[year]) totalDict[year] = {};
            if (!totalDict[year][month]) totalDict[year][month] = {};
            if (!totalDict[year][month][day]) totalDict[year][month][day] = {};
            if (!totalDict[year][month][day][uuid]) totalDict[year][month][day][uuid] = eventObj;
            }
        )
        const years = Object.keys(totalDict).sort()
        console.log(totalDict)
        return (
            years.map(year => {
                const monthsDict = totalDict[year]
                const months = Object.keys(monthsDict).sort()
                return(
                    renderYear(year, months, monthsDict)
                )

// helper func for sort, once we are down to day sorts by start time

            })
        )       
    }
function splitDate (sortEvents, uuid) {
            // start date time
            
            var sdatetime = sortEvents[uuid]['start_date_time']
            console.log(sdatetime)
            var sall = sdatetime.split("-")
            var syear = sall[0]
            var smonth = sall[1]
            var sdayextra = sall[2]
            var stimall = sdayextra.toString().split("T");
            var sday = stimall[0]
            var stime = stimall[1]
            // end date time
            var edatetime = sortEvents[uuid]['end_date_time']
            var eall = edatetime.split('-');
            var eyear = eall[0]
            var emonth = eall[1]
            var edayextra = eall[2]
            var etimeall = edayextra.toString().split('T')
            var eday = etimeall[0]
            var etime = etimeall [1]
            var eventsinfo = [syear, smonth, sday, stime, eyear, emonth, eday, etime]
            return eventsinfo
    }
export default ItemList;