const csv = require('papaparse');
const cds = require('@sap/cds');
const express = require('express');
const fileUpload = require('express-fileupload');

cds.on('bootstrap', app => {

  app.use(fileUpload({createParenthPath: true }));

  app.post('/UploadFile', async (req, res) => {

    try {
      console.log("Server side File Upload Called");
      const oFile = req.files.file;
      console.log("Filename= ",oFile.name);
      const { capabilities } = cds.entities("CapabilityService.BusinessCapabilities");
      //console.log("Elements",Object.keys(capabilities.elements));
      
      const parsedData = csv.parse(oFile.data.toString(), {
        header: true,
        //skip_empty_lines: true,
        delimiter: ',' // Adjust this based on your CSV file delimiter
      });
      //console.log("cds.entities"+cds.entities("BusinessCapabilities"));
      // Log the parsed data to the console
      console.log('Parsed CSV data:', parsedData.data);
      const dbop = await cds.run(INSERT.into('APP_CAPABILITIES_BUSINESSCAPABILITIES').entries(parsedData.data));
      if (dbop.req.error.length==0) {
        console.log("Insert ok");
        res.send("Insert ok");

      }
      else {
        res.send("Error in insert");
        console.leg(error);

      }
      
    //res.send("File Upload Complete");
    }
    catch (error) {
      console.log("Error=" + error);
      res.send("File Upload Error");

    }
    // Log the parsed data to the console
    //console.log('Parsed CSV data:', parsedData);
    

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
