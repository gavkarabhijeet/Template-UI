export var config = {
  //Local  5.128 - akshay
  //local  5.129 - aniket

  // Prod Environment
  // pageUrl:"http://icici-server15.13.71.81.159.nip.io",
  // url:"http://icici-server15.13.71.81.159.nip.io/api/",
  // appURL: "http://icici-server15.13.71.81.159.nip.io",

  // IBM Environment
    pageUrl: "http://iciciserver-prod.52.117.58.210.nip.io/",
    url: "http://iciciserver-prod.52.117.58.210.nip.io/api/",
    appURL: "http://iciciserver-prod.52.117.58.210.nip.io",
    imageUrl: "http://iciciserver-prod.52.117.58.210.nip.io/api/imageAPI/",
  // // Non Prod Environment
  // url:"http://icici-server14.13.71.81.159.nip.io/api/",
  // appURL: "http://icici-server14.13.71.81s.159.nip.io",

  
  //Data for UAT
  
  // pageUrl: "http://iciciserver-non-production.13.71.81.159.nip.io/",
  // url:"http://iciciserver-non-production.13.71.81.159.nip.io/api/",
  // appURL:"http://iciciserver-non-production.13.71.81.159.nip.io",
  // imageUrl:"http://iciciserver-non-production.13.71.81.159.nip.io/api/imageAPI/",
   version:"v1.2",
  //Data for Prod
  // pageUrl: "https://ixpress.icicibank.com/",
  // url:"https://ixpress.icicibank.com/api/",
  // appURL:"https://ixpress.icicibank.com",
  // localhost
  // pageUrl: "http://192.168.5.168:4200/",
  // url: "http://192.168.5.156:3002/api/",
  // appURL: "http://192.168.5.156:3002",
  // imageUrl: "http://192.168.5.156:3002/api/imageAPI/",
  appName: "Users",
  templateNameYaml: "template.yaml",
  fileNameYaml_Scene_1: "ecollection_LEND_File_To_JSON.yaml",
  fileNameYaml_Scene_4: "ecollection_LEND_File_To_JSON_2.yaml",
  templateNameEsql: "template.esql",
  fileNameEsql_Scene_1: "ecollection_LEND_File_To_JSON.esql",
  fileNameEsql_Scene_2_Response: "ecollection_LEND_File_To_JSON_Response.esql",

  fileNameEsql_Scene_1_Request_1: "CreateClientAPIRequest.esql",

  fileNameEsql_Scene_2_Request_1: "CreateClientAPIRequest.esql",
  fileNameEsql_Scene_2_Response_1: "CreateRemitterRefundMessage.esql",

  fileNameEsql_Scene_3_Request_1: "CreateClientAPIRequest.esql",
  fileNameEsql_Scene_3_Response_1: "CheckValidationStatus.esql",
  fileNameEsql_Scene_3_Response_2: "CreateRemitterFundTransferMessage.esql",
  fileNameEsql_Scene_3_Response_3: "CreateRemitterRefundMessage.esql",

  fileNameEsql_Scene_4_Request_1: "CreateClientAPIRequest.esql",
  fileNameEsql_Scene_4_Request_2: "ConfirmationRequestCreation.esql",
  fileNameEsql_Scene_4_Response_1: "CheckValidationStatus.esql",
  fileNameEsql_Scene_4_Response_2: "ConfirmationStatusCheck.esql",
  fileNameEsql_Scene_4_Response_3: "CreateFundTransferMessage.esql",
  fileNameEsql_Scene_4_Response_4: "CreateRefundMessage.esql",

  fileName_yaml_validation:
    "eCollection_TwoLevel_BankClientValidation_Intermediate_IPS_Profunds_Validation.yaml",
  fileName_yaml_confirmation:
    "eCollection_TwoLevel_BankClientValidation_Intermediate_IPS_Profunds_Confirmation.yaml",

  iSurePayEsql_Scene_1_Request_2: "TransformValidationRequestMessage.esql",
  iSurePayEsql_Scene_1_Request_1: "TransformReceiptRequestMessage.esql",
  iSurePayEsql_Scene_1_Response_2: "TransformValidationResponseMessage.esql",
  iSurePayEsql_Scene_1_Response_1: "TransformReceiptResponseMessage.esql",

  iSurePayYaml_Scene_1_Validation:
    "iSurePay_RT_ChequeCash_ClientValidation_iCore_Validation.yaml",
  iSurePayYaml_Scene_1_Receipt:
    "iSurePay_RT_ChequeCash_ClientValidation_iCore_Receipt.yaml"
};
 window.name = config.url
