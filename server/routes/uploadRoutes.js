// import express from 'express';

// import multer from 'multer';
// import imageDownload from 'image-downloader';
// import fs from 'fs';

// const uploadRoutes = express.Router();

// app.post('/upload-by-link', async (req, res) => {
//     const { link } = req.body;
//     const newName = 'photo' + Date.now() + '.jpg';
//     await imageDownload.image({
//         url: link,
//         dest: process.cwd() + '/uploads/' + newName
//     });

//     res.json(newName);
// });

// const photosMiddleware = multer({ dest: 'uploads' });
// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path, newPath);
//         uploadedFiles.push(newPath.replace('uploads', ''));
//     }

//     res.json(uploadedFiles);
// });

// export default uploadRoutes;
