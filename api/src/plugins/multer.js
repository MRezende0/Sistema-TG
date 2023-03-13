import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/" + file.fieldname);
  },
  filename: function (req, file, cb) {
    cb(null, req.params.groupId + ".zip");
  },
});

export default multer({ storage: storage });
