const AWS=require('aws-sdk');


const uploadToS3=(data,filename)=>{
    const BUCKET_NAME='expensetrackingwebsite';
    const IAM_USER_KEY='AKIA3QXJOPMGHM3AZSEF';
    const IAM_USER_SECRET='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';
    
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,secretAccessKey:IAM_USER_SECRET,
        // Bucket:BUCKET_NAME
    })
    
    
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('Something went wrong',err);
                  reject(err);
                }else{
                    // console.log('success',s3response);
                    resolve(s3response.Location);
                }
    
            })
        })
        
    
    
    }

    module.exports={
        uploadToS3
    }