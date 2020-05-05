import { Router, Request, Response, response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Here we can consume data within our server

// Get all feed items or in other words collecting feed items (get request) [analogue see post request down below]
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]}); // declaring variable items locally and using interface from sequelize to find and count all ordering by id descending
    items.rows.map((item) => { // mapping and manipulating the url
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items); // send the items back to client
});

//@TODO: DONE
//Add an endpoint to GET a specific resource by Primary Key

router.get('/:id', 
            requireAuth, 
            async (req: Request, res: Response) => {
    // destruct path params to extract primary key
    const { id } = req.params;

    // try to find feed by primary key
    const item = await FeedItem.findByPk(id);

    if(item == null) {
        // respond with an error if pk does not exist
        return res.status(400).send('id does\'t exist');
    } else {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
        }
        return res.status(200).send(item); // send the item back to client
    }
});


// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself

// // ******************
//     const caption = req.body.caption; // save the caption in local variable
//     console.log("===============================")
//     console.log(caption)
//     const fileName = req.body.url; // save fileName in local variable
//     console.log(fileName)
//     // // check Caption is valid
//     // if (!caption) {
//     //     return res.status(400).send({ message: 'Caption is required or malformed' });
//     // }

//     // // check Filename is valid
//     // if (!fileName) {
//     //     return res.status(400).send({ message: 'File url is required' });
//     // }

//     // const item = await new FeedItem({ // if tests pass new FeedItem is instanciated here
//     //         caption: caption,
//     //         url: fileName
//     // });

//     // const saved_item = await item.save(); // Sequelize interface is used to save that item

//     // saved_item.url = AWS.getGetSignedUrl(saved_item.url);
//     // res.status(201).send(saved_item);

// // ******************
        res.send(500).send("not implemented")
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    requireAuth, // imposed to check Authentication
    async (req: Request, res: Response) => {
    const caption = req.body.caption; // save the caption in local variable
    const fileName = req.body.url; // save fileName in local variable

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({ // if tests pass new FeedItem is instanciated here
            caption: caption,
            url: fileName
    });

    const saved_item = await item.save(); // Sequelize interface is used to save that item

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;