# Safe Share

Safe Share is a file sharing application that allows you to securely upload and share files with others. It provides password protection for uploaded files, ensuring that only authorized users can access and download the files.

**Features**
- Upload files securely and easily.
- Password protect files for added security.
- Share file download links with others.
- Track the number of downloads for each file.

**Technologies Used**
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)
- EJS (Embedded JavaScript templates) for views
- Crypto (for encryption and decryption)

**Installation**

- Clone the repository:
  `git clone https://github.com/Vish1504/safe-share.git`

- Install the dependencies:
  `npm install`

- Configure the application:
  - Rename the .env.example file to .env.
  - Update the values in the .env file according to your environment and preferences.

- Start the application:
  - `npm start`
  - Open your browser and access the application at http://localhost:8080.

**Usage**
- Upload a file:
  - Visit the home page of the application.
  - Choose a file from your system using the "Choose an image to upload" button.
  - Enter a password to secure the file.
  - Click the "Upload File" button.

- Share the file:
  - After the file is uploaded, you will see the file download link.
  - Copy the link and share it with the intended recipients.

- Download a file:
  - Open the file download link in a browser.
  - Enter the password.
  - Click the "Download" button.
  - The file will be downloaded to your system.

**File Encryption**

The encryption process ensures that the file remains secure and can only be accessed by authorized users who have the correct password.

**Contributing**

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.
