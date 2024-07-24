import { db } from "@/utils";
import { TASK_MAP, TASK_MEDIA, TASK_RELATION, TASKS } from "@/utils/schema";
import { json } from "drizzle-orm/mysql-core";
import { NextResponse } from "next/server";

export async function POST(req, res) {  

    const data = await req.json(); 
    
    const result = await db.insert(TASKS).values({
        challenge_id: data?.challengeId,
        task_name: data?.taskName,
        description: data?.description,
        start_date: new Date(data.startDate),
        start_time: data?.startTime,
        end_date: new Date(data.endDate),
        end_time: data?.endTime,
        task_type: data?.taskType,
        verification_method: data?.verificationMethod,
        entry_points: data?.entryPoints,
        reward_points: data?.rewardPoints,
        reward_cash: data?.rewardCash,
        verification_points: data?.verificationPoints,
        player_level: data?.playerLevel,
        is_certificate: data?.certified,
        is_badge: data?.badge,
        player_level: data?.playerLevel,
        created_by: data?.createdBy
    })

    // Extracting insertId from the result
    const taskId = result[0].insertId;

    console.log("Inserted Task ID:", taskId);

    // Insert into task_map table
    const resultTaskMap = await db.insert(TASK_MAP).values({
        task_id: taskId,
        challenge_id: data?.challengeId,
        reach_distance: data?.radius,
        latitude: data?.latitude,
        longitude: data?.longitude
    });

    // Insert into task_media table
    const resultTaskMedia = await db.insert(TASK_MEDIA).values({
        task_id: taskId,
        media_type: "photo",
        media_path: "path/sample_img.jpg"
    });

    // Insert into task_media table
    const resultTaskRelation = await db.insert(TASK_RELATION).values({
        challenge_id: data?.challengeId,
        task_id: taskId,
        order_id: 1,
    });
    

    return NextResponse.json(result);
}
