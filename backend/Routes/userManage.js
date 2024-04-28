const router = require("express").Router();
const { User, validate } = require("../models/user");

//get all user data by admin
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to get users." });
    }
});

//search user by admin
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to get user." });
    }
});


//update user profile by user(farmer,buyer,delivery,expert)
router.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user." });
    }
});

//delete user by admin
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user." });
    }
});

// Generate and send PDF
router.post("/download", async (req, res) => {
    try {
        const { user } = req.body;
        console.log({ user });
        const doc = new PDFDocument();
        let buffers = [];

        doc.on("data", (buffer) => {
            buffers.push(buffer);
        });

        doc.on("end", () => {
            let pdfData = Buffer.concat(buffers);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=user_data.pdf");
            res.send(pdfData);
        });

        // Add user data to the PDF document
        doc.fontSize(20).text("User Data", { align: "center" }).moveDown();
        doc.fontSize(12).text(`ID: ${user._id}`).moveDown();
        doc.text(`First Name: ${user.firstName}`).moveDown();
        doc.text(`Last Name: ${user.lastName}`).moveDown();
        doc.text(`Email: ${user.email}`).moveDown();
        doc.text(`Role: ${user.role}`).moveDown();

        // Finalize the PDF document
        doc.end();
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        res.status(500).json({ message: "Failed to generate PDF" });
    }
});


module.exports = router;