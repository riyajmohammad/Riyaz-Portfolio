const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Riyaj:mongo123@cluster0.5cpud2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Schema and Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// API Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(200).json({ message: "Message received!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving message" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
