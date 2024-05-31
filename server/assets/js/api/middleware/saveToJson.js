const fs = require("fs");
const path = require("path");

const saveDataToJsonFile = (data, directory, fileName) => {
    createDirectoryIfNotExists(directory);
    
    const filePath = path.join(directory, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

module.exports = saveDataToJsonFile;