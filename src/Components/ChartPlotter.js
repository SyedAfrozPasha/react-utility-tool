import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import BarChart from './BarChart';

export default function ChartPlotter() {
  const [data, setData] = useState();
  const [dropDownProps, setDropDownProps] = useState([]);
  const [isSampleExample, setIsSampleExample] = useState(false);
  const [config, setConfig] = useState({ chartColor: '#42A5F5' });
  const [isValidJSON, setIsValidJSON] = useState(true);
  const [plotted, setPlotted] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      let value = data[0];
      let dropDownList = [];
      for (let key in value) {
        dropDownList.push(key);
      }
      setDropDownProps(dropDownList);
    }
  }, [data]);

  const clearContent = () => {
    document.getElementById('chart-input').value = '';
    document.getElementById('x-axis').value = '';
    document.getElementById('y-axis').value = '';
    document.getElementById('chart-title').value = '';
    document.getElementById('chart-color-text').value = '#42A5F5';
    document.getElementById('chart-color').value = '#42A5F5';
    setData();
    setConfig({ chartColor: '#42A5F5' });
    if (isSampleExample) setIsSampleExample(false);
  };

  const storeData = e => {
    let value = e.target.value;
    if (value && isJSON(value)) {
      setIsValidJSON(true);
      setData(JSON.parse(value));
    } else {
      setData();
      setIsValidJSON(false);
      setConfig({ chartColor: '#42A5F5' });
      setPlotted(false);
      document.getElementById('x-axis').value = '';
      document.getElementById('y-axis').value = '';
      document.getElementById('chart-title').value = '';
      document.getElementById('chart-color-text').value = '#42A5F5';
      document.getElementById('chart-color').value = '#42A5F5';
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

  const storeConfig = e => {
    let value = e.target.value;
    let id = e.target.id;
    if (id === 'x-axis' && value) {
      setConfig({ ...config, xAxisProp: value });
    } else if (id === 'y-axis' && value) {
      setConfig({ ...config, yAxisProp: value });
    } else if (id === 'chart-title' && value) {
      setConfig({ ...config, chartTitle: value });
    } else if ((id === 'chart-color' || id === 'chart-color-text') && value) {
      setConfig({ ...config, chartColor: value.toUpperCase() });
    }
  };

  const runPlotter = () => {
    setIsSampleExample(false);
    if (!isValidJSON) {
      alert('Invalid JSON - Please paste the valid JSON');
    }
    if (
      data &&
      !isObjectEmpty(config) &&
      config.xAxisProp &&
      config.yAxisProp
    ) {
      setPlotted(true);
      navigateToOutput();
    } else {
      setPlotted(false);
      alert('Please provide the input and config value');
    }
  };

  const isObjectEmpty = obj => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const navigateToTool = propEvent => {
    let navigate =
      propEvent.dataset && propEvent.dataset.nav ? propEvent.dataset.nav : null;
    if (navigate) {
      let isExample =
        propEvent.dataset && propEvent.dataset.example ? true : false;
      if (isExample) {
        const data = [
          { year: '1950', population: 2.525 },
          { year: '1960', population: 3.018 },
          { year: '1970', population: 3.682 },
          { year: '1980', population: 4.44 },
          { year: '1990', population: 5.31 },
          { year: '2000', population: 6.127 },
          { year: '2010', population: 6.93 }
        ];
        setDropDownProps(['year', 'population']);
        setConfig({
          ...config,
          xAxisProp: 'year',
          yAxisProp: 'population',
          chartTitle: 'World Population',
          chartColor: '#42A5F5'
        });
        setData(data);

        document.getElementById('x-axis').value = 'year';
        document.getElementById('y-axis').value = 'population';
        document.getElementById('chart-color').value = '#42A5F5';
        document.getElementById('chart-color-text').value = '#42A5F5';
        document.getElementById('chart-title').value = 'World Population';
        document.getElementById('chart-input').value = JSON.stringify(
          data,
          null,
          2
        );

        setIsSampleExample(true);
      }

      setTimeout(() => {
        const id = propEvent.dataset.nav;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  };

  const navigateToOutput = () => {
    setTimeout(() => {
      const element = document.getElementById('output');
      if (element) element.scrollIntoView();
    }, 0);
  };

  return (
    <div className="min-h-screen min-v-screen bg-grey-lightest font-sans">
      <HeroSection
        title="Chart Plotter"
        description1="A simple tool to plot a chart using the JSON data."
        description2="Paste the JSON data below and Select x-axis and y-axis values, hit the Plot button, and boom!"
        getNavigation={navigateToTool}
      />
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
                    className="inline-flex item-center bg-blue-500 hover:bg-blue-700 text-steel-800 hover:text-white font-medium py-1 px-2 border border-blue-700 rounded bg-blue-500 hover:bg-blue-700"
                    onClick={runPlotter}
                  >
                    Plot ▶
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
                placeholder="Paste your JSON here"
                className="text-grey-darkest flex-1 p-2 m-1 bg-transparent focus:outline-none"
                name="chart-input"
                id="chart-input"
                cols="30"
                rows="15"
                spellCheck="false"
                onChange={storeData}
              />
            </div>
          </div>

          <div id="output-value" className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="box__title bg-grey-lighter px-3 py-2 border-b flex justify-between">
                <h3 className="text-lg text-gray-700 font-medium text-center">
                  Options ⚙
                </h3>
              </div>

              <div className="bg-grey-lighter p-4">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Select the X and Y axis values
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="x-axis"
                        >
                          X-AXIS
                        </label>
                        <div className="relative w-full border-none">
                          <select
                            className="bg-gray-200 text-gray-700 appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
                            id="x-axis"
                            defaultValue=""
                            value={config.xAxisProp}
                            onChange={storeConfig}
                          >
                            <option disabled value="">
                              Select an option
                            </option>
                            {dropDownProps.map(item => {
                              return (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                            ▼
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="y-axis"
                        >
                          Y-AXIS
                        </label>
                        <div className="relative w-full border-none">
                          <select
                            className="bg-gray-200 text-gray-700 appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
                            id="y-axis"
                            defaultValue=""
                            value={config.yAxisProp}
                            onChange={storeConfig}
                          >
                            <option disabled value="">
                              Select an option
                            </option>
                            {dropDownProps.map(item => {
                              return (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4 md:pb-8"
                      htmlFor="chart-title"
                    >
                      Title of the chart
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="chart-title"
                          type="text"
                          placeholder="Chart Title"
                          onChange={storeConfig}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4 md:pb-8"
                      htmlFor="chart-color"
                    >
                      Pick the color of the chart
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex -mx-3 mb-6">
                      <div className="w-1/3 px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full  h-10 mt-1 bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="chart-color"
                          type="color"
                          placeholder="Chart Title"
                          onChange={storeConfig}
                          value={config.chartColor}
                        />
                      </div>
                      <div className="w-2/3 px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="chart-color-text"
                          type="text"
                          placeholder="Color"
                          onChange={storeConfig}
                          value={config.chartColor}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {plotted && (
          <div className="row flex mt-8">
            <div className="col w-screen">
              <div
                id="output"
                className="box border rounded flex flex-col shadow bg-white p-4 mb-8"
              >
                {/* <div className="bg-grey-lighter pb-2 mb-2 border-b">
                  <h3 className="text-lg text-gray-700 font-medium text-center">
                    Chart 📊
                  </h3>
                </div> */}
                <div className=" mb-2">
                  <BarChart
                    data={data}
                    chartTitle={config.chartTitle}
                    xAxisProp={config.xAxisProp}
                    yAxisProp={config.yAxisProp}
                    chartColor={config.chartColor || '#42A5F5'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
