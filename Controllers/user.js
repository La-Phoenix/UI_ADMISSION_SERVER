import User from "../Models/user.js";

export const uploadClearance = (req, res) => {
    const documents = req.files;
    console.log(documents)
    console.log(documents.length)
    if (!documents || documents.length < 2) {
        return res.status(400).json({
            message: "Please provide all required documents."
        })
    }
    return res.status(200).json({
        message: "Files Uploaded Successfully."
    })
}

export const olevelverify = async (req, res) => {
    const {files, userId} = req;
    if (!files || files.length < 2) {
        return res.status(400).json({
            message: "Please provide all required documents."
        })
    }
    try {
        files.forEach(async(file) => {
            const updatedUser = await User.updateOne(
                { _id: userId, "documents.fieldname": file.fieldname },
                {
                    "$set": {
                        "documents.$.path": file.path
                    }
                }
            )
            if (updatedUser.matchedCount === 0) {
                await User.findByIdAndUpdate(userId, {
                    '$push': {
                        documents: {
                            fieldname: file.fieldname,
                            path: file.path
                        }
                    }
                });
            }
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    return res.status(200).json({
        message: "Files Uploaded Successfully."
    })
}
