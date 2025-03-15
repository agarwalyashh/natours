class AppError extends Error{
    constructor(message,statusCode,err=null){
        super(message)
        this.statusCode=statusCode
        this.status=`${statusCode}`.startsWith('4')?"fail":"error";
        this.isOperational=true; // for all operational errors
        if (err) {
            this.name = err.name || this.name;
            this.code = err.code || null;
            this.errors = err.errors || null;
          }

        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=AppError