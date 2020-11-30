const { React, messages, channels } = require("powercord/webpack");
const { Menu } = require('powercord/components');
const { FormTitle, Button } = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const ImgurAnonymousUploader = require('imgur-anonymous-uploader');
const { resolveCompiler } = require("powercord/compilers");
const fs = require('fs')
const { sleep } = require('powercord/util');
var exec = require('child_process').exec;
const gm = require('gm').subClass({imageMagick: true});
class Form extends React.Component {
    
    clicktheimagehandler = () => {
        const fileInput = document.getElementById('hellorealone');
        fileInput.click()
    }
    exittheform = () => {
        const fileInput = document.getElementById('heybrohowyoudin');
        fileInput.click()
    }
    async onImageChange (event) {
        console.log("started")
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const  newimage = await this.imguruploader(img.path)
            this.saveimgurl(await newimage)
            this.setState({
            image: await newimage
        });
        this.createtheimg(await newimage, "heybrolookatthat")
        console.log("IT PROBABLY AINT GONNA WORK BUT HEY ITS WORTH A TRY")

            
        }
    };
    async imguruploader(IMAGE2UPLOAD) {
       
        const uploader = new ImgurAnonymousUploader('3514d572f81c1bc');
        const uploadResponse = await uploader.upload(IMAGE2UPLOAD);
        const url = uploadResponse.url
        let responce = await Promise.resolve(url)
        console.log(url)
        return(responce)
        
    };
    
    
      
    // resizeimage(path) {
    //     import resizer from 'node-image-resizer';
    //     const setup = { 
    //         all: {
    //             path: 'C:/Users/Aruldev/powercord/src/Powercord/plugins/button-test/components/savedimages',
    //             quality: 80
    //         },                 // general settings to apply on each thumbnail
    //         versions: [{
    //             quality: 100,
    //             prefix: 'small_',
    //             width: 51,
    //             height: 31
    //         },]   // unique settings for each thumbnail; will overwrite general setting
    //       };
    //     (async () => {
    //     await resizer(path, setup);
    //     })();
    // }
    saveimgurl(content) {
                
        fs.appendFile('C:/Users/Aruldev/powercord/src/Powercord/plugins/button-test/components/images.txt', content + "\n", err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
});
    }
    
    //ok im trying to fix the onclick with set atribute not working hehehehe i FIXED IT HAAHH
    async createtheimg(imageForIT, idelement) {
        await new Promise(r => setTimeout(r, 600));
        let thingo = document.createElement(`img`)
        thingo.setAttribute('src', imageForIT)
        thingo.setAttribute('id', idelement)
        thingo.setAttribute('height', "50")
        thingo.setAttribute('style', "max-height: 50%; max-width: 50%")
     //       thingo.setAttribute('onclick','this.sendthemessage();');
     //       thingo.setAttribute('onClick', `messages.sendMessage(channels.getChannelId(), { content: "${imageForIT}", })`)
        thingo.addEventListener("click", function(){
            messages.sendMessage(channels.getChannelId(), { content: imageForIT, })
        })
        const toappendto = document.getElementById("for-the-images-nigga")
        toappendto.appendChild(thingo)
    
    }
    readimagedottxtfile() {
        var text = fs.readFileSync("C:/Users/Aruldev/powercord/src/Powercord/plugins/button-test/components/images.txt").toString('utf-8');
        var textByLine = text.split("\n")

        return textByLine;
    }
    sendthemessage(image){
        messages.sendMessage(channels.getChannelId(), { content: image, })
    }
    getCount(parent, getChildrensChildren){
        var relevantChildren = 0;
        var children = parent.childNodes.length;
        for(var i=0; i < children; i++){
            if(parent.childNodes[i].nodeType != 3){
                if(getChildrensChildren)
                    relevantChildren += this.getCount(parent.childNodes[i],true);
                relevantChildren++;
            }
        }
        return relevantChildren;
    }
    atthestart() {
        var text = fs.readFileSync("C:/Users/Aruldev/powercord/src/Powercord/plugins/button-test/components/images.txt").toString('utf-8');
        var textByLine = text.split("\n")
        let numberinarray = textByLine.length
        for (let i = numberinarray; i != 0; i--){
            console.log(i)
            let ok = i - 1
            if (textByLine[ok] == "undefined") console.log("is undfined")
            else{
            this.createtheimg(textByLine[ok], `heybrolookatthat-${i}`)
            }
        }
        
    }
    constructor(props) {
        super(props);

        this.state = {
            image: null
        };
        this.atthestart()
        this.onImageChange = this.onImageChange.bind(this);

        
    }
    paste_link(link) {
        
    }    
    async waitForElement(querySelector, win) {
        let elem;
        while (!(elem = win.document.querySelector(querySelector))) {
        await sleep(1);
        }
        return elem;
    }
    render() {
        return (
        <Modal id="buttontgitestingtingo" backdropOpacity= {100} isVisible={true} transparent={true}>
        <Modal.Header>
        <FormTitle tag="h4">TEST</FormTitle>
        </Modal.Header>
        <Modal.Content>
        <input type="file" hidden="hidden" id="hellorealone" onChange={this.onImageChange}/>
        <div id="for-the-images-nigga" /> 
        <input type="text" name="link" id="INPUTTFORTHETHINGO" />
        </Modal.Content>
        
        <Modal.Footer>
            <Button
                color={Button.Colors.GREEN}
                onClick={() => {
                    console.log(this.state.image)
                    
                    var inputValue = document.getElementById("INPUTTFORTHETHINGO").value;
                    console.log(inputValue)
                    var element = document.getElementById("for-the-images-nigga");
                    let number = this.getCount(element, false); // Simply one level
                    let newNumber = number - 1;
                    this.saveimgurl(inputValue)
                    this.createtheimg(inputValue, newNumber)
                }}
            >
                Update
            </Button>
            <Button
                type="file"
                style={{ marginRight: "10px" }}
                onClick={this.clicktheimagehandler}
            >
                Upload
            </Button>
            <Button
                onClick={closeModal}
                look={Button.Looks.LINK}
                color={Button.Colors.TRANSPARENT}
                id="heybrohowyoudin"
            >
                Cancel
            </Button>
        </Modal.Footer>
        </Modal>
        )
    }

}

module.exports = Form;


// <img src={this.state.image} onClick={() => {
//             closeModal
//             messages.sendMessage(channels.getChannelId(), {
//             content: String(this.state.image),
//                     })
                
//         }} />