import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="m-6">
      <div style={hideWhenVisible} className="flex justify-end">
        <button onClick={toggleVisibility} className="border-2 border-primary-50 hover:border-primary-700 bg-primary-700 hover:bg-primary-50 text-primary-50 hover:text-primary-700 rounded-full w-3xs py-2">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="flex flex-col space-y-4 border-2 border-primary-700 bg-primary-50 rounded-lg p-4">
        <button onClick={toggleVisibility} className="border-2 border-primary-700 hover:border-accent bg-primary-50 hover:bg-accent-light rounded-full w-8 h-8 self-end">X</button>
        {props.children}        
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
