   /**
     * @api {get} /api/users Users list
     * @apiVersion 1.0.0
     * @apiName GetAllUsers
     * @apiGroup Users
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "F0ZSBG3-N1HM4XD-QSGHC5M-819XB29"
     *     }
     *
     * @apiError {String} Invalide API Key.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 OK
     *     {
     *       "error": "La demande n'est pas valide."
     *     }
     * @apiSuccess {json} Users list.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         records : [{}, {}, ...]
     *         nbRecords : 100,
     *         page : {
     *             current : 1,
     *             previous: null,
     *             next: 2,
     *             last: 10
     *         }
     *     }
     */
