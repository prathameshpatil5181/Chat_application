import { Request, Response } from "express";
// import multer from "multer";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { firebaseStorage } from "../../utils/firebasesetup";
import { updateProfilePicture } from "../../Models/userModels/updateProfieModel";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       "." +
//       file?.originalname.split(".", 3)[1];
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// export const upload = multer({ storage: storage });

export const UpdateProfileImage = async (req: Request, res: Response) => {
  const image = await req.body.image;
  const storage = getStorage(firebaseStorage);
  const userid = req.body.user.id;
  const imagepath = `profileimages/${userid}`;
  const storageRef = ref(storage, imagepath);

  try { 
    uploadString(storageRef, image, "data_url").then(async(snapshot) => {
      console.log("Uploaded a data_url string!");
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      updateProfilePicture(url, userid);
      res.status(200).json({
        success: true,
        result:url
      });
    });
  } catch (error) {
    console.log(error); 
     res.status(400).json({
       success: false,
     });
  }
};
