const Doc = require.main.require('./models/Doc');
const San_Function = require.main.require('./functions');
const config = require.main.require('./custom_config');
module.exports = (app) => {
    app.post('/api/get_docs', (req, res, next) => {
        let query = {};
        if(req.body.qry){
            query = { 'name': new RegExp(req.body.qry, 'i') };
        }
        Doc.find(query)
        .exec()
        .then((docs) => res.json(docs))
        .catch((err) => next(err));
    });

    app.post('/api/add_doc', (req, res, next) => {
        let base64Data = req.body.images;
        San_Function.uploadBase64Image(base64Data,function(image_name){
            let doc = new Doc();
            doc.user_id = 1;
            doc.title = req.body.product_name;
            doc.price = req.body.price;
            doc.description = req.body.description;
            if (image_name) {
                doc.file = image_name;
            }
            doc.save();
          // data._id
        //   San_Function.sanGenerateBarCode(prod._id, function(qrcode){
        //     doc.qrcode = qrcode;
        //     // data.save();
        //     Doc.findByIdAndUpdate(prod._id, prod, {new: true}, function (err, product) {
        //         if (err) return res.status(500).send("There was a problem updating the user.");
        //         res.status(200).send(product);
        //     });
        // });
      });

    });

    app.delete('/api/doc/:id', (req, res, next) => {
        Doc.findOneAndRemove({_id: req.params.id})
        .exec()
        .then((doc) => {
          var fs = require('fs');
          if ( typeof doc.images !== 'undefined' && doc.images[0] ){
            fs.unlink(config.directory+'/uploads/products/'+doc.images[0]);
          }
          if ( typeof doc.qrcode !== 'undefined' && doc.qrcode ){
            fs.unlink(config.directory+'/uploads/qrcodes/'+doc.qrcode);
          }
          res.json(product);
        })
        .catch((err) => next(err));
    });

    app.put('/api/doc/:id', (req, res, next) => {
        Product.findById(req.params.id)
        .exec()
        .then((doc) => {
            doc.save()
            .then(() => res.json(doc))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
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
          var imageDir = config.directory+'/uploads/'+type+'/';
               fs.readFile(imageDir + filename, function (err, content) {
                    if (err) {
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
