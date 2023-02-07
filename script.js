//script.js
const multer = require('multer');
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const File = require("./models/file");
const crypto = require("crypto");

mongoose.connect("mongodb://127.0.0.1/fileShare", { useNewUrlParser: true, useUnifiedTopology: true });
const upload = multer({ dest: "uploads" });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
const fileData = {
path: req.file.path,
originalName: req.file.originalname
};
let derivedKey;

if (req.body.password !== "" && req.body.password !== null) {
const salt = crypto.randomBytes(16);
derivedKey = crypto.pbkdf2Sync(req.body.password, salt, 100000, 32, 'sha512');
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
let encrypted = cipher.update(req.body.password, 'utf8', 'hex');
encrypted += cipher.final('hex');
fileData.password = `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;

  }
  const file = await File.create(fileData);
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
  });
  
//   app.route("/file/:id").get(handleDownload).post(handleDownload);
app.get("/file/:id", handleDownload);
app.post("/file/:id", handleDownload);
  async function handleDownload(req, res) {
  const file = await File.findById(req.params.id);
  
  if (file.password !== null) {
  if (req.body.password === undefined || req.body.password === null) {
  res.render("password");
  return;
  
    }

    try {
        const [salt, iv, encryptedPassword] = file.password.split(":");
        const derivedKey = crypto.pbkdf2Sync(req.body.password, Buffer.from(salt, 'hex'), 100000, 32, 'sha512');
        const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        if (req.body.password !== decrypted) {
          res.render("password", { error: true });
          return;
        }
      } catch (error) {
        console.error(error);
        res.render("password", { error: true });
        return;
      
}
  }


//   file.downloadCount++;
  await file.save();
//   console.log(file.downloadCount);

  res.download(file.path, file.originalName);
}


app.listen(8080);
