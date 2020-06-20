
export type chore = {
    id: number
    name: string
    rank: number
}

export type day = {
    id: number
    name: string
    rank: number
}

export type user = {
    kappaSigma: number
    email: string

}

export type templateDay = {
    id: number
    day: day
}
export type templateChore = {
    id: number
    chore: chore
}

export type template = {
    name: string
    id: number
    templateDays: templateDay[]
    templateChores: templateChore[]
}
export type choreChartUnit = {
    id: number
    templateChore: templateChore
    templateDay: templateDay
    user: user
}

export type choreChart = {
    id:number
    week:string
    template: template
    choreChartUnits: choreChartUnit[]
}

export const getChoreCharts = async (): Promise<choreChart[]> => {
    const axios = require("axios").default
    return await axios.get('http://localhost:8080/api/choreCharts?projection=withChoreChart').then((data: any) =>{
        return data.data._embedded.choreCharts

    })

}
