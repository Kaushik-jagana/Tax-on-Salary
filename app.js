const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    // console.log(100)
    res.render('index');    
});

app.post('/', (req, res) => {
    // console.log(100)
    let val = req.body;
    let ans= sol(val["LPA"]);
    console.log(ans);
    // res.send(`The amount is ${ans}`);
    res.render('home',{amount:ans , total : val["LPA"]-ans});

});

function sol(amt){
    let ans=0;
    // let amt=Number(amount);
    if(amt>250000){
        ans+= (Math.min(amt-250000,750000))/10; 
        console.log(ans);
    }
    if(1000000<amt ){
        ans+=(Math.min(amt-1000000,500000))*(15/100);
        console.log(ans);
    }
    if(amt>1500000){
        ans+=(amt-1500000)*(30/100);
    }
    console.log("ans=")
    console.log(ans);
    return amt-ans;   
}

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})