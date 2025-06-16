const express = require('express')
const app = express()
const QRCode = require('qrcode')
const generatePayload = require('promptpay-qr')
const bodyParser = require('body-parser')
const _ = require('lodash')
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true }))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

app.post('/generateQR', (req, res) => { 
    const amount = parseFloat(_.get(req, ["body", "amount"]))
    const reference = _.get(req, ["body", "reference"])
    const payload = generatePayload(reference, { amount })
    const option = {
        color: {
            dark: "#000",
            light: "#fff"
        }
    }
    QRCode.toDataURL(payload, option, (err, url) => {
        if (err) {
            console.log("Generate failed")
            return res.status(400).json({
                RespCode: 400,
                RespMessage: 'bad' + err
            })
        }
        else {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
                Result: url
            })
        }
    })
})

// API for serving QR code image directly
app.get('/generateQR/:reference/:amount', (req, res) => {
    const reference = req.params.reference
    const amount = parseFloat(req.params.amount)

    // Input validation
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).send('Invalid amount. Please provide a positive number.')
    }
    if (!reference) {
        return res.status(400).send('Invalid reference. Please provide a mobile number or ID.')
    }

    try {
        const payload = generatePayload(reference, { amount })
        const option = {
            errorCorrectionLevel: 'H',  // High error correction
            type: 'image/png',          // Output as PNG image
            quality: 0.92,              // Image quality
            margin: 1,                  // Margin around QR code
            color: {
                dark: "#000",
                light: "#fff"
            }
        }
        
        // Generate QR code as a PNG buffer
        QRCode.toBuffer(payload, option, (err, buffer) => {
            if(err) {
                console.error("QR Code image buffer generation failed:", err)
                return res.status(500).send('Failed to generate QR code image')
            }

            // Set the content type header to image/png
            res.setHeader('Content-Type', 'image/png')
            // Send the buffer as the response
            res.send(buffer)
        })
    } catch (error) {
        console.error("Error generation QR code:", error)
        return res.status(500).send('An unexpected error occurred during QR code generation.')
    }
})

module.exports = app