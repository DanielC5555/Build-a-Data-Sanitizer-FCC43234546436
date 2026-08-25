import {load} from "cheerio";

export function inputCleaner(req, res, next){

  //convert to lower case
  if(req.body.username){
    req.body.username = req.body.username.toLowerCase();
  }

  //strip html tags if exists
  if(req.body.comment){
    const $ = load(req.body.comment);
    req.body.comment = $.text();
  }

  //call next
  next();
}

export function inputValidator(req, res, next){
  //inputValidator should call next() if req.body.username is at least 3 characters long.
  if(req.body.username && req.body.username.length >= 3){next();}
  //Otherwise, it should redirect to /form?error=Username must be at least 3 characters. without calling next().
  else{res.redirect("/form?error=Username must be at least 3 characters.");}
}
