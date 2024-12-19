export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://patcount.fiu.edu/garagecount.xml');

    if (!response.ok) {
      throw new Error(`Failed to fetch XML data. Status: ${response.status}`);
    }

    let xmlData = await response.text();

    const cleanXmlData = xmlData
      .replace(/^\uFEFF/g, '')  // Remove BOM
      .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .trim();

    const garageMatch = cleanXmlData.match(/<GarageCount>(.*?)<\/GarageCount>/s);

    if (!garageMatch) {
      return res.status(500).json({
        message: 'Could not find GarageCount element',
        cleanData: cleanXmlData.slice(0, 200)
      });
    }

    const garagesXml = garageMatch[1];
    const garages = garagesXml.split('</Garage>').map(garage => {
      if (!garage.includes('<Garage>')) return null;

      const getName = garage.match(/<GarageName>(.*?)<\/GarageName>/);
      const getStudentSpaces = garage.match(/<StudentSpaces>(.*?)<\/StudentSpaces>/);
      const getStudentMax = garage.match(/<StudentMax>(.*?)<\/StudentMax>/);
      const getOtherSpaces = garage.match(/<OtherSpaces>(.*?)<\/OtherSpaces>/);
      const getOtherMax = garage.match(/<OtherMax>(.*?)<\/OtherMax>/);

      if (!getName || !getStudentSpaces || !getStudentMax || !getOtherSpaces || !getOtherMax) {
        return null;
      }

      return {
        garageName: getName[1],
        studentSpaces: parseInt(getStudentSpaces[1]),
        studentMax: parseInt(getStudentMax[1]),
        otherSpaces: parseInt(getOtherSpaces[1]),
        otherMax: parseInt(getOtherMax[1])
      };
    }).filter(Boolean);

    if (garages.length === 0) {
      return res.status(500).json({
        message: 'No valid garages found',
        cleanData: cleanXmlData.slice(0, 200)
      });
    }

    res.status(200).json(garages);
  } catch (error) {
    console.error('Error fetching parking data:', error);
    res.status(500).json({
      message: 'Error fetching parking data',
      error: error.message
    });
  }
}