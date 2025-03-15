

export interface DirtyTimtable {

}

export interface Couple {
    id : number
    group : string
    group_id : number
    discipline_name	: string
    workload : string
    pred_id : number
    sub_group : boolean
    maxsubgroup	: boolean
    teacher_name : string
    auditory : string
    type : string
    classroom_corpus : string
    classroom_info : string
    classroom_capacity : string
}

export interface Timetable {
    Monday : Array<Couple>
    Tuesday : Array<Couple>
    Wednesday : Array<Couple>
    Thursday : Array<Couple>
    Friday : Array<Couple>
    Saturday : Array<Couple>
}