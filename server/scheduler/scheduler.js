import { schedule } from 'node-cron';
import { updateOrderFine } from '../helpers/student-helpers.js';

export const initScheduler = () => {
    schedule('0 0 0 * * *', async () => {
        await updateOrderFine()
    });
}