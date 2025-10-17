
function wrapAsync(fn){
  return function (req,res,next){
      fn(req,res,next).catch((err)=>{
        console.log(err);
        res.json({err:"An error has occured"});
        next(err);
    });
  } 
}


export default wrapAsync;

