const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

async function extractText(filePath, fileType) {
    if (fileType === 'pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } else if (fileType === 'docx') {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } else if (fileType === 'txt') {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return '';
}

module.exports = extractText;
