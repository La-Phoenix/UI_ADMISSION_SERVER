import User from "../Models/user.js";


export const getStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await User.findById(studentId);
        console.log(student)
        const doc = student.documents.find((doc) => doc.fieldname == "WAEC_NECO");
        console.log(doc)
        if(!student){
            return res.status(404).json({ message: "Student not found." });
        }
        if (doc && doc.path) {
            const imageUrl = `/api/uploads/${doc.path}`;
            return res.status(200).json({ message: student, attachment: imageUrl});
        }
        return res.status(200).json({ message: student});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Something went wrong. Please try again later..." });
    }
}

export const updateUser = async (req, res) => {
    const { studentId } = req.params;
    try {
        let student = await User.findByIdAndUpdate(studentId, req.body);
        if(req.body.isVerfifyOlvl == false){
            student = await User.updateOne({ _id: studentId}, {
                $pull: {
                    documents: {
                        fieldname: "WAEC_NECO"
                    }
                }
            })
        }
        console.log(student)
        if(!student){
            return res.status(404).json({ message: "Student not found." });
        }
        return res.status(200).json({ message: "Student Status Updated Successfully.", student});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong. Please try again later..." });
    }
}


export const uploadClearance = async (req, res) => {
    const {files, file, userId, body} = req;
    console.log(file)
    console.log(files)
    console.log(files.length)
    if (!files || files.length < 7) {
        return res.status(400).json({
            message: "Please provide all required documents."
        })
    }
    if (!body.postUtmeScore) {
        return res.status(400).json({
            message: "Please provide your POSTUTME score."
        })
    }
    try {
        await User.findByIdAndUpdate(userId, {
            postUtmeScore: body.postUtmeScore
        })
        files.forEach(async(file) => {
            const updatedUser = await User.updateOne(
                { _id: userId, "documents.fieldname": file.fieldname },
                {
                    "$set": {
                        "documents.$.path": file.originalname
                    }
                }
            )
            if (updatedUser.matchedCount === 0) {
                await User.findByIdAndUpdate(userId, {
                    '$push': {
                        documents: {
                            fieldname: file.fieldname,
                            path: file.originalname
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

export const complaintUpload = async (req, res) => {
    const  { complaint } = req.body;
    if(!complaint) {
        return res.status(400).json({
            message: "Please provide 'complaint' field."
        })
    }
    try {
        await User.findByIdAndUpdate( req.userId, {
            complaints: complaint,
        })
        res.status(200).json({
            message: "Request Made Successfully." })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const olevelverify = async (req, res) => {
    const {file, userId} = req;
    const { scratchCardPin } = req.body;
    console.log(file)
    if (!file || !scratchCardPin) {
        return res.status(400).json({
            message: "Please provide the required document and its PIN."
        })
    }
    try {
            const updatedUser = await User.updateOne(
                { _id: userId, "documents.fieldname": file.fieldname },
                {
                    "$set": {
                        "documents.$.path": file.originalname
                    }
                }
            )
            if (updatedUser.matchedCount === 0) {
                await User.findByIdAndUpdate(userId, {
                    '$push': {
                        documents: {
                            fieldname: file.fieldname,
                            path: file.originalname
                        }
                    }
                });
            }
            console.log(updateUser)
            
            const new_user = await User.findByIdAndUpdate(userId, {
                scratchCardPin
            })
            console.log(new_user)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    return res.status(200).json({
        message: "Files Uploaded Successfully."
    })
}
