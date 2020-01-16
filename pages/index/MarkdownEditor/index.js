import React, { useState } from "react";
import PropTypes from "prop-types";

import * as Showdown from "showdown";
import ReactMde from "react-mde";

import css from "./style.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

function MarkdownEditor({ file, write }) {
  console.log(file.name);

  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState('write');

  const reader = new FileReader();
  reader.onload = function(event) {
      var contents = event.target.result;
      console.log("File contents: " + contents);

      setValue(contents);
  };

  reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
  };

  reader.readAsText(file);

  const save = (input) => {
    const temp = new File(
      [input],
      file.name,
      {
        type: "text/markdown",
        lastModified: new Date()
      });

    setValue(input);
    write(temp);
  };

  const selectTab = (tab) => {
    console.log
    tab == 'write' ? setSelectedTab('write') : setSelectedTab('preview');
  }

  return (
    <div className={css.editor}>
      <h3>TODO</h3>
      <i>text/markdown</i>
      <ReactMde
        value={value}
        onChange={save}
        selectedTab={selectedTab}
        onTabChange={selectTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
