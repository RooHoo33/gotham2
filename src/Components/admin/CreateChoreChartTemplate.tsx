import React, {useEffect, useState} from "react";
import {getChores, getDays} from "../../api/templateApi";
import {chore, day, template, templateChore, templateDay} from "../../api/choreChartApi";

type choreForTemplate = {
    chore: templateChore
    active: boolean
}

type dayForTemplate = {
    day: templateDay
    active: boolean
}
const CreateChoreChartTemplate = () => {

    const [template, setTemplate] = useState<template>({id: 0, name: "", templateChores: [], templateDays: []})

    const [days, setDays] = useState<dayForTemplate[]>([])
    const [chores, setChores] = useState<choreForTemplate[]>([])

    useEffect(() =>{
        getDays().then(data => {
            let daysToSet:dayForTemplate[] = data.map(day => {
                return {day: {id: 0, day: day}, active:true}
            })
            setDays(daysToSet)
        })
        getChores().then(data => {
            let choresToSet:choreForTemplate[] = data.map(chore => {
                return {chore: {id: 0, chore: chore}, active:true}
            })
            setChores(choresToSet)
        })
    }, [])
    return <div className=" mt-4">
        <div className={"row"}>
        <div className="col">
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Template name</label>
                <input  onChange={(event => setTemplate({...template, name:event.target.value}))} className="form-control" id="exampleFormControlInput1"
                       placeholder="Template name" />
            </div>
        </div>
        <div className="col" />
        </div>
        <div style={{fontSize: "22px"}} className={"row"}>
            <div className="col" >
                {days.map((day, index) =>{
                    return <div className={"row"}>
                        <div className="col">
                            {day.day.day.name}
                        </div>
                        <div className="col" >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(event) =>{
                                    day.active = !day.active
                                    let localDays = [...days]
                                    localDays[index] = day
                                    setDays(localDays)}
                                }
                                checked={day.active}
                            />
                        </div>
                    </div>
                })
                }
            </div>
            <div className="col">
                {chores.map((chore, index) =>{
                    return <div className={"row"}>
                        <div className="col">
                            {chore.chore.chore.name}
                        </div>
                        <div className="col" >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(event) =>{
                                    chore.active = !chore.active
                                    let localChores = [...chores]
                                    localChores[index] = chore
                                    setChores(localChores)}
                                }
                                checked={chore.active}
                            />
                        </div>
                    </div>
                })
                }

            </div>

        </div>

    </div>
}
export default  CreateChoreChartTemplate
