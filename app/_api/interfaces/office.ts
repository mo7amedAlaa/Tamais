export interface analytics{
        services: {
            total: number ,
            done: number,
            pending: number,
            late: number
        },
        advisoryServices:  {
            total: number ,
            done: number,
            pending: number,
            late: number
        },
        appointments:  {
            total: number ,
            done: number,
            pending: number,
            late: number
        },
        wallet: {
            pendingAction: 0,
            pendingTransfer: 0,
            transferred: 0,
            total: 0
        }
}
export interface Clients{
    [
        id:number,
        name:string,
        type:number,
        image:string,
        nationality:{id:number,name:string},
        gender:string
            
        ]
}