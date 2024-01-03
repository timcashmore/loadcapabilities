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
      const fields = cds.entities['app.capabilities.BusinessCapabilities'];
      console.log("Entity Fields = ",Object.keys(fields.elements));      
      const parsedData = csv.parse(oFile.data.toString(), {
        header: true,
        //skip_empty_lines: true,
        delimiter: ',' // Adjust this based on your CSV file delimiter
      });
      // Log the parsed data to the console
      //console.log('Parsed CSV data:', parsedData);
      // Check that the fields match 
      console.log("Num of Fields in Entity =",Object.keys(fields.elements).length);
      console.log("Num of Fields in CSV =",parsedData.meta.fields.length);
      for (const fieldName in parsedData.meta.fields) {
        console.log('FieldName = ',parsedData.meta.fields[fieldName]);

      }

      const dbop = await cds.run(INSERT.into('APP_CAPABILITIES_BUSINESSCAPABILITIES').entries(parsedData.data));
      if (dbop.req.error.length==0) {
        console.log("Insert ok");
        res.send("Insert ok");

      }
      else {
        res.send("Error in insert:"+error);
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
