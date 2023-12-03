import multer from "multer";

//multer middleware for fileupload
const storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
        return callback(null, "./public/images")
    },
    filename: function (req, file, callback) {
        req.body.file = file.datetime
        return callback(null, `${file.originalname}`)
    }
})

const announcementStorage = multer.diskStorage({
    destination: function (_req, _file, callback) {
        return callback(null, "./public/announcements")
    },
    filename: function (req, file, callback) {
        req.body.file = file.datetime
        return callback(null, `${file.originalname}`)
    }
})

export const imageUpload = multer({ storage })
export const announcementUpload = multer({ storage: announcementStorage })
//multer ends
