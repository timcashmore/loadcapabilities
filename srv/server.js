//const parse = require('csv-parse');
const cds = require('@sap/cds');

cds.on('bootstrap', app => {


  app.post('/UploadFile', async (req, res) => {

    try {
      console.log("Server side File Upload Called");
    }
    catch (error) {
      console.log("Error=" + error);

    }




  });




  

});




/* module.exports = cds.service.impl (srv => {
  srv.before('CREATE', 'BusinessCapabilities', async (req) => {
    // Your logic to handle before create
  });

  srv.on('UPLOAD', 'BusinessCapabilities', async (req) => {
    const { file } = req.data;

    // Parse the CSV file
    const parsedData = parse(file.content, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ',' // Adjust this based on your CSV file delimiter
    });

    // Log the parsed data to the console
    console.log('Parsed CSV data:', parsedData);

    // Comment out the actual database insert
    // const result = await srv.transaction(req).run(
    //   INSERT.into('BusinessCapabilities').entries(dataToInsert)
    // );

    // Simulate a response without actually persisting to the database
    const result = { success: true, message: 'Data parsed successfully.' };

    return result;
  });

  srv.after('CREATE', 'BusinessCapabilities', async (data) => {
    // Your logic to handle after create
  });

  // Other service logic...
}); */
