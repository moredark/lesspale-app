function fallbackCopyTextToClipboard(text: string) {
  let textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export const clipboardCopy = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};

export const numbersFormat = (number: number) => {
  if (number >= 1e9) {
    const formattedNumber = number / 1e9;
    return formattedNumber.toFixed(1) + "b";
  } else if (number >= 1e6) {
    const formattedNumber = number / 1e6;
    return formattedNumber.toFixed(1) + "m";
  } else if (number >= 1e3) {
    const formattedNumber = number / 1e3;
    return formattedNumber.toFixed(1) + "k";
  } else {
    return number.toString();
  }
};
