import { schedule } from 'node-cron';
import { updateOrderFine } from '../helpers/student-helpers.js';
import { updateAttendanceStatus } from '../helpers/staff-helpers.js';

export const initScheduler = () => {
    schedule('0 0 0 * * *', async () => {
        await updateOrderFine()
        await updateAttendanceStatus()
    });
}