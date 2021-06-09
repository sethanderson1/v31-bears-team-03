//@ts-nocheck
import chroma from 'chroma-js';
import React, {useState} from 'react'
import './App.css';
import Palette from './components/Palette'

const colorsFromBackend = [
  { color: "#5EFC8D" },
  { color: "#8ef9f3" },
  { color: "#93BEDF" },
  { color: "#8377D1" },
  { color: "#6D5A72" },
  { color: "#83fedd" },
];


function App() {
  const [colors, setColors] = useState(colorsFromBackend)

  const generatePalette = () => {
    let first = chroma.random().hex()
    let second = chroma.random().hex()
    let palette = chroma.scale([first, second]).mode('lch').colors(colors.length)
    let newArray = []
    palette.map(color => {
      newArray.push({color: color})
    })

    setColors(newArray)
  }

  const addColor =() => {
    let rand = "#"+Math.floor(Math.random()*16777215).toString(16)
    let newColor = {
      color: rand
    }
    setColors(colors => [...colors, newColor])
  }
  
  return (
    <div className="App">
      {console.log(colors)}
      <button onClick={generatePalette}>Generate</button>
      <br/>
      <button onClick={addColor}>Add</button>
      <Palette colors={colors} setColors={setColors}/>
    </div>
  );
}

export default App;
