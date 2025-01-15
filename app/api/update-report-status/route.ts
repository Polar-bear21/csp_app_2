import pool from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
        const { ids, status } = await request.json();

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ message: 'Invalid request: no IDs provided' }, { status: 400 });
        }

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
        }

        // 動的プレースホルダの生成
        const placeholders = ids.map(() => '?').join(', ');
        const query = `UPDATE daily_report SET status = ? WHERE id IN (${placeholders})`;
        const [result] = await pool.query<ResultSetHeader>(query, [status, ...ids]);

        if (result.affectedRows > 0) {
            return NextResponse.json({ 
                message: 'Reports updated successfully', 
                updatedCount: result.affectedRows 
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No reports found with the given IDs' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating reports:', error);
        return NextResponse.json({ message: 'Error updating reports' }, { status: 500 });
    }
}
