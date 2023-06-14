import React, {
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "./OneTimeInput.module.css";

interface IOTPInput {
  setCode: Dispatch<SetStateAction<string>>;
  code: string;
}

export default function OneTimeInput({ setCode, code }: IOTPInput) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleOTPChange = (index: number, e: ChangeEvent<HTMLInputElement> | any) => {
    const value = e.target.value;

    if (
      value.length <= 1 &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }

    // Update the value of the current input field
    inputRefs.current[index].value = value;
    
    const inputtedValues = inputRefs.current.map(input => input.value)
    setCode(inputtedValues.join(""));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      !e.currentTarget.value &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData("text/plain").slice(0, 8);

    // Iterate over the input fields and populate them with pasted data
    inputRefs.current.forEach((input, index) => {
      if (pastedData && pastedData[index]) {
        input.value = pastedData[index];

        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });

    const inputtedValues = inputRefs.current.map(input => input.value)
    setCode(inputtedValues.join(""));
  };

  const createRef = (ref: HTMLInputElement | null) => {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  };

  return (
    <div className={styles.inputs}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={createRef}
          onChange={(e) => handleOTPChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={styles.input}
        />
      ))}
    </div>
  );
}

