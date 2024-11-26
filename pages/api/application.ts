import {  PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient();

    if (req.method != "post") {
        await db.user.create({
            data: JSON.parse(req.body)
        })
    }
}