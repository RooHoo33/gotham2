
export interface chore{
    id: number
    name: string
    rank: number
}

export interface day {
    id: number
    name: string
    rank: number
}

export interface user {
    kappaSigma: number
    email: string

}

export interface templateDay {
    id: number
    day: day
}
export interface templateChore {
    id: number
    chore: chore
}

export interface template {
    name: string
    id: number
    templateDays: templateDay[]
    templateChores: templateChore[]
}
export interface choreChartUnit {
    id: number
    templateChore: templateChore
    templateDay: templateDay
    user: user
}

export interface choreChart {
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
