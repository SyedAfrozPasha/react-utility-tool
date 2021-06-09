import React, { useState } from 'react';
import HeroSection from './HeroSection';

export default function JSONViewer() {
  const [data, setData] = useState();
  const [formattedData, setFormattedData] = useState();
  const [isSampleExample, setIsSampleExample] = useState(false);
  const [copyLegend, setCopyLegend] = useState('Copy');
  const [copyColor, setCopyColor] = useState('bg-blue-500 hover:bg-blue-700');
  const [hasStringified, setHasStringified] = useState(false);
  const [isValidJSON, setIsValidJSON] = useState(true);

  const beautifyJSON = () => {
    if (isSampleExample) setIsSampleExample(false);
    if (!isValidJSON) {
      alert('Invalid JSON - Please paste the valid JSON');
    }

    if (data) {
      let formatData = JSON.stringify(data, null, 2);
      setFormattedData(formatData);
      setHasStringified(false);
    }
  };

  const minifyJSON = () => {
    if (isSampleExample) setIsSampleExample(false);
    if (!isValidJSON) {
      alert('Invalid JSON - Please paste the valid JSON');
    }
    if (!hasStringified) {
      if (formattedData) {
        let formatData = JSON.stringify(JSON.parse(formattedData));
        setFormattedData(formatData);
      } else if (data) {
        let formatData = JSON.stringify(data);
        setFormattedData(formatData);
      }
      setHasStringified(false);
    } else {
      if (formattedData) {
        let formatData = formattedData.replace(/\\/g, '');
        formatData = formatData.substring(1, formatData.length - 1);
        setFormattedData(formatData);
      } else if (data) {
        let formatData = data.replace(/\\/g, '');
        formatData = formatData.substring(1, data.length - 1);
        setFormattedData(formatData);
      }
      setHasStringified(false);
    }
  };

  const stringifyJSON = () => {
    if (isSampleExample) setIsSampleExample(false);
    if (!isValidJSON) {
      alert('Invalid JSON - Please paste the valid JSON');
    }
    if (!hasStringified) {
      if (formattedData) {
        let formatData = JSON.stringify(JSON.parse(formattedData));
        formatData = formatData
          .replace(/\\/g, '\\\\')
          .replace(/\u0008/g, '\\b')
          .replace(/\t/g, '\\t')
          .replace(/\n/g, '\\n')
          .replace(/\f/g, '\\f')
          .replace(/\r/g, '\\r')
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"');
        setFormattedData(`"${formatData}"`);
      } else if (data) {
        let formatData = JSON.stringify(data);
        formatData = formatData
          .replace(/\\/g, '\\\\')
          .replace(/\u0008/g, '\\b')
          .replace(/\t/g, '\\t')
          .replace(/\n/g, '\\n')
          .replace(/\f/g, '\\f')
          .replace(/\r/g, '\\r')
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"');
        setFormattedData(`"${formatData}"`);
      }
      setHasStringified(true);
    }
  };

  const clearContent = () => {
    document.getElementById('jsondata').value = '';
    setData();
    setFormattedData();
    setHasStringified(false);
    if (isSampleExample) setIsSampleExample(false);
  };

  const storeData = e => {
    let value = e.target.value;
    if (value && isJSON(value)) {
      setIsValidJSON(true);
      setData(JSON.parse(value));
    } else {
      setData();
      setFormattedData();
      setHasStringified(false);
      setIsValidJSON(false);
    }
  };

  const copyData = () => {
    if (isSampleExample) setIsSampleExample(false);
    if (formattedData || data) {
      if (formattedData) {
        navigator.clipboard.writeText(formattedData);
      } else {
        navigator.clipboard.writeText(data);
      }
      setCopyLegend('Copied!');
      setCopyColor('bg-green-500 hover:bg-green-700');
      setTimeout(() => {
        setCopyLegend('Copy');
        setCopyColor('bg-blue-500 hover:bg-blue-700');
      }, 3000);
    }
  };

  const isJSON = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  // const navigateToTool = e => {
  //   let navigate =
  //     e.target.dataset && e.target.dataset.nav ? e.target.dataset.nav : null;
  //   if (navigate) {
  //     let isExample =
  //       e.target.dataset && e.target.dataset.example ? true : false;
  //     if (isExample) {
  //       let example = {
  //         name: 'John',
  //         age: 30,
  //         city: 'New York'
  //       };
  //       setData(example);
  //       setIsSampleExample(true);

  //       document.getElementById('jsondata').value = JSON.stringify(example);
  //     }

  //     setTimeout(() => {
  //       const id = e.target.dataset.nav;
  //       const element = document.getElementById(id);
  //       if (element) element.scrollIntoView();
  //     }, 0);
  //   }
  // };

  const navigateToTool = propEvent => {
    let navigate =
      propEvent.dataset && propEvent.dataset.nav ? propEvent.dataset.nav : null;
    if (navigate) {
      let isExample =
        propEvent.dataset && propEvent.dataset.example ? true : false;
      if (isExample) {
        let example = {
          name: 'John',
          age: 30,
          city: 'New York'
        };
        setData(example);
        setIsSampleExample(true);

        document.getElementById('jsondata').value = JSON.stringify(example);
      }

      setTimeout(() => {
        const id = propEvent.dataset.nav;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  };

  return (
    <div className="min-h-screen min-v-screen bg-grey-lightest font-sans">
      <HeroSection
        title="JSON Viewer"
        description1="A simple tool to view the beautified, minified or stringified JSON
          data."
        description2="Paste the JSON data below and Try to beautify, minify or stringify the
          JSON data using below buttons."
        getNavigation={navigateToTool}
      />
      {/* <section className="bg-teal-100 p-8 text-center">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          JSON Viewer
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          A simple tool to view the beautified, minified or stringified JSON
          data
        </p>
        <p className="text-gray-700 text-lg mb-8">
          Paste the JSON data below and Try to beautify, minify or stringify the
          JSON data using below buttons.
        </p>

        <div className="flex flex-wrap justify-center space-x-2">
          <button
            role="button"
            data-nav="tool-start"
            data-example="true"
            className="py-3 px-8 mb-2 bg-gray-400 hover:bg-gray-300 text-gray-800 hover:text-gray-900 rounded-lg hover:shadow-xl transition duration-300 focus:outline-none"
            onClick={navigateToTool}
          >
            Try an example
          </button>
          <button
            data-nav="tool-start"
            className="py-3 px-8 mb-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-lg hover:shadow-xl transition duration-300 focus:outline-none"
            onClick={navigateToTool}
          >
            Get Started
          </button>
        </div>
      </section> */}
      <div id="tool-start" className="p-8">
        <div className="row flex">
          <div className="col w-full">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b">
                <div className="flex text-lg text-gray-700 font-medium justify-center">
                  JSON Viewer
                </div>
                <div className="flex flex-wrap justify-center">
                  <button
                    role="button"
                    className="bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 mr-2 mt-2 border border-blue-700 rounded"
                    onClick={stringifyJSON}
                    title="Convert JSON into plain string"
                  >
                    Stringify
                  </button>
                  <button
                    role="button"
                    className="bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 mr-2 mt-2 border border-blue-700 rounded"
                    onClick={minifyJSON}
                    title="Minify the JSON - Remove all the whitespaces"
                  >
                    Minify
                  </button>
                  {/* <button
                    role="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 mr-2 mt-2 border border-blue-700 rounded"
                    onClick={beautifyJSON}
                    title="Convert the JSON into readable format"
                  >
                    Beautify
                  </button> */}

                  <span className="relative inline-flex rounded-md shadow-sm">
                    <button
                      role="button"
                      className="inline-flex item-center bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 mr-2 mt-2 border border-blue-700 rounded"
                      onClick={beautifyJSON}
                      title="Convert the JSON into readable format"
                    >
                      Beautify
                    </button>
                    {isSampleExample && (
                      <span className="flex absolute h-3 w-3 top-0 right-0 mt-1 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                      </span>
                    )}
                  </span>

                  <button
                    role="button"
                    className="bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 mr-2 mt-2 border border-blue-700 rounded"
                    onClick={clearContent}
                  >
                    Clear
                  </button>
                  <button
                    role="button"
                    className={`${copyColor} text-steel-800 hover:text-white font-medium py-1 px-2 mt-2 border border-blue-700 rounded ${
                      copyLegend === 'Copied!'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={copyData}
                    disabled={copyLegend === 'Copied!' ? true : ''}
                  >
                    {copyLegend}
                  </button>
                </div>
              </div>
              <textarea
                id="jsondata"
                placeholder="Paste the JSON here"
                className="text-grey-darkest flex-1 p-2 m-1 bg-transparent focus:outline-none font-mono"
                name="inputJSON"
                cols="30"
                rows="15"
                value={formattedData}
                onChange={storeData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
