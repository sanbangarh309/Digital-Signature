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

    app.post('/api/chktype', (req, res, next) => {
      let base64Data = req.body.doc_file;
      San_Function.uploadBase64Image(base64Data,function(buffer){
        res.json(buffer)
      });
    });

    app.post('/api/savedata',function(req,res){
      var fs = require('fs');
      // var Jimp = require('jimp');
      // var uploafdf_dir = config.directory + "/uploads/docs/";
      // const PDFDocument = require('pdfkit');
      // const doc = new PDFDocument;
      // doc.pipe(fs.createWriteStream(uploafdf_dir+'output.pdf'));
      // for(let j =0;j < req.body.docs.length; j++){
      //   console.log(req.body.docs[j]);
      //   if(j != 0){
      //     doc.addPage();
      //   }
      //   doc.image(uploafdf_dir+req.body.docs[j].name, 0, 15, {width: 600})
      //   // .font('fonts/PalatinoBold.ttf')
      //     .fontSize(23);
      //     for (var i=0; i < req.body.data.length; i++) {
      //       console.log(req.body.data[i]);
      //       if (parseInt(req.body.data[i].doc_id) == parseInt(j)+1) {
      //         doc.text(req.body.data[i].doc_text, req.body.data[i].top, req.body.data[i].left);
      //       }
      //     }
      // }
    //   doc.image(uploafdf_dir+'pdf_yPEtx_cnvrt_1.png', 0, 15, {width: 600})
    //   // .font('fonts/PalatinoBold.ttf')
    //     .fontSize(23)
    //     .text(req.body.text, 100, 100);
    //  doc.addPage()
    //     .image(uploafdf_dir+'pdf_yPEtx_cnvrt_2.png', 0, 15, {width: 600})
    //     // .font('fonts/PalatinoBold.ttf')
    //     .fontSize(23)
    //     .text(req.body.text, 100, 100);
    //  doc.save();
        // .moveTo(100, 150)
        // .lineTo(100, 250)
        // .lineTo(200, 250)
        // .fill("#FF3300");
    //  doc.end();
    // let sign_data = JSON.parse(req.body.docs);
      // for (var key in sign_data) {
        // Jimp.read(uploafdf_dir+req.body.doc.name)
        //   .then(image => {
        //     Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
        //       for (var i=0; i < req.body.data.length; i++) {
        //           if (parseInt(req.body.data[i].doc_id) == parseInt(req.body.key)+1) {
        //             image.print(
        //               font,
        //               req.body.data[i].top,
        //               req.body.data[i].left,
        //               {
        //                 text: req.body.data[i].doc_text,
        //                 alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        //                 alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        //               },
        //               100,
        //               // (err, image, { x, y }) => {
        //               //   image.print(font, x, y + 20, 'More text on another line', 50);
        //               // }
        //             );
        //           }
        //           console.log(req.body.data[i]);
        //       }
              
        //       var file = uploafdf_dir+'new_name_'+req.body.key+'.' + image.getExtension();
        //       // console.log(file);
        //       image.write(file);
        //       // fs.unlink(uploafdf_dir+'pdf_yPEtx_cnvrt_1.png', (err) => {
        //       //   if (err) throw err;
        //       //   console.log('pdf_yPEtx_cnvrt_1.png');
        //       //   image.write(file);
        //       // });    
        //       return res.json(req.body)
        //   })
        //   .catch(err => {
        //     // return res.json(err)
        //   });
        // });
      // console.log(req.body.doc);
      // }
      // Object.keys(req.body.docs).forEach(function(doc) {
      //   let obj = req.body.data.find(d => d.doc_id === 'string 1');
      //   console.log(doc);
      // });
      
    return res.json(req.body)
  })

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
