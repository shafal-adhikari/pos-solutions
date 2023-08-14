import React from "react";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Dropdown from "antd/lib/dropdown";
import Panel from "rc-color-picker/lib/Panel";
import "antd/dist/antd.css";
import "./inputcolor.css";
import "rc-color-picker/assets/index.css";
export default function InputColor(props) {
  const { color, onChange, originalColor } = props;

  const [internalColor, setInternalColor] = React.useState(color);

  const handleChange = (color) => {
    setInternalColor(color.color);

    if (onChange) {
      onChange(color.color);
    }
  };

  const overlay = (
    <Panel color={internalColor} enableAlpha={false} onChange={handleChange} />
  );
  return (
    <>
      <Input
        value={internalColor ? internalColor : originalColor}
        onChange={(e) => setInternalColor(e.target.value)}
        suffix={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: overlay,
                },
              ],
            }}
          >
            <Button
              style={{
                background: internalColor ? internalColor : originalColor,
              }}
            >
              {" "}
            </Button>
          </Dropdown>
        }
      />
    </>
  );
}
