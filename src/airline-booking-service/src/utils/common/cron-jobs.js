const cron = require('node-cron');

const { BookingService } = require('../../services');

function scheduleCrons() {
    cron.schedule('0 0 * * *', async () => {  // every midnight
        await BookingService.cancelOldBookings();
    });
}

module.exports = scheduleCrons;       