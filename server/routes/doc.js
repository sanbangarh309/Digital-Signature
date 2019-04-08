const Doc = require.main.require('./models/Doc');
const jwt = require('jwt-then');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const San_Function = require.main.require('./functions');
const config = require.main.require('./custom_config');
const User = require.main.require('./user').models.user;
module.exports = (app) => {
    app.post('/api/get_docs', async (req, res, next) => {
        let query = {};
        if(req.body.token){
          const user = await jwt.verify(req.body.token, config.JWT_SECRET);
          const userMatched = await User.findById(user.sub);
          query = { 'user_id': ObjectId(userMatched._id) };
        }
        Doc.find(query)
        .exec()
        .then((docs) => res.json(docs))
        .catch((err) => next(err));
    });

    app.get('/api/doc/:id', async (req,res,next) => {
      console.log(req.params.id);
      Doc.findById(req.params.id)
        .exec()
        .then((doc) => {
          console.log(doc);
          res.json(doc);
        })
        .catch((err) => next(err));
    });

    app.post('/api/chktype', (req, res, next) => {
      let base64Data = req.body.doc_file;
      San_Function.uploadBase64Image(base64Data,function(buffer){
        res.json(buffer)
      });
    });

    app.post('/api/savedata',function(req,res){
      var fs = require('fs');
      San_Function.uploadFinalDoc(req.body.base64Data,function(buffer){
        return res.json(buffer)
      });
  })

    app.post('/api/add_doc', (req, res, next) => {
        San_Function.uploadFinalDoc(req.body.base64Data, async (buffer)=> { 
            const user = await jwt.verify(req.body.token, config.JWT_SECRET);
            const userMatched = await User.findById(user.sub);
            // console.log(userMatched);
            if (userMatched) { 
              if (buffer.name) {
                  let doc = new Doc();
                  doc.user_id = user.sub;
                  doc.title = buffer.name;
                  doc.price = req.body.price || 0;
                  doc.description = req.body.description || '';
                  doc.file = buffer.name;
                  doc.images = req.body.docs;
                  doc.save();
                  console.log(doc);
                  return res.json(doc);
              }else{
                return res.json({msg:'file not exist'});
              }
            }else{
              return res.json({msg:'user not exist'});
            }
      });
    });

    app.delete('/api/doc/:id', (req, res, next) => {
      // Doc.findOne({_id: ObjectId(req.params.id)})
      //   .exec()
      //   .then((doc) => {
      //     var fs = require('fs');
      //     console.log(doc);
      //     if ( typeof doc.file !== 'undefined' && doc.file ){
      //       console.log(config.directory+'/uploads/docs/'+doc.file);
      //       // fs.unlink(config.directory+'/uploads/docs/'+doc.file);
      //     }
      //     if ( typeof doc.images !== 'undefined' && doc.images[0] ){
      //       doc.images.forEach(el => {
      //         console.log(config.directory+'/uploads/docs/'+el.name);
      //         // fs.unlink(config.directory+'/uploads/docs/'+el.name);
      //       });
      //       let strn = doc.images[0].name.replace("_cnvrt_1", "").split('.');
            
      //       let pdf_file = strn[0]+'.pdf';
      //       if(pdf_file){
      //         console.log(config.directory+'/uploads/docs/'+pdf_file);
      //         // fs.unlink(config.directory+'/uploads/docs/'+pdf_file);
      //       }
      //     }
      //     res.json(doc);
      //   });
        Doc.findOneAndRemove({_id: req.params.id})
        .exec()
        .then((doc) => {
          var fs = require('fs');
          console.log(doc);
          if ( typeof doc.file !== 'undefined' && doc.file ){
            fs.unlink(config.directory+'/uploads/docs/'+doc.file);
          }
          if ( typeof doc.images !== 'undefined' && doc.images[0] ){
            doc.images.forEach(el => {
              fs.unlink(config.directory+'/uploads/docs/'+el.name);
            });
            let strn = doc.images[0].name.replace("_cnvrt_1", "").split('.');
            console.log(strn);
            let pdf_file = strn[0]+'.pdf';
            if(pdf_file){
              fs.unlink(config.directory+'/uploads/docs/'+pdf_file);
            }
          }
          res.json(doc);
        })
        .catch((err) => next(err));
    });

    app.put('/api/doc/:id', (req, res, next) => {
      San_Function.uploadFinalDoc(req.body.base64Data, async (buffer)=> {
        Doc.findById(ObjectId(req.params.id))
        .exec()
        .then((doc) => {
            if(doc.file){
              require('fs').unlinkSync(config.directory + "/uploads/docs/"+doc.file)
            }
            doc.title = buffer.name;
            doc.file = buffer.name;
            doc.save()
            .then(() => res.json(doc))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
      });
    });

    app.get('/files/:type/:img_name', function(req,res){
          var filename = req.params.img_name;
          var type = req.params.type;
          var ext  = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
          if (!ext) {
            ext = 'jpg';
          }
          if (ext == 'svg') {
            ext = 'svg+xml';
          }
          var fs = require('fs');
          var fileDir = config.directory+'/uploads/'+type+'/';
          fs.readFile(fileDir + filename, function (err, content) {
            if (ext == 'pdf') {
              res.writeHead(200,{'Content-type':'application/pdf'});
              res.end(content);
            }else if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              res.end("No such image");
            } else {
              //specify the content type in the response will be an image
              res.writeHead(200,{'Content-type':'image/'+ext});
              res.end(content);
            }
          });
      });
};
