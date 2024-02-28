const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt


const app = express();

app.use(cors());
app.use(bodyParser.json());

database_url = 'mongodb+srv://palindrajit10:BR7ebSUlu9i9UPUZ@cluster0.3kxj1mm.mongodb.net/'
mongoose.connect(database_url, {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const notesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    groups: [{
        name: { type: String, required: true },
        color: { type: String, required: true },
        notes: { type: [String], default: [], timeStamps: true}
    }]
});


const NotesGroup = mongoose.model('NotesGroup', notesSchema);

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(200).json({ message: "Login successful", username: user.username, email: user.email, id: user._id });
        } else {
            res.status(401).send("Invalid password");
        }
    } else {
        res.status(404).send("User not found");
    }
});

app.post("/create-group", async (req, res) => {
    try {
        const { userId, groupName, groupColor } = req.body;
        if (!userId || !groupName || !groupColor) {
            return res.status(400).json({ message: 'userId, groupName, and groupColor are required.' });
        }
        let existingGroup = await NotesGroup.findOne({ userId });

        if (existingGroup) {
            existingGroup.groups.push({ name: groupName, color: groupColor, notes: [] });
            await existingGroup.save();
            res.status(201).json({ message: 'Group added to existing notes.', group: existingGroup });
        } else {
            const newGroup = new NotesGroup({
                userId,
                groups: [{ name: groupName, color: groupColor, notes: [] }]
            });
            await newGroup.save();
            res.status(201).json({ message: 'New notes group created.', group: newGroup });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error creating group");
    }
})

app.post('/add-note', async (req, res) => {
    const { userId, groupId, note } = req.body;
    if (!userId || !groupId || !note) {
        return res.status(400).json({ message: 'userId, groupId, and note are required.' });
    }
    try {
        const group = await NotesGroup.findOne({ userId });
        if (group) {
            const selectedGroup = group.groups.find(group => group._id.toString() === groupId);
            if (selectedGroup) {
                selectedGroup.notes.push(note);
                await group.save();
                res.status(201).json({ message: 'Note added to group.' });
            } else {
                res.status(404).json({ message: 'Group not found' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})


app.post('/get-groups', async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'userId is required.' });
    }
    try {
        const groups = await NotesGroup.findOne({ userId });
        if (groups) {
            res.status(200).json({ groups: groups.groups });
        } else {
            res.status(404).json({ message: 'Groups not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/get-group-notes', async (req, res) => {
    const { userId, groupId } = req.body;
    if (!userId || !groupId) {
        return res.status(400).json({ message: 'userId and groupId are required.' });
    }
    try {
        const group = await NotesGroup.findOne({ userId });
        if (group) {
            const selectedGroup = group.groups.find(group => group._id.toString() === groupId);
            if (selectedGroup) {
                res.status(200).json({ groupDetails: selectedGroup });
            } else {
                res.status(404).json({ message: 'Group not found' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('delete-group')




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
