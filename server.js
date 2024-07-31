const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/update-spreadsheet', async (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'spreadsheet.xlsx');

    let workbook;
    if (fs.existsSync(filePath)) {
        // Load existing workbook
        workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
    } else {
        // Create new workbook
        workbook = new ExcelJS.Workbook();
        workbook.addWorksheet('Sheet1');
    }

    const worksheet = workbook.getWorksheet('Sheet1');

    // Add new row with form data
    const row = [
        data.input1, data.input2, data.input3, data.input4,
        data.input5, data.input6, data.input7, data.input8,
        data.input9, data.input10, data.input11, data.input12
    ];
    worksheet.addRow(row);

    await workbook.xlsx.writeFile(filePath);

    // Send the file via email
    try {
        await sendEmailWithAttachment(filePath);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Function to send email with attachment
async function sendEmailWithAttachment(filePath) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'unimartstores48@gmail.com',
        subject: 'Spreadsheet File',
        text: 'Please find the attached spreadsheet file.',
        attachments: [
            {
                filename: 'spreadsheet.xlsx',
                path: filePath
            }
        ]
    };

    // Send mail
    return transporter.sendMail(mailOptions);
}
