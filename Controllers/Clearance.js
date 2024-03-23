export const uploadClearance = (req, res) => {
    const documents = req.files;
    console.log(documents)
    if (!documents || documents.length < 1) {
        return res.status(400).json({
            message: "Please provide all required documents."
        })
    }
    return res.status(200).json({
        message: "Files Uploaded Successfully."
    })
}
