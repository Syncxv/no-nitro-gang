const {
    React,
    getModuleByDisplayName,
    getModule,
} = require("powercord/webpack");
const Tooltip = getModuleByDisplayName("Tooltip", false);
const { Button } = require("powercord/components");
const buttonClasses = getModule(["button"], false);
const buttonWrapperClasses = getModule(["buttonWrapper", "pulseButton"], false);
const buttonTextAreaClasses = getModule(["button", "textArea"], false);

module.exports = () => (
    <Tooltip color="black" postion="top" text="buttontest">
        {({ onMouseLeave, onMouseEnter }) => (
            <Button
                look={Button.Looks.BLANK}
                size={Button.Sizes.ICON}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
                >
                    <img
                        className={`${buttonWrapperClasses.icon}`}
                        style={{ filter: "invert(70%)" }}
                        src="https://www.flaticon.com/svg/static/icons/svg/25/25446.svg"
                     alt="testingbutton"/>
                </div>
            </Button>
        )}
    </Tooltip>
);