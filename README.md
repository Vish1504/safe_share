# share_app
This is a Node.js script that creates a file sharing application with password protection functionality. Here's a step-by-step explanation:

Required modules are imported:

multer is used for file uploads.
mongoose is used to interact with a MongoDB database.
express is used for creating the web application.
crypto is used for encryption and decryption of the password.
The File model is imported from a separate file to handle database operations.
The application connects to a MongoDB database running locally at mongodb://127.0.0.1/fileShare.

The upload middleware is set up using multer to store uploaded files in the "uploads" directory.

The Express application is set up to use the EJS template engine and to accept URL-encoded data.

A GET route is created for the home page ("/") which will render the "index" template.

A POST route is created for the file upload endpoint ("/upload"). The uploaded file is processed and the following data is stored in the fileData object:

The path of the file on the server
The original name of the file
If a password is provided, it is encrypted using AES-256-CBC encryption with a randomly generated salt and initialization vector (IV). The encrypted password, along with the salt and IV, is stored in the database as a single string separated by colons.

The encrypted fileData is saved to the database using the File model. The file's unique ID is then used to generate a link to download the file, which is passed to the "index" template for display to the user.

A combined GET and POST route is created for file downloads ("/file/:id"). The file is retrieved from the database using its ID.

If the file has a password, the user is prompted to enter it. If no password is provided, the download is automatically initiated.

If the file has a password, it is decrypted and checked against the provided password. If the password is incorrect, the user is prompted to enter it again.

If the password is correct, the download count for the file is incremented and the file is saved to the database.

The file is then sent to the user for download using the res.download() method.

The Express application is set to listen on port 8080.
