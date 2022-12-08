module.exports = sendResponse;

function sendResponse(req, res, obj) {
    let message = "";
    let token = "";
    if (obj.type == 'db_error') {
        console.info(obj.error.sqlMessage);
        return res.status(400).json({
            status: false,
            message: "Invalid Data Processed",
            error_message: obj.error.sqlMessage
        });
    } else if (obj.type == 'bad_request') {
        return res.status(400).json({
            status: false,
            message: "Bad Request"
        });
    } else if (obj.type == 'response') {
        let response = {
            result: obj.status,
            error: obj.errorCode,
            errorMsg: obj.message,
            data: obj.data
        }
        return res.status(200).json(response);
    } else if (obj.type == 'internal_error') {
        let response = {
            result: obj.status,
            error: obj.errorCode,
            errorMsg: obj.message
        }
        return res.status(200).json(response);
    } else {
        return res.status(401).json({
            status: 'Unauthorized',
        });
    }
}