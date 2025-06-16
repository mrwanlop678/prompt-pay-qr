# PromptPay QR Code Generator

## Project Overview
This project is an open-source initiative inspired by [pp-qr.com](https://www.pp-qr.com/), focusing on generating PromptPay QR codes. It provides a straightforward and efficient way for users and developers to create QR codes for seamless transactions using Thailand's PromptPay system.

## Live Demo
Experience the generator in action: [PromptPay QR Generator](https://prompt-pay-qr.onrender.com/) (Hosted by Render.com)

## Key Features
* **User-Friendly Interface**: Easily generate QR codes by inputting mobile phone numbers or national ID (PromptPay account) details.
* **Amount Specification**: Option to include a payment amount directly within the QR code for fixed transactions.
* **API Access**: Programmatic QR code generation through a simple API endpoint, perfect for integration into other applications.

## How to Use
### Web Interface
1.  **Enter Account Details**: Provide the mobile phone number or National ID linked to the PromptPay account.
2.  **Specify Amount (Optional)**: Input the desired payment amount if you want the QR code to include a pre-set value.
3.  **Generate QR**: Click the generate button to instantly display your PromptPay QR code.

### API Usage
Integrate the PromptPay QR code generation into your applications using the following API endpoint:

`https://prompt-pay-qr.onrender.com/generateQR/{reference}/{amount}`

* Replace `{reference}` with the PromptPay account (mobile number or National ID).
* Replace `{amount}` with the desired payment amount.

**Example API Call:**
`https://prompt-pay-qr.onrender.com/generateQR/0812345678/100.50`

## Get Started
Whether you're looking for a quick way to generate a personal QR code or integrate PromptPay functionality into your service, this project offers a versatile solution.

---
