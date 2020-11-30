const { Plugin } = require("powercord/entities");
const { messages, channels } = require("powercord/webpack");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
const { getModule, React } = require("powercord/webpack");
const Settings = require("./Settings");
const form = require("./components/Form");
const Button = require("./components/Button");
const { open } = require("powercord/modal");
const { default: State } = require("sucrase/dist/parser/tokenizer/state");
module.exports = class dudeplugin extends (
  Plugin
) {
  startPlugin() {
    this.registerSettings();
    this.addButton();
    this.loadStylesheet("syle.css");
  }
  registerSettings() {
    powercord.api.settings.registerSettings("send-button-settings", {
      category: this.entityID,
      label: "Button testing",
      render: Settings,
    });
  }

  addButton() {
    const ChannelTextAreaContainer = getModule(
      (m) =>
        m.type &&
        m.type.render &&
        m.type.render.displayName === "ChannelTextAreaContainer",
      false
    );
    inject(
      "button-testing",
      ChannelTextAreaContainer.type,
      "render",
      (args, res) => {
        const props = findInReactTree(
          res,
          (r) => r && r.className && r.className.indexOf("buttons-") === 0
        );
        // const element = React.createElement(
        //     "div",
        //     {
        //         className: ".button-testing",
        //         onClick: () => open(() => React.createElement(form)),
        //     },
        //     React.createElement(Button)
        // );

        props.children.unshift(
          React.createElement(
            "div",
            {
              className: ".button-testing",
              onClick: () => open(() => React.createElement(form)),
            },
            React.createElement(Button)
          )
        );
        return res;

        // const buttonAtStart = this.settings.get('buttonAtStart', false);

        // buttonAtStart ? props.children.unshift(element) : props.children.push(element);
      }
    );

    ChannelTextAreaContainer.type.render.displayName =
      "ChannelTextAreaContainer";
  }

  pluginWillUnload() {
    uninject("button-testing");
    document
      .querySelectorAll(".button-testing")
      .forEach((e) => (e.style.display = "none"));
  }
};

//const Remind = () => {
//   powercord.api.notices.sendToast("yodudemanbro", {
//     header: "Emoji picker",
//     content: `
//     asdasd
//     asd
//     `
//     ,
//     type: "warning",
//     buttons: [
//       {
//         text: "Dismiss",
//         color: "red",
//         size: "medium",
//         look: "outlined",
//       },
//       {
//           text: "Upload",
//           color: "blue",
//           size: "small",
//           look: "outlined",
//           onClick: console.log("helllo"),
//       },
//     ],
//   });
// }
