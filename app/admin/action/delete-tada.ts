// import pool from "@/lib/db"
// import { ResultSetHeader } from "mysql2"

// export async function deleteReport(id: number) {

//     try {
//         const connection = await pool.getConnection()
//         await connection.beginTransaction()
    
//         try {
//           const [result] = await connection.query<ResultSetHeader>(
//             'DELETE FROM daily_report WHERE id = ?',
//             [id]
//           )
    
//           if (result.affectedRows === 0) {
//             throw new Error('Record not found')
//           }
    
//           await connection.commit()
    
//           return { success: true, message: 'Record deleted successfully' }
//         } catch (error) {
//           await connection.rollback()
//           throw error
//         } finally {
//           connection.release()
//         }
//       } catch (error) {
//         console.error('Error deleting record:', error)
//         return { success: false, message: 'Failed to delete record' }
//       }
// }

