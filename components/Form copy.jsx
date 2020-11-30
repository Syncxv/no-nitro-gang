const { React, messages, channels, Popout } = require("powercord/webpack");
const { Menu } = require('powercord/components');
const { FormTitle, Button } = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");


class Form extends React.Component {
    clicktheimagehandler = () => {
        const fileInput = document.getElementById('hellorealone');
        fileInput.click()
    }
    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
            image: img
        });
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            image: null
        };

        this.onImageChange = this.onImageChange.bind(this);

        
    }

    render() {
        return (
        <Modal className="buttontgitestingtingo" backdropOpacity= {100} isVisible={true} transparent={true}>
        <Modal.Header>
        <FormTitle tag="h4">TEST</FormTitle>
        </Modal.Header>
        <Modal.Content>
        <input type="file" hidden="hidden" id="hellorealone" onChange={this.onImageChange}/>
        <img src={this.state.image} onClick={() => 
        messages.sendMessage(channels.getChannelId(), {
        content: this.state.image,
            })
        
        } />
        </Modal.Content>
        <Modal.Footer>
            <Button
                color={Button.Colors.GREEN}
                onClick={() => {
                    console.log(this.state.image)
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
            >
                Cancel
            </Button>
        </Modal.Footer>
        </Modal>
        )
    }

}

module.exports = Form;
