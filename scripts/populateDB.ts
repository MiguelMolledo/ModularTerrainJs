const mongoose = require('mongoose');
const xlsx = require('xlsx');

// Define the schema for the materials
const materialSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    webLinks: [String],
    price: Number,
    dimensions: String,
    tags: [String],
});

// Create the Material model
const Material = mongoose.model('Material', materialSchema);

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/MT_DB_DEV';

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: any) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
mongoose.connection.dropDatabase()
// Function to populate the database from an Excel file
const populateDatabaseFromExcel = (excelFilePath: string) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

        // Map the Excel data to the required JSON format
        const materials = sheetData.map((row: any) => ({
            name: row.name || row.nombre, // Support both "name" and "nombre" headers
            description: row.description,
            image: row.image,
            webLinks: row.webLinks ? row.webLinks.split(';') : [], // Split webLinks by semicolon
            price: parseFloat(row.price),
            dimensions: row.dimensions,
            tags: row.tags ? row.tags.split(',') : [], // Split tags by comma
        }));

        // Insert materials into the database
        Material.insertMany(materials)
            .then(() => {
                console.log('Database populated successfully!');
                mongoose.connection.close();
            })
            .catch((err: any) => {
                console.error('Error populating database:', err);
                mongoose.connection.close();
            });
    } catch (err) {
        console.error('Error reading Excel file:', err);
        mongoose.connection.close();
    }
};

// Run the script with the path to the Excel file
const excelFilePath = './data/materials.xlsx'; // Replace with the path to your Excel file
populateDatabaseFromExcel(excelFilePath);