
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req,file, cb) => {
        cb(null, 'sample.xls')
    }

});
const filefilter = (req, file, cb) => {
        cb(null,true);
}


export const upload = multer({storage: storage, fileFilter: filefilter});
