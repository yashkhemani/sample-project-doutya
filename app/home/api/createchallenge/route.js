import { db } from "@/utils";
import { encrypt } from "@/utils/cryptoUtils";
import { CHALLENGES } from "@/utils/schema";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    console.log("logged the dadta");
    const data = await req.json(); 

    const encryptedTitle = encrypt(data?.title);
    const encryptedDescription = encrypt(data?.description);

    const result = await db.insert(CHALLENGES).values({
        title: encryptedTitle,
        description: encryptedDescription,
        challenge_type: data?.challengeType.toLowerCase(),
        frequency: data?.frequency.toLowerCase(),
        start_date: new Date(data.startDate),
        start_time: data?.startTime, 
        end_date: new Date(data.endDate),
        end_time: data?.endTime,
        entry_points: parseInt(data?.entryPoints, 10), 
        reward_points: parseInt(data?.rewardPoints, 10),
        level: parseInt(data?.level, 10) || 1,
        created_by: data?.createdBy,
        created_date: new Date(),
        participants_count: parseInt(data?.participantsCount, 10) || 0,
        removed_date: data?.removedDate ? new Date(data.removedDate) : null,
        removed_by: data?.removedBy,
        arena: data?.arena.toLowerCase(),
        district_id: data?.districtId ? parseInt(data?.districtId, 10) : null,
        visit: data?.visit.toLowerCase(),
        active: data?.active.toLowerCase(),
        days: parseInt(data?.days, 10) || 0, 
        referral_count: parseInt(data?.referralCount, 10) || 0, 
        open_for: data?.openFor.toLowerCase(),
        like_based: data?.likeBased.toLowerCase(),
        live: data?.live.toLowerCase(),
        questions: parseInt(data?.questions, 10) || 0,
        exp_type: data?.expType.toLowerCase(),
        rewards: data?.rewards.toLowerCase()
    });

    // // Extracting insertId from the result
    // const taskId = result[0].insertId;

    // console.log("Inserted Task ID:", taskId);

    return NextResponse.json(result);
}