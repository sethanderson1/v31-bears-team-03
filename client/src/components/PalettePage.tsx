//@ts-nocheck
import React from 'react';
import Palette from './Palette';
import OptionsBar from './OptionsBar';

function PalettePage({
  colors,
  setColors,
  setColorMode,
  checkLockGenerate,
  addColor,
  deleteColor,
  toggleLock,
}) {
  return (
    <div>
      <OptionsBar
        setColorMode={setColorMode}
        checkLockGenerate={checkLockGenerate}
        addColor={addColor}
        length={colors.length}
      />
      <Palette
        colors={colors}
        setColors={setColors}
        deleteColor={deleteColor}
        toggleLock={toggleLock}
      />
    </div>
  );
}

export default PalettePage;
