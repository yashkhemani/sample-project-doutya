import { check, datetime, float, int, mysqlEnum, mysqlTable, text, time, varchar } from "drizzle-orm/mysql-core";

// export const GRADES = mysqlTable('grades', {
//     id:int('id').primaryKey(),
//     grade:varchar('grade', {length: 10}).notNull()
// })


export const TASKS = mysqlTable('tasks', {
    task_id: int('task_id').primaryKey().autoincrement(),
    challenge_id: int('challenge_id').notNull(),
    task_name: varchar('task_name', { length: 100 }).notNull(),
    description: text('description').notNull(),
    start_date: datetime('start_date').notNull(),
    start_time: time('start_time').notNull(),
    end_date: datetime('end_date').notNull(),
    end_time: time('end_time').notNull(),
    task_type: varchar('task_type', { length: 100 }).notNull(),
    verification_method: varchar('verification_method', { length: 15 }).notNull(),
    entry_points: int('entry_points',{maxValue:100,minValue:1}).notNull(),
    reward_points: int('reward_points',{maxValue:100,minValue:1}).notNull(),
    reward_cash: int('reward_cash',{maxValue:100,minValue:1}).notNull(),
    verification_points: int('verification_points',{maxValue:100,minValue:1}).notNull(),
    is_certificate: varchar('is_certificate', { length: 15 }).notNull(),
    is_badge: varchar('is_badge', { length: 15 }).notNull(),
    player_level: varchar('player_level', { length: 15 }).notNull(),
    created_date: datetime('created_date').notNull(),
    created_by: varchar('created_by', { length: 100 }).notNull(),
    participants_count: int('participants_count').notNull(),
    active: mysqlEnum('active', ['yes', 'no']).notNull(),
    removed_date: datetime('removed_date'),
    removed_by: varchar('removed_by', { length: 100 }),
    day: int('day')
});


export const TASK_MAP = mysqlTable('task_map', {
    map_id: int('map_id').primaryKey().autoincrement(),
    task_id: int('task_id').notNull(),
    challenge_id: int('challenge_id').notNull(),
    reach_distance: float('reach_distance').notNull(),
    latitude: varchar('latitude', { length: 20 }).notNull(),
    longitude: varchar('longitude', { length: 20 }).notNull()
});


export const TASK_MEDIA = mysqlTable('task_media', {
    media_id: int('media_id').primaryKey().autoincrement(),
    task_id: int('task_id').notNull(),
    media_type: mysqlEnum('media_type', ['photo', 'video']).notNull(),
    media_path: varchar('media_path', { length: 250 }).notNull()
});

export const TASK_PEDOMETER = mysqlTable('task_pedometer', {
    id: int('id').primaryKey().autoincrement(),
    task_id: int('task_id').notNull(),
    steps: float('steps').notNull(),
    direction: varchar('direction', { length: 20 })
});

export const TASK_RELATION = mysqlTable('task_relation', {
    relation_id: int('relation_id').primaryKey().autoincrement(),
    challenge_id: int('challenge_id').notNull(),
    task_id: int('task_id').notNull(),
    order_id: int('order_id').notNull()
});


// Define the schema for the 'challenges' table
export const CHALLENGES = mysqlTable('challenges', {
    challenge_id: int('challenge_id').primaryKey().autoincrement(),
    page_id: int('page_id').notNull(),
    title: varchar('title', { length: 100 }).notNull(),
    description: text('description').notNull(),
    challenge_type: mysqlEnum('challenge_type', ['ordered', 'unordered']).notNull(),
    frequency: mysqlEnum('frequency', [
        'challenges', 'daily', 'bootcamp', 'contest', 'treasure', 'referral', 
        'streak', 'refer', 'quiz', 'food', 'experience'
    ]).notNull(),
    start_date: datetime('start_date').notNull(),
    start_time: time('start_time').notNull(),
    end_date: datetime('end_date').notNull(),
    end_time: time('end_time').notNull(),
    entry_points: int('entry_points').notNull(),
    reward_points: int('reward_points').notNull(),
    level: int('level').default(1).notNull(),
    created_by: varchar('created_by', { length: 100 }).notNull(),
    created_date: datetime('created_date').notNull(),
    participants_count: int('participants_count').default(0).notNull(),
    removed_date: datetime('removed_date'),
    removed_by: varchar('removed_by', { length: 100 }),
    arena: mysqlEnum('arena', ['no', 'yes']).notNull(),
    district_id: int('district_id'),
    visit: mysqlEnum('visit', ['no', 'yes']).notNull(),
    active: mysqlEnum('active', ['no', 'yes']).notNull(),
    days: int('days').default(0).notNull(),
    referral_count: int('referral_count').default(0).notNull(),
    open_for: mysqlEnum('open_for', ['everyone', 'location', 'specific']).notNull(),
    like_based: mysqlEnum('like_based', ['no', 'yes']).notNull(),
    live: mysqlEnum('live', ['no', 'yes']).notNull(),
    questions: int('questions').default(0).notNull(),
    exp_type: mysqlEnum('exp_type', ['biriyani', 'arts', 'breakfast', 'entertainment']).notNull(),
    rewards: mysqlEnum('rewards', ['no', 'yes']).notNull()
});
