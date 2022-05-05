
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req,file, cb) => {
        // cb(null, 'sample.xls')
        // cb(null, file.originalname);
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }

});
const filefilter = (req, file, cb) => {
        cb(null,true);
}


export const upload = multer({storage: storage, fileFilter: filefilter});
