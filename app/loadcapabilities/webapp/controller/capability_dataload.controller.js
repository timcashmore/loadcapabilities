sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/core/mvc/Controller"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller) {
    "use strict";

    return Controller.extend("loadcapabilities.controller.capability_dataload", {
      onInit: function () {

      },
      handleUploadComplete: function (oEvent) {
        var sResponse = oEvent.getParameter("response"),
          aRegexResult = /\d{4}/.exec(sResponse),
          iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
          sMessage;

        if (sResponse) {
          sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
          MessageToast.show(sMessage);
        }
      },


      onFileSelect: function (oEvent) {
        var oFileUploader = oEvent.getSource();
        var oFile = oFileUploader.getFileObject();
        var oFormData = new FormData();
        oFormData.append("file", oFile);

        // Log the selected file information
        console.log("Selected File:", oFile.name, "Size:", oFile.size, "Type:", oFile.type);
      },

      onUploadPress: function () {
        console.log("uploadpress");
        var oFileUploader = this.getView().byId("fileUploader");
        oFileUploader.checkFileReadable().then(function () {
          oFileUploader.upload();
        }, function (error) {
          MessageToast.show("The file cannot be read. It may have changed.");
          console.log("uploadpress error");
        }).then(function () {
          console.log("uploadpress all good");
          oFileUploader.clear();
        });

        /* var oFile = oFileUploader.getFileObject();
        var oFormData = new FormData();
        oFormData.append("file", oFile);
  
        try {
          await this.getOwnerComponent().getModel("CapabilityService").callFunction("/UPLOAD", {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: oFormData
          });
  
          // Handle success
          console.log("File uploaded successfully!");
        } catch (error) {
          // Handle error
          console.error("File upload failed:", error);
        } */
      },

      onFileTypeMismatch: function (oEvent) {
        // Handle the case where the user selects a file with an incorrect type
        var oFileUploader = oEvent.getSource();
        var aFileTypes = oFileUploader.getFileType();
        console.error("File type mismatch. Allowed file types:", aFileTypes.join(", "));
      }
    });
  });
