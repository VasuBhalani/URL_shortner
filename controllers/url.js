const URL = require("../model/url");

// async function generateURL(req,res){
//     // console.log("generating URL")
//     const userUrl = req.body

//     if(!userUrl.url){ return res.status(400).json({error:"URL is Required"})}

    
//     const { nanoid } = await import('nanoid');
//     const shortId = nanoid(8);

//     await URL.create({
//         shortId: shortId,
//         redirectURL: userUrl.url,
//         visitHistory: [],
//         createdBy: req.user._id
//     });
     
//     return res.redirect('/', {id :shortId});
//     // return res.status(200).json({id :shortId});

// }    

async function generateURL(req, res) {
    // console.log("generating URL");
    const userUrl = req.body;

    if (!userUrl.url) {
        return res.status(400).json({ error: "URL is Required" });
    }

    const existingURL = await URL.findOne({ redirectURL: userUrl.url, createdBy: req.user._id });
    
    if (existingURL) {
        //  console.log(existingURL)
        return res.status(400).json({ error: "URL Already Exists" });
    }
    const { nanoid } = await import('nanoid');
    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectURL: userUrl.url,
        visitHistory: [],
        createdBy: req.user.id
    });

    return res.redirect(302, `/?id=${shortId}`);
    // return res.status(200).json({id :shortId});
}

async function redirectURL(req,res){
    const shortId = req.params.shortId;
    // console.log(shortId)
    let date =new Date()
    let data = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    // console.log(data)
    const url = await URL.findOneAndUpdate(
        {shortId: shortId},
        {$push : 
            {  visitHistory : 
                {
                  timestamp : data
                }
            }
        },
    );

    if(!url){return res.status(404).json({error:"No URL Found"})}
    res.redirect(url.redirectURL);
}    


async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const url = await URL.findOne({shortId: shortId});
    res.json({ Clicks : url.visitHistory.length  , timestamp :url.visitHistory });
}



module.exports = {generateURL,redirectURL,getAnalytics}