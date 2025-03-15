import { z } from "zod";

export const СoupleSchema = z.object({
    id: z.number(),
    group: z.string(),
    group_id: z.number(),
    discipline_name: z.string(),
    nagruzka: z.string(),
    pred_id: z.number(),
    sub_group: z.number(),
    maxsubgroup: z.number(),
    teacher_name: z.string(),
    auditory: z.string(),
    type: z.string(),
    classroom_korpus: z.string(),
    classroom_info: z.string(),
    classroom_capacity: z.string(),
}).transform((data) => ({
    id: data.id,
    group: data.group,
    group_id: data.group_id,
    discipline_name: data.discipline_name,
    workload: data.nagruzka, // Преобразуем nagruzka в workload
    pred_id: data.pred_id,
    sub_group: data.sub_group,
    maxsubgroup: data.maxsubgroup,
    teacher_name: data.teacher_name,
    auditory: data.auditory,
    type: data.type,
    classroom_korpus: data.classroom_korpus,
    classroom_info: data.classroom_info,
    classroom_capacity: data.classroom_capacity,
}));

// Схема для дня недели
export const DayScheme = z.object({
    '1': z.array(СoupleSchema).optional(),
    '2': z.array(СoupleSchema).optional(),
    '3': z.array(СoupleSchema).optional(),
    '4': z.array(СoupleSchema).optional(),
    '5': z.array(СoupleSchema).optional(),
    '6': z.array(СoupleSchema).optional(),
    '7': z.array(СoupleSchema).optional(),
    '8': z.array(СoupleSchema).optional(),
})

// Схема для недели
export const WeekSchema = z.object({
    "Понедельник": DayScheme,
    "Вторник": DayScheme,
    "Среда": DayScheme,
    "Четверг": DayScheme,
    "Пятница": DayScheme,
    "Суббота": DayScheme,
}).transform((data) => ({
    monday: data["Понедельник"],
    tuesday: data["Вторник"],
    wednesday: data["Среда"],
    thursday: data["Четверг"],
    friday: data["Пятница"],
    saturday: data["Суббота"],
}));