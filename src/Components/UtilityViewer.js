import React, { useState } from 'react';

export default function JSONViewer() {
  const [inputData, setInputData] = useState();
  const [outputData, setOutputData] = useState();
  const [config, setConfig] = useState({});
  const [isSampleExample, setIsSampleExample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyLegend, setCopyLegend] = useState('Copy 📄');
  const [copyColor, setCopyColor] = useState('bg-blue-500 hover:bg-blue-700');

  const clearContent = () => {
    document.getElementById('input').value = '';
    setInputData();
    setOutputData();
  };

  const storeInputData = e => {
    let value = e.target.value;
    if (value) {
      setInputData(value);
    } else {
      setInputData();
      setOutputData();
    }
  };

  const copyData = () => {
    if (outputData || inputData) {
      if (outputData) {
        navigator.clipboard.writeText(outputData);
      } else {
        navigator.clipboard.writeText(inputData);
      }
      setCopyLegend('Copied!');
      setCopyColor('bg-green-500 hover:bg-green-700');
      setTimeout(() => {
        setCopyLegend('Copy');
        setCopyColor('bg-blue-500 hover:bg-blue-700');
      }, 3000);
    }
  };

  const storeConfig = e => {
    let value = e.target.value;
    let id = e.target.id;
    if (value && id) {
      setConfig({ ...config, [id]: value });
    }
  };

  const setRemoveWhiteSpaceFlag = e => {
    let value = e.target.value;
    if (value === 'true') {
      setConfig({ ...config, removeWhiteSpace: true });
    } else {
      setConfig({ ...config, removeWhiteSpace: false });
    }
  };

  const setRemoveDuplicateFlag = e => {
    let value = e.target.value;
    if (value === 'true') {
      setConfig({ ...config, removeDuplicates: true });
    } else {
      setConfig({ ...config, removeDuplicates: false });
    }
  };

  const runFormatter = () => {
    setIsSampleExample(false);
    if (inputData && !isObjectEmpty(config)) {
      setIsLoading(true);
      let input = inputData;

      // Remove duplicates
      if (config.removeDuplicates) {
        let valueWithOneNewLine = input.replace(/(\r\n|\r|\n){2,}/g, '\n');
        let arrayOfValues = valueWithOneNewLine.split('\n');
        let hashObj = {};
        let resultArray = [];
        for (let val of arrayOfValues) {
          hashObj[val] = (hashObj[val] || 0) + 1;
          if (!(hashObj[val] > 1)) {
            resultArray.push(val);
          }
        }
        if (resultArray.length > 0) {
          let resultString = resultArray.join();
          input = resultString.replace(/,/g, '\n');
        }
      }

      // Wrap each item
      if (
        config['element-start-separator'] ||
        config['element-end-separator']
      ) {
        let valueWithOneNewLine = input.replace(/(\r\n|\r|\n){2,}/g, '\n');
        let splittedValues = valueWithOneNewLine.split('\n');

        let startValue = config['element-start-separator'] || '';
        let endValue = config['element-end-separator'] || '';

        let resultArray = [];

        for (let i = 0; i < splittedValues.length; i++) {
          if (splittedValues[i]) {
            let value = `${startValue}${splittedValues[i]}${endValue}`;
            resultArray.push(value);
          }
        }

        let resultString = resultArray.join();
        input = resultString.replace(/,/g, '\n');
      }

      // Wrap entire content
      if (
        config['content-start-separator'] ||
        config['content-end-separator']
      ) {
        let startValue = config['content-start-separator'] || '';
        let endValue = config['content-end-separator'] || '';
        input = `${startValue}${input}${endValue}`;
      }

      // Add delimiter
      if (config['middle-separator']) {
        let valueWithOneNewLine = input.replace(/(\r\n|\r|\n){2,}/g, '\n');
        let splittedValues = valueWithOneNewLine.split('\n');
        let separator = config['middle-separator'] || '';
        input = splittedValues.join(`${separator}`);
      }

      // Remove whitespaces
      if (config.removeWhiteSpace) {
        input = input.replace(/\s/g, '');
      }

      setOutputData(input);
      setIsLoading(false);
      navigateToOutput();
    } else {
      alert('Please provide the input and config value');
    }
  };

  const isObjectEmpty = obj => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const navigateToTool = e => {
    let navigate =
      e.target.dataset && e.target.dataset.nav ? e.target.dataset.nav : null;
    if (navigate) {
      let isExample =
        e.target.dataset && e.target.dataset.example ? true : false;
      if (isExample) {
        setConfig({
          ...config,
          ['content-start-separator']: '[',
          ['content-end-separator']: ']',
          ['element-start-separator']: '"',
          ['element-end-separator']: '"',
          ['middle-separator']: ','
        });

        setInputData('Apple\nBanana\nMango\nGrape');

        document.getElementById('content-start-separator').value = '[';
        document.getElementById('content-end-separator').value = ']';
        document.getElementById('element-start-separator').value = '"';
        document.getElementById('element-end-separator').value = '"';
        document.getElementById('middle-separator').value = ',';
        document.getElementById('input').value = 'Apple\nBanana\nMango\nGrape';

        setIsSampleExample(true);
      }

      setTimeout(() => {
        const id = e.target.dataset.nav;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  };

  const navigateToOutput = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw <= 640) {
      setTimeout(() => {
        const element = document.getElementById('output-value');
        if (element) element.scrollIntoView();
      }, 0);
    }
  };

  return (
    <div className="min-h-screen min-v-screen bg-grey-lightest font-sans">
      <section className="bg-teal-100 p-8 text-center">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          String Utility Tool
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          A simple tool to convert a value into desired value by passing
          appropriate value in the below converter settings.
        </p>
        <p className="text-gray-700 text-lg mb-8">
          Enter your data on the left and add your desired config values, hit
          the <i>Run</i> button, and boom!, desired data on the right.
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
      </section>
      <div id="tool-start" className="p-8">
        <div className="row sm:flex">
          <div className="col sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b flex flex-wrap justify-between">
                <h3 className="text-lg text-gray-700 font-medium text-left">
                  Input ⌨
                </h3>
                <button
                  role="button"
                  className="bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 border border-blue-700 rounded"
                  onClick={clearContent}
                >
                  Clear 🧹
                </button>
                <span className="relative inline-flex rounded-md shadow-sm">
                  <button
                    role="button"
                    className={`inline-flex item-center bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 border border-blue-700 rounded ${
                      isLoading
                        ? 'bg-green-500 hover:bg-green-700'
                        : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                    disabled={isLoading ? true : ''}
                    onClick={runFormatter}
                  >
                    {isLoading && (
                      <svg
                        className="animate-spin -ml-1 mr-2 mt-px h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    {isLoading
                      ? 'Processing'
                      : isSampleExample
                      ? 'Click here to Run ▶'
                      : 'Run ▶'}
                  </button>
                  {isSampleExample && (
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                  )}
                </span>
              </div>
              <textarea
                placeholder="Paste your content here"
                className="text-grey-darkest flex-1 p-2 m-1 bg-transparent focus:outline-none"
                name="input"
                id="input"
                cols="30"
                rows="15"
                onChange={storeInputData}
              />
            </div>
          </div>

          <div id="output-value" className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b flex justify-between">
                <h3 className="text-lg text-gray-700 font-medium text-left">
                  Output 🖥
                </h3>
                <button
                  role="button"
                  className={`${copyColor} text-steel-700 hover:text-white font-medium py-1 px-2 border border-blue-700 rounded ${
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
              <textarea
                className="text-grey-darkest flex-1 p-2 m-1 bg-transparent focus:outline-none font-mono"
                name="output"
                cols="30"
                rows="15"
                value={outputData}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row flex mt-8">
          <div className="col w-screen">
            <div className="box border rounded flex flex-col shadow bg-white p-4 mb-8">
              <div className="bg-grey-lighter pb-2 mb-2 border-b">
                <h3 className="text-lg text-gray-700 font-medium text-center">
                  Converter Options ⚙
                </h3>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Wrap the entire content with start and end value
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="flex -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="content-start-separator"
                      >
                        START
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="content-start-separator"
                        type="text"
                        placeholder="<, >, #, -, etc."
                        onChange={storeConfig}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="content-end-separator"
                      >
                        END
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="content-end-separator"
                        type="text"
                        placeholder="<, >, #, -, etc."
                        onChange={storeConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Wrap each item with start and end value
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="flex -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="element-start-separator"
                      >
                        START
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="element-start-separator"
                        type="text"
                        placeholder="<, >, #, -, etc."
                        onChange={storeConfig}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="element-end-separator"
                      >
                        END
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="element-end-separator"
                        type="text"
                        placeholder="<, >, #, -, etc."
                        onChange={storeConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Add any delimiter between each item
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="flex -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="middle-separator"
                      >
                        DELIMITER
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="middle-separator"
                        type="text"
                        placeholder="<, >, #, -, etc."
                        onChange={storeConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Remove whitespaces?
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="flex -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0 content-center">
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="radio"
                          name="removeWhiteSpace"
                          className="form-radio h-5 w-5 text-gray-600"
                          onChange={setRemoveWhiteSpaceFlag}
                          value={true}
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-3 ml-4">
                        <input
                          type="radio"
                          name="removeWhiteSpace"
                          className="form-radio h-5 w-5 text-red-600"
                          onChange={setRemoveWhiteSpaceFlag}
                          value={false}
                          defaultChecked
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Remove duplicates?
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="flex -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0 content-center">
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="radio"
                          name="removeDuplicate"
                          className="form-radio h-5 w-5 text-gray-600"
                          onChange={setRemoveDuplicateFlag}
                          value={true}
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-3 ml-4">
                        <input
                          type="radio"
                          name="removeDuplicate"
                          className="form-radio h-5 w-5 text-red-600"
                          onChange={setRemoveDuplicateFlag}
                          value={false}
                          defaultChecked
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
