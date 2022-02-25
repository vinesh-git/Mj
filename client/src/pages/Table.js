import React from "react";

const Table = ({data}) => {
  try{
    const dataImport = data[0];
    function multiRowtT()
    {
      var n = data.length;
      let results = [];
      for(let i = 0; i < n; i++)
      {
        var tablerow = renderResults(data[i]);
        results.push(<tr>{tablerow}</tr>);
      }
      return results;
    }

  function convertToObj(y)
  {
        var mainlen = Object.entries(y).length;
        var keylen = Object.keys(Object.entries(y)[0][1]).length;
        var obj = {};
        var keyss = Object.keys(Object.entries(y)[0][1]);
        
        for(let j = 0; j < keylen; j++)
        {
          var vin = "";
          for(let k = 0; k < mainlen; k++)
          {
            vin += "\n"+String(Object.values(Object.entries(y)[k][1])[j]);
          }
          obj[keyss[j]] = vin;
        }
        return obj;
  }
  function renderHeaderCells() {
    let headerCells = [];
    Object.keys(dataImport).map((x, i) => {
      let items = Object.values(dataImport)[i];
      console.log(typeof items)
      if(typeof(items) === 'string')
      {
        items = 1;
      }
      else if(Array.isArray(items))
      {
        items = Object.entries(items)[0][1];
      }
      
      headerCells.push(
        <th colSpan={Object.keys(items).length} key={i.name}>
          {x}
        </th>
      );
      return headerCells;
    });
    return headerCells;
  }

  function renderSubHeaders() {
    let subHeaders = [];
    let subs = Object.values(dataImport);
    for(let i = 0; i<subs.length;i++){
      if(Array.isArray(subs[i]))
      {
        subs[i] = convertToObj(subs[i]);
      }
    }
    subs.map((x, i) => {
      if(typeof(x) === 'string' || typeof(x) === 'number' || typeof(x) === 'boolean')
      {
        subs[i] = {_:x};
      }
      if (subs[i] !== undefined) {
        Object.keys(subs[i]).map(y => {
          subHeaders.push(<td>{y}</td>);
          return subHeaders;
        });
      }
      return subHeaders;
    });
    return subHeaders;
  }

  function renderResults(dataImportt) {
    let results = [];
    let res = Object.values(dataImportt);

    for(let i = 0; i<res.length;i++){
      if(Array.isArray(res[i]))
      {
        res[i] = convertToObj(res[i]);
      }
    }
    
    res.map((x, i) => {
        
      if(typeof(x) === 'string' || typeof(x) === 'number' || typeof(x) === 'boolean')
      {
        if(typeof(x) === 'number' || typeof(x) === 'boolean')
        {
            x = String(x);
        }
        res[i] = {_:x};
      }
      if (res[i] !== undefined) {
        Object.values(res[i]).map(y => {
          results.push(<td>{y}</td>);
          return results;
        });
      }
      return results;
    });
    return results;
  }
  return (
    <React.Fragment>
      <h2>Table Format</h2>
      <div className="scrolling-wrapper">
      <table align="center">
        <thead>
          <tr>{renderHeaderCells()}</tr>
        </thead>
        <tbody>
          <tr>{renderSubHeaders()}</tr>
          {multiRowtT()}
        </tbody>
      </table>
      </div>
    </React.Fragment>
  );
  }catch(err){
      return (<>
      <h1 id='h11'>Unable to Display or Error in JSON File!!</h1>
      {console.log(err)}</>);
  }
};

export default Table;