import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImages = async (files) => {
    const imageUrls = [];
    const publicIds = [];
    try {
        for (const file of files) {

            const result = await cloudinary.uploader.upload(file.path);

            imageUrls.push(result.secure_url);
            publicIds.push(result.public_id);

        }
        return { imageUrls, publicIds };
    } catch (error) {
            await deleteImages(publicIds);
            throw error;
        
    } finally {
        for (const file of files) {
            try { await fs.promises.unlink(file.path); }
            catch (unlinkError) {
                console.error("Failed to delete the temporary file:", unlinkError.message);
            }
        }
    }

};

export const deleteImages = async(publicIds) =>{
     for (const id of publicIds) {
            try {
                await cloudinary.uploader.destroy(id);
            } catch (destroyError) {
                console.error("Failed to delete image from cloudinary", destroyError.message);
            }
        }
};


