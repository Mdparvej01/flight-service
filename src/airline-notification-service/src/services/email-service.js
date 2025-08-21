const { TicketRepository } = require("../repositories");
const ticketRepo = new TicketRepository();
const { mailSender } = require("../utils");

async function sendMail(mailFrom, mailTo, subject, text) {
  try {
    const response = await mailSender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepo.create(data);
    return response;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
}

async function getpendingEmails(data) {
  try {
    const response = await ticketRepo.getpendingEmails();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  sendMail,
  createTicket,
  getpendingEmails,
};
