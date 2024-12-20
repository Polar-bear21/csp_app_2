import pool from "@/lib/db"
import { ResultSetHeader } from "mysql2";
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ message: 'Invalid request: no IDs provided' }, { status: 400 });
        }

        // 動的プレースホルダの生成
        const placeholders = ids.map(() => '?').join(', ');
        const query = `DELETE FROM daily_report WHERE id IN (${placeholders})`;
        const [result] = await pool.query<ResultSetHeader>(query, ids);

        if (result.affectedRows > 0) {
            return NextResponse.json({ 
                message: 'Reports deleted successfully', 
                deletedCount: result.affectedRows 
            }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'No reports found with the given IDs' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting reports:', error);
        return NextResponse.json({ message: 'Error deleting reports' }, { status: 500 });
    }
}



