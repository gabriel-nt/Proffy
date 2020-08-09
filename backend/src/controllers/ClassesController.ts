import { Response, Request } from 'express';
import db from '../database/connection';
import converteHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(request:Request, response:Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!subject || !week_day || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        console.log(filters);

        const timeInMinutes = converteHourToMinutes(time);

        const classes = await db('classes')
            .select('*')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .join('users', 'users.id', '=', 'classes.user_id')
            .where('classes.subject', '=', subject)

        return response.json(classes);
    }

    async create(request:Request, response:Response) {
        const { 
            name, 
            avatar, 
            whatsapp, 
            bio, 
            subject,
            cost, 
            schedule 
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUserIds = await trx('users').insert({
                name,
                avatar, 
                whatsapp,
                bio
            });
        
            const user_id = insertedUserIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem:ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: converteHourToMinutes(scheduleItem.from),
                    to: converteHourToMinutes(scheduleItem.to)
                }
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();

            return response.status(201).send();
        } catch (e) {
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}